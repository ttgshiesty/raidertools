import logger from '../utils/logger.js';
import express from 'express';
import crypto from 'crypto';
import { CapturedToken } from '../models/CapturedToken.js';
import { SyncData } from '../models/SyncData.js';
import { LiveStat } from '../models/LiveStat.js';
import { User } from '../models/User.js';
import { testTokenEndpoints } from '../services/embarkProxy.js';
import {
  normalizeUCIID,
  normalizeItem,
  normalizeEnemy,
  normalizeMap,
} from '../utils/normalization.js';
import { resolvePayloadIds } from '../services/arcIdResolver.js';

const router = express.Router();

function findNestedScalar(value, keys, depth = 0) {
  if (!value || depth > 10) return null;
  if (Array.isArray(value)) {
    for (const child of value) {
      const found = findNestedScalar(child, keys, depth + 1);
      if (found !== null) return found;
    }
    return null;
  }
  if (typeof value !== 'object') return null;

  for (const key of keys) {
    const candidate = value[key];
    if (
      candidate !== undefined &&
      candidate !== null &&
      typeof candidate !== 'object'
    ) {
      return String(candidate);
    }
  }
  for (const child of Object.values(value)) {
    const found = findNestedScalar(child, keys, depth + 1);
    if (found !== null) return found;
  }
  return null;
}

// POST /api/extension/token
// Receives token from the Chrome extension
router.post('/token', async (req, res) => {
  try {
    const { token, source, userAgent } = req.body;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Token required' });
    }

    // Hash token for deduplication
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Check for existing valid token with same hash
    const existing = await CapturedToken.findOne({ tokenHash, isValid: true });
    if (existing) {
      existing.lastUsed = new Date();
      await existing.save();
      return res.json({ status: 'already_linked', tokenId: existing._id });
    }

    // Create new token record
    const userId = req.user?.id || req.body.extensionId || 'anonymous';
    const capturedPath = req.body.path || req.body.source;

    const tokenDoc = new CapturedToken({
      userId,
      token,
      tokenHash,
      source: source || 'unknown',
      isValid: true,
      userAgent: userAgent || req.headers['user-agent'],
      ipAddress: req.ip,
    });

    await tokenDoc.save();

    // Test token immediately to discover working endpoint
    let testResults = [];
    let discoveredEndpoint = null;
    try {
      testResults = await testTokenEndpoints(token);
      const working = testResults.find((r) => r.hasItems && r.status === 200);
      if (working) {
        // Extract base URL from working endpoint
        const url = new URL(working.url);
        const pathParts = url.pathname.split('/');
        // Remove /inventory to get base
        const basePath = url.pathname.replace(/\/inventory\/?$/, '');
        discoveredEndpoint = `${url.origin}${basePath}`;
        tokenDoc.workingEndpoint = discoveredEndpoint;
        tokenDoc.endpointDiscoveredAt = new Date();
        await tokenDoc.save();
        logger.info(
          `[Extension] Auto-discovered endpoint: ${discoveredEndpoint}`,
        );
      }
    } catch (testErr) {
      console.warn('[Extension] Token test failed:', testErr.message);
    }

    res.json({
      status: 'captured',
      tokenId: tokenDoc._id,
      discoveredEndpoint,
      testResults,
    });
  } catch (err) {
    console.error('[Extension] Token capture error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/extension/link
// Links a captured token to an authenticated Discord user
router.post('/link', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Discord login required' });
    }

    const { tokenHash } = req.body || {};
    let tokenDoc;

    if (tokenHash) {
      tokenDoc = await CapturedToken.findOne({ tokenHash, isValid: true });
    } else {
      const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
      tokenDoc = await CapturedToken.findOne({
        userId: 'anonymous',
        ipAddress: req.ip,
        isValid: true,
        capturedAt: { $gte: fifteenMinsAgo },
      }).sort({ capturedAt: -1 });
    }

    if (!tokenDoc) {
      return res.status(404).json({ error: 'Token not found' });
    }

    tokenDoc.userId = req.user.id;
    tokenDoc.linkedAt = new Date();
    await tokenDoc.save();

    res.json({ status: 'linked', tokenId: tokenDoc._id });
  } catch (err) {
    console.error('[Extension] Link error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/extension/status
// Check if user has a linked token
router.get('/status', async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ linked: false, hasPendingToken: false });
    }

    // 1. Check for already linked token
    let token = await CapturedToken.findOne({
      userId: req.user.id,
      isValid: true,
    }).sort({ lastUsed: -1 });

    // 2. Fallback: Auto-link an anonymous token from this IP captured recently
    if (!token) {
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
      token = await CapturedToken.findOne({
        userId: 'anonymous',
        ipAddress: req.ip,
        isValid: true,
        capturedAt: { $gte: fiveMinsAgo },
      }).sort({ capturedAt: -1 });

      if (token) {
        token.userId = req.user.id;
        await token.save();
        logger.info(
          `[Extension] Auto-linked token from IP ${req.ip} to user ${req.user.id}`,
        );
      }
    }

    const recentSnapshot = await SyncData.findOne({
      userId: req.user.id,
      source: 'extension_full',
    })
      .sort({ syncedAt: -1 })
      .select(
        'syncedAt payload.account payload.arcTrackerStats.account payload.metaForge.profileId payload.metaForge.profileUsername',
      )
      .lean();
    const snapshotAge = recentSnapshot?.syncedAt
      ? Date.now() - new Date(recentSnapshot.syncedAt).getTime()
      : Infinity;
    const hasRecentBrowserSync =
      snapshotAge < 24 * 60 * 60 * 1000 &&
      Boolean(
        recentSnapshot?.payload?.account?.userId ||
        recentSnapshot?.payload?.arcTrackerStats?.account?.userId ||
        recentSnapshot?.payload?.metaForge?.profileId ||
        recentSnapshot?.payload?.metaForge?.profileUsername,
      );

    // 3. Surface if an anonymous token is pending for this IP (helps UI state)
    let hasPendingToken = false;
    if (!token && !hasRecentBrowserSync) {
      const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
      const pending = await CapturedToken.findOne({
        userId: 'anonymous',
        ipAddress: req.ip,
        isValid: true,
        capturedAt: { $gte: fifteenMinsAgo },
      }).select('_id');
      hasPendingToken = !!pending;
    }

    res.json({
      linked: Boolean(token || hasRecentBrowserSync),
      hasBearerToken: Boolean(token),
      hasPendingToken,
      tokenId: token?._id || null,
      lastUsed: token?.lastUsed || null,
      hasWorkingEndpoint: !!token?.workingEndpoint,
      liveSource: token
        ? 'embark_token'
        : hasRecentBrowserSync
          ? 'arctracker_browser_session'
          : null,
      lastSyncedAt: recentSnapshot?.syncedAt || null,
    });
  } catch (err) {
    console.error('[Extension] Status error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/extension/debug
// Test a stored token against Embark API (for troubleshooting)
router.get('/debug', async (req, res) => {
  try {
    let tokenDoc;

    if (req.user) {
      tokenDoc = await CapturedToken.findOne({
        userId: req.user.id,
        isValid: true,
      }).sort({ lastUsed: -1 });
    } else if (req.query.tokenHash) {
      tokenDoc = await CapturedToken.findOne({
        tokenHash: req.query.tokenHash,
        isValid: true,
      });
    } else {
      return res
        .status(401)
        .json({ error: 'Login required or provide tokenHash' });
    }

    if (!tokenDoc) {
      return res.status(404).json({ error: 'No valid token found' });
    }

    const results = await testTokenEndpoints(tokenDoc.token);

    // Update working endpoint if found
    const working = results.find((r) => r.hasItems && r.status === 200);
    if (working) {
      const url = new URL(working.url);
      const basePath = url.pathname.replace(/\/inventory\/?$/, '');
      const discoveredEndpoint = `${url.origin}${basePath}`;
      tokenDoc.workingEndpoint = discoveredEndpoint;
      tokenDoc.endpointDiscoveredAt = new Date();
      await tokenDoc.save();
    }

    res.json({
      tokenId: tokenDoc._id,
      tokenHash: tokenDoc.tokenHash,
      source: tokenDoc.source,
      capturedAt: tokenDoc.capturedAt,
      workingEndpoint: tokenDoc.workingEndpoint,
      results,
    });
  } catch (err) {
    console.error('[Extension] Debug error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/extension/sync
// Receives live data from SHiESTYBUDDY and stores normalized snapshots.
router.post('/sync', async (req, res) => {
  try {
    const {
      source,
      xboxIp,
      payload,
      arcTrackerSessionToken,
      arcTrackerCookieName,
    } = req.body;

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Payload required' });
    }

    const userId = req.user?.id || req.ip || 'anonymous';
    const syncedAt = new Date();
    const {
      payload: linkedPayload,
      resolver,
      ids,
    } = await resolvePayloadIds(payload);

    // Extract publicUuid from payload (extension v2 style)
    const publicUuid = normalizeUCIID(
      linkedPayload.publicUuid ||
        linkedPayload.uciid ||
        linkedPayload.account?.publicUuid,
    );
    if (publicUuid && req.user) {
      // Link UCIID to user profile
      await User.updateOne(
        { id: req.user.id },
        {
          $addToSet: { uciids: publicUuid },
          $set: { lastSync: syncedAt },
        },
      );
    }

    const metaForgeProfileId =
      linkedPayload.metaForge?.profileId ||
      findNestedScalar(linkedPayload.metaForge, [
        'metaForgeProfileId',
        'profileId',
      ]);
    if (metaForgeProfileId && req.user) {
      await User.updateOne(
        { id: req.user.id },
        {
          $set: {
            metaForgeProfileId,
            lastSync: syncedAt,
            lastExtensionSyncAt: syncedAt,
            extensionSyncSource: source || 'arctracker_browser_session',
          },
        },
      );
    }

    const writeSnapshot = async (snapshotSource, snapshotPayload) => {
      if (snapshotPayload === undefined || snapshotPayload === null) return;
      await SyncData.updateOne(
        { userId, source: snapshotSource },
        {
          $set: {
            userId,
            source: snapshotSource,
            xboxIp: xboxIp || null,
            payload: snapshotPayload,
            publicUuid, // Link top-level publicUuid
            syncedAt,
          },
        },
        { upsert: true },
      );
    };

    // Save individual live stats if this is a live memory update
    if (
      linkedPayload.stats &&
      (linkedPayload.itemId || linkedPayload.weaponAssetId)
    ) {
      try {
        const statType = linkedPayload.stats.kills
          ? 'kill'
          : linkedPayload.stats.damageDealt
            ? 'damage'
            : 'loot';
        const liveStat = new LiveStat({
          userId,
          publicUuid: publicUuid || 'unknown',
          type: statType,
          target: normalizeItem(
            linkedPayload.itemId || linkedPayload.weaponAssetId,
          ),
          map: normalizeMap(linkedPayload.mapName || linkedPayload.mapId),
          value:
            linkedPayload.stats.kills || linkedPayload.stats.damageDealt || 1,
          metadata: {
            rawWeaponId: linkedPayload.weaponAssetId,
            enemyName: normalizeEnemy(
              linkedPayload.enemyName || linkedPayload.enemyId,
            ),
            accuracy: linkedPayload.stats.accuracy,
          },
          timestamp: syncedAt,
        });
        await liveStat.save();
      } catch (statErr) {
        logger.warn(
          '[Extension] Failed to save individual live stat:',
          statErr.message,
        );
      }
    }

    // Save full snapshot
    await writeSnapshot('extension_full', linkedPayload);
    if (source && source !== 'extension_full') {
      await writeSnapshot(source, linkedPayload);
    }
    await writeSnapshot('extension_metaforge', linkedPayload.metaForge);

    // Save summary (totals + derived)
    const summary =
      linkedPayload.totals ||
      linkedPayload.summary ||
      linkedPayload.arcTrackerStats?.totals ||
      {};
    const derived =
      linkedPayload.derived || linkedPayload.arcTrackerStats?.derived || {};
    await writeSnapshot('extension_summary', { ...summary, ...derived });

    // Save stats (totals + derived combined)
    await writeSnapshot('extension_stats', { ...summary, ...derived });

    const inventorySnapshot =
      linkedPayload.inventory ||
      linkedPayload.stash ||
      linkedPayload.snapshot ||
      linkedPayload.arcTrackerStats?.inventory ||
      linkedPayload.arcTrackerStats?.stash ||
      linkedPayload.metaForge?.inventory ||
      null;
    if (inventorySnapshot) {
      await writeSnapshot('extension_stash', inventorySnapshot);
    }

    // Save weapon kills
    await writeSnapshot('extension_weaponKills', linkedPayload.weaponKills);

    // Save enemy kills
    await writeSnapshot('extension_enemyKills', linkedPayload.enemyKills);

    // Save map performance
    await writeSnapshot(
      'extension_mapPerformance',
      linkedPayload.mapPerformanceRaw,
    );

    // Save rounds
    await writeSnapshot('extension_rounds', {
      rounds: linkedPayload.rounds || [],
    });

    // Extract inventory mappings from payload
    const inventoryCandidates = [
      linkedPayload.inventory?.items,
      linkedPayload.inventory,
      linkedPayload.stash?.items,
      linkedPayload.stash,
      linkedPayload.snapshot?.items,
      linkedPayload.metaForge?.inventory?.arcInventory?.envelope?.view?.items,
      linkedPayload.metaForge?.inventory?.arcInventory?.envelope?.view
        ?.stashSlots,
      linkedPayload.metaForge?.inventory?.arcInventory?.envelope?.view
        ?.equipmentSlots,
      linkedPayload.metaForge?.inventory?.items,
    ];
    const inventory =
      inventoryCandidates.find((candidate) => Array.isArray(candidate)) || [];
    if (Array.isArray(inventory) && inventory.length > 0) {
      const { extractMappings } = await import('../lib/compactFormat.js');
      const mappings = extractMappings(inventory);

      if (mappings.length > 0) {
        // Import PublicUuidItemMapping for upsert
        const { PublicUuidItemMapping } =
          await import('../models/PublicUuidItemMapping.js');

        // Upsert mappings to global collection
        const ops = mappings.map((m) => ({
          updateOne: {
            filter: { publicUuid: m.publicUuid },
            update: {
              $set: {
                itemId: m.itemId,
                slug: m.slug,
                gameAssetId: m.gameAssetId,
                status: m.status,
                isBlankMapping: !!m.isBlankMapping,
                updatedAt: syncedAt,
              },
              $setOnInsert: {
                createdAt: syncedAt,
              },
            },
            upsert: true,
          },
        }));
        await PublicUuidItemMapping.bulkWrite(ops);

        // Store mappings in the main extension_full snapshot
        await SyncData.updateOne(
          { userId, source: 'extension_full' },
          { $set: { inventoryMappings: mappings } },
        );
      }
    }

    // Store ArcTracker session token on user document (never exposed to frontend)
    const tokenToStore = arcTrackerSessionToken;
    if (tokenToStore && typeof tokenToStore === 'string' && req.user?.id) {
      await User.updateOne(
        { id: req.user.id },
        {
          $set: {
            arctrackerSessionToken: tokenToStore,
            arctrackerCookieName:
              arcTrackerCookieName || 'better-auth.session_token',
            arctrackerSessionTokenUpdatedAt: syncedAt,
            lastExtensionSyncAt: syncedAt,
            extensionSyncSource: source || 'shiestybuddy_v2',
          },
        },
      );
    }

    // Return safe response — never expose raw token
    res.json({
      status: 'synced',
      received: true,
      hasArcTrackerSessionToken: Boolean(tokenToStore),
      savedSources: [
        'extension_full',
        'extension_summary',
        'extension_stats',
        ...(inventorySnapshot ? ['extension_stash'] : []),
        'extension_weaponKills',
        'extension_enemyKills',
        'extension_mapPerformance',
        'extension_rounds',
        ...(linkedPayload.metaForge ? ['extension_metaforge'] : []),
      ],
      metaForgeProfileId: metaForgeProfileId || null,
      resolvedIdCounts: {
        weaponAssetIds: ids.weaponAssetIds.length,
        itemIds: ids.itemIds.length,
        enemyIds: ids.enemyIds.length,
        mapIds: ids.mapIds.length,
        publicUuids: ids.publicUuids.length,
      },
      resolverCounts: {
        weapons: Object.keys(resolver.weaponsByAssetId).length,
        items: Object.keys(resolver.itemsById).length,
        enemies: Object.keys(resolver.enemiesByTargetId).length,
        maps: Object.keys(resolver.mapsByTargetId).length,
        inventory: Object.keys(resolver.inventoryByPublicUuid).length,
      },
      lastSyncedAt: syncedAt,
    });
  } catch (err) {
    console.error('[Extension] Sync error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/extension/xbox-data
// Returns the last Xbox sync payload for the user
router.get('/xbox-data', async (req, res) => {
  try {
    const userId = req.user?.id || req.ip || 'anonymous';
    const doc = await SyncData.findOne({
      userId,
      source: 'xbox_bridge',
    }).sort({ syncedAt: -1 });

    if (!doc) {
      return res.json({ hasData: false, data: null });
    }

    res.json({
      hasData: true,
      data: doc.payload,
      xboxIp: doc.xboxIp,
      syncedAt: doc.syncedAt,
    });
  } catch (err) {
    console.error('[Extension] Xbox data fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

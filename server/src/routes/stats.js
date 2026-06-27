import express from 'express';
import {
  fetchStatsOverview,
  getExtensionStats,
  storeExtensionStats,
} from '../services/statsGateway.js';

const router = express.Router();
const cache = new Map();
const CACHE_TTL_MS = 5_000;

function pageOf(items, page, limit) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    pagination: {
      page: currentPage,
      limit,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}

function paginateOverview(data, query) {
  const page = Math.max(1, Number.parseInt(String(query.page ?? '1'), 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(String(query.limit ?? '50'), 10) || 50));
  const rawRounds = data.rounds?.rounds ?? [];
  const filteredRounds = rawRounds
    .filter((round) => !query.outcome || query.outcome === 'all' || round.outcome === query.outcome)
    .filter((round) => !query.map || query.map === 'all' || round.mapName === query.map || round.map === query.map)
    .filter((round) => !query.season || String(round.seasonNumber ?? '') === String(query.season))
    .filter((round) => !query.dateFrom || Date.parse(round.roundEndedAt ?? '') >= Date.parse(String(query.dateFrom)))
    .filter((round) => !query.dateTo || Date.parse(round.roundEndedAt ?? '') <= Date.parse(`${String(query.dateTo)}T23:59:59.999Z`));
  const sort = String(query.sort ?? 'newest');
  if (sort === 'oldest') filteredRounds.reverse();
  if (sort === 'value_desc') filteredRounds.sort((a, b) => Number(b.netValue ?? 0) - Number(a.netValue ?? 0));
  if (sort === 'value_asc') filteredRounds.sort((a, b) => Number(a.netValue ?? 0) - Number(b.netValue ?? 0));
  const rounds = pageOf(filteredRounds, page, limit);
  const enemies = pageOf(data.enemies?.enemies ?? [], page, limit);
  const weapons = pageOf(data.weapons?.weapons ?? [], page, limit);
  const maps = pageOf(data.maps?.maps ?? [], page, limit);
  const metaForgeMaps = pageOf(data.metaforge?.mapStats ?? [], page, limit);
  const metaForgeEnemies = pageOf(data.metaforge?.enemyStats ?? [], page, limit);
  const metaForgeWeapons = pageOf(data.metaforge?.weaponStats ?? [], page, limit);
  return {
    ...data,
    rounds: { rounds: rounds.items },
    enemies: { enemies: enemies.items },
    weapons: { weapons: weapons.items },
    maps: { maps: maps.items },
    recentRounds: rounds.items,
    topWeapons: weapons.items,
    arcEnemiesByType: enemies.items,
    mapPerformance: { maps: maps.items },
    metaforge: data.metaforge ? {
      ...data.metaforge,
      mapStats: metaForgeMaps.items,
      enemyStats: metaForgeEnemies.items,
      weaponStats: metaForgeWeapons.items,
    } : null,
    pagination: {
      rounds: rounds.pagination,
      enemies: enemies.pagination,
      weapons: weapons.pagination,
      maps: maps.pagination,
      metaforge: {
        mapStats: metaForgeMaps.pagination,
        enemyStats: metaForgeEnemies.pagination,
        weaponStats: metaForgeWeapons.pagination,
      },
    },
  };
}

router.get('/overview', async (req, res) => {
  const cacheKey = 'default';
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() && req.query.fresh !== '1') {
    return res.json(paginateOverview(cached.data, req.query));
  }

  try {
    const data = await fetchStatsOverview();
    cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    return res.json(paginateOverview(data, req.query));
  } catch (error) {
    const status = Number(error.status) || 502;
    console.error('[Stats] Overview failed', {
      status,
      message: error.message,
    });
    return res.status(status).json({
      error: error.message || 'Stats server failed to load ArcTracker data',
      code: error.code || 'STATS_UPSTREAM_FAILED',
    });
  }
});

router.post('/extension', (req, res) => {
  const payload = req.body?.stats ?? req.body;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: 'Stats payload required' });
  }

  const stored = storeExtensionStats(payload);
  cache.clear();
  return res.json({ ok: true, syncedAt: stored.syncedAt });
});

router.get('/extension/status', (_req, res) => {
  const snapshot = getExtensionStats();
  return res.json({ synced: Boolean(snapshot), syncedAt: snapshot?.syncedAt ?? null });
});

export default router;

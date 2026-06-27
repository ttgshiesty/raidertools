import express from 'express';
import {
  fetchArcTrackerProfile,
  fetchStatsOverview,
} from '../services/statsGateway.js';

const router = express.Router();

function unwrap(value) {
  return value?.data && typeof value.data === 'object' ? value.data : value || {};
}

async function playerBundle() {
  const [profileResult, statsResult] = await Promise.allSettled([
    fetchArcTrackerProfile(),
    fetchStatsOverview(),
  ]);
  if (statsResult.status === 'rejected') throw statsResult.reason;
  const profile = profileResult.status === 'fulfilled' ? unwrap(profileResult.value) : {};
  const stats = statsResult.value;
  return { profile, stats };
}

router.get(['/profile', '/me'], async (_req, res) => {
  try {
    const { profile, stats } = await playerBundle();
    return res.json({
      ...profile,
      ...stats.summary,
      id: profile.userId || 'raider',
      username: profile.username || 'Raider',
      displayName: profile.username || 'Raider',
      arctrackerLinked: true,
      statsLinked: true,
    });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

router.get('/raider-hub', async (_req, res) => {
  try {
    const { profile, stats } = await playerBundle();
    return res.json({
      profile,
      combatSummary: stats.summary,
      recentRounds: stats.recentRounds,
      enemyKills: { enemies: stats.arcEnemiesByType, source: 'arctracker' },
      weaponKills: { weapons: stats.topWeapons, source: 'arctracker' },
      mapPerformance: { maps: stats.mapPerformance.maps, source: 'arctracker' },
      expeditionStatus: null,
      currencies: profile.currencies || null,
      syncedAt: stats.fetchedAt,
    });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

router.get('/progression', async (_req, res) => {
  try {
    const { profile } = await playerBundle();
    return res.json({
      level: profile.level ?? profile.playerLevel ?? null,
      xp: profile.xp ?? profile.xpTotal ?? profile.totalXp ?? null,
      raw: profile,
    });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

router.get('/command-center', (_req, res) => res.json({ settings: {}, xbox: { connected: false } }));

router.get('/combat-breakdown', async (_req, res) => {
  try {
    const stats = await fetchStatsOverview();
    return res.json({
      ...stats.summary,
      topWeapons: stats.topWeapons,
      arcEnemiesByType: stats.arcEnemiesByType,
      mapPerformance: stats.mapPerformance,
    });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

router.get('/enemy-kills', async (_req, res) => {
  try {
    const stats = await fetchStatsOverview();
    return res.json({ enemies: stats.arcEnemiesByType, source: 'arctracker' });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

router.get('/weapon-kills', async (_req, res) => {
  try {
    const stats = await fetchStatsOverview();
    return res.json({ weapons: stats.topWeapons, source: 'arctracker' });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

router.get('/map-performance', async (_req, res) => {
  try {
    const stats = await fetchStatsOverview();
    return res.json({ maps: stats.mapPerformance.maps, source: 'arctracker' });
  } catch (error) {
    return res.status(Number(error.status) || 502).json({ error: error.message });
  }
});

export default router;

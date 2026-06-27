import { ArcTrackerAPI } from './arctracker.js';
import { MetaForgeAPI } from './metaforge.js';
import { summarizeRounds } from './statsMapping.js';

let extensionStats = null;

function requireUserKey() {
  const key = process.env.ARC_USER_KEY?.trim();
  if (!key) throw new Error('ARC_USER_KEY is not set in environment');
  if (!key.startsWith('arc_u1_')) {
    throw new Error('ARC_USER_KEY must start with arc_u1_');
  }
  return key;
}

function object(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function firstObject(...values) {
  return values.map(object).find((value) => Object.keys(value).length > 0) ?? {};
}

function extensionSection(root, key) {
  const extensionTotals = object(root.extension_totals);
  const extensionArcTrackerStats = object(root.extension_arcTrackerStats);
  const extensionFullStats = object(object(object(root.extension_full).payload).arcTrackerStats);
  const arcTrackerStats = object(root.arcTrackerStats);
  if (key === 'summary') {
    return firstObject(
      extensionTotals,
      extensionArcTrackerStats.totals,
      extensionFullStats.totals,
      arcTrackerStats.totals,
      root.summary,
    );
  }
  return firstObject(
    extensionArcTrackerStats[key],
    extensionFullStats[key],
    arcTrackerStats[key],
    root[key],
  );
}

function array(value, key) {
  if (Array.isArray(value)) return value;
  const root = object(value);
  return Array.isArray(root[key]) ? root[key] : [];
}

function firstNumber(source, keys) {
  for (const key of keys) {
    const parsed = Number(source[key]);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function normalizeSummary(payload) {
  const source = object(payload);
  const totalRounds = firstNumber(source, ['totalRounds', 'total_rounds']);
  const totalExtracted = firstNumber(source, ['totalExtracted', 'total_extracted']);
  const totalDied = firstNumber(source, ['totalDied', 'total_died']);
  const totalArcKills = firstNumber(source, ['totalArcKills', 'total_arc_kills', 'arcKills']);
  const totalPlayerKills = firstNumber(source, ['totalPlayerKills', 'total_player_kills', 'playerKills']);
  const totalValueExtracted = firstNumber(source, ['totalValueExtracted', 'total_value_extracted']);
  const totalValueBroughtIn = firstNumber(source, ['totalValueBroughtIn', 'total_value_brought_in']);
  return {
    ...source,
    totalRounds,
    totalExtracted,
    totalDied,
    totalTimeMs: firstNumber(source, ['totalTimeMs', 'total_time_ms']),
    totalValueExtracted,
    totalValueBroughtIn,
    totalNetValue: firstNumber(source, ['totalNetValue', 'total_net_value', 'netProfit']) || totalValueExtracted - totalValueBroughtIn,
    totalArcKills,
    totalPlayerKills,
    totalKills: firstNumber(source, ['totalKills', 'total_kills']) || totalArcKills + totalPlayerKills,
    totalDamage: firstNumber(source, ['totalDamage', 'total_damage', 'damage']),
    totalDamageTaken: firstNumber(source, ['totalDamageTaken', 'damageTaken']),
    totalContainersLooted: firstNumber(source, ['totalContainersLooted', 'total_containers_looted', 'containersLooted']),
  };
}

export async function fetchStatsOverview() {
  const userKey = requireUserKey();
  const profileId = process.env.METAFORGE_PROFILE_ID?.trim();
  const settled = await Promise.allSettled([
    ArcTrackerAPI.getAllRounds(userKey, { maxTotal: 2000 }),
    ArcTrackerAPI.getProfile(userKey),
    profileId ? MetaForgeAPI.getPlayerStats(profileId) : Promise.resolve(null),
  ]);
  const warnings = [];
  const roundsResult = settled[0];
  const profileResult = settled[1];
  const metaForgeResult = settled[2];
  if (roundsResult.status === 'rejected') {
    warnings.push({ endpoint: '/api/v2/user/rounds', status: Number(roundsResult.reason?.status) || 502, error: roundsResult.reason?.message || 'ArcTracker rounds request failed' });
  }
  if (profileResult.status === 'rejected') {
    warnings.push({ endpoint: '/api/v2/user/profile', status: Number(profileResult.reason?.status) || 502, error: profileResult.reason?.message || 'ArcTracker profile request failed' });
  }
  if (metaForgeResult.status === 'rejected') {
    warnings.push({ endpoint: '/api/arc-raiders/player-stats', status: 502, error: metaForgeResult.reason?.message || 'MetaForge player stats request failed' });
  }

  const rawRounds = roundsResult.status === 'fulfilled'
    ? array(roundsResult.value, 'rounds')
    : [];
  const roundSummary = summarizeRounds(rawRounds);
  roundSummary.totalDamageTaken = rawRounds.reduce((sum, round) => sum + firstNumber(object(round), ['damageTaken']), 0);
  const providerSummary = normalizeSummary(extensionStats?.summary);
  const summary = normalizeSummary({
    ...roundSummary,
    ...Object.fromEntries(
      Object.entries(providerSummary).filter(([, value]) => Number(value) !== 0),
    ),
  });
  const endpointEnemies = array(extensionStats?.enemyKills, 'enemies');
  const endpointWeapons = array(extensionStats?.weaponKills, 'weapons');
  const endpointMaps = array(extensionStats?.mapPerformance, 'maps');
  const enemies = endpointEnemies.length > 0 ? endpointEnemies : roundSummary.arcEnemiesByType;
  const weapons = endpointWeapons.length > 0 ? endpointWeapons : roundSummary.topWeapons;
  const rounds = roundSummary.rounds;
  const maps = endpointMaps.length > 0 ? endpointMaps : roundSummary.mapPerformance;
  const survivalRate = summary.totalRounds > 0
    ? summary.totalExtracted / summary.totalRounds
    : 0;
  const averageNetValue = summary.totalRounds > 0
    ? summary.totalNetValue / summary.totalRounds
    : 0;

  return {
    summary,
    enemies: { enemies },
    weapons: { weapons },
    rounds: { rounds },
    maps: { maps },
    topWeapons: weapons,
    arcEnemiesByType: enemies,
    recentRounds: rounds,
    mapPerformance: { maps },
    enhanced_survival_metrics: {
      overallSurvivalRate: survivalRate,
      totalRaids: summary.totalRounds,
      successfulExtractions: summary.totalExtracted,
      deaths: summary.totalDied,
    },
    advanced_kill_statistics: {
      totalKills: summary.totalKills,
      playerKills: summary.totalPlayerKills,
      arcKills: summary.totalArcKills,
      totalDamage: summary.totalDamage,
      enemies,
      weapons,
    },
    economic_performance_indicators: {
      totalValueExtracted: summary.totalValueExtracted,
      totalValueBroughtIn: summary.totalValueBroughtIn,
      netProfit: summary.totalNetValue,
      averageNetValue,
      containersLooted: summary.totalContainersLooted,
    },
    profile: profileResult.status === 'fulfilled' ? profileResult.value : null,
    metaforge: metaForgeResult.status === 'fulfilled' ? metaForgeResult.value : null,
    sources: {
      extensionStats: extensionStats?.syncedAt ?? null,
      arcTrackerRounds: roundsResult.status === 'fulfilled',
      arcTrackerProfile: profileResult.status === 'fulfilled',
      metaForge: metaForgeResult.status === 'fulfilled' && metaForgeResult.value !== null,
    },
    fetchedAt: new Date().toISOString(),
    warnings,
  };
}

export function storeExtensionStats(payload) {
  const root = object(payload);
  extensionStats = {
    summary: extensionSection(root, 'summary'),
    weaponKills: firstObject(extensionSection(root, 'weaponKills'), root['weapon-kills']),
    enemyKills: firstObject(extensionSection(root, 'enemyKills'), root['enemy-kills']),
    mapPerformance: firstObject(extensionSection(root, 'mapPerformance'), root['map-performance']),
    syncedAt: typeof root.syncedAt === 'string' ? root.syncedAt : new Date().toISOString(),
  };
  return extensionStats;
}

export function getExtensionStats() {
  return extensionStats;
}

export function fetchArcTrackerProfile() {
  return ArcTrackerAPI.getProfile(requireUserKey());
}

export const statsGatewayInternals = {
  normalizeSummary,
  requireUserKey,
  storeExtensionStats,
};

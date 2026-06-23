/**
 * shiesty-metaforge-stats.generated.ts
 *
 * Standalone MetaForge stats normalizer/fetcher for a fresh project.
 * Built from the uploaded MetaForge client/proxy/stats API and aggregator files.
 *
 * This file does not import your auth code. Pass an idToken when calling the
 * SHiESTY proxy fetcher, or use the direct fetcher with a server-side API key.
 */

export type JsonObject = Record<string, unknown>;

export interface MetaForgeTotals {
  user_id?: string;
  total_rounds?: number;
  total_duration_seconds?: number;
  total_net_profit?: number;
  total_arc_kills?: number;
  total_player_kills?: number;
  total_player_downs?: number;
  total_deaths?: number;
  total_damage_dealt?: number;
  total_damage_taken?: number;
  total_xp?: number;
  total_healing?: number;
  total_extractions?: number;
  last_updated?: string;
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
  credits?: number;
  raiderTokens?: number;
  creds?: number;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface MetaForgeMapStats {
  user_id?: string;
  map_name: string;
  rounds_played: number;
  total_net_profit: number;
  total_xp: number;
  total_player_kills: number;
  total_arc_kills: number;
  total_deaths: number;
  total_extractions: number;
  total_duration_seconds: number;
  max_net_profit: number;
  max_xp: number;
  total_damage_taken: number;
  total_healing: number;
  last_updated?: string;
  [key: string]: unknown;
}

export interface MetaForgeEnemyStats {
  user_id?: string;
  enemy_name: string;
  kills: number;
  damage: number;
  last_updated?: string;
  [key: string]: unknown;
}

export interface MetaForgeWeaponStats {
  user_id?: string;
  weapon_name: string;
  damage: number;
  kills?: number;
  last_updated?: string;
  [key: string]: unknown;
}

export interface MetaForgeStatsResponse {
  stats: MetaForgeTotals;
  mapStats: MetaForgeMapStats[];
  enemyStats: MetaForgeEnemyStats[];
  weaponStats: MetaForgeWeaponStats[];
  totalDamageDealt?: number;
  totalPlayerDowns?: number;
  raw: unknown;
}

export interface MetaForgeSummary {
  totalRounds: number;
  totalExtracted: number;
  totalDied: number;
  survivalRate: number;
  totalDurationMs: number;
  totalNetValue: number;
  totalXp: number;
  totalArcKills: number;
  totalPlayerKills: number;
  totalKills: number;
  totalPlayerDowns: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  totalHealing: number;
}

export interface MetaForgeProgression {
  level: number;
  currentXp: number;
  nextLevelXp: number;
}

export interface MetaForgeCurrencies {
  credits: number;
  raiderTokens: number;
  creds: number;
}

export interface MetaForgeMapRow {
  key: string;
  mapName: string;
  raids: number;
  extracted: number;
  died: number;
  survivalRate: number;
  totalDurationMs: number;
  totalNetValue: number;
  totalXp: number;
  totalArcKills: number;
  totalPlayerKills: number;
  totalDamageTaken: number;
  totalHealing: number;
  maxNetProfit: number;
  maxXp: number;
}

export interface MetaForgeBreakdownRow {
  name: string;
  kills: number;
  count: number;
  damage: number;
  lastUpdated?: string;
}

export interface MetaForgeDashboardData {
  source: 'metaforge';
  summary: MetaForgeSummary;
  progression: MetaForgeProgression;
  currencies: MetaForgeCurrencies;
  maps: MetaForgeMapRow[];
  enemies: MetaForgeBreakdownRow[];
  weapons: MetaForgeBreakdownRow[];
  fetchedAt: string;
  raw: MetaForgeStatsResponse;
}

export const METAFORGE_ENDPOINTS = {
  proxyStats: '/me/metaforge/stats',
  directPlayerStats: 'https://metaforge.app/api/arc-raiders/player-stats',
  profile: 'https://metaforge.app/api/arc-raiders/stats/profile',
  inventorySnapshot: 'https://metaforge.app/api/arc-raiders/inventory/snapshot',
  weeklyTrials: 'https://metaforge.app/api/arc-raiders/weekly-trials',
  sync: 'https://metaforge.app/api/sync',
} as const;

function isRecord(value: unknown): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function body(value: unknown): JsonObject {
  const root = isRecord(value) ? value : {};
  return isRecord(root.data) ? root.data : root;
}

function finiteNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function numberOrZero(value: unknown): number {
  return finiteNumber(value) ?? 0;
}

function firstNumber(source: JsonObject, keys: readonly string[]): number {
  for (const key of keys) {
    const value = finiteNumber(source[key]);
    if (value !== null) return value;
  }
  return 0;
}

function firstString(source: JsonObject, keys: readonly string[], fallback: string): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return fallback;
}

function arrayOfRecords(value: unknown): JsonObject[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function ratio(numerator: number, denominator: number): number {
  return denominator > 0 ? numerator / denominator : 0;
}

function titleCaseFromKey(value: string): string {
  return value
    .replace(/_kills$/i, '')
    .replace(/^kills_/i, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}

function crawlNumberStats(obj: unknown, result: Record<string, number> = {}): Record<string, number> {
  if (!isRecord(obj)) return result;
  for (const [key, value] of Object.entries(obj)) {
    const numeric = finiteNumber(value);
    if (numeric !== null && numeric > 0) {
      const name = titleCaseFromKey(key);
      if (name) result[name] = (result[name] ?? 0) + numeric;
    } else if (isRecord(value)) {
      crawlNumberStats(value, result);
    }
  }
  return result;
}

function crawlWeaponStats(obj: unknown, result: Record<string, { kills: number; damage: number }> = {}): Record<string, { kills: number; damage: number }> {
  if (!isRecord(obj)) return result;
  for (const [key, value] of Object.entries(obj)) {
    if (isRecord(value)) {
      const kills = finiteNumber(value.kills);
      const damage = finiteNumber(value.damage ?? value.totalDamage ?? value.total_damage);
      if (kills !== null || damage !== null) {
        const name = titleCaseFromKey(key);
        result[name] = { kills: kills ?? 0, damage: damage ?? 0 };
      } else {
        crawlWeaponStats(value, result);
      }
      continue;
    }
    const numeric = finiteNumber(value);
    if (numeric !== null && /kills/i.test(key) && numeric > 0) {
      const name = titleCaseFromKey(key);
      const existing = result[name] ?? { kills: 0, damage: 0 };
      existing.kills += numeric;
      result[name] = existing;
    }
  }
  return result;
}

export function normalizeMetaForgeStats(raw: unknown): MetaForgeStatsResponse {
  const root = isRecord(raw) ? raw : {};
  const source = body(raw);
  const nestedStats = isRecord(source.stats) ? source.stats : isRecord(source.totals) ? source.totals : source;

  return {
    stats: nestedStats as MetaForgeTotals,
    mapStats: arrayOfRecords(source.mapStats ?? source.maps ?? source.map_stats) as unknown as MetaForgeMapStats[],
    enemyStats: arrayOfRecords(source.enemyStats ?? source.enemies ?? source.enemy_stats) as unknown as MetaForgeEnemyStats[],
    weaponStats: arrayOfRecords(source.weaponStats ?? source.weapons ?? source.weapon_stats) as unknown as MetaForgeWeaponStats[],
    ...(finiteNumber(source.totalDamageDealt) !== null ? { totalDamageDealt: finiteNumber(source.totalDamageDealt)! } : {}),
    ...(finiteNumber(source.totalPlayerDowns) !== null ? { totalPlayerDowns: finiteNumber(source.totalPlayerDowns)! } : {}),
    raw: root,
  };
}

function normalizeMapRows(rows: MetaForgeMapStats[]): MetaForgeMapRow[] {
  return rows.map((row, index) => {
    const source = row as unknown as JsonObject;
    const mapName = firstString(source, ['map_name', 'mapName', 'name'], `Unknown Map ${index + 1}`);
    const raids = firstNumber(source, ['rounds_played', 'roundsPlayed', 'raids', 'total_rounds']);
    const extracted = firstNumber(source, ['total_extractions', 'roundsExtracted', 'extracted']);
    const died = firstNumber(source, ['total_deaths', 'roundsKnockedOut', 'deaths']);
    return {
      key: mapName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `map-${index + 1}`,
      mapName,
      raids,
      extracted,
      died,
      survivalRate: ratio(extracted, raids),
      totalDurationMs: firstNumber(source, ['total_duration_ms', 'totalDurationMs']) || firstNumber(source, ['total_duration_seconds', 'totalDurationSeconds']) * 1000,
      totalNetValue: firstNumber(source, ['total_net_profit', 'totalNetProfit', 'total_net_value', 'netValue']),
      totalXp: firstNumber(source, ['total_xp', 'totalXp']),
      totalArcKills: firstNumber(source, ['total_arc_kills', 'totalArcKills']),
      totalPlayerKills: firstNumber(source, ['total_player_kills', 'totalPlayerKills']),
      totalDamageTaken: firstNumber(source, ['total_damage_taken', 'totalDamageTaken']),
      totalHealing: firstNumber(source, ['total_healing', 'totalHealing']),
      maxNetProfit: firstNumber(source, ['max_net_profit', 'maxNetProfit']),
      maxXp: firstNumber(source, ['max_xp', 'maxXp']),
    };
  });
}

function normalizeEnemyRows(response: MetaForgeStatsResponse): MetaForgeBreakdownRow[] {
  const rows = response.enemyStats.map((enemy, index) => {
    const source = enemy as unknown as JsonObject;
    return {
      name: firstString(source, ['enemy_name', 'enemyName', 'name', 'enemyType'], `Unknown Enemy ${index + 1}`),
      kills: firstNumber(source, ['kills', 'count']),
      count: firstNumber(source, ['kills', 'count']),
      damage: firstNumber(source, ['damage', 'totalDamage', 'total_damage']),
      ...(typeof enemy.last_updated === 'string' ? { lastUpdated: enemy.last_updated } : {}),
    };
  });
  if (rows.length > 0) return rows;

  const breakdown = crawlNumberStats((response.raw as JsonObject)?.arc_destroyed_breakdown ?? (response.raw as JsonObject)?.arcDestroyedBreakdown);
  return Object.entries(breakdown).map(([name, count]) => ({ name, kills: count, count, damage: 0 }));
}

function normalizeWeaponRows(response: MetaForgeStatsResponse): MetaForgeBreakdownRow[] {
  const rows = response.weaponStats.map((weapon, index) => {
    const source = weapon as unknown as JsonObject;
    const kills = firstNumber(source, ['kills', 'count']);
    return {
      name: firstString(source, ['weapon_name', 'weaponName', 'name'], `Unknown Weapon ${index + 1}`),
      kills,
      count: kills,
      damage: firstNumber(source, ['damage', 'totalDamage', 'total_damage']),
      ...(typeof weapon.last_updated === 'string' ? { lastUpdated: weapon.last_updated } : {}),
    };
  });
  if (rows.length > 0) return rows;

  const breakdown = crawlWeaponStats((response.raw as JsonObject)?.weapon_performance ?? (response.raw as JsonObject)?.weaponPerformance);
  return Object.entries(breakdown).map(([name, value]) => ({ name, kills: value.kills, count: value.kills, damage: value.damage }));
}

export function normalizeMetaForgeDashboard(raw: unknown, fetchedAt = new Date().toISOString()): MetaForgeDashboardData {
  const response = normalizeMetaForgeStats(raw);
  const stats = response.stats as JsonObject;
  const totalRounds = firstNumber(stats, ['total_rounds', 'totalRounds', 'roundsPlayed']);
  const totalExtracted = firstNumber(stats, ['total_extractions', 'totalExtractions', 'totalExtracted', 'roundsExtracted']);
  const totalDied = firstNumber(stats, ['total_deaths', 'totalDeaths', 'totalDied', 'roundsKnockedOut']);
  const totalArcKills = firstNumber(stats, ['total_arc_kills', 'totalArcKills', 'arcKills']);
  const totalPlayerKills = firstNumber(stats, ['total_player_kills', 'totalPlayerKills', 'playerKills']);
  const totalPlayerDowns = response.totalPlayerDowns ?? firstNumber(stats, ['total_player_downs', 'totalPlayerDowns', 'playerDowns']);
  const totalDamageDealt = response.totalDamageDealt ?? firstNumber(stats, ['total_damage_dealt', 'totalDamageDealt', 'damageDealt', 'damage']);

  return {
    source: 'metaforge',
    summary: {
      totalRounds,
      totalExtracted,
      totalDied,
      survivalRate: ratio(totalExtracted, totalRounds),
      totalDurationMs: firstNumber(stats, ['total_duration_ms', 'totalDurationMs']) || firstNumber(stats, ['total_duration_seconds', 'totalDurationSeconds']) * 1000,
      totalNetValue: firstNumber(stats, ['total_net_profit', 'totalNetProfit', 'netProfit', 'total_net_value']),
      totalXp: firstNumber(stats, ['total_xp', 'totalXp', 'xp']),
      totalArcKills,
      totalPlayerKills,
      totalKills: totalArcKills + totalPlayerKills,
      totalPlayerDowns,
      totalDamageDealt,
      totalDamageTaken: firstNumber(stats, ['total_damage_taken', 'totalDamageTaken', 'damageTaken']),
      totalHealing: firstNumber(stats, ['total_healing', 'totalHealing', 'healing']),
    },
    progression: {
      level: firstNumber(stats, ['level', 'playerLevel']),
      currentXp: firstNumber(stats, ['currentXp', 'current_xp', 'xp']),
      nextLevelXp: firstNumber(stats, ['nextLevelXp', 'next_level_xp']),
    },
    currencies: {
      credits: firstNumber(stats, ['credits']),
      raiderTokens: firstNumber(stats, ['raiderTokens', 'raider_tokens']),
      creds: firstNumber(stats, ['creds', 'cred']),
    },
    maps: normalizeMapRows(response.mapStats),
    enemies: normalizeEnemyRows(response),
    weapons: normalizeWeaponRows(response),
    fetchedAt,
    raw: response,
  };
}

export function isValidMetaForgeProfileId(value: string): boolean {
  return /^[A-Za-z0-9_-]{3,128}$/.test(value.trim());
}

export interface MetaForgeProxyFetchOptions {
  apiBase?: string;
  idToken: string;
  profileId: string;
  fetchImpl?: typeof fetch;
}

export async function fetchMetaForgeStatsViaProxy(options: MetaForgeProxyFetchOptions): Promise<MetaForgeDashboardData> {
  const profileId = options.profileId.trim();
  if (!isValidMetaForgeProfileId(profileId)) throw new Error('Invalid MetaForge profile id.');
  const apiBase = (options.apiBase ?? 'https://api.shiesty.me').replace(/\/$/, '');
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(`${apiBase}${METAFORGE_ENDPOINTS.proxyStats}?profileId=${encodeURIComponent(profileId)}`, {
    headers: { Authorization: `Bearer ${options.idToken}`, Accept: 'application/json' },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string; message?: string };
    throw new Error(body.error ?? body.message ?? `MetaForge stats request failed with HTTP ${response.status}`);
  }
  return normalizeMetaForgeDashboard(await response.json());
}

export interface MetaForgeDirectFetchOptions {
  profileId: string;
  apiKey?: string;
  accessToken?: string;
  fetchImpl?: typeof fetch;
}

export async function fetchMetaForgeStatsDirect(options: MetaForgeDirectFetchOptions): Promise<MetaForgeDashboardData> {
  const profileId = options.profileId.trim();
  if (!isValidMetaForgeProfileId(profileId)) throw new Error('Invalid MetaForge profile id.');
  const fetchImpl = options.fetchImpl ?? fetch;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (options.apiKey) headers.apikey = options.apiKey;
  if (options.accessToken) headers.Authorization = `Bearer ${options.accessToken}`;
  const response = await fetchImpl(`${METAFORGE_ENDPOINTS.directPlayerStats}?userId=${encodeURIComponent(profileId)}`, { headers });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`MetaForge ${response.status}: ${text || response.statusText}`);
  }
  return normalizeMetaForgeDashboard(await response.json());
}

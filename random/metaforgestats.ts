/*
  metaforgeStats.ts

  One self-contained MetaForge stats normalizer + aggregator.

  Inputs covered:
  - MetaForge raider/player profile object
  - MetaForge stats object
  - MetaForge mapStats / map_stats
  - MetaForge enemyStats / enemy_stats
  - MetaForge weaponStats / weapon_stats
  - Optional rounds if you have them cached locally

  Important:
  - MetaForge weaponStats are treated as DAMAGE rows, not kill-count rows.
  - publicUuid is accepted as an identity field only. This file does not assume
    that publicUuid originates from MongoDB.
*/

export type JsonRecord = Record<string, unknown>;

export type MetaForgeStatSource =
  | 'none'
  | 'profile'
  | 'metaforge_raider'
  | 'metaforge_stats'
  | 'metaforge_map_stats'
  | 'metaforge_enemy_stats'
  | 'metaforge_weapon_stats'
  | 'metaforge_rounds'
  | 'computed';

export interface NormalizedPlayerIdentity {
  userId: string | null;
  discordId: string | null;
  username: string | null;
  displayName: string | null;
  slug: string | null;
  platform: string | null;
  publicUuid: string | null;
  embarkId: string | null;
  metaForgeProfileId: string | null;
  memberSince: string | null;
  playerLevel: number | null;
}

export interface NormalizedRoundBreakdownRow {
  targetId: string | number | null;
  name: string;
  kills: number;
  damage: number;
  type: string | null;
}

export interface NormalizedWeaponDamageRow {
  weaponAssetId: string | number | null;
  itemId: string | number | null;
  name: string;
  damage: number;
  kills: number;
}

export interface NormalizedRound {
  id: string | null;
  roundId: string | null;
  mapTargetId: string | number | null;
  mapName: string;
  outcome: 'extracted' | 'failed' | 'unknown';
  durationMs: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
  kills: number;
  arcKills: number;
  playerKills: number;
  playerDowns: number;
  deaths: number;
  damage: number;
  damageTaken: number;
  healing: number;
  revivesGiven: number;
  revivesReceived: number;
  containersLooted: number;
  itemsExtracted: number;
  score: number;
  xp: number;
  isLegacy: boolean;
  syncedAt: string | null;
  createdAt: string | null;
  roundEndedAt: string | null;
  roundEndedAtPrecision: string | null;
  seasonNumber: number | null;
  linkedScreenshotRaid: boolean;
  arcBreakdown: NormalizedRoundBreakdownRow[];
  weaponDamageBreakdown: NormalizedWeaponDamageRow[];
  raw?: unknown;
}

export interface NormalizedEnemyStat {
  targetId: string | number | null;
  name: string;
  count: number;
  damage: number;
  source: MetaForgeStatSource;
}

export interface NormalizedWeaponStat {
  weaponAssetId: string | number | null;
  itemId: string | number | null;
  name: string;
  count: number;
  damage: number;
  source: MetaForgeStatSource;
}

export interface NormalizedMapStat {
  mapTargetId: string | number | null;
  mapName: string;
  raids: number;
  extracted: number;
  deaths: number;
  totalDurationMs: number;
  totalNetValue: number;
  totalValueExtracted: number;
  totalValueBroughtIn: number;
  survivalRate: number;
  avgDurationMs: number;
  avgNetValue: number;
  source: MetaForgeStatSource;
}

export interface NormalizedStatsTotals {
  totalRounds: number;
  totalExtracted: number;
  totalDied: number;
  survivalRate: number;
  totalTimeMs: number;
  avgDurationMs: number;
  totalValueExtracted: number;
  totalValueBroughtIn: number;
  totalNetValue: number;
  avgLootPerRaid: number;
  avgLoadoutPerRaid: number;
  avgProfitPerRaid: number;
  raidEfficiency: number;
  totalArcKills: number;
  totalPlayerKills: number;
  totalKills: number;
  totalDowns: number;
  totalDamage: number;
  totalDamageReceived: number;
  totalHealing: number;
  totalRevivesGiven: number;
  totalRevivesReceived: number;
  totalContainersLooted: number;
  totalItemsExtracted: number;
  totalXp: number;
  demonStreak: number;
  kdRatio: number;
  avgDamagePerRound: number;
  legacyRounds: number;
}

export interface NormalizedStatSets {
  survival: {
    raids: number;
    extractions: number;
    deaths: number;
    survivalRate: number;
    demonStreak: number;
    timeTopsideMs: number;
    avgDurationMs: number;
  };
  economy: {
    valueExtracted: number;
    valueBroughtIn: number;
    netValue: number;
    avgLootPerRaid: number;
    avgLoadoutPerRaid: number;
    avgProfitPerRaid: number;
    raidEfficiency: number;
  };
  combat: {
    kills: number;
    arcKills: number;
    playerKills: number;
    playerDowns: number;
    kdRatio: number;
    damageDealt: number;
    damageReceived: number;
    avgDamagePerRound: number;
  };
  support: {
    healing: number;
    revivesGiven: number;
    revivesReceived: number;
  };
  loot: {
    containersLooted: number;
    itemsExtracted: number;
    xp: number;
  };
}

export interface ValueHistoryPoint {
  roundId: string | null;
  label: string;
  at: string | null;
  valueExtracted: number;
  valueBroughtIn: number;
  netValue: number;
}

export interface MetaForgeStatsInput {
  profile?: unknown;
  raider?: unknown;
  stats?: unknown;
  mapStats?: unknown;
  enemyStats?: unknown;
  weaponStats?: unknown;
  rounds?: unknown;
  discordId?: string | null;
  slug?: string | null;
  includeRawRounds?: boolean;
  maxRounds?: number;
}

export interface MetaForgeStatsContext {
  provider: 'metaforge';
  schemaVersion: 'shiesty.metaforge.stats.v1';
  generatedAt: string;
  player: NormalizedPlayerIdentity;
  totals: NormalizedStatsTotals;
  statSets: NormalizedStatSets;
  rounds: NormalizedRound[];
  maps: NormalizedMapStat[];
  enemies: NormalizedEnemyStat[];
  weapons: NormalizedWeaponStat[];
  weaponDamage: NormalizedWeaponStat[];
  valueHistory: ValueHistoryPoint[];
  sourceMap: Record<string, MetaForgeStatSource>;
  warnings: string[];
}

const PLAYER_TARGET_NAMES = new Set(['player', 'players', 'raider', 'raiders', 'human', 'humans', 'pvp']);
const SELF_TARGET_NAMES = new Set(['self', 'suicide', 'unknown self']);

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function unwrapData<T = unknown>(payload: unknown): T {
  const root = toRecord(payload);
  if (root.data && typeof root.data === 'object') return root.data as T;
  if (root.result && typeof root.result === 'object') return root.result as T;
  return payload as T;
}

export function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  const root = unwrapData(value);
  if (Array.isArray(root)) return root;
  return [];
}

export function numberValue(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.replace(/[$,\s]/g, '');
    if (!trimmed) return fallback;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  if (typeof value === 'boolean') return value ? 1 : 0;
  return fallback;
}

export function stringValue(value: unknown, fallback: string | null = null): string | null {
  if (typeof value === 'string') return value.trim() || fallback;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
}

export function booleanValue(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim();
    if (['true', '1', 'yes', 'y'].includes(normalized)) return true;
    if (['false', '0', 'no', 'n'].includes(normalized)) return false;
  }
  return fallback;
}

export function pick(root: unknown, keys: string[]): unknown {
  const obj = toRecord(root);
  for (const key of keys) {
    if (key.includes('.')) {
      const value = key.split('.').reduce<unknown>((acc, part) => toRecord(acc)[part], obj);
      if (value !== undefined && value !== null && value !== '') return value;
    } else if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      return obj[key];
    }
  }
  return undefined;
}

export function pickNumber(root: unknown, keys: string[], fallback = 0): number {
  const value = pick(root, keys);
  return value === undefined ? fallback : numberValue(value, fallback);
}

export function pickString(root: unknown, keys: string[], fallback: string | null = null): string | null {
  const value = pick(root, keys);
  return value === undefined ? fallback : stringValue(value, fallback);
}

export function slugify(value: unknown): string | null {
  const raw = stringValue(value, null);
  if (!raw) return null;
  const slug = raw
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || null;
}

function roundWhole(value: number): number {
  return Number.isFinite(value) ? Math.round(value) : 0;
}

function roundRate(numerator: number, denominator: number, decimals = 4): number {
  if (!denominator) return 0;
  const scale = 10 ** decimals;
  return Math.round((numerator / denominator) * scale) / scale;
}

function ratio(numerator: number, denominator: number, decimals = 2): number {
  if (!denominator) return numerator > 0 ? numerator : 0;
  const scale = 10 ** decimals;
  return Math.round((numerator / denominator) * scale) / scale;
}

function normalizeName(value: unknown, fallback = 'Unknown'): string {
  const str = stringValue(value, fallback) ?? fallback;
  return str.trim() || fallback;
}

function normalizeBreakdownName(value: unknown): string | null {
  const name = stringValue(value, null);
  if (!name) return null;
  const cleaned = name.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned) return null;
  return cleaned.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeOutcome(value: unknown): 'extracted' | 'failed' | 'unknown' {
  const raw = stringValue(value, '')?.toLowerCase().trim() ?? '';
  if (!raw) return 'unknown';
  if (raw === 'extracted' || raw === 'success' || raw.includes('extract') || raw.includes('return')) return 'extracted';
  if (raw === 'failed' || raw === 'died' || raw.includes('fail') || raw.includes('knock') || raw.includes('die')) return 'failed';
  return 'unknown';
}

function isExtracted(round: Pick<NormalizedRound, 'outcome'>): boolean {
  return round.outcome === 'extracted';
}

function isFailed(round: Pick<NormalizedRound, 'outcome'>): boolean {
  return round.outcome === 'failed';
}

function arrayFromPayload(payload: unknown, keys: string[]): unknown[] {
  const root = unwrapData<unknown>(payload);
  if (Array.isArray(root)) return root;
  const rec = toRecord(root);
  for (const key of keys) {
    const value = pick(rec, [key]);
    if (Array.isArray(value)) return value;
    const maybeWrapped = unwrapData(value);
    if (Array.isArray(maybeWrapped)) return maybeWrapped;
  }
  return [];
}

function sourceKeyName(name: string, id?: string | number | null): string {
  return `${id ?? ''}:${name.toLowerCase().trim()}`;
}

function emptyTotals(): NormalizedStatsTotals {
  return {
    totalRounds: 0,
    totalExtracted: 0,
    totalDied: 0,
    survivalRate: 0,
    totalTimeMs: 0,
    avgDurationMs: 0,
    totalValueExtracted: 0,
    totalValueBroughtIn: 0,
    totalNetValue: 0,
    avgLootPerRaid: 0,
    avgLoadoutPerRaid: 0,
    avgProfitPerRaid: 0,
    raidEfficiency: 0,
    totalArcKills: 0,
    totalPlayerKills: 0,
    totalKills: 0,
    totalDowns: 0,
    totalDamage: 0,
    totalDamageReceived: 0,
    totalHealing: 0,
    totalRevivesGiven: 0,
    totalRevivesReceived: 0,
    totalContainersLooted: 0,
    totalItemsExtracted: 0,
    totalXp: 0,
    demonStreak: 0,
    kdRatio: 0,
    avgDamagePerRound: 0,
    legacyRounds: 0,
  };
}

function rootRaiderObject(input: MetaForgeStatsInput): JsonRecord {
  return toRecord(unwrapData(input.raider ?? input.profile ?? {}));
}

function rootStatsObject(input: MetaForgeStatsInput): JsonRecord {
  const raider = rootRaiderObject(input);
  const explicitStats = unwrapData(input.stats);
  if (explicitStats && typeof explicitStats === 'object') return toRecord(explicitStats);
  return toRecord(pick(raider, ['stats', 'statBlock', 'stat_block']) ?? raider);
}

export function normalizeMetaForgeTotals(input: MetaForgeStatsInput): Partial<NormalizedStatsTotals> {
  const stats = rootStatsObject(input);
  const totalRounds = pickNumber(stats, ['total_rounds', 'totalRounds', 'raids', 'total_raids'], 0);
  const totalExtracted = pickNumber(stats, ['total_extractions', 'totalExtracted', 'extracted', 'successfulExtractions'], 0);
  const totalDied = pickNumber(stats, ['total_deaths', 'totalDied', 'deaths'], 0);
  const totalPlayerKills = pickNumber(stats, ['total_player_kills', 'player_kills', 'playerKills', 'pvpKills'], 0);
  const totalArcKills = pickNumber(stats, ['total_arc_kills', 'arc_kills', 'arcKills', 'arcDestroyed', 'aiKills'], 0);
  const explicitTotalKills = pickNumber(stats, ['total_kills', 'totalKills', 'kills'], 0);

  return {
    totalRounds,
    totalExtracted,
    totalDied,
    totalTimeMs: pickNumber(stats, ['total_time_ms', 'totalTimeMs', 'timeTopsideMs', 'durationMs'], 0),
    totalValueExtracted: pickNumber(stats, ['total_value_extracted', 'totalValueExtracted', 'valueExtracted', 'lootValue'], 0),
    totalValueBroughtIn: pickNumber(stats, ['total_value_brought_in', 'totalValueBroughtIn', 'valueBroughtIn', 'loadoutValue'], 0),
    totalNetValue: pickNumber(stats, ['total_net_profit', 'totalNetValue', 'net_profit', 'netProfit', 'raider_dollars'], 0),
    totalArcKills,
    totalPlayerKills,
    totalKills: explicitTotalKills || totalPlayerKills + totalArcKills,
    totalDowns: pickNumber(stats, ['total_player_downs', 'player_downs', 'playerDowns', 'downs'], 0),
    totalDamage: pickNumber(stats, ['total_damage_dealt', 'totalDamageDealt', 'damage_dealt', 'damage', 'damageDealt'], 0),
    totalDamageReceived: pickNumber(stats, ['total_damage_taken', 'totalDamageTaken', 'damage_taken', 'damageReceived'], 0),
    totalHealing: pickNumber(stats, ['total_healing', 'healing', 'healthRestored'], 0),
    totalRevivesGiven: pickNumber(stats, ['total_revives_given', 'revivesGiven', 'revives_given'], 0),
    totalRevivesReceived: pickNumber(stats, ['total_revives_received', 'revivesReceived', 'revives_received'], 0),
    totalContainersLooted: pickNumber(stats, ['total_containers_looted', 'totalContainersLooted', 'containersLooted'], 0),
    totalItemsExtracted: pickNumber(stats, ['total_items_extracted', 'totalItemsExtracted', 'itemsExtracted'], 0),
    totalXp: pickNumber(stats, ['total_xp', 'totalXp', 'xp'], 0),
    demonStreak: pickNumber(stats, ['demon_streak', 'demonStreak'], 0),
  };
}

export function normalizeMetaForgeMaps(input: MetaForgeStatsInput): NormalizedMapStat[] {
  const raider = rootRaiderObject(input);
  const sourcePayload = input.mapStats ?? pick(raider, ['mapStats', 'map_stats', 'mapPerformance', 'map_performance']);
  return arrayFromPayload(sourcePayload, ['maps', 'mapStats', 'map_stats', 'mapPerformance', 'map_performance'])
    .map((row) => {
      const m = toRecord(row);
      const raids = roundWhole(pickNumber(m, ['raids', 'rounds', 'total_rounds', 'totalRounds'], 0));
      const extracted = roundWhole(pickNumber(m, ['extracted', 'extractions', 'total_extractions', 'totalExtracted'], 0));
      const deaths = roundWhole(pickNumber(m, ['deaths', 'total_deaths', 'died'], Math.max(raids - extracted, 0)));
      const totalDurationMs = roundWhole(pickNumber(m, ['totalDurationMs', 'total_duration_ms', 'durationMs'], 0));
      const totalNetValue = roundWhole(pickNumber(m, ['totalNetValue', 'netValue', 'net_profit', 'total_net_profit'], 0));
      const totalValueExtracted = roundWhole(pickNumber(m, ['totalValueExtracted', 'valueExtracted', 'lootValue'], 0));
      const totalValueBroughtIn = roundWhole(pickNumber(m, ['totalValueBroughtIn', 'valueBroughtIn', 'loadoutValue'], 0));
      return {
        mapTargetId: (pick(m, ['mapTargetId', 'map_target_id', 'mapId', 'map_id', 'id']) as string | number | null | undefined) ?? null,
        mapName: normalizeName(pick(m, ['mapName', 'map_name', 'name']), 'Unknown'),
        raids,
        extracted,
        deaths,
        totalDurationMs,
        totalNetValue,
        totalValueExtracted,
        totalValueBroughtIn,
        survivalRate: roundRate(extracted, raids),
        avgDurationMs: raids > 0 ? roundWhole(totalDurationMs / raids) : 0,
        avgNetValue: raids > 0 ? roundWhole(totalNetValue / raids) : 0,
        source: 'metaforge_map_stats' as MetaForgeStatSource,
      };
    })
    .filter((row) => row.mapName !== 'Unknown' || row.raids > 0)
    .sort((a, b) => b.raids - a.raids || b.totalNetValue - a.totalNetValue);
}

function flattenNumericBreakdown(value: unknown, prefix = ''): [string, number][] {
  const out: [string, number][] = [];
  const rec = toRecord(value);
  for (const [key, val] of Object.entries(rec)) {
    const name = normalizeBreakdownName(prefix ? `${prefix} ${key}` : key) ?? key;
    if (typeof val === 'number' || typeof val === 'string') {
      const count = numberValue(val, 0);
      if (count > 0) out.push([name, count]);
    } else if (val && typeof val === 'object') {
      out.push(...flattenNumericBreakdown(val, name));
    }
  }
  return out;
}

export function normalizeMetaForgeEnemies(input: MetaForgeStatsInput): NormalizedEnemyStat[] {
  const raider = rootRaiderObject(input);
  const sourcePayload = input.enemyStats ?? pick(raider, ['enemyStats', 'enemy_stats']);

  const rows = arrayFromPayload(sourcePayload, ['enemies', 'enemyStats', 'enemy_stats']).map((row) => {
    const e = toRecord(row);
    return {
      targetId: (pick(e, ['targetId', 'target_id', 'enemyId', 'enemy_id', 'id']) as string | number | null | undefined) ?? null,
      name: normalizeName(pick(e, ['enemy_name', 'enemyName', 'targetName', 'target_name', 'name']), 'Unknown'),
      count: roundWhole(pickNumber(e, ['kills', 'count', 'amount'], 0)),
      damage: roundWhole(pickNumber(e, ['damage', 'totalDamage', 'damageDealt'], 0)),
      source: 'metaforge_enemy_stats' as MetaForgeStatSource,
    };
  });

  const breakdownRows = flattenNumericBreakdown(pick(raider, ['arc_destroyed_breakdown', 'arcDestroyedBreakdown', 'arcKillsByType'])).map(
    ([name, count]) => ({
      targetId: null,
      name,
      count: roundWhole(count),
      damage: 0,
      source: 'metaforge_enemy_stats' as MetaForgeStatSource,
    }),
  );

  return mergeEnemyStats([...rows, ...breakdownRows]);
}

export function normalizeMetaForgeWeaponDamage(input: MetaForgeStatsInput): NormalizedWeaponStat[] {
  const raider = rootRaiderObject(input);
  const sourcePayload = input.weaponStats ?? pick(raider, ['weaponStats', 'weapon_stats']);
  return arrayFromPayload(sourcePayload, ['weapons', 'weaponStats', 'weapon_stats'])
    .map((row) => {
      const w = toRecord(row);
      return {
        weaponAssetId: (pick(w, ['weaponAssetId', 'weapon_asset_id', 'targetId', 'target_id']) as string | number | null | undefined) ?? null,
        itemId: (pick(w, ['itemId', 'item_id']) as string | number | null | undefined) ?? null,
        name: normalizeName(pick(w, ['weapon_name', 'weaponName', 'itemName', 'item_name', 'name']), 'Unknown'),
        count: 0,
        damage: roundWhole(pickNumber(w, ['damage', 'totalDamage', 'damageDealt', 'amount'], 0)),
        source: 'metaforge_weapon_stats' as MetaForgeStatSource,
      };
    })
    .filter((row) => row.name !== 'Unknown' || row.damage > 0)
    .sort((a, b) => b.damage - a.damage);
}

function normalizeRoundBreakdownRow(row: unknown): NormalizedRoundBreakdownRow | null {
  const r = toRecord(row);
  const name = normalizeBreakdownName(pick(r, ['targetName', 'enemyName', 'enemy_name', 'name', 'type', 'id', 'targetId', 'target_id']));
  if (!name) return null;
  return {
    targetId: (pick(r, ['targetId', 'target_id', 'id']) as string | number | null | undefined) ?? null,
    name,
    kills: roundWhole(pickNumber(r, ['kills', 'count', 'amount'], 0)),
    damage: roundWhole(pickNumber(r, ['damage', 'totalDamage', 'total_damage', 'damageDealt', 'damage_dealt'], 0)),
    type: pickString(r, ['type', 'enemyType', 'enemy_type'], null),
  };
}

function normalizeWeaponDamageRow(row: unknown): NormalizedWeaponDamageRow | null {
  const r = toRecord(row);
  const name = normalizeBreakdownName(pick(r, ['weaponName', 'weapon_name', 'name', 'itemName', 'item_name', 'weaponAssetId', 'weapon_asset_id']));
  if (!name) return null;
  return {
    weaponAssetId: (pick(r, ['weaponAssetId', 'weapon_asset_id', 'targetId', 'target_id']) as string | number | null | undefined) ?? null,
    itemId: (pick(r, ['itemId', 'item_id']) as string | number | null | undefined) ?? null,
    name,
    damage: roundWhole(pickNumber(r, ['damage', 'amount', 'totalDamage', 'total_damage'], 0)),
    kills: roundWhole(pickNumber(r, ['kills', 'count'], 0)),
  };
}

export function normalizeMetaForgeRound(raw: unknown, includeRaw = false): NormalizedRound {
  const r = toRecord(raw);
  const durationMs =
    pickNumber(r, ['durationMs', 'duration_ms', 'timeTopsideMs', 'time_topside_ms'], 0) ||
    numberValue(pick(r, ['duration', 'durationSeconds', 'duration_seconds', 'timeAlive']), 0) * 1000;
  const valueBroughtIn = pickNumber(r, ['valueBroughtIn', 'loadoutValue', 'loadout_value', 'value_brought_in'], 0);
  const valueExtracted = pickNumber(r, ['valueExtracted', 'lootValue', 'loot_value', 'value_extracted'], 0);
  const netValue =
    pick(r, ['netValue', 'netProfit', 'net_profit']) !== undefined
      ? pickNumber(r, ['netValue', 'netProfit', 'net_profit'], 0)
      : valueExtracted - valueBroughtIn;
  const outcome = normalizeOutcome(pick(r, ['outcome', 'status', 'extraction']));

  const arcBreakdown = asArray(pick(r, ['arcBreakdown', 'arc_breakdown', 'enemies', 'enemyKills', 'botKills']))
    .map(normalizeRoundBreakdownRow)
    .filter((row): row is NormalizedRoundBreakdownRow => Boolean(row));

  const weaponDamageBreakdown = asArray(pick(r, ['weaponDamageBreakdown', 'weaponDamage', 'damageByWeapon', 'weapon_damage_breakdown']))
    .map(normalizeWeaponDamageRow)
    .filter((row): row is NormalizedWeaponDamageRow => Boolean(row));

  const arcKillsFromBreakdown = arcBreakdown.reduce((sum, row) => {
    const lower = row.name.toLowerCase();
    if (PLAYER_TARGET_NAMES.has(lower) || SELF_TARGET_NAMES.has(lower)) return sum;
    return sum + row.kills;
  }, 0);
  const playerKillsFromBreakdown = arcBreakdown.reduce((sum, row) => {
    const lower = row.name.toLowerCase();
    return PLAYER_TARGET_NAMES.has(lower) ? sum + row.kills : sum;
  }, 0);

  const arcKills = pickNumber(r, ['arcKills', 'arc_kills', 'arcDestroyed', 'arc_destroyed', 'aiKills', 'botKills'], arcKillsFromBreakdown);
  const playerKills = pickNumber(r, ['playerKills', 'player_kills', 'pvpKills'], playerKillsFromBreakdown);
  const kills = pickNumber(r, ['kills', 'totalKills', 'total_kills'], arcKills + playerKills);

  return {
    id: pickString(r, ['id', '_id'], null),
    roundId: pickString(r, ['roundId', 'round_id', 'raidId', 'raid_id'], null),
    mapTargetId: (pick(r, ['mapTargetId', 'map_target_id', 'map', 'mapId', 'map_id']) as string | number | null | undefined) ?? null,
    mapName: normalizeName(pick(r, ['mapName', 'map_name', 'mapDisplayName', 'map_display_name']), 'Unknown'),
    outcome,
    durationMs: roundWhole(durationMs),
    valueBroughtIn: roundWhole(valueBroughtIn),
    valueExtracted: roundWhole(valueExtracted),
    netValue: roundWhole(netValue),
    kills: roundWhole(kills),
    arcKills: roundWhole(arcKills),
    playerKills: roundWhole(playerKills),
    playerDowns: roundWhole(pickNumber(r, ['playerDowns', 'player_downs', 'knocks', 'downs', 'knockdowns'], 0)),
    deaths: isFailed({ outcome }) ? 1 : roundWhole(pickNumber(r, ['deaths', 'death_count'], 0)),
    damage: roundWhole(pickNumber(r, ['damage', 'damageDealt', 'damage_dealt', 'totalDamage', 'total_damage'], 0)),
    damageTaken: roundWhole(pickNumber(r, ['damageTaken', 'damageReceived', 'damage_received', 'damage_taken'], 0)),
    healing: roundWhole(pickNumber(r, ['healthRestored', 'healing', 'healed', 'healingDone', 'health_restored'], 0)),
    revivesGiven: roundWhole(pickNumber(r, ['revivesGiven', 'revives', 'allyRevives'], 0)),
    revivesReceived: roundWhole(pickNumber(r, ['revivesReceived', 'wasRevived', 'timesRevived'], 0)),
    containersLooted: roundWhole(pickNumber(r, ['containersLooted', 'containers_looted', 'lootedContainers', 'totalContainersLooted', 'containers'], 0)),
    itemsExtracted: roundWhole(pickNumber(r, ['itemsExtracted', 'itemsExtractedCount', 'items_extracted_count', 'items_extracted', 'extractedItems'], 0)),
    score: roundWhole(pickNumber(r, ['score', 'totalScore', 'total_score'], 0)),
    xp: roundWhole(pickNumber(r, ['xp', 'experience', 'totalXp', 'total_xp'], 0)),
    isLegacy: booleanValue(pick(r, ['isLegacy', 'legacy', 'is_legacy']), false),
    syncedAt: pickString(r, ['syncedAt', 'synced_at'], null),
    createdAt: pickString(r, ['createdAt', 'created_at'], null),
    roundEndedAt: pickString(r, ['roundEndedAt', 'round_ended_at', 'endedAt', 'ended_at'], null),
    roundEndedAtPrecision: pickString(r, ['roundEndedAtPrecision', 'round_ended_at_precision'], null),
    seasonNumber:
      pick(r, ['seasonNumber', 'season_number', 'season']) === undefined
        ? null
        : roundWhole(pickNumber(r, ['seasonNumber', 'season_number', 'season'], 0)),
    linkedScreenshotRaid: booleanValue(pick(r, ['linkedScreenshotRaid', 'linked_screenshot_raid']), false),
    arcBreakdown,
    weaponDamageBreakdown,
    ...(includeRaw ? { raw } : {}),
  };
}

export function normalizeMetaForgeRounds(payload: unknown, includeRaw = false): NormalizedRound[] {
  return arrayFromPayload(payload, ['rounds', 'raids', 'matches', 'roundHistory', 'raidHistory']).map((round) =>
    normalizeMetaForgeRound(round, includeRaw),
  );
}

function aggregateTotalsFromRounds(rounds: NormalizedRound[]): NormalizedStatsTotals {
  const totals = emptyTotals();
  totals.totalRounds = rounds.length;
  for (const round of rounds) {
    totals.totalExtracted += isExtracted(round) ? 1 : 0;
    totals.totalDied += isFailed(round) ? 1 : round.deaths;
    totals.totalTimeMs += round.durationMs;
    totals.totalValueExtracted += round.valueExtracted;
    totals.totalValueBroughtIn += round.valueBroughtIn;
    totals.totalNetValue += round.netValue;
    totals.totalArcKills += round.arcKills;
    totals.totalPlayerKills += round.playerKills;
    totals.totalKills += round.kills || round.arcKills + round.playerKills;
    totals.totalDowns += round.playerDowns;
    totals.totalDamage += round.damage;
    totals.totalDamageReceived += round.damageTaken;
    totals.totalHealing += round.healing;
    totals.totalRevivesGiven += round.revivesGiven;
    totals.totalRevivesReceived += round.revivesReceived;
    totals.totalContainersLooted += round.containersLooted;
    totals.totalItemsExtracted += round.itemsExtracted;
    totals.totalXp += round.xp || round.score;
    totals.legacyRounds += round.isLegacy ? 1 : 0;
  }
  return finalizeTotals(totals, rounds);
}

function aggregateMapsFromRounds(rounds: NormalizedRound[]): NormalizedMapStat[] {
  const map = new Map<string, NormalizedMapStat>();
  for (const round of rounds) {
    const key = sourceKeyName(round.mapName, round.mapTargetId);
    const row = map.get(key) ?? {
      mapTargetId: round.mapTargetId,
      mapName: round.mapName,
      raids: 0,
      extracted: 0,
      deaths: 0,
      totalDurationMs: 0,
      totalNetValue: 0,
      totalValueExtracted: 0,
      totalValueBroughtIn: 0,
      survivalRate: 0,
      avgDurationMs: 0,
      avgNetValue: 0,
      source: 'metaforge_rounds' as MetaForgeStatSource,
    };
    row.raids += 1;
    row.extracted += isExtracted(round) ? 1 : 0;
    row.deaths += isFailed(round) ? 1 : round.deaths;
    row.totalDurationMs += round.durationMs;
    row.totalNetValue += round.netValue;
    row.totalValueExtracted += round.valueExtracted;
    row.totalValueBroughtIn += round.valueBroughtIn;
    row.survivalRate = roundRate(row.extracted, row.raids);
    row.avgDurationMs = row.raids > 0 ? roundWhole(row.totalDurationMs / row.raids) : 0;
    row.avgNetValue = row.raids > 0 ? roundWhole(row.totalNetValue / row.raids) : 0;
    map.set(key, row);
  }
  return Array.from(map.values()).sort((a, b) => b.raids - a.raids || b.totalNetValue - a.totalNetValue);
}

function aggregateEnemiesFromRounds(rounds: NormalizedRound[]): NormalizedEnemyStat[] {
  const tally = new Map<string, NormalizedEnemyStat>();
  for (const round of rounds) {
    for (const enemy of round.arcBreakdown) {
      const lower = enemy.name.toLowerCase();
      if (SELF_TARGET_NAMES.has(lower) || PLAYER_TARGET_NAMES.has(lower)) continue;
      const key = sourceKeyName(enemy.name, enemy.targetId);
      const existing = tally.get(key) ?? {
        targetId: enemy.targetId,
        name: enemy.name,
        count: 0,
        damage: 0,
        source: 'metaforge_rounds' as MetaForgeStatSource,
      };
      existing.count += enemy.kills;
      existing.damage += enemy.damage;
      tally.set(key, existing);
    }
  }
  return Array.from(tally.values()).sort((a, b) => b.count - a.count || b.damage - a.damage);
}

function aggregateWeaponDamageFromRounds(rounds: NormalizedRound[]): NormalizedWeaponStat[] {
  const tally = new Map<string, NormalizedWeaponStat>();
  for (const round of rounds) {
    for (const weapon of round.weaponDamageBreakdown) {
      const key = sourceKeyName(weapon.name, weapon.weaponAssetId ?? weapon.itemId);
      const existing = tally.get(key) ?? {
        weaponAssetId: weapon.weaponAssetId,
        itemId: weapon.itemId,
        name: weapon.name,
        count: 0,
        damage: 0,
        source: 'metaforge_rounds' as MetaForgeStatSource,
      };
      existing.damage += weapon.damage;
      existing.count += weapon.kills;
      tally.set(key, existing);
    }
  }
  return Array.from(tally.values()).sort((a, b) => b.damage - a.damage || b.count - a.count);
}

function mergeEnemyStats(groups: NormalizedEnemyStat[] | NormalizedEnemyStat[][]): NormalizedEnemyStat[] {
  const actualGroups = Array.isArray(groups[0]) ? (groups as NormalizedEnemyStat[][]) : [groups as NormalizedEnemyStat[]];
  const map = new Map<string, NormalizedEnemyStat>();
  for (const group of actualGroups) {
    for (const row of group) {
      const key = sourceKeyName(row.name, row.targetId);
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...row });
      } else if (existing.count === 0 && row.count > 0) {
        map.set(key, { ...row });
      } else if (existing.damage === 0 && row.damage > 0) {
        existing.damage = row.damage;
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count || b.damage - a.damage);
}

function mergeWeaponStats(groups: NormalizedWeaponStat[][], countIsPrimary = false): NormalizedWeaponStat[] {
  const map = new Map<string, NormalizedWeaponStat>();
  for (const group of groups) {
    for (const row of group) {
      const key = sourceKeyName(row.name, row.weaponAssetId ?? row.itemId);
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...row });
      } else if (countIsPrimary && existing.count === 0 && row.count > 0) {
        map.set(key, { ...row });
      } else if (!countIsPrimary && existing.damage === 0 && row.damage > 0) {
        map.set(key, { ...row });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    countIsPrimary ? b.count - a.count || b.damage - a.damage : b.damage - a.damage || b.count - a.count,
  );
}

function mergeMapStats(...groups: NormalizedMapStat[][]): NormalizedMapStat[] {
  const map = new Map<string, NormalizedMapStat>();
  for (const group of groups) {
    for (const row of group) {
      const key = sourceKeyName(row.mapName, row.mapTargetId);
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...row });
      } else if (existing.raids === 0 && row.raids > 0) {
        map.set(key, { ...row });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => b.raids - a.raids || b.totalNetValue - a.totalNetValue);
}

function computeDemonStreak(rounds: NormalizedRound[]): number {
  let max = 0;
  let current = 0;
  for (const round of [...rounds].reverse()) {
    if (isExtracted(round)) {
      current += 1;
      max = Math.max(max, current);
    } else if (isFailed(round)) {
      current = 0;
    }
  }
  return max;
}

function computeRaidEfficiency(rounds: NormalizedRound[]): number {
  let totalDollarsPerMinute = 0;
  let count = 0;
  for (const round of rounds) {
    if (!isExtracted(round) || round.durationMs <= 0) continue;
    totalDollarsPerMinute += round.netValue / (round.durationMs / 60000);
    count += 1;
  }
  return count ? roundWhole(totalDollarsPerMinute / count) : 0;
}

function finalizeTotals(totals: NormalizedStatsTotals, rounds: NormalizedRound[] = []): NormalizedStatsTotals {
  const totalRounds = totals.totalRounds;
  const totalDied = totals.totalDied || Math.max(totalRounds - totals.totalExtracted, 0);
  const totalKills = totals.totalKills || totals.totalArcKills + totals.totalPlayerKills;
  return {
    ...totals,
    totalDied,
    totalKills,
    survivalRate: roundRate(totals.totalExtracted, totalRounds),
    avgDurationMs: totalRounds > 0 ? roundWhole(totals.totalTimeMs / totalRounds) : 0,
    avgLootPerRaid: totalRounds > 0 ? roundWhole(totals.totalValueExtracted / totalRounds) : 0,
    avgLoadoutPerRaid: totalRounds > 0 ? roundWhole(totals.totalValueBroughtIn / totalRounds) : 0,
    avgProfitPerRaid: totalRounds > 0 ? roundWhole(totals.totalNetValue / totalRounds) : 0,
    raidEfficiency: totals.raidEfficiency || computeRaidEfficiency(rounds),
    demonStreak: totals.demonStreak || computeDemonStreak(rounds),
    kdRatio: ratio(totals.totalPlayerKills, totalDied),
    avgDamagePerRound: totalRounds > 0 ? roundWhole(totals.totalDamage / totalRounds) : 0,
  };
}

function mergeTotalsWithPriority(
  priority: Array<{ source: MetaForgeStatSource; totals: Partial<NormalizedStatsTotals> }>,
): { totals: NormalizedStatsTotals; sourceMap: Record<string, MetaForgeStatSource> } {
  const totals = emptyTotals();
  const sourceMap: Record<string, MetaForgeStatSource> = {};
  for (const { source, totals: candidate } of priority) {
    for (const key of Object.keys(totals) as Array<keyof NormalizedStatsTotals>) {
      const current = totals[key];
      const next = candidate[key];
      if ((current === 0 || current === null || current === undefined) && next !== undefined && next !== null) {
        (totals as unknown as Record<string, number>)[String(key)] = numberValue(next, 0);
        sourceMap[`totals.${String(key)}`] = source;
      }
    }
  }
  return { totals, sourceMap };
}

function normalizeIdentity(input: MetaForgeStatsInput): NormalizedPlayerIdentity {
  const raider = rootRaiderObject(input);
  const profile = toRecord(unwrapData(input.profile ?? {}));
  const username =
    pickString(raider, ['username', 'displayName', 'display_name', 'name'], null) ??
    pickString(profile, ['username', 'displayName', 'display_name', 'name'], null);
  return {
    userId: pickString(raider, ['user_id', 'userId', 'id'], null) ?? pickString(profile, ['user_id', 'userId', 'id'], null),
    discordId: input.discordId ?? pickString(raider, ['discordId', 'discord_id'], null) ?? pickString(profile, ['discordId', 'discord_id'], null),
    username,
    displayName:
      pickString(raider, ['displayName', 'display_name', 'username', 'name'], null) ??
      pickString(profile, ['displayName', 'display_name', 'username', 'name'], null) ??
      username,
    slug: input.slug ?? slugify(pick(raider, ['slug']) ?? pick(profile, ['slug']) ?? username),
    platform: pickString(raider, ['platform', 'provider'], null) ?? pickString(profile, ['platform', 'provider'], null),
    publicUuid:
      pickString(raider, ['publicUuid', 'public_uuid'], null) ?? pickString(profile, ['publicUuid', 'public_uuid'], null),
    embarkId: pickString(raider, ['embarkId', 'embark_id', 'embarkAccountId'], null) ?? pickString(profile, ['embarkId', 'embark_id', 'embarkAccountId'], null),
    metaForgeProfileId:
      pickString(raider, ['profileId', 'profile_id', 'metaForgeProfileId', 'metaforgeId', 'id'], null) ??
      pickString(profile, ['profileId', 'profile_id', 'metaForgeProfileId', 'metaforgeId', 'id'], null),
    memberSince: pickString(raider, ['memberSince', 'createdAt', 'created_at'], null) ?? pickString(profile, ['memberSince', 'createdAt', 'created_at'], null),
    playerLevel:
      pick(raider, ['playerLevel', 'player_level', 'level']) === undefined && pick(profile, ['playerLevel', 'player_level', 'level']) === undefined
        ? null
        : roundWhole(pickNumber(raider, ['playerLevel', 'player_level', 'level'], pickNumber(profile, ['playerLevel', 'player_level', 'level'], 0))),
  };
}

function buildStatSets(totals: NormalizedStatsTotals): NormalizedStatSets {
  return {
    survival: {
      raids: totals.totalRounds,
      extractions: totals.totalExtracted,
      deaths: totals.totalDied,
      survivalRate: totals.survivalRate,
      demonStreak: totals.demonStreak,
      timeTopsideMs: totals.totalTimeMs,
      avgDurationMs: totals.avgDurationMs,
    },
    economy: {
      valueExtracted: totals.totalValueExtracted,
      valueBroughtIn: totals.totalValueBroughtIn,
      netValue: totals.totalNetValue,
      avgLootPerRaid: totals.avgLootPerRaid,
      avgLoadoutPerRaid: totals.avgLoadoutPerRaid,
      avgProfitPerRaid: totals.avgProfitPerRaid,
      raidEfficiency: totals.raidEfficiency,
    },
    combat: {
      kills: totals.totalKills,
      arcKills: totals.totalArcKills,
      playerKills: totals.totalPlayerKills,
      playerDowns: totals.totalDowns,
      kdRatio: totals.kdRatio,
      damageDealt: totals.totalDamage,
      damageReceived: totals.totalDamageReceived,
      avgDamagePerRound: totals.avgDamagePerRound,
    },
    support: {
      healing: totals.totalHealing,
      revivesGiven: totals.totalRevivesGiven,
      revivesReceived: totals.totalRevivesReceived,
    },
    loot: {
      containersLooted: totals.totalContainersLooted,
      itemsExtracted: totals.totalItemsExtracted,
      xp: totals.totalXp,
    },
  };
}

function buildValueHistory(rounds: NormalizedRound[], limit = 200): ValueHistoryPoint[] {
  return [...rounds]
    .sort((a, b) => {
      const aTime = Date.parse(a.roundEndedAt ?? a.createdAt ?? a.syncedAt ?? '') || 0;
      const bTime = Date.parse(b.roundEndedAt ?? b.createdAt ?? b.syncedAt ?? '') || 0;
      return aTime - bTime;
    })
    .slice(-limit)
    .map((round, index) => ({
      roundId: round.roundId,
      label: round.mapName !== 'Unknown' ? round.mapName : `Raid ${index + 1}`,
      at: round.roundEndedAt ?? round.createdAt ?? round.syncedAt,
      valueExtracted: round.valueExtracted,
      valueBroughtIn: round.valueBroughtIn,
      netValue: round.netValue,
    }));
}

export function buildMetaForgeStats(input: MetaForgeStatsInput = {}): MetaForgeStatsContext {
  const maxRounds = input.maxRounds ?? 5000;
  const rounds = normalizeMetaForgeRounds(input.rounds, input.includeRawRounds).slice(0, maxRounds);
  const roundTotals = aggregateTotalsFromRounds(rounds);
  const metaTotals = normalizeMetaForgeTotals(input);

  const { totals: mergedRawTotals, sourceMap } = mergeTotalsWithPriority([
    { source: 'metaforge_stats', totals: metaTotals },
    { source: 'metaforge_rounds', totals: roundTotals },
  ]);
  const totals = finalizeTotals(mergedRawTotals, rounds);

  const maps = mergeMapStats(normalizeMetaForgeMaps(input), aggregateMapsFromRounds(rounds));
  const enemies = mergeEnemyStats([normalizeMetaForgeEnemies(input), aggregateEnemiesFromRounds(rounds)]);
  const weaponDamage = mergeWeaponStats([normalizeMetaForgeWeaponDamage(input), aggregateWeaponDamageFromRounds(rounds)], false);
  const weapons: NormalizedWeaponStat[] = [];

  const warnings: string[] = [];
  if (!rounds.length) warnings.push('No MetaForge round history found. Totals may be aggregate/provider-only.');
  if (!enemies.length) warnings.push('No MetaForge enemy stat rows found.');
  if (!maps.length) warnings.push('No MetaForge map stat rows found.');
  if (!weaponDamage.length) warnings.push('No MetaForge weapon damage rows found.');
  warnings.push('MetaForge weaponStats are normalized as weaponDamage, not weapon kill counts.');

  return {
    provider: 'metaforge',
    schemaVersion: 'shiesty.metaforge.stats.v1',
    generatedAt: new Date().toISOString(),
    player: normalizeIdentity(input),
    totals,
    statSets: buildStatSets(totals),
    rounds,
    maps,
    enemies,
    weapons,
    weaponDamage,
    valueHistory: buildValueHistory(rounds),
    sourceMap,
    warnings,
  };
}

export const buildMetaForgeStatsAgg = buildMetaForgeStats;
export const normalizeMetaForgeStats = buildMetaForgeStats;
export default buildMetaForgeStats;

import {
  createPlayerStatsSnapshot,
  createRoundStatsSnapshot,
  loadPlayerStatsSnapshot,
  loadRoundStatsSnapshot,
  normalizeStatsPlayerV2,
  normalizeStatsRound,
  savePlayerStatsSnapshot,
  saveRoundStatsSnapshot,
  summarizeStatsRounds,
} from '../stats/normalization';
import type {
  NormalizedRoundStats,
  RawStatsRound,
  StatBreakdownEntry,
} from '../stats/types';

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'https://api.shiesty.me';
const STATS_SERVER_BASE = (
  (import.meta.env.VITE_STATS_API_BASE_URL as string | undefined) ??
  (import.meta.env.DEV ? 'http://localhost:4000' : API_BASE)
).replace(/\/$/, '');

export interface StatsSummary {
  totalTimeMs: number;
  totalRounds: number;
  totalExtracted: number;
  totalDied: number;
  totalArcKills: number;
  totalValueExtracted: number;
  totalValueBroughtIn: number;
  totalNetValue: number;
  totalPlayerKills: number;
  totalKills: number;
  totalContainersLooted: number;
  totalXpGained: number;
  totalPlayerDowns: number;
  totalRevives: number;
  totalSquadmateRevives: number;
  totalItemsCrafted: number;
  totalDamage: number;
  totalDamageTaken: number;
  totalPlayerDamage: number;
  totalArcDamage: number;
  totalUnknownTargetKills: number;
}

export interface StatsBreakdownRow {
  name: string;
  count: number;
  itemId?: string;
}

export interface StatsRoundRow {
  roundId: string;
  mapName: string;
  outcome: 'extracted' | 'died' | 'unknown';
  durationMs: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
  playerKills: number;
  arcKills: number;
  playerDowns: number;
  revives: number;
  itemsCrafted: number;
  damage: number;
  damageTaken: number;
  containersLooted: number;
  xpGained: number;
  killsByEnemy: StatsBreakdownRow[];
  killsByWeapon: StatsBreakdownRow[];
  damageByEnemy: StatsBreakdownRow[];
  damageByWeapon: StatsBreakdownRow[];
  craftedItems: StatsBreakdownRow[];
  isLegacy?: boolean;
  seasonNumber?: number;
  roundEndedAt?: string;
}

export interface StatsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface StatsMapRow {
  key: string;
  mapName: string;
  raids: number;
  extracted: number;
  knockedOut: number;
  totalDurationMs: number;
  totalValueBroughtIn: number;
  totalValueExtracted: number;
  totalNetValue: number;
  totalArcKills: number;
  totalPlayerKills: number;
  totalDamage: number;
  totalContainersLooted: number;
  totalXpGained: number;
}

export interface StatsDashboardData {
  summary: StatsSummary;
  enemies: StatsBreakdownRow[];
  weapons: StatsBreakdownRow[];
  damageByTarget: StatsBreakdownRow[];
  damageByWeapon: StatsBreakdownRow[];
  craftedItems: StatsBreakdownRow[];
  rounds: StatsRoundRow[];
  maps: StatsMapRow[];
  unknownEvents: number;
  fetchedAt: string;
  pagination: StatsPagination;
}

type JsonObject = Record<string, unknown>;

function object(value: unknown): JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as JsonObject
    : {};
}

function body(value: unknown): JsonObject {
  const root = object(value);
  return Object.keys(object(root.data)).length > 0 ? object(root.data) : root;
}

function number(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function text(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function list(value: unknown, key: string): unknown[] {
  if (Array.isArray(value)) return value;
  const source = body(value);
  return Array.isArray(source[key]) ? source[key] : [];
}

function firstNumber(source: JsonObject, keys: readonly string[]): number {
  for (const key of keys) {
    const value = source[key];
    const parsed = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function emptySummary(): StatsSummary {
  return {
    totalTimeMs: 0,
    totalRounds: 0,
    totalExtracted: 0,
    totalDied: 0,
    totalArcKills: 0,
    totalValueExtracted: 0,
    totalValueBroughtIn: 0,
    totalNetValue: 0,
    totalPlayerKills: 0,
    totalKills: 0,
    totalContainersLooted: 0,
    totalXpGained: 0,
    totalPlayerDowns: 0,
    totalRevives: 0,
    totalSquadmateRevives: 0,
    totalItemsCrafted: 0,
    totalDamage: 0,
    totalDamageTaken: 0,
    totalPlayerDamage: 0,
    totalArcDamage: 0,
    totalUnknownTargetKills: 0,
  };
}

function emptyPagination(): StatsPagination {
  return { page: 1, limit: 50, total: 0, totalPages: 1, hasNextPage: false, hasPrevPage: false };
}

function completeSummary(value?: Partial<StatsSummary> | null): StatsSummary {
  const summary = { ...emptySummary(), ...(value ?? {}) };
  summary.totalKills = summary.totalKills || summary.totalArcKills + summary.totalPlayerKills;
  return summary;
}

function mergeSummary(primary: StatsSummary, fallback: StatsSummary): StatsSummary {
  const merged = emptySummary();
  for (const key of Object.keys(merged) as Array<keyof StatsSummary>) {
    merged[key] = primary[key] || fallback[key] || 0;
  }
  merged.totalKills = merged.totalArcKills + merged.totalPlayerKills;
  return merged;
}

function parseSummary(value: unknown): StatsSummary {
  const source = body(value);
  const totalArcKills = firstNumber(source, ['totalArcKills', 'total_arc_kills', 'arcKills']);
  const totalPlayerKills = firstNumber(source, ['totalPlayerKills', 'total_player_kills', 'playerKills']);
  const totalValueExtracted = firstNumber(source, ['totalValueExtracted', 'total_value_extracted', 'valueExtracted']);
  const totalValueBroughtIn = firstNumber(source, ['totalValueBroughtIn', 'total_value_brought_in', 'valueBroughtIn', 'loadoutValue']);
  return completeSummary({
    totalTimeMs: firstNumber(source, ['totalTimeMs', 'total_time_ms', 'durationMs', 'duration_ms']),
    totalRounds: firstNumber(source, ['totalRounds', 'total_rounds', 'roundsPlayed', 'rounds_count']),
    totalExtracted: firstNumber(source, ['totalExtracted', 'total_extracted', 'roundsExtracted']),
    totalDied: firstNumber(source, ['totalDied', 'total_died', 'roundsKnockedOut', 'deaths']),
    totalArcKills,
    totalValueExtracted,
    totalValueBroughtIn,
    totalNetValue: firstNumber(source, ['totalNetValue', 'total_net_value', 'netValue', 'netProfit']) || totalValueExtracted - totalValueBroughtIn,
    totalPlayerKills,
    totalKills: firstNumber(source, ['totalKills', 'total_kills']) || totalArcKills + totalPlayerKills,
    totalContainersLooted: firstNumber(source, ['totalContainersLooted', 'total_containers_looted', 'containersLooted']),
    totalXpGained: firstNumber(source, ['totalXpGained', 'total_xp_gained', 'xpGained', 'xp']),
    totalPlayerDowns: firstNumber(source, ['totalPlayerDowns', 'total_player_downs', 'playerDowns', 'downs']),
    totalRevives: firstNumber(source, ['totalRevives', 'total_revives', 'revives']),
    totalSquadmateRevives: firstNumber(source, ['totalSquadmateRevives', 'total_squadmate_revives', 'squadmateRevives']),
    totalItemsCrafted: firstNumber(source, ['totalItemsCrafted', 'total_items_crafted', 'itemsCrafted']),
    totalDamage: firstNumber(source, ['totalDamage', 'total_damage', 'damage', 'damageDealt']),
    totalDamageTaken: firstNumber(source, ['totalDamageTaken', 'damageTaken']),
    totalPlayerDamage: firstNumber(source, ['totalPlayerDamage', 'playerDamage']),
    totalArcDamage: firstNumber(source, ['totalArcDamage', 'arcDamage']),
    totalUnknownTargetKills: firstNumber(source, ['totalUnknownTargetKills', 'unknownTargetKills']),
  });
}

function parseBreakdown(value: unknown, key: 'enemies' | 'weapons'): StatsBreakdownRow[] {
  return list(value, key)
    .map((entry, index) => {
      const row = object(entry);
      return {
        name: text(row.name, `Unknown ${key === 'enemies' ? 'enemy' : 'weapon'} ${index + 1}`),
        count: number(row.count),
        ...(typeof row.itemId === 'string' ? { itemId: row.itemId } : {}),
      };
    })
    .sort((a, b) => b.count - a.count);
}

function rawRoundStats(row: JsonObject): readonly unknown[] | null {
  if (Array.isArray(row.stats)) return row.stats;
  if (Array.isArray(row.rawStats)) return row.rawStats;
  return null;
}

function normalizedRounds(value: unknown): NormalizedRoundStats[] {
  return list(value, 'rounds')
    .map((entry, index) => {
      const row = object(entry);
      const stats = rawRoundStats(row);
      if (!stats) return null;
      const sourceRoundId = row.roundId ?? row.id ?? index + 1;
      return normalizeStatsRound({
        ...row,
        roundId: typeof sourceRoundId === 'string' || typeof sourceRoundId === 'number' ? sourceRoundId : index + 1,
        stats: stats as RawStatsRound['stats'],
      });
    })
    .filter((round): round is NormalizedRoundStats => round !== null);
}

function roundRow(round: NormalizedRoundStats): StatsRoundRow {
  return {
    roundId: round.roundId,
    mapName: round.map?.displayName ?? 'Unknown Map',
    outcome: round.outcome === 'knockedOut' ? 'died' : round.outcome,
    durationMs: round.durationMs ?? 0,
    valueBroughtIn: round.valueBroughtIn ?? 0,
    valueExtracted: round.valueExtracted ?? 0,
    netValue: round.netValue ?? 0,
    playerKills: round.playerKills,
    arcKills: round.arcKills,
    playerDowns: round.playerDowns,
    revives: round.revives,
    itemsCrafted: round.itemsCrafted,
    damage: round.damage,
    damageTaken: round.damageTaken,
    containersLooted: round.containersLooted,
    xpGained: round.xpGained,
    killsByEnemy: breakdownRowsFromEntries(round.killsByTarget.filter((entry) => entry.target.kind === 'enemy')),
    killsByWeapon: breakdownRowsFromEntries(round.killsByWeapon),
    damageByEnemy: breakdownRowsFromEntries(round.damageByTarget.filter((entry) => entry.target.kind === 'enemy' || entry.target.kind === 'player')),
    damageByWeapon: breakdownRowsFromEntries(round.damageByWeapon),
    craftedItems: breakdownRowsFromEntries(round.craftedItems),
  };
}

function parseRounds(value: unknown, normalized: readonly NormalizedRoundStats[]): StatsRoundRow[] {
  if (normalized.length > 0) {
    const sourceRows = list(value, 'rounds').map(object);
    return normalized.map((round, index) => {
      const source = sourceRows[index] ?? {};
      return {
        ...roundRow(round),
        ...(typeof source.isLegacy === 'boolean' ? { isLegacy: source.isLegacy } : {}),
        ...(Number.isFinite(Number(source.seasonNumber)) ? { seasonNumber: Number(source.seasonNumber) } : {}),
        ...(typeof source.roundEndedAt === 'string' ? { roundEndedAt: source.roundEndedAt } : {}),
      };
    });
  }
  return list(value, 'rounds').map((entry, index) => {
    const row = object(entry);
    const rawOutcome = text(row.outcome, '').toLowerCase();
    const extracted = rawOutcome === 'extracted';
    const died = rawOutcome === 'died' || rawOutcome === 'failed';
    const valueBroughtIn = number(row.valueBroughtIn);
    const valueExtracted = number(row.valueExtracted);
    return {
      roundId: row.roundId === null || row.roundId === undefined
        ? row.id === null || row.id === undefined ? String(index + 1) : String(row.id)
        : String(row.roundId),
      mapName: text(row.mapName, 'Unknown Map'),
      outcome: extracted ? 'extracted' : died ? 'died' : 'unknown',
      durationMs: number(row.durationMs),
      valueBroughtIn,
      valueExtracted,
      netValue: Number.isFinite(Number(row.netValue)) ? number(row.netValue) : valueExtracted - valueBroughtIn,
      playerKills: number(row.playerKills),
      arcKills: number(row.arcKills),
      playerDowns: number(row.playerDowns),
      revives: number(row.revives),
      itemsCrafted: number(row.itemsCrafted),
      damage: number(row.damage),
      damageTaken: number(row.damageTaken),
      containersLooted: number(row.containersLooted),
      xpGained: number(row.xpGained),
      killsByEnemy: [],
      killsByWeapon: [],
      damageByEnemy: [],
      damageByWeapon: [],
      craftedItems: [],
      ...(typeof row.isLegacy === 'boolean' ? { isLegacy: row.isLegacy } : {}),
      ...(Number.isFinite(Number(row.seasonNumber)) ? { seasonNumber: Number(row.seasonNumber) } : {}),
      ...(typeof row.roundEndedAt === 'string' ? { roundEndedAt: row.roundEndedAt } : {}),
    };
  });
}

function summaryFromNormalizedRounds(rounds: readonly NormalizedRoundStats[]): StatsSummary {
  const base = summarizeStatsRounds(rounds);
  const summary = completeSummary({
    totalTimeMs: base.durationMs,
    totalRounds: base.roundsPlayed,
    totalExtracted: base.roundsExtracted,
    totalDied: base.roundsKnockedOut,
    totalArcKills: base.arcKills,
    totalValueExtracted: base.valueExtracted,
    totalValueBroughtIn: base.valueBroughtIn,
    totalNetValue: base.netValue,
    totalPlayerKills: base.playerKills,
    totalContainersLooted: base.containersLooted,
    totalXpGained: base.xpGained,
    totalPlayerDowns: base.playerDowns,
    totalRevives: base.revives,
    totalItemsCrafted: base.itemsCrafted,
    totalDamage: base.damage,
    totalDamageTaken: rounds.reduce((sum, round) => sum + round.damageTaken, 0),
  });
  for (const round of rounds) {
    summary.totalPlayerDamage += round.playerDamage;
    summary.totalArcDamage += round.arcDamage;
    summary.totalSquadmateRevives += round.squadmateRevives;
    summary.totalUnknownTargetKills += round.unknownTargetKills;
  }
  summary.totalKills = summary.totalArcKills + summary.totalPlayerKills;
  return summary;
}

function summaryFromLegacyRounds(value: unknown): StatsSummary {
  const parsed = parseRounds(value, []);
  return parsed.reduce<StatsSummary>((summary, round) => {
    summary.totalRounds += 1;
    if (round.outcome === 'extracted') summary.totalExtracted += 1;
    if (round.outcome === 'died') summary.totalDied += 1;
    summary.totalTimeMs += round.durationMs;
    summary.totalArcKills += round.arcKills;
    summary.totalPlayerKills += round.playerKills;
    summary.totalDamage += round.damage;
    summary.totalDamageTaken += round.damageTaken;
    summary.totalContainersLooted += round.containersLooted;
    summary.totalValueExtracted += round.valueExtracted;
    summary.totalValueBroughtIn += round.valueBroughtIn;
    summary.totalNetValue += round.netValue;
    summary.totalXpGained += round.xpGained;
    summary.totalKills = summary.totalArcKills + summary.totalPlayerKills;
    return summary;
  }, emptySummary());
}

function breakdownRowsFromEntries(entries: readonly StatBreakdownEntry[]): StatsBreakdownRow[] {
  const byKey = new Map<string, StatsBreakdownRow>();
  for (const entry of entries) {
    const key = `${entry.target.kind}:${String(entry.target.sourceId)}:${entry.target.displayName}`;
    const current = byKey.get(key);
    if (current) current.count += entry.amount;
    else byKey.set(key, {
      name: entry.target.displayName,
      count: entry.amount,
      ...(entry.target.itemId ? { itemId: entry.target.itemId } : {}),
    });
  }
  return [...byKey.values()].sort((a, b) => b.count - a.count);
}

function breakdownFromRounds(
  rounds: readonly NormalizedRoundStats[],
  select: (round: NormalizedRoundStats) => readonly StatBreakdownEntry[],
): StatsBreakdownRow[] {
  return breakdownRowsFromEntries(rounds.flatMap((round) => [...select(round)]));
}

function parseMaps(value: unknown): StatsMapRow[] {
  return list(value, 'maps').map((entry, index) => {
    const row = object(entry);
    const mapName = text(row.mapName, 'Unknown Map');
    const totalValueExtracted = firstNumber(row, ['totalValueExtracted', 'valueExtracted']);
    const totalValueBroughtIn = firstNumber(row, ['totalValueBroughtIn', 'valueBroughtIn']);
    return {
      key: row.mapTargetId === null || row.mapTargetId === undefined
        ? `${mapName}-${index}`
        : String(row.mapTargetId),
      mapName,
      raids: number(row.raids),
      extracted: number(row.extracted),
      knockedOut: firstNumber(row, ['knockedOut', 'died', 'deaths']),
      totalDurationMs: number(row.totalDurationMs),
      totalValueBroughtIn,
      totalValueExtracted,
      totalNetValue: number(row.totalNetValue) || totalValueExtracted - totalValueBroughtIn,
      totalArcKills: firstNumber(row, ['totalArcKills', 'arcKills']),
      totalPlayerKills: firstNumber(row, ['totalPlayerKills', 'playerKills']),
      totalDamage: firstNumber(row, ['totalDamage', 'damage']),
      totalContainersLooted: firstNumber(row, ['totalContainersLooted', 'containersLooted']),
      totalXpGained: firstNumber(row, ['totalXpGained', 'xpGained']),
    };
  });
}

function mapsFromRounds(rounds: readonly NormalizedRoundStats[]): StatsMapRow[] {
  const maps = new Map<string, StatsMapRow>();
  for (const round of rounds) {
    const mapName = round.map?.displayName ?? 'Unknown Map';
    const key = round.map?.sourceId === null || round.map?.sourceId === undefined
      ? mapName
      : String(round.map.sourceId);
    const current = maps.get(key) ?? {
      key,
      mapName,
      raids: 0,
      extracted: 0,
      knockedOut: 0,
      totalDurationMs: 0,
      totalValueBroughtIn: 0,
      totalValueExtracted: 0,
      totalNetValue: 0,
      totalArcKills: 0,
      totalPlayerKills: 0,
      totalDamage: 0,
      totalContainersLooted: 0,
      totalXpGained: 0,
    };
    current.raids += 1;
    if (round.extracted === true) current.extracted += 1;
    if (round.extracted === false) current.knockedOut += 1;
    current.totalDurationMs += round.durationMs ?? 0;
    current.totalValueBroughtIn += round.valueBroughtIn ?? 0;
    current.totalValueExtracted += round.valueExtracted ?? 0;
    current.totalNetValue += round.netValue ?? 0;
    current.totalArcKills += round.arcKills;
    current.totalPlayerKills += round.playerKills;
    current.totalDamage += round.damage;
    current.totalContainersLooted += round.containersLooted;
    current.totalXpGained += round.xpGained;
    maps.set(key, current);
  }
  return [...maps.values()].sort((a, b) => b.raids - a.raids);
}

function completeDashboard(value: Partial<StatsDashboardData>): StatsDashboardData {
  return {
    summary: completeSummary(value.summary),
    enemies: value.enemies ?? [],
    weapons: value.weapons ?? [],
    damageByTarget: value.damageByTarget ?? [],
    damageByWeapon: value.damageByWeapon ?? [],
    craftedItems: value.craftedItems ?? [],
    rounds: value.rounds ?? [],
    maps: value.maps ?? [],
    unknownEvents: value.unknownEvents ?? 0,
    fetchedAt: value.fetchedAt ?? new Date().toISOString(),
    pagination: value.pagination ?? emptyPagination(),
  };
}

function parsePagination(value: unknown): StatsPagination {
  const source = object(value);
  const fallback = emptyPagination();
  return {
    page: Math.max(1, number(source.page) || fallback.page),
    limit: Math.max(1, number(source.limit) || fallback.limit),
    total: Math.max(0, number(source.total)),
    totalPages: Math.max(1, number(source.totalPages) || fallback.totalPages),
    hasNextPage: source.hasNextPage === true,
    hasPrevPage: source.hasPrevPage === true,
  };
}

export function normalizeStatsDashboardPayloads(payloads: {
  summary: unknown;
  enemies: unknown;
  weapons: unknown;
  rounds: unknown;
  maps: unknown;
  fetchedAt?: string;
  pagination?: unknown;
}): StatsDashboardData {
  const aggregate = normalizeStatsPlayerV2(body(payloads.summary));
  const normalized = normalizedRounds(payloads.rounds);
  const providerSummary = aggregate ? completeSummary({
    totalTimeMs: aggregate.durationMs,
    totalRounds: aggregate.roundsPlayed,
    totalExtracted: aggregate.roundsExtracted,
    totalDied: aggregate.roundsKnockedOut,
    totalArcKills: aggregate.arcKills,
    totalValueExtracted: aggregate.valueExtracted,
    totalValueBroughtIn: aggregate.valueBroughtIn,
    totalNetValue: aggregate.netValue,
    totalPlayerKills: aggregate.playerKills,
    totalContainersLooted: aggregate.containersLooted,
    totalPlayerDowns: aggregate.playerDowns,
    totalSquadmateRevives: aggregate.squadmateRevives,
    totalRevives: aggregate.squadmateRevives + aggregate.strangerRevives,
    totalItemsCrafted: aggregate.itemsCrafted,
    totalDamage: aggregate.damage,
    totalDamageTaken: 0,
  }) : parseSummary(payloads.summary);
  const roundSummary = normalized.length > 0 ? summaryFromNormalizedRounds(normalized) : summaryFromLegacyRounds(payloads.rounds);
  const summary = mergeSummary(providerSummary, roundSummary);
  const enemies = parseBreakdown(payloads.enemies, 'enemies');
  const weapons = parseBreakdown(payloads.weapons, 'weapons');
  const roundRows = parseRounds(payloads.rounds, normalized);
  const endpointMaps = parseMaps(payloads.maps);
  const normalizedMaps = mapsFromRounds(normalized);
  const unknownEvents = normalized.reduce((total, round) => total + round.unknownEvents.length, aggregate?.unknownEvents.length ?? 0);
  return completeDashboard({
    summary,
    enemies: enemies.length > 0 ? enemies : aggregate?.enemyKills.map((row) => ({
      name: row.target.displayName,
      count: row.amount,
      ...(row.target.itemId ? { itemId: row.target.itemId } : {}),
    })).sort((a, b) => b.count - a.count) ?? [],
    weapons: weapons.length > 0 ? weapons : aggregate?.weaponKills.map((row) => ({
      name: row.target.displayName,
      count: row.amount,
      ...(row.target.itemId ? { itemId: row.target.itemId } : {}),
    })).sort((a, b) => b.count - a.count) ?? [],
    damageByTarget: breakdownFromRounds(normalized, (round) => round.damageByTarget),
    damageByWeapon: breakdownFromRounds(normalized, (round) => round.damageByWeapon),
    craftedItems: breakdownFromRounds(normalized, (round) => round.craftedItems),
    rounds: roundRows,
    maps: normalizedMaps.length > 0 ? normalizedMaps : endpointMaps.length > 0 ? endpointMaps : aggregate?.mapPerformance.map((row, index) => ({
      key: row.map.sourceId === null ? `${row.map.displayName}-${index}` : String(row.map.sourceId),
      mapName: row.map.displayName,
      raids: row.roundsPlayed,
      extracted: row.roundsExtracted,
      knockedOut: row.roundsKnockedOut,
      totalDurationMs: row.durationMs,
      totalValueBroughtIn: row.valueBroughtIn,
      totalValueExtracted: row.valueExtracted,
      totalNetValue: row.netValue,
      totalArcKills: 0,
      totalPlayerKills: 0,
      totalDamage: 0,
      totalContainersLooted: 0,
      totalXpGained: 0,
    })) ?? [],
    unknownEvents,
    fetchedAt: payloads.fetchedAt ?? new Date().toISOString(),
    pagination: parsePagination(payloads.pagination),
  });
}

export interface StatsQuery {
  page?: number;
  limit?: number;
  outcome?: 'all' | 'extracted' | 'died' | 'unknown';
  map?: string;
  season?: number;
  dateFrom?: string;
  dateTo?: string;
  sort?: 'newest' | 'oldest' | 'value_desc' | 'value_asc';
}

export async function fetchStatsOverviewRaw(options: StatsQuery = {}): Promise<JsonObject> {
  const query = new URLSearchParams({
    page: String(Math.max(1, options.page ?? 1)),
    limit: String(Math.min(200, Math.max(1, options.limit ?? 50))),
  });
  if (options.outcome && options.outcome !== 'all') query.set('outcome', options.outcome);
  if (options.map && options.map !== 'all') query.set('map', options.map);
  if (options.season !== undefined) query.set('season', String(options.season));
  if (options.dateFrom) query.set('dateFrom', options.dateFrom);
  if (options.dateTo) query.set('dateTo', options.dateTo);
  if (options.sort) query.set('sort', options.sort);
  const response = await fetch(`${STATS_SERVER_BASE}/api/stats/overview?${query.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    const errorBody = object(await response.json().catch(() => ({})));
    throw new Error(
      typeof errorBody.error === 'string'
        ? errorBody.error
        : `Failed to load stats: ${response.status}`,
    );
  }

  return object(await response.json());
}

export async function fetchStatsDashboard(options: StatsQuery = {}): Promise<StatsDashboardData> {
  const overview = await fetchStatsOverviewRaw(options);
  const dashboard = normalizeStatsDashboardPayloads({
    summary: overview.summary ?? overview,
    enemies: overview.enemies,
    weapons: overview.weapons ?? overview.topWeapons,
    rounds: overview.rounds ?? overview.recentRounds,
    maps: overview.maps ?? overview.mapPerformance,
    pagination: object(overview.pagination).rounds,
    fetchedAt: typeof overview.fetchedAt === 'string'
      ? overview.fetchedAt
      : typeof overview.lastSyncAt === 'string'
        ? overview.lastSyncAt
        : new Date().toISOString(),
  });

  const snapshot = createPlayerStatsSnapshot(
    body(overview.summary ?? overview),
    'arctracker',
    dashboard.fetchedAt,
  );
  snapshot.raw.dashboard = dashboard;
  savePlayerStatsSnapshot(snapshot);

  const rawRounds = list(overview.rounds ?? overview.recentRounds, 'rounds')
    .map((value, index) => {
      const round = object(value);
      const stats = Array.isArray(round.stats)
        ? round.stats
        : Array.isArray(round.rawStats)
          ? round.rawStats
          : null;
      if (!stats) return null;
      const roundId = round.roundId ?? round.id ?? String(index + 1);
      return {
        ...round,
        roundId: typeof roundId === 'string' || typeof roundId === 'number'
          ? roundId
          : String(index + 1),
        stats,
      } as RawStatsRound;
    })
    .filter((round): round is RawStatsRound => round !== null);

  if (rawRounds.length > 0) {
    saveRoundStatsSnapshot(createRoundStatsSnapshot(rawRounds, 'arctracker', dashboard.fetchedAt));
  }

  return dashboard;
}

export function loadCachedStatsDashboard(): StatsDashboardData | null {
  const cached = loadPlayerStatsSnapshot();
  const dashboard = cached?.raw.dashboard;
  if (dashboard && typeof dashboard === 'object') {
    const value = dashboard as Partial<StatsDashboardData>;
    if (value.summary && Array.isArray(value.rounds) && Array.isArray(value.maps)) return completeDashboard(value);
  }
  if (!cached) return null;
  const roundsSnapshot = loadRoundStatsSnapshot();
  const aggregate = cached.aggregate;
  const totals = cached.totals;
  const roundSummary = roundsSnapshot?.summary;
  const rounds = roundsSnapshot?.rounds ?? [];
  return completeDashboard({
    summary: {
      totalTimeMs: aggregate?.durationMs || roundSummary?.durationMs || totals.durationMs,
      totalRounds: aggregate?.roundsPlayed || roundSummary?.roundsPlayed || 0,
      totalExtracted: aggregate?.roundsExtracted || roundSummary?.roundsExtracted || 0,
      totalDied: aggregate?.roundsKnockedOut || roundSummary?.roundsKnockedOut || 0,
      totalArcKills: aggregate?.arcKills || roundSummary?.arcKills || totals.arcKills,
      totalValueExtracted: aggregate?.valueExtracted || roundSummary?.valueExtracted || totals.lootValue,
      totalValueBroughtIn: aggregate?.valueBroughtIn || roundSummary?.valueBroughtIn || totals.loadoutValue,
      totalNetValue: aggregate?.netValue || roundSummary?.netValue || totals.lootValue - totals.loadoutValue,
      totalPlayerKills: aggregate?.playerKills || roundSummary?.playerKills || totals.playerKills,
      totalKills: (aggregate?.arcKills || roundSummary?.arcKills || totals.arcKills) + (aggregate?.playerKills || roundSummary?.playerKills || totals.playerKills),
      totalContainersLooted: aggregate?.containersLooted || roundSummary?.containersLooted || totals.containersLooted,
      totalXpGained: roundSummary?.xpGained || 0,
      totalPlayerDowns: aggregate?.playerDowns || roundSummary?.playerDowns || 0,
      totalRevives: (aggregate?.squadmateRevives ?? 0) + (aggregate?.strangerRevives ?? 0) || roundSummary?.revives || 0,
      totalSquadmateRevives: aggregate?.squadmateRevives || rounds.reduce((sum, round) => sum + round.squadmateRevives, 0),
      totalItemsCrafted: aggregate?.itemsCrafted || roundSummary?.itemsCrafted || 0,
      totalDamage: aggregate?.damage || roundSummary?.damage || totals.damage,
      totalDamageTaken: rounds.reduce((sum, round) => sum + round.damageTaken, 0),
      totalPlayerDamage: rounds.reduce((sum, round) => sum + round.playerDamage, 0),
      totalArcDamage: rounds.reduce((sum, round) => sum + round.arcDamage, 0),
      totalUnknownTargetKills: rounds.reduce((sum, round) => sum + round.unknownTargetKills, 0),
    },
    enemies: aggregate?.enemyKills.map((row) => ({ name: row.target.displayName, count: row.amount, ...(row.target.itemId ? { itemId: row.target.itemId } : {}) })).sort((a, b) => b.count - a.count) ?? [],
    weapons: aggregate?.weaponKills.map((row) => ({ name: row.target.displayName, count: row.amount, ...(row.target.itemId ? { itemId: row.target.itemId } : {}) })).sort((a, b) => b.count - a.count) ?? [],
    damageByTarget: breakdownFromRounds(rounds, (round) => round.damageByTarget),
    damageByWeapon: breakdownFromRounds(rounds, (round) => round.damageByWeapon),
    craftedItems: breakdownFromRounds(rounds, (round) => round.craftedItems),
    rounds: rounds.map(roundRow),
    maps: mapsFromRounds(rounds).length > 0 ? mapsFromRounds(rounds) : aggregate?.mapPerformance.map((row, index) => ({ key: row.map.sourceId === null ? `${row.map.displayName}-${index}` : String(row.map.sourceId), mapName: row.map.displayName, raids: row.roundsPlayed, extracted: row.roundsExtracted, knockedOut: row.roundsKnockedOut, totalDurationMs: row.durationMs, totalValueBroughtIn: row.valueBroughtIn, totalValueExtracted: row.valueExtracted, totalNetValue: row.netValue, totalArcKills: 0, totalPlayerKills: 0, totalDamage: 0, totalContainersLooted: 0, totalXpGained: 0 })) ?? [],
    unknownEvents: (aggregate?.unknownEvents.length ?? 0) + rounds.reduce((sum, round) => sum + round.unknownEvents.length, 0),
    fetchedAt: roundsSnapshot?.fetchedAt ?? cached.fetchedAt,
  });
}

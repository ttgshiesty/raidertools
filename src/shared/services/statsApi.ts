import { getIdToken } from '../auth/cognitoClient';
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
const STATS_BASE = `${API_BASE}/me/arctracker/embark/stats`;

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
  damage: number;
  containersLooted: number;
  xpGained: number;
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
    totalPlayerDamage: 0,
    totalArcDamage: 0,
    totalUnknownTargetKills: 0,
  };
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
    damage: round.damage,
    containersLooted: round.containersLooted,
    xpGained: round.xpGained,
  };
}

function parseRounds(value: unknown, normalized: readonly NormalizedRoundStats[]): StatsRoundRow[] {
  if (normalized.length > 0) return normalized.map(roundRow);
  return list(value, 'rounds').map((entry, index) => {
    const row = object(entry);
    const rawOutcome = text(row.outcome ?? row.status, '').toLowerCase();
    const extracted = row.extracted === true || ['extracted', 'survived', 'returned safely'].includes(rawOutcome);
    const died = row.extracted === false || ['died', 'kia', 'knockedout', 'knocked out'].includes(rawOutcome);
    const valueBroughtIn = firstNumber(row, ['valueBroughtIn', 'loadoutValue', 'broughtInValue']);
    const valueExtracted = firstNumber(row, ['valueExtracted', 'lootValue', 'extractedValue']);
    return {
      roundId: row.roundId === null || row.roundId === undefined
        ? row.id === null || row.id === undefined ? String(index + 1) : String(row.id)
        : String(row.roundId),
      mapName: text(row.mapName ?? row.map, 'Unknown Map'),
      outcome: extracted ? 'extracted' : died ? 'died' : 'unknown',
      durationMs: firstNumber(row, ['durationMs', 'totalDurationMs']) || firstNumber(row, ['duration', 'durationSeconds']) * 1000,
      valueBroughtIn,
      valueExtracted,
      netValue: firstNumber(row, ['netValue', 'netProfit', 'profit']) || valueExtracted - valueBroughtIn,
      playerKills: firstNumber(row, ['playerKills', 'pvpKills']),
      arcKills: firstNumber(row, ['arcKills', 'arcDestroyed']),
      damage: firstNumber(row, ['damage', 'damageDealt', 'totalDamage']),
      containersLooted: firstNumber(row, ['containersLooted', 'lootedContainers', 'containers']),
      xpGained: firstNumber(row, ['xpGained', 'xp']),
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
  };
}

export function normalizeStatsDashboardPayloads(payloads: {
  summary: unknown;
  enemies: unknown;
  weapons: unknown;
  rounds: unknown;
  maps: unknown;
  fetchedAt?: string;
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
  });
}

async function request(path: string, token: string): Promise<unknown> {
  const response = await fetch(`${STATS_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || `Stats request failed with HTTP ${response.status}`);
  }
  return response.json() as Promise<unknown>;
}

export async function fetchStatsDashboard(): Promise<StatsDashboardData> {
  const token = await getIdToken();
  if (!token) throw new Error('Sign in to view stats.');

  const results = await Promise.allSettled([
    request('/summary', token), request('/enemy-kills', token), request('/weapon-kills', token),
    request('/rounds?limit=200', token), request('/map-performance', token),
  ]);
  const successful = results.filter((result): result is PromiseFulfilledResult<unknown> => result.status === 'fulfilled');
  if (successful.length === 0) {
    const firstFailure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected');
    throw firstFailure?.reason instanceof Error ? firstFailure.reason : new Error('Unable to load stats.');
  }
  const value = (index: number, fallback: unknown) => results[index].status === 'fulfilled' ? results[index].value : fallback;
  const summary = value(0, {}); const enemies = value(1, { enemies: [] }); const weapons = value(2, { weapons: [] });
  const rounds = value(3, { rounds: [] }); const maps = value(4, { maps: [] });
  const dashboard = normalizeStatsDashboardPayloads({ summary, enemies, weapons, rounds, maps });
  const snapshot = createPlayerStatsSnapshot(body(summary), 'arctracker', dashboard.fetchedAt);
  snapshot.raw.dashboard = dashboard;
  savePlayerStatsSnapshot(snapshot);
  const rawRounds = list(rounds, 'rounds').filter((round): round is RawStatsRound => {
    const row = object(round);
    return Array.isArray(row.stats) || Array.isArray(row.rawStats);
  }).map((round, index) => { const row = object(round); return { ...round, roundId: round.roundId ?? String(index + 1), stats: Array.isArray(row.stats) ? row.stats : Array.isArray(row.rawStats) ? row.rawStats : [] }; });
  if (rawRounds.length > 0) saveRoundStatsSnapshot(createRoundStatsSnapshot(rawRounds, 'arctracker', dashboard.fetchedAt));
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
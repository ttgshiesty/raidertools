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
} from '../stats/normalization';
import type { RawStatsRound } from '../stats/types';

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
  totalNetValue: number;
  totalPlayerKills: number;
  totalContainersLooted: number;
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
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
}

export interface StatsMapRow {
  key: string;
  mapName: string;
  raids: number;
  extracted: number;
  totalDurationMs: number;
  totalNetValue: number;
}

export interface StatsDashboardData {
  summary: StatsSummary;
  enemies: StatsBreakdownRow[];
  weapons: StatsBreakdownRow[];
  rounds: StatsRoundRow[];
  maps: StatsMapRow[];
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

function parseSummary(value: unknown): StatsSummary {
  const source = body(value);
  return {
    totalTimeMs: firstNumber(source, ['totalTimeMs', 'total_time_ms', 'durationMs', 'duration_ms']),
    totalRounds: firstNumber(source, ['totalRounds', 'total_rounds', 'roundsPlayed', 'rounds_count']),
    totalExtracted: firstNumber(source, ['totalExtracted', 'total_extracted', 'roundsExtracted']),
    totalDied: firstNumber(source, ['totalDied', 'total_died', 'roundsKnockedOut', 'deaths']),
    totalArcKills: firstNumber(source, ['totalArcKills', 'total_arc_kills', 'arcKills']),
    totalValueExtracted: firstNumber(source, ['totalValueExtracted', 'total_value_extracted', 'valueExtracted']),
    totalNetValue: firstNumber(source, ['totalNetValue', 'total_net_value', 'netValue', 'netProfit']),
    totalPlayerKills: firstNumber(source, ['totalPlayerKills', 'total_player_kills', 'playerKills']),
    totalContainersLooted: firstNumber(source, ['totalContainersLooted', 'total_containers_looted', 'containersLooted']),
  };
}

function parseBreakdown(value: unknown, key: 'enemies' | 'weapons'): StatsBreakdownRow[] {
  return list(value, key).map((entry, index) => {
    const row = object(entry);
    return {
      name: text(row.name, `Unknown ${key === 'enemies' ? 'enemy' : 'weapon'} ${index + 1}`),
      count: number(row.count),
      ...(typeof row.itemId === 'string' ? { itemId: row.itemId } : {}),
    };
  });
}

function parseRounds(value: unknown): StatsRoundRow[] {
  return list(value, 'rounds').map((entry, index) => {
    const row = object(entry);
    const rawStats = Array.isArray(row.stats) ? row.stats : Array.isArray(row.rawStats) ? row.rawStats : null;
    if (rawStats) {
      const sourceRoundId = row.roundId ?? row.id;
      const roundId = typeof sourceRoundId === 'string' || typeof sourceRoundId === 'number'
        ? sourceRoundId
        : index + 1;
      const normalized = normalizeStatsRound({
        ...row,
        roundId,
        stats: rawStats,
      } as RawStatsRound);
      return {
        roundId: normalized.roundId,
        mapName: normalized.map?.displayName ?? 'Unknown Map',
        outcome: normalized.outcome === 'knockedOut' ? 'died' : normalized.outcome,
        valueBroughtIn: normalized.valueBroughtIn ?? 0,
        valueExtracted: normalized.valueExtracted ?? 0,
        netValue: normalized.netValue ?? 0,
      };
    }
    const rawOutcome = text(row.outcome ?? row.status, '').toLowerCase();
    const extracted = row.extracted === true || ['extracted', 'survived', 'returned safely'].includes(rawOutcome);
    const died = row.extracted === false || ['died', 'kia', 'knockedout', 'knocked out'].includes(rawOutcome);
    return {
      roundId: row.roundId === null || row.roundId === undefined
        ? row.id === null || row.id === undefined ? String(index + 1) : String(row.id)
        : String(row.roundId),
      mapName: text(row.mapName ?? row.map, 'Unknown Map'),
      outcome: extracted ? 'extracted' : died ? 'died' : 'unknown',
      valueBroughtIn: firstNumber(row, ['valueBroughtIn', 'loadoutValue', 'broughtInValue']),
      valueExtracted: firstNumber(row, ['valueExtracted', 'lootValue', 'extractedValue']),
      netValue: firstNumber(row, ['netValue', 'netProfit', 'profit'])
        || firstNumber(row, ['valueExtracted', 'lootValue', 'extractedValue']) - firstNumber(row, ['valueBroughtIn', 'loadoutValue', 'broughtInValue']),
    };
  });
}

function summaryFromRounds(value: unknown): StatsSummary {
  const rows = list(value, 'rounds');
  const parsed = parseRounds(value);
  return rows.reduce<StatsSummary>((summary, entry, index) => {
    const row = object(entry);
    const parsedRound = parsed[index];
    summary.totalRounds += 1;
    if (parsedRound?.outcome === 'extracted') summary.totalExtracted += 1;
    if (parsedRound?.outcome === 'died') summary.totalDied += 1;
    summary.totalTimeMs += firstNumber(row, ['durationMs', 'totalDurationMs']) || firstNumber(row, ['duration', 'durationSeconds']) * 1000;
    summary.totalArcKills += firstNumber(row, ['arcKills', 'arcDestroyed']);
    summary.totalPlayerKills += firstNumber(row, ['playerKills', 'pvpKills']);
    summary.totalContainersLooted += firstNumber(row, ['containersLooted', 'lootedContainers', 'containers']);
    summary.totalValueExtracted += parsedRound?.valueExtracted ?? 0;
    summary.totalNetValue += parsedRound?.netValue ?? 0;
    return summary;
  }, { totalTimeMs: 0, totalRounds: 0, totalExtracted: 0, totalDied: 0, totalArcKills: 0, totalValueExtracted: 0, totalNetValue: 0, totalPlayerKills: 0, totalContainersLooted: 0 });
}

function parseMaps(value: unknown): StatsMapRow[] {
  return list(value, 'maps').map((entry, index) => {
    const row = object(entry);
    const mapName = text(row.mapName, 'Unknown Map');
    return {
      key: row.mapTargetId === null || row.mapTargetId === undefined
        ? `${mapName}-${index}`
        : String(row.mapTargetId),
      mapName,
      raids: number(row.raids),
      extracted: number(row.extracted),
      totalDurationMs: number(row.totalDurationMs),
      totalNetValue: number(row.totalNetValue),
    };
  });
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
  const providerSummary = aggregate ? {
    totalTimeMs: aggregate.durationMs,
    totalRounds: aggregate.roundsPlayed,
    totalExtracted: aggregate.roundsExtracted,
    totalDied: aggregate.roundsKnockedOut,
    totalArcKills: aggregate.arcKills,
    totalValueExtracted: aggregate.valueExtracted,
    totalNetValue: aggregate.netValue,
    totalPlayerKills: aggregate.playerKills,
    totalContainersLooted: aggregate.containersLooted,
  } : parseSummary(payloads.summary);
  const roundSummary = summaryFromRounds(payloads.rounds);
  const summary = Object.fromEntries(Object.entries(providerSummary).map(([key, value]) => [key, value || roundSummary[key as keyof StatsSummary] || 0])) as unknown as StatsSummary;
  const enemies = parseBreakdown(payloads.enemies, 'enemies');
  const weapons = parseBreakdown(payloads.weapons, 'weapons');
  const maps = parseMaps(payloads.maps);
  return {
    summary,
    enemies: enemies.length > 0 ? enemies : aggregate?.enemyKills.map((row) => ({
      name: row.target.displayName,
      count: row.amount,
      ...(row.target.itemId ? { itemId: row.target.itemId } : {}),
    })) ?? [],
    weapons: weapons.length > 0 ? weapons : aggregate?.weaponKills.map((row) => ({
      name: row.target.displayName,
      count: row.amount,
      ...(row.target.itemId ? { itemId: row.target.itemId } : {}),
    })) ?? [],
    rounds: parseRounds(payloads.rounds),
    maps: maps.length > 0 ? maps : aggregate?.mapPerformance.map((row, index) => ({
      key: row.map.sourceId === null ? `${row.map.displayName}-${index}` : String(row.map.sourceId),
      mapName: row.map.displayName,
      raids: row.roundsPlayed,
      extracted: row.roundsExtracted,
      totalDurationMs: row.durationMs,
      totalNetValue: row.netValue,
    })) ?? [],
    fetchedAt: payloads.fetchedAt ?? new Date().toISOString(),
  };
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
    if (value.summary && Array.isArray(value.rounds) && Array.isArray(value.maps)) return value as StatsDashboardData;
  }
  if (!cached) return null;
  const roundsSnapshot = loadRoundStatsSnapshot();
  const aggregate = cached.aggregate;
  const totals = cached.totals;
  const roundSummary = roundsSnapshot?.summary;
  return {
    summary: {
      totalTimeMs: aggregate?.durationMs || roundSummary?.durationMs || totals.durationMs,
      totalRounds: aggregate?.roundsPlayed || roundSummary?.roundsPlayed || 0,
      totalExtracted: aggregate?.roundsExtracted || roundSummary?.roundsExtracted || 0,
      totalDied: aggregate?.roundsKnockedOut || roundSummary?.roundsKnockedOut || 0,
      totalArcKills: aggregate?.arcKills || roundSummary?.arcKills || totals.arcKills,
      totalValueExtracted: aggregate?.valueExtracted || roundSummary?.valueExtracted || totals.lootValue,
      totalNetValue: aggregate?.netValue || roundSummary?.netValue || totals.lootValue - totals.loadoutValue,
      totalPlayerKills: aggregate?.playerKills || roundSummary?.playerKills || totals.playerKills,
      totalContainersLooted: aggregate?.containersLooted || roundSummary?.containersLooted || totals.containersLooted,
    },
    enemies: aggregate?.enemyKills.map((row) => ({ name: row.target.displayName, count: row.amount, ...(row.target.itemId ? { itemId: row.target.itemId } : {}) })) ?? [],
    weapons: aggregate?.weaponKills.map((row) => ({ name: row.target.displayName, count: row.amount, ...(row.target.itemId ? { itemId: row.target.itemId } : {}) })) ?? [],
    rounds: roundsSnapshot?.rounds.map((round) => ({ roundId: round.roundId, mapName: round.map?.displayName ?? 'Unknown Map', outcome: round.outcome === 'knockedOut' ? 'died' : round.outcome, valueBroughtIn: round.valueBroughtIn ?? 0, valueExtracted: round.valueExtracted ?? 0, netValue: round.netValue ?? 0 })) ?? [],
    maps: aggregate?.mapPerformance.map((row, index) => ({ key: row.map.sourceId === null ? `${row.map.displayName}-${index}` : String(row.map.sourceId), mapName: row.map.displayName, raids: row.roundsPlayed, extracted: row.roundsExtracted, totalDurationMs: row.durationMs, totalNetValue: row.netValue })) ?? [],
    fetchedAt: roundsSnapshot?.fetchedAt ?? cached.fetchedAt,
  };
}

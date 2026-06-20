import { getIdToken } from '../auth/cognitoClient';
import {
  createPlayerStatsSnapshot,
  loadPlayerStatsSnapshot,
  normalizeStatsPlayerV2,
  normalizeStatsRound,
  savePlayerStatsSnapshot,
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
  const source = body(value);
  return Array.isArray(source[key]) ? source[key] : [];
}

function parseSummary(value: unknown): StatsSummary {
  const source = body(value);
  return {
    totalTimeMs: number(source.totalTimeMs),
    totalRounds: number(source.totalRounds),
    totalExtracted: number(source.totalExtracted),
    totalDied: number(source.totalDied),
    totalArcKills: number(source.totalArcKills),
    totalValueExtracted: number(source.totalValueExtracted),
    totalNetValue: number(source.totalNetValue),
    totalPlayerKills: number(source.totalPlayerKills),
    totalContainersLooted: number(source.totalContainersLooted),
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
    if (Array.isArray(row.stats)) {
      const sourceRoundId = row.roundId ?? row.id;
      const roundId = typeof sourceRoundId === 'string' || typeof sourceRoundId === 'number'
        ? sourceRoundId
        : index + 1;
      const normalized = normalizeStatsRound({
        ...row,
        roundId,
        stats: row.stats,
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
    const rawOutcome = text(row.outcome, '').toLowerCase();
    const extracted = row.extracted === true || rawOutcome === 'extracted' || rawOutcome === 'survived';
    const died = row.extracted === false || ['died', 'kia', 'knockedout', 'knocked out'].includes(rawOutcome);
    return {
      roundId: row.roundId === null || row.roundId === undefined
        ? row.id === null || row.id === undefined ? String(index + 1) : String(row.id)
        : String(row.roundId),
      mapName: text(row.mapName, 'Unknown Map'),
      outcome: extracted ? 'extracted' : died ? 'died' : 'unknown',
      valueBroughtIn: number(row.valueBroughtIn),
      valueExtracted: number(row.valueExtracted),
      netValue: number(row.netValue),
    };
  });
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
  const summary = aggregate ? {
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

  const [summary, enemies, weapons, rounds, maps] = await Promise.all([
    request('/summary', token),
    request('/enemy-kills', token),
    request('/weapon-kills', token).catch(() => ({ weapons: [] })),
    request('/rounds?limit=200', token),
    request('/map-performance', token),
  ]);
  const dashboard = normalizeStatsDashboardPayloads({ summary, enemies, weapons, rounds, maps });
  const snapshot = createPlayerStatsSnapshot(body(summary), 'arctracker', dashboard.fetchedAt);
  snapshot.raw.dashboard = dashboard;
  savePlayerStatsSnapshot(snapshot);
  return dashboard;
}

export function loadCachedStatsDashboard(): StatsDashboardData | null {
  const cached = loadPlayerStatsSnapshot();
  const dashboard = cached?.raw.dashboard;
  if (!dashboard || typeof dashboard !== 'object') return null;
  const value = dashboard as Partial<StatsDashboardData>;
  if (!value.summary || !Array.isArray(value.rounds) || !Array.isArray(value.maps)) return null;
  return value as StatsDashboardData;
}

/**
 * shiesty-arctracker-stats.generated.ts
 *
 * Standalone ArcTracker stats normalizer/fetcher for a fresh project.
 * Built from the uploaded ArcTracker stats API, normalization, types, tests,
 * stats mapping, and target resolver references.
 *
 * Important rules baked in:
 * - targetId is scoped by eventId. Never treat targetId as itemId globally.
 * - Unknown/undocumented IDs are preserved as unknown targets, not invented.
 * - weapon event targetId is treated as weaponAssetId when weaponAssetId is absent.
 * - map outcome/duration/value events can carry map target IDs but are not enemy/item IDs.
 */

export type JsonObject = Record<string, unknown>;

export type StatsSnapshotSource =
  | 'arctracker'
  | 'embark'
  | 'stats-player-v2'
  | 'extension'
  | 'unknown';

export type CanonicalEntityKind =
  | 'item'
  | 'weapon'
  | 'enemy'
  | 'map'
  | 'quest'
  | 'player'
  | 'unknown';

export interface ResolverRecord {
  id?: string | number;
  itemId?: string;
  slug?: string;
  name?: string;
  assetId?: string | number | null;
  imageFilename?: string;
  image?: string;
  type?: string;
  rarity?: string;
  [key: string]: unknown;
}

export interface StatsTargetResolver {
  resolvers?: {
    maps?: Record<string, ResolverRecord>;
    enemies?: Record<string, ResolverRecord>;
    weaponsByAssetId?: Record<string, ResolverRecord>;
    itemsById?: Record<string, ResolverRecord>;
    questsById?: Record<string, ResolverRecord>;
  };
  specialTargetIds?: Record<string, { id: number; name: string; hex?: string }>;
  eventTargetTypes?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface RawStatEvent {
  eventId: number | string;
  amount?: number | string | null;
  value?: number | string | null;
  count?: number | string | null;
  targetId?: number | string | null;
  weaponAssetId?: number | string | null;
  [key: string]: unknown;
}

export interface RawStatsRound {
  roundId?: string | number;
  id?: string | number;
  stats?: readonly RawStatEvent[];
  rawStats?: readonly RawStatEvent[];
  outcome?: unknown;
  status?: unknown;
  map?: unknown;
  mapName?: unknown;
  mapTargetId?: unknown;
  mapId?: unknown;
  durationMs?: unknown;
  durationMilliseconds?: unknown;
  durationSeconds?: unknown;
  duration?: unknown;
  valueBroughtIn?: unknown;
  loadoutValue?: unknown;
  broughtInValue?: unknown;
  valueExtracted?: unknown;
  lootValue?: unknown;
  extractedValue?: unknown;
  netValue?: unknown;
  netProfit?: unknown;
  profit?: unknown;
  xpGained?: unknown;
  xp?: unknown;
  score?: unknown;
  damage?: unknown;
  damageDealt?: unknown;
  totalDamage?: unknown;
  arcKills?: unknown;
  arcDestroyed?: unknown;
  arc_kills?: unknown;
  playerKills?: unknown;
  player_kills?: unknown;
  pvpKills?: unknown;
  playerDowns?: unknown;
  downs?: unknown;
  knockdowns?: unknown;
  containersLooted?: unknown;
  lootedContainers?: unknown;
  totalContainersLooted?: unknown;
  containers?: unknown;
  roundEndedAt?: string;
  syncedAt?: string;
  [key: string]: unknown;
}

export interface ResolvedStatTarget {
  kind: CanonicalEntityKind;
  known: boolean;
  sourceId: string | number | null;
  canonicalSlug: string | null;
  displayName: string;
  itemId?: string;
  imageFilename?: string;
  source?: ResolverRecord;
}

export interface StatBreakdownEntry {
  target: ResolvedStatTarget;
  amount: number;
}

export type RoundOutcome = 'extracted' | 'knockedOut' | 'unknown';

export interface NormalizedRoundStats {
  roundId: string;
  outcome: RoundOutcome;
  extracted: boolean | null;
  map: ResolvedStatTarget | null;
  mapName: string;
  durationMs: number | null;
  valueBroughtIn: number | null;
  valueExtracted: number | null;
  netValue: number | null;
  xpGained: number;
  damage: number;
  playerDamage: number;
  arcDamage: number;
  playerKills: number;
  arcKills: number;
  unknownTargetKills: number;
  totalKills: number;
  playerDowns: number;
  revives: number;
  squadmateRevives: number;
  containersLooted: number;
  itemsCrafted: number;
  damageByTarget: StatBreakdownEntry[];
  damageByWeapon: StatBreakdownEntry[];
  killsByTarget: StatBreakdownEntry[];
  killsByWeapon: StatBreakdownEntry[];
  craftedItems: StatBreakdownEntry[];
  unknownEvents: RawStatEvent[];
  rawStats: readonly RawStatEvent[];
  roundEndedAt?: string;
  syncedAt?: string;
}

export interface NormalizedStatsTotals {
  damage: number;
  playerKills: number;
  arcKills: number;
  totalKills: number;
  lootValue: number;
  loadoutValue: number;
  durationMs: number;
  extracted: boolean | null;
  containersLooted: number;
  itemsExtracted: number;
}

export interface NormalizedRoundSummary extends NormalizedStatsTotals {
  roundsPlayed: number;
  roundsExtracted: number;
  roundsKnockedOut: number;
  survivalRate: number;
  deathRate: number;
  playerDowns: number;
  revives: number;
  xpGained: number;
  itemsCrafted: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
}

export interface NormalizedMapPerformance {
  map: ResolvedStatTarget;
  roundsPlayed: number;
  roundsExtracted: number;
  roundsKnockedOut: number;
  survivalRate: number;
  durationMs: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
}

export interface NormalizedAggregatePlayerStats {
  roundsPlayed: number;
  roundsExtracted: number;
  roundsKnockedOut: number;
  survivalRate: number;
  durationMs: number;
  damage: number;
  playerKills: number;
  arcKills: number;
  totalKills: number;
  playerDowns: number;
  squadmateRevives: number;
  strangerRevives: number;
  containersLooted: number;
  itemsCrafted: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
  enemyKills: StatBreakdownEntry[];
  weaponKills: StatBreakdownEntry[];
  mapPerformance: NormalizedMapPerformance[];
  unknownEvents: RawStatEvent[];
}

export interface NormalizedRoundStatsSnapshot {
  schemaVersion: 1;
  source: StatsSnapshotSource;
  fetchedAt: string;
  savedAt: string;
  rounds: NormalizedRoundStats[];
  summary: NormalizedRoundSummary;
}

export interface NormalizedPlayerStatsSnapshot {
  schemaVersion: 1;
  source: StatsSnapshotSource;
  fetchedAt: string;
  savedAt: string;
  totals: NormalizedStatsTotals;
  aggregate: NormalizedAggregatePlayerStats | null;
  raw: JsonObject;
}

export interface StatsBreakdownRow {
  name: string;
  count: number;
  itemId?: string;
  imageFilename?: string;
  sourceId?: string | number | null;
  target?: ResolvedStatTarget;
}

export interface StatsRoundRow {
  roundId: string;
  mapName: string;
  outcome: 'extracted' | 'died' | 'unknown';
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
  durationMs: number;
  arcKills: number;
  playerKills: number;
  damage: number;
  containersLooted: number;
}

export interface StatsMapRow {
  key: string;
  mapName: string;
  raids: number;
  extracted: number;
  knockedOut: number;
  survivalRate: number;
  totalDurationMs: number;
  totalNetValue: number;
}

export interface StatsDashboardData {
  source: 'arctracker';
  summary: NormalizedRoundSummary;
  derived: {
    avgRaidTimeMs: number;
    avgNetValuePerRound: number;
    avgLootValuePerRound: number;
    avgDamagePerRound: number;
    arcKillsPerRound: number;
    playerKillsPerRound: number;
    containersLootedPerRound: number;
    playerKdRatio: number;
  };
  enemies: StatsBreakdownRow[];
  weapons: StatsBreakdownRow[];
  rounds: StatsRoundRow[];
  maps: StatsMapRow[];
  aggregate: NormalizedAggregatePlayerStats | null;
  fetchedAt: string;
  raw: {
    summary?: unknown;
    enemies?: unknown;
    weapons?: unknown;
    rounds?: unknown;
    maps?: unknown;
  };
}

export const EMBARK_EVENT_IDS = {
  damageByEnemyType: 100,
  damageByWeapon: 102,
  killsByTarget: 200,
  killsByWeapon: 202,
  playerDowns: 204,
  revives: 400,
  containersLooted: 501,
  itemsCrafted: 600,
  mapPlayed: 9800,
  extracted: 9801,
  knockedOut: 9802,
  durationMs: 9803,
  valueBroughtIn: 9804,
  valueExtracted: 9805,
  xpGained: 9902,
} as const;

export const PLAYER_TARGET_ID = 995408715;
export const PLAYER_DAMAGE_TARGET_ID = 200993951;
export const SQUADMATE_REVIVE_TARGET_ID = -12896838;

export const ARCTRACKER_ENDPOINTS = {
  user: {
    profile: '/me/arctracker/v2/user/profile',
    stash: '/me/arctracker/v2/user/stash',
    loadout: '/me/arctracker/v2/user/loadout',
    hideout: '/me/arctracker/v2/user/hideout',
    blueprints: '/me/arctracker/v2/user/blueprints',
    projects: '/me/arctracker/v2/user/projects',
  },
  stats: {
    summary: '/me/arctracker/embark/stats/summary',
    enemyKills: '/me/arctracker/embark/stats/enemy-kills',
    weaponKills: '/me/arctracker/embark/stats/weapon-kills',
    rounds: '/me/arctracker/embark/stats/rounds',
    mapPerformance: '/me/arctracker/embark/stats/map-performance',
  },
} as const;

function isRecord(value: unknown): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function body(value: unknown): JsonObject {
  const root = isRecord(value) ? value : {};
  return isRecord(root.data) ? root.data : root;
}

function list(value: unknown, key: string): unknown[] {
  if (Array.isArray(value)) return value;
  const source = body(value);
  return Array.isArray(source[key]) ? source[key] : [];
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function numberOrZero(value: unknown): number {
    return toFiniteNumber(value) ?? 0;
}

function firstNumber(source: JsonObject, keys: readonly string[]): number {
  for (const key of keys) {
    const value = source[key];
    const parsed = toFiniteNumber(value);
    if (parsed !== null) return parsed;
  }
  return 0;
}

function firstDefined<T = unknown>(...values: T[]): T | undefined {
  return values.find((value) => value !== undefined && value !== null && value !== '') as T | undefined;
}

function firstText(source: JsonObject, keys: readonly string[], fallback: string): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return fallback;
}

function firstBoolean(source: JsonObject, keys: readonly string[]): boolean | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value > 0;
    if (typeof value === 'string') {
      const normalized = normalizeLookupText(value);
      if (['true', 'extracted', 'returned safely', 'success', 'survived'].includes(normalized)) return true;
      if (['false', 'knocked out', 'failed', 'died', 'death', 'kia'].includes(normalized)) return false;
    }
  }
  return null;
}

function ratio(numerator: number, denominator: number): number {
  return denominator > 0 ? numerator / denominator : 0;
}

export function normalizeLookupText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en-US')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function canonicalizeSlug(value: string): string {
  return normalizeLookupText(value).replace(/ /g, '_');
}

function eventAmount(event: RawStatEvent): number {
  return toFiniteNumber(event.amount ?? event.value ?? event.count) ?? 0;
}

function eventTargetId(event: RawStatEvent): string | number | null {
  return event.targetId ?? null;
}

function weaponTargetId(event: RawStatEvent): string | number | null {
  return event.weaponAssetId ?? event.targetId ?? null;
}

function resolverTable(resolver: StatsTargetResolver | undefined, key: keyof NonNullable<StatsTargetResolver['resolvers']>): Record<string, ResolverRecord> {
  return resolver?.resolvers?.[key] ?? {};
}

function knownTarget(kind: CanonicalEntityKind, sourceId: string | number, entry: ResolverRecord): ResolvedStatTarget {
  const name = String(entry.name ?? entry.itemId ?? entry.slug ?? sourceId);
  return {
    kind,
    known: true,
    sourceId,
    canonicalSlug: entry.itemId ?? entry.slug?.replace(/-/g, '_') ?? canonicalizeSlug(name),
    displayName: name,
    ...(entry.itemId ? { itemId: entry.itemId } : {}),
    ...(typeof entry.imageFilename === 'string' ? { imageFilename: entry.imageFilename } : {}),
    source: entry,
  };
}

function specialTarget(sourceId: string | number, displayName: string): ResolvedStatTarget {
  return {
    kind: 'player',
    known: true,
    sourceId,
    canonicalSlug: canonicalizeSlug(displayName),
    displayName,
  };
}

function unknownTarget(kind: CanonicalEntityKind, sourceId: string | number | null): ResolvedStatTarget {
  return {
    kind,
    known: false,
    sourceId,
    canonicalSlug: null,
    displayName: sourceId === null ? `Unknown ${kind}` : `Unknown ${kind} (${String(sourceId)})`,
  };
}

export function resolveStatTarget(event: RawStatEvent, resolver?: StatsTargetResolver): ResolvedStatTarget | null {
  const eventId = toFiniteNumber(event.eventId);
  if (eventId === null) return unknownTarget('unknown', eventTargetId(event));

  if (eventId === EMBARK_EVENT_IDS.damageByEnemyType || eventId === EMBARK_EVENT_IDS.killsByTarget) {
    const targetId = eventTargetId(event);
    if (Number(targetId) === PLAYER_TARGET_ID) return specialTarget(targetId ?? PLAYER_TARGET_ID, 'Raider / Player');
    if (Number(targetId) === PLAYER_DAMAGE_TARGET_ID) return specialTarget(targetId ?? PLAYER_DAMAGE_TARGET_ID, 'Raider / Player damage subject');
    if (targetId === null) return unknownTarget('enemy', null);
    const enemy = resolverTable(resolver, 'enemies')[String(targetId)];
    return enemy ? knownTarget('enemy', targetId, enemy) : unknownTarget('enemy', targetId);
  }

  if (eventId === EMBARK_EVENT_IDS.damageByWeapon || eventId === EMBARK_EVENT_IDS.killsByWeapon) {
    const targetId = weaponTargetId(event);
    if (targetId === null) return unknownTarget('weapon', null);
    const weapon = resolverTable(resolver, 'weaponsByAssetId')[String(targetId)];
    return weapon ? knownTarget('weapon', targetId, weapon) : unknownTarget('weapon', targetId);
  }

  if (
    eventId === EMBARK_EVENT_IDS.mapPlayed ||
    eventId === EMBARK_EVENT_IDS.extracted ||
    eventId === EMBARK_EVENT_IDS.knockedOut ||
    eventId === EMBARK_EVENT_IDS.durationMs ||
    eventId === EMBARK_EVENT_IDS.valueBroughtIn ||
    eventId === EMBARK_EVENT_IDS.valueExtracted
  ) {
    const targetId = eventTargetId(event);
    if (targetId === null) return null;
    const map = resolverTable(resolver, 'maps')[String(targetId)];
    return map ? knownTarget('map', targetId, map) : unknownTarget('map', targetId);
  }

  if (eventId === EMBARK_EVENT_IDS.itemsCrafted) {
    const targetId = eventTargetId(event);
    if (targetId === null) return unknownTarget('item', null);
    const item = resolverTable(resolver, 'itemsById')[String(targetId)];
    const weapon = resolverTable(resolver, 'weaponsByAssetId')[String(targetId)];
    if (item) return knownTarget('item', targetId, item);
    if (weapon) return knownTarget('weapon', targetId, weapon);
    return unknownTarget('item', targetId);
  }

  if (eventId === EMBARK_EVENT_IDS.revives || eventId === EMBARK_EVENT_IDS.playerDowns) {
    const targetId = eventTargetId(event);
    if (Number(targetId) === SQUADMATE_REVIVE_TARGET_ID) return specialTarget(targetId ?? SQUADMATE_REVIVE_TARGET_ID, 'Squadmate revive');
    if (Number(targetId) === PLAYER_TARGET_ID) return specialTarget(targetId ?? PLAYER_TARGET_ID, 'Raider / Player');
    return unknownTarget('player', targetId);
  }

  return null;
}

function addBreakdown(target: StatBreakdownEntry[], resolved: ResolvedStatTarget, amount: number): void {
  const key = `${resolved.kind}:${String(resolved.sourceId)}:${resolved.displayName}`;
  const existing = target.find((entry) => `${entry.target.kind}:${String(entry.target.sourceId)}:${entry.target.displayName}` === key);
  if (existing) existing.amount += amount;
  else target.push({ target: resolved, amount });
}

function emptyRound(roundId: string): NormalizedRoundStats {
  return {
    roundId,
    outcome: 'unknown',
    extracted: null,
    map: null,
    mapName: 'Unknown Map',
    durationMs: null,
    valueBroughtIn: null,
    valueExtracted: null,
    netValue: null,
    xpGained: 0,
    damage: 0,
    playerDamage: 0,
    arcDamage: 0,
    playerKills: 0,
    arcKills: 0,
    unknownTargetKills: 0,
    totalKills: 0,
    playerDowns: 0,
    revives: 0,
    squadmateRevives: 0,
    containersLooted: 0,
    itemsCrafted: 0,
    damageByTarget: [],
    damageByWeapon: [],
    killsByTarget: [],
    killsByWeapon: [],
    craftedItems: [],
    unknownEvents: [],
    rawStats: [],
  };
}

function normalizeOutcomeText(value: unknown): RoundOutcome {
  const text = normalizeLookupText(String(value ?? ''));
  if (['returned safely', 'extracted', 'extract', 'survived', 'success'].includes(text) || text.includes('extract')) return 'extracted';
  if (['knocked out', 'failed', 'died', 'death', 'kia'].includes(text) || text.includes('die') || text.includes('fail')) return 'knockedOut';
  return 'unknown';
}

function fallbackRoundFromFields(raw: RawStatsRound, resolver?: StatsTargetResolver): NormalizedRoundStats {
  const row = raw as JsonObject;
  const round = emptyRound(String(firstDefined(raw.roundId, raw.id, 'unknown-round')));
  const valueBroughtIn = firstNumber(row, ['valueBroughtIn', 'loadoutValue', 'broughtInValue']);
  const valueExtracted = firstNumber(row, ['valueExtracted', 'lootValue', 'extractedValue']);
  const mapTargetId = firstDefined(raw.mapTargetId, raw.mapId, raw.map);
  const mapName = firstText(row, ['mapName', 'map'], 'Unknown Map');
  const outcome = normalizeOutcomeText(firstDefined(raw.outcome, raw.status, raw.extraction));

  round.outcome = outcome;
  round.extracted = outcome === 'extracted' ? true : outcome === 'knockedOut' ? false : firstBoolean(row, ['extracted']);
  round.map = mapTargetId !== undefined
    ? resolveStatTarget({ eventId: EMBARK_EVENT_IDS.mapPlayed, targetId: mapTargetId as string | number }, resolver)
    : null;
  round.mapName = round.map?.displayName ?? mapName;
  round.durationMs = firstNumber(row, ['durationMs', 'durationMilliseconds', 'totalDurationMs']) || firstNumber(row, ['durationSeconds', 'duration']) * 1000 || null;
  round.valueBroughtIn = valueBroughtIn;
  round.valueExtracted = valueExtracted;
  round.netValue = firstNumber(row, ['netValue', 'netProfit', 'profit']) || valueExtracted - valueBroughtIn;
  round.xpGained = firstNumber(row, ['xpGained', 'xp', 'score']);
  round.damage = firstNumber(row, ['damage', 'damageDealt', 'totalDamage', 'totalDamageDealt']);
  round.arcDamage = round.damage;
  round.arcKills = firstNumber(row, ['arcKills', 'arcDestroyed', 'arc_kills', 'arcEnemyKills']);
  round.playerKills = firstNumber(row, ['playerKills', 'player_kills', 'pvpKills']);
  round.totalKills = round.arcKills + round.playerKills;
  round.playerDowns = firstNumber(row, ['playerDowns', 'downs', 'knockdowns']);
  round.containersLooted = firstNumber(row, ['containersLooted', 'lootedContainers', 'totalContainersLooted', 'containers']);
  round.roundEndedAt = typeof raw.roundEndedAt === 'string' ? raw.roundEndedAt : undefined;
  round.syncedAt = typeof raw.syncedAt === 'string' ? raw.syncedAt : undefined;
  return round;
}

export function normalizeStatsRound(round: RawStatsRound, resolver?: StatsTargetResolver): NormalizedRoundStats {
  const rawStats = Array.isArray(round.stats)
    ? round.stats
    : Array.isArray(round.rawStats)
      ? round.rawStats
      : [];

  if (rawStats.length === 0) return fallbackRoundFromFields(round, resolver);

  const normalized = emptyRound(String(firstDefined(round.roundId, round.id, 'unknown-round')));
  normalized.rawStats = rawStats;
  normalized.roundEndedAt = typeof round.roundEndedAt === 'string' ? round.roundEndedAt : undefined;
  normalized.syncedAt = typeof round.syncedAt === 'string' ? round.syncedAt : undefined;

  for (const event of rawStats) {
    const eventId = toFiniteNumber(event.eventId);
    const amount = eventAmount(event);
    const target = resolveStatTarget(event, resolver);

    switch (eventId) {
      case EMBARK_EVENT_IDS.damageByEnemyType:
        normalized.damage += amount;
        if (Number(event.targetId) === PLAYER_DAMAGE_TARGET_ID || Number(event.targetId) === PLAYER_TARGET_ID) normalized.playerDamage += amount;
        else normalized.arcDamage += amount;
        if (target) addBreakdown(normalized.damageByTarget, target, amount);
        break;
      case EMBARK_EVENT_IDS.damageByWeapon:
        if (target) addBreakdown(normalized.damageByWeapon, target, amount);
        break;
      case EMBARK_EVENT_IDS.killsByTarget:
        if (Number(event.targetId) === PLAYER_TARGET_ID) normalized.playerKills += amount;
        else if (target?.known && target.kind === 'enemy') normalized.arcKills += amount;
        else normalized.unknownTargetKills += amount;
        if (target) addBreakdown(normalized.killsByTarget, target, amount);
        break;
      case EMBARK_EVENT_IDS.killsByWeapon:
        if (target) addBreakdown(normalized.killsByWeapon, target, amount);
        break;
      case EMBARK_EVENT_IDS.playerDowns:
        if (event.targetId == null || Number(event.targetId) === PLAYER_TARGET_ID) normalized.playerDowns += amount;
        break;
      case EMBARK_EVENT_IDS.revives:
        normalized.revives += amount;
        if (Number(event.targetId) === SQUADMATE_REVIVE_TARGET_ID) normalized.squadmateRevives += amount;
        break;
      case EMBARK_EVENT_IDS.containersLooted:
        normalized.containersLooted += amount;
        break;
      case EMBARK_EVENT_IDS.itemsCrafted:
        normalized.itemsCrafted += amount;
        if (target) addBreakdown(normalized.craftedItems, target, amount);
        break;
      case EMBARK_EVENT_IDS.mapPlayed:
        normalized.map ??= target;
        normalized.mapName = target?.displayName ?? normalized.mapName;
        break;
      case EMBARK_EVENT_IDS.extracted:
        normalized.outcome = 'extracted';
        normalized.extracted = true;
        normalized.map = target ?? normalized.map;
        normalized.mapName = target?.displayName ?? normalized.mapName;
        break;
      case EMBARK_EVENT_IDS.knockedOut:
        normalized.outcome = 'knockedOut';
        normalized.extracted = false;
        normalized.map = target ?? normalized.map;
        normalized.mapName = target?.displayName ?? normalized.mapName;
        break;
      case EMBARK_EVENT_IDS.durationMs:
        normalized.durationMs = amount;
        break;
      case EMBARK_EVENT_IDS.valueBroughtIn:
        normalized.valueBroughtIn = amount;
        break;
      case EMBARK_EVENT_IDS.valueExtracted:
        normalized.valueExtracted = amount;
        break;
      case EMBARK_EVENT_IDS.xpGained:
        normalized.xpGained += amount;
        break;
      default:
        normalized.unknownEvents.push(event);
    }
  }

  if (normalized.valueBroughtIn !== null && normalized.valueExtracted !== null) normalized.netValue = normalized.valueExtracted - normalized.valueBroughtIn;
  normalized.totalKills = normalized.arcKills + normalized.playerKills + normalized.unknownTargetKills;
  return normalized;
}

export function normalizeStatsRounds(rounds: readonly RawStatsRound[], resolver?: StatsTargetResolver): NormalizedRoundStats[] {
  return rounds.map((round) => normalizeStatsRound(round, resolver));
}

export function normalizeStatsTotals(source: JsonObject): NormalizedStatsTotals {
  const durationMs = firstNumber(source, ['durationMs', 'durationMilliseconds', 'totalDurationMs', 'totalTimeMs']) || firstNumber(source, ['durationSeconds', 'totalDurationSeconds', 'duration']) * 1000;
  const playerKills = firstNumber(source, ['playerKills', 'kills', 'totalPlayerKills', 'total_player_kills']);
  const arcKills = firstNumber(source, ['arcKills', 'arcEnemyKills', 'enemiesKilled', 'totalArcKills', 'total_arc_kills']);
  return {
    damage: firstNumber(source, ['damage', 'damageDealt', 'totalDamage', 'totalDamageDealt', 'total_damage_dealt']),
    playerKills,
    arcKills,
    totalKills: playerKills + arcKills,
    lootValue: firstNumber(source, ['lootValue', 'valueExtracted', 'totalLootValue', 'totalValueExtracted', 'total_value_extracted']),
    loadoutValue: firstNumber(source, ['loadoutValue', 'valueBroughtIn', 'totalLoadoutValue', 'totalValueBroughtIn', 'total_value_brought_in']),
    durationMs,
    extracted: firstBoolean(source, ['extracted', 'outcome', 'extractionOutcome', 'survived']),
    containersLooted: firstNumber(source, ['containersLooted', 'containerLooted', 'totalContainersLooted', 'total_containers_looted']),
    itemsExtracted: firstNumber(source, ['itemsExtracted', 'itemExtractions', 'totalItemsExtracted']),
  };
}

export function summarizeStatsRounds(rounds: readonly NormalizedRoundStats[]): NormalizedRoundSummary {
  const summary: NormalizedRoundSummary = {
    roundsPlayed: rounds.length,
    roundsExtracted: 0,
    roundsKnockedOut: 0,
    survivalRate: 0,
    deathRate: 0,
    damage: 0,
    playerKills: 0,
    arcKills: 0,
    totalKills: 0,
    lootValue: 0,
    loadoutValue: 0,
    durationMs: 0,
    extracted: null,
    containersLooted: 0,
    itemsExtracted: 0,
    playerDowns: 0,
    revives: 0,
    xpGained: 0,
    itemsCrafted: 0,
    valueBroughtIn: 0,
    valueExtracted: 0,
    netValue: 0,
  };

  for (const round of rounds) {
    if (round.extracted === true) summary.roundsExtracted += 1;
    if (round.extracted === false) summary.roundsKnockedOut += 1;
    summary.damage += round.damage;
    summary.playerKills += round.playerKills;
    summary.arcKills += round.arcKills;
    summary.totalKills += round.totalKills;
    summary.durationMs += round.durationMs ?? 0;
    summary.containersLooted += round.containersLooted;
    summary.playerDowns += round.playerDowns;
    summary.revives += round.revives;
    summary.xpGained += round.xpGained;
    summary.itemsCrafted += round.itemsCrafted;
    summary.valueBroughtIn += round.valueBroughtIn ?? 0;
    summary.valueExtracted += round.valueExtracted ?? 0;
    summary.netValue += round.netValue ?? 0;
  }

  summary.lootValue = summary.valueExtracted;
  summary.loadoutValue = summary.valueBroughtIn;
  summary.survivalRate = ratio(summary.roundsExtracted, summary.roundsPlayed);
  summary.deathRate = ratio(summary.roundsKnockedOut, summary.roundsPlayed);
  return summary;
}

function scopedPlayerEvents(raw: JsonObject): RawStatEvent[] | null {
  if (Array.isArray(raw.playerStats)) return raw.playerStats as RawStatEvent[];
  if (!Array.isArray(raw.scopedPlayerStats)) return null;
  for (const scope of raw.scopedPlayerStats) {
    if (!isRecord(scope)) continue;
    const events = scope.playerStats;
    if (Array.isArray(events)) return events as RawStatEvent[];
  }
  return null;
}

function mapPerformanceEntry(entries: Map<string, NormalizedMapPerformance>, target: ResolvedStatTarget): NormalizedMapPerformance {
  const key = String(target.sourceId ?? target.displayName);
  const existing = entries.get(key);
  if (existing) return existing;
  const created: NormalizedMapPerformance = {
    map: target,
    roundsPlayed: 0,
    roundsExtracted: 0,
    roundsKnockedOut: 0,
    survivalRate: 0,
    durationMs: 0,
    valueBroughtIn: 0,
    valueExtracted: 0,
    netValue: 0,
  };
  entries.set(key, created);
  return created;
}

export function normalizeStatsPlayerV2(raw: JsonObject, resolver?: StatsTargetResolver): NormalizedAggregatePlayerStats | null {
  const events = scopedPlayerEvents(raw);
  if (!events) return null;

  const result: NormalizedAggregatePlayerStats = {
    roundsPlayed: 0,
    roundsExtracted: 0,
    roundsKnockedOut: 0,
    survivalRate: 0,
    durationMs: 0,
    damage: 0,
    playerKills: 0,
    arcKills: 0,
    totalKills: 0,
    playerDowns: 0,
    squadmateRevives: 0,
    strangerRevives: 0,
    containersLooted: 0,
    itemsCrafted: 0,
    valueBroughtIn: 0,
    valueExtracted: 0,
    netValue: 0,
    enemyKills: [],
    weaponKills: [],
    mapPerformance: [],
    unknownEvents: [],
  };
  const maps = new Map<string, NormalizedMapPerformance>();

  for (const event of events) {
    const eventId = toFiniteNumber(event.eventId);
    const amount = eventAmount(event);
    const target = resolveStatTarget(event, resolver);
    const map = target?.kind === 'map' ? mapPerformanceEntry(maps, target) : null;

    switch (eventId) {
      case EMBARK_EVENT_IDS.mapPlayed:
        result.roundsPlayed += amount;
        if (map) map.roundsPlayed += amount;
        break;
      case EMBARK_EVENT_IDS.extracted:
        result.roundsExtracted += amount;
        if (map) map.roundsExtracted += amount;
        break;
      case EMBARK_EVENT_IDS.knockedOut:
        result.roundsKnockedOut += amount;
        if (map) map.roundsKnockedOut += amount;
        break;
      case EMBARK_EVENT_IDS.durationMs:
        result.durationMs += amount;
        if (map) map.durationMs += amount;
        break;
      case EMBARK_EVENT_IDS.valueBroughtIn:
        result.valueBroughtIn += amount;
        if (map) map.valueBroughtIn += amount;
        break;
      case EMBARK_EVENT_IDS.valueExtracted:
        result.valueExtracted += amount;
        if (map) map.valueExtracted += amount;
        break;
      case EMBARK_EVENT_IDS.damageByEnemyType:
        result.damage += amount;
        break;
      case EMBARK_EVENT_IDS.killsByTarget:
        if (Number(event.targetId) === PLAYER_TARGET_ID) result.playerKills += amount;
        else if (target?.known && target.kind === 'enemy') {
          result.arcKills += amount;
          addBreakdown(result.enemyKills, target, amount);
        } else if (target) {
          addBreakdown(result.enemyKills, target, amount);
        }
        break;
      case EMBARK_EVENT_IDS.killsByWeapon:
        if (target) addBreakdown(result.weaponKills, target, amount);
        break;
      case EMBARK_EVENT_IDS.playerDowns:
        if (event.targetId == null || Number(event.targetId) === PLAYER_TARGET_ID) result.playerDowns += amount;
        break;
      case EMBARK_EVENT_IDS.revives:
        if (Number(event.targetId) === SQUADMATE_REVIVE_TARGET_ID) result.squadmateRevives += amount;
        else if (Number(event.targetId) === PLAYER_TARGET_ID) result.strangerRevives += amount;
        break;
      case EMBARK_EVENT_IDS.containersLooted:
        result.containersLooted += amount;
        break;
      case EMBARK_EVENT_IDS.itemsCrafted:
        result.itemsCrafted += amount;
        break;
      default:
        result.unknownEvents.push(event);
    }
  }

  result.totalKills = result.arcKills + result.playerKills;
  result.netValue = result.valueExtracted - result.valueBroughtIn;
  result.survivalRate = ratio(result.roundsExtracted, result.roundsPlayed);
  result.mapPerformance = Array.from(maps.values()).map((map) => ({
    ...map,
    survivalRate: ratio(map.roundsExtracted, map.roundsPlayed),
    netValue: map.valueExtracted - map.valueBroughtIn,
  }));
  return result;
}

export function createRoundStatsSnapshot(rounds: readonly RawStatsRound[], source: StatsSnapshotSource = 'arctracker', fetchedAt = new Date().toISOString(), resolver?: StatsTargetResolver): NormalizedRoundStatsSnapshot {
  const normalizedRounds = normalizeStatsRounds(rounds, resolver).sort((a, b) => b.roundId.localeCompare(a.roundId));
  return {
    schemaVersion: 1,
    source,
    fetchedAt,
    savedAt: new Date().toISOString(),
    rounds: normalizedRounds,
    summary: summarizeStatsRounds(normalizedRounds),
  };
}

export function createPlayerStatsSnapshot(raw: JsonObject, source: StatsSnapshotSource = 'arctracker', fetchedAt = new Date().toISOString(), resolver?: StatsTargetResolver): NormalizedPlayerStatsSnapshot {
  const aggregate = normalizeStatsPlayerV2(raw, resolver);
  const flatTotals = normalizeStatsTotals(raw);
  return {
    schemaVersion: 1,
    source,
    fetchedAt,
    savedAt: new Date().toISOString(),
    totals: aggregate
      ? {
          damage: aggregate.damage,
          playerKills: aggregate.playerKills,
          arcKills: aggregate.arcKills,
          totalKills: aggregate.totalKills,
          lootValue: aggregate.valueExtracted,
          loadoutValue: aggregate.valueBroughtIn,
          durationMs: aggregate.durationMs,
          extracted: null,
          containersLooted: aggregate.containersLooted,
          itemsExtracted: flatTotals.itemsExtracted,
        }
      : flatTotals,
    aggregate,
    raw: { ...raw },
  };
}

function parseDedicatedBreakdown(value: unknown, key: 'enemies' | 'weapons', resolver?: StatsTargetResolver): StatsBreakdownRow[] {
  return list(value, key).map((entry, index) => {
    const row = isRecord(entry) ? entry : {};
    const sourceId = firstDefined(row.targetId, row.weaponAssetId, row.itemId, row.id);
    const eventId = key === 'enemies' ? EMBARK_EVENT_IDS.killsByTarget : EMBARK_EVENT_IDS.killsByWeapon;
    const target = sourceId !== undefined
      ? resolveStatTarget(
          {
            eventId,
            targetId: sourceId as string | number,
            ...(key === 'weapons' ? { weaponAssetId: sourceId as string | number } : {}),
          },
          resolver,
        )
      : null;

    return {
      name: firstText(
        row,
        ['name', 'enemy_name', 'enemyName', 'weapon_name', 'weaponName'],
        target?.displayName ?? `Unknown ${key === 'enemies' ? 'enemy' : 'weapon'} ${index + 1}`,
      ),
      count: firstNumber(row, ['count', 'kills', 'totalKills', 'amount']),
      ...(typeof row.itemId === 'string' ? { itemId: row.itemId } : {}),
      ...(typeof target?.itemId === 'string' ? { itemId: target.itemId } : {}),
      ...(target?.imageFilename ? { imageFilename: target.imageFilename } : {}),
      sourceId: target?.sourceId ?? (sourceId as string | number | null | undefined),
      ...(target ? { target } : {}),
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseRounds(value: unknown, resolver?: StatsTargetResolver): StatsRoundRow[] {
  return list(value, 'rounds').map((entry, index) => {
    const row = isRecord(entry) ? entry : {};
    const roundId = firstDefined(row.roundId, row.id, index + 1) ?? String(index + 1);
    const normalized = normalizeStatsRound({ ...(row as RawStatsRound), roundId: roundId as string | number }, resolver);
    return {
      roundId: normalized.roundId,
      mapName: normalized.mapName,
      outcome: normalized.outcome === 'knockedOut' ? 'died' : normalized.outcome,
      valueBroughtIn: normalized.valueBroughtIn ?? 0,
      valueExtracted: normalized.valueExtracted ?? 0,
      netValue: normalized.netValue ?? 0,
      durationMs: normalized.durationMs ?? 0,
      arcKills: normalized.arcKills,
      playerKills: normalized.playerKills,
      damage: normalized.damage,
      containersLooted: normalized.containersLooted,
    };
  });
}

function parseMaps(value: unknown, resolver?: StatsTargetResolver): StatsMapRow[] {
  return list(value, 'maps').map((entry, index) => {
    const row = isRecord(entry) ? entry : {};
    const mapId = firstDefined(row.mapTargetId, row.mapId, row.id);
    const target = mapId !== undefined ? resolveStatTarget({ eventId: EMBARK_EVENT_IDS.mapPlayed, targetId: mapId as string | number }, resolver) : null;
    const mapName = firstText(row, ['mapName', 'name', 'map'], target?.displayName ?? 'Unknown Map');
    const raids = firstNumber(row, ['raids', 'roundsPlayed', 'rounds_played']);
    const extracted = firstNumber(row, ['extracted', 'roundsExtracted', 'total_extractions']);
    const knockedOut = firstNumber(row, ['knockedOut', 'roundsKnockedOut', 'deaths', 'total_deaths']);
    return {
      key: mapId === undefined ? `${mapName}-${index}` : String(mapId),
      mapName,
      raids,
      extracted,
      knockedOut,
      survivalRate: ratio(extracted, raids),
      totalDurationMs: firstNumber(row, ['totalDurationMs', 'durationMs']) || firstNumber(row, ['totalDurationSeconds', 'durationSeconds']) * 1000,
      totalNetValue: firstNumber(row, ['totalNetValue', 'netValue', 'total_net_profit']),
    };
  });
}

function summaryFromProvider(summaryPayload: unknown, aggregate: NormalizedAggregatePlayerStats | null): NormalizedRoundSummary {
  if (aggregate) {
    return {
      roundsPlayed: aggregate.roundsPlayed,
      roundsExtracted: aggregate.roundsExtracted,
      roundsKnockedOut: aggregate.roundsKnockedOut,
      survivalRate: aggregate.survivalRate,
      deathRate: ratio(aggregate.roundsKnockedOut, aggregate.roundsPlayed),
      damage: aggregate.damage,
      playerKills: aggregate.playerKills,
      arcKills: aggregate.arcKills,
      totalKills: aggregate.totalKills,
      lootValue: aggregate.valueExtracted,
      loadoutValue: aggregate.valueBroughtIn,
      durationMs: aggregate.durationMs,
      extracted: null,
      containersLooted: aggregate.containersLooted,
      itemsExtracted: 0,
      playerDowns: aggregate.playerDowns,
      revives: aggregate.squadmateRevives + aggregate.strangerRevives,
      xpGained: 0,
      itemsCrafted: aggregate.itemsCrafted,
      valueBroughtIn: aggregate.valueBroughtIn,
      valueExtracted: aggregate.valueExtracted,
      netValue: aggregate.netValue,
    };
  }

  const source = body(summaryPayload);
  const roundsPlayed = firstNumber(source, ['totalRounds', 'total_rounds', 'roundsPlayed', 'rounds_count']);
  const roundsExtracted = firstNumber(source, ['totalExtracted', 'total_extracted', 'roundsExtracted']);
  const roundsKnockedOut = firstNumber(source, ['totalDied', 'total_died', 'roundsKnockedOut', 'deaths']);
  const arcKills = firstNumber(source, ['totalArcKills', 'total_arc_kills', 'arcKills']);
  const playerKills = firstNumber(source, ['totalPlayerKills', 'total_player_kills', 'playerKills']);
  const valueBroughtIn = firstNumber(source, ['totalValueBroughtIn', 'total_value_brought_in', 'valueBroughtIn']);
  const valueExtracted = firstNumber(source, ['totalValueExtracted', 'total_value_extracted', 'valueExtracted']);
  return {
    roundsPlayed,
    roundsExtracted,
    roundsKnockedOut,
    survivalRate: ratio(roundsExtracted, roundsPlayed),
    deathRate: ratio(roundsKnockedOut, roundsPlayed),
    damage: firstNumber(source, ['totalDamage', 'total_damage', 'damage', 'damageDealt']),
    playerKills,
    arcKills,
    totalKills: firstNumber(source, ['totalKills', 'total_kills']) || playerKills + arcKills,
    lootValue: valueExtracted,
    loadoutValue: valueBroughtIn,
    durationMs: firstNumber(source, ['totalTimeMs', 'total_time_ms', 'durationMs']) || firstNumber(source, ['totalDurationSeconds', 'durationSeconds']) * 1000,
    extracted: null,
    containersLooted: firstNumber(source, ['totalContainersLooted', 'total_containers_looted', 'containersLooted']),
    itemsExtracted: firstNumber(source, ['totalItemsExtracted', 'itemsExtracted']),
    playerDowns: firstNumber(source, ['totalPlayerDowns', 'playerDowns']),
    revives: firstNumber(source, ['revives', 'totalRevives']),
    xpGained: firstNumber(source, ['xpGained', 'totalXp', 'xp']),
    itemsCrafted: firstNumber(source, ['itemsCrafted', 'totalItemsCrafted']),
    valueBroughtIn,
    valueExtracted,
    netValue: firstNumber(source, ['totalNetValue', 'total_net_value', 'netValue', 'netProfit']) || valueExtracted - valueBroughtIn,
  };
}

function mergeSummary(primary: NormalizedRoundSummary, fallback: NormalizedRoundSummary): NormalizedRoundSummary {
  const merged = { ...primary };
  for (const key of Object.keys(merged) as (keyof NormalizedRoundSummary)[]) {
    const value = merged[key];
    if ((typeof value === 'number' && value === 0) || value === null) {
      (merged as unknown as Record<string, unknown>)[key] = fallback[key];
    }
  }
  merged.survivalRate = ratio(merged.roundsExtracted, merged.roundsPlayed);
  merged.deathRate = ratio(merged.roundsKnockedOut, merged.roundsPlayed);
  return merged;
}

function derive(summary: NormalizedRoundSummary): StatsDashboardData['derived'] {
  return {
    avgRaidTimeMs: ratio(summary.durationMs, summary.roundsPlayed),
    avgNetValuePerRound: ratio(summary.netValue, summary.roundsPlayed),
    avgLootValuePerRound: ratio(summary.valueExtracted, summary.roundsPlayed),
    avgDamagePerRound: ratio(summary.damage, summary.roundsPlayed),
    arcKillsPerRound: ratio(summary.arcKills, summary.roundsPlayed),
    playerKillsPerRound: ratio(summary.playerKills, summary.roundsPlayed),
    containersLootedPerRound: ratio(summary.containersLooted, summary.roundsPlayed),
    playerKdRatio: ratio(summary.playerKills, summary.roundsKnockedOut),
  };
}

export function normalizeArcTrackerStatsDashboard(payloads: {
  summary?: unknown;
  enemies?: unknown;
  weapons?: unknown;
  rounds?: unknown;
  maps?: unknown;
  fetchedAt?: string;
}, resolver?: StatsTargetResolver): StatsDashboardData {
  const sourceSummary = body(payloads.summary ?? {});
  const aggregate = normalizeStatsPlayerV2(sourceSummary, resolver);
  const providerSummary = summaryFromProvider(payloads.summary ?? {}, aggregate);
  const roundRows = list(payloads.rounds ?? {}, 'rounds').map((entry, index) => {
    const row = isRecord(entry) ? entry : {};
    const roundId = firstDefined(row.roundId, row.id, index + 1) ?? String(index + 1);
    return normalizeStatsRound({ ...((row) as RawStatsRound), roundId: roundId as string | number }, resolver);
  });
  const roundsSummary = roundRows.length > 0 ? summarizeStatsRounds(roundRows) : providerSummary;
  const summary = mergeSummary(providerSummary, roundsSummary);
  const dedicatedEnemies = parseDedicatedBreakdown(payloads.enemies ?? { enemies: [] }, 'enemies', resolver);
  const dedicatedWeapons = parseDedicatedBreakdown(payloads.weapons ?? { weapons: [] }, 'weapons', resolver);
  const maps = parseMaps(payloads.maps ?? { maps: [] }, resolver);

  return {
    source: 'arctracker',
    summary,
    derived: derive(summary),
    enemies: dedicatedEnemies.length > 0
      ? dedicatedEnemies
      : aggregate?.enemyKills.map((row) => ({ name: row.target.displayName, count: row.amount, itemId: row.target.itemId, imageFilename: row.target.imageFilename, sourceId: row.target.sourceId, target: row.target })) ?? [],
    weapons: dedicatedWeapons.length > 0
      ? dedicatedWeapons
      : aggregate?.weaponKills.map((row) => ({ name: row.target.displayName, count: row.amount, itemId: row.target.itemId, imageFilename: row.target.imageFilename, sourceId: row.target.sourceId, target: row.target })) ?? [],
    rounds: roundRows.map((round) => ({
      roundId: round.roundId,
      mapName: round.mapName,
      outcome: round.outcome === 'knockedOut' ? 'died' : round.outcome,
      valueBroughtIn: round.valueBroughtIn ?? 0,
      valueExtracted: round.valueExtracted ?? 0,
      netValue: round.netValue ?? 0,
      durationMs: round.durationMs ?? 0,
      arcKills: round.arcKills,
      playerKills: round.playerKills,
      damage: round.damage,
      containersLooted: round.containersLooted,
    })),
    maps: maps.length > 0
      ? maps
      : aggregate?.mapPerformance.map((row, index) => ({
          key: row.map.sourceId === null ? `${row.map.displayName}-${index}` : String(row.map.sourceId),
          mapName: row.map.displayName,
          raids: row.roundsPlayed,
          extracted: row.roundsExtracted,
          knockedOut: row.roundsKnockedOut,
          survivalRate: row.survivalRate,
          totalDurationMs: row.durationMs,
          totalNetValue: row.netValue,
        })) ?? [],
    aggregate,
    fetchedAt: payloads.fetchedAt ?? new Date().toISOString(),
    raw: {
      summary: payloads.summary,
      enemies: payloads.enemies,
      weapons: payloads.weapons,
      rounds: payloads.rounds,
      maps: payloads.maps,
    },
  };
}

export interface ArcTrackerFetchOptions {
  apiBase?: string;
  idToken: string;
  limit?: number;
  resolver?: StatsTargetResolver;
  fetchImpl?: typeof fetch;
}

async function requestJson(url: string, token: string, fetchImpl: typeof fetch): Promise<unknown> {
  const response = await fetchImpl(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || `ArcTracker stats request failed with HTTP ${response.status}`);
  }
  return response.json() as Promise<unknown>;
}

export async function fetchArcTrackerStatsDashboard(options: ArcTrackerFetchOptions): Promise<StatsDashboardData> {
  const apiBase = (options.apiBase ?? 'https://api.shiesty.me').replace(/\/$/, '');
  const fetchImpl = options.fetchImpl ?? fetch;
  const limit = options.limit ?? 200;
  const endpoints = ARCTRACKER_ENDPOINTS.stats;
  const results = await Promise.allSettled([
    requestJson(`${apiBase}${endpoints.summary}`, options.idToken, fetchImpl),
    requestJson(`${apiBase}${endpoints.enemyKills}`, options.idToken, fetchImpl),
    requestJson(`${apiBase}${endpoints.weaponKills}`, options.idToken, fetchImpl),
    requestJson(`${apiBase}${endpoints.rounds}?limit=${encodeURIComponent(String(limit))}`, options.idToken, fetchImpl),
    requestJson(`${apiBase}${endpoints.mapPerformance}`, options.idToken, fetchImpl),
  ]);

  const successful = results.filter((result): result is PromiseFulfilledResult<unknown> => result.status === 'fulfilled');
  if (successful.length === 0) {
    const firstFailure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected');
    throw firstFailure?.reason instanceof Error ? firstFailure.reason : new Error('Unable to load ArcTracker stats.');
  }

  const value = (index: number, fallback: unknown): unknown => results[index].status === 'fulfilled' ? results[index].value : fallback;
  return normalizeArcTrackerStatsDashboard({
    summary: value(0, {}),
    enemies: value(1, { enemies: [] }),
    weapons: value(2, { weapons: [] }),
    rounds: value(3, { rounds: [] }),
    maps: value(4, { maps: [] }),
  }, options.resolver);
}

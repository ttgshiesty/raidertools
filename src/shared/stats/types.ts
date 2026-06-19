export type CanonicalEntityKind = 'item' | 'weapon' | 'enemy' | 'map' | 'quest' | 'player' | 'unknown';

export type SourceIdKind =
  | 'slug'
  | 'itemId'
  | 'assetId'
  | 'gameAssetId'
  | 'weaponAssetId'
  | 'publicUuid'
  | 'targetId'
  | 'mapId'
  | 'questId';

export interface CanonicalEntity {
  kind: CanonicalEntityKind;
  slug: string;
  displayName: string;
  aliases?: readonly string[];
  sourceIds?: Partial<Record<SourceIdKind, string | number | readonly (string | number)[]>>;
  imageFilename?: string;
  source?: Record<string, unknown>;
}

export interface CanonicalEntityMatch {
  entity: CanonicalEntity;
  matchedBy: SourceIdKind | 'name' | 'alias';
  matchedValue: string;
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
  roundId: string | number;
  stats: readonly RawStatEvent[];
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
}

export interface NormalizedStatsTotals {
  damage: number;
  playerKills: number;
  arcKills: number;
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
  playerDowns: number;
  revives: number;
  xpGained: number;
  itemsCrafted: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
}

export type StatsSnapshotSource =
  | 'arctracker'
  | 'embark'
  | 'stats-player-v2'
  | 'extension'
  | 'unknown';

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
  raw: Record<string, unknown>;
}

export interface NormalizedMapPerformance {
  map: ResolvedStatTarget;
  roundsPlayed: number;
  roundsExtracted: number;
  roundsKnockedOut: number;
  durationMs: number;
  valueBroughtIn: number;
  valueExtracted: number;
  netValue: number;
}

export interface NormalizedAggregatePlayerStats {
  roundsPlayed: number;
  roundsExtracted: number;
  roundsKnockedOut: number;
  durationMs: number;
  damage: number;
  playerKills: number;
  arcKills: number;
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

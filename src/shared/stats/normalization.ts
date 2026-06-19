import resolverJson from '../../../shiesty-stats-target-resolver.json';
import itemsEnJson from '../../../public/data/items/items.en.json';
import embarkInventoryMappingJson from '../../../infra/lambda/data/embark-inventory-mapping.json';
import {
  RAIDER_BUDDY_CACHE_KEYS,
  clearRaiderBuddyCache,
  getRaiderBuddyCachedData,
  setRaiderBuddyCachedData,
} from '../services/raiderBuddyCache';
import type {
  CanonicalEntity,
  CanonicalEntityMatch,
  NormalizedAggregatePlayerStats,
  NormalizedMapPerformance,
  NormalizedRoundStats,
  NormalizedRoundStatsSnapshot,
  NormalizedRoundSummary,
  NormalizedPlayerStatsSnapshot,
  NormalizedStatsTotals,
  RawStatEvent,
  RawStatsRound,
  ResolvedStatTarget,
  SourceIdKind,
  StatBreakdownEntry,
  StatsSnapshotSource,
} from './types';

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
export const ROUND_STATS_STORAGE_KEY = RAIDER_BUDDY_CACHE_KEYS.roundStats;
export const PLAYER_STATS_STORAGE_KEY = RAIDER_BUDDY_CACHE_KEYS.playerStats;

type ResolverRecord = {
  id?: number;
  itemId?: string;
  slug?: string;
  name: string;
  assetId?: number | null;
  imageFilename?: string;
};

type ResolverData = {
  resolvers: {
    maps: Record<string, ResolverRecord>;
    enemies: Record<string, ResolverRecord>;
    weaponsByAssetId: Record<string, ResolverRecord>;
    itemsById: Record<string, ResolverRecord>;
    questsById: Record<string, ResolverRecord>;
  };
};

type CatalogItem = {
  name: { value: string; originalEn: string };
  description: string;
  type: string;
  rarity: string;
  value?: number;
  weightKg?: number;
  stackSize: number;
  imageFilename?: string;
  craftQuantity: number;
  recipe?: Record<string, number>;
  [key: string]: unknown;
};

type ItemsCatalog = {
  items: Record<string, CatalogItem>;
};

type EmbarkInventoryMapping = {
  gameAssetIdToItemId: Record<string, string>;
};

const resolver = resolverJson as unknown as ResolverData;
const itemCatalog = (itemsEnJson as ItemsCatalog).items;
const embarkInventoryMapping = embarkInventoryMappingJson as EmbarkInventoryMapping;
const itemByAssetId = new Map<string, ResolverRecord>();
for (const item of Object.values(resolver.resolvers.itemsById)) {
  if (item.assetId !== undefined && item.assetId !== null) itemByAssetId.set(String(item.assetId), item);
}
for (const [assetId, itemId] of Object.entries(embarkInventoryMapping.gameAssetIdToItemId)) {
  if (itemByAssetId.has(assetId)) continue;
  const catalogItem = itemCatalog[itemId];
  itemByAssetId.set(assetId, {
    itemId,
    name: catalogItem?.name.value ?? itemId,
    assetId: Number(assetId),
    imageFilename: catalogItem?.imageFilename,
  });
}

export function canonicalizeSlug(value: string): string {
  return normalizeLookupText(value).replace(/ /g, '_');
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

function sourceIdValues(
  value: NonNullable<CanonicalEntity['sourceIds']>[SourceIdKind],
): readonly (string | number)[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value as string | number];
}

export class CanonicalEntityIndex {
  private readonly bySourceId = new Map<string, CanonicalEntityMatch>();
  private readonly byText = new Map<string, CanonicalEntityMatch>();

  constructor(entities: readonly CanonicalEntity[]) {
    for (const entity of entities) this.add(entity);
  }

  add(entity: CanonicalEntity): void {
    this.addText(entity.slug, entity, 'slug');
    this.addText(entity.displayName, entity, 'name');
    for (const alias of entity.aliases ?? []) this.addText(alias, entity, 'alias');

    for (const [kind, value] of Object.entries(entity.sourceIds ?? {})) {
      for (const sourceId of sourceIdValues(value)) {
        this.bySourceId.set(`${kind}:${String(sourceId)}`, {
          entity,
          matchedBy: kind as SourceIdKind,
          matchedValue: String(sourceId),
        });
      }
    }
  }

  resolve(value: string | number, kind?: SourceIdKind): CanonicalEntityMatch | null {
    if (kind) return this.bySourceId.get(`${kind}:${String(value)}`) ?? null;
    const textMatch = this.byText.get(normalizeLookupText(String(value)));
    if (textMatch) return textMatch;

    for (const sourceKind of SOURCE_ID_KINDS) {
      const match = this.bySourceId.get(`${sourceKind}:${String(value)}`);
      if (match) return match;
    }
    return null;
  }

  private addText(value: string, entity: CanonicalEntity, matchedBy: 'slug' | 'name' | 'alias'): void {
    const key = normalizeLookupText(value);
    if (!key || this.byText.has(key)) return;
    this.byText.set(key, { entity, matchedBy, matchedValue: value });
  }
}

export function createItemEntityIndex(): CanonicalEntityIndex {
  const weaponAssetIdsByItemId = new Map<string, number[]>();
  const gameAssetIdsByItemId = new Map<string, number[]>();
  for (const [assetId, weapon] of Object.entries(resolver.resolvers.weaponsByAssetId)) {
    if (!weapon.itemId) continue;
    const assetIds = weaponAssetIdsByItemId.get(weapon.itemId) ?? [];
    assetIds.push(Number(assetId));
    weaponAssetIdsByItemId.set(weapon.itemId, assetIds);
  }
  for (const [assetId, itemId] of Object.entries(embarkInventoryMapping.gameAssetIdToItemId)) {
    const assetIds = gameAssetIdsByItemId.get(itemId) ?? [];
    assetIds.push(Number(assetId));
    gameAssetIdsByItemId.set(itemId, assetIds);
  }

  const entities = Object.entries(itemCatalog).map<CanonicalEntity>(([itemId, item]) => {
    const resolverItem = resolver.resolvers.itemsById[itemId];
    const weaponAssetIds = weaponAssetIdsByItemId.get(itemId);
    const gameAssetIds = new Set(gameAssetIdsByItemId.get(itemId) ?? []);
    if (resolverItem?.assetId !== undefined && resolverItem.assetId !== null) {
      gameAssetIds.add(resolverItem.assetId);
    }
    return {
      kind: weaponAssetIds ? 'weapon' : 'item',
      slug: itemId,
      displayName: item.name.value,
      aliases: [itemId.replace(/_/g, '-'), item.name.originalEn],
      sourceIds: {
        itemId,
        slug: itemId,
        ...(gameAssetIds.size > 0
          ? { assetId: [...gameAssetIds], gameAssetId: [...gameAssetIds] }
          : {}),
        ...(weaponAssetIds ? { weaponAssetId: weaponAssetIds } : {}),
      },
      ...(item.imageFilename ? { imageFilename: item.imageFilename } : {}),
      source: { ...item },
    };
  });
  return new CanonicalEntityIndex(entities);
}

const SOURCE_ID_KINDS: readonly SourceIdKind[] = [
  'slug',
  'itemId',
  'assetId',
  'gameAssetId',
  'weaponAssetId',
  'publicUuid',
  'targetId',
  'mapId',
  'questId',
];

function knownTarget(kind: ResolvedStatTarget['kind'], sourceId: string | number, entry: ResolverRecord): ResolvedStatTarget {
  const itemId = entry.itemId;
  const catalogItem = itemId ? itemCatalog[itemId] : undefined;
  return {
    kind,
    known: true,
    sourceId,
    canonicalSlug: itemId ?? canonicalizeSlug(entry.name),
    displayName: catalogItem?.name.value ?? entry.name,
    ...(itemId ? { itemId } : {}),
    ...(catalogItem?.imageFilename ? { imageFilename: catalogItem.imageFilename } : {}),
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

function unknownTarget(kind: ResolvedStatTarget['kind'], sourceId: string | number | null): ResolvedStatTarget {
  return {
    kind,
    known: false,
    sourceId,
    canonicalSlug: null,
    displayName: sourceId === null ? 'Unknown' : `Unknown ${kind} (${String(sourceId)})`,
  };
}

function eventTargetId(event: RawStatEvent): string | number | null {
  return event.targetId ?? null;
}

function weaponTargetId(event: RawStatEvent): string | number | null {
  return event.weaponAssetId ?? event.targetId ?? null;
}

export function resolveStatTarget(event: RawStatEvent): ResolvedStatTarget | null {
  const eventId = toFiniteNumber(event.eventId);
  if (eventId === null) return unknownTarget('unknown', eventTargetId(event));

  if (eventId === EMBARK_EVENT_IDS.damageByEnemyType || eventId === EMBARK_EVENT_IDS.killsByTarget) {
    const targetId = eventTargetId(event);
    if (Number(targetId) === PLAYER_TARGET_ID) return specialTarget(targetId ?? PLAYER_TARGET_ID, 'Raider / Player');
    if (Number(targetId) === PLAYER_DAMAGE_TARGET_ID) {
      return specialTarget(targetId ?? PLAYER_DAMAGE_TARGET_ID, 'Raider / Player damage subject');
    }
    if (targetId === null) return unknownTarget('enemy', null);
    const enemy = resolver.resolvers.enemies[String(targetId)];
    return enemy ? knownTarget('enemy', targetId, enemy) : unknownTarget('enemy', targetId);
  }

  if (eventId === EMBARK_EVENT_IDS.damageByWeapon || eventId === EMBARK_EVENT_IDS.killsByWeapon) {
    const targetId = weaponTargetId(event);
    if (targetId === null) return unknownTarget('weapon', null);
    const weapon = resolver.resolvers.weaponsByAssetId[String(targetId)];
    return weapon ? knownTarget('weapon', targetId, weapon) : unknownTarget('weapon', targetId);
  }

  if (
    eventId === EMBARK_EVENT_IDS.mapPlayed
    || eventId === EMBARK_EVENT_IDS.extracted
    || eventId === EMBARK_EVENT_IDS.knockedOut
    || eventId === EMBARK_EVENT_IDS.durationMs
    || eventId === EMBARK_EVENT_IDS.valueBroughtIn
    || eventId === EMBARK_EVENT_IDS.valueExtracted
  ) {
    const targetId = eventTargetId(event);
    if (targetId === null) return null;
    const map = resolver.resolvers.maps[String(targetId)];
    return map ? knownTarget('map', targetId, map) : unknownTarget('map', targetId);
  }

  if (eventId === EMBARK_EVENT_IDS.itemsCrafted) {
    const targetId = eventTargetId(event);
    if (targetId === null) return unknownTarget('item', null);
    const directCatalogItem = itemCatalog[String(targetId)];
    const item = resolver.resolvers.itemsById[String(targetId)] ?? itemByAssetId.get(String(targetId));
    const weapon = resolver.resolvers.weaponsByAssetId[String(targetId)];
    return directCatalogItem
      ? knownTarget('item', targetId, {
          itemId: String(targetId),
          name: directCatalogItem.name.value,
          imageFilename: directCatalogItem.imageFilename,
        })
      : item
      ? knownTarget(item.itemId && weapon ? 'weapon' : 'item', targetId, item)
      : weapon
        ? knownTarget('weapon', targetId, weapon)
        : unknownTarget('item', targetId);
  }

  if (eventId === EMBARK_EVENT_IDS.revives || eventId === EMBARK_EVENT_IDS.playerDowns) {
    const targetId = eventTargetId(event);
    if (Number(targetId) === SQUADMATE_REVIVE_TARGET_ID) {
      return specialTarget(targetId ?? SQUADMATE_REVIVE_TARGET_ID, 'Squadmate revive');
    }
    if (Number(targetId) === PLAYER_TARGET_ID) return specialTarget(targetId ?? PLAYER_TARGET_ID, 'Raider / Player');
    return unknownTarget('player', targetId);
  }

  return null;
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string' || value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function eventAmount(event: RawStatEvent): number {
  return toFiniteNumber(event.amount ?? event.value ?? event.count) ?? 0;
}

function addBreakdown(target: StatBreakdownEntry[], resolved: ResolvedStatTarget, amount: number): void {
  const existing = target.find((entry) => entry.target.kind === resolved.kind && entry.target.sourceId === resolved.sourceId);
  if (existing) existing.amount += amount;
  else target.push({ target: resolved, amount });
}

export function normalizeStatsRound(round: RawStatsRound): NormalizedRoundStats {
  const normalized: NormalizedRoundStats = {
    roundId: String(round.roundId),
    outcome: 'unknown',
    extracted: null,
    map: null,
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
    rawStats: round.stats,
  };

  for (const event of round.stats) {
    const eventId = toFiniteNumber(event.eventId);
    const amount = eventAmount(event);
    const target = resolveStatTarget(event);

    switch (eventId) {
      case EMBARK_EVENT_IDS.damageByEnemyType:
        normalized.damage += amount;
        if (Number(event.targetId) === PLAYER_DAMAGE_TARGET_ID || Number(event.targetId) === PLAYER_TARGET_ID) {
          normalized.playerDamage += amount;
        } else {
          normalized.arcDamage += amount;
        }
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
        break;
      case EMBARK_EVENT_IDS.extracted:
        normalized.outcome = 'extracted';
        normalized.extracted = true;
        normalized.map = target ?? normalized.map;
        break;
      case EMBARK_EVENT_IDS.knockedOut:
        normalized.outcome = 'knockedOut';
        normalized.extracted = false;
        normalized.map = target ?? normalized.map;
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

  if (normalized.valueBroughtIn !== null && normalized.valueExtracted !== null) {
    normalized.netValue = normalized.valueExtracted - normalized.valueBroughtIn;
  }
  return normalized;
}

export function normalizeStatsRounds(rounds: readonly RawStatsRound[]): NormalizedRoundStats[] {
  return rounds.map(normalizeStatsRound);
}

function firstNumber(source: Record<string, unknown>, keys: readonly string[]): number {
  for (const key of keys) {
    const value = toFiniteNumber(source[key]);
    if (value !== null) return value;
  }
  return 0;
}

function firstBoolean(source: Record<string, unknown>, keys: readonly string[]): boolean | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value > 0;
    if (typeof value === 'string') {
      const normalized = normalizeLookupText(value);
      if (['true', 'extracted', 'returned safely', 'success', 'survived'].includes(normalized)) return true;
      if (['false', 'knocked out', 'failed', 'died', 'death'].includes(normalized)) return false;
    }
  }
  return null;
}

export function normalizeStatsTotals(source: Record<string, unknown>): NormalizedStatsTotals {
  const durationMs = firstNumber(source, ['durationMs', 'durationMilliseconds', 'totalDurationMs'])
    || firstNumber(source, ['durationSeconds', 'totalDurationSeconds', 'duration']) * 1000;
  return {
    damage: firstNumber(source, ['damage', 'damageDealt', 'totalDamage', 'totalDamageDealt']),
    playerKills: firstNumber(source, ['playerKills', 'kills', 'totalPlayerKills']),
    arcKills: firstNumber(source, ['arcKills', 'arcEnemyKills', 'enemiesKilled', 'totalArcKills']),
    lootValue: firstNumber(source, ['lootValue', 'valueExtracted', 'totalLootValue']),
    loadoutValue: firstNumber(source, ['loadoutValue', 'valueBroughtIn', 'totalLoadoutValue']),
    durationMs,
    extracted: firstBoolean(source, ['extracted', 'outcome', 'extractionOutcome', 'survived']),
    containersLooted: firstNumber(source, ['containersLooted', 'containerLooted', 'totalContainersLooted']),
    itemsExtracted: firstNumber(source, ['itemsExtracted', 'itemExtractions', 'totalItemsExtracted']),
  };
}

export function summarizeStatsRounds(rounds: readonly NormalizedRoundStats[]): NormalizedRoundSummary {
  const summary: NormalizedRoundSummary = {
    roundsPlayed: rounds.length,
    roundsExtracted: 0,
    roundsKnockedOut: 0,
    damage: 0,
    playerKills: 0,
    arcKills: 0,
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
  return summary;
}

function validIsoDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

export function createRoundStatsSnapshot(
  rounds: readonly RawStatsRound[],
  source: StatsSnapshotSource,
  fetchedAt = new Date().toISOString(),
): NormalizedRoundStatsSnapshot {
  const normalizedRounds = normalizeStatsRounds(rounds)
    .sort((a, b) => b.roundId.localeCompare(a.roundId));
  return {
    schemaVersion: 1,
    source,
    fetchedAt,
    savedAt: new Date().toISOString(),
    rounds: normalizedRounds,
    summary: summarizeStatsRounds(normalizedRounds),
  };
}

export function createPlayerStatsSnapshot(
  raw: Record<string, unknown>,
  source: StatsSnapshotSource,
  fetchedAt = new Date().toISOString(),
): NormalizedPlayerStatsSnapshot {
  const aggregate = normalizeStatsPlayerV2(raw);
  const flatTotals = normalizeStatsTotals(raw);
  return {
    schemaVersion: 1,
    source,
    fetchedAt,
    savedAt: new Date().toISOString(),
    totals: aggregate ? {
      damage: aggregate.damage,
      playerKills: aggregate.playerKills,
      arcKills: aggregate.arcKills,
      lootValue: aggregate.valueExtracted,
      loadoutValue: aggregate.valueBroughtIn,
      durationMs: aggregate.durationMs,
      extracted: null,
      containersLooted: aggregate.containersLooted,
      itemsExtracted: flatTotals.itemsExtracted,
    } : flatTotals,
    aggregate,
    raw: { ...raw },
  };
}

function scopedPlayerEvents(raw: Record<string, unknown>): RawStatEvent[] | null {
  if (Array.isArray(raw.playerStats)) return raw.playerStats as RawStatEvent[];
  if (!Array.isArray(raw.scopedPlayerStats)) return null;
  for (const scope of raw.scopedPlayerStats) {
    if (!scope || typeof scope !== 'object') continue;
    const events = (scope as Record<string, unknown>).playerStats;
    if (Array.isArray(events)) return events as RawStatEvent[];
  }
  return null;
}

function mapPerformanceEntry(
  entries: Map<string, NormalizedMapPerformance>,
  target: ResolvedStatTarget,
): NormalizedMapPerformance {
  const key = String(target.sourceId);
  const existing = entries.get(key);
  if (existing) return existing;
  const created: NormalizedMapPerformance = {
    map: target,
    roundsPlayed: 0,
    roundsExtracted: 0,
    roundsKnockedOut: 0,
    durationMs: 0,
    valueBroughtIn: 0,
    valueExtracted: 0,
    netValue: 0,
  };
  entries.set(key, created);
  return created;
}

export function normalizeStatsPlayerV2(raw: Record<string, unknown>): NormalizedAggregatePlayerStats | null {
  const events = scopedPlayerEvents(raw);
  if (!events) return null;
  const result: NormalizedAggregatePlayerStats = {
    roundsPlayed: 0,
    roundsExtracted: 0,
    roundsKnockedOut: 0,
    durationMs: 0,
    damage: 0,
    playerKills: 0,
    arcKills: 0,
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
    const target = resolveStatTarget(event);
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

  result.netValue = result.valueExtracted - result.valueBroughtIn;
  result.mapPerformance = [...maps.values()].map((map) => ({
    ...map,
    netValue: map.valueExtracted - map.valueBroughtIn,
  }));
  return result;
}

export function saveRoundStatsSnapshot(
  snapshot: NormalizedRoundStatsSnapshot,
): boolean {
  return setRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.roundStats, snapshot);
}

export function savePlayerStatsSnapshot(
  snapshot: NormalizedPlayerStatsSnapshot,
): boolean {
  return setRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.playerStats, snapshot);
}

export function loadRoundStatsSnapshot(): NormalizedRoundStatsSnapshot | null {
  try {
    const cached = getRaiderBuddyCachedData<NormalizedRoundStatsSnapshot>(RAIDER_BUDDY_CACHE_KEYS.roundStats);
    if (!cached) return null;
    const parsed = cached.data as Partial<NormalizedRoundStatsSnapshot>;
    if (
      parsed.schemaVersion !== 1
      || !validIsoDate(parsed.fetchedAt)
      || !validIsoDate(parsed.savedAt)
      || !Array.isArray(parsed.rounds)
      || !parsed.summary
      || typeof parsed.summary !== 'object'
    ) {
      clearRaiderBuddyCache(RAIDER_BUDDY_CACHE_KEYS.roundStats);
      return null;
    }
    return parsed as NormalizedRoundStatsSnapshot;
  } catch {
    clearRaiderBuddyCache(RAIDER_BUDDY_CACHE_KEYS.roundStats);
    return null;
  }
}

export function loadPlayerStatsSnapshot(): NormalizedPlayerStatsSnapshot | null {
  try {
    const cached = getRaiderBuddyCachedData<NormalizedPlayerStatsSnapshot>(RAIDER_BUDDY_CACHE_KEYS.playerStats);
    if (!cached) return null;
    const parsed = cached.data as Partial<NormalizedPlayerStatsSnapshot>;
    if (
      parsed.schemaVersion !== 1
      || !validIsoDate(parsed.fetchedAt)
      || !validIsoDate(parsed.savedAt)
      || !parsed.totals
      || typeof parsed.totals !== 'object'
      || !('aggregate' in parsed)
      || !parsed.raw
      || typeof parsed.raw !== 'object'
    ) {
      clearRaiderBuddyCache(RAIDER_BUDDY_CACHE_KEYS.playerStats);
      return null;
    }
    return parsed as NormalizedPlayerStatsSnapshot;
  } catch {
    clearRaiderBuddyCache(RAIDER_BUDDY_CACHE_KEYS.playerStats);
    return null;
  }
}

export function clearStatsSnapshots(): void {
  clearRaiderBuddyCache(RAIDER_BUDDY_CACHE_KEYS.roundStats);
  clearRaiderBuddyCache(RAIDER_BUDDY_CACHE_KEYS.playerStats);
}

export type {
  CanonicalEntity,
  CanonicalEntityMatch,
  NormalizedPlayerStatsSnapshot,
  NormalizedAggregatePlayerStats,
  NormalizedMapPerformance,
  NormalizedRoundStats,
  NormalizedRoundStatsSnapshot,
  NormalizedRoundSummary,
  NormalizedStatsTotals,
  RawStatEvent,
  RawStatsRound,
  ResolvedStatTarget,
  StatsSnapshotSource,
} from './types';

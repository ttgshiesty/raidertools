// types.ts
// Shape that every raid-history UI component consumes. Pages never touch
// raw API responses directly — everything flows through normalizeRaid().
//
// Field names follow the canonical vocabulary in Stats-Normalization.md
// (damage, playerKills, arcKills, lootValue, loadoutValue, durationMs,
// extracted, containersLooted, itemsExtracted) so this page's data shape
// matches the rest of the app rather than inventing its own dialect.

// Matches the `outcome` filter values on GET /api/v2/user/rounds.
export type RaidOutcome = "extracted" | "died" | "unknown";

export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

// The six map slugs documented for the rounds endpoint's `map` filter.
export const KNOWN_MAP_SLUGS = [
  "dam-battleground",
  "the-spaceport",
  "blue-gate",
  "stella-montis",
  "buried-city",
  "riven-tides",
] as const;

export interface NormalizedLootItem {
  itemId: string;
  itemName: string;
  rarity: ItemRarity;
  value: number;
  quantity: number;
}

export interface NormalizedRaid {
  id: string;
  startedAt: string; // ISO 8601
  durationMs: number;
  mapId: string; // map slug, e.g. "dam-battleground"
  mapName: string;
  outcome: RaidOutcome;
  playerKills: number;
  arcKills: number;
  damage: number;
  lootValue: number; // value extracted
  loadoutValue: number; // value brought in
  netValue: number; // lootValue - loadoutValue, derived
  containersLooted: number;
  itemsExtracted: number;
  squadSize: number;
  squadmates: string[];
  topLoot: NormalizedLootItem | null;
  // Rough timeline markers used by the row's signature visualization.
  // msIntoRaid is clamped to [0, durationMs] by the normalizer.
  events: Array<{
    type: "playerKill" | "arcKill" | "lootPickup";
    msIntoRaid: number;
  }>;
}

export interface RaidHistoryFilters {
  outcome: RaidOutcome | "all";
  mapId: string | "all";
  dateRange: "7d" | "30d" | "90d" | "all";
}

export interface RaidHistorySummary {
  totalRaids: number;
  extractionRate: number; // 0–1
  avgLootValue: number;
  avgNetValue: number;
  totalKills: number; // playerKills + arcKills
  totalContainersLooted: number;
}

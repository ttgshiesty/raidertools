/**
 * blueprintGrid.ts
 *
 * Builds the blueprint registry from `public/data/items/items.<locale>.json`.
 *
 * Every Blueprint-typed item in the items database becomes one card. Card
 * metadata (rarity, category, target name, icon) comes directly from the
 * corresponding item record. ARCTracker `learned`/`duplicates` progress is
 * overlaid when the caller passes a progress map keyed by blueprint id.
 */

import { resolveItemAssetUrl } from '../../../data/assetUrl.js';
import type { RawItem, RawItemsOutput } from '../../../shared/types/item';

// ─── Constants ────────────────────────────────────────────────────────────────

export const BLUEPRINT_GRID_SIZE = 83;

// ─── Types ────────────────────────────────────────────────────────────────────

export type BlueprintSort = 'ingame' | 'name' | 'rarity';

export interface BlueprintGridItem {
  slot: number;
  slug?: string;
  id: string;
  targetItemId: string;
  name: string;
  targetName: string;
  targetItemName: string | null;
  category: string;
  rarity: string;
  targetRarity: string | null;
  blueprintRarity: string | null;
  isWeapon: boolean;
  imageFilename: string | null;
  imageUrl?: string | null;
  fallbackImageUrl?: string | null;
  description?: string;
  craftedAt?: string | null;
  recipe?: string[];
  learned: boolean | null;
  duplicates?: number;
  unknown?: boolean;
}

export interface BlueprintGridFilters {
  query: string;
  category: string;
  status: 'all' | 'learned' | 'unlearned' | 'owned';
}

export interface BlueprintProgressEntry {
  learned?: boolean;
  duplicates?: number;
}

// ─── Rarity colour map ────────────────────────────────────────────────────────

const RARITY_ORDER: Record<string, number> = {
  Legendary: 0,
  Epic: 1,
  Rare: 2,
  Uncommon: 3,
  Common: 4,
};

export function getRarityColor(rarity: string): string {
  const normalized = rarity.trim().toLowerCase();
  const colorMap: Record<string, string> = {
    legendary: '#d4af37',
    epic: '#a855f7',
    rare: '#3b82f6',
    uncommon: '#22c55e',
    common: '#6b7280',
  };
  return colorMap[normalized] ?? '#6b7280';
}

// ─── Blueprint extractor ──────────────────────────────────────────────────────

function blueprintType(raw: RawItem): string {
  const t = raw.type;
  if (typeof t === 'string') return t;
  if (t && typeof t === 'object' && 'value' in t) {
    const v = (t as { value?: unknown }).value;
    return typeof v === 'string' ? v : '';
  }
  return '';
}

function craftBenchToCraftedAt(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string').join(', ') || null;
  return null;
}

function itemToBlueprintGridItem(
  itemId: string,
  raw: RawItem,
  slot: number,
): BlueprintGridItem | null {
  if (blueprintType(raw) !== 'Blueprint') return null;
  const name = raw.name?.value ?? raw.name?.originalEn ?? itemId;
  const imageUrl = resolveItemAssetUrl(raw.imageFilename ?? null, itemId);
  return {
    slot,
    id: itemId,
    targetItemId: itemId.replace(/_blueprint$/i, ''),
    name,
    targetName: name,
    targetItemName: null,
    category: typeof raw.foundIn === 'string' ? raw.foundIn : 'Blueprint',
    rarity: raw.rarity ?? 'Common',
    targetRarity: null,
    blueprintRarity: raw.rarity ?? 'Common',
    isWeapon: Boolean(raw.isWeapon),
    imageFilename: raw.imageFilename ?? null,
    imageUrl,
    fallbackImageUrl: null,
    description: raw.description ?? '',
    craftedAt: craftBenchToCraftedAt(raw.craftBench),
    recipe: raw.recipe ? Object.keys(raw.recipe) : undefined,
    learned: null,
    duplicates: 0,
    unknown: false,
  };
}

function defaultSortBlueprints(items: BlueprintGridItem[]): BlueprintGridItem[] {
  return [...items].sort((a, b) => {
    const ra = RARITY_ORDER[a.rarity] ?? 99;
    const rb = RARITY_ORDER[b.rarity] ?? 99;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });
}

export function sortBlueprints(
  items: BlueprintGridItem[],
  sort: BlueprintSort = 'rarity',
  locale?: string,
): BlueprintGridItem[] {
  const collator = new Intl.Collator(locale || undefined, { sensitivity: 'base' });
  const copy = [...items];
  switch (sort) {
    case 'name':
      return copy.sort((a, b) => collator.compare(a.name, b.name));
    case 'rarity':
      return copy.sort((a, b) => {
        const ra = RARITY_ORDER[a.rarity] ?? 99;
        const rb = RARITY_ORDER[b.rarity] ?? 99;
        if (ra !== rb) return ra - rb;
        return collator.compare(a.name, b.name);
      });
    case 'ingame':
    default:
      return copy.sort((a, b) => {
        if (a.slot !== b.slot) return a.slot - b.slot;
        return collator.compare(a.name, b.name);
      });
  }
}

export { defaultSortBlueprints as _defaultSortBlueprints };

// ─── Public builders ──────────────────────────────────────────────────────────

export function buildBlueprintGridFromItems(
  items: Record<string, RawItem>,
  progress?: Record<string, BlueprintProgressEntry>,
): BlueprintGridItem[] {
  const extracted: BlueprintGridItem[] = [];
  let slot = 1;
  for (const [itemId, raw] of Object.entries(items)) {
    const bp = itemToBlueprintGridItem(itemId, raw, slot);
    if (bp) {
      const entry = progress?.[itemId];
      if (entry) {
        bp.learned = entry.learned ?? null;
        bp.duplicates = entry.duplicates ?? 0;
      }
      extracted.push(bp);
      slot += 1;
    }
  }
  return defaultSortBlueprints(extracted);
}

export function buildBlueprintGridFromPayload(
  payload: RawItemsOutput,
  progress?: Record<string, BlueprintProgressEntry>,
): BlueprintGridItem[] {
  return buildBlueprintGridFromItems(payload.items, progress);
}

/**
 * @deprecated Prefer `buildBlueprintGridFromItems`. Kept for callers that
 * still pass a `catalog` argument; treats the first argument as a
 * `RawItemsOutput` payload.
 */
export function buildBlueprintGrid(
  catalog: unknown,
  cache?: unknown,
): BlueprintGridItem[] {
  let items: Record<string, RawItem> = {};
  if (catalog && typeof catalog === 'object' && 'items' in catalog) {
    items = (catalog as RawItemsOutput).items ?? {};
  } else if (catalog && typeof catalog === 'object') {
    items = catalog as Record<string, RawItem>;
  }
  const progress = cache && typeof cache === 'object' && 'progress' in cache
    ? (cache as { progress?: Record<string, BlueprintProgressEntry> }).progress
    : undefined;
  return buildBlueprintGridFromItems(items, progress);
}

// ─── Filtering ────────────────────────────────────────────────────────────────

export function filterBlueprintGrid(
  blueprints: readonly BlueprintGridItem[],
  filters: BlueprintGridFilters,
): BlueprintGridItem[] {
  return blueprints.filter((bp) => matchesBlueprintGridFilter(bp, filters));
}

export function matchesBlueprintGridFilter(
  blueprint: BlueprintGridItem,
  filters: BlueprintGridFilters,
): boolean {
  const query = filters.query.trim().toLocaleLowerCase('en-US');

  if (filters.category !== 'all' && blueprint.category !== filters.category) {
    return false;
  }

  if (filters.status === 'learned' && blueprint.learned !== true) return false;
  if (filters.status === 'unlearned' && blueprint.learned === true) return false;
  if (filters.status === 'owned' && (blueprint.duplicates ?? 0) < 1) return false;

  if (!query) return true;

  return [
    blueprint.name,
    blueprint.targetName,
    blueprint.targetItemName,
    blueprint.id,
    blueprint.slug,
    blueprint.targetItemId,
    blueprint.category,
    blueprint.rarity,
  ]
    .filter((value): value is string => typeof value === 'string')
    .some((value) => value.toLocaleLowerCase('en-US').includes(query));
}

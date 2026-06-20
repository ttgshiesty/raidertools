import blueprintDataJson from '../../../data/shiesty-blueprints.json';
import type { CachedBlueprints } from '../../../shared/types/arctracker';
import type { RawItem, RawItemsOutput } from '../../../shared/types/item';

export type BlueprintStatusFilter = 'all' | 'learned' | 'unlearned';

interface BlueprintReferenceRecord {
  id: string;
  targetItemId: string;
  category: string;
  rarity: string;
  imageFilename?: string;
}

interface BlueprintReferenceData {
  categoryOrder: string[];
  blueprints: BlueprintReferenceRecord[];
}

export interface BlueprintGridItem {
  id: string;
  targetItemId: string;
  name: string;
  targetName: string;
  category: string;
  rarity: string;
  imageFilename: string | null;
  learned: boolean | null;
}

export interface BlueprintGridFilters {
  query: string;
  category: string;
  status: BlueprintStatusFilter;
}

const blueprintData = blueprintDataJson as BlueprintReferenceData;

export const BLUEPRINT_CATEGORY_ORDER = blueprintData.categoryOrder;

export function buildBlueprintGrid(
  catalog: RawItemsOutput | null,
  cachedBlueprints: CachedBlueprints | null,
): BlueprintGridItem[] {
  const learnedIds = cachedBlueprints
    ? new Set(
        Object.values(cachedBlueprints.blueprintsByTargetItemId)
          .filter((blueprint) => blueprint.learned)
          .map((blueprint) => blueprint.id),
      )
    : null;

  return blueprintData.blueprints.map((blueprint) => {
    const blueprintItem = catalog?.items[blueprint.id] as RawItem | undefined;
    const targetItem = catalog?.items[blueprint.targetItemId] as RawItem | undefined;
    return {
      id: blueprint.id,
      targetItemId: blueprint.targetItemId,
      name: blueprintItem?.name.value ?? humanizeId(blueprint.id),
      targetName: targetItem?.name.value ?? humanizeId(blueprint.targetItemId),
      category: blueprint.category,
      rarity: blueprintItem?.rarity ?? blueprint.rarity,
      imageFilename: blueprintItem?.imageFilename ?? blueprint.imageFilename ?? null,
      learned: learnedIds ? learnedIds.has(blueprint.id) : null,
    };
  });
}

export function filterBlueprintGrid(
  blueprints: readonly BlueprintGridItem[],
  filters: BlueprintGridFilters,
): BlueprintGridItem[] {
  const query = filters.query.trim().toLocaleLowerCase('en-US');
  return blueprints.filter((blueprint) => {
    if (filters.category !== 'all' && blueprint.category !== filters.category) return false;
    if (filters.status === 'learned' && blueprint.learned !== true) return false;
    if (filters.status === 'unlearned' && blueprint.learned !== false) return false;
    if (!query) return true;
    return [blueprint.name, blueprint.targetName, blueprint.id, blueprint.targetItemId]
      .some((value) => value.toLocaleLowerCase('en-US').includes(query));
  });
}

function humanizeId(value: string): string {
  return value
    .replace(/_blueprint$/, '')
    .split('_')
    .map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : part)
    .join(' ');
}

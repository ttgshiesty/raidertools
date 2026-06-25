export type BlueprintRarity =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'
  | string;

export interface BlueprintJsonItem {
  id: string;
  name: string | Record<string, string>;
  category?: string;
  rarity?: BlueprintRarity;
  targetItemId?: string;
  itemId?: string;
  craftedAt?: string;
  recipe?: string[];
  assetUrl?: string;
  icon?: string;
  image?: string;
  isBlueprint?: boolean;
  type?: string;
  itemType?: string;
  [key: string]: unknown;
}

export interface BlueprintItem {
  id: string;
  name: string | Record<string, string>;
  category: string;
  rarity: BlueprintRarity;
  targetItemId: string;
  craftedAt?: string;
  recipe?: string[];
  assetUrl?: string;
  icon?: string;
  image?: string;
  source: BlueprintJsonItem;
}

type BlueprintJsonShape =
  | BlueprintJsonItem[]
  | {
      blueprints?: BlueprintJsonItem[];
      items?: BlueprintJsonItem[];
      data?: BlueprintJsonItem[] | { blueprints?: BlueprintJsonItem[]; items?: BlueprintJsonItem[] };
    };

const BLUEPRINT_JSON_PATHS = [
  '/data/blueprints-list.json',
  '/blueprints-list.json',
  '/items.en.json',
  '/data/items.en.json',
];

function getTextName(name: string | Record<string, string> | undefined, fallback: string): string {
  if (!name) return fallback;
  if (typeof name === 'string') return name;
  return name.en ?? name['en-US'] ?? Object.values(name).find(Boolean) ?? fallback;
}

function normalizeRarity(value: unknown): BlueprintRarity {
  if (typeof value === 'string' && value.trim()) return value;
  return 'Common';
}

function normalizeCategory(item: BlueprintJsonItem): string {
  if (typeof item.category === 'string' && item.category.trim()) return item.category;
  if (typeof item.itemType === 'string' && item.itemType.trim()) return item.itemType;
  if (typeof item.type === 'string' && item.type.trim()) return item.type;
  return 'Unknown';
}

function isBlueprintItem(item: BlueprintJsonItem): boolean {
  const id = String(item.id ?? '').toLowerCase();
  const name = getTextName(item.name, id).toLowerCase();
  const type = String(item.type ?? item.itemType ?? item.category ?? '').toLowerCase();

  return (
    item.isBlueprint === true ||
    id.includes('blueprint') ||
    name.includes('blueprint') ||
    type.includes('blueprint')
  );
}

function unwrapBlueprintArray(json: BlueprintJsonShape): BlueprintJsonItem[] {
  if (Array.isArray(json)) return json;

  if (Array.isArray(json.blueprints)) return json.blueprints;
  if (Array.isArray(json.items)) return json.items;

  if (Array.isArray(json.data)) return json.data;

  if (json.data && !Array.isArray(json.data)) {
    if (Array.isArray(json.data.blueprints)) return json.data.blueprints;
    if (Array.isArray(json.data.items)) return json.data.items;
  }

  return [];
}

function normalizeBlueprint(item: BlueprintJsonItem): BlueprintItem {
  const id = String(item.id);
  const name = item.name ?? id;

  const targetItemId =
    typeof item.targetItemId === 'string' && item.targetItemId.trim()
      ? item.targetItemId
      : typeof item.itemId === 'string' && item.itemId.trim()
        ? item.itemId
        : id.replace(/_?blueprint$/i, '');

  return {
    id,
    name,
    category: normalizeCategory(item),
    rarity: normalizeRarity(item.rarity),
    targetItemId,
    craftedAt: item.craftedAt,
    recipe: Array.isArray(item.recipe) ? item.recipe : undefined,
    assetUrl: typeof item.assetUrl === 'string' ? item.assetUrl : undefined,
    icon: typeof item.icon === 'string' ? item.icon : undefined,
    image: typeof item.image === 'string' ? item.image : undefined,
    source: item,
  };
}

async function fetchJson(path: string): Promise<BlueprintJsonShape | null> {
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) return null;

  return (await response.json()) as BlueprintJsonShape;
}

export async function loadBlueprintsJson(): Promise<BlueprintItem[]> {
  const failures: string[] = [];

  for (const path of BLUEPRINT_JSON_PATHS) {
    try {
      const json = await fetchJson(path);
      if (!json) {
        failures.push(`${path}: not found`);
        continue;
      }

      const rawItems = unwrapBlueprintArray(json);
      const blueprints = rawItems
        .filter((item) => item && typeof item.id === 'string')
        .filter(isBlueprintItem)
        .map(normalizeBlueprint);

      if (blueprints.length > 0) {
        return blueprints;
      }

      failures.push(`${path}: JSON loaded but no blueprint items found`);
    } catch (error) {
      failures.push(
        `${path}: ${error instanceof Error ? error.message : 'failed to parse JSON'}`,
      );
    }
  }

  throw new Error(`No blueprint JSON found. Tried: ${failures.join('; ')}`);
}
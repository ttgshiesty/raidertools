import type { AppLocale } from '../i18n/config';

function getLocalizedValue(
  values: Record<string, string> | undefined,
  locale: AppLocale
): string {
  if (!values) {
    return '';
  }

  if (locale === 'pt-BR') {
    return values['pt-BR'] ?? values.pt ?? values.en ?? '';
  }

  if (locale === 'ko-KR') {
    return values['ko-KR'] ?? values.ko ?? values.kr ?? values.en ?? '';
  }

  return values[locale] ?? values.en ?? '';
}

export interface LoadedItem {
  id: string;
  name: {
    value: string;
    originalEn: string;
  };
  description: string;
  type: string;
  rarity: string;
  value?: number;
  weightKg?: number;
  stackSize: number;
  isWeapon?: boolean;
  imageFilename?: string;
  foundIn?: string[] | string;
  craftBench?: string | string[];
  stationLevelRequired?: number;
  blueprintLocked?: boolean;
  craftQuantity: number;
  recipe?: Record<string, number>;
  upgradeCost?: Record<string, number>;
  upgradesTo?: string;
  upgradesFrom?: string;
  weaponBaseId?: string;
  weaponTier?: 1 | 2 | 3 | 4;
  recyclesInto?: Record<string, number>;
  salvagesInto?: Record<string, number>;
  repairCost?: Record<string, number>;
  repairDurability?: number;
  questItem?: boolean;
  effects?: Record<string, unknown>;
  modSlots?: string[];
  craftSkills?: string[];
  vendors?: unknown[];
  updatedAt?: string;
  addedIn?: string;
  [key: string]: unknown;
}

export interface ItemsMap {
  [itemId: string]: LoadedItem;
}

export async function loadAllItemsFromIndividualFiles(locale: AppLocale): Promise<ItemsMap> {
  // First, get the list of item files from the directory
  const indexResponse = await fetch('/data/items/items.json');
  if (!indexResponse.ok) {
    throw new Error(`Failed to load items index: ${indexResponse.status}`);
  }
  const indexData = await indexResponse.json() as { items: Record<string, LoadedItem> };
  
  const itemIds = Object.keys(indexData.items);
  const itemsMap: ItemsMap = {};

  // Load each item file individually
  for (const itemId of itemIds) {
    try {
      const itemResponse = await fetch(`/data/items/${itemId}.json`);
      if (!itemResponse.ok) {
        continue;
      }
      const raw = await itemResponse.json();
      
      // Transform to LoadedItem format
      const item: LoadedItem = {
        id: raw.id,
        name: {
          value: getLocalizedValue(raw.name, locale),
          originalEn: raw.name?.en ?? raw.name,
        },
        description: getLocalizedValue(raw.description, locale),
        type: raw.type,
        rarity: raw.rarity,
        stackSize: raw.stackSize ?? 1,
        craftQuantity: raw.craftQuantity ?? 1,
        ...(raw.value !== undefined && { value: raw.value }),
        ...(raw.weightKg !== undefined && { weightKg: raw.weightKg }),
        ...(raw.isWeapon !== undefined && { isWeapon: raw.isWeapon }),
        ...(raw.imageFilename !== undefined && { imageFilename: raw.imageFilename }),
        ...(raw.foundIn !== undefined && { foundIn: raw.foundIn }),
        ...(raw.craftBench !== undefined && { craftBench: raw.craftBench }),
        ...(raw.stationLevelRequired !== undefined && { stationLevelRequired: raw.stationLevelRequired }),
        ...(raw.blueprintLocked !== undefined && { blueprintLocked: raw.blueprintLocked }),
        ...(raw.recipe && Object.keys(raw.recipe).length > 0 && { recipe: raw.recipe }),
        ...(raw.upgradeCost && Object.keys(raw.upgradeCost).length > 0 && { upgradeCost: raw.upgradeCost }),
        ...(raw.upgradesTo && { upgradesTo: raw.upgradesTo }),
        ...(raw.recyclesInto && Object.keys(raw.recyclesInto).length > 0 && { recyclesInto: raw.recyclesInto }),
        ...(raw.salvagesInto && Object.keys(raw.salvagesInto).length > 0 && { salvagesInto: raw.salvagesInto }),
        ...(raw.repairCost && Object.keys(raw.repairCost).length > 0 && { repairCost: raw.repairCost }),
        ...(raw.repairDurability !== undefined && { repairDurability: raw.repairDurability }),
        ...(raw.questItem === true && { questItem: true }),
        ...(raw.effects !== undefined && { effects: raw.effects }),
        ...(raw.modSlots !== undefined && { modSlots: raw.modSlots }),
        ...(raw.craftSkills !== undefined && { craftSkills: raw.craftSkills }),
        ...(raw.vendors !== undefined && { vendors: raw.vendors }),
        ...(raw.updatedAt !== undefined && { updatedAt: raw.updatedAt }),
        ...(raw.addedIn !== undefined && { addedIn: raw.addedIn }),
      };

      itemsMap[itemId] = item;
    } catch {
      // Skip items that fail to load
    }
  }

  return itemsMap;
}

// import type { AppLocale } from '../i18n/config';

export interface LoadedItem {
  id: string;
  name: string;
  originalNameEn: string;
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
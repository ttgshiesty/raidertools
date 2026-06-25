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

export function getRarityColor(rarity: string): string {
  const normalized = rarity.trim().toLowerCase();

  const colorMap: Record<string, string> = {
    legendary: '#ffc600',
    epic: '#cc3099',
    rare: '#00a8f2',
    uncommon: '#26bf57',
    common: '#6c6c6c',
  };

  return colorMap[normalized] ?? colorMap.common;
}
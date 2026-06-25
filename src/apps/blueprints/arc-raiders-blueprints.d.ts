export interface ArcRaidersBlueprint {
  id: string;
  name: string;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Uncommon' | 'Common' | string;
  category: string;
  description: string;
  craftedAt?: string;
  recipe?: string[];
  icon: string;
}

export const b: ArcRaidersBlueprint[];
import { describe, expect, it } from 'vitest';
import type { RawItem } from '../../../../shared/types/item';
import {
  buildBlueprintGridFromItems,
  buildBlueprintGridFromPayload,
  filterBlueprintGrid,
  getRarityColor,
} from '../blueprintGrid';

function makeBlueprint(id: string, overrides: Partial<RawItem> = {}): RawItem {
  return {
    name: { value: `Test ${id}`, originalEn: `Test ${id}` },
    description: '',
    type: 'Blueprint',
    rarity: 'Common',
    stackSize: 1,
    craftQuantity: 1,
    imageFilename: `${id}.webp`,
    ...overrides,
  };
}

function makeNonBlueprint(id: string): RawItem {
  return {
    name: { value: `Item ${id}`, originalEn: `Item ${id}` },
    description: '',
    type: 'Weapon',
    rarity: 'Common',
    stackSize: 1,
    craftQuantity: 1,
    ...{},
  };
}

describe('buildBlueprintGridFromItems', () => {
  it('extracts only items typed as Blueprint', () => {
    const items: Record<string, RawItem> = {
      anvil_blueprint: makeBlueprint('anvil', { rarity: 'Uncommon' }),
      bettina_blueprint: makeBlueprint('bettina', { rarity: 'Epic' }),
      anvil: makeNonBlueprint('anvil'),
    };
    const grid = buildBlueprintGridFromItems(items);
    expect(grid).toHaveLength(2);
    expect(grid.map((bp) => bp.id).sort()).toEqual(['anvil_blueprint', 'bettina_blueprint']);
  });

  it('sorts by rarity (Legendary first) then by name', () => {
    const items: Record<string, RawItem> = {
      a_blueprint: makeBlueprint('a', { rarity: 'Common' }),
      b_blueprint: makeBlueprint('b', { rarity: 'Legendary' }),
      c_blueprint: makeBlueprint('c', { rarity: 'Epic' }),
      d_blueprint: makeBlueprint('d', { rarity: 'Rare' }),
    };
    const grid = buildBlueprintGridFromItems(items);
    expect(grid.map((bp) => bp.rarity)).toEqual(['Legendary', 'Epic', 'Rare', 'Common']);
  });

  it('overlays learned state and duplicate count from the progress map', () => {
    const items: Record<string, RawItem> = {
      anvil_blueprint: makeBlueprint('anvil'),
    };
    const grid = buildBlueprintGridFromItems(items, {
      anvil_blueprint: { learned: true, duplicates: 3 },
    });
    expect(grid[0]).toMatchObject({ learned: true, duplicates: 3 });
  });

  it('accepts the raw items-en.json payload via the payload builder', () => {
    const items = {
      x_blueprint: makeBlueprint('x', { rarity: 'Rare' }),
      y_blueprint: makeBlueprint('y', { rarity: 'Legendary' }),
    };
    const grid = buildBlueprintGridFromPayload({ version: 1, items });
    expect(grid).toHaveLength(2);
    expect(grid[0].rarity).toBe('Legendary');
  });

  it('derives an asset URL via resolveItemAssetUrl', () => {
    const items: Record<string, RawItem> = {
      anvil_blueprint: makeBlueprint('anvil'),
    };
    const grid = buildBlueprintGridFromItems(items);
    expect(grid[0].imageUrl).toMatch(/anvil\.webp$/);
  });
});

describe('filterBlueprintGrid', () => {
  const sample = [
    {
      slot: 1,
      id: 'a_blueprint',
      targetItemId: 'a',
      name: 'Alpha Blueprint',
      targetName: 'Alpha',
      targetItemName: 'Alpha',
      category: 'Weapons',
      rarity: 'Common',
      targetRarity: 'Common',
      blueprintRarity: 'Common',
      isWeapon: false,
      imageFilename: null,
      learned: true,
    },
    {
      slot: 2,
      id: 'b_blueprint',
      targetItemId: 'b',
      name: 'Bravo Blueprint',
      targetName: 'Bravo',
      targetItemName: 'Bravo',
      category: 'Medical',
      rarity: 'Rare',
      targetRarity: 'Rare',
      blueprintRarity: 'Rare',
      isWeapon: false,
      imageFilename: null,
      learned: false,
    },
  ];

  it('filters by category, status, and localized name', () => {
    expect(
      filterBlueprintGrid(sample as never, { query: 'alpha', category: 'Weapons', status: 'learned' }),
    ).toEqual([sample[0]]);
    expect(
      filterBlueprintGrid(sample as never, { query: '', category: 'Medical', status: 'unlearned' }),
    ).toEqual([sample[1]]);
  });

  it('returns empty array when nothing matches', () => {
    expect(
      filterBlueprintGrid(sample as never, { query: 'nope', category: 'all', status: 'all' }),
    ).toEqual([]);
  });
});

describe('getRarityColor', () => {
  it('returns the hex color for known rarities', () => {
    expect(getRarityColor('Legendary')).toBe('#d4af37');
    expect(getRarityColor('Epic')).toBe('#a855f7');
    expect(getRarityColor('Rare')).toBe('#3b82f6');
    expect(getRarityColor('Uncommon')).toBe('#22c55e');
    expect(getRarityColor('Common')).toBe('#6b7280');
  });

  it('is case-insensitive', () => {
    expect(getRarityColor('LEGENDARY')).toBe('#d4af37');
  });

  it('falls back to grey for unknown rarities', () => {
    expect(getRarityColor('Mythic')).toBe('#6b7280');
  });
});

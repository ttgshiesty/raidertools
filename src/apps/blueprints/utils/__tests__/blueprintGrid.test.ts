import { describe, expect, it } from 'vitest';
import type { CachedBlueprints } from '../../../../shared/types/arctracker';
import { buildBlueprintGrid, filterBlueprintGrid } from '../blueprintGrid';

describe('blueprint grid', () => {
  it('builds the complete canonical 83-blueprint grid', () => {
    const grid = buildBlueprintGrid(null, null);
    expect(grid).toHaveLength(83);
    expect(grid.every((blueprint) => blueprint.learned === null)).toBe(true);
  });

  it('matches learned state by blueprint id despite target item aliases', () => {
    const cache: CachedBlueprints = {
      unlockedItemIds: ['anvil'],
      blueprintsByTargetItemId: {
        anvil: {
          id: 'anvil_blueprint',
          name: 'Anvil Blueprint',
          category: 'Weapons',
          rarity: 'Common',
          learned: true,
          targetItemId: 'anvil',
        },
      },
      syncedAt: '2026-06-20T12:00:00.000Z',
      cachedAt: 1,
    };
    const grid = buildBlueprintGrid(null, cache);
    expect(grid.find((blueprint) => blueprint.id === 'anvil_blueprint')).toMatchObject({
      targetItemId: 'anvil_i',
      learned: true,
    });
  });

  it('filters by category, status, and localized name', () => {
    const grid = [
      { id: 'a', targetItemId: 'a_item', name: 'Alpha Blueprint', targetName: 'Alpha', category: 'Weapons', rarity: 'Common', imageFilename: null, learned: true },
      { id: 'b', targetItemId: 'b_item', name: 'Bravo Blueprint', targetName: 'Bravo', category: 'Medical', rarity: 'Rare', imageFilename: null, learned: false },
    ];
    expect(filterBlueprintGrid(grid, { query: 'alpha', category: 'Weapons', status: 'learned' })).toEqual([grid[0]]);
    expect(filterBlueprintGrid(grid, { query: '', category: 'Medical', status: 'unlearned' })).toEqual([grid[1]]);
  });
});

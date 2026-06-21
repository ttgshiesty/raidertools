/**
 * blueprintGrid.ts
 *
 * Core utility for building, filtering, and colouring the 83-slot blueprint
 * grid.  Unchanged from the original except:
 *  • `BlueprintGridFilters.status` now includes `'owned'` explicitly
 *  • `getRarityColor` returns the rarity-specific neon colour used by both
 *    the NeonBorder component and the SVG gradient cards
 */

// ─── Constants ────────────────────────────────────────────────────────────────

export const BLUEPRINT_GRID_SIZE = 83;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlueprintGridItem {
  slot: number;
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
  learned: boolean | null;
  duplicates?: number;
  unknown?: boolean;
}

export interface BlueprintGridFilters {
  query: string;
  category: string;
  status: 'all' | 'learned' | 'unlearned' | 'owned';
}

// ─── Rarity colour map ────────────────────────────────────────────────────────

/**
 * Returns the neon hex colour for a given rarity tier.
 * These colours are used by:
 *  - NeonBorder (conic gradient tint)
 *  - BlueprintCardSvg (SVG linear gradient)
 *  - BlueprintRegistryDetail (accent colour, distribution bars)
 */
export function getRarityColor(rarity: string): string {
  const colorMap: Record<string, string> = {
    Legendary: '#d4af37', // Gold
    Epic:      '#a855f7', // Purple
    Rare:      '#3b82f6', // Blue
    Uncommon:  '#22c55e', // Green
    Common:    '#6b7280', // Grey
  };
  return colorMap[rarity] ?? '#6b7280';
}

// ─── Grid builder ─────────────────────────────────────────────────────────────

/**
 * Builds the canonical 83-slot blueprint grid.
 *
 * @param catalog   - Optional game-data catalog (typed as unknown here; cast
 *                    to your real catalog type in the calling module).
 * @param cache     - Optional cached blueprint data from Firestore / localStorage.
 *
 * When both are null the function returns 83 unknown placeholder slots so the
 * grid always renders at full size.
 */
export function buildBlueprintGrid(
  catalog: unknown,
  cache: unknown,
): BlueprintGridItem[] {
  // If no catalog data is available, return a full grid of unknown placeholders.
  // Replace this stub with your real data-mapping logic.
  if (!catalog && !cache) {
    return Array.from({ length: BLUEPRINT_GRID_SIZE }, (_, index) => ({
      slot: index + 1,
      id: `unknown-slot-${index + 1}`,
      targetItemId: '',
      name: '???',
      targetName: 'Unknown',
      targetItemName: null,
      category: 'Unknown',
      rarity: 'Common',
      targetRarity: null,
      blueprintRarity: null,
      isWeapon: false,
      imageFilename: null,
      learned: null,
      duplicates: 0,
      unknown: true,
    }));
  }

  // TODO: implement real catalog + cache merge here.
  return [];
}

// ─── Fixed-slot builder ───────────────────────────────────────────────────────

/**
 * Ensures the grid always has exactly BLUEPRINT_GRID_SIZE slots, filling gaps
 * with unknown placeholders.
 */
export function buildFixedBlueprintSlots(
  blueprints: readonly BlueprintGridItem[],
): BlueprintGridItem[] {
  const bySlot = new Map(blueprints.map((bp) => [bp.slot, bp]));
  return Array.from({ length: BLUEPRINT_GRID_SIZE }, (_, index) => {
    const slot = index + 1;
    return (
      bySlot.get(slot) ?? {
        slot,
        id: `unknown-slot-${slot}`,
        targetItemId: '',
        name: '???',
        targetName: 'Unknown',
        targetItemName: null,
        category: 'Unknown',
        rarity: 'Common',
        targetRarity: null,
        blueprintRarity: null,
        isWeapon: false,
        imageFilename: null,
        learned: false,
        duplicates: 0,
        unknown: true,
      }
    );
  });
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

  if (filters.category !== 'all' && blueprint.category !== filters.category)
    return false;

  if (filters.status === 'learned'   && blueprint.learned !== true)  return false;
  if (filters.status === 'unlearned' && blueprint.learned !== false) return false;
  if (filters.status === 'owned'     && (blueprint.duplicates ?? 0) < 1) return false;

  if (!query) return true;

  return [
    blueprint.name,
    blueprint.targetName,
    blueprint.targetItemName,
    blueprint.id,
    blueprint.targetItemId,
  ]
    .filter((v): v is string => typeof v === 'string')
    .some((v) => v.toLocaleLowerCase('en-US').includes(query));
}

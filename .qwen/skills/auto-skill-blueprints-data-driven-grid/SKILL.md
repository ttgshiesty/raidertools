---
name: blueprints-data-driven-grid
description: Procedure for converting a placeholder/canonical-list grid in the blueprints app (or any new app) into one that reads from the localized items-en.json payload and overlays ARCTracker progress
source: auto-skill
extracted_at: '2026-06-22T16:47:36.681Z'
---

# Data-driven grid for the blueprints app

Use this when a grid in `src/apps/blueprints/` (or a sibling app) is rendering placeholder cards and needs to be wired to real item data from `public/data/items/items.<locale>.json`.

## Background

The blueprints app's canonical-list era had a hardcoded 83-slot grid referencing `/icons/blueprints/<slug>.webp` paths that don't exist. That produced gray "???" placeholders. Real blueprint data lives in `items-en.json` with `type === "Blueprint"`.

The same recipe applies to any new app that needs a list of items (skill-tree, etc.): filter the items DB by `type`, sort, render.

## Files involved

| File | Role |
|---|---|
| `public/data/items/items.<locale>.json` | Source: `{ version, items: Record<id, RawItem> }` |
| `src/shared/types/item.ts` | `RawItem` and `RawItemsOutput` types |
| `src/shared/utils/localizedContent.ts` | `fetchLocalizedJson<T>(path, locale)` with locale fallback chain |
| `src/data/assetUrl.js` | `resolveItemAssetUrl(filename, fallbackId)` — handles CDN remap |
| `src/apps/blueprints/utils/blueprintGrid.ts` | `buildBlueprintGridFromItems(items, progress?)` — the canonical entry point |
| `src/apps/blueprints/NeonBorder.tsx` | Local NeonBorder (not the shared one) |
| `src/apps/blueprints/styles/main.scss` | `.blueprint-card`, `.blueprint-card-inner`, `.blueprint-card-icon` |

## Procedure

### Step 1 — Read the source data

```python
import json
with open('public/data/items/items.en.json') as f:
    d = json.load(f)
blueprints = [(k, v) for k, v in d['items'].items()
              if (v.get('type') if isinstance(v.get('type'), str) else v.get('type', {}).get('value')) == 'Blueprint']
```

`type` can be a string OR `{ value: string }` — handle both. The shared extractor in `blueprintGrid.ts` does this.

### Step 2 — Use the right sort order

Rarity priority: `Legendary (0) → Epic (1) → Rare (2) → Uncommon (3) → Common (4)`, then alpha by name. Don't sort by slot number — there are no slots in the new model.

### Step 3 — Wire the loader

In the page component:

```tsx
import { useLocale } from '../../shared/context/LocaleContext';
import { fetchLocalizedJson } from '../../shared/utils/localizedContent';
import type { RawItemsOutput } from '../../shared/types/item';
import { buildBlueprintGridFromItems } from './utils/blueprintGrid';

const { locale } = useLocale();
const [itemsDb, setItemsDb] = useState<Record<string, RawItemsOutput['items'][string]> | null>(null);

useEffect(() => {
  let cancelled = false;
  fetchLocalizedJson<RawItemsOutput>('items', locale)
    .then((payload) => { if (!cancelled) setItemsDb(payload.items ?? {}); })
    .catch(() => { if (!cancelled) setItemsDb({}); });
  return () => { cancelled = true; };
}, [locale]);

const allBlueprints = useMemo(
  () => buildBlueprintGridFromItems(itemsDb ?? {}, progress),
  [itemsDb, progress],
);
```

`fetchLocalizedJson` handles the `pt-BR → pt → en` fallback chain. Don't reimplement it.

### Step 4 — Resolve image URLs through `resolveItemAssetUrl`

`raw.imageFilename` is sometimes a raw.githubusercontent.com URL, sometimes a cdn.arctracker.io URL, sometimes a bare filename. `resolveItemAssetUrl` remaps all of them to `https://assets.shiesty.me/items/<file>`. Always call it, never trust the raw value.

### Step 5 — Render cards with explicit dimensions in SCSS

`.neon-border-content > *` forces `width: 100%` on direct children. If your inner shell doesn't have explicit dimensions in SCSS, it will collapse to fit the NeonBorder (which is `width: 100%` of its parent, which is `width: 100%` of the grid cell — stretching the card).

**Add SCSS rules for `.blueprint-card-inner`, `.blueprint-card-icon`, etc.** Do not use inline `style={{}}` — AGENTS.md says SCSS only.

### Step 6 — Overlay progress

`buildBlueprintGridFromItems(items, progress)` accepts a `Record<id, { learned?, duplicates? }>` and merges it onto the derived grid. Pass the localStorage-loaded map directly.

### Step 7 — Update tests

`src/apps/blueprints/utils/__tests__/blueprintGrid.test.ts` exercises the `buildBlueprintGridFromItems` contract. Test cases should cover:
- Type filtering (only `type === "Blueprint"`)
- Rarity-then-name sort
- Progress overlay
- Asset URL derivation
- `filterBlueprintGrid` (category + status + query)

If the old test relied on `buildBlueprintGrid(null, null)` returning 83 known slots, that contract is gone — rewrite the test to match the new function.

## Pitfalls

- **The `type` field is sometimes wrapped in `{ value }`** — `if (typeof raw.type === 'string') raw.type === 'Blueprint'` is wrong half the time. The shared extractor handles both.
- **No slots in the new model** — the old `slot: 1..83` ordering is gone. Sort is by rarity then name.
- **`unknown: true` flag is gone** — every card now has a real `name` and `imageUrl`. Remove `bp.unknown` branches in the card render.
- **Don't add `inline-fallback t('key', 'literal')` calls** — add the key to `en.json` instead. The `blueprints.loading`, `blueprints.guide.*` keys were added for this purpose.
- **The `NeonBorder` import path matters** — `src/apps/blueprints/NeonBorder.tsx` is the local one. The `src/shared/components/NeonBorder.tsx` exists too but is a different component.

## Verification

```bash
npm test -- --run                # 185/185 expected
npm run build                    # must succeed
npm run lint                     # no new errors in the touched files
```

After the change, the grid should render actual blueprint icons (resolved via CDN) in a tight 10-column 80px grid, sorted Legendary → Common.

## When NOT to use this skill

- If the user just wants to add a single new visual variant of an existing card → use `simplify` instead
- If the user wants to wire ARCTracker data (login + JWT) — that's `docs/Authentication.md` territory, not this skill
- If the user wants to add a new app from scratch — use `new-app` instead

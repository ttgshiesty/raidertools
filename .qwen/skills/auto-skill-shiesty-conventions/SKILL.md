---
name: shiesty-conventions
description: Quick reference for AGENTS.md conventions enforced in the Shiesty/ARC Raiders tools repo — covers i18n, Quartermaster spec-first, auth/user-data docs, styling, deps, and known false positives in static analysis
source: auto-skill
extracted_at: '2026-06-23T21:58:10.510Z'
---

# Shiesty repo conventions

A condensed, lookup-friendly version of the rules in `AGENTS.md` plus conventions observed during audits. Use this as a pre-flight checklist before any change.

## Read these docs first

| Touching… | Read first |
|---|---|
| Sign-in, identity provider, JWT-protected endpoint, Cognito config, anything under `src/shared/auth/`, `src/shared/context/CognitoAuthContext.tsx`, `src/pages/SignIn*`/`SignUp*`/`AuthCallback.tsx`, `infra/lambda/discord-auth.ts`, `infra/lambda/cognito-*-auth.ts` | `docs/Authentication.md` |
| Server-persisted user data, linked-account tokens, `src/shared/state/`, `src/shared/services/userApi.ts`, `infra/lambda/profile.ts`, `links.ts`, `state.ts` | `docs/User-Data.md` |
| Any functional change in `src/apps/quartermaster/` | `docs/specifications/quartermaster/change-XX-*.md` (or create one) AND `docs/specifications/quartermaster/specification-quartermaster.md` |

## i18n rules (Crowdin-managed)

- `en.json` is the **only** locale humans may edit
- All other locales (`de`, `fr`, `pt-BR`, `es`, `it`, `ja`, `ko-KR`, `pl`, `pt`, `ru`, `tr`, `zh-CN`, `zh-TW`) are managed by Crowdin — never touch directly
- Every new `t()`/`tm()` call **must** add a key to `en.json` in the same change
- Never change the **value** of an existing key (invalidates volunteer translations) — add a new key instead
- Never remove a key from `en.json` without first removing every `t()`/`tm()` reference via grep
- The `t('key', 'literal')` inline-fallback form **bypasses Crowdin** — avoid
- Run `check-i18n-integrity` skill after any i18n change

## Quartermaster spec-first

- All functional changes must be planned in `docs/specifications/quartermaster/change-XX-xxx.md` first
- Must be presented to the user for approval
- After approval, update `specification-quartermaster.md` BEFORE writing code
- Change requests are intermediate — for **research**, always read the final `specification-quartermaster.md`
- Standardize `Status:` headers so CI can verify lifecycle (`Proposed` → `Approved` → `Implemented`)

## Styling

- No inline `style={{...}}` in components — SCSS only
- App-specific styles: `src/apps/<app>/styles/main.scss` + `_*.scss` partials
- Generic shared: `src/shared/styles/`
- Use `@use 'sass:color'` when using color functions
- 2-space indentation, no trailing semicolons (Prettier handles it)
- Use shared variables from `_variables.scss` — don't redefine

## Components

- `lucide-react` for icons — never custom SVGs unless absolutely necessary
- Use shared components: `Layout`, `Header`, `Footer`, `Sidebar`, `LoadingSpinner`, `ErrorDisplay`, `ItemIcon`, `QuestTooltip`, `LoginButton`, `SignInNudge`, `SyncErrorBanner`, `NeonBorder`
- New shared components go in `src/shared/components/`

## React Compiler + fast-refresh

- Context files should export only the provider component — hooks/utilities in separate files
- Don't define components inside other components (e.g. `Footer.tsx` defines `DiscordIcon` inline)
- Avoid `setState` synchronously inside `useEffect` (cascading renders)
- Add `react-hooks/exhaustive-deps` deps unless you have a documented reason

## TypeScript

- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- Prefer `type` for unions, `interface` for objects
- No `any` — use `unknown` and narrow

## State

- Use controlled components and local state where possible
- Context API for cross-component state
- `zustand` for global stores (existing dep)
- Local persistence via `idb` (existing dep)
- LocalStorage progress keys: `arc-raiders-blueprints` (blueprints) — stringified JSON of `{ id: { learned, duplicates } }`

## Item/asset data flow

- Item data lives at `public/data/items/items.<locale>.json` (en, de, fr, pt-BR, …) — format: `{ version, items: Record<id, RawItem> }`
- Type-safe: `RawItem` in `src/shared/types/item.ts`. `type: "Blueprint" | "Weapon" | …` (string or `{ value }` wrapper)
- Fetch via `fetchLocalizedJson<T>('items', locale)` from `src/shared/utils/localizedContent.ts` (handles fallback chain)
- Resolve image URLs via `resolveItemAssetUrl(raw.imageFilename, fallbackId)` from `src/data/assetUrl.js` — handles `assets.shiesty.me` CDN, cdn.arctracker.io remap, raw.githubusercontent.com remap
- Same loader is shared by craft-calculator, loot-helper, **blueprints**, and any new app that needs items

## NeonBorder (blueprints app)

- Lives at `src/apps/blueprints/NeonBorder.tsx` (local copy, NOT the `src/shared/components/NeonBorder.tsx` one)
- CSS in `src/apps/blueprints/styles/neon.scss`
- The wrapper sets `--neon-content-width: auto` and `--neon-content-height: auto` by default → children size to intrinsic
- The CSS rule `.neon-border-content > *` forces `width: 100%; height: 100%` on direct children → if you don't want your inner shell to fill the NeonBorder, give it explicit dimensions in SCSS (NOT inline styles)

## Time formatting

Two shared utilities — always use these instead of local reimplementations:

- `formatAgeShort(isoString)` — past/elapsed time ("5m", ">1h")
- `formatExpirationShort(expiresAt)` — future/remaining time ("5m left", "Expired")

Both live in `src/shared/utils/`.

## Build / deploy

- `npm run build` — `tsc -b` + Vite
- Output to `dist/` (gitignored)
- Sourcemaps disabled in prod (`vite.config.ts`)
- Deployed to AWS Amplify on push to `main` (`amplify.yml`)
- No manual deploy steps
- DO NOT test in browser / start dev server — user runs that

## When "files exist but aren't wired in"

A recurring pattern: code is committed (scaffolding, pages, hooks) but never imported by the app shell. **`tsc` will not flag the broken imports** because the file has no entry point that would force its module graph to resolve.

Symptoms:
- `grep -rln "<ComponentName>" src/` returns only the file itself and a few siblings, never an `import` line
- `npx tsc -b` reports zero errors even though the file has `import { X } from "./nonexistent"`
- The build *appears* green until the moment the file is wired in, then a wave of import errors appears

Workflow when the user says "add these files to the app" or "make sure X is on the page":
1. Verify each file actually exists (`ls`)
2. `grep -rln "<Name>" src/` to confirm whether it's imported anywhere
3. If only the file itself matches → it's dead code, tsc won't help, fix imports **before** wiring
4. Fix cross-directory imports by tracing actual file locations, not assuming — relative paths like `./types`, `./useRaidHistory`, `./TopKillsBarChart` are red flags when the file lives in a different directory
5. Re-export from a `types/index.ts` barrel so other modules can `import type { ... } from '../types'` instead of reaching across directories
6. Then wire it in (route, tab, etc.) and **then** run `tsc -b`

For JSON imports: confirm the file's actual location on disk before assuming (`find . -name "*.json" -not -path "./node_modules/*"`). `resolveJsonModule: true` is set, but a wrong path still fails.

## Git commits

- Subject ≤76 chars, imperative mood, no prefixes (no `TASK:`, no `#123`)
- No `Co-Authored-By: Warp` line
- Body explains "why", not "what"
- Keep working tree clean before committing — `git status` should show only intended changes

## Common false positives in static analysis

- **knip "Unused dependencies (1)"** with many packages listed — knip's compact reporter collapses groups. The `1` is the group count, not the package count. Verify with `--reporter symbols` (slower) before removing.
- **`amazon-cognito-identity-js` flagged by npm audit** — direct dep, but the actual CVE is in `js-cookie` (transitive). Upgrade `amazon-cognito-identity-js` to clear, or pin a `js-cookie` override.
- **t() keys in test files** — `it('…')` strings look like keys. The i18n check skips `__tests__/` and `*.test.*` for this reason.
- **`shiesty.pem`** is gitignored ✓ — don't add it to anything.
- **`shiesty-stats-target-resolver.json`** is imported directly into the bundle from `src/shared/stats/normalization.ts`. ~256KB. Acceptable for now but worth noting for bundle size.

## When user says "audit"

→ invoke the `audit-shiesty` skill. Do not start running checks ad-hoc.

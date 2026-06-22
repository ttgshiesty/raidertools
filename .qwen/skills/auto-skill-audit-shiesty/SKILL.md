---
name: audit-shiesty
description: Full audit workflow for the Shiesty/ARC Raiders tools React/TypeScript/Vite repo — runs static checks, security, i18n, and convention checks, then produces a structured findings report
source: auto-skill
extracted_at: '2026-06-21T23:38:57.246Z'
---

# Audit the Shiesty repo

Use this when the user asks for a "project audit", "code review", or "health check" of this repo. It runs a known set of static checks in parallel, then synthesizes findings against `AGENTS.md` conventions.

## Pre-flight (read-only)

```bash
git status                              # surface dirty tree, untracked dirs
ls src/apps/                           # confirm 5+ sub-apps exist
cat AGENTS.md | head -100               # recall conventions
cat package.json                        # scripts, deps
ls .qwen/                              # check for untracked agent state
```

## Parallel static checks

Run these concurrently (the user typically has no dev server running):

```bash
npm test                # vitest run — ~70s, 178 tests
npm run build           # tsc -b + vite build — ~45s, also reports bundle sizes
npm run lint            # eslint — fast
npm audit               # CVEs (use --json for parsing)
npx knip --reporter compact   # dead code/exports/deps — can be slow on this repo
```

**Note on knip**: It hangs in this repo (likely large `src/` + dual workspace config). Run in the background and read `/tmp/knip.out` after a timeout. Don't block on it.

## What the static checks miss — run these too

### i18n integrity (Crowdin safety)

`en.json` is the only locale humans may edit. Other locales are Crowdin-managed. After every code change touching i18n:

```bash
python3 << 'EOF'
import json, re, os
used = set()
for root, _, files in os.walk('src'):
    if '__tests__' in root or '.test.' in root or '.spec.' in root:
        continue
    for f in files:
        if not (f.endswith('.ts') or f.endswith('.tsx')): continue
        with open(os.path.join(root, f), errors='ignore') as fh:
            for m in re.finditer(r"\b(?:t|tm|i18nKey)\(\s*[`'\"]([a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z0-9_]+)+)[`'\"](?:\s*[,)])", fh.read()):
                used.add(m.group(1))
with open('src/shared/i18n/locales/en.json') as f:
    en = json.load(f)
def flatten(o, prefix=''):
    if isinstance(o, dict):
        for k, v in o.items(): yield from flatten(v, prefix + k + '.')
    else:
        yield prefix.rstrip('.')
en_keys = set(flatten(en))
missing = used - en_keys
extra = en_keys - used
print(f'missing in en.json: {len(missing)}')
for k in sorted(missing): print(' ', k)
print(f'orphan in en.json: {len(extra)}')
EOF
```

Also grep for the **inline-fallback anti-pattern**:

```bash
grep -rE "t\(['\"]([a-zA-Z][^'\"]+)['\"],\s*['\"]" src/ | grep -v __tests__
```

Every hit is a Crowdin bypass — the literal string is shown, not the dictionary value.

### Working-tree hygiene

```bash
git ls-files --others --exclude-standard    # untracked
```

Watch for: `blueprint-files/`, `docs/REFERANCE/`, `docs/INPORTANT/`, `.qwen/`, `public/data/`, `public/images/`. Some of these are intended (new app artifacts), others are stray reference materials that should be gitignored.

### Inline styles

```bash
grep -rE "style=\{\{[^}]+\}\}" src/ | wc -l
grep -rln "style={" src/ | wc -l
```

AGENTS.md says zero. Current baseline: ~91 inline style attributes across ~33 files.

### Security hot-spots to verify, not grep for

- `.env` (gitignored ✓, but check `ls -la .env` for mode 600)
- `dangerouslySetInnerHTML`, `eval`, `innerHTML =` — should all be empty
- `amazon-cognito-identity-js` direct dep — flagged by npm audit (high via `js-cookie`)
- Cognito + Discord-bridged auth surface in `src/shared/auth/` and `src/shared/context/CognitoAuthContext.tsx` — read `docs/Authentication.md` first

## Report structure

Produce findings in this order, marking severity:

1. **Security** (npm audit summary, secret hygiene, auth surface)
2. **Lint** (group by rule, give file paths, count per group)
3. **Dependency hygiene** (knip output + manual checks for `safe-stable-stringify`, `tsx`, `aws-lambda` in devDeps)
4. **i18n integrity** (missing/orphan keys, inline-fallback count)
5. **Working-tree hygiene** (untracked dirs that need `.gitignore`)
6. **Architecture drift** (inline styles, spec-first status of QM change docs, file size hotspots)
7. **Build/runtime** (chunk sizes > 500 KB, sourcemap settings)
8. **Quick wins** (3–8 numbered, ordered by impact)

End with **what you did NOT verify** — be honest about scope.

## Conventions this repo enforces (per `AGENTS.md`)

- **No inline styles** in components — SCSS only
- **`en.json` is the only hand-edited locale** — never touch other locales
- **Quartermaster is spec-first** — any functional change needs a `change-XX-*.md` doc + spec update before code
- **Cognito/Discord auth changes** require reading `docs/Authentication.md` first
- **User-data changes** require reading `docs/User-Data.md` first
- **i18n keys removed from code must be removed from `en.json`** (and vice versa — orphan keys waste Crowdin)
- **i18n key values must not be edited** (only added/deleted) — adding a new key preserves volunteer translations
- **Git commits** — no `Co-Authored-By: Warp`, no prefixes (TASK/#), imperative subject ≤76 chars

## Common false positives to filter

- Knip's `Unused dependencies (1)` line that lists many packages — knip's compact reporter collapses groups; the count is `1 group`, not `1 package`
- `t()` keys ending in numbers or `auto`/`unknown`/`map` — the regex requires letter-starting keys with at least one dot
- Dotted keys with trailing whitespace or `\\\n` in JSX multiline — adjust regex if reported

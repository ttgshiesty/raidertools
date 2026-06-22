---
name: check-i18n-integrity
description: Verify the i18n dictionary in src/shared/i18n/locales/en.json is in sync with t()/tm() calls in src/ — finds missing keys, orphan keys, and inline-fallback anti-patterns
source: auto-skill
extracted_at: '2026-06-21T23:38:57.246Z'
---

# Check i18n integrity

Crowdin syncs non-English locales from `en.json`. Mismatches cause two failure modes:

1. **Missing key** — `t('foo.bar')` renders empty string in production (English users don't notice, translators do)
2. **Orphan key** — dead `en.json` entry wastes translator effort on every sync

This skill is the specific procedure for catching both, plus the inline-fallback anti-pattern that bypasses Crowdin entirely.

## When to run

- After any change to `src/shared/i18n/locales/en.json`
- After adding/removing a `t()` or `tm()` call in `src/`
- After adding a new app under `src/apps/`
- As part of the `audit-shiesty` skill

## Procedure

### Step 1 — Find missing keys (used in code, not in en.json)

```bash
python3 << 'EOF'
import json, re, os
used = set()
for root, _, files in os.walk('src'):
    # Skip test/spec files — they use string literals that are not t() keys
    if '__tests__' in root or '.test.' in root or '.spec.' in root:
        continue
    for f in files:
        if not (f.endswith('.ts') or f.endswith('.tsx')): continue
        path = os.path.join(root, f)
        with open(path, errors='ignore') as fh:
            content = fh.read()
        # Match t('foo.bar.baz', ...) or tm('foo.bar.baz', ...) — first arg must be a dotted string
        for m in re.finditer(
            r"\b(?:t|tm|i18nKey)\(\s*[`'\"]([a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z0-9_]+)+)[`'\"](?:\s*[,)])",
            content,
        ):
            used.add(m.group(1))

with open('src/shared/i18n/locales/en.json') as f:
    en = json.load(f)

def flatten(o, prefix=''):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from flatten(v, prefix + k + '.')
    else:
        yield prefix.rstrip('.')

en_keys = set(flatten(en))
missing = used - en_keys
print(f'Used in code but MISSING from en.json: {len(missing)}')
for k in sorted(missing):
    print(' ', k)
EOF
```

### Step 2 — Find orphan keys (in en.json, not used in code)

Same script — just flip the set difference:

```python
extra = en_keys - used
print(f'In en.json but NEVER USED: {len(extra)}')
for k in sorted(extra):
    print(' ', k)
```

If `en.json` has >50 orphans, the new code likely refactored away a feature. Verify before bulk-deleting — translators may have noticed it.

### Step 3 — Find inline-fallback anti-pattern

`@formatjs`-style libraries accept a second arg as the inline literal fallback. The Crowdin workflow forbids this because the literal is shown regardless of locale:

```bash
grep -rE "t\(['\"]([a-zA-Z][^'\"]+)['\"],\s*['\"]" src/ | grep -v __tests__
```

Every hit is a Crowdin bypass. For each:
- If the string is a stable label → move to `en.json` and use `t('key')` form
- If the string is a dynamic concatenation → restructure as an ICU message

**Before editing markup to remove an inline fallback**: confirm with the user. The `t('key', 'literal')` call is usually embedded inside a `<p>`, `<h1>`, `<option>`, or `placeholder=` attribute, and the user may be protective of the visual output. Refactoring to `t('key')` should be a no-op when the dictionary value matches the literal, but always:
1. Show the user which `t()` calls you plan to change and the surrounding markup
2. Make a minimal change — drop the second arg only; do not touch surrounding JSX, attributes, or styling
3. Do not reformat the file (Prettier should be the only formatter)

### Step 4 — Verify the change

```bash
npm run build    # tsc -b will fail if a t() key is missing at type level
```

For type-safe t() calls, see if the project uses `t as TFuncKey` or similar declaration merging. If yes, missing keys fail at compile time. If no, runtime check is the only safety net.

## Pitfalls

- **Multi-line `t()` calls** — the regex requires the key to be followed by `,` or `)`. JSX sometimes has the closing paren several lines later. The pattern handles whitespace but watch for trailing comma in the function args.
- **Computed keys** (`t(\`foo.${x}\``) — not detectable statically. If you must use them, document in the spec.
- **Test files contain `it('…', () => { t('…') })`** — the first arg to `it()` is a string. The regex requires `t|tm|i18nKey` prefix to avoid this, but if you have wrappers like `describeAll(['foo', 'bar'])` they will match. Skipping `__tests__` and `*.test.*` paths handles the common case.
- **Trailing dot in flatten** — `prefix.rstrip('.')` is required when the value is a string leaf. Otherwise `en_keys` will contain `foo.bar.` (with trailing dot) and every comparison misses.
- **Nested namespaces** — if `en.json` has `{"a": {"b": "value"}}`, the flat key is `a.b`. Don't emit a separate `a` entry — the recursive flatten handles it.

## After the fix

1. If you **added** a key, also re-verify after Crowdin's next sync that the new key appears in non-English locales (Crowdin may auto-translate or leave English fallback).
2. If you **removed** a key, confirm the change didn't break non-English locales — they may have been relying on the English value as a fallback.
3. If you **changed a value**, expect translator complaints — AGENTS.md explicitly forbids value changes to preserve volunteer work.

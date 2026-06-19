# Stats and Entity Normalization

This document defines the shared canonical contract for item/entity lookup and
Embark `stats-player-v2` events. The live implementation is
`src/shared/stats/normalization.ts`; the resolver data is
`shiesty-stats-target-resolver.json`.

ARCTracker (`https://arctracker.io`) is the reference behavior. The checked-in
English catalog at `public/data/items/items.en.json` is the canonical item data
source used at runtime. The stats target resolver supplies ID relationships; it
does not override catalog names, descriptions, types, rarity, values, weight,
recipes, or images.

The canonical lookup combines the stats resolver with
`infra/lambda/data/embark-inventory-mapping.json`. This adds Embark inventory
asset IDs without replacing existing stat mappings.

## Identity contract

- The canonical item and weapon slug is the underscore `itemId` used by
  `public/data/items/items.<locale>.json` (for example, `kettle_i`).
- Lookup text may differ in case, whitespace, punctuation, or use a hyphenated
  alias. Lookup normalization never replaces the retained display name.
- Every real source identifier remains distinct: `itemId`, `assetId`,
  `gameAssetId`, `weaponAssetId`, `publicUuid`, `targetId`, `mapId`, and
  `questId`.
- Unknown identifiers remain in normalized output with `known: false` and the
  original `sourceId`. They are never silently dropped or assigned an invented
  canonical slug.
- Recipes, blueprint outputs, recipe inputs, images, and weapon statistics join
  through the canonical item slug.

## `eventId` controls `targetId`

`targetId` has no global type. Its meaning is scoped by `eventId`.

| Event | Meaning | Target interpretation |
| ---: | --- | --- |
| 100 | Damage dealt to subject | ARC enemy or raider target ID |
| 102 | Damage attributed to weapon | `weaponAssetId`, falling back to `targetId` |
| 200 | Kills by subject type | ARC enemy or raider target ID |
| 202 | Kills attributed to weapon | `weaponAssetId`, falling back to `targetId` |
| 204 | Player downs | Raider target ID |
| 400 | Revives | Raider/revive target ID |
| 501 | Containers looted | No required target |
| 600 | Items crafted | Item ID or item/weapon asset ID |
| 9800 | Map played marker | Map target ID |
| 9801 | Extracted | Map target ID |
| 9802 | Knocked out | Map target ID |
| 9803 | Duration | Amount is milliseconds; scoped totals may target a map |
| 9804 | Value brought in | Scoped totals may target a map |
| 9805 | Value extracted | Scoped totals may target a map |
| 9902 | XP gained | No required target |

Special targets:

- Raider/player: `995408715` (`0x3b54bb4b`)
- Raider/player damage subject: `200993951` (`0x0bfaec9f`)
- Squadmate revive: `-12896838`

Events 100 and 200 produce subject totals. Events 102 and 202 are attribution
breakdowns and must not be added again to total damage or total kills.

## Canonical vocabulary

Provider aliases normalize to these fields:

- `damage`, `damageDealt`, `totalDamageDealt` -> `damage`
- `kills`, `playerKills` -> `playerKills`
- ARC enemy kill variants -> `arcKills`
- extracted-value variants -> `lootValue`
- brought-in/loadout variants -> `loadoutValue`
- duration variants -> `durationMs`
- outcome/extraction variants -> `extracted`
- container variants -> `containersLooted`
- extracted-item variants -> `itemsExtracted`

Provider-specific raw payloads should be retained beside normalized output when
stored. Normalization is a compatibility layer, not a reason to erase source
fields.

## Browser snapshots

Stats are externally sourced cache data, not user-authored state. They do not
use `UserStateStore` or `/me/state/*`: raid history can exceed that system's
64 KB payload cap. The shared stats module owns versioned local snapshots using
the ArcTracker/RaiderBuddy-compatible keys:

- `embark_cache_player_stats` for normalized totals plus the original provider
  totals object
- `embark_cache_round_stats` for normalized rounds, raw event rows, and the
  derived summary

Use `createPlayerStatsSnapshot()` / `createRoundStatsSnapshot()` followed by
their matching `save*Snapshot()` function after a successful API fetch. Use the
matching `load*Snapshot()` function for cached startup reads. Corrupt or
unsupported snapshots are removed instead of returned. Both keys are cleared
by the central sign-out wipe so one user's stats cannot appear for another.

All RaiderBuddy-compatible cache entries use its owner-bound envelope
`{ data, timestamp, userId }`. Reads are ignored when `userId` differs from the
active Cognito user. Stash snapshots are mirrored to
`embark_cache_inventory` while IndexedDB remains Raider Tools' primary cache.

ArcTracker API tokens must never be written to localStorage. They remain
encrypted server-side and requests go through `/me/arctracker/*`.

## ARCTracker reference stats surfaces

The current ARCTracker raid-history application exposes these behavioral
reference routes: `/api/embark/stats/summary`, `/api/embark/stats/rounds`,
`/api/embark/stats/weapon-kills`, `/api/embark/stats/enemy-kills`,
`/api/embark/stats/map-performance`, and `/api/embark/sync/rounds`. These are
ARCTracker-owned routes, not Raider Tools endpoints.

Aggregate `stats-player-v2` responses place event rows in
`scopedPlayerStats[0].playerStats`. `normalizeStatsPlayerV2()` decodes totals
and per-map rows from that event list. Per-map event rows retain `targetId` as
the map ID while `amount` contains the count, duration, or value for that map.

// normalizeRaid.ts
//
// Converts a raw round from GET /api/v2/user/rounds (proxied through
// /me/arctracker/rounds) into a NormalizedRaid. RawRoundResponse below is
// a best-effort shape based on the public API docs ("kills, damage,
// outcome, loot... includes looted items when a screenshot is attached") —
// the docs don't publish an exact JSON sample, so confirm field names
// against a real response and adjust the mapping below. The canonical
// output names (damage, playerKills, arcKills, lootValue, loadoutValue,
// containersLooted, itemsExtracted) come straight from Stats-Normalization.md
// so this stays consistent with the rest of the app.

import type { ItemRarity, NormalizedLootItem, NormalizedRaid, RaidOutcome } from "../types/types";

export interface RawRoundResponse {
  roundId: string;
  startedAt: string; // ISO — adjust if the API returns epoch ms instead
  durationMs: number;
  mapSlug: string; // e.g. "dam-battleground"
  mapName?: string;
  outcome: "extracted" | "died" | "unknown" | string;
  playerKills?: number;
  arcKills?: number;
  damage?: number;
  valueExtracted?: number; // -> lootValue
  valueBroughtIn?: number; // -> loadoutValue
  containersLooted?: number;
  itemsExtracted?: number;
  squad?: { playerId: string; displayName: string }[];
  loot?: {
    id: string;
    name: string;
    rarity: string;
    value: number;
    qty: number;
  }[];
  // Optional fine-grained log for the row's timeline strip. Falls back to
  // an even spread across the round if the API doesn't return this.
  log?: { type: string; msIn: number }[];
}

function mapOutcome(outcome: string): RaidOutcome {
  if (outcome === "extracted" || outcome === "died") return outcome;
  return "unknown";
}

function mapRarity(rarity: string): ItemRarity {
  const r = rarity?.toLowerCase();
  if (r === "uncommon" || r === "rare" || r === "epic" || r === "legendary") return r;
  return "common";
}

export function normalizeRaid(raw: RawRoundResponse): NormalizedRaid {
  const durationMs = Math.max(0, raw.durationMs ?? 0);
  const lootValue = raw.valueExtracted ?? 0;
  const loadoutValue = raw.valueBroughtIn ?? 0;

  const topLoot: NormalizedLootItem | null = raw.loot?.length
    ? raw.loot
        .map((l): NormalizedLootItem => ({
          itemId: l.id,
          itemName: l.name,
          rarity: mapRarity(l.rarity),
          value: l.value,
          quantity: l.qty,
        }))
        .sort((a, b) => b.value * b.quantity - a.value * a.quantity)[0]
    : null;

  const events: NormalizedRaid["events"] = raw.log?.length
    ? raw.log
        .filter((e) => e.type === "playerKill" || e.type === "arcKill" || e.type === "loot")
        .map((e) => ({
          type: e.type === "loot" ? "lootPickup" : (e.type as "playerKill" | "arcKill"),
          msIntoRaid: Math.min(Math.max(0, e.msIn), durationMs),
        }))
    : evenlySpreadFallbackEvents(raw.playerKills ?? 0, raw.arcKills ?? 0, durationMs);

  return {
    id: raw.roundId,
    startedAt: new Date(raw.startedAt).toISOString(),
    durationMs,
    mapId: raw.mapSlug,
    mapName: raw.mapName ?? raw.mapSlug,
    outcome: mapOutcome(raw.outcome),
    playerKills: raw.playerKills ?? 0,
    arcKills: raw.arcKills ?? 0,
    damage: raw.damage ?? 0,
    lootValue,
    loadoutValue,
    netValue: lootValue - loadoutValue,
    containersLooted: raw.containersLooted ?? 0,
    itemsExtracted: raw.itemsExtracted ?? 0,
    squadSize: raw.squad?.length ?? 1,
    squadmates: raw.squad?.map((p) => p.displayName) ?? [],
    topLoot,
    events,
  };
}

// Used only when the API gives no per-event log, so the timeline strip on
// each row still has something honest (if coarse) to show.
function evenlySpreadFallbackEvents(
  playerKills: number,
  arcKills: number,
  durationMs: number
): NormalizedRaid["events"] {
  if (durationMs === 0) return [];
  const playerEvents = spreadEvents(playerKills, durationMs, "playerKill");
  const arcEvents = spreadEvents(arcKills, durationMs, "arcKill");
  return [...playerEvents, ...arcEvents].sort((a, b) => a.msIntoRaid - b.msIntoRaid);
}

function spreadEvents(
  count: number,
  durationMs: number,
  type: "playerKill" | "arcKill"
): NormalizedRaid["events"] {
  if (!count) return [];
  const step = durationMs / (count + 1);
  return Array.from({ length: count }, (_, i) => ({
    type,
    msIntoRaid: Math.round(step * (i + 1)),
  }));
}

export function normalizeRaids(raw: RawRoundResponse[]): NormalizedRaid[] {
  return raw.map(normalizeRaid);
}

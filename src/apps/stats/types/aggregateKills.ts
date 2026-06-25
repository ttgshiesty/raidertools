// aggregateKills.ts
//
// Turns raw stats-player-v2 event rows into weapon-kills / enemy-kills
// breakdowns, per the eventId contract in Stats-Normalization.md and the
// resolver data in shiesty-stats-target-resolver.json:
//
//   eventId 200 = "Kills By Enemy Or Raider" -> targetId is an ARC enemy
//                 OR the special raider/player target (995408715) for PvP
//                 kills. We exclude the special target so this chart is
//                 ARC-enemy kills only.
//   eventId 202 = "Kills By Weapon" -> targetId is the weaponAssetId.
//
// Events 102/202 are attribution breakdowns and must not be re-summed
// into totals elsewhere (per Stats-Normalization.md) — this file only
// produces the breakdown, not any grand total.

import resolverData from "./shiesty-stats-target-resolver.json";
import type { CountDatum } from "../components/TopKillsBarChart";

export interface StatsPlayerV2EventRow {
  eventId: number;
  targetId: number;
  amount: number;
}

const RAIDER_PLAYER_TARGET_ID = resolverData.specialTargetIds.raiderOrPlayerTarget.id;

type EnemyResolver = Record<string, { id: number; name: string }>;
type WeaponResolver = Record<
  string,
  { itemId: string; assetId: number; name: string; type: string; rarity: string }
>;

const enemyResolver = resolverData.resolvers.enemies as EnemyResolver;
const weaponResolver = resolverData.resolvers.weaponsByAssetId as WeaponResolver;

function sumByTargetId(rows: StatsPlayerV2EventRow[], eventId: number): Map<number, number> {
  const totals = new Map<number, number>();
  for (const row of rows) {
    if (row.eventId !== eventId) continue;
    totals.set(row.targetId, (totals.get(row.targetId) ?? 0) + row.amount);
  }
  return totals;
}

export function aggregateEnemyKills(rows: StatsPlayerV2EventRow[]): CountDatum[] {
  const totals = sumByTargetId(rows, 200);
  totals.delete(RAIDER_PLAYER_TARGET_ID); // exclude PvP kills, keep ARC enemies only

  return Array.from(totals, ([targetId, count]) => {
    const known = enemyResolver[String(targetId)];
    return {
      id: String(targetId),
      name: known?.name ?? `Unknown (${targetId})`,
      count,
    };
  });
}

export function aggregateWeaponKills(rows: StatsPlayerV2EventRow[]): CountDatum[] {
  const totals = sumByTargetId(rows, 202);

  return Array.from(totals, ([targetId, count]) => {
    const known = weaponResolver[String(targetId)];
    return {
      id: String(targetId),
      name: known?.name ?? `Unknown (${targetId})`,
      count,
    };
  });
}

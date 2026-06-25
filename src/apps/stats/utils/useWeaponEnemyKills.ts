// useWeaponEnemyKills.ts
//
// Feeds the weapon-kills / enemy-kills bar charts. The aggregation logic
// in aggregateKills.ts is solid (grounded in your real eventId contract +
// resolver data) — what's NOT confirmed is fetchPlayerStatsEvents() below.
//
// Stats-Normalization.md says the live event-decoding implementation is
// src/shared/stats/normalization.ts, reading scopedPlayerStats[0].playerStats
// from an aggregate stats-player-v2 response. I don't know that module's
// actual exported function names, so this hook calls a placeholder route —
// swap fetchPlayerStatsEvents() for however your app actually gets those
// raw event rows (likely something already built for the ArcTracker stats
// page, given normalizer files already exist for it).

import { useEffect, useState } from "react";
import { aggregateEnemyKills, aggregateWeaponKills } from "../types/aggregateKills";
import type { StatsPlayerV2EventRow } from "../types/aggregateKills";
import type { CountDatum } from "../components/TopKillsBarChart";

async function fetchPlayerStatsEvents(): Promise<StatsPlayerV2EventRow[]> {
  // TODO: replace with the real source of scopedPlayerStats[0].playerStats.
  // Placeholder assumes a proxy route mirroring the rest of /me/arctracker/*.
  const res = await fetch("/me/arctracker/stats/player", { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load player stats (${res.status})`);
  const json = await res.json();
  const rows = json.data?.scopedPlayerStats?.[0]?.playerStats ?? [];
  return rows as StatsPlayerV2EventRow[];
}

export function useWeaponEnemyKills() {
  const [weapons, setWeapons] = useState<CountDatum[]>([]);
  const [enemies, setEnemies] = useState<CountDatum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPlayerStatsEvents()
      .then((rows) => {
        if (cancelled) return;
        setWeapons(aggregateWeaponKills(rows));
        setEnemies(aggregateEnemyKills(rows));
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load kill breakdown");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { weapons, enemies, loading, error };
}

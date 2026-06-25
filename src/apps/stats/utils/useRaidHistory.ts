// useRaidHistory.ts
//
// Fetches from /me/arctracker/rounds — the Raider Tools proxy in front of
// ArcTracker's GET /api/v2/user/rounds (same proxy pattern as the existing
// stash/loadout sync in arctracker-api.md). Everything past the fetch call
// operates only on NormalizedRaid; that boundary is what the rest of the
// app relies on.

import { useEffect, useMemo, useState } from "react";
import { normalizeRaids } from "./normalizeRaid";
import type { NormalizedRaid, RaidHistoryFilters, RaidHistorySummary } from "../types/types";
import type { RawRoundResponse } from "./normalizeRaid";

const DEFAULT_FILTERS: RaidHistoryFilters = {
  outcome: "all",
  mapId: "all",
  dateRange: "30d",
};

function dateRangeToDateFrom(range: RaidHistoryFilters["dateRange"]): string | null {
  if (range === "all") return null;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD, per date_from format
}

async function fetchRoundsFromApi(filters: RaidHistoryFilters): Promise<RawRoundResponse[]> {
  const params = new URLSearchParams({ limit: "200", sort: "newest" });
  if (filters.outcome !== "all") params.set("outcome", filters.outcome);
  if (filters.mapId !== "all") params.set("map", filters.mapId);
  const dateFrom = dateRangeToDateFrom(filters.dateRange);
  if (dateFrom) params.set("date_from", dateFrom);

  // TODO: confirm the proxy route name once it exists — this mirrors
  // /me/arctracker/stash and /me/arctracker/loadout from arctracker-api.md.
  const res = await fetch(`/me/arctracker/rounds?${params.toString()}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to load raid history (${res.status})`);
  const json = await res.json();
  // Authenticated ArcTracker endpoints wrap responses as { data, meta }.
  return (json.data?.rounds ?? json.data ?? []) as RawRoundResponse[];
}

export function useRaidHistory(initialFilters: Partial<RaidHistoryFilters> = {}) {
  const [filters, setFilters] = useState<RaidHistoryFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [raids, setRaids] = useState<NormalizedRaid[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchRoundsFromApi(filters)
      .then((raw) => {
        if (!cancelled) setRaids(normalizeRaids(raw));
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load raids");
      });
    return () => {
      cancelled = true;
    };
    // Server-side filtering: outcome/map/date are sent as query params, so
    // refetch whenever they change rather than filtering client-side.
  }, [filters.outcome, filters.mapId, filters.dateRange]);

  const sortedRaids = useMemo(() => {
    if (!raids) return [];
    return [...raids].sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );
  }, [raids]);

  const summary: RaidHistorySummary = useMemo(() => {
    const n = sortedRaids.length;
    const extracted = sortedRaids.filter((r) => r.outcome === "extracted").length;
    return {
      totalRaids: n,
      extractionRate: n ? extracted / n : 0,
      avgLootValue: n ? sortedRaids.reduce((s, r) => s + r.lootValue, 0) / n : 0,
      avgNetValue: n ? sortedRaids.reduce((s, r) => s + r.netValue, 0) / n : 0,
      totalKills: sortedRaids.reduce((s, r) => s + r.playerKills + r.arcKills, 0),
      totalContainersLooted: sortedRaids.reduce((s, r) => s + r.containersLooted, 0),
    };
  }, [sortedRaids]);

  const availableMaps = useMemo(() => {
    const seen = new Map<string, string>();
    sortedRaids.forEach((r) => seen.set(r.mapId, r.mapName));
    return Array.from(seen, ([mapId, mapName]) => ({ mapId, mapName }));
  }, [sortedRaids]);

  return {
    raids: sortedRaids,
    summary,
    availableMaps,
    filters,
    setFilters,
    loading: raids === null && !error,
    error,
  };
}

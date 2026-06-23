// RaidHistoryPage.tsx
//
// Top-level page. Pulls normalized data from useRaidHistory(), renders
// summary stats, the value-history graph, filters, and the raid list.
// Never touches a raw API field directly — that boundary lives in
// normalizeRaid.ts.

import { RaidRow } from "./RaidRow";
import { RaidValueHistoryChart } from "./RaidValueHistoryChart";
import { TopKillsBarChart } from "./TopKillsBarChart";
import { useRaidHistory } from "./useRaidHistory";
import { useWeaponEnemyKills } from "./useWeaponEnemyKills";
import type { RaidHistoryFilters } from "./types";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1.5 font-mono text-2xl font-semibold tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function FilterBar({
  filters,
  setFilters,
  availableMaps,
}: {
  filters: RaidHistoryFilters;
  setFilters: (f: RaidHistoryFilters) => void;
  availableMaps: { mapId: string; mapName: string }[];
}) {
  const selectClass =
    "rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="flex flex-wrap gap-2">
      <select
        className={selectClass}
        value={filters.outcome}
        onChange={(e) => setFilters({ ...filters, outcome: e.target.value as RaidHistoryFilters["outcome"] })}
      >
        <option value="all">All outcomes</option>
        <option value="extracted">Extracted</option>
        <option value="died">Died</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        className={selectClass}
        value={filters.mapId}
        onChange={(e) => setFilters({ ...filters, mapId: e.target.value })}
      >
        <option value="all">All maps</option>
        {availableMaps.map((m) => (
          <option key={m.mapId} value={m.mapId}>
            {m.mapName}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.dateRange}
        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value as RaidHistoryFilters["dateRange"] })}
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
        <option value="all">All time</option>
      </select>
    </div>
  );
}

export function RaidHistoryPage() {
  const { raids, summary, availableMaps, filters, setFilters, loading, error } = useRaidHistory();
  const { weapons, enemies } = useWeaponEnemyKills();

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Raid History</h1>
        <p className="text-sm text-muted-foreground">Every drop, every extract, every loss.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Raids" value={summary.totalRaids.toString()} />
        <StatCard label="Extraction rate" value={`${Math.round(summary.extractionRate * 100)}%`} />
        <StatCard
          label="Avg net value"
          value={`${summary.avgNetValue >= 0 ? "+" : ""}${Math.round(summary.avgNetValue).toLocaleString()}`}
        />
        <StatCard label="Total kills" value={summary.totalKills.toString()} />
      </div>

      {!loading && !error && raids.length > 0 && <RaidValueHistoryChart raids={raids} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <TopKillsBarChart title="Weapons by Kills" data={weapons} accentColor="#D97706" />
        <TopKillsBarChart title="ARC Enemies Destroyed by Type" data={enemies} accentColor="#2DD4BF" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <FilterBar filters={filters} setFilters={setFilters} availableMaps={availableMaps} />
      </div>

      <div className="space-y-2">
        {loading && (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted/40" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Couldn't load raid history. {error}
          </div>
        )}

        {!loading && !error && raids.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No raids match these filters. Drop in and come back with something to show.
          </div>
        )}

        {!loading && !error && raids.map((raid) => <RaidRow key={raid.id} raid={raid} />)}
      </div>
    </div>
  );
}

export default RaidHistoryPage;

// RaidHistoryPage.tsx
//
// Single-file stats page: profile header, headline stat tiles, a
// History/Stats tab split, filters + raid list, and the ARC-kills /
// weapon-kills breakdowns. Built directly against StatsDashboardData from
// the real src/shared/services/statsApi.ts — nothing here renormalizes
// or invents totals.
//
// ============================================================================
// THINGS THAT NEED A SMALL PATCH ON YOUR END TO FULLY LIGHT UP
// ============================================================================
// 1. Per-round "Damage by Target" / per-round weapon kills:
//    normalizeStatsRound() in src/shared/stats/normalization.ts ALREADY
//    computes round.damageByTarget and round.killsByWeapon — but
//    roundRow() in statsApi.ts drops them when flattening to StatsRoundRow.
//    Patch roundRow() + the StatsRoundRow interface like this:
//
//      export interface StatsRoundRow {
//        ...existing fields...
//        damageByTarget?: StatsBreakdownRow[];
//        killsByWeapon?: StatsBreakdownRow[];
//        isLegacy?: boolean;
//      }
//
//      function roundRow(round: NormalizedRoundStats): StatsRoundRow {
//        return {
//          ...existing fields...
//          damageByTarget: breakdownRowsFromEntries(round.damageByTarget),
//          killsByWeapon: breakdownRowsFromEntries(round.killsByWeapon),
//        };
//      }
//
//    (breakdownRowsFromEntries already exists in statsApi.ts — it's what
//    builds the dashboard-wide breakdowns, just isn't called per-round.)
//    Once that field exists, the round detail panel below picks it up
//    automatically — no change needed here.
//
// 2. MetaForge username: I still don't know where this is stored (didn't
//    see a metaforgeProfileId anywhere in userApi.ts's MeResponse, and
//    fetchMetaForgeStats() in metaforgeApi.ts takes it as a param rather
//    than looking it up) — it's an optional prop, wire it from wherever
//    src/apps/stats/index.tsx already gets it.
//
//    Discord name and Embark ID ARE wired for real now (see
//    useStatsPageData.ts) — Discord name comes from MeResponse.displayName
//    when signupProvider === 'discord', Embark ID from the linked Embark
//    profile's accountId. Pass metaforgeUsername as a prop; the other two
//    are optional overrides only if you need to pass something different.
//
// 3. "Synced / Legacy" toggle and "All Expeditions" filter only render if
//    isLegacy / seasonNumber actually show up on a round — same reasoning,
//    not in StatsRoundRow yet.
// ============================================================================

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useStatsPageData } from "../utils/useStatsPageData";
import type { StatsBreakdownRow, StatsMapRow, StatsRoundRow } from "../../../shared/services/statsApi";

// ---------------------------------------------------------------------------
// Formatting helpers — every "missing -> N/A" rule from your spec lives here.
// ---------------------------------------------------------------------------

function formatClock(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTimeTopside(ms: number): string {
  const totalMinutes = Math.round(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function pctOrNull(numerator: number, denominator: number): number | null {
  return denominator > 0 ? (numerator / denominator) * 100 : null;
}

function fmtPct(value: number | null): string {
  return value === null ? "N/A" : `${Math.round(value)}%`;
}

function fmtRatio(numerator: number, denominator: number): string {
  return denominator > 0 ? (numerator / denominator).toFixed(2) : "N/A";
}

function fmtSigned(value: number | null): string {
  if (value === null) return "N/A";
  const rounded = Math.round(value);
  return `${rounded >= 0 ? "+" : ""}${rounded.toLocaleString()}`;
}

function fmtNumber(value: number | null | undefined): string {
  return value === null || value === undefined ? "N/A" : value.toLocaleString();
}

// ---------------------------------------------------------------------------
// Profile header
// ---------------------------------------------------------------------------

interface ProfileHeaderProps {
  username: string | null;
  playerLevel: number | null;
  currencies: { credits: number; cred: number; raiderTokens: number; xp: number } | null;
  isAuthenticated: boolean;
  metaforgeUsername?: string | null;
  discordName?: string | null;
  embarkId?: string | null;
  onViewMetaForgeStats?: () => void;
}

function EmbarkIdField({ embarkId }: { embarkId: string }) {
  const [copied, setCopied] = useState(false);
  const masked = `${"•".repeat(Math.max(embarkId.length - 4, 4))}${embarkId.slice(-4)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embarkId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — fail silently, nothing to recover here
    }
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>Embark ID:</span>
      <span className="font-mono">{masked}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded p-0.5 hover:bg-muted"
        title="Copy Embark ID"
      >
        {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
      </button>
    </div>
  );
}

function ProfileHeader({
  username,
  playerLevel,
  currencies,
  isAuthenticated,
  metaforgeUsername,
  discordName,
  embarkId,
  onViewMetaForgeStats,
}: ProfileHeaderProps) {
  const handle = metaforgeUsername ?? discordName ?? null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{username ?? "Unknown Raider"}</h2>
            {playerLevel !== null && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Lv {playerLevel}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            {metaforgeUsername && <div>MetaForge Username: {metaforgeUsername}</div>}
            {!metaforgeUsername && discordName && <div>Discord: {discordName}</div>}
            {embarkId && <EmbarkIdField embarkId={embarkId} />}
            {!handle && !embarkId && <div>No linked accounts yet</div>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`size-2 rounded-full ${isAuthenticated ? "bg-emerald-400" : "bg-rose-500"}`} />
            <span className="text-muted-foreground">{isAuthenticated ? "Linked" : "Not linked"}</span>
          </div>
          {onViewMetaForgeStats && (
            <button
              type="button"
              onClick={onViewMetaForgeStats}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted"
            >
              MetaForge Stats →
            </button>
          )}
        </div>
      </div>

      {currencies && (
        <div className="mt-3 flex flex-wrap gap-4 border-t border-border pt-3 text-sm">
          <div>
            <span className="text-muted-foreground">Credits </span>
            <span className="font-mono">{currencies.credits.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Cred </span>
            <span className="font-mono">{currencies.cred.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Raider Tokens </span>
            <span className="font-mono">{currencies.raiderTokens.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">XP </span>
            <span className="font-mono">{currencies.xp.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Survival gauge — SVG ring, green, percentage centered
// ---------------------------------------------------------------------------

function SurvivalGauge({ value }: { value: number | null }) {
  const size = 88;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = value === null ? 0 : Math.min(Math.max(value, 0), 100) / 100;
  const offset = circumference * (1 - fraction);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-card p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#22C55E"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-base font-semibold text-emerald-400">
          {fmtPct(value)}
        </div>
      </div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">Survival</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generic stat tile
// ---------------------------------------------------------------------------

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1.5 truncate font-mono text-xl font-semibold">{value}</div>
      {sub && <div className="mt-0.5 truncate text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Value bar — brought-in vs extracted, to scale (real fields, no guessing)
// ---------------------------------------------------------------------------

function ValueBar({ broughtIn, extracted }: { broughtIn: number; extracted: number }) {
  const total = broughtIn + extracted;
  const broughtInPct = total > 0 ? (broughtIn / total) * 100 : 50;
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/60">
      <div className="bg-rose-400/70" style={{ width: `${broughtInPct}%` }} title={`Brought in: ${broughtIn.toLocaleString()}`} />
      <div className="bg-emerald-400/70" style={{ width: `${100 - broughtInPct}%` }} title={`Extracted: ${extracted.toLocaleString()}`} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Raid row — round detail expands to show breakdowns when present
// ---------------------------------------------------------------------------

type RoundRow = StatsRoundRow & {
  damageByTarget?: StatsBreakdownRow[];
  killsByWeapon?: StatsBreakdownRow[];
  isLegacy?: boolean;
};

function outcomeDotClass(outcome: StatsRoundRow["outcome"]): string {
  if (outcome === "extracted") return "bg-emerald-400";
  if (outcome === "died") return "bg-rose-500";
  return "bg-amber-400";
}

function RaidRow({ round }: { round: RoundRow }) {
  const [open, setOpen] = useState(false);
  const totalKills = round.playerKills + round.arcKills;

  return (
    <div className="rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-2.5 p-3.5 text-left sm:flex-row sm:items-center sm:gap-4"
      >
        <div className="flex items-center gap-3 sm:w-40 sm:flex-shrink-0">
          <span className={`inline-block size-1.5 rounded-full ${outcomeDotClass(round.outcome)}`} />
          <div>
            <div className="text-sm font-semibold leading-tight">{round.mapName}</div>
            <div className="text-xs capitalize text-muted-foreground">{round.outcome}</div>
          </div>
        </div>

        <div className="flex-1">
          <ValueBar broughtIn={round.valueBroughtIn} extracted={round.valueExtracted} />
        </div>

        <div className="flex items-center justify-between gap-4 text-xs sm:w-auto sm:justify-end sm:gap-5">
          <div className="text-right">
            <div className="font-mono text-sm tabular-nums">{formatClock(round.durationMs)}</div>
            <div className="text-muted-foreground">time</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm tabular-nums">{totalKills}</div>
            <div className="text-muted-foreground">kills</div>
          </div>
          <div className="text-right">
            <div className={`font-mono text-sm tabular-nums ${round.netValue >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {fmtSigned(round.netValue)}
            </div>
            <div className="text-muted-foreground">net</div>
          </div>
          <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border px-3.5 py-3 text-sm">
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Kills</div>
              <div className="mt-1 font-mono">{round.playerKills} PvP / {round.arcKills} ARC</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Damage</div>
              <div className="mt-1 font-mono">{round.damage.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Containers looted</div>
              <div className="mt-1 font-mono">{round.containersLooted}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">XP gained</div>
              <div className="mt-1 font-mono">{round.xpGained.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Brought in</div>
              <div className="mt-1 font-mono text-rose-400">{round.valueBroughtIn.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Extracted</div>
              <div className="mt-1 font-mono text-emerald-400">{round.valueExtracted.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Net</div>
              <div className={`mt-1 font-mono ${round.netValue >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {fmtSigned(round.netValue)}
              </div>
            </div>
          </div>

          {/* These two sections only render once StatsRoundRow carries them
              — see the patch note at the top of this file. */}
          {round.killsByWeapon && round.killsByWeapon.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Kills by weapon</div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
                {round.killsByWeapon.map((w) => (
                  <span key={w.name}>
                    {w.name} ×{w.count}
                  </span>
                ))}
              </div>
            </div>
          )}

          {round.damageByTarget && round.damageByTarget.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Damage by target</div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
                {round.damageByTarget.map((t) => (
                  <span key={t.name}>
                    {t.name} {t.count.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Top-N bar chart — shared by ARC kills and weapon kills
// ---------------------------------------------------------------------------

function CountTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as StatsBreakdownRow | undefined;
  if (!point) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <div className="font-medium text-popover-foreground">{point.name}</div>
      <div className="mt-0.5 text-muted-foreground">{point.count.toLocaleString()} kills</div>
    </div>
  );
}

function TopCountBarChart({
  title,
  subtitle,
  data,
  accentColor,
  maxItems = 10,
}: {
  title: string;
  subtitle: string;
  data: StatsBreakdownRow[];
  accentColor: string;
  maxItems?: number;
}) {
  // data already arrives sorted descending from statsApi.ts — just trim it.
  const top = data.slice(0, maxItems);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mb-3 text-xs text-muted-foreground">{subtitle}</p>
      {top.length === 0 ? (
        <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">No data yet</div>
      ) : (
        <div style={{ height: Math.max(160, top.length * 26 + 30) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={110} />
              <Tooltip content={<CountTooltip />} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={18}>
                {top.map((entry, i) => (
                  <Cell key={entry.itemId ?? entry.name} fill={i === 0 ? accentColor : "var(--muted-foreground)"} fillOpacity={i === 0 ? 1 : 0.4} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Raid value history chart
// ---------------------------------------------------------------------------

const WINDOW_OPTIONS = [25, 50, 100] as const;

function ValueTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <div className="font-medium text-popover-foreground">{point.mapName}</div>
      <div className="mt-1 space-y-0.5 text-muted-foreground">
        <div>Extracted: {point.valueExtracted.toLocaleString()}</div>
        <div>Brought in: {point.valueBroughtIn.toLocaleString()}</div>
        <div>Net: {point.netValue.toLocaleString()}</div>
      </div>
    </div>
  );
}

function RaidValueHistoryChart({ rounds }: { rounds: StatsRoundRow[] }) {
  const [windowSize, setWindowSize] = useState<number>(50);

  const chartData = useMemo(
    () =>
      rounds
        .slice(0, windowSize)
        .slice()
        .reverse() // rounds arrive newest-first; chart reads oldest -> newest
        .map((r, i) => ({ raidNumber: i + 1, ...r })),
    [rounds, windowSize]
  );

  if (rounds.length < 2) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Raid Value History</h3>
        <div className="flex gap-1">
          {WINDOW_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setWindowSize(opt)}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                windowSize === opt ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Last {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="rhExtracted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rhNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rhBroughtIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7185" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="raidNumber" tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={44} />
            <Tooltip content={<ValueTooltip />} />
            <Area type="monotone" dataKey="valueExtracted" name="Value Extracted" stroke="#D97706" fill="url(#rhExtracted)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="netValue" name="Net Value" stroke="#2DD4BF" fill="url(#rhNet)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="valueBroughtIn" name="Value Brought In" stroke="#FB7185" fill="url(#rhBroughtIn)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-4">
        <Legend color="#D97706" label="Value Extracted" />
        <Legend color="#2DD4BF" label="Net Value" />
        <Legend color="#FB7185" label="Value Brought In" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="inline-block h-0.5 w-3" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Map performance — the 6 maps, raids / survival / net value per map
// ---------------------------------------------------------------------------

function MapPerformanceList({ maps }: { maps: StatsMapRow[] }) {
  const sorted = [...maps].sort((a, b) => b.raids - a.raids);
  const maxRaids = Math.max(1, ...sorted.map((m) => m.raids));

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-center text-xs text-muted-foreground">
        No map data yet
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">Map Performance</h3>
      <div className="space-y-3">
        {sorted.map((map) => {
          const survival = pctOrNull(map.extracted, map.raids);
          return (
            <div key={map.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{map.mapName}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {map.raids} raids · {fmtPct(survival)} survival ·{" "}
                  <span className={map.totalNetValue >= 0 ? "text-emerald-400" : "text-rose-400"}>
                    {fmtSigned(map.totalNetValue)}
                  </span>
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
                <div className="h-full bg-primary" style={{ width: `${(map.raids / maxRaids) * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

type OutcomeFilter = StatsRoundRow["outcome"] | "all";
type SortMode = "newest" | "xp" | "kills" | "value";

function FilterBar({
  outcome,
  setOutcome,
  mapId,
  setMapId,
  sortMode,
  setSortMode,
  availableMaps,
}: {
  outcome: OutcomeFilter;
  setOutcome: (v: OutcomeFilter) => void;
  mapId: string;
  setMapId: (v: string) => void;
  sortMode: SortMode;
  setSortMode: (v: SortMode) => void;
  availableMaps: string[];
}) {
  const selectClass =
    "rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="flex flex-wrap gap-2">
      <select className={selectClass} value={outcome} onChange={(e) => setOutcome(e.target.value as OutcomeFilter)}>
        <option value="all">All Outcomes</option>
        <option value="extracted">Extracted</option>
        <option value="died">Died</option>
        <option value="unknown">Unknown</option>
      </select>

      <select className={selectClass} value={mapId} onChange={(e) => setMapId(e.target.value)}>
        <option value="all">All Maps</option>
        {availableMaps.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select className={selectClass} value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
        <option value="newest">Newest First</option>
        <option value="xp">Highest XP</option>
        <option value="kills">Highest Kills</option>
        <option value="value">Highest Value</option>
      </select>
    </div>
  );
}

function FilteredSummaryBar({
  totalRaids,
  extractionRate,
  wins,
  losses,
  netValue,
  avgPerExtraction,
  totalTimeMs,
}: {
  totalRaids: number;
  extractionRate: number | null;
  wins: number;
  losses: number;
  netValue: number;
  avgPerExtraction: number | null;
  totalTimeMs: number;
}) {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-card px-4 py-3 text-xs">
      <div>
        <span className="text-muted-foreground">Total Raids </span>
        <span className="font-mono">{totalRaids}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Extraction Rate </span>
        <span className="font-mono">{fmtPct(extractionRate)}</span>
      </div>
      <div>
        <span className="text-muted-foreground">W/L </span>
        <span className="font-mono">{wins} / {losses}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Net Value </span>
        <span className={`font-mono ${netValue >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{fmtSigned(netValue)}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Avg per Extraction </span>
        <span className="font-mono">{fmtSigned(avgPerExtraction)}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Total Time </span>
        <span className="font-mono">{formatTimeTopside(totalTimeMs)}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export interface RaidHistoryPageProps {
  metaforgeUsername?: string | null;
  discordName?: string | null;
  embarkId?: string | null;
  onViewMetaForgeStats?: () => void;
}

export function RaidHistoryPage({
  metaforgeUsername,
  discordName: discordNameOverride,
  embarkId: embarkIdOverride,
  onViewMetaForgeStats,
}: RaidHistoryPageProps = {}) {
  const {
    isAuthenticated,
    arctrackerLinked,
    discordName: realDiscordName,
    embarkId: realEmbarkId,
    profile,
    stash,
    dashboard,
    loading,
    refreshing,
    error,
  } = useStatsPageData();
  const discordName = discordNameOverride ?? realDiscordName;
  const embarkId = embarkIdOverride ?? realEmbarkId;
  const [tab, setTab] = useState<"history" | "stats">("history");
  const [outcome, setOutcome] = useState<OutcomeFilter>("all");
  const [mapId, setMapId] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const allRounds = (dashboard?.rounds ?? []) as RoundRow[];

  const availableMaps = useMemo(() => Array.from(new Set(allRounds.map((r) => r.mapName))).sort(), [allRounds]);

  const filteredRounds = useMemo(() => {
    let rows = allRounds.filter(
      (r) => (outcome === "all" || r.outcome === outcome) && (mapId === "all" || r.mapName === mapId)
    );
    if (sortMode === "xp") rows = [...rows].sort((a, b) => b.xpGained - a.xpGained);
    else if (sortMode === "kills") rows = [...rows].sort((a, b) => b.playerKills + b.arcKills - (a.playerKills + a.arcKills));
    else if (sortMode === "value") rows = [...rows].sort((a, b) => b.netValue - a.netValue);
    // "newest" — leave as the API's own order (it already returns newest-first)
    return rows;
  }, [allRounds, outcome, mapId, sortMode]);

  const summary = dashboard?.summary ?? null;
  const survivalRate = summary ? pctOrNull(summary.totalExtracted, summary.totalRounds) : null;
  const avgNetValue = summary && summary.totalRounds > 0 ? summary.totalNetValue / summary.totalRounds : null;

  const topWeaponName = dashboard?.weapons?.[0]?.name ?? null;

  const bestMap = useMemo(() => {
    const maps = dashboard?.maps ?? [];
    if (maps.length === 0) return null;
    return [...maps].sort((a, b) => {
      const aRate = a.raids > 0 ? a.extracted / a.raids : -1;
      const bRate = b.raids > 0 ? b.extracted / b.raids : -1;
      if (bRate !== aRate) return bRate - aRate;
      return b.raids - a.raids;
    })[0];
  }, [dashboard]);

  const filteredSummary = useMemo(() => {
    const n = filteredRounds.length;
    const wins = filteredRounds.filter((r) => r.outcome === "extracted").length;
    const losses = filteredRounds.filter((r) => r.outcome === "died").length;
    const extractedValueSum = filteredRounds
      .filter((r) => r.outcome === "extracted")
      .reduce((s, r) => s + r.valueExtracted, 0);
    return {
      totalRaids: n,
      extractionRate: pctOrNull(wins, n),
      wins,
      losses,
      netValue: filteredRounds.reduce((s, r) => s + r.netValue, 0),
      avgPerExtraction: wins > 0 ? extractedValueSum / wins : null,
      totalTimeMs: filteredRounds.reduce((s, r) => s + r.durationMs, 0),
    };
  }, [filteredRounds]);

  const hasLegacyField = allRounds.some((r) => typeof r.isLegacy === "boolean");

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 p-4 sm:p-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-muted/40" />
        ))}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Sign in and link your ArcTracker account to see your stats.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <ProfileHeader
        username={profile?.username ?? null}
        playerLevel={profile?.playerLevel ?? null}
        currencies={stash?.currencies ?? null}
        isAuthenticated={arctrackerLinked}
        metaforgeUsername={metaforgeUsername}
        discordName={discordName}
        embarkId={embarkId}
        onViewMetaForgeStats={onViewMetaForgeStats}
      />

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Couldn't load stats. {error}
        </div>
      )}

      {summary && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SurvivalGauge value={survivalRate} />
            <StatTile label="KD Ratio" value={fmtRatio(summary.totalPlayerKills, summary.totalDied)} />
            <StatTile label="ARC Kills" value={fmtNumber(summary.totalArcKills)} />
            <StatTile label="Total XP" value={fmtNumber(summary.totalXpGained)} />
            <StatTile label="Time Topside" value={formatTimeTopside(summary.totalTimeMs)} />
            <StatTile label="Successful Raids" value={fmtNumber(summary.totalExtracted)} />
            <StatTile label="Top Weapon" value={topWeaponName ?? "N/A"} />
            <StatTile label="Best Map" value={bestMap?.mapName ?? "N/A"} sub={bestMap ? `${bestMap.raids} raids` : undefined} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatTile label="Raids" value={fmtNumber(summary.totalRounds)} />
            <StatTile label="Success Rate" value={fmtPct(survivalRate)} />
            <StatTile label="Avg. Profit" value={fmtSigned(avgNetValue)} />
          </div>
        </>
      )}

      <div className="flex gap-1 border-b border-border">
        {(["history", "stats"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t ? "border-b-2 border-primary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
        {refreshing && <span className="ml-auto py-2 text-xs text-muted-foreground">Syncing…</span>}
      </div>

      {tab === "history" ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <FilterBar
              outcome={outcome}
              setOutcome={setOutcome}
              mapId={mapId}
              setMapId={setMapId}
              sortMode={sortMode}
              setSortMode={setSortMode}
              availableMaps={availableMaps}
            />
            {hasLegacyField && (
              <div className="flex gap-1 text-xs text-muted-foreground">
                <span>Synced ({allRounds.filter((r) => r.isLegacy === false).length})</span>
                <span>·</span>
                <span>Legacy ({allRounds.filter((r) => r.isLegacy === true).length})</span>
              </div>
            )}
          </div>

          <FilteredSummaryBar {...filteredSummary} />

          <div className="space-y-2">
            {filteredRounds.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No raids match these filters.
              </div>
            ) : (
              filteredRounds.map((round) => <RaidRow key={round.roundId} round={round} />)
            )}
          </div>
        </>
      ) : (
        <>
          {allRounds.length > 1 && <RaidValueHistoryChart rounds={allRounds} />}
          <div className="grid gap-4 sm:grid-cols-2">
            <TopCountBarChart
              title="ARC Enemies Destroyed"
              subtitle="Breakdown by enemy type"
              data={dashboard?.enemies ?? []}
              accentColor="#2DD4BF"
            />
            <TopCountBarChart
              title="Top Weapons"
              subtitle="By total kills (ARCs & Raiders)"
              data={dashboard?.weapons ?? []}
              accentColor="#D97706"
            />
          </div>
          <MapPerformanceList maps={dashboard?.maps ?? []} />
        </>
      )}
    </div>
  );
}

export default RaidHistoryPage;

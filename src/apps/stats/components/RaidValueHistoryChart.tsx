// RaidValueHistoryChart.tsx
//
// Plots value extracted / net value / value brought in across recent
// raids, oldest to newest, with a window selector. This is the graph
// added on top of the original raid-history page.

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { NormalizedRaid } from "../types/types";

const WINDOW_OPTIONS = [25, 50, 100] as const;
type WindowSize = (typeof WINDOW_OPTIONS)[number];

function formatCompactValue(v: number): string {
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(0)}K`;
  return `${sign}${abs}`;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <div className="font-medium text-popover-foreground">{point.mapName}</div>
      <div className="mt-1 space-y-0.5 text-muted-foreground">
        <div>Extracted: {point.lootValue.toLocaleString()}</div>
        <div>Brought in: {point.loadoutValue.toLocaleString()}</div>
        <div>Net: {point.netValue.toLocaleString()}</div>
      </div>
    </div>
  );
}

export function RaidValueHistoryChart({ raids }: { raids: NormalizedRaid[] }) {
  const [windowSize, setWindowSize] = useState<WindowSize>(50);

  const chartData = useMemo(() => {
    // `raids` arrives newest-first; take the window then reverse so the
    // chart reads left (oldest) to right (most recent).
    return raids
      .slice(0, windowSize)
      .slice()
      .reverse()
      .map((r, i) => ({
        raidNumber: i + 1,
        mapName: r.mapName,
        lootValue: r.lootValue,
        loadoutValue: r.loadoutValue,
        netValue: r.netValue,
      }));
  }, [raids, windowSize]);

  if (raids.length < 2) return null;

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
              className={
                "rounded-md px-2 py-1 text-xs font-medium transition-colors " +
                (windowSize === opt
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted")
              }
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
              <linearGradient id="raidHistoryExtractedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="raidHistoryNetFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="raidHistoryBroughtInFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7185" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="raidNumber"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              label={{ value: "Raid #", position: "insideBottomRight", offset: -2, fontSize: 10 }}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={44}
              tickFormatter={formatCompactValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="lootValue"
              name="Value Extracted"
              stroke="#D97706"
              fill="url(#raidHistoryExtractedFill)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="netValue"
              name="Net Value"
              stroke="#2DD4BF"
              fill="url(#raidHistoryNetFill)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="loadoutValue"
              name="Value Brought In"
              stroke="#FB7185"
              fill="url(#raidHistoryBroughtInFill)"
              strokeWidth={1.5}
            />
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

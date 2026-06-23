// TopKillsBarChart.tsx
//
// Generic "top N by count" horizontal bar chart, shared by the weapon-kills
// and ARC-enemy-kills breakdowns. Takes already-resolved name/count pairs —
// it doesn't know or care where the numbers came from.

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface CountDatum {
  id: string;
  name: string;
  count: number;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as CountDatum | undefined;
  if (!point) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <div className="font-medium text-popover-foreground">{point.name}</div>
      <div className="mt-0.5 text-muted-foreground">{point.count.toLocaleString()} kills</div>
    </div>
  );
}

export function TopKillsBarChart({
  title,
  data,
  accentColor = "#D97706",
  maxItems = 10,
}: {
  title: string;
  data: CountDatum[];
  accentColor?: string;
  maxItems?: number;
}) {
  const top = [...data].sort((a, b) => b.count - a.count).slice(0, maxItems);

  if (top.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <div style={{ height: Math.max(160, top.length * 26 + 30) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={top}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={18}>
              {top.map((entry, i) => (
                <Cell key={entry.id} fill={i === 0 ? accentColor : "var(--muted-foreground)"} fillOpacity={i === 0 ? 1 : 0.4} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

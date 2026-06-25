// RaidRow.tsx
//
// The signature element of this page: a horizontal strip representing the
// raid's actual timeline, not just a stat dump. Player kills, ARC kills,
// and the final outcome are plotted at the position they happened in.
// Reading left-to-right tells you the story of the raid in a couple seconds.

import { useState } from "react";
import type { NormalizedRaid } from "../types/types";

const RARITY_COLOR: Record<string, string> = {
  common: "#9CA3AF",
  uncommon: "#4ADE80",
  rare: "#38BDF8",
  epic: "#C084FC",
  legendary: "#FBBF24",
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTimeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function TimelineStrip({ raid }: { raid: NormalizedRaid }) {
  const { durationMs, events, outcome } = raid;
  const pct = (ms: number) => (durationMs ? (ms / durationMs) * 100 : 0);

  return (
    <div className="relative h-2 w-full rounded-full bg-muted/60">
      <div
        className={
          "absolute inset-y-0 left-0 rounded-full " +
          (outcome === "extracted"
            ? "bg-emerald-500/30"
            : outcome === "died"
              ? "bg-rose-500/25"
              : "bg-amber-500/20")
        }
        style={{ width: "100%" }}
      />
      {events.map((e, i) => (
        <span
          key={i}
          title={`${e.type} at ${formatDuration(e.msIntoRaid)}`}
          className={
            "absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full " +
            (e.type === "playerKill"
              ? "bg-rose-400"
              : e.type === "arcKill"
                ? "bg-amber-400"
                : "bg-sky-400")
          }
          style={{ left: `${pct(e.msIntoRaid)}%` }}
        />
      ))}
      <span
        className={
          "absolute top-1/2 right-0 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-background " +
          (outcome === "extracted" ? "bg-emerald-400" : outcome === "died" ? "bg-rose-500" : "bg-amber-400")
        }
      />
    </div>
  );
}

export function RaidRow({ raid }: { raid: NormalizedRaid }) {
  const [open, setOpen] = useState(false);
  const totalKills = raid.playerKills + raid.arcKills;

  return (
    <div className="rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-2.5 p-3.5 text-left sm:flex-row sm:items-center sm:gap-4"
      >
        <div className="flex items-center gap-3 sm:w-44 sm:flex-shrink-0">
          <span
            className={
              "inline-block size-1.5 rounded-full " +
              (raid.outcome === "extracted"
                ? "bg-emerald-400"
                : raid.outcome === "died"
                  ? "bg-rose-500"
                  : "bg-amber-400")
            }
          />
          <div>
            <div className="text-sm font-semibold leading-tight">{raid.mapName}</div>
            <div className="text-xs text-muted-foreground">{formatTimeAgo(raid.startedAt)}</div>
          </div>
        </div>

        <div className="flex-1">
          <TimelineStrip raid={raid} />
        </div>

        <div className="flex items-center justify-between gap-4 text-xs sm:w-auto sm:justify-end sm:gap-5">
          <div className="text-right">
            <div className="font-mono text-sm tabular-nums">{formatDuration(raid.durationMs)}</div>
            <div className="text-muted-foreground">time</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm tabular-nums">{totalKills}</div>
            <div className="text-muted-foreground">kills</div>
          </div>
          <div className="text-right">
            <div
              className={
                "font-mono text-sm tabular-nums " +
                (raid.netValue >= 0 ? "text-emerald-400" : "text-rose-400")
              }
            >
              {raid.netValue >= 0 ? "+" : ""}
              {raid.netValue.toLocaleString()}
            </div>
            <div className="text-muted-foreground">net</div>
          </div>
        </div>
      </button>

      {open && (
        <div className="grid gap-3 border-t border-border px-3.5 py-3 text-sm sm:grid-cols-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Squad</div>
            <div className="mt-1">
              {raid.squadmates.length ? raid.squadmates.join(", ") : "Solo"}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Kills</div>
            <div className="mt-1 font-mono">
              {raid.playerKills} player / {raid.arcKills} ARC
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Value</div>
            <div className="mt-1 font-mono">
              {raid.lootValue.toLocaleString()} extracted / {raid.loadoutValue.toLocaleString()} brought in
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Top loot</div>
            <div className="mt-1">
              {raid.topLoot ? (
                <span style={{ color: RARITY_COLOR[raid.topLoot.rarity] }}>
                  {raid.topLoot.itemName}
                  {raid.topLoot.quantity > 1 ? ` ×${raid.topLoot.quantity}` : ""}
                </span>
              ) : (
                <span className="text-muted-foreground">Nothing notable</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

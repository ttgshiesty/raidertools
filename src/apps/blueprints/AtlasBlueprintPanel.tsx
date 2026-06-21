/**
 * AtlasBlueprintPanel.tsx
 *
 * Full-page atlas panel — searchable, filterable accordion list of every
 * blueprint's known spawn locations.
 *
 * Data layer  : unchanged from your existing module.
 *   • Accepts `atlasRows` prop (injected from parent) OR fetches
 *     `/data/blueprints/atlas.csv` automatically.
 *   • `parseAtlasCsv` and `parseCsv` are re-exported so other components
 *     (e.g. BlueprintRegistryDetail) can reuse them.
 *
 * UI layer    : upgraded to match the reference site style.
 *   • Stats header (total entries, blueprint count, maps covered)
 *   • Search + map + condition dropdowns
 *   • Rarity filter strip (colour-coded pill buttons)
 *   • Accordion entries with rarity left-border, map tags, find count
 *   • Per-row detail: map · condition · container · location · locked badge
 *   • Loading / error / empty states
 *
 * Props are backwards-compatible — no changes needed in index.tsx.
 */

import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Info,
  Loader2,
  Lock,
  MapPin,
  Package,
  Search,
} from 'lucide-react';
import { getRarityColor } from './utils/blueprintGrid';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AtlasRow {
  blueprint: string;
  map: string;
  condition: string;
  containers: string;
  notes: string;
  location: string;
  route: string;
  crafting: string;
  workshop: string;
  questReward: boolean;
  trialsReward: boolean;
  /** Optional: behind a locked door */
  locked?: boolean;
}

interface AtlasGroup {
  name: string;
  rows: AtlasRow[];
  maps: string[];
  containers: string[];
  /** Heuristic rarity based on community report count */
  rarity: string;
  totalFinds: number;
  uniqueMaps: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAPS = [
  'All',
  'Dam Battlegrounds',
  'Blue Gate',
  'Buried City',
  'Spaceport',
  'Stella Montis',
];

const CONDITIONS = [
  'All',
  'Day',
  'Night',
  'Storm',
  'Montis',
  'Any',
  'Bunker',
  'Hurricane',
  'Hidden Bunker',
];

const RARITIES = [
  'All',
  'common',
  'uncommon',
  'rare',
  'very rare',
  'legendary',
  'epic',
];

// Map atlas heuristic rarity names → neon hex colours
const RARITY_COLOR: Record<string, string> = {
  common:     getRarityColor('Common'),
  uncommon:   getRarityColor('Uncommon'),
  rare:       getRarityColor('Rare'),
  'very rare': getRarityColor('Epic'),
  epic:       getRarityColor('Epic'),
  legendary:  getRarityColor('Legendary'),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Heuristic: derive atlas "rarity" from community report volume */
function atlasRarity(reports: number, maps: number): string {
  if (reports >= 100 && maps >= 5) return 'common';
  if (reports >= 50  && maps >= 3) return 'uncommon';
  if (reports >= 20)               return 'rare';
  if (reports >= 10)               return 'very rare';
  return 'legendary';
}

/** Detect locked-door entries from condition/notes text */
function isLocked(row: AtlasRow): boolean {
  if (row.locked === true) return true;
  const value = `${row.condition} ${row.notes}`.toLowerCase();
  return (
    value.includes('key room') ||
    value.includes('breaching') ||
    (value.includes('locked') && !value.includes("wasn't"))
  );
}

/** Shorten long map names for the compact tag display */
function shortMapName(map: string): string {
  return map
    .replace(' Battlegrounds', '')
    .replace('Buried City', 'Buried')
    .replace('Spaceport', 'Space')
    .replace('Stella Montis', 'Montis');
}

// ─── CSV parser (unchanged from original) ────────────────────────────────────

export function parseAtlasCsv(text: string): AtlasRow[] {
  const [, ...records] = parseCsv(text);
  return records
    .filter((record) => record[0])
    .map((record) => ({
      blueprint:    record[0].trim(),
      map:          record[1]?.trim() || 'All',
      condition:    record[2]?.trim() || 'Any',
      containers:   record[4]?.trim() || '',
      questReward:  record[5]?.trim().toLowerCase() === 'yes',
      trialsReward: record[6]?.trim().toLowerCase() === 'yes',
      notes:        record[11]?.trim() || '',
      location:     record[12]?.trim() || '',
      route:        record[13]?.trim() || '',
      crafting:     record[14]?.trim() || '',
      workshop:     record[15]?.trim() || '',
    }));
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (row.length || cell) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AtlasBlueprintPanelProps {
  /** Pre-filter the search box (e.g. when navigating from a blueprint card) */
  initialSearch?: string;
  /** Inject rows directly instead of fetching the CSV */
  atlasRows?: AtlasRow[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AtlasBlueprintPanel({
  initialSearch = '',
  atlasRows: propRows,
}: AtlasBlueprintPanelProps) {
  const [rows, setRows]                   = useState<AtlasRow[] | null>(null);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(false);
  const [search, setSearch]               = useState(initialSearch);
  const [mapFilter, setMapFilter]         = useState('All');
  const [rarityFilter, setRarityFilter]   = useState('All');
  const [conditionFilter, setCondFilter]  = useState('All');
  const [expanded, setExpanded]           = useState<Set<string>>(new Set());

  // Sync external initialSearch (e.g. "View in Atlas" from detail panel)
  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
      setExpanded(new Set([initialSearch]));
    }
  }, [initialSearch]);

  // Fetch CSV if no rows were injected
  useEffect(() => {
    if (propRows) {
      setRows(propRows);
      return;
    }
    if (rows !== null) return;
    setLoading(true);
    setError(false);
    fetch('/data/blueprints/atlas.csv')
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.text();
      })
      .then((text) => setRows(parseAtlasCsv(text)))
      .catch(() => {
        setRows([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [propRows, rows]);

  // ── Group rows by blueprint name ──────────────────────────
  const grouped = useMemo<AtlasGroup[]>(() => {
    const data = rows ?? propRows ?? [];
    const groups = new Map<string, AtlasRow[]>();
    data.forEach((row) => {
      const key = row.blueprint || 'Unknown';
      groups.set(key, [...(groups.get(key) ?? []), row]);
    });
    return [...groups]
      .map(([name, matches]) => {
        const maps = [...new Set(matches.map((r) => r.map).filter(Boolean))];
        return {
          name,
          rows: matches,
          maps,
          containers: [...new Set(matches.map((r) => r.containers).filter(Boolean))],
          rarity: atlasRarity(matches.length, maps.length),
          totalFinds: matches.length,
          uniqueMaps: maps.length,
        };
      })
      .sort((a, b) => b.totalFinds - a.totalFinds);
  }, [rows, propRows]);

  // ── Filter grouped list ───────────────────────────────────
  const filtered = useMemo(
    () =>
      grouped.filter(
        (bp) =>
          (!search || bp.name.toLowerCase().includes(search.toLowerCase())) &&
          (rarityFilter === 'All' || bp.rarity === rarityFilter) &&
          (mapFilter === 'All' || bp.maps.includes(mapFilter)),
      ),
    [grouped, search, rarityFilter, mapFilter],
  );

  // ── Per-entry visible rows (respect condition + map filter) ─
  function getVisibleRows(bp: AtlasGroup): AtlasRow[] {
    return bp.rows.filter(
      (row) =>
        (mapFilter === 'All' || row.map === mapFilter) &&
        (conditionFilter === 'All' || row.condition === conditionFilter),
    );
  }

  function toggle(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const data = rows ?? propRows ?? [];

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="atlas-loading">
        <Loader2 className="atlas-loading__spinner" />
        <span>Loading Atlas Data…</span>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────
  if (error) {
    return (
      <div className="atlas-error">
        <p>Failed to load atlas data</p>
        <small>Make sure atlas.csv is served at /data/blueprints/atlas.csv</small>
      </div>
    );
  }

  // ── Empty / still loading ─────────────────────────────────
  if (data.length === 0 && !error) {
    return <div className="atlas-loading"><span>Loading Atlas Data…</span></div>;
  }

  // ── Main render ───────────────────────────────────────────
  return (
    <section className="atlas-panel">

      {/* ── Stats header ── */}
      <div className="atlas-stats">
        <div className="atlas-stat">
          <small>Total Entries</small>
          <strong>{data.length.toLocaleString()}</strong>
        </div>
        <div className="atlas-stat">
          <small>Blueprints</small>
          <strong className="atlas-stat--rare">{grouped.length}</strong>
        </div>
        <div className="atlas-stat">
          <small>Maps Covered</small>
          <strong className="atlas-stat--uncommon">{MAPS.length - 1}</strong>
        </div>
        <div className="atlas-stat atlas-stat--info">
          <Info size={13} />
          <span>
            <b>Rarity = community dataset heuristic</b>
            {' '}Common ≥100 reports + 5 maps · Uncommon ≥50 + 3 maps · Rare ≥20 ·
            Very Rare ≥10 · Legendary &lt;10
          </span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="atlas-filters">
        <label className="atlas-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blueprint name…"
          />
        </label>
        <select value={mapFilter} onChange={(e) => setMapFilter(e.target.value)}>
          {MAPS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={conditionFilter} onChange={(e) => setCondFilter(e.target.value)}>
          {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* ── Rarity filter strip ── */}
      <div className="atlas-rarity-strip">
        {RARITIES.map((r) => {
          const col = RARITY_COLOR[r] ?? '#6b7280';
          const active = rarityFilter === r;
          return (
            <button
              key={r}
              className={`atlas-rarity-btn${active ? ' active' : ''}`}
              style={{
                borderColor: active ? col : '#1e1e2e',
                color: active ? col : '#666',
                background: active ? `${col}18` : 'transparent',
              }}
              onClick={() => setRarityFilter(r)}
            >
              {r}
            </button>
          );
        })}
      </div>

      {/* ── Results count ── */}
      <p className="atlas-results-count">
        Showing <strong>{filtered.length}</strong> blueprint{filtered.length !== 1 ? 's' : ''}
        {(search || rarityFilter !== 'All' || mapFilter !== 'All') &&
          ` (filtered from ${grouped.length})`}
      </p>

      {/* ── Blueprint accordion list ── */}
      {filtered.length === 0 ? (
        <div className="atlas-empty">
          <Package size={40} />
          <p>No atlas entries found</p>
        </div>
      ) : (
        <div className="atlas-list">
          {filtered.map((bp) => {
            const isOpen = expanded.has(bp.name);
            const color = RARITY_COLOR[bp.rarity] ?? '#6b7280';
            const visibleRows = getVisibleRows(bp);

            return (
              <article
                key={bp.name}
                className="atlas-entry"
                style={{
                  borderColor: `${color}40`,
                  borderLeftColor: color,
                  borderLeftWidth: 3,
                }}
              >
                {/* ── Entry header (always visible) ── */}
                <button
                  className="atlas-entry__heading"
                  onClick={() => toggle(bp.name)}
                >
                  <div className="atlas-entry__title">
                    <strong>{bp.name}</strong>
                    <div className="atlas-entry__meta">
                      <span style={{ color }} className="atlas-entry__rarity">
                        {bp.rarity}
                      </span>
                      <span className="atlas-entry__count">
                        {bp.totalFinds} find{bp.totalFinds !== 1 ? 's' : ''}
                      </span>
                      <span className="atlas-entry__maps-count">
                        <MapPin size={12} /> {bp.uniqueMaps} map{bp.uniqueMaps !== 1 ? 's' : ''}
                      </span>
                      <span className="atlas-entry__containers-count">
                        <Package size={12} /> {bp.containers.length} container type{bp.containers.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Compact map tags */}
                  <div className="atlas-entry__map-tags">
                    {bp.maps.slice(0, 4).map((m) => (
                      <span key={m} className="atlas-map-tag">
                        {shortMapName(m)}
                      </span>
                    ))}
                    {bp.maps.length > 4 && (
                      <span className="atlas-map-tag atlas-map-tag--more">
                        +{bp.maps.length - 4}
                      </span>
                    )}
                  </div>

                  {isOpen ? (
                    <ChevronUp size={16} className="atlas-chevron" />
                  ) : (
                    <ChevronDown size={16} className="atlas-chevron" />
                  )}
                </button>

                {/* ── Expanded find rows ── */}
                {isOpen && (
                  <div className="atlas-entry__rows">
                    {visibleRows.length === 0 ? (
                      <p className="atlas-entry__no-rows">
                        No finds match current filters.
                      </p>
                    ) : (
                      visibleRows.map((row, i) => (
                        <div key={i} className="atlas-row">
                          {/* Map + condition */}
                          <div className="atlas-row__header">
                            <MapPin size={13} className="atlas-row__map-icon" />
                            <strong>{row.map}</strong>
                            <span className="atlas-row__condition">{row.condition}</span>
                            {isLocked(row) && (
                              <span className="atlas-row__locked">
                                <Lock size={12} /> Locked
                              </span>
                            )}
                            {row.questReward && (
                              <span className="atlas-row__tag atlas-row__tag--quest">Quest</span>
                            )}
                            {row.trialsReward && (
                              <span className="atlas-row__tag atlas-row__tag--trials">Trials</span>
                            )}
                          </div>

                          {/* Detail fields */}
                          {row.containers && (
                            <p className="atlas-row__detail">
                              <Package size={12} />
                              <span>{row.containers}</span>
                            </p>
                          )}
                          {row.location && (
                            <p className="atlas-row__detail">
                              <b>Location:</b> {row.location}
                            </p>
                          )}
                          {row.route && (
                            <p className="atlas-row__detail">
                              <b>Best Route:</b> {row.route}
                            </p>
                          )}
                          {row.crafting && (
                            <p className="atlas-row__detail">
                              <b>Crafting:</b> {row.crafting}
                              {row.workshop ? ` · ${row.workshop}` : ''}
                            </p>
                          )}
                          {row.notes && (
                            <p className="atlas-row__detail atlas-row__detail--notes">
                              <b>Notes:</b> {row.notes}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AtlasBlueprintPanel;

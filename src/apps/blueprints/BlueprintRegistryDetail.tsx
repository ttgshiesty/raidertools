/**
 * BlueprintRegistryDetail.tsx
 *
 * Full-screen slide-in detail panel shown when the user clicks a blueprint
 * card.  Tabs:
 *   • Overview  – hero, rarity badge, quick stats, loot-location containers,
 *                 distribution bar charts, sell / duplicate / owned actions
 *   • Atlas     – atlas rows (map, condition, containers, route) + "I found it"
 *                 form for the user to submit their own sighting
 *
 * Props mirror the existing BlueprintRegistryDetail contract so the parent
 * (index.tsx) needs no structural changes.
 */

import React, { useState } from 'react';
import { X, BookOpen, MapPin, Check, Copy, DollarSign, Plus } from 'lucide-react';
import { getRarityColor } from './utils/blueprintGrid';
import type { BlueprintGridItem } from './utils/blueprintGrid';
import type { AtlasRow } from './AtlasBlueprintPanel';

// Re-export so existing imports from BlueprintRegistryDetail still work
export type { AtlasRow };

export interface BlueprintProgress {
  learned: boolean;
  duplicates: number;
}

interface UserReport {
  container: string;
  map: string;
  event?: string;
  location?: string;
}

interface BlueprintRegistryDetailProps {
  blueprint: BlueprintGridItem;
  atlasRows: AtlasRow[];
  catalog?: unknown;
  progress: BlueprintProgress;
  onClose: () => void;
  onProgress: (next: BlueprintProgress) => void;
  onViewAtlas?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitValues(value: string): string[] {
  return value
    .split(/[,;/]|\band\b/i)
    .map((p) => p.trim())
    .filter(Boolean);
}

function distribution(
  values: string[],
): Array<{ name: string; count: number; percent: number }> {
  const counts: Record<string, number> = {};
  values.forEach((v) => {
    const k = v.trim();
    if (k) counts[k] = (counts[k] ?? 0) + 1;
  });
  const total = Object.values(counts).reduce((s, c) => s + c, 0);
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b),
  );
}

const CONTAINER_TYPES = [
  'Loot Crate',
  'Military Crate',
  'Medical Crate',
  'Weapon Crate',
  'Backpack',
  'Chest',
  'Footlocker',
  'Supply Drop',
  'Quest Reward',
  'Trials Reward',
  'Vendor',
  'Other',
];

const MAP_OPTIONS = [
  'Silo',
  'Refinery',
  'Outpost',
  'Bunker',
  'Farmstead',
  'Relay Station',
  'Other',
];

const EVENT_OPTIONS = [
  'No Event',
  'Night Raid',
  'Hidden Bunker',
  'Supply Drop Event',
  'Trials',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Horizontal distribution bar (e.g. container type breakdown) */
function DistributionBar({
  label,
  percent,
  count,
  color,
}: {
  label: string;
  percent: number;
  count: number;
  color: string;
}) {
  return (
    <div className="dist-bar-row">
      <span className="dist-bar-label">{label}</span>
      <div className="dist-bar-track">
        <div
          className="dist-bar-fill"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
      <span className="dist-bar-value">{count}</span>
    </div>
  );
}

/** Pill badge for rarity */
function RarityBadge({ rarity }: { rarity: string }) {
  const color = getRarityColor(rarity);
  return (
    <span
      className="rarity-badge"
      style={{ borderColor: color, color }}
    >
      {rarity}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlueprintRegistryDetail({
  blueprint,
  atlasRows,
  progress,
  onClose,
  onProgress,
  onViewAtlas,
}: BlueprintRegistryDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'atlas'>('overview');
  const [showFindForm, setShowFindForm] = useState(false);
  const [reports, setReports] = useState<UserReport[]>(() => {
    try {
      const raw = localStorage.getItem(`bp-reports-${blueprint.id}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({
    container: '',
    map: '',
    event: '',
    location: '',
  });

  const rarityColor = getRarityColor(blueprint.rarity);

  // Aggregate container data from atlas rows + user reports
  const allContainerValues = [
    ...atlasRows.flatMap((r) => (r.containers ? splitValues(r.containers) : [])),
    ...reports.map((r) => r.container).filter(Boolean),
  ];
  const allMapValues = [
    ...atlasRows.map((r) => r.map).filter(Boolean),
    ...reports.map((r) => r.map).filter(Boolean),
  ];
  const containerDist = distribution(allContainerValues);
  const mapDist = distribution(allMapValues);

  const likely = atlasRows[0];
  const questReward = atlasRows.some((r) => r.questReward);
  const trialsReward = atlasRows.some((r) => r.trialsReward);

  // ── actions ────────────────────────────────────────────────
  function handleMarkLearned() {
    onProgress({ ...progress, learned: !progress.learned });
  }

  function handleAddDuplicate() {
    onProgress({ ...progress, duplicates: progress.duplicates + 1 });
  }

  function handleRemoveDuplicate() {
    if (progress.duplicates > 0)
      onProgress({ ...progress, duplicates: progress.duplicates - 1 });
  }

  function handleSell() {
    if (progress.duplicates > 0)
      onProgress({ ...progress, duplicates: progress.duplicates - 1 });
  }

  function handleSubmitReport(e: React.FormEvent) {
    e.preventDefault();
    if (!form.container || !form.map) return;
    const next = [...reports, { ...form }];
    setReports(next);
    localStorage.setItem(`bp-reports-${blueprint.id}`, JSON.stringify(next));
    setForm({ container: '', map: '', event: '', location: '' });
    setShowFindForm(false);
  }

  // ── render ─────────────────────────────────────────────────
  return (
    <div className="bp-detail-overlay" onClick={onClose}>
      <div
        className="bp-detail-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ '--rarity-color': rarityColor } as React.CSSProperties}
      >
        {/* ── Header ── */}
        <div className="bp-detail-header">
          <div className="bp-detail-hero">
            {blueprint.imageFilename && (
              <div
                className="bp-detail-icon"
                style={{ borderColor: rarityColor, boxShadow: `0 0 16px ${rarityColor}55` }}
              >
                <img
                  src={`/icons/blueprints/${blueprint.imageFilename}`}
                  alt={blueprint.name}
                />
              </div>
            )}
            <div className="bp-detail-title">
              <h2>{blueprint.targetName}</h2>
              <p className="bp-detail-subtitle">{blueprint.name}</p>
              <RarityBadge rarity={blueprint.rarity} />
            </div>
          </div>
          <button className="bp-detail-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* ── Tabs ── */}
        <nav className="bp-detail-tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            <BookOpen size={14} /> Overview
          </button>
          <button
            className={activeTab === 'atlas' ? 'active' : ''}
            onClick={() => setActiveTab('atlas')}
          >
            <MapPin size={14} /> Atlas
          </button>
        </nav>

        {/* ── Tab: Overview ── */}
        {activeTab === 'overview' && (
          <div className="bp-detail-body">
            {/* Quick stats row */}
            <div className="bp-stats-row">
              <div className="bp-stat">
                <span className="bp-stat-label">Category</span>
                <span className="bp-stat-value">{blueprint.category}</span>
              </div>
              <div className="bp-stat">
                <span className="bp-stat-label">Status</span>
                <span
                  className="bp-stat-value"
                  style={{ color: progress.learned ? '#22c55e' : '#aaa' }}
                >
                  {progress.learned ? 'Learned' : 'Not Learned'}
                </span>
              </div>
              <div className="bp-stat">
                <span className="bp-stat-label">Duplicates</span>
                <span className="bp-stat-value">{progress.duplicates}</span>
              </div>
              <div className="bp-stat">
                <span className="bp-stat-label">Primary Map</span>
                <span className="bp-stat-value">
                  {likely?.map || 'Community reported'}
                </span>
              </div>
              <div className="bp-stat">
                <span className="bp-stat-label">Quest Reward</span>
                <span
                  className="bp-stat-value"
                  style={{ color: questReward ? '#22c55e' : '#aaa' }}
                >
                  {questReward ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="bp-stat">
                <span className="bp-stat-label">Trials Reward</span>
                <span
                  className="bp-stat-value"
                  style={{ color: trialsReward ? '#22c55e' : '#aaa' }}
                >
                  {trialsReward ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {/* ── Action buttons ── */}
            <div className="bp-actions">
              <button
                className={`bp-action-btn ${progress.learned ? 'active-green' : ''}`}
                onClick={handleMarkLearned}
                title={progress.learned ? 'Mark as Not Learned' : 'Mark as Learned'}
              >
                <Check size={14} />
                {progress.learned ? 'Learned' : 'Mark Learned'}
              </button>
              <button
                className="bp-action-btn"
                onClick={handleAddDuplicate}
                title="Add duplicate"
              >
                <Copy size={14} /> Add Duplicate
              </button>
              {progress.duplicates > 0 && (
                <>
                  <button
                    className="bp-action-btn active-yellow"
                    onClick={handleRemoveDuplicate}
                    title="Remove one duplicate"
                  >
                    <Copy size={14} /> Remove Duplicate
                  </button>
                  <button
                    className="bp-action-btn active-red"
                    onClick={handleSell}
                    title="Sell one duplicate"
                  >
                    <DollarSign size={14} /> Sell Duplicate
                  </button>
                </>
              )}
              {onViewAtlas && (
                <button
                  className="bp-action-btn"
                  onClick={onViewAtlas}
                  title="View in Atlas"
                >
                  <MapPin size={14} /> View in Atlas
                </button>
              )}
            </div>

            {/* ── Loot location containers ── */}
            {atlasRows.length > 0 && (
              <section className="bp-section">
                <h3 className="bp-section-title">Known Loot Locations</h3>
                <div className="bp-location-grid">
                  {atlasRows.map((row, i) => (
                    <div
                      key={i}
                      className="bp-location-card"
                      style={{ borderLeftColor: rarityColor }}
                    >
                      <div className="bp-location-header">
                        <strong>{row.map}</strong>
                        {row.condition && (
                          <span className="bp-location-condition">
                            {row.condition}
                          </span>
                        )}
                      </div>
                      {row.containers && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Containers:</span>{' '}
                          {row.containers}
                        </p>
                      )}
                      {row.location && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Location:</span>{' '}
                          {row.location}
                        </p>
                      )}
                      {row.route && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Route:</span>{' '}
                          {row.route}
                        </p>
                      )}
                      {row.questReward && (
                        <span className="bp-tag green">Quest Reward</span>
                      )}
                      {row.trialsReward && (
                        <span className="bp-tag blue">Trials Reward</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Distribution graphs ── */}
            {containerDist.length > 0 && (
              <section className="bp-section">
                <h3 className="bp-section-title">Container Distribution</h3>
                <div className="bp-dist-chart">
                  {containerDist.map((item) => (
                    <DistributionBar
                      key={item.name}
                      label={item.name}
                      percent={item.percent}
                      count={item.count}
                      color={rarityColor}
                    />
                  ))}
                </div>
              </section>
            )}

            {mapDist.length > 0 && (
              <section className="bp-section">
                <h3 className="bp-section-title">Map Distribution</h3>
                <div className="bp-dist-chart">
                  {mapDist.map((item) => (
                    <DistributionBar
                      key={item.name}
                      label={item.name}
                      percent={item.percent}
                      count={item.count}
                      color={rarityColor}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ── User reports ── */}
            {reports.length > 0 && (
              <section className="bp-section">
                <h3 className="bp-section-title">Your Submitted Finds</h3>
                <div className="bp-location-grid">
                  {reports.map((r, i) => (
                    <div
                      key={i}
                      className="bp-location-card"
                      style={{ borderLeftColor: '#ffe600' }}
                    >
                      <div className="bp-location-header">
                        <strong>{r.container}</strong>
                        <span className="bp-location-condition">{r.map}</span>
                      </div>
                      {r.event && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Event:</span> {r.event}
                        </p>
                      )}
                      {r.location && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Location:</span>{' '}
                          {r.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── Tab: Atlas ── */}
        {activeTab === 'atlas' && (
          <div className="bp-detail-body">
            <section className="bp-section">
              <div className="bp-section-header">
                <h3 className="bp-section-title">Atlas Data</h3>
                <button
                  className="bp-action-btn"
                  onClick={() => setShowFindForm((v) => !v)}
                >
                  <Plus size={14} /> I Found It
                </button>
              </div>

              {atlasRows.length === 0 && reports.length === 0 && (
                <p className="bp-empty">No atlas data yet. Be the first to report a find!</p>
              )}

              {atlasRows.length > 0 && (
                <div className="bp-location-grid">
                  {atlasRows.map((row, i) => (
                    <div
                      key={i}
                      className="bp-location-card"
                      style={{ borderLeftColor: rarityColor }}
                    >
                      <div className="bp-location-header">
                        <strong>{row.map}</strong>
                        {row.condition && (
                          <span className="bp-location-condition">
                            {row.condition}
                          </span>
                        )}
                      </div>
                      {row.containers && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Containers:</span>{' '}
                          {row.containers}
                        </p>
                      )}
                      {row.location && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Location:</span>{' '}
                          {row.location}
                        </p>
                      )}
                      {row.route && (
                        <p className="bp-location-detail">
                          <span className="bp-detail-key">Route:</span>{' '}
                          {row.route}
                        </p>
                      )}
                      <div className="bp-tag-row">
                        {row.questReward && (
                          <span className="bp-tag green">Quest Reward</span>
                        )}
                        {row.trialsReward && (
                          <span className="bp-tag blue">Trials Reward</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* "I Found It" form */}
              {showFindForm && (
                <form className="bp-find-form" onSubmit={handleSubmitReport}>
                  <h4>Report a Find</h4>
                  <div className="bp-find-fields">
                    <label>
                      Container Type *
                      <select
                        value={form.container}
                        onChange={(e) =>
                          setForm({ ...form, container: e.target.value })
                        }
                        required
                      >
                        <option value="">Select container…</option>
                        {CONTAINER_TYPES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Map *
                      <select
                        value={form.map}
                        onChange={(e) =>
                          setForm({ ...form, map: e.target.value })
                        }
                        required
                      >
                        <option value="">Select map…</option>
                        {MAP_OPTIONS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Event / Condition
                      <input
                        list="bp-event-options"
                        value={form.event}
                        onChange={(e) =>
                          setForm({ ...form, event: e.target.value })
                        }
                        placeholder="Night Raid, No Event…"
                      />
                      <datalist id="bp-event-options">
                        {EVENT_OPTIONS.map((ev) => (
                          <option key={ev} value={ev} />
                        ))}
                      </datalist>
                    </label>
                    <label>
                      Exact Location
                      <input
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        placeholder="Room, floor, landmark…"
                      />
                    </label>
                  </div>
                  <div className="bp-find-actions">
                    <button type="submit" className="bp-submit-btn">
                      Submit Find
                    </button>
                    <button
                      type="button"
                      className="bp-action-btn"
                      onClick={() => setShowFindForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* Unique container types summary */}
            {allContainerValues.length > 0 && (
              <section className="bp-section">
                <h3 className="bp-section-title">Reported Container Types</h3>
                <div className="bp-tag-row">
                  {uniqueValues(allContainerValues).map((v) => (
                    <span key={v} className="bp-tag" style={{ borderColor: rarityColor, color: rarityColor }}>
                      {v}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

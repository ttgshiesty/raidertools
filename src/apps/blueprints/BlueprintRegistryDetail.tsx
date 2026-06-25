/**
 * BlueprintRegistryDetail.tsx
 *
 * Detail modal shown when the user clicks a blueprint card.  Visually mirrors
 * the arcraiderscentral.app reference: centered modal, rarity-coloured
 * header strip, item icon + name + rarity chip + category chip, crafted-at
 * line, recipe list (if known), learned toggle, dup +/- stepper, and a
 * secondary "More" tab that exposes the richer Overview (loot locations,
 * distribution, user reports) and Atlas (community atlas rows + "I Found
 * It" submit form) data.
 *
 * The parent (index.tsx) needs no structural changes — props match the
 * existing BlueprintRegistryDetail contract.
 */

import React, { useState } from 'react';
import { Minus, Plus, X, BookOpen, MapPin, Check, DollarSign, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

function getBlueprintImageSrc(blueprint: BlueprintGridItem): string | null {
  if (blueprint.imageUrl) return blueprint.imageUrl;
  if (!blueprint.imageFilename) return null;
  if (/^https?:\/\//i.test(blueprint.imageFilename)) return blueprint.imageFilename;
  if (blueprint.imageFilename.startsWith('/')) return blueprint.imageFilename;
  return `/items/${blueprint.imageFilename}`;
}

function handleBlueprintImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackImageUrl?: string | null,
) {
  if (!fallbackImageUrl) return;
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === 'true') return;
  img.dataset.fallbackApplied = 'true';
  img.src = fallbackImageUrl;
}

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

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlueprintRegistryDetail({
  blueprint,
  atlasRows,
  progress,
  onClose,
  onProgress,
  onViewAtlas,
}: BlueprintRegistryDetailProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'atlas'>('overview');
  const [showFindForm, setShowFindForm] = useState(false);
  const [showMore, setShowMore] = useState(false);
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
  const imageSrc = getBlueprintImageSrc(blueprint);
  const displayName = blueprint.targetName || blueprint.name;

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
    const nextLearned = !progress.learned;
    if (!nextLearned && progress.duplicates === 0) {
      onProgress({ learned: false, duplicates: 0 });
    } else {
      onProgress({ ...progress, learned: nextLearned });
    }
  }

  function handleAddDuplicate() {
    if (progress.duplicates < 99) {
      onProgress({ ...progress, duplicates: progress.duplicates + 1 });
    }
  }

  function handleRemoveDuplicate() {
    if (progress.duplicates > 0) {
      const next = progress.duplicates - 1;
      if (!progress.learned && next === 0) {
        onProgress({ learned: false, duplicates: 0 });
      } else {
        onProgress({ ...progress, duplicates: next });
      }
    }
  }

  function handleSell() {
    if (progress.duplicates > 0) {
      const next = progress.duplicates - 1;
      if (!progress.learned && next === 0) {
        onProgress({ learned: false, duplicates: 0 });
      } else {
        onProgress({ ...progress, duplicates: next });
      }
    }
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
    <div
      className="bp-detail-overlay bp-detail-modal"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bp-detail-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ '--rarity-color': rarityColor } as React.CSSProperties}
      >
        {/* ── Header (icon · name · rarity chip · category chip) ── */}
        <div className="bp-modal-header">
          <div className="bp-modal-icon shrink-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={displayName}
                onError={(event) =>
                  handleBlueprintImageError(event, blueprint.fallbackImageUrl)
                }
              />
            ) : (
              <span className="bp-modal-icon-fallback">{displayName.charAt(0)}</span>
            )}
          </div>
          <div className="bp-modal-identity">
            <h3 className="bp-modal-name">{displayName}</h3>
            <div className="bp-modal-chips">
              <span
                className="bp-modal-chip bp-modal-chip--rarity"
                style={{ backgroundColor: rarityColor }}
              >
                {t(`crafting.rarities.${blueprint.rarity.toLowerCase()}`, blueprint.rarity)}
              </span>
              <span className="bp-modal-chip bp-modal-chip--category">
                {blueprint.category}
              </span>
            </div>
          </div>
          <button
            className="bp-detail-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Crafted-at + recipe ── */}
        {(blueprint.craftedAt || (blueprint.recipe && blueprint.recipe.length > 0)) && (
          <div className="bp-modal-craft">
            {blueprint.craftedAt && (
              <div className="bp-modal-row">
                <span className="bp-modal-label">
                  {t('blueprints.detail.craftedAt', 'Crafted at')}
                </span>
                <span className="bp-modal-value">{blueprint.craftedAt}</span>
              </div>
            )}
            {blueprint.recipe && blueprint.recipe.length > 0 && (
              <div className="bp-modal-recipe">
                <span className="bp-modal-label">
                  {t('blueprints.detail.recipe', 'Recipe')}
                </span>
                <ul className="bp-modal-recipe-items">
                  {blueprint.recipe.map((line: string, idx: number) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── Learned toggle ── */}
        <div className="bp-modal-row bp-modal-toggle-row">
          <span className="bp-modal-toggle-label">
            {t('blueprints.detail.learned', 'Learned')}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={progress.learned}
            onClick={handleMarkLearned}
            className={`bp-modal-toggle ${progress.learned ? 'is-on' : ''}`}
            style={
              progress.learned
                ? { backgroundColor: 'var(--gold-accent, #ffe600)' }
                : undefined
            }
          >
            <span className="bp-modal-toggle-knob" />
          </button>
        </div>

        {/* ── Duplicates + / − ── */}
        <div className="bp-modal-row bp-modal-dup-row">
          <span className="bp-modal-toggle-label">
            {t('blueprints.detail.duplicates', 'Duplicates')}
          </span>
          <div className="bp-modal-stepper">
            <button
              type="button"
              onClick={handleRemoveDuplicate}
              disabled={progress.duplicates === 0}
              className="bp-modal-stepper-btn"
              aria-label="Remove duplicate"
            >
              <Minus size={18} />
            </button>
            <span className="bp-modal-stepper-value">{progress.duplicates}</span>
            <button
              type="button"
              onClick={handleAddDuplicate}
              disabled={progress.duplicates >= 99}
              className="bp-modal-stepper-btn bp-modal-stepper-btn--gold"
              aria-label="Add duplicate"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* ── Expand / collapse "More" (rich Overview + Atlas) ── */}
        <button
          type="button"
          className="bp-modal-more-toggle"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
        >
          <span>{showMore ? 'Hide details' : 'More details'}</span>
          <ChevronDown
            size={16}
            className={`bp-modal-more-chevron ${showMore ? 'is-open' : ''}`}
          />
        </button>

        {showMore && (
          <div className="bp-modal-more">
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

            {activeTab === 'overview' && (
              <div className="bp-detail-body">
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
                  </section>
                )}

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

                {allContainerValues.length > 0 && (
                  <section className="bp-section">
                    <h3 className="bp-section-title">Reported Container Types</h3>
                    <div className="bp-tag-row">
                      {uniqueValues(allContainerValues).map((v) => (
                        <span
                          key={v}
                          className="bp-tag"
                          style={{ borderColor: rarityColor, color: rarityColor }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Footer actions (legacy buttons kept for parity) ── */}
        <div className="bp-actions bp-actions--footer">
          <button
            className={`bp-action-btn ${progress.learned ? 'active-green' : ''}`}
            onClick={handleMarkLearned}
          >
            <Check size={14} />
            {progress.learned ? 'Learned' : 'Mark Learned'}
          </button>
          {progress.duplicates > 0 && (
            <button
              className="bp-action-btn active-red"
              onClick={handleSell}
            >
              <DollarSign size={14} /> Sell Duplicate
            </button>
          )}
          {onViewAtlas && (
            <button className="bp-action-btn" onClick={onViewAtlas}>
              <MapPin size={14} /> View in Atlas
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

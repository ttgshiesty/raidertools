/**
 * blueprints/index.tsx
 *
 * Main blueprints page.  Renders the 83-slot grid with neon-glow rarity
 * borders (matching arcraiderscentral.app), filter controls, progress stats,
 * and the BlueprintRegistryDetail slide-in panel.
 *
 * Key changes vs. original:
 *  • NeonBorder now receives `rarityColor` so each card glows in its rarity
 *    colour (Legendary = gold, Epic = purple, Rare = blue, etc.)
 *  • Blueprint cards use the SVG-based rarity gradient from the reference site
 *  • BlueprintRegistryDetail has been replaced with the new version that
 *    includes loot-location containers, distribution graphs, sell/duplicate/
 *    owned actions, and an Atlas tab
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { NeonBorder } from './NeonBorder';
import { BlueprintRegistryDetail } from './BlueprintRegistryDetail';
import { AtlasBlueprintPanel, parseAtlasCsv } from './AtlasBlueprintPanel';
import type { AtlasRow } from './AtlasBlueprintPanel'; // canonical source
import {
  buildFixedBlueprintSlots,
  buildBlueprintGrid,
  filterBlueprintGrid,
  getRarityColor,
} from './utils/blueprintGrid';
import type {
  BlueprintGridItem,
  BlueprintGridFilters,
} from './utils/blueprintGrid';

import './styles/main.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlueprintProgress {
  learned: boolean;
  duplicates: number;
}

type ProgressMap = Record<string, BlueprintProgress>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RARITY_ORDER: Record<string, number> = {
  Legendary: 0,
  Epic: 1,
  Rare: 2,
  Uncommon: 3,
  Common: 4,
};

function normalizeBlueprintName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s*(blueprint|progetto)\s*/gi, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Renders the rarity-tinted SVG gradient that sits behind the item icon,
 * matching the arcraiderscentral.app card style exactly.
 */
function BlueprintCardSvg({
  id,
  rarity,
  targetName,
}: {
  id: string;
  rarity: string;
  targetName: string;
}) {
  const color = getRarityColor(rarity);
  const bgId = `bg-gradient-${id}`;
  const borderId = `border-gradient-${id}`;
  const label =
    targetName.length > 10 ? `${targetName.slice(0, 9)}\u2026` : targetName;

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      className="relative"
    >
      <defs>
        <linearGradient
          id={bgId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="96"
          x2="95.375"
          y2="0.625"
        >
          <stop offset="0" style={{ stopColor: color, stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: color, stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient
          id={borderId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="96"
          x2="95.375"
          y2="0.625"
        >
          <stop offset="0" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: color, stopOpacity: 0.5 }} />
        </linearGradient>
      </defs>
      {/* bottom name-label background fill */}
      <path
        d="M 0.625,71.980469 V 87.4628906 C 0.625,91.846083 4.1539194,95.375 8.5371094,95.375 H 87.462891 c 4.383192,0 7.912109,-3.528917 7.912109,-7.9121094 V 71.980469 Z"
        fill="#0b0e1b"
      />
      {/* rarity-tinted border */}
      <rect
        x="0.625"
        y="0.625"
        width="94.75"
        height="94.75"
        rx="7.91"
        ry="7.91"
        fill="none"
        stroke={`url(#${borderId})`}
        strokeWidth="1.25"
      />
      {/* name label */}
      <text
        x="26"
        y="86"
        textAnchor="start"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        fontWeight="400"
        fontSize="9"
      >
        {label}
      </text>
    </svg>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function BlueprintsPage() {
  const { t } = useTranslation();

  // ── State ──────────────────────────────────────────────────
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [atlasSearch, setAtlasSearch] = useState('');
  const [section, setSection] = useState<'grid' | 'atlas'>('grid');
  const [atlasRows, setAtlasRows] = useState<AtlasRow[]>([]);

  // Fetch atlas CSV on mount — same pattern as the real project
  useEffect(() => {
    fetch('/data/blueprints/atlas.csv')
      .then((r) => r.text())
      .then((text) => setAtlasRows(parseAtlasCsv(text)))
      .catch(() => setAtlasRows([]));
  }, []);

  const [filters, setFilters] = useState<BlueprintGridFilters>({
    query: '',
    category: 'all',
    status: 'all',
  });

  // ── Load progress from localStorage ───────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem('arc-raiders-blueprints');
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Persist progress ───────────────────────────────────────
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('arc-raiders-blueprints', JSON.stringify(progress));
    }
  }, [progress, loading]);

  function updateProgress(id: string, next: BlueprintProgress) {
    setProgress((prev) => ({ ...prev, [id]: next }));
  }

  // ── Build grid ─────────────────────────────────────────────
  const allBlueprints = useMemo(() => buildBlueprintGrid(null, null), []);

  const filteredBlueprints = useMemo(
    () => filterBlueprintGrid(allBlueprints, filters),
    [allBlueprints, filters],
  );

  // ── Stats ──────────────────────────────────────────────────
  const stats = useMemo(() => {
    const learned = allBlueprints.filter(
      (bp) => progress[bp.id]?.learned,
    ).length;
    const owned = allBlueprints.filter(
      (bp) => (progress[bp.id]?.duplicates ?? 0) > 0,
    ).length;
    return {
      total: allBlueprints.length,
      learned,
      notLearned: allBlueprints.length - learned,
      owned,
      percent: Math.round((learned / allBlueprints.length) * 100),
    };
  }, [allBlueprints, progress]);

  // ── Selected blueprint ─────────────────────────────────────
  const selected = useMemo(
    () => (selectedId ? allBlueprints.find((bp) => bp.id === selectedId) ?? null : null),
    [selectedId, allBlueprints],
  );

  // Atlas rows for the selected blueprint — matched by normalised name
  const selectedAtlas: AtlasRow[] = useMemo(() => {
    if (!selected) return [];
    return atlasRows.filter(
      (row) =>
        normalizeBlueprintName(row.blueprint) ===
        normalizeBlueprintName(selected.targetName),
    );
  }, [selected, atlasRows]);

  // ── Categories ─────────────────────────────────────────────
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allBlueprints.map((bp) => bp.category)));
    return ['all', ...cats.sort()];
  }, [allBlueprints]);

  if (loading) {
    return (
      <div className="page-main blueprints-page">
        <div className="blueprints-background" />
        <div className="page-container gap-3">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p style={{ color: '#888' }}>{t('blueprints.loading', 'Loading blueprints…')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-main blueprints-page">
      <div className="blueprints-background" />

      <div className="page-container">
        {/* ── Hero ── */}
        <div className="blueprints-hero">
          <div className="blueprints-hero-title">
            <h1>{t('blueprints.title', 'Blueprints')}</h1>
            <button
              className="blueprints-guide-btn"
              onClick={() => setShowGuide(true)}
              aria-label="Open guide"
            >
              <HelpCircle size={18} />
            </button>
          </div>
        </div>

        {/* ── Progress stats ── */}
        <div className="blueprints-progress">
          <div className="blueprints-progress-stat">
            <label>Learned</label>
            <strong style={{ color: '#22c55e' }}>{stats.learned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>Not Learned</label>
            <strong style={{ color: '#ef4444' }}>{stats.notLearned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>Owned (Dupes)</label>
            <strong style={{ color: '#ffe600' }}>{stats.owned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>Completion</label>
            <strong>{stats.percent}%</strong>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="blueprints-filters">
          <div className="blueprints-filter-search">
            <input
              type="search"
              placeholder={t('blueprints.search', 'Search blueprints…')}
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>
          <div className="blueprints-filter-row">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              style={{
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                color: '#fff',
                outline: 'none',
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value as BlueprintGridFilters['status'],
                })
              }
              style={{
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                color: '#fff',
                outline: 'none',
              }}
            >
              <option value="all">All Status</option>
              <option value="learned">Learned</option>
              <option value="unlearned">Not Learned</option>
              <option value="owned">Owned (Dupes)</option>
            </select>
          </div>
        </div>

        {/* ── Section nav (Collection / Atlas) ── */}
        <nav className="blueprints-sections">
          <button
            className={section === 'grid' ? 'active' : ''}
            onClick={() => setSection('grid')}
          >
            Collection
          </button>
          <button
            className={section === 'atlas' ? 'active' : ''}
            onClick={() => {
              setSection('atlas');
              setAtlasSearch('');
            }}
          >
            Atlas
          </button>
        </nav>

        {/* ── Atlas panel ── */}
        {section === 'atlas' && (
          <AtlasBlueprintPanel
            initialSearch={atlasSearch}
            atlasRows={atlasRows}
          />
        )}

        {/* ── Blueprint grid ── */}
        {section === 'grid' && (
        <div className="blueprints-grid-container">
          <div className="blueprints-grid">
            {filteredBlueprints.map((blueprint) => {
              const bp = blueprint as BlueprintGridItem;
              const bpProgress = progress[bp.id];
              const isLearned = bpProgress?.learned ?? false;
              const duplicates = bpProgress?.duplicates ?? 0;
              const rarityColor = getRarityColor(bp.rarity);

              return (
                <div
                  key={bp.id}
                  className="blueprint-card group select-none"
                  title={bp.unknown ? 'Unknown Blueprint' : bp.name}
                  onClick={() => !bp.unknown && setSelectedId(bp.id)}
                  role="button"
                  tabIndex={bp.unknown ? -1 : 0}
                  onKeyDown={(e) => {
                    if (!bp.unknown && (e.key === 'Enter' || e.key === ' ')) {
                      setSelectedId(bp.id);
                    }
                  }}
                >
                  <NeonBorder
                    rarityColor={rarityColor}
                    alwaysOn={isLearned}
                    backgroundColor="#1a1a1a"
                  >
                    <div
                      className="relative block leading-none"
                      style={{ width: '80px', height: '80px' }}
                    >
                      {/* Blueprint background image */}
                      <div
                        className="absolute inset-0 rounded-lg overflow-hidden"
                        style={{
                          backgroundImage:
                            'url("/icons/blueprints/blueprint-bg.webp")',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center center',
                          borderRadius: '6px',
                        }}
                      />

                      {bp.unknown ? (
                        <div className="blueprint-unknown-label">???</div>
                      ) : (
                        <>
                          {/* Rarity SVG gradient + name label */}
                          <BlueprintCardSvg
                            id={bp.id}
                            rarity={bp.rarity}
                            targetName={bp.targetName}
                          />

                          {/* Item icon */}
                          {bp.imageFilename && (
                            <img
                              src={`/icons/blueprints/${bp.imageFilename}`}
                              alt={bp.name}
                              className="absolute pointer-events-none"
                              loading="lazy"
                              style={{
                                width: '58.08px',
                                height: '58.08px',
                                left: '10.96px',
                                top: '0.8px',
                                objectFit: 'contain',
                              }}
                            />
                          )}

                          {/* Blueprint icon overlay */}
                          <img
                            src="/icons/items/category/Icon_Blueprint.png"
                            alt="blueprint"
                            className="absolute pointer-events-none"
                            loading="lazy"
                            style={{
                              width: '12.48px',
                              height: '12.48px',
                              left: '4.72px',
                              bottom: '4.08px',
                              objectFit: 'contain',
                              filter: 'brightness(1.3)',
                              opacity: 0.95,
                            }}
                          />
                        </>
                      )}

                      {/* Learned checkmark */}
                      {isLearned && (
                        <div className="blueprint-checkmark pointer-events-none">
                          <Check size={10} />
                        </div>
                      )}

                      {/* Duplicate count */}
                      {duplicates > 0 && !bp.unknown && (
                        <div className="blueprint-duplicate pointer-events-none">
                          {duplicates}
                        </div>
                      )}
                    </div>
                  </NeonBorder>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* ── Detail panel ── */}
        {selected && (
          <BlueprintRegistryDetail
            blueprint={selected}
            atlasRows={selectedAtlas}
            progress={{
              learned: progress[selected.id]?.learned ?? false,
              duplicates: progress[selected.id]?.duplicates ?? 0,
            }}
            onClose={() => setSelectedId(null)}
            onProgress={(next) => updateProgress(selected.id, next)}
            onViewAtlas={() => {
              setAtlasSearch(selected.targetName);
              setSection('atlas');
              setSelectedId(null);
            }}
          />
        )}
      </div>

      {/* ── Guide dialog ── */}
      {showGuide && (
        <div
          className="blueprints-guide-dialog"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="blueprints-guide-body"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blueprints-guide-section">
              <h2>{t('blueprints.guide.trackingTitle', 'Tracking Your Collection')}</h2>
              <p>
                {t(
                  'blueprints.guide.trackingDesc',
                  'Click any blueprint card to open the detail panel. Mark blueprints as Learned, add duplicates, or record where you found them.',
                )}
              </p>
            </div>
            <div className="blueprints-guide-section">
              <h2>{t('blueprints.guide.statusTitle', 'Card Status')}</h2>
              <p>
                {t(
                  'blueprints.guide.statusDesc',
                  'A spinning neon border means the blueprint is learned. A yellow badge shows how many duplicates you own.',
                )}
              </p>
            </div>
            <div className="blueprints-guide-section">
              <h2>{t('blueprints.guide.filtersTitle', 'Filters')}</h2>
              <p>
                {t(
                  'blueprints.guide.filtersDesc',
                  'Use the search box and dropdowns to filter by name, category, or collection status.',
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="blueprints-guide-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

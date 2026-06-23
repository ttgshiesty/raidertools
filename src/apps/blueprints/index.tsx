/**
 * blueprints/index.tsx
 *
 * Main blueprints page.  Renders the 83-slot grid with neon-glow rarity
 * borders (matching arcraiderscentral.app), filter controls (search +
 * category + status + sort), progress stats, the blueprint grid and the
 * BlueprintRegistryDetail slide-in panel.
 *
 * Skeleton mirrors the example build: hero / progress / filters grid /
 * grid-container with ref / no-results Card / guide Dialog.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { NeonBorder } from './NeonBorder';
import { ItemFrame } from './ItemFrame';
import { BlueprintRegistryDetail } from './BlueprintRegistryDetail';
import { AtlasBlueprintPanel, parseAtlasCsv } from './AtlasBlueprintPanel';
import type { AtlasRow } from './AtlasBlueprintPanel';
import {
  buildBlueprintGridFromItems,
  filterBlueprintGrid,
  sortBlueprints,
} from './utils/blueprintGrid';
import type {
  BlueprintGridItem,
  BlueprintGridFilters,
  BlueprintSort,
} from './utils/blueprintGrid';
import type { RawItemsOutput } from '../../shared/types/item';

import './styles/main.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlueprintProgress {
  learned: boolean;
  duplicates: number;
}

type ProgressMap = Record<string, BlueprintProgress>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeBlueprintName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s*(blueprint|progetto)\s*/gi, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getBlueprintImageSrc(blueprint: BlueprintGridItem): string | null {
  if (blueprint.imageUrl) return blueprint.imageUrl;
  if (!blueprint.imageFilename) return null;
  if (/^https?:\/\//i.test(blueprint.imageFilename)) return blueprint.imageFilename;
  if (blueprint.imageFilename.startsWith('/')) return blueprint.imageFilename;
  return `/items/${blueprint.imageFilename}`;
}

function getBlueprintDisplayName(value: string): string {
  return value.replace(/\s*(blueprint|progetto)\s*/gi, '').trim();
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function BlueprintsPage() {
  const { t, i18n } = useTranslation();

  // ── State ──────────────────────────────────────────────────
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [atlasSearch, setAtlasSearch] = useState('');
  const [section, setSection] = useState<'grid' | 'atlas'>('grid');
  const [atlasRows, setAtlasRows] = useState<AtlasRow[]>([]);
  const [itemsDb, setItemsDb] = useState<Record<string, RawItemsOutput['items'][string]> | null>(null);

  const [filters, setFilters] = useState<BlueprintGridFilters>({
    query: '',
    category: 'all',
    status: 'all',
  });
  const [sort, setSort] = useState<BlueprintSort>('rarity');

  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextClickRef = useRef(false);

  // Fetch atlas CSV on mount — same pattern as the real project
  useEffect(() => {
    fetch('/data/blueprints/atlas.csv')
      .then((r) => r.text())
      .then((text) => setAtlasRows(parseAtlasCsv(text)))
      .catch(() => setAtlasRows([]));
  }, []);

  // Fetch blueprint item catalog from arc-raiders-blueprints.json
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/data/blueprints/arc_raiders_blueprints_full.json');
        if (!res.ok) throw new Error('Failed to load blueprints');
        const payload = await res.json();
        if (!cancelled) setItemsDb(payload.data ?? {});
      } catch {
        if (!cancelled) setItemsDb({});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

  function openBlueprint(
    blueprint: BlueprintGridItem,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    event?.preventDefault();
    event?.stopPropagation();

    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      return;
    }

    setSelectedId(blueprint.id);
  }

  function addDuplicate(id: string, event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const current = progress[id] || { learned: false, duplicates: 0 };

    if (current.learned && current.duplicates < 99) {
      updateProgress(id, {
        ...current,
        duplicates: current.duplicates + 1,
      });
    }
  }

  function removeDuplicate(id: string) {
    const current = progress[id] || { learned: false, duplicates: 0 };

    if (current.duplicates > 0) {
      updateProgress(id, {
        ...current,
        duplicates: current.duplicates - 1,
      });
    }
  }

  function clearLongPress() {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }

  // ── Build grid ─────────────────────────────────────────────
  const allBlueprints = useMemo(
    () => buildBlueprintGridFromItems(itemsDb ?? {}, progress),
    [itemsDb, progress],
  );

  const filteredBlueprints = useMemo(
    () => filterBlueprintGrid(allBlueprints, filters),
    [allBlueprints, filters],
  );

  const visibleBlueprints = useMemo(
    () => sortBlueprints(filteredBlueprints, sort, i18n.language),
    [filteredBlueprints, sort, i18n.language],
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
      percent: allBlueprints.length
        ? Math.round((learned / allBlueprints.length) * 100)
        : 0,
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

  // localized category labels — fall back to the raw slug
  const categoryLabel = (cat: string): string =>
    cat === 'all' ? t('blueprints.allCategories', 'All Categories') : cat;

  if (loading) {
    return (
      <div className="page-main blueprints-page">
        <div className="blueprints-background" />
        <div className="page-container gap-3">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-beige">{t('blueprints.loading', 'Loading blueprints…')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-main blueprints-page">
      <div className="blueprints-background" />

      <div className="page-container gap-3">
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

        {/* ── Filters ── */}
        <div className="blueprints-filters">
          <input
            type="text"
            className="blueprints-filter-search bg-blue-dark border-ui-border"
            placeholder={t('blueprints.search', 'Search blueprints…')}
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />

          <div className="blueprints-filter-row">
            <select
              className="bg-blue-dark border-ui-border hover:bg-blue-light"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              aria-label={t('blueprints.filters.allCategories', 'All Categories')}
            >
              <option value="all">{t('blueprints.allCategories', 'All Categories')}</option>
              {categories
                .filter((c) => c !== 'all')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabel(cat)}
                  </option>
                ))}
            </select>

            <select
              className="bg-blue-dark border-ui-border hover:bg-blue-light"
              value={sort}
              onChange={(e) => setSort(e.target.value as BlueprintSort)}
              aria-label={t('blueprints.sort.sortBy', 'Sort by')}
            >
              <option value="ingame">{t('blueprints.sort.ingame', 'In-game order')}</option>
              <option value="name">{t('blueprints.sort.name', 'Name')}</option>
              <option value="rarity">{t('blueprints.sort.rarity', 'Rarity')}</option>
            </select>
          </div>

          <div className="blueprints-filter-row">
            <select
              className="bg-blue-dark border-ui-border hover:bg-blue-light"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value as BlueprintGridFilters['status'],
                })
              }
              aria-label={t('blueprints.filters.all', 'All')}
            >
              <option value="all">
                {t('blueprints.filters.all', 'All')} ({stats.total})
              </option>
              <option value="learned">
                {t('blueprints.learned', 'Learned')} ({stats.learned})
              </option>
              <option value="unlearned">
                {t('blueprints.unlearned', 'Not Learned')} ({stats.notLearned})
              </option>
              <option value="owned">
                {t('blueprints.filters.owned', 'Owned (Dupes)')} ({stats.owned})
              </option>
            </select>
          </div>
        </div>

        {/* ── Progress stats ── */}
        <div className="blueprints-progress">
          <div className="blueprints-progress-stat">
            <label>{t('blueprints.learned', 'Learned')}</label>
            <strong style={{ color: '#22c55e' }}>{stats.learned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>{t('blueprints.unlearned', 'Not Learned')}</label>
            <strong style={{ color: '#ef4444' }}>{stats.notLearned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>{t('blueprints.filters.owned', 'Owned (Dupes)')}</label>
            <strong style={{ color: '#ffe600' }}>{stats.owned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>Completion</label>
            <strong>{stats.percent}%</strong>
          </div>
        </div>

        {/* ── Section nav (Collection / Atlas) ── */}
        <nav className="blueprints-sections">
          <button
            className={section === 'grid' ? 'active' : ''}
            onClick={() => setSection('grid')}
          >
            {t('blueprints.title', 'Collection')}
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
          <div
            ref={gridContainerRef}
            className="blueprints-grid-container"
          >
            <div className="blueprints-grid">
              {visibleBlueprints.map((bp) => {
                const bpProgress = progress[bp.id];
                const isLearned = bpProgress?.learned ?? false;
                const duplicates = bpProgress?.duplicates ?? 0;
                const imageSrc = getBlueprintImageSrc(bp);

                return (
                  <div
                    key={bp.id}
                    className="blueprint-card"
                    title={bp.name}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        openBlueprint(bp, event);
                      }
                    }}
                  >
                    <NeonBorder
                      backgroundColor="#1a1a1a"
                      borderRadius={0.5}
                      fitContent
                      onClick={(event) => {
                        openBlueprint(bp, event);
                      }}
                      onContextMenu={(event) => {
                        addDuplicate(bp.id, event);
                      }}
                      onTouchStart={() => {
                        suppressNextClickRef.current = false;
                        clearLongPress();
                        longPressTimerRef.current = setTimeout(() => {
                          suppressNextClickRef.current = true;
                          removeDuplicate(bp.id);
                        }, 500);
                      }}
                      onTouchEnd={clearLongPress}
                      onTouchMove={clearLongPress}
                      overlay={(
                        <>
                          {isLearned && (
                            <div className="blueprint-checkmark pointer-events-none">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="#fff"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={4}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                          {duplicates > 0 && (
                            <div className="blueprint-duplicate pointer-events-none">
                              <span className="text-[10px] font-bold text-white">
                                {duplicates}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    >
                      <ItemFrame
                        item={{
                          ...bp,
                          icon: imageSrc,
                          item_type: 'Blueprint',
                        }}
                        size="lg"
                        showNameBar
                        displayName={getBlueprintDisplayName(bp.name)}
                        disableHover
                        onClick={(event) => {
                          event.stopPropagation();
                          openBlueprint(bp, event);
                        }}
                      />
                    </NeonBorder>
                  </div>
                );
              })}
            </div>

            {visibleBlueprints.length === 0 && (
              <div className="blueprints-no-results">
                <p className="text-lg text-beige">
                  {t('blueprints.noResults', 'No blueprints match these filters.')}
                </p>
              </div>
            )}
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
            className="blueprints-guide-body page-guide-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="blueprints-guide-header">
              <h2>{t('blueprints.guide.title', 'How blueprints work')}</h2>
            </header>
            <div className="blueprints-guide-body page-guide-body">
              <div className="blueprints-guide-section page-guide-section">
                <h2>
                  {t('blueprints.guide.trackingTitle', 'Tracking Your Collection')}
                </h2>
                <p>
                  {t(
                    'blueprints.guide.trackingDesc',
                    'Click any blueprint card to open the detail panel. Mark blueprints as Learned, add duplicates, or record where you found them.',
                  )}
                </p>
              </div>
              <div className="blueprints-guide-section page-guide-section">
                <h2>{t('blueprints.guide.statusTitle', 'Card Status')}</h2>
                <p>
                  {t(
                    'blueprints.guide.statusDesc',
                    'A spinning neon border means the blueprint is learned. A yellow badge shows how many duplicates you own.',
                  )}
                </p>
              </div>
              <div className="blueprints-guide-section page-guide-section">
                <h2>{t('blueprints.guide.filtersTitle', 'Filters')}</h2>
                <p>
                  {t(
                    'blueprints.guide.filtersDesc',
                    'Use the search box and dropdowns to filter by name, category, or collection status.',
                  )}
                </p>
              </div>
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

// Named export for App.tsx lazy import
export const BlueprintsApp = BlueprintsPage;
/**
 * blueprints/index.tsx
 *
 * Blueprints page. Uses arc-raiders-blueprints.js as the blueprint source,
 * keeps Atlas, keeps the neon grid, keeps progress tracking, and keeps PNG export.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import html2canvas from "html2canvas";
import { Download, HelpCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

import { NeonBorder } from './NeonBorder';
import { b as BLUEPRINTS } from "./arc-raiders-blueprints";
import { ItemFrame } from './ItemFrame';
import { BlueprintRegistryDetail } from './BlueprintRegistryDetail';
import { AtlasBlueprintPanel, parseAtlasCsv } from './AtlasBlueprintPanel';
import type { AtlasRow } from "./AtlasBlueprintPanel";

import './styles/main.scss';

interface SourceBlueprint {
  id: string;
  name: string;
  rarity: string;
  category: string;
  description?: string;
  craftedAt?: string;
  recipe?: string[];
  icon?: string;
}

interface BlueprintProgress {
  learned: boolean;
  duplicates: number;
}

type ProgressMap = Record<string, BlueprintProgress>;
type BlueprintSort = "ingame" | "name" | "rarity";
type BlueprintStatusFilter = "all" | "learned" | "notLearned" | "owned";

interface BlueprintGridFilters {
  query: string;
  category: string;
  status: BlueprintStatusFilter;
}

export interface BlueprintGridItem {
  slot: number;
  slug?: string;
  id: string;
  targetItemId: string;
  name: string;
  targetName: string;
  targetItemName: string | null;
  category: string;
  rarity: string;
  targetRarity: string | null;
  blueprintRarity: string | null;
  isWeapon: boolean;
  imageFilename: string | null;
  imageUrl?: string | null;
  fallbackImageUrl?: string | null;
  description?: string;
  craftedAt?: string | null;
  recipe?: string[];
  learned: boolean | null;
  duplicates?: number;
  unknown?: boolean;
}

const CATEGORIES = [
  "All",
  "Weapon",
  "Mod",
  "Augment",
  "Quick Use",
  "Grenade",
  "Mine",
  "Material"
];

const RARITY_ORDER: Record<string, number> = {
  Legendary: 0,
  Epic: 1,
  Rare: 2,
  Uncommon: 3,
  Common: 4
};

function normalizeProgress(value: unknown): ProgressMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const out: ProgressMap = {};

  for (const [id, entry] of Object.entries(value)) {
    if (typeof entry === "number") {
      out[id] = {
        learned: entry >= 1,
        duplicates: Math.max(0, entry - 1)
      };
      continue;
    }

    if (
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry) &&
      "learned" in entry
    ) {
      const record = entry as { learned?: unknown; duplicates?: unknown };
      out[id] = {
        learned: record.learned === true,
        duplicates:
          typeof record.duplicates === "number"
            ? Math.max(0, record.duplicates)
            : 0
      };
    }
  }

  return out;
}

function normalizeBlueprintName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s*(blueprint|progetto)\s*/gi, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getBlueprintDisplayName(value: string): string {
  return value.replace(/\s*(blueprint|progetto)\s*/gi, "").trim();
}

function resolveBlueprintIcon(icon: string | undefined): string | null {
  if (!icon) return null;
  if (/^https?:\/\//i.test(icon)) return icon;
  if (icon.startsWith("/")) return icon;
  return `/${icon}`;
}

function mapBlueprintSource(
  blueprint: SourceBlueprint,
  index: number,
  progress: ProgressMap
): BlueprintGridItem {
  const saved = progress[blueprint.id] || { learned: false, duplicates: 0 };
  const imageUrl = resolveBlueprintIcon(blueprint.icon);

  return {
    slot: index + 1,
    slug: blueprint.id,
    id: blueprint.id,
    targetItemId: blueprint.id,
    name: blueprint.name,
    targetName: blueprint.name,
    targetItemName: blueprint.name,
    category: blueprint.category,
    rarity: blueprint.rarity,
    targetRarity: blueprint.rarity,
    blueprintRarity: blueprint.rarity,
    isWeapon: blueprint.category === "Weapon",
    imageFilename: blueprint.icon ?? null,
    imageUrl,
    fallbackImageUrl: null,
    description: blueprint.description ?? "",
    craftedAt: blueprint.craftedAt ?? null,
    recipe: blueprint.recipe,
    learned: saved.learned,
    duplicates: saved.duplicates,
    unknown: false
  };
}

function blueprintMatchesSearch(name: string, query: string): boolean {
  if (!query) return true;
  return name.toLowerCase().includes(query.toLowerCase());
}

function filterBlueprints(
  blueprints: BlueprintGridItem[],
  filters: BlueprintGridFilters
): BlueprintGridItem[] {
  return blueprints.filter((blueprint) => {
    if (!blueprintMatchesSearch(blueprint.name, filters.query)) return false;
    if (filters.category !== "All" && blueprint.category !== filters.category)
      return false;

    if (filters.status !== "all") {
      const learned = blueprint.learned === true;
      const owned = (blueprint.duplicates ?? 0) > 0;

      if (filters.status === "learned" && !learned) return false;
      if (filters.status === "notLearned" && learned) return false;
      if (filters.status === "owned" && !owned) return false;
    }

    return true;
  });
}

function sortBlueprints(
  blueprints: BlueprintGridItem[],
  sort: BlueprintSort,
  locale: string
): BlueprintGridItem[] {
  const copy = [...blueprints];

  if (sort === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name, locale));
  }

  if (sort === "rarity") {
    return copy.sort((a, b) => {
      const rarityA = RARITY_ORDER[a.rarity] ?? 99;
      const rarityB = RARITY_ORDER[b.rarity] ?? 99;
      if (rarityA !== rarityB) return rarityA - rarityB;
      return 0;
    });
  }

  return copy;
}

export default function BlueprintsPage() {
  const { t, i18n } = useTranslation();

  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [atlasSearch, setAtlasSearch] = useState('');
  const [section, setSection] = useState<'grid' | 'atlas'>('grid');
  const [atlasRows, setAtlasRows] = useState<AtlasRow[]>([]);

  const [filters, setFilters] = useState<BlueprintGridFilters>({
    query: "",
    category: "All",
    status: "all"
  });
  const [sort, setSort] = useState<BlueprintSort>("ingame");

  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextClickRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/blueprints/atlas.csv")
      .then((response) => (response.ok ? response.text() : ""))
      .then((text) => {
        if (!cancelled) setAtlasRows(text ? parseAtlasCsv(text) : []);
      })
      .catch(() => {
        if (!cancelled) setAtlasRows([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('arc-raiders-blueprints');
      if (raw) {
        setProgress(normalizeProgress(JSON.parse(raw)));
      }
    } catch {
      setProgress({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('arc-raiders-blueprints', JSON.stringify(progress));
    }
  }, [progress, loading]);

  function updateProgress(id: string, next: BlueprintProgress) {
    if (!next.learned && next.duplicates === 0) {
      setProgress((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      return;
    }

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
  
  async function exportBlueprintGrid() {
    const container = gridContainerRef.current;
    if (!container) return;

    const grid = container.querySelector<HTMLElement>(".blueprints-grid");
    if (!grid) return;

    const previousContainerStyle = container.style.cssText;
    const previousGridStyle = grid.style.cssText;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".blueprint-card")
    );
    const borders = Array.from(
      container.querySelectorAll<HTMLElement>(".neon-border-wrapper")
    );
    const duplicates = Array.from(
      container.querySelectorAll<HTMLElement>(".blueprint-duplicate")
    );
    const duplicateLabels = Array.from(
      container.querySelectorAll<HTMLElement>(".blueprint-duplicate span")
    );
    const checkmarks = Array.from(
      container.querySelectorAll<HTMLElement>(".blueprint-checkmark")
    );

    const cardStyles = cards.map((element) => element.style.cssText);
    const borderStyles = borders.map((element) => element.style.cssText);
    const duplicateStyles = duplicates.map((element) => element.style.cssText);
    const duplicateLabelStyles = duplicateLabels.map(
      (element) => element.style.cssText
    );
    const checkmarkStyles = checkmarks.map((element) => element.style.cssText);

    const fillers: HTMLDivElement[] = [];
    let watermark: HTMLImageElement | null = null;

    try {
      container.style.overflow = "visible";
      container.style.overflowX = "visible";
      container.style.overflowY = "visible";
      container.style.maxWidth = "none";
      container.style.height = "auto";
      container.style.maxHeight = "none";
      container.style.minHeight = "auto";
      container.style.flex = "none";
      container.style.position = "relative";
      container.style.width = "900px";

      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "repeat(10, 80px)";
      grid.style.gridAutoFlow = "row";
      grid.style.gap = "8px";
      grid.style.rowGap = "8px";

      cards.forEach((element) => {
        element.style.width = "80px";
        element.style.height = "80px";
        element.style.minWidth = "80px";
        element.style.maxWidth = "80px";
        element.style.aspectRatio = "1";
        element.style.flexShrink = "0";
      });

      borders.forEach((element) => {
        element.style.width = "80px";
        element.style.height = "80px";
        element.style.minWidth = "80px";
        element.style.maxWidth = "80px";
        element.style.aspectRatio = "1";
        element.style.flexShrink = "0";
      });

      duplicates.forEach((element) => {
        element.style.cssText =
          "position:absolute;top:1px;left:1px;width:20px;height:20px;z-index:10;background-color:#3b82f6;border-radius:5.5px 0 5.5px 0;";
      });

      duplicateLabels.forEach((element) => {
        element.style.cssText =
          "position:absolute;top:-4px;left:0;right:0;font-size:10px;font-weight:bold;color:white;text-align:center;";
      });

      checkmarks.forEach((element) => {
        element.style.cssText =
          "position:absolute;top:5px;right:5px;z-index:10;";
      });

      const total = visibleBlueprints.length;
      const columns = 10;
      const minExtra = 5;
      const remainder = total % columns;
      const emptyToRowEnd = columns - (remainder || columns);
      const fillerCount =
        emptyToRowEnd < minExtra ? emptyToRowEnd + minExtra : minExtra;

      for (let index = 0; index < fillerCount; index += 1) {
        const filler = document.createElement("div");
        filler.style.cssText = "width:80px;height:80px;";
        grid.appendChild(filler);
        fillers.push(filler);
      }

      const images = Array.from(
        container.querySelectorAll<HTMLImageElement>("img")
      );
      await Promise.all(
        images.map((image) =>
          image.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                image.onload = () => resolve();
                image.onerror = () => resolve();
              })
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 100));

      watermark = document.createElement("img");
      watermark.src = "/trademark.webp";
      watermark.style.cssText = `
        position: absolute;
        bottom: 12px;
        right: 14px;
        height: 80px;
        width: auto;
        opacity: 1;
        z-index: 1;
        pointer-events: none;
      `;
      container.appendChild(watermark);

      await new Promise<void>((resolve) => {
        if (!watermark) {
          resolve();
          return;
        }

        if (watermark.complete) {
          resolve();
        } else {
          watermark.onload = () => resolve();
          watermark.onerror = () => resolve();
        }
      });

      const width = container.scrollWidth;
      const height = container.scrollHeight;
      const canvas = await html2canvas(container, {
        backgroundColor: "#1a1a1a",
        scale: 2,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        useCORS: true
      });

      const link = document.createElement("a");
      link.download = "arc-raiders-blueprints.png";
      link.href = canvas.toDataURL();
      link.click();
    } finally {
      if (watermark) watermark.remove();
      fillers.forEach((filler) => filler.remove());

      container.style.cssText = previousContainerStyle;
      grid.style.cssText = previousGridStyle;

      cards.forEach((element, index) => {
        element.style.cssText = cardStyles[index] ?? "";
      });
      borders.forEach((element, index) => {
        element.style.cssText = borderStyles[index] ?? "";
      });
      duplicates.forEach((element, index) => {
        element.style.cssText = duplicateStyles[index] ?? "";
      });
      duplicateLabels.forEach((element, index) => {
        element.style.cssText = duplicateLabelStyles[index] ?? "";
      });
      checkmarks.forEach((element, index) => {
        element.style.cssText = checkmarkStyles[index] ?? "";
      });
    }
  }

  const allBlueprints = useMemo(
    () =>
      (BLUEPRINTS as SourceBlueprint[]).map((blueprint, index) =>
        mapBlueprintSource(blueprint, index, progress)
      ),
    [progress]
  );

  const visibleBlueprints = useMemo(
    () =>
      sortBlueprints(
        filterBlueprints(allBlueprints, filters),
        sort,
        i18n.language
      ),
    [allBlueprints, filters, sort, i18n.language]
  );

  const stats = useMemo(() => {
    const learned = allBlueprints.filter(
      (blueprint) => blueprint.learned === true
    ).length;
    const owned = allBlueprints.filter(
      (blueprint) => (blueprint.duplicates ?? 0) > 0
    ).length;

    return {
      total: allBlueprints.length,
      learned,
      notLearned: allBlueprints.length - learned,
      owned,
      progress: allBlueprints.length
        ? Math.round((learned / allBlueprints.length) * 100)
        : 0
    };
  }, [allBlueprints]);

  const selected = useMemo(
    () =>
      selectedId
        ? (allBlueprints.find((blueprint) => blueprint.id === selectedId) ??
          null)
        : null,
    [selectedId, allBlueprints]
  );

  const selectedAtlas: AtlasRow[] = useMemo(() => {
    if (!selected) return [];

    return atlasRows.filter(
      (row) =>
        normalizeBlueprintName(row.blueprint) ===
        normalizeBlueprintName(selected.targetName)
    );
  }, [selected, atlasRows]);

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
        <div className="blueprints-filters">
          <input
            type="text"
            className="blueprints-filter-search bg-blue-dark border-ui-border"
            placeholder={t("blueprints.search", "Search blueprints…")}
            value={filters.query}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                query: event.target.value
              }))
            }
          />

          <div className="blueprints-filter-row">
            <select
              className="bg-blue-dark border-ui-border hover:bg-blue-light"
              value={filters.category}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  category: event.target.value
                }))
              }
              aria-label={t(
                "blueprints.filters.allCategories",
                "All Categories"
              )}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category === "All"
                    ? t("blueprints.filters.allCategories", "All Categories")
                    : category}
                </option>
              ))}
            </select>

            <select
              className="bg-blue-dark border-ui-border hover:bg-blue-light"
              value={sort}
              onChange={(event) => setSort(event.target.value as BlueprintSort)}
              aria-label={t("blueprints.sort.sortBy", "Sort by")}
            >
              <option value="ingame">
                {t("blueprints.sort.ingame", "In-game order")}
              </option>
              <option value="name">{t("blueprints.sort.name", "Name")}</option>
              <option value="rarity">
                {t("blueprints.sort.rarity", "Rarity")}
              </option>
            </select>
          </div>

          <div className="blueprints-filter-row">
            <select
              className="bg-blue-dark border-ui-border hover:bg-blue-light"
              value={filters.status}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  status: event.target.value as BlueprintStatusFilter
                }))
              }
              aria-label={t("blueprints.filters.all", "All")}
            >
              <option value="all">
                {t("blueprints.filters.all", "All")} ({stats.total})
              </option>
              <option value="learned">
                {t("blueprints.filters.learned", "Learned")} ({stats.learned})
              </option>
              <option value="notLearned">
                {t("blueprints.filters.notLearned", "Not Learned")} (
                {stats.notLearned})
              </option>
              <option value="owned">
                {t("blueprints.filters.owned", "Owned")} ({stats.owned})
              </option>
            </select>

            <button
              type="button"
              onClick={exportBlueprintGrid}
              className="blueprints-export-btn flex items-center gap-2 h-9 bg-blue-dark border-ui-border hover:bg-blue-light"
            >
              <Download size={16} />
              {t("blueprints.export", "Export")}
            </button>

            <button
              type="button"
              className="blueprints-guide-btn flex items-center gap-2 h-9 bg-blue-dark border-ui-border hover:bg-blue-light"
              onClick={() => setShowGuide(true)}
              aria-label="Open guide"
            >
              <HelpCircle size={16} />
            </button>
          </div>
        </div>

        <div className="blueprints-progress">
          <div className="blueprints-progress-stat">
            <label>{t("blueprints.filters.learned", "Learned")}</label>
            <strong style={{ color: "#22c55e" }}>{stats.learned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>{t("blueprints.filters.notLearned", "Not Learned")}</label>
            <strong style={{ color: "#ef4444" }}>{stats.notLearned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>{t("blueprints.filters.owned", "Owned")}</label>
            <strong style={{ color: "#ffe600" }}>{stats.owned}</strong>
          </div>
          <div className="blueprints-progress-stat">
            <label>{t("blueprints.completion", "Completion")}</label>
            <strong>{stats.progress}%</strong>
          </div>
        </div>

        <nav className="blueprints-sections">
          <button
            type="button"
            className={section === "grid" ? "active" : ""}
            onClick={() => setSection("grid")}
          >
            {t("blueprints.title", "Collection")}
          </button>
          <button
            type="button"
            className={section === "atlas" ? "active" : ""}
            onClick={() => {
              setSection("atlas");
              setAtlasSearch("");
            }}
          >
            Atlas
          </button>
        </nav>

        {section === "atlas" && (
          <AtlasBlueprintPanel
            initialSearch={atlasSearch}
            atlasRows={atlasRows}
          />
        )}

        {section === "grid" && (
          <div
            ref={gridContainerRef}
            className="blueprints-grid-container rounded-xl bg-blue-dark/90"
          >
            <div className="blueprints-grid">
              {visibleBlueprints.map((blueprint) => {
                const learned = blueprint.learned === true;
                const duplicates = blueprint.duplicates ?? 0;

                return (
                  <div
                    key={blueprint.id}
                    className="blueprint-card cursor-pointer group select-none"
                    title={blueprint.name}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        openBlueprint(blueprint, event);
                      }
                    }}
                  >
                    <NeonBorder
                      backgroundColor="#1a1a1a"
                      borderRadius={0.5}
                      fitContent
                      onClick={(event) => {
                        openBlueprint(blueprint, event);
                      }}
                      onContextMenu={(event) => {
                        addDuplicate(blueprint.id, event);
                      }}
                      onTouchStart={() => {
                        suppressNextClickRef.current = false;
                        clearLongPress();
                        longPressTimerRef.current = setTimeout(() => {
                          suppressNextClickRef.current = true;
                          removeDuplicate(blueprint.id);
                        }, 500);
                      }}
                      onTouchEnd={clearLongPress}
                      onTouchMove={clearLongPress}
                      overlay={
                        <>
                          {learned && (
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
                      }
                    >
                      <ItemFrame
                        item={{
                          ...blueprint,
                          icon: blueprint.imageUrl,
                          item_type: "Blueprint"
                        }}
                        size="lg"
                        showNameBar
                        displayName={getBlueprintDisplayName(blueprint.name)}
                        disableHover
                        onClick={(event) => {
                          event.stopPropagation();
                          openBlueprint(blueprint, event);
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
                  {t(
                    "blueprints.noResults",
                    "No blueprints match these filters."
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {selected && (
          <BlueprintRegistryDetail
            blueprint={selected}
            atlasRows={selectedAtlas}
            progress={{
              learned: progress[selected.id]?.learned ?? false,
              duplicates: progress[selected.id]?.duplicates ?? 0
            }}
            onClose={() => setSelectedId(null)}
            onProgress={(next) => updateProgress(selected.id, next)}
            onViewAtlas={() => {
              setAtlasSearch(selected.targetName);
              setSection("atlas");
              setSelectedId(null);
            }}
          />
        )}
      </div>

      {showGuide && (
        <div
          className="blueprints-guide-dialog"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="blueprints-guide-body page-guide-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="blueprints-guide-header">
              <h2>{t("blueprints.guide.title", "How blueprints work")}</h2>
            </header>
            <div className="blueprints-guide-body page-guide-body">
              <div className="blueprints-guide-section page-guide-section">
                <h2>
                  {t(
                    "blueprints.guide.trackingTitle",
                    "Tracking Your Collection"
                  )}
                </h2>
                <p>
                  {t(
                    "blueprints.guide.trackingDesc",
                    "Click any blueprint card to open the detail panel. Mark blueprints as Learned, add duplicates, or record where you found them."
                  )}
                </p>
              </div>
              <div className="blueprints-guide-section page-guide-section">
                <h2>{t("blueprints.guide.statusTitle", "Card Status")}</h2>
                <p>
                  {t(
                    "blueprints.guide.statusDesc",
                    "A spinning neon border means the blueprint is learned. A yellow badge shows how many duplicates you own."
                  )}
                </p>
              </div>
              <div className="blueprints-guide-section page-guide-section">
                <h2>{t("blueprints.guide.filtersTitle", "Filters")}</h2>
                <p>
                  {t(
                    "blueprints.guide.filtersDesc",
                    "Use the search box and dropdowns to filter by name, category, or collection status."
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

export const BlueprintsApp = BlueprintsPage;

import { useCallback, useEffect, useState } from 'react';
import {
  ACTIONS,
  LOCAL_ITEMS_URL,
  METAFORGE_URL,
  STORAGE_KEYS,
  type AuditEntry,
  type MetaforgeItem,
  type SourceKey,
  type StockItem,
} from './constants';

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota / private mode — silently ignore, state is still in React
  }
}

function readNumber(key: string, fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

// ---------------------------------------------------------------------------
// State hook — single source of truth for stock / audit / liquid balance
// ---------------------------------------------------------------------------

export interface MetaforgeTraderState {
  stock: StockItem[];
  audit: AuditEntry[];
  liquidSeeds: number;
}

export function useStockState() {
  const [stock, setStock] = useState<StockItem[]>(() =>
    readJson<StockItem[]>(STORAGE_KEYS.stock, []),
  );
  const [audit, setAudit] = useState<AuditEntry[]>(() =>
    readJson<AuditEntry[]>(STORAGE_KEYS.audit, []),
  );
  const [liquidSeeds, setLiquidSeeds] = useState<number>(() =>
    readNumber(STORAGE_KEYS.liquidSeeds, 0),
  );

  // Persist whenever the slices change.
  useEffect(() => {
    writeJson(STORAGE_KEYS.stock, stock);
  }, [stock]);
  useEffect(() => {
    writeJson(STORAGE_KEYS.audit, audit);
  }, [audit]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.liquidSeeds, String(liquidSeeds));
  }, [liquidSeeds]);

  return { stock, setStock, audit, setAudit, liquidSeeds, setLiquidSeeds };
}

// ---------------------------------------------------------------------------
// Settings hook — custom items + stale threshold
// ---------------------------------------------------------------------------

export function useSettings() {
  const [allowCustomItems, setAllowCustomItemsState] = useState<boolean>(() =>
    typeof window !== 'undefined' &&
      window.localStorage.getItem(STORAGE_KEYS.allowCustomItems) === 'true',
  );
  const [staleThresholdDays, setStaleThresholdDaysState] = useState<number>(() => {
    if (typeof window === 'undefined') return 7;
    const raw = window.localStorage.getItem(STORAGE_KEYS.staleThresholdDays);
    const n = parseFloat(raw ?? '7');
    return Number.isFinite(n) ? n : 7;
  });

  const setAllowCustomItems = useCallback((next: boolean) => {
    setAllowCustomItemsState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.allowCustomItems, String(next));
    }
  }, []);

  const setStaleThresholdDays = useCallback((next: number) => {
    setStaleThresholdDaysState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.staleThresholdDays, String(next));
    }
  }, []);

  return { allowCustomItems, setAllowCustomItems, staleThresholdDays, setStaleThresholdDays };
}

// ---------------------------------------------------------------------------
// Metaforge items data hook
// ---------------------------------------------------------------------------

export interface MetaforgeData {
  items: MetaforgeItem[];
  iconMap: Record<string, string>;
  stackMap: Record<string, number>;
  itemTypeMap: Record<string, string>;
  tradeItems: MetaforgeItem[];
  loading: boolean;
  error: string | null;
  lastSyncedAt: number | null;
  source: 'api' | 'local' | 'cache' | 'none';
  resync: () => Promise<void>;
}

interface MetaforgePageResponse {
  data?: MetaforgeItem[];
  pagination?: { hasNextPage?: boolean };
}

function buildDerived(items: MetaforgeItem[]) {
  const iconMap: Record<string, string> = {};
  const stackMap: Record<string, number> = {};
  const itemTypeMap: Record<string, string> = {};
  for (const item of items) {
    if (item.name && item.icon) iconMap[item.name] = item.icon;
    if (item.name) {
      stackMap[item.name] = item.stat_block?.stackSize || 1;
      itemTypeMap[item.name] = item.item_type || '';
    }
  }
  const tradeItems = items.filter((i) => (i.value ?? 0) > 0);
  return { iconMap, stackMap, itemTypeMap, tradeItems };
}

function readCachedItems(): MetaforgeItem[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.metaforgeCache);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as MetaforgeItem[];
    if (parsed && Array.isArray((parsed as { data?: unknown }).data)) {
      return (parsed as { data: MetaforgeItem[] }).data;
    }
  } catch {
    // ignore corrupt cache
  }
  return null;
}

async function fetchFromApi(): Promise<MetaforgeItem[]> {
  const out: MetaforgeItem[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    if (page > 200) throw new Error('Safety stop: exceeded max pages from Metaforge API');
    const res = await fetch(
      `${METAFORGE_URL}/items?page=${page}&limit=100&minimal=true`,
    );
    if (!res.ok) throw new Error(`Metaforge API HTTP ${res.status}`);
    const json = (await res.json()) as MetaforgePageResponse;
    out.push(...(json.data ?? []));
    hasMore = Boolean(json.pagination?.hasNextPage);
    page += 1;
  }
  return out;
}

async function fetchFromLocal(): Promise<MetaforgeItem[]> {
  const res = await fetch(LOCAL_ITEMS_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Local items file HTTP ${res.status}`);
  const json = (await res.json()) as MetaforgeItem[] | { data: MetaforgeItem[] };
  return Array.isArray(json) ? json : json.data ?? [];
}

function formatFetchErr(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  return /failed to fetch/i.test(msg) ? `${msg} (likely CORS blocked)` : msg;
}

export function useMetaforgeData(): MetaforgeData {
  const [items, setItems] = useState<MetaforgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [source, setSource] = useState<MetaforgeData['source']>('none');

  const derived = buildDerived(items);

  const load = useCallback(async (mode: 'auto' | 'force' = 'auto') => {
    setLoading(true);
    setError(null);
    try {
      // 1. Try API
      try {
        const fresh = await fetchFromApi();
        setItems(fresh);
        setSource('api');
        setLastSyncedAt(Date.now());
        if (typeof window !== 'undefined') {
          writeJson(STORAGE_KEYS.metaforgeCache, fresh);
          window.localStorage.setItem(STORAGE_KEYS.metaforgeCacheTs, String(Date.now()));
        }
        return;
      } catch (apiErr) {
        if (mode === 'force') {
          throw apiErr;
        }
        // 2. Fall back to local file
        try {
          const local = await fetchFromLocal();
          if (local.length > 0) {
            setItems(local);
            setSource('local');
            writeJson(STORAGE_KEYS.metaforgeCache, local);
            return;
          }
        } catch (localErr) {
          // 3. Fall back to cache
          const cached = readCachedItems();
          if (cached && cached.length > 0) {
            setItems(cached);
            setSource('cache');
            const ts = readNumber(STORAGE_KEYS.metaforgeCacheTs, 0);
            setLastSyncedAt(ts || null);
            return;
          }
          throw new Error(
            `API: ${formatFetchErr(apiErr)}; Local: ${formatFetchErr(localErr)}`,
          );
        }
        throw apiErr;
      }
    } catch (e) {
      setError(formatFetchErr(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Hydrate from cache immediately so the UI is not empty while API loads
    const cached = readCachedItems();
    if (cached && cached.length > 0) {
      setItems(cached);
      setSource('cache');
      const ts = readNumber(STORAGE_KEYS.metaforgeCacheTs, 0);
      setLastSyncedAt(ts || null);
      setLoading(false);
    }
    void load('auto');
  }, [load]);

  const resync = useCallback(async () => {
    await load('force');
  }, [load]);

  return {
    items,
    ...derived,
    loading,
    error,
    lastSyncedAt,
    source,
    resync,
  };
}

// ---------------------------------------------------------------------------
// Misc helpers used by the main module
// ---------------------------------------------------------------------------

export function genId(): string {
  return `e${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function priceCacheFromAudit(audit: AuditEntry[]): Record<string, number> {
  const sells = audit.filter((a) => a.action === ACTIONS.SELL);
  const names = Array.from(new Set(sells.map((s) => s.name)));
  const cache: Record<string, number> = {};
  for (const name of names) {
    const prices = sells
      .filter((s) => s.name === name)
      .sort((a, b) => b.ts - a.ts)
      .slice(0, 5)
      .map((s) => s.price)
      .sort((a, b) => a - b);
    if (prices.length) {
      const m = Math.floor(prices.length / 2);
      cache[name] = prices.length % 2
        ? prices[m]
        : (prices[m - 1] + prices[m]) / 2;
    }
  }
  return cache;
}

export function staleColor(
  oldestAddedAt: number | null,
  thresholdDays: number,
): string | null {
  if (!oldestAddedAt || !thresholdDays) return null;
  const ratio = (Date.now() - oldestAddedAt) / (thresholdDays * 86_400_000);
  if (ratio < 0.5) return null;
  if (ratio < 0.75) return '#f59e0b';
  if (ratio < 1.0) return '#f97316';
  return '#f43f5e';
}

export function itemTypeFor(
  name: string,
  itemTypeMap: Record<string, string>,
  items: MetaforgeItem[],
): string {
  if (itemTypeMap[name]) return itemTypeMap[name];
  return items.find((i) => i.name === name)?.item_type ?? '';
}

export function findMatchingStock(
  stock: StockItem[],
  name: string,
  source: SourceKey,
  cost: number,
): StockItem[] {
  return stock.filter(
    (i) => i.name === name && i.source === source && Math.floor(i.cost) === Math.floor(cost),
  );
}

export const RAIDER_BUDDY_CACHE_KEYS = {
  inventory: 'embark_cache_inventory',
  playerStats: 'embark_cache_player_stats',
  roundStats: 'embark_cache_round_stats',
  questStats: 'embark_cache_quest_stats',
  hideoutStats: 'embark_cache_hideout_stats',
  levels: 'embark_cache_levels',
  connectionStatus: 'embark_cache_connection_status',
  progressSync: 'embark_cache_progress_sync',
} as const;

export type RaiderBuddyCacheKey = typeof RAIDER_BUDDY_CACHE_KEYS[keyof typeof RAIDER_BUDDY_CACHE_KEYS];

export interface RaiderBuddyCacheEntry<T> {
  data: T;
  timestamp: number;
  userId: string;
}

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

let activeUserId: string | null = null;

export function setRaiderBuddyCacheOwner(userId: string | null): void {
  activeUserId = userId;
}

export function getRaiderBuddyCacheOwner(): string | null {
  return activeUserId;
}

function resolveStorage(storage?: StorageLike): StorageLike | null {
  if (storage) return storage;
  return typeof localStorage === 'undefined' ? null : localStorage;
}

export function getRaiderBuddyCachedData<T>(
  key: RaiderBuddyCacheKey,
  storage?: StorageLike,
): { data: T; timestamp: number } | null {
  const target = resolveStorage(storage);
  if (!target || !activeUserId) return null;
  try {
    const serialized = target.getItem(key);
    if (!serialized) return null;
    const parsed = JSON.parse(serialized) as Partial<RaiderBuddyCacheEntry<T>>;
    if (parsed.userId !== activeUserId || typeof parsed.timestamp !== 'number' || !('data' in parsed)) {
      return null;
    }
    return { data: parsed.data as T, timestamp: parsed.timestamp };
  } catch {
    target.removeItem(key);
    return null;
  }
}

export function setRaiderBuddyCachedData<T>(
  key: RaiderBuddyCacheKey,
  data: T,
  storage?: StorageLike,
): boolean {
  const target = resolveStorage(storage);
  if (!target || !activeUserId) return false;
  const entry: RaiderBuddyCacheEntry<T> = { data, timestamp: Date.now(), userId: activeUserId };
  const serialized = JSON.stringify(entry);
  try {
    target.setItem(key, serialized);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      clearAllRaiderBuddyCache(target);
      try {
        target.setItem(key, serialized);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

export function getRaiderBuddyCacheTimestamp(
  key: RaiderBuddyCacheKey,
  storage?: StorageLike,
): number | null {
  return getRaiderBuddyCachedData(key, storage)?.timestamp ?? null;
}

export function clearRaiderBuddyCache(key: RaiderBuddyCacheKey, storage?: StorageLike): void {
  const target = resolveStorage(storage);
  if (!target) return;
  try { target.removeItem(key); } catch { /* best effort */ }
}

export function clearAllRaiderBuddyCache(storage?: StorageLike): void {
  const target = resolveStorage(storage);
  if (!target) return;
  for (const key of Object.values(RAIDER_BUDDY_CACHE_KEYS)) {
    try { target.removeItem(key); } catch { /* best effort */ }
  }
}

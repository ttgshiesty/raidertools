import { beforeEach, describe, expect, it } from 'vitest';
import {
  RAIDER_BUDDY_CACHE_KEYS,
  clearAllRaiderBuddyCache,
  getRaiderBuddyCacheTimestamp,
  getRaiderBuddyCachedData,
  setRaiderBuddyCacheOwner,
  setRaiderBuddyCachedData,
} from '../raiderBuddyCache';

describe('RaiderBuddy-compatible local cache', () => {
  beforeEach(() => {
    localStorage.clear();
    setRaiderBuddyCacheOwner('user-a');
  });

  it('stores the exact owner-bound envelope', () => {
    expect(setRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.inventory, { items: [1] })).toBe(true);
    const raw = JSON.parse(localStorage.getItem(RAIDER_BUDDY_CACHE_KEYS.inventory) ?? '{}');
    expect(raw).toMatchObject({ userId: 'user-a', data: { items: [1] } });
    expect(typeof raw.timestamp).toBe('number');
    expect(getRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.inventory)?.data).toEqual({ items: [1] });
    expect(getRaiderBuddyCacheTimestamp(RAIDER_BUDDY_CACHE_KEYS.inventory)).toBe(raw.timestamp);
  });

  it('rejects cache entries from another user and clears all known keys', () => {
    setRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.inventory, { items: [1] });
    setRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.playerStats, { damage: 1 });
    setRaiderBuddyCacheOwner('user-b');
    expect(getRaiderBuddyCachedData(RAIDER_BUDDY_CACHE_KEYS.inventory)).toBeNull();
    clearAllRaiderBuddyCache();
    expect(localStorage.getItem(RAIDER_BUDDY_CACHE_KEYS.inventory)).toBeNull();
    expect(localStorage.getItem(RAIDER_BUDDY_CACHE_KEYS.playerStats)).toBeNull();
  });
});

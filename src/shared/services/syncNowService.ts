import { getIdToken } from '../auth/cognitoClient';
import { getCachedProfile } from './cacheService';

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'https://api.shiesty.me';

export type SyncNowDomain = 'stash' | 'loadout' | 'blueprints' | 'hideout' | 'projects' | 'quests' | 'rounds' | 'stats';

const DOMAIN_TO_TARGET: Record<string, string | null> = {
  stash: 'inventory',
  loadout: null,
  blueprints: 'blueprints',
  hideout: 'hideout',
  projects: 'projects',
  quests: 'quests',
  rounds: 'rounds',
  stats: 'stats',
};

const COOLDOWN_MS = 30_000;
const MAX_TRACKED_KEYS = 50;

const lastSyncTime = new Map<string, number>();

function noteSyncTime(domain: string): void {
  lastSyncTime.set(domain, Date.now());
  if (lastSyncTime.size > MAX_TRACKED_KEYS) {
    // Drop the oldest entries to keep memory bounded.
    const overflow = lastSyncTime.size - MAX_TRACKED_KEYS;
    let removed = 0;
    for (const key of lastSyncTime.keys()) {
      if (removed >= overflow) break;
      lastSyncTime.delete(key);
      removed += 1;
    }
  }
}

async function triggerSyncNow(target: string): Promise<void> {
  try {
    const idToken = await getIdToken();
    if (!idToken) return;

    const response = await fetch(`${API_BASE}/me/arctracker/sync-now`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targets: [target] }),
    });

    if (!response.ok) {
      console.warn('sync-now HTTP error:', response.status, await response.text().catch(() => ''));
    }
  } catch (err) {
    console.warn('sync-now failed (silent fallthrough):', err);
  }
}

export async function withSyncNow<T>(
  domain: SyncNowDomain,
  fetchFn: () => Promise<T>,
): Promise<T> {
  const target = DOMAIN_TO_TARGET[domain];

  if (target !== null) {
    const profile = await getCachedProfile();
    if (profile && profile.isSubscribed === false) {
      return fetchFn();
    }

    const last = lastSyncTime.get(domain) ?? 0;
    const now = Date.now();

    if (last + COOLDOWN_MS <= now) {
      noteSyncTime(domain);
      await triggerSyncNow(target);
    }
  }

  return fetchFn();
}

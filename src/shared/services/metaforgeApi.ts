import { getIdToken } from '../auth/cognitoClient';

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'https://api.shiesty.me';

export interface MetaForgeTotals {
  user_id?: string;
  total_rounds?: number;
  total_duration_seconds?: number;
  total_net_profit?: number;
  total_arc_kills?: number;
  total_player_kills?: number;
  total_player_downs?: number;
  total_deaths?: number;
  total_damage_dealt?: number;
  total_damage_taken?: number;
  total_xp?: number;
  total_healing?: number;
  total_extractions?: number;
  last_updated?: string;
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
  credits?: number;
  raiderTokens?: number;
  creds?: number;
  updatedAt?: string;
}

export interface MetaForgeMapStats {
  user_id?: string;
  map_name: string;
  rounds_played: number;
  total_net_profit: number;
  total_xp: number;
  total_player_kills: number;
  total_arc_kills: number;
  total_deaths: number;
  total_extractions: number;
  total_duration_seconds: number;
  max_net_profit: number;
  max_xp: number;
  total_damage_taken: number;
  total_healing: number;
  last_updated?: string;
}

export interface MetaForgeEnemyStats {
  user_id?: string;
  enemy_name: string;
  kills: number;
  damage: number;
  last_updated?: string;
}

export interface MetaForgeWeaponStats {
  user_id?: string;
  weapon_name: string;
  damage: number;
  last_updated?: string;
}

export interface MetaForgeStatsResponse {
  stats: MetaForgeTotals;
  mapStats?: MetaForgeMapStats[];
  enemyStats?: MetaForgeEnemyStats[];
  weaponStats?: MetaForgeWeaponStats[];
  totalDamageDealt?: number;
  totalPlayerDowns?: number;
}

export function normalizeMetaForgeStats(raw: unknown): MetaForgeStatsResponse {
  const source = isRecord(raw) ? raw : {};
  return {
    stats: isRecord(source.stats) ? source.stats as MetaForgeTotals : {},
    mapStats: arrayOfRecords(source.mapStats) as unknown as MetaForgeMapStats[],
    enemyStats: arrayOfRecords(source.enemyStats) as unknown as MetaForgeEnemyStats[],
    weaponStats: arrayOfRecords(source.weaponStats) as unknown as MetaForgeWeaponStats[],
    ...(finiteNumber(source.totalDamageDealt) !== null
      ? { totalDamageDealt: finiteNumber(source.totalDamageDealt)! }
      : {}),
    ...(finiteNumber(source.totalPlayerDowns) !== null
      ? { totalPlayerDowns: finiteNumber(source.totalPlayerDowns)! }
      : {}),
  };
}

export function isValidMetaForgeProfileId(value: string): boolean {
  return /^[A-Za-z0-9_-]{3,128}$/.test(value.trim());
}

export async function fetchMetaForgeStats(profileId: string): Promise<MetaForgeStatsResponse> {
  const cleanId = profileId.trim();
  if (!isValidMetaForgeProfileId(cleanId)) throw new Error('Invalid MetaForge profile id.');
  const token = await getIdToken();
  if (!token) throw new Error('Sign in to load MetaForge stats.');
  const response = await fetch(`${API_BASE}/me/metaforge/stats?profileId=${encodeURIComponent(cleanId)}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error ?? `MetaForge stats request failed with HTTP ${response.status}`);
  }
  return normalizeMetaForgeStats(await response.json());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function arrayOfRecords(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function finiteNumber(value: unknown): number | null {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

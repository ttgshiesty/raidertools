import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Coins,
  Crosshair,
  Link2,
  Map as MapIcon,
  RefreshCw,
  Skull,
  Unlink,
} from 'lucide-react';
import {
  fetchMetaForgeStatsViaProxy,
  isValidMetaForgeProfileId,
  type MetaForgeDashboardData,
} from '../utils/shiesty-metaforge-stats_generated';

// ---------------------------------------------------------------------------
// Auth wire-up (intentionally left as a single integration point)
// ---------------------------------------------------------------------------
// fetchMetaForgeStatsViaProxy() needs a bearer idToken from your Cognito
// session. Swap this for however src/shared handles that before this will
// fetch real data.
function useIdToken(): string | undefined {
  return undefined;
}

// Where the linked MetaForge profile ID is persisted. Placeholder using
// localStorage — swap for a real call into your DynamoDB-backed user/links
// state (per AGENTS.md, that's the right home for a linked-account id).
const STORAGE_KEY = 'shiesty:metaforgeProfileId';

function readStoredProfileId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return Math.round(value).toLocaleString();
}

function formatCredits(value: number): string {
  if (!Number.isFinite(value)) return '0';
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}${Math.round(abs / 1_000)}K`;
  return `${sign}${Math.round(abs).toLocaleString()}`;
}

function formatPercent(ratio: number): string {
  if (!Number.isFinite(ratio)) return '0%';
  return `${(ratio * 100).toFixed(1)}%`;
}

export default function MetaForgeStats() {
  const idToken = useIdToken();

  const [profileId, setProfileId] = useState<string | null>(readStoredProfileId);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<MetaForgeDashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (id: string, isRefresh = false) => {
      if (!idToken) {
        setError('Sign in to load your MetaForge stats.');
        return;
      }
      try {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError(null);
        const dashboard = await fetchMetaForgeStatsViaProxy({
          idToken,
          profileId: id,
        });
        setData(dashboard);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load MetaForge stats.',
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [idToken],
  );

  useEffect(() => {
    if (profileId) load(profileId);
  }, [profileId, load]);

  const handleLink = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!isValidMetaForgeProfileId(trimmed)) {
      setError('Enter a valid MetaForge profile ID.');
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, trimmed);
    setProfileId(trimmed);
    setInputValue('');
  };

  const handleUnlink = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setProfileId(null);
    setData(null);
    setError(null);
  };

  const topEnemies = useMemo(() => {
    if (!data) return [];
    return [...data.enemies].sort((a, b) => b.kills - a.kills).slice(0, 10);
  }, [data]);

  const topWeapons = useMemo(() => {
    if (!data) return [];
    return [...data.weapons].sort((a, b) => b.kills - a.kills).slice(0, 10);
  }, [data]);

  return (
    <div className="metaforge-page">
      <div className="metaforge-header">
        <div>
          <h2>MetaForge Stats</h2>
          <p>Your MetaForge profile, fully normalized: progression, currencies, and raid breakdowns.</p>
        </div>
      </div>

      {error && <div className="metaforge-error">{error}</div>}

      {!profileId ? (
        <div className="metaforge-link-card">
          <div>
            <h3>Link your MetaForge profile</h3>
            <p>
              Paste your MetaForge profile ID to pull in your level, currencies,
              and raid stats.
            </p>
          </div>
          <form onSubmit={handleLink}>
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="MetaForge profile ID"
            />
            <button type="submit">
              <Link2 className="w-4 h-4" />
              Link Account
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="metaforge-source">
            <span>
              Linked to MetaForge profile <strong>{profileId}</strong>
            </span>
            <button className="metaforge-unlink" onClick={handleUnlink}>
              <Unlink className="w-4 h-4" />
              Unlink
            </button>
          </div>

          {loading && (
            <div className="metaforge-notice">
              <RefreshCw className="w-4 h-4 metaforge-spin" />
              Loading MetaForge stats…
            </div>
          )}

          {data && !loading && (
            <>
              <div className="metaforge-metrics">
                <article>
                  <span>Level</span>
                  <strong>{formatNumber(data.progression.level)}</strong>
                </article>
                <article>
                  <span>XP</span>
                  <strong>{formatNumber(data.progression.currentXp)}</strong>
                </article>
                <article>
                  <span>Credits</span>
                  <strong>{formatNumber(data.currencies.credits)}</strong>
                </article>
                <article>
                  <span>Raider Tokens</span>
                  <strong>{formatNumber(data.currencies.raiderTokens)}</strong>
                </article>
                <article>
                  <span>Rounds Played</span>
                  <strong>{formatNumber(data.summary.totalRounds)}</strong>
                </article>
                <article>
                  <span>Survival Rate</span>
                  <strong>{formatPercent(data.summary.survivalRate)}</strong>
                </article>
                <article>
                  <span>Net Profit</span>
                  <strong>{formatCredits(data.summary.totalNetValue)}</strong>
                </article>
                <article>
                  <span>ARC Kills</span>
                  <strong>{formatNumber(data.summary.totalArcKills)}</strong>
                </article>
              </div>

              <div className="metaforge-breakdowns">
                <div className="metaforge-panel">
                  <h3>
                    <Skull className="w-4 h-4" />
                    Top Enemies
                  </h3>
                  {topEnemies.length > 0 ? (
                    <ol>
                      {topEnemies.map((enemy) => (
                        <li key={enemy.name}>
                          <strong>{enemy.name}</strong>
                          <small>
                            {formatNumber(enemy.kills)} kills · {formatCredits(enemy.damage)} dmg
                          </small>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>No enemy data yet.</p>
                  )}
                </div>

                <div className="metaforge-panel">
                  <h3>
                    <Crosshair className="w-4 h-4" />
                    Top Weapons
                  </h3>
                  {topWeapons.length > 0 ? (
                    <ol>
                      {topWeapons.map((weapon) => (
                        <li key={weapon.name}>
                          <strong>{weapon.name}</strong>
                          <small>
                            {formatNumber(weapon.kills)} kills · {formatCredits(weapon.damage)} dmg
                          </small>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>No weapon data yet.</p>
                  )}
                </div>
              </div>

              <div className="metaforge-panel">
                <h3>
                  <MapIcon className="w-4 h-4" />
                  Map Performance
                </h3>
                <div className="metaforge-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Map</th>
                        <th>Raids</th>
                        <th>Extracted</th>
                        <th>Survival %</th>
                        <th>Net Profit</th>
                        <th>XP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.maps.map((map) => (
                        <tr key={map.key}>
                          <td>{map.mapName}</td>
                          <td>{formatNumber(map.raids)}</td>
                          <td>{formatNumber(map.extracted)}</td>
                          <td>{formatPercent(map.survivalRate)}</td>
                          <td>{formatCredits(map.totalNetValue)}</td>
                          <td>{formatNumber(map.totalXp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.maps.length === 0 && <p>No map data yet.</p>}
                </div>
              </div>

              <div className="metaforge-source">
                <span>
                  <Coins className="w-4 h-4" /> Last updated{' '}
                  {new Date(data.fetchedAt).toLocaleString()}
                </span>
                <button onClick={() => load(profileId, true)} disabled={refreshing}>
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'metaforge-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Crosshair,
  DollarSign,
  Map as MapIcon,
  Package,
  RefreshCw,
  Shield,
  Skull,
  TrendingUp,
} from 'lucide-react';
import {
  fetchArcTrackerStatsDashboard,
  type StatsDashboardData,
} from '../utils/shiesty-arctracker-stats_generated';
import { ARCTRACKER_RESOLVER } from '../utils/arctracker-stats-resolver';
import { useCognitoAuth } from '../../../shared/context/CognitoAuthContext';
import { useStatsPageData } from '../utils/useStatsPageData';
// ---------------------------------------------------------------------------
// Auth wire-up
// ---------------------------------------------------------------------------
// Returns the current ID token from Cognito auth, or undefined if not signed in.
function useIdToken(): string | undefined {
  const { user } = useCognitoAuth();
  return user?.idToken;
}

const HISTORY_LIMITS = [10, 25, 50, 100, 200] as const;

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

function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '0m';
  const totalMinutes = Math.round(ms / 60000);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

export default function ArcTrackerStats() {
  const idToken = useIdToken();
  const identity = useStatsPageData();

  const [data, setData] = useState<StatsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyLimit, setHistoryLimit] = useState<number>(50);

  const load = useCallback(
    async (isRefresh = false) => {
      if (!idToken) {
        setLoading(false);
        setError('Sign in to load your ArcTracker stats.');
        return;
      }
      try {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError(null);
        const dashboard = await fetchArcTrackerStatsDashboard({
          idToken,
          limit: 200,
          resolver: ARCTRACKER_RESOLVER,
        });
        setData(dashboard);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load ArcTracker stats.',
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [idToken],
  );

  useEffect(() => {
    load();
  }, [load]);

  const visibleRounds = useMemo(() => {
    if (!data) return [];
    return data.rounds.slice(0, historyLimit).slice().reverse();
  }, [data, historyLimit]);

  const maxRoundValue = useMemo(() => {
    return visibleRounds.reduce(
      (max, round) => Math.max(max, round.valueBroughtIn, round.valueExtracted),
      1,
    );
  }, [visibleRounds]);

  const topEnemies = useMemo(() => {
    if (!data) return [];
    return [...data.enemies]
      .filter((enemy) => enemy.name !== 'Player')
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [data]);

  const topWeapons = useMemo(() => {
    if (!data) return [];
    return [...data.weapons].sort((a, b) => b.count - a.count).slice(0, 10);
  }, [data]);

  const maxEnemyCount = topEnemies[0]?.count || 1;
  const maxWeaponCount = topWeapons[0]?.count || 1;

  if (loading) {
    return (
      <div className="stats-loading">
        <RefreshCw className="w-6 h-6 stats-spin" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="stats-gate">
        <Activity className="w-12 h-12" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { summary, derived, maps } = data;

  return (
    <div className="stats-page">
      <div className="stats-header">
        <div>
          <h2>ArcTracker Stats</h2>
          <p>Live raid performance, fully normalized from ArcTracker.</p>
        </div>
        <button
          className="stats-button stats-button--secondary"
          onClick={() => load(true)}
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'stats-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && <div className="stats-error">{error}</div>}

      <div className="stats-panel">
        <div className="stats-panel-heading">
          <h3>Raider Profile</h3>
        </div>
        <div className="stats-metrics">
          <div className="stats-metric"><span>Username</span><strong>{identity.profile?.username ?? 'N/A'}</strong></div>
          <div className="stats-metric"><span>Player Level</span><strong>{identity.profile ? formatNumber(identity.profile.playerLevel) : 'N/A'}</strong></div>
          <div className="stats-metric"><span>XP</span><strong>{identity.stash ? formatNumber(identity.stash.currencies.xp) : 'N/A'}</strong></div>
          <div className="stats-metric"><span>Embark ID</span><strong>{identity.embarkId ?? 'N/A'}</strong></div>
          <div className="stats-metric"><span>Discord</span><strong>{identity.discordName ?? 'N/A'}</strong></div>
          <div className="stats-metric"><span>Credits</span><strong>{identity.stash ? formatNumber(identity.stash.currencies.credits) : 'N/A'}</strong></div>
          <div className="stats-metric"><span>Cred</span><strong>{identity.stash ? formatNumber(identity.stash.currencies.cred) : 'N/A'}</strong></div>
          <div className="stats-metric"><span>Raider Tokens</span><strong>{identity.stash ? formatNumber(identity.stash.currencies.raiderTokens) : 'N/A'}</strong></div>
        </div>
      </div>

      <div className="stats-metrics">
        <div className="stats-metric">
          <Shield className="w-5 h-5" />
          <span>Survival Rate</span>
          <strong>{formatPercent(summary.survivalRate)}</strong>
        </div>
        <div className="stats-metric">
          <Crosshair className="w-5 h-5" />
          <span>Raids Played</span>
          <strong>{formatNumber(summary.roundsPlayed)}</strong>
        </div>
        <div className="stats-metric">
          <Skull className="w-5 h-5" />
          <span>ARC Kills</span>
          <strong>{formatNumber(summary.arcKills)}</strong>
        </div>
        <div className="stats-metric">
          <Crosshair className="w-5 h-5" />
          <span>Player K/D</span>
          <strong>{derived.playerKdRatio.toFixed(2)}</strong>
        </div>
        <div className="stats-metric">
          <DollarSign className="w-5 h-5" />
          <span>Net Value</span>
          <strong>{formatCredits(summary.netValue)}</strong>
        </div>
        <div className="stats-metric">
          <TrendingUp className="w-5 h-5" />
          <span>Avg Profit / Raid</span>
          <strong>{formatCredits(derived.avgNetValuePerRound)}</strong>
        </div>
        <div className="stats-metric">
          <Package className="w-5 h-5" />
          <span>Containers Looted</span>
          <strong>{formatNumber(summary.containersLooted)}</strong>
        </div>
        <div className="stats-metric">
          <Activity className="w-5 h-5" />
          <span>Time Topside</span>
          <strong>{formatDuration(summary.durationMs)}</strong>
        </div>
        <div className="stats-metric">
          <Shield className="w-5 h-5" />
          <span>Damage Taken</span>
          <strong>{formatNumber(summary.damageTaken ?? 0)}</strong>
        </div>
        <div className="stats-metric"><span>Total Extractions</span><strong>{formatNumber(summary.roundsExtracted)}</strong></div>
        <div className="stats-metric"><span>Total Deaths</span><strong>{formatNumber(summary.roundsKnockedOut)}</strong></div>
        <div className="stats-metric"><span>Player Kills</span><strong>{formatNumber(summary.playerKills)}</strong></div>
        <div className="stats-metric"><span>Player Downs</span><strong>{formatNumber(summary.playerDowns)}</strong></div>
        <div className="stats-metric"><span>Damage Dealt</span><strong>{formatNumber(summary.damage)}</strong></div>
        <div className="stats-metric"><span>Revives</span><strong>{formatNumber(summary.revives)}</strong></div>
        <div className="stats-metric"><span>XP Gained</span><strong>{formatNumber(summary.xpGained)}</strong></div>
        <div className="stats-metric"><span>Items Crafted</span><strong>{formatNumber(summary.itemsCrafted)}</strong></div>
        <div className="stats-metric"><span>Value Extracted</span><strong>{formatCredits(summary.valueExtracted)}</strong></div>
        <div className="stats-metric"><span>Value Brought In</span><strong>{formatCredits(summary.valueBroughtIn)}</strong></div>
      </div>

      <div className="stats-panel">
        <div className="stats-panel-heading">
          <h3>
            <TrendingUp className="w-4 h-4" />
            Value Brought In vs Extracted
          </h3>
          <div className="stats-limit-picker">
            {HISTORY_LIMITS.map((limit) => (
              <button
                key={limit}
                className={historyLimit === limit ? 'active' : ''}
                onClick={() => setHistoryLimit(limit)}
              >
                {limit}
              </button>
            ))}
          </div>
        </div>

        {visibleRounds.length > 0 ? (
          <>
            <div className="stats-history">
              {visibleRounds.map((round) => (
                <div className="stats-history-column" key={round.roundId}>
                  <div className="stats-history-bars">
                    <span
                      className="stats-history-bar stats-history-bar--in"
                      style={{
                        height: `${Math.max(2, (round.valueBroughtIn / maxRoundValue) * 100)}%`,
                      }}
                      title={`Brought in: ${formatCredits(round.valueBroughtIn)}`}
                    />
                    <span
                      className="stats-history-bar stats-history-bar--out"
                      style={{
                        height: `${Math.max(2, (round.valueExtracted / maxRoundValue) * 100)}%`,
                      }}
                      title={`Extracted: ${formatCredits(round.valueExtracted)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="stats-legend">
              <span className="stats-legend-in">Brought In</span>
              <span className="stats-legend-out">Extracted</span>
            </div>
          </>
        ) : (
          <p className="stats-muted">No raid history yet.</p>
        )}
      </div>

      <div className="stats-two-column">
        <div className="stats-panel stats-breakdown">
          <h3>
            <Skull className="w-4 h-4" />
            Top ARC Enemies
          </h3>
          {topEnemies.length > 0 ? (
            <ol>
              {topEnemies.map((enemy) => (
                <li key={String(enemy.sourceId ?? enemy.name)}>
                  <i style={{ width: `${(enemy.count / maxEnemyCount) * 100}%` }} />
                  <span>{enemy.name}</span>
                  <strong>{formatNumber(enemy.count)}</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p className="stats-muted">No enemy kills recorded yet.</p>
          )}
        </div>

        <div className="stats-panel stats-breakdown">
          <h3>
            <Crosshair className="w-4 h-4" />
            Top Weapons
          </h3>
          {topWeapons.length > 0 ? (
            <ol>
              {topWeapons.map((weapon) => (
                <li key={String(weapon.sourceId ?? weapon.name)}>
                  <i style={{ width: `${(weapon.count / maxWeaponCount) * 100}%` }} />
                  <span>{weapon.name}</span>
                  <strong>{formatNumber(weapon.count)}</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p className="stats-muted">No weapon kills recorded yet.</p>
          )}
        </div>
      </div>

      <div className="stats-panel stats-map-panel">
        <h3>
          <MapIcon className="w-4 h-4" />
          Map Performance
        </h3>
        <div className="stats-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Map</th>
                <th>Raids</th>
                <th>Extracted</th>
                <th>Survival %</th>
                <th>Net Value</th>
              </tr>
            </thead>
            <tbody>
              {maps.map((map) => (
                <tr key={map.key}>
                  <td>{map.mapName}</td>
                  <td>{formatNumber(map.raids)}</td>
                  <td>{formatNumber(map.extracted)}</td>
                  <td>{formatPercent(map.survivalRate)}</td>
                  <td className={map.totalNetValue >= 0 ? 'positive' : 'negative'}>
                    {formatCredits(map.totalNetValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {maps.length === 0 && <p className="stats-muted">No map data yet.</p>}
        </div>
      </div>

      <p className="stats-updated">
        Last updated {new Date(data.fetchedAt).toLocaleString()}
      </p>
    </div>
  );
}

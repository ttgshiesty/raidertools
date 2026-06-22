import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Bot,
  Clock3,
  Coins,
  Crosshair,
  PackageOpen,
  RefreshCw,
  ShieldCheck,
  Skull,
  TrendingUp,
} from 'lucide-react';
import { useCognitoAuth } from '../../shared/context/CognitoAuthContext';
import { useLinkedAccounts } from '../../shared/context/LinkedAccountsContext';
import { useLocale } from '../../shared/context/LocaleContext';
import {
  fetchStatsDashboard,
  loadCachedStatsDashboard,
  type StatsDashboardData,
} from '../../shared/services/statsApi';
import { withSyncNow } from '../../shared/services/syncNowService';
import './styles/main.scss';

const HISTORY_LIMITS = [25, 50, 100, 200] as const;

type MetricIcon = typeof Activity;

interface MetricCard {
  icon: MetricIcon;
  label: string;
  value: string;
  tone?: 'positive' | 'negative' | 'neutral';
}

function percent(part: number, total: number): string {
  return total > 0 ? `${Math.round((part / total) * 100)}%` : '—';
}

function duration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '0m';
  const minutes = Math.floor(ms / 60_000);
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

function signedTone(value: number): 'positive' | 'negative' | 'neutral' {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}

function roundOutcomeLabel(outcome: StatsDashboardData['rounds'][number]['outcome']): string {
  if (outcome === 'extracted') return 'Extracted';
  if (outcome === 'died') return 'Knocked Out';
  return 'Unknown';
}

export function StatsApp() {
  const { t, tm, formatNumber } = useLocale();
  const auth = useCognitoAuth();
  const { arctracker } = useLinkedAccounts();
  const [data, setData] = useState<StatsDashboardData | null>(() => loadCachedStatsDashboard());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyLimit, setHistoryLimit] = useState<(typeof HISTORY_LIMITS)[number]>(50);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await withSyncNow('stats', fetchStatsDashboard));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('stats.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (auth.user && arctracker.state === 'connected') void refresh();
  }, [auth.user, arctracker.state, refresh]);

  const history = useMemo(() => data?.rounds.slice(0, historyLimit).reverse() ?? [], [data, historyLimit]);
  const recentRounds = useMemo(() => data?.rounds.slice(0, 20) ?? [], [data]);
  const historyMax = Math.max(1, ...history.map((round) => Math.max(round.valueExtracted, round.valueBroughtIn)));

  if (!auth.user && !data) {
    return (
      <main className="content-container stats-page">
        <section className="stats-gate">
          <Activity size={42} aria-hidden="true" />
          <h2>{t('stats.signInTitle')}</h2>
          <p>{t('stats.signInBody')}</p>
          <Link className="stats-button" to="/auth/sign-in">{t('stats.signIn')}</Link>
        </section>
      </main>
    );
  }

  if (arctracker.state !== 'connected' && !data) {
    return (
      <main className="content-container stats-page">
        <section className="stats-gate">
          <Activity size={42} aria-hidden="true" />
          <h2>{t('stats.connectTitle')}</h2>
          <p>{t('stats.connectBody')}</p>
          <Link className="stats-button" to="/profile/arctracker">{t('stats.connect')}</Link>
        </section>
      </main>
    );
  }

  if (!data && loading) {
    return <main className="content-container stats-page"><div className="stats-loading">{t('stats.loading')}</div></main>;
  }

  if (!data) {
    return (
      <main className="content-container stats-page">
        <section className="stats-gate">
          <Activity size={42} aria-hidden="true" />
          <h2>{t('stats.emptyTitle')}</h2>
          <p>{error ?? t('stats.emptyBody')}</p>
          <button className="stats-button" type="button" onClick={() => void refresh()}>{t('stats.retry')}</button>
        </section>
      </main>
    );
  }

  const summary = data.summary;
  const completedRounds = summary.totalExtracted + summary.totalDied || summary.totalRounds;
  const averageProfit = summary.totalExtracted > 0
    ? Math.round(summary.totalNetValue / summary.totalExtracted)
    : 0;
  const averageRaidValue = summary.totalRounds > 0
    ? Math.round(summary.totalValueExtracted / summary.totalRounds)
    : 0;
  const containersPerRaid = summary.totalRounds > 0
    ? (summary.totalContainersLooted / summary.totalRounds).toFixed(1)
    : '—';
  const killsPerRaid = summary.totalRounds > 0
    ? (summary.totalKills / summary.totalRounds).toFixed(1)
    : '—';
  const damagePerRaid = summary.totalRounds > 0
    ? Math.round(summary.totalDamage / summary.totalRounds)
    : 0;

  const cards: MetricCard[] = [
    { icon: Clock3, label: t('stats.metrics.timeTopside'), value: duration(summary.totalTimeMs) },
    { icon: Activity, label: t('stats.metrics.totalRaids'), value: formatNumber(summary.totalRounds) },
    { icon: ShieldCheck, label: 'Extracted Raids', value: formatNumber(summary.totalExtracted), tone: 'positive' },
    { icon: Skull, label: 'Knocked Out', value: formatNumber(summary.totalDied), tone: 'negative' },
    { icon: ShieldCheck, label: t('stats.metrics.survivalRate'), value: percent(summary.totalExtracted, completedRounds) },
    { icon: Bot, label: t('stats.metrics.arcKills'), value: formatNumber(summary.totalArcKills) },
    { icon: Crosshair, label: t('stats.metrics.playerKills'), value: formatNumber(summary.totalPlayerKills) },
    { icon: Crosshair, label: 'Total Kills', value: formatNumber(summary.totalKills) },
    { icon: TrendingUp, label: 'Kills / Raid', value: killsPerRaid },
    { icon: Crosshair, label: 'Player Downs', value: formatNumber(summary.totalPlayerDowns) },
    { icon: ShieldCheck, label: 'Revives', value: formatNumber(summary.totalRevives) },
    { icon: ShieldCheck, label: 'Squadmate Revives', value: formatNumber(summary.totalSquadmateRevives) },
    { icon: Coins, label: 'Value Brought In', value: formatNumber(summary.totalValueBroughtIn) },
    { icon: Coins, label: t('stats.metrics.valueExtracted'), value: formatNumber(summary.totalValueExtracted) },
    { icon: TrendingUp, label: t('stats.metrics.netValue'), value: formatNumber(summary.totalNetValue), tone: signedTone(summary.totalNetValue) },
    { icon: Coins, label: t('stats.metrics.averageProfit'), value: formatNumber(averageProfit), tone: signedTone(averageProfit) },
    { icon: Coins, label: 'Avg. Extracted / Raid', value: formatNumber(averageRaidValue) },
    { icon: PackageOpen, label: t('stats.metrics.containers'), value: formatNumber(summary.totalContainersLooted) },
    { icon: PackageOpen, label: t('stats.metrics.containersPerRaid'), value: containersPerRaid },
    { icon: Activity, label: 'XP Gained', value: formatNumber(summary.totalXpGained) },
    { icon: PackageOpen, label: 'Items Crafted', value: formatNumber(summary.totalItemsCrafted) },
    { icon: Crosshair, label: 'Damage Dealt', value: formatNumber(summary.totalDamage) },
    { icon: Crosshair, label: 'Damage / Raid', value: formatNumber(damagePerRaid) },
    { icon: Bot, label: 'ARC Damage', value: formatNumber(summary.totalArcDamage) },
    { icon: Crosshair, label: 'Player Damage', value: formatNumber(summary.totalPlayerDamage) },
    { icon: Skull, label: 'Unknown Target Kills', value: formatNumber(summary.totalUnknownTargetKills) },
  ];

  return (
    <main className="content-container stats-page">
      <header className="stats-header">
        <div>
          <h2>{t('stats.title')}</h2>
          <p>{t('stats.subtitle')}</p>
        </div>
        {arctracker.state === 'connected' ? <button className="stats-button stats-button--secondary" type="button" disabled={loading} onClick={() => void refresh()}><RefreshCw size={16} className={loading ? 'stats-spin' : ''} />{loading ? t('stats.refreshing') : t('stats.refresh')}</button> : <Link className="stats-button stats-button--secondary" to="/profile/arctracker">{t('stats.connect')}</Link>}
      </header>

      {error && <div className="stats-error" role="alert">{error}</div>}

      <section className="stats-metrics" aria-label={t('stats.overview')}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className={`stats-metric${card.tone ? ` stats-metric--${card.tone}` : ''}`} key={card.label}>
              <Icon size={18} aria-hidden="true" />
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          );
        })}
      </section>

      {history.length > 0 && (
        <section className="stats-panel">
          <div className="stats-panel-heading">
            <h3>{t('stats.raidValueHistory')}</h3>
            <div className="stats-limit-picker">
              {HISTORY_LIMITS.map((limit) => (
                <button type="button" className={historyLimit === limit ? 'active' : ''} onClick={() => setHistoryLimit(limit)} key={limit}>
                  {tm('stats.lastCount', { count: limit })}
                </button>
              ))}
            </div>
          </div>
          <div className="stats-history" aria-label={t('stats.raidValueHistory')}>
            {history.map((round, index) => (
              <div
                className="stats-history-column"
                key={`${round.roundId}-${index}`}
                title={`${round.mapName} · ${roundOutcomeLabel(round.outcome)} · Net ${formatNumber(round.netValue)} · In ${formatNumber(round.valueBroughtIn)} · Out ${formatNumber(round.valueExtracted)}`}
              >
                <div className="stats-history-bars">
                  <span className="stats-history-bar stats-history-bar--in" style={{ height: `${Math.max(2, (round.valueBroughtIn / historyMax) * 100)}%` }} />
                  <span className="stats-history-bar stats-history-bar--out" style={{ height: `${Math.max(2, (round.valueExtracted / historyMax) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="stats-legend"><span className="stats-legend-in">{t('stats.broughtIn')}</span><span className="stats-legend-out">{t('stats.extracted')}</span></div>
        </section>
      )}

      <div className="stats-two-column">
        <Breakdown title={t('stats.enemies')} icon={<Skull size={18} />} rows={data.enemies} formatNumber={formatNumber} />
        <Breakdown title={t('stats.weapons')} icon={<Crosshair size={18} />} rows={data.weapons} formatNumber={formatNumber} />
        <Breakdown title="Damage by Target" icon={<Bot size={18} />} rows={data.damageByTarget} formatNumber={formatNumber} />
        <Breakdown title="Damage by Weapon" icon={<Crosshair size={18} />} rows={data.damageByWeapon} formatNumber={formatNumber} />
        <Breakdown title="Crafted Items" icon={<PackageOpen size={18} />} rows={data.craftedItems} formatNumber={formatNumber} />
      </div>

      {data.maps.length > 0 && (
        <section className="stats-panel stats-map-panel">
          <h3>{t('stats.mapPerformance')}</h3>
          <div className="stats-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t('stats.map')}</th>
                  <th>{t('stats.raids')}</th>
                  <th>Extracted</th>
                  <th>Knocked Out</th>
                  <th>{t('stats.survival')}</th>
                  <th>{t('stats.averageTime')}</th>
                  <th>Value In</th>
                  <th>Value Out</th>
                  <th>{t('stats.netIncome')}</th>
                  <th>ARC Kills</th>
                  <th>Player Kills</th>
                  <th>Damage</th>
                  <th>Containers</th>
                  <th>XP</th>
                </tr>
              </thead>
              <tbody>
                {data.maps.map((map) => (
                  <tr key={map.key}>
                    <td>{map.mapName}</td>
                    <td>{formatNumber(map.raids)}</td>
                    <td>{formatNumber(map.extracted)}</td>
                    <td>{formatNumber(map.knockedOut)}</td>
                    <td>{percent(map.extracted, map.extracted + map.knockedOut || map.raids)}</td>
                    <td>{map.raids > 0 ? duration(map.totalDurationMs / map.raids) : '—'}</td>
                    <td>{formatNumber(map.totalValueBroughtIn)}</td>
                    <td>{formatNumber(map.totalValueExtracted)}</td>
                    <td className={map.totalNetValue >= 0 ? 'positive' : 'negative'}>{formatNumber(map.totalNetValue)}</td>
                    <td>{formatNumber(map.totalArcKills)}</td>
                    <td>{formatNumber(map.totalPlayerKills)}</td>
                    <td>{formatNumber(map.totalDamage)}</td>
                    <td>{formatNumber(map.totalContainersLooted)}</td>
                    <td>{formatNumber(map.totalXpGained)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {recentRounds.length > 0 && (
        <section className="stats-panel stats-map-panel">
          <h3>Latest Raids</h3>
          <div className="stats-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Raid</th>
                  <th>{t('stats.map')}</th>
                  <th>Outcome</th>
                  <th>Time</th>
                  <th>Value In</th>
                  <th>Value Out</th>
                  <th>{t('stats.netIncome')}</th>
                  <th>ARC Kills</th>
                  <th>Player Kills</th>
                  <th>Damage</th>
                  <th>Containers</th>
                  <th>XP</th>
                </tr>
              </thead>
              <tbody>
                {recentRounds.map((round) => (
                  <tr key={round.roundId}>
                    <td>{round.roundId}</td>
                    <td>{round.mapName}</td>
                    <td>{roundOutcomeLabel(round.outcome)}</td>
                    <td>{duration(round.durationMs)}</td>
                    <td>{formatNumber(round.valueBroughtIn)}</td>
                    <td>{formatNumber(round.valueExtracted)}</td>
                    <td className={round.netValue >= 0 ? 'positive' : 'negative'}>{formatNumber(round.netValue)}</td>
                    <td>{formatNumber(round.arcKills)}</td>
                    <td>{formatNumber(round.playerKills)}</td>
                    <td>{formatNumber(round.damage)}</td>
                    <td>{formatNumber(round.containersLooted)}</td>
                    <td>{formatNumber(round.xpGained)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {data.unknownEvents > 0 && (
        <div className="stats-diagnostic">
          Unknown stat events preserved: <strong>{formatNumber(data.unknownEvents)}</strong>. These are kept for resolver updates instead of being dropped.
        </div>
      )}

      <p className="stats-updated">{tm('stats.updated', { date: new Date(data.fetchedAt).toLocaleString() })}</p>
    </main>
  );
}

function Breakdown({ title, icon, rows, formatNumber }: {
  title: string;
  icon: ReactNode;
  rows: StatsDashboardData['enemies'];
  formatNumber: (value: number) => string;
}) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <section className="stats-panel stats-breakdown">
      <h3>{icon}{title}</h3>
      {rows.length === 0 ? <p className="stats-muted">—</p> : (
        <ol>{rows.slice(0, 15).map((row) => (
          <li key={`${title}-${row.name}-${row.itemId ?? ''}`}>
            <span>{row.name}</span><strong>{formatNumber(row.count)}</strong>
            <i style={{ width: `${(row.count / max) * 100}%` }} />
          </li>
        ))}</ol>
      )}
    </section>
  );
}

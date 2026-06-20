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

const HISTORY_LIMITS = [25, 50, 100] as const;

function percent(part: number, total: number): string {
  return total > 0 ? `${Math.round((part / total) * 100)}%` : '—';
}

function duration(ms: number): string {
  const minutes = Math.floor(ms / 60_000);
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
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
  const historyMax = Math.max(1, ...history.map((round) => Math.max(round.valueExtracted, round.valueBroughtIn)));

  if (!auth.user) {
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

  if (arctracker.state !== 'connected') {
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
  const completedRounds = summary.totalExtracted + summary.totalDied;
  const averageProfit = summary.totalExtracted > 0
    ? Math.round(summary.totalNetValue / summary.totalExtracted)
    : 0;
  const containersPerRaid = summary.totalRounds > 0
    ? (summary.totalContainersLooted / summary.totalRounds).toFixed(1)
    : '—';

  const cards = [
    [Clock3, t('stats.metrics.timeTopside'), duration(summary.totalTimeMs)],
    [Activity, t('stats.metrics.totalRaids'), formatNumber(summary.totalRounds)],
    [ShieldCheck, t('stats.metrics.survivalRate'), percent(summary.totalExtracted, completedRounds)],
    [Bot, t('stats.metrics.arcKills'), formatNumber(summary.totalArcKills)],
    [Coins, t('stats.metrics.valueExtracted'), formatNumber(summary.totalValueExtracted)],
    [TrendingUp, t('stats.metrics.netValue'), formatNumber(summary.totalNetValue)],
    [Coins, t('stats.metrics.averageProfit'), formatNumber(averageProfit)],
    [Crosshair, t('stats.metrics.playerKills'), formatNumber(summary.totalPlayerKills)],
    [PackageOpen, t('stats.metrics.containers'), formatNumber(summary.totalContainersLooted)],
    [PackageOpen, t('stats.metrics.containersPerRaid'), containersPerRaid],
  ] as const;

  return (
    <main className="content-container stats-page">
      <header className="stats-header">
        <div>
          <h2>{t('stats.title')}</h2>
          <p>{t('stats.subtitle')}</p>
        </div>
        <button className="stats-button stats-button--secondary" type="button" disabled={loading} onClick={() => void refresh()}>
          <RefreshCw size={16} className={loading ? 'stats-spin' : ''} />
          {loading ? t('stats.refreshing') : t('stats.refresh')}
        </button>
      </header>

      {error && <div className="stats-error" role="alert">{error}</div>}

      <section className="stats-metrics" aria-label={t('stats.overview')}>
        {cards.map(([Icon, label, value]) => (
          <article className="stats-metric" key={label}>
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
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
              <div className="stats-history-column" key={`${round.roundId}-${index}`} title={`${round.mapName}: ${formatNumber(round.netValue)}`}>
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
      </div>

      {data.maps.length > 0 && (
        <section className="stats-panel stats-map-panel">
          <h3>{t('stats.mapPerformance')}</h3>
          <div className="stats-table-wrap">
            <table>
              <thead><tr><th>{t('stats.map')}</th><th>{t('stats.raids')}</th><th>{t('stats.survival')}</th><th>{t('stats.averageTime')}</th><th>{t('stats.netIncome')}</th></tr></thead>
              <tbody>
                {data.maps.map((map) => (
                  <tr key={map.key}>
                    <td>{map.mapName}</td>
                    <td>{formatNumber(map.raids)}</td>
                    <td>{percent(map.extracted, map.raids)}</td>
                    <td>{map.raids > 0 ? duration(map.totalDurationMs / map.raids) : '—'}</td>
                    <td className={map.totalNetValue >= 0 ? 'positive' : 'negative'}>{formatNumber(map.totalNetValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
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
        <ol>{rows.slice(0, 10).map((row) => (
          <li key={`${row.name}-${row.itemId ?? ''}`}>
            <span>{row.name}</span><strong>{formatNumber(row.count)}</strong>
            <i style={{ width: `${(row.count / max) * 100}%` }} />
          </li>
        ))}</ol>
      )}
    </section>
  );
}

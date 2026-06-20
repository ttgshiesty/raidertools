import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Hammer, Link2, RefreshCw, Unlink } from 'lucide-react';
import { useCognitoAuth } from '../../shared/context/CognitoAuthContext';
import { useLocale } from '../../shared/context/LocaleContext';
import {
  fetchMetaForgeStats,
  isValidMetaForgeProfileId,
  type MetaForgeStatsResponse,
} from '../../shared/services/metaforgeApi';
import { metaforgeStore, useStore } from '../../shared/state/stores';
import './styles/metaforge.scss';

function number(value: number | undefined): number { return Number.isFinite(value) ? value! : 0; }
function percent(part: number, total: number): string { return total > 0 ? `${Math.round((part / total) * 100)}%` : '—'; }
function duration(seconds: number): string { const hours = Math.floor(seconds / 3600); const minutes = Math.floor((seconds % 3600) / 60); return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`; }

export function MetaForgeStats() {
  const { t, formatNumber } = useLocale();
  const auth = useCognitoAuth();
  const [link, setLink] = useStore(metaforgeStore);
  const [input, setInput] = useState(link.profileId ?? '');
  const [data, setData] = useState<MetaForgeStatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (profileId: string) => {
    setLoading(true);
    setError(null);
    try { setData(await fetchMetaForgeStats(profileId)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : t('stats.metaforge.loadError')); }
    finally { setLoading(false); }
  }, [t]);

  useEffect(() => {
    setInput(link.profileId ?? '');
    if (auth.user && link.profileId) void load(link.profileId);
    else setData(null);
  }, [auth.user, link.profileId, load]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const profileId = input.trim();
    if (!isValidMetaForgeProfileId(profileId)) {
      setError(t('stats.metaforge.invalidId'));
      return;
    }
    setLink({ profileId });
    await metaforgeStore.flush();
    await load(profileId);
  }

  async function unlink() {
    setLink({ profileId: null });
    await metaforgeStore.flush();
    setData(null);
    setInput('');
    setError(null);
  }

  const totals = data?.stats ?? {};
  const rounds = number(totals.total_rounds);
  const extracted = number(totals.total_extractions);
  const reducedPayload = data !== null && totals.total_rounds === undefined;
  const enemyRows = useMemo(() => [...(data?.enemyStats ?? [])].sort((a, b) => b.kills - a.kills), [data]);
  const weaponRows = useMemo(() => [...(data?.weaponStats ?? [])].sort((a, b) => b.damage - a.damage), [data]);

  return (
    <main className="content-container metaforge-page">
      <header className="metaforge-header"><div><h2>{t('stats.metaforge.title')}</h2><p>{t('stats.metaforge.subtitle')}</p></div><Hammer size={34} /></header>

      {!auth.user ? (
        <section className="metaforge-link-card"><h3>{t('stats.metaforge.signInTitle')}</h3><p>{t('stats.metaforge.signInBody')}</p></section>
      ) : (
        <section className="metaforge-link-card">
          <div><h3>{link.profileId ? t('stats.metaforge.linkedTitle') : t('stats.metaforge.linkTitle')}</h3><p>{t('stats.metaforge.linkBody')}</p></div>
          <form onSubmit={(event) => void submit(event)}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={t('stats.metaforge.idPlaceholder')} aria-label={t('stats.metaforge.idLabel')} />
            <button type="submit" disabled={loading}><Link2 size={15} />{link.profileId ? t('stats.metaforge.update') : t('stats.metaforge.link')}</button>
            {link.profileId && <button type="button" className="metaforge-unlink" onClick={() => void unlink()}><Unlink size={15} />{t('stats.metaforge.unlink')}</button>}
          </form>
        </section>
      )}

      {error && <div className="metaforge-error" role="alert">{error}</div>}
      {link.profileId && <div className="metaforge-source"><span>{t('stats.metaforge.linkedId')}: {link.profileId}</span><button type="button" disabled={loading} onClick={() => void load(link.profileId!)}><RefreshCw size={14} className={loading ? 'metaforge-spin' : ''} />{t('stats.metaforge.refresh')}</button></div>}
      {reducedPayload && <div className="metaforge-notice">{t('stats.metaforge.reducedPayload')}</div>}

      {data && (
        <>
          <section className="metaforge-metrics">
            {[
              [t('stats.metaforge.metrics.rounds'), formatNumber(rounds)],
              ['Level', formatNumber(number(totals.level))],
              ['Credits', formatNumber(number(totals.credits))],
              ['Raider Tokens', formatNumber(number(totals.raiderTokens))],
              ['Creds', formatNumber(number(totals.creds))],
              ['Current XP', formatNumber(number(totals.currentXp))],
              ['Next Level XP', formatNumber(number(totals.nextLevelXp))],
              [t('stats.metaforge.metrics.extractionRate'), percent(extracted, rounds)],
              [t('stats.metaforge.metrics.netProfit'), formatNumber(number(totals.total_net_profit))],
              [t('stats.metaforge.metrics.arcKills'), formatNumber(number(totals.total_arc_kills))],
              [t('stats.metaforge.metrics.playerKills'), formatNumber(number(totals.total_player_kills))],
              [t('stats.metaforge.metrics.playerDowns'), formatNumber(number(totals.total_player_downs ?? data.totalPlayerDowns))],
              ['Deaths', formatNumber(number(totals.total_deaths))],
              [t('stats.metaforge.metrics.damageDealt'), formatNumber(number(totals.total_damage_dealt ?? data.totalDamageDealt))],
              [t('stats.metaforge.metrics.damageTaken'), formatNumber(number(totals.total_damage_taken))],
              [t('stats.metaforge.metrics.healing'), formatNumber(number(totals.total_healing))],
              [t('stats.metaforge.metrics.xp'), formatNumber(number(totals.total_xp))],
              [t('stats.metaforge.metrics.time'), duration(number(totals.total_duration_seconds))],
            ].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}
          </section>

          {(data.mapStats?.length ?? 0) > 0 && <MapTable data={data} formatNumber={formatNumber} t={t} />}
          <div className="metaforge-breakdowns">
            <Breakdown title={t('stats.metaforge.enemyStats')} rows={enemyRows.map((row) => ({ name: row.enemy_name, primary: row.kills, secondary: row.damage }))} primaryLabel={t('stats.metaforge.kills')} secondaryLabel={t('stats.metaforge.damage')} formatNumber={formatNumber} />
            <Breakdown title={t('stats.metaforge.weaponDamage')} rows={weaponRows.map((row) => ({ name: row.weapon_name, primary: row.damage }))} primaryLabel={t('stats.metaforge.damage')} formatNumber={formatNumber} />
          </div>
        </>
      )}
    </main>
  );
}

function MapTable({ data, formatNumber, t }: { data: MetaForgeStatsResponse; formatNumber: (value: number) => string; t: (key: string) => string }) {
  return <section className="metaforge-panel"><h3>{t('stats.metaforge.mapStats')}</h3><div className="metaforge-table-wrap"><table><thead><tr><th>{t('stats.metaforge.map')}</th><th>{t('stats.metaforge.raids')}</th><th>{t('stats.metaforge.extractions')}</th><th>{t('stats.metaforge.survival')}</th><th>{t('stats.metaforge.netProfit')}</th><th>{t('stats.metaforge.arcKills')}</th><th>{t('stats.metaforge.playerKills')}</th></tr></thead><tbody>{data.mapStats!.map((row) => <tr key={row.map_name}><td>{row.map_name}</td><td>{formatNumber(row.rounds_played)}</td><td>{formatNumber(row.total_extractions)}</td><td>{percent(row.total_extractions, row.rounds_played)}</td><td>{formatNumber(row.total_net_profit)}</td><td>{formatNumber(row.total_arc_kills)}</td><td>{formatNumber(row.total_player_kills)}</td></tr>)}</tbody></table></div></section>;
}

function Breakdown({ title, rows, primaryLabel, secondaryLabel, formatNumber }: { title: string; rows: Array<{ name: string; primary: number; secondary?: number }>; primaryLabel: string; secondaryLabel?: string; formatNumber: (value: number) => string }) {
  return <section className="metaforge-panel"><h3>{title}</h3>{rows.length === 0 ? <p>—</p> : <ol>{rows.map((row) => <li key={row.name}><span>{row.name}</span><strong>{formatNumber(row.primary)} {primaryLabel}</strong>{secondaryLabel && <small>{formatNumber(row.secondary ?? 0)} {secondaryLabel}</small>}</li>)}</ol>}</section>;
}

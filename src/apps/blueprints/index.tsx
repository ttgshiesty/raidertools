import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Check, RefreshCw, Search } from 'lucide-react';
import { ItemIcon } from '../../shared/components/ItemIcon';
import { useCognitoAuth } from '../../shared/context/CognitoAuthContext';
import { useLinkedAccounts } from '../../shared/context/LinkedAccountsContext';
import { useLocale } from '../../shared/context/LocaleContext';
import { syncBlueprints, getBlueprints } from '../../shared/services/arctrackerApi';
import { withSyncNow } from '../../shared/services/syncNowService';
import type { CachedBlueprints } from '../../shared/types/arctracker';
import type { RawItemsOutput } from '../../shared/types/item';
import { fetchLocalizedJson } from '../../shared/utils/localizedContent';
import {
  BLUEPRINT_CATEGORY_ORDER,
  buildBlueprintGrid,
  filterBlueprintGrid,
  type BlueprintStatusFilter,
} from './utils/blueprintGrid';
import './styles/main.scss';

export function BlueprintsApp() {
  const { locale, t, tm } = useLocale();
  const auth = useCognitoAuth();
  const { arctracker } = useLinkedAccounts();
  const [catalog, setCatalog] = useState<RawItemsOutput | null>(null);
  const [cached, setCached] = useState<CachedBlueprints | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<BlueprintStatusFilter>('all');
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchLocalizedJson<RawItemsOutput>('/data/items/items.json', locale)
      .then((items) => { if (active) setCatalog(items); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : t('blueprints.loadError')); });
    return () => { active = false; };
  }, [locale, t]);

  useEffect(() => {
    if (!auth.user || arctracker.state !== 'connected') {
      setCached(null);
      return;
    }
    let active = true;
    getBlueprints().then((value) => { if (active) setCached(value ?? null); });
    return () => { active = false; };
  }, [auth.user, arctracker.state]);

  const sync = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      setCached(await withSyncNow('blueprints', syncBlueprints));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('blueprints.syncError'));
    } finally {
      setSyncing(false);
    }
  }, [t]);

  const grid = useMemo(() => buildBlueprintGrid(catalog, cached), [catalog, cached]);
  const visible = useMemo(
    () => filterBlueprintGrid(grid, { query, category, status }),
    [grid, query, category, status],
  );
  const learned = cached
    ? grid.filter((blueprint) => blueprint.learned).length
    : null;

  return (
    <main className="content-container blueprints-page">
      <header className="blueprints-header">
        <div>
          <h2>{t('blueprints.title')}</h2>
          <p>{t('blueprints.subtitle')}</p>
        </div>
        {auth.user && arctracker.state === 'connected' ? (
          <button className="blueprints-sync" type="button" onClick={() => void sync()} disabled={syncing}>
            <RefreshCw size={16} className={syncing ? 'blueprints-spin' : ''} />
            {syncing ? t('blueprints.syncing') : t('blueprints.sync')}
          </button>
        ) : (
          <Link className="blueprints-sync" to={auth.user ? '/profile/arctracker' : '/auth/sign-in'}>
            {auth.user ? t('blueprints.connect') : t('blueprints.signIn')}
          </Link>
        )}
      </header>

      <section className="blueprints-progress" aria-label={t('blueprints.progress')}>
        <BookOpenCheck size={24} aria-hidden="true" />
        <div>
          <strong>{learned === null ? t('blueprints.notSynced') : tm('blueprints.progressCount', { learned, total: grid.length })}</strong>
          <span>{cached ? tm('blueprints.lastSynced', { date: new Date(cached.syncedAt).toLocaleString() }) : t('blueprints.syncHint')}</span>
        </div>
        {learned !== null && <progress max={grid.length} value={learned}>{learned}/{grid.length}</progress>}
      </section>

      {error && <div className="blueprints-error" role="alert">{error}</div>}

      <section className="blueprints-controls" aria-label={t('blueprints.filters')}>
        <label className="blueprints-search">
          <Search size={16} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('blueprints.search')} />
        </label>
        <div className="blueprints-status-filter">
          {(['all', 'learned', 'unlearned'] as const).map((value) => (
            <button
              type="button"
              className={status === value ? 'active' : ''}
              disabled={!cached && value !== 'all'}
              onClick={() => setStatus(value)}
              key={value}
            >
              {t(`blueprints.status.${value}`)}
            </button>
          ))}
        </div>
      </section>

      <nav className="blueprints-categories" aria-label={t('blueprints.categories')}>
        {['all', ...BLUEPRINT_CATEGORY_ORDER].map((value) => (
          <button type="button" className={category === value ? 'active' : ''} onClick={() => setCategory(value)} key={value}>
            {value === 'all' ? t('blueprints.allCategories') : value}
          </button>
        ))}
      </nav>

      <p className="blueprints-results">{tm('blueprints.results', { count: visible.length })}</p>
      {visible.length > 0 ? (
        <section className="blueprints-grid" aria-label={t('blueprints.grid')}>
          {visible.map((blueprint) => (
            <article
              className={`blueprint-card ${blueprint.learned === true ? 'blueprint-card--learned' : ''} ${blueprint.learned === false ? 'blueprint-card--unlearned' : ''}`}
              key={blueprint.id}
            >
              <ItemIcon
                itemId={blueprint.id}
                name={blueprint.name}
                icon={blueprint.imageFilename}
                rarity={blueprint.rarity}
                showName={false}
                isBlueprint
              >
                {blueprint.learned === true && <span className="blueprint-card__check" aria-label={t('blueprints.learned')}><Check size={16} /></span>}
              </ItemIcon>
              <div className="blueprint-card__body">
                <h3>{blueprint.targetName}</h3>
                <span>{blueprint.category}</span>
                <small>{blueprint.learned === null ? t('blueprints.unknown') : blueprint.learned ? t('blueprints.learned') : t('blueprints.unlearned')}</small>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="blueprints-empty">{t('blueprints.noResults')}</div>
      )}
    </main>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Check, Database, Download, RefreshCw, Search } from 'lucide-react';
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
import { AtlasBlueprintPanel, parseAtlasCsv, type AtlasRow } from './AtlasBlueprintPanel';
import { BlueprintRegistryDetail } from './BlueprintRegistryDetail';

export function BlueprintsApp() {
  const { locale, t, tm } = useLocale();
  const auth = useCognitoAuth();
  const { arctracker } = useLinkedAccounts();
  const [catalog, setCatalog] = useState<RawItemsOutput | null>(null);
  const [cached, setCached] = useState<CachedBlueprints | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<BlueprintStatusFilter>('all');
  const [sort, setSort] = useState<'ingame' | 'name' | 'rarity'>('ingame');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [section, setSection] = useState<'collection' | 'atlas'>('collection');
  const [atlasSearch, setAtlasSearch] = useState('');
  const [atlasRows, setAtlasRows] = useState<AtlasRow[]>([]);
  const [progress, setProgress] = useState<Record<string, { learned: boolean; duplicates: number }>>(() => {
    try { return JSON.parse(localStorage.getItem('arc-raiders-blueprints') ?? '{}') as Record<string, { learned: boolean; duplicates: number }>; } catch { return {}; }
  });
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchLocalizedJson<RawItemsOutput>('/data/items/items.json', locale)
      .then((items) => { if (active) setCatalog(items); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : t('blueprints.loadError')); });
    return () => { active = false; };
  }, [locale, t]);

  useEffect(() => { fetch('/data/blueprints/atlas.csv').then((response) => response.text()).then((text) => setAtlasRows(parseAtlasCsv(text))).catch(() => setAtlasRows([])); }, []);

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
  const trackedGrid = useMemo(() => grid.map((blueprint) => ({ ...blueprint, learned: progress[blueprint.id]?.learned ?? blueprint.learned, duplicates: progress[blueprint.id]?.duplicates ?? 0 })), [grid, progress]);
  const visible = useMemo(() => {
    const filtered = filterBlueprintGrid(trackedGrid, { query, category, status });
    const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
    if (sort === 'name') return [...filtered].sort((left, right) => left.targetName.localeCompare(right.targetName));
    if (sort === 'rarity') return [...filtered].sort((left, right) => rarityOrder.indexOf(left.rarity) - rarityOrder.indexOf(right.rarity));
    return filtered;
  }, [trackedGrid, query, category, status, sort]);
  const learned = trackedGrid.filter((blueprint) => blueprint.learned).length;
  const owned = trackedGrid.filter((blueprint) => (progress[blueprint.id]?.duplicates ?? 0) > 0).length;
  const selected = trackedGrid.find((blueprint) => blueprint.id === selectedId) ?? null;
  const selectedAtlas = selected ? atlasRows.filter((row) => normalizeBlueprintName(row.blueprint) === normalizeBlueprintName(selected.targetName)) : [];

  const updateProgress = useCallback((id: string, next: { learned: boolean; duplicates: number }) => {
    setProgress((current) => {
      const updated = { ...current, [id]: next };
      localStorage.setItem('arc-raiders-blueprints', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const exportGrid = useCallback(async () => {
    const size = 80; const gap = 8; const columns = 10; const padding = 14;
    const rows = Math.ceil(visible.length / columns);
    const canvas = document.createElement('canvas'); canvas.width = (size + gap) * columns - gap + padding * 2; canvas.height = (size + gap) * rows - gap + padding * 2;
    const context = canvas.getContext('2d'); if (!context) return;
    context.fillStyle = '#1a1a1a'; context.fillRect(0, 0, canvas.width, canvas.height);
    const load = (src: string) => new Promise<HTMLImageElement | null>((resolve) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => resolve(null); image.src = src; });
    const blueprintBackground = await load('/images/blueprints/blueprint-bg.webp'); const marker = await load('/images/blueprints/Icon_Blueprint.png');
    await Promise.all(visible.map(async (blueprint, index) => { const x = padding + (index % columns) * (size + gap); const y = padding + Math.floor(index / columns) * (size + gap); if (blueprintBackground) context.drawImage(blueprintBackground, x, y, size, size); context.strokeStyle = rarityColor(blueprint.rarity); context.strokeRect(x + .5, y + .5, size - 1, size - 1); const image = blueprint.imageFilename ? await load(blueprint.imageFilename) : null; if (image) context.drawImage(image, x + 11, y + 1, 58, 58); context.fillStyle = '#0b0e1b'; context.fillRect(x + 1, y + 60, size - 2, 19); if (marker) context.drawImage(marker, x + 5, y + 65, 12, 12); context.fillStyle = '#fff'; context.font = '9px sans-serif'; context.fillText(blueprint.targetName.length > 10 ? `${blueprint.targetName.slice(0, 9)}…` : blueprint.targetName, x + 22, y + 73); const state = progress[blueprint.id]; if (blueprint.learned) { context.fillStyle = '#00e600'; context.beginPath(); context.arc(x + 69, y + 10, 7, 0, Math.PI * 2); context.fill(); context.fillStyle = '#000'; context.font = 'bold 10px sans-serif'; context.fillText('✓', x + 66, y + 13); } if (state?.duplicates) { context.fillStyle = '#ffc600'; context.fillRect(x + 1, y + 1, 20, 20); context.fillStyle = '#000'; context.font = 'bold 10px sans-serif'; context.fillText(String(state.duplicates), x + 7, y + 14); } }));
    const link = document.createElement('a'); link.download = 'arc-raiders-blueprints.png'; link.href = canvas.toDataURL('image/png'); link.click();
  }, [progress, visible]);

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
      <nav className="blueprints-sections"><button className={section === 'collection' ? 'active' : ''} onClick={() => setSection('collection')}><BookOpenCheck size={17} /> Collection</button><button className={section === 'atlas' ? 'active' : ''} onClick={() => setSection('atlas')}><Database size={17} /> Atlas</button></nav>
      {section === 'atlas' ? <AtlasBlueprintPanel initialSearch={atlasSearch} /> : <>

      <section className="blueprints-progress" aria-label={t('blueprints.progress')}>
        <BookOpenCheck size={24} aria-hidden="true" />
        <div>
          <strong>{tm('blueprints.progressCount', { learned, total: grid.length })}</strong>
          <span>{cached ? tm('blueprints.lastSynced', { date: new Date(cached.syncedAt).toLocaleString() }) : t('blueprints.syncHint')}</span>
        </div>
        <progress max={grid.length} value={learned}>{learned}/{grid.length}</progress>
      </section>

      {error && <div className="blueprints-error" role="alert">{error}</div>}

      <section className="blueprints-controls" aria-label={t('blueprints.filters')}>
        <label className="blueprints-search">
          <Search size={16} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('blueprints.search')} />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">{t('blueprints.allCategories')}</option>{BLUEPRINT_CATEGORY_ORDER.map((value) => <option key={value}>{value}</option>)}</select>
        <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="ingame">In-Game Order</option><option value="name">Name</option><option value="rarity">Rarity</option></select>
        <select value={status} onChange={(event) => setStatus(event.target.value as BlueprintStatusFilter)}><option value="all">All ({trackedGrid.length})</option><option value="learned">Learned ({learned})</option><option value="unlearned">Not Learned ({trackedGrid.length - learned})</option><option value="owned">Owned ({owned})</option></select>
        <button className="blueprints-export" onClick={() => void exportGrid()}><Download size={16} /> Export</button>
      </section>

      <p className="blueprints-results">{tm('blueprints.results', { count: visible.length })}</p>
      {visible.length > 0 ? (
        <section className="blueprints-grid" aria-label={t('blueprints.grid')}>
          {visible.map((blueprint) => (
            <article onClick={() => setSelectedId(blueprint.id)} onContextMenu={(event) => { event.preventDefault(); const current = progress[blueprint.id] ?? { learned: blueprint.learned === true, duplicates: 0 }; if (current.learned && current.duplicates < 99) updateProgress(blueprint.id, { ...current, duplicates: current.duplicates + 1 }); }}
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
                {(progress[blueprint.id]?.duplicates ?? 0) > 0 && <span className="blueprint-card__duplicate">{progress[blueprint.id].duplicates}</span>}
              </ItemIcon>
              <div className="blueprint-card__body">
                <h3>{blueprint.targetName}</h3>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="blueprints-empty">{t('blueprints.noResults')}</div>
      )}
      {selected && <BlueprintRegistryDetail blueprint={selected} atlasRows={selectedAtlas} catalog={catalog} progress={{ learned: selected.learned === true, duplicates: progress[selected.id]?.duplicates ?? 0 }} onClose={() => setSelectedId(null)} onProgress={(next) => updateProgress(selected.id, next)} onViewAtlas={() => { setAtlasSearch(selected.targetName); setSection('atlas'); setSelectedId(null); }} />}
      </>}
    </main>
  );
}

function rarityColor(rarity: string): string { return ({ Legendary: '#ffc600', Epic: '#cc3099', Rare: '#00a8f2', Uncommon: '#26bf57', Common: '#6c6c6c' } as Record<string, string>)[rarity] ?? '#6c6c6c'; }
function normalizeBlueprintName(value: string): string { return value.toLowerCase().replace(/\s*(blueprint|progetto)\s*/gi, '').replace(/[^a-z0-9]+/g, ' ').trim(); }

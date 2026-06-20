import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { Check, Map, MapPin, Minus, Package, Plus, Send, X, Zap } from 'lucide-react';
import { ItemIcon } from '../../shared/components/ItemIcon';
import type { RawItemsOutput } from '../../shared/types/item';
import type { AtlasRow } from './AtlasBlueprintPanel';
import type { BlueprintGridItem } from './utils/blueprintGrid';

type LocationTab = 'container' | 'map' | 'event';
interface FoundReport { container: string; map: string; event: string; location: string; }

interface Props {
  blueprint: BlueprintGridItem;
  atlasRows: AtlasRow[];
  catalog: RawItemsOutput | null;
  progress: { learned: boolean; duplicates: number };
  onClose(): void;
  onViewAtlas(): void;
  onProgress(next: { learned: boolean; duplicates: number }): void;
}

export function BlueprintRegistryDetail({ blueprint, atlasRows, catalog, progress, onClose, onViewAtlas, onProgress }: Props) {
  const storageKey = `raider-tools:blueprint-finds:${blueprint.id}`;
  const [tab, setTab] = useState<LocationTab>('container');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [reports, setReports] = useState<FoundReport[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as FoundReport[]; } catch { return []; }
  });
  const [form, setForm] = useState<FoundReport>({ container: '', map: '', event: '', location: '' });
  const likely = atlasRows[0];
  const distributions = useMemo(() => ({
    container: distribution([...atlasRows.flatMap((row) => splitValues(row.containers)), ...reports.map((row) => row.container)]),
    map: distribution([...atlasRows.map((row) => row.map), ...reports.map((row) => row.map)]),
    event: distribution([...atlasRows.map((row) => eventName(row.condition)), ...reports.map((row) => row.event)]),
  }), [atlasRows, reports]);
  const votes = Math.max(atlasRows.length + reports.length, distributions.container.reduce((sum, row) => sum + row.count, 0));

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.container.trim() || !form.map.trim()) return;
    const next = [...reports, { ...form, container: form.container.trim(), map: form.map.trim(), event: form.event.trim() || 'No Event', location: form.location.trim() }];
    localStorage.setItem(storageKey, JSON.stringify(next));
    setReports(next);
    setForm({ container: '', map: '', event: '', location: '' });
    setShowForm(false);
  }

  return <div className="registry-blueprint-detail" role="dialog" aria-modal="true">
    <button className="registry-blueprint-detail__backdrop" onClick={onClose} aria-label="Close" />
    <section style={{ '--registry-rarity': rarityColor(blueprint.rarity) } as CSSProperties}>
      <button className="registry-blueprint-detail__close" onClick={onClose} aria-label="Close"><X /></button>
      <header className="registry-detail-hero">
        <div className="registry-rarity-frame"><ItemIcon itemId={blueprint.id} name={blueprint.name} icon={blueprint.imageFilename} rarity={blueprint.rarity} showName={false} isBlueprint />{blueprint.learned && <span className="registry-collected"><Check /></span>}{progress.duplicates > 0 && <span className="registry-spares">Spares: <b>{progress.duplicates}</b></span>}</div>
        <div><small>{blueprint.rarity} Blueprint</small><h2>{blueprint.targetName}</h2><p>{catalog?.items[blueprint.targetItemId]?.description || `${blueprint.targetName} Blueprint permanently unlocks crafting for this item.`}</p>
          <a className="registry-wtb" href={`/market?search=${encodeURIComponent(blueprint.targetName)}`}>WTB (Want to Buy)<span>Find this blueprint in the item-trade marketplace</span></a>
          <div className="registry-collection-controls"><button className={blueprint.learned ? 'active' : ''} onClick={() => onProgress({ learned: !blueprint.learned, duplicates: progress.duplicates })}>{blueprint.learned ? 'Collected' : 'Mark Collected'}</button><div><button disabled={progress.duplicates === 0} onClick={() => onProgress({ learned: blueprint.learned === true, duplicates: Math.max(0, progress.duplicates - 1) })}><Minus /></button><b>{progress.duplicates}</b><button onClick={() => onProgress({ learned: blueprint.learned === true, duplicates: Math.min(99, progress.duplicates + 1) })}><Plus /></button></div></div>
        </div>
      </header>

      <div className="registry-detail-columns">
        <div className="registry-detail-main">
          <section className="registry-article"><h3>Blueprint Details</h3><p>The <strong>{blueprint.targetName} Blueprint</strong> permanently unlocks your ability to craft {blueprint.targetName} at the required Hideout crafting station.</p>{likely && <p><strong>Most likely spawn:</strong> {likely.containers || 'Containers'} on {likely.map} during {likely.condition}.</p>}</section>
          <section className="registry-location-votes"><header><div><MapPin /><h3>Top {blueprint.targetName} Blueprint Locations (Player-Voted)</h3></div><span>{votes} votes</span></header>
            <nav><button className={tab === 'container' ? 'active' : ''} onClick={() => setTab('container')}><Package />Containers</button><button className={tab === 'map' ? 'active' : ''} onClick={() => setTab('map')}><MapPin />Maps</button><button className={tab === 'event' ? 'active' : ''} onClick={() => setTab('event')}><Zap />Events</button></nav>
            <div className={`registry-bars registry-bars--${tab}`}>{distributions[tab].length ? distributions[tab].map((row) => <div className="registry-bar" key={row.name}><i style={{ width: `${row.percent}%` }} /><span>{row.name}</span><b>{row.percent}%</b></div>) : <p>No reports yet. Add the first location below.</p>}</div>
            <div className="registry-location-actions"><button onClick={() => setShowForm((value) => !value)}><Send />Mark Where You Found It</button><button onClick={onViewAtlas}><Map />View Heat Map</button></div>
            {showForm && <form className="registry-find-form" onSubmit={submit}><h4>Where did you find this blueprint?</h4><div><label>Container<input required value={form.container} onChange={(event) => setForm({ ...form, container: event.target.value })} placeholder="Raider Cache, Weapon Case..." /></label><label>Map<select required value={form.map} onChange={(event) => setForm({ ...form, map: event.target.value })}><option value="">Select map</option>{['Dam Battlegrounds', 'Blue Gate', 'Buried City', 'The Spaceport', 'Stella Montis'].map((map) => <option key={map}>{map}</option>)}</select></label><label>Event / Condition<input value={form.event} onChange={(event) => setForm({ ...form, event: event.target.value })} placeholder="Night Raid, Hidden Bunker..." /></label><label>Exact Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Optional point of interest" /></label></div><button type="submit">Submit Location</button></form>}
          </section>
        </div>
        <aside className="registry-detail-side">
          <dl><div><dt>Rarity</dt><dd>{blueprint.rarity}</dd></div><div><dt>Data Confidence</dt><dd className="confirmed">Confirmed</dd></div><div><dt>Map</dt><dd>{likely?.map || 'Community reported'}</dd></div><div><dt>Container</dt><dd>{likely?.containers || 'Multiple'}</dd></div><div><dt>Quest Reward</dt><dd>{atlasRows.some((row) => row.questReward) ? 'Yes' : 'No'}</dd></div><div><dt>Trials Reward</dt><dd>{atlasRows.some((row) => row.trialsReward) ? 'Yes' : 'No'}</dd></div></dl>
          <button className="registry-action" onClick={() => setShowDetails((value) => !value)}>Detailed Data</button>
          {showDetails && <div className="registry-detailed-data">{atlasRows.length ? atlasRows.map((row, index) => <div key={`${row.map}-${index}`}><strong>{row.map} · {row.condition}</strong>{row.containers && <p>{row.containers}</p>}{row.location && <p>{row.location}</p>}{row.route && <p>{row.route}</p>}</div>) : <p>No Atlas reports yet.</p>}</div>}
        </aside>
      </div>
    </section>
  </div>;
}

function splitValues(value: string): string[] { return value.split(/[,;/]|\band\b/i).map((part) => part.trim()).filter(Boolean); }
function eventName(value: string): string { const clean = value.trim(); return !clean || /^(any|day)$/i.test(clean) ? 'No Event' : clean; }
function distribution(values: string[]): Array<{ name: string; count: number; percent: number }> { const counts = new Map<string, number>(); values.map((value) => value.trim()).filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1)); const total = [...counts.values()].reduce((sum, count) => sum + count, 0); return [...counts].map(([name, count]) => ({ name, count, percent: total ? Math.round(count / total * 100) : 0 })).sort((left, right) => right.count - left.count || left.name.localeCompare(right.name)); }
function rarityColor(rarity: string): string { return ({ Legendary: '#ffc600', Epic: '#cc3099', Rare: '#00a8f2', Uncommon: '#26bf57', Common: '#6c6c6c' } as Record<string, string>)[rarity] ?? '#6c6c6c'; }

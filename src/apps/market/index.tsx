
import  {
useCallback, useEffect, useMemo, useState }
from 'react';

import  {
ArrowLeftRight, Check, Coins, EyeOff, ListTree, Package, Plus, RefreshCw, RotateCcw, Search, Settings, Trash2, UserRound, X }
from 'lucide-react';

import  {
ItemIcon }
from '../../shared/components/ItemIcon';

import  {
useCognitoAuth }
from '../../shared/context/CognitoAuthContext';

import  {
useLocale }
from '../../shared/context/LocaleContext';

import  {
bumpListing, confirmTrade, createOffer, createTrade, deleteTrade, getMyTrades, getTrades, negotiateTrade, reviewOffer, type Trade, type TradeItem }
from '../../shared/services/marketApi';

import  {
getMe, patchMe, type MeResponse }
from '../../shared/services/userApi';

import type  {
RawItemsOutput }
from '../../shared/types/item';

import  {
fetchLocalizedJson }
from '../../shared/utils/localizedContent';

import  {
ACTIONS, CATEGORY_LABELS, CATEGORY_ORDER, SOURCES, type AuditEntry, type BarterItem, type InventoryGroup, type MetaforgeItem, type SourceKey, type StockItem }
from '../metaforge-trader/constants';

import  {
findMatchingStock, genId, itemTypeFor, useMetaforgeData, useSettings, useStockState }
from '../metaforge-trader/hooks';

import './styles/main.scss';
import { formatAgeShort } from '../../shared/utils/ageFormat';
export function MarketApp()  {

const auth = useCognitoAuth();

const  {
locale }
= useLocale();

const [catalog,setCatalog]=useState<RawItemsOutput|null>(null);

const [trades,setTrades]=useState<Trade[]>([]);

const [tab,setTab]=useState<'browse'|'mine'|'user'|'inventory'|'audit'|'settings'>('browse');

const [query,setQuery]=useState('');

const [selected,setSelected]=useState<Trade|null>(null);

const [builder,setBuilder]=useState(false);

const [loading,setLoading]=useState(true);

const { stock, setStock, audit, setAudit, liquidSeeds, setLiquidSeeds } = useStockState();
const { allowCustomItems, setAllowCustomItems, staleThresholdDays, setStaleThresholdDays } = useSettings();
const { items: mfItems, iconMap, itemTypeMap, error: mfError, source: mfSource } = useMetaforgeData();

const [activeCategory, setActiveCategory] = useState('Blueprint');

const refresh=async()=>{
if(tab==='user'){setLoading(false);return}setLoading(true);setTrades(tab==='mine'?await getMyTrades():await getTrades());setLoading(false)};

const handleBump=async(trade:Trade)=>{
try{
await bumpListing(trade.id);
await refresh();
}catch(err){
console.error(err);
}
};
useEffect(()=>{void refresh()},[tab]);
useEffect(()=>{void fetchLocalizedJson<RawItemsOutput>('/data/items/items.json',locale).then(setCatalog)},[locale]);

const visible=useMemo(()=>trades.filter(trade=>!query||[trade.ownerName,...trade.offeredItems.map(item=>item.itemName),...trade.wantedItems.map(item=>item.itemName)].some(value=>value.toLowerCase().includes(query.toLowerCase()))),[trades,query]);

const grouped: InventoryGroup[] = useMemo(() => {
  const map = new Map<string, InventoryGroup>();
  for (const item of stock) {
    const key = `${item.name}|${item.source}|${Math.floor(item.cost)}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
      if (item.addedAt && (!existing.oldestAddedAt || item.addedAt < existing.oldestAddedAt)) {
        existing.oldestAddedAt = item.addedAt;
      }
    } else {
      map.set(key, {
        name: item.name,
        source: item.source,
        cost: item.cost,
        count: 1,
        oldestAddedAt: item.addedAt ?? null,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );
}, [stock]);

const filteredGroups = useMemo(() => {
  const q = query.trim().toLowerCase();
  return grouped.filter((g) => {
    const cat = itemTypeFor(g.name, itemTypeMap, mfItems);
    const inCat = activeCategory === 'General'
      ? !CATEGORY_ORDER.includes(cat as (typeof CATEGORY_ORDER)[number])
      : cat === activeCategory;
    if (!inCat) return false;
    if (!q) return true;
    return g.name.toLowerCase().includes(q);
  });
}, [grouped, query, activeCategory, itemTypeMap, mfItems]);

const metrics = useMemo(() => {
  let assetValuation = 0;
  for (const g of grouped) {
    const unitValue = mfItems.find((i) => i.name === g.name)?.value ?? 0;
    assetValuation += unitValue * g.count;
  }
  let totalProfit = 0;
  for (const e of audit) {
    if (e.action === ACTIONS.SELL) totalProfit += e.price;
    if (e.action === ACTIONS.PURCHASE) totalProfit -= e.price;
    if (e.action === ACTIONS.BARTER) {
      const give = e.barterFrom?.cost ?? 0;
      const get = e.barterTo?.cost ?? 0;
      totalProfit += get - give;
    }
  }
  return { assetValuation, totalProfit, invCount: stock.length };
}, [grouped, mfItems, audit, stock]);

const pushAudit = useCallback((entry: Omit<AuditEntry, 'id' | 'ts'>) => {
  setAudit((prev) => [{ id: genId(), ts: Date.now(), ...entry }, ...prev]);
}, [setAudit]);

const sellGroup = useCallback((g: InventoryGroup, qty: number, price: number) => {
  const actualQty = Math.min(qty, g.count);
  if (actualQty <= 0) return;
  const toRemove: StockItem[] = [];
  const remaining: StockItem[] = [];
  const candidates = stock
    .filter((s) => s.name === g.name && s.source === g.source && Math.floor(s.cost) === Math.floor(g.cost))
    .sort((a, b) => (a.addedAt ?? 0) - (b.addedAt ?? 0));
  for (let i = 0; i < candidates.length && toRemove.length < actualQty; i++) {
    toRemove.push(candidates[i]);
  }
  const removeIds = new Set(toRemove);
  for (const s of stock) {
    if (!removeIds.has(s)) remaining.push(s);
  }
  setStock(remaining);
  setLiquidSeeds((l) => l + actualQty * price);
  const totalPaid = toRemove.reduce((sum, s) => sum + (s.cost ?? 0), 0);
  pushAudit({
    action: ACTIONS.SELL,
    name: g.name,
    qty: actualQty,
    price: actualQty * price,
    cost: totalPaid,
    source: g.source,
    revertData: { deltaLiquid: -(actualQty * price), addStock: toRemove },
  });
}, [stock, setStock, setLiquidSeeds, pushAudit]);

const buyItem = useCallback((name: string, qty: number, totalCost: number) => {
  const unit = qty > 0 ? totalCost / qty : 0;
  const newEntries: StockItem[] = Array.from({ length: qty }, () => ({
    name, cost: unit, source: SOURCES.BUY, addedAt: Date.now(),
  }));
  setStock((prev) => [...prev, ...newEntries]);
  setLiquidSeeds((l) => l - totalCost);
  pushAudit({
    action: ACTIONS.PURCHASE, name, qty, price: totalCost, cost: totalCost,
    source: SOURCES.BUY,
    revertData: { deltaLiquid: totalCost, removeStock: newEntries[0] },
  });
}, [setStock, setLiquidSeeds, pushAudit]);

const executeBarter = useCallback((give: BarterItem, get: BarterItem) => {
  const matches = findMatchingStock(stock, give.name, give.source as SourceKey, give.cost);
  const take = matches.slice(0, give.qty);
  const removeIds = new Set(take);
  const remaining = stock.filter((s) => !removeIds.has(s));
  const newEntries: StockItem[] = Array.from({ length: get.qty }, () => ({
    name: get.name, cost: get.cost, source: SOURCES.TRADE, addedAt: Date.now(),
  }));
  setStock([...remaining, ...newEntries]);
  pushAudit({
    action: ACTIONS.BARTER, name: `${give.name} ↔ ${get.name}`, qty: 1, price: 0, cost: 0,
    source: SOURCES.TRADE, barterFrom: give, barterTo: get,
    revertData: { addStock: take, removeStock: newEntries[0] },
  });
}, [stock, setStock, pushAudit]);

const voidEntry = useCallback((id: string) => {
  const entry = audit.find((a) => a.id === id);
  if (!entry) return;
  pushAudit({
    action: ACTIONS.VOID, name: entry.name, qty: entry.qty, price: entry.price,
    cost: entry.cost, source: entry.source,
  });
}, [audit, pushAudit]);

const revertEntry = useCallback((id: string) => {
  const entry = audit.find((a) => a.id === id);
  if (!entry || !entry.revertData) return;
  const data = entry.revertData;
  if (typeof data.deltaLiquid === 'number') {
    setLiquidSeeds((l) => l + data.deltaLiquid!);
  }
  if (data.addStock && data.addStock.length) {
    setStock((prev) => [...prev, ...data.addStock!]);
  }
  if (data.removeStock) {
    const removes = Array.isArray(data.removeStock) ? data.removeStock : [data.removeStock];
    const removeKeys = new Set(removes.map((r: StockItem) => `${r.name}|${r.source}|${Math.floor(r.cost)}`));
    setStock((prev) => {
      const out: StockItem[] = [];
      const consumed = new Set<string>();
      for (const s of prev) {
        const k = `${s.name}|${s.source}|${Math.floor(s.cost)}`;
        if (removeKeys.has(k) && !consumed.has(k)) { consumed.add(k); continue; }
        out.push(s);
      }
      return out;
    });
  }
  pushAudit({
    action: ACTIONS.REVERTED, name: entry.name, qty: entry.qty, price: entry.price,
    cost: entry.cost, source: entry.source,
  });
}, [audit, setLiquidSeeds, setStock, pushAudit]);

const massIngest = useCallback((lines: string[], mode: 'add' | 'set') => {
  const parsed: StockItem[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const m = trimmed.match(/^(.+?)(?:\s+x(\d+))?(?:\s+@([\d.]+))?$/i);
    if (!m) continue;
    const name = m[1].trim();
    const qty = m[2] ? parseInt(m[2], 10) : 1;
    const cost = m[3] ? parseFloat(m[3]) : 0;
    for (let i = 0; i < qty; i++) {
      parsed.push({ name, cost, source: SOURCES.LOOTED, addedAt: Date.now() });
    }
  }
  if (!parsed.length) return;
  setStock((prev) => (mode === 'set' ? parsed : [...prev, ...parsed]));
  pushAudit({
    action: ACTIONS.STOCK_INIT, name: `Mass ingest (${parsed.length})`, qty: parsed.length,
    price: 0, cost: parsed.reduce((s, p) => s + p.cost, 0), source: SOURCES.LOOTED,
  });
}, [setStock, pushAudit]);

const mergeCustomItems = useCallback(() => {
  setStock((prev) => [...prev].sort((a, b) => (a.addedAt ?? 0) - (b.addedAt ?? 0)));
}, [setStock]);

const addStartingStock = useCallback((name: string, qty: number) => {
  const entries: StockItem[] = Array.from({ length: qty }, () => ({
    name, cost: 0, source: SOURCES.LOOTED, addedAt: Date.now(),
  }));
  setStock((prev) => [...prev, ...entries]);
  pushAudit({
    action: ACTIONS.STOCK_INIT, name: `Starting stock: ${name} x${qty}`, qty, price: 0, cost: 0,
    source: SOURCES.LOOTED,
  });
}, [setStock, pushAudit]);

const adjustBalance = useCallback((delta: number, label: string) => {
  setLiquidSeeds((l) => l + delta);
  pushAudit({
    action: ACTIONS.ADJUST, name: label || 'Balance adjust', qty: 1, price: delta, cost: 0,
    source: SOURCES.SYS, revertData: { deltaLiquid: -delta },
  });
}, [setLiquidSeeds, pushAudit]);

const liquidDisplay = liquidSeeds.toLocaleString();
const assetDisplay = metrics.assetValuation.toLocaleString();
const netWorth = (liquidSeeds + metrics.assetValuation).toLocaleString();
const profitDisplay = metrics.totalProfit.toLocaleString();

return (
  <main className="content-container market-page">
    <header>
      <div>
        <h2>Trades</h2>
        <p>Browse offers, manage listings, and control your trader profile.</p>
      </div>
      {auth.user ? (
        <button className="market-primary" onClick={() => setBuilder(true)}>
          <Plus />
          Create Trade
        </button>
      ) : (
        <a className="market-primary" href="/auth/sign-in">
          Sign in to trade
        </a>
      )}
    </header>
    <nav>
      <button className={tab === 'browse' ? 'active' : ''} onClick={() => setTab('browse')}>
        Browse
      </button>
      <button className={tab === 'mine' ? 'active' : ''} disabled={!auth.user} onClick={() => setTab('mine')}>
        My Listings
      </button>
      <button className={tab === 'inventory' ? 'active' : ''} disabled={!auth.user} onClick={() => setTab('inventory')}>
        Inventory
      </button>
      <button className={tab === 'audit' ? 'active' : ''} disabled={!auth.user} onClick={() => setTab('audit')}>
        Audit
      </button>
      <button className={tab === 'settings' ? 'active' : ''} disabled={!auth.user} onClick={() => setTab('settings')}>
        Settings
      </button>
      <button className={tab === 'user' ? 'active' : ''} disabled={!auth.user} onClick={() => setTab('user')}>
        <UserRound />
        User
      </button>
    </nav>
    {(tab === 'browse' || tab === 'mine') && (
      <div className="market-search">
        <label>
          <Search />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Items or user name..." />
        </label>
        <button onClick={() => void refresh()}>
          <RefreshCw className={loading ? 'spin' : ''} />
        </button>
      </div>
    )}
    {tab === 'browse' && !loading ? (
      <div className="market-grid">
        {visible.map((trade) => (
          <TradeCard trade={trade} onClick={() => setSelected(trade)} key={trade.id} />
        ))}
      </div>
    ) : tab === 'mine' ? (
      loading ? (
        <div className="market-empty">Loading trades…</div>
      ) : (
        <TradeSections trades={visible} onSelect={setSelected} onBump={handleBump} />
      )
    ) : tab === 'inventory' ? (
      <div className="mft-shell">
        <div className="mft-header">
          <div className="mft-header__title">
            <Package className="w-6 h-6" />
            <h2>Inventory</h2>
          </div>
          <div className="mft-header__metrics">
            <span>
              <Coins className="w-4 h-4" /> {liquidDisplay} seeds
            </span>
            <span>Assets {assetDisplay}</span>
            <span>Net {netWorth}</span>
            <span>Profit {profitDisplay}</span>
            <span>Items {metrics.invCount}</span>
          </div>
        </div>
        {mfError && <div className="mft-error">Item data error: {mfError}. Source: {mfSource}</div>}
        <div className="mft-grid">
          <section className="mft-inventory">
            <div className="mft-inventory__controls">
              <div className="mft-tabs">
                {[...CATEGORY_ORDER, 'General'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`mft-tab${activeCategory === cat ? ' mft-tab--active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {CATEGORY_LABELS[cat] ?? cat}
                  </button>
                ))}
              </div>
              <label className="mft-search">
                <Search className="w-4 h-4" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items..." />
              </label>
            </div>
            <InventoryTable groups={filteredGroups} items={mfItems} audit={audit} onSell={sellGroup} itemTypeMap={itemTypeMap} />
          </section>
          <aside className="mft-side">
            <BuyForm items={mfItems} iconMap={iconMap} onBuy={buyItem} liquid={liquidSeeds} />
            <BarterForm items={mfItems} stock={stock} onBarter={executeBarter} />
            <MassIngest onIngest={massIngest} allowCustomItems={allowCustomItems} />
          </aside>
        </div>
      </div>
    ) : tab === 'audit' ? (
      <div className="mft-audit">
        <header>
          <ListTree className="w-5 h-5" />
          <h3>Audit Log</h3>
          <small>
            {audit.length} entries · source {mfSource}
          </small>
        </header>
        <ul className="mft-audit__list">
          {audit.map((entry) => (
            <li key={entry.id} className={`mft-audit__row${entry.action === ACTIONS.SESSION_START ? ' mft-audit__row--session' : ''}`}>
              <time>{new Date(entry.ts).toLocaleString()}</time>
              <span className="mft-audit__action">{entry.action}</span>
              <span className="mft-audit__name">{entry.name}</span>
              <span className="mft-audit__qty">{entry.qty}</span>
              <span className="mft-audit__price">{entry.price ? entry.price.toLocaleString() : '—'}</span>
              <span className="mft-audit__source">{entry.source}</span>
              <span className="mft-audit__actions">
                {entry.action !== ACTIONS.SESSION_START && entry.action !== ACTIONS.VOID && entry.action !== ACTIONS.REVERTED && (
                  <>
                    {entry.revertData && (
                      <button title="Revert" onClick={() => revertEntry(entry.id)}>
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                    <button title="Void" onClick={() => voidEntry(entry.id)}>
                      <EyeOff className="w-4 h-4" />
                    </button>
                  </>
                )}
              </span>
            </li>
          ))}
          {!audit.length && <li className="mft-audit__empty">No audit entries yet.</li>}
        </ul>
      </div>
    ) : tab === 'settings' ? (
      <div className="mft-shell">
        <div className="mft-header">
          <div className="mft-header__title">
            <Settings className="w-6 h-6" />
            <h2>Settings</h2>
          </div>
        </div>
        <div className="mft-card" style={{ maxWidth: 520 }}>
          <h4>Settings</h4>
          <label className="mft-row">
            <input type="checkbox" checked={allowCustomItems} onChange={(e) => setAllowCustomItems(e.target.checked)} />
            Allow custom (unknown) item names
          </label>
          <label>
            Stale threshold (days)
            <input type="number" min={0} step={1} value={staleThresholdDays} onChange={(e) => setStaleThresholdDays(Math.max(0, parseFloat(e.target.value) || 0))} />
          </label>
          <hr />
          <h4>Add starting stock</h4>
          <datalist id="mft-starting-names">{mfItems.map((i) => <option key={i.name} value={i.name} />)}</datalist>
          <div className="mft-row">
            <input list="mft-starting-names" placeholder="Item name" id="start-name-input" />
            <input type="number" min={1} defaultValue={1} id="start-qty-input" />
            <button
              className="mft-btn mft-btn--primary"
              type="button"
              onClick={() => {
                const name = (document.getElementById('start-name-input') as HTMLInputElement)?.value;
                const qty = parseInt((document.getElementById('start-qty-input') as HTMLInputElement)?.value || '1', 10);
                if (!name) return;
                addStartingStock(name, Math.max(1, qty || 1));
                (document.getElementById('start-name-input') as HTMLInputElement).value = '';
              }}
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <hr />
          <h4>Merge custom items</h4>
          <button className="mft-btn" type="button" onClick={mergeCustomItems}>
            <Trash2 className="w-4 h-4" /> Dedupe stock
          </button>
          <hr />
          <h4>Adjust balance</h4>
          <small>Current liquid: {liquidSeeds.toLocaleString()}</small>
          <div className="mft-row">
            <input type="number" placeholder="Δ seeds" id="adj-delta-input" />
            <input placeholder="Reason" id="adj-label-input" />
            <button
              className="mft-btn mft-btn--primary"
              type="button"
              onClick={() => {
                const delta = parseFloat((document.getElementById('adj-delta-input') as HTMLInputElement)?.value || '0');
                const label = (document.getElementById('adj-label-input') as HTMLInputElement)?.value;
                if (!delta) return;
                adjustBalance(delta, label || '');
                (document.getElementById('adj-delta-input') as HTMLInputElement).value = '';
                (document.getElementById('adj-label-input') as HTMLInputElement).value = '';
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    ) : tab === 'user' ? (
      <MarketUser />
    ) : loading ? (
      <div className="market-empty">Loading trades…</div>
    ) : (
      <div className="market-grid">
        {visible.map((trade) => (
          <TradeCard trade={trade} onClick={() => setSelected(trade)} key={trade.id} />
        ))}
      </div>
    )}
    {builder && catalog && (
      <Builder catalog={catalog} mode="trade" onClose={() => setBuilder(false)} onSubmit={async (give, want, note, options) => {
        await createTrade(give, want, note, options);
        setBuilder(false);
        setTab('mine');
      }} />
    )}
    {selected && catalog && (
      <Detail trade={selected} catalog={catalog} onClose={() => setSelected(null)} changed={async () => {
         setSelected(null);
         await refresh();
       }} />
    )}
  </main>
);
}

function MarketUser()  {

const [profile,setProfile]=useState<MeResponse|null>(null);

const [trades,setTrades]=useState<Trade[]>([]);

const [name,setName]=useState('');

const [saved,setSaved]=useState(false);
useEffect(()=>{void Promise.all([getMe(),getMyTrades()]).then(([me,mine])=>{setProfile(me);setName(me.displayName??'');setTrades(mine)})},[]);

if(!profile)
return <div className="market-empty">Loading user profile…</div>;

const completed=trades.filter(trade=>trade.status==='completed').length;

const active=trades.filter(trade=>trade.status==='active').length;

return <section className="market-user"><header><div className="market-avatar"><UserRound/></div><div><small>Marketplace User</small><h3>{profile.displayName||profile.email||'Raider'}</h3><p>{profile.links.arctracker.linked?'ArcTracker linked':'ArcTracker not linked'}
· {profile.links.embark.linked?'Embark linked':'Embark not linked'}</p></div></header><div className="market-user-stats"><article><strong>{active}</strong><span>Active Listings</span></article><article><strong>{completed}</strong><span>Trades Completed</span></article><article><strong>{trades.length}</strong><span>Total Listings</span></article></div><form onSubmit={async(event)=>{event.preventDefault();await patchMe({displayName:name});setProfile({...profile,displayName:name.trim()});setSaved(true)}}><h3>Account Settings</h3><label>Display Name<input required maxLength={64}
value={name}
onChange={event=>{setName(event.target.value);setSaved(false)}}/></label><label>Email<input value={profile.email??''}
disabled/></label><label>In-Game Account<input value={profile.links.arctracker.linked?profile.links.arctracker.validatedUsername??'Linked':'Not linked'}
disabled/></label><button className="market-primary" type="submit">{saved?'Saved':'Save Profile'}</button></form></section> }

function TradeSections({trades,onSelect,onBump}:{trades:Trade[];onSelect(trade:Trade):void;onBump?(trade:Trade):void})  {

const sections=[['active','Active listings','Your listings are open for offers'],['accepted','Accepted','Trade accepted — confirm to proceed'],['agreed','Agreed','Do the trade in-game, then confirm completion below'],['completed','Completed','Finished trades'],['expired','Expired','Expired listings']] as const;

return <div className="market-sections">{sections.map(([status,title,subtitle])=>{
const list=trades.filter(t=>t.status===status);
return list.length?<section key={status}><header><h3>{title}</h3><p>{subtitle}</p></header><div className="market-grid">{list.map(t=><TradeCard trade={t}
onClick={()=>onSelect(t)}
onBump={()=>onBump?.(t)}
key={t.id}/>)}</div></section>:null})}</div> }

function Stack({item}:{item:TradeItem})  {

return <div className="trade-stack"><ItemIcon itemId={item.itemId}
name={item.itemName}
icon={item.itemIcon}
rarity={item.rarity}
quantity={item.quantity}
showName={false}
showQuantity/><span>{item.itemName}</span></div> }

function TradeCard({trade,onClick,onBump}:{trade:Trade;onClick():void;onBump?():void})  {

const handleBump=async(e:React.MouseEvent)=>{
e.stopPropagation();
if(onBump)onBump();
};

return <button className="trade-card" onClick={onClick}><header><span>{trade.ownerName}</span><time>{new Date(trade.createdAt).toLocaleDateString()}</time></header><div className="trade-exchange"><section><small>Offers</small>{trade.offeredItems.map(i=><Stack item={i}
key={i.itemId}/>)}</section><ArrowLeftRight/><section><small>Wants</small>{trade.wantedItems.map(i=><Stack item={i}
key={i.itemId}/>)}</section></div><footer><span>{trade.status}</span>{trade.allow_partial_fills&&trade.available_quantity!==undefined&&<small>{trade.available_quantity} available</small>}{trade.pendingOffersCount>0&&<b>{trade.pendingOffersCount}
pending</b>}{trade.mine&&onBump&&<button className="bump-btn" onClick={handleBump}>Bump</button>}</footer></button> }

function Detail({trade,catalog,onClose,changed}:{trade:Trade;catalog:RawItemsOutput;onClose():void;changed():Promise<void>})  {

const [offer,setOffer]=useState(false);

const [negotiateQuantity,setNegotiateQuantity]=useState(1);

const [negotiating,setNegotiating]=useState(false);

const run=async(task:()=>Promise<unknown>)=>{await task();await changed()};

const handleNegotiate=async()=>{
if(trade.allow_partial_fills){
setNegotiating(true);
try{
await negotiateTrade(trade.id,negotiateQuantity);
await changed();
}catch(err){
console.error(err);
}finally{
setNegotiating(false);
}
}else{
setOffer(true);
}
};

return <div className="market-modal"><button className="backdrop" onClick={onClose}/><section><header><h3>Review Trade</h3><button onClick={onClose}><X/></button></header><div className="modal-body"><div className="trade-exchange"><section><h4>Items They’re Offering</h4>{trade.offeredItems.map(i=><Stack item={i}
key={i.itemId}/>)}</section><ArrowLeftRight/><section><h4>Items They Want</h4>{trade.wantedItems.map(i=><Stack item={i}
key={i.itemId}/>)}</section></div>{trade.offers.map(o=><article className="trade-offer" key={o.id}><strong>{o.ownerName}</strong>{o.offeredItems.map(i=><Stack item={i}
key={i.itemId}/>)}</article>)}{trade.mine&&trade.offers.filter(o=>o.status==='pending').map(o=><div className="offer-actions" key={o.id}><button onClick={()=>void run(()=>reviewOffer(trade.id,o.id,'reject'))}>Decline</button><button className="market-primary" onClick={()=>void run(()=>reviewOffer(trade.id,o.id,'accept'))}><Check/>Accept Offer</button></div>)}{!trade.mine&&trade.status==='active'&&!trade.myOffer&&<><div className="negotiate-section">{trade.allow_partial_fills&&trade.available_quantity!==undefined&&<><label>Quantity</label><input type="number" min="1" max={trade.available_quantity} value={negotiateQuantity}
onChange={e=>setNegotiateQuantity(Math.max(1,Math.min(trade.available_quantity||999,parseInt(e.target.value)||1)))}/><small>Available: {trade.available_quantity}</small></>}<button className="market-primary" onClick={handleNegotiate}
disabled={negotiating}>{negotiating?'Negotiating...':trade.allow_partial_fills?'Negotiate':'Submit Offer'}</button></div></>}{(trade.status==='accepted'||trade.status==='agreed')&&<button className="market-primary" onClick={()=>void run(()=>confirmTrade(trade.id))}>Confirm {trade.status==='agreed'?'Trade Completed':'Agreement'}</button>}{trade.mine&&<button className="market-danger" onClick={()=>void run(()=>deleteTrade(trade.id))}><Trash2/>Delete Trade</button>}</div></section>{offer&&<Builder catalog={catalog}
mode="offer" onClose={()=>setOffer(false)}
onSubmit={async(give,_want,note)=>{await createOffer(trade.id,give,note);await changed()}}/>}</div> }

function Builder({catalog,mode,onClose,onSubmit}:{catalog:RawItemsOutput;mode:'trade'|'offer';onClose():void;onSubmit(give:TradeItem[],want:TradeItem[],note:string,options?:{allow_partial_fills?:boolean;price?:number;trade_type?:string;preferences?:any[]}):Promise<void>})  {

const [side,setSide]=useState<'give'|'want'|'review'>('give');

const [give,setGive]=useState<TradeItem[]>([]);

const [want,setWant]=useState<TradeItem[]>([]);

const [query,setQuery]=useState('');

const [note,setNote]=useState('');

const [allowPartialFills,setAllowPartialFills]=useState(false);

const [price,setPrice]=useState('');

const [tradeType,setTradeType]=useState<'seed'|'barter'|'item'>('item');

const target=side==='want'?want:give;

const setter=side==='want'?setWant:setGive;

const add=(id:string)=>{
const item=catalog.items[id];setter(current=>current.some(i=>i.itemId===id)?current.map(i=>i.itemId===id?{...i,quantity:i.quantity+1}:i):[...current,{itemId:id,itemName:item.name.value,itemIcon:item.imageFilename??null,rarity:item.rarity,quantity:1}])};

const matches=Object.entries(catalog.items).filter(([,item])=>item.name.value.toLowerCase().includes(query.toLowerCase())).slice(0,30);

return (
    <div className="market-modal nested">
      <button className="backdrop" onClick={onClose} />
      <section>
        <header>
          <h3>{mode === 'trade' ? 'Create Trade' : 'Create Offer'}</h3>
          <button onClick={onClose}><X /></button>
        </header>
        <div className="modal-body">
          <div className="builder-steps">
            <b>Items I’m Offering</b>
            {mode === 'trade' && <b>Items I Want</b>}
            <b>Review Trade</b>
          </div>
          {side === 'review' ? (
            <>
              <div className="trade-exchange">
                <section>
                  {give.map((i) => <Stack item={i} key={i.itemId} />)}
                </section>
                {mode === 'trade' && (
                  <>
                    <ArrowLeftRight />
                    <section>
                      {want.map((i) => <Stack item={i} key={i.itemId} />)}
                    </section>
                  </>
                )}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add trade details..."
              />
              {mode === 'trade' && (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={allowPartialFills}
                      onChange={(e) => setAllowPartialFills(e.target.checked)}
                    />
                    Allow partial fills
                  </label>
                  <label>
                    Trade Type
                    <select
                      value={tradeType}
                      onChange={(e) => setTradeType(e.target.value as 'seed' | 'barter' | 'item')}
                    >
                      <option value="item">Item Trade</option>
                      <option value="seed">Seed Trade</option>
                      <option value="barter">Barter</option>
                    </select>
                  </label>
                  {tradeType === 'seed' && (
                    <label>
                      Price per item
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                      />
                    </label>
                  )}
                </>
              )}
              <button
                className="market-primary"
                onClick={() =>
                  void onSubmit(give, want, note,
                    mode === 'trade'
                      ? {
                          allow_partial_fills: allowPartialFills,
                          price: tradeType === 'seed' ? parseFloat(price) || 0 : undefined,
                          trade_type: tradeType,
                        }
                      : undefined,
                  )
                }
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <h4>{side === 'give' ? 'Items I’m Offering' : 'Items I Want'}</h4>
              <div className="selected-items">
                {target.map((i) => <Stack item={i} key={i.itemId} />)}
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search available items..."
              />
              <div className="item-results">
                {matches.map(([id, item]) => (
                  <button onClick={() => add(id)} key={id}>
                    <ItemIcon
                      itemId={id}
                      name={item.name.value}
                      icon={item.imageFilename}
                      rarity={item.rarity}
                      showName={false}
                    />
                    <span>{item.name.value}</span>
                    <Plus />
                  </button>
                ))}
              </div>
              <button
                className="market-primary"
                disabled={!target.length}
                onClick={() => {
                  if (side === 'give' && mode === 'trade') setSide('want');
                  else setSide('review');
                }}
              >
                Next
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function InventoryTable({ groups, items, audit, onSell, itemTypeMap }: { groups: InventoryGroup[]; items: MetaforgeItem[]; audit: AuditEntry[]; onSell: (g: InventoryGroup, qty: number, price: number) => void; itemTypeMap: Record<string, string> }) {
  const [selling, setSelling] = useState<{ name: string; qty: string; price: string } | null>(null);

  const startSell = (g: InventoryGroup) => setSelling({ name: g.name, qty: String(g.count), price: '0' });
  const cancelSell = () => setSelling(null);
  const confirmSell = () => {
    if (!selling) return;
    const g = groups.find((x) => x.name === selling.name);
    if (!g) return;
    onSell(g, parseInt(selling.qty, 10) || 0, parseFloat(selling.price) || 0);
    setSelling(null);
  };

  return (
    <div className="mft-table-wrap">
      <table className="mft-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Source</th>
            <th>Est. Value</th>
            <th>Last Sold</th>
            <th>Age</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => {
            const cat = itemTypeFor(g.name, itemTypeMap, items);
            const lastSold = audit.find((a) => a.action === ACTIONS.SELL && a.name === g.name);
            const age = g.oldestAddedAt ? formatAgeShort(new Date(g.oldestAddedAt).toISOString()) ?? '—' : '—';
            const est = (items.find((i) => i.name === g.name)?.value ?? 0) * g.count;
            return (
              <tr key={`${g.name}|${g.source}|${Math.floor(g.cost)}`}>
                <td>{g.name}</td>
                <td>{cat}</td>
                <td>{g.count}</td>
                <td>{g.source}</td>
                <td>{est.toLocaleString()}</td>
                <td>{lastSold ? lastSold.price.toLocaleString() : '—'}</td>
                <td>{age}</td>
                <td>
                  {selling?.name === g.name ? (
                    <>
                      <input type="number" min={1} max={g.count} value={selling.qty} onChange={(e) => setSelling({ ...selling, qty: e.target.value })} />
                      <input type="number" value={selling.price} onChange={(e) => setSelling({ ...selling, price: e.target.value })} placeholder="Price" />
                      <button className="mft-btn mft-btn--primary" type="button" onClick={confirmSell}>Sell</button>
                      <button className="mft-btn" type="button" onClick={cancelSell}>Cancel</button>
                    </>
                  ) : (
                    <button className="mft-btn" type="button" onClick={() => startSell(g)}>Sell</button>
                  )}
                </td>
              </tr>
            );
          })}
          {!groups.length && <tr><td colSpan={8} className="mft-empty">No items in this category.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function BuyForm({ items, iconMap, onBuy, liquid }: { items: MetaforgeItem[]; iconMap: Record<string, string>; onBuy: (name: string, qty: number, totalCost: number) => void; liquid: number }) {
  const [query, setQuery] = useState('');
  const [qty] = useState(1);
  const matches = items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())).slice(0, 20);
  const total = matches.reduce((s, i) => s + i.value, 0) * qty;

  return (
    <div className="mft-card">
      <h4>Buy Items</h4>
      <label className="mft-search"><Search className="w-4 h-4" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items..." /></label>
      <div className="mft-buy-list">
        {matches.map((i) => (
          <div key={i.name} className="mft-buy-row">
            <span>{iconMap[i.name] ? <img src={iconMap[i.name]} alt="" className="mft-icon" /> : null}</span>
            <span>{i.name}</span>
            <span>{i.value?.toLocaleString() ?? '—'}</span>
            <button className="mft-btn mft-btn--primary" type="button" onClick={() => onBuy(i.name, qty, (i.value ?? 0) * qty)} disabled={liquid < (i.value ?? 0) * qty}>Buy x{qty}</button>
          </div>
        ))}
      </div>
      <small>Total: {total.toLocaleString()} seeds</small>
    </div>
  );
}

function BarterForm({ items, stock, onBarter }: { items: MetaforgeItem[]; stock: StockItem[]; onBarter: (give: BarterItem, get: BarterItem) => void }) {
  const [giveName, setGiveName] = useState('');
  const [giveQty, setGiveQty] = useState(1);
  const [getName, setName] = useState('');
  const [getQty, setGetQty] = useState(1);
  const matches = items.filter((i) => i.name.toLowerCase().includes(getName.toLowerCase())).slice(0, 10);
  const giveMatches = stock.filter((s) => s.name.toLowerCase().includes(giveName.toLowerCase())).slice(0, 10);
  const giveItem = giveMatches[0];
  const getItem = matches[0];

  return (
    <div className="mft-card">
      <h4>Barter</h4>
      <div className="mft-row">
        <input list="barter-give" value={giveName} onChange={(e) => setGiveName(e.target.value)} placeholder="Give item..." />
        <datalist id="barter-give">{stock.map((s) => <option key={s.name} value={s.name} />)}</datalist>
        <input type="number" min={1} value={giveQty} onChange={(e) => setGiveQty(parseInt(e.target.value, 10) || 1)} />
      </div>
      <div className="mft-row">
        <input list="barter-get" value={getName} onChange={(e) => setName(e.target.value)} placeholder="Get item..." />
        <datalist id="barter-get">{items.map((i) => <option key={i.name} value={i.name} />)}</datalist>
        <input type="number" min={1} value={getQty} onChange={(e) => setGetQty(parseInt(e.target.value, 10) || 1)} />
      </div>
      <button className="mft-btn mft-btn--primary" type="button" onClick={() => giveItem && getItem && onBarter({ name: giveItem.name, qty: giveQty, cost: giveItem.cost ?? 0, source: giveItem.source as SourceKey }, { name: getItem.name, qty: getQty, cost: getItem.value ?? 0 })} disabled={!giveItem || !getItem}>Execute Barter</button>
    </div>
  );
}

function MassIngest({ onIngest, allowCustomItems }: { onIngest: (lines: string[], mode: 'add' | 'set') => void; allowCustomItems: boolean }) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'add' | 'set'>('add');

  return (
    <div className="mft-card">
      <h4>Mass Ingest</h4>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Item name x3 @150&#10;Another item" />
      <div className="mft-row">
        <select value={mode} onChange={(e) => setMode(e.target.value as 'add' | 'set')}><option value="add">Add</option><option value="set">Replace all</option></select>
        <button className="mft-btn mft-btn--primary" type="button" onClick={() => { onIngest(text.split('\n'), mode); setText(''); }}>Ingest</button>
      </div>
      {!allowCustomItems && <small>Only known items are accepted.</small>}
    </div>
  );
}

import { useCallback, useMemo, useState } from 'react';
import {
  Coins,
  EyeOff,
  ListTree,
  Package,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Settings as SettingsIcon,
  Trash2,
  X,
} from 'lucide-react';
import {
  ACTIONS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  SOURCES,
  type ActionKey,
  type AuditEntry,
  type BarterItem,
  type InventoryGroup,
  type MetaforgeItem,
  type RevertData,
  type SourceKey,
  type StockItem,
} from './constants';
import {
  findMatchingStock,
  genId,
  itemTypeFor,
  priceCacheFromAudit,
  staleColor,
  useMetaforgeData,
  useSettings,
  useStockState,
} from './hooks';
import './styles/main.scss';

export function MetaforgeTraderApp() {
  const { stock, setStock, audit, setAudit, liquidSeeds, setLiquidSeeds } = useStockState();
  const { allowCustomItems, setAllowCustomItems, staleThresholdDays, setStaleThresholdDays } =
    useSettings();
  const {
    items,
    itemTypeMap,
    loading: itemsLoading,
    error: itemsError,
    lastSyncedAt,
    source: dataSource,
    resync,
  } = useMetaforgeData();

  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Blueprint');

  // Audit helpers ----------------------------------------------------------

  const pushAudit = useCallback(
    (entry: Omit<AuditEntry, 'id' | 'ts'>) => {
      setAudit((prev) => [{ id: genId(), ts: Date.now(), ...entry }, ...prev]);
    },
    [setAudit],
  );

  const findEntry = useCallback(
    (id: string): AuditEntry | undefined => audit.find((a) => a.id === id),
    [audit],
  );

  const sessionStart = useCallback(() => {
    pushAudit({
      action: ACTIONS.SESSION_START as ActionKey,
      name: 'Session Start',
      qty: 0,
      price: 0,
      cost: 0,
      source: SOURCES.SYS as SourceKey,
    });
  }, [pushAudit]);

  // Inventory grouping -----------------------------------------------------

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
    const q = searchQuery.trim().toLowerCase();
    return grouped.filter((g) => {
      const cat = itemTypeFor(g.name, itemTypeMap, items);
      const inCat = activeCategory === 'General'
        ? !CATEGORY_ORDER.includes(cat as (typeof CATEGORY_ORDER)[number])
        : cat === activeCategory;
      if (!inCat) return false;
      if (!q) return true;
      return g.name.toLowerCase().includes(q);
    });
  }, [grouped, searchQuery, activeCategory, itemTypeMap, items]);

  // Price cache for "Suggested price" -------------------------------------

  const priceCache = useMemo(() => priceCacheFromAudit(audit), [audit]);

  // Aggregate metrics ------------------------------------------------------

  const metrics = useMemo(() => {
    let assetValuation = 0;
    for (const g of grouped) {
      const unitValue = items.find((i) => i.name === g.name)?.value ?? 0;
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
  }, [grouped, items, audit, stock]);

  // Sell action ------------------------------------------------------------

  const sellGroup = useCallback(
    (g: InventoryGroup, qty: number, price: number) => {
      const actualQty = Math.min(qty, g.count);
      if (actualQty <= 0) return;

      // Remove stock items (FIFO by addedAt)
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
        action: ACTIONS.SELL as ActionKey,
        name: g.name,
        qty: actualQty,
        price: actualQty * price,
        cost: totalPaid,
        source: g.source,
        revertData: {
          deltaLiquid: -(actualQty * price),
          addStock: toRemove,
        },
      });
    },
    [stock, setStock, setLiquidSeeds, pushAudit],
  );

  // Buy action -------------------------------------------------------------

  const buyItem = useCallback(
    (name: string, qty: number, totalCost: number) => {
      const unit = qty > 0 ? totalCost / qty : 0;
      const newEntries: StockItem[] = Array.from({ length: qty }, () => ({
        name,
        cost: unit,
        source: SOURCES.BUY as SourceKey,
        addedAt: Date.now(),
      }));
      setStock((prev) => [...prev, ...newEntries]);
      setLiquidSeeds((l) => l - totalCost);
      pushAudit({
        action: ACTIONS.PURCHASE as ActionKey,
        name,
        qty,
        price: totalCost,
        cost: totalCost,
        source: SOURCES.BUY as SourceKey,
        revertData: {
          deltaLiquid: totalCost,
          removeStock: newEntries[0],
        },
      });
    },
    [setStock, setLiquidSeeds, pushAudit],
  );

  // Barter action ----------------------------------------------------------

  const executeBarter = useCallback(
    (give: BarterItem, get: BarterItem) => {
      // Remove `qty` from stock matching give.name/source/cost
      const matches = findMatchingStock(stock, give.name, give.source as SourceKey, give.cost);
      const take = matches.slice(0, give.qty);
      const removeIds = new Set(take);
      const remaining = stock.filter((s) => !removeIds.has(s));

      // Add new stock entries for `get`
      const newEntries: StockItem[] = Array.from({ length: get.qty }, () => ({
        name: get.name,
        cost: get.cost,
        source: SOURCES.TRADE as SourceKey,
        addedAt: Date.now(),
      }));

      setStock([...remaining, ...newEntries]);
      pushAudit({
        action: ACTIONS.BARTER as ActionKey,
        name: `${give.name} ↔ ${get.name}`,
        qty: 1,
        price: 0,
        cost: 0,
        source: SOURCES.TRADE as SourceKey,
        barterFrom: give,
        barterTo: get,
        revertData: {
          addStock: take,
          removeStock: newEntries[0],
        },
      });
    },
    [stock, setStock, pushAudit],
  );

  // Void + Revert ----------------------------------------------------------

  const voidEntry = useCallback(
    (id: string) => {
      const entry = findEntry(id);
      if (!entry) return;
      pushAudit({
        action: ACTIONS.VOID as ActionKey,
        name: entry.name,
        qty: entry.qty,
        price: entry.price,
        cost: entry.cost,
        source: entry.source,
      });
    },
    [findEntry, pushAudit],
  );

  const revertEntry = useCallback(
    (id: string) => {
      const entry = findEntry(id);
      if (!entry || !entry.revertData) return;
      const data: RevertData = entry.revertData;

      if (typeof data.deltaLiquid === 'number') {
        setLiquidSeeds((l) => l + data.deltaLiquid!);
      }
      if (data.addStock && data.addStock.length) {
        setStock((prev) => [...prev, ...data.addStock!]);
      }
      if (data.removeStock) {
        const removes = Array.isArray(data.removeStock) ? data.removeStock : [data.removeStock];
        const removeKeys = new Set(removes.map((r) => `${r.name}|${r.source}|${Math.floor(r.cost)}`));
        setStock((prev) => {
          const out: StockItem[] = [];
          let consumed = new Set<string>();
          for (const s of prev) {
            const k = `${s.name}|${s.source}|${Math.floor(s.cost)}`;
            if (removeKeys.has(k) && !consumed.has(k)) {
              consumed.add(k);
              continue;
            }
            out.push(s);
          }
          return out;
        });
      }

      pushAudit({
        action: ACTIONS.REVERTED as ActionKey,
        name: entry.name,
        qty: entry.qty,
        price: entry.price,
        cost: entry.cost,
        source: entry.source,
      });
    },
    [findEntry, setLiquidSeeds, setStock, pushAudit],
  );

  // Mass ingest ------------------------------------------------------------

  const massIngest = useCallback(
    (lines: string[], mode: 'add' | 'set') => {
      const parsed: StockItem[] = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        // Format: "Name xQty @Cost"  or  "Name"  or  "Name x2"
        const m = trimmed.match(/^(.+?)(?:\s+x(\d+))?(?:\s+@([\d.]+))?$/i);
        if (!m) continue;
        const name = m[1].trim();
        const qty = m[2] ? parseInt(m[2], 10) : 1;
        const cost = m[3] ? parseFloat(m[3]) : 0;
        for (let i = 0; i < qty; i++) {
          parsed.push({
            name,
            cost,
            source: SOURCES.LOOTED as SourceKey,
            addedAt: Date.now(),
          });
        }
      }
      if (!parsed.length) return;
      setStock((prev) => (mode === 'set' ? parsed : [...prev, ...parsed]));
      pushAudit({
        action: ACTIONS.STOCK_INIT as ActionKey,
        name: `Mass ingest (${parsed.length})`,
        qty: parsed.length,
        price: 0,
        cost: parsed.reduce((s, p) => s + p.cost, 0),
        source: SOURCES.LOOTED as SourceKey,
      });
    },
    [setStock, pushAudit],
  );

  // Settings actions -------------------------------------------------------

  const mergeCustomItems = useCallback(() => {
    // Promote all STOCK_INIT entries without icon match to a single group
    setStock((prev) => [...prev].sort((a, b) => (a.addedAt ?? 0) - (b.addedAt ?? 0)));
  }, [setStock]);

  const addStartingStock = useCallback(
    (name: string, qty: number) => {
      const entries: StockItem[] = Array.from({ length: qty }, () => ({
        name,
        cost: 0,
        source: SOURCES.LOOTED as SourceKey,
        addedAt: Date.now(),
      }));
      setStock((prev) => [...prev, ...entries]);
      pushAudit({
        action: ACTIONS.STOCK_INIT as ActionKey,
        name: `Starting stock: ${name} x${qty}`,
        qty,
        price: 0,
        cost: 0,
        source: SOURCES.LOOTED as SourceKey,
      });
    },
    [setStock, pushAudit],
  );

  const adjustBalance = useCallback(
    (delta: number, label: string) => {
      setLiquidSeeds((l) => l + delta);
      pushAudit({
        action: ACTIONS.ADJUST as ActionKey,
        name: label || 'Balance adjust',
        qty: 1,
        price: delta,
        cost: 0,
        source: SOURCES.SYS as SourceKey,
        revertData: { deltaLiquid: -delta },
      });
    },
    [setLiquidSeeds, pushAudit],
  );

  // Audit grouping by session ---------------------------------------------

  const auditWithSessions = useMemo(() => {
    const out: { entry: AuditEntry; isSession: boolean }[] = [];
    for (const e of audit) {
      out.push({ entry: e, isSession: e.action === ACTIONS.SESSION_START });
    }
    return out;
  }, [audit]);

  // Render -----------------------------------------------------------------

  const liquidDisplay = liquidSeeds.toLocaleString();
  const assetDisplay = metrics.assetValuation.toLocaleString();
  const netWorth = (liquidSeeds + metrics.assetValuation).toLocaleString();
  const profitDisplay = metrics.totalProfit.toLocaleString();

  return (
    <main className="mft-shell">
      <header className="mft-header">
        <div className="mft-header__title">
          <Package className="w-6 h-6" />
          <h2>Metaforge Trader</h2>
        </div>
        <div className="mft-header__metrics">
          <span><Coins className="w-4 h-4" /> {liquidDisplay} seeds</span>
          <span>Assets {assetDisplay}</span>
          <span>Net {netWorth}</span>
          <span>Profit {profitDisplay}</span>
          <span>Items {metrics.invCount}</span>
        </div>
        <div className="mft-header__actions">
          <button className="mft-btn" onClick={sessionStart} title="Start a new audit session">
            <Plus className="w-4 h-4" /> New Session
          </button>
          <button
            className="mft-btn"
            onClick={() => void resync()}
            disabled={itemsLoading}
            title={`Source: ${dataSource}`}
          >
            <RefreshCw className={`w-4 h-4${itemsLoading ? ' spin' : ''}`} /> Resync
          </button>
          <button className="mft-btn" onClick={() => setShowSettings(true)}>
            <SettingsIcon className="w-4 h-4" /> Settings
          </button>
        </div>
      </header>

      {itemsError && (
        <div className="mft-error">
          Item data error: {itemsError}. Falling back to cached/local source ({dataSource}).
        </div>
      )}

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
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
              />
            </label>
          </div>
          <InventoryTable
            groups={filteredGroups}
            priceCache={priceCache}
            staleThresholdDays={staleThresholdDays}
            onSell={sellGroup}
          />
        </section>

        <aside className="mft-side">
          <BuyForm items={items} onBuy={buyItem} liquid={liquidSeeds} />
          <BarterForm items={items} stock={stock} onBarter={executeBarter} />
          <MassIngest onIngest={massIngest} allowCustomItems={allowCustomItems} knownItems={items} />
        </aside>
      </div>

      <section className="mft-audit">
        <header>
          <ListTree className="w-5 h-5" />
          <h3>Audit Log</h3>
          <small>
            {audit.length} entries · last synced{' '}
            {lastSyncedAt ? new Date(lastSyncedAt).toLocaleString() : 'never'} ({dataSource})
          </small>
        </header>
        <ul className="mft-audit__list">
          {auditWithSessions.map(({ entry, isSession }) => (
            <li
              key={entry.id}
              className={`mft-audit__row${isSession ? ' mft-audit__row--session' : ''}`}
            >
              <time>{new Date(entry.ts).toLocaleString()}</time>
              <span className="mft-audit__action">{entry.action}</span>
              <span className="mft-audit__name">{entry.name}</span>
              <span className="mft-audit__qty">{entry.qty}</span>
              <span className="mft-audit__price">
                {entry.price ? entry.price.toLocaleString() : '—'}
              </span>
              <span className="mft-audit__source">{entry.source}</span>
              <span className="mft-audit__actions">
                {entry.action !== ACTIONS.SESSION_START &&
                  entry.action !== ACTIONS.VOID &&
                  entry.action !== ACTIONS.REVERTED && (
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
      </section>

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          allowCustomItems={allowCustomItems}
          setAllowCustomItems={setAllowCustomItems}
          staleThresholdDays={staleThresholdDays}
          setStaleThresholdDays={setStaleThresholdDays}
          onMergeCustom={mergeCustomItems}
          onAddStartingStock={addStartingStock}
          onAdjustBalance={adjustBalance}
          liquidSeeds={liquidSeeds}
          knownItems={items}
        />
      )}
    </main>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InventoryTable({
  groups,
  priceCache,
  staleThresholdDays,
  onSell,
}: {
  groups: InventoryGroup[];
  priceCache: Record<string, number>;
  staleThresholdDays: number;
  onSell: (g: InventoryGroup, qty: number, price: number) => void;
}) {
  const [sellQty, setSellQty] = useState<Record<string, number>>({});
  const [sellPrice, setSellPrice] = useState<Record<string, number>>({});

  if (!groups.length) {
    return <div className="mft-empty">No items in this category yet.</div>;
  }

  return (
    <table className="mft-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Source</th>
          <th>Cost</th>
          <th>Qty</th>
          <th>Sell Qty</th>
          <th>Price/unit</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => {
          const key = `${g.name}|${g.source}|${Math.floor(g.cost)}`;
          const stale = staleColor(g.oldestAddedAt, staleThresholdDays);
          const suggested = priceCache[g.name];
          return (
            <tr key={key} style={stale ? { borderLeft: `3px solid ${stale}` } : undefined}>
              <td>
                <strong>{g.name}</strong>
                {suggested !== undefined && <small>sugg {Math.round(suggested)}</small>}
              </td>
              <td>{g.source}</td>
              <td>{g.cost ? Math.round(g.cost) : '—'}</td>
              <td>{g.count}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  max={g.count}
                  value={sellQty[key] ?? 1}
                  onChange={(e) =>
                    setSellQty((s) => ({ ...s, [key]: Math.max(1, parseInt(e.target.value) || 1) }))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={sellPrice[key] ?? Math.round(suggested ?? g.cost ?? 0)}
                  onChange={(e) =>
                    setSellPrice((s) => ({ ...s, [key]: Math.max(0, parseFloat(e.target.value) || 0) }))
                  }
                />
              </td>
              <td>
                <button
                  className="mft-btn mft-btn--primary"
                  onClick={() => onSell(g, sellQty[key] ?? 1, sellPrice[key] ?? 0)}
                >
                  Sell
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function BuyForm({
  items,
  onBuy,
  liquid,
}: {
  items: MetaforgeItem[];
  onBuy: (name: string, qty: number, totalCost: number) => void;
  liquid: number;
}) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);

  const knownNames = items.map((i) => i.name);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || qty < 1 || total < 0) return;
    onBuy(name, qty, total);
    setName('');
    setQty(1);
    setTotal(0);
  };

  return (
    <form className="mft-card" onSubmit={submit}>
      <h4>Buy</h4>
      <datalist id="mft-buy-names">
        {knownNames.map((n) => <option key={n} value={n} />)}
      </datalist>
      <input
        list="mft-buy-names"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        required
      />
      <div className="mft-row">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
          placeholder="Qty"
        />
        <input
          type="number"
          min={0}
          value={total}
          onChange={(e) => setTotal(Math.max(0, parseFloat(e.target.value) || 0))}
          placeholder="Total cost"
        />
      </div>
      <small>Liquid: {liquid.toLocaleString()} seeds</small>
      <button type="submit" className="mft-btn mft-btn--primary">Buy</button>
    </form>
  );
}

function BarterForm({
  items,
  stock,
  onBarter,
}: {
  items: MetaforgeItem[];
  stock: StockItem[];
  onBarter: (give: BarterItem, get: BarterItem) => void;
}) {
  const [giveName, setGiveName] = useState('');
  const [giveQty, setGiveQty] = useState(1);
  const [getName, setGetName] = useState('');
  const [getQty, setGetQty] = useState(1);
  const [getValue, setGetValue] = useState(0);

  const giveCandidates = useMemo(() => {
    const set = new Set(stock.map((s) => s.name));
    return Array.from(set).sort();
  }, [stock]);

  const getCandidates = items.map((i) => i.name);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giveName || !getName) return;
    const giveSource = stock.find((s) => s.name === giveName)?.source ?? SOURCES.LOOTED;
    const giveCost = stock.find((s) => s.name === giveName)?.cost ?? 0;
    onBarter(
      { name: giveName, qty: giveQty, cost: giveCost, source: giveSource },
      { name: getName, qty: getQty, cost: getValue / Math.max(1, getQty) },
    );
    setGiveName('');
    setGiveQty(1);
    setGetName('');
    setGetQty(1);
    setGetValue(0);
  };

  return (
    <form className="mft-card" onSubmit={submit}>
      <h4>Barter</h4>
      <label>
        Give
        <select value={giveName} onChange={(e) => setGiveName(e.target.value)} required>
          <option value="">— pick from stock —</option>
          {giveCandidates.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <input
        type="number"
        min={1}
        value={giveQty}
        onChange={(e) => setGiveQty(Math.max(1, parseInt(e.target.value) || 1))}
        placeholder="Qty give"
      />
      <label>
        Receive
        <select value={getName} onChange={(e) => setGetName(e.target.value)} required>
          <option value="">— pick item —</option>
          {getCandidates.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <div className="mft-row">
        <input
          type="number"
          min={1}
          value={getQty}
          onChange={(e) => setGetQty(Math.max(1, parseInt(e.target.value) || 1))}
          placeholder="Qty get"
        />
        <input
          type="number"
          min={0}
          value={getValue}
          onChange={(e) => setGetValue(Math.max(0, parseFloat(e.target.value) || 0))}
          placeholder="Est. value total"
        />
      </div>
      <button type="submit" className="mft-btn mft-btn--primary">Execute Barter</button>
    </form>
  );
}

function MassIngest({
  onIngest,
  allowCustomItems,
  knownItems,
}: {
  onIngest: (lines: string[], mode: 'add' | 'set') => void;
  allowCustomItems: boolean;
  knownItems: MetaforgeItem[];
}) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'add' | 'set'>('add');

  const known = useMemo(() => new Set(knownItems.map((i) => i.name)), [knownItems]);
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const unknown = lines.filter((l) => {
    const m = l.match(/^(.+?)(?:\s+x\d+)?(?:\s+@[\d.]+)?$/i);
    const name = m ? m[1].trim() : l;
    return !known.has(name);
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lines.length) return;
    if (!allowCustomItems && unknown.length) {
      const names = unknown.join(', ');
      if (!window.confirm(`These names are not in Metaforge data: ${names}. Continue anyway?`)) {
        return;
      }
    }
    onIngest(lines, mode);
    setText('');
  };

  return (
    <form className="mft-card" onSubmit={submit}>
      <h4>Mass Ingest</h4>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'Items, one per line:\nSteel x10 @5\nWelding Torch x2'}
      />
      <div className="mft-row">
        <label>
          <input
            type="radio"
            checked={mode === 'add'}
            onChange={() => setMode('add')}
          /> Add
        </label>
        <label>
          <input
            type="radio"
            checked={mode === 'set'}
            onChange={() => setMode('set')}
          /> Replace
        </label>
      </div>
      {unknown.length > 0 && (
        <small className="mft-warn">{unknown.length} unknown name(s)</small>
      )}
      <button type="submit" className="mft-btn mft-btn--primary">Ingest</button>
    </form>
  );
}

function SettingsModal({
  onClose,
  allowCustomItems,
  setAllowCustomItems,
  staleThresholdDays,
  setStaleThresholdDays,
  onMergeCustom,
  onAddStartingStock,
  onAdjustBalance,
  liquidSeeds,
  knownItems,
}: {
  onClose: () => void;
  allowCustomItems: boolean;
  setAllowCustomItems: (v: boolean) => void;
  staleThresholdDays: number;
  setStaleThresholdDays: (v: number) => void;
  onMergeCustom: () => void;
  onAddStartingStock: (name: string, qty: number) => void;
  onAdjustBalance: (delta: number, label: string) => void;
  liquidSeeds: number;
  knownItems: MetaforgeItem[];
}) {
  const [startName, setStartName] = useState('');
  const [startQty, setStartQty] = useState(1);
  const [adjDelta, setAdjDelta] = useState(0);
  const [adjLabel, setAdjLabel] = useState('');

  return (
    <div className="mft-modal">
      <button className="mft-modal__backdrop" onClick={onClose} />
      <section className="mft-modal__panel">
        <header>
          <h3>Settings</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </header>
        <div className="mft-modal__body">
          <label className="mft-row">
            <input
              type="checkbox"
              checked={allowCustomItems}
              onChange={(e) => setAllowCustomItems(e.target.checked)}
            />
            Allow custom (unknown) item names
          </label>
          <label>
            Stale threshold (days)
            <input
              type="number"
              min={0}
              step={1}
              value={staleThresholdDays}
              onChange={(e) => setStaleThresholdDays(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </label>

          <hr />
          <h4>Add starting stock</h4>
          <datalist id="mft-starting-names">
            {knownItems.map((i) => <option key={i.name} value={i.name} />)}
          </datalist>
          <div className="mft-row">
            <input
              list="mft-starting-names"
              value={startName}
              onChange={(e) => setStartName(e.target.value)}
              placeholder="Item name"
            />
            <input
              type="number"
              min={1}
              value={startQty}
              onChange={(e) => setStartQty(Math.max(1, parseInt(e.target.value) || 1))}
              placeholder="Qty"
            />
            <button
              className="mft-btn"
              type="button"
              onClick={() => {
                if (!startName) return;
                onAddStartingStock(startName, startQty);
                setStartName('');
                setStartQty(1);
              }}
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <hr />
          <h4>Merge custom items</h4>
          <button className="mft-btn" type="button" onClick={onMergeCustom}>
            <Trash2 className="w-4 h-4" /> Dedupe stock
          </button>

          <hr />
          <h4>Adjust balance</h4>
          <small>Current liquid: {liquidSeeds.toLocaleString()}</small>
          <div className="mft-row">
            <input
              type="number"
              value={adjDelta}
              onChange={(e) => setAdjDelta(parseFloat(e.target.value) || 0)}
              placeholder="Δ seeds"
            />
            <input
              value={adjLabel}
              onChange={(e) => setAdjLabel(e.target.value)}
              placeholder="Reason"
            />
            <button
              className="mft-btn mft-btn--primary"
              type="button"
              onClick={() => {
                if (!adjDelta) return;
                onAdjustBalance(adjDelta, adjLabel);
                setAdjDelta(0);
                setAdjLabel('');
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

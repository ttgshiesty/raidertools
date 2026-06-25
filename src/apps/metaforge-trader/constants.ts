// Single source of truth for the metaforge-trader app: domain types, the
// action/source enums, and localStorage key constants. All of these are
// frozen once at module load and used by the hook + main module.

export const ACTIONS = {
  SESSION_START: 'SESSION_START',
  PURCHASE: 'PURCHASE',
  SELL: 'SELL',
  CURRENCY: 'CURRENCY',
  RECOVERY: 'RECOVERY',
  STOCK_INIT: 'STOCK_INIT',
  ADJUST: 'ADJUST',
  BARTER: 'BARTER',
  VOID: 'VOID',
  REVERTED: 'REVERTED',
  INITIAL: 'INITIAL',
} as const;

export type ActionKey = keyof typeof ACTIONS;

export const SOURCES = {
  LOOTED: 'LOOTED',
  BUY: 'BUY',
  TRADE: 'TRADE',
  SYS: 'SYS',
} as const;

export type SourceKey = keyof typeof SOURCES;

export const STORAGE_KEYS = {
  stock: 'metaforge_stock',
  audit: 'metaforge_audit',
  liquidSeeds: 'metaforge_liquid_seeds',
  metaforgeCache: 'metaforge_cache',
  metaforgeCacheTs: 'metaforge_cache_ts',
  allowCustomItems: 'metaforge_allow_custom_items',
  staleThresholdDays: 'metaforge_stale_threshold_days',
} as const;

export const METAFORGE_URL = 'https://metaforge.gg/api';
export const LOCAL_ITEMS_URL = '/data/metaforge-items.json';

export const CATEGORY_ORDER = ['Blueprint', 'Weapon', 'Key'] as const;
export const CATEGORY_LABELS: Record<string, string> = {
  Blueprint: 'Blueprints',
  Weapon: 'Weapons',
  Key: 'Keys',
  General: 'General',
};

export interface StockItem {
  name: string;
  cost: number;
  source: SourceKey;
  addedAt?: number;
}

export interface RevertData {
  deltaLiquid?: number;
  addStock?: StockItem[];
  removeStock?: StockItem | StockItem[];
}

export interface BarterItem {
  name: string;
  source?: string;
  cost: number;
  qty: number;
}

export interface AuditEntry {
  id: string;
  ts: number;
  action: ActionKey;
  name: string;
  qty: number;
  price: number;
  cost: number;
  source: SourceKey;
  revertData?: RevertData;
  barterFrom?: BarterItem;
  barterTo?: BarterItem;
}

export interface MetaforgeItem {
  name: string;
  value: number;
  icon?: string;
  item_type?: string;
  stat_block?: { stackSize?: number };
}

export interface InventoryGroup {
  name: string;
  source: SourceKey;
  cost: number;
  count: number;
  oldestAddedAt: number | null;
}

export type StockState = {
  stock: StockItem[];
  audit: AuditEntry[];
  liquidSeeds: number;
};

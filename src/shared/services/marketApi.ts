import { getIdToken } from '../auth/cognitoClient';
const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'https://api.shiesty.me';
export interface TradeItem { itemId: string; itemName: string; itemIcon: string | null; rarity: string; quantity: number }
export interface TradeOffer { id: string; ownerName: string; offeredItems: TradeItem[]; note: string; status: string }
export interface TradePreference { item: TradeItem; quantity: number; preference_type: 'receive' | 'give' }
export interface Trade { id: string; ownerName: string; mine: boolean; offeredItems: TradeItem[]; wantedItems: TradeItem[]; description: string; status: 'active'|'accepted'|'agreed'|'completed'|'expired'|'negotiating'; offers: TradeOffer[]; myOffer: TradeOffer | null; pendingOffersCount: number; createdAt: string; allow_partial_fills?: boolean; reserved_quantity?: number; available_quantity?: number; has_active_negotiation?: boolean; is_negotiation_participant?: boolean; preferences?: TradePreference[]; price?: number; trade_type?: 'seed' | 'barter' | 'item' }
async function call<T>(path: string, init?: RequestInit, auth = false): Promise<T> {
  const headers = new Headers(init?.headers);
  if (auth) {
    const token = await getIdToken();
    if (!token) throw new Error('Sign in to trade');
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (init?.body) headers.set('Content-Type', 'application/json');

  const response = await fetch(`${BASE}${path}`, { ...init, headers });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error || 'Trade request failed');
  return body;
}
export const getTrades = async () => (await call<{ listings: Trade[] }>('/market/listings')).listings;
export const getMyTrades = async () => (await call<{ listings: Trade[] }>('/market/listings/mine', undefined, true)).listings;
export const createTrade = (offeredItems: TradeItem[], wantedItems: TradeItem[], description: string, options?: { allow_partial_fills?: boolean; price?: number; trade_type?: string; preferences?: TradePreference[] }) => call('/market/listings', { method: 'POST', body: JSON.stringify({ offeredItems, wantedItems, description, ...options }) }, true);
export const createOffer = (id: string, offeredItems: TradeItem[], note: string) => call(`/market/listings/${id}/offers`, { method: 'POST', body: JSON.stringify({ offeredItems, note }) }, true);
export const reviewOffer = (id: string, offerId: string, action: 'accept'|'reject') => call(`/market/listings/${id}/offers/${offerId}`, { method: 'PATCH', body: JSON.stringify({ action }) }, true);
export const confirmTrade = (id: string) => call(`/market/listings/${id}/confirm`, { method: 'POST' }, true);
export const deleteTrade = (id: string) => call(`/market/listings/${id}`, { method: 'DELETE' }, true);
export const negotiateTrade = (listingId: string, quantity: number) => call<{ data: { id: string } }>(`/market/listings/${listingId}/negotiate`, { method: 'POST', body: JSON.stringify({ listing_id: listingId, quantity }) }, true).then(r => r.data);
export const bumpListing = (listingId: string) => call(`/market/listings/${listingId}/bump`, { method: 'POST' }, true);

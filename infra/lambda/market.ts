import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'node:crypto';
import { jsonResponse, jwtEmail, jwtSub, parseJsonBody, pickAllowedOrigin } from './_lib/http';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.USER_TABLE_NAME!;
const PK = 'MARKET#TRADES';

type Item = { itemId: string; itemName: string; itemIcon: string | null; rarity: string; quantity: number };
type TradePreference = { item: Item; quantity: number; preference_type: 'receive' | 'give' };

const clean = (value: unknown, length: number) => typeof value === 'string' ? value.trim().slice(0, length) : '';

function items(value: unknown): Item[] {
  return Array.isArray(value)
    ? value.slice(0, 8).map((raw) => raw as Partial<Item>).map((item) => ({
        itemId: clean(item.itemId, 120),
        itemName: clean(item.itemName, 160),
        itemIcon: clean(item.itemIcon, 500) || null,
        rarity: clean(item.rarity, 40) || 'Common',
        quantity: Math.max(1, Math.min(999, Math.floor(Number(item.quantity) || 1))),
      })).filter((item) => item.itemId && item.itemName)
    : [];
}

function preferences(value: unknown): TradePreference[] {
  return Array.isArray(value)
    ? value.slice(0, 8).map((raw) => raw as Partial<TradePreference>).map((pref) => ({
        item: pref.item as Item,
        quantity: Math.max(1, Math.min(999, Math.floor(Number(pref.quantity) || 1))),
        preference_type: pref.preference_type === 'receive' || pref.preference_type === 'give' ? pref.preference_type : 'receive',
      })).filter((pref) => pref.item?.itemId)
    : [];
}

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> {
  const origin = pickAllowedOrigin(event);
  const method = event.requestContext.http.method;
  const sub = jwtSub(event);
  const id = event.pathParameters?.id;

  if (method === 'GET') {
    const result = await ddb.send(new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': PK },
      ScanIndexForward: false,
      Limit: 200,
    }));
    const mine = event.rawPath.endsWith('/mine');
    const listings = (result.Items ?? []).filter((row) => !mine || row.ownerId === sub || (row.offers ?? []).some((offer: { ownerId: string }) => offer.ownerId === sub)).map(({ pk: _pk, sk: _sk, ownerId, offers = [], ...row }) => ({
      ...row,
      mine: ownerId === sub,
      offers: ownerId === sub ? offers.map(({ ownerId: _id, ...offer }: { ownerId: string }) => offer) : [],
      myOffer: offers.find((offer: { ownerId: string }) => offer.ownerId === sub) ?? null,
      pendingOffersCount: ownerId === sub ? offers.filter((offer: { status: string }) => offer.status === 'pending').length : 0,
    }));
    return jsonResponse(200, { listings }, origin);
  }

  if (!sub) return jsonResponse(401, { error: 'Unauthenticated' }, origin);

  if (method === 'POST' && !id) {
    const body = parseJsonBody<{ offeredItems?: unknown; wantedItems?: unknown; description?: string; allow_partial_fills?: boolean; price?: number; trade_type?: string; preferences?: unknown }>(event.body);
    const offeredItems = items(body?.offeredItems);
    const wantedItems = items(body?.wantedItems);
    const prefs = preferences(body?.preferences);

    if (!offeredItems.length || !wantedItems.length) return jsonResponse(400, { error: 'Offered and wanted items are required' }, origin);

    const listingId = `${Date.now().toString(36)}-${randomUUID()}`;
    const listing = {
      id: listingId,
      ownerId: sub,
      ownerName: jwtEmail(event) ?? 'Raider',
      offeredItems,
      wantedItems,
      description: clean(body?.description, 500),
      allow_partial_fills: body?.allow_partial_fills === true,
      price: Math.max(0, Math.floor(Number(body?.price) || 0)),
      trade_type: clean(body?.trade_type || 'item', 20),
      preferences: prefs,
      reserved_quantity: 0,
      available_quantity: offeredItems.reduce((sum, i) => sum + i.quantity, 0),
      has_active_negotiation: false,
      is_negotiation_participant: false,
      status: 'active',
      offers: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
    };

    await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: { pk: PK, sk: `LISTING#${listingId}`, ...listing } }));
    return jsonResponse(201, { listing: { ...listing, ownerId: undefined, mine: true } }, origin);
  }

  if (!id) return jsonResponse(400, { error: 'Listing id required' }, origin);

  const key = { pk: PK, sk: `LISTING#${id}` };
  const current = (await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: key }))).Item;

  if (!current) return jsonResponse(404, { error: 'Listing not found' }, origin);

  // Negotiate endpoint (with quantity)
  if (method === 'POST' && event.rawPath.endsWith('/negotiate')) {
    if (current.ownerId === sub || current.status !== 'active') return jsonResponse(409, { error: 'Trade is not accepting negotiations' }, origin);
    
    const body = parseJsonBody<{ quantity?: number }>(event.body);
    const quantity = Math.max(1, Math.min(current.available_quantity || 999, Math.floor(Number(body?.quantity) || 1)));

    if (quantity > (current.available_quantity || 0)) return jsonResponse(400, { error: 'Requested quantity exceeds available' }, origin);

    const negotiationId = randomUUID();
    const negotiation = {
      id: negotiationId,
      listingId: id,
      buyerId: sub,
      buyerName: jwtEmail(event) ?? 'Raider',
      quantity,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: key,
      UpdateExpression: 'SET reserved_quantity = reserved_quantity + :q, available_quantity = available_quantity - :q, has_active_negotiation = :h, #s = :s',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: {
        ':q': quantity,
        ':h': true,
        ':s': 'negotiating',
      },
    }));

    // Store negotiation in separate table or as GSI item
    await ddb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `NEGOTIATION#${negotiationId}`,
        sk: 'DETAILS',
        ...negotiation,
      },
    }));

    return jsonResponse(201, { data: { id: negotiationId } }, origin);
  }

  // Bump endpoint
  if (method === 'POST' && event.rawPath.endsWith('/bump')) {
    if (current.ownerId !== sub) return jsonResponse(403, { error: 'Owner only' }, origin);

    await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: key,
      UpdateExpression: 'SET createdAt = :now',
      ExpressionAttributeValues: { ':now': new Date().toISOString() },
    }));

    return jsonResponse(200, { ok: true }, origin);
  }

  if (method === 'POST' && event.rawPath.endsWith('/offers')) {
    if (current.ownerId === sub || current.status !== 'active') return jsonResponse(409, { error: 'Trade is not accepting this offer' }, origin);

    const body = parseJsonBody<{ offeredItems?: unknown; note?: string }>(event.body);
    const offeredItems = items(body?.offeredItems);

    if (!offeredItems.length) return jsonResponse(400, { error: 'Offer items are required' }, origin);

    const offer = {
      id: randomUUID(),
      ownerId: sub,
      ownerName: jwtEmail(event) ?? 'Raider',
      offeredItems,
      note: clean(body?.note, 500),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: key,
      UpdateExpression: 'SET offers = list_append(if_not_exists(offers, :empty), :offer)',
      ExpressionAttributeValues: { ':empty': [], ':offer': [offer] },
    }));

    return jsonResponse(201, { ok: true }, origin);
  }

  const offerId = event.pathParameters?.offerId;

  if (method === 'PATCH' && offerId) {
    if (current.ownerId !== sub) return jsonResponse(403, { error: 'Owner only' }, origin);

    const body = parseJsonBody<{ action?: string }>(event.body);
    const offers = (current.offers ?? []).map((offer: { id: string; status: string }) => ({
      ...offer,
      status: offer.id === offerId ? body?.action === 'accept' ? 'accepted' : 'rejected' : body?.action === 'accept' && offer.status === 'pending' ? 'rejected' : offer.status,
    }));

    await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: key,
      UpdateExpression: 'SET offers = :offers, #s = :status, acceptedOfferId = :offer',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: {
        ':offers': offers,
        ':status': body?.action === 'accept' ? 'accepted' : current.status,
        ':offer': body?.action === 'accept' ? offerId : current.acceptedOfferId ?? null,
      },
    }));

    return jsonResponse(200, { ok: true }, origin);
  }

  if (method === 'POST' && event.rawPath.endsWith('/confirm')) {
    const accepted = (current.offers ?? []).find((offer: { id: string }) => offer.id === current.acceptedOfferId);

    if (current.ownerId !== sub && accepted?.ownerId !== sub) return jsonResponse(403, { error: 'Participant only' }, origin);

    const ownerConfirmed = current.ownerConfirmed || current.ownerId === sub;
    const acceptorConfirmed = current.acceptorConfirmed || accepted?.ownerId === sub;
    const status = ownerConfirmed && acceptorConfirmed ? 'completed' : 'agreed';

    await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: key,
      UpdateExpression: 'SET ownerConfirmed = :o, acceptorConfirmed = :a, #s = :s',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':o': ownerConfirmed, ':a': acceptorConfirmed, ':s': status },
    }));

    return jsonResponse(200, { status }, origin);
  }

  if (method === 'DELETE' && current.ownerId === sub) {
    await ddb.send(new DeleteCommand({ TableName: TABLE_NAME, Key: key }));
    return jsonResponse(200, { ok: true }, origin);
  }

  return jsonResponse(403, { error: 'Forbidden' }, origin);
}

/**
 * Data models for Discord bot operations.
 * Combined into a single file to minimize file count.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.USER_TABLE_NAME!;

// ============================================================================
// User Model
// ============================================================================

export interface WantedItem {
    itemId: string;
    itemName: string;
    reason: string;
}

export interface User {
    id: string;
    username: string;
    level: number;
    xp: number;
    totalXp: number;
    credits: number;
    tokens: number;
    totalRaids: number;
    successfulExtractions: number;
    totalKills: number;
    stashValue: number;
    mostWanted: WantedItem[];
    discordWebhookUrl?: string;
    avatar?: string;
    email?: string;
    verified?: boolean;
    displayName?: string;
}

export async function findUserById(id: string): Promise<User | null> {
    const r = await ddb.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { pk: `USER#${id}`, sk: "PROFILE" },
    }));
    const item = r.Item;
    if (!item) return null;
    return {
        id,
        username: item.displayName || item.username || "Unknown",
        level: item.level || 1,
        xp: item.xp || 0,
        totalXp: item.totalXp || 0,
        credits: item.credits || 0,
        tokens: item.tokens || 0,
        totalRaids: item.totalRaids || 0,
        successfulExtractions: item.successfulExtractions || 0,
        totalKills: item.totalKills || 0,
        stashValue: item.stashValue || 0,
        mostWanted: item.mostWanted || [],
        discordWebhookUrl: item.discordWebhookUrl,
        avatar: item.avatar,
        email: item.email,
        verified: item.verified,
        displayName: item.displayName,
    };
}

export async function findUserByDiscordId(discordId: string): Promise<User | null> {
    const r = await ddb.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { pk: `IDP#discord#${discordId}`, sk: "USER" },
    }));
    const mapping = r.Item;
    if (!mapping?.cognitoUsername) return null;
    return findUserById(mapping.cognitoUsername);
}

export async function saveUser(user: User): Promise<void> {
    await ddb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            pk: `USER#${user.id}`,
            sk: "PROFILE",
            displayName: user.displayName,
            level: user.level,
            xp: user.xp,
            totalXp: user.totalXp,
            credits: user.credits,
            tokens: user.tokens,
            totalRaids: user.totalRaids,
            successfulExtractions: user.successfulExtractions,
            totalKills: user.totalKills,
            stashValue: user.stashValue,
            mostWanted: user.mostWanted,
            discordWebhookUrl: user.discordWebhookUrl,
            avatar: user.avatar,
            email: user.email,
            verified: user.verified,
            updatedAt: new Date().toISOString(),
        },
    }));
}

// User utility functions
export function userXpForNextLevel(user: User): number {
    return user.level * 1000;
}

export function userXpProgressPercent(user: User): number {
    const needed = userXpForNextLevel(user);
    return needed > 0 ? Math.round((user.xp / needed) * 100) : 0;
}

export function userAddWantedItem(user: User, itemId: string, itemName: string, reason: string): void {
    user.mostWanted.push({ itemId, itemName, reason });
}

export function userRemoveWantedItem(user: User, itemId: string): void {
    user.mostWanted = user.mostWanted.filter((w: WantedItem) => w.itemId !== itemId);
}

// ============================================================================
// MarketplaceListing Model
// ============================================================================

export interface MarketplaceListing {
    _id: string;
    itemName: string;
    itemrarity: string;
    price: number;
    currency: string;
    itemQuantity: number;
    itemType: string;
    condition: string;
    sellerName: string;
    sellerId: string;
    description?: string;
    itemIconUrl?: string;
    status: "active" | "sold" | "expired";
    createdAt: Date;
}

export async function findActiveListings(query: Partial<MarketplaceListing> = {}): Promise<MarketplaceListing[]> {
    // For now, return empty array - this would need a real implementation
    // with MongoDB or DynamoDB GSI
    return [];
}

// ============================================================================
// SyncData Model
// ============================================================================

export interface SyncData {
    userId: string;
    source: string;
    payload: {
        items?: StashItem[];
        rounds?: RaidRound[];
    };
    syncedAt: Date;
}

export interface StashItem {
    name?: string;
    itemName?: string;
    quantity?: number;
    amount?: number;
    value?: number;
    price?: number;
}

export interface RaidRound {
    mapName?: string;
    map?: string;
    duration?: number;
    durationMs?: number;
    kills?: number;
    arcKills?: number;
    playerKills?: number;
    netValue?: number;
    netProfit?: number;
    score?: number;
    xp?: number;
    outcome?: string;
    status?: string;
    roundEndedAt?: string;
    timestamp?: string;
}

export async function findLatestSyncData(userId: string, source: string): Promise<SyncData | null> {
    const r = await ddb.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
        ExpressionAttributeValues: {
            ":pk": `USER#${userId}`,
            ":sk": `SYNC#${source}#`,
        },
        ScanIndexForward: false,
        Limit: 1,
    }));
    const item = r.Items?.[0];
    if (!item) return null;
    return {
        userId,
        source,
        payload: item.payload || {},
        syncedAt: item.syncedAt ? new Date(item.syncedAt) : new Date(),
    };
}

// ============================================================================
// Atlas Blueprint Summary (in-memory for now, would be fetched from DB)
// ============================================================================

export interface AtlasBlueprintSummary {
    blueprint: string;
    reports: number;
    bestMap: string;
    bestCondition: string;
    lockedChance: number | null;
    maps: Array<{ name: string; count: number; percent: number }>;
    containers: Array<{ name: string; count: number; percent: number }>;
    locationsByMap: Array<{
        map: string;
        locations: Array<{ name: string; count: number }>;
    }>;
}

// In-memory cache for blueprint summaries
const blueprintSummaries: Map<string, AtlasBlueprintSummary> = new Map();

export async function getAtlasBlueprintSummary(bpName: string): Promise<AtlasBlueprintSummary> {
    const cached = blueprintSummaries.get(bpName.toLowerCase());
    if (cached) return cached;
    
    // Return a default summary - in production this would query MongoDB
    return {
        blueprint: bpName,
        reports: 0,
        bestMap: "Unknown",
        bestCondition: "Unknown",
        lockedChance: null,
        maps: [],
        containers: [],
        locationsByMap: [],
    };
}

export async function searchAtlasBlueprintSummaries(query: string, limit: number): Promise<AtlasBlueprintSummary[]> {
    // Return empty array - in production this would search MongoDB
    return [];
}
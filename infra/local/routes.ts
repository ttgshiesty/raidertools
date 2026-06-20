export type LocalRouteKey =
    | "profile"
    | "state"
    | "migrate"
    | "links"
    | "embarkLink"
    | "embarkInventory"
    | "embarkInventorySync"
    | "embarkQuests"
    | "embarkQuestsSync"
    | "embarkProjects"
    | "embarkProjectsSync"
    | "metaforgeStats"
    | "arctrackerUserProxy"
    | "market";

export interface MatchedRoutePattern {
    key: LocalRouteKey;
    pathParameters: Record<string, string>;
    requiresDevAuth: boolean;
}

export function matchLocalRoutePattern(
    method: string,
    pathname: string,
): MatchedRoutePattern | null {
    if (pathname === "/market/listings" && (method === "GET" || method === "POST")) return { key: "market", pathParameters: {}, requiresDevAuth: method !== "GET" };
    if (pathname === "/market/listings/mine" && method === "GET") return { key: "market", pathParameters: {}, requiresDevAuth: true };
    const marketMatch = /^\/market\/listings\/([^/]+)(?:\/(offers|confirm)(?:\/([^/]+))?)?$/.exec(pathname);
    if (marketMatch && ["GET","POST","PATCH","DELETE"].includes(method)) return { key: "market", pathParameters: { id: decodeURIComponent(marketMatch[1]), ...(marketMatch[3] ? { offerId: decodeURIComponent(marketMatch[3]) } : {}) }, requiresDevAuth: true };
    if (pathname === "/me" && (method === "GET" || method === "PATCH")) {
        return { key: "profile", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/migrate" && method === "POST") {
        return { key: "migrate", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/links/embark/start" && method === "POST") {
        return { key: "embarkLink", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/links/embark/complete" && method === "POST") {
        return { key: "embarkLink", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/embark/inventory" && method === "GET") {
        return { key: "embarkInventory", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/embark/inventory/sync" && method === "POST") {
        return { key: "embarkInventorySync", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/embark/quests" && method === "GET") {
        return { key: "embarkQuests", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/embark/quests/sync" && method === "POST") {
        return { key: "embarkQuestsSync", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/embark/projects" && method === "GET") {
        return { key: "embarkProjects", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/embark/projects/sync" && method === "POST") {
        return { key: "embarkProjectsSync", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname === "/me/metaforge/stats" && method === "GET") {
        return { key: "metaforgeStats", pathParameters: {}, requiresDevAuth: true };
    }
    if (pathname.startsWith("/me/arctracker/") && (method === "GET" || method === "POST")) {
        return { key: "arctrackerUserProxy", pathParameters: {}, requiresDevAuth: true };
    }
    const stateMatch = /^\/me\/state\/([^/]+)$/.exec(pathname);
    if (stateMatch && (method === "GET" || method === "PUT" || method === "DELETE")) {
        return {
            key: "state",
            pathParameters: { domain: decodeURIComponent(stateMatch[1]) },
            requiresDevAuth: true,
        };
    }
    const linksMatch = /^\/me\/links\/([^/]+)$/.exec(pathname);
    if (linksMatch && (method === "GET" || method === "PUT" || method === "DELETE")) {
        return {
            key: "links",
            pathParameters: { provider: decodeURIComponent(linksMatch[1]) },
            requiresDevAuth: true,
        };
    }
    return null;
}

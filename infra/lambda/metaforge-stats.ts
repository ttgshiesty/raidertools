/**
 * GET /me/metaforge/stats?profileId=<id>
 *
 * JWT-protected server-side relay for MetaForge's public ARC Raiders player
 * stats endpoint. The linked profile id is user-authored state; no MetaForge
 * access token is stored or exposed to the browser.
 */

import type {
    APIGatewayProxyEventV2WithJWTAuthorizer,
    APIGatewayProxyResultV2,
} from "aws-lambda";
import { jsonResponse, jwtSub, pickAllowedOrigin } from "./_lib/http";

const METAFORGE_BASE_URL = "https://metaforge.app/api/arc-raiders";
const PROFILE_ID_PATTERN = /^[A-Za-z0-9_-]{3,128}$/;

export async function handler(
    event: APIGatewayProxyEventV2WithJWTAuthorizer,
): Promise<APIGatewayProxyResultV2> {
    const origin = pickAllowedOrigin(event);
    if (!jwtSub(event)) return jsonResponse(401, { error: "Unauthenticated" }, origin);
    if (event.requestContext.http.method !== "GET") {
        return jsonResponse(405, { error: "Method not allowed" }, origin);
    }

    const profileId = event.queryStringParameters?.profileId?.trim() ?? "";
    if (!PROFILE_ID_PATTERN.test(profileId)) {
        return jsonResponse(400, { error: "Invalid MetaForge profile id" }, origin);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
        const paths = [
            `/raider/${encodeURIComponent(profileId)}`,
            `/stats/${encodeURIComponent(profileId)}`,
            `/player-stats?userId=${encodeURIComponent(profileId)}`,
        ];
        let response: Response | null = null;
        for (const path of paths) {
            const candidate = await fetch(`${METAFORGE_BASE_URL}${path}`, { signal: controller.signal, headers: { Accept: "application/json" } });
            if (candidate.ok) { response = candidate; break; }
            console.warn("MetaForge stats endpoint failed", { profileId, path, status: candidate.status });
        }
        if (!response) return jsonResponse(502, { error: "MetaForge stats request failed" }, origin);
        const responseText = await response.text();
        try {
            const payload = JSON.parse(responseText) as unknown;
            return jsonResponse(200, payload, origin);
        } catch {
            return jsonResponse(502, { error: "MetaForge returned invalid JSON" }, origin);
        }
    } catch (error) {
        const message = error instanceof Error && error.name === "AbortError"
            ? "MetaForge request timed out"
            : "MetaForge request failed";
        console.error("MetaForgeStatsFn error", { profileId, message });
        return jsonResponse(502, { error: message }, origin);
    } finally {
        clearTimeout(timeout);
    }
}

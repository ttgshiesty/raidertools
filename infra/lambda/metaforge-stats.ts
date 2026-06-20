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

const METAFORGE_PLAYER_STATS_URL = "https://metaforge.app/api/arc-raiders/player-stats";
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
        const response = await fetch(
            `${METAFORGE_PLAYER_STATS_URL}?userId=${encodeURIComponent(profileId)}`,
            {
                signal: controller.signal,
                headers: { Accept: "application/json" },
            },
        );
        const responseText = await response.text();
        if (!response.ok) {
            console.warn("MetaForge player stats request failed", {
                profileId,
                status: response.status,
            });
            return jsonResponse(502, {
                error: "MetaForge stats request failed",
                upstreamStatus: response.status,
            }, origin);
        }
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

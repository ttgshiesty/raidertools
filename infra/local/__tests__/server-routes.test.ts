import { describe, expect, it } from "vitest";
import { matchLocalRoutePattern } from "../routes";

describe("local server quest routes", () => {
    it("matches the embark quests GET route", () => {
        expect(matchLocalRoutePattern("GET", "/me/embark/quests")).not.toBeNull();
    });

    it("matches the embark quests sync POST route", () => {
        expect(matchLocalRoutePattern("POST", "/me/embark/quests/sync")).not.toBeNull();
    });

    it("matches the authenticated MetaForge stats route", () => {
        expect(matchLocalRoutePattern("GET", "/me/metaforge/stats")).toMatchObject({
            key: "metaforgeStats",
            requiresDevAuth: true,
        });
    });
});

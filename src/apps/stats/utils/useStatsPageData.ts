// useStatsPageData.ts
//
// Single data hook for the stats page. Combines:
//  - ArcTracker profile + stash currencies (getProfile/getStash — real
//    exports per arctracker-api.md)
//  - The stats dashboard (fetchStatsDashboard/loadCachedStatsDashboard —
//    real exports in statsApi.ts, fully normalized already)
//
// What this hook does NOT have, because I haven't seen where they live:
// MetaForge username, Discord display name, and Embark ID. Pass those into
// <StatsPage /> as props from wherever your app already holds them
// (useAuth(), a linked-accounts context, metaforgeApi.ts) rather than
// guessing a fetch call here.

import { useEffect, useState } from "react";
import { useAuth } from "../../../shared/context/AuthContext";
import { getProfile, getStash, syncProfile, syncStashAllPages } from "../../../shared/services/arctrackerApi";
import { getMe } from "../../../shared/services/userApi";
import {
  fetchStatsDashboard,
  loadCachedStatsDashboard,
} from "../../../shared/services/statsApi";
import type { CachedProfile, CachedStash } from "../../../shared/types/arctracker";
import type { MeResponse } from "../../../shared/services/userApi";
import type { StatsDashboardData } from "../../../shared/services/statsApi";

export function useStatsPageData() {
  const { isAuthenticated, isValidating } = useAuth();

  const [profile, setProfile] = useState<CachedProfile | null>(null);
  const [stash, setStash] = useState<CachedStash | null>(null);
  const [me, setMe] = useState<MeResponse | null>(null);
  const [dashboard, setDashboard] = useState<StatsDashboardData | null>(() =>
    loadCachedStatsDashboard()
  );
  const [loading, setLoading] = useState(dashboard === null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isValidating || !isAuthenticated) return;
    let cancelled = false;

    // Cached reads first so the page paints instantly on repeat visits.
    Promise.all([getProfile(), getStash()]).then(([cachedProfile, cachedStash]) => {
      if (cancelled) return;
      if (cachedProfile) setProfile(cachedProfile);
      if (cachedStash) setStash(cachedStash);
    });

    setRefreshing(true);
    Promise.all([syncProfile(), syncStashAllPages(), fetchStatsDashboard(), getMe()])
      .then(([freshProfile, freshStash, freshDashboard, freshMe]) => {
        if (cancelled) return;
        setProfile(freshProfile);
        setStash(freshStash);
        setDashboard(freshDashboard);
        setMe(freshMe);
      })
      .catch((e) => {
        if (!cancelled && !dashboard) {
          setError(e instanceof Error ? e.message : "Failed to load stats");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isValidating]);

  // Derived identity bits — grounded in the real MeResponse/EmbarkLinkStatus
  // shapes from userApi.ts, not guesses:
  //  - "linked" reflects ArcTracker being linked specifically (separate from
  //    just being signed into Raider Tools at all).
  //  - discordName falls back from MeResponse.displayName when the account
  //    was created via Discord OAuth.
  //  - embarkId comes off the linked Embark profile, when present.
  const arctrackerLinked = me?.links.arctracker.linked ?? false;
  const discordName = me?.signupProvider === "discord" ? me.displayName : null;
  const embarkProfile = me?.links.embark.linked ? me.links.embark.profile : null;
  const embarkId = embarkProfile?.accountId ?? embarkProfile?.thirdPartyUserId ?? embarkProfile?.tenancyUserId ?? null;

  return {
    isAuthenticated,
    arctrackerLinked,
    discordName,
    embarkId,
    profile,
    stash,
    dashboard,
    loading: loading || isValidating,
    refreshing,
    error,
  };
}


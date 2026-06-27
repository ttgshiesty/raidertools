(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  79857,
  79059,
  (e) => {
    "use strict";
    e.i(47167);
    var s = e.i(56888),
      a = e.i(95588);
    let t = {
        0x237328a6: "Spaceport",
        0x5a91839b: "The Blue Gate",
        [-0x78b0152f]: "Stella Montis",
        [-0x2c448c69]: "The Dam",
        [-0x25eb6647]: "The Dam",
        [-0x75a49a54]: "Buried City",
        [-0x1447610]: "Riven Tides",
      },
      r = {
        0x2813ad02: "Wasp",
        0x279a46d1: "Hornet",
        [-0x1e0df78f]: "Pop",
        0x11d66714: "Fireball",
        [-0x605d544f]: "Bastion",
        [-0x4e2c5310]: "Bombardier",
        [-0x5d1b69ed]: "Spotter",
        0x6a7b166b: "Snitch",
        0x36736819: "Turret",
        0x35df96f6: "Rocketeer",
        [-0x2041fdeb]: "Leaper",
        [-0x14fd3b58]: "Tick",
        0x78289476: "Shredder",
        [-0x42ef750a]: "Sentinel",
        0x4426c766: "ARC Surveyor",
        [-0x458be398]: "Queen",
        0x49126989: "Matriarch",
        [-0x5ae14f71]: "Firefly",
        [-0x6a1f6a7b]: "Comet",
        0x61bf1298: "Vaporizer",
        [-0x17d9bf87]: "ARC Turbine",
      };
    function n(e, s) {
      return e.rounds.map((e) =>
        (function (e, s) {
          let a = "UNKNOWN",
            n = null,
            l = null,
            i = null,
            o = null,
            c = 0,
            d = 0,
            h = 0,
            m = 0,
            u = 0,
            x = 0,
            p = 0,
            j = 0,
            v = 0,
            N = new Map(),
            f = new Map(),
            y = new Map(),
            g = new Map();
          for (let s of e.stats) {
            let e = s.targetId;
            switch (s.eventId) {
              case 9801:
                ((a = "RETURNED SAFELY"), e && (n = e));
                break;
              case 9802:
                ((a = "KNOCKED OUT"), e && (n = e));
                break;
              case 9800:
                e && !n && (n = e);
                break;
              case 9803:
                l = s.amount;
                break;
              case 9804:
                i = s.amount;
                break;
              case 9805:
                o = s.amount;
                break;
              case 100:
                ((h += s.amount), e && y.set(e, (y.get(e) || 0) + s.amount));
                break;
              case 200:
                ((c += s.amount),
                  e &&
                    (N.set(e, (N.get(e) || 0) + s.amount),
                    0x3b54bb4b === e
                      ? (x += s.amount)
                      : r[e] && (u += s.amount)));
                break;
              case 102:
                ((m += s.amount), e && g.set(e, (g.get(e) || 0) + s.amount));
                break;
              case 202:
                ((d += s.amount), e && f.set(e, (f.get(e) || 0) + s.amount));
                break;
              case 204:
                0x3b54bb4b === e && (p += s.amount);
                break;
              case 9902:
                j += s.amount;
                break;
              case 501:
                v += s.amount;
            }
          }
          let k = c + d,
            b = h + m,
            w = null;
          null !== o && null !== i && (w = o - i);
          let S = null !== n ? t[n] || `Unknown (${n})` : "Unknown",
            C = (function (e) {
              if (null === e) return "--:--";
              let s = Math.floor(e / 1e3),
                a = Math.floor(s / 60);
              return `${a}:${(s % 60).toString().padStart(2, "0")}`;
            })(l),
            L = (e) => r[e] || `Enemy ${e}`,
            M = (e) => s?.(e) || `Weapon ${e}`,
            A = Array.from(N.entries()).map(([e, s]) => ({
              targetId: e,
              targetName: L(e),
              amount: s,
            })),
            E = Array.from(f.entries()).map(([e, s]) => ({
              targetId: e,
              targetName: M(e),
              amount: s,
            })),
            R = Array.from(y.entries()).map(([e, s]) => ({
              targetId: e,
              targetName: L(e),
              amount: s,
            })),
            I = Array.from(g.entries()).map(([e, s]) => ({
              targetId: e,
              targetName: M(e),
              amount: s,
            }));
          return {
            roundId: e.roundId,
            outcome: a,
            mapName: S,
            mapId: n,
            durationMs: l,
            durationFormatted: C,
            valueBroughtIn: i,
            valueExtracted: o,
            netValue: w,
            kills: k,
            damage: b,
            killsByEnemyType: c,
            killsByWeapon: d,
            damageByEnemyType: h,
            damageByWeaponType: m,
            arcKills: u,
            playerKills: x,
            playerDowns: p,
            killsBreakdownByEnemy: A,
            killsBreakdownByWeapon: E,
            damageBreakdownByEnemy: R,
            damageBreakdownByWeapon: I,
            xpGained: j,
            containersLooted: v,
            rawStats: e.stats,
          };
        })(e, s),
      );
    }
    function l(e) {
      if (null === e) return "--";
      let s = Math.abs(e).toLocaleString();
      return e >= 0 ? `+${s}` : `-${s}`;
    }
    function i(e) {
      let s = e.length,
        a = e.filter((e) => "RETURNED SAFELY" === e.outcome).length,
        t = e.filter((e) => "KNOCKED OUT" === e.outcome).length,
        r = e.reduce((e, s) => e + (s.netValue || 0), 0),
        n = e.reduce((e, s) => e + s.kills, 0),
        l = e.reduce((e, s) => e + s.damage, 0),
        i = e.reduce((e, s) => e + s.killsByEnemyType, 0),
        o = e.reduce((e, s) => e + s.killsByWeapon, 0),
        c = e.reduce((e, s) => e + s.arcKills, 0),
        d = e.reduce((e, s) => e + s.playerKills, 0),
        h = e.reduce((e, s) => e + s.playerDowns, 0),
        m = {};
      e.forEach((e) => {
        m[e.mapName] = (m[e.mapName] || 0) + 1;
      });
      let u = {};
      return (
        e.forEach((e) => {
          e.killsBreakdownByEnemy.forEach((e) => {
            u[e.targetName] = (u[e.targetName] || 0) + e.amount;
          });
        }),
        {
          totalRounds: s,
          extracted: a,
          died: t,
          survivalRate: (s > 0 ? (a / s) * 100 : 0).toFixed(1) + "%",
          totalNetValue: r,
          totalKills: n,
          totalDamage: l,
          totalKillsByEnemy: i,
          totalKillsByWeapon: o,
          totalArcKills: c,
          totalPlayerKills: d,
          totalPlayerDowns: h,
          roundsByMap: m,
          killsByEnemyTotal: u,
        }
      );
    }
    e.s(
      [
        "ENEMY_ID_TO_NAME",
        0,
        r,
        "MAP_ID_TO_NAME",
        0,
        t,
        "PLAYER_DAMAGE_TARGET_ID",
        0,
        0xbfaec9f,
        "PLAYER_TARGET_ID",
        0,
        0x3b54bb4b,
        "decodeAllRounds",
        () => n,
        "formatValue",
        () => l,
        "getRoundsSummary",
        () => i,
      ],
      79059,
    );
    var o = e.i(82810);
    let c = new Map();
    for (let e of o.default) c.set(e.gameAssetId, e.name);
    let d = (e) => c.get(String(e)),
      h = null;
    async function m(e) {
      let a = await (0, s.getSupabaseClient)();
      if (!a) throw Error("Supabase client not available");
      let { data: t } = await a.auth.getSession();
      if (!t?.session?.access_token) throw Error("Not authenticated");
      let r =
        "https://khyszmgnfebcxicpdfon.supabase.co/functions/v1/embark-auth?action=round-stats";
      e && (r += `&roundsSince=${e}`);
      let n = await fetch(r, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${t.session.access_token}`,
          "Content-Type": "application/json",
        },
      });
      if (!n.ok)
        throw Error(
          (
            await n.json().catch(() => ({
              error: "Unknown error",
            }))
          ).error || `Failed to fetch round stats: ${n.status}`,
        );
      let l = await n.json();
      if (
        (console.log("[RoundStatsService] Raw API response:", {
          success: l.success,
          hasRounds: !!l.rounds,
          roundsCount: l.rounds?.length,
        }),
        !l.success)
      )
        throw Error(l.error || "Failed to fetch round stats");
      let i = l.rounds;
      if (
        (i &&
          "object" == typeof i &&
          !Array.isArray(i) &&
          Array.isArray(i.rounds) &&
          (i = i.rounds),
        !Array.isArray(i))
      )
        throw (
          console.error("[RoundStatsService] Invalid round stats format:", i),
          Error("Invalid round stats data format received")
        );
      return i;
    }
    function u() {
      return (0, a.getCachedData)(a.CACHE_KEYS.ROUND_STATS);
    }
    function x() {
      return (0, a.getCacheTimestamp)(a.CACHE_KEYS.ROUND_STATS);
    }
    async function p(e = !1) {
      if (!e) {
        let e = (0, a.getCachedData)(a.CACHE_KEYS.ROUND_STATS);
        if (e)
          return (
            console.log(
              "[RoundStatsService] Returning cached round stats from localStorage",
            ),
            e.data
          );
      }
      if (h) {
        console.log("[RoundStatsService] Waiting for existing fetch...");
        let e = await h;
        if (e) return e;
      }
      return (
        console.log("[RoundStatsService] Fetching round stats from API..."),
        (h = (async () => {
          try {
            let e = await m();
            if (
              (console.log(
                `[RoundStatsService] Received ${e?.length ?? "undefined"} raw rounds`,
              ),
              !e || !Array.isArray(e))
            )
              throw Error("Invalid round stats data received");
            let s = n(
                {
                  rounds: e,
                },
                d,
              ),
              t = [...s].sort((e, s) => s.roundId.localeCompare(e.roundId)),
              r = i(s);
            console.log(
              `[RoundStatsService] Decoded ${t.length} rounds, survival rate: ${r.survivalRate}`,
            );
            let l = {
              rounds: t,
              summary: r,
            };
            return ((0, a.setCachedData)(a.CACHE_KEYS.ROUND_STATS, l), l);
          } finally {
            h = null;
          }
        })())
      );
    }
    function j() {
      ((0, a.clearCache)(a.CACHE_KEYS.ROUND_STATS),
        (h = null),
        console.log("[RoundStatsService] Round stats cache cleared"));
    }
    e.s(
      [
        "clearRoundStatsCache",
        () => j,
        "fetchRoundStats",
        () => p,
        "getCachedRoundStats",
        () => u,
        "getRoundStatsCacheTimestamp",
        () => x,
      ],
      79857,
    );
  },
  86316,
  38115,
  62793,
  87798,
  54447,
  2276,
  48192,
  62624,
  (e) => {
    "use strict";
    var s = e.i(56888);
    async function a() {
      let e = (0, s.getSupabaseClient)();
      if (!e) return null;
      let { data: a } = await e.auth.getSession();
      return a?.session?.access_token
        ? {
            Authorization: `Bearer ${a.session.access_token}`,
            "Content-Type": "application/json",
          }
        : null;
    }
    async function t() {
      let e = await a();
      if (!e) return null;
      try {
        let s = await fetch("/api/profile?action=get-settings", {
            headers: e,
          }),
          a = await s.json();
        return a.success ? (a.settings ?? null) : null;
      } catch (e) {
        return (
          console.error("[ProfileSnapshot] Error fetching share settings:", e),
          null
        );
      }
    }
    async function r(e) {
      let s = await a();
      if (!s) return null;
      try {
        let a = await fetch("/api/profile?action=update-settings", {
            method: "POST",
            headers: s,
            body: JSON.stringify(e),
          }),
          t = await a.json();
        return t.success ? (t.slug ?? null) : null;
      } catch (e) {
        return (
          console.error("[ProfileSnapshot] Error updating share settings:", e),
          null
        );
      }
    }
    async function n(e) {
      let s = await a();
      if (!s) return null;
      try {
        let a = await fetch("/api/profile?action=save-snapshot", {
            method: "POST",
            headers: s,
            body: JSON.stringify(e),
          }),
          t = await a.json();
        return t.success ? (t.slug ?? null) : null;
      } catch (e) {
        return (
          console.error("[ProfileSnapshot] Error saving snapshot:", e),
          null
        );
      }
    }
    async function l(e) {
      try {
        let s = await fetch(`/api/profile/${encodeURIComponent(e)}`);
        return await s.json();
      } catch (e) {
        return (
          console.error("[ProfileSnapshot] Error fetching public profile:", e),
          {
            success: !1,
            error: "Failed to fetch profile",
          }
        );
      }
    }
    function i(e) {
      return e
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }
    e.s(
      [
        "fetchPublicProfile",
        () => l,
        "generateSlug",
        () => i,
        "getShareSettings",
        () => t,
        "saveProfileSnapshot",
        () => n,
        "updateShareSettings",
        () => r,
      ],
      86316,
    );
    var o = e.i(43476),
      c = e.i(71645),
      d = e.i(22016),
      h = e.i(19784);
    let m = [
        {
          id: "steam",
          name: "Steam",
          icon: "🎮",
          color: "#1b2838",
        },
        {
          id: "epic",
          name: "Epic Games",
          icon: "🎯",
          color: "#2f2f2f",
        },
        {
          id: "playstation",
          name: "PlayStation",
          icon: "🎮",
          color: "#003791",
        },
        {
          id: "xbox",
          name: "Xbox",
          icon: "🎮",
          color: "#107c10",
        },
      ],
      u = {
        steam: ({ className: e }) =>
          (0, o.jsx)("img", {
            src: "/assets/logos/steam.svg",
            alt: "",
            className: e,
            "aria-hidden": "true",
          }),
        epic: ({ className: e }) =>
          (0, o.jsx)("img", {
            src: "/assets/logos/epic-games.svg",
            alt: "",
            className: e,
            "aria-hidden": "true",
          }),
        playstation: ({ className: e }) =>
          (0, o.jsx)("img", {
            src: "/assets/logos/playstation.svg",
            alt: "",
            className: e,
            "aria-hidden": "true",
          }),
        xbox: ({ className: e }) =>
          (0, o.jsx)("img", {
            src: "/assets/logos/xbox.svg",
            alt: "",
            className: e,
            "aria-hidden": "true",
          }),
      },
      x = ({ className: e }) =>
        (0, o.jsx)("img", {
          src: "/assets/logos/embark-studios.png",
          alt: "",
          className: e,
          "aria-hidden": "true",
        }),
      p = () =>
        (0, o.jsxs)("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          className: "spinner-icon",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
              opacity: "0.25",
            }),
            (0, o.jsx)("path", {
              d: "M12 2a10 10 0 0 1 10 10",
            }),
          ],
        }),
      j = () =>
        (0, o.jsxs)("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("path", {
              d: "M18.36 6.64a9 9 0 1 1-12.73 0",
            }),
            (0, o.jsx)("line", {
              x1: "12",
              y1: "2",
              x2: "12",
              y2: "12",
            }),
          ],
        }),
      v = () =>
        (0, o.jsxs)("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("path", {
              d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            }),
            (0, o.jsx)("polyline", {
              points: "7 10 12 15 17 10",
            }),
            (0, o.jsx)("line", {
              x1: "12",
              y1: "15",
              x2: "12",
              y2: "3",
            }),
          ],
        }),
      N = () =>
        (0, o.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("path", {
              d: "M21 2v6h-6",
            }),
            (0, o.jsx)("path", {
              d: "M3 12a9 9 0 0 1 15-6.7L21 8",
            }),
            (0, o.jsx)("path", {
              d: "M3 22v-6h6",
            }),
            (0, o.jsx)("path", {
              d: "M21 12a9 9 0 0 1-15 6.7L3 16",
            }),
          ],
        });
    e.s(
      [
        "default",
        0,
        ({ className: e }) => {
          let {
              connection: s,
              isLoading: a,
              error: t,
              disconnect: r,
              refresh: n,
            } = (0, h.useEmbark)(),
            [l, i] = (0, c.useState)(!1),
            [f, y] = (0, c.useState)(!1),
            [g, k] = (0, c.useState)(!1),
            [b, w] = (0, c.useState)(!1),
            S = async () => {
              y(!0);
              try {
                await n();
              } finally {
                y(!1);
              }
            },
            C = async () => {
              i(!0);
              try {
                (await r(), k(!1));
              } finally {
                i(!1);
              }
            },
            L = s?.isConnected ?? !1,
            M = s?.displayName ?? null,
            A = s?.displayNameDiscriminator ?? null,
            E = s?.embarkUserId
              ? `ID: ${s.embarkUserId.slice(0, 8)}...`
              : "Unknown",
            R = s?.platform ? m.find((e) => e.id === s.platform) : null,
            I = s?.platform ? u[s.platform] : null;
          return (0, o.jsxs)("div", {
            className: `embark-connection-card ${e ?? ""}`,
            children: [
              (0, o.jsxs)("div", {
                className: "embark-card-header",
                children: [
                  (0, o.jsx)("div", {
                    className: "embark-logo-wrapper",
                    children: (0, o.jsx)(x, {
                      className: "embark-logo",
                    }),
                  }),
                  (0, o.jsxs)("div", {
                    className: "embark-header-text",
                    children: [
                      (0, o.jsx)("h3", {
                        className: "embark-card-title",
                        children: "Embark Account",
                      }),
                      (0, o.jsx)("span", {
                        className: `embark-status ${L ? "embark-status--connected" : "embark-status--disconnected"}`,
                        children: a
                          ? "Checking..."
                          : L
                            ? "Connected"
                            : "Not Connected",
                      }),
                    ],
                  }),
                ],
              }),
              t &&
                (0, o.jsx)("div", {
                  className: "embark-error",
                  children: (0, o.jsx)("span", {
                    children: t,
                  }),
                }),
              a
                ? (0, o.jsxs)("div", {
                    className: "embark-loading",
                    children: [
                      (0, o.jsx)(p, {}),
                      (0, o.jsx)("span", {
                        children: "Loading connection status...",
                      }),
                    ],
                  })
                : L
                  ? (0, o.jsxs)("div", {
                      className: "embark-connected-content",
                      children: [
                        (0, o.jsxs)("div", {
                          className: "embark-profile-info",
                          children: [
                            (0, o.jsxs)("div", {
                              className: "embark-profile-row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "embark-label",
                                  children: "Embark ID",
                                }),
                                (0, o.jsx)("span", {
                                  className: "embark-value embark-display-name",
                                  children: M
                                    ? (0, o.jsxs)(o.Fragment, {
                                        children: [
                                          M,
                                          A &&
                                            (0, o.jsxs)(o.Fragment, {
                                              children: [
                                                " ",
                                                (0, o.jsxs)("span", {
                                                  className:
                                                    "discriminator-wrapper",
                                                  onClick: () => w(!b),
                                                  title: b
                                                    ? "Click to hide discriminator"
                                                    : "Click to reveal discriminator",
                                                  children: [
                                                    "#",
                                                    (0, o.jsx)("span", {
                                                      className: b
                                                        ? "discriminator-visible"
                                                        : "discriminator-hidden",
                                                      children: A,
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                        ],
                                      })
                                    : E,
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "embark-profile-row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "embark-label",
                                  children: "Platform",
                                }),
                                (0, o.jsxs)("span", {
                                  className: "embark-value embark-platform",
                                  children: [
                                    I &&
                                      (0, o.jsx)(I, {
                                        className: "platform-icon",
                                      }),
                                    R?.name ?? s?.platform,
                                  ],
                                }),
                              ],
                            }),
                            s?.lastSyncedAt &&
                              (0, o.jsxs)("div", {
                                className: "embark-profile-row",
                                children: [
                                  (0, o.jsx)("span", {
                                    className: "embark-label",
                                    children: "Last Synced",
                                  }),
                                  (0, o.jsx)("span", {
                                    className: "embark-value",
                                    children: new Date(
                                      s.lastSyncedAt,
                                    ).toLocaleDateString(void 0, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }),
                                  }),
                                ],
                              }),
                            s?.tokenExpired &&
                              (0, o.jsx)("div", {
                                className: "embark-warning",
                                children: (0, o.jsx)("span", {
                                  children:
                                    "Your Embark session has expired. Reconnect in the RaiderBuddy desktop app to keep syncing.",
                                }),
                              }),
                          ],
                        }),
                        g
                          ? (0, o.jsxs)("div", {
                              className: "embark-disconnect-confirm",
                              children: [
                                (0, o.jsx)("p", {
                                  children:
                                    "Are you sure you want to disconnect your Embark account?",
                                }),
                                (0, o.jsxs)("div", {
                                  className: "embark-confirm-buttons",
                                  children: [
                                    (0, o.jsx)("button", {
                                      className:
                                        "embark-btn embark-btn--cancel",
                                      onClick: () => k(!1),
                                      disabled: l,
                                      children: "Cancel",
                                    }),
                                    (0, o.jsx)("button", {
                                      className:
                                        "embark-btn embark-btn--danger",
                                      onClick: C,
                                      disabled: l,
                                      children: l
                                        ? (0, o.jsxs)(o.Fragment, {
                                            children: [
                                              (0, o.jsx)(p, {}),
                                              "Disconnecting...",
                                            ],
                                          })
                                        : "Disconnect",
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : (0, o.jsxs)("button", {
                              className: "embark-btn embark-btn--disconnect",
                              onClick: () => k(!0),
                              children: [
                                (0, o.jsx)(j, {}),
                                (0, o.jsx)("span", {
                                  children: "Disconnect Account",
                                }),
                              ],
                            }),
                      ],
                    })
                  : (0, o.jsxs)("div", {
                      className: "embark-connect-content",
                      children: [
                        (0, o.jsxs)("div", {
                          className: "embark-extension-required",
                          children: [
                            (0, o.jsx)("div", {
                              className: "extension-icon",
                              children: (0, o.jsx)(v, {}),
                            }),
                            (0, o.jsx)("h4", {
                              className: "extension-title",
                              children:
                                "Connect with the RaiderBuddy Desktop App",
                            }),
                            (0, o.jsx)("p", {
                              className: "extension-description",
                              children:
                                "Linking now happens in the RaiderBuddy desktop app while ARC Raiders runs. Your inventory, quests, and stats sync back here automatically.",
                            }),
                            (0, o.jsxs)(d.default, {
                              href: "/download",
                              className: "embark-btn embark-btn--connect",
                              children: [
                                (0, o.jsx)(v, {}),
                                (0, o.jsx)("span", {
                                  children: "Get the Desktop App",
                                }),
                              ],
                            }),
                            (0, o.jsx)("button", {
                              className: "embark-btn embark-btn--secondary",
                              onClick: S,
                              disabled: f,
                              children: f
                                ? (0, o.jsxs)(o.Fragment, {
                                    children: [
                                      (0, o.jsx)(p, {}),
                                      (0, o.jsx)("span", {
                                        children: "Checking...",
                                      }),
                                    ],
                                  })
                                : (0, o.jsxs)(o.Fragment, {
                                    children: [
                                      (0, o.jsx)(N, {}),
                                      (0, o.jsx)("span", {
                                        children: "I've connected, refresh",
                                      }),
                                    ],
                                  }),
                            }),
                          ],
                        }),
                        (0, o.jsx)("p", {
                          className: "embark-privacy-note",
                          children:
                            "We only access your Embark ID and display name. Your credentials are never stored.",
                        }),
                      ],
                    }),
            ],
          });
        },
      ],
      38115,
    );
    var f = e.i(63903);
    let y = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("path", {
              d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
            }),
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "7",
              r: "4",
            }),
          ],
        }),
      g = ({ level: e, progress: s, isMaxLevel: a, isLoading: t }) => {
        let r = 2 * Math.PI * 20.5;
        return (0, o.jsxs)("div", {
          className: `level-ring${t ? " level-ring--syncing" : ""}`,
          title: a ? `Level ${e} (Max)` : `Level ${e} - ${s}%`,
          children: [
            (0, o.jsxs)("svg", {
              width: 44,
              height: 44,
              className: "level-ring-svg",
              children: [
                (0, o.jsx)("circle", {
                  cx: 22,
                  cy: 22,
                  r: 20.5,
                  fill: "rgba(0, 0, 0, 0.4)",
                  stroke: "rgba(255, 255, 255, 0.1)",
                  strokeWidth: 3,
                }),
                !a &&
                  (0, o.jsx)("circle", {
                    cx: 22,
                    cy: 22,
                    r: 20.5,
                    fill: "none",
                    stroke: "#f5a623",
                    strokeWidth: 3,
                    strokeLinecap: "round",
                    strokeDasharray: r,
                    strokeDashoffset: r - (s / 100) * r,
                    transform: "rotate(-90 22 22)",
                    className: "level-ring-progress",
                  }),
                a &&
                  (0, o.jsx)("circle", {
                    cx: 22,
                    cy: 22,
                    r: 20.5,
                    fill: "none",
                    stroke: "#f5a623",
                    strokeWidth: 3,
                  }),
              ],
            }),
            (0, o.jsx)("span", {
              className: "level-ring-number",
              children: e,
            }),
          ],
        });
      };
    e.s(
      [
        "default",
        0,
        ({ className: e, publicData: s, levelStats: a, levelLoading: t }) => {
          let { user: r } = (0, f.useAuth)(),
            { connection: n } = (0, h.useEmbark)();
          if (s) {
            var l, i;
            let a =
                ((l = s.displayName),
                (i = s.displayNameDiscriminator),
                l ? (i ? `${l}#${i}` : l) : "Unknown"),
              t = s.level;
            return (0, o.jsxs)("div", {
              className: `profile-section ${e ?? ""}`,
              children: [
                t &&
                  (0, o.jsxs)("div", {
                    className: "profile-level-ring-wrapper",
                    children: [
                      (0, o.jsx)(g, {
                        level: t.level,
                        progress: t.progressPercent || 100 * !!t.isMaxLevel,
                        isMaxLevel: t.isMaxLevel || 0 === t.xpForNextLevel,
                      }),
                      t.currentXp > 0 &&
                        (0, o.jsx)("div", {
                          className: "level-xp-text",
                          children:
                            t.isMaxLevel || 0 === t.xpForNextLevel
                              ? `${t.currentXp.toLocaleString()} XP`
                              : `${t.xpIntoLevel.toLocaleString()}/${t.xpForNextLevel.toLocaleString()}`,
                        }),
                    ],
                  }),
                (0, o.jsxs)("div", {
                  className: "profile-header",
                  children: [
                    (0, o.jsx)("div", {
                      className: "profile-avatar-wrapper",
                      children: s.avatarUrl
                        ? (0, o.jsx)("img", {
                            src: s.avatarUrl,
                            alt: "Profile",
                            className: "profile-avatar",
                            referrerPolicy: "no-referrer",
                          })
                        : (0, o.jsx)("div", {
                            className:
                              "profile-avatar profile-avatar--placeholder",
                            children: (0, o.jsx)(y, {}),
                          }),
                    }),
                    (0, o.jsxs)("div", {
                      className: "profile-info",
                      children: [
                        (0, o.jsx)("h2", {
                          className: "profile-name",
                          children: a,
                        }),
                        (0, o.jsxs)("div", {
                          className: "profile-badges-row",
                          children: [
                            s.platform &&
                              (0, o.jsx)("div", {
                                className: "profile-embark-id",
                                children: (0, o.jsx)("span", {
                                  className: "embark-badge",
                                  children: s.platform.toUpperCase(),
                                }),
                              }),
                            null != s.totalViews &&
                              s.totalViews > 0 &&
                              (0, o.jsxs)("span", {
                                className: "profile-views-text",
                                children: [
                                  (0, o.jsxs)("svg", {
                                    width: "12",
                                    height: "12",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                      (0, o.jsx)("path", {
                                        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
                                      }),
                                      (0, o.jsx)("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "3",
                                      }),
                                    ],
                                  }),
                                  s.totalViews.toLocaleString(),
                                  " ",
                                  1 === s.totalViews ? "view" : "views",
                                ],
                              }),
                          ],
                        }),
                        s.lastUpdated &&
                          (0, o.jsxs)("span", {
                            className: "profile-updated-text",
                            children: ["Updated ", s.lastUpdated],
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }
          let d = n?.isConnected ?? !1,
            [m, u] = (0, c.useState)(!1),
            x = r?.user_metadata?.avatar_url ?? r?.user_metadata?.picture,
            p =
              r?.user_metadata?.full_name ??
              r?.user_metadata?.name ??
              r?.email ??
              "Raider",
            j = n?.displayName ?? null,
            v = n?.displayNameDiscriminator ?? null;
          return (0, o.jsxs)("div", {
            className: `profile-section ${e ?? ""}`,
            children: [
              d &&
                (0, o.jsxs)("div", {
                  className: "profile-level-ring-wrapper",
                  children: [
                    (0, o.jsx)(g, {
                      level: a?.level ?? 0,
                      progress: a?.progressPercent ?? 0,
                      isMaxLevel: a?.isMaxLevel ?? !1,
                      isLoading: t,
                    }),
                    a &&
                      (0, o.jsx)("div", {
                        className: "level-xp-text",
                        children: a.isMaxLevel
                          ? `${a.currentXp.toLocaleString()} XP`
                          : `${a.xpIntoLevel.toLocaleString()}/${a.xpForNextLevel.toLocaleString()}`,
                      }),
                  ],
                }),
              (0, o.jsxs)("div", {
                className: "profile-header",
                children: [
                  (0, o.jsx)("div", {
                    className: "profile-avatar-wrapper",
                    children: x
                      ? (0, o.jsx)("img", {
                          src: x,
                          alt: "Profile",
                          className: "profile-avatar",
                          referrerPolicy: "no-referrer",
                        })
                      : (0, o.jsx)("div", {
                          className:
                            "profile-avatar profile-avatar--placeholder",
                          children: (0, o.jsx)(y, {}),
                        }),
                  }),
                  (0, o.jsxs)("div", {
                    className: "profile-info",
                    children: [
                      (0, o.jsx)("h2", {
                        className: "profile-name",
                        children: p,
                      }),
                      d &&
                        (0, o.jsxs)("div", {
                          className: "profile-embark-id",
                          children: [
                            (0, o.jsx)("span", {
                              className: "embark-badge",
                              children: "EMBARK",
                            }),
                            (0, o.jsxs)("span", {
                              className: "embark-name",
                              children: [
                                j ?? "Unknown",
                                v &&
                                  (0, o.jsxs)(o.Fragment, {
                                    children: [
                                      " ",
                                      (0, o.jsxs)("span", {
                                        className: "discriminator-wrapper",
                                        onClick: () => u(!m),
                                        title: m
                                          ? "Click to hide discriminator"
                                          : "Click to reveal discriminator",
                                        children: [
                                          "#",
                                          (0, o.jsx)("span", {
                                            className: m
                                              ? "discriminator-visible"
                                              : "discriminator-hidden",
                                            children: v,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
      ],
      62793,
    );
    var k = e.i(7481),
      b = e.i(95588),
      w = e.i(52604),
      S = e.i(30906),
      C = e.i(84604);
    let L = function ({
      value: e,
      onChange: s,
      options: a,
      className: t = "",
    }) {
      return (0, o.jsx)("select", {
        value: e,
        onChange: (e) => s(e.target.value),
        className: `filter-dropdown ${t}`,
        children: a.map((e) =>
          (0, o.jsx)(
            "option",
            {
              value: e.value,
              children: e.label,
            },
            e.value,
          ),
        ),
      });
    };
    (e.i(9019), e.s([], 87798), e.s(["FilterDropdown", 0, L], 54447));
    let M = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("line", {
              x1: "16.5",
              y1: "9.4",
              x2: "7.5",
              y2: "4.21",
            }),
            (0, o.jsx)("path", {
              d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
            }),
            (0, o.jsx)("polyline", {
              points: "3.27 6.96 12 12.01 20.73 6.96",
            }),
            (0, o.jsx)("line", {
              x1: "12",
              y1: "22.08",
              x2: "12",
              y2: "12",
            }),
          ],
        }),
      A = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("polyline", {
              points: "23 4 23 10 17 10",
            }),
            (0, o.jsx)("polyline", {
              points: "1 20 1 14 7 14",
            }),
            (0, o.jsx)("path", {
              d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
            }),
          ],
        }),
      E = () =>
        (0, o.jsxs)("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          className: "spinner-icon",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
              opacity: "0.25",
            }),
            (0, o.jsx)("path", {
              d: "M12 2a10 10 0 0 1 10 10",
            }),
          ],
        }),
      R = () =>
        (0, o.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("circle", {
              cx: "11",
              cy: "11",
              r: "8",
            }),
            (0, o.jsx)("path", {
              d: "m21 21-4.35-4.35",
            }),
          ],
        }),
      I = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, o.jsx)("path", {
              d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
            }),
            (0, o.jsx)("line", {
              x1: "12",
              y1: "17",
              x2: "12.01",
              y2: "17",
            }),
          ],
        }),
      T = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "8",
            }),
            (0, o.jsx)("line", {
              x1: "9",
              y1: "2",
              x2: "9",
              y2: "22",
            }),
            (0, o.jsx)("line", {
              x1: "15",
              y1: "2",
              x2: "15",
              y2: "22",
            }),
          ],
        }),
      P = new Set([-0x358d18e3, 0x760344e3, 0x3820271f]),
      B = [
        {
          value: "all",
          label: "All Items",
        },
        {
          value: "Common",
          label: "Common",
        },
        {
          value: "Uncommon",
          label: "Uncommon",
        },
        {
          value: "Rare",
          label: "Rare",
        },
        {
          value: "Epic",
          label: "Epic",
        },
        {
          value: "Legendary",
          label: "Legendary",
        },
        {
          value: "blueprint",
          label: "Blueprint",
        },
      ],
      $ = [
        {
          value: "all",
          label: "Any Status",
        },
        {
          value: "needed",
          label: "Needed",
        },
        {
          value: "safe",
          label: "Safe",
        },
      ];
    e.s(
      [
        "default",
        0,
        ({
          className: e,
          hideRefreshButton: s,
          externalLoading: a,
          refreshTrigger: t,
          publicItems: r,
          isPublicView: n,
          publicStashStats: l,
        }) => {
          let i,
            { connection: d } = (0, h.useEmbark)(),
            m = !!n || (d?.isConnected ?? !1),
            [u, x] = (0, c.useState)([]),
            [p, j] = (0, c.useState)(!0),
            [v, N] = (0, c.useState)(null),
            [f, y] = (0, c.useState)({
              total: 0,
              stashUsed: 0,
              stashMax: 0,
              mapped: 0,
              unmapped: 0,
              totalScrapValue: 0,
            }),
            [g, D] = (0, c.useState)(null),
            _ = (0, c.useRef)(!1),
            [W, V] = (0, c.useState)(""),
            [K, O] = (0, c.useState)("all"),
            [U, F] = (0, c.useState)("all"),
            { analysisMap: H, hasProgressData: Y } = (0, c.useMemo)(() => {
              if (0 === u.length)
                return {
                  analysisMap: null,
                  hasProgressData: !1,
                };
              let e = (0, w.getCachedProgressSync)();
              return e
                ? {
                    analysisMap: (function (e, s, a, t, r) {
                      let n = new Map(),
                        l = (e, s, a) => {
                          let t = e.toLowerCase(),
                            r = n.get(t);
                          r
                            ? ((r.totalNeeded += s), r.reasons.push(a))
                            : n.set(t, {
                                totalNeeded: s,
                                reasons: [a],
                              });
                        };
                      for (let e of S.QUEST_REQUIREMENTS)
                        if (!s.has(e.gameAssetId))
                          for (let s of e.items)
                            l(s.itemName, s.quantity, {
                              source: "quest",
                              label: e.questName,
                              quantityNeeded: s.quantity,
                            });
                      for (let e of S.HIDEOUT_REQUIREMENTS) {
                        let s = S.STATION_TO_MODULE[e.stationName];
                        if ((s ? (a[s] ?? 0) : 0) >= e.level) continue;
                        let t = `${e.stationName} L${e.level}`;
                        for (let s of e.items)
                          l(s.itemName, s.quantity, {
                            source: "hideout",
                            label: t,
                            quantityNeeded: s.quantity,
                          });
                      }
                      let i = r + 1;
                      for (let e of S.PROJECT_REQUIREMENTS) {
                        let s = `${e.projectName}-${e.phaseName}`;
                        if (t.has(s)) continue;
                        let a = e.projectName.match(/Expedition Project (\d+)/);
                        if (a && parseInt(a[1], 10) > i) continue;
                        let r = `${e.projectName} — ${e.phaseName}`;
                        for (let s of e.items)
                          l(s.itemName, s.quantity, {
                            source: "project",
                            label: r,
                            quantityNeeded: s.quantity,
                          });
                      }
                      let o = new Map();
                      for (let s of e) {
                        let e = s.name?.toLowerCase();
                        if (!e || !s.isMapped) {
                          o.set(s.gameAssetId, {
                            recommendation: "safe",
                            reasons: [],
                            totalNeeded: 0,
                            surplus: s.totalAmount,
                          });
                          continue;
                        }
                        let a = n.get(e);
                        if (!a || a.totalNeeded <= 0)
                          o.set(s.gameAssetId, {
                            recommendation: "safe",
                            reasons: [],
                            totalNeeded: 0,
                            surplus: s.totalAmount,
                          });
                        else {
                          let e = Math.max(0, s.totalAmount - a.totalNeeded);
                          o.set(s.gameAssetId, {
                            recommendation: "needed",
                            reasons: a.reasons,
                            totalNeeded: a.totalNeeded,
                            surplus: e,
                          });
                        }
                      }
                      return o;
                    })(
                      u,
                      e.completedQuestIds,
                      e.hideoutModuleLevels,
                      e.completedProjectPhases,
                      e.expeditionStatus?.completedExpeditions ?? 0,
                    ),
                    hasProgressData: !0,
                  }
                : {
                    analysisMap: null,
                    hasProgressData: !1,
                  };
            }, [u, t]),
            [q, z] = (0, c.useState)(null),
            G = (0, c.useCallback)((e, s) => {
              let a = e.currentTarget.getBoundingClientRect();
              z({
                gameAssetId: s.gameAssetId,
                top: a.top,
                left: a.left + a.width / 2,
                totalAmount: s.totalAmount,
              });
            }, []),
            Q = (0, c.useCallback)(() => {
              z(null);
            }, []);
          (0, c.useEffect)(() => {
            let e = () => {
              let e = (0, k.getInventoryCacheTimestamp)();
              e && D((0, b.formatTimeAgo)(e));
            };
            e();
            let s = setInterval(e, 6e4);
            return () => clearInterval(s);
          }, [u]);
          let X = (0, c.useCallback)((e) => {
              let s = e.items.filter((e) => !P.has(e.gameAssetId));
              x(s);
              let a = (0, k.calculateTotalScrapValue)(s);
              y({
                total: s.length,
                stashUsed: e.stashUsed,
                stashMax: e.stashMax,
                mapped: s.filter((e) => e.isMapped).length,
                unmapped: s.filter((e) => !e.isMapped).length,
                totalScrapValue: a,
              });
              let t = (0, k.getInventoryCacheTimestamp)();
              t && D((0, b.formatTimeAgo)(t));
            }, []),
            J = (0, c.useCallback)(
              async (e = !1) => {
                if (m) {
                  (j(!0), N(null));
                  try {
                    e && (0, k.clearInventoryCache)();
                    let s = await (0, k.fetchInventory)(e);
                    X(s);
                  } catch (e) {
                    (console.error(
                      "[InventorySection] Failed to load inventory:",
                      e,
                    ),
                      N(
                        e instanceof Error
                          ? e.message
                          : "Failed to load inventory",
                      ));
                  } finally {
                    j(!1);
                  }
                }
              },
              [m, X],
            );
          ((0, c.useEffect)(() => {
            if (n && r) {
              let e,
                s = r
                  .map((e) => ({
                    ...e,
                    instances: [],
                  }))
                  .filter((e) => !P.has(e.gameAssetId));
              (x(s),
                (e = l?.totalScrapValue || (0, k.calculateSimpleScrapValue)(s)),
                y({
                  total: l?.totalItems ?? s.length,
                  stashUsed: l?.stashUsed ?? 0,
                  stashMax: l?.stashMax ?? 0,
                  mapped: s.filter((e) => e.isMapped).length,
                  unmapped: s.filter((e) => !e.isMapped).length,
                  totalScrapValue: e,
                }),
                j(!1),
                (0, k.enrichItemIcons)(s).then((e) => {
                  e !== s && x(e);
                }));
              return;
            }
          }, [n, r, l]),
            (0, c.useEffect)(() => {
              if (n) return;
              if (!m) return void j(!1);
              if (_.current) return;
              _.current = !0;
              let e = (0, k.getCachedInventory)();
              e
                ? (console.log("[InventorySection] Loading from cache"),
                  X(e.data),
                  D((0, b.formatTimeAgo)(e.timestamp)),
                  j(!1))
                : (console.log(
                    "[InventorySection] No cache found, fetching from API",
                  ),
                  J());
            }, [n, m, X, J]),
            (0, c.useEffect)(() => {
              m ||
                ((_.current = !1),
                x([]),
                y({
                  total: 0,
                  stashUsed: 0,
                  stashMax: 0,
                  mapped: 0,
                  unmapped: 0,
                  totalScrapValue: 0,
                }),
                D(null));
            }, [m]),
            (0, c.useEffect)(() => {
              if (t && t > 0 && m) {
                let e = (0, k.getCachedInventory)();
                e &&
                  (console.log(
                    "[InventorySection] Reloading from cache after parent sync",
                  ),
                  X(e.data));
              }
            }, [t, m, X]));
          let Z = (0, c.useMemo)(() => {
            let e = u;
            return (
              (e = (0, k.filterByRarity)(e, K)),
              (e = (0, k.searchInventory)(e, W)),
              "all" !== U &&
                H &&
                (e = e.filter((e) => {
                  let s = H.get(e.gameAssetId);
                  return s ? s.recommendation === U : "safe" === U;
                })),
              e
            );
          }, [u, K, W, U, H]);
          return (0, o.jsxs)("div", {
            className: `inventory-section ${e ?? ""}`,
            children: [
              (0, o.jsxs)("div", {
                className: "section-header",
                children: [
                  (0, o.jsx)("div", {
                    className: "section-icon",
                    children: (0, o.jsx)(M, {}),
                  }),
                  (0, o.jsxs)("div", {
                    className: "section-title-wrapper",
                    children: [
                      (0, o.jsx)("h3", {
                        className: "section-title",
                        children: "Inventory",
                      }),
                      m &&
                        !p &&
                        u.length > 0 &&
                        (0, o.jsxs)(o.Fragment, {
                          children: [
                            (0, o.jsxs)("span", {
                              className: "section-status inventory-stats",
                              children: [f.stashUsed, "/", f.stashMax],
                            }),
                            f.totalScrapValue > 0 &&
                              (0, o.jsxs)("span", {
                                className: "inventory-value",
                                title:
                                  "Total sell value of all items in your stash",
                                children: [
                                  (0, o.jsx)("span", {
                                    className: "inventory-value-label",
                                    children: "Total Stash Value: ",
                                  }),
                                  (0, o.jsx)(T, {
                                    className: "inventory-value-icon",
                                  }),
                                  f.totalScrapValue.toLocaleString(),
                                ],
                              }),
                          ],
                        }),
                    ],
                  }),
                  m &&
                    !s &&
                    (0, o.jsxs)("div", {
                      className: "section-header-actions",
                      children: [
                        g &&
                          (0, o.jsx)("span", {
                            className: "last-synced-text",
                            title: "Last synced time",
                            children: g,
                          }),
                        (0, o.jsx)("button", {
                          className: "inventory-refresh-btn",
                          onClick: () => J(!0),
                          disabled: p || a,
                          title: "Refresh inventory",
                          children: (0, o.jsx)(A, {
                            className: p || a ? "spinning" : "",
                          }),
                        }),
                      ],
                    }),
                ],
              }),
              (0, o.jsx)("div", {
                className: "inventory-content",
                children: m
                  ? p && 0 === u.length
                    ? (0, o.jsxs)("div", {
                        className: "inventory-loading",
                        children: [
                          (0, o.jsx)(E, {}),
                          (0, o.jsx)("span", {
                            children: "Loading inventory...",
                          }),
                        ],
                      })
                    : v
                      ? (0, o.jsxs)("div", {
                          className: "inventory-error",
                          children: [
                            (0, o.jsx)("p", {
                              children: v,
                            }),
                            (0, o.jsx)("button", {
                              className: "inventory-retry-btn",
                              onClick: () => J(),
                              children: "Try Again",
                            }),
                          ],
                        })
                      : 0 === u.length
                        ? (0, o.jsxs)("div", {
                            className: "inventory-empty",
                            children: [
                              (0, o.jsx)(M, {
                                className: "placeholder-icon",
                              }),
                              (0, o.jsx)("p", {
                                children: "No items found in your inventory",
                              }),
                            ],
                          })
                        : (0, o.jsxs)(o.Fragment, {
                            children: [
                              !n &&
                                !Y &&
                                (0, o.jsxs)("div", {
                                  className: "inventory-sync-banner",
                                  children: [
                                    (0, o.jsxs)("svg", {
                                      width: "16",
                                      height: "16",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      stroke: "currentColor",
                                      strokeWidth: "2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      children: [
                                        (0, o.jsx)("circle", {
                                          cx: "12",
                                          cy: "12",
                                          r: "10",
                                        }),
                                        (0, o.jsx)("line", {
                                          x1: "12",
                                          y1: "8",
                                          x2: "12",
                                          y2: "12",
                                        }),
                                        (0, o.jsx)("line", {
                                          x1: "12",
                                          y1: "16",
                                          x2: "12.01",
                                          y2: "16",
                                        }),
                                      ],
                                    }),
                                    (0, o.jsxs)("span", {
                                      children: [
                                        "Sync your progress on the ",
                                        (0, o.jsx)("strong", {
                                          children: "Cheat Sheet",
                                        }),
                                        " page to see which items you still need to look out for.",
                                      ],
                                    }),
                                  ],
                                }),
                              (0, o.jsxs)("div", {
                                className: "inventory-filters",
                                children: [
                                  (0, o.jsxs)("div", {
                                    className: "inventory-search",
                                    children: [
                                      (0, o.jsx)(R, {}),
                                      (0, o.jsx)("input", {
                                        type: "text",
                                        placeholder: "Search items...",
                                        value: W,
                                        onChange: (e) => V(e.target.value),
                                        className: "inventory-search-input",
                                      }),
                                    ],
                                  }),
                                  (0, o.jsx)("div", {
                                    className: "inventory-rarity-filter",
                                    children: (0, o.jsx)(L, {
                                      value: K,
                                      onChange: O,
                                      options: B,
                                    }),
                                  }),
                                  Y &&
                                    !n &&
                                    (0, o.jsx)("div", {
                                      className: "inventory-cleanup-filter",
                                      children: (0, o.jsx)(L, {
                                        value: U,
                                        onChange: F,
                                        options: $,
                                      }),
                                    }),
                                ],
                              }),
                              (0, o.jsxs)("div", {
                                className: "inventory-results-count",
                                children: [
                                  "Showing ",
                                  Z.length,
                                  " of ",
                                  u.length,
                                  " items",
                                ],
                              }),
                              (0, o.jsx)("div", {
                                className: "inventory-grid",
                                children: Z.map((e) => {
                                  let s = H?.get(e.gameAssetId),
                                    a = s?.recommendation === "needed" && !n;
                                  return (0, o.jsxs)(
                                    "div",
                                    {
                                      className: `inventory-item ${!e.isMapped ? "inventory-item--unmapped" : ""} ${a ? "inventory-item--needed" : ""}`,
                                      style: {
                                        "--rarity-color": e.isMapped
                                          ? (0, k.isBlueprint)(e)
                                            ? C.BLUEPRINT_COLOR
                                            : (e.rarity &&
                                                C.RARITY_COLORS[e.rarity]) ||
                                              "#9e9e9e"
                                          : "#666",
                                      },
                                      onMouseEnter: a ? (s) => G(s, e) : void 0,
                                      onMouseLeave: a ? Q : void 0,
                                      children: [
                                        (0, o.jsx)("div", {
                                          className: "inventory-item-icon",
                                          children: e.icon
                                            ? (0, o.jsx)("img", {
                                                src: e.icon,
                                                alt: e.name || "Unknown",
                                              })
                                            : (0, o.jsx)(I, {
                                                className:
                                                  "inventory-item-placeholder-icon",
                                              }),
                                        }),
                                        (0, o.jsxs)("div", {
                                          className: "inventory-item-info",
                                          children: [
                                            (0, o.jsx)("span", {
                                              className: "inventory-item-name",
                                              children:
                                                e.name || "Unknown Item",
                                            }),
                                            !e.isMapped &&
                                              (0, o.jsxs)("span", {
                                                className: "inventory-item-id",
                                                children: [
                                                  "ID: ",
                                                  e.gameAssetId,
                                                ],
                                              }),
                                            e.itemType &&
                                              (0, o.jsx)("span", {
                                                className:
                                                  "inventory-item-type",
                                                children: e.itemType,
                                              }),
                                          ],
                                        }),
                                        (0, o.jsxs)("div", {
                                          className: "inventory-item-amount",
                                          children: ["x", e.totalAmount],
                                        }),
                                        (0, k.isBlueprint)(e)
                                          ? (0, o.jsx)("div", {
                                              className:
                                                "inventory-item-rarity inventory-item-rarity--blueprint",
                                              style: {
                                                backgroundColor:
                                                  C.BLUEPRINT_COLOR,
                                              },
                                              children: "Blueprint",
                                            })
                                          : e.rarity &&
                                            (0, o.jsx)("div", {
                                              className:
                                                "inventory-item-rarity",
                                              style: {
                                                backgroundColor:
                                                  C.RARITY_COLORS[e.rarity],
                                              },
                                              children: e.rarity,
                                            }),
                                      ],
                                    },
                                    e.gameAssetId,
                                  );
                                }),
                              }),
                              q &&
                                H &&
                                ((i = H.get(q.gameAssetId))
                                  ? (0, o.jsxs)("div", {
                                      className: "inventory-needed-tooltip",
                                      style: {
                                        top: q.top,
                                        left: q.left,
                                      },
                                      children: [
                                        (0, o.jsx)("div", {
                                          className: "inventory-tooltip-header",
                                          children: "Needed for progression",
                                        }),
                                        (0, o.jsx)("div", {
                                          className: "inventory-tooltip-rows",
                                          children: i.reasons.map((e, s) =>
                                            (0, o.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "inventory-tooltip-row",
                                                children: [
                                                  (0, o.jsx)("span", {
                                                    className: `inventory-tooltip-source inventory-tooltip-source--${e.source}`,
                                                    children:
                                                      "quest" === e.source
                                                        ? "Quest"
                                                        : "hideout" === e.source
                                                          ? "Hideout"
                                                          : "Project",
                                                  }),
                                                  (0, o.jsx)("span", {
                                                    className:
                                                      "inventory-tooltip-label",
                                                    children: e.label,
                                                  }),
                                                  (0, o.jsxs)("span", {
                                                    className:
                                                      "inventory-tooltip-qty",
                                                    children: [
                                                      "x",
                                                      e.quantityNeeded,
                                                    ],
                                                  }),
                                                ],
                                              },
                                              s,
                                            ),
                                          ),
                                        }),
                                        (0, o.jsxs)("div", {
                                          className:
                                            "inventory-tooltip-progress",
                                          children: [
                                            (0, o.jsxs)("div", {
                                              className:
                                                "inventory-tooltip-stats",
                                              children: [
                                                (0, o.jsxs)("span", {
                                                  className: `inventory-tooltip-have ${q.totalAmount >= i.totalNeeded ? "inventory-tooltip-have--enough" : "inventory-tooltip-have--short"}`,
                                                  children: [
                                                    "Have: ",
                                                    q.totalAmount,
                                                  ],
                                                }),
                                                (0, o.jsxs)("span", {
                                                  className:
                                                    "inventory-tooltip-need",
                                                  children: [
                                                    "Need: ",
                                                    i.totalNeeded,
                                                  ],
                                                }),
                                                i.surplus > 0 &&
                                                  (0, o.jsxs)("span", {
                                                    className:
                                                      "inventory-tooltip-surplus",
                                                    children: [
                                                      i.surplus,
                                                      " safe to sell",
                                                    ],
                                                  }),
                                              ],
                                            }),
                                            (0, o.jsx)("div", {
                                              className:
                                                "inventory-tooltip-bar",
                                              children: (0, o.jsx)("div", {
                                                className: `inventory-tooltip-bar-fill ${q.totalAmount >= i.totalNeeded ? "inventory-tooltip-bar-fill--enough" : "inventory-tooltip-bar-fill--short"}`,
                                                style: {
                                                  width: `${Math.min(100, (q.totalAmount / i.totalNeeded) * 100)}%`,
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    })
                                  : null),
                              0 === Z.length &&
                                (0, o.jsx)("div", {
                                  className: "inventory-no-results",
                                  children: (0, o.jsx)("p", {
                                    children: "No items match your filters",
                                  }),
                                }),
                            ],
                          })
                  : (0, o.jsxs)("div", {
                      className: "inventory-placeholder",
                      children: [
                        (0, o.jsx)(M, {
                          className: "placeholder-icon",
                        }),
                        (0, o.jsx)("p", {
                          className: "placeholder-text",
                          children:
                            "Connect your Embark account to sync your inventory",
                        }),
                      ],
                    }),
              }),
            ],
          });
        },
      ],
      2276,
    );
    let D = {
      workshop: {
        icon: ({ className: e }) =>
          (0, o.jsxs)("svg", {
            className: e,
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              (0, o.jsx)("path", {
                d: "M2 20h20",
              }),
              (0, o.jsx)("path", {
                d: "M4 20V9l8-5 8 5v11",
              }),
              (0, o.jsx)("rect", {
                x: "9",
                y: "13",
                width: "6",
                height: "7",
              }),
            ],
          }),
        title: "Hideout",
        description: "Track your hideout upgrade progress",
        color: "var(--color-workshop)",
      },
      quests: {
        icon: ({ className: e }) =>
          (0, o.jsxs)("svg", {
            className: e,
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              (0, o.jsx)("path", {
                d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
              }),
              (0, o.jsx)("polyline", {
                points: "14 2 14 8 20 8",
              }),
              (0, o.jsx)("line", {
                x1: "16",
                y1: "13",
                x2: "8",
                y2: "13",
              }),
              (0, o.jsx)("line", {
                x1: "16",
                y1: "17",
                x2: "8",
                y2: "17",
              }),
              (0, o.jsx)("polyline", {
                points: "10 9 9 9 8 9",
              }),
            ],
          }),
        title: "Quests",
        description: "Monitor your quest completion",
        color: "var(--color-quests)",
      },
      projects: {
        icon: ({ className: e }) =>
          (0, o.jsxs)("svg", {
            className: e,
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              (0, o.jsx)("polygon", {
                points: "12 2 2 7 12 12 22 7 12 2",
              }),
              (0, o.jsx)("polyline", {
                points: "2 17 12 22 22 17",
              }),
              (0, o.jsx)("polyline", {
                points: "2 12 12 17 22 12",
              }),
            ],
          }),
        title: "Projects & Expeditions",
        description: "View your expedition and projects status",
        color: "var(--color-projects)",
      },
    };
    e.s(
      [
        "default",
        0,
        ({
          type: e,
          progress: s,
          isConnected: a,
          isComingSoon: t = !0,
          isLoading: r = !1,
          className: n,
          subItems: l,
        }) => {
          let i = D[e],
            c = i.icon;
          return (0, o.jsxs)("div", {
            className: `progress-card ${n ?? ""}`,
            style: {
              "--progress-color": i.color,
            },
            children: [
              (0, o.jsxs)("div", {
                className: "progress-card-header",
                children: [
                  (0, o.jsx)("div", {
                    className: "progress-card-icon",
                    children: (0, o.jsx)(c, {}),
                  }),
                  (0, o.jsxs)("div", {
                    className: "progress-card-info",
                    children: [
                      (0, o.jsx)("h4", {
                        className: "progress-card-title",
                        children: i.title,
                      }),
                      t &&
                        (0, o.jsx)("span", {
                          className: "coming-soon-badge",
                          children: "Coming Soon",
                        }),
                      a &&
                        !t &&
                        !r &&
                        void 0 !== s &&
                        (0, o.jsxs)("span", {
                          className: "progress-card-percentage",
                          children: [s, "% Complete"],
                        }),
                    ],
                  }),
                ],
              }),
              a
                ? r
                  ? (0, o.jsxs)("div", {
                      className: "progress-card-loading",
                      children: [
                        (0, o.jsx)("div", {
                          className: "progress-card-spinner",
                        }),
                        (0, o.jsx)("span", {
                          children: "Loading...",
                        }),
                      ],
                    })
                  : t
                    ? null
                    : (0, o.jsxs)(o.Fragment, {
                        children: [
                          (0, o.jsx)("div", {
                            className: "progress-card-bar-wrapper",
                            children: (0, o.jsx)("div", {
                              className: "progress-card-bar",
                              children: (0, o.jsx)("div", {
                                className: "progress-card-bar-fill",
                                style: {
                                  width: `${s ?? 0}%`,
                                },
                              }),
                            }),
                          }),
                          l &&
                            l.length > 0 &&
                            (0, o.jsx)("div", {
                              className: "progress-card-subitems",
                              children: l.map((e) =>
                                (0, o.jsxs)(
                                  "div",
                                  {
                                    className: "progress-card-subitem",
                                    children: [
                                      (0, o.jsxs)("div", {
                                        className:
                                          "progress-card-subitem-header",
                                        children: [
                                          (0, o.jsx)("span", {
                                            className:
                                              "progress-card-subitem-name",
                                            children: e.name,
                                          }),
                                          (0, o.jsx)("span", {
                                            className:
                                              "progress-card-subitem-pct",
                                            children:
                                              e.label ?? `${e.percentage}%`,
                                          }),
                                        ],
                                      }),
                                      (0, o.jsx)("div", {
                                        className: "progress-card-subitem-bar",
                                        children: (0, o.jsx)("div", {
                                          className:
                                            "progress-card-subitem-bar-fill",
                                          style: {
                                            width: `${e.percentage}%`,
                                          },
                                        }),
                                      }),
                                    ],
                                  },
                                  e.name,
                                ),
                              ),
                            }),
                        ],
                      })
                : (0, o.jsx)("div", {
                    className: "progress-card-disabled",
                    children: (0, o.jsx)("span", {
                      children: "Connect Embark to view",
                    }),
                  }),
              (0, o.jsx)("p", {
                className: "progress-card-description",
                children: i.description,
              }),
            ],
          });
        },
      ],
      48192,
    );
    let _ = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "8",
            }),
            (0, o.jsx)("line", {
              x1: "9",
              y1: "2",
              x2: "9",
              y2: "22",
            }),
            (0, o.jsx)("line", {
              x1: "15",
              y1: "2",
              x2: "15",
              y2: "22",
            }),
          ],
        }),
      W = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "8",
            }),
            (0, o.jsx)("path", {
              d: "M15 9.5a4 4 0 1 0 0 5",
            }),
            (0, o.jsx)("line", {
              x1: "8",
              y1: "12",
              x2: "16",
              y2: "12",
            }),
          ],
        }),
      V = ({ className: e }) =>
        (0, o.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "8",
            }),
            (0, o.jsx)("line", {
              x1: "8",
              y1: "8",
              x2: "16",
              y2: "16",
            }),
            (0, o.jsx)("line", {
              x1: "8",
              y1: "12",
              x2: "12",
              y2: "16",
            }),
            (0, o.jsx)("line", {
              x1: "12",
              y1: "8",
              x2: "16",
              y2: "12",
            }),
          ],
        }),
      K = () =>
        (0, o.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          className: "spinner-icon",
          children: [
            (0, o.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
              opacity: "0.25",
            }),
            (0, o.jsx)("path", {
              d: "M12 2a10 10 0 0 1 10 10",
            }),
          ],
        });
    e.s(
      [
        "default",
        0,
        ({ className: e, refreshTrigger: s, publicCurrencies: a }) => {
          let { connection: t } = (0, h.useEmbark)(),
            r = void 0 !== a || (t?.isConnected ?? !1),
            [n, l] = (0, c.useState)({
              coins: null,
              credits: null,
              raiderTokens: null,
            }),
            [i, d] = (0, c.useState)(!0),
            [m, u] = (0, c.useState)(null),
            x = (0, c.useRef)(!1),
            p = (0, c.useCallback)((e) => {
              let s = e.find((e) => -0x358d18e3 === e.gameAssetId),
                a = e.find((e) => 0x760344e3 === e.gameAssetId),
                t = e.find((e) => 0x3820271f === e.gameAssetId);
              l({
                coins: s?.totalAmount ?? null,
                credits: a?.totalAmount ?? null,
                raiderTokens: t?.totalAmount ?? null,
              });
            }, []),
            j = (0, c.useCallback)(async () => {
              if (r) {
                (d(!0), u(null));
                try {
                  let e = await (0, k.fetchInventory)();
                  p(e.items);
                } catch (e) {
                  (console.error(
                    "[AccountStatsCard] Failed to load currencies:",
                    e,
                  ),
                    u("Failed to load"));
                } finally {
                  d(!1);
                }
              }
            }, [r, p]);
          if (
            ((0, c.useEffect)(() => {
              if (!r) return void d(!1);
              if (x.current) return;
              x.current = !0;
              let e = (0, k.getCachedInventory)();
              e
                ? (console.log(
                    "[AccountStatsCard] Loading currencies from cached inventory",
                  ),
                  p(e.data.items),
                  d(!1))
                : (console.log(
                    "[AccountStatsCard] No cache found, fetching from API",
                  ),
                  j());
            }, [r, p, j]),
            (0, c.useEffect)(() => {
              if (s && s > 0 && r) {
                let e = (0, k.getCachedInventory)();
                e &&
                  (console.log(
                    "[AccountStatsCard] Reloading from cache after parent sync",
                  ),
                  p(e.data.items));
              }
            }, [s, r, p]),
            (0, c.useEffect)(() => {
              r ||
                ((x.current = !1),
                l({
                  coins: null,
                  credits: null,
                  raiderTokens: null,
                }));
            }, [r]),
            !r && !a)
          )
            return null;
          let v = a
              ? {
                  coins: a.coins,
                  credits: a.credits,
                  raiderTokens: a.raiderTokens,
                }
              : n,
            N = !a && i,
            f = a ? null : m;
          return (0, o.jsx)("div", {
            className: `account-stats-card ${e ?? ""}`,
            children: (0, o.jsxs)("div", {
              className: "account-stats-grid",
              children: [
                (0, o.jsxs)("div", {
                  className: "account-stat coins-stat",
                  children: [
                    (0, o.jsx)("div", {
                      className: "stat-icon",
                      children: (0, o.jsx)(_, {}),
                    }),
                    (0, o.jsxs)("div", {
                      className: "stat-info",
                      children: [
                        (0, o.jsx)("span", {
                          className: "stat-label",
                          children: "Coins",
                        }),
                        N
                          ? (0, o.jsx)("span", {
                              className: "stat-value stat-value--loading",
                              children: (0, o.jsx)(K, {}),
                            })
                          : f
                            ? (0, o.jsx)("span", {
                                className: "stat-value stat-value--error",
                                children: "--",
                              })
                            : null !== v.coins
                              ? (0, o.jsx)("span", {
                                  className: "stat-value",
                                  children: v.coins.toLocaleString(),
                                })
                              : (0, o.jsx)("span", {
                                  className: "stat-value stat-value--empty",
                                  children: "0",
                                }),
                      ],
                    }),
                  ],
                }),
                (0, o.jsxs)("div", {
                  className: "account-stat credits-stat",
                  children: [
                    (0, o.jsx)("div", {
                      className: "stat-icon",
                      children: (0, o.jsx)(W, {}),
                    }),
                    (0, o.jsxs)("div", {
                      className: "stat-info",
                      children: [
                        (0, o.jsx)("span", {
                          className: "stat-label",
                          children: "Credits",
                        }),
                        N
                          ? (0, o.jsx)("span", {
                              className: "stat-value stat-value--loading",
                              children: (0, o.jsx)(K, {}),
                            })
                          : f
                            ? (0, o.jsx)("span", {
                                className: "stat-value stat-value--error",
                                children: "--",
                              })
                            : null !== v.credits
                              ? (0, o.jsx)("span", {
                                  className: "stat-value",
                                  children: v.credits.toLocaleString(),
                                })
                              : (0, o.jsx)("span", {
                                  className: "stat-value stat-value--empty",
                                  children: "0",
                                }),
                      ],
                    }),
                  ],
                }),
                (0, o.jsxs)("div", {
                  className: "account-stat raider-tokens-stat",
                  children: [
                    (0, o.jsx)("div", {
                      className: "stat-icon",
                      children: (0, o.jsx)(V, {}),
                    }),
                    (0, o.jsxs)("div", {
                      className: "stat-info",
                      children: [
                        (0, o.jsx)("span", {
                          className: "stat-label",
                          children: "Raider Tokens",
                        }),
                        N
                          ? (0, o.jsx)("span", {
                              className: "stat-value stat-value--loading",
                              children: (0, o.jsx)(K, {}),
                            })
                          : f
                            ? (0, o.jsx)("span", {
                                className: "stat-value stat-value--error",
                                children: "--",
                              })
                            : null !== v.raiderTokens
                              ? (0, o.jsx)("span", {
                                  className: "stat-value",
                                  children: v.raiderTokens.toLocaleString(),
                                })
                              : (0, o.jsx)("span", {
                                  className: "stat-value stat-value--empty",
                                  children: "0",
                                }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        },
      ],
      62624,
    );
  },
  3945,
  37690,
  57263,
  26437,
  15930,
  87241,
  39175,
  (e) => {
    "use strict";
    e.i(38115);
    var s = e.i(62793),
      a = e.i(2276),
      t = e.i(48192);
    e.i(62624);
    var r = e.i(43476),
      n = e.i(71645),
      l = e.i(79857),
      i = e.i(95588),
      o = e.i(79059);
    let c = ({ extracted: e, died: s, size: a = 160 }) => {
        let t = e + s,
          n = (a - 16) / 2,
          l = 2 * Math.PI * n,
          i = a / 2,
          o = l * (t > 0 ? e / t : 0);
        return (0, r.jsxs)("div", {
          className: "survival-donut-chart",
          children: [
            (0, r.jsxs)("svg", {
              width: a,
              height: a,
              viewBox: `0 0 ${a} ${a}`,
              className: "donut-svg",
              children: [
                (0, r.jsx)("circle", {
                  cx: i,
                  cy: i,
                  r: n,
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.05)",
                  strokeWidth: 16,
                }),
                (0, r.jsx)("circle", {
                  cx: i,
                  cy: i,
                  r: n,
                  fill: "none",
                  stroke: "#ff6b6b",
                  strokeWidth: 16,
                  strokeDasharray: `${l - o} ${l}`,
                  strokeDashoffset: -o,
                  strokeLinecap: "round",
                  transform: `rotate(-90 ${i} ${i})`,
                  className: "donut-segment donut-segment--died",
                }),
                (0, r.jsx)("circle", {
                  cx: i,
                  cy: i,
                  r: n,
                  fill: "none",
                  stroke: "var(--color-embark, #00ff88)",
                  strokeWidth: 16,
                  strokeDasharray: `${o} ${l}`,
                  strokeDashoffset: 0,
                  strokeLinecap: "round",
                  transform: `rotate(-90 ${i} ${i})`,
                  className: "donut-segment donut-segment--extracted",
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "donut-center",
              children: [
                (0, r.jsxs)("span", {
                  className: "donut-percentage",
                  children: [(t > 0 ? (e / t) * 100 : 0).toFixed(1), "%"],
                }),
                (0, r.jsx)("span", {
                  className: "donut-label",
                  children: "Survival",
                }),
              ],
            }),
          ],
        });
      },
      d = {
        Spaceport: "#4a9eff",
        "The Blue Gate": "#00ff88",
        "Stella Montis": "#b388ff",
        "The Dam": "#ff9800",
        "Buried City": "#ff6b6b",
        "Riven Tides": "#1de9b6",
      },
      h = ({ roundsByMap: e, profitByMap: s }) => {
        let [a, t] = (0, n.useState)(!1),
          [l, i] = (0, n.useState)(new Set()),
          o = (0, n.useRef)(null),
          c = Object.entries(e)
            .filter(([e, s]) => s > 0)
            .sort((e, s) => s[1] - e[1]);
        if (
          ((0, n.useEffect)(() => {
            let e = new IntersectionObserver(
              ([e]) => {
                e.isIntersecting && !a && t(!0);
              },
              {
                threshold: 0.2,
              },
            );
            return (o.current && e.observe(o.current), () => e.disconnect());
          }, [a]),
          (0, n.useEffect)(() => {
            a &&
              c.forEach((e, s) => {
                setTimeout(() => {
                  i((e) => new Set(e).add(s));
                }, 100 * s);
              });
          }, [a, c.length]),
          0 === c.length)
        )
          return (0, r.jsx)("div", {
            className: "map-distribution-empty",
            children: (0, r.jsx)("span", {
              children: "No map data available",
            }),
          });
        let h = Math.max(...c.map(([e, s]) => s)),
          m = c.reduce((e, [s, a]) => e + a, 0);
        return (0, r.jsxs)("div", {
          ref: o,
          className: "map-distribution-chart",
          children: [
            (0, r.jsxs)("div", {
              className: "map-chart-header",
              children: [
                (0, r.jsx)("span", {
                  className: "map-chart-title",
                  children: "Map Breakdown",
                }),
                (0, r.jsxs)("span", {
                  className: "map-chart-total",
                  children: [m, " total rounds"],
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "map-chart-column-headers",
              children: [
                (0, r.jsx)("span", {
                  className: "map-chart-col-map",
                  children: "Map",
                }),
                (0, r.jsx)("span", {
                  className: "map-chart-col-bar",
                  children: "Rounds",
                }),
                s &&
                  Object.keys(s).length > 0 &&
                  (0, r.jsx)("span", {
                    className: "map-chart-col-profit",
                    children: "Avg Profit",
                  }),
              ],
            }),
            (0, r.jsx)("div", {
              className: "map-chart-bars",
              children: c.map(([e, a], t) => {
                let n = (a / h) * 100,
                  i = ((a / m) * 100).toFixed(1),
                  o = d[e] || "#666",
                  c = s?.[e],
                  u = l.has(t);
                return (0, r.jsxs)(
                  "div",
                  {
                    className: `map-bar-row ${u ? "map-bar-row--animated" : ""}`,
                    children: [
                      (0, r.jsxs)("div", {
                        className: "map-bar-label",
                        children: [
                          (0, r.jsx)("span", {
                            className: "map-bar-name",
                            children: e,
                          }),
                          (0, r.jsx)("span", {
                            className: "map-bar-count",
                            children: a,
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "map-bar-wrapper",
                        children: [
                          (0, r.jsx)("div", {
                            className: "map-bar-container",
                            children: (0, r.jsx)("div", {
                              className: "map-bar-fill",
                              style: {
                                width: u ? `${n}%` : "0%",
                                backgroundColor: o,
                              },
                            }),
                          }),
                          (0, r.jsxs)("span", {
                            className: "map-bar-percent",
                            children: [i, "%"],
                          }),
                        ],
                      }),
                      void 0 !== c &&
                        (0, r.jsxs)("div", {
                          className: `map-bar-profit ${c >= 0 ? "profit-positive" : "profit-negative"}`,
                          children: [c >= 0 ? "+" : "", c.toLocaleString()],
                        }),
                    ],
                  },
                  e,
                );
              }),
            }),
          ],
        });
      };
    e.i(87798);
    var m = e.i(54447);
    let u = {
        "RETURNED SAFELY": "#00ff88",
        "KNOCKED OUT": "#ff6b6b",
        UNKNOWN: "#666666",
      },
      x = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M23 4v6h-6",
            }),
            (0, r.jsx)("path", {
              d: "M1 20v-6h6",
            }),
            (0, r.jsx)("path", {
              d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
            }),
          ],
        }),
      p = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "6",
            }),
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "2",
            }),
          ],
        }),
      j = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("path", {
            d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
          }),
        }),
      v = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "8",
            }),
            (0, r.jsx)("line", {
              x1: "9",
              y1: "2",
              x2: "9",
              y2: "22",
            }),
            (0, r.jsx)("line", {
              x1: "15",
              y1: "2",
              x2: "15",
              y2: "22",
            }),
          ],
        }),
      N = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "10",
              r: "8",
            }),
            (0, r.jsx)("path", {
              d: "M12 14v4",
            }),
            (0, r.jsx)("path", {
              d: "M9 18h6",
            }),
            (0, r.jsx)("circle", {
              cx: "9",
              cy: "9",
              r: "1",
              fill: "currentColor",
            }),
            (0, r.jsx)("circle", {
              cx: "15",
              cy: "9",
              r: "1",
              fill: "currentColor",
            }),
          ],
        }),
      f = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, r.jsx)("polyline", {
              points: "12 6 12 12 16 14",
            }),
          ],
        }),
      y = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, r.jsx)("line", {
              x1: "22",
              y1: "12",
              x2: "18",
              y2: "12",
            }),
            (0, r.jsx)("line", {
              x1: "6",
              y1: "12",
              x2: "2",
              y2: "12",
            }),
            (0, r.jsx)("line", {
              x1: "12",
              y1: "6",
              x2: "12",
              y2: "2",
            }),
            (0, r.jsx)("line", {
              x1: "12",
              y1: "22",
              x2: "12",
              y2: "18",
            }),
          ],
        }),
      g = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("line", {
              x1: "3",
              y1: "3",
              x2: "15",
              y2: "15",
            }),
            (0, r.jsx)("line", {
              x1: "6",
              y1: "9",
              x2: "9",
              y2: "6",
            }),
            (0, r.jsx)("line", {
              x1: "15",
              y1: "15",
              x2: "18",
              y2: "18",
            }),
            (0, r.jsx)("line", {
              x1: "21",
              y1: "3",
              x2: "9",
              y2: "15",
            }),
            (0, r.jsx)("line", {
              x1: "15",
              y1: "6",
              x2: "18",
              y2: "9",
            }),
            (0, r.jsx)("line", {
              x1: "9",
              y1: "15",
              x2: "6",
              y2: "18",
            }),
          ],
        }),
      k = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
            }),
            (0, r.jsx)("path", {
              d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
            }),
            (0, r.jsx)("path", {
              d: "M4 22h16",
            }),
            (0, r.jsx)("path", {
              d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
            }),
            (0, r.jsx)("path", {
              d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
            }),
            (0, r.jsx)("path", {
              d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
            }),
          ],
        }),
      b = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("polygon", {
            points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",
          }),
        }),
      w = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("polyline", {
              points: "23 6 13.5 15.5 8.5 10.5 1 18",
            }),
            (0, r.jsx)("polyline", {
              points: "17 6 23 6 23 12",
            }),
          ],
        }),
      S = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("polyline", {
              points: "23 18 13.5 8.5 8.5 13.5 1 6",
            }),
            (0, r.jsx)("polyline", {
              points: "17 18 23 18 23 12",
            }),
          ],
        }),
      C = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("line", {
            x1: "5",
            y1: "12",
            x2: "19",
            y2: "12",
          }),
        }),
      L = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("path", {
            d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
          }),
        }),
      M = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("polygon", {
            points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2",
          }),
        }),
      A = () =>
        (0, r.jsxs)("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          className: "spinner-icon",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
              opacity: "0.25",
            }),
            (0, r.jsx)("path", {
              d: "M12 2a10 10 0 0 1 10 10",
            }),
          ],
        }),
      E = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("polyline", {
            points: "6 9 12 15 18 9",
          }),
        });
    function R(e, s) {
      let a = new Map();
      for (let s of e)
        a.set(s.targetId, {
          targetName: s.targetName,
          kills: s.amount,
          damage: 0,
        });
      for (let e of s) {
        let s = a.get(e.targetId);
        s
          ? (s.damage = e.amount)
          : a.set(e.targetId, {
              targetName: e.targetName,
              kills: 0,
              damage: e.amount,
            });
      }
      return Array.from(a.values())
        .filter((e) => e.kills > 0 || e.damage > 0)
        .sort((e, s) => s.damage - e.damage);
    }
    let I = ({ round: e }) => {
        let s = e.valueBroughtIn ?? 0,
          a = e.valueExtracted ?? 0,
          t = e.netValue ?? 0,
          n = (e) =>
            e.targetId !== o.PLAYER_TARGET_ID &&
            e.targetId !== o.PLAYER_DAMAGE_TARGET_ID,
          l = R(
            e.killsBreakdownByEnemy.filter(n),
            e.damageBreakdownByEnemy.filter(n),
          ),
          i = R(e.killsBreakdownByWeapon, e.damageBreakdownByWeapon),
          c = e.xpGained ?? 0,
          d = e.containersLooted ?? 0,
          h = e.playerDowns > 0 || e.playerKills > 0,
          m = s > 0 || a > 0,
          u = c > 0 || d > 0,
          x = l.length > 0,
          p = i.length > 0,
          j = Math.max(s, a, 1),
          v = (s / j) * 100,
          N = (a / j) * 100;
        return m || u || x || p || h
          ? (0, r.jsx)("div", {
              className: "round-detail-panel",
              children: (0, r.jsxs)("div", {
                className: "round-detail-grid",
                children: [
                  m &&
                    (0, r.jsxs)("div", {
                      className: "round-detail-section",
                      children: [
                        (0, r.jsx)("h4", {
                          className: "round-detail-section-title",
                          children: "Economy",
                        }),
                        (0, r.jsxs)("div", {
                          className: "round-detail-economy",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "economy-row",
                              children: [
                                (0, r.jsx)("span", {
                                  className: "economy-label",
                                  children: "Brought In",
                                }),
                                (0, r.jsx)("span", {
                                  className: "economy-value",
                                  children: (0, o.formatValue)(s),
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "economy-row",
                              children: [
                                (0, r.jsx)("span", {
                                  className: "economy-label",
                                  children: "Extracted",
                                }),
                                (0, r.jsx)("span", {
                                  className: "economy-value",
                                  children: (0, o.formatValue)(a),
                                }),
                              ],
                            }),
                            (0, r.jsx)("div", {
                              className: "economy-divider",
                            }),
                            (0, r.jsxs)("div", {
                              className: "economy-row economy-row--net",
                              children: [
                                (0, r.jsxs)("span", {
                                  className: "economy-label",
                                  children: [
                                    "Net ",
                                    t >= 0 ? "Profit" : "Loss",
                                  ],
                                }),
                                (0, r.jsx)("span", {
                                  className: `economy-value economy-value--net ${t >= 0 ? "positive-value" : "negative-value"}`,
                                  children: (0, o.formatValue)(t),
                                }),
                              ],
                            }),
                            (0, r.jsx)("div", {
                              className: "economy-bar",
                              children: (0, r.jsxs)("div", {
                                className: "economy-bar-track",
                                children: [
                                  (0, r.jsx)("div", {
                                    className:
                                      "economy-bar-segment economy-bar-segment--brought",
                                    style: {
                                      width: `${v}%`,
                                    },
                                  }),
                                  (0, r.jsx)("div", {
                                    className:
                                      "economy-bar-segment economy-bar-segment--extracted",
                                    style: {
                                      width: `${N}%`,
                                    },
                                  }),
                                ],
                              }),
                            }),
                            u &&
                              (0, r.jsxs)("div", {
                                className: "round-activity-stats",
                                children: [
                                  c > 0 &&
                                    (0, r.jsxs)("div", {
                                      className: "activity-stat",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "activity-stat-value",
                                          children: c.toLocaleString(),
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "activity-stat-label",
                                          children: "XP",
                                        }),
                                      ],
                                    }),
                                  d > 0 &&
                                    (0, r.jsxs)("div", {
                                      className: "activity-stat",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "activity-stat-value",
                                          children: d.toLocaleString(),
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "activity-stat-label",
                                          children: "Containers Looted",
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                  x &&
                    (0, r.jsxs)("div", {
                      className: "round-detail-section",
                      children: [
                        (0, r.jsx)("h4", {
                          className: "round-detail-section-title",
                          children: "ARC Kills",
                        }),
                        (0, r.jsx)("div", {
                          className: "round-detail-breakdown",
                          children: l.map((e, s) =>
                            (0, r.jsxs)(
                              "div",
                              {
                                className: "breakdown-row",
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "breakdown-name",
                                    children: e.targetName,
                                  }),
                                  (0, r.jsxs)("span", {
                                    className: "breakdown-stats",
                                    children: [
                                      e.kills > 0 &&
                                        (0, r.jsxs)("span", {
                                          className: "breakdown-kills",
                                          children: [
                                            e.kills,
                                            " kill",
                                            1 !== e.kills ? "s" : "",
                                          ],
                                        }),
                                      e.damage > 0 &&
                                        (0, r.jsxs)("span", {
                                          className: "breakdown-damage",
                                          children: [
                                            e.damage.toLocaleString(),
                                            " dmg",
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              s,
                            ),
                          ),
                        }),
                      ],
                    }),
                  (0, r.jsxs)("div", {
                    className: "round-detail-section",
                    children: [
                      p &&
                        (0, r.jsxs)(r.Fragment, {
                          children: [
                            (0, r.jsx)("h4", {
                              className: "round-detail-section-title",
                              children: "Weapons Used",
                            }),
                            (0, r.jsx)("div", {
                              className: "round-detail-breakdown",
                              children: i.map((e, s) =>
                                (0, r.jsxs)(
                                  "div",
                                  {
                                    className: "breakdown-row",
                                    children: [
                                      (0, r.jsx)("span", {
                                        className: "breakdown-name",
                                        children: e.targetName,
                                      }),
                                      (0, r.jsxs)("span", {
                                        className: "breakdown-stats",
                                        children: [
                                          e.kills > 0 &&
                                            (0, r.jsxs)("span", {
                                              className: "breakdown-kills",
                                              children: [
                                                e.kills,
                                                " kill",
                                                1 !== e.kills ? "s" : "",
                                              ],
                                            }),
                                          e.damage > 0 &&
                                            (0, r.jsxs)("span", {
                                              className: "breakdown-damage",
                                              children: [
                                                e.damage.toLocaleString(),
                                                " dmg",
                                              ],
                                            }),
                                        ],
                                      }),
                                    ],
                                  },
                                  s,
                                ),
                              ),
                            }),
                          ],
                        }),
                      h &&
                        (0, r.jsxs)(r.Fragment, {
                          children: [
                            (0, r.jsx)("h4", {
                              className: `round-detail-section-title ${p ? "round-detail-section-title--spaced" : ""}`,
                              children: "PvP",
                            }),
                            (0, r.jsxs)("div", {
                              className: "round-detail-pvp",
                              children: [
                                e.playerDowns > 0 &&
                                  (0, r.jsxs)("div", {
                                    className: "pvp-stat",
                                    children: [
                                      (0, r.jsx)("span", {
                                        className:
                                          "pvp-stat-value pvp-stat-value--knocks",
                                        children: e.playerDowns,
                                      }),
                                      (0, r.jsxs)("span", {
                                        className: "pvp-stat-label",
                                        children: [
                                          "Knock",
                                          1 !== e.playerDowns ? "s" : "",
                                        ],
                                      }),
                                    ],
                                  }),
                                e.playerKills > 0 &&
                                  (0, r.jsxs)("div", {
                                    className: "pvp-stat",
                                    children: [
                                      (0, r.jsx)("span", {
                                        className:
                                          "pvp-stat-value pvp-stat-value--kills",
                                        children: e.playerKills,
                                      }),
                                      (0, r.jsxs)("span", {
                                        className: "pvp-stat-label",
                                        children: [
                                          "Kill",
                                          1 !== e.playerKills ? "s" : "",
                                        ],
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            })
          : (0, r.jsx)("div", {
              className: "round-detail-panel",
              children: (0, r.jsx)("div", {
                className: "round-detail-empty",
                children: "No detailed data available for this raid.",
              }),
            });
      },
      T = n.default.memo(({ round: e, isExpanded: s, onToggle: a }) =>
        (0, r.jsxs)("div", {
          className: `round-card ${s ? "round-card--expanded" : ""}`,
          style: {
            "--outcome-color": u[e.outcome] || u.UNKNOWN,
          },
          children: [
            (0, r.jsxs)("div", {
              className: "round-card-summary",
              onClick: a,
              children: [
                (0, r.jsx)("div", {
                  className: "round-card-indicator",
                }),
                (0, r.jsx)("div", {
                  className: `round-card-outcome ${"RETURNED SAFELY" === e.outcome ? "outcome-extracted" : "KNOCKED OUT" === e.outcome ? "outcome-died" : "outcome-unknown"}`,
                  children:
                    "RETURNED SAFELY" === e.outcome
                      ? "EXTRACTED"
                      : "KNOCKED OUT" === e.outcome
                        ? "FAILED"
                        : "UNKNOWN",
                }),
                (0, r.jsxs)("div", {
                  className: "round-card-info",
                  children: [
                    (0, r.jsx)("span", {
                      className: "round-card-map",
                      children: e.mapName,
                    }),
                    (0, r.jsxs)("div", {
                      className: "round-card-meta",
                      children: [
                        (0, r.jsxs)("span", {
                          className: "round-card-meta-item",
                          children: [
                            (0, r.jsx)(f, {
                              className: "meta-icon",
                            }),
                            e.durationFormatted,
                          ],
                        }),
                        e.arcKills > 0 &&
                          (0, r.jsxs)("span", {
                            className: "round-card-meta-item",
                            children: [
                              (0, r.jsx)(y, {
                                className: "meta-icon",
                              }),
                              e.arcKills,
                              " ARC Destroyed",
                            ],
                          }),
                        (e.playerDowns > 0 || e.playerKills > 0) &&
                          (0, r.jsxs)("span", {
                            className:
                              "round-card-meta-item round-card-meta-item--player",
                            children: [
                              (0, r.jsx)(p, {
                                className: "meta-icon",
                              }),
                              (0, r.jsxs)("span", {
                                className: "pvp-downs",
                                children: [e.playerDowns, " Knocks"],
                              }),
                              (0, r.jsx)("span", {
                                className: "pvp-separator",
                                children: "/",
                              }),
                              (0, r.jsxs)("span", {
                                className: "pvp-kos",
                                children: [e.playerKills, " Kills"],
                              }),
                            ],
                          }),
                        e.damage > 0 &&
                          (0, r.jsxs)("span", {
                            className: "round-card-meta-item",
                            children: [
                              (0, r.jsx)(g, {
                                className: "meta-icon meta-icon--damage",
                              }),
                              e.damage.toLocaleString(),
                              " Total Damage",
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: `round-card-value ${(e.netValue ?? 0) >= 0 ? "value-positive" : "value-negative"}`,
                  children: (0, o.formatValue)(e.netValue),
                }),
                (0, r.jsx)(E, {
                  className: `round-card-chevron ${s ? "round-card-chevron--expanded" : ""}`,
                }),
              ],
            }),
            (0, r.jsx)("div", {
              className: `round-card-detail-wrapper ${s ? "round-card-detail-wrapper--open" : ""}`,
              children: (0, r.jsx)("div", {
                className: "round-card-detail-inner",
                children:
                  s &&
                  (0, r.jsx)(I, {
                    round: e,
                  }),
              }),
            }),
          ],
        }),
      ),
      P = [
        {
          value: "recent",
          label: "Most Recent",
        },
        {
          value: "oldest",
          label: "Oldest First",
        },
        {
          value: "value-high",
          label: "Highest Value",
        },
        {
          value: "value-low",
          label: "Lowest Value",
        },
        {
          value: "duration-long",
          label: "Longest Duration",
        },
        {
          value: "kills-high",
          label: "Most ARC Kills",
        },
        {
          value: "player-kills-high",
          label: "Most Player Kills",
        },
        {
          value: "player-knocks-high",
          label: "Most Player Knocks",
        },
      ],
      B = [
        {
          value: "all",
          label: "All Outcomes",
        },
        {
          value: "extracted",
          label: "Extracted Only",
        },
        {
          value: "failed",
          label: "Failed Only",
        },
      ];
    var $ = e.i(38294),
      D = e.i(82810);
    let _ = ({
        items: e,
        maxValue: s,
        highlightColor: a = "#00ff88",
        defaultBarColor: t = "rgba(255, 255, 255, 0.3)",
        showRank: l = !0,
        animationDelay: i = 80,
        className: o = "",
      }) => {
        let [c, d] = (0, n.useState)(!1),
          [h, m] = (0, n.useState)(new Set()),
          u = (0, n.useRef)(null),
          x = s ?? Math.max(...e.map((e) => e.value), 1);
        return (
          (0, n.useEffect)(() => {
            let e = new IntersectionObserver(
              ([e]) => {
                e.isIntersecting && !c && d(!0);
              },
              {
                threshold: 0.2,
              },
            );
            return (u.current && e.observe(u.current), () => e.disconnect());
          }, [c]),
          (0, n.useEffect)(() => {
            c &&
              e.forEach((e, s) => {
                setTimeout(() => {
                  m((e) => new Set(e).add(s));
                }, s * i);
              });
          }, [c, e.length, i]),
          (0, r.jsx)("div", {
            ref: u,
            className: `animated-bar-chart ${o}`,
            children: e.map((e, s) => {
              var n;
              let o = h.has(s),
                c = 0 === s,
                d = (e.value / x) * 100;
              return (0, r.jsxs)(
                "div",
                {
                  className: `bar-chart-row ${c ? "bar-chart-row--top" : ""} ${o ? "bar-chart-row--animated" : ""}`,
                  style: {
                    animationDelay: `${s * i}ms`,
                  },
                  children: [
                    (0, r.jsxs)("div", {
                      className: "bar-chart-info",
                      children: [
                        l &&
                          (0, r.jsxs)("span", {
                            className: "bar-chart-rank",
                            children: ["#", s + 1],
                          }),
                        (0, r.jsx)("span", {
                          className: "bar-chart-name",
                          children: e.name,
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "bar-chart-bar-wrapper",
                      children: [
                        (0, r.jsx)("div", {
                          className: "bar-chart-bar-container",
                          children: (0, r.jsx)("div", {
                            className: "bar-chart-bar",
                            style: {
                              width: o ? `${d}%` : "0%",
                              backgroundColor: c ? a : t,
                            },
                          }),
                        }),
                        (0, r.jsx)("span", {
                          className: "bar-chart-value",
                          children:
                            (n = e.value) >= 1e6
                              ? `${(n / 1e6).toFixed(1)}M`
                              : n >= 1e3
                                ? `${(n / 1e3).toFixed(1)}K`
                                : n.toLocaleString(),
                        }),
                      ],
                    }),
                  ],
                },
                e.id,
              );
            }),
          })
        );
      },
      W = {},
      V = D.default;
    if (Array.isArray(V)) for (let e of V) W[e.gameAssetId] = e;
    else Object.assign(W, V);
    let K = {
        Spaceport: "#4a9eff",
        "The Blue Gate": "#00ff88",
        "Stella Montis": "#b388ff",
        "The Dam": "#ff9800",
        "Buried City": "#ff6b6b",
        "Riven Tides": "#1de9b6",
      },
      O = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, r.jsx)("polyline", {
              points: "12 6 12 12 16 14",
            }),
          ],
        }),
      U = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "6",
            }),
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "2",
            }),
          ],
        }),
      F = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
            }),
            (0, r.jsx)("path", {
              d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
            }),
            (0, r.jsx)("path", {
              d: "M4 22h16",
            }),
            (0, r.jsx)("path", {
              d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
            }),
            (0, r.jsx)("path", {
              d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
            }),
            (0, r.jsx)("path", {
              d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
            }),
          ],
        }),
      H = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
            }),
            (0, r.jsx)("path", {
              d: "m9 12 2 2 4-4",
            }),
          ],
        }),
      Y = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("polyline", {
              points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5",
            }),
            (0, r.jsx)("line", {
              x1: "13",
              y1: "19",
              x2: "19",
              y2: "13",
            }),
            (0, r.jsx)("line", {
              x1: "16",
              y1: "16",
              x2: "20",
              y2: "20",
            }),
            (0, r.jsx)("line", {
              x1: "19",
              y1: "21",
              x2: "21",
              y2: "19",
            }),
          ],
        }),
      q = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "8",
            }),
            (0, r.jsx)("line", {
              x1: "9",
              y1: "2",
              x2: "9",
              y2: "22",
            }),
            (0, r.jsx)("line", {
              x1: "15",
              y1: "2",
              x2: "15",
              y2: "22",
            }),
          ],
        }),
      z = ({ className: e }) =>
        (0, r.jsx)("svg", {
          className: e,
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("path", {
            d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
          }),
        }),
      G = () =>
        (0, r.jsxs)("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          className: "spinner-icon",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
              opacity: "0.25",
            }),
            (0, r.jsx)("path", {
              d: "M12 2a10 10 0 0 1 10 10",
            }),
          ],
        }),
      Q = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M23 4v6h-6",
            }),
            (0, r.jsx)("path", {
              d: "M1 20v-6h6",
            }),
            (0, r.jsx)("path", {
              d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
            }),
          ],
        }),
      X = (e) => {
        let s = Math.floor(e / 36e5),
          a = Math.floor((e % 36e5) / 6e4);
        return `${s}h ${a}m`;
      },
      J = (e) => {
        let s = Math.abs(e).toLocaleString();
        return e >= 0 ? `+${s}` : `-${s}`;
      },
      Z = (e) => e.replace(/\s+(I{1,3}|IV|V)$/, "").trim();
    var ee = e.i(22016),
      es = e.i(19784),
      ea = e.i(86316),
      et = e.i(10981),
      er = e.i(9019),
      er = er;
    let en = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "18",
              cy: "5",
              r: "3",
            }),
            (0, r.jsx)("circle", {
              cx: "6",
              cy: "12",
              r: "3",
            }),
            (0, r.jsx)("circle", {
              cx: "18",
              cy: "19",
              r: "3",
            }),
            (0, r.jsx)("line", {
              x1: "8.59",
              y1: "13.51",
              x2: "15.42",
              y2: "17.49",
            }),
            (0, r.jsx)("line", {
              x1: "15.41",
              y1: "6.51",
              x2: "8.59",
              y2: "10.49",
            }),
          ],
        }),
      el = () =>
        (0, r.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("rect", {
              x: "9",
              y: "9",
              width: "13",
              height: "13",
              rx: "2",
              ry: "2",
            }),
            (0, r.jsx)("path", {
              d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
            }),
          ],
        }),
      ei = () =>
        (0, r.jsx)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: (0, r.jsx)("polyline", {
            points: "20 6 9 17 4 12",
          }),
        }),
      eo = () =>
        (0, r.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("rect", {
              x: "2",
              y: "7",
              width: "20",
              height: "14",
              rx: "2",
              ry: "2",
            }),
            (0, r.jsx)("path", {
              d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
            }),
          ],
        }),
      ec = () =>
        (0, r.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("circle", {
              cx: "12",
              cy: "12",
              r: "10",
            }),
            (0, r.jsx)("polyline", {
              points: "12 6 12 12 16 14",
            }),
          ],
        }),
      ed = () =>
        (0, r.jsxs)("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M18 20V10",
            }),
            (0, r.jsx)("path", {
              d: "M12 20V4",
            }),
            (0, r.jsx)("path", {
              d: "M6 20v-6",
            }),
          ],
        }),
      eh = ({ checked: e, onChange: s, disabled: a }) =>
        (0, r.jsx)("button", {
          className: `share-toggle ${e ? "share-toggle--active" : ""}`,
          onClick: () => !a && s(!e),
          disabled: a,
          role: "switch",
          "aria-checked": e,
          children: (0, r.jsx)("span", {
            className: "share-toggle-track",
            children: (0, r.jsx)("span", {
              className: "share-toggle-thumb",
            }),
          }),
        }),
      em = ({ isExpanded: e, onSync: s }) => {
        let { connection: a } = (0, es.useEmbark)(),
          [t, l] = (0, n.useState)(null),
          [i, o] = (0, n.useState)(!0),
          [c, d] = (0, n.useState)(!1),
          [h, m] = (0, n.useState)(!1);
        (0, n.useEffect)(() => {
          e &&
            (o(!0),
            (0, ea.getShareSettings)().then((e) => {
              (l(e), o(!1));
            }));
        }, [e]);
        let u = (0, n.useCallback)(
            async (e, a) => {
              if (!t || c) return;
              d(!0);
              let r = {
                  [e]: a,
                },
                n = await (0, ea.updateShareSettings)(r);
              (n &&
                (l((e) =>
                  e
                    ? {
                        ...e,
                        ...r,
                        slug: n,
                      }
                    : e,
                ),
                "isPublic" === e && a && s && s()),
                d(!1));
            },
            [t, c, s],
          ),
          x = (0, n.useCallback)(async () => {
            let e =
              t?.slug ||
              (a?.displayName ? (0, ea.generateSlug)(a.displayName) : null);
            if (!e) return;
            let s = `${window.location.origin}/raider/${e}/overview`;
            try {
              (await navigator.clipboard.writeText(s),
                m(!0),
                setTimeout(() => m(!1), 2e3));
            } catch {
              let e = document.createElement("input");
              ((e.value = s),
                document.body.appendChild(e),
                e.select(),
                document.execCommand("copy"),
                document.body.removeChild(e),
                m(!0),
                setTimeout(() => m(!1), 2e3));
            }
          }, [t, a]);
        if (!e) return null;
        let p =
            t?.slug ||
            (a?.displayName ? (0, ea.generateSlug)(a.displayName) : null),
          j = p ? `${window.location.origin}/raider/${p}/overview` : null;
        return (0, r.jsx)("div", {
          className: "share-panel",
          children: i
            ? (0, r.jsx)("div", {
                className: "share-panel-loading",
                children: (0, r.jsx)("div", {
                  className: "loading-spinner",
                }),
              })
            : (0, r.jsxs)("div", {
                className: "share-panel-content",
                children: [
                  (0, r.jsxs)("div", {
                    className: "share-setting share-setting--master",
                    children: [
                      (0, r.jsxs)("div", {
                        className: "share-setting-info",
                        children: [
                          (0, r.jsx)("span", {
                            className: "share-setting-label",
                            children: "Make profile public",
                          }),
                          (0, r.jsx)("span", {
                            className: "share-setting-description",
                            children:
                              "Anyone with the link can view your profile",
                          }),
                        ],
                      }),
                      (0, r.jsx)(eh, {
                        checked: t?.isPublic ?? !1,
                        onChange: (e) => u("isPublic", e),
                        disabled: c,
                      }),
                    ],
                  }),
                  (0, r.jsxs)("div", {
                    className: `share-sections ${!t?.isPublic ? "share-sections--disabled" : ""}`,
                    children: [
                      (0, r.jsxs)("div", {
                        className: "share-setting",
                        children: [
                          (0, r.jsx)("div", {
                            className: "share-setting-info",
                            children: (0, r.jsxs)("span", {
                              className: "share-setting-label",
                              children: [
                                (0, r.jsx)("span", {
                                  style: {
                                    fontWeight: 700,
                                    fontSize: "16px",
                                    opacity: 0.7,
                                  },
                                  children: "#",
                                }),
                                " Hide Discriminator",
                              ],
                            }),
                          }),
                          (0, r.jsx)(eh, {
                            checked: t?.hideDiscriminator ?? !1,
                            onChange: (e) => u("hideDiscriminator", e),
                            disabled: c || !t?.isPublic,
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "share-setting",
                        children: [
                          (0, r.jsx)("div", {
                            className: "share-setting-info",
                            children: (0, r.jsxs)("span", {
                              className: "share-setting-label",
                              children: [(0, r.jsx)(eo, {}), " Inventory"],
                            }),
                          }),
                          (0, r.jsx)(eh, {
                            checked: t?.shareInventory ?? !0,
                            onChange: (e) => u("shareInventory", e),
                            disabled: c || !t?.isPublic,
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "share-setting",
                        children: [
                          (0, r.jsx)("div", {
                            className: "share-setting-info",
                            children: (0, r.jsxs)("span", {
                              className: "share-setting-label",
                              children: [(0, r.jsx)(ec, {}), " Raid History"],
                            }),
                          }),
                          (0, r.jsx)(eh, {
                            checked: t?.shareRaidHistory ?? !0,
                            onChange: (e) => u("shareRaidHistory", e),
                            disabled: c || !t?.isPublic,
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "share-setting",
                        children: [
                          (0, r.jsx)("div", {
                            className: "share-setting-info",
                            children: (0, r.jsxs)("span", {
                              className: "share-setting-label",
                              children: [(0, r.jsx)(ed, {}), " Player Stats"],
                            }),
                          }),
                          (0, r.jsx)(eh, {
                            checked: t?.sharePlayerStats ?? !0,
                            onChange: (e) => u("sharePlayerStats", e),
                            disabled: c || !t?.isPublic,
                          }),
                        ],
                      }),
                    ],
                  }),
                  t?.isPublic &&
                    j &&
                    (0, r.jsx)("div", {
                      className: "share-link-section",
                      children: (0, r.jsxs)("div", {
                        className: "share-link-input",
                        children: [
                          (0, r.jsx)("span", {
                            className: "share-link-url",
                            children: j,
                          }),
                          (0, r.jsx)("button", {
                            className: `share-link-copy ${h ? "share-link-copy--copied" : ""}`,
                            onClick: x,
                            children: h
                              ? (0, r.jsxs)(r.Fragment, {
                                  children: [(0, r.jsx)(ei, {}), " Copied!"],
                                })
                              : (0, r.jsxs)(r.Fragment, {
                                  children: [(0, r.jsx)(el, {}), " Copy"],
                                }),
                          }),
                        ],
                      }),
                    }),
                  (0, r.jsx)("p", {
                    className: "share-panel-note",
                    children:
                      "Your profile updates automatically when you sync your data.",
                  }),
                ],
              }),
        });
      },
      eu = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("polyline", {
              points: "23 4 23 10 17 10",
            }),
            (0, r.jsx)("polyline", {
              points: "1 20 1 14 7 14",
            }),
            (0, r.jsx)("path", {
              d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
            }),
          ],
        }),
      ex = () =>
        (0, r.jsxs)("svg", {
          width: "12",
          height: "12",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("rect", {
              x: "3",
              y: "11",
              width: "18",
              height: "11",
              rx: "2",
              ry: "2",
            }),
            (0, r.jsx)("path", {
              d: "M7 11V7a5 5 0 0 1 10 0v4",
            }),
          ],
        }),
      ep = ({ className: e }) =>
        (0, r.jsxs)("svg", {
          className: e,
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            (0, r.jsx)("path", {
              d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
            }),
            (0, r.jsx)("line", {
              x1: "12",
              y1: "9",
              x2: "12",
              y2: "13",
            }),
            (0, r.jsx)("line", {
              x1: "12",
              y1: "17",
              x2: "12.01",
              y2: "17",
            }),
          ],
        });
    (e.s(
      [
        "default",
        0,
        ({
          isConnected: e,
          onSync: s,
          isSyncing: a,
          lastSynced: t,
          isPremium: l,
          isPremiumLoading: i,
          lastServerSync: o,
          serverSyncChecked: c,
          lastManualSyncAt: d,
          tokenExpired: h,
        }) => {
          let [m, u] = (0, n.useState)(!1),
            [x, p] = (0, n.useState)(!1);
          if (!e) return null;
          let j = !i && c,
            v = (() => {
              if (!j) return null;
              if (l && o) {
                let e = new Date(o).getTime();
                if (e > (d || 0)) {
                  let s = Math.floor((Date.now() - e) / 6e4);
                  if (s < 1) return "just now";
                  if (s < 60) return `${s} minutes ago`;
                  let a = Math.floor(s / 60);
                  return `${a}h ago`;
                }
              }
              return t ?? null;
            })(),
            N = (0, r.jsxs)("div", {
              className: "share-profile-actions",
              children: [
                j &&
                  !l &&
                  (0, r.jsx)(er.default, {
                    text: "Auto Sync - Premium feature",
                    position: "top",
                    children: (0, r.jsxs)("button", {
                      className: "auto-sync-teaser",
                      onClick: (e) => {
                        (e.stopPropagation(), p(!0));
                      },
                      children: [
                        (0, r.jsx)(ex, {}),
                        (0, r.jsx)("span", {
                          children: "Auto Sync",
                        }),
                      ],
                    }),
                  }),
                v &&
                  (0, r.jsxs)("span", {
                    className: "share-profile-sync-timestamp",
                    children: [
                      "Last synced: ",
                      v,
                      j &&
                        l &&
                        !!o &&
                        (0, r.jsx)(er.default, {
                          text: "Premium - Your data syncs automatically every 30 minutes, even when you're offline",
                          position: "top",
                          children: (0, r.jsxs)("span", {
                            className: "auto-sync-badge",
                            children: [
                              (0, r.jsx)("span", {
                                className: "auto-sync-badge-dot",
                              }),
                              "AUTO",
                            ],
                          }),
                        }),
                    ],
                  }),
                (0, r.jsx)(er.default, {
                  text: "Sync all overview data",
                  position: "top",
                  children: (0, r.jsxs)("button", {
                    className: `share-profile-sync-btn ${a ? "share-profile-sync-btn--syncing" : ""}`,
                    onClick: (e) => {
                      (e.stopPropagation(), s?.());
                    },
                    disabled: a || h,
                    children: [
                      (0, r.jsx)(eu, {
                        className: a ? "spinning" : "",
                      }),
                      (0, r.jsx)("span", {
                        children: a ? "Syncing..." : "Sync Now",
                      }),
                    ],
                  }),
                }),
              ],
            });
          return (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsxs)("div", {
                className: "share-profile-card",
                children: [
                  (0, r.jsxs)("div", {
                    className: "share-profile-trigger-row",
                    children: [
                      (0, r.jsxs)("button", {
                        className: "share-profile-trigger",
                        onClick: () => u(!m),
                        children: [
                          (0, r.jsxs)("div", {
                            className: "share-profile-trigger-content",
                            children: [
                              (0, r.jsx)(en, {}),
                              (0, r.jsx)("span", {
                                className: "share-profile-trigger-text",
                                children: "Share Profile",
                              }),
                            ],
                          }),
                          (0, r.jsx)("svg", {
                            className: `share-profile-chevron ${m ? "share-profile-chevron--open" : ""}`,
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: (0, r.jsx)("polyline", {
                              points: "6 9 12 15 18 9",
                            }),
                          }),
                        ],
                      }),
                      N,
                    ],
                  }),
                  h &&
                    (0, r.jsxs)("div", {
                      className: "share-profile-token-expired",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "share-profile-token-expired-content",
                          children: [
                            (0, r.jsx)(ep, {}),
                            (0, r.jsx)("span", {
                              children:
                                "Your Embark session has expired. Reconnect in the RaiderBuddy desktop app to keep syncing.",
                            }),
                          ],
                        }),
                        (0, r.jsx)(ee.default, {
                          href: "/download",
                          className: "share-profile-reconnect-btn",
                          children: "Open Desktop App",
                        }),
                      ],
                    }),
                  (0, r.jsx)(em, {
                    isExpanded: m,
                    onSync: s,
                  }),
                ],
              }),
              (0, r.jsx)(et.UpgradeModal, {
                isOpen: x,
                onClose: () => p(!1),
                feature: "auto-sync",
              }),
            ],
          });
        },
      ],
      37690,
    ),
      e.s([], 3945),
      e.s(["ProfileSection", () => s.default], 57263),
      e.s(["InventorySection", () => a.default], 26437),
      e.s(["ProgressCard", () => t.default], 15930),
      e.s(
        [
          "RoundHistorySection",
          0,
          ({ isConnected: e, publicData: s, isPublicView: a }) => {
            let [t, d] = (0, n.useState)(s?.rounds ?? []),
              [u, f] = (0, n.useState)(s?.summary ?? null),
              [E, R] = (0, n.useState)(!a),
              [I, $] = (0, n.useState)(null),
              [D, _] = (0, n.useState)("all"),
              [W, V] = (0, n.useState)("all"),
              [K, O] = (0, n.useState)("recent"),
              [U, F] = (0, n.useState)(null),
              [H, Y] = (0, n.useState)(null),
              q = (0, n.useRef)(!1);
            (0, n.useEffect)(() => {
              let e = () => {
                let e = (0, l.getRoundStatsCacheTimestamp)();
                e && F((0, i.formatTimeAgo)(e));
              };
              e();
              let s = setInterval(e, 6e4);
              return () => clearInterval(s);
            }, [t]);
            let z = (0, n.useCallback)(
              async (s = !1) => {
                if (e) {
                  (R(!0), $(null));
                  try {
                    s && (0, l.clearRoundStatsCache)();
                    let e = await (0, l.fetchRoundStats)(s);
                    (d(e.rounds), f(e.summary));
                    let a = (0, l.getRoundStatsCacheTimestamp)();
                    a && F((0, i.formatTimeAgo)(a));
                  } catch (e) {
                    (console.error(
                      "[RoundHistorySection] Failed to load round stats:",
                      e,
                    ),
                      $(
                        e instanceof Error
                          ? e.message
                          : "Failed to load raid history",
                      ));
                  } finally {
                    R(!1);
                  }
                }
              },
              [e],
            );
            ((0, n.useEffect)(() => {
              if (a) return;
              if (!e) return void R(!1);
              if (q.current) return;
              q.current = !0;
              let s = (0, l.getCachedRoundStats)();
              s
                ? (console.log("[RoundHistorySection] Loading from cache"),
                  d(s.data.rounds),
                  f(s.data.summary),
                  F((0, i.formatTimeAgo)(s.timestamp)),
                  R(!1))
                : (console.log(
                    "[RoundHistorySection] No cache found, fetching from API",
                  ),
                  z());
            }, [e, z]),
              (0, n.useEffect)(() => {
                e || ((q.current = !1), d([]), f(null), F(null));
              }, [e]));
            let G = (0, n.useMemo)(
                () => Array.from(new Set(t.map((e) => e.mapName))).sort(),
                [t],
              ),
              Q = (0, n.useMemo)(
                () => [
                  {
                    value: "all",
                    label: "All Maps",
                  },
                  ...G.map((e) => ({
                    value: e,
                    label: e,
                  })),
                ],
                [G],
              ),
              X = (0, n.useMemo)(
                () =>
                  [
                    ...t.filter((e) => {
                      let s = "all" === D || e.mapName === D,
                        a =
                          "all" === W ||
                          ("extracted" === W &&
                            "RETURNED SAFELY" === e.outcome) ||
                          ("failed" === W && "KNOCKED OUT" === e.outcome),
                        t = (e.netValue ?? 0) <= 6e5;
                      return s && a && t;
                    }),
                  ].sort((e, s) => {
                    switch (K) {
                      case "recent":
                        return s.roundId.localeCompare(e.roundId);
                      case "oldest":
                        return e.roundId.localeCompare(s.roundId);
                      case "value-high":
                        return (s.netValue ?? -1 / 0) - (e.netValue ?? -1 / 0);
                      case "value-low":
                        return (e.netValue ?? 1 / 0) - (s.netValue ?? 1 / 0);
                      case "duration-long":
                        return (s.durationMs ?? 0) - (e.durationMs ?? 0);
                      case "kills-high":
                        return s.arcKills - e.arcKills;
                      case "player-kills-high":
                        return s.playerKills - e.playerKills;
                      case "player-knocks-high":
                        return s.playerDowns - e.playerDowns;
                      default:
                        return 0;
                    }
                  }),
                [t, D, W, K],
              ),
              J = (0, n.useMemo)(() => {
                if (0 === t.length) return null;
                let e = t.filter((e) => null !== e.netValue),
                  s =
                    e.length > 0
                      ? Math.round(
                          e.reduce((e, s) => e + (s.netValue ?? 0), 0) /
                            e.length,
                        )
                      : 0,
                  a = t.filter(
                    (e) => null !== e.durationMs && e.durationMs > 0,
                  ),
                  r = (function (e) {
                    if (!e) return "--:--";
                    let s = Math.floor(e / 1e3),
                      a = Math.floor(s / 60);
                    return `${a}:${(s % 60).toString().padStart(2, "0")}`;
                  })(
                    a.length > 0
                      ? Math.round(
                          a.reduce((e, s) => e + (s.durationMs ?? 0), 0) /
                            a.length,
                        )
                      : 0,
                  ),
                  n = e.filter((e) => (e.netValue ?? 0) <= 6e5),
                  l =
                    n.length > 0
                      ? n.reduce((e, s) =>
                          (s.netValue ?? 0) > (e.netValue ?? 0) ? s : e,
                        )
                      : null,
                  i =
                    e.length > 0
                      ? e.reduce((e, s) =>
                          (s.netValue ?? 0) < (e.netValue ?? 0) ? s : e,
                        )
                      : null,
                  o = {},
                  c = {};
                e.forEach((e) => {
                  (o[e.mapName] || ((o[e.mapName] = 0), (c[e.mapName] = 0)),
                    (o[e.mapName] += e.netValue ?? 0),
                    c[e.mapName]++);
                });
                let d = {};
                Object.keys(o).forEach((e) => {
                  d[e] = Math.round(o[e] / c[e]);
                });
                let h = {};
                t.forEach((e) => {
                  e.killsBreakdownByEnemy.forEach((e) => {
                    e.targetName &&
                      !e.targetName.toLowerCase().includes("player") &&
                      (h[e.targetName] = (h[e.targetName] || 0) + e.amount);
                  });
                });
                let m = Object.entries(h);
                return {
                  avgProfit: s,
                  avgDurationFormatted: r,
                  bestRound: l,
                  worstRound: i,
                  avgProfitByMap: d,
                  mostDestroyedArc:
                    m.length > 0
                      ? m.reduce(
                          (e, [s, a]) =>
                            a > e.count
                              ? {
                                  name: s,
                                  count: a,
                                }
                              : e,
                          {
                            name: m[0][0],
                            count: m[0][1],
                          },
                        )
                      : null,
                };
              }, [t]),
              Z = (0, n.useMemo)(() => {
                if (t.length < 30) return null;
                let e = t.slice(0, 20),
                  s = t.slice(20),
                  a =
                    (e.filter((e) => "RETURNED SAFELY" === e.outcome).length /
                      e.length) *
                    100,
                  r = s.filter((e) => "RETURNED SAFELY" === e.outcome).length,
                  n = a - (s.length > 0 ? (r / s.length) * 100 : 0),
                  l = e.filter((e) => null !== e.netValue),
                  i =
                    l.length > 0
                      ? l.reduce((e, s) => e + (s.netValue ?? 0), 0) / l.length
                      : 0,
                  o = s.filter((e) => null !== e.netValue),
                  c =
                    i -
                    (o.length > 0
                      ? o.reduce((e, s) => e + (s.netValue ?? 0), 0) / o.length
                      : 0),
                  d = e.reduce((e, s) => e + s.arcKills, 0) / e.length,
                  h =
                    d -
                    (s.length > 0
                      ? s.reduce((e, s) => e + s.arcKills, 0) / s.length
                      : 0);
                return {
                  recentCount: 20,
                  survival: {
                    recent: a,
                    diff: n,
                    trend: n > 2 ? "up" : n < -2 ? "down" : "neutral",
                  },
                  profit: {
                    recent: Math.round(i),
                    diff: Math.round(c),
                    trend: c > 500 ? "up" : c < -500 ? "down" : "neutral",
                  },
                  kills: {
                    recent: d,
                    diff: h,
                    trend: h > 0.3 ? "up" : h < -0.3 ? "down" : "neutral",
                  },
                };
              }, [t]),
              ee = (0, n.useMemo)(() => {
                if (t.length < 3) return null;
                let e = 0,
                  s = null;
                for (let a of t) {
                  let t = "RETURNED SAFELY" === a.outcome;
                  if (null === s) ((s = t ? "win" : "loss"), (e = 1));
                  else if ((t && "win" === s) || (!t && "loss" === s)) e++;
                  else break;
                }
                let a = 0,
                  r = 0;
                for (let e of t)
                  "RETURNED SAFELY" === e.outcome
                    ? (a = Math.max(a, ++r))
                    : (r = 0);
                let n = 0,
                  l = 0;
                for (let e of t)
                  "KNOCKED OUT" === e.outcome
                    ? (n = Math.max(n, ++l))
                    : (l = 0);
                return {
                  current: {
                    count: e,
                    type: s,
                    isHot: "win" === s && e >= 3,
                  },
                  bestWin: a,
                  worstLoss: n,
                  maxPlayerKills:
                    t.length > 0 ? Math.max(...t.map((e) => e.playerKills)) : 0,
                  maxArcKills:
                    t.length > 0 ? Math.max(...t.map((e) => e.arcKills)) : 0,
                };
              }, [t]);
            return e
              ? E && 0 === t.length
                ? (0, r.jsx)("div", {
                    className: "round-history-section",
                    children: (0, r.jsxs)("div", {
                      className: "round-history-loading",
                      children: [
                        (0, r.jsx)(A, {}),
                        (0, r.jsx)("span", {
                          children: "Loading raid history...",
                        }),
                      ],
                    }),
                  })
                : I && 0 === t.length
                  ? (0, r.jsx)("div", {
                      className: "round-history-section",
                      children: (0, r.jsxs)("div", {
                        className: "round-history-error",
                        children: [
                          (0, r.jsx)("p", {
                            children: I,
                          }),
                          (0, r.jsx)("button", {
                            className: "round-history-retry-btn",
                            onClick: () => z(!0),
                            children: "Retry",
                          }),
                        ],
                      }),
                    })
                  : (0, r.jsxs)("div", {
                      className: "round-history-section",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "round-history-header",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "round-history-title-wrapper",
                              children: [
                                (0, r.jsx)(p, {
                                  className: "section-icon",
                                }),
                                (0, r.jsx)("h2", {
                                  className: "round-history-title",
                                  children: "Raid History",
                                }),
                                u &&
                                  (0, r.jsxs)("span", {
                                    className: "round-history-count",
                                    children: [u.totalRounds, " rounds"],
                                  }),
                              ],
                            }),
                            !a &&
                              (0, r.jsxs)("div", {
                                className: "section-header-actions",
                                children: [
                                  U &&
                                    (0, r.jsx)("span", {
                                      className: "last-synced-text",
                                      title: "Last synced time",
                                      children: U,
                                    }),
                                  (0, r.jsx)("button", {
                                    className: "round-history-refresh-btn",
                                    onClick: () => z(!0),
                                    disabled: E,
                                    title: "Refresh raid history",
                                    children: (0, r.jsx)(x, {
                                      className: E ? "spinning" : "",
                                    }),
                                  }),
                                ],
                              }),
                          ],
                        }),
                        u &&
                          (0, r.jsxs)("div", {
                            className: "overview-dashboard",
                            children: [
                              (0, r.jsx)("div", {
                                className: "overview-chart",
                                children: (0, r.jsx)(c, {
                                  extracted: u.extracted,
                                  died: u.died,
                                  size: 160,
                                }),
                              }),
                              (0, r.jsxs)("div", {
                                className: "overview-stats",
                                children: [
                                  (0, r.jsxs)("div", {
                                    className: "overview-stat",
                                    children: [
                                      (0, r.jsx)("div", {
                                        className:
                                          "overview-stat-icon extracted-icon",
                                        children: (0, r.jsx)(j, {}),
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "overview-stat-info",
                                        children: [
                                          (0, r.jsx)("span", {
                                            className:
                                              "overview-stat-value extracted-value",
                                            children: u.extracted,
                                          }),
                                          (0, r.jsx)("span", {
                                            className: "overview-stat-label",
                                            children: "Extracted",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "overview-stat",
                                    children: [
                                      (0, r.jsx)("div", {
                                        className:
                                          "overview-stat-icon died-icon",
                                        children: (0, r.jsx)(N, {}),
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "overview-stat-info",
                                        children: [
                                          (0, r.jsx)("span", {
                                            className:
                                              "overview-stat-value died-value",
                                            children: u.died,
                                          }),
                                          (0, r.jsx)("span", {
                                            className: "overview-stat-label",
                                            children: "Raids Lost",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "overview-stat",
                                    children: [
                                      (0, r.jsx)("div", {
                                        className:
                                          "overview-stat-icon profit-icon",
                                        children: (0, r.jsx)(v, {}),
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "overview-stat-info",
                                        children: [
                                          (0, r.jsx)("span", {
                                            className: `overview-stat-value ${u.totalNetValue >= 0 ? "positive-value" : "negative-value"}`,
                                            children: (0, o.formatValue)(
                                              u.totalNetValue,
                                            ),
                                          }),
                                          (0, r.jsx)("span", {
                                            className: "overview-stat-label",
                                            children: "Net Profit",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "overview-stat",
                                    children: [
                                      (0, r.jsx)("div", {
                                        className:
                                          "overview-stat-icon kills-icon",
                                        children: (0, r.jsx)(y, {}),
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "overview-stat-info",
                                        children: [
                                          (0, r.jsx)("span", {
                                            className:
                                              "overview-stat-value overview-stat-value--name",
                                            children:
                                              J && J.mostDestroyedArc
                                                ? J.mostDestroyedArc.name
                                                : "N/A",
                                          }),
                                          (0, r.jsx)("span", {
                                            className: "overview-stat-label",
                                            children: "Most Destroyed ARC",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              J &&
                                (0, r.jsxs)("div", {
                                  className: "overview-extra-stats",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      className: "extra-stat",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "extra-stat-label",
                                          children: "Avg. Profit",
                                        }),
                                        (0, r.jsx)("span", {
                                          className: `extra-stat-value ${J.avgProfit >= 0 ? "positive-value" : "negative-value"}`,
                                          children: (0, o.formatValue)(
                                            J.avgProfit,
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "extra-stat",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "extra-stat-label",
                                          children: "Avg. Duration",
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "extra-stat-value",
                                          children: J.avgDurationFormatted,
                                        }),
                                      ],
                                    }),
                                    J.bestRound &&
                                      (0, r.jsxs)("div", {
                                        className:
                                          "extra-stat extra-stat--best",
                                        children: [
                                          (0, r.jsxs)("span", {
                                            className: "extra-stat-label",
                                            children: [
                                              (0, r.jsx)(k, {
                                                className: "extra-stat-icon",
                                              }),
                                              "Best",
                                            ],
                                          }),
                                          (0, r.jsx)("span", {
                                            className:
                                              "extra-stat-value positive-value",
                                            children: (0, o.formatValue)(
                                              J.bestRound.netValue,
                                            ),
                                          }),
                                        ],
                                      }),
                                    J.worstRound &&
                                      (0, r.jsxs)("div", {
                                        className:
                                          "extra-stat extra-stat--worst",
                                        children: [
                                          (0, r.jsx)("span", {
                                            className: "extra-stat-label",
                                            children: "Worst",
                                          }),
                                          (0, r.jsx)("span", {
                                            className:
                                              "extra-stat-value negative-value",
                                            children: (0, o.formatValue)(
                                              J.worstRound.netValue,
                                            ),
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                            ],
                          }),
                        u &&
                          u.roundsByMap &&
                          Object.keys(u.roundsByMap).length > 0 &&
                          (0, r.jsx)(h, {
                            roundsByMap: u.roundsByMap,
                            profitByMap: J?.avgProfitByMap,
                          }),
                        (ee || Z) &&
                          (0, r.jsxs)("div", {
                            className: "performance-section",
                            children: [
                              (0, r.jsx)("div", {
                                className: "performance-section-header",
                                children: (0, r.jsx)("span", {
                                  className: "performance-section-title",
                                  children: "Performance Insights",
                                }),
                              }),
                              (0, r.jsxs)("div", {
                                className: "performance-section-content",
                                children: [
                                  ee &&
                                    (0, r.jsxs)(r.Fragment, {
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "streak-stats-compact",
                                          children: [
                                            (0, r.jsxs)("div", {
                                              className: `streak-chip ${ee.current.isHot ? "streak-chip--hot" : ""} ${"win" === ee.current.type ? "streak-chip--win" : "streak-chip--loss"}`,
                                              children: [
                                                ee.current.isHot
                                                  ? (0, r.jsx)(L, {})
                                                  : (0, r.jsx)(M, {}),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-value",
                                                  children: ee.current.count,
                                                }),
                                                (0, r.jsxs)("span", {
                                                  className:
                                                    "streak-chip-label",
                                                  children: [
                                                    "Current ",
                                                    "win" === ee.current.type
                                                      ? "Win"
                                                      : "Loss",
                                                    " Streak",
                                                  ],
                                                }),
                                                ee.current.isHot &&
                                                  (0, r.jsx)("span", {
                                                    className:
                                                      "streak-chip-badge",
                                                    children: "On Fire!",
                                                  }),
                                              ],
                                            }),
                                            (0, r.jsxs)("div", {
                                              className:
                                                "streak-chip streak-chip--best",
                                              children: [
                                                (0, r.jsx)(k, {}),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-value",
                                                  children: ee.bestWin,
                                                }),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-label",
                                                  children: "Best Win Streak",
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)("div", {
                                              className:
                                                "streak-chip streak-chip--worst",
                                              children: [
                                                (0, r.jsx)(N, {}),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-value",
                                                  children: ee.worstLoss,
                                                }),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-label",
                                                  children: "Worst Loss Streak",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, r.jsxs)("div", {
                                          className: "streak-stats-compact",
                                          children: [
                                            (0, r.jsxs)("div", {
                                              className:
                                                "streak-chip streak-chip--player-kills",
                                              children: [
                                                (0, r.jsx)(g, {}),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-value",
                                                  children: ee.maxPlayerKills,
                                                }),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-label",
                                                  children: "Most Player Kills",
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)("div", {
                                              className:
                                                "streak-chip streak-chip--arc-kills",
                                              children: [
                                                (0, r.jsx)(p, {}),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-value",
                                                  children: ee.maxArcKills,
                                                }),
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "streak-chip-label",
                                                  children: "Most ARC Kills",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  Z &&
                                    (0, r.jsxs)("div", {
                                      className: "trends-compact",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "trends-header",
                                          children: [
                                            (0, r.jsx)("span", {
                                              className: "trends-title",
                                              children: "Recent Performance",
                                            }),
                                            (0, r.jsxs)("span", {
                                              className: "trends-subtitle",
                                              children: [
                                                "Last ",
                                                Z.recentCount,
                                                " rounds",
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, r.jsxs)("div", {
                                          className: "trends-row",
                                          children: [
                                            (0, r.jsxs)("div", {
                                              className: `trend-chip trend-chip--${Z.survival.trend}`,
                                              children: [
                                                (0, r.jsxs)("div", {
                                                  className: "trend-chip-icon",
                                                  children: [
                                                    "up" === Z.survival.trend &&
                                                      (0, r.jsx)(w, {}),
                                                    "down" ===
                                                      Z.survival.trend &&
                                                      (0, r.jsx)(S, {}),
                                                    "neutral" ===
                                                      Z.survival.trend &&
                                                      (0, r.jsx)(C, {}),
                                                  ],
                                                }),
                                                (0, r.jsxs)("div", {
                                                  className: "trend-chip-info",
                                                  children: [
                                                    (0, r.jsx)("span", {
                                                      className:
                                                        "trend-chip-label",
                                                      children: "Survival",
                                                    }),
                                                    (0, r.jsxs)("span", {
                                                      className:
                                                        "trend-chip-value",
                                                      children: [
                                                        Z.survival.recent.toFixed(
                                                          0,
                                                        ),
                                                        "%",
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)("span", {
                                                  className:
                                                    "trend-chip-change",
                                                  children: [
                                                    Z.survival.diff > 0
                                                      ? "+"
                                                      : "",
                                                    Z.survival.diff.toFixed(1),
                                                    "%",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)("div", {
                                              className: `trend-chip trend-chip--${Z.profit.trend}`,
                                              children: [
                                                (0, r.jsxs)("div", {
                                                  className: "trend-chip-icon",
                                                  children: [
                                                    "up" === Z.profit.trend &&
                                                      (0, r.jsx)(w, {}),
                                                    "down" === Z.profit.trend &&
                                                      (0, r.jsx)(S, {}),
                                                    "neutral" ===
                                                      Z.profit.trend &&
                                                      (0, r.jsx)(C, {}),
                                                  ],
                                                }),
                                                (0, r.jsxs)("div", {
                                                  className: "trend-chip-info",
                                                  children: [
                                                    (0, r.jsx)("span", {
                                                      className:
                                                        "trend-chip-label",
                                                      children: "Avg. Profit",
                                                    }),
                                                    (0, r.jsx)("span", {
                                                      className:
                                                        "trend-chip-value",
                                                      children: (0,
                                                      o.formatValue)(
                                                        Z.profit.recent,
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)("span", {
                                                  className:
                                                    "trend-chip-change",
                                                  children: [
                                                    Z.profit.diff > 0
                                                      ? "+"
                                                      : "",
                                                    (0, o.formatValue)(
                                                      Z.profit.diff,
                                                    ),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)("div", {
                                              className: `trend-chip trend-chip--${Z.kills.trend}`,
                                              children: [
                                                (0, r.jsxs)("div", {
                                                  className: "trend-chip-icon",
                                                  children: [
                                                    "up" === Z.kills.trend &&
                                                      (0, r.jsx)(w, {}),
                                                    "down" === Z.kills.trend &&
                                                      (0, r.jsx)(S, {}),
                                                    "neutral" ===
                                                      Z.kills.trend &&
                                                      (0, r.jsx)(C, {}),
                                                  ],
                                                }),
                                                (0, r.jsxs)("div", {
                                                  className: "trend-chip-info",
                                                  children: [
                                                    (0, r.jsx)("span", {
                                                      className:
                                                        "trend-chip-label",
                                                      children:
                                                        "Avg. ARC Kills",
                                                    }),
                                                    (0, r.jsx)("span", {
                                                      className:
                                                        "trend-chip-value",
                                                      children:
                                                        Z.kills.recent.toFixed(
                                                          1,
                                                        ),
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)("span", {
                                                  className:
                                                    "trend-chip-change",
                                                  children: [
                                                    Z.kills.diff > 0 ? "+" : "",
                                                    Z.kills.diff.toFixed(1),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                        (0, r.jsxs)("div", {
                          className: "round-list-section",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "round-history-filters",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "filter-group",
                                  children: [
                                    (0, r.jsx)(b, {
                                      className: "filter-icon",
                                    }),
                                    (0, r.jsx)(m.FilterDropdown, {
                                      value: D,
                                      onChange: _,
                                      options: Q,
                                    }),
                                    (0, r.jsx)(m.FilterDropdown, {
                                      value: W,
                                      onChange: V,
                                      options: B,
                                    }),
                                    (0, r.jsx)(m.FilterDropdown, {
                                      value: K,
                                      onChange: O,
                                      options: P,
                                    }),
                                  ],
                                }),
                                ("all" !== D ||
                                  "all" !== W ||
                                  "recent" !== K) &&
                                  (0, r.jsx)("button", {
                                    className: "filter-clear-btn",
                                    onClick: () => {
                                      (_("all"), V("all"), O("recent"));
                                    },
                                    children: "Reset",
                                  }),
                                (0, r.jsxs)("span", {
                                  className: "filter-results",
                                  children: [
                                    "Showing ",
                                    X.length,
                                    " of ",
                                    t.length,
                                  ],
                                }),
                              ],
                            }),
                            (0, r.jsx)("div", {
                              className: "round-history-list",
                              children:
                                0 === X.length
                                  ? (0, r.jsx)("div", {
                                      className: "round-history-empty",
                                      children: (0, r.jsx)("p", {
                                        children:
                                          0 === t.length
                                            ? "No rounds found. Play some matches to see your history here!"
                                            : "No rounds match the current filters.",
                                      }),
                                    })
                                  : X.map((e) =>
                                      (0, r.jsx)(
                                        T,
                                        {
                                          round: e,
                                          isExpanded: H === e.roundId,
                                          onToggle: () =>
                                            Y((s) =>
                                              s === e.roundId
                                                ? null
                                                : e.roundId,
                                            ),
                                        },
                                        e.roundId,
                                      ),
                                    ),
                            }),
                          ],
                        }),
                      ],
                    })
              : (0, r.jsx)("div", {
                  className: "round-history-section",
                  children: (0, r.jsxs)("div", {
                    className: "feature-preview",
                    children: [
                      (0, r.jsxs)("div", {
                        className: "feature-preview__header",
                        children: [
                          (0, r.jsx)("h3", {
                            className: "feature-preview__title",
                            children: "Raid History",
                          }),
                          (0, r.jsx)("p", {
                            className: "feature-preview__subtitle",
                            children:
                              "Connect your Embark account to track your ARC Raiders match history",
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "feature-preview__grid",
                        children: [
                          (0, r.jsxs)("div", {
                            className: "feature-card feature-card--compact",
                            children: [
                              (0, r.jsx)("div", {
                                className: "feature-card__icon",
                                children: (0, r.jsx)(p, {}),
                              }),
                              (0, r.jsx)("h4", {
                                className: "feature-card__title",
                                children: "Match Results",
                              }),
                              (0, r.jsx)("p", {
                                className: "feature-card__description",
                                children:
                                  "See your ARC Raiders raid outcomes including extractions, deaths, and squad performance for every match.",
                              }),
                            ],
                          }),
                          (0, r.jsxs)("div", {
                            className: "feature-card feature-card--compact",
                            children: [
                              (0, r.jsx)("div", {
                                className: "feature-card__icon",
                                children: (0, r.jsxs)("svg", {
                                  width: "24",
                                  height: "24",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  children: [
                                    (0, r.jsx)("circle", {
                                      cx: "12",
                                      cy: "12",
                                      r: "10",
                                    }),
                                    (0, r.jsx)("line", {
                                      x1: "22",
                                      y1: "12",
                                      x2: "18",
                                      y2: "12",
                                    }),
                                    (0, r.jsx)("line", {
                                      x1: "6",
                                      y1: "12",
                                      x2: "2",
                                      y2: "12",
                                    }),
                                    (0, r.jsx)("line", {
                                      x1: "12",
                                      y1: "6",
                                      x2: "12",
                                      y2: "2",
                                    }),
                                    (0, r.jsx)("line", {
                                      x1: "12",
                                      y1: "22",
                                      x2: "12",
                                      y2: "18",
                                    }),
                                  ],
                                }),
                              }),
                              (0, r.jsx)("h4", {
                                className: "feature-card__title",
                                children: "Kill Tracking",
                              }),
                              (0, r.jsx)("p", {
                                className: "feature-card__description",
                                children:
                                  "See your player kills and ARC enemy eliminations for each specific raid, with per-match combat breakdowns.",
                              }),
                            ],
                          }),
                          (0, r.jsxs)("div", {
                            className: "feature-card feature-card--compact",
                            children: [
                              (0, r.jsx)("div", {
                                className: "feature-card__icon",
                                children: (0, r.jsxs)("svg", {
                                  width: "24",
                                  height: "24",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  children: [
                                    (0, r.jsx)("polygon", {
                                      points:
                                        "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6",
                                    }),
                                    (0, r.jsx)("line", {
                                      x1: "8",
                                      y1: "2",
                                      x2: "8",
                                      y2: "18",
                                    }),
                                    (0, r.jsx)("line", {
                                      x1: "16",
                                      y1: "6",
                                      x2: "16",
                                      y2: "22",
                                    }),
                                  ],
                                }),
                              }),
                              (0, r.jsx)("h4", {
                                className: "feature-card__title",
                                children: "Map Analysis",
                              }),
                              (0, r.jsx)("p", {
                                className: "feature-card__description",
                                children:
                                  "See your raid history broken down by map, with win rates, average loot, and performance trends per location.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                });
          },
        ],
        87241,
      ),
      e.s(
        [
          "PlayerStatsSection",
          0,
          ({ isConnected: e, publicData: s, isPublicView: a }) => {
            let [t, l] = (0, n.useState)(s ?? null),
              [c, d] = (0, n.useState)(!a),
              [h, m] = (0, n.useState)(null),
              [u, x] = (0, n.useState)(null),
              p = (0, n.useRef)(!1);
            (0, n.useEffect)(() => {
              let e = () => {
                let e = (0, $.getPlayerStatsCacheTimestamp)();
                e && x((0, i.formatTimeAgo)(e));
              };
              e();
              let s = setInterval(e, 6e4);
              return () => clearInterval(s);
            }, [t]);
            let j = (0, n.useCallback)(
              async (s = !1) => {
                if (e) {
                  (d(!0), m(null));
                  try {
                    s && (0, $.clearPlayerStatsCache)();
                    let e = await (0, $.fetchPlayerStats)(s);
                    l(e);
                    let a = (0, $.getPlayerStatsCacheTimestamp)();
                    a && x((0, i.formatTimeAgo)(a));
                  } catch (e) {
                    (console.error(
                      "[PlayerStatsSection] Failed to load stats:",
                      e,
                    ),
                      m(
                        e instanceof Error
                          ? e.message
                          : "Failed to load player stats",
                      ));
                  } finally {
                    d(!1);
                  }
                }
              },
              [e],
            );
            ((0, n.useEffect)(() => {
              if (a) return;
              if (!e) return void d(!1);
              if (p.current) return;
              p.current = !0;
              let s = (0, $.getCachedPlayerStats)();
              s
                ? (console.log("[PlayerStatsSection] Loading from cache"),
                  l(s.data),
                  x((0, i.formatTimeAgo)(s.timestamp)),
                  d(!1))
                : (console.log(
                    "[PlayerStatsSection] No cache found, fetching from API",
                  ),
                  j());
            }, [e, j]),
              (0, n.useEffect)(() => {
                e || ((p.current = !1), l(null), x(null));
              }, [e]));
            let v = (0, n.useMemo)(() => {
              if (!t?.scopedPlayerStats?.[0]?.playerStats) return null;
              let e = t.scopedPlayerStats[0].playerStats,
                s = (s) =>
                  e
                    .filter((e) => e.eventId === s)
                    .reduce((e, s) => e + s.amount, 0),
                a = s(9803),
                r = s(9800),
                n = s(9801),
                l = s(9802),
                i = e
                  .filter((e) => 200 === e.eventId && 0x3b54bb4b !== e.targetId)
                  .filter((e) => void 0 !== o.ENEMY_ID_TO_NAME[e.targetId])
                  .map((e) => ({
                    targetId: e.targetId,
                    name: o.ENEMY_ID_TO_NAME[e.targetId],
                    kills: e.amount,
                  }))
                  .sort((e, s) => s.kills - e.kills),
                c = i.reduce((e, s) => e + s.kills, 0),
                d = e.find(
                  (e) => 200 === e.eventId && 0x3b54bb4b === e.targetId,
                ),
                h = d?.amount || 0,
                m = e.find(
                  (e) => 204 === e.eventId && 0x3b54bb4b === e.targetId,
                ),
                u = m?.amount || 0,
                x = e.find(
                  (e) => 400 === e.eventId && -0xc4ca46 === e.targetId,
                ),
                p = x?.amount || 0,
                j = e.find(
                  (e) => 400 === e.eventId && 0x3b54bb4b === e.targetId,
                ),
                v = j?.amount || 0,
                N = e
                  .filter((e) => 100 === e.eventId)
                  .reduce((e, s) => e + s.amount, 0),
                f = e
                  .filter((e) => 202 === e.eventId)
                  .map((e) => {
                    var s;
                    let a;
                    return {
                      targetId: e.targetId,
                      name:
                        ((a = W[String((s = e.targetId))]),
                        a?.name || `Weapon ${s}`),
                      kills: e.amount,
                    };
                  }),
                y = new Map();
              for (let e of f) {
                let s = Z(e.name),
                  a = y.get(s);
                a
                  ? (a.kills += e.kills)
                  : y.set(s, {
                      baseName: s,
                      kills: e.kills,
                    });
              }
              let g = Array.from(y.values())
                  .map((e) => ({
                    targetId: 0,
                    name: e.baseName,
                    kills: e.kills,
                  }))
                  .sort((e, s) => s.kills - e.kills)
                  .slice(0, 8),
                k = Object.entries(o.MAP_ID_TO_NAME).map(([s, a]) => {
                  let t = Number(s),
                    r =
                      e.find((e) => 9800 === e.eventId && e.targetId === t)
                        ?.amount || 0,
                    n =
                      e.find((e) => 9801 === e.eventId && e.targetId === t)
                        ?.amount || 0,
                    l =
                      e.find((e) => 9802 === e.eventId && e.targetId === t)
                        ?.amount || 0,
                    i =
                      e.find((e) => 9803 === e.eventId && e.targetId === t)
                        ?.amount || 0,
                    o =
                      e.find((e) => 9805 === e.eventId && e.targetId === t)
                        ?.amount || 0,
                    c =
                      e.find((e) => 9804 === e.eventId && e.targetId === t)
                        ?.amount || 0;
                  return {
                    mapId: t,
                    mapName: a,
                    rounds: r,
                    extractions: n,
                    deaths: l,
                    timeMs: i,
                    valueExtracted: o,
                    valueBroughtIn: c,
                  };
                }),
                b = new Map();
              for (let e of k) {
                let s = b.get(e.mapName);
                s
                  ? ((s.rounds += e.rounds),
                    (s.extractions += e.extractions),
                    (s.deaths += e.deaths),
                    (s.timeMs += e.timeMs),
                    (s.netProfit += e.valueExtracted - e.valueBroughtIn))
                  : b.set(e.mapName, {
                      rounds: e.rounds,
                      extractions: e.extractions,
                      deaths: e.deaths,
                      timeMs: e.timeMs,
                      netProfit: e.valueExtracted - e.valueBroughtIn,
                    });
              }
              let w = Array.from(b.entries())
                  .map(([e, s]) => ({
                    mapName: e,
                    rounds: s.rounds,
                    survivalRate:
                      s.rounds > 0 ? (s.extractions / s.rounds) * 100 : 0,
                    timeMs: s.timeMs,
                    netProfit: s.netProfit,
                    color: K[e] || "#666",
                  }))
                  .filter((e) => e.rounds > 0)
                  .sort((e, s) => s.rounds - e.rounds),
                S = s(9805),
                C = s(9804),
                L = S - C,
                M = n > 0 ? Math.round(L / n) : 0;
              return {
                totalTimeMs: a,
                totalRounds: r,
                totalExtractions: n,
                totalDeaths: l,
                survivalRate: r > 0 ? (n / r) * 100 : 0,
                totalArcKills: c,
                totalDamage: N,
                playerKills: h,
                playerDowns: u,
                squadmateRevives: p,
                strangerRevives: v,
                arcEnemyKills: i,
                weaponKills: g,
                mapStats: w,
                totalValueExtracted: S,
                totalValueBroughtIn: C,
                totalNetProfit: L,
                avgProfitPerExtraction: M,
              };
            }, [t]);
            if (!e)
              return (0, r.jsx)("div", {
                className:
                  "player-stats-section player-stats-section--not-connected",
                children: (0, r.jsxs)("div", {
                  className: "feature-preview",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "feature-preview__header",
                      children: [
                        (0, r.jsx)("h3", {
                          className: "feature-preview__title",
                          children: "Player Statistics",
                        }),
                        (0, r.jsx)("p", {
                          className: "feature-preview__subtitle",
                          children:
                            "Connect your Embark account to view your ARC Raiders performance data",
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "feature-preview__grid",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "feature-card feature-card--compact",
                          children: [
                            (0, r.jsx)("div", {
                              className: "feature-card__icon",
                              children: (0, r.jsxs)("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                  (0, r.jsx)("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                  }),
                                  (0, r.jsx)("line", {
                                    x1: "22",
                                    y1: "12",
                                    x2: "18",
                                    y2: "12",
                                  }),
                                  (0, r.jsx)("line", {
                                    x1: "6",
                                    y1: "12",
                                    x2: "2",
                                    y2: "12",
                                  }),
                                  (0, r.jsx)("line", {
                                    x1: "12",
                                    y1: "6",
                                    x2: "12",
                                    y2: "2",
                                  }),
                                  (0, r.jsx)("line", {
                                    x1: "12",
                                    y1: "22",
                                    x2: "12",
                                    y2: "18",
                                  }),
                                ],
                              }),
                            }),
                            (0, r.jsx)("h4", {
                              className: "feature-card__title",
                              children: "Combat Stats",
                            }),
                            (0, r.jsx)("p", {
                              className: "feature-card__description",
                              children:
                                "Track your ARC Raiders kill/death ratio, damage dealt, player kills, and ARC enemy eliminations across all matches.",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "feature-card feature-card--compact",
                          children: [
                            (0, r.jsx)("div", {
                              className: "feature-card__icon",
                              children: (0, r.jsxs)("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                  (0, r.jsx)("path", {
                                    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14",
                                  }),
                                  (0, r.jsx)("polyline", {
                                    points: "22 4 12 14.01 9 11.01",
                                  }),
                                ],
                              }),
                            }),
                            (0, r.jsx)("h4", {
                              className: "feature-card__title",
                              children: "Survival Rate",
                            }),
                            (0, r.jsx)("p", {
                              className: "feature-card__description",
                              children:
                                "Monitor your ARC Raiders extraction success rate, total raids survived, and survival trends over time.",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "feature-card feature-card--compact",
                          children: [
                            (0, r.jsx)("div", {
                              className: "feature-card__icon",
                              children: (0, r.jsxs)("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                  (0, r.jsx)("path", {
                                    d: "M18 20V10",
                                  }),
                                  (0, r.jsx)("path", {
                                    d: "M12 20V4",
                                  }),
                                  (0, r.jsx)("path", {
                                    d: "M6 20v-6",
                                  }),
                                ],
                              }),
                            }),
                            (0, r.jsx)("h4", {
                              className: "feature-card__title",
                              children: "Weapon Analysis",
                            }),
                            (0, r.jsx)("p", {
                              className: "feature-card__description",
                              children:
                                "See your top ARC Raiders weapons ranked by kills, discover your most effective loadouts, and compare weapon performance.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              });
            if (c)
              return (0, r.jsx)("div", {
                className: "player-stats-section player-stats-section--loading",
                children: (0, r.jsxs)("div", {
                  className: "stats-loading",
                  children: [
                    (0, r.jsx)(G, {}),
                    (0, r.jsx)("span", {
                      children: "Loading player stats...",
                    }),
                  ],
                }),
              });
            if (h)
              return (0, r.jsx)("div", {
                className: "player-stats-section player-stats-section--error",
                children: (0, r.jsxs)("div", {
                  className: "stats-error",
                  children: [
                    (0, r.jsx)("p", {
                      children: h,
                    }),
                    (0, r.jsx)("button", {
                      onClick: () => {
                        j(!0);
                      },
                      className: "retry-button",
                      children: "Try Again",
                    }),
                  ],
                }),
              });
            if (!v)
              return (0, r.jsx)("div", {
                className: "player-stats-section player-stats-section--empty",
                children: (0, r.jsxs)("div", {
                  className: "stats-empty-state",
                  children: [
                    (0, r.jsx)(U, {
                      className: "empty-icon",
                    }),
                    (0, r.jsx)("h3", {
                      children: "No Stats Available",
                    }),
                    (0, r.jsx)("p", {
                      children: "Play some rounds to see your statistics here.",
                    }),
                  ],
                }),
              });
            let N =
                v.arcEnemyKills.length > 0
                  ? Math.max(...v.arcEnemyKills.map((e) => e.kills))
                  : 0,
              f =
                v.weaponKills.length > 0
                  ? Math.max(...v.weaponKills.map((e) => e.kills))
                  : 0;
            return (0, r.jsxs)("div", {
              className: "player-stats-section",
              children: [
                (0, r.jsxs)("div", {
                  className: "player-stats-header",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "player-stats-title-wrapper",
                      children: [
                        (0, r.jsx)(U, {
                          className: "section-icon",
                        }),
                        (0, r.jsx)("h2", {
                          className: "player-stats-title",
                          children: "Player Statistics",
                        }),
                      ],
                    }),
                    !a &&
                      (0, r.jsxs)("div", {
                        className: "section-header-actions",
                        children: [
                          u &&
                            (0, r.jsx)("span", {
                              className: "last-synced-text",
                              title: "Last synced time",
                              children: u,
                            }),
                          (0, r.jsx)("button", {
                            className: "player-stats-refresh-btn",
                            onClick: () => {
                              j(!0);
                            },
                            disabled: c,
                            title: "Refresh player stats",
                            children: (0, r.jsx)(Q, {
                              className: c ? "spinning" : "",
                            }),
                          }),
                        ],
                      }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "stats-hero-row",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "hero-stat-card",
                      children: [
                        (0, r.jsx)("div", {
                          className: "hero-stat-icon",
                          children: (0, r.jsx)(O, {}),
                        }),
                        (0, r.jsxs)("div", {
                          className: "hero-stat-content",
                          children: [
                            (0, r.jsx)("span", {
                              className: "hero-stat-value",
                              children: X(v.totalTimeMs),
                            }),
                            (0, r.jsx)("span", {
                              className: "hero-stat-label",
                              children: "Time Topside",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "hero-stat-card",
                      children: [
                        (0, r.jsx)("div", {
                          className: "hero-stat-icon",
                          children: (0, r.jsx)(F, {}),
                        }),
                        (0, r.jsxs)("div", {
                          className: "hero-stat-content",
                          children: [
                            (0, r.jsx)("span", {
                              className: "hero-stat-value",
                              children: v.totalRounds.toLocaleString(),
                            }),
                            (0, r.jsx)("span", {
                              className: "hero-stat-label",
                              children: "Total Rounds",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "hero-stat-card",
                      children: [
                        (0, r.jsx)("div", {
                          className: "hero-stat-icon survival-icon",
                          children: (0, r.jsx)(H, {}),
                        }),
                        (0, r.jsxs)("div", {
                          className: "hero-stat-content",
                          children: [
                            (0, r.jsxs)("span", {
                              className: "hero-stat-value",
                              children: [v.survivalRate.toFixed(1), "%"],
                            }),
                            (0, r.jsx)("span", {
                              className: "hero-stat-label",
                              children: "Survival Rate",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "hero-stat-card",
                      children: [
                        (0, r.jsx)("div", {
                          className: "hero-stat-icon kills-icon",
                          children: (0, r.jsx)(U, {}),
                        }),
                        (0, r.jsxs)("div", {
                          className: "hero-stat-content",
                          children: [
                            (0, r.jsx)("span", {
                              className: "hero-stat-value",
                              children: v.totalArcKills.toLocaleString(),
                            }),
                            (0, r.jsx)("span", {
                              className: "hero-stat-label",
                              children: "ARC Destroyed",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "stats-content-grid",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "stats-column",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "stats-card",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "stats-card-header",
                              children: [
                                (0, r.jsx)("h3", {
                                  children: "ARC Enemies Destroyed",
                                }),
                                (0, r.jsx)("span", {
                                  className: "stats-card-subtitle",
                                  children: "Breakdown by enemy type",
                                }),
                              ],
                            }),
                            (0, r.jsx)(_, {
                              items: v.arcEnemyKills.map((e) => ({
                                id: e.targetId,
                                name: e.name,
                                value: e.kills,
                              })),
                              maxValue: N,
                              highlightColor: "#00ff88",
                              animationDelay: 80,
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "stats-card",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "stats-card-header",
                              children: [
                                (0, r.jsx)("h3", {
                                  children: "Top Weapons",
                                }),
                                (0, r.jsx)("span", {
                                  className: "stats-card-subtitle",
                                  children: "By total kills (ARCs & Raiders)",
                                }),
                              ],
                            }),
                            (0, r.jsx)(_, {
                              items: v.weaponKills.map((e) => ({
                                id: e.name,
                                name: e.name,
                                value: e.kills,
                              })),
                              maxValue: f,
                              highlightColor: "#4a9eff",
                              animationDelay: 80,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "stats-column",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "stats-card",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "stats-card-header",
                              children: [
                                (0, r.jsx)("h3", {
                                  children: "Map Performance",
                                }),
                                (0, r.jsx)("span", {
                                  className: "stats-card-subtitle",
                                  children: "Stats by map",
                                }),
                              ],
                            }),
                            (0, r.jsx)("div", {
                              className: "map-performance-rows",
                              children: v.mapStats.map((e) =>
                                (0, r.jsxs)(
                                  "div",
                                  {
                                    className: "map-perf-row",
                                    style: {
                                      "--map-color": e.color,
                                    },
                                    children: [
                                      (0, r.jsx)("div", {
                                        className: "map-perf-row-left",
                                        children: (0, r.jsx)("span", {
                                          className: "map-perf-row-name",
                                          children: e.mapName,
                                        }),
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "map-perf-row-bar-wrapper",
                                        children: [
                                          (0, r.jsx)("div", {
                                            className:
                                              "map-perf-row-bar-container",
                                            children: (0, r.jsx)("div", {
                                              className: "map-perf-row-bar",
                                              style: {
                                                width: `${e.survivalRate}%`,
                                              },
                                            }),
                                          }),
                                          (0, r.jsxs)("span", {
                                            className: "map-perf-row-percent",
                                            children: [
                                              e.survivalRate.toFixed(1),
                                              "%",
                                              (0, r.jsx)("span", {
                                                className:
                                                  "map-perf-row-percent-label",
                                                children: "survival",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "map-perf-row-stats",
                                        children: [
                                          (0, r.jsxs)("span", {
                                            className: "map-perf-row-stat",
                                            children: [
                                              (0, r.jsx)("span", {
                                                className: "map-stat-value",
                                                children:
                                                  e.rounds.toLocaleString(),
                                              }),
                                              (0, r.jsx)("span", {
                                                className: "map-stat-label",
                                                children: "rounds",
                                              }),
                                            ],
                                          }),
                                          (0, r.jsx)("span", {
                                            className: "map-perf-row-stat",
                                            children: (0, r.jsx)("span", {
                                              className: "map-stat-value",
                                              children: X(e.timeMs),
                                            }),
                                          }),
                                          (0, r.jsx)("span", {
                                            className: `map-perf-row-stat ${e.netProfit >= 0 ? "profit-positive" : "profit-negative"}`,
                                            children: (0, r.jsx)("span", {
                                              className: "map-stat-value",
                                              children: J(e.netProfit),
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e.mapName,
                                ),
                              ),
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "stats-card",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "stats-card-header",
                              children: [
                                (0, r.jsx)("h3", {
                                  children: "Combat Summary",
                                }),
                                (0, r.jsx)("span", {
                                  className: "stats-card-subtitle",
                                  children: "Overall combat stats",
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "combat-summary-grid",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "combat-summary-stat",
                                  children: [
                                    (0, r.jsx)(Y, {
                                      className: "combat-summary-icon",
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "combat-summary-content",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "combat-summary-value",
                                          children:
                                            v.totalDamage.toLocaleString(),
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "combat-summary-label",
                                          children: "Total Damage Dealt",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "combat-summary-stat",
                                  children: [
                                    (0, r.jsx)(U, {
                                      className: "combat-summary-icon pvp-icon",
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "combat-summary-content",
                                      children: [
                                        (0, r.jsxs)("span", {
                                          className: "combat-summary-value",
                                          children: [
                                            v.playerDowns.toLocaleString(),
                                            " / ",
                                            v.playerKills.toLocaleString(),
                                          ],
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "combat-summary-label",
                                          children: "Players Knocked / Killed",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "combat-summary-stat",
                                  children: [
                                    (0, r.jsx)(H, {
                                      className:
                                        "combat-summary-icon extraction-icon",
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "combat-summary-content",
                                      children: [
                                        (0, r.jsxs)("span", {
                                          className: "combat-summary-value",
                                          children: [
                                            v.totalExtractions,
                                            " / ",
                                            v.totalDeaths,
                                          ],
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "combat-summary-label",
                                          children: "Extractions / Deaths",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "combat-summary-stat",
                                  children: [
                                    (0, r.jsx)(z, {
                                      className:
                                        "combat-summary-icon revive-icon",
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "combat-summary-content",
                                      children: [
                                        (0, r.jsxs)("span", {
                                          className: "combat-summary-value",
                                          children: [
                                            v.squadmateRevives.toLocaleString(),
                                            " / ",
                                            v.strangerRevives.toLocaleString(),
                                          ],
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "combat-summary-label",
                                          children:
                                            "Revives (Squadmates / Strangers)",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "stats-card",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "stats-card-header",
                              children: [
                                (0, r.jsx)("h3", {
                                  children: "Economy",
                                }),
                                (0, r.jsx)("span", {
                                  className: "stats-card-subtitle",
                                  children: "Overall value stats",
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "economy-stats-grid",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "economy-stat",
                                  children: [
                                    (0, r.jsx)("div", {
                                      className: "economy-stat-icon",
                                      children: (0, r.jsx)(q, {}),
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "economy-stat-content",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: "economy-stat-value",
                                          children:
                                            v.totalValueExtracted.toLocaleString(),
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "economy-stat-label",
                                          children: "Total Value Extracted",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "economy-stat",
                                  children: [
                                    (0, r.jsx)("div", {
                                      className: "economy-stat-icon net-icon",
                                      children: (0, r.jsx)("span", {
                                        className:
                                          v.totalNetProfit >= 0
                                            ? "positive"
                                            : "negative",
                                        children:
                                          v.totalNetProfit >= 0 ? "+" : "-",
                                      }),
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "economy-stat-content",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: `economy-stat-value ${v.totalNetProfit >= 0 ? "profit-positive" : "profit-negative"}`,
                                          children: J(v.totalNetProfit),
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "economy-stat-label",
                                          children: "Net Profit/Loss",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "economy-stat",
                                  children: [
                                    (0, r.jsx)("div", {
                                      className: "economy-stat-icon avg-icon",
                                      children: (0, r.jsx)("span", {
                                        children: "~",
                                      }),
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "economy-stat-content",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className: `economy-stat-value ${v.avgProfitPerExtraction >= 0 ? "profit-positive" : "profit-negative"}`,
                                          children: J(v.avgProfitPerExtraction),
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "economy-stat-label",
                                          children: "Avg Profit/Extraction",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          },
        ],
        39175,
      ));
  },
]);

const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["js/Home-B_RAXqwn.js", "js/vendor-IfRri_3N.js", "js/maps-BEXJEZTU.js", "css/maps-Dgihpmma.css", "css/vendor-BZV40eAE.css", "js/neon-border-6sO47D8Q.js", "css/neon-border-D3e7XxAi.css", "js/creatorBannerService-Cmvs7rmL.js", "js/firebase-CTomuqQ1.js", "js/VideoBackground-YjIe15hI.js", "css/Home-CV71sgvg.css", "css/Home-BcyT6InW.css", "js/Items-BV0_y3BP.js", "js/bilingualSearch-pORILSNQ.js", "js/itemsService-CoAZVRcv.js", "js/input-BeVyshQa.js", "js/spinner-B6MTozGs.js", "js/checkbox-Dpc0jHjQ.js", "js/label-CjSeic9K.js", "css/Items-7x5cnflj.css", "js/MapTimers-DWJsmUR5.js", "js/timerSuggestionsService-DXicaF6K.js", "js/select-CwL14Vcc.js", "js/badge-dBc-2zY2.js", "js/textarea-ClY0zSMz.js", "css/MapTimers-Ziz-VnHN.css", "js/InteractiveMaps-BZF2c0Ri.js", "js/LevelSelector-Bof3DHXi.js", "js/card-ay00x62V.js", "js/separator-B-eF_lki.js", "css/InteractiveMaps-D4Zt8iYk.css", "js/Quests-DhaqlQNR.js", "css/Quests-BYimkkcK.css", "js/Projects-DwaqMpHk.js", "js/ItemProgressSlider-Co710HPZ.js", "js/slider-BjelFBSB.js", "css/ItemProgressSlider-DvFM8sxA.css", "css/Projects-CSPzPN3n.css", "js/Blueprints-C5gX3__T.js", "js/Blueprints-BaOEbT2m.js", "css/Blueprints-C3ieu-h-.css", "js/HideoutPlanner-BPdKvcfY.js", "css/HideoutPlanner-DzgH0_m6.css", "js/MissingItems-Dy7y95_a.js", "css/MissingItems-ByNna9Sv.css", "js/SkillTree-DdRXDmtj.js", "js/sharedBuildsService-Ds9LwuNB.js", "css/SkillTree-CBvekQnx.css", "js/Support-Ckj5A99A.js", "css/Support-Ch7hgWhH.css", "js/Trials-fU35hQ1f.js", "css/Trials-4dr0eQMl.css", "js/MapsHub-CnFqw7Ll.js", "css/MapsHub-B5WOp6Sk.css", "js/WorkshopHub-DHM77djm.js", "css/WorkshopHub-DLds9WSv.css", "js/RaiderHub-BOo3LPvW.js", "css/RaiderHub-D2-vzPsE.css", "js/AdminHome-muc6Eewl.js", "css/AdminHome-Dq-ObkZz.css", "js/AdminMaps-ChJWTCP7.js", "js/AdminTimers-Cnw0nHuX.js", "js/tabs-DPEwAp6q.js", "js/AdminQuests-DsIMgVhb.js", "js/AdminItems-DRujKKdK.js", "js/AdminSettings-BOMr8oEd.js", "js/AdminBlueprints-DYoWnrCj.js", "js/AdminUsers-Bhs_WynP.js", "js/PrivacyPolicy-BTJDPOgK.js", "js/TermsOfService-rm568V8N.js", "js/CookiePolicy-C-K0pqvr.js", "js/Settings-Dz1qEkLu.js", "js/Profile-DYG_xM89.js", "js/Market-Cion4msL.js", "js/SharedBuilds-Dj3PE05j.js", "js/LoadoutBuilder-BelJYQyq.js", "js/About-DwbUuze9.js", "js/ForSale-DpuNybfP.js"]))) => i.map(i => d[i]);
var e = Object.defineProperty
  , t = (t, i, a) => ( (t, i, a) => i in t ? e(t, i, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: a
}) : t[i] = a)(t, "symbol" != typeof i ? i + "" : i, a);
import {r as i, j as a, i as o, a as r, u as n, L as s, t as l, b as c, S as d, d as u, C as p, e as m, R as g, T as h, X as b, f, h as v, U as y, k as _, V as w, l as x, m as k, n as S, p as C, H as j, q as R, s as T, v as A, P as z, A as I, w as P, x as N, y as M, M as D, z as B, B as E, D as L, E as O, F as q, G as F, I as U, J as G, K as H, N as V, O as W, Q as $, W as Q, Y as K, Z as Y, _ as J, $ as Z, a0 as X, a1 as ee, a2 as te, a3 as ie, a4 as ae, a5 as oe, a6 as re, a7 as ne, a8 as se, a9 as le, aa as ce, ab as de, ac as ue, ad as pe, ae as me, af as ge, ag as he, ah as be, ai as fe, aj as ve, ak as ye, al as _e, am as we} from "./vendor-IfRri_3N.js";
import {i as xe, g as ke, G as Se, a as Ce, b as je, o as Re, c as Te, d as Ae, e as ze, s as Ie, f as Pe, h as Ne, j as Me, k as De, q as Be, w as Ee, r as Le, l as Oe, m as qe, n as Fe, p as Ue, t as Ge, u as He, v as Ve, x as We, y as $e, z as Qe, A as Ke} from "./firebase-CTomuqQ1.js";
import "./maps-BEXJEZTU.js";
!function() {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
            t(e);
        new MutationObserver(e => {
            for (const i of e)
                if ("childList" === i.type)
                    for (const e of i.addedNodes)
                        "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
        }
        ).observe(document, {
            childList: !0,
            subtree: !0
        })
    }
    function t(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const t = function(e) {
            const t = {};
            return e.integrity && (t.integrity = e.integrity),
            e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
            "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin",
            t
        }(e);
        fetch(e.href, t)
    }
}();
const Ye = {}
  , Je = function(e, t, i) {
    let a = Promise.resolve();
    if (t && t.length > 0) {
        document.getElementsByTagName("link");
        const e = document.querySelector("meta[property=csp-nonce]")
          , i = (null == e ? void 0 : e.nonce) || (null == e ? void 0 : e.getAttribute("nonce"));
        a = Promise.allSettled(t.map(e => {
            if ((e = function(e) {
                return "/" + e
            }(e))in Ye)
                return;
            Ye[e] = !0;
            const t = e.endsWith(".css")
              , a = t ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${e}"]${a}`))
                return;
            const o = document.createElement("link");
            return o.rel = t ? "stylesheet" : "modulepreload",
            t || (o.as = "script"),
            o.crossOrigin = "",
            o.href = e,
            i && o.setAttribute("nonce", i),
            document.head.appendChild(o),
            t ? new Promise( (t, i) => {
                o.addEventListener("load", t),
                o.addEventListener("error", () => i(new Error(`Unable to preload CSS for ${e}`)))
            }
            ) : void 0
        }
        ))
    }
    function o(e) {
        const t = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (t.payload = e,
        window.dispatchEvent(t),
        !t.defaultPrevented)
            throw e
    }
    return a.then(t => {
        for (const e of t || [])
            "rejected" === e.status && o(e.reason);
        return e().catch(o)
    }
    )
}
  , Ze = i.createContext(void 0);
function Xe({children: e}) {
    const [t] = i.useState("bw");
    return i.useEffect( () => {
        document.documentElement.setAttribute("data-theme", "bw")
    }
    , []),
    a.jsx(Ze.Provider, {
        value: {
            theme: t,
            toggleTheme: () => {}
        },
        children: e
    })
}
function et() {
    const e = i.useContext(Ze);
    if (void 0 === e)
        throw new Error("useTheme must be used within a ThemeProvider");
    return e
}
const tt = xe({
    apiKey: "AIzaSyBspoyRn515lAjt8TMOsLdFUjCvx0yRMG4",
    authDomain: "arc-raiders-central.firebaseapp.com",
    projectId: "arc-raiders-central",
    storageBucket: "arc-raiders-central.firebasestorage.app",
    messagingSenderId: "1004305012260",
    appId: "1:1004305012260:web:85f7da95c0fde43657eab1"
})
  , it = ke(tt)
  , at = new Se
  , ot = Ce(tt);
function rt(e) {
    window.gtag && window.gtag("event", "kofi_click", {
        event_category: "donation",
        event_label: e,
        value: 1
    })
}
function nt(e) {
    window.gtag && window.gtag("event", "google_login", {
        event_category: "authentication",
        event_label: e,
        value: "success" === e ? 1 : 0
    })
}
je(tt);
const st = "user-settings";
async function lt(e) {
    const t = ze(ot, st, e)
      , i = await Pe(t);
    return i.exists() ? i.data() : null
}
async function ct(e, t, i) {
    const a = await lt(e);
    if (a) {
        if (a.photoURL !== i) {
            const t = ze(ot, st, e);
            return await Ie(t, {
                ...a,
                photoURL: i,
                updatedAt: Date.now()
            }),
            {
                ...a,
                photoURL: i
            }
        }
        return a
    }
    return async function(e, t, i) {
        const a = Date.now()
          , o = {
            id: e,
            displayName: t,
            originalGoogleName: t,
            photoURL: i,
            nicknameHistory: [{
                nickname: t,
                changedAt: a
            }],
            lastNicknameChange: null,
            createdAt: a,
            updatedAt: a
        }
          , r = ze(ot, st, e);
        return await Ie(r, o),
        o
    }(e, t, i)
}
function dt(e) {
    if (!e.lastNicknameChange)
        return {
            canChange: !0,
            daysRemaining: 0
        };
    const t = (Date.now() - e.lastNicknameChange) / 864e5;
    return {
        canChange: t >= 30,
        daysRemaining: Math.max(0, Math.ceil(30 - t))
    }
}
function ut(e) {
    const t = e.trim();
    return t.length < 3 ? {
        valid: !1,
        error: "settings.errors.nicknameTooShort"
    } : t.length > 25 ? {
        valid: !1,
        error: "settings.errors.nicknameTooLong"
    } : /^[a-zA-Z0-9\s_-]+$/.test(t) ? {
        valid: !0
    } : {
        valid: !1,
        error: "settings.errors.nicknameInvalidChars"
    }
}
async function pt(e, t) {
    const i = await lt(e);
    if (!i)
        return {
            success: !1,
            error: "settings.errors.userNotFound"
        };
    const {canChange: a} = dt(i);
    if (!a)
        return {
            success: !1,
            error: "settings.errors.cooldownActive"
        };
    const o = ut(t);
    if (!o.valid)
        return {
            success: !1,
            error: o.error
        };
    const r = t.trim();
    if (r === i.displayName)
        return {
            success: !1,
            error: "settings.errors.sameNickname"
        };
    const n = Date.now()
      , s = {
        nickname: r,
        changedAt: n
    }
      , l = {
        ...i,
        displayName: r,
        nicknameHistory: [...i.nicknameHistory, s],
        lastNicknameChange: n,
        updatedAt: n
    }
      , c = ze(ot, st, e);
    await Ie(c, l);
    const d = ze(ot, "chat-users", e);
    return await Ie(d, {
        id: e,
        displayName: r,
        photoURL: i.photoURL,
        lastSeen: n
    }, {
        merge: !0
    }),
    {
        success: !0,
        settings: l
    }
}
async function mt(e) {
    const t = await lt(e);
    if (t)
        return t;
    const i = ze(ot, "chat-users", e)
      , a = await Pe(i);
    if (a.exists()) {
        const t = a.data()
          , i = Date.now();
        return {
            id: e,
            displayName: t.displayName || "Unknown User",
            originalGoogleName: t.displayName || "Unknown User",
            photoURL: t.photoURL || null,
            nicknameHistory: [{
                nickname: t.displayName || "Unknown User",
                changedAt: t.lastSeen || i
            }],
            lastNicknameChange: null,
            createdAt: t.lastSeen || i,
            updatedAt: t.lastSeen || i
        }
    }
    return null
}
function gt(e) {
    return Re(Te(ot, st), t => {
        const i = [];
        t.forEach(e => {
            i.push(e.data())
        }
        ),
        e(i)
    }
    )
}
async function ht(e, t) {
    const i = ze(ot, st, e);
    await Ie(i, {
        isBannedSocial: t,
        updatedAt: Date.now()
    }, {
        merge: !0
    })
}
async function bt(e, t) {
    const i = ze(ot, st, e);
    await Ie(i, {
        isBannedPlatform: t,
        updatedAt: Date.now()
    }, {
        merge: !0
    })
}
async function ft(e) {
    await Ae(ze(ot, st, e)),
    await Ae(ze(ot, "chat-users", e))
}
async function vt(e) {
    try {
        const t = await lt(e);
        if (!t)
            return !1;
        const i = ze(ot, st, e);
        return await Ie(i, {
            ...t,
            marketDisclaimerAccepted: !0,
            updatedAt: Date.now()
        }),
        !0
    } catch {
        return !1
    }
}
const yt = i.createContext(void 0);
function _t({children: e}) {
    const [t,o] = i.useState(null)
      , [r,n] = i.useState(!0)
      , [s,l] = i.useState(!1);
    return i.useEffect( () => Me(it, async e => {
        if (e) {
            try {
                const t = await ct(e.uid, e.displayName || "Unknown", e.photoURL || null);
                if (null == t ? void 0 : t.isBannedPlatform)
                    return l(!0),
                    await De(it),
                    o(null),
                    void n(!1);
                const i = ze(ot, "chat-users", e.uid);
                await Ie(i, {
                    id: e.uid,
                    displayName: (null == t ? void 0 : t.displayName) || e.displayName || "Unknown",
                    photoURL: (null == t ? void 0 : t.photoURL) || e.photoURL || null,
                    lastSeen: Date.now()
                }, {
                    merge: !0
                })
            } catch {}
            l(!1)
        }
        o(e),
        n(!1)
    }
    ), []),
    a.jsx(yt.Provider, {
        value: {
            user: t,
            loading: r,
            isBannedPlatform: s,
            signInWithGoogle: async () => {
                nt("start");
                try {
                    await qe(it, at),
                    nt("success")
                } catch (e) {
                    throw nt("error"),
                    e
                }
            }
            ,
            signOut: async () => {
                try {
                    await De(it)
                } catch (e) {
                    throw e
                }
            }
            ,
            deleteAccount: async () => {
                if (!t)
                    return {
                        success: !1,
                        error: "No user logged in"
                    };
                try {
                    const e = new Se;
                    await Le(t, e);
                    const i = async (e, i) => {
                        const a = Be(Te(ot, e), Ee(i, "==", t.uid))
                          , o = await Ne(a);
                        await Promise.all(o.docs.map(t => Ae(ze(ot, e, t.id))))
                    }
                    ;
                    return await Promise.all([Ae(ze(ot, "user-preferences", t.uid)), Ae(ze(ot, "user-settings", t.uid)), Ae(ze(ot, "projects", t.uid)), Ae(ze(ot, "user-quests", t.uid)), Ae(ze(ot, "custom-map-pins", t.uid)), Ae(ze(ot, "hideout", t.uid)), Ae(ze(ot, "skillTreeBuilds", t.uid)), Ae(ze(ot, "blueprints", t.uid)), Ae(ze(ot, "user-trials", t.uid)), Ae(ze(ot, "chat-users", t.uid)), Ae(ze(ot, "user-reputation", t.uid))]),
                    await Promise.all([i("global-chat", "senderId"), i("community-posts", "author.id"), i("community-feedback", "author.id"), i("community-comments", "author.id"), i("market-listings", "author.id")]),
                    await Oe(t),
                    {
                        success: !0
                    }
                } catch (e) {
                    return "auth/requires-recent-login" === e.code ? {
                        success: !1,
                        error: "auth/requires-recent-login"
                    } : {
                        success: !1,
                        error: "unknown"
                    }
                }
            }
            ,
            exportUserData: async () => {
                if (!t)
                    return null;
                try {
                    const e = async (e, t) => {
                        const i = await Pe(ze(ot, e, t));
                        return i.exists() ? i.data() : null
                    }
                      , i = async (e, i) => {
                        const a = Be(Te(ot, e), Ee(i, "==", t.uid));
                        return (await Ne(a)).docs.map(e => ({
                            id: e.id,
                            ...e.data()
                        }))
                    }
                      , [a,o,r,n,s,l,c,d,u,p,m] = await Promise.all([e("user-preferences", t.uid), e("user-settings", t.uid), e("projects", t.uid), e("user-quests", t.uid), e("custom-map-pins", t.uid), e("hideout", t.uid), e("skillTreeBuilds", t.uid), e("blueprints", t.uid), e("user-trials", t.uid), e("chat-users", t.uid), e("user-reputation", t.uid)])
                      , [g,h,b,f,v,y] = await Promise.all([i("global-chat", "senderId"), i("community-posts", "author.id"), i("community-feedback", "author.id"), i("community-comments", "author.id"), i("market-listings", "author.id"), i("market-reviews", "reviewerId")]);
                    return {
                        preferences: a,
                        settings: o,
                        projects: r,
                        quests: n,
                        customMapPins: s,
                        hideout: l,
                        skillTreeBuilds: c,
                        blueprints: d,
                        trials: u,
                        chatUser: p,
                        reputation: m,
                        globalChatMessages: g,
                        communityPosts: h,
                        communityFeedback: b,
                        communityComments: f,
                        marketListings: v,
                        marketReviews: y,
                        exportedAt: (new Date).toISOString()
                    }
                } catch (e) {
                    return null
                }
            }
        },
        children: e
    })
}
function wt() {
    const e = i.useContext(yt);
    if (void 0 === e)
        throw new Error("useAuth must be used within an AuthProvider");
    return e
}
const xt = i.createContext(void 0);
function kt({children: e}) {
    const {user: t} = wt()
      , i = "anto.bertu@gmail.com" === (null == t ? void 0 : t.email);
    return a.jsx(xt.Provider, {
        value: {
            isAdmin: i
        },
        children: e
    })
}
function St() {
    const e = i.useContext(xt);
    if (void 0 === e)
        throw new Error("useAdmin must be used within an AdminProvider");
    return e
}
const Ct = "arc-raiders-language"
  , jt = localStorage.getItem(Ct) || (navigator.language.toLowerCase().startsWith("it") ? "it" : "en");
localStorage.getItem(Ct) || localStorage.setItem(Ct, jt),
o.use(r).init({
    resources: {
        en: {
            translation: {
                nav: {
                    home: "HOME",
                    homeLink: "Home",
                    contributi: "Contributions",
                    mappe: "MAPS",
                    officina: "WORKSHOP",
                    raider: "RAIDER",
                    community: "COMMUNITY",
                    mercanti: "TRADERS",
                    items: "Items",
                    timers: "Timers",
                    maps: "Maps",
                    interactiveMaps: "Interactive Maps",
                    quests: "Quests",
                    projects: "Projects",
                    blueprints: "Blueprints",
                    hideout: "Hideout",
                    missingItems: "Missing Items",
                    skillTree: "Skill Tree",
                    trials: "Trials",
                    support: "SUPPORT",
                    supportLink: "Contribute",
                    contactLink: "Contacts",
                    settings: "Settings",
                    profile: "Profile",
                    market: "Market",
                    builds: "Builds",
                    loadout: "Loadout",
                    sell: "Sell",
                    buy: "Buy",
                    routes: "Routes"
                },
                home: {
                    title: "Arc Raiders Central",
                    subtitle: "Free Companion App for Raiders",
                    welcome: "The Ultimate Arc Raiders Companion",
                    description: "Free tools for Arc Raiders: interactive maps with loot locations, live map timers, hideout planner, blueprint tracker, skill tree builder, and trials calculator.",
                    features: {
                        items: {
                            title: "Items Database",
                            description: "Browse 200+ items with damage stats, crafting costs, sell prices, and profit margins."
                        },
                        mapTimers: {
                            title: "Map Event Timers",
                            description: "Live countdown for Night Raid, Harvester, Hidden Bunker, Cold Snap, and 2X Trials events."
                        },
                        interactiveMaps: {
                            title: "Maps",
                            description: "Find loot locations, extraction points, weapon cases, and raider caches on all 5 maps."
                        },
                        quests: {
                            title: "Quest Database",
                            description: "Complete quest guide with objectives, map locations, rewards, and blueprint unlocks."
                        },
                        projects: {
                            title: "Projects Tracker",
                            description: "Track expedition projects, calculate materials, and monitor Exodus progression."
                        },
                        hideout: {
                            title: "Hideout Planner",
                            description: "Plan Scrappy upgrades (Forager to Master Hoarder) and Workbench tiers with material calculator."
                        },
                        missingItems: {
                            title: "Missing",
                            description: "Auto-generate material lists for hideout, projects, and crafting. Never forget what to farm."
                        },
                        skillTree: {
                            title: "Skill Tree Builder",
                            description: "Plan your build before spending points. Save multiple loadouts and simulate progression."
                        },
                        blueprints: {
                            title: "Blueprint Tracker",
                            description: "Track all 75+ blueprints, see drop locations, mark owned items. Find breach room blueprints."
                        },
                        trials: {
                            title: "Trials Calculator",
                            description: "Track 5 weekly challenges, calculate points per action, climb ranks to Cantina Legend."
                        },
                        support: {
                            title: "Support Us",
                            description: "Help keep Arc Raiders Central free and updated. Every donation helps cover hosting costs."
                        }
                    },
                    getStarted: "Get Started",
                    footer: "Updated daily with latest game data. Community-driven project.",
                    compactView: "Compact",
                    expandedView: "Expanded"
                },
                crafting: {
                    pageTitle: "Items Database",
                    pageDescription: "Browse all Arc Raiders weapons, armor, consumables, and materials. Compare crafting costs, sell prices, and profit margins. Filter by rarity or item type.",
                    title: "Arc Raiders Items & Crafting Calculator",
                    subtitle: "Stats, Crafting Costs & Profit Margins",
                    description: "Complete database of all Arc Raiders items. View weapon damage, armor stats, crafting materials, sell prices, and calculate profit margins.",
                    search: "Search by name...",
                    guide: {
                        title: "Items & Crafting Guide",
                        whatIsTitle: "What Is the Items Database?",
                        whatIsDesc: "This database contains every item in Arc Raiders: weapons, armor, shields, consumables, crafting materials, and quest items. Use it to compare stats, find crafting recipes, and calculate profitability before selling or crafting.",
                        weaponsTitle: "Weapons & Damage Stats",
                        weaponsDesc: "Compare weapon damage, fire rate, reload speed, and magazine size. Find the best weapons for your playstyle - from high-DPS assault rifles to accurate sniper rifles and versatile SMGs.",
                        craftingTitle: "How Crafting Works",
                        craftingDesc: "Crafting requires blueprints (found in breach rooms and quest rewards) plus materials. The Workbench tier in your Hideout determines which items you can craft. Higher tier = better gear.",
                        profitTitle: "Profit Calculator",
                        profitDesc: "The profit column shows if crafting an item is worth it. Green = you profit by crafting and selling. Red = materials are worth more than the finished item. Use this to maximize your earnings.",
                        filtersTitle: "How to Use Filters",
                        filtersDesc: "Search by item name, filter by category (Weapon, Armor, Consumable), rarity (Common to Legendary), or show only profitable/craftable items. Combine filters to find exactly what you need.",
                        columnsTitle: "Customize Columns",
                        columnsDesc: "Click 'Columns' to show/hide data. Show weapon stats for combat comparison, or economic data for trading. Your preferences are saved automatically.",
                        sortingTitle: "Sorting Data",
                        sortingDesc: "Click any column header to sort. Click again to reverse order. Sort by damage for combat, by profit for trading, or by rarity to find rare items quickly."
                    },
                    filters: {
                        all: "All Categories",
                        allRarities: "All Rarities",
                        allProfits: "All Profits",
                        onlyCraftable: "Only Craftable",
                        allItems: "All Items",
                        onlyProfitable: "Only Profitable",
                        onlyLoss: "Only Loss",
                        armor: "Armor",
                        weapon: "Weapon",
                        consumable: "Consumable",
                        material: "Material",
                        other: "Other"
                    },
                    sort: {
                        label: "Sort by",
                        profit: "Profit",
                        name: "Name",
                        sellPrice: "Sell Price"
                    },
                    table: {
                        category: "Category",
                        item: "Item",
                        name: "Name",
                        rarity: "Rarity",
                        materials: "Materials",
                        craftingCost: "Materials Value",
                        sellPrice: "Item Value",
                        profit: "Profit",
                        profitMargin: "Profit %",
                        valuePerWeight: "Value/Weight",
                        recycleMaterials: "Recycle Materials",
                        recycleValue: "Recycle Value",
                        damage: "Damage",
                        fireRate: "Fire Rate",
                        range: "Range",
                        stability: "Stability",
                        agility: "Agility",
                        stealth: "Stealth",
                        magazineSize: "Magazine",
                        weight: "Weight"
                    },
                    columns: {
                        title: "Columns",
                        description: "Select which columns you want to display in the table",
                        showing: "Showing",
                        items: "items",
                        showAll: "Show All",
                        hideStats: "Hide Stats",
                        basic: "Basic",
                        economic: "Economic",
                        stats: "Statistics"
                    },
                    rarities: {
                        Common: "Common",
                        Uncommon: "Uncommon",
                        Rare: "Rare",
                        Epic: "Epic",
                        Legendary: "Legendary"
                    },
                    itemTypes: {
                        "Advanced Material": "Advanced Material",
                        Ammunition: "Ammunition",
                        Augment: "Augment",
                        "Basic Material": "Basic Material",
                        Blueprint: "Blueprint",
                        Consumable: "Consumable",
                        Cosmetic: "Cosmetic",
                        Gadget: "Gadget",
                        Key: "Key",
                        Material: "Material",
                        Medical: "Medical",
                        Misc: "Misc",
                        Modification: "Modification",
                        Mods: "Mods",
                        Nature: "Nature",
                        "Quest Item": "Quest Item",
                        "Quick Use": "Quick Use",
                        Recyclable: "Recyclable",
                        "Refined Material": "Refined Material",
                        Refinement: "Refinement",
                        Shield: "Shield",
                        Throwable: "Throwable",
                        "Topside Material": "Topside Material",
                        Trinket: "Trinket",
                        Weapon: "Weapon"
                    },
                    rawMaterial: "Raw Material",
                    noResults: "No items found matching your search.",
                    loading: "Loading crafting data..."
                },
                itemTooltip: {
                    foundIn: "FOUND IN:",
                    usedToCraft: "Used to craft:",
                    weight: "Weight",
                    value: "Value",
                    stackSize: "Stack"
                },
                mapTimers: {
                    pageTitle: "Map Event Timers",
                    pageDescription: "Track all Arc Raiders map events in real time. Plan your raids around Night Raid, Harvester, Electromagnetic Storm, Hidden Bunker, Cold Snap events, and 2X Trials bonus windows.",
                    title: "Arc Raiders Map Rotation Timer",
                    subtitle: "Live Event Schedule & 2X Trials Bonus Times",
                    currentEvents: "Ongoing Events",
                    start: "Start",
                    end: "End",
                    eventCalendar: "Event Calendar",
                    nextMap: "Next Map",
                    timeRemaining: "Time Remaining",
                    upcomingRotations: "Upcoming Rotations",
                    map: "Map",
                    startTime: "Start Time",
                    endTime: "End Time",
                    duration: "Duration",
                    loading: "Loading map timings...",
                    localTime: "Local Time",
                    filter: {
                        all: "All",
                        startTime: "Start Time",
                        allEvents: "All Events",
                        majorEvents: "Major Events",
                        minorEvents: "Minor Events"
                    },
                    loot: "Loot",
                    trials: "Trials",
                    guide: {
                        title: "Arc Raiders Map Timer Guide",
                        eventsOverviewTitle: "Map Events",
                        eventsOverviewDesc: "Arc Raiders features rotating map events: Night Raid, Harvester, Electromagnetic Storm, Hidden Bunker, Cold Snap, Matriarch, and more. Each event changes gameplay, loot, and enemy spawns.",
                        trialsTitle: "2X Trials Bonus",
                        trialsDesc: "Events marked '2X Trials' grant double points for weekly challenges. Plan farming sessions during Night Raid, Electromagnetic Storm, Hidden Bunker, Locked Gate, and Cold Snap for maximum ranking progress.",
                        viewsTitle: "View Modes",
                        viewsDesc: "Switch between Timeline view (24-hour visual schedule) and List view (compact card layout). Your preference is saved automatically.",
                        timezoneTitle: "Timezone",
                        timezoneDesc: "Select your timezone to see event times in your local time. Supports all major timezones including UTC, CET, EST, PST, and more.",
                        eventsTitle: "Events vs Modifiers",
                        eventsDesc: "Events (darker color) are major activities like Harvester or Night Raid. Modifiers (lighter color) affect loot quality and spawn rates.",
                        farmingTitle: "Farming Tips",
                        farmingDesc: "Check the timer before each raid. Night Raid offers best stealth gameplay, Harvester spawns high-value loot, Hidden Bunker unlocks secret areas with epic gear."
                    },
                    maps: {
                        "The Dam": "The Dam",
                        "Buried City": "Buried City",
                        Spaceport: "Spaceport",
                        "The Blue Gate": "The Blue Gate",
                        "Stella Montis": "Stella Montis",
                        "Practice Range": "Practice Range"
                    },
                    mapNames: {
                        dam_battlegrounds: "Dam Battlegrounds",
                        the_spaceport: "The Spaceport",
                        the_blue_gate: "The Blue Gate",
                        buried_city: "Buried City",
                        stella_montis: "Stella Montis",
                        victory_ridge: "Victory Ridge"
                    },
                    events: {
                        "Electromagnetic Storm": "Electromagnetic Storm",
                        "Lush Blooms": "Lush Blooms",
                        "Night Raid": "Night Raid",
                        Harvester: "Harvester",
                        "Uncovered Caches": "Uncovered Caches",
                        "Launch Tower Loot": "Launch Tower Loot",
                        Matriarch: "Matriarch",
                        Hurricane: "Hurricane"
                    },
                    notifications: {
                        enable: "Enable notification for this event",
                        disable: "Disable notification for this event",
                        enabled: "Notification enabled! You'll be notified when this event starts.",
                        disabled: "Notification disabled.",
                        notSupported: "Notifications are not supported on this browser.",
                        permissionDenied: "Notifications are blocked. Please enable them in your browser settings.",
                        permissionRequired: "Please allow notifications in your browser to receive event alerts."
                    }
                },
                quests: {
                    pageTitle: "Quest Database",
                    pageDescription: "Track all Arc Raiders missions from traders Celeste, Scrappy, and Forager. View objectives, map locations, item rewards, and blueprint unlocks. Mark quests complete and follow the progression tree.",
                    title: "Arc Raiders Quest Guide",
                    subtitle: "All Missions, Objectives & Rewards",
                    description: "Complete database of Arc Raiders quests. View all missions from Celeste, Scrappy, and Forager with objectives, map locations, item rewards, and blueprint unlocks.",
                    search: "Search by name or objective...",
                    tree: "Tree",
                    list: "List",
                    completed: "Completed",
                    progress: "progress",
                    viewTree: "Tree View",
                    viewList: "List View",
                    viewInTree: "View in Tree",
                    maps: "maps",
                    anyMap: "Any",
                    guide: {
                        title: "Arc Raiders Quest Guide",
                        overviewTitle: "Quest System",
                        overviewDesc: "Arc Raiders features multiple quest lines from different NPCs: Celeste (main story), Scrappy (hideout), and Forager (exploration). Complete quests to unlock blueprints, items, and progression.",
                        tradersTitle: "Quest Givers",
                        tradersDesc: "Celeste offers main story missions. Scrappy focuses on hideout upgrades and chicken progression. Forager provides exploration and scavenging challenges with map-specific objectives.",
                        viewsTitle: "View Modes",
                        viewsDesc: "Tree View shows the visual quest progression tree with prerequisites and unlock chains. List View shows all quests in a filterable list with full details.",
                        progressTitle: "Progress Tracking",
                        progressDesc: "Mark objectives complete by clicking checkboxes. Progress syncs to cloud when signed in. Completing a quest auto-completes prerequisites.",
                        chainTitle: "Quest Chains",
                        chainDesc: "Quests unlock in chains. Completing early quests unlocks later ones. View the tree to plan your progression path and see what rewards await.",
                        searchTitle: "Search & Filters",
                        searchDesc: "Search by quest name or objective text. Filter by trader (Celeste, Scrappy, Forager) or map location to find specific quests."
                    },
                    filters: {
                        all: "All",
                        allTraders: "All Traders",
                        allLocations: "All Locations",
                        showActive: "Show active",
                        showAll: "Show all",
                        SRF: "SRF",
                        Colossus: "Colossus",
                        Cryo: "Cryo",
                        Chem: "Chem",
                        none: "No Faction"
                    },
                    table: {
                        quest: "Quest",
                        trader: "Trader",
                        location: "Location",
                        objective: "Objective",
                        reward: "Reward",
                        unlocks: "Unlocks",
                        faction: "Faction",
                        requirements: "Requirements",
                        rewards: "Rewards"
                    },
                    details: {
                        description: "Description",
                        requirements: "Requirements",
                        rewards: "Rewards",
                        close: "Close"
                    },
                    noResults: "No quests found matching your search.",
                    loading: "Loading quests...",
                    loadingTree: "Loading quest tree...",
                    resetZoom: "Reset zoom",
                    markComplete: "Completed",
                    markIncomplete: "Not complete",
                    sections: {
                        base: "Base Game Quests",
                        northLine: "North Line Update",
                        northLineDesc: "These quests were added in the November 2025 North Line update.",
                        coldSnap: "Cold Snap Update",
                        coldSnapDesc: "These quests were added in the December 2025 Cold Snap update.",
                        headwinds: "Headwinds Update",
                        headwindsDesc: "These quests were added in the January 2026 Headwinds update."
                    }
                },
                wip: {
                    itemsTitle: "Page Under Construction",
                    itemsDescription: "Some data may be inaccurate: crafting quantities, prices, and other stats are being verified.",
                    mapsTitle: "Page Under Construction",
                    mapsDescription: "Custom pins work, but preset POI markers are still in development."
                },
                common: {
                    loading: "Loading...",
                    error: "An error occurred",
                    loadingError: "Error loading data",
                    fileNotFound: "File not found",
                    noData: "No data available",
                    type: "Type",
                    close: "Close",
                    cancel: "Cancel",
                    confirm: "Confirm",
                    user: "User",
                    guest: "Guest",
                    login: "Login",
                    logout: "Logout",
                    live: "LIVE",
                    menu: "Menu",
                    closeMenu: "Close menu",
                    overview: "Overview",
                    closeBanner: "Close banner",
                    creatorBanner: {
                        partner: "Partner"
                    },
                    decreaseCount: "Decrease count",
                    increaseCount: "Increase count",
                    clickToComplete: "Click to complete",
                    clickToReset: "Click to reset",
                    dismissHint: "Dismiss hint",
                    signInWithGoogle: "Sign in with Google",
                    switchToItalian: "Switch to Italian",
                    switchToEnglish: "Switch to English",
                    langCodeEn: "ENG",
                    langCodeIt: "ITA",
                    markAsComplete: "Mark as complete",
                    markAsIncomplete: "Mark as incomplete",
                    completed: "Ended",
                    started: "Started",
                    selectLevel: "Select level",
                    noLevelAvailable: "No level available",
                    adminMode: "Admin",
                    userMode: "User",
                    videoOn: "Video On",
                    videoOff: "Video Off",
                    emailOptInOn: "Email Updates On",
                    emailOptInOff: "Email Updates Off",
                    emailOptInDescription: "Receive important updates about Arc Raiders Central via email",
                    all: "All",
                    selected: "selected",
                    save: "Save",
                    delete: "Delete",
                    edit: "Edit",
                    gotIt: "Got it",
                    updatingVersion: "Updating to latest version...",
                    somethingWentWrong: "Something went wrong.",
                    reloadPage: "Reload Page",
                    goBack: "Go back",
                    noResults: "No results found",
                    optional: "optional",
                    yes: "Yes",
                    no: "No"
                },
                chat: {
                    title: "Chat",
                    global: "Global",
                    messages: "Messages",
                    private: "Private",
                    newMessage: "New message",
                    send: "Send",
                    typeMessage: "Type a message...",
                    noMessages: "No messages yet",
                    noConversations: "No conversations yet",
                    startConversation: "Start a conversation",
                    searchUsers: "Search users...",
                    online: "Online",
                    offline: "Offline",
                    lastSeen: "Last seen",
                    unreadMessages: "unread messages",
                    you: "You",
                    today: "Today",
                    yesterday: "Yesterday",
                    support: "Support"
                },
                chatSupport: {
                    title: "Support",
                    guest: "Guest",
                    guestIntro: "Enter your name to start chatting with our support team. We're here to help!",
                    enterName: "Enter your name...",
                    startChat: "Start Chat",
                    welcomeMessage: "Hello! How can we help you today?",
                    noTickets: "No support tickets",
                    supportTeam: "Support Team",
                    justNow: "Just now",
                    markInProgress: "Mark In Progress",
                    markResolved: "Mark Resolved",
                    statusInProgress: "A support agent is now handling your request",
                    statusResolved: "This ticket has been resolved",
                    status: {
                        open: "Open",
                        in_progress: "In Progress",
                        resolved: "Resolved"
                    }
                },
                notifications: {
                    title: "Notifications",
                    empty: "No notifications",
                    markAllRead: "Mark all read",
                    justNow: "Just now",
                    minutesAgo: "{{count}}m ago",
                    hoursAgo: "{{count}}h ago",
                    daysAgo: "{{count}}d ago",
                    newMessage: "New message",
                    newTradeRequest: "New trade request",
                    tradeMessage: "Trade message",
                    tradeLocked: "Trade locked",
                    tradeCompleted: "Trade completed",
                    tradeCancelled: "Trade cancelled",
                    newReview: "New review",
                    sound: "Notification sound",
                    soundDescription: "Play a sound when you receive a notification",
                    push: "Push notifications",
                    pushDescription: "Receive browser notifications even when the app is in background",
                    pushEnabled: "Push notifications enabled",
                    pushDisabled: "Push notifications disabled",
                    pushDenied: "Push notifications blocked by browser",
                    pushUnsupported: "Push notifications not supported",
                    enablePush: "Enable push notifications"
                },
                market: {
                    title: "Market",
                    subtitle: "Buy and sell items with other players",
                    createListing: "Create Listing",
                    tabs: {
                        browse: "Browse",
                        myListings: "My Listings",
                        myTrades: "My Trades"
                    },
                    filters: {
                        all: "All",
                        selling: "Selling",
                        buying: "Buying"
                    },
                    selling: "Selling",
                    buying: "Buying",
                    noListings: "No listings available",
                    listings: "listings",
                    noMyListings: "You haven't created any listings yet",
                    noTrades: "No active trades",
                    loginRequired: "Please login to access this feature",
                    justNow: "Just now",
                    barterOnly: "Barter only",
                    openOffer: "Open to offers",
                    barter: "Barter",
                    open: "Open",
                    inNegotiation: "In negotiation",
                    description: "Description",
                    listedOn: "Listed on",
                    loginToTrade: "Please login to start trading",
                    ownListing: "This is your own listing",
                    alreadyInNegotiation: "This listing already has an active negotiation",
                    startNegotiation: "Start Negotiation",
                    successRate: "success rate",
                    confirmDelete: "Are you sure you want to delete this listing?",
                    confirmCancel: "Are you sure you want to cancel this trade?",
                    pause: "Pause",
                    resume: "Resume",
                    hasActiveNegotiation: "Cannot modify - has active negotiation",
                    status: {
                        active: "Active",
                        paused: "Paused",
                        completed: "Completed",
                        expired: "Expired"
                    },
                    tradeStatus: {
                        negotiating: "Negotiating",
                        locked: "Locked",
                        completed: "Completed",
                        cancelled: "Cancelled",
                        expired: "Expired"
                    },
                    lockTrade: "Lock Terms",
                    locked: "Locked",
                    confirmComplete: "Confirm Trade",
                    cancel: "Cancel",
                    lockInfo: "Both parties must lock before completing the trade",
                    tradeCompleted: "This trade has been completed",
                    tradeCancelled: "This trade was cancelled",
                    systemMessages: {
                        trade_created: "Trade started",
                        trade_locked: "Trade locked - both parties agreed",
                        trade_completed: "Trade completed successfully!",
                        trade_cancelled: "Trade cancelled",
                        price_proposed: "New price proposed"
                    },
                    create: {
                        selectType: "What do you want to do?",
                        sell: "Sell",
                        sellDesc: "I have an item to sell",
                        buy: "Buy",
                        buyDesc: "I'm looking for an item",
                        selectItem: "Select an item",
                        searchItems: "Search items...",
                        quantity: "Quantity",
                        priceType: "How do you want to be paid?",
                        price: "Price (Seeds)",
                        description: "Description",
                        descriptionPlaceholder: "Add details about your listing...",
                        continue: "Continue",
                        confirmTitle: "Review your listing",
                        type: "Type",
                        item: "Item",
                        publish: "Publish Listing"
                    },
                    disclaimer: {
                        title: "Market Rules",
                        intro: "Before using the market, please read and accept the following rules:",
                        rule1: "All trades happen in-game. This platform only facilitates communication between players.",
                        rule2: "We are not responsible for scams or failed trades. Trade at your own risk.",
                        rule3: "Be respectful to other players. Harassment will result in a ban.",
                        rule4: "Report suspicious users to help keep the community safe.",
                        warning: "By using the market, you accept full responsibility for your trades.",
                        accept: "I Understand and Accept"
                    },
                    reviews: {
                        title: "Leave a Review",
                        rateUser: "Rate your experience with",
                        timeRemaining: "{{hours}}h {{minutes}}m",
                        comment: "Comment",
                        commentPlaceholder: "Share your experience with this trade...",
                        commentMinLength: "Comment must be at least 5 characters",
                        submit: "Submit Review",
                        submitError: "Error submitting review. Please try again.",
                        rating1: "Terrible",
                        rating2: "Poor",
                        rating3: "Average",
                        rating4: "Good",
                        rating5: "Excellent",
                        pendingReview: "Review pending",
                        leaveReview: "Leave Review",
                        reviewSubmitted: "Review submitted! Thank you.",
                        autoReviewWarning: "Leave a review before the deadline! Otherwise, the other user will receive an automatic 5-star review and you will receive a 3-star penalty from arcraiderscentral.app.",
                        timeRemaining_v2: "{{time}}"
                    }
                },
                projects: {
                    pageTitle: "Projects Tracker",
                    title: "Arc Raiders Projects & Expeditions",
                    subtitle: "Track Expedition Progress & Material Requirements",
                    description: "Complete Arc Raiders expedition tracker. Track community projects, Exodus progression stages, and calculate material requirements for each expedition phase.",
                    loading: "Loading projects...",
                    loginPrompt: "Sign in with Google to save your progress in the cloud",
                    overallProgress: "Overall Progress",
                    stagesComplete: "stages complete",
                    guide: {
                        title: "Expedition Projects Guide",
                        whatIsTitle: "What Are Projects?",
                        whatIsDesc: "Projects are the main storyline progression in Arc Raiders. Complete expedition stages by collecting materials to advance toward the Exodus ending. Projects unlock new content, NPCs, and features.",
                        expeditionsTitle: "Expedition Stages",
                        expeditionsDesc: "Each expedition has multiple stages. Stage 1 requires basic materials (wires, batteries). Later stages need rare items (alloys, chemicals, quest drops). Complete all stages to finish an expedition.",
                        materialsTitle: "Farming Materials",
                        materialsDesc: "Check the required items list for each stage. Use our Interactive Maps to find spawn locations. Industrial areas drop gears/batteries, medical zones have antiseptics, ARC enemies drop alloys.",
                        exodusTitle: "Exodus Storyline",
                        exodusDesc: "Projects tell the story of the Raiders' escape from ARC. Each expedition reveals lore, unlocks NPCs like Forager, and progresses toward the final Exodus event. Don't miss the story!",
                        trackingTitle: "Tracking Progress",
                        trackingDesc: "Mark items as collected using +/- buttons or the slider. Progress bars show completion percentage. Your data syncs to cloud when signed in, so you can track from any device.",
                        missingItemsTitle: "Missing Items Integration",
                        missingItemsDesc: "All missing project items appear on the Missing Items page. Check it before each raid to know exactly what to farm. Items are auto-aggregated across all active projects.",
                        tipsTitle: "Farming Tips",
                        tipsDesc: "Focus on one stage at a time. Run the map with most required items. Night Raid event = safer looting. Check Trials challenges - some overlap with project materials!",
                        progressTitle: "Progress Bars",
                        progressDesc: "Progress bars show completion percentage for each stage and overall project. Complete all stages to finish a project and unlock the next expedition.",
                        controlsTitle: "Controls",
                        controlsDesc: "Use +/- buttons to adjust item counts. Hold the button to increment faster. Use the slider for quick adjustments to any value."
                    },
                    expedition: {
                        name: "Expedition 1",
                        stages: {
                            foundation: "Foundation (1/6)",
                            coreSystems: "Core Systems (2/6)",
                            framework: "Framework (3/6)",
                            outfitting: "Outfitting (4/6)"
                        }
                    },
                    expedition2: {
                        name: "Expedition 2",
                        stages: {
                            foundation: "Foundation (1/6)",
                            coreSystems: "Core Systems (2/6)",
                            framework: "Framework (3/6)",
                            outfitting: "Outfitting (4/6)"
                        }
                    },
                    trophyDisplay: {
                        name: "Trophy Display",
                        stages: {
                            stage1: "Roaming Threats (1/5)",
                            stage2: "Soaring Menaces (2/5)",
                            stage3: "Ferocious Foes (3/5)",
                            stage4: "Dominant Dangers (4/5)",
                            stage5: "Imposing Behemoths (5/5)"
                        }
                    },
                    highGainAntenna: {
                        name: "High-Gain Antenna",
                        stages: {
                            sturdyBase: "Sturdy Base (1/3)",
                            dataLogger: "Data Logger (2/3)",
                            parabolicDish: "Parabolic Dish (3/3)"
                        }
                    },
                    errors: {
                        quotaExceeded: "Cloud save quota exceeded",
                        firestoreError: "Error saving to cloud",
                        savingLocally: "Your progress is saved locally on this device"
                    }
                },
                interactiveMaps: {
                    title: "Maps",
                    subtitle: "All Loot Locations, Extraction Points & POIs",
                    description: "Explore all Arc Raiders maps with loot locations, extraction points, POIs, and custom markers",
                    loading: "Loading map...",
                    noResults: "No pins found",
                    filters: {
                        title: "Pin Filters",
                        gamePOIs: "POIs",
                        customPins: "My Custom Pins",
                        communityPins: "Community Pins",
                        showAll: "Show All",
                        hideAll: "Hide All",
                        showCustomPins: "Show custom pins",
                        showCommunityPins: "Show community pins"
                    },
                    poiTypes: {
                        quest: "Quests",
                        extraction: "Extraction Point",
                        raider_hatch: "Raider Hatch",
                        player_spawn: "Player Spawn",
                        supply_call_station: "Supply Call Station",
                        field_depot: "Field Depot",
                        breachable_room: "Breachable Room",
                        locked_room: "Locked Room",
                        security_breach: "Security Breach",
                        weapon_case: "Weapon Case",
                        med_crate: "Med Crate",
                        ammo_crate: "Ammo Crate",
                        breachable_container: "Breachable Container",
                        raider_cache: "Raider Cache",
                        container: "Container",
                        utility_crate: "Utility Crate",
                        cars: "Cars",
                        lockers: "Lockers",
                        baskets: "Baskets",
                        bags: "Bags",
                        baron_husk: "Baron Husk",
                        arc_husk: "Arc Husk",
                        arc_courier: "Arc Courier",
                        arc_probe: "Arc Probe",
                        tick: "Tick",
                        pop: "Pop",
                        fireball: "Fireball",
                        surveyor: "Surveyor",
                        turret: "Turret",
                        sentinel: "Sentinel",
                        snitch: "Snitch",
                        wasp: "Wasp",
                        hornet: "Hornet",
                        shredder: "Shredder",
                        leaper: "Leaper",
                        rocketeer: "Rocketeer",
                        bombardier: "Bombardier",
                        bastion: "Bastion",
                        queen: "Queen",
                        matriarch: "Matriarch",
                        mushroom: "Mushroom",
                        prickly_pear: "Prickly Pear",
                        great_mullein: "Great Mullein",
                        agave: "Agave",
                        apricot: "Apricot",
                        moss: "Moss",
                        fertilizer: "Fertilizer",
                        roots: "Roots",
                        candleberries: "Candleberries",
                        olive: "Olive",
                        lemons: "Lemons",
                        harvester: "Harvester",
                        snow_pile: "Snow Pile",
                        antenna: "Antenna",
                        hidden_bunker: "Hidden Bunker",
                        locked_gate_key: "Locked Gate Key",
                        nest: "Nest",
                        other: "Other",
                        arc_tick: "Arc Tick",
                        arc_wasp: "Arc Wasp",
                        arc_pop: "Arc Pop",
                        ladder: "Ladder",
                        zipline: "Zipline",
                        camera: "Security Camera",
                        metal_detectors: "Metal Detectors",
                        field_crate: "Field Crate",
                        grenade_case: "Grenade Case",
                        key: "Key",
                        raider_camp: "Raider Camp",
                        harvester_event: "Harvester Event",
                        security_locker: "Security Locker",
                        toolbox: "Toolbox",
                        generator: "Generator",
                        drawers: "Drawers",
                        electrical_box: "Electrical Box",
                        cupboard: "Cupboard",
                        fridge: "Fridge",
                        metal_crate: "Metal Crate",
                        garbage_bins: "Garbage Bins",
                        loose_loot: "Loose Loot",
                        shutters: "Shutters",
                        trailer: "Trailer",
                        shipping_container: "Shipping Container",
                        loot_arc: "ARC Loot",
                        loot_commercial: "Commercial Loot",
                        loot_electrical: "Electrical Loot",
                        loot_exodus: "Exodus Loot",
                        loot_industrial: "Industrial Loot",
                        loot_mechanical: "Mechanical Loot",
                        loot_medical: "Medical Loot",
                        loot_nature: "Nature Loot",
                        loot_old_world: "Old World Loot",
                        loot_raider: "Raider Loot",
                        loot_residential: "Residential Loot",
                        loot_security: "Security Loot",
                        loot_technological: "Technological Loot"
                    },
                    customPin: {
                        add: "Add Pin",
                        edit: "Edit Pin",
                        delete: "Delete Pin",
                        save: "Save",
                        cancel: "Cancel",
                        confirmDelete: "Are you sure you want to delete this pin?",
                        addDescription: "Add a new custom pin to the map",
                        editDescription: "Edit your custom pin",
                        fields: {
                            label: "Label",
                            labelPlaceholder: "Enter pin name...",
                            category: "Category",
                            icon: "Icon",
                            color: "Color",
                            notes: "Notes",
                            notesPlaceholder: "Add additional notes..."
                        }
                    },
                    communityPin: {
                        add: "Add Community Pin",
                        addShort: "Community",
                        addDescription: "Share a useful location with the community. Other players can vote to confirm or hide your pin.",
                        title: "Community Pin",
                        new: "New",
                        confirmed: "Confirmed",
                        createdBy: "Created by",
                        rating: "Rating",
                        votes: "votes",
                        upvote: "Upvote",
                        downvote: "Downvote",
                        loginToVote: "Sign in to vote",
                        confirmDelete: "Are you sure you want to delete this community pin?",
                        pending: "Needs 3 upvotes to be confirmed",
                        description: "Description",
                        descriptionPlaceholder: "Describe this location for others..."
                    },
                    legend: {
                        title: "Legend",
                        poi: "Points of Interest",
                        containers: "Containers",
                        arcEnemies: "Arc Enemies",
                        nature: "Nature Resources",
                        events: "Events",
                        lootZones: "Loot Zones",
                        other: "Other",
                        custom: "Custom Pins"
                    },
                    instructions: {
                        addPin: "Click 'Add Pin' button, then click on the map to place it",
                        addPinMobile: "Click 'Add Pin' button, then tap on the map to place it",
                        clickToPlace: "Click on the map to place your pin",
                        clickPinForDetails: "Click on any pin to view details",
                        editPin: "Click on a pin to view or edit it",
                        loginRequired: "Sign in to save custom pins"
                    },
                    errors: {
                        loadMaps: "Error loading maps",
                        loadPins: "Error loading custom pins",
                        savePins: "Error saving pins",
                        maxPinsReached: "Maximum number of pins reached (500)"
                    },
                    guide: {
                        title: "Arc Raiders Map Guide",
                        navigationTitle: "Navigation",
                        navigationDesc: "Use mouse wheel to zoom in/out. Click and drag to pan around the map. On mobile, pinch to zoom and drag with one finger to move.",
                        filtersTitle: "Filters & POI Types",
                        filtersDesc: "Filter by extraction points, loot containers, weapon cases, raider caches, breachable rooms, locked rooms, ARC enemies, and more. Toggle categories individually or use 'Show All' / 'Hide All'.",
                        customPinsTitle: "Custom Pins",
                        customPinsDesc: "Sign in to create custom pins for your personal loot routes, secret spots, or farming paths. Add labels, notes, icons and colors to organize your map.",
                        levelsTitle: "Map Levels",
                        levelsDesc: "Some maps have multiple levels (upper/lower floors). Use the level selector to switch between floors - essential for Stella Montis underground facility.",
                        mapsOverviewTitle: "Available Maps",
                        mapsOverviewDesc: "Dam Battlegrounds, Buried City, Spaceport, Blue Gate, and Stella Montis. Each map features unique loot zones, extraction points, and ARC enemy spawns.",
                        lootTipsTitle: "Loot Tips",
                        lootTipsDesc: "High-value loot spawns in breach rooms, locked rooms, and weapon cases. Industrial areas have batteries and gears, residential areas have dog collars, and medical zones have antiseptics.",
                        extractionTitle: "Extraction Points",
                        extractionDesc: "Each map has 2-5 extraction points: elevators, metro stations, and raider hatches (key required). Extractions are loud - expect PvP encounters near exits."
                    }
                },
                version: {
                    title: "Version",
                    added: "Added",
                    fixed: "Fixed",
                    changed: "Changed",
                    removed: "Removed",
                    footer: "made with ♥\nGORE-ILLA#3235"
                },
                hideout: {
                    pageTitle: "Hideout",
                    title: "Arc Raiders Hideout Planner",
                    subtitle: "Scrappy Upgrades & Workbench Calculator",
                    description: "Plan all hideout upgrades: Scrappy levels (Forager, Scavenger, Treasure Hunter, Master Hoarder), Gunsmith, Gear Bench, Medical Lab, Explosives Station. Auto-calculate materials needed.",
                    loading: "Loading hideout planner...",
                    loginPrompt: "Sign in with Google to save your progress in the cloud",
                    overallProgress: "Overall Progress",
                    levelsComplete: "levels complete",
                    level: "Level",
                    guide: {
                        title: "Hideout Upgrade Guide",
                        whatIsTitle: "What Is the Hideout?",
                        whatIsDesc: "The Hideout is your base of operations in Arc Raiders. Upgrade Scrappy to find better loot during raids, and upgrade Workbenches to craft higher-tier weapons, armor, and gear.",
                        scrappyTitle: "Scrappy Upgrades",
                        scrappyDesc: "Scrappy the chicken helps find loot. Forager (Lv2) marks nearby containers. Scavenger (Lv3) highlights valuable items. Treasure Hunter (Lv4) finds rare loot. Master Hoarder (Lv5) reveals hidden caches and epic drops.",
                        workbenchTitle: "Workbench Tiers",
                        workbenchDesc: "Each workbench unlocks crafting recipes: Gunsmith (weapons), Gear Bench (armor/shields), Medical Lab (meds), Explosives Station (grenades/mines), Utility Station (deployables), Refiner (materials). Higher tier = better gear.",
                        materialsTitle: "Required Materials",
                        materialsDesc: "Upgrades require specific materials: batteries, gears, chemicals, alloys, and quest items. Check the Missing Items page to see all materials you need to farm for your next upgrade.",
                        progressTitle: "Tracking Progress",
                        progressDesc: "Mark items as collected using +/- buttons. Progress bars show completion percentage. Your progress syncs to cloud when signed in. Incomplete sections are expanded by default.",
                        tipsTitle: "Upgrade Priority",
                        tipsDesc: "Recommended order: Scrappy Lv3 first (valuable loot), then Gunsmith Lv2 (better weapons), then Gear Bench Lv2 (shields). Focus on what matches your playstyle.",
                        sectionsTitle: "Upgrade Sections",
                        sectionsDesc: "Track progress for Scrappy (Forager, Scavenger, Treasure Hunter, Master Hoarder) and all Workbenches (Gunsmith, Gear Bench, Medical Lab, Explosives Station, Utility Station, Refiner).",
                        controlsTitle: "Controls",
                        controlsDesc: "Use +/- buttons to adjust item counts. Hold the button to increment faster. Use the slider for quick adjustments to any value."
                    },
                    scrappy: {
                        name: "Scrappy",
                        description: "Upgrade Scrappy the chicken to unlock better loot finding abilities",
                        levels: {
                            2: "Forager",
                            3: "Scavenger",
                            4: "Treasure Hunter",
                            5: "Master Hoarder"
                        }
                    },
                    gunsmith: {
                        name: "Gunsmith",
                        description: "Upgrade the Gunsmith to unlock better weapons and attachments",
                        levels: {
                            1: "Basic",
                            2: "Intermediate",
                            3: "Advanced"
                        }
                    },
                    gearBench: {
                        name: "Gear Bench",
                        description: "Upgrade the Gear Bench for stronger shields and utility mods",
                        levels: {
                            1: "Basic",
                            2: "Intermediate",
                            3: "Advanced"
                        }
                    },
                    medicalLab: {
                        name: "Medical Lab",
                        description: "Upgrade the Medical Lab for better healing items and consumables",
                        levels: {
                            1: "Basic",
                            2: "Intermediate",
                            3: "Advanced"
                        }
                    },
                    explosivesStation: {
                        name: "Explosives Station",
                        description: "Upgrade the Explosives Station for better grenades and explosives",
                        levels: {
                            1: "Basic",
                            2: "Intermediate",
                            3: "Advanced"
                        }
                    },
                    utilityStation: {
                        name: "Utility Station",
                        description: "Upgrade the Utility Station for advanced utility items and gadgets",
                        levels: {
                            1: "Basic",
                            2: "Intermediate",
                            3: "Advanced"
                        }
                    },
                    refiner: {
                        name: "Refiner",
                        description: "Upgrade the Refiner to convert common materials into rare resources",
                        levels: {
                            1: "Basic",
                            2: "Intermediate",
                            3: "Advanced"
                        }
                    },
                    craftableItems: "Craftable Items:",
                    noRequirements: "No requirements - starting level"
                },
                missingItems: {
                    pageTitle: "Missing Items",
                    title: "Missing Items",
                    description: "All items you still need for Projects, Scrappy, and Workbenches",
                    loading: "Loading Missing Items...",
                    loginPrompt: "Sign in with Google to sync your progress across devices",
                    explanation: "This list is generated from your Hideout and Projects pages. As you mark items as obtained there, this list updates automatically.",
                    sortBy: "Sort by",
                    sortQuantity: "Quantity",
                    sortAlphabetical: "Name",
                    filterBy: "Show",
                    filterAll: "All",
                    filterProjects: "Projects",
                    filterHideout: "Hideout",
                    filterQuests: "Quests",
                    guide: {
                        title: "Missing Items Guide",
                        whatIsTitle: "What Is the Missing Items?",
                        whatIsDesc: "The Missing Items auto-generates a complete list of all materials you need for hideout upgrades and expedition projects. Check it before each raid to know exactly what to farm!",
                        aggregationTitle: "Smart Aggregation",
                        aggregationDesc: "Items are automatically combined from all sources. If you need 5 batteries for Scrappy and 3 for a project, it shows '8 batteries total'. No manual tracking needed.",
                        sourcesTitle: "Item Sources",
                        sourcesDesc: "Items come from two sources: Hideout (Scrappy upgrades + Workbenches) and Projects (expedition materials). Toggle sources on/off to focus your farming.",
                        farmingTitle: "Farming Tips",
                        farmingDesc: "Check the item images to recognize loot. Industrial zones = batteries, gears. Medical areas = antiseptics, bandages. ARC enemies = alloys, tech parts. Use our Interactive Maps for exact locations.",
                        filtersTitle: "Filtering Sources",
                        filtersDesc: "Use the Projects and Hideout dropdowns to include/exclude specific sources. Focus on one upgrade at a time for efficient farming.",
                        sortingTitle: "Sorting Options",
                        sortingDesc: "Sort by quantity (farm high-count items first) or alphabetically (find specific items). Your preference saves automatically.",
                        syncTitle: "Cloud Sync",
                        syncDesc: "Sign in with Google to sync progress across devices. Update on your phone while playing, see results on desktop. All sources update the Missing Items in real-time."
                    },
                    summary: {
                        title: "Summary",
                        allComplete: "All items completed! 🎉"
                    },
                    noItems: {
                        message: "You've collected everything! All projects, Scrappy levels, and workbenches are complete."
                    },
                    itemCard: {
                        noImage: "No Image"
                    },
                    export: "Export",
                    stage: "Stage",
                    level: "Level",
                    table: {
                        icon: "Icon",
                        name: "Item",
                        quantity: "Qty",
                        source: "Needed For"
                    }
                },
                skillTree: {
                    pageTitle: "Skill Tree Planner",
                    title: "Arc Raiders Skill Tree Builder",
                    subtitle: "Plan Your Skill Tree Before Spending Points",
                    description: "Interactive skill tree planner. Simulate skill tree, see all skill effects and costs, save multiple loadouts. Plan Conditioning, Mobility, and Survival paths.",
                    guide: {
                        title: "Skill Tree Guide",
                        whatIsTitle: "How Skills Work",
                        whatIsDesc: "Skills are permanent upgrades that enhance your Raider. Earn skill points by leveling up (76 base) plus bonus points from expeditions. Once allocated, points cannot be reset in-game, so plan carefully!",
                        categoriesTitle: "Skill Categories",
                        categoriesDesc: "Three branches: Conditioning (blue) for health, stamina, and combat. Mobility (orange) for movement, sprint, and dodging. Survival (green) for looting, healing, and damage resistance. Each has 5 tiers.",
                        tiersTitle: "Tier Requirements",
                        tiersDesc: "Advanced skills require points invested in their category. Tier 2 needs 4 points, Tier 3 needs 8, Tier 4 needs 12, Tier 5 needs 16. Plan your path to reach powerful high-tier skills.",
                        buildsTitle: "Saving Builds",
                        buildsDesc: "Save up to 5 different builds to test strategies. Click tabs to switch, pencil icon to rename, X to delete. Share builds with friends using the Share button - it copies a URL with your loadout.",
                        pointsTitle: "Point Management",
                        pointsDesc: "You start with 76 skill points. Add expedition bonus points using the counter. The display shows used/available points. Experiment freely - this planner doesn't affect your in-game character.",
                        recommendedTitle: "Recommended Starter Build",
                        recommendedDesc: "New players: invest in Mobility first for better sprinting and stamina. Then Survival for looting efficiency. Combat skills shine later when you have good gear.",
                        controlsTitle: "Controls",
                        controlsDesc: "Desktop: left-click to add, right-click to remove. Mobile: tap to add, long-press to remove. Zoom with scroll/pinch, drag to pan around the tree.",
                        mobileTitle: "Controls",
                        mobileDesc: "Desktop: left-click to add, right-click to remove. Mobile: tap to add, long-press to remove. Zoom with scroll/pinch, drag to pan around the tree."
                    },
                    pointsUsed: "Skill Points Used",
                    expeditionPoints: "Expedition",
                    expeditionPointsShort: "Expedition",
                    share: {
                        label: "Share",
                        title: "Share Build",
                        exportImage: "Export as Image",
                        exportImageDesc: "Download your build as a PNG image",
                        publish: "Publish Build",
                        publishDesc: "Share with the community for votes and copying",
                        publishInfo: 'Your build "{{name}}" will be visible to all users in the Community Builds page.',
                        descriptionPlaceholder: "Add a description (optional)...",
                        publishButton: "Publish",
                        publishSuccess: "Build published!"
                    },
                    fullscreen: "Fullscreen",
                    exitFullscreen: "Exit Fullscreen",
                    reset: "Reset Tree",
                    newBuild: "New Build",
                    defaultBuildName: "Build 1",
                    newBuildName: "Build {{number}}",
                    maxBuildsReached: "Maximum 5 builds reached",
                    cannotDeleteLast: "Cannot delete the last build",
                    cannotDeallocate: "Cannot deallocate: other skills depend on this",
                    cannotDeallocateMinPoints: "Cannot deallocate: would break minimum points requirement for another skill",
                    confirmReset: "Reset all skill points?",
                    buildCopied: "Build link copied to clipboard!",
                    tier: "Tier",
                    requires: "Requires",
                    pointsIn: "points in",
                    points: "Total",
                    skillPoints: "Skill Points",
                    conditioning: "Conditioning",
                    mobility: "Mobility",
                    survival: "Survival",
                    instructions: "Left-click to allocate points, Right-click to deallocate",
                    mobileInstructions: "Tap to allocate points, Long press to deallocate",
                    mobileInstructionsNew: "Tap a skill to select, use +/- buttons to allocate",
                    mobilePanelPlaceholder: "Tap on a skill to see details and allocate/deallocate points",
                    zoomInstructions: "Pinch to zoom, drag to pan",
                    resetView: "Reset View",
                    resetBuild: "Reset Build",
                    renameBuild: "Rename Build",
                    selectBuild: "Select Build",
                    skills: {
                        "Used To The Weight": "Used To The Weight",
                        "Used To The Weight_desc": "Wearing a shield doesn't slow you down as much",
                        "Blast-Born": "Blast-Born",
                        "Blast-Born_desc": "Your hearing is less affected by nearby explosions",
                        "Gentle Pressure": "Gentle Pressure",
                        "Gentle Pressure_desc": "You make less noise when breaching",
                        "Fight Or Flight": "Fight Or Flight",
                        "Fight Or Flight_desc": "Stamina recovery when hurt in combat (cooldown)",
                        "Proficient Pryer": "Proficient Pryer",
                        "Proficient Pryer_desc": "Reduces breach time for doors/containers",
                        "Survivor's Stamina": "Survivor's Stamina",
                        "Survivor's Stamina_desc": "Faster stamina regen when critically hurt",
                        "Unburdened Roll": "Unburdened Roll",
                        "Unburdened Roll_desc": "Free dodge roll after shield breaks",
                        "Downed But Determined": "Downed But Determined",
                        "Downed But Determined_desc": "Extends collapse timer while downed",
                        "A Little Extra": "A Little Extra",
                        "A Little Extra_desc": "Breach generates resources (2 scraps/alloy)",
                        "Effortless Swing": "Effortless Swing",
                        "Effortless Swing_desc": "Reduces melee ability stamina cost",
                        "Turtle Crawl": "Turtle Crawl",
                        "Turtle Crawl_desc": "Reduced damage while downed",
                        "Loaded Arms": "Loaded Arms",
                        "Loaded Arms_desc": "Equipped weapon reduces encumbrance by 50%",
                        "Sky-Clearing Swing": "Sky-Clearing Swing",
                        "Sky-Clearing Swing_desc": "Enhanced melee damage vs drones",
                        "Back On Your Feet": "Back On Your Feet",
                        "Back On Your Feet_desc": "Health regenerates when critically hurt",
                        Flyswatter: "Flyswatter",
                        Flyswatter_desc: "One-hit melee destruction of wasps/turrets",
                        "Nimble Climber": "Nimble Climber",
                        "Nimble Climber_desc": "Faster climbing and vaulting",
                        "Marathon Runner": "Marathon Runner",
                        "Marathon Runner_desc": "Reduced stamina cost for movement",
                        "Slip and Slide": "Slip and Slide",
                        "Slip and Slide_desc": "Increased slide distance/speed",
                        "Youthful Lungs": "Youthful Lungs",
                        "Youthful Lungs_desc": "Increases maximum stamina pool",
                        "Sturdy Ankles": "Sturdy Ankles",
                        "Sturdy Ankles_desc": "Reduces fall damage (non-lethal heights)",
                        "Carry The Momentum": "Carry The Momentum",
                        "Carry The Momentum_desc": "Sprint stamina-free after dodge roll (cooldown)",
                        "Calming Stroll": "Calming Stroll",
                        "Calming Stroll_desc": "Walk-state stamina regeneration",
                        "Effortless Roll": "Effortless Roll",
                        "Effortless Roll_desc": "Reduced dodge roll stamina cost",
                        "Crawl Before You Walk": "Crawl Before You Walk",
                        "Crawl Before You Walk_desc": "Faster crawling when downed",
                        "Off The Wall": "Off The Wall",
                        "Off The Wall_desc": "Extended wall leap distance",
                        "Heroic Leap": "Heroic Leap",
                        "Heroic Leap_desc": "Sprint dodge rolls travel farther",
                        "Vigorous Vaulter": "Vigorous Vaulter",
                        "Vigorous Vaulter_desc": "Vaulting unaffected by exhaustion",
                        "Ready To Roll": "Ready To Roll",
                        "Ready To Roll_desc": "Expanded recovery roll timing window",
                        "Vaults on Vaults on Vaults": "Vaults on Vaults on Vaults",
                        "Vaults on Vaults on Vaults_desc": "Vaulting eliminates stamina cost",
                        "Vault Spring": "Vault Spring",
                        "Vault Spring_desc": "Jump capability at vault end",
                        "Agile Croucher": "Agile Croucher",
                        "Agile Croucher_desc": "Enhanced crouch movement speed",
                        "Looter's Instincts": "Looter's Instincts",
                        "Looter's Instincts_desc": "Faster loot revelation in containers",
                        "Revitalizing Squat": "Revitalizing Squat",
                        "Revitalizing Squat_desc": "Increased stamina regen while crouching",
                        "Silent Scavenger": "Silent Scavenger",
                        "Silent Scavenger_desc": "Reduced noise when looting",
                        "In-round Crafting": "In-round Crafting",
                        "In-round Crafting_desc": "Field craft items topside (8 item types)",
                        "Suffer In Silence": "Suffer In Silence",
                        "Suffer In Silence_desc": "Reduced movement noise when critically hurt",
                        "Good As New": "Good As New",
                        "Good As New_desc": "Stamina regen increases under healing effects",
                        "Broad Shoulders": "Broad Shoulders",
                        "Broad Shoulders_desc": "Maximum carry capacity +2kg per tier",
                        "Traveling Tinkerer": "Traveling Tinkerer",
                        "Traveling Tinkerer_desc": "Unlocks 4 additional field-craft items",
                        "Stubborn Mule": "Stubborn Mule",
                        "Stubborn Mule_desc": "Stamina regen less affected by overweight",
                        "Looter's Luck": "Looter's Luck",
                        "Looter's Luck_desc": "Chance to reveal two container items simultaneously",
                        "One Raider's Scraps": "One Raider's Scraps",
                        "One Raider's Scraps_desc": "Small chance of finding additional field-crafted items in Raider containers",
                        "Three Deep Breaths": "Three Deep Breaths",
                        "Three Deep Breaths_desc": "Faster stamina recovery after ability drain",
                        "Security Breach": "Security Breach",
                        "Security Breach_desc": "Unlocks security locker breaching",
                        Minesweeper: "Minesweeper",
                        Minesweeper_desc: "Defuse mines/explosive deployables nearby"
                    }
                },
                blueprints: {
                    pageTitle: "Blueprint Tracker",
                    title: "Arc Raiders Blueprint Tracker",
                    subtitle: "Track All Weapon & Gear Blueprints",
                    description: "Complete Arc Raiders blueprint tracker. Track 75+ weapon blueprints, gear schematics, and mod recipes. Find breach room drops, quest rewards, and rare blueprint locations.",
                    instructions: "Left-click to mark as obtained, right-click to mark as duplicate",
                    loading: "Loading blueprints...",
                    loginPrompt: "Sign in with Google to save your progress in the cloud",
                    guide: {
                        title: "Blueprint Guide",
                        whatIsTitle: "What Are Blueprints?",
                        whatIsDesc: "Blueprints are permanent crafting recipes. Once obtained, you can craft that weapon, armor, or mod unlimited times at your Hideout Workbench. Blueprints are the key to endgame gear progression.",
                        dropLocationsTitle: "Where to Find Blueprints",
                        dropLocationsDesc: "Breach rooms (pink door = Epic, blue door = Rare blueprints), weapon cases on all maps, locked containers with keys, quest completion rewards, and rare enemy drops (Matriarch, Bombardier).",
                        breachRoomsTitle: "Breach Room Farming",
                        breachRoomsDesc: "Breach rooms require breach charges (crafted at Explosives workbench). Pink-tier rooms guarantee Epic blueprints. Check our Interactive Maps to find all breach room locations on each map.",
                        categoriesTitle: "Blueprint Categories",
                        categoriesDesc: "Weapons (assault rifles, SMGs, snipers, shotguns), Armor (helmets, vests, leg guards), Mods (weapon attachments, utility items), and Special gear (shields, deployables, consumables).",
                        trackingTitle: "Using the Tracker",
                        trackingDesc: "Left-click: mark as Obtained. Right-click: mark as Duplicate (for trading). Click again to reset. Your progress syncs to cloud when signed in. Export as image to share your collection.",
                        statusTitle: "Status Icons",
                        statusDesc: "Yellow checkmark = obtained. Blue '2' badge = duplicate for trading. Grayed out = still needed. Use tabs to filter by status.",
                        tipsTitle: "Farming Tips",
                        tipsDesc: "Focus on Epic weapons first (best damage). Run breach rooms during Night Raid for safer looting. Check Trials rewards for guaranteed blueprints at 2,500 and 4,000 points.",
                        filtersTitle: "Filters",
                        filtersDesc: "Use the search bar to find blueprints by name. Filter by category (Weapon, Armor, Mod) or rarity (Common to Legendary) to narrow down the list."
                    },
                    stats: {
                        total: "Total",
                        obtained: "Found",
                        needed: "Needed",
                        duplicates: "Duplicates",
                        progress: "Progress"
                    },
                    tabs: {
                        needed: "Needed",
                        obtained: "Found",
                        duplicates: "Duplicates",
                        all: "All"
                    },
                    filters: {
                        allCategories: "All Categories",
                        allRarities: "All Rarities",
                        allStatus: "All",
                        all: "All",
                        learned: "Learned",
                        notLearned: "Not Learned",
                        owned: "Owned",
                        obtained: "Found",
                        notObtained: "Not Found",
                        duplicates: "Duplicates"
                    },
                    sort: {
                        ingame: "In-Game Order",
                        name: "By Name (A-Z)",
                        rarity: "By Rarity"
                    },
                    status: {
                        obtained: "Found",
                        duplicate: "Duplicate"
                    },
                    search: "Search blueprints...",
                    export: "Export",
                    noResults: "No blueprints found matching your filters",
                    detail: {
                        craftedAt: "Crafted At",
                        recipe: "Recipe",
                        obtained: "Obtained",
                        notObtained: "Not Obtained",
                        learned: "Learned",
                        duplicates: "Duplicates"
                    }
                },
                about: {
                    title: "About Arc Raiders Central",
                    subtitle: "The free, community-driven companion app for Arc Raiders players. Everything you need to plan, track, and master the game - in one place.",
                    whatIs: {
                        title: "What is Arc Raiders Central?",
                        p1: "Arc Raiders Central is a free companion web app built specifically for Arc Raiders players. It brings together all the tools you need to play smarter: interactive maps with loot and POI markers, live event timers, a complete item and crafting database, hideout upgrade planner, quest tracker, skill tree builder, and more.",
                        p2: "The app is updated regularly to reflect the latest game patches and community findings. It started as a personal project and grew into a full-featured platform used by thousands of players every day."
                    },
                    features: {
                        title: "What's Inside",
                        maps: {
                            title: "Interactive Maps",
                            desc: "Detailed maps for all 6 locations with filterable markers for loot, extractions, POIs, breach rooms, and raider spawns."
                        },
                        timers: {
                            title: "Event Timers",
                            desc: "Real-time countdown timers for all map events: Night Raid, Harvester, Electromagnetic Storm, Hidden Bunker, Cold Snap, and 2X Trials bonuses."
                        },
                        items: {
                            title: "Items & Crafting",
                            desc: "Full database of weapons, armor, consumables, and materials. View crafting costs, sell prices, profit margins, and filter by rarity or type."
                        },
                        hideout: {
                            title: "Hideout Planner",
                            desc: "Plan all your Scrappy upgrades, calculate required materials, and auto-generate your missing items list across hideout and projects."
                        },
                        quests: {
                            title: "Quest Tracker",
                            desc: "Complete quest database for all traders - Celeste, Scrappy, and Forager - with objectives, rewards, maps, and blueprint unlocks."
                        },
                        community: {
                            title: "Community Features",
                            desc: "Share and vote on skill tree builds, create and browse player loadouts, and trade items with other players on the community market."
                        }
                    },
                    values: {
                        title: "Our Principles",
                        free: {
                            title: "Always Free",
                            desc: "Arc Raiders Central is and will always be completely free to use. No paywalls, no premium tiers - just tools for everyone."
                        },
                        updated: {
                            title: "Regularly Updated",
                            desc: "The app is updated with every major patch. Game data, maps, and features are kept accurate and current."
                        },
                        community: {
                            title: "Community First",
                            desc: "Built by a player, for players. Feedback and suggestions from the community directly shape new features and improvements."
                        }
                    },
                    author: {
                        title: "Who Built This?",
                        p1: "Arc Raiders Central was created and is maintained by a solo developer and Arc Raiders player. The project started as a simple crafting calculator and expanded into a full companion platform based on community feedback.",
                        p2: "The app is supported by a small group of community contributors who report bugs, suggest features, and help keep the data accurate. Special thanks to all supporters and contributors listed on the Support page."
                    },
                    contact: {
                        title: "Get in Touch",
                        desc: "Have a suggestion, found a bug, or want to contribute? Reach out via email or visit the Support page.",
                        supportLink: "Visit Support Page"
                    }
                },
                footer: {
                    title: "Arc Raiders Central",
                    description: "Companion app for Arc Raiders. Craftings, maps, quests, and more.",
                    quickLinks: "Quick Links",
                    support: "Support",
                    buyMeCoffee: "Buy me a coffee",
                    supportText: "Help keep this app free and updated",
                    about: "About",
                    aboutText: "Built with passion for the Arc Raiders community. Regular updates with new features and game data.",
                    madeWith: "Made with",
                    by: "by",
                    madeBy: "Made by",
                    disclaimer: "Not affiliated with Arc Raiders or Embark Studios. All game assets belong to their respective owners.",
                    iconsBy: "Icons by",
                    privacy: "Privacy",
                    terms: "Terms",
                    cookies: "Cookies"
                },
                support: {
                    title: "Support Arc Raiders Central",
                    subtitle: "Help keep this tool free and updated for the community",
                    stats: {
                        free: "Free",
                        freeAccess: "Always Free Access",
                        features: "Features & Tools",
                        updates: "Weekly",
                        dataUpdates: "Data Updates"
                    },
                    why: {
                        title: "Why Support?",
                        hosting: {
                            title: "Server & Hosting Costs",
                            description: "Keeping the app fast, reliable, and always available costs money. Your support covers infrastructure expenses."
                        },
                        development: {
                            title: "Development Time",
                            description: "Hours of work go into adding new features, updating game data, and fixing bugs. Coffee fuels the code!"
                        },
                        features: {
                            title: "New Features",
                            description: "Premium tier funding allows faster development of advanced tools like cloud sync, custom builds sharing, and more."
                        }
                    },
                    cta: {
                        title: "Buy Me a Coffee",
                        description: "Every contribution helps keep Arc Raiders Central running and improving",
                        note: "One-time donations starting from $3 • No account required • Secure payment via Ko-fi"
                    },
                    premium: {
                        title: "Premium Tier Coming Soon",
                        subtitle: "Get early access to advanced features",
                        cloudSync: "Cloud Sync",
                        cloudSyncDesc: "Save builds across devices",
                        optimizer: "Advanced Optimizer",
                        optimizerDesc: "Multi-item profit calculations",
                        hideout: "Hideout Templates",
                        hideoutDesc: "Save & share custom layouts",
                        pricing: "Early Bird Pricing:",
                        price: "$2.99/month or $24.99/year (save 30%)"
                    },
                    thanks: {
                        title: "Thank You!",
                        message: "Whether you donate or just use the app, your support means everything. This tool is built by the community, for the community.",
                        signature: "- m0n0t0ny, Arc Raiders Central Developer"
                    },
                    contributors: {
                        title: "Credits",
                        creators: "Creators",
                        contributors: "Contributors",
                        supporters: "Supporters",
                        attributions: "Attributions",
                        attributionsDesc: "Special thanks to projects that made this app possible"
                    },
                    attributions: {
                        arcraiderswiki: {
                            name: "Arc Raiders Wiki",
                            description: "Game info, images, icons & assets",
                            url: "https://arc-raiders.fandom.com"
                        },
                        metaforge: {
                            name: "MetaForge",
                            description: "Item icons",
                            url: "https://metaforge.app"
                        },
                        radixui: {
                            name: "Radix UI",
                            description: "UI component primitives",
                            url: "https://www.radix-ui.com"
                        },
                        lucide: {
                            name: "Lucide",
                            description: "Icon library",
                            url: "https://lucide.dev"
                        },
                        reactflow: {
                            name: "React Flow",
                            description: "Quest tree diagrams",
                            url: "https://reactflow.dev"
                        },
                        framermotion: {
                            name: "Framer Motion",
                            description: "Animations",
                            url: "https://www.framer.com/motion"
                        }
                    }
                },
                holdToIncrementHint: {
                    title: "Pro Tip!",
                    description: "Hold down the + or - button to quickly increment, or use the slider to change values fast"
                },
                kofiButton: {
                    text: "Support on Ko-fi",
                    ariaLabel: "Support on Ko-fi"
                },
                trials: {
                    title: "Trials Tracker",
                    subtitle: "Weekly Challenges, Ranks & Rewards Calculator",
                    description: "Track Arc Raiders weekly trial challenges, calculate points, and climb the division rankings from Rookie to Cantina Legend",
                    backToTrials: "Back to Trials",
                    season: "Season",
                    week: "Week",
                    timeRemaining: "TIME LEFT",
                    currentRank: "RANK",
                    gradePoints: "POINTS",
                    position: "POSITION",
                    weekTitle: "Week {{week}}",
                    personalRecord: "PERSONAL RECORD",
                    maxPoints: "4,000 Points",
                    loading: "Loading trials...",
                    points: "points",
                    ranks: {
                        "Rookie I": "Rookie I",
                        "Rookie II": "Rookie II",
                        "Rookie III": "Rookie III",
                        "Tryhard I": "Tryhard I",
                        "Tryhard II": "Tryhard II",
                        "Tryhard III": "Tryhard III",
                        "Wildcard I": "Wildcard I",
                        "Wildcard II": "Wildcard II",
                        "Wildcard III": "Wildcard III",
                        "Daredevil I": "Daredevil I",
                        "Daredevil II": "Daredevil II",
                        "Daredevil III": "Daredevil III",
                        Hotshot: "Hotshot",
                        "Hotshot I": "Hotshot I",
                        "Hotshot II": "Hotshot II",
                        "Hotshot III": "Hotshot III",
                        "Cantina Legend": "Cantina Legend"
                    },
                    trialNames: {
                        "Open Arc Probes": "Open Arc Probes",
                        "Destroy Ticks": "Destroy Ticks",
                        "Damage Leapers": "Damage Leapers",
                        "Damage any ARC enemies": "Damage any ARC enemies",
                        "Harvest plants": "Harvest plants",
                        "Harvest Plants": "Harvest Plants",
                        "Damage Hornets": "Damage Hornets",
                        "Search First Wave husks": "Search First Wave husks",
                        "Search Supply Drops": "Search Supply Drops",
                        "Destroy Ticks, Fireballs and Pops": "Destroy Ticks, Fireballs and Pops",
                        "Damage ground-based ARC enemies": "Damage ground-based ARC enemies",
                        "Damage Wasps": "Damage Wasps",
                        "Download data during Hidden Bunker": "Download data during Hidden Bunker",
                        "Deliver carriables": "Deliver carriables",
                        "Destroy Fireballs": "Destroy Fireballs",
                        "Damage Bastions": "Damage Bastions",
                        "Damage Queens or Matriarchs": "Damage Queens or Matriarchs",
                        "Damage flying ARC enemies": "Damage flying ARC enemies",
                        "Damage Rocketeers": "Damage Rocketeers",
                        "Damage Snitches": "Damage Snitches",
                        "Damage Rocketeers, Leapers or Bastions": "Damage Rocketeers, Leapers or Bastions",
                        "Destroy Pops": "Destroy Pops",
                        "Open ARC Probes": "Open ARC Probes",
                        "(Cold Snap) Search frozen Raider containers": "(Cold Snap) Search frozen Raider containers",
                        "(Cold Snap) Throw snowballs at Rocketeers": "(Cold Snap) Throw snowballs at Rocketeers",
                        "Deal damage to Shredders": "Deal damage to Shredders",
                        "(Cold Snap) Throw snowballs at Bastions": "(Cold Snap) Throw snowballs at Bastions",
                        "(Hidden Bunker) Download information inside the bunker": "(Hidden Bunker) Download information inside the bunker",
                        "(Toxic Swamp) Deliver thermal rocks": "(Toxic Swamp) Deliver thermal rocks",
                        "(Toxic Swamp) Keep Air Purifiers powered on during Toxic Swamp - Clean Air": "(Toxic Swamp) Keep Air Purifiers powered on during Toxic Swamp - Clean Air"
                    },
                    guide: {
                        title: "Arc Raiders Trials Guide",
                        overviewTitle: "What are Trials?",
                        overviewDesc: "Trials are Arc Raiders' competitive endgame ranking system. Unlock at Level 15 to compete in weekly challenges, climb division leaderboards, and earn exclusive cosmetic rewards each season.",
                        weeklyTitle: "Weekly Challenges",
                        weeklyDesc: "Every week you receive 5 Trials challenges: combat goals (kill Leapers, Fireballs), utility tasks (hack ARC Probes, loot Supply Drops), or event-specific objectives. Complete actions to earn points toward each challenge.",
                        divisionsTitle: "Division System",
                        divisionsDesc: "When you score your first point, you're placed in a division of 100 Raiders at your rank. Top 30 = double promotion, 31-60 = single promotion, bottom 40 = stay at current rank. Rankings reset every Monday.",
                        ranksTitle: "Rank Progression",
                        ranksDesc: "14 total ranks from Rookie I to Cantina Legend (top 1000 players). Each rank has 3 tiers except Hotshot and Cantina Legend. New seasons start you 2 ranks below your previous placement.",
                        rewardsIntro: "Trials offer two types of rewards: challenge rewards and seasonal rewards.",
                        challengeRewardsTitle: "Challenge Rewards",
                        challengeRewards: "Earn rewards by reaching 1,000, 2,500, and 4,000 points on each trial. These grant a random Uncommon, Rare, and Epic item or blueprint respectively. Rewards are automatically claimed after extraction and can only be obtained once per challenge tier per week.",
                        seasonRewardsTitle: "Season Rewards",
                        seasonRewards: "At the end of each season, Raiders receive cosmetics and emotes based on their final rank. Achieving a high rank also grants all rewards from lower ranks.",
                        intro: "Every week, Raiders receive 5 Trials challenges accessible from the Trials menu. Completing specific actions earns points toward each challenge.",
                        bonus: "During major map events (Night Raid, Electromagnetic Storm, Hidden Bunker, Locked Gate, Cold Snap), challenge points are doubled!",
                        scoring: "Points are only counted after successful extraction. Only your best score for each challenge is saved. Play in squads to share progress - all party members earn the same score!",
                        tipsTitle: "Pro Tips",
                        tipsDesc: "Focus on one challenge at a time. Start with easy scavenging objectives, then tackle combat challenges with better gear. Farm during 2X Trials events to maximize points. Extract before risking your score!",
                        pointsTitle: "Points per Challenge",
                        challenge: "Challenge",
                        points: "Points",
                        maps: "Available",
                        allMaps: "All maps",
                        perDmg: "/dmg",
                        perKill: "/kill",
                        perHusk: "/husk",
                        perDrop: "/drop",
                        perCont: "/cont.",
                        perPlant: "/plant",
                        perProbe: "/probe",
                        perData: "/data",
                        perCrate: "/crate",
                        perHit: "/hit"
                    }
                },
                timerSuggestions: {
                    suggestEdit: "Suggest Edit",
                    loginRequired: "Log in to suggest edits",
                    types: {
                        schedule_change: "Modify Schedule",
                        new_event: "New Event",
                        remove_event: "Remove Event"
                    },
                    modal: {
                        title: "Suggest a Timer Edit",
                        communityTitle: "Community Suggestions",
                        loginTitle: "Login required",
                        loginMessage: "Sign in to view and vote on community suggestions, or submit your own.",
                        loginButton: "Sign in with Google",
                        noSuggestions: "No suggestions yet. Be the first to report an issue!",
                        addSuggestion: "+ Add Suggestion",
                        backToList: "Back to suggestions",
                        type: "Type of suggestion",
                        map: "Map",
                        existingEvent: "Event to modify",
                        selectEvent: "Select an event...",
                        currentSchedule: "Current schedule",
                        proposedSchedule: "Proposed schedule",
                        eventType: "Event type",
                        newSchedule: "Schedule",
                        eventToRemove: "Event to remove",
                        note: "Note (optional)",
                        notePlaceholder: "Explain why this change is needed...",
                        addSlot: "Add slot",
                        submit: "Send suggestion",
                        submitting: "Sending...",
                        submitted: "Suggestion sent! Thank you."
                    },
                    admin: {
                        title: "Pending Suggestions",
                        empty: "No pending suggestions.",
                        map: "Map",
                        event: "Event",
                        newEvent: "New event",
                        removeEvent: "Remove event",
                        approve: "Approve",
                        approving: "Approving...",
                        reject: "Reject",
                        rejecting: "Rejecting...",
                        approveFailed: "Failed to apply suggestion."
                    }
                },
                admin: {
                    home: {
                        title: "Admin Dashboard",
                        subtitle: "Admin Dashboard",
                        maps: {
                            title: "Maps",
                            description: "Add and edit POIs on interactive maps"
                        },
                        timers: {
                            title: "Timers",
                            description: "Edit map rotation schedules and events"
                        },
                        quests: {
                            title: "Quests",
                            description: "Edit quests, objectives, and rewards"
                        },
                        items: {
                            title: "Items",
                            description: "Manage items database and crafting recipes"
                        },
                        blueprints: {
                            title: "Blueprints",
                            description: "Manage blueprints, recipes, and display order"
                        },
                        settings: {
                            title: "Settings",
                            description: "Configure site-wide settings and preferences"
                        },
                        users: {
                            title: "Users",
                            description: "View logged-in users and activity"
                        }
                    },
                    users: {
                        title: "Online Users",
                        subtitle: "View logged-in users and their activity status",
                        onlineNow: "Online Now",
                        lastHour: "Last 60 Minutes",
                        last24h: "Last 24 Hours",
                        noUsers: "No users in this period",
                        justNow: "Just now",
                        minutesAgo: "{{count}} min ago",
                        hoursAgo: "{{count}}h ago",
                        never: "Never seen",
                        sortTime: "Time",
                        sortAlpha: "A-Z",
                        manage: {
                            title: "User Management",
                            searchPlaceholder: "Search by name...",
                            noUsers: "No registered users",
                            noResults: "No users found",
                            registered: "Registered: {{date}}",
                            socialBanned: "Social Ban",
                            platformBanned: "Platform Ban",
                            banSocial: "Ban from chat & market",
                            unbanSocial: "Unban from chat & market",
                            banPlatform: "Ban from platform",
                            unbanPlatform: "Unban from platform",
                            deleteUser: "Delete user",
                            confirmBanSocial: "Social Ban",
                            confirmUnbanSocial: "Remove Social Ban",
                            confirmBanPlatform: "Platform Ban",
                            confirmUnbanPlatform: "Remove Platform Ban",
                            confirmDelete: "Delete User",
                            confirmBanSocialDesc: "{{name}} will no longer be able to use chat or market features.",
                            confirmUnbanSocialDesc: "{{name}} will be able to use chat and market features again.",
                            confirmBanPlatformDesc: "{{name}} will be logged out and unable to access the platform.",
                            confirmUnbanPlatformDesc: "{{name}} will be able to access the platform again.",
                            confirmDeleteDesc: "All data for {{name}} will be permanently deleted. This action cannot be undone."
                        }
                    },
                    settings: {
                        title: "Admin Settings",
                        subtitle: "Personal preferences for administrators",
                        creatorBanner: {
                            title: "Creator Banner",
                            description: "Manage the promotional banner shown on the homepage",
                            enabled: "Show banner on homepage",
                            platform: "Platform",
                            displayName: "Display Name",
                            username: "Username (without @)",
                            channelUrl: "Channel URL"
                        },
                        textSelection: {
                            title: "Text Selection",
                            description: "Enable text selection for your admin account (always disabled for regular users)",
                            label: "Enable text selection"
                        }
                    },
                    timers: {
                        title: "Timers Management",
                        subtitle: "Edit event schedules for each map",
                        eventsOn: "Events on {{mapName}}",
                        addEvent: "Add Event",
                        editEvent: "Edit Event",
                        noEvents: "No events configured for this map",
                        eventType: "Event Type",
                        schedule: "Schedule",
                        scheduleHint: "One time range per line, format: HH:MM-HH:MM",
                        majorTrial: "Major Trial (2X Trials)",
                        trialsMultiplier: "Trials Multiplier",
                        invalidSchedule: "Invalid schedule format. Use HH:MM-HH:MM",
                        importSuccess: "Timings imported successfully",
                        timezone: "Display timezone",
                        timezones: {
                            UTC: "UTC",
                            London: "London (GMT/BST)",
                            Paris: "Paris (CET/CEST)",
                            Rome: "Rome (CET/CEST)",
                            Berlin: "Berlin (CET/CEST)",
                            Madrid: "Madrid (CET/CEST)",
                            Moscow: "Moscow (MSK)",
                            NewYork: "New York (EST/EDT)",
                            Chicago: "Chicago (CST/CDT)",
                            Denver: "Denver (MST/MDT)",
                            LosAngeles: "Los Angeles (PST/PDT)",
                            SaoPaulo: "São Paulo (BRT)",
                            Tokyo: "Tokyo (JST)",
                            Shanghai: "Shanghai (CST)",
                            Seoul: "Seoul (KST)",
                            Singapore: "Singapore (SGT)",
                            Dubai: "Dubai (GST)",
                            Sydney: "Sydney (AEST/AEDT)",
                            Local: "Local"
                        },
                        majorTrialBadge: "2X Trials",
                        minorEvent: "Minor Event",
                        majorEvent: "Major Event",
                        eventNameEN: "Name (English)",
                        eventNameIT: "Name (Italian)",
                        selectExisting: "Select Existing",
                        createNewType: "Create New Type",
                        newTypeId: "Event ID",
                        newTypeIdHint: "Unique identifier (e.g., Bird City, Meteor Shower)",
                        newTypeIcon: "Icon Path",
                        eventCategory: "Category",
                        newTypeRequired: "Event ID and English name are required",
                        typeAlreadyExists: "An event type with this ID already exists",
                        scheduleOptional: "Leave empty to create the event type without adding it to this map",
                        eventTypesTitle: "Event Types",
                        addEventType: "Add Event Type",
                        editEventType: "Edit Event Type",
                        confirmDeleteType: 'Are you sure you want to delete the event type "{{type}}"?',
                        cannotDeleteUsedType: "Cannot delete this event type. It is used in: {{maps}}",
                        tabEvents: "Event Types",
                        tabTimers: "Map Timers",
                        tabSuggestions: "Suggestions",
                        eventTypes: {
                            Harvester: "Harvester",
                            "Uncovered Caches": "Uncovered Caches",
                            "Electromagnetic Storm": "Electromagnetic Storm",
                            "Cold Snap": "Cold Snap",
                            Matriarch: "Matriarch",
                            "Prospecting Probes": "Prospecting Probes",
                            "Night Raid": "Night Raid",
                            "Husk Graveyard": "Husk Graveyard",
                            "Lush Blooms": "Lush Blooms",
                            "Launch Tower Loot": "Launch Tower Loot",
                            "Hidden Bunker": "Hidden Bunker",
                            "Locked Gate": "Locked Gate",
                            Hurricane: "Hurricane"
                        }
                    },
                    title: "Admin Dashboard - Map POIs",
                    selectMap: "Select map",
                    selectLevel: "Select level",
                    levelBase: "Level 0",
                    level: "Level {{name}}",
                    addPoi: "Add POI",
                    clickOnMap: "Click on map...",
                    import: "Import",
                    export: "Export",
                    saveToFirebase: "Save",
                    saving: "Saving...",
                    unsavedChanges: "Unsaved changes",
                    poisOnMap: "POIs on {{mapName}} ({{count}})",
                    noPois: 'No POIs on this map yet. Click "Add POI" to start.',
                    clickToAdd: "Click on the map to add a POI",
                    dialog: {
                        addTitle: "Add POI",
                        editTitle: "Edit POI",
                        name: "Name",
                        namePlaceholder: "Enter POI name...",
                        type: "Type",
                        description: "Description",
                        descriptionPlaceholder: "Optional description...",
                        coordinates: "Coordinates",
                        reposition: "Reposition",
                        cancel: "Cancel",
                        add: "Add",
                        update: "Update"
                    },
                    messages: {
                        saveSuccess: "Data saved successfully!",
                        saveFailed: "Failed to save. Please try again.",
                        importSuccess: "Imported {{count}} items",
                        importFailed: "Invalid JSON file",
                        publishFailed: "Failed to publish: "
                    },
                    publish: "Publish",
                    publishing: "Publishing...",
                    accessDenied: "Access denied. Admin only.",
                    quests: {
                        title: "Quest Management",
                        subtitle: "Manage quests, objectives, and rewards",
                        search: "Search quests...",
                        filterTrader: "Trader",
                        totalQuests: "Total",
                        showing: "Showing",
                        questsList: "Quests",
                        addQuest: "Add Quest",
                        editQuest: "Edit Quest",
                        noQuests: "No quests found",
                        questId: "Quest ID",
                        questNumber: "Number",
                        questName: "Quest Name",
                        trader: "Trader",
                        maps: "Maps",
                        mapsLabel: "Maps:",
                        objectivesLabel: "Objectives:",
                        previousQuests: "Previous Quests",
                        nextQuests: "Next Quests",
                        selectPreviousQuest: "Select previous quests...",
                        selectNextQuest: "Select next quests...",
                        requiredItems: "Required Items",
                        rewardItems: "Reward Items",
                        selectItem: "Select item...",
                        objectives: "Objectives",
                        objectivesCount: "objectives",
                        addObjective: "Add Objective",
                        objective: "Objective",
                        confirmDelete: "Are you sure you want to delete this quest?",
                        importSuccess: "Quests imported successfully",
                        initFirebase: "Init Firebase",
                        initFirebaseConfirm: "This will overwrite Firebase data with the static JSON file. Continue?",
                        initFirebaseSuccess: "Firebase initialized successfully from quests.json!",
                        initFirebaseFailed: "Failed to initialize Firebase. Check console for details."
                    },
                    blueprints: {
                        title: "Blueprint Management",
                        subtitle: "Manage blueprints, recipes, and order",
                        search: "Search blueprints...",
                        filterCategory: "Category",
                        filterRarity: "Rarity",
                        totalBlueprints: "Total",
                        showing: "Showing",
                        blueprintsList: "Blueprints",
                        addBlueprint: "Add",
                        editBlueprint: "Edit Blueprint",
                        noBlueprints: "No blueprints found",
                        blueprintId: "Blueprint ID",
                        blueprintName: "Name",
                        category: "Category",
                        rarity: "Rarity",
                        description: "Description",
                        craftedAt: "Crafted At",
                        icon: "Icon Path",
                        recipe: "Recipe",
                        ingredients: "ingredients",
                        addIngredient: "Add Ingredient",
                        noIngredients: "No ingredients added yet",
                        confirmDelete: "Are you sure you want to delete this blueprint?",
                        deleteBlueprint: "Delete Blueprint",
                        publishConfirm: "This will publish blueprints to production. Continue?",
                        publishSuccess: "Published successfully!",
                        saveBeforePublish: "Save changes before publishing",
                        dragDisabled: "Drag disabled while filtering"
                    },
                    items: {
                        title: "Items Management",
                        subtitle: "Manage game items, crafting recipes, and stats",
                        search: "Search items...",
                        filterType: "Type",
                        filterRarity: "Rarity",
                        totalItems: "Total",
                        showing: "Showing",
                        itemsList: "Items",
                        addItem: "Add Item",
                        editItem: "Edit Item",
                        noItems: "No items found",
                        confirmDelete: "Are you sure you want to delete this item?",
                        importJson: "Import from JSON",
                        importJsonConfirm: "This will merge items.json and crafting-data.json. Continue?",
                        importSuccess: "Imported items successfully!",
                        importFileSuccess: "Imported items from file",
                        tabBasic: "Basic",
                        tabTranslations: "Translations",
                        tabDetails: "Details",
                        tabCrafting: "Crafting",
                        name: "Name",
                        type: "Type",
                        rarity: "Rarity",
                        value: "Value",
                        icon: "Icon Path",
                        description: "Description",
                        workbench: "Workbench",
                        lootArea: "Loot Area",
                        statBlock: "Stat Block",
                        statBlockNote: "Stat block is preserved from original data. Edit individual stats in the JSON export if needed.",
                        components: "Crafting Components",
                        addComponent: "Add Component",
                        selectComponent: "Select component...",
                        noComponents: "No crafting components. This item is not craftable.",
                        recipePreview: "Recipe Preview",
                        cancel: "Cancel",
                        save: "Save",
                        update: "Update",
                        selectType: "Select type...",
                        translationsNote: "Customize translations for this item. Leave Italian fields empty to use default translations from the static translation file.",
                        nameTranslations: "Name",
                        descriptionTranslations: "Description",
                        flavorTextTranslations: "Flavor Text",
                        publishConfirm: "This will publish items to production. The changes will be live after Vercel deploys (usually 1-2 minutes). Continue?",
                        publishSuccess: "Published successfully! Commit: {{commit}}",
                        saveBeforePublish: "Save changes to Firebase before publishing"
                    }
                },
                questData: {
                    "picking_up_the_pieces.name": "Picking Up The Pieces",
                    "picking_up_the_pieces.description": "The storm has mostly settled, but much of our infrastructure has taken a proper beating. If you're hoping to stay with us, I'll need you to pull your weight in the repair efforts.",
                    "picking_up_the_pieces.objective_0": "Visit any area on your map with a loot category icon",
                    "picking_up_the_pieces.objective_1": "Loot 3 containers",
                    "clearer_skies.name": "Clearer Skies",
                    "clearer_skies.description": "A swarm of disoriented wasps crashed near one of our skylights. You need to thin the ARC ranks before more accidents happen. And can you gather some particularly sturdy materials to repair the damage?",
                    "clearer_skies.objective_0": "Destroy 3 ARC enemies",
                    "clearer_skies.objective_1": "Get 3 ARC Alloy for Shani",
                    "trash_into_treasure.name": "Trash Into Treasure",
                    "trash_into_treasure.description": "For a Raider, there is no such thing as scrap – it is all valuable material waiting to be recycled. If you want to get anywhere out here, you can’t just wait for everything to be handed to you on a silver platter.",
                    "trash_into_treasure.objective_0": "Obtain 6 Wires",
                    "trash_into_treasure.objective_1": "Obtain 1 Battery",
                    "off_the_radar.name": "Off The Radar",
                    "off_the_radar.description": "The damage down here was pretty bad, but our Topside infrastructure was hit even harder. I still have several antennas that stopped working after the storm.",
                    "off_the_radar.objective_0": "Visit a Field Depot",
                    "off_the_radar.objective_1": "Repair the antenna on the roof of the Field Depot",
                    "a_bad_feeling.name": "A Bad Feeling",
                    "a_bad_feeling.description": "Even the smallest change in the ARC's behavior could mean catastrophe. And that signal you picked up? We've never intercepted anything like it before. If they're planning something, we have to find out what it is.",
                    "a_bad_feeling.objective_0": "Find and search any ARC Probe or ARC Courier",
                    "the_right_tool.name": "The Right Tool",
                    "the_right_tool.description": "You are one of the newcomers, right? I need a volunteer to test this upgraded Ferro  it should cut through ARC armor like butter. Put some holes in a few machines and then report back to me.",
                    "the_right_tool.objective_0": "Destroy a Fireball",
                    "the_right_tool.objective_1": "Destroy a Hornet",
                    "the_right_tool.objective_2": "Destroy a Turret",
                    "hatch_repairs.name": "Hatch Repairs",
                    "hatch_repairs.description": "Our scouts have reported several Raider Hatches with leaking hydraulic pipes. They still work, but not for long. Mind patching one up, next time you're out there?",
                    "hatch_repairs.objective_0": "Repair the leaking hydraulic pipes near a Raider Hatch",
                    "safe_passage.name": "Safe Passage",
                    "safe_passage.description": "I heard rumors about some signal Shani picked up. ARC is constantly adapting, and I'm sure this won't be their last warning spin. Well, if it's an arms race they want, they can get one.",
                    "safe_passage.objective_0": "Destroy 2 ARC enemies using any explosive grenade",
                    "down_to_earth.name": "Down To Earth",
                    "down_to_earth.description": "Raiders have long reported peculiar-looking crates dropping down from malfunctioning ARC Probes. If we can figure out a way to crack them open, we might get a better understanding of what it is they're after.",
                    "down_to_earth.objective_0": "Visit a Field Depot",
                    "down_to_earth.objective_1": "Deliver a Field Crate to Supply Station",
                    "down_to_earth.objective_2": "Collect the reward",
                    "the_trifecta.name": "The Trifecta",
                    "the_trifecta.description": "Intel's all well and good, but it only gets us so far. If ARC's truly closing in, I need every Raider to prove they can handle their drones in a fight.",
                    "the_trifecta.objective_0": "Destroy 2 Wasps",
                    "the_trifecta.objective_1": "Get 2 Wasp Driver for Shani",
                    "the_trifecta.objective_2": "Destroy 2 Hornets",
                    "the_trifecta.objective_3": "Get 2 Hornet Driver for Shani",
                    "the_trifecta.objective_4": "Destroy 2 Snitches",
                    "the_trifecta.objective_5": "Get 2 Snitch Scanner for Shani",
                    "a_better_use.name": "A Better Use",
                    "a_better_use.description": "We're short on everything but mouths to feed, yet Celeste's launching precious supplies into the air for Raiders to claw over. I'm done letting the good stuff go to waste.",
                    "a_better_use.objective_0": "Request in a Supply Drop from a Call Station",
                    "a_better_use.objective_1": "Loot a Supply Drop",
                    "what_goes_around.name": "What Goes Around",
                    "what_goes_around.description": "We can't build ARC tech from scratch, but there's plenty I can tinker from the pieces you salvage. I'm currently trying to repurpose different ARC parts. Would you mind running some experiments for me?",
                    "what_goes_around.objective_0": "Destroy any ARC enemy using a Fireball Burner",
                    "sparks_fly.name": "Sparks Fly",
                    "sparks_fly.description": "Those Hornet stings can really mess you up, if you're unlucky. And even if you destroy one, you're still wasting a ton of ammo. I've been working on a more elegant way to bring them down. Care to make some sparks fly?",
                    "sparks_fly.objective_0": "Destroy a Hornet with a Trigger 'Nade or Snap Blast",
                    "greasing_her_palms.name": "Greasing Her Palms",
                    "greasing_her_palms.description": "Recently, I've been trying and failing to get Tian Wen to join our community projects. I may have to sweeten the deal. She's been complaining about the quality of salvage found on the market; think we could do her a solid?",
                    "greasing_her_palms.objective_0": "On Dam Battlegrounds, visit the Locked Room in the Water Treatment Control building",
                    "greasing_her_palms.objective_1": "On Spaceport, scope out the rocket thrusters outside the Rocket Assembly",
                    "greasing_her_palms.objective_2": "On Buried City, visit the barricaded area on floor 6 of the Space Travel Building",
                    "a_first_foothold.name": "A First Foothold",
                    "a_first_foothold.description": "We've only just finished expanding the Tube network towards the Blue Gate, and we're still laboring away at the rest. My crew's been building new infrastructure around the valley to safeguard our Raiders, but the constant ARC threat has made it difficult to get anything done.",
                    "a_first_foothold.objective_0": "Stabilize the observation deck near the Ridgeline",
                    "a_first_foothold.objective_1": "Enable the comms terminal near the Olive Grove",
                    "a_first_foothold.objective_2": "Rotate the satellite dishes on the church roof, north of the Data Vault",
                    "a_first_foothold.objective_3": "Nail down the roof plates on the Raider structure near Trapper's Glade",
                    "dormant_barons.name": "Dormant Barons",
                    "dormant_barons.description": "During the First Wave, the Barons did more damage than all the other machines combined. Now they're mere husks; fixed in place where they once fell... Still, their internals might hold the answer to keeping ARC at bay. So open one up, and bring me whatever is inside.",
                    "dormant_barons.objective_0": "Loot a Baron husk",
                    "mixed_signals.name": "Mixed Signals",
                    "mixed_signals.description": "Have you spotted any Surveyors; the big round ones? They seem to be transmitting data back into orbit, and I can't help but think it's tied to that signal we picked up. Will you break one open, so we can try to decipher the data?",
                    "mixed_signals.objective_0": "Destroy an ARC Surveyor",
                    "mixed_signals.objective_1": "Obtain 1 Surveyor Vault",
                    "what_we_left_behind.name": "What We Left Behind",
                    "what_we_left_behind.description": "Celeste told me you're the one who helped her hound me about pitching in more. I'll say this once: I don't appreciate the meddling, and I have my own reasons for refusing. I do, however, appreciate the scrap. Since you're apparently good at tracking it down, I may have a task for you.",
                    "what_we_left_behind.objective_0": "On Buried City, search 2 containers in the Raider Camp beneath the Parking Garage",
                    "what_we_left_behind.objective_1": "On Dam Battlegrounds, search for anything significant in the South Swamp Outpost",
                    "what_we_left_behind.objective_2": "On Spaceport, search for anything significant in Bilguun's Hideout, next to the Container Storage",
                    "doctors_orders.name": "Doctor's Orders",
                    "doctors_orders.description": "Say, newbie: if you want me to treat you, you better prove that those precious limbs of yours are worth bandaging.",
                    "doctors_orders.objective_0": "Obtain 1 Syringe",
                    "doctors_orders.objective_1": "Obtain 2 Antiseptic",
                    "doctors_orders.objective_2": "Obtain 1 Durable Cloth",
                    "doctors_orders.objective_3": "Obtain 1 Great Mullein",
                    "medical_merchandise.name": "Medical Merchandise",
                    "medical_merchandise.description": "I've become quite crafty at weaving bandages from Fabric, but to my shame, I haven't quite mastered weaving an x-ray machine or a pulse oximiter.",
                    "medical_merchandise.objective_0": "On Spaceport, search 2 containers in the Departure Building's exam rooms",
                    "medical_merchandise.objective_1": "Search 3 containers in the Hospital in Buried City",
                    "medical_merchandise.objective_2": "On Dam Battlegrounds, search 2 containers in the Research & Administration building's medical room",
                    "a_reveal_in_ruins.name": "A Reveal in Ruins",
                    "a_reveal_in_ruins.description": "I got my hands on a fancy new ESR analyzer; had a whole big reveal planned. One minute it's here, next minute-poof. Please help?",
                    "a_reveal_in_ruins.objective_0": "Search for an ESR Analyzer inside any pharmacy in Buried City",
                    "a_reveal_in_ruins.objective_1": "Deliver the ESR Analyzer to Lance",
                    "broken_monument.name": "Broken Monument",
                    "broken_monument.description": "I have another special site I need you to search for me. An old battlegrounds, from the First Wave. Raiders nowadays usually pick places like that clean, despite the significance they once held. People forget quickly. Quicker than they should.",
                    "broken_monument.objective_0": "Reach the hallowed grounds by the Scrap Yard",
                    "broken_monument.objective_1": "Search for a compass near the broken-down vehicles",
                    "broken_monument.objective_2": "Search for the video tape near the cylindrical containers",
                    "broken_monument.objective_3": "Search for the old field rations in the Raider camp",
                    "broken_monument.objective_4": "Deliver the First Wave Tape to Tian Wen",
                    "broken_monument.objective_5": "Deliver First Wave Compass to Tian Wen",
                    "broken_monument.objective_6": "Deliver First Wave Rations to Tian Wen",
                    "marked_for_death.name": "Marked for Death",
                    "marked_for_death.description": "Someone has been lifting supplies from my drop-off point in Buried City. I've set up a trap, but I need someone to check it for me.",
                    "marked_for_death.objective_0": "Reach the Su Durante Warehouses in the Outskirts in Buried City",
                    "marked_for_death.objective_1": "Search for Tian Wen's cache near the Warehouses",
                    "marked_for_death.objective_2": "Follow the clues",
                    "straight_record.name": "Straight Record",
                    "straight_record.description": "Back during the First Wave, my squad and I built a trap out by the Dam. Overloaded a generator, turned it into a makeshift ARC trap. Now I hear Raiders are using it to cut comms and spring ambushes on each other. I need you to end it.",
                    "straight_record.objective_0": "Reach Victory Ridge",
                    "straight_record.objective_1": "Find the old EMP trap",
                    "straight_record.objective_2": "Disable the first power switch",
                    "straight_record.objective_3": "Disable the second power switch",
                    "straight_record.objective_4": "Disable the third power switch",
                    "straight_record.objective_5": "Shut down the EMP trap",
                    "a_lay_of_the_land.name": "A Lay of the Land",
                    "a_lay_of_the_land.description": "Those distant rumbles are getting less distant with each passing day. I have a lead on some LiDAR scanners that may help us monitor the tremors. You do want to keep a roof over your head, don't you?",
                    "a_lay_of_the_land.objective_0": "Reach the Jiangsu Warehouse",
                    "a_lay_of_the_land.objective_1": "Find the shipping notes in the foreman's office",
                    "a_lay_of_the_land.objective_2": "Locate the scanners on the upper floor of Control Tower A6",
                    "a_lay_of_the_land.objective_3": "Deliver 1 LiDAR Scanners to Shani",
                    "market_correction.name": "Market Correction",
                    "market_correction.description": "That theft before? Doesn't look like a coincidence anymore. Some of the competition from Toledo is setting up shop where they don't belong. I want their cache sabotaged, preferably before they get too comfortable.",
                    "market_correction.objective_0": "Locate the cache near Marano Station",
                    "market_correction.objective_1": "Sabotage the cache",
                    "keeping_the_memory.name": "Keeping the Memory",
                    "keeping_the_memory.description": "I lost my cool a bit when I sent you after that trap. I don't usually lose my temper, but the First Wave... We went through a lot, back then. Lost a lot of people. It's still a bit of a raw wound for me, but I want you to understand.",
                    "keeping_the_memory.objective_0": "Reach the wreckage in the Formicai Hills",
                    "keeping_the_memory.objective_1": "Search for the missing helmet",
                    "keeping_the_memory.objective_2": "Return the helmet to the memorial",
                    "reduced_to_rubble.name": "Reduced to Rubble",
                    "reduced_to_rubble.description": "That collapsed highway worries me; it looks to be recent. Much of Topside may be in ruins, but most of it is from ages ago.",
                    "reduced_to_rubble.objective_0": "Take a photo of the Collapsed Highway",
                    "reduced_to_rubble.objective_1": "Go to the Broken Earth",
                    "reduced_to_rubble.objective_2": "Follow the trail of destruction through the Broken Earth",
                    "reduced_to_rubble.objective_3": "Investigate the unknown ARC machines",
                    "with_a_trace.name": "With a Trace",
                    "with_a_trace.description": "That downed machine... We weren't the ones who did that. We know that there are stray survivors out there, but this? This goes far beyond a single person.",
                    "with_a_trace.objective_0": "Reach the Barren Clearing",
                    "with_a_trace.objective_1": "Find signs of who brought down the ARC machines",
                    "with_a_trace.objective_2": "Inspect the Adorned Wreckage",
                    "with_a_trace.objective_3": "Inspect the communications device",
                    "eyes_on_the_prize.name": "Eyes on the Prize",
                    "eyes_on_the_prize.description": "Everything's been calm around my drop-offs since you helped out, but that doesn't mean it'll stay that way for long. I've set up surveillance at one of my most used spots in Buried City, to prevent future tampering. Only problem is, it needs power to go live.",
                    "eyes_on_the_prize.objective_0": "Find the secluded roof terrace south-west of the Southern Station, look for blue tarps",
                    "eyes_on_the_prize.objective_1": "Rewire the solar panel using 3 Wires",
                    "echoes_of_victory_ridge.name": "Echoes of Victory Ridge",
                    "echoes_of_victory_ridge.description": "Did you feel any tremors last night? Me neither. But apparently the ground shifted at some point, and in the process it unearthed an old First Wave outpost that'd been blocked by debris. I'd like you to get in there quick, before anyone else does.",
                    "echoes_of_victory_ridge.objective_0": "Reach Victory Ridge",
                    "echoes_of_victory_ridge.objective_1": "Retrieve the battle plans from the hideout under the broken highway",
                    "echoes_of_victory_ridge.objective_2": "Deliver Major Alva's Patch to Celeste",
                    "industrial_espionage.name": "Industrial Espionage",
                    "industrial_espionage.description": "With my own stashes secured, I think it might be time to keep a closer eye on the competition so this doesn't happen again.",
                    "industrial_espionage.objective_0": "Find Tian Wen's weapon cache near the Gas Station in the Outskirts",
                    "industrial_espionage.objective_1": "Deliver the Burletta to the rival weapon cache",
                    "industrial_espionage.objective_2": "Plant a bug on the weapon cache",
                    "unexpected_initiative.name": "Unexpected Initiative",
                    "unexpected_initiative.description": "I'm setting up a greenhouse, to help boost our food production. I'm doing Celeste a solid, alright? That's all. But enough about that. I've got all the details worked out, but I'll need supplies, and I'm not hauling them alone.",
                    "unexpected_initiative.objective_0": "Reach the Grandioso Apartments in Buried City",
                    "unexpected_initiative.objective_1": "Search for Fertilizer on the rooftop of the Grandioso Apartments",
                    "unexpected_initiative.objective_2": "Reach Piazza Roma in Buried City",
                    "unexpected_initiative.objective_3": "Search for a Water Pump in the broken rooftop gardens at Piazza Roma",
                    "unexpected_initiative.objective_4": "Deliver a Water Pump to Tian Wen",
                    "unexpected_initiative.objective_5": "Deliver Fertilizer to Tian Wen",
                    "a_symbol_of_unification.name": "A Symbol of Unification",
                    "a_symbol_of_unification.description": "Y'know, back in the day we actually used to have a flag - well, a scrap of cloth more than anything. Still, seeing it meant you knew you had allies nearby, that you were on your own home turf. So, I was thinking...",
                    "a_symbol_of_unification.objective_0": "Reach the Formicai Outpost in Dam Battlegrounds",
                    "a_symbol_of_unification.objective_1": "Locate the flag at the Formicai Outpost",
                    "a_symbol_of_unification.objective_2": "Hoist the flag on the small platform overlooking the Red Lake",
                    "celestes_journals.name": "Celeste's Journals",
                    "celestes_journals.description": "Okay, so this is awkward... I lost two of my journals during some outpost inspections last time I went topside. Could you head out there and try to find them back before someone else stumbles on them?",
                    "celestes_journals.objective_0": "Retrieve Celeste's Journals from the South Swamp Outpost",
                    "celestes_journals.objective_1": "Retrieve Celeste's Journals from the northern outpost overlooking the Red Lakes",
                    "celestes_journals.objective_2": "Deliver 2 Journals to Celeste",
                    "back_on_top.name": "Back on Top",
                    "back_on_top.description": "Guess what? Shani asked me to help out with something, and for once, I'm actually glad she did. We're setting up new outposts topside! Or, planning to, at least. Can you believe it?",
                    "back_on_top.objective_0": "On Dam Battlegrounds, mark the Pattern House",
                    "back_on_top.objective_1": "On The Blue Gate, mark the white lookout tower south of the Warehouse Complex",
                    "back_on_top.objective_2": "On Spaceport, mark the South Trench Tower",
                    "back_on_top.objective_3": "On Buried City, mark the building with the mural in the Buried Properties",
                    "the_majors_footlocker.name": "The Major's Footlocker",
                    "the_majors_footlocker.description": "I have another job. It's.. about my mom. Those First Wave sites I sent you to before? I actually hoped you'd find something of my mother's. She fought in the Raider resistance. It was a long shot; but now I've got an actual lead.",
                    "the_majors_footlocker.objective_0": "Search for Major Aiva's mementos in the apartments northwest of The Dam",
                    "the_majors_footlocker.objective_1": "Deliver Major Aiva's Mementos to Tian Wen",
                    "out_of_the_shadows.name": "Out of the Shadows",
                    "out_of_the_shadows.description": "Did you see the flags? The time for cowering is over. You've been more than battle-tested, from what I hear; think you can take on a Rocketeer?",
                    "out_of_the_shadows.objective_0": "Destroy a Rocketeer",
                    "out_of_the_shadows.objective_1": "Obtain a Rocketeer Driver",
                    "eyes_in_the_sky.name": "Eyes in the Sky",
                    "eyes_in_the_sky.description": "Requires a zipline to get on top of the tower. Those LiDAR scanners you found work best when put in high locations. I've identified a few good spots around the Rust Belt; hope you're surefooted.",
                    "eyes_in_the_sky.objective_0": "On Dam Battlegrounds, install a LiDAR Scanner at the top of the Control Tower",
                    "eyes_in_the_sky.objective_1": "On Spaceport, install a LiDAR Scanner at the Communications Tower",
                    "eyes_in_the_sky.objective_2": "On Buried City, install a LiDAR Scanner on top of the Galleria sign",
                    "our_presence_up_there.name": "Our Presence Up There",
                    "our_presence_up_there.description": "ARC may be changing, but we're finally changing with it. Let's finish up those outposts and revolutionize the way we track them, flank them, and smash them to bits.",
                    "our_presence_up_there.objective_0": "Visit the Pattern House in The Dam",
                    "our_presence_up_there.objective_1": "Find and interact with the Power Switch",
                    "our_presence_up_there.objective_2": "Complete the antenna installation on the roof",
                    "communication_hideout.name": "Communication Hideout",
                    "communication_hideout.description": "We've been losing signals in some areas of Buried City-my guess is that our equipment is acting up. You're quite skilled with repairs, aren't you? Could you check it out?",
                    "communication_hideout.objective_0": "Reach the Red Tower in Old Town",
                    "communication_hideout.objective_1": "Find missing battery cell",
                    "communication_hideout.objective_2": "Install the battery cell in the Generator",
                    "communication_hideout.objective_3": "Enable the power on the Generator",
                    "communication_hideout.objective_4": "Boot the antenna terminal near the Red Tower",
                    "after_rain_comes.name": "After Rain Comes",
                    "after_rain_comes.description": "I know, I know! The power's down in sector- Oh, hey. A flash flood took out some of our solar panels in Buried City, and the generators only hold on for so long. Do us all a solid when you're up there, OK?",
                    "after_rain_comes.objective_0": "Find the flooded solar panels nearby the Grandioso Apartments",
                    "after_rain_comes.objective_1": "Repair the solar panels using 5 Wires and 2 Batteries",
                    "a_balanced_harvest.name": "A Balanced Harvest",
                    "a_balanced_harvest.description": "Our food production is finally enough to meet our basic needs, but what we really need now is variety. I have a lead on some agricultural research from before the First Wave. Are you in?",
                    "a_balanced_harvest.objective_0": "Go to the Research & Administration building",
                    "a_balanced_harvest.objective_1": "Locate Lab 1 on the upper floor above the reception",
                    "a_balanced_harvest.objective_2": "Search for any traces of the agricultural project",
                    "untended_garden.name": "Untended Garden",
                    "untended_garden.description": "According to the files you found in the lab, the cultivation researchers were actually the ones who set up the hydroponic domes out in the swamp. Sounds like the most obvious place to search next, don't you think?",
                    "untended_garden.objective_0": "Go to the Hydroponic Dome Complex",
                    "untended_garden.objective_1": "Access the data archive in one of the domes",
                    "untended_garden.objective_2": "Upload the data to the computer terminal in any Field Depot",
                    "the_root_of_the_matter.name": "The Root of the Matter",
                    "the_root_of_the_matter.description": "We're in luck. The notes you found last time were written by the lead researcher. When the project went under, it seems she took some of the seed samples and sealed them away in a secure location.",
                    "the_root_of_the_matter.objective_0": "Go to the Research Building",
                    "the_root_of_the_matter.objective_1": 'Search for the seed vault in the "room with a great view"',
                    "the_root_of_the_matter.objective_2": "Deliver the Experimental Seed Sample to Celeste",
                    "water_troubles.name": "Water Troubles",
                    "water_troubles.description": "If you're here to complain about the water, join the club. I've been fielding complaints all day. Something is definitely up with it, and I need some help to sort it out.",
                    "water_troubles.objective_0": "Locate the Flood Access Tunnel under the Red Lake Balcony",
                    "water_troubles.objective_1": "Find the intake to the District's Water Supply",
                    "water_troubles.objective_2": "Sample the water",
                    "into_the_fray.name": "Into the Fray",
                    "into_the_fray.description": "It used to be their world, up there. Nobody to challenge their claim. Yet here we are. More outposts. More intel. More firepower. If I didn't know better, I'd say we've got quite a bit of fight left in us.",
                    "into_the_fray.objective_0": "Destroy a Leaper",
                    "into_the_fray.objective_1": "Obtain a Leaper Pulse Unit",
                    "source_of_the_contamination.name": "Source of the Contamination",
                    "source_of_the_contamination.description": "I'm not saying our water's been tampered with, but based on your samples, I can't rule out the possibility either. Would you return to the Dam and see what's wrong?",
                    "source_of_the_contamination.objective_0": "Reach the Water Treatment Building in The Dam",
                    "source_of_the_contamination.objective_1": "Search for the Flood Spill Intake near the Swamp",
                    "source_of_the_contamination.objective_2": "Investigate any suspicious objects",
                    "switching_the_supply.name": "Switching the Supply",
                    "switching_the_supply.description": "There is a reservoir beneath the Spaceport; if we manage to rout that water here, that should buy us time to deal with the contamination.",
                    "switching_the_supply.objective_0": "Find the tunnels under the Spaceport",
                    "switching_the_supply.objective_1": "Find and turn the valve in the tunnels under Spaceport",
                    "a_warm_place_to_rest.name": "A Warm Place to Rest",
                    "a_warm_place_to_rest.description": "A customer of mine saw a family taking cover in an old encampment in Buried City. I'll pay anyone who manages to find them and escort them back to safety.",
                    "a_warm_place_to_rest.objective_0": "Locate the Abandoned Highway Camp",
                    "a_warm_place_to_rest.objective_1": "Search for any signs of survivors",
                    "a_warm_place_to_rest.objective_2": "Follow the red markers",
                    "a_warm_place_to_rest.objective_3": "Inspect the grave",
                    "prescriptions_of_the_past.name": "Prescriptions of the Past",
                    "prescriptions_of_the_past.description": "I've been curious about the medical area in the Spaceport for a while now. Something tells me it's got just what I need to become the undeniable champion of this place.",
                    "prescriptions_of_the_past.objective_0": "Visit the Departure Building in Spaceport",
                    "prescriptions_of_the_past.objective_1": "Find the Medical Exam Room inside the Departure Building",
                    "prescriptions_of_the_past.objective_2": "Search for the records",
                    "power_out.name": "Power Out",
                    "power_out.description": "This goes beyond bad luck. Something-or someone-has knocked out some of our electrical substations. The engineer I sent out to fix it hasn't returned, so I need all available Raiders to look into it. That includes you.",
                    "power_out.objective_0": "Find the Electrical Substation south of the Spaceport, next to the Checkpoint",
                    "power_out.objective_1": "Find any sign of the missing engineer",
                    "power_out.objective_2": "Carry the fuse/battery back to the Electrical Substation",
                    "power_out.objective_3": "Enable the power switch on the Fuse Box",
                    "lost_in_transmission.name": "Lost in Transmission",
                    "lost_in_transmission.description": "I have equipment set up at the Spaceport, to monitor ARC's movements. My connection broke down just now - I need you to head to the Control Towers and help me retrieve my logs.",
                    "lost_in_transmission.objective_0": "Visit Control Tower A6",
                    "lost_in_transmission.objective_1": "Reach the top of Control Tower A6",
                    "lost_in_transmission.objective_2": "Establish a connection from the terminal",
                    "flickering_threat.name": "Flickering Threat",
                    "flickering_threat.description": "My usual engineer is still healing from his wounds, and has been loopy for days. We can't afford to be at half-grid until he heals; I need someone to pick up his wrench in the mean time.",
                    "flickering_threat.objective_0": "Find the Generator Room",
                    "flickering_threat.objective_1": "Repair the Generator",
                    "flickering_threat.objective_2": "Find the Ventilation Shaft",
                    "flickering_threat.objective_3": "Enable the power via the power switch underneath the stairs",
                    "bees.name": "Bees!",
                    "bees.description": "Bees! There are bees still around! While I'm no expert, our greenhouse crew desperately wants some.",
                    "bees.objective_0": "Reach the Olive Grove in Blue Gate",
                    "bees.objective_1": "Search for bee hives around the Olive Grove",
                    "espresso.name": "Espresso",
                    "espresso.description": "A Raider came into my shop earlier, to trade some grenades for a machine she found in Buried City. She said it makes coffee, but it seems to be missing a few parts. Up for a job?",
                    "espresso.objective_0": "Find an espresso machine to salvage for spare parts",
                    "espresso.objective_1": "Get the Espresso Machine Parts for Apollo",
                    "life_of_a_pharmacist.name": "Life of a Pharmacist",
                    "life_of_a_pharmacist.description": "This place could use a makeover, but I don't want it looking like your raggedy Raider Dens. See if you can find out how my fellow medical greats used to live.",
                    "life_of_a_pharmacist.objective_0": "Find the Arbusto Farmacia by the collapsed highway",
                    "life_of_a_pharmacist.objective_1": "Document the pharmacist's hobbies",
                    "life_of_a_pharmacist.objective_2": "Document the pharmacist's family",
                    "life_of_a_pharmacist.objective_3": "Document the pharmacist's taste",
                    "life_of_a_pharmacist.objective_4": "Document the pharmacist's skills",
                    "tribute_to_toledo.name": "Tribute to Toledo",
                    "tribute_to_toledo.description": "The Official Toledo Tubes Management is demanding one of our Power Rods for usage of \"their\" Slingshot tubes. Don't let the name fool you, they're in no way official; just thugs with lots of power. Could you help me with this?",
                    "tribute_to_toledo.objective_0": "Get a Power Rod for Celeste",
                    "digging_up_dirt.name": "Digging Up Dirt",
                    "digging_up_dirt.description": "We caught a break. One of our scouts saw a member of the Tubes Management make a dead drop inside the Santa Maria Houses in the Buried City. This might be our chance to dig up some dirt on them for a change. You in?",
                    "digging_up_dirt.objective_0": "Locate the Santa Maria Houses in Old Town",
                    "digging_up_dirt.objective_1": "Locate the Dead Drop inside the courtyard",
                    "turnabout.name": "Turnabout",
                    "turnabout.description": "I got a plan. If we recover the evidence against the OTTM before they get to it, we might get them off our backs once and for all.",
                    "turnabout.objective_0": "Go to the North Trench Tower",
                    "turnabout.objective_1": "Locate and upload the blackmail files to Celeste",
                    "building_a_library.name": "Building a Library",
                    "building_a_library.description": "Our library selection has grown pretty stale. Could you head out to Buried City, and find something more for us to read? Make sure you bring something for everyone.",
                    "building_a_library.objective_0": "Locate the Library in the City Center",
                    "building_a_library.objective_1": "Find 1 romance book",
                    "building_a_library.objective_2": "Find 1 detective book",
                    "building_a_library.objective_3": "Find 1 adventure book",
                    "building_a_library.objective_4": "Deliver 3 books to Apollo",
                    "a_new_type_of_plant.name": "A New Type of Plant",
                    "a_new_type_of_plant.description": "Some scouts have been bringing back reports of these weird plants spreading into the area. Now, this makes your old pal Lance think it may have some interesting uses.",
                    "a_new_type_of_plant.objective_0": "Search for the new plant near the Baron Husk in the Old Battleground",
                    "a_new_type_of_plant.objective_1": "Deliver the Possibly Toxic Plant to Lance",
                    "armored_transports.name": "Armored Transports",
                    "armored_transports.description": "Ever since we expanded the tunnels to the Blue Gate, some rare pieces have started appearing on the black market.\n\nMeanwhile, I'm stuck here peddling battered old Rattlers. If I don't find new supply lines, I'll be left in the dust.",
                    "armored_transports.objective_0": "Reach the Checkpoint",
                    "armored_transports.objective_1": "Search the Guard huts for a Armored Patrol Key Card",
                    "armored_transports.objective_2": "Reach the Traffic Tunnel near the Blue Gate Checkpoint",
                    "armored_transports.objective_3": "Find and unlock the rear door of an armored patrol car",
                    "in_my_image.name": "In My Image",
                    "in_my_image.description": "I just treated one of the first Raiders who visited Stella Montis, and she said that she saw... others. Androids, very much like me.",
                    "in_my_image.objective_0": "Deploy into Stella Montis",
                    "in_my_image.objective_1": "Find and search 3 Androids",
                    "cold_storage.name": "Cold Storage",
                    "cold_storage.description": "Reports about Stella Montis keep coming in, and it's unlike anything we've seen before. There may be records or relics from the past in there, and if so, I want them.",
                    "cold_storage.objective_0": "In one round, search any J Kozma Ventures container",
                    "cold_storage.objective_1": "In one round, deliver the Rare Books to Shani",
                    "snap_and_salvage.name": "Snap and Salvage",
                    "snap_and_salvage.description": "All of Speranza is buzzing about Stella Montis right now, and I admit it's caught my attention. Let the others sort out the whats and hows; I'm interested in the tech inside.",
                    "snap_and_salvage.objective_0": "Take a photo of any of the Rovers in the Sandbox",
                    "snap_and_salvage.objective_1": "Search the papers in the Security Checkpoint room by the Lobby",
                    "snap_and_salvage.objective_2": "Deliver a Magnetron to Tian Wen",
                    "snap_and_salvage.objective_3": "Deliver a Flow Controller to Tian Wen",
                    "the_clean_dream.name": "The Clean Dream",
                    "the_clean_dream.description": "You know what I've been dreaming of lately? A talking water distiller! Crazy, huh? But seriously, with purer compounds I could make explosives with more oumph! Would be something, right?",
                    "the_clean_dream.objective_0": "On Spaceport, search 4 containers in the underground tunnels",
                    "the_clean_dream.objective_1": "Find and monitor any Filtration System in the tunnels",
                    "the_clean_dream.objective_2": "On The Blue Gate, visit the Maintenance Bunker",
                    "the_clean_dream.objective_3": "Monitor the Purification System in the bunker",
                    "the_clean_dream.objective_4": "Find and photograph the blueprints in the bunker",
                    "a_toxic_trail.name": "A Toxic Trail",
                    "a_toxic_trail.description": "We've got clean water again, but we can't risk people falling ill if the saboteurs return. We need to root them out once and for all.",
                    "a_toxic_trail.objective_0": "Return to the water intake below the Water Treatment Control building",
                    "a_toxic_trail.objective_1": "Search the swamp for traces of the barrel's origins",
                    "a_toxic_trail.objective_2": "Take a photo of the barrel truck",
                    "a_toxic_trail.objective_3": "Search the truck for clues about the saboteur's identity.",
                    "paving_the_way.name": "Paving the Way",
                    "paving_the_way.description": "For an entire sector to collapse like that... No wonder people are scared. We need to reinforce beyond anything we've done before, and we can't do it alone.",
                    "paving_the_way.objective_0": "Go to any ENELICA building",
                    "paving_the_way.objective_1": "Search for a notice board with a note from the researcher",
                    "paving_the_way.objective_2": "On Buried City, reach the top floor above the Convinio in Piazza Roma",
                    "paving_the_way.objective_3": "Find the researcher's flat and search for any research data",
                    "the_stench_of_corruption.name": "The Stench of Corruption",
                    "the_stench_of_corruption.description": "That key you found in the barrel truck... I won't jump to accusations just yet, but this reeks of an inside job. Could you investigate a hunch I have?",
                    "the_stench_of_corruption.objective_0": "In one round",
                    "the_stench_of_corruption.objective_1": "Reach the southwest lobby of the Departure Building",
                    "the_stench_of_corruption.objective_2": "Find the staff locker room",
                    "the_stench_of_corruption.objective_3": "Search the room for any clues of the saboteur's identity",
                    "the_stench_of_corruption.objective_4": "Reach the tunnels below the Spaceport",
                    "the_stench_of_corruption.objective_5": "Use the key on any Flushing Terminal to override the bypass protocol",
                    "deciphering_the_data.name": "Deciphering the Data",
                    "deciphering_the_data.description": "If the data you found can keep the ceiling from collapsing, we have no time to spare. I know of a few magnetic decryptors around Acerra Spaceport, from back during the Exodus. They might still be working.",
                    "deciphering_the_data.objective_0": "Use the Magnetic Decryptor in the Fuel Control Building",
                    "deciphering_the_data.objective_1": "Reach the Arrival Building in Spaceport",
                    "deciphering_the_data.objective_2": "Use the Magnetic Decryptor on the top floor of the Arrival Building",
                    "groundbreaking.name": "Groundbreaking",
                    "groundbreaking.description": "Data or no data: we'll learn how to make this place earthquake-proof. With a research this in-depth, there's bound to be a paper trail somewhere.",
                    "groundbreaking.objective_0": "Enter the locked room at Pilgrim's Peak",
                    "groundbreaking.objective_1": "Search the room for any construction research",
                    "groundbreaking.objective_2": "Find the building pictured on the whiteboard",
                    "groundbreaking.objective_3": "Photograph the abandoned housing project",
                    "stella_montis.name": "Stella Montis",
                    "stella_montis.objective_0": "Unlock the map by completing 24 rounds on other maps",
                    "blue_gate.name": "Blue Gate",
                    "blue_gate.objective_0": "Unlock the map by completing 18 rounds on other maps",
                    the_clean_dream: {
                        name: "The Clean Dream",
                        objective_0: "On Spaceport, search 4 containers in the underground tunnels",
                        objective_1: "Find and monitor any Filtration System in the tunnels",
                        objective_2: "On The Blue Gate, visit the Maintenance Bunker",
                        objective_3: "Monitor the Purification System in the bunker",
                        objective_4: "Find and photograph the blueprints in the bunker"
                    },
                    broken_monument: {
                        name: "Broken Monument",
                        objective_0: "Reach the hallowed grounds by the Scrap Yard",
                        objective_1: "Search for a compass near the broken-down vehicles",
                        objective_2: "Search for the video tape near the cylindrical containers",
                        objective_3: "Search for the old field rations in the Raider camp",
                        objective_4: "Deliver the First Wave Tape to Tian Wen",
                        objective_5: "Deliver First Wave Compass to Tian Wen",
                        objective_6: "Deliver First Wave Rations to Tian Wen"
                    },
                    "a_prime_specimen.name": "A Prime Specimen",
                    "a_prime_specimen.description": "That Deforester near the Blue Gate may have caused enormous devastation, but an intact carcass like that is also an invaluable sample for our research.",
                    "a_prime_specimen.objective_0": "Obtain 2 ARC Powercells",
                    "a_prime_specimen.objective_1": "Interact with any ARC Deforester",
                    "a_prime_specimen.objective_2": "Loot an ARC Deforester",
                    "the_league.name": "The League",
                    "the_league.description": "The kids around here kick around empty grenade casings. It's only a matter of time before they're not empty anymore. So here's the plan: you help me with some preparations and I'll put together a real football team for the youngsters.",
                    "the_league.objective_0": "Deliver a Deflated Football to Apollo",
                    "the_league.objective_1": "Deliver a Bicycle Pump to Apollo",
                    "the_league.objective_2": "On Dam Battlegrounds, photograph the goal near the Water Towers",
                    "the_league.objective_3": "In Buried City, photograph football magazines at any kiosk",
                    "with_a_view.name": "With a View",
                    "with_a_view.description": "Have you ever noticed those trails of light streaking across the skies? I've seen too many things in my life to believe they're natural, but it'll take more than a hunch to convince Celeste.",
                    "with_a_view.objective_0": "Obtain a Rotary Encoder",
                    "with_a_view.objective_1": "Visit any of the control rooms near the Assembly Line",
                    "with_a_view.objective_2": "Use the Rotary Encoder to activate the server switch",
                    "with_a_view.objective_3": "Interact with a nearby computer to identify correct paths",
                    "with_a_view.objective_4": "Deliver an Ion Sputter to Shani",
                    "movie_night.name": "Movie Night",
                    "movie_night.description": "Everyone is so tense since there are rumors about the ARC signal spreading. I was thinking a movie night would be a nice distraction, but I'm missing some essential resources. Can you help me?",
                    "movie_night.objective_0": "Deliver a Portable TV to Apollo",
                    "movie_night.objective_1": "At Stella Montis, search for old videotapes in the cultural archives",
                    "movie_night.objective_2": "Deliver the pile of videotapes to Apollo",
                    "combat_recon.name": "Combat Recon",
                    "combat_recon.description": "With those Bombardiers roaming around, ARC has found an entirely new way to flush Raiders out of cover. Mortars fly very differently from bullets, so we need to identify suitable defensive positions.",
                    "combat_recon.objective_0": "Scope out a cover spot in the Parking Garage staircases",
                    "combat_recon.objective_1": "Scope out a cover spot in the buses near Marano Park",
                    "combat_recon.objective_2": "Scope out a cover spot in the attics around Main Street",
                    "combat_recon.objective_3": "Destroy 2 Spotters",
                    "combat_recon.objective_4": "Deliver a Spotter Relay to Shani",
                    "bombing_run.name": "Bombing Run",
                    "bombing_run.description": "Now, time to see if that recon paid off. If we can teach Raiders to effectively counter Bombardiers up there, we'd be a lot safer down here.",
                    "bombing_run.objective_0": "Destroy a Bombardier",
                    "bombing_run.objective_1": "Deliver a Bombardier Cell to Shani",
                    "on_deaf_ears.name": "On Deaf Ears",
                    "on_deaf_ears.description": "I've been tracking down advanced hearing aids developed at Stella Montis. The research could help us improve our communication equipment significantly.",
                    "on_deaf_ears.objective_0": "Locate researcher's guest logs on reception computers",
                    "on_deaf_ears.objective_1": "Find lecture location and access notes",
                    "on_deaf_ears.objective_2": "Retrieve prototype information from Medical Research computers",
                    "on_deaf_ears.objective_3": "Obtain printed shipping logs from Assembly Workshops",
                    "on_the_map.name": "On The Map",
                    "on_the_map.description": "I have a map of the Spaceport right here, but I'm not fully certain where those coordinate points are located. Help me triangulate the hearing aid coordinates using location transmissions.",
                    "on_the_map.objective_0": "Travel to where the Fuel Lines snapped and transmit location",
                    "on_the_map.objective_1": "Head to the antenna near Fuel Control and transmit location",
                    "on_the_map.objective_2": "Go to the cactus patch in the wall breach and transmit location",
                    "on_the_map.objective_3": "Transmit location from the Container Storage building roof",
                    "on_the_map.objective_4": "Find and mark the container covered in tarp",
                    "a_dead_end.name": "A Dead End",
                    "a_dead_end.description": "Shani has uncovered references to a classified project. She needs someone to investigate an underground MANTIKOR facility in The Blue Gate.",
                    "a_dead_end.objective_0": "Find MANTIKOR's underground facilities",
                    "a_dead_end.objective_1": "Search the locked room for Project Heartwood records",
                    "a_dead_end.objective_2": "Locate the Dusty Film Reel",
                    "a_dead_end.objective_3": "Deliver the Dusty Film Reel to Shani",
                    "dust_on_the_wires.name": "Dust On The Wires",
                    "dust_on_the_wires.description": "A scout patrol went silent near the Spaceport. Shani wants you to retrace their steps and find out what happened.",
                    "dust_on_the_wires.objective_0": "Visit any Field Depot on the eastern side of the Spaceport",
                    "dust_on_the_wires.objective_1": "Use the Field Radio to transmit the scout group's last log to Shani",
                    "dust_on_the_wires.objective_2": "Interact with the terminal in the old Raider Tower north of the Maintenance Hanger",
                    "dust_on_the_wires.objective_3": "Find traces of the scout patrol near the Maintenance Hanger",
                    "dust_on_the_wires.objective_4": "Search the remains left by the scouts",
                    "dust_on_the_wires.objective_5": "Deliver the Scout Patrol Note to Shani",
                    "waking_the_grid.name": "Waking The Grid",
                    "waking_the_grid.description": "The scout patrol's notes mention a security system at the Spaceport that might still be operational. Shani wants you to activate it.",
                    "waking_the_grid.objective_0": "Activate the security sensors in one of the Guard Towers",
                    "waking_the_grid.objective_1": "Start the Security Control Center in Departure Building",
                    "waking_the_grid.objective_2": "Search for traces of a security breach in the Arrival Building Data Office",
                    "keeping_an_eye_out.name": "Keeping An Eye Out",
                    "keeping_an_eye_out.description": "Celeste has heard rumors about a mysterious figure living near the collapsed highway in The Blue Gate. She wants you to investigate.",
                    "keeping_an_eye_out.objective_0": "Locate the collapsed highway by the southern edge of the Barren Clearing",
                    "keeping_an_eye_out.objective_1": "Find Bilguun's shelter and search for clues of his presence",
                    "a_rising_tide.name": "A Rising Tide",
                    "a_rising_tide.description": "The film reel from the MANTIKOR facility revealed clues about a reconstruction project. Celeste needs you to follow the trail across Buried City and Dam Battlegrounds.",
                    "a_rising_tide.objective_0": "On Buried City, find the foreman's barricaded apartment south of Piazza Roma",
                    "a_rising_tide.objective_1": "Access the foreman's digital logbook",
                    "a_rising_tide.objective_2": "On Dam Battlegrounds, reach the Power Generation Complex",
                    "a_rising_tide.objective_3": "Find a way into the Controlled Access Zone",
                    "a_rising_tide.objective_4": "Search the Controlled Access Zone for clues about the foreman's reconstruction project",
                    "worth_your_salt.name": "Worth Your Salt",
                    "worth_your_salt.description": "Celeste has located a prototype battery at the Spaceport's Rocket Assembly. She needs someone to retrieve and charge it.",
                    "worth_your_salt.objective_0": "Go to the Rocket Assembly",
                    "worth_your_salt.objective_1": "Search for the hidden Battery Prototype in a high place",
                    "worth_your_salt.objective_2": "Bring the Battery Prototype to the Industrial Recharger",
                    "worth_your_salt.objective_3": "Use the machinery to charge the battery",
                    "worth_your_salt.objective_4": "Deliver the Charged Battery to the drop-off point",
                    "stable_housing.name": "Stable Housing",
                    "stable_housing.description": "Tian Wen has learned about Project Heartwood blueprints locked in a safe at Stella Montis' Security Bridge. He needs someone to retrieve them.",
                    "stable_housing.objective_0": "Go to the Security Bridge",
                    "stable_housing.objective_1": "Search for the safe in the side room by the third-floor staircases",
                    "stable_housing.objective_2": "Head upstairs to the fourth-floor control room",
                    "stable_housing.objective_3": "Use the Access Card Printer to print a key to the safe",
                    "stable_housing.objective_4": "Search for alternate ways into the safe",
                    "stable_housing.objective_5": "Retrieve the contents of the safe",
                    "stable_housing.objective_6": "Deliver the Project Heartwood Blueprints to Tian Wen"
                },
                contacts: {
                    title: "Contacts",
                    subtitle: "Get in touch with Arc Raiders Central",
                    discord: {
                        title: "Discord",
                        description: "Join our Discord server to chat, report bugs, and suggest new features"
                    },
                    reddit: {
                        title: "Reddit",
                        description: "Visit our Reddit post for discussions and updates"
                    }
                },
                mapsHub: {
                    title: "Arc Raiders Interactive Maps",
                    subtitle: "Explore all maps with filterable markers for containers, extracts, hatches, quest locations, and more",
                    viewMap: "View Map",
                    featuresTitle: "Interactive Map Features",
                    guideTitle: "Map Strategy Guide",
                    riskLevels: {
                        low: "Low Risk",
                        medium: "Medium Risk",
                        high: "High Risk",
                        extreme: "Extreme Risk"
                    },
                    events: {
                        nightRaid: "Night Raid",
                        harvester: "Harvester",
                        husk: "Husk",
                        coldSnap: "Cold Snap",
                        hiddenBunker: "Hidden Bunker",
                        emStorm: "EM Storm"
                    },
                    maps: {
                        dam: {
                            name: "Dam Battlegrounds",
                            description: "Medium-risk map featuring the Control Tower, Hydroponic Dome, and Water Treatment. Great for farming resources and completing early quests."
                        },
                        buriedCity: {
                            name: "Buried City",
                            description: "High-risk urban environment with Marano Station, Hospital, and residential areas. Excellent for Rusted Gears farming and Dog Collar locations."
                        },
                        spaceport: {
                            name: "The Spaceport",
                            description: "High-risk facility with Launch Tower, Central Hub, and Departure/Arrival buildings. Features Hidden Bunker event and multiple extraction points."
                        },
                        blueGate: {
                            name: "Blue Gate",
                            description: "High-risk map with Locked Gate puzzles, Raider's Refuge switches, and Ancient Fort battery locations. Good for beginners with quick extraction routes."
                        },
                        stellaMontis: {
                            name: "Stella Montis",
                            description: "Extreme-risk underground research facility with two levels. Features Matriarch spawn, Assembly Workshop, and the best epic loot spawns in the game."
                        }
                    },
                    features: {
                        loot: {
                            title: "Loot Locations",
                            description: "Weapon cases, raider caches, and high-value containers"
                        },
                        extraction: {
                            title: "Extraction Points",
                            description: "All extraction locations with timing and risk info"
                        },
                        containers: {
                            title: "Containers",
                            description: "Med crates, ammo boxes, utility crates, and more"
                        },
                        quests: {
                            title: "Quest Markers",
                            description: "Quest objectives and Field Depot locations"
                        },
                        enemies: {
                            title: "Enemy Spawns",
                            description: "ARC enemy patrol routes and spawn points"
                        },
                        events: {
                            title: "Event Locations",
                            description: "Harvester spawns, bunker entries, event triggers"
                        }
                    },
                    guide: {
                        navigation: {
                            title: "Map Navigation Tips",
                            content: "Use the filter panel to toggle specific POI types. Custom pins let you mark your own discoveries. Zoom in/out with scroll or pinch gestures. Click any marker for detailed information."
                        },
                        lootStrategy: {
                            title: "Loot Strategy",
                            content: "Prioritize weapon cases and raider caches for high-tier gear. Breach rooms contain rare blueprints. Check containers during events for bonus loot. Learn the respawn timers for efficient farming routes."
                        },
                        extraction: {
                            title: "Safe Extraction",
                            content: "Always know your nearest extraction before engaging enemies. Some extracts require specific items or conditions. Watch for ARC patrols near extraction zones. Extract before risking valuable loot."
                        }
                    },
                    quickLinks: {
                        timers: "View Map Event Timers"
                    }
                },
                workshopHub: {
                    title: "Items, Hideout & Projects",
                    subtitle: "Everything you need to manage your hideout, track materials needed for projects and workbenches, and browse the complete game items database",
                    openTool: "Open",
                    workflowTitle: "Recommended Workflow",
                    tools: {
                        items: {
                            title: "Items Database",
                            description: "Complete database of all game items. Compare stats, check crafting costs, and calculate profit margins.",
                            feature1: "400+ items with full stats",
                            feature2: "Crafting cost analysis",
                            feature3: "Profit margin analysis"
                        },
                        hideout: {
                            title: "Hideout Tracker",
                            description: "Track all obtained and missing resources for all Scrappy levels and Workbench tiers.",
                            feature1: "All items for Scrappy upgrades",
                            feature2: "All items for Workbench upgrades",
                            feature3: "Track all your progress"
                        },
                        projects: {
                            title: "Projects Tracker",
                            description: "All items needed for expedition projects and active events. Track progress of expedition projects and events.",
                            feature1: "All levels of all Expedition projects",
                            feature2: "All levels of active Events",
                            feature3: "Track all your progress"
                        },
                        missingItems: {
                            title: "Missing Items List",
                            description: "Auto-generate a complete list of materials needed for hideout upgrades, projects, and events.",
                            feature1: "Automatic calculation",
                            feature2: "Combined hideout, projects and events",
                            feature3: "Export and share with your friends"
                        }
                    },
                    workflow: {
                        step1: {
                            title: "Update Hideout Resources",
                            description: "Mark items you already have"
                        },
                        step2: {
                            title: "Update Projects Resources",
                            description: "Mark delivered resources"
                        },
                        step3: {
                            title: "View Missing Items",
                            description: "Get your shopping list"
                        },
                        step4: {
                            title: "Go Raid",
                            description: "Farm what you need"
                        }
                    },
                    quickLinks: {
                        items: "Browse Items Database"
                    }
                },
                raiderHub: {
                    title: "Raider Progression",
                    subtitle: "Track your quests, build your skill tree, compete in Trials, and collect all blueprints",
                    openTool: "Open",
                    tipsTitle: "Pro Tips",
                    progressionTitle: "Progression Guide",
                    tools: {
                        quests: {
                            title: "Quest Tracker",
                            description: "Complete database of all quests from all traders. Track your quest progress and discover future rewards.",
                            highlight1: "All trader quests",
                            highlight2: "Objective tracking",
                            highlight3: "Reward previews"
                        },
                        skillTree: {
                            title: "Skill Tree Planner",
                            description: "Plan your character build before spending points. Simulate different builds and save multiple skill trees.",
                            highlight1: "Interactive skill tree",
                            highlight2: "Build simulation",
                            highlight3: "Cloud save"
                        },
                        trials: {
                            title: "Trials Tracker",
                            description: "Track your progress in weekly trials and climb the ranks from Recruit to Cantina Legend.",
                            highlight1: "Weekly challenges",
                            highlight2: "Points calculator",
                            highlight3: "Score saving"
                        },
                        blueprints: {
                            title: "Blueprint Collection",
                            description: "Track all 75+ blueprints in the game. Keep track of owned ones and share with your friends.",
                            highlight1: "75+ blueprints",
                            highlight2: "Blueprint export",
                            highlight3: "Collection tracking"
                        },
                        loadout: {
                            title: "Loadout Builder",
                            description: "Build and manage your equipment loadouts. Configure augments, weapons, shields and inventory.",
                            highlight1: "Full loadout config",
                            highlight2: "Weight & value tracking",
                            highlight3: "Multiple presets"
                        }
                    },
                    tips: {
                        objectives: {
                            title: "Quest Priority",
                            content: "Focus on early quests to unlock hideout upgrades and better gear. Rewards stack up, especially early on."
                        },
                        skills: {
                            title: "Skill Builds",
                            content: "Plan your build based on your playstyle. Focus on loot? Go for the Survival branch. PVE? Try the Conditioning branch."
                        },
                        ranking: {
                            title: "Trials Ranking",
                            content: "Farm during 2X events to maximize points. Focus on one challenge at a time for efficiency."
                        },
                        traders: {
                            title: "Trader Rep",
                            content: "Complete quests to unlock better items from traders. Some blueprints are only obtainable through quests."
                        }
                    },
                    progression: {
                        early: {
                            title: "Early Game",
                            content: "Complete Celeste's early quests. Unlock basic hideout upgrades. Learn the Dam and Buried City maps. Focus on survival skills."
                        },
                        mid: {
                            title: "Mid Game",
                            content: "Tackle complex maps like Blue Gate and Spaceport. Start Trials for ranking rewards. Collect blueprints and complete Scrappy and Workbench upgrades."
                        },
                        late: {
                            title: "End Game",
                            content: "Complete the expedition project (and event if available). Farm Stella Montis for epic loot. Reach Cantina Legend in Trials. Collect all blueprints."
                        }
                    },
                    quickLinks: {
                        quests: "Check out the Quests"
                    }
                },
                consent: {
                    title: "We value your privacy",
                    description: "We use cookies and similar technologies to enhance your experience, analyze site usage, and assist in our marketing efforts.",
                    acceptAll: "Accept All",
                    necessaryOnly: "Necessary Only",
                    customize: "Customize",
                    preferences: {
                        title: "Cookie Preferences",
                        description: "Manage your cookie preferences below. Necessary cookies are required for the site to function properly.",
                        required: "Required",
                        necessary: {
                            title: "Necessary",
                            description: "Essential for site functionality. Stores your preferences and login state. These cannot be disabled."
                        },
                        analytics: {
                            title: "Analytics",
                            description: "Help us understand how visitors use our site to improve the experience (Google Analytics)."
                        },
                        email: {
                            title: "Email Notifications",
                            description: "Receive occasional emails about important updates, new features, and Arc Raiders Central news.",
                            loginRequired: "Login required"
                        },
                        save: "Save Preferences",
                        cancel: "Cancel"
                    }
                },
                legal: {
                    privacy: {
                        title: "Privacy Policy",
                        lastUpdated: "Last updated",
                        date: "February 2, 2026",
                        sections: {
                            intro: {
                                title: "Introduction",
                                content: "Arc Raiders Central respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website."
                            },
                            dataController: {
                                title: "Data Controller",
                                content: "Arc Raiders Central is operated as a fan-made project. For any privacy-related inquiries, please contact us at the email address provided below."
                            },
                            dataCollected: {
                                title: "Data We Collect",
                                authentication: {
                                    title: "Authentication Data",
                                    content: "When you sign in with Google, we receive your email address, display name, and profile picture. This data is used solely for authentication and personalization purposes."
                                },
                                gameProgress: {
                                    title: "Game Progress Data",
                                    content: "We store your game progress including hideout upgrades, quest completion, blueprint collection, skill tree builds, and custom map pins. This data is associated with your account and synced across devices."
                                },
                                analytics: {
                                    title: "Analytics Data (with consent)",
                                    content: "With your consent, Google Analytics collects anonymous usage data including pages visited, time spent, device type, and general location. This helps us improve the site."
                                }
                            },
                            legalBasis: {
                                title: "Legal Basis for Processing",
                                content: "We process your data based on: (1) Your consent for analytics cookies; (2) Legitimate interest for providing our service and improving user experience; (3) Contract performance for account-related features."
                            },
                            dataRetention: {
                                title: "Data Retention",
                                content: "Your account data is retained as long as you have an active account. You can request deletion at any time. Analytics data is retained according to Google's retention policies (typically 14-26 months)."
                            },
                            yourRights: {
                                title: "Your Rights (GDPR)",
                                content: "Under GDPR, you have the following rights:",
                                rights: {
                                    access: "Right to access your personal data",
                                    rectification: "Right to rectify inaccurate data",
                                    erasure: 'Right to erasure ("right to be forgotten")',
                                    restriction: "Right to restrict processing",
                                    portability: "Right to data portability",
                                    objection: "Right to object to processing"
                                }
                            },
                            dataDeletion: {
                                title: "Data Deletion Request",
                                content: "To request deletion of your account and all associated data, please contact us at:"
                            },
                            contact: {
                                title: "Contact Us",
                                content: "For any privacy-related questions or concerns, please contact us at:"
                            }
                        }
                    },
                    terms: {
                        title: "Terms of Service",
                        lastUpdated: "Last updated",
                        date: "February 2, 2026",
                        sections: {
                            acceptance: {
                                title: "Acceptance of Terms",
                                content: "By accessing and using Arc Raiders Central, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service."
                            },
                            ageRequirement: {
                                title: "Age Requirement",
                                content: "You must be at least 13 years old to use this service. By using Arc Raiders Central, you represent that you are at least 13 years old."
                            },
                            disclaimer: {
                                title: "Unofficial Fan Project",
                                content: "Arc Raiders Central is an unofficial fan-made companion application. We are not affiliated with, endorsed by, or sponsored by Embark Studios or the Arc Raiders development team.",
                                notice: "Arc Raiders™ is a trademark of Embark Studios AB. All game assets, images, and content belong to their respective owners."
                            },
                            intellectualProperty: {
                                title: "Intellectual Property",
                                content: "Game assets, images, and data from Arc Raiders are property of Embark Studios. Our original code, design, and features are provided under fair use for fan-made tools. You may not redistribute or commercialize our original work without permission."
                            },
                            userConduct: {
                                title: "User Conduct",
                                content: "When using Arc Raiders Central, you agree not to:",
                                rules: {
                                    noMisuse: "Use the service for any unlawful purpose",
                                    noHarm: "Attempt to harm or disrupt the service",
                                    noReverse: "Reverse engineer or extract source code beyond what is publicly available",
                                    noAutomation: "Use automated tools to scrape or overload our servers"
                                }
                            },
                            limitation: {
                                title: "Limitation of Liability",
                                content: 'Arc Raiders Central is provided "as is" without warranties of any kind. We are not responsible for any data loss, inaccuracies in game data, or service interruptions. Use at your own risk.'
                            },
                            modifications: {
                                title: "Modifications to Terms",
                                content: "We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms. We encourage you to review this page periodically."
                            },
                            contact: {
                                title: "Contact Us",
                                content: "For questions about these terms, please contact us at:"
                            }
                        }
                    },
                    cookies: {
                        title: "Cookie Policy",
                        lastUpdated: "Last updated",
                        date: "February 2, 2026",
                        sections: {
                            whatAreCookies: {
                                title: "What Are Cookies",
                                content: "Cookies are small text files stored on your device when you visit a website. We use cookies and similar technologies (like localStorage) to remember your preferences and provide a better experience."
                            },
                            typesUsed: {
                                title: "Types of Cookies We Use",
                                necessary: {
                                    title: "Necessary (Always Active)",
                                    content: "These are essential for the website to function. They store your preferences, login state, and consent choices.",
                                    localStorage: "Stores theme, language, game progress, and consent preferences locally on your device."
                                },
                                analytics: {
                                    title: "Analytics (Optional)",
                                    content: "These cookies help us understand how visitors interact with our website.",
                                    ga4: "Collects anonymous data about page views, session duration, and user interactions to help us improve the site."
                                }
                            },
                            thirdParty: {
                                title: "Third-Party Cookies",
                                content: "Our third-party partner (Google) may set their own cookies. For more information, see their privacy policy:"
                            },
                            managingPreferences: {
                                title: "Managing Your Preferences",
                                content: "You can change your cookie preferences at any time by clicking the button below or using the 'Cookie Settings' link in the footer."
                            },
                            browserSettings: {
                                title: "Browser Settings",
                                content: "You can also manage cookies through your browser settings. Note that blocking all cookies may affect site functionality. Most browsers allow you to block third-party cookies while allowing first-party cookies."
                            },
                            contact: {
                                title: "Contact Us",
                                content: "For questions about our cookie policy, please contact us at:"
                            }
                        }
                    }
                },
                settings: {
                    title: "Settings",
                    subtitle: "Manage your account and preferences",
                    profile: {
                        title: "Profile",
                        description: "Manage your display name and profile information",
                        nickname: "Display Name",
                        nicknamePlaceholder: "Enter your display name",
                        originalName: "Google name",
                        save: "Save",
                        cooldownMessage: "You can change your nickname again in {{days}} days",
                        nicknameChanged: "Nickname changed successfully!",
                        nicknameRules: "3-25 characters. Letters, numbers, spaces, underscores, and hyphens only.",
                        nicknameHistory: "Nickname History"
                    },
                    preferences: {
                        title: "Preferences",
                        description: "Customize your experience",
                        language: "Language",
                        backgrounds: "Animated Backgrounds",
                        enableBackgrounds: "Enable animated video backgrounds",
                        theme: "Theme",
                        themeDark: "Dark",
                        themeLight: "Light"
                    },
                    account: {
                        title: "Account & Data",
                        description: "Manage your data and account settings",
                        export: {
                            title: "Export Your Data",
                            description: "Download a copy of all your data stored on Arc Raiders Central, including preferences and settings.",
                            button: "Export Data"
                        },
                        wipeReset: {
                            title: "Wipe Reset",
                            description: "Reset all your progress after a game wipe. This will clear hideout, projects, quests, and blueprints.",
                            button: "Reset Progress",
                            warning: "This will permanently delete your progress for: Hideout, Projects, Quests, and Blueprints. Use this after a game wipe. This action cannot be undone.",
                            confirmLabel: "Type RESET to confirm:",
                            confirmButton: "Reset All Progress",
                            success: "Progress reset successfully!",
                            error: "Failed to reset progress. Please try again."
                        },
                        delete: {
                            title: "Delete Account",
                            description: "Permanently delete your account and all associated data. This action cannot be undone.",
                            button: "Delete Account",
                            warning: "This will permanently delete your account, preferences, settings, and all associated data. You will need to re-authenticate to confirm this action.",
                            confirmLabel: "Type DELETE to confirm:",
                            confirmButton: "Delete My Account"
                        },
                        errors: {
                            recentLogin: "Please sign out and sign in again before deleting your account.",
                            deleteFailed: "Failed to delete account. Please try again."
                        }
                    },
                    errors: {
                        nicknameTooShort: "Nickname must be at least 3 characters",
                        nicknameTooLong: "Nickname cannot exceed 25 characters",
                        nicknameInvalidChars: "Only letters, numbers, spaces, underscores, and hyphens allowed",
                        sameNickname: "This is already your current nickname",
                        cooldownActive: "You must wait before changing your nickname again",
                        userNotFound: "User not found",
                        unknown: "An error occurred. Please try again."
                    }
                },
                profile: {
                    memberSince: "Member since",
                    reviews: "reviews",
                    editProfile: "Edit Profile",
                    nicknameHistory: "Nickname History",
                    userNotFound: "User not found",
                    loadError: "Error loading profile",
                    stats: {
                        totalTrades: "Total Trades",
                        successRate: "Success Rate",
                        avgRating: "Avg. Rating",
                        reviews: "Reviews"
                    }
                },
                builds: {
                    title: "Community Builds",
                    description: "Browse, vote and copy skill tree builds shared by the community",
                    sortVotes: "Most Voted",
                    sortNewest: "Newest",
                    sortCopies: "Most Copied",
                    copy: "Copy",
                    justNow: "now",
                    empty: "No builds published yet. Be the first!",
                    emptyHint: "Go to the Skill Tree page, create a build, and click Share → Publish",
                    copySuccess: "Build copied to slot {{slot}}!",
                    deleteConfirm: "Remove this build from the gallery?",
                    selectSlot: "Select a slot to replace",
                    replaceSlot: "{{points}} points allocated",
                    emptySlot: "Empty slot",
                    pointsUsed: "points",
                    totalPoints: "pt",
                    noResults: "No builds match this filter",
                    conditioning: "Conditioning",
                    mobility: "Mobility",
                    survival: "Survival",
                    descriptionPlaceholder: "Description (optional)"
                },
                loadout: {
                    title: "Loadout",
                    subtitle: "Configure your equipment, weapons and inventory",
                    loginRequired: "Sign in to create and save your loadouts",
                    loginButton: "Sign in with Google",
                    newLoadout: "New Loadout",
                    deleteConfirm: "Delete this loadout?",
                    equipment: "Equipment",
                    backpack: "Backpack",
                    quickUse: "Quick Use",
                    safePocket: "Safe Pocket",
                    augment: "Augment",
                    shield: "Shield",
                    weapon1: "Weapon 1",
                    weapon2: "Weapon 2",
                    selectItem: "Select Item",
                    removeItem: "Remove item",
                    search: "Search items...",
                    noResults: "No matching items",
                    noLoadouts: "No loadouts yet. Create one to get started!",
                    all: "All",
                    slotGrenade: "Throwable",
                    slotTrinket: "Trinket",
                    slotUtility: "Gadget",
                    slotMeds: "Medical",
                    maxLoadouts: "Maximum {{max}} loadouts reached",
                    modMuzzle: "Muzzle",
                    modUnderbarrel: "Underbarrel",
                    modMagazine: "Magazine",
                    modStock: "Stock",
                    modTechnology: "Technology",
                    quantity: "Quantity",
                    quantityHint: "Max stack size varies by item",
                    tabs: {
                        browse: "Browse",
                        myLoadouts: "My Loadouts"
                    },
                    browse: {
                        title: "Community Loadouts",
                        description: "Browse, vote and copy loadouts shared by the community",
                        empty: "No loadouts shared yet. Be the first!",
                        emptyHint: "Go to My Loadouts, create a loadout, and click Publish"
                    },
                    sort: {
                        votes: "Most Voted",
                        newest: "Newest",
                        copies: "Most Copied"
                    },
                    publish: "Publish",
                    publishTitle: "Publish Loadout",
                    publishDescription: "Share this loadout with the community",
                    publishDescriptionPlaceholder: "Description (optional) - explain your playstyle or strategy",
                    publishSuccess: "Loadout published!",
                    publishSuccessDesc: "Your loadout is now visible in the community gallery",
                    published: "Published",
                    unpublish: "Remove from gallery",
                    unpublishConfirm: "Remove this loadout from the community gallery?",
                    copySuccess: "Loadout copied to your collection!",
                    copiedToCollection: "Loadout copied to your collection",
                    copyMaxReached: "Cannot copy: maximum {{max}} loadouts reached",
                    deleteConfirmShared: "Remove this loadout from the gallery?",
                    deleted: "Loadout removed from gallery",
                    votes: "votes",
                    copies: "copies",
                    copy: "Copy",
                    copyOf: "Copy of {{name}}",
                    justNow: "now",
                    loginToVote: "Please log in to vote",
                    loginToCopy: "Please log in to copy loadouts",
                    voteError: "Failed to vote",
                    copyError: "Failed to copy loadout",
                    publishError: "Failed to publish loadout",
                    deleteError: "Failed to delete loadout",
                    name: "Loadout Name",
                    description: "Description"
                },
                routes: {
                    title: "My Routes",
                    pageTitle: "Route Planner",
                    selectMap: "Select Map",
                    noRoutes: "No routes yet. Create your first draw!",
                    newRoute: "New Route",
                    addDraw: "Add Draw",
                    editRoute: "Edit Route",
                    deleteRoute: "Delete Route",
                    routeName: "Route Name",
                    routeDescription: "Description (optional)",
                    routeColor: "Route Color",
                    createRoute: "Create Route",
                    saveRoute: "Save",
                    cancel: "Cancel",
                    addWaypoint: "Add Waypoint",
                    finishRoute: "Finish Route",
                    clearLast: "Undo Last",
                    viewMode: "View Mode",
                    drawMode: "Drawing Mode",
                    waypoint: "Waypoint",
                    waypointLabel: "Label",
                    waypointNotes: "Notes",
                    waypointIcon: "Icon",
                    waypointColor: "Color",
                    editWaypoint: "Edit Waypoint",
                    deleteWaypoint: "Delete Waypoint",
                    moveUp: "Move Up",
                    moveDown: "Move Down",
                    maxRoutesReached: "Maximum routes reached (500)",
                    deleteConfirm: "Are you sure you want to delete this route?",
                    waypointCount_one: "{{count}} waypoint",
                    waypointCount_other: "{{count}} waypoints",
                    errors: {
                        loadRoutes: "Failed to load routes",
                        saveRoute: "Failed to save route",
                        nameRequired: "Route name is required"
                    }
                }
            }
        },
        it: {
            translation: {
                nav: {
                    home: "HOME",
                    homeLink: "Home",
                    contributi: "Contributi",
                    mappe: "MAPPE",
                    officina: "OFFICINA",
                    raider: "RAIDER",
                    community: "COMMUNITY",
                    mercanti: "MERCANTI",
                    items: "Oggetti",
                    timers: "Timer",
                    maps: "Mappe",
                    interactiveMaps: "Mappe Interattive",
                    quests: "Missioni",
                    projects: "Progetti",
                    blueprints: "Blueprint",
                    hideout: "Rifugio",
                    missingItems: "Oggetti Mancanti",
                    skillTree: "Albero Abilità",
                    trials: "Prove",
                    support: "SUPPORTO",
                    supportLink: "Contributi",
                    contactLink: "Contatti",
                    settings: "Impostazioni",
                    profile: "Profilo",
                    market: "Mercato",
                    builds: "Build",
                    loadout: "Equipaggiamento",
                    sell: "Vendi",
                    buy: "Compra",
                    routes: "Percorsi"
                },
                home: {
                    title: "Arc Raiders Central",
                    subtitle: "App Companion Gratuita per Raider",
                    welcome: "Il Miglior Companion per Arc Raiders",
                    description: "Strumenti gratuiti per Arc Raiders: mappe interattive con posizioni loot, timer eventi live, planner rifugio, tracker blueprint, skill tree builder e calcolatore prove.",
                    features: {
                        items: {
                            title: "Database Oggetti",
                            description: "Sfoglia 200+ oggetti con statistiche danni, costi crafting, prezzi vendita e margini profitto."
                        },
                        mapTimers: {
                            title: "Timer Eventi Mappa",
                            description: "Countdown live per Night Raid, Harvester, Bunker Nascosto, Cold Snap ed eventi 2X Prove."
                        },
                        interactiveMaps: {
                            title: "Mappe",
                            description: "Trova posizioni loot, punti estrazione, casse armi e cache raider su tutte le 5 mappe."
                        },
                        quests: {
                            title: "Database Missioni",
                            description: "Guida completa missioni con obiettivi, posizioni mappa, ricompense e sblocchi blueprint."
                        },
                        projects: {
                            title: "Tracker Progetti",
                            description: "Traccia progetti spedizione, calcola materiali e monitora la progressione Exodus."
                        },
                        hideout: {
                            title: "Planner Rifugio",
                            description: "Pianifica upgrade Scartino (da Forager a Master Hoarder) e livelli Banco Lavoro con calcolatore materiali."
                        },
                        missingItems: {
                            title: "Mancanti",
                            description: "Auto-genera liste materiali per rifugio, progetti e crafting. Non dimenticare mai cosa farmare."
                        },
                        skillTree: {
                            title: "Skill Tree Builder",
                            description: "Pianifica la tua build prima di spendere punti. Salva più loadout e simula progressione."
                        },
                        blueprints: {
                            title: "Tracker Blueprint",
                            description: "Traccia tutti i 75+ blueprint, vedi posizioni drop, segna oggetti posseduti. Trova blueprint breach room."
                        },
                        trials: {
                            title: "Calcolatore Prove",
                            description: "Traccia le 5 sfide settimanali, calcola punti per azione, scala i rank fino a Cantina Legend."
                        },
                        support: {
                            title: "Supportaci",
                            description: "Aiuta a mantenere Arc Raiders Central gratuito e aggiornato. Ogni donazione copre i costi di hosting."
                        }
                    },
                    getStarted: "Inizia",
                    footer: "Aggiornato quotidianamente con gli ultimi dati di gioco. Progetto guidato dalla community.",
                    compactView: "Compatta",
                    expandedView: "Estesa"
                },
                crafting: {
                    pageTitle: "Database Oggetti",
                    pageDescription: "Sfoglia tutte le armi, armature, consumabili e materiali di Arc Raiders. Confronta costi di crafting, prezzi di vendita e margini di profitto. Filtra per rarità o tipo di oggetto.",
                    title: "Arc Raiders Oggetti e Calcolatore Crafting",
                    subtitle: "Statistiche, Costi Crafting e Margini Profitto",
                    description: "Database completo di tutti gli oggetti Arc Raiders. Visualizza danni armi, statistiche armature, materiali crafting, prezzi vendita e calcola margini profitto.",
                    search: "Cerca per nome...",
                    guide: {
                        title: "Guida Oggetti e Crafting",
                        whatIsTitle: "Cos'è il Database Oggetti?",
                        whatIsDesc: "Questo database contiene ogni oggetto di Arc Raiders: armi, armature, scudi, consumabili, materiali crafting e oggetti quest. Usalo per confrontare statistiche, trovare ricette e calcolare la profittabilità prima di vendere o craftare.",
                        weaponsTitle: "Armi e Statistiche Danno",
                        weaponsDesc: "Confronta danno, cadenza di fuoco, velocità ricarica e capacità caricatore. Trova le armi migliori per il tuo stile - dai fucili d'assalto ad alto DPS ai fucili di precisione e SMG versatili.",
                        craftingTitle: "Come Funziona il Crafting",
                        craftingDesc: "Il crafting richiede blueprint (trovabili in breach room e ricompense quest) più materiali. Il livello del Banco Lavoro nel Rifugio determina cosa puoi craftare. Livello più alto = gear migliore.",
                        profitTitle: "Calcolatore Profitto",
                        profitDesc: "La colonna profitto mostra se craftare un oggetto conviene. Verde = guadagni craftando e vendendo. Rosso = i materiali valgono più dell'oggetto finito. Usa questo per massimizzare i guadagni.",
                        filtersTitle: "Come Usare i Filtri",
                        filtersDesc: "Cerca per nome oggetto, filtra per categoria (Arma, Armatura, Consumabile), rarità (da Comune a Leggendario), o mostra solo oggetti profittevoli/craftabili. Combina i filtri per trovare esattamente ciò che cerchi.",
                        columnsTitle: "Personalizza Colonne",
                        columnsDesc: "Clicca 'Colonne' per mostrare/nascondere dati. Mostra statistiche armi per confronto combat, o dati economici per trading. Le tue preferenze sono salvate automaticamente.",
                        sortingTitle: "Ordinamento Dati",
                        sortingDesc: "Clicca l'intestazione di una colonna per ordinare. Clicca di nuovo per invertire l'ordine. Ordina per danno per combat, per profitto per trading, o per rarità per trovare oggetti rari."
                    },
                    filters: {
                        all: "Tutte le Categorie",
                        allRarities: "Tutte le rarità",
                        allProfits: "Tutti i profitti",
                        onlyCraftable: "Solo craftabili",
                        allItems: "Tutti gli item",
                        onlyProfitable: "Solo profittevoli",
                        onlyLoss: "Solo in perdita",
                        armor: "Armatura",
                        weapon: "Arma",
                        consumable: "Consumabile",
                        material: "Materiale",
                        other: "Altro"
                    },
                    sort: {
                        label: "Ordina per",
                        profit: "Profitto",
                        name: "Nome",
                        sellPrice: "Prezzo Vendita"
                    },
                    table: {
                        category: "Categoria",
                        item: "Oggetto",
                        name: "Nome",
                        rarity: "Rarità",
                        materials: "Materiali",
                        craftingCost: "Valore Materiali",
                        sellPrice: "Valore Oggetto",
                        profit: "Profitto",
                        profitMargin: "Profitto %",
                        valuePerWeight: "Valore/Peso",
                        recycleMaterials: "Materiali Riciclo",
                        recycleValue: "Valore Riciclo",
                        damage: "Danno",
                        fireRate: "Cadenza",
                        range: "Portata",
                        stability: "Stabilità",
                        agility: "Agilità",
                        stealth: "Furtività",
                        magazineSize: "Capacità",
                        weight: "Peso"
                    },
                    columns: {
                        title: "Colonne",
                        description: "Seleziona quali colonne vuoi visualizzare nella tabella",
                        showing: "Visualizzati",
                        items: "item",
                        showAll: "Mostra Tutto",
                        hideStats: "Nascondi Stats",
                        basic: "Base",
                        economic: "Economico",
                        stats: "Statistiche"
                    },
                    rarities: {
                        Common: "Comune",
                        Uncommon: "Non Comune",
                        Rare: "Raro",
                        Epic: "Epico",
                        Legendary: "Leggendario"
                    },
                    itemTypes: {
                        "Advanced Material": "Materiale Avanzato",
                        Ammunition: "Munizioni",
                        Augment: "Potenziamento",
                        "Basic Material": "Materiale Base",
                        Blueprint: "Progetto",
                        Consumable: "Consumabile",
                        Cosmetic: "Cosmetico",
                        Gadget: "Gadget",
                        Key: "Chiave",
                        Material: "Materiale",
                        Medical: "Medico",
                        Misc: "Vario",
                        Modification: "Modifica",
                        Mods: "Mod",
                        Nature: "Natura",
                        "Quest Item": "Oggetto Missione",
                        "Quick Use": "Uso Rapido",
                        Recyclable: "Riciclabile",
                        "Refined Material": "Materiale Sofisticato",
                        Refinement: "Raffinamento",
                        Shield: "Scudo",
                        Throwable: "Lanciabile",
                        "Topside Material": "Materiale di Superficie",
                        Trinket: "Ciondolo",
                        Weapon: "Arma"
                    },
                    rawMaterial: "Materia Prima",
                    noResults: "Nessun oggetto trovato corrispondente alla tua ricerca.",
                    loading: "Caricamento dati crafting..."
                },
                itemTooltip: {
                    foundIn: "SI TROVA IN:",
                    usedToCraft: "Si usa per creare:",
                    weight: "Peso",
                    value: "Valore",
                    stackSize: "Stack"
                },
                mapTimers: {
                    pageTitle: "Timer Eventi Mappa",
                    pageDescription: "Monitora tutti gli eventi delle mappe di Arc Raiders in tempo reale. Pianifica le tue raid intorno a Night Raid, Raccoglitore, Tempesta Elettromagnetica, Bunker Nascosto, Colpo di Freddo e le finestre bonus 2X Prove.",
                    title: "Arc Raiders Timer Eventi Mappa",
                    subtitle: "Countdown Live per Tutti gli Eventi di Gioco",
                    description: "Timer live Arc Raiders per Night Raid, Harvester, Cold Snap e tutti gli eventi mappa. Traccia modificatori loot, bonus 2X Prove e pianifica le tue sessioni di farming.",
                    currentEvents: "Eventi in corso",
                    start: "Inizio",
                    end: "Fine",
                    eventCalendar: "Calendario Eventi",
                    nextMap: "Prossima Mappa",
                    timeRemaining: "Tempo Rimanente",
                    upcomingRotations: "Prossime Rotazioni",
                    map: "Mappa",
                    startTime: "Ora Inizio",
                    endTime: "Ora Fine",
                    duration: "Durata",
                    loading: "Caricamento tempistiche mappe...",
                    localTime: "Ora Locale",
                    filter: {
                        all: "Tutti",
                        startTime: "Ora Inizio",
                        allEvents: "Tutti gli Eventi",
                        majorEvents: "Eventi Maggiori",
                        minorEvents: "Eventi Minori"
                    },
                    loot: "Loot",
                    trials: "Prove",
                    guide: {
                        title: "Guida Timer",
                        overviewTitle: "Come Funzionano gli Eventi",
                        overviewDesc: "Gli eventi di Arc Raiders ruotano su programmi fissi. Ogni mappa ha eventi unici che influenzano il loot, la difficoltà e le ricompense. Usa questo tracker per pianificare le sessioni di farming.",
                        viewsTitle: "Modalità Visualizzazione",
                        viewsDesc: "Passa dalla vista Timeline (programma visivo 24 ore) alla vista Lista (layout compatto a card) usando i pulsanti. La tua preferenza viene salvata automaticamente.",
                        timezoneTitle: "Fuso Orario",
                        timezoneDesc: "Seleziona il fuso orario preferito dal menu. Scegli 'Ora Locale' per usare automaticamente il fuso del tuo dispositivo, oppure seleziona un fuso specifico come UTC o la tua regione.",
                        eventsTitle: "Eventi e Modificatori",
                        eventsDesc: "Gli Eventi (colore scuro) sono attività principali come Raccoglitore, Raid Notturno o Tempesta Elettromagnetica. I Modificatori (colore chiaro) influenzano loot e condizioni di gioco.",
                        trialsTitle: "Bonus Prove",
                        trialsDesc: "Gli eventi con '2X Trials' danno punti doppi per le sfide settimanali delle Prove. Pianifica le tue sessioni durante questi eventi per massimizzare il tuo ranking."
                    },
                    maps: {
                        "The Dam": "Diga",
                        "Buried City": "Città Sepolta",
                        Spaceport: "Spazioporto",
                        "The Blue Gate": "Varco Blu",
                        "Stella Montis": "Stella Montis",
                        "Practice Range": "Poligono di Tiro"
                    },
                    mapNames: {
                        dam_battlegrounds: "Diga",
                        the_spaceport: "Spazioporto",
                        the_blue_gate: "Varco Blu",
                        buried_city: "Città Sepolta",
                        stella_montis: "Stella Montis",
                        victory_ridge: "Victory Ridge"
                    },
                    events: {
                        "Electromagnetic Storm": "Tempesta Elettromagnetica",
                        "Lush Blooms": "Stagione del Raccolto",
                        "Night Raid": "Raid Notturno",
                        Harvester: "Raccoglitore",
                        "Uncovered Caches": "Scorte Scoperte",
                        "Launch Tower Loot": "Bottino Torre di Lancio",
                        Matriarch: "Matriarca",
                        "Cold Snap": "Colpo di Freddo",
                        "Prospecting Probes": "Sonde di Ricerca",
                        "Husk Graveyard": "Cimitero di Carcasse",
                        "Hidden Bunker": "Bunker Nascosto",
                        "Locked Gate": "Cancello Bloccato",
                        Hurricane: "Uragano"
                    },
                    notifications: {
                        enable: "Attiva notifica per questo evento",
                        disable: "Disattiva notifica per questo evento",
                        enabled: "Notifica attivata! Riceverai un avviso quando inizia l'evento.",
                        disabled: "Notifica disattivata.",
                        notSupported: "Le notifiche non sono supportate su questo browser.",
                        permissionDenied: "Le notifiche sono bloccate. Abilitale nelle impostazioni del browser.",
                        permissionRequired: "Consenti le notifiche nel browser per ricevere avvisi sugli eventi."
                    }
                },
                quests: {
                    pageTitle: "Database Missioni",
                    pageDescription: "Traccia tutte le missioni di Arc Raiders dai mercanti Celeste, Scartino e Foraggiatore. Visualizza obiettivi, location sulle mappe, ricompense oggetti e blueprint sbloccabili. Segna le quest come completate e segui l'albero di progressione.",
                    title: "Arc Raiders Database Missioni",
                    subtitle: "Tutte le Quest con Obiettivi e Ricompense",
                    description: "Guida completa alle missioni Arc Raiders. Vista albero con catene quest, posizioni su mappa, obiettivi, sblocchi blueprint e ricompense per ogni trader.",
                    search: "Cerca per nome o obiettivo",
                    tree: "Albero",
                    list: "Lista",
                    completed: "Completata",
                    progress: "progresso",
                    viewTree: "Vista Albero",
                    viewList: "Vista Lista",
                    viewInTree: "Vedi nell'Albero",
                    maps: "mappe",
                    anyMap: "Qualsiasi",
                    guide: {
                        title: "Guida Missioni",
                        overviewTitle: "Come Funzionano le Missioni",
                        overviewDesc: "Le missioni in Arc Raiders sono date dai trader alla Cantina. Ogni trader ha catene di quest uniche che sbloccano ricompense, blueprint e nuove opportunità di trading.",
                        tradersTitle: "Trader e Fazioni",
                        tradersDesc: "Quattro trader principali: Shani (SRF), Victor (Colossus), Ingrid (Cryo), e Kai (Chem). Ogni trader offre missioni uniche con ricompense e sblocchi specifici della fazione.",
                        viewsTitle: "Modalità Visualizzazione",
                        viewsDesc: "La Vista Albero mostra la progressione visiva delle quest, permettendo di vedere prerequisiti e catene di sblocco. La Vista Lista mostra tutte le quest in un elenco filtrabile con dettagli.",
                        progressTitle: "Tracciamento Progressi",
                        progressDesc: "Clicca sulle checkbox delle quest per segnare gli obiettivi come completati. Quando tutti gli obiettivi sono completati, la quest viene automaticamente segnata come completa. I progressi si sincronizzano nel cloud se hai effettuato l'accesso.",
                        chainTitle: "Catene di Quest",
                        chainDesc: "Segnare una quest come completa completerà automaticamente tutte le quest prerequisite. Allo stesso modo, segnare una quest come incompleta segnerà tutte le quest dipendenti come incomplete.",
                        searchTitle: "Ricerca e Filtri",
                        searchDesc: "Nella Vista Lista, usa la barra di ricerca per trovare quest per nome o obiettivo. Filtra per trader o location per restringere i risultati."
                    },
                    filters: {
                        all: "Tutti",
                        allTraders: "Tutti i trader",
                        allLocations: "Tutte le location",
                        showActive: "Mostra attive",
                        showAll: "Mostra tutte",
                        SRF: "SRF",
                        Colossus: "Colossus",
                        Cryo: "Cryo",
                        Chem: "Chem",
                        none: "Nessuna Fazione"
                    },
                    table: {
                        quest: "Missione",
                        trader: "Trader",
                        location: "Mappa",
                        objective: "Obiettivo",
                        reward: "Ricompensa",
                        unlocks: "Sblocca",
                        faction: "Fazione",
                        requirements: "Requisiti",
                        rewards: "Ricompense"
                    },
                    details: {
                        description: "Descrizione",
                        requirements: "Requisiti",
                        rewards: "Ricompense",
                        close: "Chiudi"
                    },
                    noResults: "Nessuna missione trovata corrispondente alla tua ricerca.",
                    loading: "Caricamento missioni...",
                    loadingTree: "Caricamento albero missioni...",
                    resetZoom: "Reimposta zoom",
                    markComplete: "Completata",
                    markIncomplete: "Non completa",
                    sections: {
                        base: "Missioni Gioco Base",
                        northLine: "Update North Line",
                        northLineDesc: "Queste missioni sono state aggiunte nell'update North Line di Novembre 2025.",
                        coldSnap: "Update Cold Snap",
                        coldSnapDesc: "Queste missioni sono state aggiunte nell'update Cold Snap di Dicembre 2025.",
                        headwinds: "Update Headwinds",
                        headwindsDesc: "Queste missioni sono state aggiunte nell'update Headwinds di Gennaio 2026."
                    }
                },
                wip: {
                    itemsTitle: "Pagina in Costruzione",
                    itemsDescription: "Alcuni dati potrebbero essere errati: quantità crafting, prezzi e altre statistiche sono in fase di verifica.",
                    mapsTitle: "Pagina in Costruzione",
                    mapsDescription: "I pin personalizzati funzionano, ma i marker POI preimpostati sono ancora in sviluppo."
                },
                common: {
                    loading: "Caricamento...",
                    error: "Si è verificato un errore",
                    loadingError: "Errore nel caricamento",
                    fileNotFound: "File non trovato",
                    noData: "Nessun dato disponibile",
                    type: "Tipo",
                    close: "Chiudi",
                    cancel: "Annulla",
                    confirm: "Conferma",
                    user: "Utente",
                    guest: "Ospite",
                    login: "Login",
                    logout: "Logout",
                    live: "LIVE",
                    menu: "Menu",
                    closeMenu: "Chiudi menu",
                    overview: "Panoramica",
                    closeBanner: "Chiudi banner",
                    creatorBanner: {
                        partner: "Partner"
                    },
                    decreaseCount: "Diminuisci quantità",
                    increaseCount: "Aumenta quantità",
                    clickToComplete: "Clicca per completare",
                    clickToReset: "Clicca per azzerare",
                    dismissHint: "Ignora suggerimento",
                    signInWithGoogle: "Accedi con Google",
                    switchToItalian: "Passa all'italiano",
                    switchToEnglish: "Passa all'inglese",
                    langCodeEn: "ENG",
                    langCodeIt: "ITA",
                    markAsComplete: "Segna come completata",
                    markAsIncomplete: "Segna come non completata",
                    completed: "Terminato",
                    started: "Iniziata",
                    selectLevel: "Seleziona livello",
                    noLevelAvailable: "Nessun livello disponibile",
                    adminMode: "Admin",
                    userMode: "Utente",
                    videoOn: "Video Attivo",
                    videoOff: "Video Disattivo",
                    emailOptInOn: "Email Attive",
                    emailOptInOff: "Email Disattive",
                    emailOptInDescription: "Ricevi aggiornamenti importanti su Arc Raiders Central via email",
                    all: "Tutti",
                    selected: "selezionati",
                    save: "Salva",
                    delete: "Elimina",
                    edit: "Modifica",
                    gotIt: "Capito",
                    updatingVersion: "Aggiornamento in corso...",
                    somethingWentWrong: "Qualcosa è andato storto.",
                    reloadPage: "Ricarica Pagina",
                    goBack: "Torna indietro",
                    noResults: "Nessun risultato trovato",
                    optional: "opzionale",
                    yes: "Sì",
                    no: "No"
                },
                chat: {
                    title: "Chat",
                    global: "Globale",
                    messages: "Messaggi",
                    private: "Privata",
                    newMessage: "Nuovo messaggio",
                    send: "Invia",
                    typeMessage: "Scrivi un messaggio...",
                    noMessages: "Nessun messaggio",
                    noConversations: "Nessuna conversazione",
                    startConversation: "Inizia una conversazione",
                    searchUsers: "Cerca utenti...",
                    online: "Online",
                    offline: "Offline",
                    lastSeen: "Ultimo accesso",
                    unreadMessages: "messaggi non letti",
                    you: "Tu",
                    today: "Oggi",
                    yesterday: "Ieri",
                    support: "Assistenza"
                },
                chatSupport: {
                    title: "Supporto",
                    guest: "Ospite",
                    guestIntro: "Inserisci il tuo nome per iniziare a chattare con il nostro team di supporto. Siamo qui per aiutarti!",
                    enterName: "Inserisci il tuo nome...",
                    startChat: "Inizia Chat",
                    welcomeMessage: "Ciao! Come possiamo aiutarti oggi?",
                    noTickets: "Nessun ticket di supporto",
                    supportTeam: "Team Supporto",
                    justNow: "Adesso",
                    markInProgress: "Segna In Corso",
                    markResolved: "Segna Risolto",
                    statusInProgress: "Un agente di supporto sta gestendo la tua richiesta",
                    statusResolved: "Questo ticket è stato risolto",
                    status: {
                        open: "Aperto",
                        in_progress: "In Corso",
                        resolved: "Risolto"
                    }
                },
                notifications: {
                    title: "Notifiche",
                    empty: "Nessuna notifica",
                    markAllRead: "Segna tutto letto",
                    justNow: "Adesso",
                    minutesAgo: "{{count}}m fa",
                    hoursAgo: "{{count}}h fa",
                    daysAgo: "{{count}}g fa",
                    newMessage: "Nuovo messaggio",
                    newTradeRequest: "Nuova richiesta di scambio",
                    tradeMessage: "Messaggio scambio",
                    tradeLocked: "Scambio bloccato",
                    tradeCompleted: "Scambio completato",
                    tradeCancelled: "Scambio annullato",
                    newReview: "Nuova recensione",
                    sound: "Suono notifiche",
                    soundDescription: "Riproduci un suono quando ricevi una notifica",
                    push: "Notifiche push",
                    pushDescription: "Ricevi notifiche del browser anche quando l'app è in background",
                    pushEnabled: "Notifiche push attivate",
                    pushDisabled: "Notifiche push disattivate",
                    pushDenied: "Notifiche push bloccate dal browser",
                    pushUnsupported: "Notifiche push non supportate",
                    enablePush: "Attiva notifiche push"
                },
                market: {
                    title: "Mercato",
                    subtitle: "Compra e vendi oggetti con altri giocatori",
                    createListing: "Crea Annuncio",
                    tabs: {
                        browse: "Sfoglia",
                        myListings: "I Miei Annunci",
                        myTrades: "I Miei Scambi"
                    },
                    filters: {
                        all: "Tutti",
                        selling: "In vendita",
                        buying: "Cercasi"
                    },
                    selling: "Vendo",
                    buying: "Cerco",
                    noListings: "Nessun annuncio disponibile",
                    listings: "annunci",
                    noMyListings: "Non hai ancora creato annunci",
                    noTrades: "Nessuno scambio attivo",
                    loginRequired: "Effettua il login per accedere a questa funzione",
                    justNow: "Adesso",
                    barterOnly: "Solo baratto",
                    openOffer: "Aperto a offerte",
                    barter: "Baratto",
                    open: "Aperto",
                    inNegotiation: "In trattativa",
                    description: "Descrizione",
                    listedOn: "Pubblicato il",
                    loginToTrade: "Effettua il login per iniziare a commerciare",
                    ownListing: "Questo è un tuo annuncio",
                    alreadyInNegotiation: "Questo annuncio ha già una trattativa attiva",
                    startNegotiation: "Inizia Trattativa",
                    successRate: "tasso successo",
                    confirmDelete: "Sei sicuro di voler eliminare questo annuncio?",
                    confirmCancel: "Sei sicuro di voler annullare questo scambio?",
                    pause: "Pausa",
                    resume: "Riprendi",
                    hasActiveNegotiation: "Non modificabile - trattativa in corso",
                    status: {
                        active: "Attivo",
                        paused: "In pausa",
                        completed: "Completato",
                        expired: "Scaduto"
                    },
                    tradeStatus: {
                        negotiating: "In trattativa",
                        locked: "Bloccato",
                        completed: "Completato",
                        cancelled: "Annullato",
                        expired: "Scaduto"
                    },
                    lockTrade: "Blocca Termini",
                    locked: "Bloccato",
                    confirmComplete: "Conferma Scambio",
                    cancel: "Annulla",
                    lockInfo: "Entrambe le parti devono bloccare prima di completare",
                    tradeCompleted: "Questo scambio è stato completato",
                    tradeCancelled: "Questo scambio è stato annullato",
                    systemMessages: {
                        trade_created: "Scambio iniziato",
                        trade_locked: "Scambio bloccato - entrambi d'accordo",
                        trade_completed: "Scambio completato con successo!",
                        trade_cancelled: "Scambio annullato",
                        price_proposed: "Nuovo prezzo proposto"
                    },
                    create: {
                        selectType: "Cosa vuoi fare?",
                        sell: "Vendere",
                        sellDesc: "Ho un oggetto da vendere",
                        buy: "Comprare",
                        buyDesc: "Cerco un oggetto",
                        selectItem: "Seleziona un oggetto",
                        searchItems: "Cerca oggetti...",
                        quantity: "Quantità",
                        priceType: "Come vuoi essere pagato?",
                        price: "Prezzo (Seeds)",
                        description: "Descrizione",
                        descriptionPlaceholder: "Aggiungi dettagli sul tuo annuncio...",
                        continue: "Continua",
                        confirmTitle: "Rivedi il tuo annuncio",
                        type: "Tipo",
                        item: "Oggetto",
                        publish: "Pubblica Annuncio"
                    },
                    disclaimer: {
                        title: "Regole del Mercato",
                        intro: "Prima di usare il mercato, leggi e accetta le seguenti regole:",
                        rule1: "Tutti gli scambi avvengono in gioco. Questa piattaforma facilita solo la comunicazione tra giocatori.",
                        rule2: "Non siamo responsabili per truffe o scambi falliti. Commercia a tuo rischio.",
                        rule3: "Sii rispettoso con gli altri giocatori. Molestie porteranno a un ban.",
                        rule4: "Segnala utenti sospetti per mantenere la community sicura.",
                        warning: "Usando il mercato, accetti piena responsabilità per i tuoi scambi.",
                        accept: "Ho capito e Accetto"
                    },
                    reviews: {
                        title: "Lascia una Recensione",
                        rateUser: "Valuta la tua esperienza con",
                        timeRemaining: "{{hours}}h {{minutes}}m",
                        comment: "Commento",
                        commentPlaceholder: "Condividi la tua esperienza con questo scambio...",
                        commentMinLength: "Il commento deve essere di almeno 5 caratteri",
                        submit: "Invia Recensione",
                        submitError: "Errore nell'invio della recensione. Riprova.",
                        rating1: "Pessimo",
                        rating2: "Scarso",
                        rating3: "Nella media",
                        rating4: "Buono",
                        rating5: "Eccellente",
                        pendingReview: "Recensione in attesa",
                        leaveReview: "Lascia Recensione",
                        reviewSubmitted: "Recensione inviata! Grazie.",
                        autoReviewWarning: "Lascia una recensione prima della scadenza! Altrimenti, l'altro utente riceverà automaticamente una recensione da 5 stelle e tu riceverai una penalità da 3 stelle da arcraiderscentral.app.",
                        timeRemaining_v2: "{{time}}"
                    }
                },
                projects: {
                    pageTitle: "Tracker Progetti",
                    title: "Arc Raiders Progetti e Spedizioni",
                    subtitle: "Traccia Progresso Spedizioni e Requisiti Materiali",
                    description: "Tracker completo spedizioni Arc Raiders. Traccia progetti comunitari, fasi progressione Exodus e calcola requisiti materiali per ogni fase spedizione.",
                    loading: "Caricamento progetti...",
                    loginPrompt: "Accedi con Google per salvare i tuoi progressi nel cloud",
                    overallProgress: "Progresso Complessivo",
                    stagesComplete: "fasi completate",
                    guide: {
                        title: "Guida Progetti Spedizione",
                        whatIsTitle: "Cosa Sono i Progetti?",
                        whatIsDesc: "I progetti sono la progressione principale della storia in Arc Raiders. Completa le fasi spedizione raccogliendo materiali per avanzare verso il finale Exodus. I progetti sbloccano nuovi contenuti, NPC e funzionalità.",
                        expeditionsTitle: "Fasi Spedizione",
                        expeditionsDesc: "Ogni spedizione ha più fasi. La Fase 1 richiede materiali base (fili, batterie). Le fasi successive richiedono oggetti rari (leghe, chimici, drop quest). Completa tutte le fasi per terminare una spedizione.",
                        materialsTitle: "Farming Materiali",
                        materialsDesc: "Controlla la lista oggetti richiesti per ogni fase. Usa le nostre Mappe Interattive per trovare le posizioni spawn. Zone industriali = ingranaggi/batterie, zone mediche = antisettici, nemici ARC = leghe.",
                        exodusTitle: "Storia Exodus",
                        exodusDesc: "I progetti raccontano la storia della fuga dei Raider dagli ARC. Ogni spedizione rivela lore, sblocca NPC come Forager, e progredisce verso l'evento finale Exodus. Non perderti la storia!",
                        trackingTitle: "Tracciamento Progressi",
                        trackingDesc: "Segna gli oggetti raccolti usando i pulsanti +/- o lo slider. Le barre mostrano la percentuale di completamento. I dati si sincronizzano nel cloud quando loggato, così puoi tracciare da qualsiasi dispositivo.",
                        missingItemsTitle: "Integrazione Oggetti Mancanti",
                        missingItemsDesc: "Tutti gli oggetti mancanti dei progetti appaiono nella pagina Oggetti Mancanti. Controllala prima di ogni raid per sapere esattamente cosa farmare. Gli oggetti sono auto-aggregati da tutti i progetti attivi.",
                        tipsTitle: "Consigli Farming",
                        tipsDesc: "Concentrati su una fase alla volta. Gioca la mappa con più oggetti richiesti. Evento Night Raid = loot più sicuro. Controlla le sfide Prove - alcune coincidono con i materiali dei progetti!",
                        progressTitle: "Barre di Progresso",
                        progressDesc: "Le barre mostrano la percentuale di completamento per ogni fase e progetto complessivo. Completa tutte le fasi per terminare un progetto e sbloccare la spedizione successiva.",
                        controlsTitle: "Controlli",
                        controlsDesc: "Usa i pulsanti +/- per modificare le quantità. Tieni premuto per incrementare più velocemente. Usa lo slider per regolazioni rapide."
                    },
                    expedition: {
                        name: "Spedizione 1",
                        stages: {
                            foundation: "Fondamenta (1/6)",
                            coreSystems: "Sistemi Essenziali (2/6)",
                            framework: "Struttura (3/6)",
                            outfitting: "Allestimento (4/6)"
                        }
                    },
                    expedition2: {
                        name: "Spedizione 2",
                        stages: {
                            foundation: "Fondamenta (1/6)",
                            coreSystems: "Sistemi Essenziali (2/6)",
                            framework: "Struttura (3/6)",
                            outfitting: "Allestimento (4/6)"
                        }
                    },
                    trophyDisplay: {
                        name: "Bacheca dei Trofei",
                        stages: {
                            stage1: "Minacce Erranti (1/5)",
                            stage2: "Minacce Volanti (2/5)",
                            stage3: "Avversari Feroci (3/5)",
                            stage4: "Pericoli Dominanti (4/5)",
                            stage5: "Colossi Imponenti (5/5)"
                        }
                    },
                    highGainAntenna: {
                        name: "Antenna ad Alto Guadagno",
                        stages: {
                            sturdyBase: "Base Robusta (1/3)",
                            dataLogger: "Registratore Dati (2/3)",
                            parabolicDish: "Parabola (3/3)"
                        }
                    },
                    errors: {
                        quotaExceeded: "Quota salvataggio cloud superata",
                        firestoreError: "Errore nel salvataggio cloud",
                        savingLocally: "I tuoi progressi sono salvati localmente su questo dispositivo"
                    }
                },
                interactiveMaps: {
                    title: "Mappe",
                    subtitle: "Posizioni Loot, Punti Estrazione e POI",
                    description: "Esplora tutte le mappe di Arc Raiders con posizioni loot, punti di estrazione, POI e marker personalizzati",
                    loading: "Caricamento mappa...",
                    noResults: "Nessun pin trovato",
                    filters: {
                        title: "Filtri Pin",
                        gamePOIs: "POI",
                        customPins: "I Miei Pin",
                        communityPins: "Pin Community",
                        showAll: "Mostra Tutti",
                        hideAll: "Nascondi Tutti",
                        showCustomPins: "Mostra pin personalizzati",
                        showCommunityPins: "Mostra pin community"
                    },
                    poiTypes: {
                        quest: "Missioni",
                        extraction: "Punti di Estrazione",
                        raider_hatch: "Botola Raider",
                        player_spawn: "Spawn Giocatore",
                        supply_call_station: "Stazione Rifornimenti",
                        field_depot: "Deposito Campo",
                        breachable_room: "Stanza Sfondabile",
                        locked_room: "Stanza Chiusa",
                        security_breach: "Breccia di Sicurezza",
                        weapon_case: "Cassa Armi",
                        med_crate: "Cassa Medica",
                        ammo_crate: "Cassa Munizioni",
                        breachable_container: "Contenitore Sfondabile",
                        raider_cache: "Cache Raider",
                        container: "Contenitore",
                        utility_crate: "Cassa Utilità",
                        cars: "Auto",
                        lockers: "Armadietti",
                        baskets: "Ceste",
                        bags: "Borse",
                        baron_husk: "Guscio Baron",
                        arc_husk: "Guscio Arc",
                        arc_courier: "Corriere Arc",
                        arc_probe: "Sonda Arc",
                        tick: "Zecca",
                        pop: "Pop",
                        fireball: "Palla di Fuoco",
                        surveyor: "Ricognitore",
                        turret: "Torretta",
                        sentinel: "Sentinella",
                        snitch: "Spia",
                        wasp: "Vespa",
                        hornet: "Calabrone",
                        shredder: "Shredder",
                        leaper: "Leaper",
                        rocketeer: "Lanciarazzi",
                        bombardier: "Bombardiere",
                        bastion: "Bastione",
                        queen: "Regina",
                        matriarch: "Matriarca",
                        mushroom: "Fungo",
                        prickly_pear: "Fico d'India",
                        great_mullein: "Verbasco",
                        agave: "Agave",
                        apricot: "Albicocca",
                        moss: "Muschio",
                        fertilizer: "Fertilizzante",
                        roots: "Radici",
                        candleberries: "Bacche",
                        olive: "Oliva",
                        lemons: "Limoni",
                        harvester: "Raccoglitore",
                        snow_pile: "Cumulo di Neve",
                        antenna: "Antenna",
                        hidden_bunker: "Bunker Nascosto",
                        locked_gate_key: "Chiave Blue Gate",
                        nest: "Nido",
                        other: "Altro",
                        arc_tick: "Zecca Arc",
                        arc_wasp: "Vespa Arc",
                        arc_pop: "Pop Arc",
                        ladder: "Scala",
                        zipline: "Zipline",
                        camera: "Telecamera",
                        metal_detectors: "Metal Detector",
                        field_crate: "Cassa da Campo",
                        grenade_case: "Cassa Granate",
                        key: "Chiave",
                        raider_camp: "Campo Raider",
                        harvester_event: "Evento Harvester",
                        security_locker: "Armadietto Sicurezza",
                        toolbox: "Cassetta Attrezzi",
                        generator: "Generatore",
                        drawers: "Cassetti",
                        electrical_box: "Quadro Elettrico",
                        cupboard: "Armadio",
                        fridge: "Frigorifero",
                        metal_crate: "Cassa Metallica",
                        garbage_bins: "Bidoni Spazzatura",
                        loose_loot: "Loot Sparso",
                        shutters: "Serrande",
                        trailer: "Rimorchio",
                        shipping_container: "Container",
                        loot_arc: "Loot ARC",
                        loot_commercial: "Loot Commerciale",
                        loot_electrical: "Loot Elettrico",
                        loot_exodus: "Loot Exodus",
                        loot_industrial: "Loot Industriale",
                        loot_mechanical: "Loot Meccanico",
                        loot_medical: "Loot Medico",
                        loot_nature: "Loot Natura",
                        loot_old_world: "Loot Vecchio Mondo",
                        loot_raider: "Loot Raider",
                        loot_residential: "Loot Residenziale",
                        loot_security: "Loot Sicurezza",
                        loot_technological: "Loot Tecnologico"
                    },
                    customPin: {
                        add: "Aggiungi Pin",
                        edit: "Modifica Pin",
                        delete: "Elimina Pin",
                        save: "Salva",
                        cancel: "Annulla",
                        confirmDelete: "Sei sicuro di voler eliminare questo pin?",
                        addDescription: "Aggiungi un nuovo pin personalizzato alla mappa",
                        editDescription: "Modifica il tuo pin personalizzato",
                        fields: {
                            label: "Etichetta",
                            labelPlaceholder: "Inserisci il nome del pin...",
                            category: "Categoria",
                            icon: "Icona",
                            color: "Colore",
                            notes: "Note",
                            notesPlaceholder: "Aggiungi note aggiuntive..."
                        }
                    },
                    communityPin: {
                        add: "Aggiungi Pin Community",
                        addShort: "Community",
                        addDescription: "Condividi una posizione utile con la community. Gli altri giocatori potranno votare per confermare o nascondere il tuo pin.",
                        title: "Pin Community",
                        new: "Nuovo",
                        confirmed: "Confermato",
                        createdBy: "Creato da",
                        rating: "Valutazione",
                        votes: "voti",
                        upvote: "Voto positivo",
                        downvote: "Voto negativo",
                        loginToVote: "Accedi per votare",
                        confirmDelete: "Sei sicuro di voler eliminare questo pin community?",
                        pending: "Servono 3 voti positivi per essere confermato",
                        description: "Descrizione",
                        descriptionPlaceholder: "Descrivi questa posizione per gli altri..."
                    },
                    legend: {
                        title: "Legenda",
                        poi: "Punti di Interesse",
                        containers: "Contenitori",
                        arcEnemies: "Nemici Arc",
                        nature: "Risorse Naturali",
                        events: "Eventi",
                        lootZones: "Zone Loot",
                        other: "Altro",
                        custom: "Pin Personalizzati"
                    },
                    instructions: {
                        addPin: "Clicca 'Aggiungi Pin', poi clicca sulla mappa per posizionarlo",
                        addPinMobile: "Clicca 'Aggiungi Pin', poi tocca sulla mappa per posizionarlo",
                        clickToPlace: "Clicca sulla mappa per posizionare il pin",
                        clickPinForDetails: "Clicca su un pin per vedere i dettagli",
                        editPin: "Clicca su un pin per visualizzarlo o modificarlo",
                        loginRequired: "Accedi per salvare pin personalizzati"
                    },
                    errors: {
                        loadMaps: "Errore caricamento mappe",
                        loadPins: "Errore caricamento pin personalizzati",
                        savePins: "Errore salvataggio pin",
                        maxPinsReached: "Numero massimo di pin raggiunto (500)"
                    },
                    guide: {
                        title: "Guida Mappe Arc Raiders",
                        navigationTitle: "Navigazione",
                        navigationDesc: "Usa la rotella del mouse per zoomare. Clicca e trascina per muoverti sulla mappa. Su mobile, pizzica per zoomare e trascina con un dito per muoverti.",
                        filtersTitle: "Filtri e Tipi di POI",
                        filtersDesc: "Filtra per punti di estrazione, contenitori loot, casse armi, cache raider, stanze sfondabili, stanze chiuse, nemici ARC e altro. Attiva le categorie singolarmente o usa 'Mostra Tutti' / 'Nascondi Tutti'.",
                        customPinsTitle: "Pin Personalizzati",
                        customPinsDesc: "Accedi per creare pin personalizzati per i tuoi percorsi di farming, posizioni segrete o route di loot. Aggiungi etichette, note, icone e colori per organizzare la mappa.",
                        levelsTitle: "Livelli Mappa",
                        levelsDesc: "Alcune mappe hanno più livelli (piani superiori/inferiori). Usa il selettore di livello per passare tra i piani - essenziale per la struttura sotterranea di Stella Montis.",
                        mapsOverviewTitle: "Mappe Disponibili",
                        mapsOverviewDesc: "Diga, Città Sepolta, Spazioporto, Varco Blu e Stella Montis. Ogni mappa ha zone loot uniche, punti di estrazione e spawn di nemici ARC.",
                        lootTipsTitle: "Consigli Loot",
                        lootTipsDesc: "Il loot di alto valore si trova nelle stanze sfondabili, stanze chiuse e casse armi. Le zone industriali hanno batterie e ingranaggi, le zone residenziali hanno collari, le zone mediche hanno antisettici.",
                        extractionTitle: "Punti di Estrazione",
                        extractionDesc: "Ogni mappa ha 2-5 punti di estrazione: ascensori, metro e botole raider (serve chiave). Le estrazioni sono rumorose - aspettati scontri PvP vicino alle uscite."
                    }
                },
                version: {
                    title: "Versione",
                    added: "Aggiunte",
                    fixed: "Risolti",
                    changed: "Modifiche",
                    removed: "Rimossi",
                    footer: "made with ♥\nGORE-ILLA#3235"
                },
                hideout: {
                    pageTitle: "Planner Rifugio",
                    title: "Arc Raiders Planner Rifugio",
                    subtitle: "Upgrade Scartino e Calcolatore Banco Lavoro",
                    description: "Pianifica tutti gli upgrade del rifugio Arc Raiders. Calcolatore materiali per livelli Scartino (Forager fino a Master Hoarder) e tutti i tier Banco Lavoro.",
                    loading: "Caricamento planner rifugio...",
                    loginPrompt: "Accedi con Google per salvare i tuoi progressi nel cloud",
                    overallProgress: "Progresso Complessivo",
                    levelsComplete: "livelli completati",
                    level: "Livello",
                    guide: {
                        title: "Guida Upgrade Rifugio",
                        whatIsTitle: "Cos'è il Rifugio?",
                        whatIsDesc: "Il Rifugio è la tua base operativa in Arc Raiders. Potenzia Scartino per trovare loot migliore durante le raid, e migliora i Banchi Lavoro per craftare armi, armature e gear di livello superiore.",
                        scrappyTitle: "Upgrade Scartino",
                        scrappyDesc: "Scartino il gallo aiuta a trovare loot. Raccoglitore (Lv2) evidenzia contenitori vicini. Rovistatore (Lv3) indica oggetti di valore. Cacciatore Tesori (Lv4) trova loot raro. Master Hoarder (Lv5) rivela cache nascoste e drop epici.",
                        workbenchTitle: "Livelli Banco Lavoro",
                        workbenchDesc: "Ogni banco sblocca ricette crafting: Armaiolo (armi), Banco Gear (armature/scudi), Laboratorio Medico (medicine), Stazione Esplosivi (granate/mine), Stazione Utility (deployable), Raffineria (materiali). Livello più alto = gear migliore.",
                        materialsTitle: "Materiali Richiesti",
                        materialsDesc: "Gli upgrade richiedono materiali specifici: batterie, ingranaggi, chimici, leghe e oggetti quest. Controlla Oggetti Mancanti per vedere tutti i materiali da farmare per il prossimo upgrade.",
                        progressTitle: "Tracciamento Progressi",
                        progressDesc: "Segna gli oggetti raccolti usando i pulsanti +/-. Le barre di progresso mostrano la percentuale di completamento. I progressi si sincronizzano nel cloud quando sei loggato. Le sezioni incomplete sono espanse di default.",
                        tipsTitle: "Priorità Upgrade",
                        tipsDesc: "Ordine consigliato: Scartino Lv3 prima (loot di valore), poi Armaiolo Lv2 (armi migliori), poi Banco Gear Lv2 (scudi). Concentrati su ciò che si adatta al tuo stile di gioco.",
                        sectionsTitle: "Sezioni Upgrade",
                        sectionsDesc: "Traccia i progressi per Scartino (Raccoglitore, Rovistatore, Cacciatore Tesori, Master Hoarder) e tutti i Banchi da Lavoro (Armaiolo, Banco Gear, Laboratorio Medico, Stazione Esplosivi, Stazione Utility, Raffineria).",
                        controlsTitle: "Controlli",
                        controlsDesc: "Usa i pulsanti +/- per modificare le quantità. Tieni premuto per incrementare più velocemente. Usa lo slider per regolazioni rapide."
                    },
                    scrappy: {
                        name: "Scartino",
                        description: "Potenzia Scartino il gallo per sbloccare migliori abilità di ricerca oggetti",
                        levels: {
                            2: "Raccoglitore",
                            3: "Rovistatore",
                            4: "Predatore",
                            5: "Scavatore"
                        }
                    },
                    gunsmith: {
                        name: "Banco delle Armi",
                        description: "Potenzia il Gunsmith per sbloccare armi e accessori migliori",
                        levels: {
                            1: "Base",
                            2: "Intermedio",
                            3: "Avanzato"
                        }
                    },
                    gearBench: {
                        name: "Banco Equipaggiamento",
                        description: "Potenzia il Banco Equipaggiamento per scudi e mod utility più forti",
                        levels: {
                            1: "Base",
                            2: "Intermedio",
                            3: "Avanzato"
                        }
                    },
                    medicalLab: {
                        name: "Laboratorio Medico",
                        description: "Potenzia il Laboratorio Medico per oggetti curativi e consumabili migliori",
                        levels: {
                            1: "Base",
                            2: "Intermedio",
                            3: "Avanzato"
                        }
                    },
                    explosivesStation: {
                        name: "Stazione Esplosivi",
                        description: "Potenzia la Stazione Esplosivi per granate ed esplosivi migliori",
                        levels: {
                            1: "Base",
                            2: "Intermedio",
                            3: "Avanzato"
                        }
                    },
                    utilityStation: {
                        name: "Stazione Utility",
                        description: "Potenzia la Stazione Utility per oggetti e gadget utility avanzati",
                        levels: {
                            1: "Base",
                            2: "Intermedio",
                            3: "Avanzato"
                        }
                    },
                    refiner: {
                        name: "Raffineria",
                        description: "Potenzia la Raffineria per convertire materiali comuni in risorse rare",
                        levels: {
                            1: "Base",
                            2: "Intermedio",
                            3: "Avanzato"
                        }
                    },
                    craftableItems: "Oggetti Craftabili:",
                    noRequirements: "Nessun requisito - livello iniziale"
                },
                missingItems: {
                    pageTitle: "Oggetti Mancanti",
                    title: "Oggetti Mancanti",
                    description: "Tutti gli oggetti che ti servono ancora per Progetti, Scartino e Banchi da Lavoro",
                    loading: "Caricamento oggetti mancanti...",
                    loginPrompt: "Accedi con Google per sincronizzare i tuoi progressi su più dispositivi",
                    explanation: "Questa lista è generata dalle pagine Rifugio e Progetti. Man mano che segni gli oggetti ottenuti, questa lista si aggiorna automaticamente.",
                    sortBy: "Ordina per",
                    sortQuantity: "Quantità",
                    sortAlphabetical: "Nome",
                    filterBy: "Mostra",
                    filterAll: "Tutto",
                    filterProjects: "Progetti",
                    filterHideout: "Rifugio",
                    filterQuests: "Missioni",
                    guide: {
                        title: "Guida Oggetti Mancanti",
                        whatIsTitle: "Cosa Sono gli Oggetti Mancanti?",
                        whatIsDesc: "La pagina Oggetti Mancanti genera automaticamente un elenco completo di tutti i materiali necessari per upgrade rifugio e progetti spedizione. Controllala prima di ogni raid per sapere esattamente cosa farmare!",
                        aggregationTitle: "Aggregazione Intelligente",
                        aggregationDesc: "Gli oggetti sono automaticamente combinati da tutte le fonti. Se ti servono 5 batterie per Scartino e 3 per un progetto, mostra '8 batterie totali'. Nessun tracking manuale necessario.",
                        sourcesTitle: "Fonti Oggetti",
                        sourcesDesc: "Gli oggetti provengono da due fonti: Rifugio (upgrade Scartino + Banchi Lavoro) e Progetti (materiali spedizione). Attiva/disattiva le fonti per concentrare il farming.",
                        farmingTitle: "Consigli Farming",
                        farmingDesc: "Controlla le immagini oggetti per riconoscere il loot. Zone industriali = batterie, ingranaggi. Aree mediche = antisettici, bende. Nemici ARC = leghe, parti tech. Usa le nostre Mappe Interattive per le posizioni esatte.",
                        filtersTitle: "Filtrare le Fonti",
                        filtersDesc: "Usa i dropdown Progetti e Rifugio per includere/escludere fonti specifiche. Concentrati su un upgrade alla volta per un farming efficiente.",
                        sortingTitle: "Opzioni Ordinamento",
                        sortingDesc: "Ordina per quantità (farma prima gli oggetti con conteggio alto) o alfabeticamente (trova oggetti specifici). La tua preferenza si salva automaticamente.",
                        syncTitle: "Sincronizzazione Cloud",
                        syncDesc: "Accedi con Google per sincronizzare i progressi su tutti i dispositivi. Aggiorna dal telefono mentre giochi, vedi i risultati su desktop. Tutte le fonti aggiornano gli oggetti mancanti in tempo reale."
                    },
                    summary: {
                        title: "Riepilogo",
                        allComplete: "Tutti gli oggetti completati! 🎉"
                    },
                    noItems: {
                        message: "Hai raccolto tutto! Tutti i progetti, livelli di Scartino e banchi da lavoro sono completi."
                    },
                    itemCard: {
                        noImage: "Nessuna Immagine"
                    },
                    export: "Esporta",
                    stage: "Stadio",
                    level: "Livello",
                    table: {
                        icon: "Icona",
                        name: "Oggetto",
                        quantity: "Qtà",
                        source: "Serve Per"
                    }
                },
                skillTree: {
                    pageTitle: "Pianificatore Albero Abilità",
                    title: "Arc Raiders Skill Tree Builder",
                    subtitle: "Pianifica l'albero abilità e Salva i tuoi preset",
                    description: "Pianificatore skill tree interattivo per Arc Raiders. Simula allocazione punti nei rami Condizionamento, Mobilità e Sopravvivenza. Salva più build e condividi loadout.",
                    guide: {
                        title: "Guida Skill Tree",
                        whatIsTitle: "Come Funzionano le Skill",
                        whatIsDesc: "Le skill sono upgrade permanenti che potenziano il tuo Raider. Guadagni punti skill salendo di livello (76 base) più punti bonus dalle spedizioni. Una volta allocati, i punti non possono essere resettati in-game, quindi pianifica attentamente!",
                        categoriesTitle: "Categorie Skill",
                        categoriesDesc: "Tre rami: Condizionamento (blu) per salute, stamina e combattimento. Mobilità (arancione) per movimento, sprint e schivate. Sopravvivenza (verde) per loot, cura e resistenza danni. Ogni ramo ha 5 tier.",
                        tiersTitle: "Requisiti Tier",
                        tiersDesc: "Le skill avanzate richiedono punti investiti nella categoria. Tier 2 richiede 4 punti, Tier 3 richiede 8, Tier 4 richiede 12, Tier 5 richiede 16. Pianifica il percorso per raggiungere le skill potenti di alto tier.",
                        buildsTitle: "Salvare le Build",
                        buildsDesc: "Salva fino a 5 build diverse per testare strategie. Clicca le schede per cambiare, icona matita per rinominare, X per eliminare. Condividi le build con amici usando il pulsante Condividi - copia un URL con il tuo loadout.",
                        pointsTitle: "Gestione Punti",
                        pointsDesc: "Parti con 76 punti skill. Aggiungi i punti bonus spedizione usando il contatore. Il display mostra punti usati/disponibili. Sperimenta liberamente - questo planner non influenza il tuo personaggio in-game.",
                        recommendedTitle: "Build Consigliata per Iniziare",
                        recommendedDesc: "Nuovi giocatori: investi prima in Mobilità per sprint e stamina migliori. Poi Sopravvivenza per efficienza nel loot. Le skill Combat brillano dopo quando hai buon gear.",
                        controlsTitle: "Controlli",
                        controlsDesc: "Desktop: click sinistro per aggiungere, click destro per rimuovere. Mobile: tocca per aggiungere, tieni premuto per rimuovere. Zoom con scroll/pinch, trascina per muoverti nell'albero.",
                        mobileTitle: "Controlli",
                        mobileDesc: "Desktop: click sinistro per aggiungere, click destro per rimuovere. Mobile: tocca per aggiungere, tieni premuto per rimuovere. Zoom con scroll/pinch, trascina per muoverti nell'albero."
                    },
                    pointsUsed: "Punti Abilità Usati",
                    expeditionPoints: "Punti Spedizione",
                    expeditionPointsShort: "Spedizione",
                    share: {
                        label: "Condividi",
                        title: "Condividi Build",
                        exportImage: "Esporta come Immagine",
                        exportImageDesc: "Scarica la tua build come immagine PNG",
                        publish: "Pubblica Build",
                        publishDesc: "Condividi con la community per voti e copie",
                        publishInfo: 'La tua build "{{name}}" sarà visibile a tutti gli utenti nella pagina Build della Community.',
                        descriptionPlaceholder: "Aggiungi una descrizione (opzionale)...",
                        publishButton: "Pubblica",
                        publishSuccess: "Build pubblicata!"
                    },
                    fullscreen: "Schermo intero",
                    exitFullscreen: "Esci da Schermo intero",
                    reset: "Reimposta Albero",
                    newBuild: "Nuova Build",
                    defaultBuildName: "Build 1",
                    newBuildName: "Build {{number}}",
                    maxBuildsReached: "Massimo 5 build raggiunto",
                    cannotDeleteLast: "Non puoi eliminare l'ultima build",
                    cannotDeallocate: "Non puoi deallocare: altre abilità dipendono da questa",
                    cannotDeallocateMinPoints: "Non puoi deallocare: i punti scenderebbero sotto il requisito minimo di un'altra abilità",
                    confirmReset: "Reimpostare tutti i punti abilità?",
                    buildCopied: "Link build copiato negli appunti!",
                    tier: "Grado",
                    requires: "Richiede",
                    pointsIn: "punti in",
                    points: "Totali",
                    skillPoints: "Punti Abilità",
                    conditioning: "Condizionamento",
                    mobility: "Mobilità",
                    survival: "Sopravvivenza",
                    instructions: "Click sinistro per allocare punti, Click destro per deallocare",
                    mobileInstructions: "Tocca per allocare punti, Tieni premuto per deallocare",
                    mobileInstructionsNew: "Tocca una skill per selezionarla, usa i pulsanti +/- per allocare",
                    mobilePanelPlaceholder: "Tocca una skill per vederne i dettagli e allocare/deallocare punti",
                    zoomInstructions: "Pizzica per zoom, trascina per muoverti",
                    resetView: "Reimposta Vista",
                    resetBuild: "Reimposta Build",
                    renameBuild: "Rinomina Build",
                    selectBuild: "Seleziona Build",
                    skills: {
                        "Used To The Weight": "Abitudine al Peso",
                        "Used To The Weight_desc": "Indossare uno scudo non ti rallenta tanto",
                        "Blast-Born": "Creatura delle Esplosioni",
                        "Blast-Born_desc": "Il tuo udito è meno influenzato dalle esplosioni vicine",
                        "Gentle Pressure": "Leggera Pressione",
                        "Gentle Pressure_desc": "Fai meno rumore quando scassini",
                        "Fight Or Flight": "Fuggi o Combatti",
                        "Fight Or Flight_desc": "Recupero stamina quando ferito in combattimento (cooldown)",
                        "Proficient Pryer": "Abile Ficcanaso",
                        "Proficient Pryer_desc": "Riduce il tempo di scasso per porte/contenitori",
                        "Survivor's Stamina": "Energia da Superstite",
                        "Survivor's Stamina_desc": "Rigenerazione stamina più veloce quando gravemente ferito",
                        "Unburdened Roll": "Schivata Leggera",
                        "Unburdened Roll_desc": "Rotolata schivata gratuita dopo la rottura dello scudo",
                        "Downed But Determined": "Crollo Ma Non Mollo",
                        "Downed But Determined_desc": "Estende il timer di collasso mentre sei a terra",
                        "A Little Extra": "Una Chicca Extra",
                        "A Little Extra_desc": "Scassinare genera risorse (2 rottami/lega)",
                        "Effortless Swing": "Colpo Facile",
                        "Effortless Swing_desc": "Riduce il costo stamina delle abilità corpo a corpo",
                        "Turtle Crawl": "Passo di Tartaruga",
                        "Turtle Crawl_desc": "Danni ridotti mentre sei a terra",
                        "Loaded Arms": "Braccia Piene",
                        "Loaded Arms_desc": "L'arma equipaggiata riduce l'ingombro del 50%",
                        "Sky-Clearing Swing": "Sferzata Aerea",
                        "Sky-Clearing Swing_desc": "Danno corpo a corpo potenziato contro i droni",
                        "Back On Your Feet": "Di Nuovo in Piedi",
                        "Back On Your Feet_desc": "La salute si rigenera quando gravemente ferito",
                        Flyswatter: "Schiacciamosche",
                        Flyswatter_desc: "Distruzione corpo a corpo con un colpo di vespe/torrette",
                        "Nimble Climber": "Arrampicata Agile",
                        "Nimble Climber_desc": "Arrampicata e scavalcamento più veloci",
                        "Marathon Runner": "Maratoneta",
                        "Marathon Runner_desc": "Costo stamina ridotto per il movimento",
                        "Slip and Slide": "Scivolata Liscia",
                        "Slip and Slide_desc": "Distanza/velocità di scivolata aumentata",
                        "Youthful Lungs": "Polmoni Giovani",
                        "Youthful Lungs_desc": "Aumenta la riserva massima di stamina",
                        "Sturdy Ankles": "Caviglie Coriacee",
                        "Sturdy Ankles_desc": "Riduce i danni da caduta (altezze non letali)",
                        "Carry The Momentum": "Sulla Scia dello Scatto",
                        "Carry The Momentum_desc": "Sprint senza stamina dopo rotolata schivata (cooldown)",
                        "Calming Stroll": "Passeggiata Rigenerante",
                        "Calming Stroll_desc": "Rigenerazione stamina mentre cammini",
                        "Effortless Roll": "Schivata Facile",
                        "Effortless Roll_desc": "Costo stamina rotolata schivata ridotto",
                        "Crawl Before You Walk": "Striscia Prima di Camminare",
                        "Crawl Before You Walk_desc": "Strisciare più velocemente quando sei a terra",
                        "Off The Wall": "Gran Salto",
                        "Off The Wall_desc": "Distanza estesa del salto dal muro",
                        "Heroic Leap": "Balzo Eroico",
                        "Heroic Leap_desc": "Le rotolate schivata in sprint vanno più lontano",
                        "Vigorous Vaulter": "Scavalchi e Non Ti Stanchi",
                        "Vigorous Vaulter_desc": "Lo scavalcamento non è influenzato dall'esaurimento",
                        "Ready To Roll": "Momento Capriola",
                        "Ready To Roll_desc": "Finestra temporale estesa per la rotolata di recupero",
                        "Vaults on Vaults on Vaults": "Scavalcate Affiatate",
                        "Vaults on Vaults on Vaults_desc": "Scavalcare non consuma più stamina",
                        "Vault Spring": "Scatto Salterino",
                        "Vault Spring_desc": "Capacità di saltare alla fine dello scavalcamento",
                        "Agile Croucher": "Abbassamento Agile",
                        "Agile Croucher_desc": "Velocità di movimento accovacciato potenziata",
                        "Looter's Instincts": "Istinto del Saccheggio",
                        "Looter's Instincts_desc": "Rivelazione bottino nei contenitori più veloce",
                        "Revitalizing Squat": "Accovacciata Rivitalizzante",
                        "Revitalizing Squat_desc": "Rigenerazione stamina aumentata mentre sei accovacciato",
                        "Silent Scavenger": "Scavalcatore Silenzioso",
                        "Silent Scavenger_desc": "Rumore ridotto durante il saccheggio",
                        "In-round Crafting": "Creazione Durante un Turno",
                        "In-round Crafting_desc": "Crafta oggetti sul campo (8 tipi di oggetti)",
                        "Suffer In Silence": "Soffrire in Silenzio",
                        "Suffer In Silence_desc": "Rumore di movimento ridotto quando gravemente ferito",
                        "Good As New": "Come Nuovo",
                        "Good As New_desc": "La rigenerazione stamina aumenta sotto effetti curativi",
                        "Broad Shoulders": "Spalle Larghe",
                        "Broad Shoulders_desc": "Capacità di carico massima +2kg per grado",
                        "Traveling Tinkerer": "Artigiano Viaggiatore",
                        "Traveling Tinkerer_desc": "Sblocca 4 oggetti craftabili sul campo aggiuntivi",
                        "Stubborn Mule": "Mulo Testardo",
                        "Stubborn Mule_desc": "La rigenerazione stamina è meno influenzata dal sovrappeso",
                        "Looter's Luck": "Saccheggio Selvaggio",
                        "Looter's Luck_desc": "Possibilità di rivelare due oggetti contemporaneamente nel contenitore",
                        "One Raider's Scraps": "Gli Scarti di un Raider",
                        "One Raider's Scraps_desc": "Piccola possibilità di trovare oggetti craftati sul campo aggiuntivi nei contenitori Raider",
                        "Three Deep Breaths": "Tre Bei Respiri",
                        "Three Deep Breaths_desc": "Recupero stamina più veloce dopo drenaggio abilità",
                        "Security Breach": "Scassinamento Sicuro",
                        "Security Breach_desc": "Sblocca lo scasso degli armadietti di sicurezza",
                        Minesweeper: "Scacciamine",
                        Minesweeper_desc: "Disinnesca mine/esplosivi piazzati nelle vicinanze"
                    }
                },
                blueprints: {
                    pageTitle: "Tracker Blueprint",
                    title: "Arc Raiders Tracker Blueprint",
                    subtitle: "Traccia Tutti i Blueprint Armi e Gear",
                    description: "Tracker completo blueprint Arc Raiders. Traccia 75+ blueprint armi, schemi gear e ricette mod. Trova drop breach room, ricompense quest e posizioni blueprint rari.",
                    instructions: "Click sinistro per segnare come ottenuto, click destro per segnare come duplicato",
                    loading: "Caricamento blueprint...",
                    loginPrompt: "Accedi con Google per salvare i tuoi progressi nel cloud",
                    guide: {
                        title: "Guida Blueprint",
                        whatIsTitle: "Cosa Sono i Blueprint?",
                        whatIsDesc: "I blueprint sono ricette di crafting permanenti. Una volta ottenuti, puoi craftare quell'arma, armatura o mod illimitatamente al Banco Lavoro del Rifugio. I blueprint sono la chiave per la progressione endgame.",
                        dropLocationsTitle: "Dove Trovare i Blueprint",
                        dropLocationsDesc: "Breach room (porta rosa = Epic, porta blu = Rare), casse armi su tutte le mappe, contenitori chiusi con chiave, ricompense completamento quest e drop nemici rari (Matriarca, Bombardiere).",
                        breachRoomsTitle: "Farming Breach Room",
                        breachRoomsDesc: "Le breach room richiedono cariche esplosive (craftate alla stazione Esplosivi). Le stanze tier rosa garantiscono blueprint Epic. Controlla le nostre Mappe Interattive per trovare tutte le posizioni breach room su ogni mappa.",
                        categoriesTitle: "Categorie Blueprint",
                        categoriesDesc: "Armi (fucili d'assalto, SMG, cecchini, fucili a pompa), Armature (elmi, corpetti, gambali), Mod (accessori armi, oggetti utility), e Gear speciale (scudi, deployable, consumabili).",
                        trackingTitle: "Usare il Tracker",
                        trackingDesc: "Click sinistro: segna come Ottenuto. Click destro: segna come Duplicato (per trading). Clicca di nuovo per resettare. I progressi si sincronizzano nel cloud quando loggato. Esporta come immagine per condividere la collezione.",
                        statusTitle: "Icone di Stato",
                        statusDesc: "Spunta gialla = ottenuto. Badge blu '2' = duplicato per trading. Grigio = ancora necessario. Usa le schede per filtrare per stato.",
                        tipsTitle: "Consigli Farming",
                        tipsDesc: "Concentrati prima sulle armi Epic (danno migliore). Fai breach room durante Night Raid per loot più sicuro. Controlla le ricompense Prove per blueprint garantiti a 2.500 e 4.000 punti.",
                        filtersTitle: "Filtri",
                        filtersDesc: "Usa la barra di ricerca per trovare blueprint per nome. Filtra per categoria (Arma, Armatura, Mod) o rarità (da Comune a Leggendario) per restringere la lista."
                    },
                    stats: {
                        total: "Totale",
                        obtained: "Trovati",
                        needed: "Necessari",
                        duplicates: "Duplicati",
                        progress: "Progresso"
                    },
                    tabs: {
                        needed: "Necessari",
                        obtained: "Trovati",
                        duplicates: "Duplicati",
                        all: "Tutti"
                    },
                    filters: {
                        allCategories: "Tutte le Categorie",
                        allRarities: "Tutte le Rarità",
                        allStatus: "Tutti",
                        all: "Tutti",
                        learned: "Imparati",
                        notLearned: "Non Imparati",
                        owned: "In Possesso",
                        obtained: "Trovati",
                        notObtained: "Non Trovati",
                        duplicates: "Doppioni"
                    },
                    sort: {
                        ingame: "Ordine In-Game",
                        name: "Per Nome (A-Z)",
                        rarity: "Per Rarità"
                    },
                    status: {
                        obtained: "Trovato",
                        duplicate: "Duplicato"
                    },
                    search: "Cerca blueprint...",
                    export: "Esporta",
                    noResults: "Nessun blueprint trovato con questi filtri",
                    detail: {
                        craftedAt: "Costruito presso",
                        recipe: "Ricetta",
                        obtained: "Ottenuto",
                        notObtained: "Non ottenuto",
                        learned: "Imparato",
                        duplicates: "Doppioni"
                    }
                },
                about: {
                    title: "Chi Siamo",
                    subtitle: "La companion app gratuita e guidata dalla community per i giocatori di Arc Raiders. Tutto ciò di cui hai bisogno per pianificare, tracciare e padroneggiare il gioco, in un unico posto.",
                    whatIs: {
                        title: "Cos'è Arc Raiders Central?",
                        p1: "Arc Raiders Central è una companion web app gratuita costruita appositamente per i giocatori di Arc Raiders. Raccoglie tutti gli strumenti di cui hai bisogno per giocare in modo più intelligente: mappe interattive con marker per loot e POI, timer eventi live, un database completo di oggetti e ricette, planner per gli upgrade del rifugio, tracker missioni, skill tree builder e molto altro.",
                        p2: "L'app viene aggiornata regolarmente per riflettere le ultime patch di gioco e le scoperte della community. È nata come un progetto personale ed è diventata una piattaforma completa utilizzata da migliaia di giocatori ogni giorno."
                    },
                    features: {
                        title: "Cosa Trovi Dentro",
                        maps: {
                            title: "Mappe Interattive",
                            desc: "Mappe dettagliate per tutte le 6 location con marker filtrabili per loot, estrazioni, POI, stanze sfondabili e spawn raider."
                        },
                        timers: {
                            title: "Timer Eventi",
                            desc: "Countdown in tempo reale per tutti gli eventi delle mappe: Night Raid, Raccoglitore, Tempesta Elettromagnetica, Bunker Nascosto, Colpo di Freddo e bonus 2X Prove."
                        },
                        items: {
                            title: "Oggetti e Crafting",
                            desc: "Database completo di armi, armature, consumabili e materiali. Vedi costi di crafting, prezzi di vendita, margini di profitto e filtra per rarità o tipo."
                        },
                        hideout: {
                            title: "Planner Rifugio",
                            desc: "Pianifica tutti gli upgrade di Scartino, calcola i materiali necessari e genera automaticamente la lista degli oggetti mancanti tra rifugio e progetti."
                        },
                        quests: {
                            title: "Tracker Missioni",
                            desc: "Database completo di missioni per tutti i mercanti - Celeste, Scartino e Foraggiatore - con obiettivi, ricompense, mappe e blueprint sbloccabili."
                        },
                        community: {
                            title: "Funzioni Community",
                            desc: "Condividi e vota build dell'albero abilità, crea e sfoglia loadout, e scambia oggetti con altri giocatori sul mercato della community."
                        }
                    },
                    values: {
                        title: "I Nostri Principi",
                        free: {
                            title: "Sempre Gratuita",
                            desc: "Arc Raiders Central è e sarà sempre completamente gratuita. Nessun paywall, nessun piano premium - solo strumenti per tutti."
                        },
                        updated: {
                            title: "Aggiornata Regolarmente",
                            desc: "L'app viene aggiornata ad ogni patch importante. I dati di gioco, le mappe e le funzionalità sono sempre precisi e aggiornati."
                        },
                        community: {
                            title: "Community al Primo Posto",
                            desc: "Costruita da un giocatore, per i giocatori. Il feedback e i suggerimenti della community influenzano direttamente le nuove funzionalità e i miglioramenti."
                        }
                    },
                    author: {
                        title: "Chi l'ha Creata?",
                        p1: "Arc Raiders Central è stata creata e viene mantenuta da uno sviluppatore e giocatore di Arc Raiders in solitaria. Il progetto è iniziato come un semplice calcolatore di crafting ed è cresciuto fino a diventare una piattaforma companion completa grazie al feedback della community.",
                        p2: "L'app è supportata da un piccolo gruppo di contributori della community che segnalano bug, suggeriscono funzionalità e aiutano a mantenere i dati accurati. Un ringraziamento speciale a tutti i sostenitori e contributori elencati nella pagina Support."
                    },
                    contact: {
                        title: "Contattaci",
                        desc: "Hai un suggerimento, trovato un bug o vuoi contribuire? Scrivici via email o visita la pagina Support.",
                        supportLink: "Vai alla Pagina Support"
                    }
                },
                footer: {
                    title: "Arc Raiders Central",
                    description: "Companion app per Arc Raiders. Oggetti, mappe, missioni e altro.",
                    quickLinks: "Link Rapidi",
                    support: "Supporto",
                    buyMeCoffee: "Offrimi un caffè",
                    supportText: "Aiuta a mantenere quest'app gratuita e aggiornata",
                    about: "Info",
                    aboutText: "Realizzato con passione per la community di Arc Raiders. Aggiornamenti regolari con nuove funzionalità e dati di gioco.",
                    madeWith: "Realizzato con",
                    by: "da",
                    madeBy: "Realizzato da",
                    disclaimer: "Non affiliato con Arc Raiders o Embark Studios. Tutti gli asset di gioco appartengono ai rispettivi proprietari.",
                    iconsBy: "Icone di",
                    privacy: "Privacy",
                    terms: "Termini",
                    cookies: "Cookie"
                },
                support: {
                    title: "Supporta Arc Raiders Central",
                    subtitle: "Aiuta a mantenere questo strumento gratuito e aggiornato per la community",
                    stats: {
                        free: "Gratis",
                        freeAccess: "Sempre Gratis",
                        features: "Funzionalità & Strumenti",
                        updates: "Settimanali",
                        dataUpdates: "Aggiornamenti Dati"
                    },
                    why: {
                        title: "Perché Supportare?",
                        hosting: {
                            title: "Costi Server & Hosting",
                            description: "Mantenere l'app veloce, affidabile e sempre disponibile costa denaro. Il tuo supporto copre le spese infrastrutturali."
                        },
                        development: {
                            title: "Tempo di Sviluppo",
                            description: "Ore di lavoro vanno nell'aggiungere nuove funzionalità, aggiornare i dati di gioco e correggere bug. Il caffè alimenta il codice!"
                        },
                        features: {
                            title: "Nuove Funzionalità",
                            description: "Il finanziamento del tier premium permette uno sviluppo più rapido di strumenti avanzati come cloud sync, condivisione build personalizzate e altro."
                        }
                    },
                    cta: {
                        title: "Offrimi un Caffè",
                        description: "Ogni contributo aiuta a mantenere Arc Raiders Central attivo e in continuo miglioramento",
                        note: "Donazioni da $3 • Nessun account richiesto • Pagamento sicuro via Ko-fi"
                    },
                    premium: {
                        title: "Tier Premium In Arrivo",
                        subtitle: "Ottieni accesso anticipato a funzionalità avanzate",
                        cloudSync: "Cloud Sync",
                        cloudSyncDesc: "Salva build su più dispositivi",
                        optimizer: "Ottimizzatore Avanzato",
                        optimizerDesc: "Calcoli profitto multi-item",
                        hideout: "Template Rifugio",
                        hideoutDesc: "Salva e condividi layout personalizzati",
                        pricing: "Prezzo Early Bird:",
                        price: "$2,99/mese o $24,99/anno (risparmia 30%)"
                    },
                    thanks: {
                        title: "Grazie!",
                        message: "Che tu faccia una donazione o semplicemente usi l'app, il tuo supporto significa tutto. Questo strumento è costruito per la community.",
                        signature: "- m0n0t0ny, Sviluppatore Arc Raiders Central"
                    },
                    contributors: {
                        title: "Crediti",
                        creators: "Creatori",
                        contributors: "Contributori",
                        supporters: "Sostenitori",
                        attributions: "Attribuzioni",
                        attributionsDesc: "Ringraziamenti speciali ai progetti che hanno reso possibile questa app"
                    },
                    attributions: {
                        arcraiderswiki: {
                            name: "Arc Raiders Wiki",
                            description: "Info, immagini, icone e assets",
                            url: "https://arc-raiders.fandom.com"
                        },
                        metaforge: {
                            name: "MetaForge",
                            description: "Icone oggetti",
                            url: "https://metaforge.app"
                        },
                        radixui: {
                            name: "Radix UI",
                            description: "Componenti UI",
                            url: "https://www.radix-ui.com"
                        },
                        lucide: {
                            name: "Lucide",
                            description: "Libreria icone",
                            url: "https://lucide.dev"
                        },
                        reactflow: {
                            name: "React Flow",
                            description: "Diagrammi quest tree",
                            url: "https://reactflow.dev"
                        },
                        framermotion: {
                            name: "Framer Motion",
                            description: "Animazioni",
                            url: "https://www.framer.com/motion"
                        }
                    }
                },
                holdToIncrementHint: {
                    title: "Suggerimento!",
                    description: "Tieni premuto il pulsante + o - per incrementare rapidamente, oppure usa lo slider per cambiare i valori velocemente"
                },
                kofiButton: {
                    text: "Supporta su Ko-fi",
                    ariaLabel: "Supporta su Ko-fi"
                },
                trials: {
                    title: "Tracker Prove",
                    subtitle: "Sfide Settimanali, Gradi e Calcolatore Ricompense",
                    description: "Traccia le sfide settimanali di Arc Raiders, calcola i punti e scala le classifiche di divisione da Recluta a Leggenda della Cantina",
                    backToTrials: "Torna alle Prove",
                    season: "Stagione",
                    week: "Settimana",
                    timeRemaining: "TEMPO RIMASTO",
                    currentRank: "GRADO",
                    gradePoints: "PUNTI GRADO",
                    position: "POSIZIONE",
                    weekTitle: "Settimana {{week}}",
                    personalRecord: "RECORD PERSONALE",
                    maxPoints: "4.000 Punti",
                    loading: "Caricamento prove...",
                    points: "punti",
                    ranks: {
                        "Rookie I": "Recluta I",
                        "Rookie II": "Recluta II",
                        "Rookie III": "Recluta III",
                        "Tryhard I": "Tenace I",
                        "Tryhard II": "Tenace II",
                        "Tryhard III": "Tenace III",
                        "Wildcard I": "Jolly I",
                        "Wildcard II": "Jolly II",
                        "Wildcard III": "Jolly III",
                        "Daredevil I": "Audace I",
                        "Daredevil II": "Audace II",
                        "Daredevil III": "Audace III",
                        Hotshot: "Fenomeno",
                        "Hotshot I": "Fenomeno I",
                        "Hotshot II": "Fenomeno II",
                        "Hotshot III": "Fenomeno III",
                        "Cantina Legend": "Leggenda della Cantina"
                    },
                    trialNames: {
                        "Open Arc Probes": "Apri Sonde Arc",
                        "Destroy Ticks": "Distruggi Zecche",
                        "Damage Leapers": "Danneggia Leaper",
                        "Damage any ARC enemies": "Danneggia nemici ARC",
                        "Harvest plants": "Raccogli piante",
                        "Harvest Plants": "Raccogli piante",
                        "Damage Hornets": "Danneggia Calabroni",
                        "Search First Wave husks": "Cerca Carcasse Prima Ondata",
                        "Search Supply Drops": "Cerca Rifornimenti",
                        "Destroy Ticks, Fireballs and Pops": "Distruggi Zecche, Sfere Infuocate e Pop",
                        "Damage ground-based ARC enemies": "Danneggia nemici ARC terrestri",
                        "Damage Wasps": "Danneggia Vespe",
                        "Download data during Hidden Bunker": "Scarica dati durante Bunker Nascosto",
                        "Deliver carriables": "Consegna trasportabili",
                        "Destroy Fireballs": "Distruggi Sfere Infuocate",
                        "Damage Bastions": "Danneggia Bastioni",
                        "Damage Queens or Matriarchs": "Danneggia Regine o Matriarche",
                        "Damage flying ARC enemies": "Danneggia nemici ARC volanti",
                        "Damage Rocketeers": "Danneggia Lanciarazzi",
                        "Damage Snitches": "Danneggia Spie",
                        "Damage Rocketeers, Leapers or Bastions": "Danneggia Lanciarazzi, Leaper o Bastioni",
                        "Destroy Pops": "Distruggi Pop",
                        "Open ARC Probes": "Apri Sonde ARC",
                        "(Cold Snap) Search frozen Raider containers": "(Colpo di Freddo) Cerca contenitori Raider congelati",
                        "(Cold Snap) Throw snowballs at Rocketeers": "(Colpo di Freddo) Lancia palle di neve ai Lanciarazzi",
                        "Deal damage to Shredders": "Infliggi danni ai Trituratori",
                        "(Cold Snap) Throw snowballs at Bastions": "(Colpo di Freddo) Lancia palle di neve ai Bastioni",
                        "(Hidden Bunker) Download information inside the bunker": "(Bunker Nascosto) Scarica informazioni dentro al bunker",
                        "(Toxic Swamp) Deliver thermal rocks": "(Palude Tossica) Consegna rocce termiche",
                        "(Toxic Swamp) Keep Air Purifiers powered on during Toxic Swamp - Clean Air": "(Palude Tossica) Mantieni i Purificatori d'Aria accesi durante Palude Tossica - Aria Pulita"
                    },
                    guide: {
                        title: "Guida Prove Arc Raiders",
                        overviewTitle: "Cosa sono le Prove?",
                        overviewDesc: "Le Prove sono il sistema di ranking competitivo endgame di Arc Raiders. Sbloccale al Livello 15 per competere nelle sfide settimanali, scalare le classifiche di divisione e guadagnare ricompense cosmetiche esclusive ogni stagione.",
                        weeklyTitle: "Sfide Settimanali",
                        weeklyDesc: "Ogni settimana ricevi 5 sfide: obiettivi di combattimento (uccidi Leaper, Sfere Infuocate), attività utility (hacka Sonde ARC, saccheggia Rifornimenti), o obiettivi specifici di evento. Completa azioni per guadagnare punti.",
                        divisionsTitle: "Sistema Divisioni",
                        divisionsDesc: "Quando segni il primo punto, vieni piazzato in una divisione di 100 Raiders del tuo grado. Top 30 = doppia promozione, 31-60 = singola promozione, ultimi 40 = rimani al grado attuale. Le classifiche si resettano ogni Lunedì.",
                        ranksTitle: "Progressione Gradi",
                        ranksDesc: "14 gradi totali da Recluta I a Leggenda della Cantina (top 1000 giocatori). Ogni grado ha 3 livelli tranne Fenomeno e Leggenda della Cantina. Le nuove stagioni ti fanno partire 2 gradi sotto il piazzamento precedente.",
                        rewardsIntro: "Le Prove offrono due tipi di ricompense: ricompense sfida e ricompense stagionali.",
                        challengeRewardsTitle: "Ricompense Sfida",
                        challengeRewards: "Ottieni ricompense raggiungendo 1.000, 2.500 e 4.000 punti in ogni prova. Queste garantiscono rispettivamente un oggetto o progetto casuale Non Comune, Raro ed Epico. Le ricompense vengono assegnate automaticamente dopo l'estrazione e possono essere ottenute solo una volta per livello di sfida a settimana.",
                        seasonRewardsTitle: "Ricompense Stagionali",
                        seasonRewards: "Alla fine di ogni stagione, i Raiders ricevono cosmetici ed emote in base al loro grado finale. Raggiungere un grado alto garantisce anche tutte le ricompense dei gradi inferiori.",
                        intro: "Ogni settimana i Raiders ricevono 5 sfide Prove accessibili dal menu Prove. Completando azioni specifiche si guadagnano punti per ogni sfida.",
                        bonus: "Durante gli eventi principali (Raid Notturno, Tempesta Elettromagnetica, Bunker Nascosto, Varco Bloccato, Colpo di Freddo), i punti delle sfide sono raddoppiati!",
                        scoring: "I punti vengono contati solo dopo un'estrazione riuscita. Viene salvato solo il miglior punteggio per ogni sfida. Gioca in squadra per condividere i progressi - tutti i membri del party guadagnano lo stesso punteggio!",
                        tipsTitle: "Consigli Pro",
                        tipsDesc: "Concentrati su una sfida alla volta. Inizia con obiettivi di raccolta facili, poi affronta le sfide di combattimento con equipaggiamento migliore. Farma durante gli eventi 2X Prove per massimizzare i punti. Estrai prima di rischiare il tuo punteggio!",
                        pointsTitle: "Punti per Sfida",
                        challenge: "Sfida",
                        points: "Punti",
                        maps: "Disponibilità",
                        allMaps: "Tutte le mappe",
                        perDmg: "/danno",
                        perKill: "/ucc.",
                        perHusk: "/carc.",
                        perDrop: "/riforn.",
                        perCont: "/cont.",
                        perPlant: "/pianta",
                        perProbe: "/sonda",
                        perData: "/dati",
                        perCrate: "/cassa",
                        perHit: "/colpo"
                    }
                },
                timerSuggestions: {
                    suggestEdit: "Suggerisci modifica",
                    loginRequired: "Accedi per suggerire modifiche",
                    types: {
                        schedule_change: "Modifica orari",
                        new_event: "Nuovo evento",
                        remove_event: "Rimuovi evento"
                    },
                    modal: {
                        title: "Suggerisci una modifica ai timer",
                        communityTitle: "Suggerimenti della community",
                        loginTitle: "Accesso richiesto",
                        loginMessage: "Accedi per vedere e votare i suggerimenti della community, o inviarne uno nuovo.",
                        loginButton: "Accedi con Google",
                        noSuggestions: "Nessun suggerimento ancora. Sii il primo a segnalare un problema!",
                        addSuggestion: "+ Aggiungi suggerimento",
                        backToList: "Torna ai suggerimenti",
                        type: "Tipo di suggerimento",
                        map: "Mappa",
                        existingEvent: "Evento da modificare",
                        selectEvent: "Seleziona un evento...",
                        currentSchedule: "Orari attuali",
                        proposedSchedule: "Orari proposti",
                        eventType: "Tipo di evento",
                        newSchedule: "Orari",
                        eventToRemove: "Evento da rimuovere",
                        note: "Nota (opzionale)",
                        notePlaceholder: "Spiega perché questa modifica è necessaria...",
                        addSlot: "Aggiungi slot",
                        submit: "Invia suggerimento",
                        submitting: "Invio in corso...",
                        submitted: "Suggerimento inviato! Grazie."
                    },
                    admin: {
                        title: "Suggerimenti in attesa",
                        empty: "Nessun suggerimento in attesa.",
                        map: "Mappa",
                        event: "Evento",
                        newEvent: "Nuovo evento",
                        removeEvent: "Rimuovi evento",
                        approve: "Approva",
                        approving: "Approvazione...",
                        reject: "Rifiuta",
                        rejecting: "Rifiuto...",
                        approveFailed: "Impossibile applicare il suggerimento."
                    }
                },
                admin: {
                    home: {
                        title: "Dashboard Admin",
                        subtitle: "Dashboard Admin",
                        maps: {
                            title: "Mappe",
                            description: "Aggiungi e modifica i POI sulle mappe interattive"
                        },
                        timers: {
                            title: "Timer",
                            description: "Modifica gli orari di rotazione e gli eventi"
                        },
                        quests: {
                            title: "Missioni",
                            description: "Modifica missioni, obiettivi e ricompense"
                        },
                        items: {
                            title: "Oggetti",
                            description: "Gestisci il database oggetti e le ricette di crafting"
                        },
                        blueprints: {
                            title: "Blueprint",
                            description: "Gestisci blueprint, ricette e ordine di visualizzazione"
                        },
                        settings: {
                            title: "Impostazioni",
                            description: "Configura le impostazioni generali del sito"
                        },
                        users: {
                            title: "Utenti",
                            description: "Visualizza gli utenti connessi e la loro attività"
                        }
                    },
                    users: {
                        title: "Utenti Online",
                        subtitle: "Visualizza gli utenti connessi e il loro stato di attività",
                        onlineNow: "Online Adesso",
                        lastHour: "Ultimi 60 Minuti",
                        last24h: "Ultime 24 Ore",
                        noUsers: "Nessun utente in questo periodo",
                        justNow: "Proprio ora",
                        minutesAgo: "{{count}} min fa",
                        hoursAgo: "{{count}}h fa",
                        never: "Mai visto",
                        sortTime: "Tempo",
                        sortAlpha: "A-Z",
                        manage: {
                            title: "Gestione Utenti",
                            searchPlaceholder: "Cerca per nome...",
                            noUsers: "Nessun utente registrato",
                            noResults: "Nessun utente trovato",
                            registered: "Registrato: {{date}}",
                            socialBanned: "Ban Social",
                            platformBanned: "Ban Piattaforma",
                            banSocial: "Banna da chat e market",
                            unbanSocial: "Sbanna da chat e market",
                            banPlatform: "Banna dalla piattaforma",
                            unbanPlatform: "Sbanna dalla piattaforma",
                            deleteUser: "Elimina utente",
                            confirmBanSocial: "Ban Social",
                            confirmUnbanSocial: "Rimuovi Ban Social",
                            confirmBanPlatform: "Ban Piattaforma",
                            confirmUnbanPlatform: "Rimuovi Ban Piattaforma",
                            confirmDelete: "Elimina Utente",
                            confirmBanSocialDesc: "{{name}} non potrà più utilizzare chat e market.",
                            confirmUnbanSocialDesc: "{{name}} potrà nuovamente utilizzare chat e market.",
                            confirmBanPlatformDesc: "{{name}} verrà disconnesso e non potrà più accedere alla piattaforma.",
                            confirmUnbanPlatformDesc: "{{name}} potrà nuovamente accedere alla piattaforma.",
                            confirmDeleteDesc: "Tutti i dati di {{name}} verranno eliminati permanentemente. Questa azione non può essere annullata."
                        }
                    },
                    settings: {
                        title: "Impostazioni Admin",
                        subtitle: "Preferenze personali per gli amministratori",
                        creatorBanner: {
                            title: "Banner Creator",
                            description: "Gestisci il banner promozionale mostrato nella homepage",
                            enabled: "Mostra banner nella homepage",
                            platform: "Piattaforma",
                            displayName: "Nome Visualizzato",
                            username: "Username (senza @)",
                            channelUrl: "URL Canale"
                        },
                        textSelection: {
                            title: "Selezione Testo",
                            description: "Abilita la selezione del testo per il tuo account admin (sempre disabilitata per gli utenti normali)",
                            label: "Abilita selezione testo"
                        }
                    },
                    timers: {
                        title: "Gestione Timer",
                        subtitle: "Modifica gli orari degli eventi per ogni mappa",
                        eventsOn: "Eventi su {{mapName}}",
                        addEvent: "Aggiungi Evento",
                        editEvent: "Modifica Evento",
                        noEvents: "Nessun evento configurato per questa mappa",
                        eventType: "Tipo Evento",
                        schedule: "Orari",
                        scheduleHint: "Un intervallo per riga, formato: HH:MM-HH:MM",
                        majorTrial: "Major Trial (2X Prove)",
                        trialsMultiplier: "Moltiplicatore Prove",
                        invalidSchedule: "Formato orario non valido. Usa HH:MM-HH:MM",
                        importSuccess: "Timer importati con successo",
                        timezone: "Fuso orario",
                        timezones: {
                            UTC: "UTC",
                            London: "Londra (GMT/BST)",
                            Paris: "Parigi (CET/CEST)",
                            Rome: "Roma (CET/CEST)",
                            Berlin: "Berlino (CET/CEST)",
                            Madrid: "Madrid (CET/CEST)",
                            Moscow: "Mosca (MSK)",
                            NewYork: "New York (EST/EDT)",
                            Chicago: "Chicago (CST/CDT)",
                            Denver: "Denver (MST/MDT)",
                            LosAngeles: "Los Angeles (PST/PDT)",
                            SaoPaulo: "San Paolo (BRT)",
                            Tokyo: "Tokyo (JST)",
                            Shanghai: "Shanghai (CST)",
                            Seoul: "Seoul (KST)",
                            Singapore: "Singapore (SGT)",
                            Dubai: "Dubai (GST)",
                            Sydney: "Sydney (AEST/AEDT)",
                            Local: "Locale"
                        },
                        majorTrialBadge: "2X Prove",
                        minorEvent: "Evento Minore",
                        majorEvent: "Evento Maggiore",
                        eventNameEN: "Nome (Inglese)",
                        eventNameIT: "Nome (Italiano)",
                        selectExisting: "Seleziona Esistente",
                        createNewType: "Crea Nuovo Tipo",
                        newTypeId: "ID Evento",
                        newTypeIdHint: "Identificativo unico (es. Bird City, Meteor Shower)",
                        newTypeIcon: "Percorso Icona",
                        eventCategory: "Categoria",
                        newTypeRequired: "ID Evento e nome inglese sono obbligatori",
                        typeAlreadyExists: "Esiste già un tipo evento con questo ID",
                        scheduleOptional: "Lascia vuoto per creare il tipo evento senza aggiungerlo a questa mappa",
                        eventTypesTitle: "Tipi Evento",
                        addEventType: "Aggiungi Tipo Evento",
                        editEventType: "Modifica Tipo Evento",
                        confirmDeleteType: 'Sei sicuro di voler eliminare il tipo evento "{{type}}"?',
                        cannotDeleteUsedType: "Impossibile eliminare questo tipo evento. È usato in: {{maps}}",
                        tabEvents: "Tipi Evento",
                        tabTimers: "Timer Mappe",
                        tabSuggestions: "Suggerimenti",
                        eventTypes: {
                            Harvester: "Mietitrice",
                            "Uncovered Caches": "Scorte Scoperte",
                            "Electromagnetic Storm": "Tempesta Elettromagnetica",
                            "Cold Snap": "Ondata di Freddo",
                            Matriarch: "Matriarca",
                            "Prospecting Probes": "Sonde Esplorative",
                            "Night Raid": "Raid Notturno",
                            "Husk Graveyard": "Cimitero di Carcasse",
                            "Lush Blooms": "Stagione del Raccolto",
                            "Launch Tower Loot": "Bottino Torre di Lancio",
                            "Hidden Bunker": "Bunker Nascosto",
                            "Locked Gate": "Varco Bloccato",
                            Hurricane: "Uragano"
                        }
                    },
                    title: "Dashboard Admin - POI Mappe",
                    selectMap: "Seleziona mappa",
                    selectLevel: "Seleziona livello",
                    levelBase: "Livello 0",
                    level: "Livello {{name}}",
                    addPoi: "Aggiungi POI",
                    clickOnMap: "Clicca sulla mappa...",
                    import: "Importa",
                    export: "Esporta",
                    saveToFirebase: "Salva",
                    saving: "Salvataggio...",
                    unsavedChanges: "Modifiche non salvate",
                    poisOnMap: "POI su {{mapName}} ({{count}})",
                    noPois: 'Nessun POI su questa mappa. Clicca "Aggiungi POI" per iniziare.',
                    clickToAdd: "Clicca sulla mappa per aggiungere un POI",
                    dialog: {
                        addTitle: "Aggiungi POI",
                        editTitle: "Modifica POI",
                        name: "Nome",
                        namePlaceholder: "Inserisci nome POI...",
                        type: "Tipo",
                        description: "Descrizione",
                        descriptionPlaceholder: "Descrizione opzionale...",
                        coordinates: "Coordinate",
                        reposition: "Riposiziona",
                        cancel: "Annulla",
                        add: "Aggiungi",
                        update: "Aggiorna"
                    },
                    messages: {
                        saveSuccess: "Dati salvati con successo!",
                        saveFailed: "Impossibile salvare. Riprova.",
                        importSuccess: "Importati {{count}} elementi",
                        importFailed: "File JSON non valido",
                        publishFailed: "Pubblicazione fallita: "
                    },
                    publish: "Pubblica",
                    publishing: "Pubblicazione...",
                    accessDenied: "Accesso negato. Solo admin.",
                    quests: {
                        title: "Gestione Missioni",
                        subtitle: "Gestisci missioni, obiettivi e ricompense",
                        search: "Cerca missioni...",
                        filterTrader: "Mercante",
                        totalQuests: "Totale",
                        showing: "Mostrate",
                        questsList: "Missioni",
                        addQuest: "Aggiungi Missione",
                        editQuest: "Modifica Missione",
                        noQuests: "Nessuna missione trovata",
                        questId: "ID Missione",
                        questNumber: "Numero",
                        questName: "Nome Missione",
                        trader: "Mercante",
                        maps: "Mappe",
                        mapsLabel: "Mappe:",
                        objectivesLabel: "Obiettivi:",
                        previousQuests: "Missioni Precedenti",
                        nextQuests: "Missioni Successive",
                        selectPreviousQuest: "Seleziona missioni precedenti...",
                        selectNextQuest: "Seleziona missioni successive...",
                        requiredItems: "Oggetti Richiesti",
                        rewardItems: "Ricompense",
                        selectItem: "Seleziona oggetto...",
                        objectives: "Obiettivi",
                        objectivesCount: "obiettivi",
                        addObjective: "Aggiungi Obiettivo",
                        objective: "Obiettivo",
                        confirmDelete: "Sei sicuro di voler eliminare questa missione?",
                        importSuccess: "Missioni importate con successo",
                        initFirebase: "Inizializza Firebase",
                        initFirebaseConfirm: "Questo sovrascriverà i dati Firebase con il file JSON statico. Continuare?",
                        initFirebaseSuccess: "Firebase inizializzato con successo da quests.json!",
                        initFirebaseFailed: "Impossibile inizializzare Firebase. Controlla la console per i dettagli."
                    },
                    blueprints: {
                        title: "Gestione Blueprint",
                        subtitle: "Gestisci blueprint, ricette e ordine",
                        search: "Cerca blueprint...",
                        filterCategory: "Categoria",
                        filterRarity: "Rarità",
                        totalBlueprints: "Totale",
                        showing: "Mostrati",
                        blueprintsList: "Blueprint",
                        addBlueprint: "Aggiungi",
                        editBlueprint: "Modifica Blueprint",
                        noBlueprints: "Nessun blueprint trovato",
                        blueprintId: "ID Blueprint",
                        blueprintName: "Nome",
                        category: "Categoria",
                        rarity: "Rarità",
                        description: "Descrizione",
                        craftedAt: "Costruito presso",
                        icon: "Percorso Icona",
                        recipe: "Ricetta",
                        ingredients: "ingredienti",
                        addIngredient: "Aggiungi Ingrediente",
                        noIngredients: "Nessun ingrediente aggiunto",
                        confirmDelete: "Sei sicuro di voler eliminare questo blueprint?",
                        deleteBlueprint: "Elimina Blueprint",
                        publishConfirm: "Questo pubblicherà i blueprint in produzione. Continuare?",
                        publishSuccess: "Pubblicato con successo!",
                        saveBeforePublish: "Salva le modifiche prima di pubblicare",
                        dragDisabled: "Drag disabilitato durante il filtraggio"
                    },
                    items: {
                        title: "Gestione Oggetti",
                        subtitle: "Gestisci oggetti, ricette di crafting e statistiche",
                        search: "Cerca oggetti...",
                        filterType: "Tipo",
                        filterRarity: "Rarità",
                        totalItems: "Totale",
                        showing: "Mostrati",
                        itemsList: "Oggetti",
                        addItem: "Aggiungi Oggetto",
                        editItem: "Modifica Oggetto",
                        noItems: "Nessun oggetto trovato",
                        confirmDelete: "Sei sicuro di voler eliminare questo oggetto?",
                        importJson: "Importa da JSON",
                        importJsonConfirm: "Questo unirà items.json e crafting-data.json. Continuare?",
                        importSuccess: "Oggetti importati con successo!",
                        importFileSuccess: "Oggetti importati da file",
                        tabBasic: "Base",
                        tabTranslations: "Traduzioni",
                        tabDetails: "Dettagli",
                        tabCrafting: "Crafting",
                        name: "Nome",
                        type: "Tipo",
                        rarity: "Rarità",
                        value: "Valore",
                        icon: "Percorso Icona",
                        description: "Descrizione",
                        workbench: "Banco di Lavoro",
                        lootArea: "Area di Loot",
                        statBlock: "Blocco Statistiche",
                        statBlockNote: "Il blocco statistiche è preservato dai dati originali. Modifica le singole statistiche nell'export JSON se necessario.",
                        components: "Componenti Crafting",
                        addComponent: "Aggiungi Componente",
                        selectComponent: "Seleziona componente...",
                        noComponents: "Nessun componente di crafting. Questo oggetto non è craftabile.",
                        recipePreview: "Anteprima Ricetta",
                        cancel: "Annulla",
                        save: "Salva",
                        update: "Aggiorna",
                        selectType: "Seleziona tipo...",
                        translationsNote: "Personalizza le traduzioni per questo oggetto. Lascia i campi italiani vuoti per usare le traduzioni predefinite dal file statico.",
                        nameTranslations: "Nome",
                        descriptionTranslations: "Descrizione",
                        flavorTextTranslations: "Testo Descrittivo",
                        publishConfirm: "Questo pubblicherà gli oggetti in produzione. Le modifiche saranno live dopo il deploy di Vercel (di solito 1-2 minuti). Continuare?",
                        publishSuccess: "Pubblicato con successo! Commit: {{commit}}",
                        saveBeforePublish: "Salva le modifiche su Firebase prima di pubblicare"
                    }
                },
                questData: {
                    "picking_up_the_pieces.name": "Raccogliere i Pezzi",
                    "picking_up_the_pieces.description": "La tempesta si è per lo più calmata, ma gran parte della nostra infrastruttura ha subito danni considerevoli. Se speri di restare con noi, avrò bisogno che tu faccia la tua parte negli sforzi di riparazione.",
                    "picking_up_the_pieces.objective_0": "Visita qualsiasi area sulla tua mappa con un'icona di categoria bottino",
                    "picking_up_the_pieces.objective_1": "Saccheggia 3 contenitori",
                    "clearer_skies.name": "Cieli più Limpidi",
                    "clearer_skies.description": "Uno sciame di vespe disorientate si è schiantato vicino a uno dei nostri lucernari. Devi sfoltire i ranghi degli ARC prima che accadano altri incidenti. E puoi raccogliere dei materiali particolarmente resistenti per riparare i danni?",
                    "clearer_skies.objective_0": "Distruggi 3 nemici ARC",
                    "clearer_skies.objective_1": "Ottieni 3 leghe ARC per Shani",
                    "trash_into_treasure.name": "Da Rifiuti a Tesoro",
                    "trash_into_treasure.description": "Per un Raider non esiste la vera spazzatura: sono tutte risorse preziose che aspettano solo di essere riciclate. Se vuoi combinare qualcosa qui fuori, non puoi aspettare che tutto ti venga servito su un piatto d’argento.",
                    "trash_into_treasure.objective_0": "Ottieni 6 fili",
                    "trash_into_treasure.objective_1": "Ottieni 1 batteria",
                    "off_the_radar.name": "Fuori dal Radar",
                    "off_the_radar.description": "I danni qui sotto erano piuttosto gravi, ma la nostra infrastruttura in superficie è stata colpita ancora più duramente. Ho ancora diverse antenne che hanno smesso di funzionare dopo la tempesta.",
                    "off_the_radar.objective_0": "Visita un deposito sul campo",
                    "off_the_radar.objective_1": "Ripara l'antenna sul tetto del deposito sul campo",
                    "a_bad_feeling.name": "Un Brutto Presentimento",
                    "a_bad_feeling.description": "Anche il più piccolo cambiamento nel comportamento dell'ARC potrebbe significare una catastrofe. E quel segnale che hai captato? Non abbiamo mai intercettato nulla del genere prima. Se stanno pianificando qualcosa, dobbiamo scoprire cosa sia.",
                    "a_bad_feeling.objective_0": "Trova e perquisisci qualsiasi sonda ARC o corriere ARC",
                    "the_right_tool.name": "Lo Strumento Giusto",
                    "the_right_tool.description": "Sei uno dei nuovi arrivati, giusto? Mi serve un volontario per provare questo Ferro potenziato  dovrebbe tagliare le armature ARC come il burro. Fai qualche buco in un paio di macchine e poi torna a riferire.",
                    "the_right_tool.objective_0": "Distruggi un Fireball",
                    "the_right_tool.objective_1": "Distruggi un Hornet",
                    "the_right_tool.objective_2": "Distruggi una torretta",
                    "hatch_repairs.name": "Riparazioni Botola",
                    "hatch_repairs.description": "Le nostre ricognizioni hanno segnalato diverse botole dei Predoni con tubi idraulici che perdono. Funzionano ancora, ma non per molto. Ti dispiacerebbe ripararne una la prossima volta che sei là fuori?",
                    "hatch_repairs.objective_0": "Ripara i tubi idraulici che perdono vicino a una botola dei Predoni",
                    "safe_passage.name": "Passaggio Sicuro",
                    "safe_passage.description": "Ho sentito voci su un segnale che Shani ha intercettato. L'ARC si adatta costantemente, e sono sicuro che questo non sarà il loro ultimo avvertimento. Beh, se vogliono una corsa agli armamenti, l'avranno.",
                    "safe_passage.objective_0": "Distruggi 2 nemici ARC usando qualsiasi granata esplosiva",
                    "down_to_earth.name": "Terra-Terra",
                    "down_to_earth.description": "I Raider hanno segnalato da tempo strane casse che cadono dalle sonde ARC malfunzionanti. Se riuscissimo a trovare un modo per aprirle, potremmo capire meglio cosa stanno cercando.",
                    "down_to_earth.objective_0": "Visita un deposito sul campo",
                    "down_to_earth.objective_1": "Consegna una cassa da campo alla stazione di rifornimento",
                    "down_to_earth.objective_2": "Raccogli la ricompensa",
                    "the_trifecta.name": "La Tripletta",
                    "the_trifecta.description": "Le informazioni vanno bene, ma ci portano solo fino a un certo punto. Se ARC si sta davvero avvicinando, ho bisogno che ogni Raider dimostri di saper gestire i loro droni in combattimento.",
                    "the_trifecta.objective_0": "Distruggi 2 Wasp",
                    "the_trifecta.objective_1": "Ottieni 2 Wasp Driver per Shani",
                    "the_trifecta.objective_2": "Distruggi 2 Hornet",
                    "the_trifecta.objective_3": "Ottieni 2 Hornet Driver per Shani",
                    "the_trifecta.objective_4": "Distruggi 2 Snitch",
                    "the_trifecta.objective_5": "Ottieni 2 Snitch Scanner per Shani",
                    "a_better_use.name": "Un Uso Migliore",
                    "a_better_use.description": "Siamo a corto di tutto tranne che di bocche da sfamare, eppure Celeste lancia rifornimenti preziosi in aria perché i Raider se li contendano. Ho finito di lasciare che la roba buona vada sprecata.",
                    "a_better_use.objective_0": "Richiedi un lancio di rifornimenti da una stazione di chiamata",
                    "a_better_use.objective_1": "Saccheggia un lancio di rifornimenti",
                    "what_goes_around.name": "Chi la Fa l'Aspetti",
                    "what_goes_around.description": "Non possiamo costruire tecnologia ARC da zero, ma c'è molto che posso armeggiare con i pezzi che recuperi. Sto attualmente cercando di riutilizzare diverse parti ARC. Ti dispiacerebbe fare alcuni esperimenti per me?",
                    "what_goes_around.objective_0": "Distruggi qualsiasi nemico ARC usando un lanciafiamme Fireball",
                    "sparks_fly.name": "Volano Scintille",
                    "sparks_fly.description": "Quelle punture di Hornet possono davvero rovinarti, se sei sfortunato. E anche se ne distruggi uno, stai comunque sprecando un sacco di munizioni. Ho lavorato a un modo più elegante per abbatterli. Ti va di far volare qualche scintilla?",
                    "sparks_fly.objective_0": "Distruggi un Hornet con una Trigger 'Nade o Snap Blast",
                    "greasing_her_palms.name": "Ungerle le Mani",
                    "greasing_her_palms.description": "Recentemente, ho provato senza successo a convincere Tian Wen a unirsi ai nostri progetti comunitari. Potrei dover addolcire l'accordo. Si è lamentata della qualità del recupero trovato sul mercato; pensi che potremmo farle un favore?",
                    "greasing_her_palms.objective_0": "Su Dam Battlegrounds, visita la stanza chiusa nell'edificio di controllo del trattamento dell'acqua",
                    "greasing_her_palms.objective_1": "Su Spaceport, esamina i propulsori del razzo fuori dall'assemblaggio del razzo",
                    "greasing_her_palms.objective_2": "Su Buried City, visita l'area barricata al piano 6 dell'edificio dei viaggi spaziali",
                    "a_first_foothold.name": "Un Primo Appoggio",
                    "a_first_foothold.description": "Abbiamo appena finito di espandere la rete dei Tubi verso il Cancello Blu, e stiamo ancora lavorando al resto. Il mio equipaggio ha costruito nuove infrastrutture intorno alla valle per proteggere i nostri Raiders, ma la costante minaccia dell'ARC ha reso difficile portare a termine qualsiasi cosa.",
                    "a_first_foothold.objective_0": "Stabilizza la piattaforma di osservazione vicino al crinale",
                    "a_first_foothold.objective_1": "Attiva il terminale di comunicazione vicino all'uliveto",
                    "a_first_foothold.objective_2": "Ruota le parabole satellitari sul tetto della chiesa, a nord del caveau dati",
                    "a_first_foothold.objective_3": "Inchioda le lastre del tetto sulla struttura Raider vicino alla radura del cacciatore",
                    "dormant_barons.name": "Baroni Dormienti",
                    "dormant_barons.description": "Durante la Prima ondata, i Baroni hanno causato più danni di tutte le altre macchine messe insieme. Ora sono solo carcasse vuote, fermi dove sono caduti... ma i loro circuiti interni potrebbero contenere la chiave per fermare l'ARC. Aprine uno e portami ciò che trovi.",
                    "dormant_barons.objective_0": "Saccheggia un guscio di Barone",
                    "mixed_signals.name": "Segnali Ambigui",
                    "mixed_signals.description": "Hai avvistato qualche Supervisore, quelli grandi e rotondi? Sembra che stiano trasmettendo dati in orbita e non posso fare a meno di pensare che siano legati al segnale che abbiamo rilevato. Vuoi aprirne uno, cosi possiamo provare a decifrare i dati?",
                    "mixed_signals.objective_0": "Distruggi un supervisore ARC",
                    "mixed_signals.objective_1": "Ottieni 1 cassaforte del supervisore",
                    "what_we_left_behind.name": "Cosa ci siamo lasciati alle spalle",
                    "what_we_left_behind.description": "Celeste mi ha detto che l'hai aiutata a perseguitarmi perché partecipi di più. Lo dirò una volta sola: non apprezzo l'intromissione e ho le mie ragioni per rifiutare. Tuttavia, apprezzo i rottami. Visto che a quanto pare sei abile a trovarli, potrei avere un compito per te.",
                    "what_we_left_behind.objective_0": "Nella Città sepolta, ispeziona 2 contenitori nell'accampamento Raider sotto il parcheggio",
                    "what_we_left_behind.objective_1": "Nel campo di battaglia della Diga, cerca qualsiasi cosa di rilevante nell'avamposto palude sud",
                    "what_we_left_behind.objective_2": "Allo Spazioporto, cerca qualsiasi cosa di rilevante nel nascondiglio di Bilguun, vicino all'area di stoccaggio",
                    "doctors_orders.name": "Ordini del Medico",
                    "doctors_orders.description": "Senti, novellino: se vuoi che ti curi, faresti meglio a dimostrare che quegli arti preziosi tuoi valgono la pena di essere bendati.",
                    "doctors_orders.objective_0": "Ottieni 1 siringa",
                    "doctors_orders.objective_1": "Ottieni 2 antisettici",
                    "doctors_orders.objective_2": "Ottieni 1 tessuto resistente",
                    "doctors_orders.objective_3": "Ottieni 1 verbasco",
                    "medical_merchandise.name": "Merce Medica",
                    "medical_merchandise.description": "Sono diventato piuttosto abile nel tessere bende dal tessuto, ma con mia vergogna, non ho ancora imparato a tessere una macchina a raggi X o un pulsossimetro.",
                    "medical_merchandise.objective_0": "Allo Spazioporto, ispeziona 2 contenitori nella sala per esami medici dell'Edificio partenze",
                    "medical_merchandise.objective_1": "Ispeziona 3 contenitori nell'ospedale della Città sepolta",
                    "medical_merchandise.objective_2": "Nel campo di battaglia della Diga, ispeziona 2 contenitori nella sala medica dell'edificio di ricerca e amministrazione",
                    "a_reveal_in_ruins.name": "Una Rivelazione in Rovina",
                    "a_reveal_in_ruins.description": "Ho messo le mani su un nuovo e sofisticato analizzatore ESR; avevo pianificato una grande rivelazione. Un minuto è qui, il minuto dopo-puf. Mi aiuti?",
                    "a_reveal_in_ruins.objective_0": "Cerca un Analizzatore ESR dentro qualsiasi farmacia della Città sepolta",
                    "a_reveal_in_ruins.objective_1": "Consegna l'Analizzatore VES a Lance",
                    "broken_monument.name": "Monumento Spezzato",
                    "broken_monument.description": "Ho un altro sito speciale che devi perquisire per me. Un vecchio campo di battaglia, della Prima Ondata. I Raider oggi di solito ripuliscono posti come quello, nonostante l'importanza che un tempo avevano. La gente dimentica in fretta. Più in fretta di quanto dovrebbe.",
                    "broken_monument.objective_0": "Raggiungi il terreno sacro presso il deposito di rottami",
                    "broken_monument.objective_1": "Cerca una bussola vicino ai veicoli in panne",
                    "broken_monument.objective_2": "Cerca la videocassetta vicino ai container cilindrici",
                    "broken_monument.objective_3": "Cerca le vecchie razioni da campo nell'accampamento Raider",
                    "broken_monument.objective_4": "Consegna il nastro della Prima Ondata a Tian Wen",
                    "broken_monument.objective_5": "Consegna la bussola della Prima Ondata a Tian Wen",
                    "broken_monument.objective_6": "Consegna le razioni della Prima Ondata a Tian Wen",
                    "marked_for_death.name": "Marcato per la Morte",
                    "marked_for_death.description": "Qualcuno sta rubando rifornimenti dal mio punto di consegna a Città Sepolta. Ho preparato una trappola, ma ho bisogno che qualcuno la controlli per me.",
                    "marked_for_death.objective_0": "Raggiungi i magazzini Su Durante nella periferia di Città Sepolta",
                    "marked_for_death.objective_1": "Cerca il nascondiglio di Tian Wen vicino ai magazzini",
                    "marked_for_death.objective_2": "Segui gli indizi",
                    "straight_record.name": "Record Corretto",
                    "straight_record.description": "Durante la First Wave, la mia squadra ed io costruimmo una trappola vicino alla diga. Sovraccaricammo un generatore e lo trasformammo in una trappola ARC improvvisata. Ora sento dire che i Raiders la stanno usando per interrompere le comunicazioni e tendere imboscate a vicenda. Ho bisogno che tu ci metta fine.",
                    "straight_record.objective_0": "Raggiungi Victory Ridge",
                    "straight_record.objective_1": "Trova la vecchia trappola EMP",
                    "straight_record.objective_2": "Disattiva il primo interruttore di alimentazione",
                    "straight_record.objective_3": "Disattiva il secondo interruttore di alimentazione",
                    "straight_record.objective_4": "Disattiva il terzo interruttore di alimentazione",
                    "straight_record.objective_5": "Spegni la trappola EMP",
                    "a_lay_of_the_land.name": "Una Conoscenza del Territorio",
                    "a_lay_of_the_land.description": "Quei rombi lontani stanno diventando meno lontani ogni giorno che passa. Ho una pista su alcuni scanner LiDAR che potrebbero aiutarci a monitorare i tremori. Vuoi mantenere un tetto sopra la testa, vero?",
                    "a_lay_of_the_land.objective_0": "Raggiungi il magazzino di Jiangsu",
                    "a_lay_of_the_land.objective_1": "Trova le note di spedizione nell'ufficio del caposquadra",
                    "a_lay_of_the_land.objective_2": "Individua gli scanner al piano superiore della torre di controllo A6",
                    "a_lay_of_the_land.objective_3": "Consegna 1 scanner LiDAR a Shani",
                    "market_correction.name": "Correzione di Mercato",
                    "market_correction.description": "Quel furto di prima? Non sembra più una coincidenza. Parte della concorrenza da Toledo si sta stabilendo dove non dovrebbe. Voglio che il loro nascondiglio venga sabotato, preferibilmente prima che si mettano troppo comodi.",
                    "market_correction.objective_0": "Localizza il nascondiglio vicino alla stazione Marano",
                    "market_correction.objective_1": "Sabota la cache",
                    "keeping_the_memory.name": "Conservare la Memoria",
                    "keeping_the_memory.description": "Ho perso un po' la calma quando ti ho mandato dietro quella trappola. Di solito non perdo le staffe, ma la First Wave... Abbiamo passato molto, allora. Perso molte persone. È ancora una ferita aperta per me, ma voglio che tu capisca.",
                    "keeping_the_memory.objective_0": "Raggiungi il relitto nelle Formicai Hills",
                    "keeping_the_memory.objective_1": "Cerca l'elmo mancante",
                    "keeping_the_memory.objective_2": "Riporta l'elmo al memoriale",
                    "reduced_to_rubble.name": "Ridotto in Macerie",
                    "reduced_to_rubble.description": "Quell'autostrada crollata mi preoccupa; sembra essere recente. Gran parte di Topside può essere in rovina, ma la maggior parte risale a molto tempo fa.",
                    "reduced_to_rubble.objective_0": "Scatta una foto dell'autostrada crollata",
                    "reduced_to_rubble.objective_1": "Vai alla Terra spezzata",
                    "reduced_to_rubble.objective_2": "Segui la scia di distruzione attraverso la Terra spezzata",
                    "reduced_to_rubble.objective_3": "Indaga sulle macchine ARC sconosciute",
                    "with_a_trace.name": "Con una Traccia",
                    "with_a_trace.description": "Quella macchina abbattuta... Non siamo stati noi. Sappiamo che c'è qualche sopravvissuto là fuori, ma una roba del genere? Non può essere stata causata da una sola persona.",
                    "with_a_trace.objective_0": "Raggiungi la radura brulla",
                    "with_a_trace.objective_1": "Trova segni di chi ha abbattuto le macchine ARC",
                    "with_a_trace.objective_2": "Ispeziona il relitto adornato",
                    "with_a_trace.objective_3": "Ispeziona il dispositivo di comunicazione",
                    "eyes_on_the_prize.name": "Occhi sul Premio",
                    "eyes_on_the_prize.description": "Tutto è stato tranquillo nei miei punti di consegna da quando hai aiutato, ma questo non significa che rimarrà così a lungo. Ho installato una sorveglianza in uno dei miei posti più usati a Buried City, per prevenire future manomissioni. L'unico problema è che ha bisogno di energia per attivarsi.",
                    "eyes_on_the_prize.objective_0": "Trova la terrazza sul tetto isolata a sud-ovest della Southern Station, cerca teloni blu",
                    "eyes_on_the_prize.objective_1": "Ricabla il pannello solare usando 3 cavi",
                    "echoes_of_victory_ridge.name": "Echi di Victory Ridge",
                    "echoes_of_victory_ridge.description": "Hai sentito tremori la notte scorsa? Nemmeno io. Ma a quanto pare il terreno si è spostato ad un certo punto, e nel processo ha portato alla luce un vecchio avamposto della First Wave che era stato bloccato dai detriti. Vorrei che entrassi lì velocemente, prima che lo faccia qualcun altro.",
                    "echoes_of_victory_ridge.objective_0": "Raggiungi Victory Ridge",
                    "echoes_of_victory_ridge.objective_1": "Recupera i piani di battaglia dal nascondiglio sotto l'autostrada rotta",
                    "echoes_of_victory_ridge.objective_2": "Consegna la toppa del Maggiore Alva a Celeste",
                    "industrial_espionage.name": "Spionaggio Industriale",
                    "industrial_espionage.description": "Con i miei nascondigli al sicuro, penso che sia ora di tenere d'occhio più da vicino la concorrenza così questo non succede di nuovo.",
                    "industrial_espionage.objective_0": "Trova la scorta di armi di Tian Wen vicino alla stazione di servizio negli Outskirts",
                    "industrial_espionage.objective_1": "Consegna la Burletta alla scorta di armi rivale",
                    "industrial_espionage.objective_2": "Piazza una cimice nella scorta di armi",
                    "unexpected_initiative.name": "Iniziativa Inaspettata",
                    "unexpected_initiative.description": "Sto allestendo una serra per aumentare la nostra produzione alimentare. Sto facendo un favore a Celeste, va bene? È tutto. Ma basta parlarne. Ho tutti i dettagli sistemati, ma avrò bisogno di rifornimenti e non li trasporterò da solo.",
                    "unexpected_initiative.objective_0": "Raggiungi gli Appartamenti Grandioso in Buried City",
                    "unexpected_initiative.objective_1": "Cerca fertilizzante sul tetto degli Appartamenti Grandioso",
                    "unexpected_initiative.objective_2": "Raggiungi Piazza Roma in Buried City",
                    "unexpected_initiative.objective_3": "Cerca una pompa dell'acqua nei giardini pensili distrutti di Piazza Roma",
                    "unexpected_initiative.objective_4": "Consegna una pompa dell'acqua a Tian Wen",
                    "unexpected_initiative.objective_5": "Consegna fertilizzante a Tian Wen",
                    "a_symbol_of_unification.name": "Un Simbolo di Unificazione",
                    "a_symbol_of_unification.description": "Sai, ai vecchi tempi avevamo davvero una bandiera - beh, più uno straccio che altro. Comunque, vederla significava che sapevi di avere alleati nelle vicinanze, che eri sul tuo territorio. Quindi, stavo pensando...",
                    "a_symbol_of_unification.objective_0": "Raggiungi l'avamposto Formicai in Dam Battlegrounds",
                    "a_symbol_of_unification.objective_1": "Individua la bandiera all'avamposto Formicai",
                    "a_symbol_of_unification.objective_2": "Issa la bandiera sulla piccola piattaforma che domina il Lago Rosso",
                    "celestes_journals.name": "I Diari di Celeste",
                    "celestes_journals.description": "Ok, questa è imbarazzante... Ho perso due dei miei diari durante alcune ispezioni agli avamposti l'ultima volta che sono andata in superficie. Potresti andare là fuori e cercare di ritrovarli prima che qualcun altro ci inciampi sopra?",
                    "celestes_journals.objective_0": "Recupera i diari di Celeste dall'avamposto della palude sud",
                    "celestes_journals.objective_1": "Recupera i diari di Celeste dall'avamposto settentrionale che domina i Laghi Rossi",
                    "celestes_journals.objective_2": "Consegna 2 diari a Celeste",
                    "back_on_top.name": "Di Nuovo in Cima",
                    "back_on_top.description": "Indovina un po'? Shani mi ha chiesto di aiutarla con qualcosa, e per una volta sono davvero contento che l'abbia fatto. Stiamo allestendo nuovi avamposti in superficie! O almeno stiamo pianificando di farlo. Ci credi?",
                    "back_on_top.objective_0": "Su Dam Battlegrounds, segna la Casa dei Motivi",
                    "back_on_top.objective_1": "Su The Blue Gate, segna la torre di avvistamento bianca a sud del Complesso di Magazzini",
                    "back_on_top.objective_2": "Su Spaceport, segna la Torre della Trincea Sud",
                    "back_on_top.objective_3": "Su Buried City, segna l'edificio con il murale nelle Proprietà Sepolte",
                    "the_majors_footlocker.name": "L'Armadietto del Maggiore",
                    "the_majors_footlocker.description": "Ho un altro lavoro. Riguarda... mia madre. Quei siti della Prima Ondata dove ti ho mandato prima? In realtà speravo che trovassi qualcosa di mia madre. Ha combattuto nella resistenza dei Raider. Era un tiro al buio; ma ora ho una pista concreta.",
                    "the_majors_footlocker.objective_0": "Cerca i ricordi del maggiore Aiva negli appartamenti a nordovest della diga",
                    "the_majors_footlocker.objective_1": "Consegna i ricordi del maggiore Aiva a Tian Wen",
                    "out_of_the_shadows.name": "Fuori dalle Ombre",
                    "out_of_the_shadows.description": "Hai visto le bandiere? Il tempo di nascondersi è finito. Sei stato più che testato in battaglia, da quello che sento; pensi di poter affrontare un Rocketeer?",
                    "out_of_the_shadows.objective_0": "Distruggi un Rocketeer",
                    "out_of_the_shadows.objective_1": "Ottieni un driver Rocketeer",
                    "eyes_in_the_sky.name": "Occhi nel Cielo",
                    "eyes_in_the_sky.description": "Richiede una zipline per arrivare in cima alla torre. Quegli scanner LiDAR che hai trovato funzionano meglio quando vengono posizionati in luoghi elevati. Ho identificato alcuni buoni punti intorno alla cintura della ruggine; spero tu abbia il passo sicuro.",
                    "eyes_in_the_sky.objective_0": "Sul campo di battaglia della diga, installa uno scanner LiDAR in cima alla torre di controllo",
                    "eyes_in_the_sky.objective_1": "Allo spazioporto, installa uno scanner LiDAR alla torre delle comunicazioni",
                    "eyes_in_the_sky.objective_2": "Nella città sepolta, installa uno scanner LiDAR in cima all'insegna della Galleria",
                    "our_presence_up_there.name": "La Nostra Presenza Lassù",
                    "our_presence_up_there.description": "ARC potrebbe cambiare, ma finalmente stiamo cambiando con esso. Finiamo quegli avamposti e rivoluzionamo il modo in cui li tracciamo, li aggiriamo e li facciamo a pezzi.",
                    "our_presence_up_there.objective_0": "Visita la Casa dei Motivi in The Dam",
                    "our_presence_up_there.objective_1": "Trova e interagisci con l'interruttore di alimentazione",
                    "our_presence_up_there.objective_2": "Completa l'installazione dell'antenna sul tetto",
                    "communication_hideout.name": "Rifugio delle Comunicazioni",
                    "communication_hideout.description": "Stiamo perdendo segnali in alcune aree della Città Sepolta-immagino che la nostra attrezzatura stia dando problemi. Sei piuttosto abile con le riparazioni, vero? Potresti dare un'occhiata?",
                    "communication_hideout.objective_0": "Raggiungi la Torre Rossa nella Città Vecchia",
                    "communication_hideout.objective_1": "Trova la cella della batteria mancante",
                    "communication_hideout.objective_2": "Installa la cella della batteria nel generatore",
                    "communication_hideout.objective_3": "Attiva l'alimentazione del generatore",
                    "communication_hideout.objective_4": "Avvia il terminale dell'antenna vicino alla Torre Rossa",
                    "after_rain_comes.name": "Dopo la Pioggia Arriva",
                    "after_rain_comes.description": "Lo so, lo so! La corrente è saltata nel settore- Oh, ehi. Un'alluvione improvvisa ha distrutto alcuni dei nostri pannelli solari nella città sepolta, e i generatori reggono solo per un certo tempo. Facci un favore quando sei lassù, OK?",
                    "after_rain_comes.objective_0": "Trova i pannelli solari allagati vicino agli appartamenti Grandioso",
                    "after_rain_comes.objective_1": "Ripara i pannelli solari usando 5 fili e 2 batterie",
                    "a_balanced_harvest.name": "Un Raccolto Equilibrato",
                    "a_balanced_harvest.description": "La nostra produzione alimentare è finalmente sufficiente per soddisfare i nostri bisogni di base, ma ciò di cui abbiamo davvero bisogno ora è varietà. Ho una pista su una ricerca agricola di prima della Prima Ondata. Ci stai?",
                    "a_balanced_harvest.objective_0": "Vai all'edificio di Ricerca e Amministrazione",
                    "a_balanced_harvest.objective_1": "Individua il Laboratorio 1 al piano superiore sopra la reception",
                    "a_balanced_harvest.objective_2": "Cerca eventuali tracce del progetto agricolo",
                    "untended_garden.name": "Giardino Non Curato",
                    "untended_garden.description": "Secondo i file che hai trovato nel laboratorio, i ricercatori di coltivazione erano in realtà quelli che hanno installato le cupole idroponiche nella palude. Sembra il posto più ovvio dove cercare dopo, non credi?",
                    "untended_garden.objective_0": "Vai al Complesso di Cupole Idroponiche",
                    "untended_garden.objective_1": "Accedi all'archivio dati in una delle cupole",
                    "untended_garden.objective_2": "Carica i dati sul terminale del computer in un qualsiasi deposito da campo",
                    "the_root_of_the_matter.name": "La Radice della Questione",
                    "the_root_of_the_matter.description": "Siamo fortunati. Le note che hai trovato l'ultima volta sono state scritte dalla ricercatrice principale. Quando il progetto è andato a rotoli, sembra che abbia preso alcuni campioni di semi e li abbia sigillati in un luogo sicuro.",
                    "the_root_of_the_matter.objective_0": "Vai all'Edificio di Ricerca",
                    "the_root_of_the_matter.objective_1": 'Cerca il caveau dei semi nella "stanza con una bella vista"',
                    "the_root_of_the_matter.objective_2": "Consegna il campione di semi sperimentale a Celeste",
                    "water_troubles.name": "Problemi d'Acqua",
                    "water_troubles.description": "Se sei qui per lamentarti dell'acqua, unisciti al club. Ho ricevuto lamentele tutto il giorno. C'è decisamente qualcosa che non va, e ho bisogno di aiuto per sistemare la cosa.",
                    "water_troubles.objective_0": "Individua il Tunnel di Accesso alle Inondazioni sotto il Balcone del Lago Rosso",
                    "water_troubles.objective_1": "Trova l'ingresso della Fornitura Idrica del Distretto",
                    "water_troubles.objective_2": "Preleva un campione d'acqua",
                    "into_the_fray.name": "Nella Mischia",
                    "into_the_fray.description": "Era il loro mondo, lassù. Nessuno a contestare il loro dominio. Eppure eccoci qui. Più avamposti. Più informazioni. Più potenza di fuoco. Se non sapessi meglio, direi che abbiamo ancora parecchia voglia di combattere.",
                    "into_the_fray.objective_0": "Distruggi un Saltatore",
                    "into_the_fray.objective_1": "Ottieni un'unità a impulsi del Saltatore",
                    "source_of_the_contamination.name": "Fonte della Contaminazione",
                    "source_of_the_contamination.description": "Non sto dicendo che la nostra acqua sia stata manomessa, ma in base ai tuoi campioni, non posso nemmeno escludere questa possibilità. Potresti tornare alla Diga e vedere cosa c'è che non va?",
                    "source_of_the_contamination.objective_0": "Raggiungi l'edificio di trattamento dell'acqua nella Diga",
                    "source_of_the_contamination.objective_1": "Cerca l'ingresso di scarico delle inondazioni vicino alla Palude",
                    "source_of_the_contamination.objective_2": "Indaga su qualsiasi oggetto sospetto",
                    "switching_the_supply.name": "Cambiare il Rifornimento",
                    "switching_the_supply.description": "C'è un serbatoio sotto lo Spazioporto; se riusciamo a deviare quell'acqua qui, dovrebbe darci il tempo di occuparci della contaminazione.",
                    "switching_the_supply.objective_0": "Trova i tunnel sotto lo Spazioporto",
                    "switching_the_supply.objective_1": "Trova e gira la valvola nei tunnel sotto lo Spazioporto",
                    "a_warm_place_to_rest.name": "Un Posto Caldo per Riposare",
                    "a_warm_place_to_rest.description": "Un mio cliente ha visto una famiglia rifugiarsi in un vecchio accampamento nella Città Sepolta. Pagherò chiunque riesca a trovarli e a scortarli in un luogo sicuro.",
                    "a_warm_place_to_rest.objective_0": "Individua l'accampamento abbandonato dell'autostrada",
                    "a_warm_place_to_rest.objective_1": "Cerca segni di sopravvissuti",
                    "a_warm_place_to_rest.objective_2": "Segui i marcatori rossi",
                    "a_warm_place_to_rest.objective_3": "Ispeziona la tomba",
                    "prescriptions_of_the_past.name": "Prescrizioni del Passato",
                    "prescriptions_of_the_past.description": "Sono curioso dell'area medica nello Spazioporto da un po' di tempo ormai. Qualcosa mi dice che ha proprio ciò di cui ho bisogno per diventare il campione indiscusso di questo posto.",
                    "prescriptions_of_the_past.objective_0": "Visita l'edificio delle partenze nello Spazioporto",
                    "prescriptions_of_the_past.objective_1": "Trova la sala visite mediche all'interno dell'edificio delle partenze",
                    "prescriptions_of_the_past.objective_2": "Cerca i registri",
                    "power_out.name": "Blackout",
                    "power_out.description": "Questa è più che sfortuna. Qualcosa – o qualcuno – ha messo fuori uso alcune delle nostre sottostazioni elettriche. L'ingegnere che ho mandato a ripararlo non è tornato, quindi ho bisogno di tutti i Raider disponibili per indagare. Questo include te.",
                    "power_out.objective_0": "Trova la sottostazione elettrica a sud dello spazioporto, vicino al checkpoint",
                    "power_out.objective_1": "Trova qualsiasi traccia dell'ingegnere scomparso",
                    "power_out.objective_2": "Porta il fusibile/batteria alla sottostazione elettrica",
                    "power_out.objective_3": "Attiva l'interruttore di alimentazione sulla scatola dei fusibili",
                    "lost_in_transmission.name": "Persi nella Trasmissione",
                    "lost_in_transmission.description": "Ho installato delle attrezzature allo spazioporto per monitorare i movimenti di ARC. La mia connessione si è appena interrotta - ho bisogno che tu vada alle torri di controllo e mi aiuti a recuperare i miei registri.",
                    "lost_in_transmission.objective_0": "Visita la torre di controllo A6",
                    "lost_in_transmission.objective_1": "Raggiungi la cima della torre di controllo A6",
                    "lost_in_transmission.objective_2": "Stabilisci una connessione dal terminale",
                    "flickering_threat.name": "Minaccia Tremolante",
                    "flickering_threat.description": "Il mio ingegnere abituale sta ancora guarendo dalle ferite ed è stato confuso per giorni. Non possiamo permetterci di essere a metà rete finché non guarisce; ho bisogno di qualcuno che prenda in mano la sua chiave inglese nel frattempo.",
                    "flickering_threat.objective_0": "Trova la sala generatori",
                    "flickering_threat.objective_1": "Ripara il generatore",
                    "flickering_threat.objective_2": "Trova il condotto di ventilazione",
                    "flickering_threat.objective_3": "Attiva l'alimentazione tramite l'interruttore sotto le scale",
                    "bees.name": "Api!",
                    "bees.description": "Api! Ci sono ancora api in giro! Anche se non sono un esperto, il nostro team della serra ne vuole disperatamente.",
                    "bees.objective_0": "Raggiungi l'uliveto a Blue Gate",
                    "bees.objective_1": "Cerca alveari intorno all'uliveto",
                    "espresso.name": "Caffè Espresso",
                    "espresso.description": "Un Raider è venuto nel mio negozio prima per scambiare delle granate con una macchina che ha trovato nella Città Sepolta. Ha detto che fa il caffè, ma sembra mancare qualche pezzo. Ti va un lavoro?",
                    "espresso.objective_0": "Trova una macchina per espresso da recuperare per pezzi di ricambio",
                    "espresso.objective_1": "Procura i pezzi della macchina per espresso per Apollo",
                    "life_of_a_pharmacist.name": "Vita di un Farmacista",
                    "life_of_a_pharmacist.description": "Questo posto avrebbe bisogno di una ristrutturazione, ma non voglio che sembri le vostre squallide tane dei Raider. Vedi se riesci a scoprire come vivevano i miei colleghi medici.",
                    "life_of_a_pharmacist.objective_0": "Trova l'Arbusto Farmacia vicino all'autostrada crollata",
                    "life_of_a_pharmacist.objective_1": "Documenta gli hobby del farmacista",
                    "life_of_a_pharmacist.objective_2": "Documenta la famiglia del farmacista",
                    "life_of_a_pharmacist.objective_3": "Documenta i gusti del farmacista",
                    "life_of_a_pharmacist.objective_4": "Documenta le abilità del farmacista",
                    "tribute_to_toledo.name": "Tributo a Toledo",
                    "tribute_to_toledo.description": "L'Official Toledo Tubes Management sta richiedendo una delle nostre Barre di Energia per l'utilizzo dei \"loro\" tubi Slingshot. Non lasciarti ingannare dal nome, non sono affatto ufficiali; solo teppisti con molto potere. Potresti aiutarmi con questo?",
                    "tribute_to_toledo.objective_0": "Procura una Barra di Energia per Celeste",
                    "digging_up_dirt.name": "Scavare per Informazioni",
                    "digging_up_dirt.description": "Abbiamo avuto una svolta. Uno dei nostri esploratori ha visto un membro del Tubes Management fare una consegna morta nelle Case Santa Maria nella Città Sepolta. Questa potrebbe essere la nostra occasione per scavare dello sporco su di loro per una volta. Ci stai?",
                    "digging_up_dirt.objective_0": "Localizza le Case Santa Maria nella Città Vecchia",
                    "digging_up_dirt.objective_1": "Localizza la consegna morta nel cortile",
                    "turnabout.name": "Capovolgimento",
                    "turnabout.description": "Ho un piano. Se recuperiamo le prove contro l'OTTM prima che ci arrivino loro, potremmo toglierceli di dosso una volta per tutte.",
                    "turnabout.objective_0": "Vai alla Torre della Trincea Nord",
                    "turnabout.objective_1": "Localizza e carica i file di ricatto a Celeste",
                    "building_a_library.name": "Costruire una Biblioteca",
                    "building_a_library.description": "La nostra selezione di biblioteca è diventata piuttosto stantia. Potresti andare alla Città Sepolta e trovare qualcosa in più da leggere per noi? Assicurati di portare qualcosa per tutti.",
                    "building_a_library.objective_0": "Localizza la Biblioteca nel Centro Città",
                    "building_a_library.objective_1": "Trova 1 libro romantico",
                    "building_a_library.objective_2": "Trova 1 libro giallo",
                    "building_a_library.objective_3": "Trova 1 libro d'avventura",
                    "building_a_library.objective_4": "Consegna 3 libri ad Apollo",
                    "a_new_type_of_plant.name": "Un Nuovo Tipo di Pianta",
                    "a_new_type_of_plant.description": "Alcuni esploratori hanno riportato segnalazioni di queste strane piante che si stanno diffondendo nell'area. Ora, questo fa pensare al tuo vecchio amico Lance che potrebbe avere degli usi interessanti.",
                    "a_new_type_of_plant.objective_0": "Cerca la nuova pianta vicino al Guscio del Barone nel Vecchio Campo di Battaglia",
                    "a_new_type_of_plant.objective_1": "Consegna la Pianta Possibilmente Tossica a Lance",
                    "armored_transports.name": "Trasporti Corazzati",
                    "armored_transports.description": "Da quando abbiamo espanso i tunnel verso il Cancello Blu, alcuni pezzi rari hanno iniziato ad apparire sul mercato nero.\n\nNel frattempo, sono bloccato qui a vendere vecchi Rattler malridotti. Se non trovo nuove linee di rifornimento, resterò indietro.",
                    "armored_transports.objective_0": "Raggiungi il checkpoint",
                    "armored_transports.objective_1": "Cerca nelle guardiole una tessera chiave della pattuglia corazzata",
                    "armored_transports.objective_2": "Raggiungi il tunnel del traffico vicino al checkpoint del Cancello Blu",
                    "armored_transports.objective_3": "Trova e sblocca la porta posteriore di un'auto di pattuglia corazzata",
                    "in_my_image.name": "A Mia Immagine",
                    "in_my_image.description": "Ho appena curato una delle prime Raiders che ha visitato Stella Montis, e ha detto che ha visto... altri. Androidi, molto simili a me.",
                    "in_my_image.objective_0": "Schierati a Stella Montis",
                    "in_my_image.objective_1": "Trova e perquisisci 3 androidi",
                    "cold_storage.name": "Conservazione Frigorifera",
                    "cold_storage.description": "I rapporti su Stella Montis continuano ad arrivare, ed è qualcosa di diverso da tutto ciò che abbiamo visto finora. Là dentro potrebbero esserci registri o reliquie del passato e, se è così, li voglio.",
                    "cold_storage.objective_0": "In un singolo raid, perquisisci un qualsiasi container di J Kozma Ventures",
                    "cold_storage.objective_1": "In un singolo raid, consegna i Libri Rari a Shani",
                    "snap_and_salvage.name": "Scatta e Recupera",
                    "snap_and_salvage.description": "Tutta Speranza parla di Stella Montis in questo momento, e devo ammettere che ha catturato la mia attenzione. Lascia che gli altri si occupino del cosa e del come; a me interessa la tecnologia lì dentro.",
                    "snap_and_salvage.objective_0": "Scatta una foto a uno dei rover nell'area Sandbox",
                    "snap_and_salvage.objective_1": "Perquisisci i documenti nella sala del posto di sicurezza accanto alla hall",
                    "snap_and_salvage.objective_2": "Consegna un magnetron a Tian Wen",
                    "snap_and_salvage.objective_3": "Consegna un regolatore di flusso a Tian Wen",
                    "the_clean_dream.name": "Il Sogno Pulito",
                    "the_clean_dream.description": "Sai cosa ho sognato ultimamente? Un distillatore d'acqua parlante! Pazzesco, vero? Ma sul serio, con composti più puri potrei fare esplosivi con più potenza! Sarebbe qualcosa, no?",
                    "the_clean_dream.objective_0": "Allo Spazioporto, cerca in 4 container nei tunnel sotterranei",
                    "the_clean_dream.objective_1": "Trova e monitora qualsiasi sistema di filtrazione nei tunnel",
                    "the_clean_dream.objective_2": "A Blue Gate, visita il bunker di manutenzione",
                    "the_clean_dream.objective_3": "Monitora il sistema di purificazione nel bunker",
                    "the_clean_dream.objective_4": "Trova e fotografa i progetti nel bunker",
                    "a_toxic_trail.name": "Una Scia Tossica",
                    "a_toxic_trail.description": "Abbiamo di nuovo acqua pulita, ma non possiamo rischiare che la gente si ammali se i sabotatori tornano. Dobbiamo sradicarli una volta per tutte.",
                    "a_toxic_trail.objective_0": "Torna alla presa d'acqua sotto l'edificio di Controllo Trattamento Acque",
                    "a_toxic_trail.objective_1": "Perlustra la palude alla ricerca di tracce dell'origine del barile",
                    "a_toxic_trail.objective_2": "Scatta una foto del camion dei barili",
                    "a_toxic_trail.objective_3": "Perquisisci il camion alla ricerca di indizi sull'identità del sabotatore.",
                    "paving_the_way.name": "Aprendo la Strada",
                    "paving_the_way.description": "Per far crollare un intero settore così... Non c'è da stupirsi che la gente abbia paura. Dobbiamo rinforzare oltre qualsiasi cosa abbiamo fatto prima, e non possiamo farlo da soli.",
                    "paving_the_way.objective_0": "Vai a qualsiasi edificio ENELICA",
                    "paving_the_way.objective_1": "Cerca una bacheca con un appunto del ricercatore",
                    "paving_the_way.objective_2": "Su Buried City, raggiungi l'ultimo piano sopra il Convinio in Piazza Roma",
                    "paving_the_way.objective_3": "Trova l'appartamento del ricercatore e cerca eventuali dati di ricerca",
                    "the_stench_of_corruption.name": "Il Fetore della Corruzione",
                    "the_stench_of_corruption.description": "Quella chiave che hai trovato nel camion dei barili... Non voglio ancora lanciare accuse, ma qui puzza di lavoro dall’interno. Potresti verificare un sospetto che ho?",
                    "the_stench_of_corruption.objective_0": "In un solo round",
                    "the_stench_of_corruption.objective_1": "Raggiungi la hall sud-ovest dell’edificio Partenze",
                    "the_stench_of_corruption.objective_2": "Trova lo spogliatoio del personale",
                    "the_stench_of_corruption.objective_3": "Cerca nella stanza indizi sull’identità del sabotatore",
                    "the_stench_of_corruption.objective_4": "Raggiungi i tunnel sotto lo Spaceport",
                    "the_stench_of_corruption.objective_5": "Usa la chiave su qualsiasi terminale di spurgo per aggirare il protocollo di bypass",
                    "deciphering_the_data.name": "Decifrando i Dati",
                    "deciphering_the_data.description": "Se i dati che hai trovato possono impedire che il soffitto crolli, non abbiamo tempo da perdere. Conosco alcuni decrittatori magnetici nei dintorni dello Spaceport di Acerra, risalenti all’epoca dell’Esodo. Potrebbero funzionare ancora.",
                    "deciphering_the_data.objective_0": "Usa il decrittatore magnetico nell’edificio di controllo del carburante",
                    "deciphering_the_data.objective_1": "Raggiungi l’edificio Arrivi dello Spaceport",
                    "deciphering_the_data.objective_2": "Usa il decrittatore magnetico all’ultimo piano dell’edificio Arrivi",
                    "groundbreaking.name": "Novità Rivoluzionaria",
                    "groundbreaking.description": "Dati o non dati: impareremo a rendere questo posto antisismico. Con una ricerca così approfondita, da qualche parte ci sarà sicuramente una traccia su carta.",
                    "groundbreaking.objective_0": "Entra nella stanza chiusa a chiave a Pilgrim’s Peak",
                    "groundbreaking.objective_1": "Cerca nella stanza qualsiasi ricerca sulla costruzione",
                    "groundbreaking.objective_2": "Trova l’edificio raffigurato sulla lavagna",
                    "groundbreaking.objective_3": "Fotografa il complesso residenziale abbandonato",
                    "stella_montis.name": "Stella Montis",
                    "stella_montis.objective_0": "Sblocca la mappa completando 24 round su altre mappe",
                    "blue_gate.name": "Cancello Blu",
                    "blue_gate.objective_0": "Sblocca la mappa completando 18 round su altre mappe",
                    the_clean_dream: {
                        name: "Il Sogno Pulito",
                        objective_0: "Allo Spazioporto, ispeziona 4 contenitori nei tunnel sotterranei",
                        objective_1: "Trova e monitora qualsiasi Sistema di filtraggio nei tunnel",
                        objective_2: "Al Varco Blu, visita il bunker di manutenzione",
                        objective_3: "Monitora il sistema di purificazione nel bunker",
                        objective_4: "Trova e fotografa i progetti nel bunker"
                    },
                    broken_monument: {
                        name: "Monumento Spezzato",
                        objective_0: "Cerca il terreno cavo sotto il deposito di rottami",
                        objective_1: "Cerca una bussola vicino ai veicoli fuori uso",
                        objective_2: "Cerca la videocassetta vicino ai contenitori cilindrici",
                        objective_3: "Cerca le vecchie razioni da campo nel campo Raider",
                        objective_4: "Consegna il nastro Prima Ondata a Tian Wen",
                        objective_5: "Consegna la bussola Prima Ondata a Tian Wen",
                        objective_6: "Consegna le razioni Prima Ondata a Tian Wen"
                    },
                    "a_prime_specimen.name": "UN ESEMPLARE PRIMARIO",
                    "a_prime_specimen.description": "Quel Deforester vicino al Varco Blu può aver causato una devastazione enorme, ma una carcassa intatta come quella è anche un campione di inestimabile valore per le nostre ricerche.",
                    "a_prime_specimen.objective_0": "Ottieni 2 cellule ARC",
                    "a_prime_specimen.objective_1": "Interagisci con un qualsiasi Deforester ARC",
                    "a_prime_specimen.objective_2": "Saccheggia un Deforester ARC",
                    "the_league.name": "La Lega",
                    "the_league.description": "I ragazzi da queste parti prendono a calci i bossoli vuoti delle granate. È solo questione di tempo prima che non siano più vuoti. Quindi, ecco il piano: tu mi aiuti con un po' di preparativi e io metto su una vera squadra di calcio per i più giovani.",
                    "the_league.objective_0": "Consegna un pallone sgonfio ad Apollo",
                    "the_league.objective_1": "Consegna una pompa per bici ad Apollo",
                    "the_league.objective_2": "Sui campi di battaglia della Diga, fotografa la porta vicino alle Torri idriche",
                    "the_league.objective_3": "Nella Città sepolta, fotografa le riviste di calcio in qualsiasi chiosco",
                    "with_a_view.name": "Con Vista",
                    "with_a_view.description": "Hai mai notato quelle scie di luce che sfrecciano nei cieli? Ho visto troppe cose in vita mia per credere che siano naturali, ma ci vorrà più di un'intuizione per convincere Celeste.",
                    "with_a_view.objective_0": "Ottieni un codificatore",
                    "with_a_view.objective_1": "Visita una qualsiasi delle sale di controllo vicino alla Linea di Montaggio",
                    "with_a_view.objective_2": "Usa il codificatore rotativo per attivare l'interruttore del server",
                    "with_a_view.objective_3": "Interagisci con un computer vicino per identificare i percorsi corretti",
                    "with_a_view.objective_4": "Consegna uno Ion Sputter a Shani",
                    "movie_night.name": "Serata Film",
                    "movie_night.description": "Tutti sono tesissimi da quando circolano voci sulla diffusione del segnale ARC. Stavo pensando che una serata film sarebbe una bella distrazione, ma mi mancano alcune risorse essenziali. Mi aiuti?",
                    "movie_night.objective_0": "Consegna una TV portatile ad Apollo",
                    "movie_night.objective_1": "A Stella Montis, cerca vecchie videocassette negli archivi culturali",
                    "movie_night.objective_2": "Consegna la pila di videocassette ad Apollo",
                    "combat_recon.name": "Ricognizione da Combattimento",
                    "combat_recon.description": "Con quei Bombardieri in giro, l'ARC ha trovato un modo completamente nuovo per stanare i Raider dalle coperture. I mortai volano in modo molto diverso dai proiettili, quindi dobbiamo identificare posizioni difensive adatte.",
                    "combat_recon.objective_0": "Individua un punto di copertura nelle scale del Parcheggio",
                    "combat_recon.objective_1": "Individua un punto di copertura negli autobus vicino a Parco Marano",
                    "combat_recon.objective_2": "Individua un punto di copertura nelle soffitte intorno a Main Street",
                    "combat_recon.objective_3": "Distruggi 2 Spotter",
                    "combat_recon.objective_4": "Consegna un Relè Spotter a Shani",
                    "bombing_run.name": "Corsa di Bombardamento",
                    "bombing_run.description": "Ora è il momento di vedere se quella ricognizione è servita. Se riusciamo a insegnare ai Raider a contrastare efficacemente i Bombardieri lassù, saremmo molto più al sicuro quaggiù.",
                    "bombing_run.objective_0": "Distruggi un Bombardiere",
                    "bombing_run.objective_1": "Consegna una Cellula Bombardiere a Shani",
                    "on_deaf_ears.name": "Orecchie da Mercante",
                    "on_deaf_ears.description": "Sto cercando apparecchi acustici avanzati sviluppati a Stella Montis. La ricerca potrebbe aiutarci a migliorare significativamente le nostre attrezzature di comunicazione.",
                    "on_deaf_ears.objective_0": "Trova i registri degli ospiti dei ricercatori sui computer della reception",
                    "on_deaf_ears.objective_1": "Trova la location della lezione e accedi agli appunti",
                    "on_deaf_ears.objective_2": "Recupera informazioni sul prototipo dai computer della Ricerca Medica",
                    "on_deaf_ears.objective_3": "Ottieni i registri di spedizione stampati dalle Officine di Assemblaggio",
                    "on_the_map.name": "Sulla Mappa",
                    "on_the_map.description": "Ho una mappa dello Spazioporto qui, ma non sono del tutto sicuro di dove si trovino quei punti coordinati. Aiutami a triangolare le coordinate degli apparecchi acustici usando le trasmissioni di posizione.",
                    "on_the_map.objective_0": "Vai dove le Linee del Carburante si sono spezzate e trasmetti la posizione",
                    "on_the_map.objective_1": "Raggiungi l'antenna vicino al Controllo Carburante e trasmetti la posizione",
                    "on_the_map.objective_2": "Vai alla zona dei cactus nella breccia del muro e trasmetti la posizione",
                    "on_the_map.objective_3": "Trasmetti la posizione dal tetto dell'edificio Stoccaggio Container",
                    "on_the_map.objective_4": "Trova e segna il container coperto dal telone",
                    "a_dead_end.name": "Un Vicolo Cieco",
                    "a_dead_end.description": "Shani ha scoperto riferimenti a un progetto classificato. Ha bisogno di qualcuno che indaghi in una struttura sotterranea MANTIKOR a The Blue Gate.",
                    "a_dead_end.objective_0": "Trova le strutture sotterranee di MANTIKOR",
                    "a_dead_end.objective_1": "Cerca nella stanza chiusa i documenti del Progetto Heartwood",
                    "a_dead_end.objective_2": "Trova la Bobina di Pellicola Polverosa",
                    "a_dead_end.objective_3": "Consegna la Bobina di Pellicola Polverosa a Shani",
                    "dust_on_the_wires.name": "Polvere sui Fili",
                    "dust_on_the_wires.description": "Una pattuglia di ricognizione è sparita vicino allo Spazioporto. Shani vuole che tu ripercorra i loro passi e scopra cosa è successo.",
                    "dust_on_the_wires.objective_0": "Visita un qualsiasi Deposito di Campo sul lato est dello Spazioporto",
                    "dust_on_the_wires.objective_1": "Usa la Radio da Campo per trasmettere l'ultimo registro del gruppo di ricognizione a Shani",
                    "dust_on_the_wires.objective_2": "Interagisci con il terminale nella vecchia Torre dei Raider a nord dell'Hangar di Manutenzione",
                    "dust_on_the_wires.objective_3": "Trova tracce della pattuglia di ricognizione vicino all'Hangar di Manutenzione",
                    "dust_on_the_wires.objective_4": "Cerca i resti lasciati dagli esploratori",
                    "dust_on_the_wires.objective_5": "Consegna la Nota della Pattuglia di Ricognizione a Shani",
                    "waking_the_grid.name": "Risveglio della Griglia",
                    "waking_the_grid.description": "Le note della pattuglia menzionano un sistema di sicurezza allo Spazioporto che potrebbe essere ancora operativo. Shani vuole che tu lo attivi.",
                    "waking_the_grid.objective_0": "Attiva i sensori di sicurezza in una delle Torri di Guardia",
                    "waking_the_grid.objective_1": "Avvia il Centro di Controllo Sicurezza nell'Edificio Partenze",
                    "waking_the_grid.objective_2": "Cerca tracce di una violazione della sicurezza nell'Ufficio Dati dell'Edificio Arrivi",
                    "keeping_an_eye_out.name": "Tenere gli Occhi Aperti",
                    "keeping_an_eye_out.description": "Celeste ha sentito voci su una figura misteriosa che vive vicino all'autostrada crollata a The Blue Gate. Vuole che tu indaghi.",
                    "keeping_an_eye_out.objective_0": "Trova l'autostrada crollata vicino al bordo sud della Radura Arida",
                    "keeping_an_eye_out.objective_1": "Trova il rifugio di Bilguun e cerca indizi della sua presenza",
                    "a_rising_tide.name": "Marea Crescente",
                    "a_rising_tide.description": "La bobina di pellicola della struttura MANTIKOR ha rivelato indizi su un progetto di ricostruzione. Celeste ha bisogno che tu segua la pista tra Buried City e Dam Battlegrounds.",
                    "a_rising_tide.objective_0": "A Buried City, trova l'appartamento barricato del caposquadra a sud di Piazza Roma",
                    "a_rising_tide.objective_1": "Accedi al registro digitale del caposquadra",
                    "a_rising_tide.objective_2": "A Dam Battlegrounds, raggiungi il Complesso di Generazione Energetica",
                    "a_rising_tide.objective_3": "Trova un modo per entrare nella Zona ad Accesso Controllato",
                    "a_rising_tide.objective_4": "Cerca nella Zona ad Accesso Controllato indizi sul progetto di ricostruzione del caposquadra",
                    "worth_your_salt.name": "Degno del Tuo Sale",
                    "worth_your_salt.description": "Celeste ha localizzato un prototipo di batteria nell'Assemblaggio Razzi dello Spazioporto. Ha bisogno di qualcuno che la recuperi e la carichi.",
                    "worth_your_salt.objective_0": "Vai all'Assemblaggio Razzi",
                    "worth_your_salt.objective_1": "Cerca il Prototipo di Batteria nascosto in un punto elevato",
                    "worth_your_salt.objective_2": "Porta il Prototipo di Batteria al Ricaricatore Industriale",
                    "worth_your_salt.objective_3": "Usa il macchinario per caricare la batteria",
                    "worth_your_salt.objective_4": "Consegna la Batteria Carica al punto di consegna",
                    "stable_housing.name": "Alloggio Stabile",
                    "stable_housing.description": "Tian Wen ha scoperto che i progetti del Progetto Heartwood sono chiusi in una cassaforte al Ponte di Sicurezza di Stella Montis. Ha bisogno di qualcuno che li recuperi.",
                    "stable_housing.objective_0": "Vai al Ponte di Sicurezza",
                    "stable_housing.objective_1": "Cerca la cassaforte nella stanza laterale vicino alle scale del terzo piano",
                    "stable_housing.objective_2": "Sali al quarto piano nella sala di controllo",
                    "stable_housing.objective_3": "Usa la Stampante di Tessere di Accesso per stampare una chiave per la cassaforte",
                    "stable_housing.objective_4": "Cerca modi alternativi per aprire la cassaforte",
                    "stable_housing.objective_5": "Recupera il contenuto della cassaforte",
                    "stable_housing.objective_6": "Consegna i Progetti del Progetto Heartwood a Tian Wen"
                },
                contacts: {
                    title: "Contatti",
                    subtitle: "Mettiti in contatto con Arc Raiders Central",
                    discord: {
                        title: "Discord",
                        description: "Unisciti al nostro server Discord per chattare, segnalare bug e suggerire nuove funzionalità"
                    },
                    reddit: {
                        title: "Reddit",
                        description: "Visita il nostro post su Reddit per discussioni e aggiornamenti"
                    }
                },
                mapsHub: {
                    title: "Mappe Interattive Arc Raiders",
                    subtitle: "Esplora tutte le mappe con marcatori filtrabili per container, estrazioni, botole, obiettivi missioni e molto altro",
                    viewMap: "Apri Mappa",
                    featuresTitle: "Funzionalità delle Mappe",
                    guideTitle: "Guida Strategica alle Mappe",
                    riskLevels: {
                        low: "Rischio Basso",
                        medium: "Rischio Medio",
                        high: "Rischio Alto",
                        extreme: "Rischio Estremo"
                    },
                    events: {
                        nightRaid: "Raid Notturno",
                        harvester: "Raccoglitore",
                        husk: "Husk",
                        coldSnap: "Colpo di Freddo",
                        hiddenBunker: "Bunker Nascosto",
                        emStorm: "Tempesta Elettromagnetica"
                    },
                    maps: {
                        dam: {
                            name: "Diga",
                            description: "Mappa a rischio medio con Torre di Controllo, Cupola Idroponica e Trattamento Acque. Ideale per raccogliere risorse e completare le prime missioni."
                        },
                        buriedCity: {
                            name: "Città Sepolta",
                            description: "Ambiente urbano ad alto rischio con Stazione Marano, Ospedale e aree residenziali. Ottima per farming di Ingranaggi Arrugginiti e Collari."
                        },
                        spaceport: {
                            name: "Spazioporto",
                            description: "Struttura ad alto rischio con Torre di Lancio, Hub Centrale ed edifici Partenze/Arrivi. Include evento Bunker Nascosto e molteplici punti di estrazione."
                        },
                        blueGate: {
                            name: "Varco Blu",
                            description: "Mappa ad alto rischio con puzzle del Cancello Bloccato, interruttori del Rifugio Raider e batterie del Forte Antico. Buona per principianti con estrazioni veloci."
                        },
                        stellaMontis: {
                            name: "Stella Montis",
                            description: "Struttura di ricerca sotterranea a rischio estremo su due livelli. Include spawn Matriarca, Officina Assemblaggio e il miglior loot epico del gioco."
                        }
                    },
                    features: {
                        loot: {
                            title: "Posizioni Loot",
                            description: "Casse armi, cache raider e container di alto valore"
                        },
                        extraction: {
                            title: "Punti Estrazione",
                            description: "Tutte le estrazioni con info su tempi e rischi"
                        },
                        containers: {
                            title: "Container",
                            description: "Casse mediche, munizioni, utilità e altro"
                        },
                        quests: {
                            title: "Marker Missioni",
                            description: "Obiettivi missioni e posizioni Field Depot"
                        },
                        enemies: {
                            title: "Spawn Nemici",
                            description: "Percorsi pattuglia e punti spawn ARC"
                        },
                        events: {
                            title: "Posizioni Eventi",
                            description: "Spawn Raccoglitore, ingressi bunker, trigger eventi"
                        }
                    },
                    guide: {
                        navigation: {
                            title: "Come Navigare le Mappe",
                            content: "Usa il pannello filtri per mostrare/nascondere tipi specifici di POI. I pin personalizzati ti permettono di segnare le tue scoperte. Zoom con scroll o pinch. Clicca su qualsiasi marker per info dettagliate."
                        },
                        lootStrategy: {
                            title: "Strategia di Loot",
                            content: "Dai priorità alle casse armi e cache raider per equipaggiamento di alto livello. Le stanze sfondabili contengono blueprint rari. Controlla i container durante gli eventi per loot bonus. Impara i tempi di respawn per route di farming efficienti."
                        },
                        extraction: {
                            title: "Estrazione Sicura",
                            content: "Conosci sempre l'estrazione più vicina prima di ingaggiare nemici. Alcune estrazioni richiedono oggetti o condizioni specifiche. Fai attenzione alle pattuglie ARC vicino alle zone di estrazione. Estrai prima di rischiare loot prezioso."
                        }
                    },
                    quickLinks: {
                        timers: "Vedi Timer Eventi Mappa"
                    }
                },
                workshopHub: {
                    title: "Items, Rifugio e Progetti",
                    subtitle: "Tutto il necessario per gestire il rifugio, tenere tracciare dei materiali necessari per progetti e banchi da lavoro, database delgi item di gioco",
                    openTool: "Apri",
                    guideTitle: "Fondamenti del Crafting",
                    workflowTitle: "Workflow Consigliato",
                    tools: {
                        items: {
                            title: "Database Oggetti",
                            description: "Database completo di tutti gli item di gioco. Confronta stats, verifica costi crafting e calcola margini di profitto.",
                            feature1: "400+ oggetti con stats complete",
                            feature2: "Analisi costi crafting",
                            feature3: "Analisi margini profitto"
                        },
                        hideout: {
                            title: "Tracker Rifugio",
                            description: "Traccia tutte le risorse ottenute e mancanti per tutti i livelli di Scartino e dei Bnachi da lavoro.",
                            feature1: "Tutti gli item per livellare Scartino",
                            feature2: "Tutti gli item per livellare i banchi da lavoro",
                            feature3: "Tieni traccia di tutti i progressi"
                        },
                        projects: {
                            title: "Tracker Progetti",
                            description: "Tutti gli item necessari per progetti spedizione ed eventi attivi. Traccia i progressi dei progetti spedizione e degli eventi.",
                            feature1: "Tutti i livelli di tutti i progetti Spedizione",
                            feature2: "Tutti i livelli degli Eventi attivi",
                            feature3: "Tieni traccia di tutti i progressi"
                        },
                        missingItems: {
                            title: "Lista Oggetti Mancanti",
                            description: "Genera automaticamente la lista completa dei materiali necessari per gli upgrade rifugio, progetti ed eventi.",
                            feature1: "Calcolo automatico",
                            feature2: "Combinato rifugio, progetti ed eventi",
                            feature3: "Esporta e condividi con i tuoi amici"
                        }
                    },
                    workflow: {
                        step1: {
                            title: "Aggiorna le risorse Rifugio",
                            description: "Segna gli item che hai già"
                        },
                        step2: {
                            title: "Aggiorna le risorse Progetti",
                            description: "Segna le risorse consegnate"
                        },
                        step3: {
                            title: "Visualizza gli Oggetti Mancanti",
                            description: "Ottieni la lista spesa"
                        },
                        step4: {
                            title: "Vai in Raid",
                            description: "Farma ciò che ti serve"
                        }
                    },
                    quickLinks: {
                        items: "Sfoglia Database Oggetti"
                    }
                },
                raiderHub: {
                    title: "Progressione Raider",
                    subtitle: "Traccia le missioni, costruisci il tuo albero abilità, competi nelle Prove e colleziona tutti i blueprint",
                    openTool: "Apri",
                    tipsTitle: "Consigli Pro",
                    progressionTitle: "Guida alla Progressione",
                    tools: {
                        quests: {
                            title: "Tracker Missioni",
                            description: "Database completo di tutte le missioni di tutti i mercanti. Traccia i tuoi progressi nelle missioni e scopri le ricompense future.",
                            highlight1: "Tutte le missioni mercanti",
                            highlight2: "Tracking obiettivi",
                            highlight3: "Anteprima ricompense"
                        },
                        skillTree: {
                            title: "Planner Albero Abilità",
                            description: "Pianifica la build del tuo personaggio prima di spendere punti. Simula build diverse e salva più alberi abilità.",
                            highlight1: "Albero abilità interattivo",
                            highlight2: "Simulazione build",
                            highlight3: "Salvataggio in cloud"
                        },
                        trials: {
                            title: "Tracker Prove",
                            description: "Traccia i tui progressi nelle prove settimanali e scala i ranghi da Recluta a Leggenda della Cantina.",
                            highlight1: "Sfide settimanali",
                            highlight2: "Calcolatore punti",
                            highlight3: "Salvataggio punteggi"
                        },
                        blueprints: {
                            title: "Collezione Blueprint",
                            description: "Traccia tutti i 75+ blueprint nel gioco. Tieni traccia di quelli posseduti e condividi con i tuoi amici.",
                            highlight1: "75+ blueprint",
                            highlight2: "Esportazione blueprint",
                            highlight3: "Tracking collezione"
                        },
                        loadout: {
                            title: "Costruttore Equipaggiamento",
                            description: "Costruisci e gestisci i tuoi equipaggiamenti. Configura potenziamenti, armi, scudi e inventario.",
                            highlight1: "Config equipaggiamento completa",
                            highlight2: "Tracking peso e valore",
                            highlight3: "Preset multipli"
                        }
                    },
                    tips: {
                        objectives: {
                            title: "Priorità Missioni",
                            content: "Concentrati sulle prime missioni per sbloccare upgrade rifugio e gear migliore. Le ricompense fanno comdo, specialmente all'inizio."
                        },
                        skills: {
                            title: "Build Abilità",
                            content: "Pianifica la build in base al tuo stile. Focus sul loot? Punta sul ramo Sopravvivenza. PVE? Prova il ramo Condizionamento."
                        },
                        ranking: {
                            title: "Ranking Prove",
                            content: "Farma durante eventi 2X per massimizzare i punti. Concentrati su una sfida alla volta per efficienza."
                        },
                        traders: {
                            title: "Reputazione Mercanti",
                            content: "Completa missioni per sbloccare oggetti migliori dai mercanti. Alcuni blueprint sono ottenibili solo tramite missione."
                        }
                    },
                    progression: {
                        early: {
                            title: "Inizio Gioco",
                            content: "Completa le prime missioni di Celeste. Sblocca upgrade base del rifugio. Impara a conoscere le mappe Diga e Città Sepolta. Focus su abilità sopravvivenza."
                        },
                        mid: {
                            title: "Metà Gioco",
                            content: "Affronta mappe complesse come Varco Blu e Spazioporto. Inizia le Prove per ricompense ranking. Colleziona blueprint e completa i potenziamenti Scartino e Banchi da Lavoro."
                        },
                        late: {
                            title: "Fine Gioco",
                            content: "Completa il progetto spedizione (ed evento se disponibile). Farma Stella Montis per loot epico. Raggiungi Leggenda della Cantina nelle Prove. Colleziona tutti i blueprint."
                        }
                    },
                    quickLinks: {
                        quests: "Dai un'occhiata alle Missioni"
                    }
                },
                consent: {
                    title: "Rispettiamo la tua privacy",
                    description: "Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza, analizzare l'utilizzo del sito e supportare i nostri sforzi di marketing.",
                    acceptAll: "Accetta Tutti",
                    necessaryOnly: "Solo Necessari",
                    customize: "Personalizza",
                    preferences: {
                        title: "Preferenze Cookie",
                        description: "Gestisci le tue preferenze cookie qui sotto. I cookie necessari sono richiesti per il corretto funzionamento del sito.",
                        required: "Obbligatorio",
                        necessary: {
                            title: "Necessari",
                            description: "Essenziali per il funzionamento del sito. Memorizzano le tue preferenze e lo stato di login. Non possono essere disabilitati."
                        },
                        analytics: {
                            title: "Analitici",
                            description: "Ci aiutano a capire come i visitatori usano il sito per migliorare l'esperienza (Google Analytics)."
                        },
                        email: {
                            title: "Notifiche Email",
                            description: "Ricevi email occasionali su aggiornamenti importanti, nuove funzionalità e novità su Arc Raiders Central.",
                            loginRequired: "Richiede login"
                        },
                        save: "Salva Preferenze",
                        cancel: "Annulla"
                    }
                },
                legal: {
                    privacy: {
                        title: "Informativa Privacy",
                        lastUpdated: "Ultimo aggiornamento",
                        date: "2 Febbraio 2026",
                        sections: {
                            intro: {
                                title: "Introduzione",
                                content: "Arc Raiders Central rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni quando usi il nostro sito."
                            },
                            dataController: {
                                title: "Titolare del Trattamento",
                                content: "Arc Raiders Central è gestito come progetto fan-made. Per qualsiasi richiesta relativa alla privacy, contattaci all'indirizzo email indicato di seguito."
                            },
                            dataCollected: {
                                title: "Dati che Raccogliamo",
                                authentication: {
                                    title: "Dati di Autenticazione",
                                    content: "Quando accedi con Google, riceviamo il tuo indirizzo email, nome visualizzato e foto profilo. Questi dati sono utilizzati esclusivamente per l'autenticazione e la personalizzazione."
                                },
                                gameProgress: {
                                    title: "Dati di Progresso di Gioco",
                                    content: "Memorizziamo i tuoi progressi di gioco inclusi upgrade rifugio, completamento missioni, collezione blueprint, build albero abilità e pin mappa personalizzati. Questi dati sono associati al tuo account e sincronizzati tra dispositivi."
                                },
                                analytics: {
                                    title: "Dati Analitici (con consenso)",
                                    content: "Con il tuo consenso, Google Analytics raccoglie dati anonimi sull'utilizzo incluse pagine visitate, tempo trascorso, tipo dispositivo e posizione generale. Questo ci aiuta a migliorare il sito."
                                }
                            },
                            legalBasis: {
                                title: "Base Giuridica del Trattamento",
                                content: "Trattiamo i tuoi dati sulla base di: (1) Il tuo consenso per cookie analitici; (2) Interesse legittimo per fornire il nostro servizio e migliorare l'esperienza utente; (3) Esecuzione contrattuale per funzionalità legate all'account."
                            },
                            dataRetention: {
                                title: "Conservazione dei Dati",
                                content: "I dati del tuo account sono conservati finché hai un account attivo. Puoi richiedere la cancellazione in qualsiasi momento. I dati analitici sono conservati secondo le policy di Google (tipicamente 14-26 mesi)."
                            },
                            yourRights: {
                                title: "I Tuoi Diritti (GDPR)",
                                content: "In base al GDPR, hai i seguenti diritti:",
                                rights: {
                                    access: "Diritto di accesso ai tuoi dati personali",
                                    rectification: "Diritto di rettifica dei dati inesatti",
                                    erasure: 'Diritto alla cancellazione ("diritto all\'oblio")',
                                    restriction: "Diritto di limitazione del trattamento",
                                    portability: "Diritto alla portabilità dei dati",
                                    objection: "Diritto di opposizione al trattamento"
                                }
                            },
                            dataDeletion: {
                                title: "Richiesta Cancellazione Dati",
                                content: "Per richiedere la cancellazione del tuo account e di tutti i dati associati, contattaci a:"
                            },
                            contact: {
                                title: "Contattaci",
                                content: "Per qualsiasi domanda o dubbio sulla privacy, contattaci a:"
                            }
                        }
                    },
                    terms: {
                        title: "Termini di Servizio",
                        lastUpdated: "Ultimo aggiornamento",
                        date: "2 Febbraio 2026",
                        sections: {
                            acceptance: {
                                title: "Accettazione dei Termini",
                                content: "Accedendo e utilizzando Arc Raiders Central, accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare il nostro servizio."
                            },
                            ageRequirement: {
                                title: "Requisito di Età",
                                content: "Devi avere almeno 13 anni per utilizzare questo servizio. Utilizzando Arc Raiders Central, dichiari di avere almeno 13 anni."
                            },
                            disclaimer: {
                                title: "Progetto Fan Non Ufficiale",
                                content: "Arc Raiders Central è un'applicazione companion fan-made non ufficiale. Non siamo affiliati, approvati o sponsorizzati da Embark Studios o dal team di sviluppo di Arc Raiders.",
                                notice: "Arc Raiders™ è un marchio di Embark Studios AB. Tutti gli asset, immagini e contenuti del gioco appartengono ai rispettivi proprietari."
                            },
                            intellectualProperty: {
                                title: "Proprietà Intellettuale",
                                content: "Gli asset, immagini e dati del gioco Arc Raiders sono proprietà di Embark Studios. Il nostro codice originale, design e funzionalità sono forniti sotto fair use per strumenti fan-made. Non puoi ridistribuire o commercializzare il nostro lavoro originale senza permesso."
                            },
                            userConduct: {
                                title: "Condotta dell'Utente",
                                content: "Utilizzando Arc Raiders Central, accetti di non:",
                                rules: {
                                    noMisuse: "Utilizzare il servizio per scopi illeciti",
                                    noHarm: "Tentare di danneggiare o interrompere il servizio",
                                    noReverse: "Fare reverse engineering o estrarre codice sorgente oltre quanto pubblicamente disponibile",
                                    noAutomation: "Usare strumenti automatizzati per fare scraping o sovraccaricare i nostri server"
                                }
                            },
                            limitation: {
                                title: "Limitazione di Responsabilità",
                                content: 'Arc Raiders Central è fornito "così com\'è" senza garanzie di alcun tipo. Non siamo responsabili per perdite di dati, imprecisioni nei dati di gioco o interruzioni del servizio. Utilizzo a proprio rischio.'
                            },
                            modifications: {
                                title: "Modifiche ai Termini",
                                content: "Possiamo aggiornare questi termini in qualsiasi momento. L'uso continuato del servizio dopo le modifiche costituisce accettazione dei nuovi termini. Ti incoraggiamo a rivedere periodicamente questa pagina."
                            },
                            contact: {
                                title: "Contattaci",
                                content: "Per domande su questi termini, contattaci a:"
                            }
                        }
                    },
                    cookies: {
                        title: "Cookie Policy",
                        lastUpdated: "Ultimo aggiornamento",
                        date: "2 Febbraio 2026",
                        sections: {
                            whatAreCookies: {
                                title: "Cosa Sono i Cookie",
                                content: "I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti un sito web. Utilizziamo cookie e tecnologie simili (come localStorage) per ricordare le tue preferenze e fornire un'esperienza migliore."
                            },
                            typesUsed: {
                                title: "Tipi di Cookie che Utilizziamo",
                                necessary: {
                                    title: "Necessari (Sempre Attivi)",
                                    content: "Questi sono essenziali per il funzionamento del sito. Memorizzano le tue preferenze, stato di login e scelte di consenso.",
                                    localStorage: "Memorizza tema, lingua, progressi di gioco e preferenze di consenso localmente sul tuo dispositivo."
                                },
                                analytics: {
                                    title: "Analitici (Opzionali)",
                                    content: "Questi cookie ci aiutano a capire come i visitatori interagiscono con il nostro sito.",
                                    ga4: "Raccoglie dati anonimi su visualizzazioni pagina, durata sessione e interazioni utente per aiutarci a migliorare il sito."
                                }
                            },
                            thirdParty: {
                                title: "Cookie di Terze Parti",
                                content: "Il nostro partner terzo (Google) può impostare i propri cookie. Per maggiori informazioni, consulta la loro informativa privacy:"
                            },
                            managingPreferences: {
                                title: "Gestione delle Preferenze",
                                content: "Puoi modificare le tue preferenze cookie in qualsiasi momento cliccando il pulsante qui sotto o usando il link 'Impostazioni Cookie' nel footer."
                            },
                            browserSettings: {
                                title: "Impostazioni del Browser",
                                content: "Puoi anche gestire i cookie tramite le impostazioni del browser. Nota che bloccare tutti i cookie può influire sulla funzionalità del sito. La maggior parte dei browser permette di bloccare cookie di terze parti consentendo quelli di prima parte."
                            },
                            contact: {
                                title: "Contattaci",
                                content: "Per domande sulla nostra cookie policy, contattaci a:"
                            }
                        }
                    }
                },
                settings: {
                    title: "Impostazioni",
                    subtitle: "Gestisci il tuo account e le preferenze",
                    profile: {
                        title: "Profilo",
                        description: "Gestisci il tuo nome visualizzato e le informazioni del profilo",
                        nickname: "Nome Visualizzato",
                        nicknamePlaceholder: "Inserisci il tuo nome visualizzato",
                        originalName: "Nome Google",
                        save: "Salva",
                        cooldownMessage: "Potrai cambiare nickname tra {{days}} giorni",
                        nicknameChanged: "Nickname cambiato con successo!",
                        nicknameRules: "3-25 caratteri. Solo lettere, numeri, spazi, underscore e trattini.",
                        nicknameHistory: "Cronologia Nickname"
                    },
                    preferences: {
                        title: "Preferenze",
                        description: "Personalizza la tua esperienza",
                        language: "Lingua",
                        backgrounds: "Sfondi Animati",
                        enableBackgrounds: "Abilita sfondi video animati",
                        theme: "Tema",
                        themeDark: "Scuro",
                        themeLight: "Chiaro"
                    },
                    account: {
                        title: "Account e Dati",
                        description: "Gestisci i tuoi dati e le impostazioni dell'account",
                        export: {
                            title: "Esporta i Tuoi Dati",
                            description: "Scarica una copia di tutti i tuoi dati memorizzati su Arc Raiders Central, incluse preferenze e impostazioni.",
                            button: "Esporta Dati"
                        },
                        wipeReset: {
                            title: "Wipe Reset",
                            description: "Azzera tutti i tuoi progressi dopo un wipe di gioco. Cancellerà hideout, progetti, quest e blueprint.",
                            button: "Azzera Progressi",
                            warning: "Questo eliminerà permanentemente i tuoi progressi di: Hideout, Progetti, Quest e Blueprint. Usalo dopo un wipe del gioco. Questa azione non può essere annullata.",
                            confirmLabel: "Scrivi RESET per confermare:",
                            confirmButton: "Azzera Tutti i Progressi",
                            success: "Progressi azzerati con successo!",
                            error: "Impossibile azzerare i progressi. Riprova."
                        },
                        delete: {
                            title: "Elimina Account",
                            description: "Elimina permanentemente il tuo account e tutti i dati associati. Questa azione non può essere annullata.",
                            button: "Elimina Account",
                            warning: "Questo eliminerà permanentemente il tuo account, preferenze, impostazioni e tutti i dati associati. Dovrai ri-autenticarti per confermare questa azione.",
                            confirmLabel: "Scrivi DELETE per confermare:",
                            confirmButton: "Elimina Il Mio Account"
                        },
                        errors: {
                            recentLogin: "Esci e accedi nuovamente prima di eliminare l'account.",
                            deleteFailed: "Impossibile eliminare l'account. Riprova."
                        }
                    },
                    errors: {
                        nicknameTooShort: "Il nickname deve avere almeno 3 caratteri",
                        nicknameTooLong: "Il nickname non può superare i 25 caratteri",
                        nicknameInvalidChars: "Solo lettere, numeri, spazi, underscore e trattini sono permessi",
                        sameNickname: "Questo è già il tuo nickname attuale",
                        cooldownActive: "Devi attendere prima di cambiare nuovamente il nickname",
                        userNotFound: "Utente non trovato",
                        unknown: "Si è verificato un errore. Riprova."
                    }
                },
                profile: {
                    memberSince: "Membro dal",
                    reviews: "recensioni",
                    editProfile: "Modifica Profilo",
                    nicknameHistory: "Cronologia Nickname",
                    userNotFound: "Utente non trovato",
                    loadError: "Errore nel caricamento del profilo",
                    stats: {
                        totalTrades: "Trade Totali",
                        successRate: "Tasso Successo",
                        avgRating: "Valutazione Media",
                        reviews: "Recensioni"
                    }
                },
                builds: {
                    title: "Build della Community",
                    description: "Sfoglia, vota e copia le build dell'albero abilità condivise dalla community",
                    sortVotes: "Più Votate",
                    sortNewest: "Più Recenti",
                    sortCopies: "Più Copiate",
                    copy: "Copia",
                    justNow: "ora",
                    empty: "Nessuna build pubblicata. Sii il primo!",
                    emptyHint: "Vai alla pagina Albero Abilità, crea una build e clicca Condividi → Pubblica",
                    copySuccess: "Build copiata nello slot {{slot}}!",
                    deleteConfirm: "Rimuovere questa build dalla galleria?",
                    selectSlot: "Seleziona uno slot da sostituire",
                    replaceSlot: "{{points}} punti allocati",
                    emptySlot: "Slot vuoto",
                    pointsUsed: "punti",
                    totalPoints: "pt",
                    noResults: "Nessuna build corrisponde a questo filtro",
                    conditioning: "Condizionamento",
                    mobility: "Mobilità",
                    survival: "Sopravvivenza",
                    descriptionPlaceholder: "Descrizione (opzionale)"
                },
                loadout: {
                    title: "Dotazione",
                    subtitle: "Configura il tuo equipaggiamento, armi e inventario",
                    loginRequired: "Accedi per creare e salvare i tuoi equipaggiamenti",
                    loginButton: "Accedi con Google",
                    newLoadout: "Nuovo Equipaggiamento",
                    deleteConfirm: "Eliminare questo equipaggiamento?",
                    equipment: "Equipaggiamento",
                    backpack: "Zaino",
                    quickUse: "Uso Rapido",
                    safePocket: "Spazio Sicuro",
                    augment: "Potenziamento",
                    shield: "Scudo",
                    weapon1: "Arma 1",
                    weapon2: "Arma 2",
                    selectItem: "Seleziona Oggetto",
                    removeItem: "Rimuovi oggetto",
                    search: "Cerca oggetti...",
                    noResults: "Nessun oggetto trovato",
                    noLoadouts: "Nessun equipaggiamento. Creane uno per iniziare!",
                    all: "Tutti",
                    slotGrenade: "Lanciabile",
                    slotTrinket: "Cianfrusaglia",
                    slotUtility: "Gadget",
                    slotMeds: "Medico",
                    maxLoadouts: "Massimo {{max}} equipaggiamenti raggiunto",
                    modMuzzle: "Freno di bocca",
                    modUnderbarrel: "Sottocanna",
                    modMagazine: "Caricatore",
                    modStock: "Calcio",
                    modTechnology: "Tecnologia",
                    quantity: "Quantità",
                    quantityHint: "La dimensione massima dello stack varia per oggetto",
                    tabs: {
                        browse: "Sfoglia",
                        myLoadouts: "I Miei Equipaggiamenti"
                    },
                    browse: {
                        title: "Equipaggiamenti della Community",
                        description: "Sfoglia, vota e copia equipaggiamenti condivisi dalla community",
                        empty: "Nessun equipaggiamento condiviso. Sii il primo!",
                        emptyHint: "Vai su I Miei Equipaggiamenti, crea un equipaggiamento e clicca Pubblica"
                    },
                    sort: {
                        votes: "Più Votati",
                        newest: "Più Recenti",
                        copies: "Più Copiati"
                    },
                    publish: "Pubblica",
                    publishTitle: "Pubblica Equipaggiamento",
                    publishDescription: "Condividi questo equipaggiamento con la community",
                    publishDescriptionPlaceholder: "Descrizione (opzionale) - spiega il tuo stile di gioco o strategia",
                    publishSuccess: "Equipaggiamento pubblicato!",
                    publishSuccessDesc: "Il tuo equipaggiamento è ora visibile nella galleria community",
                    published: "Pubblicato",
                    unpublish: "Rimuovi dalla galleria",
                    unpublishConfirm: "Rimuovere questo equipaggiamento dalla galleria?",
                    copySuccess: "Equipaggiamento copiato nella tua collezione!",
                    copiedToCollection: "Equipaggiamento copiato nella tua collezione",
                    copyMaxReached: "Impossibile copiare: massimo {{max}} equipaggiamenti raggiunto",
                    deleteConfirmShared: "Rimuovere questo equipaggiamento dalla galleria?",
                    deleted: "Equipaggiamento rimosso dalla galleria",
                    votes: "voti",
                    copies: "copie",
                    copy: "Copia",
                    copyOf: "Copia di {{name}}",
                    justNow: "ora",
                    loginToVote: "Accedi per votare",
                    loginToCopy: "Accedi per copiare equipaggiamenti",
                    voteError: "Impossibile votare",
                    copyError: "Impossibile copiare equipaggiamento",
                    publishError: "Impossibile pubblicare equipaggiamento",
                    deleteError: "Impossibile eliminare equipaggiamento",
                    name: "Nome Equipaggiamento",
                    description: "Descrizione"
                },
                routes: {
                    title: "I Miei Percorsi",
                    pageTitle: "Pianificatore Percorsi",
                    selectMap: "Seleziona Mappa",
                    noRoutes: "Nessun percorso ancora. Crea il tuo primo disegno!",
                    newRoute: "Nuovo Percorso",
                    addDraw: "Aggiungi Disegno",
                    editRoute: "Modifica Percorso",
                    deleteRoute: "Elimina Percorso",
                    routeName: "Nome Percorso",
                    routeDescription: "Descrizione (opzionale)",
                    routeColor: "Colore Percorso",
                    createRoute: "Crea Percorso",
                    saveRoute: "Salva",
                    cancel: "Annulla",
                    addWaypoint: "Aggiungi Tappa",
                    finishRoute: "Termina Percorso",
                    clearLast: "Annulla Ultima",
                    viewMode: "Modalità Visualizzazione",
                    drawMode: "Modalità Disegno",
                    waypoint: "Tappa",
                    waypointLabel: "Etichetta",
                    waypointNotes: "Note",
                    waypointIcon: "Icona",
                    waypointColor: "Colore",
                    editWaypoint: "Modifica Tappa",
                    deleteWaypoint: "Elimina Tappa",
                    moveUp: "Sposta Su",
                    moveDown: "Sposta Giù",
                    maxRoutesReached: "Massimo percorsi raggiunto (500)",
                    deleteConfirm: "Sei sicuro di voler eliminare questo percorso?",
                    waypointCount_one: "{{count}} tappa",
                    waypointCount_other: "{{count}} tappe",
                    errors: {
                        loadRoutes: "Impossibile caricare i percorsi",
                        saveRoute: "Impossibile salvare il percorso",
                        nameRequired: "Il nome del percorso è obbligatorio"
                    }
                }
            }
        }
    },
    lng: jt,
    fallbackLng: "en",
    interpolation: {
        escapeValue: !1
    }
});
const Rt = i.createContext(void 0)
  , Tt = {
    theme: localStorage.getItem("theme") || "bw",
    language: localStorage.getItem(Ct) || "en"
};
function At({children: e}) {
    const {user: t, loading: o} = wt()
      , {i18n: r} = n()
      , [s,l] = i.useState(Tt)
      , [c,d] = i.useState(!0);
    return i.useEffect( () => {
        o || (async () => {
            if (t)
                try {
                    const e = ze(ot, "user-preferences", t.uid)
                      , i = await Pe(e);
                    if (i.exists()) {
                        const t = i.data()
                          , a = "true" === localStorage.getItem("arc-raiders-email-opt-in");
                        void 0 === t.emailOptIn && a && (t.emailOptIn = a,
                        await Ie(e, {
                            emailOptIn: a
                        }, {
                            merge: !0
                        })),
                        l({
                            ...Tt,
                            ...t
                        });
                        const o = t.theme || "bw";
                        document.documentElement.setAttribute("data-theme", o),
                        localStorage.setItem("theme", o),
                        t.language && t.language !== r.language && (r.changeLanguage(t.language),
                        localStorage.setItem(Ct, t.language),
                        document.documentElement.setAttribute("lang", t.language)),
                        t.homeCardOrder && localStorage.setItem("arc-raiders-home-card-order", JSON.stringify(t.homeCardOrder)),
                        void 0 !== t.compactHomeCards && (localStorage.setItem("arc-raiders-compact-home-cards", String(t.compactHomeCards)),
                        t.compactHomeCards ? document.documentElement.setAttribute("data-compact-home", "true") : document.documentElement.removeAttribute("data-compact-home")),
                        void 0 !== t.videoBackgroundEnabled && localStorage.setItem("arc-raiders-video-background", String(t.videoBackgroundEnabled)),
                        void 0 !== t.emailOptIn && localStorage.setItem("arc-raiders-email-opt-in", String(t.emailOptIn))
                    } else {
                        const t = localStorage.getItem("arc-raiders-email-opt-in")
                          , i = null === t || "true" === t
                          , a = {
                            ...s,
                            emailOptIn: i
                        };
                        l(a),
                        await Ie(e, a)
                    }
                } catch (e) {}
            else {
                const e = localStorage.getItem("theme") || "bw"
                  , t = localStorage.getItem(Ct) || "en"
                  , i = localStorage.getItem("arc-raiders-home-card-order")
                  , a = i ? JSON.parse(i) : void 0
                  , o = "true" === localStorage.getItem("arc-raiders-compact-home-cards")
                  , r = localStorage.getItem("arc-raiders-video-background")
                  , n = null === r || "true" === r
                  , s = localStorage.getItem("arc-raiders-email-opt-in");
                l({
                    theme: e,
                    language: t,
                    homeCardOrder: a,
                    compactHomeCards: o,
                    videoBackgroundEnabled: n,
                    emailOptIn: null === s || "true" === s
                }),
                document.documentElement.setAttribute("data-theme", e)
            }
            d(!1)
        }
        )()
    }
    , [t, o, r]),
    a.jsx(Rt.Provider, {
        value: {
            preferences: s,
            updateTheme: async e => {
                const i = {
                    ...s,
                    theme: e
                };
                if (l(i),
                document.documentElement.setAttribute("data-theme", e),
                localStorage.setItem("theme", e),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateLanguage: async e => {
                const i = {
                    ...s,
                    language: e
                };
                if (l(i),
                r.changeLanguage(e),
                localStorage.setItem(Ct, e),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid)
                          , a = Object.fromEntries(Object.entries(i).filter( ([,e]) => void 0 !== e));
                        await Ie(e, a, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateMapPinVisibility: async e => {
                const i = {
                    ...s,
                    mapPinVisibility: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-map-visibility", JSON.stringify(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateHomeCardOrder: async e => {
                const i = {
                    ...s,
                    homeCardOrder: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-home-card-order", JSON.stringify(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateCompactHomeCards: async e => {
                const i = {
                    ...s,
                    compactHomeCards: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-compact-home-cards", String(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateVideoBackground: async e => {
                const i = {
                    ...s,
                    videoBackgroundEnabled: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-video-background", String(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateEmailOptIn: async e => {
                const i = {
                    ...s,
                    emailOptIn: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-email-opt-in", String(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updateNotificationSound: async e => {
                const i = {
                    ...s,
                    notificationSoundEnabled: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-notification-sound", String(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            updatePushNotifications: async e => {
                const i = {
                    ...s,
                    pushNotificationsEnabled: e
                };
                if (l(i),
                localStorage.setItem("arc-raiders-push-notifications", String(e)),
                t)
                    try {
                        const e = ze(ot, "user-preferences", t.uid);
                        await Ie(e, i, {
                            merge: !0
                        })
                    } catch (a) {}
            }
            ,
            loading: c
        },
        children: e
    })
}
function zt() {
    const e = i.useContext(Rt);
    if (void 0 === e)
        throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
    return e
}
const It = i.createContext(void 0)
  , Pt = "arc-admin-text-selection";
function Nt({children: e}) {
    const {isAdmin: t} = St()
      , [o,r] = i.useState( () => {
        const e = localStorage.getItem(Pt);
        return !e || JSON.parse(e)
    }
    );
    return i.useEffect( () => {
        t && o ? document.body.classList.remove("no-text-select") : document.body.classList.add("no-text-select")
    }
    , [t, o]),
    a.jsx(It.Provider, {
        value: {
            textSelectionEnabled: o,
            updateTextSelectionEnabled: e => {
                r(e),
                localStorage.setItem(Pt, JSON.stringify(e))
            }
        },
        children: e
    })
}
function Mt() {
    const e = i.useContext(It);
    if (void 0 === e)
        throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
    return e
}
const Dt = i.createContext(null);
function Bt({children: e}) {
    const [t,o] = i.useState({
        isLoading: !1,
        variant: "default"
    })
      , r = i.useRef(0)
      , n = i.useRef(!1)
      , s = i.useRef(!1)
      , l = i.useRef(null)
      , c = i.useRef(null)
      , d = i.useCallback( () => {
        l.current && (clearTimeout(l.current),
        l.current = null),
        c.current && (clearTimeout(c.current),
        c.current = null)
    }
    , []);
    i.useEffect( () => () => d(), [d]);
    const u = i.useCallback( () => {
        d(),
        r.current += 1,
        1 === r.current && (n.current = !1,
        s.current = !1,
        o({
            isLoading: !0,
            variant: "default"
        }))
    }
    , [d])
      , p = i.useCallback(e => {
        if (r.current = Math.max(0, r.current - 1),
        "error" === e && (n.current = !0),
        "warning" === e && (s.current = !0),
        0 === r.current) {
            let e = "success";
            n.current ? e = "error" : s.current && (e = "warning"),
            o({
                isLoading: !0,
                variant: e
            }),
            c.current = window.setTimeout( () => {
                l.current = window.setTimeout( () => {
                    o({
                        isLoading: !1,
                        variant: "default"
                    }),
                    n.current = !1,
                    s.current = !1
                }
                , 300)
            }
            , 1500)
        }
    }
    , []);
    return a.jsx(Dt.Provider, {
        value: {
            isLoading: t.isLoading,
            variant: t.variant,
            startLoading: u,
            endLoading: p
        },
        children: e
    })
}
function Et() {
    const e = i.useContext(Dt);
    if (!e)
        throw new Error("useLoading must be used within LoadingProvider");
    return e
}
const Lt = "arc-raiders-consent"
  , Ot = "1.0.0"
  , qt = i.createContext(void 0);
function Ft({children: e}) {
    const {user: t, loading: o} = wt()
      , [r,n] = i.useState(null)
      , [s,l] = i.useState(!1)
      , [c,d] = i.useState(!1)
      , u = i.useCallback(async (e, t) => {
        try {
            const i = ze(ot, "user-preferences", e);
            await Ie(i, {
                consent: t
            }, {
                merge: !0
            })
        } catch (i) {}
    }
    , []);
    i.useEffect( () => {
        const e = localStorage.getItem(Lt);
        if (e)
            try {
                const t = JSON.parse(e);
                t.version === Ot && n(t)
            } catch {
                localStorage.removeItem(Lt)
            }
        d(!0)
    }
    , []),
    i.useEffect( () => {
        !o && t && (async () => {
            try {
                const e = ze(ot, "user-preferences", t.uid)
                  , i = await Pe(e);
                if (i.exists() && i.data().consent) {
                    const e = i.data().consent;
                    if (e.version === Ot)
                        return n(e),
                        void localStorage.setItem(Lt, JSON.stringify(e))
                }
                const a = localStorage.getItem(Lt);
                if (a)
                    try {
                        const e = JSON.parse(a);
                        e.version === Ot && u(t.uid, e)
                    } catch {}
            } catch (e) {}
        }
        )()
    }
    , [t, o, u]);
    const p = i.useCallback(async e => {
        n(e),
        localStorage.setItem(Lt, JSON.stringify(e)),
        t && await u(t.uid, e)
    }
    , [t, u])
      , m = i.useCallback(e => {
        const t = {
            necessary: !0,
            analytics: e.analytics ?? (null == r ? void 0 : r.analytics) ?? !1,
            timestamp: Date.now(),
            version: Ot
        };
        p(t)
    }
    , [r, p])
      , g = i.useCallback( () => {
        const e = {
            necessary: !0,
            analytics: !0,
            timestamp: Date.now(),
            version: Ot
        };
        p(e)
    }
    , [p])
      , h = i.useCallback( () => {
        const e = {
            necessary: !0,
            analytics: !1,
            timestamp: Date.now(),
            version: Ot
        };
        p(e)
    }
    , [p]);
    return c ? a.jsx(qt.Provider, {
        value: {
            consent: r,
            hasConsented: null !== r,
            updateConsent: m,
            acceptAll: g,
            acceptNecessaryOnly: h,
            isPreferencesOpen: s,
            setIsPreferencesOpen: l
        },
        children: e
    }) : null
}
function Ut() {
    const e = i.useContext(qt);
    if (void 0 === e)
        throw new Error("useConsent must be used within a ConsentProvider");
    return e
}
const Gt = {
    home: {
        en: "/",
        it: "/",
        component: "Home"
    },
    timers: {
        en: "/timers",
        it: "/timer",
        component: "MapTimers"
    },
    maps: {
        en: "/maps",
        it: "/mappe",
        component: "MapsHub"
    },
    workshop: {
        en: "/workshop",
        it: "/officina",
        component: "WorkshopHub"
    },
    raider: {
        en: "/raider",
        it: "/raider",
        component: "RaiderHub"
    },
    hideout: {
        en: "/hideout",
        it: "/rifugio",
        component: "HideoutPlanner"
    },
    skillTree: {
        en: "/skill-tree",
        it: "/albero-abilita",
        component: "SkillTree"
    },
    quests: {
        en: "/quests",
        it: "/missioni",
        component: "Quests"
    },
    projects: {
        en: "/projects",
        it: "/progetti",
        component: "Projects"
    },
    items: {
        en: "/items",
        it: "/oggetti",
        component: "Items"
    },
    blueprints: {
        en: "/blueprints",
        it: "/blueprint",
        component: "Blueprints"
    },
    missingItems: {
        en: "/missing-items",
        it: "/oggetti-mancanti",
        component: "ShoppingList"
    },
    trials: {
        en: "/trials",
        it: "/prove",
        component: "Trials"
    },
    about: {
        en: "/about",
        it: "/chi-siamo",
        component: "About"
    },
    support: {
        en: "/support",
        it: "/supporto",
        component: "Support"
    },
    privacy: {
        en: "/privacy",
        it: "/privacy",
        component: "PrivacyPolicy"
    },
    terms: {
        en: "/terms",
        it: "/termini",
        component: "TermsOfService"
    },
    cookies: {
        en: "/cookies",
        it: "/cookie",
        component: "CookiePolicy"
    },
    settings: {
        en: "/settings",
        it: "/impostazioni",
        component: "Settings"
    },
    profile: {
        en: "/profile/:userId",
        it: "/profilo/:userId",
        component: "Profile"
    },
    market: {
        en: "/market",
        it: "/mercato",
        component: "Market"
    },
    builds: {
        en: "/builds",
        it: "/build",
        component: "SharedBuilds"
    },
    loadout: {
        en: "/loadout",
        it: "/equipaggiamento",
        component: "LoadoutBuilder"
    },
    forSale: {
        en: "/for-sale",
        it: "/for-sale",
        component: "ForSale"
    }
}
  , Ht = [{
    en: "/maps/dam",
    it: "/mappe/diga",
    component: "InteractiveMaps",
    mapId: "dam",
    mapNameEn: "The Dam",
    mapNameIt: "Diga"
}, {
    en: "/maps/blue-gate",
    it: "/mappe/varco-blu",
    component: "InteractiveMaps",
    mapId: "blue-gate",
    mapNameEn: "Blue Gate",
    mapNameIt: "Varco Blu"
}, {
    en: "/maps/spaceport",
    it: "/mappe/spazioporto",
    component: "InteractiveMaps",
    mapId: "spaceport",
    mapNameEn: "Spaceport",
    mapNameIt: "Spazioporto"
}, {
    en: "/maps/stella-montis",
    it: "/mappe/stella-montis",
    component: "InteractiveMaps",
    mapId: "stella-montis",
    mapNameEn: "Stella Montis",
    mapNameIt: "Stella Montis"
}, {
    en: "/maps/buried-city",
    it: "/mappe/citta-sepolta",
    component: "InteractiveMaps",
    mapId: "buried-city",
    mapNameEn: "Buried City",
    mapNameIt: "Citta Sepolta"
}, {
    en: "/maps/stella-montis-lower",
    it: "/mappe/stella-montis-inferiore",
    component: "InteractiveMaps",
    mapId: "stella-montis-lower",
    mapNameEn: "Stella Montis Lower",
    mapNameIt: "Stella Montis Inferiore"
}]
  , Vt = {
    home: {
        titleEn: "Arc Raiders Central - Complete Companion App",
        titleIt: "Arc Raiders Central - App Companion Completa",
        descriptionEn: "The ultimate free Arc Raiders companion app. Interactive maps with loot locations, live map rotation timers, hideout planner, blueprint tracker, skill tree builder, and trials calculator. Updated daily.",
        descriptionIt: "La migliore app companion gratuita per Arc Raiders. Mappe interattive con posizioni loot, timer rotazione live, planner rifugio, tracker blueprint, skill tree builder e calcolatore prove. Aggiornata quotidianamente."
    },
    timers: {
        titleEn: "Event Timers & Countdowns - Arc Raiders Central",
        titleIt: "Timer Eventi e Countdown - Arc Raiders Central",
        descriptionEn: "Real-time Arc Raiders map rotation timer. Track Night Raid, Harvester, Electromagnetic Storm, Hidden Bunker, Cold Snap events. See 2X Trials bonus times and plan your farming sessions.",
        descriptionIt: "Timer rotazione mappe Arc Raiders in tempo reale. Traccia Night Raid, Raccoglitore, Tempesta Elettromagnetica, Bunker Nascosto, Colpo di Freddo. Vedi bonus 2X Prove e pianifica le sessioni di farming."
    },
    maps: {
        titleEn: "Arc Raiders Maps - All Locations & POIs | Arc Raiders Central",
        titleIt: "Mappe Arc Raiders - Tutte le Posizioni e POI | Arc Raiders Central",
        descriptionEn: "Complete Arc Raiders interactive map guide for all 5 battlegrounds. Find weapon cases, raider caches, extraction points, breach rooms on Dam, Buried City, Spaceport, Blue Gate, Stella Montis. Filter markers by type.",
        descriptionIt: "Guida completa mappe interattive Arc Raiders per tutte le 5 zone. Trova casse armi, cache raider, punti estrazione, stanze sfondabili su Diga, Città Sepolta, Spazioporto, Varco Blu, Stella Montis. Filtra marker per tipo."
    },
    workshop: {
        titleEn: "Workshop & Crafting Tools | Arc Raiders Central",
        titleIt: "Strumenti Officina e Crafting | Arc Raiders Central",
        descriptionEn: "Arc Raiders crafting tools: items database with stats, hideout planner for Scrappy upgrades, project tracker for Exodus, and missing items calculator. Plan your crafting workflow.",
        descriptionIt: "Strumenti crafting Arc Raiders: database oggetti con stats, planner rifugio per upgrade Scartino, tracker progetti per Exodus e calcolatore oggetti mancanti. Pianifica il tuo workflow."
    },
    raider: {
        titleEn: "Raider Progression & Tools | Arc Raiders Central",
        titleIt: "Progressione Raider e Strumenti | Arc Raiders Central",
        descriptionEn: "Arc Raiders progression tools: quest tracker for all traders, skill tree planner, Trials calculator with rankings, and blueprint collection tracker. Level up your raider.",
        descriptionIt: "Strumenti progressione Arc Raiders: tracker missioni per tutti i mercanti, planner albero abilità, calcolatore Prove con ranking e tracker collezione blueprint. Fai salire di livello il tuo raider."
    },
    hideout: {
        titleEn: "Hideout Manager & Upgrade Planner - Arc Raiders Central",
        titleIt: "Gestione Rifugio e Upgrade - Arc Raiders Central",
        descriptionEn: "Plan all Arc Raiders hideout upgrades. Calculate materials for Scrappy levels 2-5, Workbench tiers, generate missing items list. Track Forager, Scavenger, Treasure Hunter, Master Hoarder requirements.",
        descriptionIt: "Pianifica tutti gli upgrade rifugio Arc Raiders. Calcola materiali per Scartino livelli 2-5, livelli Banco Lavoro, genera liste spesa. Traccia requisiti Foraggiatore, Sciacallo, Cacciatore Tesori."
    },
    skillTree: {
        titleEn: "Skill Tree Planner & Build Guide - Arc Raiders Central",
        titleIt: "Pianificatore Albero Abilità - Arc Raiders Central",
        descriptionEn: "Interactive Arc Raiders skill tree planner. Simulate builds, see all skill effects and costs, save multiple loadouts. Plan Combat, Survival, Scavenger, and Support skill paths.",
        descriptionIt: "Planner interattivo skill tree Arc Raiders. Simula build, vedi effetti e costi abilità, salva più loadout. Pianifica percorsi Combattimento, Sopravvivenza, Sciacallo e Supporto."
    },
    quests: {
        titleEn: "Quest Tracker & Progression Guide - Arc Raiders Central",
        titleIt: "Tracker Missioni e Progressione - Arc Raiders Central",
        descriptionEn: "Complete Arc Raiders quest database. All missions from Celeste, Scrappy, Forager with objectives, map locations, item rewards, and blueprint unlocks. Track completion progress.",
        descriptionIt: "Database completo missioni Arc Raiders. Tutte le quest di Celeste, Scartino, Foraggiatore con obiettivi, location mappe, ricompense oggetti e blueprint sbloccabili. Traccia progressi."
    },
    projects: {
        titleEn: "Project Tracker & Hideout Upgrades - Arc Raiders Central",
        titleIt: "Tracker Progetti e Upgrade Rifugio - Arc Raiders Central",
        descriptionEn: "Track all Arc Raiders expedition projects. Calculate required materials, see project chains, monitor progression toward Exodus ending. Auto-generate missing items list.",
        descriptionIt: "Traccia tutti i progetti spedizione Arc Raiders. Calcola materiali richiesti, vedi catene progetti, monitora progressione verso finale Exodus. Genera automaticamente liste spesa."
    },
    items: {
        titleEn: "All Items & Crafting Recipes - Arc Raiders Central",
        titleIt: "Tutti gli Oggetti e Ricette - Arc Raiders Central",
        descriptionEn: "Complete Arc Raiders item database. Browse all weapons, armor, consumables, materials. View damage, fire rate, crafting costs, sell prices, profit margins. Filter by rarity and type.",
        descriptionIt: "Database completo oggetti Arc Raiders. Sfoglia armi, armature, consumabili, materiali. Vedi danno, cadenza, costi crafting, prezzi vendita, margini profitto. Filtra per rarità e tipo."
    },
    blueprints: {
        titleEn: "Blueprint Tracker & Collection Guide - Arc Raiders",
        titleIt: "Tracker Blueprint e Collezione - Arc Raiders Central",
        descriptionEn: "Track all 75+ Arc Raiders blueprints. See drop locations, crafting materials, mark owned items. Find blueprints in breach rooms, weapon cases, and locked containers.",
        descriptionIt: "Traccia tutti i 75+ blueprint Arc Raiders. Vedi posizioni drop, materiali crafting, segna oggetti posseduti. Trova blueprint in stanze sfondabili, casse armi e contenitori chiusi."
    },
    missingItems: {
        titleEn: "Missing Items Tracker - Arc Raiders Central",
        titleIt: "Tracker Oggetti Mancanti - Arc Raiders Central",
        descriptionEn: "Generate Arc Raiders missing items list. Calculate all materials needed for hideout upgrades, expedition projects, and crafting. Export and share your farming checklist.",
        descriptionIt: "Genera lista oggetti mancanti Arc Raiders. Calcola tutti i materiali per upgrade rifugio, progetti spedizione e crafting. Esporta e condividi la checklist di farming."
    },
    trials: {
        titleEn: "Trials Guide & Challenges - Arc Raiders Central",
        titleIt: "Guida Prove e Sfide - Arc Raiders Central",
        descriptionEn: "Complete Arc Raiders trials guide. Track 5 weekly challenges, calculate points per action, climb from Rookie to Cantina Legend. See 2X bonus events and division ranking system.",
        descriptionIt: "Guida completa Prove Arc Raiders. Traccia 5 sfide settimanali, calcola punti per azione, scala da Recluta a Leggenda della Cantina. Vedi eventi bonus 2X e sistema ranking divisioni."
    },
    about: {
        titleEn: "About - Arc Raiders Central",
        titleIt: "Chi Siamo - Arc Raiders Central",
        descriptionEn: "Learn about Arc Raiders Central, the free companion app for Arc Raiders. Interactive maps, event timers, item database, hideout planner, quest tracker and more. Built by the community, for the community.",
        descriptionIt: "Scopri Arc Raiders Central, la companion app gratuita per Arc Raiders. Mappe interattive, timer eventi, database oggetti, planner rifugio, tracker missioni e altro. Costruita dalla community, per la community."
    },
    support: {
        titleEn: "Support Arc Raiders Central - Ko-fi",
        titleIt: "Supporta Arc Raiders Central - Ko-fi",
        descriptionEn: "Support Arc Raiders Central development. Donate to help cover hosting costs and keep the companion app free for all Raiders. Every contribution helps!",
        descriptionIt: "Supporta lo sviluppo di Arc Raiders Central. Dona per coprire i costi hosting e mantenere l'app companion gratuita per tutti i Raiders. Ogni contributo aiuta!"
    },
    privacy: {
        titleEn: "Privacy Policy - Arc Raiders Central",
        titleIt: "Informativa Privacy - Arc Raiders Central",
        descriptionEn: "Privacy policy for Arc Raiders Central. Learn how we collect, use, and protect your data.",
        descriptionIt: "Informativa privacy per Arc Raiders Central. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati."
    },
    terms: {
        titleEn: "Terms of Service - Arc Raiders Central",
        titleIt: "Termini di Servizio - Arc Raiders Central",
        descriptionEn: "Terms of service for Arc Raiders Central. Read our usage terms and conditions.",
        descriptionIt: "Termini di servizio per Arc Raiders Central. Leggi i nostri termini e condizioni di utilizzo."
    },
    cookies: {
        titleEn: "Cookie Policy - Arc Raiders Central",
        titleIt: "Cookie Policy - Arc Raiders Central",
        descriptionEn: "Cookie policy for Arc Raiders Central. Learn about cookies and tracking technologies we use.",
        descriptionIt: "Cookie policy per Arc Raiders Central. Scopri i cookie e le tecnologie di tracciamento che utilizziamo."
    },
    settings: {
        titleEn: "Settings - Arc Raiders Central",
        titleIt: "Impostazioni - Arc Raiders Central",
        descriptionEn: "Manage your Arc Raiders Central account settings. Change your nickname, language preferences, and more.",
        descriptionIt: "Gestisci le impostazioni del tuo account Arc Raiders Central. Cambia nickname, preferenze lingua e altro."
    },
    profile: {
        titleEn: "User Profile - Arc Raiders Central",
        titleIt: "Profilo Utente - Arc Raiders Central",
        descriptionEn: "View user profile, reputation, and trading history on Arc Raiders Central.",
        descriptionIt: "Visualizza profilo utente, reputazione e storico trade su Arc Raiders Central."
    },
    market: {
        titleEn: "Market - Buy & Sell Items | Arc Raiders Central",
        titleIt: "Mercato - Compra e Vendi Oggetti | Arc Raiders Central",
        descriptionEn: "Trade items with other Arc Raiders players. Buy and sell weapons, materials, and gear. Safe trading with reputation system.",
        descriptionIt: "Scambia oggetti con altri giocatori di Arc Raiders. Compra e vendi armi, materiali ed equipaggiamento. Trading sicuro con sistema reputazione."
    },
    builds: {
        titleEn: "Community Builds - Skill Tree Builds | Arc Raiders Central",
        titleIt: "Build della Community - Build Albero Abilità | Arc Raiders Central",
        descriptionEn: "Browse, vote and copy skill tree builds shared by the Arc Raiders community. Find the best builds for mobility, survival and conditioning.",
        descriptionIt: "Sfoglia, vota e copia le build dell'albero abilità condivise dalla community di Arc Raiders. Trova le migliori build per mobilità, sopravvivenza e condizionamento."
    },
    loadout: {
        titleEn: "Loadout Builder - Arc Raiders Central",
        titleIt: "Costruttore Equipaggiamento - Arc Raiders Central",
        descriptionEn: "Build and manage your Arc Raiders loadouts. Configure augments, weapons, shields, backpack, and quick use items. Calculate weight and value.",
        descriptionIt: "Costruisci e gestisci i tuoi equipaggiamenti di Arc Raiders. Configura potenziamenti, armi, scudi, zaino e oggetti rapidi. Calcola peso e valore."
    }
}
  , Wt = {
    dam: {
        titleEn: "The Dam Map - Loot & POIs | Arc Raiders Central",
        titleIt: "Mappa Diga - Loot e POI | Arc Raiders Central",
        descriptionEn: "Complete The Dam interactive map. Find Control Tower loot, Hydroponic Dome weapon cases, Water Treatment extractions, Harvester spawn. Best farming routes and raider hatch locations.",
        descriptionIt: "Mappa interattiva completa della Diga. Trova loot Torre di Controllo, casse armi Cupola Idroponica, estrazioni Trattamento Acque, spawn Raccoglitore. Migliori route farming e botole raider."
    },
    "blue-gate": {
        titleEn: "Blue Gate Map - Loot & POIs | Arc Raiders Central",
        titleIt: "Mappa Varco Blu - Loot e POI | Arc Raiders Central",
        descriptionEn: "Complete Blue Gate interactive map. Locked Gate puzzle codes, Raider's Refuge switches, Ancient Fort battery locations. Best beginner map with quick extraction routes.",
        descriptionIt: "Mappa interattiva completa Varco Blu. Codici puzzle Cancello Bloccato, interruttori Rifugio Raider, posizioni batterie Forte Antico. Mappa ideale per principianti con route estrazione veloci."
    },
    spaceport: {
        titleEn: "Spaceport Map - Loot & POIs | Arc Raiders Central",
        titleIt: "Mappa Spazioporto - Loot e POI | Arc Raiders Central",
        descriptionEn: "Complete Spaceport interactive map. Hidden Bunker antenna locations, Launch Tower loot, Central hub farming. 5 extraction points, Departure/Arrival building weapon cases.",
        descriptionIt: "Mappa interattiva completa Spazioporto. Posizioni antenne Bunker Nascosto, loot Torre Lancio, farming Hub Centrale. 5 punti estrazione, casse armi edifici Partenze/Arrivi."
    },
    "stella-montis": {
        titleEn: "Stella Montis Map - Loot & POIs | Arc Raiders Central",
        titleIt: "Mappa Stella Montis - Loot e POI | Arc Raiders Central",
        descriptionEn: "Complete Stella Montis interactive map. Two-level underground research facility. Matriarch spawn, Assembly Workshop, epic loot spawns. Extreme difficulty with best rewards.",
        descriptionIt: "Mappa interattiva completa Stella Montis. Struttura ricerca sotterranea a due livelli. Spawn Matriarca, Officina Assemblaggio, spawn loot epico. Difficoltà estrema con migliori ricompense."
    },
    "buried-city": {
        titleEn: "Buried City Map - Loot & POIs | Arc Raiders Central",
        titleIt: "Mappa Città Sepolta - Loot e POI | Arc Raiders Central",
        descriptionEn: "Complete Buried City interactive map. Marano Station parking loot, Space Travel building, Hospital basement secrets. Best Rusted Gears farming, Dog Collar residential areas.",
        descriptionIt: "Mappa interattiva completa Città Sepolta. Loot parcheggio Stazione Marano, edificio Viaggi Spaziali, segreti seminterrato Ospedale. Miglior farming Ingranaggi Arrugginiti, aree residenziali Collari."
    },
    "stella-montis-lower": {
        titleEn: "Stella Montis Lower Map - Loot & POIs | Arc Raiders",
        titleIt: "Mappa Stella Montis Inferiore - Loot e POI | Arc Raiders",
        descriptionEn: "Complete Stella Montis Lower interactive map. Deep interior labs, reactor chambers, tight corridor combat. Shredder spawns, Seed Vault loot, underground extraction points.",
        descriptionIt: "Mappa interattiva completa Stella Montis Inferiore. Laboratori interni profondi, camere reattore, combattimento corridoi stretti. Spawn Shredder, loot Deposito Semi, punti estrazione sotterranei."
    }
};
function $t(e, t) {
    const i = Ht.find(t => t.mapId === e);
    return i ? `/${t}${i[t]}` : `/${t}/maps`
}
function Qt(e) {
    const t = e.replace(/^\/(en|it)/, "") || "/";
    for (const [i,a] of Object.entries(Gt))
        if (a.en === t || a.it === t)
            return i;
    return null
}
function Kt(e) {
    const t = e.replace(/^\/(en|it)/, "");
    for (const i of Ht)
        if (i.en === t || i.it === t)
            return i.mapId;
    return null
}
function Yt(e) {
    return e.startsWith("/it") ? "it" : (e.startsWith("/en"),
    "en")
}
function Jt({to: e, mapId: t, children: i, ...o}) {
    const {preferences: r} = zt()
      , n = r.language;
    return a.jsx(s, {
        to: ( () => {
            if (e.startsWith("/en") || e.startsWith("/it"))
                return e;
            if (e.startsWith("http") || e.startsWith("#"))
                return e;
            if (t) {
                const e = Ht.find(e => e.mapId === t);
                if (e)
                    return `/${n}${e[n]}`
            }
            const i = e.replace(/^\//, "")
              , a = Gt[i];
            if (a) {
                const e = a[n];
                return `/${n}${"/" === e ? "" : e}`
            }
            for (const [,t] of Object.entries(Gt))
                if (t.en === e || t.en === `/${e}`) {
                    const e = t[n];
                    return `/${n}${"/" === e ? "" : e}`
                }
            const o = e.startsWith("/") ? e : `/${e}`;
            return `/${n}${o}`
        }
        )(),
        ...o,
        children: i
    })
}
function Zt(...e) {
    return l(c(e))
}
const Xt = u("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ui-border text-sm font-medium transition-colors:outline-none:ring-2:ring-ring:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-blue-dark text-foreground hover:bg-blue-light",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "bg-blue-dark hover:bg-blue-light text-foreground",
            secondary: "bg-blue-dark text-foreground hover:bg-blue-light",
            ghost: "hover:bg-blue-light text-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            accent: "bg-gold-accent text-blue-dark font-semibold hover:brightness-110 border-none"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})
  , ei = i.forwardRef( ({className: e, variant: t, size: i, asChild: o=!1, ...r}, n) => {
    const s = o ? d : "button";
    return a.jsx(s, {
        className: Zt(Xt({
            variant: t,
            size: i,
            className: e
        })),
        ref: n,
        ...r
    })
}
);
function ti() {
    const {t: e} = n()
      , {hasConsented: t, acceptAll: i, setIsPreferencesOpen: o} = Ut()
      , {updateEmailOptIn: r} = zt();
    return t ? null : a.jsx("div", {
        className: "fixed bottom-0 left-0 right-0 z-[1002] bg-card/95 backdrop-blur-sm border-t border-border p-4 animate-in slide-in-from-bottom duration-300",
        children: a.jsxs("div", {
            className: "max-w-[1200px] mx-auto flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-3",
            children: [a.jsx("div", {
                className: "flex-shrink-0 text-gold-accent max-md:hidden",
                children: a.jsx(p, {
                    size: 24
                })
            }), a.jsxs("div", {
                className: "flex-1 min-w-0 max-md:text-center",
                children: [a.jsx("h3", {
                    className: "text-base font-semibold text-foreground mb-1",
                    children: e("consent.title")
                }), a.jsxs("p", {
                    className: "text-sm text-muted-foreground leading-snug",
                    children: [e("consent.description"), " ", a.jsx(Jt, {
                        to: "cookies",
                        className: "text-gold-accent underline underline-offset-2 hover:text-gold-accent/80",
                        children: e("footer.cookies")
                    })]
                })]
            }), a.jsxs("div", {
                className: "flex gap-2 flex-shrink-0 max-md:flex-col",
                children: [a.jsx(ei, {
                    variant: "outline",
                    size: "sm",
                    onClick: () => o(!0),
                    className: "!px-2.5 max-md:w-full max-md:justify-center",
                    title: e("consent.customize"),
                    children: a.jsx(m, {
                        size: 18
                    })
                }), a.jsx(ei, {
                    size: "sm",
                    onClick: () => {
                        i(),
                        r(!0)
                    }
                    ,
                    className: "bg-gold-accent text-blue-dark font-semibold hover:bg-gold-accent/90 hover:text-blue-dark border-gold-accent whitespace-nowrap max-md:w-full max-md:justify-center",
                    children: e("consent.acceptAll")
                })]
            })]
        })
    })
}
ei.displayName = "Button";
const ii = i.forwardRef( ({className: e, ...t}, i) => a.jsx(g, {
    ref: i,
    className: Zt("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gold-accent data-[state=unchecked]:bg-blue-dark", e),
    ...t,
    children: a.jsx(h, {
        className: Zt("pointer-events-none block h-4 w-4 rounded-full bg-foreground shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0")
    })
}));
ii.displayName = g.displayName;
const ai = {
    sm: "max-w-[360px]",
    md: "max-w-[420px]",
    lg: "max-w-[520px]"
}
  , oi = ({open: e, onOpenChange: t, children: o}) => {
    const r = i.useRef(0)
      , n = i.useRef(0)
      , s = i.useRef(!1)
      , l = i.useRef(!0);
    i.useEffect( () => {
        if (e) {
            r.current = window.scrollY,
            document.body.style.overflow = "hidden",
            document.body.style.position = "fixed",
            document.body.style.top = `-${r.current}px`,
            document.body.style.width = "100%",
            n.current = 0,
            s.current = !1,
            l.current = !0;
            const e = () => {
                s.current ? n.current = Date.now() : (s.current = !0,
                n.current = Date.now(),
                l.current = !1,
                setTimeout( () => {
                    l.current = !0
                }
                , 500))
            }
              , i = e => {
                "Escape" === e.key && (null == t || t(!1))
            }
            ;
            return document.addEventListener("touchend", e, {
                passive: !0
            }),
            document.addEventListener("keydown", i),
            () => {
                document.removeEventListener("touchend", e),
                document.removeEventListener("keydown", i)
            }
        }
        return document.body.style.overflow = "",
        document.body.style.position = "",
        document.body.style.top = "",
        document.body.style.width = "",
        window.scrollTo(0, r.current),
        () => {
            document.body.style.overflow = "",
            document.body.style.position = "",
            document.body.style.top = "",
            document.body.style.width = ""
        }
    }
    , [e, t]);
    const c = i.useCallback( () => {
        if (!s.current)
            return void (null == t || t(!1));
        const e = Date.now() - n.current;
        l.current && e > 500 && (null == t || t(!1))
    }
    , [t]);
    return e ? a.jsx("div", {
        className: "dialog-overlay fixed inset-0 bg-background/70 flex items-center justify-center z-[9999] p-4 overflow-hidden",
        style: {
            contain: "strict"
        },
        onClick: c,
        children: i.Children.map(o, e => i.isValidElement(e) ? i.cloneElement(e, {
            onClose: () => null == t ? void 0 : t(!1)
        }) : e)
    }) : null
}
  , ri = i.forwardRef( ({className: e, children: t, maxWidth: i="md", onClose: o}, r) => a.jsxs("div", {
    ref: r,
    className: Zt("dialog-container bg-beige-light rounded-[var(--radius)] w-full overflow-hidden flex flex-col relative max-h-[85vh]", ai[i], e),
    onClick: e => e.stopPropagation(),
    children: [t, o && a.jsx("button", {
        className: "absolute top-4 right-4 bg-transparent border-none text-blue-dark/60 cursor-pointer p-1.5 rounded-[var(--radius)] flex items-center justify-center transition-colors z-[1] hover:text-blue-dark hover:bg-blue-dark/10",
        onClick: o,
        "aria-label": "Close",
        children: a.jsx(b, {
            size: 20
        })
    })]
}));
ri.displayName = "DialogContent";
const ni = ({className: e, children: t}) => a.jsx("div", {
    className: Zt("flex flex-col gap-1 px-6 pt-4 pb-4 flex-shrink-0 bg-beige-light border-b border-blue-dark/20 -mb-px", e),
    children: t
})
  , si = ({className: e, children: t}) => a.jsx("h2", {
    className: Zt("m-0 font-arc font-bold text-xl text-blue-dark uppercase tracking-wide", e),
    children: t
})
  , li = ({className: e, children: t}) => a.jsx("p", {
    className: Zt("text-sm text-blue-dark/70 m-0", e),
    children: t
})
  , ci = ({className: e, children: t}) => a.jsx("div", {
    className: Zt("dialog-footer flex gap-3 px-6 py-4 bg-blue-dark flex-shrink-0 [&>button]:flex-1 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:py-3 [&>button]:px-6 [&>button]:border-none [&>button]:rounded-full [&>button]:text-[0.85rem] [&>button]:font-semibold [&>button]:uppercase [&>button]:tracking-wider [&>button]:cursor-pointer [&>button]:transition-all [&>button:active]:scale-[0.98] [&>button:disabled]:opacity-50 [&>button:disabled]:cursor-not-allowed", e),
    children: t
})
  , di = ({className: e, children: t}) => a.jsx("div", {
    className: Zt("px-6 py-4 text-blue-dark bg-beige-light overflow-y-auto flex-1 min-h-0 [&_label]:text-blue-dark [&_label]:font-medium [&_input]:!bg-beige/50 [&_input]:border [&_input]:border-blue-dark/20 [&_input]:!text-blue-dark [&_textarea]:!bg-beige/50 [&_textarea]:border [&_textarea]:border-blue-dark/20 [&_textarea]:!text-blue-dark [&_input::placeholder]:text-blue-dark/50 [&_textarea::placeholder]:text-blue-dark/50 [&_select]:!bg-beige/50 [&_select]:!text-blue-dark", e),
    children: t
});
function ui() {
    const {t: e} = n()
      , {consent: t, isPreferencesOpen: o, setIsPreferencesOpen: r, updateConsent: s} = Ut()
      , {preferences: l, updateEmailOptIn: c} = zt()
      , [d,u] = i.useState((null == t ? void 0 : t.analytics) ?? !0)
      , [p,m] = i.useState(l.emailOptIn ?? !0);
    return i.useEffect( () => {
        t && u(t.analytics)
    }
    , [t]),
    i.useEffect( () => {
        m(!1 !== l.emailOptIn)
    }
    , [l.emailOptIn]),
    a.jsx(oi, {
        open: o,
        onOpenChange: r,
        children: a.jsxs(ri, {
            maxWidth: "md",
            className: "max-h-[90vh] overflow-y-auto",
            children: [a.jsxs(ni, {
                children: [a.jsx(si, {
                    children: e("consent.preferences.title")
                }), a.jsx(li, {
                    children: e("consent.preferences.description")
                })]
            }), a.jsx(di, {
                children: a.jsxs("div", {
                    className: "flex flex-col gap-0",
                    children: [a.jsxs("div", {
                        className: "flex items-start justify-between gap-4 p-4 bg-beige/50 border-t border-blue-dark/20 max-sm:flex-col max-sm:gap-3",
                        children: [a.jsxs("div", {
                            className: "flex-1 min-w-0 max-sm:w-full",
                            children: [a.jsxs("div", {
                                className: "flex items-center gap-2 flex-wrap",
                                children: [a.jsx("span", {
                                    className: "font-semibold text-blue-dark",
                                    children: e("consent.preferences.necessary.title")
                                }), a.jsx("span", {
                                    className: "text-xs px-2 py-0.5 bg-gold-accent text-blue-dark rounded-full font-semibold",
                                    children: e("consent.preferences.required")
                                })]
                            }), a.jsx("p", {
                                className: "text-sm text-blue-dark/70 mt-1 leading-snug",
                                children: e("consent.preferences.necessary.description")
                            })]
                        }), a.jsx(ii, {
                            checked: !0,
                            disabled: !0
                        })]
                    }), a.jsxs("div", {
                        className: "flex items-start justify-between gap-4 p-4 bg-beige/50 border-t border-blue-dark/20 max-sm:flex-col max-sm:gap-3",
                        children: [a.jsxs("div", {
                            className: "flex-1 min-w-0 max-sm:w-full",
                            children: [a.jsx("span", {
                                className: "font-semibold text-blue-dark",
                                children: e("consent.preferences.analytics.title")
                            }), a.jsx("p", {
                                className: "text-sm text-blue-dark/70 mt-1 leading-snug",
                                children: e("consent.preferences.analytics.description")
                            })]
                        }), a.jsx(ii, {
                            checked: d,
                            onCheckedChange: u
                        })]
                    }), a.jsxs("div", {
                        className: "flex items-start justify-between gap-4 p-4 bg-beige/50 border-t border-blue-dark/20 max-sm:flex-col max-sm:gap-3",
                        children: [a.jsxs("div", {
                            className: "flex-1 min-w-0 max-sm:w-full",
                            children: [a.jsx("span", {
                                className: "font-semibold text-blue-dark",
                                children: e("consent.preferences.email.title")
                            }), a.jsx("p", {
                                className: "text-sm text-blue-dark/70 mt-1 leading-snug",
                                children: e("consent.preferences.email.description")
                            })]
                        }), a.jsx(ii, {
                            checked: p,
                            onCheckedChange: m
                        })]
                    })]
                })
            }), a.jsxs(ci, {
                children: [a.jsx(ei, {
                    variant: "outline",
                    onClick: () => {
                        u((null == t ? void 0 : t.analytics) ?? !0),
                        m(!1 !== l.emailOptIn),
                        r(!1)
                    }
                    ,
                    className: "dialog-cancel",
                    children: e("consent.preferences.cancel")
                }), a.jsx(ei, {
                    onClick: () => {
                        s({
                            analytics: d
                        }),
                        c(p),
                        r(!1)
                    }
                    ,
                    className: "dialog-confirm",
                    children: e("consent.preferences.save")
                })]
            })]
        })
    })
}
function pi() {
    const {consent: e} = Ut()
      , t = i.useRef({
        analyticsConsent: !1
    });
    return i.useEffect( () => {
        e && e.analytics && !t.current.analyticsConsent && (window.gtag && window.gtag("config", "G-JP67J450SV", {
            anonymize_ip: !1,
            allow_google_signals: !0
        }),
        t.current.analyticsConsent = !0)
    }
    , [e]),
    null
}
function mi({variant: e="default", size: t="md", className: i}) {
    return a.jsx("div", {
        className: Zt("arc-spinner rounded-full", `arc-spinner--${e}`, {
            sm: "w-12 h-12",
            md: "w-16 h-16",
            lg: "w-20 h-20"
        }[t], i),
        role: "status",
        "aria-label": "Loading",
        children: a.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "100%",
            height: "100%",
            viewBox: "0 0 200 200",
            className: "rounded-full",
            children: a.jsxs("g", {
                fill: "none",
                stroke: "#e6e6e6",
                strokeWidth: "3",
                strokeLinejoin: "round",
                children: [a.jsx("circle", {
                    cx: "100",
                    cy: "100",
                    r: "98"
                }), a.jsx("circle", {
                    cx: "100",
                    cy: "100",
                    r: "10"
                }), a.jsxs("g", {
                    transform: "translate(100,100)",
                    children: [a.jsx("path", {
                        d: "M -10 34 L -20 75 A 50 55 0 0 0 20 75 L 10 34 Z"
                    }), a.jsx("g", {
                        transform: "rotate(120)",
                        children: a.jsx("path", {
                            d: "M -10 34 L -20 75 A 50 55 0 0 0 20 75 L 10 34 Z"
                        })
                    }), a.jsx("g", {
                        transform: "rotate(240)",
                        children: a.jsx("path", {
                            d: "M -10 34 L -20 75 A 50 55 0 0 0 20 75 L 10 34 Z"
                        })
                    })]
                })]
            })
        })
    })
}
function gi() {
    const {isLoading: e, variant: t} = Et();
    return a.jsx("div", {
        className: "global-loading-overlay " + (e ? "visible" : ""),
        children: a.jsx(mi, {
            variant: t,
            size: "lg"
        })
    })
}
class hi extends i.Component {
    constructor(e) {
        super(e),
        this.state = {
            hasError: !1,
            isChunkError: !1
        }
    }
    static getDerivedStateFromError(e) {
        return {
            hasError: !0,
            isChunkError: "ChunkLoadError" === e.name || e.message.includes("Loading chunk") || e.message.includes("Failed to fetch dynamically imported module") || e.message.includes("Unable to preload CSS") || e.message.includes("error loading dynamically imported module")
        }
    }
    componentDidCatch(e) {
        if (this.state.isChunkError) {
            const e = sessionStorage.getItem("chunk-error-reload")
              , t = Date.now();
            (!e || t - parseInt(e) > 1e4) && (sessionStorage.setItem("chunk-error-reload", t.toString()),
            setTimeout( () => {
                window.location.reload()
            }
            , 500))
        }
    }
    render() {
        return this.state.hasError ? this.state.isChunkError ? a.jsx("div", {
            className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4",
            children: a.jsx("div", {
                className: "text-beige text-center",
                children: a.jsx("p", {
                    children: o.t("common.updatingVersion")
                })
            })
        }) : a.jsx("div", {
            className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4",
            children: a.jsxs("div", {
                className: "text-beige text-center",
                children: [a.jsx("p", {
                    children: o.t("common.somethingWentWrong")
                }), a.jsx("button", {
                    onClick: () => window.location.reload(),
                    className: "mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90",
                    children: o.t("common.reloadPage")
                })]
            })
        }) : this.props.children
    }
}
function bi({size: e=20}) {
    return a.jsxs("svg", {
        width: e,
        height: e,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        children: [a.jsx("path", {
            d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        }), a.jsx("path", {
            d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        }), a.jsx("path", {
            d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        }), a.jsx("path", {
            d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        })]
    })
}
function fi({inMobileSidebar: e=!1}) {
    const {t: t} = n()
      , o = f()
      , r = v()
      , {user: l, loading: c, signInWithGoogle: d, signOut: u} = wt()
      , {isAdmin: p} = St()
      , {preferences: g, updateVideoBackground: h} = zt()
      , b = !1 !== g.videoBackgroundEnabled
      , [C,j] = i.useState(!1)
      , [R,T] = i.useState(!1)
      , A = i.useRef(null)
      , z = r.pathname.includes("/admin")
      , I = g.language || "en"
      , P = () => {
        e || (A.current && (clearTimeout(A.current),
        A.current = null),
        j(!0))
    }
      , N = () => {
        e || (A.current = setTimeout( () => {
            j(!1),
            A.current = null
        }
        , 100))
    }
    ;
    if (i.useEffect( () => {
        T(!1)
    }
    , [null == l ? void 0 : l.photoURL]),
    i.useEffect( () => () => {
        A.current && clearTimeout(A.current)
    }
    , []),
    c)
        return null;
    const M = Zt("font-medium text-[0.85rem] tracking-[0.1em] text-muted-foreground no-underline transition-all duration-200 whitespace-nowrap relative flex items-center m-0 gap-1.5 bg-transparent border-0 cursor-pointer font-sans", e ? "justify-start h-auto p-0 gap-0" : "h-16")
      , D = Zt("flex items-center gap-2 h-auto", e ? "cursor-default gap-3 flex-row" : "lg:flex-row-reverse")
      , B = Zt("w-10 h-10 object-cover p-0.5", e ? "shrink-0 border border-border rounded-lg" : "rounded-full border border-gold-accent")
      , E = Zt("w-10 h-10 flex items-center justify-center bg-secondary text-muted-foreground", e ? "shrink-0 border border-border rounded-lg" : "rounded-full border border-border")
      , L = Zt(B, e ? "opacity-50" : "opacity-70");
    return l ? a.jsxs("div", {
        className: M,
        onMouseEnter: P,
        onMouseLeave: N,
        children: [a.jsxs("div", {
            className: D,
            children: [l.photoURL && !R ? a.jsx("img", {
                src: l.photoURL,
                alt: l.displayName || t("common.user"),
                className: B,
                width: 40,
                height: 40,
                referrerPolicy: "no-referrer",
                onError: () => T(!0)
            }) : a.jsx("div", {
                className: E,
                children: a.jsx(y, {
                    size: 20
                })
            }), a.jsx("div", {
                className: "hidden",
                children: a.jsx("div", {
                    children: l.displayName || t("common.user")
                })
            })]
        }), a.jsx("button", {
            className: "hidden",
            onClick: u,
            title: t("common.logout"),
            children: a.jsx(_, {
                size: 20
            })
        }), !e && a.jsxs("div", {
            className: "absolute top-full right-0 min-w-[180px] bg-beige-light rounded-md z-[1001] overflow-hidden shadow transition-all duration-200 " + (C ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2.5 pointer-events-none"),
            children: [a.jsxs("button", {
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => h(!b),
                children: [b ? a.jsx(w, {
                    size: 18
                }) : a.jsx(x, {
                    size: 18
                }), a.jsx("span", {
                    children: t(b ? "common.videoOn" : "common.videoOff")
                })]
            }), a.jsxs(s, {
                to: `/${I}/${"it" === I ? "profilo" : "profile"}/${l.uid}`,
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 no-underline hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => j(!1),
                children: [a.jsx(y, {
                    size: 18
                }), a.jsx("span", {
                    children: t("nav.profile")
                })]
            }), a.jsxs(s, {
                to: `/${I}/${"it" === I ? "impostazioni" : "settings"}`,
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 no-underline hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => j(!1),
                children: [a.jsx(m, {
                    size: 18
                }), a.jsx("span", {
                    children: t("nav.settings")
                })]
            }), p && a.jsx("button", {
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => {
                    A.current && (clearTimeout(A.current),
                    A.current = null),
                    o(z ? `/${I}` : `/${I}/admin`),
                    j(!1)
                }
                ,
                children: z ? a.jsxs(a.Fragment, {
                    children: [a.jsx(k, {
                        size: 18
                    }), a.jsx("span", {
                        children: t("common.userMode")
                    })]
                }) : a.jsxs(a.Fragment, {
                    children: [a.jsx(S, {
                        size: 18
                    }), a.jsx("span", {
                        children: t("common.adminMode")
                    })]
                })
            }), a.jsxs("button", {
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => {
                    u(),
                    j(!1)
                }
                ,
                children: [a.jsx(_, {
                    size: 18
                }), a.jsx("span", {
                    children: t("common.logout")
                })]
            })]
        })]
    }) : a.jsxs("div", {
        className: M,
        onMouseEnter: P,
        onMouseLeave: N,
        children: [a.jsxs("div", {
            className: D,
            children: [a.jsx("img", {
                src: "/icons/system/Raider.webp",
                alt: t("common.guest"),
                className: L,
                width: 40,
                height: 40
            }), a.jsx("div", {
                className: "hidden",
                children: a.jsx("div", {
                    children: t("common.guest")
                })
            })]
        }), a.jsx("button", {
            className: "hidden",
            onClick: d,
            title: t("common.signInWithGoogle"),
            children: a.jsx(bi, {
                size: 20
            })
        }), !e && a.jsxs("div", {
            className: "absolute top-full right-0 min-w-[180px] bg-beige-light rounded-md z-[1001] overflow-hidden shadow transition-all duration-200 " + (C ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2.5 pointer-events-none"),
            children: [a.jsxs("button", {
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => h(!b),
                children: [b ? a.jsx(w, {
                    size: 18
                }) : a.jsx(x, {
                    size: 18
                }), a.jsx("span", {
                    children: t(b ? "common.videoOn" : "common.videoOff")
                })]
            }), a.jsxs(s, {
                to: `/${I}/${"it" === I ? "impostazioni" : "settings"}`,
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 no-underline hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => j(!1),
                children: [a.jsx(m, {
                    size: 18
                }), a.jsx("span", {
                    children: t("nav.settings")
                })]
            }), a.jsxs("button", {
                className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]",
                onClick: () => {
                    d(),
                    j(!1)
                }
                ,
                children: [a.jsx(bi, {
                    size: 18
                }), a.jsx("span", {
                    children: t("common.login")
                })]
            })]
        })]
    })
}
function vi({lang: e, size: t=18}) {
    return "it" === e ? a.jsxs("svg", {
        width: t,
        height: t,
        viewBox: "0 0 32 32",
        style: {
            borderRadius: "50%",
            overflow: "hidden"
        },
        children: [a.jsx("defs", {
            children: a.jsx("clipPath", {
                id: "circle-it",
                children: a.jsx("circle", {
                    cx: "16",
                    cy: "16",
                    r: "16"
                })
            })
        }), a.jsxs("g", {
            clipPath: "url(#circle-it)",
            children: [a.jsx("rect", {
                x: "0",
                y: "0",
                width: "11",
                height: "32",
                fill: "#009246"
            }), a.jsx("rect", {
                x: "11",
                y: "0",
                width: "10",
                height: "32",
                fill: "#fff"
            }), a.jsx("rect", {
                x: "21",
                y: "0",
                width: "11",
                height: "32",
                fill: "#ce2b37"
            })]
        })]
    }) : a.jsxs("svg", {
        width: t,
        height: t,
        viewBox: "0 0 60 60",
        style: {
            borderRadius: "50%",
            overflow: "hidden"
        },
        children: [a.jsxs("defs", {
            children: [a.jsx("clipPath", {
                id: "circle-en",
                children: a.jsx("circle", {
                    cx: "30",
                    cy: "30",
                    r: "30"
                })
            }), a.jsx("clipPath", {
                id: "t",
                children: a.jsx("path", {
                    d: "M30,30 h30 v30 z v30 h-30 z h-30 v-30 z v-30 h30 z"
                })
            })]
        }), a.jsxs("g", {
            clipPath: "url(#circle-en)",
            children: [a.jsx("rect", {
                x: "0",
                y: "0",
                width: "60",
                height: "60",
                fill: "#012169"
            }), a.jsx("path", {
                d: "M0,0 L60,60 M60,0 L0,60",
                stroke: "#fff",
                strokeWidth: "12"
            }), a.jsx("path", {
                d: "M0,0 L60,60 M60,0 L0,60",
                clipPath: "url(#t)",
                stroke: "#C8102E",
                strokeWidth: "8"
            }), a.jsx("path", {
                d: "M30,0 v60 M0,30 h60",
                stroke: "#fff",
                strokeWidth: "20"
            }), a.jsx("path", {
                d: "M30,0 v60 M0,30 h60",
                stroke: "#C8102E",
                strokeWidth: "12"
            })]
        })]
    })
}
function yi({iconOnly: e=!1}) {
    const {t: t} = n()
      , {preferences: i, updateLanguage: o} = zt()
      , r = f()
      , s = v()
      , l = C()
      , c = i.language
      , d = "en" === c ? "it" : "en"
      , u = "it" === d ? "Italiano" : "English";
    return a.jsxs("button", {
        className: Zt("group cursor-pointer transition-all duration-200 shrink-0 [&_svg]:shrink-0", e ? "w-auto h-auto p-0 border-0 bg-transparent justify-center [&_svg]:w-6 [&_svg]:h-6 [&_svg]:cursor-pointer" : "bg-transparent border border-border text-muted-foreground px-3.5 rounded-md flex items-center justify-start gap-2 text-sm font-medium h-10 hover:text-foreground hover:bg-foreground/5"),
        onClick: () => {
            const e = "en" === i.language ? "it" : "en"
              , t = function(e, t, i) {
                const a = e.match(/^\/(en|it)(\/admin.*)$/);
                if (a)
                    return `/${i}${a[2]}`;
                if (e.startsWith("/admin"))
                    return `/${i}${e}`;
                if (t) {
                    const e = Ht.find(e => e.mapId === t);
                    if (e)
                        return `/${i}${e[i]}`
                }
                const o = Kt(e);
                if (o) {
                    const e = Ht.find(e => e.mapId === o);
                    if (e)
                        return `/${i}${e[i]}`
                }
                const r = Qt(e);
                if (r) {
                    const e = Gt[r];
                    if (e) {
                        const t = e[i];
                        return `/${i}${"/" === t ? "" : t}`
                    }
                }
                return `/${i}`
            }(s.pathname, l.mapId, e);
            o(e),
            r(t)
        }
        ,
        title: t("en" === c ? "common.switchToItalian" : "common.switchToEnglish"),
        children: [a.jsx(vi, {
            lang: d,
            size: 18
        }), !e && a.jsx("span", {
            className: "text-muted-foreground transition-colors duration-150 group-hover:text-foreground",
            children: u
        })]
    })
}
function _i({src: e, alt: t, className: o="", style: r, onError: n, width: s, height: l, ...c}) {
    const [d,u] = i.useState(!1)
      , [p,m] = i.useState(!1);
    i.useEffect( () => {
        u(!1),
        m(!1)
    }
    , [e]);
    const g = i.useCallback(e => {
        e && e.complete && e.naturalWidth > 0 && u(!0)
    }
    , []);
    return a.jsx("img", {
        ref: g,
        src: e,
        alt: t,
        loading: "lazy",
        decoding: "async",
        width: s,
        height: l,
        className: `${o} transition-opacity duration-300`,
        style: {
            ...r,
            opacity: d ? 1 : .01,
            ...p && {
                display: "none"
            }
        },
        onLoad: () => {
            u(!0)
        }
        ,
        onError: e => {
            m(!0),
            n && n(e)
        }
        ,
        ...c
    })
}
const wi = {
    success: "/sounds/success.mp3",
    error: "/sounds/error.mp3",
    "notification-chat": "/sounds/notification-chat.mp3",
    "notification-trade": "/sounds/notification-trade.mp3",
    "message-send": "/sounds/message-send.mp3",
    "message-receive": "/sounds/message-receive.mp3"
}
  , xi = {
    success: .75,
    error: .75,
    "notification-chat": .75,
    "notification-trade": .75,
    "message-send": .75,
    "message-receive": .75
}
  , ki = new Map;
function Si() {
    return "false" !== localStorage.getItem("arc-raiders-notification-sound")
}
function Ci(e) {
    if (!Si())
        return;
    const t = function(e) {
        let t = ki.get(e);
        return t || (t = new Audio(wi[e]),
        t.volume = xi[e],
        ki.set(e, t)),
        t
    }(e);
    t.currentTime = 0,
    t.play().catch( () => {}
    )
}
function ji() {
    Ci("success")
}
function Ri() {
    Ci("error")
}
function Ti() {
    Ci("notification-trade")
}
function Ai() {
    Ci("message-send")
}
function zi() {
    Ci("message-receive")
}
function Ii(e) {
    if (Si())
        if (e)
            switch (e) {
            case "chat_private":
            case "chat_mention":
                zi();
                break;
            default:
                Ti()
            }
        else
            Ti()
}
const Pi = "notifications";
function Ni(e, t, i=20) {
    const a = Be(Te(ot, Pi), Ee("userId", "==", e), He("createdAt", "desc"), Ge(i));
    return Re(a, e => {
        const i = [];
        e.forEach(e => {
            var t, a;
            const o = e.data();
            i.push({
                id: e.id,
                userId: o.userId,
                type: o.type,
                title: o.title,
                message: o.message,
                link: o.link,
                read: o.read || !1,
                createdAt: (null == (a = null == (t = o.createdAt) ? void 0 : t.toMillis) ? void 0 : a.call(t)) || o.createdAt || Date.now(),
                data: o.data
            })
        }
        ),
        t(i)
    }
    )
}
async function Mi(e, t) {
    const i = "chat" === t ? ["chat_private", "chat_mention"] : ["trade_request", "trade_message", "trade_locked", "trade_completed", "trade_cancelled", "review_received", "listing_expired"]
      , a = Be(Te(ot, Pi), Ee("userId", "==", e), Ee("read", "==", !1), Ee("type", "in", i))
      , o = await Ne(a);
    if (o.empty)
        return;
    const r = Ve(ot);
    o.forEach(e => {
        r.update(e.ref, {
            read: !0
        })
    }
    ),
    await r.commit()
}
async function Di(e, t, i, a, o, r) {
    return (await Fe(Te(ot, Pi), {
        userId: e,
        type: t,
        title: i,
        message: a,
        link: o,
        read: !1,
        createdAt: Ue(),
        data: r || null
    })).id
}
async function Bi(e, t, i, a, o, r, n="en") {
    return Di(e, "chat_private", "it" === n ? "Nuovo messaggio" : "New message", `${i}: ${o.slice(0, 50)}${o.length > 50 ? "..." : ""}`, `/${n}/chat?conversation=${r}`, {
        senderId: t,
        senderName: i,
        senderPhoto: a,
        conversationId: r
    })
}
async function Ei(e, t, i, a, o, r="en") {
    const n = {
        trade_request: {
            en: "New trade request",
            it: "Nuova richiesta di scambio"
        },
        trade_message: {
            en: "New trade message",
            it: "Nuovo messaggio trade"
        },
        trade_locked: {
            en: "Trade locked",
            it: "Trade bloccato"
        },
        trade_completed: {
            en: "Trade completed",
            it: "Trade completato"
        },
        trade_cancelled: {
            en: "Trade cancelled",
            it: "Trade annullato"
        }
    }
      , s = {
        trade_request: {
            en: `${o} wants to trade for ${a}`,
            it: `${o} vuole scambiare ${a}`
        },
        trade_message: {
            en: `${o} sent a message about ${a}`,
            it: `${o} ha inviato un messaggio per ${a}`
        },
        trade_locked: {
            en: `${o} locked the trade for ${a}`,
            it: `${o} ha bloccato lo scambio per ${a}`
        },
        trade_completed: {
            en: `Trade for ${a} is complete!`,
            it: `Lo scambio per ${a} è completato!`
        },
        trade_cancelled: {
            en: `${o} cancelled the trade for ${a}`,
            it: `${o} ha annullato lo scambio per ${a}`
        }
    };
    return Di(e, t, "it" === r ? n[t].it : n[t].en, "it" === r ? s[t].it : s[t].en, `/${r}/market?tab=my-trades&trade=${i}`, {
        tradeId: i,
        itemName: a,
        senderName: o
    })
}
async function Li(e, t, i, a="en") {
    const o = "it" === a ? "Nuova recensione" : "New review"
      , r = "★".repeat(i) + "☆".repeat(5 - i);
    return Di(e, "review_received", o, "it" === a ? `${t} ti ha lasciato una recensione ${r}` : `${t} left you a review ${r}`, `/${a}/profile`, {
        senderName: t
    })
}
async function Oi(e, t, i, a="en") {
    return Di(e, "support_reply", "it" === a ? "Risposta dal supporto" : "Support reply", `${t}: ${i.slice(0, 50)}${i.length > 50 ? "..." : ""}`, `/${a}`, {
        senderName: t
    })
}
async function qi() {
    return "Notification"in window ? "granted" === Notification.permission ? "granted" : "denied" !== Notification.permission ? await Notification.requestPermission() : Notification.permission : "denied"
}
function Fi() {
    return "Notification"in window && "serviceWorker"in navigator
}
function Ui() {
    return "Notification"in window ? Notification.permission : "unsupported"
}
const Gi = Object.freeze(Object.defineProperty({
    __proto__: null,
    createChatNotification: Bi,
    createListingExpiredNotification: async function(e, t, i, a, o="en") {
        const r = {
            time: {
                en: "Listing expired",
                it: "Annuncio scaduto"
            },
            inactivity: {
                en: "Listing expired due to inactivity",
                it: "Annuncio scaduto per inattività"
            }
        }
          , n = {
            time: {
                en: `Your listing for "${i}" has expired after 7 days.`,
                it: `Il tuo annuncio per "${i}" è scaduto dopo 7 giorni.`
            },
            inactivity: {
                en: `Your listing for "${i}" has expired because you didn't respond within 48 hours.`,
                it: `Il tuo annuncio per "${i}" è scaduto perché non hai risposto entro 48 ore.`
            }
        };
        return Di(e, "listing_expired", "it" === o ? r[a].it : r[a].en, "it" === o ? n[a].it : n[a].en, `/${o}/market?tab=my-listings`, {
            listingId: t,
            itemName: i,
            reason: a
        })
    },
    createNotification: Di,
    createReviewNotification: Li,
    createSupportReplyNotification: Oi,
    createTradeNotification: Ei,
    getNotificationPermission: Ui,
    isPushSupported: Fi,
    markCategoryAsRead: Mi,
    playMessageReceive: zi,
    playMessageSend: Ai,
    playNotificationByType: Ii,
    playTradeNotification: Ti,
    requestNotificationPermission: qi,
    subscribeToNotifications: Ni
}, Symbol.toStringTag, {
    value: "Module"
}))
  , Hi = "global-chat"
  , Vi = "chat-users"
  , Wi = "conversations";
async function $i(e, t, i) {
    const a = ze(ot, Vi, e);
    await Ie(a, {
        id: e,
        displayName: t,
        photoURL: i,
        lastSeen: Date.now()
    }, {
        merge: !0
    })
}
function Qi(e) {
    return !!e && e > Date.now() - 3e5
}
function Ki(e) {
    return Re(Te(ot, Vi), t => {
        const i = [];
        t.forEach(e => {
            i.push(e.data())
        }
        ),
        e(i)
    }
    )
}
async function Yi(e) {
    const t = await lt(e);
    if (t)
        return {
            displayName: t.displayName,
            photoURL: t.photoURL
        };
    const i = ze(ot, Vi, e)
      , a = await Pe(i);
    if (a.exists()) {
        const e = a.data();
        return {
            displayName: e.displayName || "Unknown",
            photoURL: e.photoURL || null
        }
    }
    return {
        displayName: "Unknown",
        photoURL: null
    }
}
const Ji = "support-tickets"
  , Zi = "messages";
function Xi() {
    const e = "arc-support-guest-id";
    let t = localStorage.getItem(e);
    return t || (t = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    localStorage.setItem(e, t)),
    t
}
async function ea(e) {
    const t = Te(ot, Ji)
      , i = Be(t, Ee("guestId", "==", e), Ee("status", "in", ["open", "in_progress", "resolved"]))
      , a = await Ne(i);
    return a.empty ? null : a.docs[0].id
}
function ta(e) {
    const t = Te(ot, Ji)
      , i = Be(t, Ee("status", "in", ["open", "in_progress"]), He("updatedAt", "desc"));
    return Re(i, t => {
        const i = [];
        t.forEach(e => {
            var t, a, o;
            const r = e.data();
            i.push({
                id: e.id,
                guestId: r.guestId,
                guestName: r.guestName,
                status: r.status,
                createdAt: (null == (t = r.createdAt) ? void 0 : t.toMillis()) || Date.now(),
                updatedAt: (null == (a = r.updatedAt) ? void 0 : a.toMillis()) || Date.now(),
                lastReadByAdmin: (null == (o = r.lastReadByAdmin) ? void 0 : o.toMillis()) || 0
            })
        }
        ),
        e(i)
    }
    , e => {}
    )
}
const ia = "market-reviews"
  , aa = "pending-reviews"
  , oa = "user-reputation";
async function ra(e, t) {
    const i = Date.now() + 6048e5;
    await Ie(ze(ot, aa, e), {
        tradeId: e,
        completedAt: Date.now(),
        deadline: i,
        participants: t.participants,
        reviewedBy: [],
        item: t.item
    })
}
async function na(e) {
    const t = Be(Te(ot, aa), Ee("participants", "array-contains", e))
      , i = await Ne(t)
      , a = [];
    return i.forEach(t => {
        var i;
        const o = t.data();
        !(null == (i = o.reviewedBy) ? void 0 : i.includes(e)) && o.deadline > Date.now() && a.push({
            id: t.id,
            tradeId: o.tradeId,
            completedAt: o.completedAt,
            deadline: o.deadline,
            participants: o.participants,
            reviewedBy: o.reviewedBy || [],
            item: o.item
        })
    }
    ),
    a
}
async function sa(e, t, i, a, o) {
    const r = o.trim();
    if (!r || r.length < 5 || r.length > 500)
        throw new Error("invalid_comment");
    if (![1, 2, 3, 4, 5].includes(a))
        throw new Error("invalid_rating");
    if (t === i)
        throw new Error("cannot_review_self");
    const n = await lt(t)
      , s = {
        tradeId: e,
        fromUserId: t,
        fromUserName: (null == n ? void 0 : n.displayName) || "Unknown",
        fromUserPhoto: (null == n ? void 0 : n.photoURL) || null,
        toUserId: i,
        rating: a,
        comment: r,
        isAutomatic: !1,
        createdAt: Date.now()
    };
    await Fe(Te(ot, ia), {
        ...s,
        createdAt: Ue()
    });
    const l = ze(ot, aa, e)
      , c = await Pe(l);
    if (c.exists()) {
        const e = [...c.data().reviewedBy || [], t];
        await We(l, {
            reviewedBy: e
        }),
        e.length >= 2 && await Ae(l)
    }
    Li(i, (null == n ? void 0 : n.displayName) || "Unknown", a).catch( () => {}
    );
    const d = ze(ot, oa, i)
      , u = await Pe(d);
    if (u.exists()) {
        const e = u.data()
          , t = (e.totalReviews || 0) + 1
          , i = ((e.totalRatingSum || 0) + a) / t;
        await We(d, {
            totalReviews: Ke(1),
            totalRatingSum: Ke(a),
            averageRating: Math.round(10 * i) / 10,
            updatedAt: Ue()
        })
    }
}
async function la(e, t) {
    const i = ze(ot, oa, e)
      , a = await Pe(i);
    if (a.exists()) {
        const e = a.data()
          , o = (e.totalReviews || 0) + 1
          , r = ((e.totalRatingSum || 0) + t) / o;
        await We(i, {
            totalReviews: Ke(1),
            totalRatingSum: Ke(t),
            averageRating: Math.round(10 * r) / 10,
            updatedAt: Ue()
        })
    }
}
const ca = "market-listings"
  , da = "market-trades"
  , ua = "user-reputation";
function pa(e, t) {
    const i = Be(Te(ot, ca), Ee("status", "==", "active"), He("createdAt", "desc"), Ge(100));
    return Re(i, t => {
        let i = [];
        t.forEach(e => {
            var t, a, o, r;
            const n = e.data();
            i.push({
                id: e.id,
                author: n.author,
                type: n.type,
                status: n.status,
                item: n.item,
                currency: n.currency,
                priceSeeds: n.priceSeeds,
                barterPreferences: n.barterPreferences,
                description: n.description,
                initialQuantity: n.initialQuantity,
                availableQuantity: n.availableQuantity,
                hasActiveNegotiation: n.hasActiveNegotiation || !1,
                activeTradeId: n.activeTradeId,
                createdAt: (null == (a = null == (t = n.createdAt) ? void 0 : t.toMillis) ? void 0 : a.call(t)) || n.createdAt || Date.now(),
                updatedAt: (null == (r = null == (o = n.updatedAt) ? void 0 : o.toMillis) ? void 0 : r.call(o)) || n.updatedAt || Date.now(),
                expiresAt: n.expiresAt,
                ownerLastResponseAt: n.ownerLastResponseAt,
                expiredReason: n.expiredReason
            })
        }
        );
        const a = Date.now();
        i = i.filter(e => "active" === e.status && (!(e.availableQuantity <= 0) && (e.expiresAt || e.createdAt + 6048e5) > a)),
        e(i)
    }
    )
}
function ma(e, t) {
    const i = Be(Te(ot, ca), Ee("author.id", "==", e), He("createdAt", "desc"));
    return Re(i, e => {
        const i = [];
        e.forEach(e => {
            var t, a, o, r;
            const n = e.data();
            i.push({
                id: e.id,
                author: n.author,
                type: n.type,
                status: n.status,
                item: n.item,
                currency: n.currency,
                priceSeeds: n.priceSeeds,
                barterPreferences: n.barterPreferences,
                description: n.description,
                initialQuantity: n.initialQuantity,
                availableQuantity: n.availableQuantity,
                hasActiveNegotiation: n.hasActiveNegotiation || !1,
                activeTradeId: n.activeTradeId,
                createdAt: (null == (a = null == (t = n.createdAt) ? void 0 : t.toMillis) ? void 0 : a.call(t)) || n.createdAt || Date.now(),
                updatedAt: (null == (r = null == (o = n.updatedAt) ? void 0 : o.toMillis) ? void 0 : r.call(o)) || n.updatedAt || Date.now(),
                expiresAt: n.expiresAt,
                ownerLastResponseAt: n.ownerLastResponseAt,
                expiredReason: n.expiredReason
            })
        }
        ),
        t(i)
    }
    )
}
async function ga(e, t) {
    var i;
    if (t.description && t.description.trim().length > 200)
        throw new Error("description_too_long");
    if (void 0 !== t.priceSeeds && (!Number.isInteger(t.priceSeeds) || t.priceSeeds < 0))
        throw new Error("invalid_price");
    if (!Number.isInteger(t.item.quantity) || t.item.quantity < 1 || t.item.quantity > 999)
        throw new Error("invalid_quantity");
    const a = await lt(e);
    if (!a)
        throw new Error("User not found");
    if (a.isBannedSocial)
        throw new Error("banned_social");
    const o = {
        id: e,
        displayName: a.displayName,
        photoURL: a.photoURL
    }
      , r = Date.now()
      , n = null == (i = t.description) ? void 0 : i.trim()
      , s = {
        author: o,
        type: t.type,
        status: "active",
        item: t.item,
        currency: t.currency,
        initialQuantity: t.item.quantity,
        availableQuantity: t.item.quantity,
        hasActiveNegotiation: !1,
        createdAt: Ue(),
        updatedAt: Ue(),
        expiresAt: r + 6048e5,
        ...void 0 !== t.priceSeeds && {
            priceSeeds: t.priceSeeds
        },
        ...t.barterPreferences && t.barterPreferences.length > 0 && {
            barterPreferences: t.barterPreferences
        },
        ...n && {
            description: n
        }
    };
    return (await Fe(Te(ot, ca), s)).id
}
async function ha(e, t) {
    const i = ze(ot, ca, e);
    await We(i, {
        status: t,
        updatedAt: Ue()
    })
}
async function ba(e) {
    await Ae(ze(ot, ca, e))
}
async function fa() {
    var e, t;
    const {createListingExpiredNotification: i} = await Je(async () => {
        const {createListingExpiredNotification: e} = await Promise.resolve().then( () => Gi);
        return {
            createListingExpiredNotification: e
        }
    }
    , void 0)
      , a = Date.now()
      , o = Be(Te(ot, ca), Ee("status", "==", "active"))
      , r = await Ne(o);
    let n = 0;
    for (const s of r.docs) {
        const o = s.data()
          , r = (null == (t = null == (e = o.createdAt) ? void 0 : e.toMillis) ? void 0 : t.call(e)) || o.createdAt || 0
          , l = o.expiresAt || r + 6048e5
          , c = o.ownerLastResponseAt
          , d = o.hasActiveNegotiation;
        let u = !1
          , p = "time";
        l <= a ? (u = !0,
        p = "time") : d && c && a - c > 1728e5 && (u = !0,
        p = "inactivity"),
        u && (await We(ze(ot, ca, s.id), {
            status: "expired",
            expiredReason: p,
            updatedAt: Ue()
        }),
        await i(o.author.id, s.id, o.item.name, p),
        n++)
    }
    return n
}
async function va(e) {
    var t, i, a, o;
    const r = ze(ot, ca, e)
      , n = await Pe(r);
    if (!n.exists())
        return null;
    const s = n.data();
    return {
        id: n.id,
        author: s.author,
        type: s.type,
        status: s.status,
        item: s.item,
        currency: s.currency,
        priceSeeds: s.priceSeeds,
        barterPreferences: s.barterPreferences,
        description: s.description,
        initialQuantity: s.initialQuantity,
        availableQuantity: s.availableQuantity,
        hasActiveNegotiation: s.hasActiveNegotiation || !1,
        activeTradeId: s.activeTradeId,
        createdAt: (null == (i = null == (t = s.createdAt) ? void 0 : t.toMillis) ? void 0 : i.call(t)) || s.createdAt || Date.now(),
        updatedAt: (null == (o = null == (a = s.updatedAt) ? void 0 : a.toMillis) ? void 0 : o.call(a)) || s.updatedAt || Date.now(),
        expiresAt: s.expiresAt,
        ownerLastResponseAt: s.ownerLastResponseAt,
        expiredReason: s.expiredReason
    }
}
async function ya(e, t, i) {
    const a = await va(e);
    if (!a)
        throw new Error("Listing not found");
    if (a.author.id === t)
        throw new Error("Cannot buy your own listing");
    if (a.hasActiveNegotiation)
        throw new Error("Listing has active negotiation");
    const o = await lt(t);
    if (!o)
        throw new Error("Buyer not found");
    if (o.isBannedSocial)
        throw new Error("banned_social");
    const r = {
        [a.author.id]: a.author,
        [t]: {
            id: t,
            displayName: o.displayName,
            photoURL: o.photoURL
        }
    }
      , n = {
        listingId: e,
        listingType: a.type,
        participants: [a.author.id, t],
        participantDetails: r,
        item: {
            ...a.item,
            quantity: i
        },
        quantity: i,
        agreedPrice: a.priceSeeds,
        status: "negotiating",
        confirmedBy: [],
        lockedBy: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        unreadCount: {
            [a.author.id]: 1,
            [t]: 0
        }
    }
      , s = await Fe(Te(ot, da), {
        ...n,
        createdAt: Ue(),
        updatedAt: Ue()
    })
      , l = ze(ot, ca, e);
    return await We(l, {
        hasActiveNegotiation: !0,
        activeTradeId: s.id,
        ownerLastResponseAt: Date.now(),
        updatedAt: Ue()
    }),
    await ka(s.id, {
        text: "Trade started",
        senderId: "system",
        senderName: "System",
        senderPhoto: null,
        isSystemMessage: !0,
        systemAction: "trade_created"
    }),
    Ei(a.author.id, "trade_request", s.id, a.item.name, o.displayName).catch( () => {}
    ),
    s.id
}
function _a(e, t) {
    const i = Be(Te(ot, da), Ee("participants", "array-contains", e), He("updatedAt", "desc"));
    return Re(i, e => {
        const i = [];
        e.forEach(e => {
            var t, a, o, r, n, s;
            const l = e.data();
            i.push({
                id: e.id,
                listingId: l.listingId,
                listingType: l.listingType,
                participants: l.participants,
                participantDetails: l.participantDetails,
                item: l.item,
                quantity: l.quantity,
                agreedPrice: l.agreedPrice,
                agreedBarterItems: l.agreedBarterItems,
                meetingPoint: l.meetingPoint,
                status: l.status,
                confirmedBy: l.confirmedBy || [],
                lockedBy: l.lockedBy || [],
                completedAt: l.completedAt,
                createdAt: (null == (a = null == (t = l.createdAt) ? void 0 : t.toMillis) ? void 0 : a.call(t)) || l.createdAt || Date.now(),
                updatedAt: (null == (r = null == (o = l.updatedAt) ? void 0 : o.toMillis) ? void 0 : r.call(o)) || l.updatedAt || Date.now(),
                lastMessageAt: (null == (s = null == (n = l.lastMessageAt) ? void 0 : n.toMillis) ? void 0 : s.call(n)) || l.lastMessageAt,
                unreadCount: l.unreadCount || {}
            })
        }
        ),
        t(i)
    }
    )
}
async function wa(e) {
    const t = Be(Te(ot, da), Ee("participants", "array-contains", e), Ee("status", "==", "completed"), He("updatedAt", "desc"), Ge(20))
      , i = await Ne(t)
      , a = new Set;
    for (const r of i.docs) {
        const e = r.data()
          , t = e.listingId;
        if (t && !a.has(t)) {
            a.add(t);
            try {
                const i = await va(t);
                if (!i || "active" !== i.status)
                    continue;
                Math.max(0, i.availableQuantity - (e.quantity || 0)) <= 0 && await We(ze(ot, ca, t), {
                    availableQuantity: 0,
                    hasActiveNegotiation: !1,
                    activeTradeId: null,
                    status: "completed",
                    updatedAt: Ue()
                })
            } catch (o) {}
        }
    }
}
async function xa(e) {
    var t, i, a, o, r, n;
    const s = ze(ot, da, e)
      , l = await Pe(s);
    if (!l.exists())
        return null;
    const c = l.data();
    return {
        id: l.id,
        listingId: c.listingId,
        listingType: c.listingType,
        participants: c.participants,
        participantDetails: c.participantDetails,
        item: c.item,
        quantity: c.quantity,
        agreedPrice: c.agreedPrice,
        agreedBarterItems: c.agreedBarterItems,
        meetingPoint: c.meetingPoint,
        status: c.status,
        confirmedBy: c.confirmedBy || [],
        lockedBy: c.lockedBy || [],
        completedAt: c.completedAt,
        createdAt: (null == (i = null == (t = c.createdAt) ? void 0 : t.toMillis) ? void 0 : i.call(t)) || c.createdAt || Date.now(),
        updatedAt: (null == (o = null == (a = c.updatedAt) ? void 0 : a.toMillis) ? void 0 : o.call(a)) || c.updatedAt || Date.now(),
        lastMessageAt: (null == (n = null == (r = c.lastMessageAt) ? void 0 : r.toMillis) ? void 0 : n.call(r)) || c.lastMessageAt,
        unreadCount: c.unreadCount || {}
    }
}
async function ka(e, t) {
    await Fe(Te(ot, da, e, "messages"), {
        ...t,
        createdAt: Ue()
    });
    const i = await xa(e);
    if (i && "system" !== t.senderId) {
        const a = {
            ...i.unreadCount || {}
        };
        i.participants.forEach(e => {
            e !== t.senderId && (a[e] = (a[e] || 0) + 1)
        }
        ),
        await We(ze(ot, da, e), {
            lastMessageAt: Ue(),
            updatedAt: Ue(),
            unreadCount: a
        })
    }
}
async function Sa(e) {
    var t, i;
    const a = ze(ot, ua, e)
      , o = await Pe(a);
    if (!o.exists())
        return null;
    const r = o.data();
    return {
        id: e,
        totalTrades: r.totalTrades || 0,
        successfulTrades: r.successfulTrades || 0,
        cancelledTrades: r.cancelledTrades || 0,
        totalReviews: r.totalReviews || 0,
        totalRatingSum: r.totalRatingSum || 0,
        averageRating: r.averageRating || 0,
        successRate: r.successRate || 100,
        memberSince: r.memberSince || Date.now(),
        lastTradeAt: r.lastTradeAt,
        updatedAt: (null == (i = null == (t = r.updatedAt) ? void 0 : t.toMillis) ? void 0 : i.call(t)) || r.updatedAt || Date.now()
    }
}
async function Ca(e, t) {
    const i = ze(ot, ua, e)
      , a = await Pe(i);
    if (a.exists()) {
        const e = a.data()
          , o = (e.totalTrades || 0) + 1
          , r = (e.successfulTrades || 0) + ("success" === t ? 1 : 0)
          , n = Math.round(r / o * 100);
        await We(i, {
            totalTrades: Ke(1),
            successfulTrades: "success" === t ? Ke(1) : e.successfulTrades,
            cancelledTrades: "cancel" === t ? Ke(1) : e.cancelledTrades,
            successRate: n,
            lastTradeAt: Date.now(),
            updatedAt: Ue()
        })
    } else {
        const a = await lt(e);
        await Ie(i, {
            totalTrades: 1,
            successfulTrades: "success" === t ? 1 : 0,
            cancelledTrades: "cancel" === t ? 1 : 0,
            totalReviews: 0,
            totalRatingSum: 0,
            averageRating: 0,
            successRate: "success" === t ? 100 : 0,
            memberSince: (null == a ? void 0 : a.createdAt) || Date.now(),
            lastTradeAt: Date.now(),
            updatedAt: Ue()
        })
    }
}
function ja({message: e, isOwn: t, onDelete: i, onToggleLike: o, currentUserId: r, showAvatar: n=!0}) {
    var l, c;
    const {preferences: d} = zt()
      , u = d.language || "en";
    return a.jsxs("div", {
        className: "flex gap-2 group " + (t ? "flex-row-reverse" : ""),
        children: [n && a.jsx(s, {
            to: `/${u}/${"it" === u ? "profilo" : "profile"}/${e.senderId}`,
            className: "shrink-0",
            children: e.senderPhoto ? a.jsx("img", {
                src: e.senderPhoto,
                alt: e.senderName,
                className: "w-8 h-8 rounded-full object-cover",
                referrerPolicy: "no-referrer"
            }) : a.jsx("div", {
                className: "w-8 h-8 rounded-full bg-blue-dark/20 flex items-center justify-center",
                children: a.jsx(y, {
                    size: 16,
                    className: "text-blue-dark/50"
                })
            })
        }), a.jsxs("div", {
            className: Zt("flex flex-col max-w-[70%] mb-2", t ? "items-end" : "items-start"),
            children: [a.jsxs("div", {
                className: "flex items-center gap-2 mb-1 " + (t ? "flex-row-reverse" : ""),
                children: [a.jsx(s, {
                    to: `/${u}/${"it" === u ? "profilo" : "profile"}/${e.senderId}`,
                    className: "text-xs font-medium text-blue-dark/70 hover:text-blue-dark transition-colors",
                    children: e.senderName
                }), a.jsx("span", {
                    className: "text-[10px] text-blue-dark/40",
                    children: (e => {
                        const t = new Date(e)
                          , i = new Date;
                        return t.toDateString() === i.toDateString() ? t.toLocaleTimeString("it" === u ? "it-IT" : "en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                        }) : t.toLocaleDateString("it" === u ? "it-IT" : "en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                    )(e.createdAt)
                })]
            }), a.jsxs("div", {
                className: "relative",
                children: [a.jsx("div", {
                    onDoubleClick: () => {
                        o && r && o()
                    }
                    ,
                    className: Zt("px-3 py-2 rounded-2xl text-sm break-words select-none", t ? "bg-gold-accent text-blue-dark rounded-tr-sm" : "bg-blue-dark/10 text-blue-dark rounded-tl-sm"),
                    children: e.text
                }), ((null == (l = e.likedBy) ? void 0 : l.length) ?? 0) > 0 && a.jsxs("div", {
                    className: Zt("absolute -bottom-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white shadow-sm border border-blue-dark/10 text-[10px]", t ? "left-1" : "right-1"),
                    children: [a.jsx(j, {
                        size: 10,
                        className: "fill-red-500 text-red-500"
                    }), a.jsx("span", {
                        className: "text-blue-dark/70",
                        children: e.likedBy.length
                    })]
                }), a.jsxs("div", {
                    className: Zt("absolute top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity", t ? "-left-14" : "-right-14"),
                    children: [o && r && a.jsx("button", {
                        onClick: o,
                        className: "p-1 rounded-full hover:bg-red-50 transition-colors",
                        children: a.jsx(j, {
                            size: 14,
                            className: Zt("transition-colors", (null == (c = e.likedBy) ? void 0 : c.includes(r)) ? "fill-red-500 text-red-500" : "text-blue-dark/40 hover:text-red-400")
                        })
                    }), t && i && a.jsx("button", {
                        onClick: i,
                        className: "p-1 rounded-full hover:bg-red-100 transition-colors",
                        children: a.jsx(R, {
                            size: 14,
                            className: "text-red-500"
                        })
                    })]
                })]
            })]
        })]
    })
}
function Ra({date: e, lang: t}) {
    const {t: i} = n()
      , o = new Date
      , r = e.toDateString() === o.toDateString()
      , s = new Date(o);
    s.setDate(s.getDate() - 1);
    const l = e.toDateString() === s.toDateString();
    let c;
    return c = r ? i("chat.today") : l ? i("chat.yesterday") : e.toLocaleDateString("it" === t ? "it-IT" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }),
    a.jsx("div", {
        className: "flex items-center justify-center my-4",
        children: a.jsx("div", {
            className: "px-3 py-1 rounded-full bg-blue-dark/10 text-xs text-blue-dark/60",
            children: c
        })
    })
}
function Ta() {
    const {t: e} = n()
      , {user: t} = wt()
      , {preferences: o} = zt()
      , r = o.language || "en"
      , [s,l] = i.useState([])
      , [c,d] = i.useState("")
      , [u,p] = i.useState(!0)
      , [m,g] = i.useState(!1)
      , h = i.useRef(null)
      , b = i.useRef(null)
      , [f,v] = i.useState(!0)
      , [y,_] = i.useState({})
      , w = i.useRef(new Set)
      , x = i.useRef(null);
    i.useEffect( () => {
        const e = function() {
            const e = Be(Te(ot, Hi), He("createdAt", "desc"), Ge(50));
            return Re(e, e => {
                const t = [];
                var i;
                e.forEach(e => {
                    var i, a;
                    const o = e.data();
                    t.push({
                        id: e.id,
                        type: "global",
                        text: o.text,
                        senderId: o.senderId,
                        senderName: o.senderName,
                        senderPhoto: o.senderPhoto,
                        createdAt: (null == (a = null == (i = o.createdAt) ? void 0 : i.toMillis) ? void 0 : a.call(i)) || o.createdAt || Date.now(),
                        likedBy: o.likedBy || []
                    })
                }
                ),
                i = t.reverse(),
                l(i),
                p(!1)
            }
            )
        }();
        return () => e()
    }
    , []),
    i.useEffect( () => {
        const e = [...new Set(s.map(e => e.senderId))].filter(e => !w.current.has(e));
        0 !== e.length && (e.forEach(e => w.current.add(e)),
        (async () => {
            const t = {};
            await Promise.all(e.map(async e => {
                const i = await lt(e);
                i && (t[e] = {
                    displayName: i.displayName,
                    photoURL: i.photoURL
                })
            }
            )),
            _(e => ({
                ...e,
                ...t
            }))
        }
        )())
    }
    , [s]),
    i.useEffect( () => {
        f && h.current && h.current.scrollIntoView({
            behavior: "smooth"
        })
    }
    , [s, f]);
    const k = async () => {
        if (t && c.trim() && !m) {
            g(!0);
            try {
                await async function(e, t) {
                    const i = t.trim();
                    if (!i || i.length > 500)
                        throw new Error("invalid_message");
                    const a = await lt(e);
                    if (null == a ? void 0 : a.isBannedSocial)
                        throw new Error("banned_social");
                    const {displayName: o, photoURL: r} = await Yi(e);
                    await Fe(Te(ot, Hi), {
                        text: i,
                        senderId: e,
                        senderName: o,
                        senderPhoto: r,
                        createdAt: Ue()
                    }),
                    await $i(e, o, r)
                }(t.uid, c),
                d(""),
                v(!0),
                Ai(),
                setTimeout( () => {
                    var e;
                    return null == (e = x.current) ? void 0 : e.focus()
                }
                , 0)
            } catch (e) {} finally {
                g(!1)
            }
        }
    }
      , S = i.useMemo( () => {
        const e = [];
        let t = "";
        return s.forEach(i => {
            const a = new Date(i.createdAt).toDateString();
            a !== t ? (t = a,
            e.push({
                date: a,
                messages: [i]
            })) : e[e.length - 1].messages.push(i)
        }
        ),
        e
    }
    , [s]);
    return u ? a.jsx("div", {
        className: "flex-1 flex items-center justify-center",
        children: a.jsx(T, {
            className: "w-6 h-6 animate-spin text-gold-accent"
        })
    }) : a.jsxs("div", {
        className: "flex flex-col h-full",
        children: [a.jsxs("div", {
            ref: b,
            onScroll: () => {
                if (!b.current)
                    return;
                const {scrollTop: e, scrollHeight: t, clientHeight: i} = b.current;
                v(t - e - i < 50)
            }
            ,
            className: "flex-1 overflow-y-auto p-4 space-y-3",
            children: [0 === s.length ? a.jsx("div", {
                className: "flex-1 flex items-center justify-center text-blue-dark/50 text-sm",
                children: e("chat.noMessages")
            }) : S.map(e => a.jsxs("div", {
                children: [a.jsx(Ra, {
                    date: new Date(e.date),
                    lang: r
                }), a.jsx("div", {
                    className: "space-y-3",
                    children: e.messages.map(e => {
                        const i = y[e.senderId];
                        return a.jsx(ja, {
                            message: i ? {
                                ...e,
                                senderName: i.displayName,
                                senderPhoto: i.photoURL
                            } : e,
                            isOwn: e.senderId === (null == t ? void 0 : t.uid),
                            currentUserId: null == t ? void 0 : t.uid,
                            onDelete: e.senderId === (null == t ? void 0 : t.uid) ? () => (async e => {
                                try {
                                    await async function(e) {
                                        await Ae(ze(ot, Hi, e))
                                    }(e)
                                } catch (t) {}
                            }
                            )(e.id) : void 0,
                            onToggleLike: t ? () => {
                                var i;
                                const a = (null == (i = e.likedBy) ? void 0 : i.includes(t.uid)) ?? !1;
                                !async function(e, t, i) {
                                    const a = ze(ot, Hi, e);
                                    await We(a, {
                                        likedBy: i ? $e(t) : Qe(t)
                                    })
                                }(e.id, t.uid, a)
                            }
                            : void 0
                        }, e.id)
                    }
                    )
                })]
            }, e.date)), a.jsx("div", {
                ref: h
            })]
        }), a.jsx("div", {
            className: "p-3 border-t border-blue-dark/10 bg-white/50",
            children: a.jsxs("div", {
                className: "flex gap-2",
                children: [a.jsx("input", {
                    ref: x,
                    type: "text",
                    value: c,
                    onChange: e => d(e.target.value),
                    onKeyDown: e => {
                        "Enter" !== e.key || e.shiftKey || (e.preventDefault(),
                        k())
                    }
                    ,
                    placeholder: e("chat.typeMessage"),
                    className: "flex-1 px-4 py-2 rounded-full bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent transition-colors text-sm",
                    maxLength: 500,
                    disabled: m
                }), a.jsx("button", {
                    onClick: k,
                    disabled: !c.trim() || m,
                    className: "p-2 rounded-full bg-gold-accent text-blue-dark disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all",
                    children: m ? a.jsx(T, {
                        size: 20,
                        className: "animate-spin"
                    }) : a.jsx(A, {
                        size: 20
                    })
                })]
            })
        })]
    })
}
function Aa({onSelectConversation: e, onStartNewConversation: t}) {
    const {t: o} = n()
      , {user: r} = wt()
      , {preferences: s} = zt()
      , l = s.language || "en"
      , [c,d] = i.useState([])
      , [u,p] = i.useState(!0)
      , [m,g] = i.useState({})
      , h = i.useRef(new Set);
    i.useEffect( () => {
        if (!r)
            return;
        const e = function(e) {
            const t = Be(Te(ot, Wi), Ee("participants", "array-contains", e), He("updatedAt", "desc"));
            return Re(t, e => {
                const t = [];
                e.forEach(e => {
                    var i, a, o, r, n, s;
                    const l = e.data();
                    t.push({
                        id: e.id,
                        participants: l.participants,
                        participantDetails: l.participantDetails,
                        lastMessage: l.lastMessage ? {
                            text: l.lastMessage.text,
                            senderId: l.lastMessage.senderId,
                            createdAt: (null == (a = null == (i = l.lastMessage.createdAt) ? void 0 : i.toMillis) ? void 0 : a.call(i)) || l.lastMessage.createdAt || Date.now()
                        } : void 0,
                        unreadCount: l.unreadCount || {},
                        createdAt: (null == (r = null == (o = l.createdAt) ? void 0 : o.toMillis) ? void 0 : r.call(o)) || l.createdAt || Date.now(),
                        updatedAt: (null == (s = null == (n = l.updatedAt) ? void 0 : n.toMillis) ? void 0 : s.call(n)) || l.updatedAt || Date.now()
                    })
                }
                ),
                d(t),
                p(!1)
            }
            )
        }(r.uid);
        return () => e()
    }
    , [r]),
    i.useEffect( () => {
        if (!r)
            return;
        const e = c.map(e => e.participants.find(e => e !== r.uid)).filter(e => !!e).filter(e => !h.current.has(e));
        0 !== e.length && (e.forEach(e => h.current.add(e)),
        (async () => {
            const t = {};
            await Promise.all(e.map(async e => {
                const i = await lt(e);
                i && (t[e] = {
                    displayName: i.displayName,
                    photoURL: i.photoURL
                })
            }
            )),
            g(e => ({
                ...e,
                ...t
            }))
        }
        )())
    }
    , [c, r]);
    const b = e => {
        const t = new Date(e)
          , i = new Date;
        if (t.toDateString() === i.toDateString())
            return t.toLocaleTimeString("it" === l ? "it-IT" : "en-US", {
                hour: "2-digit",
                minute: "2-digit"
            });
        const a = new Date(i);
        return a.setDate(a.getDate() - 1),
        t.toDateString() === a.toDateString() ? "it" === l ? "Ieri" : "Yesterday" : t.toLocaleDateString("it" === l ? "it-IT" : "en-US", {
            month: "short",
            day: "numeric"
        })
    }
      , f = e => {
        if (!r)
            return null;
        const t = e.participants.find(e => e !== r.uid);
        if (!t)
            return null;
        const i = e.participantDetails[t]
          , a = m[t];
        return {
            id: t,
            displayName: (null == a ? void 0 : a.displayName) || (null == i ? void 0 : i.displayName) || "Unknown",
            photoURL: (null == a ? void 0 : a.photoURL) ?? (null == i ? void 0 : i.photoURL) ?? null
        }
    }
    ;
    return u ? a.jsx("div", {
        className: "flex-1 flex items-center justify-center h-full",
        children: a.jsx(T, {
            className: "w-6 h-6 animate-spin text-gold-accent"
        })
    }) : a.jsxs("div", {
        className: "flex flex-col h-full",
        children: [a.jsx("div", {
            className: "p-3 border-b border-blue-dark/10",
            children: a.jsxs("button", {
                onClick: t,
                className: "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gold-accent text-blue-dark font-medium text-sm hover:brightness-110 transition-all",
                children: [a.jsx(z, {
                    size: 16
                }), o("chat.startConversation")]
            })
        }), a.jsx("div", {
            className: "flex-1 overflow-y-auto",
            children: 0 === c.length ? a.jsxs("div", {
                className: "flex flex-col items-center justify-center h-full text-blue-dark/50 text-sm gap-2 p-4",
                children: [a.jsx(za, {
                    size: 32
                }), a.jsx("span", {
                    children: o("chat.noConversations")
                })]
            }) : c.map(t => {
                const i = f(t);
                if (!i)
                    return null;
                const n = r && t.unreadCount[r.uid] || 0;
                return a.jsxs("button", {
                    onClick: () => (t => {
                        const i = f(t);
                        i && e(t.id, i.id)
                    }
                    )(t),
                    className: "w-full flex items-center gap-3 p-3 hover:bg-blue-dark/5 transition-colors border-b border-blue-dark/5 text-left",
                    children: [i.photoURL ? a.jsx("img", {
                        src: i.photoURL,
                        alt: i.displayName,
                        className: "w-12 h-12 rounded-full object-cover shrink-0",
                        referrerPolicy: "no-referrer"
                    }) : a.jsx("div", {
                        className: "w-12 h-12 rounded-full bg-blue-dark/10 flex items-center justify-center shrink-0",
                        children: a.jsx(y, {
                            size: 20,
                            className: "text-blue-dark/50"
                        })
                    }), a.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [a.jsxs("div", {
                            className: "flex items-center justify-between gap-2",
                            children: [a.jsx("span", {
                                className: "font-medium text-blue-dark truncate",
                                children: i.displayName
                            }), t.lastMessage && a.jsx("span", {
                                className: "text-[10px] text-blue-dark/40 shrink-0",
                                children: b(t.lastMessage.createdAt)
                            })]
                        }), t.lastMessage && a.jsxs("p", {
                            className: "text-sm text-blue-dark/60 truncate",
                            children: [t.lastMessage.senderId === (null == r ? void 0 : r.uid) && a.jsxs("span", {
                                className: "text-blue-dark/40",
                                children: [o("chat.you"), ": "]
                            }), t.lastMessage.text]
                        })]
                    }), n > 0 && a.jsx("span", {
                        className: "min-w-[20px] h-[20px] px-1.5 rounded-full bg-gold-accent text-blue-dark text-xs font-bold flex items-center justify-center shrink-0",
                        children: n > 99 ? "99+" : n
                    })]
                }, t.id)
            }
            )
        })]
    })
}
function za({size: e=24}) {
    return a.jsxs("svg", {
        width: e,
        height: e,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [a.jsx("path", {
            d: "M21 15V5a2 2 0 0 0-2-2H9"
        }), a.jsx("path", {
            d: "M3 21l4-4"
        }), a.jsx("path", {
            d: "M17 17H7l-4 4V7a2 2 0 0 1 2-2"
        }), a.jsx("line", {
            x1: "2",
            y1: "2",
            x2: "22",
            y2: "22"
        })]
    })
}
function Ia({date: e, lang: t}) {
    const {t: i} = n()
      , o = new Date
      , r = e.toDateString() === o.toDateString()
      , s = new Date(o);
    s.setDate(s.getDate() - 1);
    const l = e.toDateString() === s.toDateString();
    let c;
    return c = r ? i("chat.today") : l ? i("chat.yesterday") : e.toLocaleDateString("it" === t ? "it-IT" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }),
    a.jsx("div", {
        className: "flex items-center justify-center my-4",
        children: a.jsx("div", {
            className: "px-3 py-1 rounded-full bg-blue-dark/10 text-xs text-blue-dark/60",
            children: c
        })
    })
}
function Pa({conversationId: e, partnerId: t}) {
    const {t: o} = n()
      , {user: r} = wt()
      , {preferences: l} = zt()
      , c = l.language || "en"
      , [d,u] = i.useState([])
      , [p,m] = i.useState(null)
      , [g,h] = i.useState("")
      , [b,f] = i.useState(!0)
      , [v,_] = i.useState(!1)
      , w = i.useRef(null)
      , x = i.useRef(null)
      , [k,S] = i.useState(!0)
      , C = i.useRef(null);
    i.useEffect( () => {
        (async () => {
            const e = await lt(t);
            e && m({
                id: t,
                displayName: e.displayName,
                photoURL: e.photoURL
            })
        }
        )()
    }
    , [t]),
    i.useEffect( () => {
        const e = function(e, t) {
            const i = ze(ot, Vi, e);
            return Re(i, e => {
                e.exists() ? t(e.data()) : t(null)
            }
            )
        }(t, e => {
            e && m(t => t ? {
                ...t,
                lastSeen: e.lastSeen
            } : e)
        }
        );
        return () => e()
    }
    , [t]),
    i.useEffect( () => {
        const t = function(e) {
            const t = Be(Te(ot, Wi, e, "messages"), He("createdAt", "asc"), Ge(100));
            return Re(t, t => {
                const i = [];
                t.forEach(t => {
                    var a, o;
                    const r = t.data();
                    i.push({
                        id: t.id,
                        type: "private",
                        conversationId: e,
                        text: r.text,
                        senderId: r.senderId,
                        senderName: r.senderName,
                        senderPhoto: r.senderPhoto,
                        createdAt: (null == (o = null == (a = r.createdAt) ? void 0 : a.toMillis) ? void 0 : o.call(a)) || r.createdAt || Date.now(),
                        readBy: r.readBy || [],
                        likedBy: r.likedBy || []
                    })
                }
                ),
                u(i),
                f(!1)
            }
            )
        }(e);
        return () => t()
    }
    , [e]),
    i.useEffect( () => {
        r && e && async function(e, t) {
            const i = ze(ot, Wi, e)
              , a = await Pe(i);
            if (a.exists()) {
                const e = {
                    ...a.data().unreadCount || {}
                };
                e[t] = 0,
                await We(i, {
                    unreadCount: e
                })
            }
        }(e, r.uid)
    }
    , [r, e, d]),
    i.useEffect( () => {
        k && w.current && w.current.scrollIntoView({
            behavior: "smooth"
        })
    }
    , [d, k]);
    const j = async () => {
        if (r && g.trim() && !v) {
            _(!0);
            try {
                await async function(e, t, i) {
                    const a = i.trim();
                    if (!a || a.length > 500)
                        throw new Error("invalid_message");
                    const o = await lt(t);
                    if (null == o ? void 0 : o.isBannedSocial)
                        throw new Error("banned_social");
                    const {displayName: r, photoURL: n} = await Yi(t);
                    await Fe(Te(ot, Wi, e, "messages"), {
                        text: a,
                        senderId: t,
                        senderName: r,
                        senderPhoto: n,
                        createdAt: Ue(),
                        readBy: [t]
                    });
                    const s = ze(ot, Wi, e)
                      , l = await Pe(s);
                    if (l.exists()) {
                        const a = l.data()
                          , o = a.participants
                          , c = {
                            ...a.unreadCount || {}
                        };
                        o.forEach(e => {
                            e !== t && (c[e] = (c[e] || 0) + 1)
                        }
                        ),
                        await We(s, {
                            lastMessage: {
                                text: i.trim(),
                                senderId: t,
                                createdAt: Ue()
                            },
                            unreadCount: c,
                            updatedAt: Ue()
                        }),
                        o.forEach(a => {
                            a !== t && Bi(a, t, r, n, i.trim(), e).catch( () => {}
                            )
                        }
                        )
                    }
                    await $i(t, r, n)
                }(e, r.uid, g),
                h(""),
                S(!0),
                Ai(),
                setTimeout( () => {
                    var e;
                    return null == (e = C.current) ? void 0 : e.focus()
                }
                , 0)
            } catch (t) {} finally {
                _(!1)
            }
        }
    }
      , R = !!(null == p ? void 0 : p.lastSeen) && Qi(p.lastSeen)
      , z = i.useMemo( () => {
        const e = [];
        let t = "";
        return d.forEach(i => {
            const a = new Date(i.createdAt).toDateString();
            a !== t ? (t = a,
            e.push({
                date: a,
                messages: [i]
            })) : e[e.length - 1].messages.push(i)
        }
        ),
        e
    }
    , [d]);
    return a.jsxs("div", {
        className: "flex flex-col h-full",
        children: [a.jsxs(s, {
            to: `/${c}/${"it" === c ? "profilo" : "profile"}/${t}`,
            className: "flex items-center gap-3 p-3 border-b border-blue-dark/10 hover:bg-blue-dark/5 transition-colors",
            children: [(null == p ? void 0 : p.photoURL) ? a.jsx("img", {
                src: p.photoURL,
                alt: p.displayName,
                className: "w-10 h-10 rounded-full object-cover",
                referrerPolicy: "no-referrer"
            }) : a.jsx("div", {
                className: "w-10 h-10 rounded-full bg-blue-dark/10 flex items-center justify-center",
                children: a.jsx(y, {
                    size: 18,
                    className: "text-blue-dark/50"
                })
            }), a.jsxs("div", {
                className: "flex-1 min-w-0",
                children: [a.jsx("div", {
                    className: "font-medium text-blue-dark truncate",
                    children: (null == p ? void 0 : p.displayName) || "..."
                }), a.jsxs("div", {
                    className: "flex items-center gap-1.5 text-xs",
                    children: [a.jsx("span", {
                        className: "w-2 h-2 rounded-full " + (R ? "bg-green-500" : "bg-gray-400")
                    }), a.jsx("span", {
                        className: "text-blue-dark/50",
                        children: o(R ? "chat.online" : "chat.offline")
                    })]
                })]
            })]
        }), b ? a.jsx("div", {
            className: "flex-1 flex items-center justify-center",
            children: a.jsx(T, {
                className: "w-6 h-6 animate-spin text-gold-accent"
            })
        }) : a.jsxs("div", {
            ref: x,
            onScroll: () => {
                if (!x.current)
                    return;
                const {scrollTop: e, scrollHeight: t, clientHeight: i} = x.current;
                S(t - e - i < 50)
            }
            ,
            className: "flex-1 overflow-y-auto p-4 space-y-3",
            children: [0 === d.length ? a.jsx("div", {
                className: "flex-1 flex items-center justify-center text-blue-dark/50 text-sm",
                children: o("chat.noMessages")
            }) : z.map(i => a.jsxs("div", {
                children: [a.jsx(Ia, {
                    date: new Date(i.date),
                    lang: c
                }), a.jsx("div", {
                    className: "space-y-3",
                    children: i.messages.map(i => a.jsx(ja, {
                        message: i.senderId === t && p ? {
                            ...i,
                            senderName: p.displayName,
                            senderPhoto: p.photoURL ?? i.senderPhoto
                        } : i,
                        isOwn: i.senderId === (null == r ? void 0 : r.uid),
                        currentUserId: null == r ? void 0 : r.uid,
                        onDelete: i.senderId === (null == r ? void 0 : r.uid) ? () => (async t => {
                            try {
                                await async function(e, t) {
                                    await Ae(ze(ot, Wi, e, "messages", t))
                                }(e, t)
                            } catch (i) {}
                        }
                        )(i.id) : void 0,
                        onToggleLike: r ? () => {
                            var t;
                            const a = (null == (t = i.likedBy) ? void 0 : t.includes(r.uid)) ?? !1;
                            !async function(e, t, i, a) {
                                const o = ze(ot, Wi, e, "messages", t);
                                await We(o, {
                                    likedBy: a ? $e(i) : Qe(i)
                                })
                            }(e, i.id, r.uid, a)
                        }
                        : void 0
                    }, i.id))
                })]
            }, i.date)), a.jsx("div", {
                ref: w
            })]
        }), a.jsx("div", {
            className: "p-3 border-t border-blue-dark/10 bg-white/50",
            children: a.jsxs("div", {
                className: "flex gap-2",
                children: [a.jsx("input", {
                    ref: C,
                    type: "text",
                    value: g,
                    onChange: e => h(e.target.value),
                    onKeyDown: e => {
                        "Enter" !== e.key || e.shiftKey || (e.preventDefault(),
                        j())
                    }
                    ,
                    placeholder: o("chat.typeMessage"),
                    className: "flex-1 px-4 py-2 rounded-full bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent transition-colors text-sm",
                    maxLength: 500,
                    disabled: v
                }), a.jsx("button", {
                    onClick: j,
                    disabled: !g.trim() || v,
                    className: "p-2 rounded-full bg-gold-accent text-blue-dark disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all",
                    children: v ? a.jsx(T, {
                        size: 20,
                        className: "animate-spin"
                    }) : a.jsx(A, {
                        size: 20
                    })
                })]
            })
        })]
    })
}
function Na({date: e, lang: t}) {
    const {t: i} = n()
      , o = new Date
      , r = e.toDateString() === o.toDateString()
      , s = new Date(o);
    s.setDate(s.getDate() - 1);
    const l = e.toDateString() === s.toDateString();
    let c;
    return c = r ? i("chat.today") : l ? i("chat.yesterday") : e.toLocaleDateString("it" === t ? "it-IT" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }),
    a.jsx("div", {
        className: "flex items-center justify-center my-4",
        children: a.jsx("div", {
            className: "px-3 py-1 rounded-full bg-blue-dark/10 text-xs text-blue-dark/60",
            children: c
        })
    })
}
function Ma({message: e, isOwn: t, lang: i}) {
    const {t: o} = n();
    if (e.isSystemMessage) {
        let t = e.text;
        return "SYSTEM_STATUS_IN_PROGRESS" === e.text ? t = o("chatSupport.statusInProgress") : "SYSTEM_STATUS_RESOLVED" === e.text && (t = o("chatSupport.statusResolved")),
        a.jsx("div", {
            className: "flex items-center justify-center my-3",
            children: a.jsxs("div", {
                className: "px-3 py-1.5 rounded-lg bg-cyan-500/10 text-xs text-cyan-600 flex items-center gap-2",
                children: [a.jsx(M, {
                    size: 12
                }), t]
            })
        })
    }
    const r = e.senderId.startsWith("guest_");
    return a.jsx("div", {
        className: "flex gap-2 " + (t ? "flex-row-reverse" : ""),
        children: a.jsxs("div", {
            className: "flex flex-col max-w-[75%] " + (t ? "items-end" : "items-start"),
            children: [a.jsxs("div", {
                className: "flex items-center gap-2 mb-1 " + (t ? "flex-row-reverse" : ""),
                children: [e.isSupport ? a.jsx("span", {
                    className: "text-xs font-medium text-blue-dark/70",
                    children: o("chatSupport.supportTeam")
                }) : r ? a.jsx("span", {
                    className: "text-xs font-medium text-blue-dark/70",
                    children: e.senderName
                }) : a.jsx(s, {
                    to: `/${i}/${"it" === i ? "profilo" : "profile"}/${e.senderId}`,
                    className: "text-xs font-medium text-blue-dark/70 hover:text-blue-dark transition-colors",
                    children: e.senderName
                }), a.jsx("span", {
                    className: "text-[10px] text-blue-dark/40",
                    children: (l = e.createdAt,
                    new Date(l).toLocaleTimeString("it" === i ? "it-IT" : "en-US", {
                        hour: "2-digit",
                        minute: "2-digit"
                    }))
                })]
            }), a.jsx("div", {
                className: "px-3 py-2 rounded-2xl text-sm break-words " + (t ? "bg-gold-accent text-blue-dark rounded-tr-sm" : e.isSupport ? "bg-cyan-500/20 text-blue-dark rounded-tl-sm" : "bg-blue-dark/10 text-blue-dark rounded-tl-sm"),
                children: e.text
            })]
        })
    });
    var l
}
function Da({ticketId: e, isAdmin: t, guestId: o, guestName: r, onBack: s, onTicketCreated: l}) {
    const {t: c, i18n: d} = n()
      , {user: u} = wt()
      , p = d.language || "en"
      , [m,g] = i.useState([])
      , [h,b] = i.useState("")
      , [f,v] = i.useState(!!e)
      , [y,_] = i.useState(!1)
      , [w,x] = i.useState(null)
      , k = i.useRef(null)
      , S = i.useRef(null)
      , [C,j] = i.useState(!0)
      , R = i.useRef(null);
    i.useEffect( () => {
        if (!e)
            return void v(!1);
        const t = function(e) {
            const t = Te(ot, Ji, e, Zi)
              , i = Be(t, He("createdAt", "desc"), Ge(50));
            return Re(i, t => {
                const i = [];
                var a;
                t.forEach(t => {
                    var a;
                    const o = t.data();
                    i.push({
                        id: t.id,
                        ticketId: e,
                        text: o.text,
                        senderId: o.senderId,
                        senderName: o.senderName,
                        isSupport: o.isSupport || !1,
                        isSystemMessage: o.isSystemMessage || !1,
                        createdAt: (null == (a = o.createdAt) ? void 0 : a.toMillis()) || Date.now()
                    })
                }
                ),
                a = i.reverse(),
                g(a),
                v(!1)
            }
            )
        }(e);
        return () => t()
    }
    , [e]),
    i.useEffect( () => {
        if (!t || !e)
            return;
        const i = ta(t => {
            const i = t.find(t => t.id === e);
            i && x(i)
        }
        );
        return () => i()
    }
    , [e, t]),
    i.useEffect( () => {
        t && e && async function(e) {
            const t = ze(ot, Ji, e);
            await We(t, {
                lastReadByAdmin: Ue()
            })
        }(e)
    }
    , [t, e, m]),
    i.useEffect( () => {
        C && k.current && k.current.scrollIntoView({
            behavior: "smooth"
        })
    }
    , [m, C]);
    const z = async () => {
        if (h.trim() && !y) {
            _(!0);
            try {
                let i = e;
                if (!i && o && r && (i = await async function(e, t) {
                    const i = t.trim();
                    if (!i || i.length < 2 || i.length > 30)
                        throw new Error("invalid_name");
                    const a = Te(ot, Ji);
                    return await ea(e) || (await Fe(a, {
                        guestId: e,
                        guestName: t,
                        status: "open",
                        createdAt: Ue(),
                        updatedAt: Ue()
                    })).id
                }(o, r),
                null == l || l(i)),
                !i)
                    throw new Error("No ticket ID available");
                t && u ? await async function(e, t, i) {
                    const a = Te(ot, Ji, e, Zi);
                    await Fe(a, {
                        text: t.trim(),
                        senderId: i.id,
                        senderName: i.displayName,
                        isSupport: !0,
                        createdAt: Ue()
                    });
                    const o = ze(ot, Ji, e);
                    await We(o, {
                        updatedAt: Ue()
                    });
                    const r = await Pe(o);
                    if (r.exists()) {
                        const e = r.data().guestId;
                        e && !e.startsWith("guest_") && Oi(e, i.displayName, t.trim()).catch( () => {}
                        )
                    }
                }(i, h, {
                    id: u.uid,
                    displayName: u.displayName || "Support",
                    photoURL: u.photoURL
                }) : o && r && await async function(e, t, i, a) {
                    const o = t.trim();
                    if (!o || o.length > 500)
                        throw new Error("invalid_message");
                    const r = Te(ot, Ji, e, Zi);
                    await Fe(r, {
                        text: o,
                        senderId: i,
                        senderName: a,
                        isSupport: !1,
                        createdAt: Ue()
                    });
                    const n = ze(ot, Ji, e)
                      , s = (await Pe(n)).data()
                      , l = {
                        updatedAt: Ue()
                    };
                    "resolved" === (null == s ? void 0 : s.status) && (l.status = "open"),
                    await We(n, l)
                }(i, h, o, r),
                b(""),
                j(!0),
                Ai(),
                setTimeout( () => {
                    var e;
                    return null == (e = R.current) ? void 0 : e.focus()
                }
                , 0)
            } catch (i) {} finally {
                _(!1)
            }
        }
    }
      , B = async t => {
        if (e)
            try {
                await async function(e, t) {
                    const i = ze(ot, Ji, e);
                    await We(i, {
                        status: t,
                        updatedAt: Ue()
                    });
                    const a = Te(ot, Ji, e, Zi)
                      , o = "in_progress" === t ? "SYSTEM_STATUS_IN_PROGRESS" : "SYSTEM_STATUS_RESOLVED";
                    await Fe(a, {
                        text: o,
                        senderId: "system",
                        senderName: "System",
                        isSupport: !0,
                        isSystemMessage: !0,
                        createdAt: Ue()
                    })
                }(e, t)
            } catch (i) {}
    }
      , E = i.useMemo( () => {
        const e = [];
        let t = "";
        return m.forEach(i => {
            const a = new Date(i.createdAt).toDateString();
            a !== t ? (t = a,
            e.push({
                date: a,
                messages: [i]
            })) : e[e.length - 1].messages.push(i)
        }
        ),
        e
    }
    , [m]);
    return a.jsxs("div", {
        className: "flex flex-col h-full",
        children: [a.jsxs("div", {
            className: "flex items-center gap-3 p-3 border-b border-blue-dark/10",
            children: [s && a.jsx("button", {
                onClick: s,
                className: "p-1 rounded-full hover:bg-blue-dark/5 transition-colors",
                children: a.jsx(I, {
                    size: 20,
                    className: "text-blue-dark"
                })
            }), a.jsxs("div", {
                className: "flex-1 min-w-0",
                children: [a.jsx("div", {
                    className: "font-medium text-blue-dark",
                    children: t ? (null == w ? void 0 : w.guestName) || c("chatSupport.guest") : c("chatSupport.title")
                }), t && w && a.jsx("div", {
                    className: "flex items-center gap-2 mt-1",
                    children: a.jsxs("span", {
                        className: `px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${(e => {
                            switch (e) {
                            case "open":
                                return "bg-amber-500/20 text-amber-700";
                            case "in_progress":
                                return "bg-blue-500/20 text-blue-700";
                            case "resolved":
                                return "bg-green-500/20 text-green-700"
                            }
                        }
                        )(w.status)}`,
                        children: [(e => {
                            switch (e) {
                            case "open":
                                return a.jsx(D, {
                                    size: 14
                                });
                            case "in_progress":
                                return a.jsx(N, {
                                    size: 14
                                });
                            case "resolved":
                                return a.jsx(M, {
                                    size: 14
                                })
                            }
                        }
                        )(w.status), c(`chatSupport.status.${w.status}`)]
                    })
                })]
            }), !t && a.jsx("div", {
                className: "w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center",
                children: a.jsx(P, {
                    size: 20,
                    className: "text-cyan-600"
                })
            })]
        }), t && w && "resolved" !== w.status && a.jsxs("div", {
            className: "flex gap-2 p-3 border-b border-blue-dark/10 bg-blue-dark/5",
            children: ["open" === w.status && a.jsxs(ei, {
                size: "sm",
                variant: "outline",
                onClick: () => B("in_progress"),
                className: "text-xs",
                children: [a.jsx(N, {
                    size: 14,
                    className: "mr-1"
                }), c("chatSupport.markInProgress")]
            }), a.jsxs(ei, {
                size: "sm",
                variant: "outline",
                onClick: () => B("resolved"),
                className: "text-xs",
                children: [a.jsx(M, {
                    size: 14,
                    className: "mr-1"
                }), c("chatSupport.markResolved")]
            })]
        }), f ? a.jsx("div", {
            className: "flex-1 flex items-center justify-center",
            children: a.jsx(T, {
                className: "w-6 h-6 animate-spin text-gold-accent"
            })
        }) : a.jsxs("div", {
            ref: S,
            onScroll: () => {
                if (!S.current)
                    return;
                const {scrollTop: e, scrollHeight: t, clientHeight: i} = S.current;
                j(t - e - i < 50)
            }
            ,
            className: "flex-1 overflow-y-auto p-4 space-y-3",
            children: [0 === m.length ? a.jsxs("div", {
                className: "flex-1 flex flex-col items-center justify-center text-blue-dark/50 text-sm py-8",
                children: [a.jsx(P, {
                    size: 32,
                    className: "mb-2 opacity-50"
                }), a.jsx("p", {
                    children: c("chatSupport.welcomeMessage")
                })]
            }) : E.map(e => a.jsxs("div", {
                children: [a.jsx(Na, {
                    date: new Date(e.date),
                    lang: p
                }), a.jsx("div", {
                    className: "space-y-3",
                    children: e.messages.map(e => a.jsx(Ma, {
                        message: e,
                        isOwn: t ? e.isSupport && !e.isSystemMessage : !e.isSupport,
                        lang: p
                    }, e.id))
                })]
            }, e.date)), a.jsx("div", {
                ref: k
            })]
        }), (t || "resolved" !== (null == w ? void 0 : w.status)) && a.jsx("div", {
            className: "p-3 border-t border-blue-dark/10 bg-white/50",
            children: a.jsxs("div", {
                className: "flex gap-2",
                children: [a.jsx("input", {
                    ref: R,
                    type: "text",
                    value: h,
                    onChange: e => b(e.target.value),
                    onKeyDown: e => {
                        "Enter" !== e.key || e.shiftKey || (e.preventDefault(),
                        z())
                    }
                    ,
                    placeholder: c("chat.typeMessage"),
                    className: "flex-1 px-4 py-2 rounded-full bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent transition-colors text-sm",
                    maxLength: 500,
                    disabled: y
                }), a.jsx("button", {
                    onClick: z,
                    disabled: !h.trim() || y,
                    className: "p-2 rounded-full bg-gold-accent text-blue-dark disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all",
                    children: y ? a.jsx(T, {
                        size: 20,
                        className: "animate-spin"
                    }) : a.jsx(A, {
                        size: 20
                    })
                })]
            })
        })]
    })
}
function Ba({onSelectTicket: e}) {
    const {t: t} = n()
      , [o,r] = i.useState([])
      , [s,l] = i.useState(!0);
    i.useEffect( () => {
        const e = ta(e => {
            r(e),
            l(!1)
        }
        );
        return () => e()
    }
    , []);
    const c = e => {
        const i = Date.now() - e
          , a = Math.floor(i / 36e5)
          , o = Math.floor(a / 24);
        if (o > 0)
            return `${o}d`;
        if (a > 0)
            return `${a}h`;
        const r = Math.floor(i / 6e4);
        return r > 0 ? `${r}m` : t("chatSupport.justNow")
    }
      , d = e => {
        switch (e) {
        case "open":
            return "bg-amber-500/20 text-amber-700";
        case "in_progress":
            return "bg-blue-500/20 text-blue-700";
        case "resolved":
            return "bg-green-500/20 text-green-700"
        }
    }
    ;
    return s ? a.jsx("div", {
        className: "flex items-center justify-center py-12",
        children: a.jsx(T, {
            className: "w-6 h-6 animate-spin text-gold-accent"
        })
    }) : 0 === o.length ? a.jsxs("div", {
        className: "flex flex-col items-center justify-center py-12 text-blue-dark/50",
        children: [a.jsx(P, {
            size: 48,
            className: "mb-4 opacity-50"
        }), a.jsx("p", {
            children: t("chatSupport.noTickets")
        })]
    }) : a.jsx("div", {
        className: "space-y-2 p-3",
        children: o.map(i => {
            const o = i.updatedAt > (i.lastReadByAdmin || 0);
            return a.jsx("button", {
                onClick: () => e(i),
                className: "w-full p-3 rounded-lg bg-white hover:bg-blue-dark/5 border border-blue-dark/10 text-left transition-colors",
                children: a.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [a.jsx("div", {
                        className: "w-10 h-10 rounded-full bg-blue-dark/10 flex items-center justify-center",
                        children: a.jsx(y, {
                            size: 18,
                            className: "text-blue-dark/50"
                        })
                    }), a.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [a.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [a.jsx("span", {
                                className: "font-medium text-blue-dark truncate",
                                children: i.guestName
                            }), o && a.jsx("span", {
                                className: "w-2 h-2 rounded-full bg-gold-accent shrink-0"
                            })]
                        }), a.jsxs("div", {
                            className: "flex items-center gap-2 mt-1",
                            children: [a.jsx("span", {
                                className: `px-2 py-0.5 rounded text-xs font-medium ${d(i.status)}`,
                                children: t(`chatSupport.status.${i.status}`)
                            }), a.jsx("span", {
                                className: "text-xs text-blue-dark/50",
                                children: c(i.updatedAt)
                            })]
                        })]
                    })]
                })
            }, i.id)
        }
        )
    })
}
function Ea({onSubmit: e}) {
    const {t: t} = n()
      , [o,r] = i.useState("");
    return a.jsxs("div", {
        className: "flex flex-col items-center justify-center h-full p-6",
        children: [a.jsx("div", {
            className: "w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4",
            children: a.jsx(P, {
                size: 32,
                className: "text-cyan-600"
            })
        }), a.jsx("h3", {
            className: "text-lg font-semibold text-blue-dark mb-2",
            children: t("chatSupport.title")
        }), a.jsx("p", {
            className: "text-sm text-blue-dark/60 text-center mb-6 max-w-xs",
            children: t("chatSupport.guestIntro")
        }), a.jsxs("form", {
            onSubmit: t => {
                t.preventDefault(),
                o.trim().length >= 2 && e(o.trim())
            }
            ,
            className: "w-full max-w-xs",
            children: [a.jsx("input", {
                type: "text",
                value: o,
                onChange: e => r(e.target.value),
                placeholder: t("chatSupport.enterName"),
                className: "w-full px-4 py-3 rounded-lg bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent transition-colors text-sm mb-3",
                maxLength: 30,
                minLength: 2,
                required: !0
            }), a.jsx(ei, {
                type: "submit",
                variant: "accent",
                className: "w-full",
                disabled: o.trim().length < 2,
                children: t("chatSupport.startChat")
            })]
        })]
    })
}
function La() {
    const {user: e} = wt()
      , {isAdmin: t} = St()
      , [o,r] = i.useState(null)
      , [n,s] = i.useState(null)
      , [l,c] = i.useState(null)
      , [d,u] = i.useState(!1);
    i.useEffect( () => {
        !t && e && (async () => {
            u(!0);
            try {
                const t = e.displayName || "User";
                s(t);
                const i = await ea(e.uid);
                c(i)
            } catch (t) {} finally {
                u(!1)
            }
        }
        )()
    }
    , [t, e]),
    i.useEffect( () => {
        t || e || (async () => {
            const e = localStorage.getItem("arc-support-guest-name");
            if (e) {
                s(e),
                u(!0);
                try {
                    const e = Xi()
                      , t = await ea(e);
                    c(t)
                } catch (t) {} finally {
                    u(!1)
                }
            }
        }
        )()
    }
    , [t, e]);
    return t ? o ? a.jsx(Da, {
        ticketId: o.id,
        isAdmin: !0,
        onBack: () => r(null)
    }) : a.jsx(Ba, {
        onSelectTicket: r
    }) : d ? a.jsx("div", {
        className: "flex items-center justify-center h-full",
        children: a.jsx(T, {
            className: "w-8 h-8 animate-spin text-gold-accent"
        })
    }) : e && n ? a.jsx(Da, {
        ticketId: l,
        isAdmin: !1,
        guestId: e.uid,
        guestName: n,
        onTicketCreated: c
    }) : n ? a.jsx(Da, {
        ticketId: l,
        isAdmin: !1,
        guestId: Xi(),
        guestName: n,
        onTicketCreated: c
    }) : a.jsx(Ea, {
        onSubmit: e => {
            localStorage.setItem("arc-support-guest-name", e),
            s(e)
        }
    })
}
function Oa({onClose: e, onConversationStart: t}) {
    const {t: o} = n()
      , {user: r} = wt()
      , [s,l] = i.useState("")
      , [c,d] = i.useState([])
      , [u,p] = i.useState(!1)
      , [m,g] = i.useState(null);
    return a.jsxs("div", {
        className: "fixed inset-0 z-[10010] flex items-center justify-center p-4",
        onMouseDown: e,
        children: [a.jsx("div", {
            className: "absolute inset-0 bg-black/50"
        }), a.jsxs("div", {
            className: "relative z-10 w-full max-w-md bg-beige-light rounded-2xl shadow-2xl overflow-hidden animate-fade-in",
            onMouseDown: e => e.stopPropagation(),
            children: [a.jsxs("div", {
                className: "flex items-center justify-between p-4 border-b border-blue-dark/10",
                children: [a.jsx("h3", {
                    className: "text-lg font-semibold text-blue-dark",
                    children: o("chat.startConversation")
                }), a.jsx("button", {
                    onClick: e,
                    className: "p-1 rounded-lg hover:bg-blue-dark/10 transition-colors",
                    children: a.jsx(b, {
                        size: 20,
                        className: "text-blue-dark/70"
                    })
                })]
            }), a.jsx("div", {
                className: "p-4 border-b border-blue-dark/10",
                children: a.jsxs("div", {
                    className: "relative",
                    children: [a.jsx(B, {
                        size: 18,
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-blue-dark/40"
                    }), a.jsx("input", {
                        type: "text",
                        value: s,
                        onChange: e => (async e => {
                            if (l(e),
                            e.length < 2)
                                d([]);
                            else {
                                p(!0);
                                try {
                                    const t = await async function(e, t) {
                                        const i = e.toLowerCase()
                                          , a = new Set
                                          , o = []
                                          , r = Te(ot, st);
                                        (await Ne(r)).forEach(e => {
                                            const r = e.data();
                                            if (r.id !== t)
                                                return r.displayName.toLowerCase().includes(i) ? (o.push(r),
                                                void a.add(r.id)) : void (r.nicknameHistory.some(e => e.nickname.toLowerCase().includes(i)) && (o.push(r),
                                                a.add(r.id)))
                                        }
                                        );
                                        const n = Te(ot, "chat-users");
                                        return (await Ne(n)).forEach(e => {
                                            var r;
                                            const n = e.data()
                                              , s = e.id;
                                            s !== t && (a.has(s) || (null == (r = n.displayName) ? void 0 : r.toLowerCase().includes(i)) && o.push({
                                                id: s,
                                                displayName: n.displayName,
                                                originalGoogleName: n.displayName,
                                                photoURL: n.photoURL || null,
                                                nicknameHistory: [{
                                                    nickname: n.displayName,
                                                    changedAt: n.lastSeen || Date.now()
                                                }],
                                                lastNicknameChange: null,
                                                createdAt: n.lastSeen || Date.now(),
                                                updatedAt: n.lastSeen || Date.now()
                                            }))
                                        }
                                        ),
                                        o.slice(0, 10)
                                    }(e, (null == r ? void 0 : r.uid) || "");
                                    d(t)
                                } catch (t) {
                                    d([])
                                } finally {
                                    p(!1)
                                }
                            }
                        }
                        )(e.target.value),
                        placeholder: o("chat.searchUsers"),
                        className: "w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent transition-colors text-sm",
                        autoFocus: !0
                    })]
                })
            }), a.jsx("div", {
                className: "max-h-[300px] overflow-y-auto",
                children: u ? a.jsx("div", {
                    className: "flex items-center justify-center py-8",
                    children: a.jsx(T, {
                        className: "w-6 h-6 animate-spin text-gold-accent"
                    })
                }) : s.length < 2 ? a.jsx("div", {
                    className: "flex items-center justify-center py-8 text-blue-dark/50 text-sm",
                    children: o("chat.searchUsers")
                }) : 0 === c.length ? a.jsx("div", {
                    className: "flex items-center justify-center py-8 text-blue-dark/50 text-sm",
                    children: o("common.noResults")
                }) : c.map(e => a.jsxs("button", {
                    onClick: () => (async e => {
                        if (r && !m) {
                            g(e.id);
                            try {
                                const i = await async function(e, t) {
                                    const i = Be(Te(ot, Wi), Ee("participants", "array-contains", e))
                                      , a = await Ne(i);
                                    let o = null;
                                    if (a.forEach(e => {
                                        var i, a, r, n;
                                        const s = e.data();
                                        s.participants.includes(t) && (o = {
                                            id: e.id,
                                            participants: s.participants,
                                            participantDetails: s.participantDetails,
                                            lastMessage: s.lastMessage,
                                            unreadCount: s.unreadCount || {},
                                            createdAt: (null == (a = null == (i = s.createdAt) ? void 0 : i.toMillis) ? void 0 : a.call(i)) || s.createdAt || Date.now(),
                                            updatedAt: (null == (n = null == (r = s.updatedAt) ? void 0 : r.toMillis) ? void 0 : n.call(r)) || s.updatedAt || Date.now()
                                        })
                                    }
                                    ),
                                    o)
                                        return o;
                                    const r = await Yi(e)
                                      , n = await Yi(t)
                                      , s = {
                                        [e]: {
                                            id: e,
                                            displayName: r.displayName,
                                            photoURL: r.photoURL
                                        },
                                        [t]: {
                                            id: t,
                                            displayName: n.displayName,
                                            photoURL: n.photoURL
                                        }
                                    }
                                      , l = Date.now()
                                      , c = {
                                        participants: [e, t],
                                        participantDetails: s,
                                        unreadCount: {
                                            [e]: 0,
                                            [t]: 0
                                        },
                                        createdAt: Ue(),
                                        updatedAt: Ue()
                                    };
                                    return {
                                        id: (await Fe(Te(ot, Wi), c)).id,
                                        participants: [e, t],
                                        participantDetails: s,
                                        unreadCount: {
                                            [e]: 0,
                                            [t]: 0
                                        },
                                        createdAt: l,
                                        updatedAt: l
                                    }
                                }(r.uid, e.id);
                                t(i.id, e.id)
                            } catch (i) {
                                g(null)
                            }
                        }
                    }
                    )(e),
                    disabled: m === e.id,
                    className: "w-full flex items-center gap-3 p-4 hover:bg-blue-dark/5 transition-colors border-b border-blue-dark/5 last:border-b-0 text-left disabled:opacity-50",
                    children: [e.photoURL ? a.jsx("img", {
                        src: e.photoURL,
                        alt: e.displayName,
                        className: "w-10 h-10 rounded-full object-cover shrink-0",
                        referrerPolicy: "no-referrer"
                    }) : a.jsx("div", {
                        className: "w-10 h-10 rounded-full bg-blue-dark/10 flex items-center justify-center shrink-0",
                        children: a.jsx(y, {
                            size: 18,
                            className: "text-blue-dark/50"
                        })
                    }), a.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [a.jsx("div", {
                            className: "font-medium text-blue-dark truncate",
                            children: e.displayName
                        }), e.originalGoogleName !== e.displayName && a.jsx("div", {
                            className: "text-xs text-blue-dark/50 truncate",
                            children: e.originalGoogleName
                        })]
                    }), m === e.id && a.jsx(T, {
                        size: 18,
                        className: "animate-spin text-gold-accent shrink-0"
                    })]
                }, e.id))
            })]
        })]
    })
}
const qa = {
    Legendary: "#ffc600",
    Epic: "#cc3099",
    Rare: "#00a8f2",
    Uncommon: "#26bf57",
    Common: "#6c6c6c"
};
function Fa(e) {
    return qa[e] || qa.Common
}
const Ua = "/icons/items/category/"
  , Ga = {
    "Quick Use": "Icon_QuickUse.png",
    "Quick use": "Icon_QuickUse.png",
    Consumable: "Icon_QuickUse.png",
    Gadget: "Icon_Gadget.png",
    Utility: "Icon_Utility.png",
    "Topside Material": "Icon_Material.png",
    "Refined Material": "Icon_Material.png",
    "Basic Material": "Icon_Material.png",
    "Advanced Material": "Icon_Material.png",
    Recyclable: "Icon_Material.png",
    Material: "Icon_Material.png",
    Refinement: "Icon_Material.png",
    Nature: "Icon_Nature.png",
    Healing: "Icon_Regenerative.png",
    Medical: "Icon_Medical.png",
    Regenerative: "Icon_Regenerative.png",
    Weapon: "Icon_Weapon.png",
    Modification: "Icon_WeaponMod.png",
    Mods: "Icon_WeaponMod.png",
    WeaponMod: "Icon_WeaponMod.png",
    Attachment: "Icon_WeaponMod.png",
    Ammunition: "Icon_Ammo.png",
    Ammo: "Icon_Ammo.png",
    Shield: "Icon_Shield.png",
    Augment: "Icon_Augment.png",
    Grenade: "Icon_Grenade.png",
    Trap: "Icon_Trap.png",
    Throwable: "Icon_Grenade.png",
    Key: "Icon_Key.png",
    Trinket: "Icon_Trinket.png",
    "Quest Item": "Icon_Key.png",
    Blueprint: "Icon_Misc.png",
    Cosmetic: "Icon_Trinket.png",
    Misc: "Icon_Misc.png",
    Miscellaneous: "Icon_Misc.png"
}
  , Ha = "Icon_AllItems.png";
function Va(e) {
    return e ? `${Ua}${Ga[e] || Ha}` : `${Ua}${Ha}`
}
const Wa = {
    sm: 48,
    md: 64,
    lg: 80,
    xl: 96
}
  , $a = i.forwardRef( ({item: e, quantity: t, size: o="md", className: r, onClick: n, disableHover: s=!1, showBottomBar: l=!0, showNameBar: c=!1, displayName: d, showItemName: u=!1}, p) => {
    const m = Wa[o]
      , g = Fa(e.rarity || "Common")
      , h = e.item_type || ""
      , b = Va(h)
      , f = void 0 !== t && t > 0
      , v = i.useMemo( () => `if-${Math.random().toString(36).substring(2, 11)}`, []);
    return a.jsxs("div", {
        ref: p,
        className: Zt("relative block leading-none", "transition-all duration-200", n && "cursor-pointer", n && !s && "group/frame hover:brightness-110", r),
        style: {
            width: m,
            height: m
        },
        onClick: n ? e => n(e) : void 0,
        role: n ? "button" : void 0,
        tabIndex: n ? 0 : void 0,
        onKeyDown: n ? e => {
            "Enter" !== e.key && " " !== e.key || (e.preventDefault(),
            n(e))
        }
        : void 0,
        children: [c && a.jsx("div", {
            className: "absolute inset-0 rounded-lg overflow-hidden",
            style: {
                backgroundImage: "url(/icons/blueprints/blueprint-bg.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: .082 * m
            }
        }), a.jsxs("svg", {
            width: m,
            height: m,
            viewBox: "0 0 96 96",
            xmlns: "http://www.w3.org/2000/svg",
            className: "relative",
            children: [a.jsxs("defs", {
                children: [a.jsxs("linearGradient", {
                    id: `bg-gradient-${v}`,
                    gradientUnits: "userSpaceOnUse",
                    x1: "0",
                    y1: "96",
                    x2: "95.375",
                    y2: "0.625",
                    children: [a.jsx("stop", {
                        offset: "0",
                        style: {
                            stopColor: g,
                            stopOpacity: .5
                        }
                    }), a.jsx("stop", {
                        offset: "1",
                        style: {
                            stopColor: g,
                            stopOpacity: 0
                        }
                    })]
                }), a.jsxs("linearGradient", {
                    id: `border-gradient-${v}`,
                    gradientUnits: "userSpaceOnUse",
                    x1: "0",
                    y1: "96",
                    x2: "95.375",
                    y2: "0.625",
                    children: [a.jsx("stop", {
                        offset: "0",
                        style: {
                            stopColor: g,
                            stopOpacity: 1
                        }
                    }), a.jsx("stop", {
                        offset: "1",
                        style: {
                            stopColor: g,
                            stopOpacity: .5
                        }
                    })]
                })]
            }), !c && a.jsx("rect", {
                x: "0.625",
                y: "0.625",
                width: "94.75",
                height: "94.75",
                rx: "7.91",
                ry: "7.91",
                fill: "#0b0e1b"
            }), !c && a.jsx("rect", {
                x: "0.625",
                y: "0.625",
                width: "94.75",
                height: "94.75",
                rx: "7.91",
                ry: "7.91",
                fill: `url(#bg-gradient-${v})`
            }), l && !c && a.jsx("path", {
                d: "M 0.625,71.980469 V 87.4628906 C 0.625,91.846083 4.1539194,95.375 8.5371094,95.375 H 87.462891 c 4.383192,0 7.912109,-3.528917 7.912109,-7.9121094 V 71.980469 Z",
                fill: "#0b0e1b"
            }), l && !c && a.jsx("path", {
                d: "M 45.167793,71.980469 H 50.832207 1.2287736 v -32.987308 c 0,0 7.3939389,32.987308 43.9390194,32.987308 z",
                fill: g
            }), c && a.jsx("path", {
                d: "M 0.625,71.980469 V 87.4628906 C 0.625,91.846083 4.1539194,95.375 8.5371094,95.375 H 87.462891 c 4.383192,0 7.912109,-3.528917 7.912109,-7.9121094 V 71.980469 Z",
                fill: "#0b0e1b"
            }), a.jsx("rect", {
                x: "0.625",
                y: "0.625",
                width: "94.75",
                height: "94.75",
                rx: "7.91",
                ry: "7.91",
                fill: "none",
                stroke: `url(#border-gradient-${v})`,
                strokeWidth: "1.25"
            }), l && !c && !u && f && a.jsxs("text", {
                x: "90",
                y: "88",
                textAnchor: "end",
                fill: "white",
                fontFamily: "system-ui, sans-serif",
                fontWeight: "500",
                fontSize: "12",
                children: [a.jsx("tspan", {
                    fontSize: "9",
                    children: "x"
                }), t]
            }), l && u && f && a.jsxs("text", {
                x: "91",
                y: "87",
                textAnchor: "end",
                fill: "white",
                fontFamily: "system-ui, sans-serif",
                fontWeight: "500",
                fontSize: "11",
                children: [a.jsx("tspan", {
                    fontSize: "8",
                    children: "x"
                }), t]
            }), l && u && a.jsx("text", {
                x: "22",
                y: "86",
                textAnchor: "start",
                fill: "#fff",
                fontFamily: "system-ui, sans-serif",
                fontWeight: "500",
                fontSize: "9",
                children: (d || e.name).length > 10 ? (d || e.name).substring(0, 9) + "…" : d || e.name
            }), c && a.jsx("text", {
                x: "26",
                y: "86",
                textAnchor: "start",
                fill: "#fff",
                fontFamily: "system-ui, sans-serif",
                fontWeight: "400",
                fontSize: "9",
                children: (d || e.name).length > 10 ? (d || e.name).substring(0, 9) + "…" : d || e.name
            })]
        }), e.icon ? a.jsx("img", {
            src: e.icon,
            alt: e.name,
            className: "absolute pointer-events-none",
            style: {
                width: .726 * m,
                height: .726 * m,
                left: .137 * m,
                top: l || c ? .01 * m : .137 * m,
                objectFit: "contain",
                filter: "none"
            },
            loading: "lazy"
        }) : a.jsx("div", {
            className: "absolute flex items-center justify-center pointer-events-none",
            style: {
                width: .726 * m,
                height: .726 * m,
                left: .137 * m,
                top: l || c ? .01 * m : .137 * m
            },
            children: a.jsx(E, {
                className: "text-beige",
                style: {
                    width: .4 * m,
                    height: .4 * m
                }
            })
        }), l && !c && !u && a.jsx("img", {
            src: b,
            alt: h || "item",
            className: "absolute pointer-events-none",
            style: {
                width: .156 * m,
                height: .156 * m,
                left: .059 * m,
                bottom: .051 * m,
                objectFit: "contain",
                filter: "brightness(1.3)",
                opacity: .95
            },
            loading: "lazy"
        }), l && u && a.jsx("img", {
            src: b,
            alt: h || "item",
            className: "absolute pointer-events-none",
            style: {
                width: .156 * m,
                height: .156 * m,
                left: .052 * m,
                bottom: .042 * m,
                objectFit: "contain",
                filter: "brightness(1.3)",
                opacity: .95
            },
            loading: "lazy"
        }), c && a.jsx("img", {
            src: "/icons/items/category/Icon_Blueprint.png",
            alt: "blueprint",
            className: "absolute pointer-events-none",
            style: {
                width: .156 * m,
                height: .156 * m,
                left: .059 * m,
                bottom: .051 * m,
                objectFit: "contain",
                filter: "brightness(1.3)",
                opacity: .95
            },
            loading: "lazy"
        })]
    })
}
);
$a.displayName = "ItemFrame";
const Qa = {
    "ARC Alloy": "Lega ARC",
    "ARC Circuitry": "Circuito ARC",
    "ARC Coolant": "Refrigerante ARC",
    "ARC Flex Rubber": "Gomma Flessibile ARC",
    "ARC Motion Core": "Nucleo di Movimento ARC",
    "ARC Performance Steel": "Acciaio Prestante ARC",
    "ARC Powercell": "Cellula ARC",
    "ARC Synthetic Resin": "Resina Sintetica ARC",
    "ARC Thermo Lining": "Rivestimento Termico ARC",
    "Advanced ARC Powercell": "Cellula ARC Avanzata",
    "Burned ARC Circuitry": "Circuito ARC Bruciato",
    "Damaged ARC Motion Core": "Nucleo di Movimento ARC Danneggiato",
    "Damaged ARC Powercell": "Cellula ARC Danneggiata",
    "Degraded ARC Rubber": "Gomma ARC Degradata",
    "Dried-Out ARC Resin": "Resina ARC Essiccata",
    "Impure ARC Coolant": "Refrigerante ARC Impuro",
    "Rusty ARC Steel": "Acciaio ARC Arrugginito",
    "Tattered ARC Lining": "Rivestimento ARC Lacerato",
    "Bastion Cell": "Cella Bastione",
    "Bombardier Cell": "Cella Bombardiere",
    Wire: "Filo",
    Wires: "Cavi",
    Battery: "Batteria",
    "Industrial Battery": "Batteria Industriale",
    "Metal Parts": "Componenti Metallici",
    "Metal Brackets": "Staffe di Metallo",
    "Plastic Parts": "Componenti Plastici",
    "Rubber Parts": "Componenti di Gomma",
    "Steel Spring": "Molla in Acciaio",
    "Duct Tape": "Nastro Adesivo",
    Rope: "Corda",
    Resin: "Resina",
    Coolant: "Refrigerante",
    Oil: "Olio",
    "Advanced Mechanical Components": "Componenti Meccanici Avanzati",
    "Advanced Electrical Components": "Componenti Elettrici Avanzati",
    "Mechanical Components": "Componenti Meccanici",
    "Electrical Components": "Componenti Elettrici",
    "Medium Gun Parts": "Parti di Armi Medie",
    "Heavy Gun Parts": "Parti di Armi Pesanti",
    "Light Gun Parts": "Parti di Armi Leggere",
    "Simple Gun Parts": "Parti di Pistole Semplici",
    "Complex Gun Parts": "Parti di Armi Complesse",
    "Shotgun Parts": "Parti di Fucile",
    "Mod Components": "Componenti per Mod",
    Chemicals: "Sostanze Chimiche",
    Electronics: "Elettronica",
    Fabric: "Stoffa",
    "Durable Cloth": "Stoffa Resistente",
    Plastics: "Plastiche",
    Sensors: "Sensori",
    Processor: "Processore",
    Motor: "Motore",
    Magnet: "Magnete",
    "Industrial Magnet": "Magnete Industriale",
    "Power Cable": "Cavo di Alimentazione",
    "Medium Ammo": "Munizioni Medie",
    "Heavy Ammo": "Munizioni Pesanti",
    "Light Ammo": "Munizioni Leggere",
    "Shotgun Ammo": "Munizioni per Fucile",
    "Sniper Ammo": "Munizioni da Cecchino",
    "Launcher Ammo": "Munizioni Lanciatore",
    "Energy Clip": "Clip Energetica",
    "Energy Ammo Blueprint": "Progetto Munizioni Energetiche",
    "Launcher Ammo Blueprint": "Progetto Munizioni da Lanciatore",
    "Adrenaline Shot": "Iniezione di Adrenalina",
    "Sterilized Bandage": "Bende Sterilizzate",
    "Sterilized Bandage Blueprint": "Progetto Bende Sterilizzate",
    Bandage: "Bende",
    "Herbal Bandage": "Bendaggio Erboristico",
    "Vita Shot": "Iniezione di Vita",
    "Vita Shot Blueprint": "Progetto Iniezione di Vita",
    "Vita Spray": "Vita Spray",
    "Vita Spray Blueprint": "Progetto Vita Spray",
    Antiseptic: "Antisettico",
    Defibrillator: "Defibrillatore",
    "Defibrillator Blueprint": "Progetto Defibrillatore",
    "Medical Kit": "Kit Medico",
    "First Aid Kit": "Kit di Pronto Soccorso",
    Syringe: "Siringa",
    Zipline: "Zipline",
    "Smoke Grenade": "Granata Fumogena",
    "Smoke Grenade Blueprint": "Progetto Granata Fumogena",
    "Blaze Grenade": "Granata Incendiaria",
    "Blaze Grenade Blueprint": "Progetto Granata Incendiaria",
    "Blaze Grenade Trap": "Trappola Granata Incendiaria",
    "Frag Grenade": "Granata a Frammentazione",
    "Gas Grenade": "Granata a Gas",
    "Gas Grenade Trap": "Trappola Granata a Gas",
    "Lure Grenade": "Granata Esca",
    "Lure Grenade Blueprint": "Progetto Granata Esca",
    "Seeker Grenade": "Granata a Ricerca",
    "Seeker Grenade Blueprint": "Progetto Granata a Ricerca",
    "Shrapnel Grenade": "Granata a Frammentazione",
    "Tagging Grenade": "Granata di Marcatura",
    "Tagging Grenade Blueprint": "Progetto Granata di Marcatura",
    "Trailblazer Grenade": "Trailblazer",
    "Trailblazer Grenade Blueprint": "Progetto Trailblazer",
    "Trigger Nade": "Granata Detonatrice",
    "Trigger Nade Blueprint": "Progetto Granata Detonatrice",
    "Snap Blast Grenade": "Granata a Rapida Esplosione",
    "Light Impact Grenade": "Granata a Impatto Leggero",
    "Heavy Fuze Grenade": "Granata a Spoletta Pesante",
    "Heavy Fuse Grenade Blueprint": "Progetto Granata a Spoletta Pesante",
    "Li'l Smoke Grenade": "Granata Fumogena Piccola",
    "Surge Shield Recharger": "Caricascudi Rapido",
    "Shield Recharger": "Caricascudi",
    "Shield Cell": "Cella Scudo",
    "Barricade Kit": "Kit Barriera",
    "Barricade Kit Blueprint": "Progetto Kit Barriera",
    "Door Blocker": "Bloccaporta",
    "Door Blocker Blueprint": "Progetto Bloccaporta",
    Noisemaker: "Rumorista",
    "Light Shield": "Scudo Leggero",
    "Medium Shield": "Scudo Medio",
    "Heavy Shield": "Scudo Pesante",
    "Extended Light Mag": "Caricatore Leggero Esteso",
    "Extended Light Mag Blueprint": "Progetto Caricatore Leggero Esteso",
    "Extended Medium Mag": "Caricatore Medio Esteso",
    "Extended Medium Mag Blueprint": "Progetto Caricatore Medio Esteso",
    "Extended Heavy Mag": "Caricatore Pesante Esteso",
    "Extended Heavy Mag Blueprint": "Progetto Caricatore Pesante Esteso",
    "Extended Shotgun Mag": "Caricatore Esteso Fucile",
    "Extended Shotgun Mag Blueprint": "Progetto Caricatore Esteso Fucile",
    "Extended Shotgun Mag II": "Caricatore Esteso Fucile II",
    "Extended Shotgun Mag II Blueprint": "Progetto Caricatore Esteso Fucile II",
    "Extended Shotgun Mag III": "Caricatore Esteso Fucile III",
    "Extended Shotgun Mag III Blueprint": "Progetto Caricatore Esteso Fucile III",
    Compensator: "Compensatore",
    "Compensator Blueprint": "Progetto Compensatore",
    "Stable Stock": "Calcio Stabile",
    "Stable Stock Blueprint": "Progetto Calcio Stabile",
    "Padded Stock": "Calcio Imbottito",
    "Padded Stock Blueprint": "Progetto Calcio Imbottito",
    "Lightweight Stock": "Calcio Leggero",
    "Lightweight Stock Blueprint": "Progetto Calcio Leggero",
    "Angled Grip": "Impugnatura Angolata",
    "Angled Grip Blueprint": "Progetto Impugnatura Angolata",
    "Vertical Grip": "Impugnatura Verticale",
    "Vertical Grip Blueprint": "Progetto Impugnatura Verticale",
    "Horizontal Grip": "Impugnatura Orizzontale",
    "Horizontal Grip Blueprint": "Progetto Impugnatura Orizzontale",
    "Holographic Sight": "Mirino Olografico",
    "Red Dot Sight": "Mirino Punto Rosso",
    "Tactical Scope": "Ottica Tattica",
    "Sniper Scope": "Ottica da Cecchino",
    Suppressor: "Silenziatore",
    Silencer: "Silenziatore",
    "Silencer Blueprint": "Progetto Silenziatore",
    "Shotgun Silencer": "Silenziatore per Fucile",
    "Shotgun Silencer Blueprint": "Progetto Silenziatore per Fucile",
    "Muzzle Brake": "Freno di Bocca",
    "Muzzle Brake Blueprint": "Progetto Freno di Bocca",
    "Shotgun Choke": "Strozzatore Fucile",
    "Shotgun Choke Blueprint": "Progetto Strozzatore Fucile",
    "Extended Barrel": "Canna Estesa",
    "Extended Barrel Blueprint": "Progetto Canna Estesa",
    Anvil: "Incudine",
    "Anvil Blueprint": "Progetto Incudine",
    "Anvil Splitter": "Spaccaincudine",
    "Anvil Splitter Blueprint": "Progetto Spaccaincudine",
    Aphelion: "Aphelion",
    "Aphelion Rifle Blueprint": "Progetto Fucile Aphelion",
    Arpeggio: "Arpeggio",
    Bettina: "Bettina",
    "Bettina Blueprint": "Progetto Bettina",
    Bobcat: "Lince",
    "Bobcat Blueprint": "Progetto Lince",
    Burletta: "Burletta",
    "Burletta Blueprint": "Progetto Burletta",
    Equalizer: "Equalizzatore",
    "Equalizer Blueprint": "Progetto Equalizzatore",
    Ferro: "Ferro",
    Hairpin: "Tornante",
    Hullcracker: "Spaccascudi",
    "Hullcracker Blueprint": "Progetto Spaccascudi",
    "Il Toro": "Il Toro",
    "Il Toro Blueprint": "Progetto Il Toro",
    Jupiter: "Giove",
    "Jupiter Blueprint": "Progetto Giove",
    Osprey: "Falco Pescatore",
    "Osprey Blueprint": "Progetto Falco Pescatore",
    Rattler: "Rattler",
    Renegade: "Renegade",
    "Renegade Blueprint": "Progetto Renegade",
    Showstopper: "Granata Stordente",
    "Showstopper Blueprint": "Progetto Granata Stordente",
    Stitcher: "Stitcher",
    Tempest: "Tempesta",
    "Tempest Blueprint": "Progetto Tempesta",
    Torrente: "Torrente",
    "Torrente Blueprint": "Progetto Torrente",
    Venator: "Venator",
    "Venator Blueprint": "Progetto Venator",
    Vulcano: "Vulcano",
    "Vulcano Blueprint": "Progetto Vulcano",
    WolfPack: "Branco di Lupi",
    Wolfpack: "Branco di Lupi",
    "Wolfpack Blueprint": "Progetto Branco di Lupi",
    Deadline: "Deadline",
    Agave: "Agave",
    "Agave Juice": "Succo di Agave",
    Apricot: "Albicocca",
    Lemon: "Limone",
    Olives: "Olive",
    "Prickly Pear": "Fico d'India",
    Banana: "Banana",
    "Bloated Tuna Can": "Lattina di Tonno Gonfia",
    "Assorted Seeds": "Semi Assortiti",
    Candleberries: "Baccandele",
    "Fruit Mix": "Mix di Frutta",
    "Great Mullein": "Verbasco",
    Moss: "Muschio",
    Mushroom: "Fungo",
    Roots: "Radici",
    "Torch Ginger": "Zenzero Torcia",
    Fertilizer: "Fertilizzante",
    "Expired Pasta": "Pasta Scaduta",
    "Explosive Mine": "Mina Esplosiva",
    "Explosive Mine Blueprint": "Progetto Mina Esplosiva",
    "Gas Mine": "Mina a Gas",
    "Gas Mine Blueprint": "Progetto Mina a Gas",
    "Jolt Mine": "Mina a Scossa",
    "Jolt Mine Blueprint": "Progetto Mina a Scossa",
    "Pulse Mine": "Mina a Impulsi",
    "Pulse Mine Blueprint": "Progetto Mina a Impulsi",
    "Laser Trap: Fire Blueprint": "Progetto Trappola Laser: Fuoco",
    "Laser Trap: Gas Blueprint": "Progetto Trappola Laser: Gas",
    "Laser Trap: Lure": "Trappola Laser: Richiamo",
    "Laser Trap: Smoke": "Trappola Laser: Fumo",
    "Blue Light Stick": "Bastone Luminoso Blu",
    "Blue Light Stick Blueprint": "Progetto Bastone Luminoso Blu",
    "Green Light Stick": "Bastone Luminoso Verde",
    "Green Light Stick Blueprint": "Progetto Bastone Luminoso Verde",
    "Red Light Stick": "Bastone Luminoso Rosso",
    "Red Light Stick Blueprint": "Progetto Bastone Luminoso Rosso",
    "Yellow Light Stick": "Bastone Luminoso Giallo",
    "Yellow Light Stick Blueprint": "Progetto Bastone Luminoso Giallo",
    "Combat Mk. 1": "Combattimento Mk. 1",
    "Combat Mk. 2": "Combattimento Mk. 2",
    "Combat Mk. 3 (Aggressive)": "Combattimento Mk. 3 (Aggressivo)",
    "Combat Mk.3 (Aggressive) Blueprint": "Progetto Combattimento Mk.3 (Aggressivo)",
    "Combat Mk. 3 (Flanking)": "Combattimento Mk. 3 (Fiancheggiamento)",
    "Combat Mk.3 (Flanking) Blueprint": "Progetto Combattimento Mk.3 (Fiancheggiamento)",
    "Looting Mk. 1": "Saccheggio Mk. 1",
    "Looting Mk. 2": "Saccheggio Mk. 2",
    "Looting MK. 3 (Cautious)": "Saccheggio MK. 3 (Cauto)",
    "Looting MK. 3 (Survivor)": "Saccheggio MK. 3 (Sopravvissuto)",
    "Looting MK. 3 (Survivor) Blueprint": "Progetto Saccheggio MK. 3 (Sopravvissuto)",
    "Looting MK.3 (Safekeeper)": "Saccheggio MK.3 (Custode)",
    "Looting MK.3 (Safekeeper) Blueprint": "Progetto Saccheggio MK.3 (Custode)",
    "Tactical Mk. 1": "Tattico Mk. 1",
    "Tactical Mk. 2": "Tattico Mk. 2",
    "Tactical Mk. 3 (Healing)": "Tattico Mk. 3 (Curativo)",
    "Tactical MK.3 (Healing) Blueprint": "Progetto Tattico MK.3 (Curativo)",
    "Tactical Mk.3 (Defensive)": "Tattico Mk.3 (Difensivo)",
    "Tactical MK.3 (Defensive) Blueprint": "Progetto Tattico MK.3 (Difensivo)",
    "Tactical Mk. 3 (Revival)": "Tattico Mk. 3 (Rianimazione)",
    "Tactical MK.3 (Revival) Blueprint": "Progetto Tattico MK.3 (Rianimazione)",
    "Free Loadout Augment": "Potenziamento Equipaggiamento Gratuito",
    "Ruined Augment": "Potenziamento Rovinato",
    "Broken Flashlight": "Torcia Rotta",
    "Broken Guidance System": "Sistema di Guida Rotto",
    "Broken Handcuffs": "Manette Rotte",
    "Broken Handheld Radio": "Radio Portatile Rotta",
    "Broken Riot Shield": "Scudo Antisommossa Rotto",
    "Broken Taser": "Taser Rotto",
    "Cracked Bioscanner": "Bioscanner Incrinato",
    "Damaged Fireball Burner": "Bruciatore Palla di Fuoco Danneggiato",
    "Damaged Heat Sink": "Dissipatore di Calore Danneggiato",
    "Damaged Hornet Driver": "Driver Calabrone Danneggiato",
    "Damaged Rocketeer Driver": "Driver Lanciarazzi Danneggiato",
    "Damaged Tick Pod": "Capsula di Pulce Danneggiata",
    "Damaged Wasp Driver": "Driver Vespa Danneggiato",
    "Deflated Football": "Pallone Sgonfio",
    "Expired Respirator": "Respiratore Scaduto",
    "Fried Motherboard": "Scheda Madre Fritta",
    "Polluted Air Filter": "Filtro Aria Inquinato",
    "Ruined Accordion": "Fisarmonica Rovinata",
    "Ruined Baton": "Manganello Rovinato",
    "Ruined Handcuffs": "Manette Rovinate",
    "Ruined Parachute": "Paracadute Rovinato",
    "Ruined Riot Shield": "Scudo Antisommossa Rovinato",
    "Ruined Tactical Vest": "Giubbotto Tattico Rovinato",
    "Rusted Bolts": "Bulloni Arrugginiti",
    "Rusted Gear": "Ingranaggio Arrugginito",
    "Rusted Shut Medical Kit": "Kit Medico Arrugginito Chiuso",
    "Rusted Tools": "Attrezzi Arrugginiti",
    "Torn Blanket": "Coperta Strappata",
    "Torn Book": "Libro Strappato",
    "Unusable Weapon": "Arma Inutilizzabile",
    "Crumpled Plastic Bottle": "Bottiglia di Plastica Accartocciata",
    "Empty Wine Bottle": "Bottiglia di Vino Vuota",
    "Ripped Safety Vest": "Giubbotto di Sicurezza Strappato",
    "Tattered Clothes": "Vestiti Laceri",
    Blueprint: "Progetto",
    Key: "Chiave",
    "Key Card": "Scheda Chiave",
    "Camera Lens": "Lente Fotocamera",
    "Candle Holder": "Portacandele",
    Canister: "Tanica",
    "Cat Bed": "Lettino per Gatti",
    "Air Freshener": "Deodorante per Ambienti",
    "Alarm Clock": "Sveglia",
    "Bicycle Pump": "Pompa per Bicicletta",
    Binoculars: "Binocolo",
    Briefcase: "Valigetta",
    "Coffee Pot": "Caffettiera",
    "Dart Board": "Bersaglio Freccette",
    "Diving Goggles": "Occhiali da Sub",
    "Dog Collar": "Collare per Cani",
    "Frying Pan": "Padella",
    "Garlic Press": "Spremiaglio",
    Headphones: "Cuffie",
    Humidifier: "Umidificatore",
    "Ice Cream Scooper": "Cucchiaio per Gelato",
    Kettle: "Bollitore",
    "Light Bulb": "Lampadina",
    Microscope: "Microscopio",
    "Music Album": "Album Musicale",
    "Music Box": "Carillon",
    "Number Plate": "Targa",
    "Painted Box": "Scatola Dipinta",
    "Playing Cards": "Carte da Gioco",
    "Portable TV": "TV Portatile",
    Pottery: "Ceramica",
    Projector: "Proiettore",
    Radio: "Radio",
    Recorder: "Registratore",
    "Rubber Duck": "Paperella di Gomma",
    Statuette: "Statuetta",
    Thermostat: "Termostato",
    Toaster: "Tostapane",
    Vase: "Vaso",
    "Fine Wristwatch": "Orologio da Polso Pregiato",
    Rosary: "Rosario",
    "Silver Teaspoon Set": "Set Cucchiaini d'Argento",
    "Red Coral Jewelry": "Gioiello di Corallo Rosso",
    "Breathtaking Snow Globe": "Palla di Neve Mozzafiato",
    "Faded Photograph": "Fotografia Sbiadita",
    "Film Reel": "Bobina Cinematografica",
    "Poster of Natural Wonder": "Poster di Meraviglia Naturale",
    "Lance's Mixtape (5th Edition)": "Mixtape di Lance (5a Edizione)",
    "Cooling Coil": "Bobina di Raffreddamento",
    "Cooling Fan": "Ventola di Raffreddamento",
    "ESR Analyzer": "Analizzatore ESR",
    "Fireball Burner": "Bruciatore Palla di Fuoco",
    "Flow Controller": "Regolatore di Flusso",
    "Frequency Modulation Box": "Box Modulazione Frequenza",
    "Geiger Counter": "Contatore Geiger",
    "Hornet Driver": "Driver Calabrone",
    "Industrial Charger": "Caricatore Industriale",
    "Ion Sputter": "Polverizzatore Ionico",
    "Kinetic Converter": "Convertitore Cinetico",
    "Kinetic Converter Blueprint": "Progetto Convertitore Cinetico",
    "Laboratory Reagents": "Reagenti di Laboratorio",
    "Leaper Pulse Unit": "Unità a Impulsi Leaper",
    "Lidar Scanner": "Scanner Lidar",
    "Magnetic Accelerator": "Acceleratore Magnetico",
    Magnetron: "Magnetron",
    "Mini Centrifuge": "Mini Centrifuga",
    "Photoelectric Cloak": "Mantello Fotoelettrico",
    "Power Bank": "Power Bank",
    "Power Rod": "Asta di Trasmissione",
    "Power Rod Blueprint": "Progetto Asta di Trasmissione",
    "Radio Relay": "Relè Radio",
    "Remote Control": "Telecomando",
    "Rocket Thruster": "Propulsore Razzo",
    "Rocketeer Driver": "Driver Lanciarazzi",
    "Rotary Encoder": "Encoder Rotativo",
    "Rubber Pad": "Cuscinetto di Gomma",
    "Sample Cleaner": "Pulitore Campioni",
    "Sentinel Firing Core": "Nucleo di Tiro Sentinella",
    "Shredder Gyro": "Giroscopio Trituratore",
    "Signal Amplifier": "Amplificatore di Segnale",
    "Snap Hook": "Gancio a Scatto",
    "Snap Hook Blueprint": "Progetto Gancio a Scatto",
    "Snitch Scanner": "Scanner Snitch",
    "Speaker Component": "Componente Altoparlante",
    Spectrometer: "Spettrometro",
    "Spectrum Analyzer": "Analizzatore di Spettro",
    "Spotter Relay": "Relè Spotter",
    "Spring Cushion": "Cuscino a Molla",
    "Synthesized Fuel": "Carburante Sintetizzato",
    "Telemetry Transceiver": "Ricetrasmettitore Telemetrico",
    "Tick Pod": "Capsula di Pulce",
    "Turbo Pump": "Pompa Turbo",
    "Voltage Converter": "Convertitore di Tensione",
    "Water Filter": "Filtro Acqua",
    "Water Pump": "Pompa Acqua",
    "Wasp Driver": "Driver Vespa",
    "Matriarch Reactor": "Reattore Matriarca",
    "Queen Reactor": "Reattore Regina",
    "Crude Explosives": "Esplosivi Grezzi",
    "Explosive Compound": "Composto Esplosivo",
    "Flame Spray": "Spray Fiamma",
    "Household Cleaner": "Detergente per Casa",
    "Pop Trigger": "Detonatore Pop",
    "Remote Raider Flare": "Lampo Raider Telecomandato",
    "Remote Raider Flare Blueprint": "Progetto Lampo Raider Telecomandato",
    "Fireworks Box": "Scatola di Fuochi d'Artificio",
    "Fireworks Box Blueprint": "Progetto Scatola di Fuochi d'Artificio",
    "Volcanic Rock": "Roccia Vulcanica",
    "Exodus Modules": "Moduli Exodus",
    "Surveyor Vault": "Cassaforte del Supervisore",
    "Refinement 1": "Raffinamento 1",
    "Blue Gate Cellar Key": "Chiave Cantina Blue Gate",
    "Blue Gate Communication Tower Key": "Chiave Torre Comunicazioni Blue Gate",
    "Blue Gate Confiscation Room Key": "Chiave Sala Confisca Blue Gate",
    "Blue Gate Village Key": "Chiave Villaggio Blue Gate",
    "Buried City Hospital Key": "Chiave Ospedale Buried City",
    "Buried City JKV Employee Access Card": "Scheda Accesso Dipendenti JKV Buried City",
    "Buried City Residential Master Key": "Chiave Maestra Residenziale Buried City",
    "Buried City Town Hall Key": "Chiave Municipio Buried City",
    "Dam Control Center Tower Key": "Chiave Torre Centro Controllo Diga",
    "Dam Staff Room Key": "Chiave Sala Staff Diga",
    "Dam Surveillance Key": "Chiave Sorveglianza Diga",
    "Dam Testing Annex Key": "Chiave Annesso Test Diga",
    "Dam Utility Key": "Chiave Utenze Diga",
    "Patrol Car Key": "Chiave Auto Pattuglia",
    "Raider Hatch Key": "Chiave Botola Raider",
    "Spaceport Container Storage Key": "Chiave Deposito Container Spazioporto",
    "Spaceport Control Tower Key": "Chiave Torre Controllo Spazioporto",
    "Spaceport Outskirts Bunker Key": "Chiave Bunker Periferia Spazioporto",
    "Spaceport Trench Tower Key": "Chiave Torre Trincea Spazioporto",
    "Spaceport Warehouse Key": "Chiave Magazzino Spazioporto",
    "Stella Montis Archives Key": "Chiave Archivi Stella Montis",
    "Stella Montis Assembly Admin Key": "Chiave Amministrazione Assemblaggio Stella Montis",
    "Stella Montis Medical Storage Key": "Chiave Deposito Medico Stella Montis",
    "Stella Montis Security Checkpoint Key": "Chiave Checkpoint Sicurezza Stella Montis",
    Outfit: "Outfit",
    Color: "Colore",
    Colour: "Colore",
    Variant: "Variante",
    Style: "Stile",
    Emote: "Emote",
    Charm: "Ciondolo",
    Attachment: "Accessorio",
    "Backpack Charm": "Ciondolo Zaino",
    "Backpack Attachment": "Accessorio Zaino",
    "Face Style": "Stile Viso",
    Aviator: "Aviatore",
    "Aviator (Outfit)": "Aviatore (Outfit)",
    Hiker: "Escursionista",
    Junior: "Junior",
    "Junior (Outfit)": "Junior (Outfit)",
    Patrol: "Pattuglia",
    "Patrol (Outfit)": "Pattuglia (Outfit)",
    "Radio Renegade": "Radio Rinnegato",
    "Radio Renegade (Outfit)": "Radio Rinnegato (Outfit)",
    Origin: "Origine",
    Black: "Nero",
    White: "Bianco",
    Blue: "Blu",
    Yellow: "Giallo",
    Red: "Rosso",
    Green: "Verde",
    Orange: "Arancione",
    "Black & White (Origin Color)": "Bianco e Nero (Colore Origin)",
    "Black (Hiker Colour)": "Nero (Colore Escursionista)",
    "Black Eye (Face Style)": "Occhio Nero (Stile Viso)",
    "Blue (Radio Renegade Color)": "Blu (Colore Radio Rinnegato)",
    "Blue Yellow (Aviator Color)": "Blu Giallo (Colore Aviatore)",
    "Crimson Racer (Aviator Colour)": "Racer Cremisi (Colore Aviatore)",
    "Orange Camo (Origin Outfit)": "Camo Arancione (Outfit Origin)",
    "Bag (Radio Renegade Variant)": "Borsa (Variante Radio Rinnegato)",
    "Goggles (Radio Renegade Variant)": "Occhiali (Variante Radio Rinnegato)",
    "Helmet (Radio Renegade Variant)": "Casco (Variante Radio Rinnegato)",
    "Banana (Backpack Charm)": "Banana (Ciondolo Zaino)",
    "Burgerboy (Backpack Charm)": "Burgerboy (Ciondolo Zaino)",
    "Mastery Medal (Backpack Charm)": "Medaglia Maestria (Ciondolo Zaino)",
    "Succulent (Backpack Charm)": "Succulenta (Ciondolo Zaino)",
    "Briefcase (Backpack Attachment)": "Valigetta (Accessorio Zaino)",
    "Cans (Backpack Attachment)": "Lattine (Accessorio Zaino)",
    "Very Comfortable Pillow": "Cuscino Molto Confortevole",
    "Bow and Arrow (Emote)": "Arco e Freccia (Emote)",
    "Cheer (Emote)": "Esultanza (Emote)",
    "Happy Jig (Emote)": "Ballo Felice (Emote)",
    Splitter: "Divisore",
    Driver: "Driver",
    Trap: "Trappola",
    Kit: "Kit",
    "not-in-game-Deadline Blueprint": "Progetto Deadline (non in gioco)",
    Unknown: "Sconosciuta"
};
function Ka(e, t) {
    if ("en" === t)
        return e;
    if (Qa[e])
        return Qa[e];
    const i = e.match(/^(.+?)\s+(I|II|III|IV|V)$/);
    if (i) {
        const e = i[1]
          , t = i[2];
        if (Qa[e])
            return `${Qa[e]} ${t}`
    }
    return e
}
const Ya = {
    Common: {
        en: "COMMON",
        it: "COMUNE"
    },
    Uncommon: {
        en: "UNCOMMON",
        it: "NON COMUNE"
    },
    Rare: {
        en: "RARE",
        it: "RARO"
    },
    Epic: {
        en: "EPIC",
        it: "EPICO"
    },
    Legendary: {
        en: "LEGENDARY",
        it: "LEGGENDARIO"
    }
};
function Ja({item: e, className: t}) {
    var i, o, r, s, l, c, d, u, p, m, g, h;
    const {t: b, i18n: f} = n()
      , v = f.language
      , y = e
      , _ = e
      , w = Fa(e.rarity)
      , x = (null == (i = Ya[e.rarity]) ? void 0 : i[v]) || e.rarity.toUpperCase()
      , k = (null == (r = null == (o = y.translations) ? void 0 : o.name) ? void 0 : r[v]) || Ka(e.name, v)
      , S = (null == (l = null == (s = y.translations) ? void 0 : s.description) ? void 0 : l[v]) || e.description
      , C = (null == (d = null == (c = y.translations) ? void 0 : c.flavor_text) ? void 0 : d[v]) || y.flavor_text
      , j = null == (p = null == (u = y.translations) ? void 0 : u.hints) ? void 0 : p[v]
      , R = y.item_type ? b(`crafting.itemTypes.${y.item_type}`, y.item_type) : ""
      , T = Va(y.item_type || "")
      , A = (null == (m = y.stat_block) ? void 0 : m.weight) || (null == (g = e.stats) ? void 0 : g.weight)
      , z = (null == (h = y.stat_block) ? void 0 : h.stackSize) || 1
      , I = y.value ?? _.itemValue ?? 0;
    return a.jsxs("div", {
        className: Zt("w-72 shadow-2xl bg-[#f9eedf] rounded-md overflow-hidden !opacity-100", t),
        children: [a.jsxs("div", {
            className: "p-3 pb-1 flex items-center gap-[2px]",
            children: [a.jsx("span", {
                className: "inline-flex items-center justify-center w-4 h-[16.5px]",
                style: {
                    backgroundColor: w
                },
                children: a.jsx("img", {
                    src: T,
                    alt: "",
                    className: "w-4 h-4",
                    style: {
                        filter: "brightness(0) invert(96%) sepia(7%) saturate(720%) hue-rotate(328deg) brightness(103%) contrast(96%)"
                    }
                })
            }), R && a.jsx("span", {
                className: "px-2 py-0 text-[11px] font-semibold uppercase tracking-wide text-[#f9eedf]",
                style: {
                    backgroundColor: w
                },
                children: R
            }), a.jsx("span", {
                className: "px-2 py-0 text-[11px] font-semibold uppercase tracking-wide text-[#f9eedf]",
                style: {
                    backgroundColor: w
                },
                children: x
            })]
        }), a.jsx("div", {
            className: "px-3 pt-1 pb-1",
            children: a.jsx("h3", {
                className: "text-base font-bold text-[#1a1a1a] uppercase tracking-wide leading-tight",
                children: k
            })
        }), S && a.jsx("div", {
            className: "px-3 pb-2",
            children: a.jsx("p", {
                className: "text-[13px] text-[#1a1a1a] leading-relaxed whitespace-normal break-words",
                children: S
            })
        }), C && a.jsx("div", {
            className: "px-3 pb-2 space-y-0.5",
            children: C.split(/\.\s+/).filter(Boolean).map( (e, t) => a.jsx("p", {
                className: "text-[13px] text-[#1a1a1a] leading-snug font-semibold",
                children: e.endsWith(".") ? e : `${e}.`
            }, t))
        }), j && a.jsx("div", {
            className: "px-3 pb-2",
            children: a.jsx("p", {
                className: "text-[13px] text-[#1a1a1a] leading-relaxed italic whitespace-normal break-words",
                children: j
            })
        }), a.jsxs("div", {
            className: "flex text-[13px] text-[#1a1a1a]",
            children: [a.jsx("div", {
                className: "flex-1 bg-[#cec1b0] py-2 flex items-center justify-center",
                children: a.jsxs("span", {
                    className: "font-bold",
                    children: [z, "/", z]
                })
            }), a.jsx("div", {
                className: "w-[2px] bg-[#f9eedf]"
            }), a.jsxs("div", {
                className: "flex-1 bg-[#cec1b0] py-2 flex items-center justify-center gap-1",
                children: [a.jsx("img", {
                    src: "/icons/system/Weight.webp",
                    alt: "",
                    className: "w-4 h-4",
                    style: {
                        filter: "brightness(0)"
                    }
                }), a.jsx("span", {
                    className: "font-bold",
                    children: void 0 !== A && A > 0 ? A.toLocaleString("it-IT", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1
                    }) : "-"
                })]
            }), a.jsx("div", {
                className: "w-[2px] bg-[#f9eedf]"
            }), a.jsxs("div", {
                className: "flex-1 bg-[#cec1b0] py-2 flex items-center justify-center gap-1",
                children: [a.jsx("img", {
                    src: "/icons/system/Coin.webp",
                    alt: "",
                    className: "w-4 h-4",
                    style: {
                        filter: "brightness(0)"
                    }
                }), a.jsx("span", {
                    className: "font-bold",
                    children: I.toLocaleString("it-IT")
                })]
            })]
        })]
    })
}
function Za({item: e, children: t, side: i="right", align: o="start", delayDuration: r=200}) {
    return a.jsx(L, {
        delayDuration: r,
        children: a.jsxs(O, {
            children: [a.jsx(q, {
                asChild: !0,
                children: t
            }), a.jsx(F, {
                children: a.jsx(U, {
                    side: i,
                    align: o,
                    className: "z-[9999] p-0 bg-transparent border-0 shadow-none overflow-visible",
                    sideOffset: 8,
                    avoidCollisions: !1,
                    style: {
                        opacity: 1
                    },
                    children: a.jsx(Ja, {
                        item: e
                    })
                })
            })]
        })
    })
}
function Xa({item: e, quantity: t, size: i="md", className: o, onClick: r, disableHover: n=!1, showBottomBar: s=!0, showNameBar: l=!1, displayName: c, tooltipSide: d="right", tooltipAlign: u="start", tooltipDelay: p=200}) {
    const m = e;
    return a.jsx(Za, {
        item: m,
        side: d,
        align: u,
        delayDuration: p,
        children: a.jsx("div", {
            children: a.jsx($a, {
                item: e,
                quantity: t,
                size: i,
                className: o,
                onClick: r,
                disableHover: n,
                showBottomBar: s,
                showNameBar: l,
                displayName: c
            })
        })
    })
}
function eo({userId: e, displayName: t, photoURL: i, showAvatar: o=!0, className: r=""}) {
    const {preferences: n} = zt()
      , l = n.language || "en";
    return a.jsxs(s, {
        to: `/${l}/profile/${e}`,
        className: `user-link ${r}`,
        children: [o && (i ? a.jsx("img", {
            src: i,
            alt: t,
            className: "user-link-avatar"
        }) : a.jsx("div", {
            className: "user-link-avatar-placeholder",
            children: a.jsx(y, {
                size: 12
            })
        })), a.jsx("span", {
            className: "user-link-name",
            children: t
        })]
    })
}
const to = new Map
  , io = new Map;
function ao(e) {
    const t = to.get(e);
    return t && Date.now() - t.fetchedAt < 3e5 ? t : null
}
function oo(e) {
    if (io.has(e))
        return io.get(e);
    const t = lt(e).then(t => {
        if (!t)
            return null;
        const i = {
            displayName: t.displayName,
            photoURL: t.photoURL,
            fetchedAt: Date.now()
        };
        return to.set(e, i),
        io.delete(e),
        i
    }
    ).catch( () => (io.delete(e),
    null));
    return io.set(e, t),
    t
}
function ro(e, t, a) {
    const [o,r] = i.useState( () => {
        if (!e || "system" === e)
            return {
                displayName: t || "Unknown",
                photoURL: a ?? null
            };
        const i = ao(e);
        return i ? {
            displayName: i.displayName,
            photoURL: i.photoURL
        } : {
            displayName: t || "Unknown",
            photoURL: a ?? null
        }
    }
    );
    return i.useEffect( () => {
        if (!e || "system" === e)
            return;
        const t = ao(e);
        t ? r({
            displayName: t.displayName,
            photoURL: t.photoURL
        }) : oo(e).then(e => {
            e && r({
                displayName: e.displayName,
                photoURL: e.photoURL
            })
        }
        )
    }
    , [e]),
    o
}
function no(e) {
    const [t,a] = i.useState( () => {
        const t = new Map;
        for (const i of e) {
            if (!i || "system" === i)
                continue;
            const e = ao(i);
            e && t.set(i, {
                displayName: e.displayName,
                photoURL: e.photoURL
            })
        }
        return t
    }
    );
    return i.useEffect( () => {
        const t = [...new Set(e.filter(e => e && "system" !== e))];
        if (0 === t.length)
            return;
        const i = new Map
          , o = [];
        for (const e of t) {
            const t = ao(e);
            t ? i.set(e, {
                displayName: t.displayName,
                photoURL: t.photoURL
            }) : o.push(e)
        }
        0 !== o.length ? Promise.all(o.map(e => oo(e))).then(e => {
            for (let t = 0; t < o.length; t++)
                e[t] && i.set(o[t], {
                    displayName: e[t].displayName,
                    photoURL: e[t].photoURL
                });
            a(new Map(i))
        }
        ) : a(new Map(i))
    }
    , [e.join(",")]),
    t
}
function so({date: e, lang: t}) {
    const {t: i} = n()
      , o = new Date
      , r = e.toDateString() === o.toDateString()
      , s = new Date(o);
    s.setDate(s.getDate() - 1);
    const l = e.toDateString() === s.toDateString();
    let c;
    return c = r ? i("chat.today") : l ? i("chat.yesterday") : e.toLocaleDateString("it" === t ? "it-IT" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }),
    a.jsx("div", {
        className: "flex items-center justify-center my-3",
        children: a.jsx("div", {
            className: "px-3 py-1 rounded-full bg-blue-dark/10 text-xs text-blue-dark/60",
            children: c
        })
    })
}
function lo({trade: e, userId: t, onClose: o}) {
    var r, l, c;
    const {t: d, i18n: u} = n()
      , {preferences: p} = zt()
      , m = p.language || "en"
      , g = i.useMemo( () => "Blueprint" === e.item.item_type || /blueprint|progetto/i.test(e.item.name), [e.item.item_type, e.item.name])
      , h = i.useMemo( () => g ? Ka(e.item.name, u.language).replace(/\s*(blueprint|progetto)\s*/gi, "").trim() : void 0, [g, e.item.name, u.language])
      , [f,v] = i.useState(e)
      , [_,w] = i.useState([])
      , [x,k] = i.useState("")
      , [S,C] = i.useState(!0)
      , [j,R] = i.useState(!1)
      , [z,I] = i.useState(!1)
      , [P,M] = i.useState(void 0)
      , [D,B] = i.useState(null)
      , [E,L] = i.useState(!1)
      , [O,q] = i.useState(!1)
      , [F,U] = i.useState(5)
      , [Q,K] = i.useState("")
      , [Y,J] = i.useState(!1)
      , [Z,X] = i.useState("")
      , ee = i.useRef(null)
      , te = i.useRef(null)
      , ie = f.participants.find(e => e !== t)
      , ae = ie ? f.participantDetails[ie] : null
      , oe = ro(ie, null == ae ? void 0 : ae.displayName, null == ae ? void 0 : ae.photoURL)
      , re = null == (r = f.lockedBy) ? void 0 : r.includes(t)
      , ne = null == (l = f.confirmedBy) ? void 0 : l.includes(t)
      , se = "locked" === f.status && !ne;
    i.useEffect( () => {
        void 0 === f.agreedPrice && f.listingId && va(f.listingId).then(e => {
            (null == e ? void 0 : e.priceSeeds) && M(e.priceSeeds)
        }
        )
    }
    , [f.agreedPrice, f.listingId]),
    i.useEffect( () => {
        const e = function(e) {
            const t = Be(Te(ot, da, e, "messages"), He("createdAt", "asc"), Ge(200));
            return Re(t, t => {
                const i = [];
                t.forEach(t => {
                    var a, o;
                    const r = t.data();
                    i.push({
                        id: t.id,
                        tradeId: e,
                        text: r.text,
                        senderId: r.senderId,
                        senderName: r.senderName,
                        senderPhoto: r.senderPhoto,
                        isSystemMessage: r.isSystemMessage,
                        systemAction: r.systemAction,
                        createdAt: (null == (o = null == (a = r.createdAt) ? void 0 : a.toMillis) ? void 0 : o.call(a)) || r.createdAt || Date.now()
                    })
                }
                ),
                w(i),
                C(!1)
            }
            )
        }(f.id);
        return () => e()
    }
    , [f.id]),
    i.useEffect( () => {
        !async function(e, t) {
            const i = await xa(e);
            if (!i)
                return;
            const a = {
                ...i.unreadCount || {}
            };
            a[t] = 0,
            await We(ze(ot, da, e), {
                unreadCount: a
            })
        }(f.id, t)
    }
    , [f.id, t, _]),
    i.useEffect( () => {
        var e;
        null == (e = ee.current) || e.scrollIntoView({
            behavior: "smooth"
        })
    }
    , [_]),
    i.useEffect( () => {
        const e = setInterval(async () => {
            const e = await xa(f.id);
            e && v(e)
        }
        , 5e3);
        return () => clearInterval(e)
    }
    , [f.id]),
    i.useEffect( () => {
        "completed" === f.status && async function(e, t) {
            var i;
            const a = ze(ot, aa, e)
              , o = await Pe(a);
            if (!o.exists())
                return null;
            const r = o.data();
            return (null == (i = r.reviewedBy) ? void 0 : i.includes(t)) ? null : {
                id: o.id,
                tradeId: r.tradeId,
                completedAt: r.completedAt,
                deadline: r.deadline,
                participants: r.participants,
                reviewedBy: r.reviewedBy || [],
                item: r.item
            }
        }(f.id, t).then(e => {
            B(e),
            e || J(!0)
        }
        )
    }
    , [f.id, f.status, t]),
    i.useEffect( () => {
        if (!D || Y)
            return;
        const e = () => {
            const e = D.deadline - Date.now();
            if (e <= 0)
                return void X("");
            const t = Math.floor(e / 864e5)
              , i = Math.floor(e % 864e5 / 36e5)
              , a = Math.floor(e % 36e5 / 6e4);
            X(t > 0 ? `${t}d ${i}h ${a}m` : `${i}h ${a}m`)
        }
        ;
        e();
        const t = setInterval(e, 6e4);
        return () => clearInterval(t)
    }
    , [D, Y]);
    const le = async () => {
        if (x.trim() && !j) {
            R(!0);
            try {
                await async function(e, t, i) {
                    const a = i.trim();
                    if (!a || a.length > 500)
                        throw new Error("invalid_message");
                    const o = await lt(t);
                    if (null == o ? void 0 : o.isBannedSocial)
                        throw new Error("banned_social");
                    await ka(e, {
                        text: a,
                        senderId: t,
                        senderName: (null == o ? void 0 : o.displayName) || "Unknown",
                        senderPhoto: (null == o ? void 0 : o.photoURL) || null
                    });
                    const r = await xa(e);
                    if (r) {
                        const i = await va(r.listingId);
                        i && i.author.id === t && await We(ze(ot, ca, r.listingId), {
                            ownerLastResponseAt: Date.now(),
                            updatedAt: Ue()
                        });
                        for (const a of r.participants)
                            a !== t && Ei(a, "trade_message", e, r.item.name, (null == o ? void 0 : o.displayName) || "Unknown").catch( () => {}
                            )
                    }
                }(f.id, t, x),
                k(""),
                setTimeout( () => {
                    var e;
                    return null == (e = te.current) ? void 0 : e.focus()
                }
                , 0)
            } catch (e) {} finally {
                R(!1)
            }
        }
    }
      , ce = async () => {
        if (confirm(d("market.confirmCancel"))) {
            I(!0);
            try {
                await async function(e, t) {
                    var i;
                    const a = await xa(e);
                    if (!a)
                        throw new Error("Trade not found");
                    if (!a.participants.includes(t))
                        throw new Error("Not a participant");
                    await We(ze(ot, da, e), {
                        status: "cancelled",
                        updatedAt: Ue()
                    }),
                    await We(ze(ot, ca, a.listingId), {
                        hasActiveNegotiation: !1,
                        activeTradeId: null,
                        updatedAt: Ue()
                    }),
                    await ka(e, {
                        text: "Trade cancelled",
                        senderId: "system",
                        senderName: "System",
                        senderPhoto: null,
                        isSystemMessage: !0,
                        systemAction: "trade_cancelled"
                    });
                    const o = (null == (i = a.participantDetails[t]) ? void 0 : i.displayName) || "Unknown";
                    for (const r of a.participants)
                        r !== t && Ei(r, "trade_cancelled", e, a.item.name, o).catch( () => {}
                        );
                    await Ca(t, "cancel")
                }(f.id, t),
                o()
            } catch (e) {} finally {
                I(!1)
            }
        }
    }
      , de = e => {
        const t = new Date(e)
          , i = new Date;
        return t.toDateString() === i.toDateString() ? t.toLocaleTimeString("it" === m ? "it-IT" : "en-US", {
            hour: "2-digit",
            minute: "2-digit"
        }) : t.toLocaleString("it" === m ? "it-IT" : "en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }
      , ue = "negotiating" === f.status || "locked" === f.status
      , pe = i.useMemo( () => {
        const e = [];
        let t = "";
        return _.forEach(i => {
            const a = new Date(i.createdAt).toDateString();
            a !== t ? (t = a,
            e.push({
                date: a,
                messages: [i]
            })) : e[e.length - 1].messages.push(i)
        }
        ),
        e
    }
    , [_]);
    return a.jsxs("div", {
        className: "fixed inset-0 z-[1060] flex items-center justify-center p-4",
        children: [a.jsx("div", {
            className: "absolute inset-0 bg-black/50",
            onClick: o
        }), a.jsxs("div", {
            className: "relative w-full max-w-lg h-[80vh] bg-beige-light rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col",
            children: [a.jsxs("div", {
                className: "flex items-center justify-between p-4 bg-blue-dark text-beige-light shrink-0",
                children: [a.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [oe.photoURL ? a.jsx("img", {
                        src: oe.photoURL,
                        alt: oe.displayName,
                        className: "w-10 h-10 rounded-full",
                        referrerPolicy: "no-referrer"
                    }) : a.jsx("div", {
                        className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center",
                        children: a.jsx(y, {
                            size: 18
                        })
                    }), a.jsxs("div", {
                        children: [a.jsx(s, {
                            to: `/${m}/${"it" === m ? "profilo" : "profile"}/${ie}`,
                            className: "font-medium hover:underline",
                            children: oe.displayName
                        }), a.jsx("p", {
                            className: "text-xs text-beige-light/70",
                            children: d(`market.tradeStatus.${f.status}`)
                        })]
                    })]
                }), a.jsx("button", {
                    onClick: o,
                    className: "p-1 rounded-lg hover:bg-white/10 transition-colors",
                    children: a.jsx(b, {
                        size: 20
                    })
                })]
            }), a.jsx("div", {
                className: "p-3 border-b border-blue-dark/10 bg-blue-dark/5 shrink-0",
                children: a.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [a.jsx(Xa, {
                        item: {
                            name: f.item.name,
                            icon: f.item.icon,
                            rarity: f.item.rarity,
                            item_type: f.item.item_type
                        },
                        quantity: f.quantity,
                        size: "sm",
                        disableHover: !0,
                        tooltipSide: "right",
                        showNameBar: g,
                        displayName: h
                    }), a.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [a.jsx("h4", {
                            className: "font-semibold text-blue-dark truncate",
                            children: f.item.name
                        }), a.jsx("p", {
                            className: "text-xs text-blue-dark/60",
                            children: f.item.rarity
                        }), a.jsx("p", {
                            className: "text-xs text-blue-dark/50",
                            children: new Date(f.createdAt).toLocaleDateString("it" === m ? "it-IT" : "en-US", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        })]
                    }), (f.agreedPrice || P) && a.jsxs("span", {
                        className: "text-sm font-semibold text-blue-dark",
                        children: [null == (c = f.agreedPrice || P) ? void 0 : c.toLocaleString(), " Seeds"]
                    })]
                })
            }), a.jsx("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-3",
                children: S ? a.jsx("div", {
                    className: "flex items-center justify-center h-full",
                    children: a.jsx(T, {
                        className: "w-6 h-6 animate-spin text-gold-accent"
                    })
                }) : a.jsxs(a.Fragment, {
                    children: [pe.map(e => a.jsxs("div", {
                        children: [a.jsx(so, {
                            date: new Date(e.date),
                            lang: m
                        }), a.jsx("div", {
                            className: "space-y-3",
                            children: e.messages.map(e => {
                                const i = e.senderId === t;
                                return e.isSystemMessage ? a.jsx("div", {
                                    className: "text-center text-xs text-blue-dark/50 py-2",
                                    children: a.jsx("span", {
                                        className: "px-3 py-1 rounded-full bg-blue-dark/5",
                                        children: d(`market.systemMessages.${e.systemAction}`, e.text)
                                    })
                                }, e.id) : a.jsxs("div", {
                                    className: "flex gap-2 " + (i ? "flex-row-reverse" : ""),
                                    children: [!i && a.jsx("div", {
                                        className: "w-8 h-8 rounded-full shrink-0 overflow-hidden",
                                        children: oe.photoURL ? a.jsx("img", {
                                            src: oe.photoURL,
                                            alt: oe.displayName,
                                            className: "w-full h-full object-cover",
                                            referrerPolicy: "no-referrer"
                                        }) : a.jsx("div", {
                                            className: "w-full h-full bg-blue-dark/10 flex items-center justify-center",
                                            children: a.jsx(y, {
                                                size: 14,
                                                className: "text-blue-dark/50"
                                            })
                                        })
                                    }), a.jsxs("div", {
                                        className: "max-w-[70%] " + (i ? "items-end" : "items-start"),
                                        children: [a.jsx("div", {
                                            className: "px-3 py-2 rounded-2xl text-sm " + (i ? "bg-gold-accent text-blue-dark rounded-tr-sm" : "bg-blue-dark/10 text-blue-dark rounded-tl-sm"),
                                            children: e.text
                                        }), a.jsx("span", {
                                            className: "text-[10px] text-blue-dark/40 px-1",
                                            children: de(e.createdAt)
                                        })]
                                    })]
                                }, e.id)
                            }
                            )
                        })]
                    }, e.date)), a.jsx("div", {
                        ref: ee
                    })]
                })
            }), ue && a.jsxs("div", {
                className: "p-3 border-t border-blue-dark/10 bg-blue-dark/5 shrink-0",
                children: [a.jsxs("div", {
                    className: "flex gap-2 mb-3",
                    children: ["negotiating" === f.status && a.jsxs(a.Fragment, {
                        children: [a.jsxs("button", {
                            onClick: async () => {
                                I(!0);
                                try {
                                    await async function(e, t) {
                                        var i;
                                        const a = await xa(e);
                                        if (!a)
                                            throw new Error("Trade not found");
                                        if (!a.participants.includes(t))
                                            throw new Error("Not a participant");
                                        const o = [...a.lockedBy];
                                        o.includes(t) || o.push(t);
                                        const r = {
                                            lockedBy: o,
                                            updatedAt: Ue()
                                        };
                                        if (2 === o.length) {
                                            r.status = "locked",
                                            await ka(e, {
                                                text: "Trade locked - both parties agreed on terms",
                                                senderId: "system",
                                                senderName: "System",
                                                senderPhoto: null,
                                                isSystemMessage: !0,
                                                systemAction: "trade_locked"
                                            });
                                            const o = (null == (i = a.participantDetails[t]) ? void 0 : i.displayName) || "Unknown";
                                            for (const i of a.participants)
                                                i !== t && Ei(i, "trade_locked", e, a.item.name, o).catch( () => {}
                                                )
                                        }
                                        await We(ze(ot, da, e), r)
                                    }(f.id, t);
                                    const e = await xa(f.id);
                                    e && v(e)
                                } catch (e) {} finally {
                                    I(!1)
                                }
                            }
                            ,
                            disabled: z || re,
                            className: `flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${re ? "bg-green-500/20 text-green-700" : "bg-blue-dark/10 text-blue-dark hover:bg-blue-dark/20"} disabled:opacity-50`,
                            children: [a.jsx(G, {
                                size: 16
                            }), d(re ? "market.locked" : "market.lockTrade")]
                        }), a.jsxs("button", {
                            onClick: ce,
                            disabled: z,
                            className: "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors disabled:opacity-50",
                            children: [a.jsx(H, {
                                size: 16
                            }), d("market.cancel")]
                        })]
                    }), se && a.jsxs(a.Fragment, {
                        children: [a.jsxs("button", {
                            onClick: async () => {
                                I(!0);
                                try {
                                    await async function(e, t) {
                                        var i;
                                        const a = await xa(e);
                                        if (!a)
                                            throw new Error("Trade not found");
                                        if (!a.participants.includes(t))
                                            throw new Error("Not a participant");
                                        if ("locked" !== a.status)
                                            throw new Error("Trade must be locked first");
                                        const o = [...a.confirmedBy];
                                        o.includes(t) || o.push(t);
                                        const r = {
                                            confirmedBy: o,
                                            updatedAt: Ue()
                                        }
                                          , n = 2 === o.length;
                                        if (n && (r.status = "completed",
                                        r.completedAt = Ue()),
                                        await We(ze(ot, da, e), r),
                                        n) {
                                            try {
                                                await ka(e, {
                                                    text: "Trade completed successfully!",
                                                    senderId: "system",
                                                    senderName: "System",
                                                    senderPhoto: null,
                                                    isSystemMessage: !0,
                                                    systemAction: "trade_completed"
                                                })
                                            } catch (s) {}
                                            try {
                                                const e = await va(a.listingId);
                                                if (e) {
                                                    const t = Math.max(0, e.availableQuantity - a.quantity);
                                                    await We(ze(ot, ca, a.listingId), {
                                                        availableQuantity: t,
                                                        hasActiveNegotiation: !1,
                                                        activeTradeId: null,
                                                        status: t <= 0 ? "completed" : "active",
                                                        updatedAt: Ue()
                                                    })
                                                }
                                            } catch (s) {}
                                            for (const e of a.participants)
                                                try {
                                                    await Ca(e, "success")
                                                } catch (s) {}
                                            const o = (null == (i = a.participantDetails[t]) ? void 0 : i.displayName) || "Unknown";
                                            for (const i of a.participants)
                                                i !== t && Ei(i, "trade_completed", e, a.item.name, o).catch( () => {}
                                                );
                                            try {
                                                await ra(e, a)
                                            } catch (s) {}
                                        }
                                    }(f.id, t);
                                    const e = await xa(f.id);
                                    e && v(e)
                                } catch (e) {} finally {
                                    I(!1)
                                }
                            }
                            ,
                            disabled: z,
                            className: "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50",
                            children: [a.jsx(V, {
                                size: 16
                            }), d("market.confirmComplete")]
                        }), a.jsxs("button", {
                            onClick: ce,
                            disabled: z,
                            className: "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors disabled:opacity-50",
                            children: [a.jsx(H, {
                                size: 16
                            }), d("market.cancel")]
                        })]
                    })]
                }), "negotiating" === f.status && !re && a.jsxs("p", {
                    className: "text-xs text-blue-dark/50 text-center mb-2",
                    children: [a.jsx(W, {
                        size: 12,
                        className: "inline mr-1"
                    }), d("market.lockInfo")]
                })]
            }), ue && a.jsx("div", {
                className: "p-3 border-t border-blue-dark/10 shrink-0",
                children: a.jsxs("div", {
                    className: "flex gap-2",
                    children: [a.jsx("input", {
                        ref: te,
                        type: "text",
                        value: x,
                        onChange: e => k(e.target.value),
                        onKeyDown: e => {
                            "Enter" !== e.key || e.shiftKey || (e.preventDefault(),
                            le())
                        }
                        ,
                        placeholder: d("chat.typeMessage"),
                        className: "flex-1 px-4 py-2 rounded-full bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent text-sm",
                        maxLength: 500,
                        disabled: j
                    }), a.jsx("button", {
                        onClick: le,
                        disabled: !x.trim() || j,
                        className: "p-2 rounded-full bg-gold-accent text-blue-dark disabled:opacity-50 hover:brightness-110 transition-all",
                        children: j ? a.jsx(T, {
                            size: 20,
                            className: "animate-spin"
                        }) : a.jsx(A, {
                            size: 20
                        })
                    })]
                })
            }), "completed" === f.status && a.jsxs("div", {
                className: "border-t border-blue-dark/10 shrink-0",
                children: [Y && a.jsx("div", {
                    className: "p-4 text-center",
                    children: a.jsx("p", {
                        className: "text-sm text-green-600 font-medium",
                        children: d("market.reviews.reviewSubmitted")
                    })
                }), D && !Y && !O && a.jsxs("div", {
                    className: "p-3 bg-amber-50 border-b border-amber-200",
                    children: [a.jsx("div", {
                        className: "flex items-center justify-center text-center gap-2 mb-2",
                        children: a.jsx("p", {
                            className: "text-xs text-amber-800",
                            children: d("market.reviews.autoReviewWarning")
                        })
                    }), Z && a.jsxs("p", {
                        className: "flex gap-1 items-center justify-center text-xs font-semibold text-amber-700 mb-2",
                        children: [a.jsx(N, {
                            size: 16,
                            className: "text-amber-700 shrink-0"
                        }), d("market.reviews.timeRemaining_v2", {
                            time: Z
                        })]
                    }), a.jsxs("button", {
                        onClick: () => q(!0),
                        className: "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium bg-gold-accent text-blue-dark hover:brightness-110 transition-all",
                        children: [a.jsx($, {
                            size: 16
                        }), d("market.reviews.leaveReview")]
                    })]
                }), O && !Y && a.jsxs("div", {
                    className: "p-3 bg-blue-dark/5",
                    children: [a.jsxs("h4", {
                        className: "text-sm font-semibold text-blue-dark mb-2",
                        children: [d("market.reviews.rateUser"), " ", oe.displayName]
                    }), a.jsxs("div", {
                        className: "flex items-center gap-1 mb-3",
                        children: [[1, 2, 3, 4, 5].map(e => a.jsx("button", {
                            onClick: () => U(e),
                            className: "p-0.5 transition-transform hover:scale-110",
                            children: a.jsx($, {
                                size: 24,
                                className: e <= F ? "fill-gold-accent text-gold-accent" : "text-blue-dark/20"
                            })
                        }, e)), a.jsx("span", {
                            className: "ml-2 text-xs text-blue-dark/60",
                            children: d(`market.reviews.rating${F}`)
                        })]
                    }), a.jsx("textarea", {
                        value: Q,
                        onChange: e => K(e.target.value),
                        placeholder: d("market.reviews.commentPlaceholder"),
                        className: "w-full px-3 py-2 rounded-lg bg-white border border-blue-dark/20 text-blue-dark placeholder:text-blue-dark/40 focus:outline-none focus:border-gold-accent text-sm resize-none",
                        rows: 2,
                        maxLength: 300
                    }), Q.length > 0 && Q.length < 5 && a.jsx("p", {
                        className: "text-[10px] text-red-500 mt-1",
                        children: d("market.reviews.commentMinLength")
                    }), a.jsxs("div", {
                        className: "flex gap-2 mt-2",
                        children: [a.jsx("button", {
                            onClick: () => q(!1),
                            className: "flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-blue-dark/10 text-blue-dark hover:bg-blue-dark/20 transition-colors",
                            children: d("market.cancel")
                        }), a.jsxs("button", {
                            onClick: async () => {
                                if (ie && !(Q.trim().length < 5)) {
                                    L(!0);
                                    try {
                                        await sa(f.id, t, ie, F, Q.trim()),
                                        J(!0),
                                        q(!1),
                                        B(null)
                                    } catch (e) {} finally {
                                        L(!1)
                                    }
                                }
                            }
                            ,
                            disabled: E || Q.trim().length < 5,
                            className: "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium bg-gold-accent text-blue-dark hover:brightness-110 transition-all disabled:opacity-50",
                            children: [E ? a.jsx(T, {
                                size: 16,
                                className: "animate-spin"
                            }) : a.jsx($, {
                                size: 16
                            }), d("market.reviews.submit")]
                        })]
                    })]
                }), !D && Y && a.jsx("div", {
                    className: "p-3 text-center",
                    children: a.jsx("p", {
                        className: "text-xs text-blue-dark/50",
                        children: d("market.tradeCompleted")
                    })
                })]
            }), "cancelled" === f.status && a.jsx("div", {
                className: "p-4 border-t border-blue-dark/10 text-center",
                children: a.jsx("p", {
                    className: "text-sm text-blue-dark/60",
                    children: d("market.tradeCancelled")
                })
            })]
        })]
    })
}
const co = {
    negotiating: "bg-amber-500/20 text-amber-700",
    locked: "bg-blue-500/20 text-blue-700",
    completed: "bg-green-500/20 text-green-700",
    cancelled: "bg-red-500/20 text-red-700",
    expired: "bg-gray-500/20 text-gray-700"
};
function uo() {
    const {t: e, i18n: t} = n()
      , {user: o} = wt()
      , [r,s] = i.useState([])
      , [l,c] = i.useState(!0)
      , [d,u] = i.useState(null)
      , p = i.useRef(!1);
    i.useEffect( () => {
        o && !p.current && (p.current = !0,
        async function(e) {
            var t, i;
            const a = Be(Te(ot, da), Ee("participants", "array-contains", e), Ee("status", "==", "locked"))
              , o = await Ne(a);
            for (const n of o.docs) {
                const e = n.data()
                  , a = Be(Te(ot, da, n.id, "messages"), Ee("systemAction", "==", "trade_completed"));
                if (!(await Ne(a)).empty) {
                    await We(ze(ot, da, n.id), {
                        status: "completed",
                        confirmedBy: e.participants,
                        completedAt: Ue(),
                        updatedAt: Ue()
                    });
                    try {
                        const a = ze(ot, "pending-reviews", n.id);
                        (await Pe(a)).exists() || await ra(n.id, {
                            id: n.id,
                            listingId: e.listingId,
                            listingType: e.listingType,
                            participants: e.participants,
                            participantDetails: e.participantDetails,
                            item: e.item,
                            quantity: e.quantity,
                            agreedPrice: e.agreedPrice,
                            agreedBarterItems: e.agreedBarterItems,
                            meetingPoint: e.meetingPoint,
                            status: "completed",
                            confirmedBy: e.participants,
                            lockedBy: e.lockedBy || [],
                            completedAt: Date.now(),
                            createdAt: (null == (i = null == (t = e.createdAt) ? void 0 : t.toMillis) ? void 0 : i.call(t)) || e.createdAt || Date.now(),
                            updatedAt: Date.now(),
                            unreadCount: e.unreadCount || {}
                        })
                    } catch (r) {}
                    try {
                        const t = await va(e.listingId);
                        if (t && t.hasActiveNegotiation) {
                            const i = t.availableQuantity - (e.quantity || 0);
                            await We(ze(ot, ca, e.listingId), {
                                availableQuantity: i,
                                hasActiveNegotiation: !1,
                                activeTradeId: null,
                                status: i <= 0 ? "completed" : "active",
                                updatedAt: Ue()
                            })
                        }
                    } catch (r) {}
                }
            }
        }(o.uid).catch( () => {}
        ),
        async function(e) {
            var t, i, a;
            const o = Date.now()
              , r = Be(Te(ot, da), Ee("participants", "array-contains", e), Ee("status", "==", "negotiating"))
              , n = await Ne(r);
            for (const l of n.docs) {
                const e = l.data();
                if (1 === (e.lockedBy || []).length && !(o - ((null == (i = null == (t = e.updatedAt) ? void 0 : t.toMillis) ? void 0 : i.call(t)) || e.updatedAt || 0) < 1728e5)) {
                    await We(ze(ot, da, l.id), {
                        status: "cancelled",
                        updatedAt: Ue()
                    });
                    try {
                        await We(ze(ot, ca, e.listingId), {
                            hasActiveNegotiation: !1,
                            activeTradeId: null,
                            updatedAt: Ue()
                        })
                    } catch (s) {}
                    try {
                        await ka(l.id, {
                            text: "Trade auto-cancelled: lock not confirmed by both parties within 48 hours",
                            senderId: "system",
                            senderName: "System",
                            senderPhoto: null,
                            isSystemMessage: !0,
                            systemAction: "trade_cancelled"
                        })
                    } catch (s) {}
                    for (const t of e.participants || [])
                        Ei(t, "trade_cancelled", l.id, (null == (a = e.item) ? void 0 : a.name) || "", "System").catch( () => {}
                        )
                }
            }
        }(o.uid).catch( () => {}
        ),
        async function(e) {
            const t = Be(Te(ot, aa), Ee("participants", "array-contains", e))
              , i = await Ne(t);
            for (const o of i.docs) {
                const e = o.data()
                  , t = e.reviewedBy || [];
                if ((e.deadline || 0) > Date.now())
                    continue;
                const i = e.participants || []
                  , r = i.filter(e => !t.includes(e));
                if (0 !== r.length) {
                    for (const t of r) {
                        const o = i.find(e => e !== t);
                        if (o)
                            try {
                                await Fe(Te(ot, ia), {
                                    tradeId: e.tradeId,
                                    fromUserId: t,
                                    fromUserName: "Auto-Review",
                                    fromUserPhoto: null,
                                    toUserId: o,
                                    rating: 5,
                                    comment: "Automatic 5-star review - user did not submit a review within the deadline",
                                    isAutomatic: !0,
                                    createdAt: Ue()
                                }),
                                await la(o, 5),
                                await Fe(Te(ot, ia), {
                                    tradeId: e.tradeId,
                                    fromUserId: "system",
                                    fromUserName: "arcraiderscentral.app",
                                    fromUserPhoto: null,
                                    toUserId: t,
                                    rating: 3,
                                    comment: "Automatic review: this user did not leave a review within the 7-day deadline. To avoid automatic reviews, always review your trades on time.",
                                    isAutomatic: !0,
                                    createdAt: Ue()
                                }),
                                await la(t, 3)
                            } catch (a) {}
                    }
                    await Ae(o.ref)
                } else
                    await Ae(o.ref)
            }
        }(o.uid).catch( () => {}
        ),
        wa(o.uid).catch( () => {}
        ))
    }
    , [o]),
    i.useEffect( () => {
        if (!o)
            return;
        const e = _a(o.uid, e => {
            const t = e.sort( (e, t) => {
                const i = "negotiating" === e.status || "locked" === e.status
                  , a = "negotiating" === t.status || "locked" === t.status;
                return i && !a ? -1 : !i && a ? 1 : t.updatedAt - e.updatedAt
            }
            );
            s(t),
            c(!1)
        }
        );
        return () => e()
    }
    , [o]);
    const m = no(i.useMemo( () => o ? r.map(e => e.participants.find(e => e !== o.uid)).filter(Boolean) : [], [r, o]))
      , g = t => {
        const i = Date.now() - t
          , a = Math.floor(i / 6e4)
          , o = Math.floor(i / 36e5)
          , r = Math.floor(i / 864e5);
        return a < 1 ? e("notifications.justNow") : a < 60 ? e("notifications.minutesAgo", {
            count: a
        }) : o < 24 ? e("notifications.hoursAgo", {
            count: o
        }) : e("notifications.daysAgo", {
            count: r
        })
    }
    ;
    return l ? a.jsx("div", {
        className: "flex-1 flex items-center justify-center",
        children: a.jsx(T, {
            className: "w-6 h-6 animate-spin text-gold-accent"
        })
    }) : 0 === r.length ? a.jsxs("div", {
        className: "p-8 text-center text-blue-dark/60",
        children: [a.jsx(Q, {
            size: 32,
            className: "mx-auto mb-2 opacity-50"
        }), a.jsx("p", {
            children: e("market.noTrades")
        })]
    }) : a.jsxs(a.Fragment, {
        children: [a.jsx("div", {
            className: "overflow-y-auto h-full",
            children: r.map(i => {
                var r;
                const n = (e => o && e.participants.find(e => e !== o.uid) || null)(i)
                  , s = n ? i.participantDetails[n] : null
                  , l = n ? m.get(n) : null
                  , c = (null == l ? void 0 : l.displayName) || (null == s ? void 0 : s.displayName) || "Unknown"
                  , d = (null == l ? void 0 : l.photoURL) ?? (null == s ? void 0 : s.photoURL) ?? null
                  , p = o && (null == (r = i.unreadCount) ? void 0 : r[o.uid]) || 0
                  , h = "Blueprint" === i.item.item_type || /blueprint|progetto/i.test(i.item.name)
                  , b = h ? Ka(i.item.name, t.language).replace(/\s*(blueprint|progetto)\s*/gi, "").trim() : void 0
                  , f = "negotiating" === i.status || "locked" === i.status;
                return a.jsxs("button", {
                    onClick: () => u(i),
                    className: "w-full flex items-center gap-3 p-4 text-left border-b border-blue-dark/10 last:border-b-0 transition-colors hover:bg-black/5 " + (p > 0 ? "bg-gold-accent/10" : ""),
                    children: [a.jsx(Xa, {
                        item: {
                            name: i.item.name,
                            icon: i.item.icon,
                            rarity: i.item.rarity,
                            item_type: i.item.item_type
                        },
                        quantity: i.quantity,
                        size: "sm",
                        disableHover: !0,
                        tooltipSide: "right",
                        showNameBar: h,
                        displayName: b
                    }), a.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [a.jsxs("div", {
                            className: "flex items-center gap-1.5 mb-1",
                            children: [a.jsx("span", {
                                className: "px-1.5 py-0.5 rounded text-[10px] font-semibold " + ("sell" === i.listingType ? "bg-green-500/20 text-green-700" : "bg-blue-500/20 text-blue-700"),
                                children: "sell" === i.listingType ? e("market.selling") : e("market.buying")
                            }), a.jsx("span", {
                                className: `px-1.5 py-0.5 rounded text-[10px] font-medium ${co[i.status]}`,
                                children: e(`market.tradeStatus.${i.status}`)
                            })]
                        }), a.jsxs("p", {
                            className: "text-sm font-medium text-blue-dark truncate",
                            children: [i.item.name, " x", i.quantity]
                        }), n && a.jsx("div", {
                            className: "flex items-center gap-1.5 mt-1",
                            onClick: e => e.stopPropagation(),
                            children: a.jsx(eo, {
                                userId: n,
                                displayName: c,
                                photoURL: d,
                                showAvatar: !0,
                                className: "text-xs text-blue-dark/60 hover:text-blue-dark"
                            })
                        })]
                    }), a.jsxs("div", {
                        className: "flex flex-col items-end gap-1 shrink-0",
                        children: [a.jsx("span", {
                            className: "text-[10px] text-blue-dark/50",
                            children: g(i.updatedAt)
                        }), p > 0 && a.jsx("span", {
                            className: "min-w-[18px] h-[18px] px-1 rounded-full bg-gold-accent text-blue-dark text-[10px] font-bold flex items-center justify-center",
                            children: p
                        }), !f && !p && a.jsx("span", {
                            className: "text-[10px] text-blue-dark/40",
                            children: "completed" === i.status ? "✓" : "✗"
                        })]
                    })]
                }, i.id)
            }
            )
        }), d && o && a.jsx(lo, {
            trade: d,
            userId: o.uid,
            onClose: () => u(null)
        })]
    })
}
function po() {
    const {user: e} = wt()
      , {preferences: t} = zt()
      , {t: o} = n()
      , [r,s] = i.useState(!1)
      , [l,c] = i.useState("global")
      , [d,u] = i.useState([])
      , [p,m] = i.useState(0)
      , [g,h] = i.useState(0)
      , [f,v] = i.useState(null)
      , [y,_] = i.useState(null)
      , [w,x] = i.useState(!1)
      , k = i.useRef(null)
      , S = i.useRef(null)
      , C = i.useRef(new Set);
    i.useEffect( () => {
        if (!e)
            return;
        const i = Ni(e.uid, e => {
            if (!1 !== t.notificationSoundEnabled) {
                const t = new Set(e.map(e => e.id))
                  , i = e.filter(e => !e.read && !C.current.has(e.id));
                i.length > 0 && C.current.size > 0 && Ii(i[0].type),
                C.current = t
            }
            u(e)
        }
        );
        return () => i()
    }
    , [e, t.notificationSoundEnabled]),
    i.useEffect( () => {
        if (!e)
            return;
        const t = function(e) {
            const t = Be(Te(ot, Wi), Ee("participants", "array-contains", e));
            return Re(t, t => {
                let i = 0;
                t.forEach(t => {
                    const a = t.data().unreadCount || {};
                    i += a[e] || 0
                }
                ),
                m(i)
            }
            )
        }(e.uid);
        return () => t()
    }
    , [e]),
    i.useEffect( () => {
        if (!e)
            return;
        const t = function(e) {
            const t = Be(Te(ot, da), Ee("participants", "array-contains", e));
            return Re(t, t => {
                let i = 0;
                t.forEach(t => {
                    const a = t.data().unreadCount || {};
                    i += a[e] || 0
                }
                ),
                h(i)
            }
            )
        }(e.uid);
        return () => t()
    }
    , [e]),
    i.useEffect( () => {
        const e = e => {
            const t = e.target
              , i = k.current && !k.current.contains(t)
              , a = S.current && !S.current.contains(t);
            i && a && s(!1)
        }
        ;
        return document.addEventListener("mousedown", e),
        () => document.removeEventListener("mousedown", e)
    }
    , []),
    i.useEffect( () => {
        r || (v(null),
        _(null),
        x(!1))
    }
    , [r]),
    i.useEffect( () => {
        e && r && ("notifications" === l ? Mi(e.uid, "trades") : "messages" === l && Mi(e.uid, "chat"))
    }
    , [l, r, e]);
    const j = !e
      , R = (e, t) => {
        v(e),
        _(t)
    }
      , T = ["chat_private", "chat_mention", "support_reply", "trade_request", "trade_message", "trade_locked", "trade_completed", "trade_cancelled"]
      , A = d.filter(e => !T.includes(e.type) && !e.read).length
      , z = A + p + g
      , N = A + g
      , M = j ? [{
        key: "support",
        icon: P,
        label: o("chat.support"),
        guestVisible: !0
    }] : [{
        key: "global",
        icon: K,
        label: o("chat.global")
    }, {
        key: "messages",
        icon: D,
        label: o("chat.private"),
        badge: p
    }, {
        key: "notifications",
        icon: Q,
        label: o("nav.market"),
        badge: N
    }, {
        key: "support",
        icon: P,
        label: o("chat.support")
    }]
      , B = "messages" === l && f;
    return a.jsxs("div", {
        className: "relative",
        ref: k,
        children: [a.jsxs("button", {
            onClick: () => {
                !r && j && c("support"),
                s(!r)
            }
            ,
            className: Zt("relative flex items-center justify-center w-10 h-10 rounded-full border transition-colors", j ? "bg-transparent border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10" : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5"),
            "aria-label": o("chat.messages"),
            children: [j ? a.jsx(P, {
                size: 20
            }) : a.jsx(Y, {
                size: 20
            }), z > 0 && a.jsx("span", {
                className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center",
                children: z > 99 ? "99+" : z
            })]
        }), r && J.createPortal(a.jsxs(a.Fragment, {
            children: [a.jsx("div", {
                className: "fixed inset-0 bg-black/50 z-[10000] md:hidden",
                onClick: () => s(!1)
            }), a.jsxs("div", {
                ref: S,
                className: Zt("z-[10001] bg-beige-light shadow-2xl overflow-hidden flex flex-col", "fixed top-0 left-0 right-0 bottom-0 w-full h-full", "md:top-16 md:right-4 md:left-auto md:bottom-auto md:w-[400px] md:h-[520px] md:rounded-xl"),
                children: [a.jsxs("div", {
                    className: "flex items-center justify-between px-4 py-3 bg-blue-dark text-beige-light shrink-0",
                    children: [B ? a.jsxs("button", {
                        onClick: () => {
                            v(null),
                            _(null)
                        }
                        ,
                        className: "flex items-center gap-2 text-sm hover:text-gold-accent transition-colors",
                        children: [a.jsx(I, {
                            size: 18
                        }), a.jsx("span", {
                            children: o("common.goBack")
                        })]
                    }) : a.jsx("h3", {
                        className: "font-semibold",
                        children: o(j ? "chatSupport.title" : "chat.messages")
                    }), a.jsx("button", {
                        onClick: () => s(!1),
                        className: "p-1 rounded-lg hover:bg-white/10 transition-colors",
                        children: a.jsx(b, {
                            size: 20
                        })
                    })]
                }), !B && M.length > 1 && a.jsx("div", {
                    className: "flex bg-blue-dark/80 shrink-0",
                    children: M.map(e => {
                        const t = e.icon;
                        return a.jsxs("button", {
                            onClick: () => c(e.key),
                            className: Zt("flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all border-b-2 relative", l === e.key ? "text-gold-accent border-b-gold-accent" : "text-beige-light/70 hover:text-beige-light border-b-transparent"),
                            children: [a.jsx(t, {
                                size: 15
                            }), a.jsx("span", {
                                className: "hidden sm:inline",
                                children: e.label
                            }), e.badge && e.badge > 0 ? a.jsx("span", {
                                className: "min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center",
                                children: e.badge > 99 ? "99+" : e.badge
                            }) : null]
                        }, e.key)
                    }
                    )
                }), a.jsx("div", {
                    className: "flex-1 overflow-hidden bg-beige-light",
                    children: ( () => {
                        if ("messages" === l && f && y)
                            return a.jsx(Pa, {
                                conversationId: f,
                                partnerId: y
                            });
                        switch (l) {
                        case "notifications":
                            return a.jsx(uo, {});
                        case "global":
                            return a.jsx(Ta, {});
                        case "messages":
                            return a.jsx(Aa, {
                                onSelectConversation: R,
                                onStartNewConversation: () => x(!0)
                            });
                        case "support":
                            return a.jsx(La, {});
                        default:
                            return null
                        }
                    }
                    )()
                })]
            }), w && a.jsx(Oa, {
                onClose: () => x(!1),
                onConversationStart: (e, t) => {
                    x(!1),
                    v(e),
                    _(t)
                }
            })]
        }), document.body)]
    })
}
function mo() {
    const e = v()
      , t = f()
      , [o,r] = i.useState(!1)
      , [l,c] = i.useState(!1)
      , [d,u] = i.useState(!1)
      , [p,g] = i.useState(null)
      , {t: h} = n()
      , {isAdmin: b} = St()
      , {user: C, signInWithGoogle: R, signOut: T} = wt()
      , {preferences: A, updateVideoBackground: z} = zt()
      , I = i.useRef(null)
      , {getPath: P} = function() {
        const {preferences: e} = zt()
          , t = e.language;
        return {
            getPath: (e, i) => {
                if (i) {
                    const e = Ht.find(e => e.mapId === i);
                    if (e)
                        return `/${t}${e[t]}`
                }
                const a = Gt[e];
                if (a) {
                    const e = a[t];
                    return `/${t}${"/" === e ? "" : e}`
                }
                return `/${t}`
            }
            ,
            lang: t
        }
    }()
      , M = A.language || "en"
      , D = !1 !== A.videoBackgroundEnabled
      , E = e.pathname.includes("/admin")
      , L = [{
        key: "home",
        label: h("nav.home"),
        routeKey: "home",
        icon: Z
    }, {
        key: "mappe",
        label: h("nav.mappe"),
        routeKey: "maps",
        children: [{
            key: "maps",
            label: h("nav.maps"),
            path: "it" === M ? "/it/mappe/diga" : "/en/maps/dam",
            beta: !0,
            icon: X
        }, {
            key: "timers",
            label: h("nav.timers"),
            routeKey: "timers",
            icon: N
        }]
    }, {
        key: "officina",
        label: h("nav.officina"),
        routeKey: "workshop",
        children: [{
            key: "items",
            label: h("nav.items"),
            routeKey: "items",
            icon: ee
        }, {
            key: "hideout",
            label: h("nav.hideout"),
            routeKey: "hideout",
            icon: te
        }, {
            key: "projects",
            label: h("nav.projects"),
            routeKey: "projects",
            icon: ie
        }, {
            key: "missingItems",
            label: h("nav.missingItems"),
            routeKey: "missingItems",
            icon: B
        }]
    }, {
        key: "raider",
        label: h("nav.raider"),
        routeKey: "raider",
        children: [{
            key: "quests",
            label: h("nav.quests"),
            routeKey: "quests",
            icon: ae
        }, {
            key: "skillTree",
            label: h("nav.skillTree"),
            routeKey: "skillTree",
            icon: oe
        }, {
            key: "trials",
            label: h("nav.trials"),
            routeKey: "trials",
            icon: re
        }, {
            key: "blueprints",
            label: h("nav.blueprints"),
            routeKey: "blueprints",
            icon: ne
        }]
    }, {
        key: "community",
        label: h("nav.community"),
        children: [{
            key: "market",
            label: h("nav.market"),
            routeKey: "market",
            beta: !0,
            icon: se
        }, {
            key: "builds",
            label: h("nav.builds"),
            routeKey: "builds",
            icon: le
        }, {
            key: "loadout",
            label: h("nav.loadout"),
            routeKey: "loadout",
            icon: ce
        }, {
            key: "contributi",
            label: h("nav.contributi"),
            routeKey: "support",
            icon: j
        }]
    }, {
        key: "forSale",
        label: "For Sale",
        routeKey: "forSale",
        icon: de
    }]
      , O = [{
        key: "home",
        label: h("nav.home"),
        path: `/${M}/admin`,
        children: [{
            key: "homeLink",
            label: h("nav.homeLink"),
            path: `/${M}/admin`,
            icon: Z
        }],
        mobileOnlyChildren: !0
    }, {
        key: "mappe",
        label: h("nav.mappe"),
        children: [{
            key: "maps",
            label: h("nav.maps"),
            path: `/${M}/admin/maps`,
            icon: X
        }, {
            key: "timers",
            label: h("nav.timers"),
            path: `/${M}/admin/timers`,
            icon: N
        }]
    }, {
        key: "officina",
        label: h("nav.officina"),
        children: [{
            key: "items",
            label: h("nav.items"),
            path: `/${M}/admin/items`,
            icon: ee
        }]
    }, {
        key: "raider",
        label: h("nav.raider"),
        children: [{
            key: "quests",
            label: h("nav.quests"),
            path: `/${M}/admin/quests`,
            icon: ae
        }, {
            key: "blueprints",
            label: h("nav.blueprints"),
            path: `/${M}/admin/blueprints`,
            icon: ne
        }]
    }, {
        key: "settings",
        label: h("nav.settings"),
        children: [{
            key: "settingsLink",
            label: h("nav.settings"),
            path: `/${M}/admin/settings`,
            icon: m
        }]
    }]
      , q = E ? O : L
      , F = () => {
        u(!1),
        c(!0),
        g(null),
        setTimeout( () => {
            r(!1),
            c(!1)
        }
        , 200)
    }
      , U = e => e.path ? e.path : e.routeKey ? P(e.routeKey) : "/"
      , G = () => {
        g(null)
    }
      , H = e => e.endsWith("/") && e.length > 1 ? e.slice(0, -1) : e
      , V = t => {
        const i = H(e.pathname);
        return t.routeKey || t.path ? i === H(U(t)) : !!t.children && t.children.some(e => i === H(U(e)))
    }
      , W = t => H(e.pathname) === H(U(t));
    i.useEffect( () => {
        const e = e => {
            I.current && !I.current.contains(e.target) && g(null)
        }
        ;
        return document.addEventListener("mousedown", e),
        () => {
            document.removeEventListener("mousedown", e)
        }
    }
    , []);
    const $ = E ? `/${M}/admin` : P("home");
    return a.jsxs(a.Fragment, {
        children: [a.jsx("header", {
            className: "fixed top-0 left-0 right-0 z-[1000] w-full pt-[env(safe-area-inset-top,0px)] bg-black/70 backdrop-blur",
            children: a.jsxs("div", {
                className: "max-w-[80rem] mx-auto px-4 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_auto] max-lg:grid-cols-[auto_1fr] items-center gap-12 relative h-16",
                children: [a.jsxs(s, {
                    to: $,
                    className: "flex items-center gap-0 min-w-0 h-full",
                    onClick: F,
                    children: [a.jsx(_i, {
                        src: "/full.png",
                        alt: "Arc Raiders",
                        className: "h-16 w-auto object-contain shrink-0",
                        width: 64,
                        height: 64
                    }), a.jsxs("h1", {
                        className: "font-arc font-medium text-[0.85rem] text-foreground m-0 -ml-[15px] p-0 leading-[1.1] tracking-[0.5px] text-left flex flex-col justify-center items-start max-h-[50px]",
                        children: [a.jsx("div", {
                            children: "ARC"
                        }), a.jsx("div", {
                            className: "translate-x-2 -translate-y-px",
                            children: "Raiders"
                        }), a.jsx("div", {
                            className: "translate-x-[13px] -translate-y-px",
                            children: "Central"
                        })]
                    })]
                }), a.jsx("nav", {
                    className: "hidden lg:flex justify-center items-center h-16 p-0",
                    ref: I,
                    children: q.map(e => {
                        var t;
                        const i = e.children && !e.mobileOnlyChildren;
                        return a.jsxs("div", {
                            className: "relative h-16 flex items-center px-1",
                            onMouseEnter: () => {
                                return i && (t = e.key,
                                void g(t));
                                var t
                            }
                            ,
                            onMouseLeave: G,
                            children: [(null == (t = e.path) ? void 0 : t.startsWith("mailto:")) ? a.jsxs("a", {
                                href: e.path,
                                className: "px-5 py-1.5 text-base tracking-[0.03em] no-underline whitespace-nowrap relative flex items-center gap-1.5 h-auto bg-transparent border-2 border-amber-500/60 cursor-pointer font-bold uppercase rounded-full transition-colors duration-200 text-amber-400 hover:text-amber-300 hover:border-amber-400",
                                children: [a.jsx(de, {
                                    size: 14
                                }), e.label]
                            }) : e.routeKey || e.path ? a.jsx(s, {
                                to: U(e),
                                className: "px-5 py-1.5 text-base tracking-[0.03em] no-underline whitespace-nowrap relative flex items-center gap-1.5 h-auto bg-transparent border-2 border-transparent cursor-pointer font-bold uppercase rounded-full transition-colors duration-200 " + (V(e) ? "text-foreground border-foreground/80" : "text-muted-foreground hover:text-foreground"),
                                children: e.label
                            }) : a.jsx("button", {
                                className: "px-5 py-1.5 text-base tracking-[0.03em] whitespace-nowrap relative flex items-center gap-1.5 h-auto bg-transparent border-2 border-transparent cursor-pointer font-bold uppercase rounded-full transition-colors duration-200 font-inherit " + (V(e) ? "text-foreground border-foreground/80" : "text-muted-foreground hover:text-foreground"),
                                children: e.label
                            }), i && a.jsx("div", {
                                className: "absolute top-full left-1/2 -translate-x-1/2 min-w-[180px] bg-beige-light rounded-md z-[1001] overflow-hidden transition-all duration-200 shadow " + (p === e.key ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2.5"),
                                children: e.children.map(e => a.jsxs(s, {
                                    to: U(e),
                                    className: "w-full flex items-center gap-3 py-3 px-5 bg-transparent border-0 border-b border-black/15 last:border-b-0 text-[#1a1a1a] cursor-pointer text-sm font-semibold tracking-wide uppercase transition-colors duration-150 no-underline hover:text-black hover:bg-black/10 hover:shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))] " + (W(e) ? "text-black shadow-[inset_4px_0_0_0_hsl(var(--gold-accent))]" : ""),
                                    onClick: () => g(null),
                                    children: [e.label, e.beta && a.jsx("span", {
                                        className: "flex items-center text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-[#1a1a1a] bg-gold-accent py-0.5 px-1.5 rounded-[3px] ml-auto leading-none",
                                        children: "beta"
                                    })]
                                }, e.key))
                            })]
                        }, e.key)
                    }
                    )
                }), a.jsxs("div", {
                    className: "hidden lg:flex gap-3 items-center",
                    children: [a.jsx(yi, {
                        iconOnly: !0
                    }), a.jsx(po, {}), a.jsx(fi, {})]
                }), !o && a.jsxs("div", {
                    className: "hidden max-lg:flex items-center gap-2 fixed top-[env(safe-area-inset-top,0px)] h-16 right-[calc(4rem+env(safe-area-inset-right,0px))] z-[9999]",
                    children: [a.jsx(yi, {
                        iconOnly: !0
                    }), a.jsx(po, {})]
                })]
            })
        }), a.jsxs("button", {
            className: "hidden max-lg:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 fixed top-[calc(1rem+env(safe-area-inset-top,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-[9999]",
            onClick: () => {
                o ? F() : (u(!0),
                r(!0))
            }
            ,
            "aria-label": h(d ? "common.close" : "common.menu"),
            "aria-expanded": d,
            children: [a.jsx("span", {
                className: "w-6 h-0.5 bg-foreground rounded-sm transition-transform duration-300 " + (d ? "translate-y-[7px] rotate-45" : "")
            }), a.jsx("span", {
                className: "w-6 h-0.5 bg-foreground rounded-sm transition-opacity duration-300 " + (d ? "opacity-0" : "")
            }), a.jsx("span", {
                className: "w-6 h-0.5 bg-foreground rounded-sm transition-transform duration-300 " + (d ? "-translate-y-[7px] -rotate-45" : "")
            })]
        }), o && a.jsxs(a.Fragment, {
            children: [a.jsxs("nav", {
                className: "fixed top-0 right-0 bottom-0 w-[280px] max-[767px]:w-full bg-blue-light/90 backdrop-blur z-[1001] flex flex-col pt-[env(safe-area-inset-top,0px)] " + (l ? "animate-slide-out-right" : "animate-slide-in-right"),
                children: [a.jsxs("div", {
                    className: "flex items-center justify-start h-[65px] px-4 pr-[calc(1rem+env(safe-area-inset-right,0px))] bg-black/70 shrink-0 gap-1",
                    children: [a.jsx(fi, {
                        inMobileSidebar: !0
                    }), b && a.jsx("button", {
                        className: "flex items-center justify-center w-10 h-10 bg-transparent border border-border text-muted-foreground cursor-pointer transition-all duration-150 rounded-lg hover:text-foreground hover:bg-foreground/5",
                        onClick: () => {
                            t(E ? `/${M}` : `/${M}/admin`),
                            F()
                        }
                        ,
                        title: h(E ? "common.userMode" : "common.adminMode"),
                        children: E ? a.jsx(k, {
                            size: 20
                        }) : a.jsx(S, {
                            size: 20
                        })
                    }), a.jsx("button", {
                        className: "flex items-center justify-center w-10 h-10 bg-transparent border border-border text-muted-foreground cursor-pointer transition-all duration-150 rounded-lg hover:text-foreground hover:bg-foreground/5",
                        onClick: () => z(!D),
                        title: h(D ? "common.videoOn" : "common.videoOff"),
                        children: D ? a.jsx(w, {
                            size: 20
                        }) : a.jsx(x, {
                            size: 20
                        })
                    })]
                }), a.jsxs("div", {
                    className: "flex-1 overflow-y-auto p-2",
                    children: [q.map(e => {
                        var t;
                        return a.jsx("div", {
                            className: "mb-2 rounded-lg overflow-hidden last:mb-0",
                            children: e.children ? a.jsxs(a.Fragment, {
                                children: [e.routeKey ? a.jsxs(s, {
                                    to: U(e),
                                    className: "flex items-center gap-2 px-4 py-3 bg-blue-dark hover:bg-blue-dark/80 transition-colors",
                                    onClick: F,
                                    children: [a.jsx(ue, {
                                        size: 16,
                                        className: "text-foreground opacity-70"
                                    }), a.jsx("span", {
                                        className: "text-xs font-bold uppercase tracking-widest text-foreground",
                                        children: e.label
                                    })]
                                }) : a.jsx("div", {
                                    className: "flex items-center gap-2 px-4 py-3 bg-blue-dark",
                                    children: a.jsx("span", {
                                        className: "text-xs font-bold uppercase tracking-widest text-foreground",
                                        children: e.label
                                    })
                                }), a.jsx("div", {
                                    className: "flex flex-col",
                                    children: e.children.map(e => {
                                        const t = e.icon;
                                        return a.jsxs(s, {
                                            to: U(e),
                                            className: "flex items-center gap-2 w-full px-4 h-11 text-sm font-semibold text-[#1a1a1a] no-underline uppercase tracking-wide bg-beige-light border-b border-black/10 last:border-b-0 transition-colors duration-150 hover:bg-[#efe0c8] " + (W(e) ? "bg-[#e5d4b8] font-semibold" : ""),
                                            onClick: F,
                                            children: [t && a.jsx(t, {
                                                size: 18,
                                                className: "shrink-0 text-[#1a1a1a] opacity-70"
                                            }), e.label, e.beta && a.jsx("span", {
                                                className: "text-[0.55rem] font-semibold uppercase tracking-wide text-[#1a1a1a] bg-gold-accent px-1.5 py-0.5 rounded ml-auto",
                                                children: "beta"
                                            })]
                                        }, e.key)
                                    }
                                    )
                                })]
                            }) : (null == (t = e.path) ? void 0 : t.startsWith("mailto:")) ? a.jsxs("a", {
                                href: e.path,
                                className: "flex items-center gap-2 w-full px-4 h-11 text-sm font-semibold no-underline uppercase tracking-wide bg-amber-950/80 text-amber-400 transition-colors duration-150 hover:bg-amber-900/80",
                                onClick: F,
                                children: [a.jsx(de, {
                                    size: 18,
                                    className: "shrink-0"
                                }), e.label]
                            }) : a.jsxs(s, {
                                to: U(e),
                                className: "flex items-center gap-2 w-full px-4 h-11 text-sm font-semibold text-[#1a1a1a] no-underline uppercase tracking-wide bg-beige-light transition-colors duration-150 hover:bg-[#efe0c8] " + (V(e) ? "bg-[#e5d4b8]" : ""),
                                onClick: F,
                                children: [e.icon && a.jsx(e.icon, {
                                    size: 18,
                                    className: "shrink-0 text-[#1a1a1a] opacity-70"
                                }), e.label]
                            })
                        }, e.key)
                    }
                    ), C && a.jsxs("div", {
                        className: "mb-2 rounded-lg overflow-hidden last:mb-0",
                        children: [a.jsx("div", {
                            className: "flex items-center gap-2 px-4 py-3 bg-blue-dark",
                            children: a.jsx("span", {
                                className: "text-xs font-bold uppercase tracking-widest text-foreground",
                                children: h("common.user")
                            })
                        }), a.jsx("div", {
                            className: "flex flex-col",
                            children: a.jsxs(s, {
                                to: `/${M}/${"it" === M ? "profilo" : "profile"}/${C.uid}`,
                                className: "flex items-center gap-2 w-full px-4 h-11 text-sm font-semibold text-[#1a1a1a] no-underline uppercase tracking-wide bg-beige-light border-b border-black/10 last:border-b-0 transition-colors duration-150 hover:bg-[#efe0c8]",
                                onClick: F,
                                children: [a.jsx(y, {
                                    size: 18,
                                    className: "shrink-0 text-[#1a1a1a] opacity-70"
                                }), h("nav.profile")]
                            })
                        })]
                    }), a.jsx("div", {
                        className: "mb-2 rounded-lg overflow-hidden last:mb-0",
                        children: a.jsx("div", {
                            className: "flex flex-col",
                            children: a.jsxs(s, {
                                to: `/${M}/${"it" === M ? "impostazioni" : "settings"}`,
                                className: "flex items-center gap-2 w-full px-4 h-11 text-sm font-semibold text-[#1a1a1a] no-underline uppercase tracking-wide bg-beige-light border-b border-black/10 last:border-b-0 transition-colors duration-150 hover:bg-[#efe0c8]",
                                onClick: F,
                                children: [a.jsx(m, {
                                    size: 18,
                                    className: "shrink-0 text-[#1a1a1a] opacity-70"
                                }), h("nav.settings")]
                            })
                        })
                    })]
                }), a.jsx("div", {
                    className: "flex items-center h-[65px] px-4 bg-black/70 shrink-0",
                    children: C ? a.jsxs("button", {
                        className: "flex items-center justify-center gap-2 w-full h-10 px-4 text-sm font-semibold text-blue-dark bg-gold-accent border-none rounded-lg cursor-pointer transition-all duration-150 hover:bg-gold-accent/75",
                        onClick: () => {
                            T(),
                            F()
                        }
                        ,
                        children: [a.jsx(_, {
                            size: 18
                        }), a.jsx("span", {
                            children: h("common.logout")
                        })]
                    }) : a.jsxs("button", {
                        className: "flex items-center justify-center gap-2 w-full h-10 px-4 text-sm font-semibold text-blue-dark bg-gold-accent border-none rounded-lg cursor-pointer transition-all duration-150 hover:bg-gold-accent/75",
                        onClick: () => {
                            R(),
                            F()
                        }
                        ,
                        children: [a.jsx(pe, {
                            size: 18
                        }), a.jsx("span", {
                            children: h("common.login")
                        })]
                    })
                })]
            }), a.jsx("div", {
                className: "fixed top-0 left-0 w-full h-screen bg-black/50 z-[999] backdrop-blur-sm",
                onClick: F
            })]
        })]
    })
}
const go = "arc-for-sale-banner-dismissed";
function ho() {
    const {i18n: e} = n()
      , t = "it" === e.language ? "it" : "en"
      , [o,r] = i.useState( () => {
        try {
            const e = localStorage.getItem(go);
            return !!e && Date.now() - parseInt(e) < 6048e5
        } catch {
            return !1
        }
    }
    );
    return o ? null : a.jsx("div", {
        className: "fixed top-[calc(4rem+env(safe-area-inset-top,0px))] left-0 right-0 bg-amber-950/80 border-b border-amber-700/50 backdrop-blur-sm z-[999]",
        children: a.jsxs("div", {
            className: "relative flex items-center justify-center px-10 py-2",
            children: [a.jsxs("p", {
                className: "text-sm text-amber-100 text-center",
                children: [a.jsx(de, {
                    size: 13,
                    className: "text-amber-400 inline-block mr-1.5 -mt-0.5"
                }), a.jsx("span", {
                    className: "font-semibold",
                    children: "it" === t ? "Arc Raiders Central è in vendita." : "Arc Raiders Central is for sale."
                }), " ", a.jsx("span", {
                    className: "text-amber-200/80",
                    children: a.jsx(s, {
                        to: `/${t}/for-sale`,
                        className: "underline underline-offset-2 hover:text-amber-100",
                        children: "it" === t ? "Scopri di più" : "Learn more"
                    })
                })]
            }), a.jsx("button", {
                onClick: () => {
                    try {
                        localStorage.setItem(go, String(Date.now()))
                    } catch {}
                    r(!0)
                }
                ,
                className: "absolute right-4 text-amber-400/70 hover:text-amber-200 transition-colors",
                "aria-label": "Dismiss",
                children: a.jsx(b, {
                    size: 16
                })
            })]
        })
    })
}
function bo() {
    const {t: e} = n()
      , t = (new Date).getFullYear();
    return a.jsxs("footer", {
        className: "bg-black/70 backdrop-blur px-4 h-[100px] max-md:h-[115px] max-xs:h-[130px] flex flex-col items-center justify-center gap-1.5 max-md:gap-1",
        children: [a.jsx("div", {
            className: "flex items-center gap-2 text-[0.8rem] text-muted-foreground max-md:text-[0.65rem]",
            children: a.jsxs("span", {
                children: ["© ", t, " Arc Raiders Central"]
            })
        }), a.jsxs("div", {
            className: "flex items-center gap-2 flex-wrap justify-center max-md:gap-1.5",
            children: [a.jsx(Jt, {
                to: "about",
                className: "text-xs text-muted-foreground no-underline transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 hover:text-foreground max-md:text-[0.65rem]",
                children: e("footer.about")
            }), a.jsx("span", {
                className: "text-xs text-muted-foreground/50 max-md:text-[0.65rem]",
                children: "|"
            }), a.jsx(Jt, {
                to: "privacy",
                className: "text-xs text-muted-foreground no-underline transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 hover:text-foreground max-md:text-[0.65rem]",
                children: e("footer.privacy")
            }), a.jsx("span", {
                className: "text-xs text-muted-foreground/50 max-md:text-[0.65rem]",
                children: "|"
            }), a.jsx(Jt, {
                to: "terms",
                className: "text-xs text-muted-foreground no-underline transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 hover:text-foreground max-md:text-[0.65rem]",
                children: e("footer.terms")
            }), a.jsx("span", {
                className: "text-xs text-muted-foreground/50 max-md:text-[0.65rem]",
                children: "|"
            }), a.jsx(Jt, {
                to: "cookies",
                className: "text-xs text-muted-foreground no-underline transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 hover:text-foreground max-md:text-[0.65rem]",
                children: e("footer.cookies")
            }), a.jsx("span", {
                className: "text-xs text-muted-foreground/50 max-md:text-[0.65rem]"
            })]
        }), a.jsx("div", {
            className: "text-[0.65rem] text-muted-foreground/70 text-center max-w-[600px] leading-[1.4] max-md:text-[0.55rem] max-md:px-2",
            children: e("footer.disclaimer")
        })]
    })
}
const fo = "https://arcraiderscentral.app";
function vo(e, t, i) {
    let a = document.querySelector(`meta[${e}="${t}"]`);
    a ? a.setAttribute("content", i) : (a = document.createElement("meta"),
    a.setAttribute(e, t),
    a.setAttribute("content", i),
    document.head.appendChild(a))
}
const yo = new class {
    constructor() {
        t(this, "pendingOperations", new Map),
        t(this, "saveTimeout", null),
        t(this, "DEBOUNCE_DELAY", 1e3),
        t(this, "PENDING_OPS_KEY", "arc-raiders-pending-firebase-ops"),
        t(this, "isSaving", !1),
        t(this, "loadingListeners", new Set),
        t(this, "handleBeforeUnload", () => {
            this.pendingOperations.size > 0 && (this.sendPendingOperationsViaBeacon(),
            this.savePendingOperations())
        }
        ),
        this.loadPendingOperations(),
        "undefined" != typeof window && window.addEventListener("beforeunload", this.handleBeforeUnload)
    }
    scheduleSave(e, t, i, a=!0) {
        const o = `${e}:${t}`;
        this.pendingOperations.set(o, {
            collection: e,
            userId: t,
            data: i,
            merge: a
        }),
        this.savePendingOperations(),
        this.saveTimeout && clearTimeout(this.saveTimeout),
        this.saveTimeout = setTimeout( () => {
            this.executeBatchSave()
        }
        , this.DEBOUNCE_DELAY)
    }
    onLoadingEvent(e) {
        return this.loadingListeners.add(e),
        () => this.loadingListeners.delete(e)
    }
    emitLoadingEvent(e) {
        this.loadingListeners.forEach(t => t(e))
    }
    async executeBatchSave() {
        if (this.isSaving || 0 === this.pendingOperations.size)
            return;
        this.isSaving = !0,
        this.emitLoadingEvent("start");
        const e = Array.from(this.pendingOperations.values());
        this.pendingOperations.clear();
        try {
            if (1 === e.length) {
                const t = e[0]
                  , i = ze(ot, t.collection, t.userId);
                await Ie(i, t.data, {
                    merge: t.merge ?? !0
                })
            } else {
                const t = Ve(ot);
                for (const i of e) {
                    const e = ze(ot, i.collection, i.userId);
                    i.merge ? t.set(e, i.data, {
                        merge: !0
                    }) : t.set(e, i.data)
                }
                await t.commit()
            }
            this.clearPendingOperations(),
            this.emitLoadingEvent("success")
        } catch (t) {
            this.emitLoadingEvent("error");
            for (const i of e) {
                const e = `${i.collection}:${i.userId}`;
                this.pendingOperations.set(e, i)
            }
            this.savePendingOperations(),
            setTimeout( () => {
                this.executeBatchSave()
            }
            , 5e3)
        } finally {
            this.isSaving = !1
        }
    }
    sendPendingOperationsViaBeacon() {
        this.savePendingOperations()
    }
    savePendingOperations() {
        try {
            const e = Array.from(this.pendingOperations.entries());
            localStorage.setItem(this.PENDING_OPS_KEY, JSON.stringify(e))
        } catch (e) {}
    }
    loadPendingOperations() {
        try {
            const e = localStorage.getItem(this.PENDING_OPS_KEY);
            if (e) {
                const t = JSON.parse(e);
                this.pendingOperations = new Map(t),
                this.pendingOperations.size > 0 && setTimeout( () => {
                    this.executeBatchSave()
                }
                , 1e3)
            }
        } catch (e) {}
    }
    clearPendingOperations() {
        try {
            localStorage.removeItem(this.PENDING_OPS_KEY)
        } catch (e) {}
    }
    cancelPendingSaves() {
        this.saveTimeout && (clearTimeout(this.saveTimeout),
        this.saveTimeout = null),
        this.pendingOperations.clear(),
        this.clearPendingOperations()
    }
    getPendingCount() {
        return this.pendingOperations.size
    }
}
  , _o = ["arc-raiders-hideout", "arc-raiders-projects", "arc-raiders-quest-progress", "arc-raiders-blueprints"]
  , wo = ["hideout", "projects", "user-quests", "blueprints"];
async function xo(e) {
    for (const t of _o)
        try {
            localStorage.removeItem(t)
        } catch {}
    if (yo.cancelPendingSaves(),
    e) {
        const t = Ve(ot);
        for (const i of wo)
            t.delete(ze(ot, i, e.uid));
        await t.commit()
    }
}
function ko(e, t, i, a, o) {
    try {
        localStorage.setItem(e, JSON.stringify(t))
    } catch (r) {}
    if (i) {
        const e = o || t;
        yo.scheduleSave(a, i.uid, e, !0)
    }
}
const So = i.lazy( () => Je( () => import("./Home-B_RAXqwn.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).then(e => ({
    default: e.Home
})))
  , Co = i.lazy( () => Je( () => import("./Items-BV0_y3BP.js"), __vite__mapDeps([12, 1, 2, 3, 4, 13, 14, 8, 15, 16, 17, 18, 19])).then(e => ({
    default: e.Items
})))
  , jo = i.lazy( () => Je( () => import("./MapTimers-DWJsmUR5.js"), __vite__mapDeps([20, 1, 2, 3, 4, 21, 8, 22, 16, 23, 18, 24, 9, 25])).then(e => ({
    default: e.MapTimers
})))
  , Ro = i.lazy( () => Je( () => import("./InteractiveMaps-BZF2c0Ri.js"), __vite__mapDeps([26, 1, 2, 3, 4, 27, 8, 16, 22, 17, 18, 28, 29, 15, 24, 9, 30])).then(e => ({
    default: e.InteractiveMaps
})))
  , To = i.lazy( () => Je( () => import("./Quests-DhaqlQNR.js"), __vite__mapDeps([31, 1, 2, 3, 4, 15, 22, 28, 16, 8, 14, 32])).then(e => ({
    default: e.Quests
})))
  , Ao = i.lazy( () => Je( () => import("./Projects-DwaqMpHk.js"), __vite__mapDeps([33, 1, 2, 3, 4, 28, 8, 34, 35, 36, 14, 37])).then(e => ({
    default: e.Projects
})))
  , zo = i.lazy( () => Je( () => import("./Blueprints-C5gX3__T.js"), __vite__mapDeps([38, 1, 2, 3, 4, 28, 15, 22, 5, 6, 8, 39, 40, 13])).then(e => ({
    default: e.Blueprints
})))
  , Io = i.lazy( () => Je( () => import("./HideoutPlanner-BPdKvcfY.js"), __vite__mapDeps([41, 1, 2, 3, 4, 28, 8, 34, 35, 36, 14, 42])).then(e => ({
    default: e.HideoutPlanner
})))
  , Po = i.lazy( () => Je( () => import("./MissingItems-Dy7y95_a.js"), __vite__mapDeps([43, 1, 2, 3, 4, 28, 8, 14, 5, 6, 44])).then(e => ({
    default: e.MissingItems
})))
  , No = i.lazy( () => Je( () => import("./SkillTree-DdRXDmtj.js"), __vite__mapDeps([45, 1, 2, 3, 4, 15, 22, 46, 8, 47])).then(e => ({
    default: e.SkillTree
})))
  , Mo = i.lazy( () => Je( () => import("./Support-Ckj5A99A.js"), __vite__mapDeps([48, 1, 2, 3, 4, 5, 6, 9, 8, 49])).then(e => ({
    default: e.Support
})))
  , Do = i.lazy( () => Je( () => import("./Trials-fU35hQ1f.js"), __vite__mapDeps([50, 1, 2, 3, 4, 8, 22, 28, 15, 51])).then(e => ({
    default: e.Trials
})))
  , Bo = i.lazy( () => Je( () => import("./MapsHub-CnFqw7Ll.js"), __vite__mapDeps([52, 1, 2, 3, 4, 5, 6, 9, 8, 53])).then(e => ({
    default: e.MapsHub
})))
  , Eo = i.lazy( () => Je( () => import("./WorkshopHub-DHM77djm.js"), __vite__mapDeps([54, 1, 2, 3, 4, 5, 6, 8, 55])).then(e => ({
    default: e.WorkshopHub
})))
  , Lo = i.lazy( () => Je( () => import("./RaiderHub-BOo3LPvW.js"), __vite__mapDeps([56, 1, 2, 3, 4, 5, 6, 8, 57])).then(e => ({
    default: e.RaiderHub
})))
  , Oo = i.lazy( () => Je( () => import("./AdminHome-muc6Eewl.js"), __vite__mapDeps([58, 1, 2, 3, 4, 5, 6, 16, 8, 59, 11])).then(e => ({
    default: e.AdminHome
})))
  , qo = i.lazy( () => Je( () => import("./AdminMaps-ChJWTCP7.js"), __vite__mapDeps([60, 1, 2, 3, 4, 27, 8, 16, 22, 15, 24, 18, 28, 29])).then(e => ({
    default: e.AdminMaps
})))
  , Fo = i.lazy( () => Je( () => import("./AdminTimers-Cnw0nHuX.js"), __vite__mapDeps([61, 1, 2, 3, 4, 21, 8, 15, 18, 28, 29, 22, 62, 16, 17])).then(e => ({
    default: e.AdminTimers
})))
  , Uo = i.lazy( () => Je( () => import("./AdminQuests-DsIMgVhb.js"), __vite__mapDeps([63, 1, 2, 3, 4, 15, 18, 28, 29, 22, 16, 8, 14])).then(e => ({
    default: e.AdminQuests
})))
  , Go = i.lazy( () => Je( () => import("./AdminItems-DRujKKdK.js"), __vite__mapDeps([64, 1, 2, 3, 4, 15, 18, 28, 29, 62, 24, 22, 16, 14, 8])).then(e => ({
    default: e.AdminItems
})))
  , Ho = i.lazy( () => Je( () => import("./AdminSettings-BOMr8oEd.js"), __vite__mapDeps([65, 1, 2, 3, 4, 7, 8, 28, 29, 17, 18, 15, 22, 16])).then(e => ({
    default: e.AdminSettings
})))
  , Vo = i.lazy( () => Je( () => import("./AdminBlueprints-DYoWnrCj.js"), __vite__mapDeps([66, 1, 2, 3, 4, 15, 18, 24, 28, 29, 22, 16, 5, 6, 8, 39, 40])).then(e => ({
    default: e.AdminBlueprints
})))
  , Wo = i.lazy( () => Je( () => import("./AdminUsers-Bhs_WynP.js"), __vite__mapDeps([67, 1, 2, 3, 4, 16, 28, 15, 23, 8])).then(e => ({
    default: e.AdminUsers
})))
  , $o = i.lazy( () => Je( () => import("./PrivacyPolicy-BTJDPOgK.js"), __vite__mapDeps([68, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.PrivacyPolicy
})))
  , Qo = i.lazy( () => Je( () => import("./TermsOfService-rm568V8N.js"), __vite__mapDeps([69, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.TermsOfService
})))
  , Ko = i.lazy( () => Je( () => import("./CookiePolicy-C-K0pqvr.js"), __vite__mapDeps([70, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.CookiePolicy
})))
  , Yo = i.lazy( () => Je( () => import("./Settings-Dz1qEkLu.js"), __vite__mapDeps([71, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.Settings
})))
  , Jo = i.lazy( () => Je( () => import("./Profile-DYG_xM89.js"), __vite__mapDeps([72, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.Profile
})))
  , Zo = i.lazy( () => Je( () => import("./Market-Cion4msL.js"), __vite__mapDeps([73, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.Market
})))
  , Xo = i.lazy( () => Je( () => import("./SharedBuilds-Dj3PE05j.js"), __vite__mapDeps([74, 1, 2, 3, 4, 5, 6, 9, 35, 46, 8])).then(e => ({
    default: e.SharedBuilds
})))
  , er = i.lazy( () => Je( () => import("./LoadoutBuilder-BelJYQyq.js"), __vite__mapDeps([75, 1, 2, 3, 4, 5, 6, 9, 14, 8, 15])).then(e => ({
    default: e.LoadoutBuilder
})))
  , tr = i.lazy( () => Je( () => import("./About-DwbUuze9.js"), __vite__mapDeps([76, 1, 2, 3, 4, 5, 6, 8])).then(e => ({
    default: e.About
})))
  , ir = i.lazy( () => Je( () => import("./ForSale-DpuNybfP.js"), __vite__mapDeps([77, 1, 2, 3, 4, 5, 6, 9, 8])).then(e => ({
    default: e.ForSale
})));
function ar() {
    return a.jsx("div", {
        className: "flex items-center justify-center min-h-[60vh]",
        children: a.jsx("div", {
            className: "text-beige",
            children: "Loading..."
        })
    })
}
function or() {
    return a.jsx("div", {
        className: "flex items-center justify-center min-h-screen bg-background",
        children: a.jsx("div", {
            className: "text-beige",
            children: "Loading..."
        })
    })
}
function rr({children: e}) {
    const {loading: t} = zt();
    return t ? a.jsx(or, {}) : a.jsx(a.Fragment, {
        children: e
    })
}
function nr() {
    const e = v()
      , {preferences: t} = zt()
      , i = t.language || "en";
    return a.jsx(ye, {
        to: ( () => {
            const t = e.pathname;
            if ("/crafting" === t || "/en/crafting" === t || "/it/crafting" === t)
                return `/${i}${Gt.items[i]}`;
            if ("/shopping-list" === t || "/en/shopping-list" === t || "/it/lista-spesa" === t)
                return `/${i}${Gt.missingItems[i]}`;
            for (const a of Ht) {
                if ("/maps" === t && e.search.includes("map=")) {
                    const t = new URLSearchParams(e.search).get("map")
                      , a = Ht.find(e => e.mapId === t);
                    if (a)
                        return `/${i}${a[i]}`
                }
                if (a.en === t || a.en.replace("/maps/", "/") === t)
                    return `/${i}${a[i]}`
            }
            for (const [,e] of Object.entries(Gt))
                if (e.en === t)
                    return `/${i}${e[i]}`;
            return `/${i}`
        }
        )(),
        replace: !0
    })
}
function sr() {
    const e = v();
    return i.useEffect( () => {
        if (e.pathname.startsWith("/admin"))
            return;
        const t = Yt(e.pathname);
        o.language !== t && o.changeLanguage(t)
    }
    , [e.pathname]),
    null
}
function lr() {
    const e = v()
      , t = e.pathname.includes("/admin")
      , o = /^\/(en\/maps|it\/mappe)\/[^/]+$/.test(e.pathname);
    return function() {
        const e = v()
          , t = C();
        i.useEffect( () => {
            const i = Yt(e.pathname)
              , a = Qt(e.pathname)
              , o = Kt(e.pathname)
              , r = t.mapId
              , n = e.pathname.includes("/admin")
              , s = o || r;
            let l, c, d, u, p;
            if (s && Wt[s]) {
                const t = Wt[s];
                l = "it" === i ? t.titleIt : t.titleEn,
                c = "it" === i ? t.descriptionIt : t.descriptionEn;
                const a = Ht.find(e => e.mapId === s);
                a ? (d = `/${i}${a[i]}`,
                u = `/en${a.en}`,
                p = `/it${a.it}`) : (d = e.pathname,
                u = `/en/maps/${s}`,
                p = `/it/mappe/${s}`)
            } else if (a && Vt[a]) {
                const t = Vt[a];
                l = "it" === i ? t.titleIt : t.titleEn,
                c = "it" === i ? t.descriptionIt : t.descriptionEn;
                const o = Gt[a];
                o ? (d = `/${i}${"/" === o[i] ? "" : o[i]}`,
                u = `/en${"/" === o.en ? "" : o.en}`,
                p = `/it${"/" === o.it ? "" : o.it}`) : (d = e.pathname,
                u = e.pathname.replace(/^\/(it)/, "/en"),
                p = e.pathname.replace(/^\/(en)/, "/it"))
            } else {
                const e = Vt.home;
                l = "it" === i ? e.titleIt : e.titleEn,
                c = "it" === i ? e.descriptionIt : e.descriptionEn,
                d = `/${i}`,
                u = "/en",
                p = "/it"
            }
            document.title = l,
            vo("name", "description", c),
            function(e, t) {
                let i = document.querySelector(`link[rel="${e}"]`);
                i ? i.href = t : (i = document.createElement("link"),
                i.rel = e,
                i.href = t,
                document.head.appendChild(i))
            }("canonical", `${fo}${d}`),
            function(e, t) {
                const i = "https://arcraiderscentral.app";
                document.querySelectorAll("link[hreflang]").forEach(e => e.remove());
                const a = document.createElement("link");
                a.rel = "alternate",
                a.hreflang = "en",
                a.href = `${i}${e}`,
                document.head.appendChild(a);
                const o = document.createElement("link");
                o.rel = "alternate",
                o.hreflang = "it",
                o.href = `${i}${t}`,
                document.head.appendChild(o);
                const r = document.createElement("link");
                r.rel = "alternate",
                r.hreflang = "x-default",
                r.href = `${i}${e}`,
                document.head.appendChild(r)
            }(u, p),
            vo("property", "og:title", l),
            vo("property", "og:description", c),
            vo("property", "og:url", `${fo}${d}`),
            vo("property", "og:locale", "it" === i ? "it_IT" : "en_US"),
            vo("name", "twitter:title", l),
            vo("name", "twitter:description", c),
            vo("name", "twitter:url", `${fo}${d}`),
            document.documentElement.lang = i,
            vo("name", "robots", n ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")
        }
        , [e.pathname, t.mapId])
    }(),
    function() {
        const {startLoading: e, endLoading: t} = Et();
        i.useEffect( () => yo.onLoadingEvent(i => {
            switch (i) {
            case "start":
                e();
                break;
            case "success":
                t("success");
                break;
            case "error":
                t("error")
            }
        }
        ), [e, t])
    }(),
    function() {
        const {user: e} = wt()
          , t = i.useRef(null);
        i.useEffect( () => {
            if (!e)
                return void (t.current && (clearInterval(t.current),
                t.current = null));
            const i = async () => {
                try {
                    const t = await lt(e.uid)
                      , i = (null == t ? void 0 : t.displayName) || e.displayName || "Unknown"
                      , a = (null == t ? void 0 : t.photoURL) ?? e.photoURL ?? null;
                    await async function(e, t, i) {
                        const a = ze(ot, Vi, e);
                        await Ie(a, {
                            id: e,
                            displayName: t,
                            photoURL: i,
                            lastSeen: Date.now()
                        }, {
                            merge: !0
                        })
                    }(e.uid, i, a)
                } catch {}
            }
            ;
            return i(),
            t.current = setInterval(i, 12e4),
            () => {
                t.current && (clearInterval(t.current),
                t.current = null)
            }
        }
        , [e])
    }(),
    function() {
        const {user: e} = wt()
          , t = i.useRef(!1);
        i.useEffect( () => {
            if (!me.isNativePlatform() || !e || t.current)
                return;
            const i = ge.addListener("registration", async t => {
                try {
                    const i = ze(ot, "user-settings", e.uid);
                    await Ie(i, {
                        fcmToken: t.value,
                        updatedAt: Date.now()
                    }, {
                        merge: !0
                    })
                } catch {}
            }
            )
              , a = ge.addListener("registrationError", () => {}
            );
            return (async () => {
                try {
                    if ("granted" !== (await ge.requestPermissions()).receive)
                        return;
                    await ge.register(),
                    t.current = !0
                } catch {}
            }
            )(),
            () => {
                i.then(e => e.remove()),
                a.then(e => e.remove())
            }
        }
        , [e])
    }(),
    function() {
        const {user: e} = wt()
          , {preferences: t} = zt();
        i.useRef(!1),
        i.useEffect( () => {
            me.isNativePlatform() || "serviceWorker"in navigator && window
        }
        , [e, t.pushNotificationsEnabled])
    }(),
    a.jsxs("div", {
        className: "flex flex-col min-h-screen",
        children: [a.jsx(sr, {}), a.jsx(mo, {}), a.jsxs("main", {
            className: "flex-1 pt-[calc(4rem+env(safe-area-inset-top,0px))]",
            children: [!t && a.jsx(ho, {}), a.jsx(hi, {
                children: a.jsx(i.Suspense, {
                    fallback: a.jsx(ar, {}),
                    children: a.jsxs(be, {
                        children: [a.jsx(fe, {
                            path: "/en",
                            element: a.jsx(So, {})
                        }), a.jsx(fe, {
                            path: "/en/timers",
                            element: a.jsx(jo, {})
                        }), a.jsx(fe, {
                            path: "/en/maps",
                            element: a.jsx(Bo, {})
                        }), a.jsx(fe, {
                            path: "/en/maps/:mapId",
                            element: a.jsx(Ro, {})
                        }), a.jsx(fe, {
                            path: "/en/workshop",
                            element: a.jsx(Eo, {})
                        }), a.jsx(fe, {
                            path: "/en/raider",
                            element: a.jsx(Lo, {})
                        }), a.jsx(fe, {
                            path: "/en/hideout",
                            element: a.jsx(Io, {})
                        }), a.jsx(fe, {
                            path: "/en/skill-tree",
                            element: a.jsx(No, {})
                        }), a.jsx(fe, {
                            path: "/en/quests",
                            element: a.jsx(To, {})
                        }), a.jsx(fe, {
                            path: "/en/projects",
                            element: a.jsx(Ao, {})
                        }), a.jsx(fe, {
                            path: "/en/items",
                            element: a.jsx(Co, {})
                        }), a.jsx(fe, {
                            path: "/en/blueprints",
                            element: a.jsx(zo, {})
                        }), a.jsx(fe, {
                            path: "/en/missing-items",
                            element: a.jsx(Po, {})
                        }), a.jsx(fe, {
                            path: "/en/trials",
                            element: a.jsx(Do, {})
                        }), a.jsx(fe, {
                            path: "/en/about",
                            element: a.jsx(tr, {})
                        }), a.jsx(fe, {
                            path: "/en/for-sale",
                            element: a.jsx(ir, {})
                        }), a.jsx(fe, {
                            path: "/en/support",
                            element: a.jsx(Mo, {})
                        }), a.jsx(fe, {
                            path: "/en/privacy",
                            element: a.jsx($o, {})
                        }), a.jsx(fe, {
                            path: "/en/terms",
                            element: a.jsx(Qo, {})
                        }), a.jsx(fe, {
                            path: "/en/cookies",
                            element: a.jsx(Ko, {})
                        }), a.jsx(fe, {
                            path: "/en/settings",
                            element: a.jsx(Yo, {})
                        }), a.jsx(fe, {
                            path: "/en/profile/:userId",
                            element: a.jsx(Jo, {})
                        }), a.jsx(fe, {
                            path: "/en/market",
                            element: a.jsx(Zo, {})
                        }), a.jsx(fe, {
                            path: "/en/builds",
                            element: a.jsx(Xo, {})
                        }), a.jsx(fe, {
                            path: "/en/loadout",
                            element: a.jsx(er, {})
                        }), a.jsx(fe, {
                            path: "/it",
                            element: a.jsx(So, {})
                        }), a.jsx(fe, {
                            path: "/it/timer",
                            element: a.jsx(jo, {})
                        }), a.jsx(fe, {
                            path: "/it/mappe",
                            element: a.jsx(Bo, {})
                        }), a.jsx(fe, {
                            path: "/it/mappe/:mapId",
                            element: a.jsx(Ro, {})
                        }), a.jsx(fe, {
                            path: "/it/officina",
                            element: a.jsx(Eo, {})
                        }), a.jsx(fe, {
                            path: "/it/raider",
                            element: a.jsx(Lo, {})
                        }), a.jsx(fe, {
                            path: "/it/rifugio",
                            element: a.jsx(Io, {})
                        }), a.jsx(fe, {
                            path: "/it/albero-abilita",
                            element: a.jsx(No, {})
                        }), a.jsx(fe, {
                            path: "/it/missioni",
                            element: a.jsx(To, {})
                        }), a.jsx(fe, {
                            path: "/it/progetti",
                            element: a.jsx(Ao, {})
                        }), a.jsx(fe, {
                            path: "/it/oggetti",
                            element: a.jsx(Co, {})
                        }), a.jsx(fe, {
                            path: "/it/blueprint",
                            element: a.jsx(zo, {})
                        }), a.jsx(fe, {
                            path: "/it/oggetti-mancanti",
                            element: a.jsx(Po, {})
                        }), a.jsx(fe, {
                            path: "/it/prove",
                            element: a.jsx(Do, {})
                        }), a.jsx(fe, {
                            path: "/it/chi-siamo",
                            element: a.jsx(tr, {})
                        }), a.jsx(fe, {
                            path: "/it/for-sale",
                            element: a.jsx(ir, {})
                        }), a.jsx(fe, {
                            path: "/it/supporto",
                            element: a.jsx(Mo, {})
                        }), a.jsx(fe, {
                            path: "/it/privacy",
                            element: a.jsx($o, {})
                        }), a.jsx(fe, {
                            path: "/it/termini",
                            element: a.jsx(Qo, {})
                        }), a.jsx(fe, {
                            path: "/it/cookie",
                            element: a.jsx(Ko, {})
                        }), a.jsx(fe, {
                            path: "/it/impostazioni",
                            element: a.jsx(Yo, {})
                        }), a.jsx(fe, {
                            path: "/it/profilo/:userId",
                            element: a.jsx(Jo, {})
                        }), a.jsx(fe, {
                            path: "/it/mercato",
                            element: a.jsx(Zo, {})
                        }), a.jsx(fe, {
                            path: "/it/build",
                            element: a.jsx(Xo, {})
                        }), a.jsx(fe, {
                            path: "/it/equipaggiamento",
                            element: a.jsx(er, {})
                        }), a.jsx(fe, {
                            path: "/en/admin",
                            element: a.jsx(Oo, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/maps",
                            element: a.jsx(qo, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/timers",
                            element: a.jsx(Fo, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/quests",
                            element: a.jsx(Uo, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/items",
                            element: a.jsx(Go, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/settings",
                            element: a.jsx(Ho, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/blueprints",
                            element: a.jsx(Vo, {})
                        }), a.jsx(fe, {
                            path: "/en/admin/users",
                            element: a.jsx(Wo, {})
                        }), a.jsx(fe, {
                            path: "/it/admin",
                            element: a.jsx(Oo, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/maps",
                            element: a.jsx(qo, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/timers",
                            element: a.jsx(Fo, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/quests",
                            element: a.jsx(Uo, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/items",
                            element: a.jsx(Go, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/settings",
                            element: a.jsx(Ho, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/blueprints",
                            element: a.jsx(Vo, {})
                        }), a.jsx(fe, {
                            path: "/it/admin/users",
                            element: a.jsx(Wo, {})
                        }), a.jsx(fe, {
                            path: "/admin",
                            element: a.jsx(Oo, {})
                        }), a.jsx(fe, {
                            path: "/admin/maps",
                            element: a.jsx(qo, {})
                        }), a.jsx(fe, {
                            path: "/admin/timers",
                            element: a.jsx(Fo, {})
                        }), a.jsx(fe, {
                            path: "/admin/quests",
                            element: a.jsx(Uo, {})
                        }), a.jsx(fe, {
                            path: "/admin/items",
                            element: a.jsx(Go, {})
                        }), a.jsx(fe, {
                            path: "/admin/settings",
                            element: a.jsx(Ho, {})
                        }), a.jsx(fe, {
                            path: "/admin/blueprints",
                            element: a.jsx(Vo, {})
                        }), a.jsx(fe, {
                            path: "/admin/users",
                            element: a.jsx(Wo, {})
                        }), a.jsx(fe, {
                            path: "/undefined",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/crafting",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/items",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/timers",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/maps",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/interactive-maps",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/quests",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/projects",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/blueprints",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/hideout",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/shopping-list",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/missing-items",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/en/shopping-list",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/it/lista-spesa",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/skill-tree",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/trials",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/support",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "/loadout",
                            element: a.jsx(nr, {})
                        }), a.jsx(fe, {
                            path: "*",
                            element: a.jsx(nr, {})
                        })]
                    })
                })
            })]
        }), !t && !o && a.jsx(bo, {}), a.jsx(ve, {
            position: "bottom-center",
            theme: "dark",
            toastOptions: {
                duration: 8e3,
                style: {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))"
                },
                classNames: {
                    warning: "bg-amber-950/90 border-amber-800/50 text-amber-100",
                    title: "font-semibold",
                    description: "text-beige"
                }
            }
        })]
    })
}
function cr() {
    return a.jsx(_t, {
        children: a.jsx(kt, {
            children: a.jsx(At, {
                children: a.jsx(Ft, {
                    children: a.jsx(Xe, {
                        children: a.jsx(Nt, {
                            children: a.jsx(Bt, {
                                children: a.jsxs(rr, {
                                    children: [a.jsxs(he, {
                                        future: {
                                            v7_startTransition: !0,
                                            v7_relativeSplatPath: !0
                                        },
                                        children: [a.jsx(lr, {}), a.jsx(ti, {}), a.jsx(ui, {})]
                                    }), a.jsx(gi, {}), a.jsx(pi, {})]
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
_e.createRoot(document.getElementById("root")).render(a.jsx(we.StrictMode, {
    children: a.jsx(cr, {})
}));
export {ma as $, ft as A, ei as B, bt as C, oi as D, ht as E, Ut as F, Et as G, Ui as H, Xa as I, ct as J, dt as K, Jt as L, ut as M, Ri as N, pt as O, ji as P, Fi as Q, qi as R, ii as S, xo as T, mt as U, Sa as V, ro as W, eo as X, ga as Y, ya as Z, Je as _, Za as a, ha as a0, ba as a1, sa as a2, _a as a3, no as a4, lo as a5, na as a6, fa as a7, wa as a8, pa as a9, lt as aa, vt as ab, Va as ac, ri as b, Zt as c, ni as d, si as e, di as f, $t as g, wt as h, ci as i, yo as j, ot as k, li as l, Kt as m, $a as n, Fa as o, rt as p, _i as q, St as r, ko as s, Ka as t, zt as u, et as v, Mt as w, Ki as x, gt as y, Qi as z};

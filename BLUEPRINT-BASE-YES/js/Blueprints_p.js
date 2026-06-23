import {h as e, s as t, t as s, B as l, a as r, n as i, D as a, o as n, b as d, d as o, e as c, f as u, k as h, _ as p} from "./index-DDJvTLFE.js";
import {u as g, r as x, j as m, bg as b, bf as f, P as y} from "./vendor-IfRri_3N.js";
import {C as j, c as v} from "./card-ay00x62V.js";
import {I as w} from "./input-BeVyshQa.js";
import {S as N, a as k, b as S, c as C, d as T} from "./select-CwL14Vcc.js";
import {N as W} from "./neon-border-6sO47D8Q.js";
import {e as R, f as E} from "./firebase-CTomuqQ1.js";
import {b as A} from "./Blueprints-BaOEbT2m.js";
import {m as H} from "./bilingualSearch-pORILSNQ.js";
import "./maps-BEXJEZTU.js";
function L(e) {
    const t = {};
    for (const [s,l] of Object.entries(e))
        "number" == typeof l ? t[s] = {
            learned: l >= 1,
            duplicates: Math.max(0, l - 1)
        } : "object" == typeof l && null !== l && "learned"in l && (t[s] = l);
    return t
}
const D = ["All", "Weapon", "Mod", "Augment", "Quick Use", "Grenade", "Mine", "Material"]
  , O = {
    Legendary: 0,
    Epic: 1,
    Rare: 2,
    Uncommon: 3,
    Common: 4
};
function $() {
    const {user: $, loading: P} = e()
      , {t: z, i18n: G} = g()
      , [M,q] = x.useState({})
      , [I,_] = x.useState(A)
      , [B,J] = x.useState("")
      , [X,Y] = x.useState("All")
      , [F,V] = x.useState("ingame")
      , [U,Q] = x.useState("all")
      , [K,Z] = x.useState(!0)
      , [ee,te] = x.useState(!1)
      , [se,le] = x.useState(null)
      , re = x.useRef(!1)
      , ie = x.useRef(null)
      , ae = x.useRef(null)
      , ne = x.useRef(!1);
    x.useEffect( () => {
        (async () => {
            try {
                const e = R(h, "game-data", "blueprints-list")
                  , t = await E(e);
                t.exists() && t.data().blueprints && _(t.data().blueprints)
            } catch (e) {}
        }
        )()
    }
    , []),
    x.useEffect( () => {
        P || (async () => {
            if (re.current = !1,
            Z(!0),
            $)
                try {
                    const e = R(h, "blueprints", $.uid)
                      , t = await E(e);
                    if (t.exists()) {
                        const e = L(t.data().progress || {});
                        q(e),
                        localStorage.setItem("arc-raiders-blueprints", JSON.stringify(e))
                    } else {
                        const e = localStorage.getItem("arc-raiders-blueprints");
                        if (e) {
                            const t = L(JSON.parse(e));
                            q(t)
                        } else
                            q({})
                    }
                } catch (e) {
                    const t = localStorage.getItem("arc-raiders-blueprints");
                    if (t) {
                        const e = L(JSON.parse(t));
                        q(e)
                    }
                }
            else {
                const e = localStorage.getItem("arc-raiders-blueprints");
                if (e) {
                    const t = L(JSON.parse(e));
                    q(t)
                }
            }
            Z(!1),
            re.current = !0
        }
        )()
    }
    , [$, P]),
    x.useEffect( () => {
        re.current && t("arc-raiders-blueprints", M, $, "blueprints", {
            progress: M
        })
    }
    , [M, $]);
    const de = (e, t) => {
        t.preventDefault(),
        t.stopPropagation(),
        le(e)
    }
      , oe = () => {
        ae.current && (clearTimeout(ae.current),
        ae.current = null)
    }
      , ce = () => {
        ae.current && (clearTimeout(ae.current),
        ae.current = null)
    }
      , ue = I.filter(e => {
        if (!H(e.name, B, G.language))
            return !1;
        if ("All" !== X && e.category !== X)
            return !1;
        if ("all" !== U) {
            const t = M[e.id]
              , s = (null == t ? void 0 : t.learned) || !1
              , l = ((null == t ? void 0 : t.duplicates) || 0) > 0;
            if ("learned" === U && !s)
                return !1;
            if ("notLearned" === U && s)
                return !1;
            if ("owned" === U && !l)
                return !1
        }
        return !0
    }
    ).sort( (e, t) => {
        if ("name" === F) {
            const l = s(e.name, G.language)
              , r = s(t.name, G.language);
            return l.localeCompare(r, G.language)
        }
        return "rarity" === F ? O[e.rarity] - O[t.rarity] : 0
    }
    )
      , he = I.filter(e => {
        var t;
        return null == (t = M[e.id]) ? void 0 : t.learned
    }
    ).length
      , pe = I.filter(e => {
        const t = M[e.id];
        return ((null == t ? void 0 : t.duplicates) || 0) > 0
    }
    ).length;
    I.reduce( (e, t) => {
        const s = M[t.id];
        return e + ((null == s ? void 0 : s.duplicates) || 0)
    }
    , 0);
    const ge = {
        total: I.length,
        learned: he,
        notLearned: I.length - he,
        owned: pe,
        progress: Math.round(he / I.length * 100)
    };
    return K ? m.jsxs("div", {
        className: "page-main blueprints-page",
        children: [m.jsx("div", {
            className: "blueprints-background"
        }), m.jsx("div", {
            className: "page-container gap-3",
            children: m.jsx("div", {
                className: "flex items-center justify-center min-h-[60vh]",
                children: m.jsx("p", {
                    className: "text-beige",
                    children: z("blueprints.loading")
                })
            })
        })]
    }) : m.jsxs("div", {
        className: "page-main blueprints-page",
        children: [m.jsx("div", {
            className: "blueprints-background"
        }), m.jsxs("div", {
            className: "page-container gap-3",
            children: [m.jsxs("div", {
                className: "blueprints-filters",
                children: [m.jsx(w, {
                    type: "text",
                    placeholder: z("blueprints.search"),
                    value: B,
                    onChange: e => J(e.target.value),
                    className: "blueprints-filter-search bg-blue-dark border-ui-border"
                }), m.jsxs("div", {
                    className: "blueprints-filter-row",
                    children: [m.jsxs(N, {
                        value: X,
                        onValueChange: Y,
                        children: [m.jsx(k, {
                            className: "bg-blue-dark border-ui-border hover:bg-blue-light",
                            children: m.jsx(S, {
                                placeholder: z("blueprints.filters.allCategories")
                            })
                        }), m.jsx(C, {
                            className: "bg-blue-dark border-ui-border",
                            children: D.map(e => m.jsx(T, {
                                value: e,
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: "All" === e ? z("blueprints.filters.allCategories") : e
                            }, e))
                        })]
                    }), m.jsxs(N, {
                        value: F,
                        onValueChange: e => V(e),
                        children: [m.jsx(k, {
                            className: "bg-blue-dark border-ui-border hover:bg-blue-light",
                            children: m.jsxs(S, {
                                children: ["ingame" === F && z("blueprints.sort.ingame"), "name" === F && z("blueprints.sort.name"), "rarity" === F && z("blueprints.sort.rarity")]
                            })
                        }), m.jsxs(C, {
                            className: "bg-blue-dark border-ui-border",
                            children: [m.jsx(T, {
                                value: "ingame",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: z("blueprints.sort.ingame")
                            }), m.jsx(T, {
                                value: "name",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: z("blueprints.sort.name")
                            }), m.jsx(T, {
                                value: "rarity",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: z("blueprints.sort.rarity")
                            })]
                        })]
                    })]
                }), m.jsxs("div", {
                    className: "blueprints-filter-row",
                    children: [m.jsxs(N, {
                        value: U,
                        onValueChange: e => Q(e),
                        children: [m.jsx(k, {
                            className: "bg-blue-dark border-ui-border hover:bg-blue-light",
                            children: m.jsxs(S, {
                                children: ["all" === U && `${z("blueprints.filters.all")} (${ge.total})`, "learned" === U && `${z("blueprints.filters.learned")} (${ge.learned})`, "notLearned" === U && `${z("blueprints.filters.notLearned")} (${ge.notLearned})`, "owned" === U && `${z("blueprints.filters.owned")} (${ge.owned})`]
                            })
                        }), m.jsxs(C, {
                            className: "bg-blue-dark border-ui-border",
                            children: [m.jsxs(T, {
                                value: "all",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: [z("blueprints.filters.all"), " (", ge.total, ")"]
                            }), m.jsxs(T, {
                                value: "learned",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: [z("blueprints.filters.learned"), " (", ge.learned, ")"]
                            }), m.jsxs(T, {
                                value: "notLearned",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: [z("blueprints.filters.notLearned"), " (", ge.notLearned, ")"]
                            }), m.jsxs(T, {
                                value: "owned",
                                className: "hover:bg-blue-light focus:bg-blue-light",
                                children: [z("blueprints.filters.owned"), " (", ge.owned, ")"]
                            })]
                        })]
                    }), m.jsxs(l, {
                        onClick: async () => {
                            if (ie.current)
                                try {
                                    const e = (await p(async () => {
                                        const {default: e} = await import("./html2canvas-DVPEA5ss.js");
                                        return {
                                            default: e
                                        }
                                    }
                                    , [])).default
                                      , t = ie.current
                                      , s = t.querySelector(".blueprints-grid")
                                      , l = {
                                        overflow: t.style.overflow,
                                        overflowX: t.style.overflowX,
                                        overflowY: t.style.overflowY,
                                        width: t.style.width,
                                        maxWidth: t.style.maxWidth,
                                        height: t.style.height,
                                        maxHeight: t.style.maxHeight,
                                        minHeight: t.style.minHeight,
                                        flex: t.style.flex,
                                        position: t.style.position,
                                        gridColumns: (null == s ? void 0 : s.style.gridTemplateColumns) || "",
                                        gridGap: (null == s ? void 0 : s.style.gap) || "",
                                        gridRowGap: (null == s ? void 0 : s.style.rowGap) || ""
                                    };
                                    t.style.overflow = "visible",
                                    t.style.overflowX = "visible",
                                    t.style.overflowY = "visible",
                                    t.style.maxWidth = "none",
                                    t.style.height = "auto",
                                    t.style.maxHeight = "none",
                                    t.style.minHeight = "auto",
                                    t.style.flex = "none",
                                    t.style.position = "relative";
                                    const r = 872
                                      , i = 28;
                                    t.style.width = `${r + i}px`;
                                    const a = (null == s ? void 0 : s.style.display) || ""
                                      , n = (null == s ? void 0 : s.style.gridAutoFlow) || "";
                                    s && (s.style.display = "grid",
                                    s.style.gridTemplateColumns = "repeat(10, 80px)",
                                    s.style.gridAutoFlow = "row",
                                    s.style.gap = "8px",
                                    s.style.rowGap = "8px");
                                    const d = t.querySelectorAll(".blueprint-card")
                                      , o = t.querySelectorAll(".neon-border-wrapper")
                                      , c = []
                                      , u = [];
                                    d.forEach( (e, t) => {
                                        c[t] = {
                                            width: e.style.width,
                                            height: e.style.height,
                                            minWidth: e.style.minWidth,
                                            maxWidth: e.style.maxWidth,
                                            aspectRatio: e.style.aspectRatio,
                                            flexShrink: e.style.flexShrink
                                        },
                                        e.style.width = "80px",
                                        e.style.height = "80px",
                                        e.style.minWidth = "80px",
                                        e.style.maxWidth = "80px",
                                        e.style.aspectRatio = "1",
                                        e.style.flexShrink = "0"
                                    }
                                    ),
                                    o.forEach( (e, t) => {
                                        u[t] = {
                                            width: e.style.width,
                                            height: e.style.height,
                                            minWidth: e.style.minWidth,
                                            maxWidth: e.style.maxWidth,
                                            aspectRatio: e.style.aspectRatio,
                                            flexShrink: e.style.flexShrink
                                        },
                                        e.style.width = "80px",
                                        e.style.height = "80px",
                                        e.style.minWidth = "80px",
                                        e.style.maxWidth = "80px",
                                        e.style.aspectRatio = "1",
                                        e.style.flexShrink = "0"
                                    }
                                    );
                                    const h = t.querySelectorAll(".blueprint-duplicate")
                                      , g = [];
                                    h.forEach( (e, t) => {
                                        g[t] = {
                                            cssText: e.style.cssText
                                        },
                                        e.style.cssText = "position: absolute; top: 1px; left: 1px; width: 20px; height: 20px; z-index: 10; background-color: #3b82f6; border-radius: 5.5px 0 5.5px 0;"
                                    }
                                    );
                                    const x = t.querySelectorAll(".blueprint-duplicate span")
                                      , m = [];
                                    x.forEach( (e, t) => {
                                        m[t] = {
                                            cssText: e.style.cssText
                                        },
                                        e.style.cssText = "position: absolute; top: -4px; left: 0; right: 0; font-size: 10px; font-weight: bold; color: white; text-align: center;"
                                    }
                                    );
                                    const b = t.querySelectorAll(".blueprint-checkmark")
                                      , f = [];
                                    b.forEach( (e, t) => {
                                        f[t] = {
                                            cssText: e.style.cssText
                                        },
                                        e.style.cssText = "position: absolute; top: 5px; right: 5px; z-index: 10;"
                                    }
                                    );
                                    const y = ue.length
                                      , j = 10
                                      , v = 5
                                      , w = j - (y % j || j)
                                      , N = w < v ? w + v : v
                                      , k = [];
                                    if (s)
                                        for (let p = 0; p < N; p++) {
                                            const e = document.createElement("div");
                                            e.style.cssText = "width: 80px; height: 80px;",
                                            s.appendChild(e),
                                            k.push(e)
                                        }
                                    const S = t.querySelectorAll("img");
                                    await Promise.all(Array.from(S).map(e => e.complete ? Promise.resolve() : new Promise(t => {
                                        e.onload = t,
                                        e.onerror = t
                                    }
                                    ))),
                                    await new Promise(e => setTimeout(e, 100));
                                    const C = document.createElement("img");
                                    C.src = "/trademark.webp",
                                    C.style.cssText = "\n        position: absolute;\n        bottom: 12px;\n        right: 14px;\n        height: 80px;\n        width: auto;\n        opacity: 1;\n        z-index: 1;\n        pointer-events: none;\n      ",
                                    t.appendChild(C),
                                    await new Promise(e => {
                                        C.complete ? e() : (C.onload = () => e(),
                                        C.onerror = () => e())
                                    }
                                    );
                                    const T = t.scrollWidth
                                      , W = t.scrollHeight
                                      , R = await e(t, {
                                        backgroundColor: "#1a1a1a",
                                        scale: 2,
                                        width: T,
                                        height: W,
                                        windowWidth: T,
                                        windowHeight: W,
                                        useCORS: !0
                                    });
                                    t.removeChild(C),
                                    k.forEach(e => e.remove()),
                                    t.style.overflow = l.overflow,
                                    t.style.overflowX = l.overflowX,
                                    t.style.overflowY = l.overflowY,
                                    t.style.width = l.width,
                                    t.style.maxWidth = l.maxWidth,
                                    t.style.height = l.height,
                                    t.style.maxHeight = l.maxHeight,
                                    t.style.minHeight = l.minHeight,
                                    t.style.flex = l.flex,
                                    t.style.position = l.position,
                                    s && (s.style.display = a,
                                    s.style.gridTemplateColumns = l.gridColumns,
                                    s.style.gridAutoFlow = n,
                                    s.style.gap = l.gridGap,
                                    s.style.rowGap = l.gridRowGap),
                                    d.forEach( (e, t) => {
                                        e.style.width = c[t].width,
                                        e.style.height = c[t].height,
                                        e.style.minWidth = c[t].minWidth,
                                        e.style.maxWidth = c[t].maxWidth,
                                        e.style.aspectRatio = c[t].aspectRatio,
                                        e.style.flexShrink = c[t].flexShrink
                                    }
                                    ),
                                    o.forEach( (e, t) => {
                                        e.style.width = u[t].width,
                                        e.style.height = u[t].height,
                                        e.style.minWidth = u[t].minWidth,
                                        e.style.maxWidth = u[t].maxWidth,
                                        e.style.aspectRatio = u[t].aspectRatio,
                                        e.style.flexShrink = u[t].flexShrink
                                    }
                                    ),
                                    h.forEach( (e, t) => {
                                        e.style.cssText = g[t].cssText
                                    }
                                    ),
                                    x.forEach( (e, t) => {
                                        e.style.cssText = m[t].cssText
                                    }
                                    ),
                                    b.forEach( (e, t) => {
                                        e.style.cssText = f[t].cssText
                                    }
                                    );
                                    const E = document.createElement("a");
                                    E.download = "arc-raiders-blueprints.png",
                                    E.href = R.toDataURL(),
                                    E.click()
                                } catch (e) {}
                        }
                        ,
                        variant: "outline",
                        className: "flex items-center gap-2 h-9 bg-blue-dark border-ui-border hover:bg-blue-light",
                        children: [m.jsx(b, {
                            className: "h-4 w-4"
                        }), z("blueprints.export")]
                    })]
                })]
            }), m.jsx("div", {
                ref: ie,
                className: "blueprints-grid-container rounded-xl bg-blue-dark/90",
                children: m.jsx("div", {
                    className: "blueprints-grid",
                    children: ue.map(e => {
                        const t = M[e.id] || {
                            learned: !1,
                            duplicates: 0
                        }
                          , l = t.learned
                          , a = t.duplicates;
                        return m.jsx("div", {
                            className: "blueprint-card cursor-pointer group select-none",
                            title: s(e.name, G.language),
                            children: m.jsx(W, {
                                backgroundColor: "#1a1a1a",
                                borderRadius: .5,
                                fitContent: !0,
                                onClick: t => {
                                    if (ne.current)
                                        return t.preventDefault(),
                                        void (ne.current = !1);
                                    de(e, t)
                                }
                                ,
                                onContextMenu: t => ( (e, t) => {
                                    t.preventDefault();
                                    const s = M[e] || {
                                        learned: !1,
                                        duplicates: 0
                                    };
                                    s.learned && s.duplicates < 99 && q({
                                        ...M,
                                        [e]: {
                                            ...s,
                                            duplicates: s.duplicates + 1
                                        }
                                    })
                                }
                                )(e.id, t),
                                onTouchStart: () => {
                                    return t = e.id,
                                    ne.current = !1,
                                    void (ae.current = setTimeout( () => {
                                        ne.current = !0,
                                        (e => {
                                            const t = M[e] || {
                                                learned: !1,
                                                duplicates: 0
                                            };
                                            t.duplicates > 0 && q({
                                                ...M,
                                                [e]: {
                                                    ...t,
                                                    duplicates: t.duplicates - 1
                                                }
                                            })
                                        }
                                        )(t)
                                    }
                                    , 500));
                                    var t
                                }
                                ,
                                onTouchEnd: oe,
                                onTouchMove: ce,
                                overlay: m.jsxs(m.Fragment, {
                                    children: [l && m.jsx("div", {
                                        className: "blueprint-checkmark pointer-events-none",
                                        children: m.jsx("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "#fff",
                                            viewBox: "0 0 24 24",
                                            children: m.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 4,
                                                d: "M5 13l4 4L19 7"
                                            })
                                        })
                                    }), a > 0 && m.jsx("div", {
                                        className: "blueprint-duplicate pointer-events-none",
                                        children: m.jsx("span", {
                                            className: "text-[10px] font-bold text-white",
                                            children: a
                                        })
                                    })]
                                }),
                                children: m.jsx(r, {
                                    item: e,
                                    side: "right",
                                    align: "start",
                                    delayDuration: 300,
                                    children: m.jsx(i, {
                                        item: e,
                                        size: "lg",
                                        showNameBar: !0,
                                        displayName: s(e.name, G.language).replace(/\s*(blueprint|progetto)\s*/gi, "").trim(),
                                        disableHover: !0,
                                        onClick: t => {
                                            t.stopPropagation(),
                                            de(e, t)
                                        }
                                    })
                                })
                            })
                        }, e.id)
                    }
                    )
                })
            }), 0 === ue.length && m.jsx(j, {
                className: "border-ui-border",
                children: m.jsx(v, {
                    className: "p-12 text-center",
                    children: m.jsx("p", {
                        className: "text-lg text-beige",
                        children: z("blueprints.noResults")
                    })
                })
            }), m.jsx(a, {
                open: !!se,
                onOpenChange: e => !e && le(null),
                children: se && ( () => {
                    const e = se
                      , t = M[e.id] || {
                        learned: !1,
                        duplicates: 0
                    }
                      , l = n(e.rarity)
                      , r = s(e.name, G.language).replace(/\s*(blueprint|progetto)\s*/gi, "").trim();
                    return m.jsxs(d, {
                        maxWidth: "sm",
                        className: "!p-0",
                        children: [m.jsxs("div", {
                            className: "flex items-center gap-4 p-4 pb-3 border-b border-blue-dark/10",
                            children: [m.jsx("div", {
                                className: "shrink-0",
                                children: m.jsx(i, {
                                    item: e,
                                    size: "lg",
                                    showNameBar: !0,
                                    displayName: r,
                                    disableHover: !0
                                })
                            }), m.jsxs("div", {
                                className: "flex-1 min-w-0",
                                children: [m.jsx("h3", {
                                    className: "flex text-lg font-bold text-blue-dark uppercase tracking-wide leading-tight truncate",
                                    children: r
                                }), m.jsxs("div", {
                                    className: "flex items-center gap-1.5 mt-1.5",
                                    children: [m.jsx("span", {
                                        className: "px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white rounded-sm",
                                        style: {
                                            backgroundColor: l
                                        },
                                        children: z(`crafting.rarities.${e.rarity}`)
                                    }), m.jsx("span", {
                                        className: "px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-dark/60 bg-blue-dark/10 rounded-sm",
                                        children: e.category
                                    })]
                                })]
                            })]
                        }), (e.craftedAt || e.recipe && e.recipe.length > 0) && m.jsxs("div", {
                            className: "px-4 py-3 space-y-2 border-b border-blue-dark/10",
                            children: [e.craftedAt && m.jsxs("div", {
                                className: "flex items-center justify-between text-sm",
                                children: [m.jsx("span", {
                                    className: "text-blue-dark/50",
                                    children: z("blueprints.detail.craftedAt")
                                }), m.jsx("span", {
                                    className: "text-blue-dark font-medium",
                                    children: e.craftedAt
                                })]
                            }), e.recipe && e.recipe.length > 0 && m.jsxs("div", {
                                children: [m.jsx("span", {
                                    className: "text-sm text-blue-dark/50",
                                    children: z("blueprints.detail.recipe")
                                }), m.jsx("div", {
                                    className: "mt-1 space-y-1",
                                    children: e.recipe.map( (e, t) => m.jsx("div", {
                                        className: "text-sm text-blue-dark bg-blue-dark/5 rounded px-2.5 py-1.5",
                                        children: e
                                    }, t))
                                })]
                            })]
                        }), m.jsxs("div", {
                            className: "flex items-center justify-between px-4 py-3 border-b border-blue-dark/10",
                            children: [m.jsx("span", {
                                className: "text-sm text-blue-dark/70 uppercase tracking-wide font-medium",
                                children: z("blueprints.detail.learned")
                            }), m.jsx("button", {
                                onClick: () => {
                                    const s = !t.learned;
                                    if (s || 0 !== t.duplicates)
                                        q({
                                            ...M,
                                            [e.id]: {
                                                ...t,
                                                learned: s
                                            }
                                        });
                                    else {
                                        const t = {
                                            ...M
                                        };
                                        delete t[e.id],
                                        q(t)
                                    }
                                }
                                ,
                                className: "w-12 h-7 rounded-full transition-colors relative " + (t.learned ? "bg-gold-accent" : "bg-blue-dark/20"),
                                children: m.jsx("div", {
                                    className: "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform " + (t.learned ? "translate-x-6" : "translate-x-1")
                                })
                            })]
                        }), m.jsxs("div", {
                            className: "flex items-center justify-between px-4 py-3",
                            children: [m.jsx("span", {
                                className: "text-sm text-blue-dark/70 uppercase tracking-wide font-medium",
                                children: z("blueprints.detail.duplicates")
                            }), m.jsxs("div", {
                                className: "flex items-center gap-3",
                                children: [m.jsx("button", {
                                    onClick: () => {
                                        if (t.duplicates > 0) {
                                            const s = t.duplicates - 1;
                                            if (t.learned || 0 !== s)
                                                q({
                                                    ...M,
                                                    [e.id]: {
                                                        ...t,
                                                        duplicates: s
                                                    }
                                                });
                                            else {
                                                const t = {
                                                    ...M
                                                };
                                                delete t[e.id],
                                                q(t)
                                            }
                                        }
                                    }
                                    ,
                                    disabled: 0 === t.duplicates,
                                    className: "w-9 h-9 rounded-lg bg-blue-dark/10 flex items-center justify-center text-blue-dark hover:bg-blue-dark/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                                    children: m.jsx(f, {
                                        size: 18
                                    })
                                }), m.jsx("span", {
                                    className: "text-xl font-bold text-blue-dark min-w-[2ch] text-center",
                                    children: t.duplicates
                                }), m.jsx("button", {
                                    onClick: () => {
                                        t.duplicates < 99 && q({
                                            ...M,
                                            [e.id]: {
                                                ...t,
                                                duplicates: t.duplicates + 1
                                            }
                                        })
                                    }
                                    ,
                                    disabled: t.duplicates >= 99,
                                    className: "w-9 h-9 rounded-lg bg-gold-accent flex items-center justify-center text-blue-dark hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                                    children: m.jsx(y, {
                                        size: 18
                                    })
                                })]
                            })]
                        })]
                    })
                }
                )()
            }), m.jsx(a, {
                open: ee,
                onOpenChange: te,
                children: m.jsxs(d, {
                    className: "page-guide-dialog",
                    children: [m.jsx(o, {
                        children: m.jsx(c, {
                            children: z("blueprints.guide.title")
                        })
                    }), m.jsxs(u, {
                        className: "page-guide-body",
                        children: [m.jsxs("div", {
                            className: "page-guide-section",
                            children: [m.jsx("h2", {
                                children: z("blueprints.guide.trackingTitle")
                            }), m.jsx("p", {
                                children: z("blueprints.guide.trackingDesc")
                            })]
                        }), m.jsxs("div", {
                            className: "page-guide-section",
                            children: [m.jsx("h2", {
                                children: z("blueprints.guide.statusTitle")
                            }), m.jsx("p", {
                                children: z("blueprints.guide.statusDesc")
                            })]
                        }), m.jsxs("div", {
                            className: "page-guide-section",
                            children: [m.jsx("h2", {
                                children: z("blueprints.guide.filtersTitle")
                            }), m.jsx("p", {
                                children: z("blueprints.guide.filtersDesc")
                            })]
                        })]
                    })]
                })
            })]
        })]
    })
}
export {$ as Blueprints};

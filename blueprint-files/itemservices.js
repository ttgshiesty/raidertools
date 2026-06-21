import {e as t, f as n, s as a} from "./firebase-CTomuqQ1.js";
import {k as e} from "./index-DDJvTLFE.js";
const r = "game-data"
  , i = "items";
let o = null
  , s = 0;
function c(t) {
    if (null == t)
        return t;
    if (Array.isArray(t))
        return t.map(t => c(t)).filter(t => void 0 !== t);
    if ("object" == typeof t) {
        const n = {};
        for (const a in t) {
            const e = t[a];
            void 0 !== e && (n[a] = c(e))
        }
        return n
    }
    return t
}
async function u() {
    try {
        const t = await fetch("/unified-items.json");
        if (!t.ok)
            throw new Error("Failed to load unified-items.json");
        return (await t.json()).items
    } catch (t) {
        return []
    }
}
async function f(t=!1) {
    if (!t && o && Date.now() - s < 3e5)
        return o;
    const n = await u();
    return o = n,
    s = Date.now(),
    n
}
async function m() {
    try {
        const a = t(e, r, i)
          , o = await n(a);
        return o.exists() ? o.data().items || [] : await u()
    } catch (a) {
        return await u()
    }
}
async function d(n, u) {
    try {
        const f = t(e, r, i)
          , m = {
            items: n.map(t => c(t)),
            updatedAt: (new Date).toISOString(),
            updatedBy: u
        };
        return await a(f, m),
        o = n,
        s = Date.now(),
        !0
    } catch (f) {
        return !1
    }
}
function w(t) {
    const n = new Set;
    return t.forEach(t => {
        t.item_type && n.add(t.item_type)
    }
    ),
    Array.from(n).sort()
}
function y(t) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}
export {m as a, y as b, w as g, f as l, d as s};

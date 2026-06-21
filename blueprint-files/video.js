import {r as e, j as t} from "./vendor-IfRri_3N.js";
import {u as r} from "./index-DDJvTLFE.js";
function o({videoSrc: o, posterSrc: n, blur: s=4, opacity: a=1, posterScale: i=1}) {
    const c = e.useRef(null)
      , [l,d] = e.useState(!1)
      , [u,f] = e.useState(!1)
      , {preferences: p} = r()
      , v = !1 !== p.videoBackgroundEnabled;
    return e.useEffect( () => {
        const e = window.matchMedia("(prefers-reduced-motion: reduce)");
        f(e.matches);
        const t = e => {
            f(e.matches)
        }
        ;
        return e.addEventListener("change", t),
        () => e.removeEventListener("change", t)
    }
    , []),
    e.useEffect( () => {
        const e = c.current;
        if (!e || u || !v)
            return;
        const t = () => d(!0)
          , r = () => d(!1);
        return e.addEventListener("playing", t),
        e.addEventListener("error", r),
        e.play().catch( () => {}
        ),
        () => {
            e.removeEventListener("playing", t),
            e.removeEventListener("error", r)
        }
    }
    , [u, v]),
    u || !v ? t.jsx("div", {
        className: "fixed top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden",
        style: {
            zIndex: -1
        },
        children: t.jsx("div", {
            className: "absolute inset-0",
            style: {
                backgroundImage: n ? `url(${n})` : void 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(${s}px)`,
                opacity: a,
                transform: `scale(${i})`
            }
        })
    }) : t.jsxs("div", {
        className: "fixed top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden",
        style: {
            zIndex: -1
        },
        children: [n && t.jsx("div", {
            className: "absolute inset-0",
            style: {
                backgroundImage: `url(${n})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(${s}px)`,
                opacity: l ? 0 : a,
                transition: "opacity 0.5s ease-in-out",
                transform: `scale(${i})`
            }
        }), t.jsx("video", {
            ref: c,
            className: "absolute inset-0 w-full h-full object-cover",
            style: {
                filter: `blur(${s}px)`,
                opacity: l ? a : 0,
                transition: "opacity 0.5s ease-in-out",
                transform: "scale(0.99)"
            },
            src: o,
            autoPlay: !0,
            loop: !0,
            muted: !0,
            playsInline: !0,
            preload: "auto"
        })]
    })
}
export {o as V};

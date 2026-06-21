import { r as a, j as e } from "./vendor-IfRri_3N.js";
import { c as s } from "./index-DDJvTLFE.js";
const r = a.forwardRef(({ className: a, ...r }, d) =>
  e.jsx("div", {
    ref: d,
    className: s("bg-blue-dark text-card-foreground rounded-2xl", a),
    ...r,
  }),
);
r.displayName = "Card";
const d = a.forwardRef(({ className: a, ...r }, d) =>
  e.jsx("div", {
    ref: d,
    className: s("flex flex-col p-3", a),
    ...r,
  }),
);
d.displayName = "CardHeader";
const o = a.forwardRef(({ className: a, ...r }, d) =>
  e.jsx("div", {
    ref: d,
    className: s("font-semibold leading-none tracking-tight", a),
    ...r,
  }),
);
o.displayName = "CardTitle";
const l = a.forwardRef(({ className: a, ...r }, d) =>
  e.jsx("div", {
    ref: d,
    className: s("text-beige", a),
    ...r,
  }),
);
l.displayName = "CardDescription";
const f = a.forwardRef(({ className: a, ...r }, d) =>
  e.jsx("div", {
    ref: d,
    className: s("p-3 pt-0", a),
    ...r,
  }),
);
((f.displayName = "CardContent"),
  (a.forwardRef(({ className: a, ...r }, d) =>
    e.jsx("div", {
      ref: d,
      className: s("flex items-center p-6 pt-0", a),
      ...r,
    }),
  ).displayName = "CardFooter"));
export { r as C, d as a, o as b, f as c, l as d };

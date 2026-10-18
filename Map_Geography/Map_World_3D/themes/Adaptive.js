"use strict";
(self.webpackChunk_am5 = self.webpackChunk_am5 || []).push([
    [7118],
    {
        592: function (t, e, n) {
            n.r(e),
                n.d(e, {
                    am5themes_Adaptive: function () {
                        return p;
                    },
                });
            var r = n(2570),
                o = n(5945),
                u = n(1988),
                l = n(4636);
            function a(t) {
                return (t %= 360) < 0 ? t + 360 : t;
            }
            function i(t, e, n) {
                let r = e - t;
                return r > 180 ? (r -= 360) : r < -180 && (r += 360), a(t + r * n);
            }
            function s(t, e, n) {
                return t + (e - t) * n;
            }
            function c(t, e, n) {
                return t < e ? e : t > n ? n : t;
            }
            function y(t, e = {}) {
                const n = !0 === e.dark;
                let y = e.count && e.count > 0 ? Math.round(e.count) : 10;
                y < 1 && (y = 1);
                const p = null != e.baseColor;
                let f = p ? r.Q1.fromAny(e.baseColor) : r.Q1.fromHex(4951609);
                const m = (0, u.Op)(f),
                    d = m.h,
                    B = n ? (0, u.y3)(0.16, 0.02, d) : r.Q1.fromHex(16777215),
                    h = !0 === e.keepContrast ? 3 : Number(e.keepContrast),
                    v = (t) => (h > 1 ? (0, u.B$)(t, B, h) : t);
                f = v(f);
                const k = (0, u.Op)(f),
                    Q = c(k.l, 0.55, 0.78),
                    b = c(k.c, 0.09, 0.17);
                let g = [f];
                const x = null != e.baseColor2 ? e.baseColor2 : p ? null : 16768256;
                if (null != x) {
                    y < 2 && (y = 2);
                    const t = v(r.Q1.fromAny(x)),
                        e = (0, u.Op)(t);
                    g.length = 0;
                    for (let n = 0; n < y; n++) {
                        const r = 1 === y ? 0 : n / (y - 1);
                        0 === n
                            ? g.push(f)
                            : n === y - 1
                              ? g.push(t)
                              : g.push(v((0, u.y3)(s(k.l, e.l, r), s(k.c, e.c, r), i(k.h, e.h, r))));
                    }
                } else for (let t = 1; t < y; t++) g.push(v((0, u.y3)(Q, b, a(k.h + 137.5 * t))));
                e.interleave && (g = l.interleave(g));
                const C = o.S.new(t);
                return (
                    C.rule("ColorSet").setAll({ colors: g, reuse: !0 }),
                    n
                        ? C.rule("InterfaceColors").setAll(
                              (function (t, e) {
                                  const n = r.Q1.lighten,
                                      o = (0, u.y3)(0.26, 0.02, t);
                                  return {
                                      stroke: (0, u.y3)(0.18, 0.02, t),
                                      fill: o,
                                      primaryButton: e,
                                      primaryButtonHover: n(e, 0.12),
                                      primaryButtonDown: n(e, 0.2),
                                      primaryButtonActive: n(e, 0.2),
                                      primaryButtonDisabled: (0, u.y3)(0.4, 0.03, t),
                                      primaryButtonTextDisabled: (0, u.y3)(0.68, 0.02, t),
                                      primaryButtonText: r.Q1.fromHex(16777215),
                                      primaryButtonStroke: n(e, 0.1),
                                      secondaryButton: o,
                                      secondaryButtonHover: n(o, 0.08),
                                      secondaryButtonDown: n(o, 0.13),
                                      secondaryButtonActive: n(o, 0.18),
                                      secondaryButtonText: (0, u.y3)(0.85, 0.02, t),
                                      secondaryButtonStroke: n(o, -0.2),
                                      grid: (0, u.y3)(0.8, 0.015, t),
                                      background: (0, u.y3)(0.16, 0.02, t),
                                      alternativeBackground: (0, u.y3)(0.92, 0.02, t),
                                      text: (0, u.y3)(0.92, 0.015, t),
                                      alternativeText: (0, u.y3)(0.16, 0.02, t),
                                      disabled: (0, u.y3)(0.5, 0.02, t),
                                      positive: r.Q1.fromHex(6079086),
                                      negative: r.Q1.fromHex(14706012),
                                      warning: r.Q1.fromHex(15911244),
                                  };
                              })(d, f)
                          )
                        : C.rule("InterfaceColors").setAll({
                              primaryButton: f,
                              primaryButtonHover: r.Q1.lighten(f, 0.1),
                              primaryButtonDown: r.Q1.lighten(f, -0.1),
                              primaryButtonActive: r.Q1.lighten(f, -0.1),
                              primaryButtonStroke: r.Q1.lighten(f, -0.15),
                          }),
                    e.mapShade && C.rule("MapPolygon").setAll({ fill: (0, u.L1)(m, n) }),
                    C
                );
            }
            y.new = function (t, e = {}) {
                return y(t, e);
            };
            const p = y;
        },
    },
    function (t) {
        var e = t((t.s = 592)),
            n = window;
        for (var r in e) n[r] = e[r];
        e.__esModule && Object.defineProperty(n, "__esModule", { value: !0 });
    },
]);

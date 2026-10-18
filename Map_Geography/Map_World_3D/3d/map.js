"use strict";
(self.webpackChunk_am5 = self.webpackChunk_am5 || []).push([
    [6163],
    {
        1272: function (t, e, i) {
            var n = i(6929);
            function s(t, e, i) {
                var s, a, l, h;
                e = e || 1;
                for (var c = 0; c < t[0].length; c++) {
                    var u = t[0][c];
                    (!c || u[0] < s) && (s = u[0]),
                        (!c || u[1] < a) && (a = u[1]),
                        (!c || u[0] > l) && (l = u[0]),
                        (!c || u[1] > h) && (h = u[1]);
                }
                var d = l - s,
                    g = h - a,
                    p = Math.min(d, g),
                    f = p / 2;
                if (0 === p) {
                    var _ = [s, a];
                    return (_.distance = 0), _;
                }
                for (var m = new n(void 0, o), y = s; y < l; y += p)
                    for (var v = a; v < h; v += p) m.push(new r(y + f, v + f, f, t));
                var w = (function (t) {
                        for (var e = 0, i = 0, n = 0, s = t[0], o = 0, a = s.length, l = a - 1; o < a; l = o++) {
                            var h = s[o],
                                c = s[l],
                                u = h[0] * c[1] - c[0] * h[1];
                            (i += (h[0] + c[0]) * u), (n += (h[1] + c[1]) * u), (e += 3 * u);
                        }
                        return 0 === e ? new r(s[0][0], s[0][1], 0, t) : new r(i / e, n / e, 0, t);
                    })(t),
                    x = new r(s + d / 2, a + g / 2, 0, t);
                x.d > w.d && (w = x);
                for (var D = m.length; m.length; ) {
                    var M = m.pop();
                    M.d > w.d &&
                        ((w = M), i && console.log("found best %d after %d probes", Math.round(1e4 * M.d) / 1e4, D)),
                        M.max - w.d <= e ||
                            ((f = M.h / 2),
                            m.push(new r(M.x - f, M.y - f, f, t)),
                            m.push(new r(M.x + f, M.y - f, f, t)),
                            m.push(new r(M.x - f, M.y + f, f, t)),
                            m.push(new r(M.x + f, M.y + f, f, t)),
                            (D += 4));
                }
                i && (console.log("num probes: " + D), console.log("best distance: " + w.d));
                var P = [w.x, w.y];
                return (P.distance = w.d), P;
            }
            function o(t, e) {
                return e.max - t.max;
            }
            function r(t, e, i, n) {
                (this.x = t),
                    (this.y = e),
                    (this.h = i),
                    (this.d = (function (t, e, i) {
                        for (var n = !1, s = 1 / 0, o = 0; o < i.length; o++)
                            for (var r = i[o], l = 0, h = r.length, c = h - 1; l < h; c = l++) {
                                var u = r[l],
                                    d = r[c];
                                u[1] > e != d[1] > e &&
                                    t < ((d[0] - u[0]) * (e - u[1])) / (d[1] - u[1]) + u[0] &&
                                    (n = !n),
                                    (s = Math.min(s, a(t, e, u, d)));
                            }
                        return 0 === s ? 0 : (n ? 1 : -1) * Math.sqrt(s);
                    })(t, e, n)),
                    (this.max = this.d + this.h * Math.SQRT2);
            }
            function a(t, e, i, n) {
                var s = i[0],
                    o = i[1],
                    r = n[0] - s,
                    a = n[1] - o;
                if (0 !== r || 0 !== a) {
                    var l = ((t - s) * r + (e - o) * a) / (r * r + a * a);
                    l > 1 ? ((s = n[0]), (o = n[1])) : l > 0 && ((s += r * l), (o += a * l));
                }
                return (r = t - s) * r + (a = e - o) * a;
            }
            n.default && (n = n.default), (t.exports = s), (t.exports.default = s);
        },
        4836: function (t, e, i) {
            i.r(e),
                i.d(e, {
                    ClusteredPointSeries: function () {
                        return Is;
                    },
                    DefaultTheme: function () {
                        return Ni;
                    },
                    GraticuleSeries: function () {
                        return Ue;
                    },
                    MapChart: function () {
                        return jn;
                    },
                    MapLine: function () {
                        return Ge;
                    },
                    MapLineSeries: function () {
                        return Ye;
                    },
                    MapPointSeries: function () {
                        return Xn;
                    },
                    MapPolygon: function () {
                        return ws;
                    },
                    MapPolygonSeries: function () {
                        return xs;
                    },
                    MapRasterSeries: function () {
                        return ms;
                    },
                    MapSankeyNodes: function () {
                        return bs;
                    },
                    MapSankeySeries: function () {
                        return ks;
                    },
                    MapSeries: function () {
                        return r;
                    },
                    NightSeries: function () {
                        return As;
                    },
                    PixelMapSeries: function () {
                        return Os;
                    },
                    ZoomControl: function () {
                        return js;
                    },
                    geoAlbersUsa: function () {
                        return io;
                    },
                    geoEqualEarth: function () {
                        return no;
                    },
                    geoEquirectangular: function () {
                        return eo;
                    },
                    geoMercator: function () {
                        return Qs;
                    },
                    geoNaturalEarth1: function () {
                        return so;
                    },
                    geoOrthographic: function () {
                        return to;
                    },
                    getGeoArea: function () {
                        return fe;
                    },
                    getGeoBounds: function () {
                        return _e;
                    },
                    getGeoCentroid: function () {
                        return pe;
                    },
                    getGeoCircle: function () {
                        return ge;
                    },
                    getGeoRectangle: function () {
                        return me;
                    },
                    getSunPosition: function () {
                        return ve;
                    },
                    normalizeGeoPoint: function () {
                        return ye;
                    },
                    projectionRegistry: function () {
                        return zn;
                    },
                    registerProjection: function () {
                        return On;
                    },
                });
            var n = i(9936),
                s = i(4636),
                o = i(1478);
            class r extends n.s {
                constructor() {
                    super(...arguments),
                        (this._types = []),
                        (this._geometries = []),
                        (this._geoJSONparsed = !1),
                        (this._excluded = []),
                        (this._notIncluded = []);
                }
                _afterNew() {
                    this.fields.push("geometry", "geometryType"),
                        this._setRawDefault("geometryField", "geometry"),
                        this._setRawDefault("geometryTypeField", "geometryType"),
                        this._setRawDefault("idField", "id"),
                        this.on("geoJSON", (t) => {
                            let e = this._prevSettings.geoJSON;
                            e && e != t && this.data.clear();
                        }),
                        super._afterNew();
                }
                _handleDirties() {
                    const t = this.get("geoJSON");
                    let e = this._prevSettings.geoJSON;
                    e && e != t && ((this._prevSettings.geoJSON = void 0), (this._geoJSONparsed = !1)),
                        this._geoJSONparsed || (this._parseGeoJSON(), (this._geoJSONparsed = !0));
                }
                _prepareChildren() {
                    if (
                        (super._prepareChildren(),
                        this._valuesDirty && this._handleDirties(),
                        this.get("geoJSON") &&
                            (this.isDirty("geoJSON") || this.isDirty("include") || this.isDirty("exclude")))
                    ) {
                        this._handleDirties();
                        const t = this.chart,
                            e = this.get("exclude");
                        e &&
                            (t && (t._centerLocation = null),
                            s.each(e, (t) => {
                                const e = this.getDataItemById(t);
                                e && this._excludeDataItem(e);
                            }),
                            s.each(this._excluded, (t) => {
                                const i = t.get("id");
                                i && -1 == e.indexOf(i) && this._unexcludeDataItem(t);
                            })),
                            (e && 0 != e.length) ||
                                (s.each(this._excluded, (t) => {
                                    this._unexcludeDataItem(t);
                                }),
                                (this._excluded = []));
                        const i = this.get("include");
                        i &&
                            (t && (t._centerLocation = null),
                            s.each(this.dataItems, (t) => {
                                const e = t.get("id");
                                e && -1 == i.indexOf(e) ? this._notIncludeDataItem(t) : this._unNotIncludeDataItem(t);
                            })),
                            i ||
                                (s.each(this._notIncluded, (t) => {
                                    this._unNotIncludeDataItem(t);
                                }),
                                (this._notIncluded = []));
                    }
                }
                _excludeDataItem(t) {
                    this._removeGeometry(t.get("geometry")), s.move(this._excluded, t);
                }
                _unexcludeDataItem(t) {
                    this._addGeometry(t.get("geometry"), this);
                }
                _notIncludeDataItem(t) {
                    this._removeGeometry(t.get("geometry")), s.move(this._notIncluded, t);
                }
                _unNotIncludeDataItem(t) {
                    this._addGeometry(t.get("geometry"), this);
                }
                _setExcluded(t, e) {
                    t.setPrivate("visible", !e), t.setPrivate("focusExcluded", e);
                }
                checkInclude(t, e, i) {
                    if (e) {
                        if (0 == e.length) return !1;
                        if (-1 == e.indexOf(t)) return !1;
                    }
                    return !(i && i.length > 0 && -1 != i.indexOf(t));
                }
                _parseGeoJSON() {
                    const t = this.get("geoJSON");
                    if (t) {
                        let e;
                        "FeatureCollection" == t.type
                            ? (e = t.features)
                            : "Feature" == t.type
                              ? (e = [t])
                              : -1 !=
                                  [
                                      "Point",
                                      "LineString",
                                      "Polygon",
                                      "MultiPoint",
                                      "MultiLineString",
                                      "MultiPolygon",
                                  ].indexOf(t.type)
                                ? (e = [{ geometry: t }])
                                : console.log("nothing found in geoJSON");
                        const i = this.get("geodataNames");
                        if (e) {
                            const t = this.get("idField", "id");
                            for (let n = 0, r = e.length; n < r; n++) {
                                let r = e[n],
                                    a = r.geometry;
                                if (a) {
                                    let e = a.type,
                                        n = r[t];
                                    if ((i && i[n] && (r.properties.name = i[n]), -1 != this._types.indexOf(e))) {
                                        let i, l;
                                        null != n && (i = s.find(this.dataItems, (t) => t.get("id") == n)),
                                            i && (l = i.dataContext),
                                            i
                                                ? l.geometry ||
                                                  ((l.geometry = a),
                                                  (l.geometryType = e),
                                                  i.set("geometry", a),
                                                  i.set("geometryType", e),
                                                  this.processDataItem(i))
                                                : ((l = { geometry: a, geometryType: e, madeFromGeoData: !0 }),
                                                  (l[t] = n),
                                                  this.data.push(l)),
                                            o.softCopyProperties(r.properties, l);
                                    }
                                }
                            }
                        }
                        const n = "geodataprocessed";
                        this.events.isEnabled(n) && this.events.dispatch(n, { type: n, target: this });
                    }
                }
                _placeBulletsContainer(t) {
                    this.children.moveValue(this.bulletsContainer);
                }
                _removeBulletsContainer() {}
                projection() {
                    const t = this.chart;
                    if (t) return t.get("projection");
                }
                geoPath() {
                    const t = this.chart;
                    if (t) return t.getPrivate("geoPath");
                }
                _addGeometry(t, e) {
                    if (t && e.get("affectsBounds", !0)) {
                        this._geometries.push(t);
                        const e = this.chart;
                        e && e.markDirtyGeometries();
                    }
                }
                _removeGeometry(t) {
                    if (t) {
                        s.remove(this._geometries, t);
                        const e = this.chart;
                        e && e.markDirtyGeometries();
                    }
                }
                _dispose() {
                    super._dispose();
                    const t = this.chart;
                    t && t.series.removeValue(this);
                }
                _onGoHome() {}
                _onDataClear() {
                    super._onDataClear(), (this._geoJSONparsed = !1), this._markDirtyKey("exclude");
                }
            }
            (r.className = "MapSeries"), (r.classNames = n.s.classNames.concat([r.className]));
            var a = i(8297),
                l = i(6251),
                h = i(8636),
                c = i(7389),
                u = 1e-6,
                d = 1e-12,
                g = Math.PI,
                p = g / 2,
                f = g / 4,
                _ = 2 * g,
                m = 180 / g,
                y = g / 180,
                v = Math.abs,
                w = Math.atan,
                x = Math.atan2,
                D = Math.cos,
                M = Math.ceil,
                P = Math.exp,
                S = (Math.floor, Math.hypot),
                I = Math.log,
                b = (Math.pow, Math.sin),
                T =
                    Math.sign ||
                    function (t) {
                        return t > 0 ? 1 : t < 0 ? -1 : 0;
                    },
                k = Math.sqrt,
                C = Math.tan;
            function A(t) {
                return t > 1 ? p : t < -1 ? -p : Math.asin(t);
            }
            function L(t) {
                return (t = b(t / 2)) * t;
            }
            function N(t) {
                return [x(t[1], t[0]), A(t[2])];
            }
            function R(t) {
                var e = t[0],
                    i = t[1],
                    n = D(i);
                return [n * D(e), n * b(e), b(i)];
            }
            function E(t, e) {
                return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
            }
            function B(t, e) {
                return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]];
            }
            function F(t, e) {
                (t[0] += e[0]), (t[1] += e[1]), (t[2] += e[2]);
            }
            function z(t, e) {
                return [t[0] * e, t[1] * e, t[2] * e];
            }
            function O(t) {
                var e = k(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
                (t[0] /= e), (t[1] /= e), (t[2] /= e);
            }
            function G(t) {
                return function () {
                    return t;
                };
            }
            function j(t, e) {
                function i(i, n) {
                    return (i = t(i, n)), e(i[0], i[1]);
                }
                return (
                    t.invert &&
                        e.invert &&
                        (i.invert = function (i, n) {
                            return (i = e.invert(i, n)) && t.invert(i[0], i[1]);
                        }),
                    i
                );
            }
            function X(t, e) {
                return v(t) > g && (t -= Math.round(t / _) * _), [t, e];
            }
            function Y(t, e, i) {
                return (t %= _) ? (e || i ? j(H(t), W(e, i)) : H(t)) : e || i ? W(e, i) : X;
            }
            function Z(t) {
                return function (e, i) {
                    return v((e += t)) > g && (e -= Math.round(e / _) * _), [e, i];
                };
            }
            function H(t) {
                var e = Z(t);
                return (e.invert = Z(-t)), e;
            }
            function W(t, e) {
                var i = D(t),
                    n = b(t),
                    s = D(e),
                    o = b(e);
                function r(t, e) {
                    var r = D(e),
                        a = D(t) * r,
                        l = b(t) * r,
                        h = b(e),
                        c = h * i + a * n;
                    return [x(l * s - c * o, a * i - h * n), A(c * s + l * o)];
                }
                return (
                    (r.invert = function (t, e) {
                        var r = D(e),
                            a = D(t) * r,
                            l = b(t) * r,
                            h = b(e),
                            c = h * s - l * o;
                        return [x(l * s + h * o, a * i + c * n), A(c * i - a * n)];
                    }),
                    r
                );
            }
            function U(t) {
                function e(e) {
                    return ((e = t(e[0] * y, e[1] * y))[0] *= m), (e[1] *= m), e;
                }
                return (
                    (t = Y(t[0] * y, t[1] * y, t.length > 2 ? t[2] * y : 0)),
                    (e.invert = function (e) {
                        return ((e = t.invert(e[0] * y, e[1] * y))[0] *= m), (e[1] *= m), e;
                    }),
                    e
                );
            }
            function q(t, e, i, n, s, o) {
                if (i) {
                    var r = D(e),
                        a = b(e),
                        l = n * i;
                    null == s
                        ? ((s = e + n * _), (o = e - l / 2))
                        : ((s = V(r, s)), (o = V(r, o)), (n > 0 ? s < o : s > o) && (s += n * _));
                    for (var h, c = s; n > 0 ? c > o : c < o; c -= l)
                        (h = N([r, -a * D(c), -a * b(c)])), t.point(h[0], h[1]);
                }
            }
            function V(t, e) {
                ((e = R(e))[0] -= t), O(e);
                var i,
                    n = (i = -e[1]) > 1 ? 0 : i < -1 ? g : Math.acos(i);
                return ((-e[2] < 0 ? -n : n) + _ - u) % _;
            }
            X.invert = X;
            class K {
                constructor() {
                    (this._partials = new Float64Array(32)), (this._n = 0);
                }
                add(t) {
                    const e = this._partials;
                    let i = 0;
                    for (let n = 0; n < this._n && n < 32; n++) {
                        const s = e[n],
                            o = t + s,
                            r = Math.abs(t) < Math.abs(s) ? t - (o - s) : s - (o - t);
                        r && (e[i++] = r), (t = o);
                    }
                    return (e[i] = t), (this._n = i + 1), this;
                }
                valueOf() {
                    const t = this._partials;
                    let e,
                        i,
                        n,
                        s = this._n,
                        o = 0;
                    if (s > 0) {
                        for (o = t[--s]; s > 0 && ((e = o), (i = t[--s]), (o = e + i), (n = i - (o - e)), !n); );
                        s > 0 &&
                            ((n < 0 && t[s - 1] < 0) || (n > 0 && t[s - 1] > 0)) &&
                            ((i = 2 * n), (e = o + i), i == e - o && (o = e));
                    }
                    return o;
                }
            }
            function J() {}
            function $(t, e) {
                t && _t.hasOwnProperty(t.type) && _t[t.type](t, e);
            }
            var Q,
                tt,
                et,
                it,
                nt,
                st,
                ot,
                rt,
                at,
                lt,
                ht,
                ct,
                ut,
                dt,
                gt,
                pt,
                ft = {
                    Feature: function (t, e) {
                        $(t.geometry, e);
                    },
                    FeatureCollection: function (t, e) {
                        for (var i = t.features, n = -1, s = i.length; ++n < s; ) $(i[n].geometry, e);
                    },
                },
                _t = {
                    Sphere: function (t, e) {
                        e.sphere();
                    },
                    Point: function (t, e) {
                        (t = t.coordinates), e.point(t[0], t[1], t[2]);
                    },
                    MultiPoint: function (t, e) {
                        for (var i = t.coordinates, n = -1, s = i.length; ++n < s; )
                            (t = i[n]), e.point(t[0], t[1], t[2]);
                    },
                    LineString: function (t, e) {
                        mt(t.coordinates, e, 0);
                    },
                    MultiLineString: function (t, e) {
                        for (var i = t.coordinates, n = -1, s = i.length; ++n < s; ) mt(i[n], e, 0);
                    },
                    Polygon: function (t, e) {
                        yt(t.coordinates, e);
                    },
                    MultiPolygon: function (t, e) {
                        for (var i = t.coordinates, n = -1, s = i.length; ++n < s; ) yt(i[n], e);
                    },
                    GeometryCollection: function (t, e) {
                        for (var i = t.geometries, n = -1, s = i.length; ++n < s; ) $(i[n], e);
                    },
                };
            function mt(t, e, i) {
                var n,
                    s = -1,
                    o = t.length - i;
                for (e.lineStart(); ++s < o; ) (n = t[s]), e.point(n[0], n[1], n[2]);
                e.lineEnd();
            }
            function yt(t, e) {
                var i = -1,
                    n = t.length;
                for (e.polygonStart(); ++i < n; ) mt(t[i], e, 1);
                e.polygonEnd();
            }
            function vt(t, e) {
                t && ft.hasOwnProperty(t.type) ? ft[t.type](t, e) : $(t, e);
            }
            var wt = {
                sphere: J,
                point: xt,
                lineStart: Mt,
                lineEnd: It,
                polygonStart: function () {
                    (wt.lineStart = bt), (wt.lineEnd = Tt);
                },
                polygonEnd: function () {
                    (wt.lineStart = Mt), (wt.lineEnd = It);
                },
            };
            function xt(t, e) {
                t *= y;
                var i = D((e *= y));
                Dt(i * D(t), i * b(t), b(e));
            }
            function Dt(t, e, i) {
                ++Q, (et += (t - et) / Q), (it += (e - it) / Q), (nt += (i - nt) / Q);
            }
            function Mt() {
                wt.point = Pt;
            }
            function Pt(t, e) {
                t *= y;
                var i = D((e *= y));
                (dt = i * D(t)), (gt = i * b(t)), (pt = b(e)), (wt.point = St), Dt(dt, gt, pt);
            }
            function St(t, e) {
                t *= y;
                var i = D((e *= y)),
                    n = i * D(t),
                    s = i * b(t),
                    o = b(e),
                    r = x(
                        k((r = gt * o - pt * s) * r + (r = pt * n - dt * o) * r + (r = dt * s - gt * n) * r),
                        dt * n + gt * s + pt * o
                    );
                (tt += r),
                    (st += r * (dt + (dt = n))),
                    (ot += r * (gt + (gt = s))),
                    (rt += r * (pt + (pt = o))),
                    Dt(dt, gt, pt);
            }
            function It() {
                wt.point = xt;
            }
            function bt() {
                wt.point = kt;
            }
            function Tt() {
                Ct(ct, ut), (wt.point = xt);
            }
            function kt(t, e) {
                (ct = t), (ut = e), (t *= y), (e *= y), (wt.point = Ct);
                var i = D(e);
                (dt = i * D(t)), (gt = i * b(t)), (pt = b(e)), Dt(dt, gt, pt);
            }
            function Ct(t, e) {
                t *= y;
                var i = D((e *= y)),
                    n = i * D(t),
                    s = i * b(t),
                    o = b(e),
                    r = gt * o - pt * s,
                    a = pt * n - dt * o,
                    l = dt * s - gt * n,
                    h = S(r, a, l),
                    c = A(h),
                    u = h && -c / h;
                at.add(u * r),
                    lt.add(u * a),
                    ht.add(u * l),
                    (tt += c),
                    (st += c * (dt + (dt = n))),
                    (ot += c * (gt + (gt = s))),
                    (rt += c * (pt + (pt = o))),
                    Dt(dt, gt, pt);
            }
            var At,
                Lt,
                Nt,
                Rt,
                Et,
                Bt,
                Ft,
                zt,
                Ot,
                Gt,
                jt,
                Xt,
                Yt,
                Zt,
                Ht,
                Wt,
                Ut = new K(),
                qt = new K(),
                Vt = {
                    point: J,
                    lineStart: J,
                    lineEnd: J,
                    polygonStart: function () {
                        (Ut = new K()), (Vt.lineStart = Kt), (Vt.lineEnd = Jt);
                    },
                    polygonEnd: function () {
                        var t = +Ut;
                        qt.add(t < 0 ? _ + t : t), (this.lineStart = this.lineEnd = this.point = J);
                    },
                    sphere: function () {
                        qt.add(_);
                    },
                };
            function Kt() {
                Vt.point = $t;
            }
            function Jt() {
                Qt(At, Lt);
            }
            function $t(t, e) {
                (Vt.point = Qt), (At = t), (Lt = e), (Nt = t *= y), (Rt = D((e = (e *= y) / 2 + f))), (Et = b(e));
            }
            function Qt(t, e) {
                var i = (t *= y) - Nt,
                    n = i >= 0 ? 1 : -1,
                    s = n * i,
                    o = D((e = (e *= y) / 2 + f)),
                    r = b(e),
                    a = Et * r,
                    l = Rt * o + a * D(s),
                    h = a * n * b(s);
                Ut.add(x(h, l)), (Nt = t), (Rt = o), (Et = r);
            }
            function te(t) {
                return (qt = new K()), vt(t, Vt), 2 * qt;
            }
            var ee = {
                point: ie,
                lineStart: se,
                lineEnd: oe,
                polygonStart: function () {
                    (ee.point = re), (ee.lineStart = ae), (ee.lineEnd = le), (Zt = new K()), Vt.polygonStart();
                },
                polygonEnd: function () {
                    Vt.polygonEnd(),
                        (ee.point = ie),
                        (ee.lineStart = se),
                        (ee.lineEnd = oe),
                        Ut < 0 ? ((Bt = -(zt = 180)), (Ft = -(Ot = 90))) : Zt > u ? (Ot = 90) : Zt < -u && (Ft = -90),
                        (Wt[0] = Bt),
                        (Wt[1] = zt);
                },
                sphere: function () {
                    (Bt = -(zt = 180)), (Ft = -(Ot = 90));
                },
            };
            function ie(t, e) {
                Ht.push((Wt = [(Bt = t), (zt = t)])), e < Ft && (Ft = e), e > Ot && (Ot = e);
            }
            function ne(t, e) {
                var i = R([t * y, e * y]);
                if (Yt) {
                    var n = B(Yt, i),
                        s = B([n[1], -n[0], 0], n);
                    O(s), (s = N(s));
                    var o,
                        r = t - Gt,
                        a = r > 0 ? 1 : -1,
                        l = s[0] * m * a,
                        h = v(r) > 180;
                    h ^ (a * Gt < l && l < a * t)
                        ? (o = s[1] * m) > Ot && (Ot = o)
                        : h ^ (a * Gt < (l = ((l + 360) % 360) - 180) && l < a * t)
                          ? (o = -s[1] * m) < Ft && (Ft = o)
                          : (e < Ft && (Ft = e), e > Ot && (Ot = e)),
                        h
                            ? t < Gt
                                ? he(Bt, t) > he(Bt, zt) && (zt = t)
                                : he(t, zt) > he(Bt, zt) && (Bt = t)
                            : zt >= Bt
                              ? (t < Bt && (Bt = t), t > zt && (zt = t))
                              : t > Gt
                                ? he(Bt, t) > he(Bt, zt) && (zt = t)
                                : he(t, zt) > he(Bt, zt) && (Bt = t);
                } else Ht.push((Wt = [(Bt = t), (zt = t)]));
                e < Ft && (Ft = e), e > Ot && (Ot = e), (Yt = i), (Gt = t);
            }
            function se() {
                ee.point = ne;
            }
            function oe() {
                (Wt[0] = Bt), (Wt[1] = zt), (ee.point = ie), (Yt = null);
            }
            function re(t, e) {
                if (Yt) {
                    var i = t - Gt;
                    Zt.add(v(i) > 180 ? i + (i > 0 ? 360 : -360) : i);
                } else (jt = t), (Xt = e);
                Vt.point(t, e), ne(t, e);
            }
            function ae() {
                Vt.lineStart();
            }
            function le() {
                re(jt, Xt), Vt.lineEnd(), v(Zt) > u && (Bt = -(zt = 180)), (Wt[0] = Bt), (Wt[1] = zt), (Yt = null);
            }
            function he(t, e) {
                return (e -= t) < 0 ? e + 360 : e;
            }
            function ce(t, e) {
                return t[0] - e[0];
            }
            function ue(t, e) {
                return t[0] <= t[1] ? t[0] <= e && e <= t[1] : e < t[0] || t[1] < e;
            }
            function de(t, e, i) {
                return (
                    Object.defineProperty(t, "__geometry", {
                        value: { name: e, args: i },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    t
                );
            }
            function ge(t, e) {
                return de(
                    (function () {
                        var t,
                            e,
                            i = G([0, 0]),
                            n = G(90),
                            s = G(2),
                            o = {
                                point: function (i, n) {
                                    t.push((i = e(i, n))), (i[0] *= m), (i[1] *= m);
                                },
                            };
                        function r() {
                            var r = i.apply(this, arguments),
                                a = n.apply(this, arguments) * y,
                                l = s.apply(this, arguments) * y;
                            return (
                                (t = []),
                                (e = Y(-r[0] * y, -r[1] * y, 0).invert),
                                q(o, a, l, 1),
                                (r = { type: "Polygon", coordinates: [t] }),
                                (t = e = null),
                                r
                            );
                        }
                        return (
                            (r.center = function (t) {
                                return arguments.length ? ((i = "function" == typeof t ? t : G([+t[0], +t[1]])), r) : i;
                            }),
                            (r.radius = function (t) {
                                return arguments.length ? ((n = "function" == typeof t ? t : G(+t)), r) : n;
                            }),
                            (r.precision = function (t) {
                                return arguments.length ? ((s = "function" == typeof t ? t : G(+t)), r) : s;
                            }),
                            r
                        );
                    })()
                        .center([t.longitude, t.latitude])
                        .radius(e)(),
                    "GeoCircle",
                    { geoPoint: t, radius: e }
                );
            }
            function pe(t) {
                const e = (function (t) {
                    (Q = tt = et = it = nt = st = ot = rt = 0),
                        (at = new K()),
                        (lt = new K()),
                        (ht = new K()),
                        vt(t, wt);
                    var e = +at,
                        i = +lt,
                        n = +ht,
                        s = S(e, i, n);
                    return s < d &&
                        ((e = st), (i = ot), (n = rt), tt < u && ((e = et), (i = it), (n = nt)), (s = S(e, i, n)) < d)
                        ? [NaN, NaN]
                        : [x(i, e) * m, A(n / s) * m];
                })(t);
                return { longitude: e[0], latitude: e[1] };
            }
            function fe(t) {
                return te(t);
            }
            function _e(t) {
                const e = (function (t) {
                    var e, i, n, s, o, r, a;
                    if (((Ot = zt = -(Bt = Ft = 1 / 0)), (Ht = []), vt(t, ee), (i = Ht.length))) {
                        for (Ht.sort(ce), e = 1, o = [(n = Ht[0])]; e < i; ++e)
                            ue(n, (s = Ht[e])[0]) || ue(n, s[1])
                                ? (he(n[0], s[1]) > he(n[0], n[1]) && (n[1] = s[1]),
                                  he(s[0], n[1]) > he(n[0], n[1]) && (n[0] = s[0]))
                                : o.push((n = s));
                        for (r = -1 / 0, e = 0, n = o[(i = o.length - 1)]; e <= i; n = s, ++e)
                            (s = o[e]), (a = he(n[1], s[0])) > r && ((r = a), (Bt = s[0]), (zt = n[1]));
                    }
                    return (
                        (Ht = Wt = null),
                        Bt === 1 / 0 || Ft === 1 / 0
                            ? [
                                  [NaN, NaN],
                                  [NaN, NaN],
                              ]
                            : [
                                  [Bt, Ft],
                                  [zt, Ot],
                              ]
                    );
                })(t);
                if (e) {
                    const t = { left: e[0][0], right: e[1][0], top: e[1][1], bottom: e[0][1] };
                    return t.right < t.left && ((t.right = 180), (t.left = -180)), t;
                }
                return { left: 0, right: 0, top: 0, bottom: 0 };
            }
            function me(t, e, i, n) {
                const s = { north: t, east: e, south: i, west: n };
                let o = [];
                n <= -180 && (n = -179.9999),
                    i <= -90 && (i = -89.9999),
                    t >= 90 && (t = 89.9999),
                    e >= 180 && (e = 179.9999);
                let r = Math.min(90, (e - n) / Math.ceil((e - n) / 90)),
                    a = (t - i) / Math.ceil((t - i) / 90);
                for (let s = n; s < e; s += r) {
                    let n = [];
                    o.push([n]), s + r > e && (r = e - s);
                    for (let e = s; e <= s + r; e += 5) n.push([e, t]);
                    for (let e = t; e >= i; e -= a) n.push([s + r, e]);
                    for (let t = s + r; t >= s; t -= 5) n.push([t, i]);
                    for (let e = i; e <= t; e += a) n.push([s, e]);
                }
                return de({ type: "MultiPolygon", coordinates: o }, "GeoRectangle", s);
            }
            function ye(t) {
                let e = we(t.longitude),
                    i = Math.asin(Math.sin(t.latitude * l.RADIANS)) * l.DEGREES,
                    n = we(t.latitude);
                return Math.abs(n) > 90 && (e = we(e + 180)), (t.longitude = e), (t.latitude = i), t;
            }
            function ve(t = new Date()) {
                const e = (t.getTime() - Date.UTC(t.getUTCFullYear(), 0, 0)) / 864e5,
                    i = (2 * Math.PI) / 365,
                    n = -Math.asin(0.39779 * Math.cos(i * (e + 10) + 0.0334 * Math.sin(i * (e - 2)))) * l.DEGREES,
                    s = i * (e - 81),
                    o = 9.87 * Math.sin(2 * s) - 7.53 * Math.cos(s) - 1.5 * Math.sin(s);
                return ye({
                    longitude:
                        -15 * (t.getUTCHours() + t.getUTCMinutes() / 60 + t.getUTCSeconds() / 3600 + o / 60 - 12),
                    latitude: n,
                });
            }
            function we(t) {
                return (t %= 360) > 180 && (t -= 360), t < -180 && (t += 360), t;
            }
            const xe = 6371008.8;
            function De(t) {
                const e = t.clipAngle ? t.clipAngle() : 0;
                return !!e && e < 90.5 && !!t.rotate;
            }
            function Me(t, e, i, n) {
                return Pe(t)(e, i, n);
            }
            function Pe(t, e = !1) {
                const i = t.scale();
                if (!De(t))
                    return (e, n, s) => {
                        const o = t([e, n]);
                        if (o && isFinite(o[0]) && isFinite(o[1]))
                            return { x: o[0], y: o[1] - (s / xe) * i, far: !1, hidden: !1 };
                    };
                const n = t.clipAngle ? t.clipAngle() : 0,
                    s = t.translate(),
                    o = s[0],
                    r = s[1],
                    a = t.rotate(),
                    h = -a[0] * l.RADIANS,
                    c = -a[1] * l.RADIANS,
                    u = Math.sin(c),
                    d = Math.cos(c),
                    g = Math.cos((n || 90) * l.RADIANS),
                    p = (t, e) => Math.cos(e) * d * Math.cos(t - h) + Math.sin(e) * u;
                let f = !1;
                if (e) {
                    const e = h + 60 * l.RADIANS,
                        n = p(e, c),
                        s = t([e / l.RADIANS, c / l.RADIANS]);
                    if (s) {
                        const t = Math.sqrt((s[0] - o) * (s[0] - o) + (s[1] - r) * (s[1] - r));
                        f = Math.abs(t - i * Math.sqrt(1 - n * n)) < 0.001 * i;
                    }
                }
                return (e, n, s) => {
                    const a = s / xe,
                        h = p(e * l.RADIANS, n * l.RADIANS),
                        c = h < g;
                    if (f && c && (1 - h * h) * (1 + a) * (1 + a) < 1) return;
                    const u = t([e, n]);
                    if (!u || !isFinite(u[0]) || !isFinite(u[1])) return;
                    const d = o + (u[0] - o) * (1 + a),
                        _ = r + (u[1] - r) * (1 + a),
                        m = d - o,
                        y = _ - r;
                    return { x: d, y: _, far: c, hidden: c && m * m + y * y < i * i };
                };
            }
            (c.u5.geometryFunctions.GeoRectangle = (t) => me(t.north, t.east, t.south, t.west)),
                (c.u5.geometryFunctions.GeoCircle = (t) => ge(t.geoPoint, t.radius));
            var Se,
                Ie,
                be,
                Te,
                ke = i(4092),
                Ce = {
                    sphere: J,
                    point: J,
                    lineStart: function () {
                        (Ce.point = Le), (Ce.lineEnd = Ae);
                    },
                    lineEnd: J,
                    polygonStart: J,
                    polygonEnd: J,
                };
            function Ae() {
                Ce.point = Ce.lineEnd = J;
            }
            function Le(t, e) {
                (Ie = t *= y), (be = b((e *= y))), (Te = D(e)), (Ce.point = Ne);
            }
            function Ne(t, e) {
                t *= y;
                var i = b((e *= y)),
                    n = D(e),
                    s = v(t - Ie),
                    o = D(s),
                    r = n * b(s),
                    a = Te * i - be * n * o,
                    l = be * i + Te * n * o;
                Se.add(x(k(r * r + a * a), l)), (Ie = t), (be = i), (Te = n);
            }
            function Re(t) {
                return (Se = new K()), vt(t, Ce), +Se;
            }
            var Ee = [null, null],
                Be = { type: "LineString", coordinates: Ee };
            function Fe(t, e) {
                return (Ee[0] = t), (Ee[1] = e), Re(Be);
            }
            function ze(t, e) {
                var i = t[0] * y,
                    n = t[1] * y,
                    s = e[0] * y,
                    o = e[1] * y,
                    r = D(n),
                    a = b(n),
                    l = D(o),
                    h = b(o),
                    c = r * D(i),
                    u = r * b(i),
                    d = l * D(s),
                    g = l * b(s),
                    p = 2 * A(k(L(o - n) + r * l * L(s - i))),
                    f = b(p),
                    _ = p
                        ? function (t) {
                              var e = b((t *= p)) / f,
                                  i = b(p - t) / f,
                                  n = i * c + e * d,
                                  s = i * u + e * g,
                                  o = i * a + e * h;
                              return [x(s, n) * m, x(o, k(n * n + s * s)) * m];
                          }
                        : function () {
                              return [i * m, n * m];
                          };
                return (_.distance = p), _;
            }
            function Oe(t, e, i) {
                let n;
                for (let s = 0; s < 12; s++) {
                    const s = (e + i) / 2,
                        o = t(s);
                    o ? ((n = o), (e = s)) : (i = s);
                }
                return n;
            }
            class Ge extends ke.A {
                constructor() {
                    super(...arguments), (this._projectionDirty = !1);
                }
                _beforeChanged() {
                    if ((super._beforeChanged(), this.isDirty("focusable") && this.get("focusable"))) {
                        const t = this.dataItem && this.dataItem.component,
                            e = t && t.chart;
                        e && e._scheduleFocusView();
                    }
                    if (
                        this._projectionDirty ||
                        this.isDirty("geometry") ||
                        this.isDirty("precision") ||
                        this.isDirty("altitude")
                    ) {
                        const t = this.get("geometry");
                        if (t) {
                            const e = this.getPrivate("series");
                            if (e) {
                                const i = e.chart;
                                if (i) {
                                    const n = i.get("projection");
                                    let s = null;
                                    n && n.clipAngle && ((s = n.clipAngle()), n.precision(this.get("precision", 0.5)));
                                    const o = this.dataItem,
                                        r = i.getPrivate("geoPath");
                                    if (r && o)
                                        if (((this._clear = !0), "straight" == o.get("lineType", e.get("lineType")))) {
                                            const t = this.get("geometry");
                                            if (t) {
                                                let e = t.coordinates;
                                                if (e) {
                                                    let n;
                                                    "LineString" == t.type
                                                        ? (n = [e])
                                                        : "MultiLineString" == t.type && (n = e),
                                                        this.set("draw", (t) => {
                                                            for (let e = 0; e < n.length; e++) {
                                                                let s = n[e];
                                                                if (s.length > 0) {
                                                                    const e = s[0],
                                                                        n = i.convert({
                                                                            longitude: e[0],
                                                                            latitude: e[1],
                                                                        });
                                                                    t.lineTo(n.x, n.y);
                                                                    for (let e = 0; e < s.length; e++) {
                                                                        const n = s[e],
                                                                            o = i.convert({
                                                                                longitude: n[0],
                                                                                latitude: n[1],
                                                                            });
                                                                        t.lineTo(o.x, o.y);
                                                                    }
                                                                }
                                                            }
                                                        });
                                                }
                                            }
                                        } else
                                            this._hasAltitude()
                                                ? this._setC("draw", (t) => {
                                                      this._drawRaised(t);
                                                  })
                                                : this.set("draw", (i) => {
                                                      n && !1 === e.get("clipBack") && n.clipAngle(180),
                                                          r.context(this._display),
                                                          r(t),
                                                          r.context(null),
                                                          n && n.clipAngle && n.clipAngle(s);
                                                  });
                                }
                            }
                        }
                        const e = "linechanged";
                        this.events.isEnabled(e) && this.events.dispatch(e, { type: e, target: this });
                    }
                }
                markDirtyProjection() {
                    this.markDirty(), (this._projectionDirty = !0);
                }
                _clearDirty() {
                    super._clearDirty(), (this._projectionDirty = !1);
                }
                _segments() {
                    const t = this.get("geometry");
                    if (t && t.coordinates) {
                        if ("LineString" == t.type) return [t.coordinates];
                        if ("MultiLineString" == t.type) return t.coordinates;
                    }
                    return [];
                }
                _hasAltitude() {
                    return null != this.get("altitude");
                }
                positionToAltitude(t) {
                    if (!this._hasAltitude()) return 0;
                    const e = this._segments(),
                        i = Re(this.get("geometry")) || 1,
                        n = this.get("altitude", 0);
                    let s = 0,
                        o = 0;
                    for (let r = 0; r < e.length; r++) {
                        const a = e[r];
                        1 == a.length && (s = a[0][2] || 0);
                        for (let s = 1; s < a.length; s++) {
                            const l = a[s - 1],
                                h = a[s],
                                c = Fe(l, h) / i;
                            if (t <= o + c || (r == e.length - 1 && s == a.length - 1)) {
                                const e = c ? Math.max(0, Math.min(1, (t - o) / c)) : 0;
                                return (l[2] || 0) + ((h[2] || 0) - (l[2] || 0)) * e + 4 * n * e * (1 - e);
                            }
                            o += c;
                        }
                    }
                    return s;
                }
                _drawRaised(t) {
                    const e = this.getPrivate("series"),
                        i = e ? e.chart : void 0,
                        n = this.get("geometry"),
                        s = i ? i.get("projection") : void 0;
                    if (!s || !n) return;
                    const o = !1 === e.get("clipBack"),
                        r = De(s),
                        a = Math.PI * s.scale(),
                        h = this._segments(),
                        c = this.get("altitude", 0),
                        u = Pe(s, !o);
                    for (let e = 0; e < h.length; e++) {
                        const i = h[e];
                        let n;
                        for (let e = 1; e < i.length; e++) {
                            const s = i[e - 1],
                                h = i[e],
                                d = ze(s, h),
                                g = d.distance,
                                p = (t) => {
                                    const e = d(t),
                                        i = (s[2] || 0) + ((h[2] || 0) - (s[2] || 0)) * t + 4 * c * t * (1 - t),
                                        n = u(e[0], e[1], i);
                                    return !n || (!o && n.hidden) ? void 0 : n;
                                },
                                f = Math.max(c ? 2 : 1, Math.ceil(g / l.RADIANS));
                            let _ = 0;
                            for (let i = 1 == e ? 0 : 1; i <= f; i++) {
                                const e = i / f,
                                    s = p(e);
                                if (s)
                                    if (n && (r || Math.abs(s.x - n.x) < a)) t.lineTo(s.x, s.y);
                                    else {
                                        const o = !n && i > 0 && r ? Oe(p, e, _) : void 0;
                                        o ? (t.moveTo(o.x, o.y), t.lineTo(s.x, s.y)) : t.moveTo(s.x, s.y);
                                    }
                                else if (n && r) {
                                    const i = Oe(p, _, e);
                                    i && t.lineTo(i.x, i.y);
                                }
                                (n = s), (_ = e);
                            }
                        }
                    }
                }
                _getTooltipPoint() {
                    let t = this.get("tooltipX"),
                        e = this.get("tooltipY"),
                        i = 0,
                        n = 0;
                    if ((a.isNumber(t) && (i = t), a.isNumber(e) && (n = e), t instanceof h.QE)) {
                        const e = this.positionToGeoPoint(t.value),
                            s = this.getPrivate("series");
                        if (s) {
                            const t = s.chart;
                            if (t) {
                                const s = t.convert(e);
                                (i = s.x), (n = s.y);
                            }
                        }
                    }
                    return { x: i, y: n };
                }
                positionToGeoPoint(t) {
                    const e = this.get("geometry"),
                        i = this.getPrivate("series"),
                        n = i.chart,
                        s = this.dataItem;
                    if (e && i && n && s) {
                        const o = s.get("lineType", i.get("lineType"));
                        let r,
                            a,
                            l,
                            h = Re(e),
                            c = 0,
                            u = 0,
                            d = 0,
                            g = e.coordinates;
                        if (g) {
                            let i;
                            "LineString" == e.type ? (i = [g]) : "MultiLineString" == e.type && (i = g);
                            for (let e = 0; e < i.length; e++) {
                                let n = i[e];
                                if (n.length > 1) {
                                    for (let s = 1; s < n.length; s++)
                                        if (
                                            ((a = n[s - 1]),
                                            (l = n[s]),
                                            (u = c / h),
                                            (r = Fe(a, l)),
                                            (c += r),
                                            (d = c / h),
                                            u <= t && d > t)
                                        ) {
                                            e = i.length;
                                            break;
                                        }
                                } else 1 == n.length && ((a = n[0]), (l = n[0]), (u = 0), (d = 1));
                            }
                            if (a && l) {
                                let e,
                                    i = (t - u) / (d - u);
                                if ("straight" == o) {
                                    let t = n.convert({ longitude: a[0], latitude: a[1] }),
                                        e = n.convert({ longitude: l[0], latitude: l[1] }),
                                        s = t.x + (e.x - t.x) * i,
                                        o = t.y + (e.y - t.y) * i;
                                    return n.invert({ x: s, y: o });
                                }
                                return (e = ze(a, l)(i)), { longitude: e[0], latitude: e[1] };
                            }
                        }
                    }
                    return { longitude: 0, latitude: 0 };
                }
            }
            (Ge.className = "MapLine"), (Ge.classNames = ke.A.classNames.concat([Ge.className]));
            var je = i(3597),
                Xe = i(7967);
            class Ye extends r {
                constructor() {
                    super(...arguments),
                        (this._derivedPoints = new WeakSet()),
                        (this.mapLines = this.addDisposer(
                            new je.TS(Xe.Bj.new({}), () => Ge._new(this._root, {}, [this.mapLines.template]))
                        )),
                        (this._types = ["LineString", "MultiLineString"]);
                }
                _afterNew() {
                    this.fields.push("lineType", "pointIds"),
                        this._setRawDefault("lineTypeField", "lineType"),
                        this._setRawDefault("pointIdsField", "pointIds"),
                        this.on("pointSeries", () => {
                            this._setupPointSeriesListener();
                        }),
                        super._afterNew(),
                        this._setupPointSeriesListener();
                }
                _dispose() {
                    super._dispose(),
                        this._pointSeriesDP && (this._pointSeriesDP.dispose(), (this._pointSeriesDP = void 0));
                }
                _setupPointSeriesListener() {
                    this._pointSeriesDP && (this._pointSeriesDP.dispose(), (this._pointSeriesDP = void 0));
                    const t = this.get("pointSeries");
                    t &&
                        ((this._pointSeriesDP = t.events.on("datavalidated", () => {
                            this._resolvePendingPointIds();
                        })),
                        t.dataItems.length > 0 && this._resolvePendingPointIds());
                }
                _resolvePendingPointIds() {
                    s.each(this.dataItems, (t) => {
                        this._resolvePointIds(t);
                    });
                }
                _resolvePointIds(t) {
                    const e = t.get("pointsToConnect");
                    if (e && !this._derivedPoints.has(t)) return !1;
                    const i = t.get("pointIds"),
                        n = this.get("pointSeries");
                    if (!i || 0 === i.length || !n) return !1;
                    const o = [];
                    for (let t = 0; t < i.length; t++) {
                        const e = n.getDataItemById(i[t]);
                        if (!e) return !1;
                        const s = e.dataContext;
                        if (e.get("fixed") || (s && s.fixed)) return !1;
                        if ((null == e.get("longitude") || null == e.get("latitude")) && null == e.get("geometry"))
                            return !1;
                        o.push(e);
                    }
                    return !(
                        (e && e.length === o.length && !s.any(o, (t) => -1 === e.indexOf(t))) ||
                        (this._derivedPoints.add(t), t.set("pointsToConnect", o), 0)
                    );
                }
                makeMapLine(t) {
                    const e = this.children.push(this.mapLines.make());
                    return e._setDataItem(t), this._linkSprite(e, t), this.mapLines.push(e), e;
                }
                markDirtyProjection() {
                    s.each(this.dataItems, (t) => {
                        let e = t.get("mapLine");
                        e && e.markDirtyProjection();
                    });
                }
                _prepareChildren() {
                    super._prepareChildren(),
                        this.isDirty("stroke") && this.mapLines.template._setC("stroke", this.get("stroke")),
                        this.isDirty("lineType") && this.markDirtyProjection();
                }
                processDataItem(t) {
                    super.processDataItem(t);
                    let e = t.get("mapLine");
                    e || (e = this.makeMapLine(t)),
                        this._handlePointsToConnect(t),
                        t.on("pointsToConnect", () => {
                            this._handlePointsToConnect(t);
                        }),
                        t.on("lineType", () => {
                            const e = t.get("mapLine");
                            e && e.markDirtyProjection();
                        }),
                        this._resolvePointIds(t),
                        t.set("mapLine", e),
                        this._addGeometry(t.get("geometry"), this),
                        e.setPrivate("series", this);
                }
                _handlePointsToConnect(t) {
                    const e = t.get("pointsToConnect");
                    e &&
                        (s.each(e, (e) => {
                            e.on("geometry", () => {
                                this.markDirtyValues(t);
                            }),
                                e.on("longitude", () => {
                                    this.markDirtyValues(t);
                                }),
                                e.on("latitude", () => {
                                    this.markDirtyValues(t);
                                }),
                                e.on("altitude", () => {
                                    this.markDirtyValues(t);
                                });
                        }),
                        this.markDirtyValues(t));
                }
                markDirtyValues(t) {
                    if ((super.markDirtyValues(), t)) {
                        const e = t.get("mapLine");
                        if (e) {
                            const i = t.get("pointsToConnect");
                            if (i) {
                                let n = [];
                                s.each(i, (t) => {
                                    const e = t.get("longitude"),
                                        i = t.get("latitude"),
                                        s = t.get("altitude");
                                    if (null != e && null != i) n.push(s ? [e, i, s] : [e, i]);
                                    else {
                                        const e = t.get("geometry");
                                        if (e) {
                                            const t = e.coordinates;
                                            t && n.push([t[0], t[1]]);
                                        }
                                    }
                                });
                                let o = { type: "LineString", coordinates: n };
                                t.setRaw("geometry", o), e._setC("geometry", o);
                            } else e._setC("geometry", t.get("geometry"));
                        }
                    }
                }
                disposeDataItem(t) {
                    super.disposeDataItem(t);
                    const e = t.get("mapLine");
                    e && (this.mapLines.removeValue(e), e.dispose());
                }
                _excludeDataItem(t) {
                    super._excludeDataItem(t);
                    const e = t.get("mapLine");
                    e && this._setExcluded(e, !0);
                }
                _unexcludeDataItem(t) {
                    super._unexcludeDataItem(t);
                    const e = t.get("mapLine");
                    e && this._setExcluded(e, !1);
                }
                _notIncludeDataItem(t) {
                    super._notIncludeDataItem(t);
                    const e = t.get("mapLine");
                    e && this._setExcluded(e, !0);
                }
                _unNotIncludeDataItem(t) {
                    super._unNotIncludeDataItem(t);
                    const e = t.get("mapLine");
                    e && this._setExcluded(e, !1);
                }
            }
            function Ze(t, e, i) {
                (t = +t), (e = +e), (i = (s = arguments.length) < 2 ? ((e = t), (t = 0), 1) : s < 3 ? 1 : +i);
                for (var n = -1, s = 0 | Math.max(0, Math.ceil((e - t) / i)), o = new Array(s); ++n < s; )
                    o[n] = t + n * i;
                return o;
            }
            function He(t, e, i) {
                var n = Ze(t, e - u, i).concat(e);
                return function (t) {
                    return n.map(function (e) {
                        return [t, e];
                    });
                };
            }
            function We(t, e, i) {
                var n = Ze(t, e - u, i).concat(e);
                return function (t) {
                    return n.map(function (e) {
                        return [e, t];
                    });
                };
            }
            (Ye.className = "MapLineSeries"), (Ye.classNames = r.classNames.concat([Ye.className]));
            class Ue extends Ye {
                constructor() {
                    super(...arguments), (this._dataItem = this.makeDataItem({}));
                }
                _afterNew() {
                    super._afterNew(), this.dataItems.push(this._dataItem), this._generate();
                }
                _updateChildren() {
                    if (
                        (super._updateChildren(),
                        this.isDirty("step") && this._generate(),
                        this.isDirty("clipExtent") &&
                            (this._geoboundsDp && (this._geoboundsDp.dispose(), (this._geoboundsDp = void 0)),
                            this.get("clipExtent")))
                    ) {
                        const t = this.chart;
                        t &&
                            ((this._geoboundsDp = t.events.on("geoboundschanged", () => {
                                this._generate();
                            })),
                            this._disposers.push(this._geoboundsDp)),
                            this._generate();
                    }
                }
                _generate() {
                    let t = (function () {
                        var t,
                            e,
                            i,
                            n,
                            s,
                            o,
                            r,
                            a,
                            l,
                            h,
                            c,
                            d,
                            g = 10,
                            p = g,
                            f = 90,
                            _ = 360,
                            m = 2.5;
                        function y() {
                            return { type: "MultiLineString", coordinates: w() };
                        }
                        function w() {
                            return Ze(M(n / f) * f, i, f)
                                .map(c)
                                .concat(Ze(M(a / _) * _, r, _).map(d))
                                .concat(
                                    Ze(M(e / g) * g, t, g)
                                        .filter(function (t) {
                                            return v(t % f) > u;
                                        })
                                        .map(l)
                                )
                                .concat(
                                    Ze(M(o / p) * p, s, p)
                                        .filter(function (t) {
                                            return v(t % _) > u;
                                        })
                                        .map(h)
                                );
                        }
                        return (
                            (y.lines = function () {
                                return w().map(function (t) {
                                    return { type: "LineString", coordinates: t };
                                });
                            }),
                            (y.outline = function () {
                                return {
                                    type: "Polygon",
                                    coordinates: [
                                        c(n).concat(d(r).slice(1), c(i).reverse().slice(1), d(a).reverse().slice(1)),
                                    ],
                                };
                            }),
                            (y.extent = function (t) {
                                return arguments.length ? y.extentMajor(t).extentMinor(t) : y.extentMinor();
                            }),
                            (y.extentMajor = function (t) {
                                return arguments.length
                                    ? ((n = +t[0][0]),
                                      (i = +t[1][0]),
                                      (a = +t[0][1]),
                                      (r = +t[1][1]),
                                      n > i && ((t = n), (n = i), (i = t)),
                                      a > r && ((t = a), (a = r), (r = t)),
                                      y.precision(m))
                                    : [
                                          [n, a],
                                          [i, r],
                                      ];
                            }),
                            (y.extentMinor = function (i) {
                                return arguments.length
                                    ? ((e = +i[0][0]),
                                      (t = +i[1][0]),
                                      (o = +i[0][1]),
                                      (s = +i[1][1]),
                                      e > t && ((i = e), (e = t), (t = i)),
                                      o > s && ((i = o), (o = s), (s = i)),
                                      y.precision(m))
                                    : [
                                          [e, o],
                                          [t, s],
                                      ];
                            }),
                            (y.step = function (t) {
                                return arguments.length ? y.stepMajor(t).stepMinor(t) : y.stepMinor();
                            }),
                            (y.stepMajor = function (t) {
                                return arguments.length ? ((f = +t[0]), (_ = +t[1]), y) : [f, _];
                            }),
                            (y.stepMinor = function (t) {
                                return arguments.length ? ((g = +t[0]), (p = +t[1]), y) : [g, p];
                            }),
                            (y.precision = function (u) {
                                return arguments.length
                                    ? ((m = +u),
                                      (l = He(o, s, 90)),
                                      (h = We(e, t, m)),
                                      (c = He(a, r, 90)),
                                      (d = We(n, i, m)),
                                      y)
                                    : m;
                            }),
                            y
                                .extentMajor([
                                    [-180, -90 + u],
                                    [180, 90 - u],
                                ])
                                .extentMinor([
                                    [-180, -80 - u],
                                    [180, 80 + u],
                                ])
                        );
                    })();
                    if (t) {
                        if (this.get("clipExtent")) {
                            const e = this.chart;
                            if (e) {
                                const i = e.geoBounds();
                                i &&
                                    t.extent([
                                        [i.left, i.bottom],
                                        [i.right, i.top],
                                    ]);
                            }
                        }
                        const e = this.get("step", 10);
                        t.stepMinor([360, 360]), t.stepMajor([e, e]), this._dataItem.set("geometry", t());
                    }
                }
            }
            (Ue.className = "GraticuleSeries"), (Ue.classNames = Ye.classNames.concat([Ue.className]));
            var qe = i(5945),
                Ve = i(2975),
                Ke = i(2570);
            function Je() {
                var t,
                    e = [];
                return {
                    point: function (e, i, n) {
                        t.push([e, i, n]);
                    },
                    lineStart: function () {
                        e.push((t = []));
                    },
                    lineEnd: J,
                    rejoin: function () {
                        e.length > 1 && e.push(e.pop().concat(e.shift()));
                    },
                    result: function () {
                        var i = e;
                        return (e = []), (t = null), i;
                    },
                };
            }
            function $e(t, e) {
                return v(t[0] - e[0]) < u && v(t[1] - e[1]) < u;
            }
            function Qe(t, e, i, n) {
                (this.x = t), (this.z = e), (this.o = i), (this.e = n), (this.v = !1), (this.n = this.p = null);
            }
            function ti(t, e, i, n, s) {
                var o,
                    r,
                    a = [],
                    l = [];
                if (
                    (t.forEach(function (t) {
                        if (!((e = t.length - 1) <= 0)) {
                            var e,
                                i,
                                n = t[0],
                                r = t[e];
                            if ($e(n, r)) {
                                if (!n[2] && !r[2]) {
                                    for (s.lineStart(), o = 0; o < e; ++o) s.point((n = t[o])[0], n[1]);
                                    return void s.lineEnd();
                                }
                                r[0] += 2 * u;
                            }
                            a.push((i = new Qe(n, t, null, !0))),
                                l.push((i.o = new Qe(n, null, i, !1))),
                                a.push((i = new Qe(r, t, null, !1))),
                                l.push((i.o = new Qe(r, null, i, !0)));
                        }
                    }),
                    a.length)
                ) {
                    for (l.sort(e), ei(a), ei(l), o = 0, r = l.length; o < r; ++o) l[o].e = i = !i;
                    for (var h, c, d = a[0]; ; ) {
                        for (var g = d, p = !0; g.v; ) if ((g = g.n) === d) return;
                        (h = g.z), s.lineStart();
                        do {
                            if (((g.v = g.o.v = !0), g.e)) {
                                if (p) for (o = 0, r = h.length; o < r; ++o) s.point((c = h[o])[0], c[1]);
                                else n(g.x, g.n.x, 1, s);
                                g = g.n;
                            } else {
                                if (p) for (h = g.p.z, o = h.length - 1; o >= 0; --o) s.point((c = h[o])[0], c[1]);
                                else n(g.x, g.p.x, -1, s);
                                g = g.p;
                            }
                            (h = (g = g.o).z), (p = !p);
                        } while (!g.v);
                        s.lineEnd();
                    }
                }
            }
            function ei(t) {
                if ((e = t.length)) {
                    for (var e, i, n = 0, s = t[0]; ++n < e; ) (s.n = i = t[n]), (i.p = s), (s = i);
                    (s.n = i = t[0]), (i.p = s);
                }
            }
            function ii(t) {
                return v(t[0]) <= g ? t[0] : T(t[0]) * (((v(t[0]) + g) % _) - g);
            }
            function ni(t) {
                return Array.from(
                    (function* (t) {
                        for (const e of t) yield* e;
                    })(t)
                );
            }
            function si(t, e, i, n) {
                return function (s) {
                    var o,
                        r,
                        a,
                        l = e(s),
                        h = Je(),
                        c = e(h),
                        m = !1,
                        y = {
                            point: v,
                            lineStart: M,
                            lineEnd: P,
                            polygonStart: function () {
                                (y.point = S), (y.lineStart = I), (y.lineEnd = T), (r = []), (o = []);
                            },
                            polygonEnd: function () {
                                (y.point = v), (y.lineStart = M), (y.lineEnd = P), (r = ni(r));
                                var t = (function (t, e) {
                                    var i = ii(e),
                                        n = e[1],
                                        s = b(n),
                                        o = [b(i), -D(i), 0],
                                        r = 0,
                                        a = 0,
                                        l = new K();
                                    1 === s ? (n = p + u) : -1 === s && (n = -p - u);
                                    for (var h = 0, c = t.length; h < c; ++h)
                                        if ((y = (m = t[h]).length))
                                            for (
                                                var m,
                                                    y,
                                                    v = m[y - 1],
                                                    w = ii(v),
                                                    M = v[1] / 2 + f,
                                                    P = b(M),
                                                    S = D(M),
                                                    I = 0;
                                                I < y;
                                                ++I, w = k, P = L, S = N, v = T
                                            ) {
                                                var T = m[I],
                                                    k = ii(T),
                                                    C = T[1] / 2 + f,
                                                    L = b(C),
                                                    N = D(C),
                                                    E = k - w,
                                                    F = E >= 0 ? 1 : -1,
                                                    z = F * E,
                                                    G = z > g,
                                                    j = P * L;
                                                if (
                                                    (l.add(x(j * F * b(z), S * N + j * D(z))),
                                                    (r += G ? E + F * _ : E),
                                                    G ^ (w >= i) ^ (k >= i))
                                                ) {
                                                    var X = B(R(v), R(T));
                                                    O(X);
                                                    var Y = B(o, X);
                                                    O(Y);
                                                    var Z = (G ^ (E >= 0) ? -1 : 1) * A(Y[2]);
                                                    (n > Z || (n === Z && (X[0] || X[1]))) &&
                                                        (a += G ^ (E >= 0) ? 1 : -1);
                                                }
                                            }
                                    return (r < -u || (r < u && l < -d)) ^ (1 & a);
                                })(o, n);
                                r.length
                                    ? (m || (s.polygonStart(), (m = !0)), ti(r, ri, t, i, s))
                                    : t &&
                                      (m || (s.polygonStart(), (m = !0)),
                                      s.lineStart(),
                                      i(null, null, 1, s),
                                      s.lineEnd()),
                                    m && (s.polygonEnd(), (m = !1)),
                                    (r = o = null);
                            },
                            sphere: function () {
                                s.polygonStart(), s.lineStart(), i(null, null, 1, s), s.lineEnd(), s.polygonEnd();
                            },
                        };
                    function v(e, i) {
                        t(e, i) && s.point(e, i);
                    }
                    function w(t, e) {
                        l.point(t, e);
                    }
                    function M() {
                        (y.point = w), l.lineStart();
                    }
                    function P() {
                        (y.point = v), l.lineEnd();
                    }
                    function S(t, e) {
                        a.push([t, e]), c.point(t, e);
                    }
                    function I() {
                        c.lineStart(), (a = []);
                    }
                    function T() {
                        S(a[0][0], a[0][1]), c.lineEnd();
                        var t,
                            e,
                            i,
                            n,
                            l = c.clean(),
                            u = h.result(),
                            d = u.length;
                        if ((a.pop(), o.push(a), (a = null), d))
                            if (1 & l) {
                                if ((e = (i = u[0]).length - 1) > 0) {
                                    for (m || (s.polygonStart(), (m = !0)), s.lineStart(), t = 0; t < e; ++t)
                                        s.point((n = i[t])[0], n[1]);
                                    s.lineEnd();
                                }
                            } else d > 1 && 2 & l && u.push(u.pop().concat(u.shift())), r.push(u.filter(oi));
                    }
                    return y;
                };
            }
            function oi(t) {
                return t.length > 1;
            }
            function ri(t, e) {
                return ((t = t.x)[0] < 0 ? t[1] - p - u : p - t[1]) - ((e = e.x)[0] < 0 ? e[1] - p - u : p - e[1]);
            }
            var ai = si(
                    function () {
                        return !0;
                    },
                    function (t) {
                        var e,
                            i = NaN,
                            n = NaN,
                            s = NaN;
                        return {
                            lineStart: function () {
                                t.lineStart(), (e = 1);
                            },
                            point: function (o, r) {
                                var a = o > 0 ? g : -g,
                                    l = v(o - i);
                                v(l - g) < u
                                    ? (t.point(i, (n = (n + r) / 2 > 0 ? p : -p)),
                                      t.point(s, n),
                                      t.lineEnd(),
                                      t.lineStart(),
                                      t.point(a, n),
                                      t.point(o, n),
                                      (e = 0))
                                    : s !== a &&
                                      l >= g &&
                                      (v(i - s) < u && (i -= s * u),
                                      v(o - a) < u && (o -= a * u),
                                      (n = (function (t, e, i, n) {
                                          var s,
                                              o,
                                              r = b(t - i);
                                          return v(r) > u
                                              ? w((b(e) * (o = D(n)) * b(i) - b(n) * (s = D(e)) * b(t)) / (s * o * r))
                                              : (e + n) / 2;
                                      })(i, n, o, r)),
                                      t.point(s, n),
                                      t.lineEnd(),
                                      t.lineStart(),
                                      t.point(a, n),
                                      (e = 0)),
                                    t.point((i = o), (n = r)),
                                    (s = a);
                            },
                            lineEnd: function () {
                                t.lineEnd(), (i = n = NaN);
                            },
                            clean: function () {
                                return 2 - e;
                            },
                        };
                    },
                    function (t, e, i, n) {
                        var s;
                        if (null == t)
                            (s = i * p),
                                n.point(-g, s),
                                n.point(0, s),
                                n.point(g, s),
                                n.point(g, 0),
                                n.point(g, -s),
                                n.point(0, -s),
                                n.point(-g, -s),
                                n.point(-g, 0),
                                n.point(-g, s);
                        else if (v(t[0] - e[0]) > u) {
                            var o = t[0] < e[0] ? g : -g;
                            (s = (i * o) / 2), n.point(-o, s), n.point(0, s), n.point(o, s);
                        } else n.point(e[0], e[1]);
                    },
                    [-g, -p]
                ),
                li = 1e9,
                hi = -li;
            var ci = (t) => t;
            function ui(t) {
                return function (e) {
                    var i = new di();
                    for (var n in t) i[n] = t[n];
                    return (i.stream = e), i;
                };
            }
            function di() {}
            di.prototype = {
                constructor: di,
                point: function (t, e) {
                    this.stream.point(t, e);
                },
                sphere: function () {
                    this.stream.sphere();
                },
                lineStart: function () {
                    this.stream.lineStart();
                },
                lineEnd: function () {
                    this.stream.lineEnd();
                },
                polygonStart: function () {
                    this.stream.polygonStart();
                },
                polygonEnd: function () {
                    this.stream.polygonEnd();
                },
            };
            var gi = 1 / 0,
                pi = gi,
                fi = -gi,
                _i = fi,
                mi = {
                    point: function (t, e) {
                        t < gi && (gi = t), t > fi && (fi = t), e < pi && (pi = e), e > _i && (_i = e);
                    },
                    lineStart: J,
                    lineEnd: J,
                    polygonStart: J,
                    polygonEnd: J,
                    result: function () {
                        var t = [
                            [gi, pi],
                            [fi, _i],
                        ];
                        return (fi = _i = -(pi = gi = 1 / 0)), t;
                    },
                },
                yi = mi;
            function vi(t, e, i) {
                var n = t.clipExtent && t.clipExtent();
                return (
                    t.scale(150).translate([0, 0]),
                    null != n && t.clipExtent(null),
                    vt(i, t.stream(yi)),
                    e(yi.result()),
                    null != n && t.clipExtent(n),
                    t
                );
            }
            function wi(t, e, i) {
                return vi(
                    t,
                    function (i) {
                        var n = e[1][0] - e[0][0],
                            s = e[1][1] - e[0][1],
                            o = Math.min(n / (i[1][0] - i[0][0]), s / (i[1][1] - i[0][1])),
                            r = +e[0][0] + (n - o * (i[1][0] + i[0][0])) / 2,
                            a = +e[0][1] + (s - o * (i[1][1] + i[0][1])) / 2;
                        t.scale(150 * o).translate([r, a]);
                    },
                    i
                );
            }
            function xi(t, e, i) {
                return wi(t, [[0, 0], e], i);
            }
            function Di(t, e, i) {
                return vi(
                    t,
                    function (i) {
                        var n = +e,
                            s = n / (i[1][0] - i[0][0]),
                            o = (n - s * (i[1][0] + i[0][0])) / 2,
                            r = -s * i[0][1];
                        t.scale(150 * s).translate([o, r]);
                    },
                    i
                );
            }
            function Mi(t, e, i) {
                return vi(
                    t,
                    function (i) {
                        var n = +e,
                            s = n / (i[1][1] - i[0][1]),
                            o = -s * i[0][0],
                            r = (n - s * (i[1][1] + i[0][1])) / 2;
                        t.scale(150 * s).translate([o, r]);
                    },
                    i
                );
            }
            var Pi = D(30 * y);
            function Si(t, e) {
                return +e
                    ? (function (t, e) {
                          function i(n, s, o, r, a, l, h, c, d, g, p, f, _, m) {
                              var y = h - n,
                                  w = c - s,
                                  D = y * y + w * w;
                              if (D > 4 * e && _--) {
                                  var M = r + g,
                                      P = a + p,
                                      S = l + f,
                                      I = k(M * M + P * P + S * S),
                                      b = A((S /= I)),
                                      T = v(v(S) - 1) < u || v(o - d) < u ? (o + d) / 2 : x(P, M),
                                      C = t(T, b),
                                      L = C[0],
                                      N = C[1],
                                      R = L - n,
                                      E = N - s,
                                      B = w * R - y * E;
                                  ((B * B) / D > e ||
                                      v((y * R + w * E) / D - 0.5) > 0.3 ||
                                      r * g + a * p + l * f < Pi) &&
                                      (i(n, s, o, r, a, l, L, N, T, (M /= I), (P /= I), S, _, m),
                                      m.point(L, N),
                                      i(L, N, T, M, P, S, h, c, d, g, p, f, _, m));
                              }
                          }
                          return function (e) {
                              var n,
                                  s,
                                  o,
                                  r,
                                  a,
                                  l,
                                  h,
                                  c,
                                  u,
                                  d,
                                  g,
                                  p,
                                  f = {
                                      point: _,
                                      lineStart: m,
                                      lineEnd: v,
                                      polygonStart: function () {
                                          e.polygonStart(), (f.lineStart = w);
                                      },
                                      polygonEnd: function () {
                                          e.polygonEnd(), (f.lineStart = m);
                                      },
                                  };
                              function _(i, n) {
                                  (i = t(i, n)), e.point(i[0], i[1]);
                              }
                              function m() {
                                  (c = NaN), (f.point = y), e.lineStart();
                              }
                              function y(n, s) {
                                  var o = R([n, s]),
                                      r = t(n, s);
                                  i(
                                      c,
                                      u,
                                      h,
                                      d,
                                      g,
                                      p,
                                      (c = r[0]),
                                      (u = r[1]),
                                      (h = n),
                                      (d = o[0]),
                                      (g = o[1]),
                                      (p = o[2]),
                                      16,
                                      e
                                  ),
                                      e.point(c, u);
                              }
                              function v() {
                                  (f.point = _), e.lineEnd();
                              }
                              function w() {
                                  m(), (f.point = x), (f.lineEnd = D);
                              }
                              function x(t, e) {
                                  y((n = t), e), (s = c), (o = u), (r = d), (a = g), (l = p), (f.point = y);
                              }
                              function D() {
                                  i(c, u, h, d, g, p, s, o, n, r, a, l, 16, e), (f.lineEnd = v), v();
                              }
                              return f;
                          };
                      })(t, e)
                    : (function (t) {
                          return ui({
                              point: function (e, i) {
                                  (e = t(e, i)), this.stream.point(e[0], e[1]);
                              },
                          });
                      })(t);
            }
            var Ii = ui({
                point: function (t, e) {
                    this.stream.point(t * y, e * y);
                },
            });
            function bi(t, e, i, n, s, o) {
                if (!o)
                    return (function (t, e, i, n, s) {
                        function o(o, r) {
                            return [e + t * (o *= n), i - t * (r *= s)];
                        }
                        return (
                            (o.invert = function (o, r) {
                                return [((o - e) / t) * n, ((i - r) / t) * s];
                            }),
                            o
                        );
                    })(t, e, i, n, s);
                var r = D(o),
                    a = b(o),
                    l = r * t,
                    h = a * t,
                    c = r / t,
                    u = a / t,
                    d = (a * i - r * e) / t,
                    g = (a * e + r * i) / t;
                function p(t, o) {
                    return [l * (t *= n) - h * (o *= s) + e, i - h * t - l * o];
                }
                return (
                    (p.invert = function (t, e) {
                        return [n * (c * t - u * e + d), s * (g - u * t - c * e)];
                    }),
                    p
                );
            }
            function Ti(t) {
                return ki(function () {
                    return t;
                })();
            }
            function ki(t) {
                var e,
                    i,
                    n,
                    s,
                    o,
                    r,
                    a,
                    l,
                    h,
                    c,
                    d = 150,
                    p = 480,
                    f = 250,
                    _ = 0,
                    w = 0,
                    x = 0,
                    M = 0,
                    P = 0,
                    S = 0,
                    I = 1,
                    b = 1,
                    T = null,
                    C = ai,
                    A = null,
                    L = ci,
                    O = 0.5;
                function G(t) {
                    return l(t[0] * y, t[1] * y);
                }
                function X(t) {
                    return (t = l.invert(t[0], t[1])) && [t[0] * m, t[1] * m];
                }
                function Z() {
                    var t = bi(d, 0, 0, I, b, S).apply(null, e(_, w)),
                        n = bi(d, p - t[0], f - t[1], I, b, S);
                    return (i = Y(x, M, P)), (a = j(e, n)), (l = j(i, a)), (r = Si(a, O)), H();
                }
                function H() {
                    return (h = c = null), G;
                }
                return (
                    (G.stream = function (t) {
                        return h && c === t
                            ? h
                            : (h = Ii(
                                  (function (t) {
                                      return ui({
                                          point: function (e, i) {
                                              var n = t(e, i);
                                              return this.stream.point(n[0], n[1]);
                                          },
                                      });
                                  })(i)(C(r(L((c = t)))))
                              ));
                    }),
                    (G.preclip = function (t) {
                        return arguments.length ? ((C = t), (T = void 0), H()) : C;
                    }),
                    (G.postclip = function (t) {
                        return arguments.length ? ((L = t), (A = n = s = o = null), H()) : L;
                    }),
                    (G.clipAngle = function (t) {
                        return arguments.length
                            ? ((C = +t
                                  ? (function (t) {
                                        var e = D(t),
                                            i = 2 * y,
                                            n = e > 0,
                                            s = v(e) > u;
                                        function o(t, i) {
                                            return D(t) * D(i) > e;
                                        }
                                        function r(t, i, n) {
                                            var s = [1, 0, 0],
                                                o = B(R(t), R(i)),
                                                r = E(o, o),
                                                a = o[0],
                                                l = r - a * a;
                                            if (!l) return !n && t;
                                            var h = (e * r) / l,
                                                c = (-e * a) / l,
                                                d = B(s, o),
                                                p = z(s, h);
                                            F(p, z(o, c));
                                            var f = d,
                                                _ = E(p, f),
                                                m = E(f, f),
                                                y = _ * _ - m * (E(p, p) - 1);
                                            if (!(y < 0)) {
                                                var w = k(y),
                                                    x = z(f, (-_ - w) / m);
                                                if ((F(x, p), (x = N(x)), !n)) return x;
                                                var D,
                                                    M = t[0],
                                                    P = i[0],
                                                    S = t[1],
                                                    I = i[1];
                                                P < M && ((D = M), (M = P), (P = D));
                                                var b = P - M,
                                                    T = v(b - g) < u;
                                                if (
                                                    (!T && I < S && ((D = S), (S = I), (I = D)),
                                                    T || b < u
                                                        ? T
                                                            ? (S + I > 0) ^ (x[1] < (v(x[0] - M) < u ? S : I))
                                                            : S <= x[1] && x[1] <= I
                                                        : (b > g) ^ (M <= x[0] && x[0] <= P))
                                                ) {
                                                    var C = z(f, (-_ + w) / m);
                                                    return F(C, p), [x, N(C)];
                                                }
                                            }
                                        }
                                        function a(e, i) {
                                            var s = n ? t : g - t,
                                                o = 0;
                                            return (
                                                e < -s ? (o |= 1) : e > s && (o |= 2),
                                                i < -s ? (o |= 4) : i > s && (o |= 8),
                                                o
                                            );
                                        }
                                        return si(
                                            o,
                                            function (t) {
                                                var e, i, l, h, c;
                                                return {
                                                    lineStart: function () {
                                                        (h = l = !1), (c = 1);
                                                    },
                                                    point: function (u, d) {
                                                        var p,
                                                            f = [u, d],
                                                            _ = o(u, d),
                                                            m = n
                                                                ? _
                                                                    ? 0
                                                                    : a(u, d)
                                                                : _
                                                                  ? a(u + (u < 0 ? g : -g), d)
                                                                  : 0;
                                                        if (
                                                            (!e && (h = l = _) && t.lineStart(),
                                                            _ !== l &&
                                                                (!(p = r(e, f)) || $e(e, p) || $e(f, p)) &&
                                                                (f[2] = 1),
                                                            _ !== l)
                                                        )
                                                            (c = 0),
                                                                _
                                                                    ? (t.lineStart(),
                                                                      (p = r(f, e)),
                                                                      t.point(p[0], p[1]))
                                                                    : ((p = r(e, f)),
                                                                      t.point(p[0], p[1], 2),
                                                                      t.lineEnd()),
                                                                (e = p);
                                                        else if (s && e && n ^ _) {
                                                            var y;
                                                            m & i ||
                                                                !(y = r(f, e, !0)) ||
                                                                ((c = 0),
                                                                n
                                                                    ? (t.lineStart(),
                                                                      t.point(y[0][0], y[0][1]),
                                                                      t.point(y[1][0], y[1][1]),
                                                                      t.lineEnd())
                                                                    : (t.point(y[1][0], y[1][1]),
                                                                      t.lineEnd(),
                                                                      t.lineStart(),
                                                                      t.point(y[0][0], y[0][1], 3)));
                                                        }
                                                        !_ || (e && $e(e, f)) || t.point(f[0], f[1]),
                                                            (e = f),
                                                            (l = _),
                                                            (i = m);
                                                    },
                                                    lineEnd: function () {
                                                        l && t.lineEnd(), (e = null);
                                                    },
                                                    clean: function () {
                                                        return c | ((h && l) << 1);
                                                    },
                                                };
                                            },
                                            function (e, n, s, o) {
                                                q(o, t, i, s, e, n);
                                            },
                                            n ? [0, -t] : [-g, t - g]
                                        );
                                    })((T = t * y))
                                  : ((T = null), ai)),
                              H())
                            : T * m;
                    }),
                    (G.clipExtent = function (t) {
                        return arguments.length
                            ? ((L =
                                  null == t
                                      ? ((A = n = s = o = null), ci)
                                      : (function (t, e, i, n) {
                                            function s(s, o) {
                                                return t <= s && s <= i && e <= o && o <= n;
                                            }
                                            function o(s, o, a, h) {
                                                var c = 0,
                                                    u = 0;
                                                if (
                                                    null == s ||
                                                    (c = r(s, a)) !== (u = r(o, a)) ||
                                                    (l(s, o) < 0) ^ (a > 0)
                                                )
                                                    do {
                                                        h.point(0 === c || 3 === c ? t : i, c > 1 ? n : e);
                                                    } while ((c = (c + a + 4) % 4) !== u);
                                                else h.point(o[0], o[1]);
                                            }
                                            function r(n, s) {
                                                return v(n[0] - t) < u
                                                    ? s > 0
                                                        ? 0
                                                        : 3
                                                    : v(n[0] - i) < u
                                                      ? s > 0
                                                          ? 2
                                                          : 1
                                                      : v(n[1] - e) < u
                                                        ? s > 0
                                                            ? 1
                                                            : 0
                                                        : s > 0
                                                          ? 3
                                                          : 2;
                                            }
                                            function a(t, e) {
                                                return l(t.x, e.x);
                                            }
                                            function l(t, e) {
                                                var i = r(t, 1),
                                                    n = r(e, 1);
                                                return i !== n
                                                    ? i - n
                                                    : 0 === i
                                                      ? e[1] - t[1]
                                                      : 1 === i
                                                        ? t[0] - e[0]
                                                        : 2 === i
                                                          ? t[1] - e[1]
                                                          : e[0] - t[0];
                                            }
                                            return function (r) {
                                                var l,
                                                    h,
                                                    c,
                                                    u,
                                                    d,
                                                    g,
                                                    p,
                                                    f,
                                                    _,
                                                    m,
                                                    y,
                                                    v = r,
                                                    w = Je(),
                                                    x = {
                                                        point: D,
                                                        lineStart: function () {
                                                            (x.point = M),
                                                                h && h.push((c = [])),
                                                                (m = !0),
                                                                (_ = !1),
                                                                (p = f = NaN);
                                                        },
                                                        lineEnd: function () {
                                                            l && (M(u, d), g && _ && w.rejoin(), l.push(w.result())),
                                                                (x.point = D),
                                                                _ && v.lineEnd();
                                                        },
                                                        polygonStart: function () {
                                                            (v = w), (l = []), (h = []), (y = !0);
                                                        },
                                                        polygonEnd: function () {
                                                            var e = (function () {
                                                                    for (var e = 0, i = 0, s = h.length; i < s; ++i)
                                                                        for (
                                                                            var o,
                                                                                r,
                                                                                a = h[i],
                                                                                l = 1,
                                                                                c = a.length,
                                                                                u = a[0],
                                                                                d = u[0],
                                                                                g = u[1];
                                                                            l < c;
                                                                            ++l
                                                                        )
                                                                            (o = d),
                                                                                (r = g),
                                                                                (d = (u = a[l])[0]),
                                                                                (g = u[1]),
                                                                                r <= n
                                                                                    ? g > n &&
                                                                                      (d - o) * (n - r) >
                                                                                          (g - r) * (t - o) &&
                                                                                      ++e
                                                                                    : g <= n &&
                                                                                      (d - o) * (n - r) <
                                                                                          (g - r) * (t - o) &&
                                                                                      --e;
                                                                    return e;
                                                                })(),
                                                                i = y && e,
                                                                s = (l = ni(l)).length;
                                                            (i || s) &&
                                                                (r.polygonStart(),
                                                                i && (r.lineStart(), o(null, null, 1, r), r.lineEnd()),
                                                                s && ti(l, a, e, o, r),
                                                                r.polygonEnd()),
                                                                (v = r),
                                                                (l = h = c = null);
                                                        },
                                                    };
                                                function D(t, e) {
                                                    s(t, e) && v.point(t, e);
                                                }
                                                function M(o, r) {
                                                    var a = s(o, r);
                                                    if ((h && c.push([o, r]), m))
                                                        (u = o),
                                                            (d = r),
                                                            (g = a),
                                                            (m = !1),
                                                            a && (v.lineStart(), v.point(o, r));
                                                    else if (a && _) v.point(o, r);
                                                    else {
                                                        var l = [
                                                                (p = Math.max(hi, Math.min(li, p))),
                                                                (f = Math.max(hi, Math.min(li, f))),
                                                            ],
                                                            w = [
                                                                (o = Math.max(hi, Math.min(li, o))),
                                                                (r = Math.max(hi, Math.min(li, r))),
                                                            ];
                                                        !(function (t, e, i, n, s, o) {
                                                            var r,
                                                                a = t[0],
                                                                l = t[1],
                                                                h = 0,
                                                                c = 1,
                                                                u = e[0] - a,
                                                                d = e[1] - l;
                                                            if (((r = i - a), u || !(r > 0))) {
                                                                if (((r /= u), u < 0)) {
                                                                    if (r < h) return;
                                                                    r < c && (c = r);
                                                                } else if (u > 0) {
                                                                    if (r > c) return;
                                                                    r > h && (h = r);
                                                                }
                                                                if (((r = s - a), u || !(r < 0))) {
                                                                    if (((r /= u), u < 0)) {
                                                                        if (r > c) return;
                                                                        r > h && (h = r);
                                                                    } else if (u > 0) {
                                                                        if (r < h) return;
                                                                        r < c && (c = r);
                                                                    }
                                                                    if (((r = n - l), d || !(r > 0))) {
                                                                        if (((r /= d), d < 0)) {
                                                                            if (r < h) return;
                                                                            r < c && (c = r);
                                                                        } else if (d > 0) {
                                                                            if (r > c) return;
                                                                            r > h && (h = r);
                                                                        }
                                                                        if (((r = o - l), d || !(r < 0))) {
                                                                            if (((r /= d), d < 0)) {
                                                                                if (r > c) return;
                                                                                r > h && (h = r);
                                                                            } else if (d > 0) {
                                                                                if (r < h) return;
                                                                                r < c && (c = r);
                                                                            }
                                                                            return (
                                                                                h > 0 &&
                                                                                    ((t[0] = a + h * u),
                                                                                    (t[1] = l + h * d)),
                                                                                c < 1 &&
                                                                                    ((e[0] = a + c * u),
                                                                                    (e[1] = l + c * d)),
                                                                                !0
                                                                            );
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        })(l, w, t, e, i, n)
                                                            ? a && (v.lineStart(), v.point(o, r), (y = !1))
                                                            : (_ || (v.lineStart(), v.point(l[0], l[1])),
                                                              v.point(w[0], w[1]),
                                                              a || v.lineEnd(),
                                                              (y = !1));
                                                    }
                                                    (p = o), (f = r), (_ = a);
                                                }
                                                return x;
                                            };
                                        })((A = +t[0][0]), (n = +t[0][1]), (s = +t[1][0]), (o = +t[1][1]))),
                              H())
                            : null == A
                              ? null
                              : [
                                    [A, n],
                                    [s, o],
                                ];
                    }),
                    (G.scale = function (t) {
                        return arguments.length ? ((d = +t), Z()) : d;
                    }),
                    (G.translate = function (t) {
                        return arguments.length ? ((p = +t[0]), (f = +t[1]), Z()) : [p, f];
                    }),
                    (G.center = function (t) {
                        return arguments.length
                            ? ((_ = (t[0] % 360) * y), (w = (t[1] % 360) * y), Z())
                            : [_ * m, w * m];
                    }),
                    (G.rotate = function (t) {
                        return arguments.length
                            ? ((x = (t[0] % 360) * y),
                              (M = (t[1] % 360) * y),
                              (P = t.length > 2 ? (t[2] % 360) * y : 0),
                              Z())
                            : [x * m, M * m, P * m];
                    }),
                    (G.angle = function (t) {
                        return arguments.length ? ((S = (t % 360) * y), Z()) : S * m;
                    }),
                    (G.reflectX = function (t) {
                        return arguments.length ? ((I = t ? -1 : 1), Z()) : I < 0;
                    }),
                    (G.reflectY = function (t) {
                        return arguments.length ? ((b = t ? -1 : 1), Z()) : b < 0;
                    }),
                    (G.precision = function (t) {
                        return arguments.length ? ((r = Si(a, (O = t * t))), H()) : k(O);
                    }),
                    (G.fitExtent = function (t, e) {
                        return wi(G, t, e);
                    }),
                    (G.fitSize = function (t, e) {
                        return xi(G, t, e);
                    }),
                    (G.fitWidth = function (t, e) {
                        return Di(G, t, e);
                    }),
                    (G.fitHeight = function (t, e) {
                        return Mi(G, t, e);
                    }),
                    function () {
                        return (e = t.apply(this, arguments)), (G.invert = e.invert && X), Z();
                    }
                );
            }
            function Ci(t, e) {
                return [t, I(C((p + e) / 2))];
            }
            function Ai() {
                return (function (t) {
                    var e,
                        i,
                        n,
                        s = Ti(t),
                        o = s.center,
                        r = s.scale,
                        a = s.translate,
                        l = s.clipExtent,
                        h = null;
                    function c() {
                        var o = g * r(),
                            a = s(U(s.rotate()).invert([0, 0]));
                        return l(
                            null == h
                                ? [
                                      [a[0] - o, a[1] - o],
                                      [a[0] + o, a[1] + o],
                                  ]
                                : t === Ci
                                  ? [
                                        [Math.max(a[0] - o, h), e],
                                        [Math.min(a[0] + o, i), n],
                                    ]
                                  : [
                                        [h, Math.max(a[1] - o, e)],
                                        [i, Math.min(a[1] + o, n)],
                                    ]
                        );
                    }
                    return (
                        (s.scale = function (t) {
                            return arguments.length ? (r(t), c()) : r();
                        }),
                        (s.translate = function (t) {
                            return arguments.length ? (a(t), c()) : a();
                        }),
                        (s.center = function (t) {
                            return arguments.length ? (o(t), c()) : o();
                        }),
                        (s.clipExtent = function (t) {
                            return arguments.length
                                ? (null == t
                                      ? (h = e = i = n = null)
                                      : ((h = +t[0][0]), (e = +t[0][1]), (i = +t[1][0]), (n = +t[1][1])),
                                  c())
                                : null == h
                                  ? null
                                  : [
                                        [h, e],
                                        [i, n],
                                    ];
                        }),
                        c()
                    );
                })(Ci).scale(961 / _);
            }
            Ci.invert = function (t, e) {
                return [t, 2 * w(P(e)) - p];
            };
            var Li = i(8363);
            class Ni extends qe.S {
                setupDefaultRules() {
                    super.setupDefaultRules();
                    const t = this._root.interfaceColors,
                        e = this.rule.bind(this);
                    e("MapChart").setAll({
                        projection: Ai(),
                        panX: "translateX",
                        panY: "translateY",
                        pinchZoom: !0,
                        zoomStep: 2,
                        zoomLevel: 1,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        maxZoomLevel: 32,
                        minZoomLevel: 1,
                        wheelY: "zoom",
                        wheelX: "none",
                        animationEasing: Li.out(Li.cubic),
                        wheelEasing: Li.out(Li.cubic),
                        wheelDuration: 0,
                        wheelSensitivity: 1,
                        maxPanOut: 0.4,
                        centerMapOnZoomOut: !0,
                        doubleClickZoom: !0,
                        boxZoom: "none",
                    });
                    {
                        const i = e("Rectangle", ["map", "selection"]);
                        i.setAll({ fillOpacity: 0.15, strokeOpacity: 0.8, strokeDasharray: [4, 4] }),
                            (0, Ve.w)(i, "fill", t, "alternativeBackground"),
                            (0, Ve.w)(i, "stroke", t, "alternativeBackground");
                    }
                    {
                        const i = e("MapLine");
                        i.setAll({ precision: 0.5, role: "figure" }), (0, Ve.w)(i, "stroke", t, "grid");
                    }
                    e("MapPolygonSeries").setAll({ affectsBounds: !0 }),
                        e("MapPointSeries").setAll({ affectsBounds: !1, clipFront: !1, clipBack: !0, autoScale: !1 }),
                        e("ClusteredPointSeries").setAll({
                            minDistance: 20,
                            scatterDistance: 3,
                            scatterRadius: 8,
                            stopClusterZoom: 0.95,
                        }),
                        e("MapLineSeries").setAll({ affectsBounds: !1 }),
                        e("MapSankeySeries").setAll({ affectsBounds: !1 });
                    {
                        const i = e("MapPolygon");
                        i.setAll({
                            precision: 0.5,
                            isMeasured: !1,
                            role: "figure",
                            fillOpacity: 1,
                            position: "absolute",
                            strokeWidth: 0.2,
                            strokeOpacity: 1,
                        }),
                            (0, Ve.w)(i, "fill", t, "primaryButton"),
                            (0, Ve.w)(i, "stroke", t, "background");
                    }
                    e("Button", ["zoomtools", "home"]).setAll({ visible: !1 }),
                        e("GraticuleSeries").setAll({ step: 10 }),
                        e("NightSeries").setAll({ affectsBounds: !1 }),
                        e("MapPolygon", ["pixel"]).setAll({ strokeWidth: 0 }),
                        e("MapPolygon", ["night"]).setAll({
                            fill: Ke.Q1.fromHex(0),
                            fillOpacity: 0.5,
                            strokeOpacity: 0,
                        }),
                        e("Circle", ["night", "sun"]).setAll({
                            radius: 8,
                            fill: Ke.Q1.fromHex(16759296),
                            shadowColor: Ke.Q1.fromHex(16759296),
                            shadowBlur: 16,
                            shadowOpacity: 1,
                        });
                }
            }
            var Ri,
                Ei,
                Bi,
                Fi,
                zi = i(7197),
                Oi = i(2544),
                Gi = new K(),
                ji = new K(),
                Xi = {
                    point: J,
                    lineStart: J,
                    lineEnd: J,
                    polygonStart: function () {
                        (Xi.lineStart = Yi), (Xi.lineEnd = Wi);
                    },
                    polygonEnd: function () {
                        (Xi.lineStart = Xi.lineEnd = Xi.point = J), Gi.add(v(ji)), (ji = new K());
                    },
                    result: function () {
                        var t = Gi / 2;
                        return (Gi = new K()), t;
                    },
                };
            function Yi() {
                Xi.point = Zi;
            }
            function Zi(t, e) {
                (Xi.point = Hi), (Ri = Bi = t), (Ei = Fi = e);
            }
            function Hi(t, e) {
                ji.add(Fi * t - Bi * e), (Bi = t), (Fi = e);
            }
            function Wi() {
                Hi(Ri, Ei);
            }
            var Ui,
                qi,
                Vi,
                Ki,
                Ji = Xi,
                $i = 0,
                Qi = 0,
                tn = 0,
                en = 0,
                nn = 0,
                sn = 0,
                on = 0,
                rn = 0,
                an = 0,
                ln = {
                    point: hn,
                    lineStart: cn,
                    lineEnd: gn,
                    polygonStart: function () {
                        (ln.lineStart = pn), (ln.lineEnd = fn);
                    },
                    polygonEnd: function () {
                        (ln.point = hn), (ln.lineStart = cn), (ln.lineEnd = gn);
                    },
                    result: function () {
                        var t = an
                            ? [on / an, rn / an]
                            : sn
                              ? [en / sn, nn / sn]
                              : tn
                                ? [$i / tn, Qi / tn]
                                : [NaN, NaN];
                        return ($i = Qi = tn = en = nn = sn = on = rn = an = 0), t;
                    },
                };
            function hn(t, e) {
                ($i += t), (Qi += e), ++tn;
            }
            function cn() {
                ln.point = un;
            }
            function un(t, e) {
                (ln.point = dn), hn((Vi = t), (Ki = e));
            }
            function dn(t, e) {
                var i = t - Vi,
                    n = e - Ki,
                    s = k(i * i + n * n);
                (en += (s * (Vi + t)) / 2), (nn += (s * (Ki + e)) / 2), (sn += s), hn((Vi = t), (Ki = e));
            }
            function gn() {
                ln.point = hn;
            }
            function pn() {
                ln.point = _n;
            }
            function fn() {
                mn(Ui, qi);
            }
            function _n(t, e) {
                (ln.point = mn), hn((Ui = Vi = t), (qi = Ki = e));
            }
            function mn(t, e) {
                var i = t - Vi,
                    n = e - Ki,
                    s = k(i * i + n * n);
                (en += (s * (Vi + t)) / 2),
                    (nn += (s * (Ki + e)) / 2),
                    (sn += s),
                    (on += (s = Ki * t - Vi * e) * (Vi + t)),
                    (rn += s * (Ki + e)),
                    (an += 3 * s),
                    hn((Vi = t), (Ki = e));
            }
            var yn = ln;
            function vn(t) {
                this._context = t;
            }
            vn.prototype = {
                _radius: 4.5,
                pointRadius: function (t) {
                    return (this._radius = t), this;
                },
                polygonStart: function () {
                    this._line = 0;
                },
                polygonEnd: function () {
                    this._line = NaN;
                },
                lineStart: function () {
                    this._point = 0;
                },
                lineEnd: function () {
                    0 === this._line && this._context.closePath(), (this._point = NaN);
                },
                point: function (t, e) {
                    switch (this._point) {
                        case 0:
                            this._context.moveTo(t, e), (this._point = 1);
                            break;
                        case 1:
                            this._context.lineTo(t, e);
                            break;
                        default:
                            this._context.moveTo(t + this._radius, e), this._context.arc(t, e, this._radius, 0, _);
                    }
                },
                result: J,
            };
            var wn,
                xn,
                Dn,
                Mn,
                Pn,
                Sn = new K(),
                In = {
                    point: J,
                    lineStart: function () {
                        In.point = bn;
                    },
                    lineEnd: function () {
                        wn && Tn(xn, Dn), (In.point = J);
                    },
                    polygonStart: function () {
                        wn = !0;
                    },
                    polygonEnd: function () {
                        wn = null;
                    },
                    result: function () {
                        var t = +Sn;
                        return (Sn = new K()), t;
                    },
                };
            function bn(t, e) {
                (In.point = Tn), (xn = Mn = t), (Dn = Pn = e);
            }
            function Tn(t, e) {
                (Mn -= t), (Pn -= e), Sn.add(k(Mn * Mn + Pn * Pn)), (Mn = t), (Pn = e);
            }
            var kn = In;
            let Cn, An, Ln, Nn;
            class Rn {
                constructor(t) {
                    (this._append =
                        null == t
                            ? En
                            : (function (t) {
                                  const e = Math.floor(t);
                                  if (!(e >= 0)) throw new RangeError(`invalid digits: ${t}`);
                                  if (e > 15) return En;
                                  if (e !== Cn) {
                                      const t = 10 ** e;
                                      (Cn = e),
                                          (An = function (e) {
                                              let i = 1;
                                              this._ += e[0];
                                              for (const n = e.length; i < n; ++i)
                                                  this._ += Math.round(arguments[i] * t) / t + e[i];
                                          });
                                  }
                                  return An;
                              })(t)),
                        (this._radius = 4.5),
                        (this._ = "");
                }
                pointRadius(t) {
                    return (this._radius = +t), this;
                }
                polygonStart() {
                    this._line = 0;
                }
                polygonEnd() {
                    this._line = NaN;
                }
                lineStart() {
                    this._point = 0;
                }
                lineEnd() {
                    0 === this._line && (this._ += "Z"), (this._point = NaN);
                }
                point(t, e) {
                    switch (this._point) {
                        case 0:
                            this._append`M${t},${e}`, (this._point = 1);
                            break;
                        case 1:
                            this._append`L${t},${e}`;
                            break;
                        default:
                            if ((this._append`M${t},${e}`, this._radius !== Ln || this._append !== An)) {
                                const t = this._radius,
                                    e = this._;
                                (this._ = ""),
                                    this._append`m0,${t}a${t},${t} 0 1,1 0,${-2 * t}a${t},${t} 0 1,1 0,${2 * t}z`,
                                    (Ln = t),
                                    (An = this._append),
                                    (Nn = this._),
                                    (this._ = e);
                            }
                            this._ += Nn;
                    }
                }
                result() {
                    const t = this._;
                    return (this._ = ""), t.length ? t : null;
                }
            }
            function En(t) {
                let e = 1;
                this._ += t[0];
                for (const i = t.length; e < i; ++e) this._ += arguments[e] + t[e];
            }
            function Bn(t, e) {
                let i,
                    n,
                    s = 3,
                    o = 4.5;
                function r(t) {
                    return (
                        t && ("function" == typeof o && n.pointRadius(+o.apply(this, arguments)), vt(t, i(n))),
                        n.result()
                    );
                }
                return (
                    (r.area = function (t) {
                        return vt(t, i(Ji)), Ji.result();
                    }),
                    (r.measure = function (t) {
                        return vt(t, i(kn)), kn.result();
                    }),
                    (r.bounds = function (t) {
                        return vt(t, i(yi)), yi.result();
                    }),
                    (r.centroid = function (t) {
                        return vt(t, i(yn)), yn.result();
                    }),
                    (r.projection = function (e) {
                        return arguments.length ? ((i = null == e ? ((t = null), ci) : (t = e).stream), r) : t;
                    }),
                    (r.context = function (t) {
                        return arguments.length
                            ? ((n = null == t ? ((e = null), new Rn(s)) : new vn((e = t))),
                              "function" != typeof o && n.pointRadius(o),
                              r)
                            : e;
                    }),
                    (r.pointRadius = function (t) {
                        return arguments.length ? ((o = "function" == typeof t ? t : (n.pointRadius(+t), +t)), r) : o;
                    }),
                    (r.digits = function (t) {
                        if (!arguments.length) return s;
                        if (null == t) s = null;
                        else {
                            const e = Math.floor(t);
                            if (!(e >= 0)) throw new RangeError(`invalid digits: ${t}`);
                            s = e;
                        }
                        return null === e && (n = new Rn(s)), r;
                    }),
                    r.projection(t).digits(s).context(e)
                );
            }
            var Fn = i(3664);
            const zn = {};
            function On(t, e) {
                const i = (function (t, e) {
                    return () => {
                        const i = e();
                        return (i.__projectionName = t), i;
                    };
                })(t, e);
                return (zn[t] = i), i;
            }
            const Gn = ["zoomLevel", "translateX", "translateY", "rotationX", "rotationY"];
            class jn extends zi.d {
                constructor() {
                    super(...arguments),
                        (this._pLat = 0),
                        (this._pLon = 0),
                        (this._movePoints = {}),
                        (this._downZoomLevel = 1),
                        (this._doubleDownDistance = 0),
                        (this.boxZoomSelection = Oi.M.new(this._root, {
                            themeTags: ["map", "selection"],
                            isMeasured: !1,
                            visible: !1,
                        })),
                        (this._panSuspended = !1),
                        (this._dirtyGeometries = !1),
                        (this._geometryColection = { type: "GeometryCollection", geometries: [] }),
                        (this._centerLocation = null),
                        (this._mapBounds = [
                            [0, 0],
                            [0, 0],
                        ]),
                        (this._geoCentroid = { longitude: 0, latitude: 0 }),
                        (this._geoBounds = { left: 0, right: 0, top: 0, bottom: 0 }),
                        (this._prevGeoBounds = { left: 0, right: 0, top: 0, bottom: 0 }),
                        (this._dispatchBounds = !1),
                        (this._mapFitted = !1),
                        (this._fitted = !1),
                        (this._homeScheduled = !1),
                        (this._silentZoom = !1),
                        (this._centerX = 0),
                        (this._centerY = 0);
                }
                _makeGeoPath() {
                    const t = this.get("projection"),
                        e = Bn();
                    e.projection(t), this.setPrivateRaw("geoPath", e);
                }
                geoPoint() {
                    return this.invert({ x: this.innerWidth() / 2, y: this.innerHeight() / 2 });
                }
                geoCentroid() {
                    return this._geoCentroid;
                }
                geoBounds() {
                    return this._geoBounds;
                }
                _handleSetWheel() {
                    const t = this.get("wheelX"),
                        e = this.get("wheelY"),
                        i = this.chartContainer;
                    "none" != t || "none" != e
                        ? (this._wheelDp && this._wheelDp.dispose(),
                          (this._wheelDp = i.events.on("wheel", (n) => {
                              const s = this.get("wheelEasing"),
                                  o = this.get("wheelSensitivity", 1),
                                  r = this.get("wheelDuration", 0),
                                  a = n.originalEvent;
                              let l = !1;
                              if (!Fn.isLocalEvent(a, this)) return;
                              l = !0;
                              const h = i._display.toLocal(n.point);
                              if ("zoom" == e) {
                                  if (this.get("zoomLevel") == this.get("minZoomLevel", 1) && a.deltaY > 0) return;
                                  this._handleWheelZoom(a.deltaY, h);
                              } else
                                  "rotateY" == e
                                      ? this._handleWheelRotateY((a.deltaY / 5) * o, r, s)
                                      : "rotateX" == e && this._handleWheelRotateX((a.deltaY / 5) * o, r, s);
                              "zoom" == t
                                  ? this._handleWheelZoom(a.deltaX, h)
                                  : "rotateY" == t
                                    ? this._handleWheelRotateY((a.deltaX / 5) * o, r, s)
                                    : "rotateX" == t && this._handleWheelRotateX((a.deltaX / 5) * o, r, s),
                                  a.preventDefault();
                          })),
                          this._disposers.push(this._wheelDp))
                        : this._wheelDp && this._wheelDp.dispose();
                }
                _handleDoubleClick(t) {
                    if (this.get("doubleClickZoom"))
                        if (t.originalEvent.shiftKey) this.zoomOut();
                        else {
                            const e = this.get("zoomLevel", 1) * this.get("zoomStep", 2);
                            this._zoomToScreenPoint(this.chartContainer._display.toLocal(t.point), e);
                        }
                }
                _zoomToScreenPoint(t, e) {
                    const i = this.get("projection"),
                        n = "rotateX" == this.get("panX"),
                        s = "rotateY" == this.get("panY");
                    if ((n || s) && i.rotate && i.invert) {
                        const i = this.invert(t);
                        if (a.isNumber(i.longitude) && a.isNumber(i.latitude))
                            return void this.zoomToGeoPoint(
                                i,
                                e,
                                !0,
                                void 0,
                                n ? -i.longitude : this.get("rotationX", 0),
                                s ? -i.latitude : this.get("rotationY", 0)
                            );
                    }
                    this.zoomToPoint(t, e);
                }
                _isBoxZoomEvent(t) {
                    const e = t.originalEvent;
                    if (e.button) return !1;
                    switch (this.get("boxZoom", "none")) {
                        case "drag":
                            return !0;
                        case "shift":
                            return e.shiftKey;
                        case "ctrl":
                            return e.ctrlKey;
                        case "alt":
                            return e.altKey;
                    }
                    return !1;
                }
                _handleBoxDown(t) {
                    !t.simulated &&
                        this._isBoxZoomEvent(t) &&
                        ((this._boxDownPoint = this.chartContainer._display.toLocal(t.point)),
                        this._panSuspended ||
                            ((this._panSuspended = !0),
                            (this._suspendedPanX = this.get("panX")),
                            (this._suspendedPanY = this.get("panY")),
                            this.setRaw("panX", "none"),
                            this.setRaw("panY", "none")),
                        this._drawBoxSelection(this._boxDownPoint),
                        this.boxZoomSelection.set("visible", !0));
                }
                _handleBoxMove(t) {
                    this._boxDownPoint && this._drawBoxSelection(this.chartContainer._display.toLocal(t.point));
                }
                _handleBoxUp(t) {
                    const e = this._boxDownPoint,
                        i = this.chartContainer._display.toLocal(t.point);
                    if ((this._endBoxZoom(), !e)) return;
                    const n = Math.abs(i.x - e.x),
                        s = Math.abs(i.y - e.y);
                    if (n < 10 || s < 10) return;
                    const o = this.get("zoomLevel", 1) * Math.min(this.innerWidth() / n, this.innerHeight() / s);
                    this._zoomToScreenPoint({ x: (e.x + i.x) / 2, y: (e.y + i.y) / 2 }, o);
                }
                _endBoxZoom() {
                    (this._boxDownPoint = void 0),
                        this.boxZoomSelection.set("visible", !1),
                        this._panSuspended &&
                            ((this._panSuspended = !1),
                            "none" == this.get("panX") && this.setRaw("panX", this._suspendedPanX),
                            "none" == this.get("panY") && this.setRaw("panY", this._suspendedPanY));
                }
                _drawBoxSelection(t) {
                    const e = this._boxDownPoint;
                    this.boxZoomSelection.setAll({
                        x: Math.min(e.x, t.x),
                        y: Math.min(e.y, t.y),
                        width: Math.abs(t.x - e.x),
                        height: Math.abs(t.y - e.y),
                    });
                }
                _prepareChildren() {
                    if ((super._prepareChildren(), this.isDirty("projectionName"))) {
                        const t = this.get("projectionName");
                        if (t && t !== this._appliedProjectionName) {
                            const e = zn[t];
                            e && ((this._appliedProjectionName = t), this.set("projection", e()));
                        }
                    }
                    const t = this.get("projection"),
                        e = this.innerWidth(),
                        i = this.innerHeight(),
                        n = this._isGoingHome();
                    let o = !1;
                    const r = this._geometryColection.geometries;
                    if (this.isDirty("projection")) {
                        this._makeGeoPath(),
                            this.markDirtyProjection(),
                            this._fitMap(),
                            (o = e > 0 && i > 0),
                            this._applyZoom(),
                            t.rotate &&
                                t.rotate([
                                    this.get("rotationX", 0),
                                    this.get("rotationY", 0),
                                    this.get("rotationZ", 0),
                                ]);
                        let n = this._prevSettings.projection;
                        if (n && n != t) {
                            let s = e / 2,
                                o = i / 2;
                            if (n.invert) {
                                let e = n.invert([s, o]);
                                if (e) {
                                    let i = t(e);
                                    if (i) {
                                        let e = t.translate(),
                                            n = s - (i[0] - e[0]),
                                            r = o - (i[1] - e[1]);
                                        t.translate([n, r]), this.setRaw("translateX", n), this.setRaw("translateY", r);
                                    }
                                }
                            }
                        }
                    }
                    if (this.isPrivateDirty("projectionBlend") && this._projectionBlendData) {
                        const t = this._projectionBlendData,
                            e = this.getPrivate("projectionBlend", 0);
                        t.mutate(e);
                        const i = t.sourceScale + (t.targetScale - t.sourceScale) * e,
                            n = t.sourceTranslateX + (t.targetTranslateX - t.sourceTranslateX) * e,
                            s = t.sourceTranslateY + (t.targetTranslateY - t.sourceTranslateY) * e;
                        t.blended.scale(i * this.get("zoomLevel", 1)),
                            t.blended.translate([n, s]),
                            t.blended.rotate &&
                                t.blended.rotate([
                                    this.get("rotationX", 0),
                                    this.get("rotationY", 0),
                                    this.get("rotationZ", 0),
                                ]),
                            this.setPrivateRaw("mapScale", i),
                            this.setRaw("translateX", n),
                            this.setRaw("translateY", s),
                            this.markDirtyProjection(),
                            e >= 1 &&
                                ((this._projectionRaw = t.targetRaw),
                                (this._projectionBlendData = void 0),
                                (this._projectionBlendAnim = void 0),
                                this.set("projection", t.target));
                    }
                    if (
                        ((this.isDirty("wheelX") || this.isDirty("wheelY")) && this._handleSetWheel(),
                        this._dirtyGeometries &&
                            ((this._geometryColection.geometries = []),
                            this.series.each((t) => {
                                s.pushAll(this._geometryColection.geometries, t._geometries);
                            }),
                            this._fitMap(),
                            this._applyZoom(),
                            (o = e > 0 && i > 0)),
                        0 != r.length && (e != this._pw || i != this._ph || this._dirtyGeometries) && e > 0 && i > 0)
                    ) {
                        let n = e / 2,
                            s = i / 2;
                        (o = !0), t.fitSize([e, i], this._geometryColection);
                        const r = t.scale(),
                            a = this.getPrivate("geoPath");
                        if (
                            ((this._mapBounds = a.bounds(this._geometryColection)),
                            this.setPrivateRaw("mapScale", r),
                            t.scale(r * this.get("zoomLevel", 1)),
                            this._centerLocation)
                        ) {
                            let e = t(this._centerLocation);
                            if (e) {
                                let i = t.translate(),
                                    o = n - (e[0] - i[0]),
                                    r = s - (e[1] - i[1]);
                                t.translate([o, r]),
                                    this.setRaw("translateX", o),
                                    this.setRaw("translateY", r),
                                    (this._centerX = i[0]),
                                    (this._centerY = i[1]);
                            }
                        }
                        this.markDirtyProjection();
                    }
                    if (((this._pw = e), (this._ph = i), this.isDirty("zoomControl"))) {
                        const t = this._prevSettings.zoomControl,
                            e = this.get("zoomControl");
                        e !== t &&
                            (this._disposeProperty("zoomControl"),
                            t && t.dispose(),
                            e && (e.setPrivate("chart", this), this.children.push(e)),
                            this.setRaw("zoomControl", e));
                    }
                    if (this.isDirty("zoomLevel")) {
                        this._applyZoom(),
                            this.markDirtyProjection(),
                            this.series.each((t) => {
                                t.isType("MapPointSeries") &&
                                    t.get("autoScale") &&
                                    s.each(t.dataItems, (t) => {
                                        const e = t.bullets;
                                        e &&
                                            s.each(e, (t) => {
                                                const e = t.get("sprite");
                                                e && e.set("scale", this.get("zoomLevel"));
                                            });
                                    });
                            });
                        const t = this.get("zoomControl");
                        if (t) {
                            const e = this.get("zoomLevel", 1);
                            e == this.get("minZoomLevel", 1)
                                ? t.minusButton._setC("disabled", !0)
                                : t.minusButton._setC("disabled", !1),
                                e == this.get("maxZoomLevel", 32)
                                    ? t.plusButton._setC("disabled", !0)
                                    : t.plusButton._setC("disabled", !1);
                        }
                    }
                    if (
                        ((this.isDirty("translateX") || this.isDirty("translateY")) &&
                            (t.translate([
                                this.get("translateX", this.width() / 2),
                                this.get("translateY", this.height() / 2),
                            ]),
                            this.markDirtyProjection()),
                        t.rotate &&
                            (this.isDirty("rotationX") || this.isDirty("rotationY") || this.isDirty("rotationZ")) &&
                            (t.rotate([this.get("rotationX", 0), this.get("rotationY", 0), this.get("rotationZ", 0)]),
                            this.markDirtyProjection()),
                        (this.isDirty("pinchZoom") || this.get("panX") || this.get("panY")) && this._setUpTouch(),
                        o && this._geometryColection.geometries.length > 0)
                    ) {
                        const t = this._goHomeOnFit,
                            e = this._homeTarget;
                        ((!this._fitted && this.get("autoHome")) || t || n) &&
                            ((this._goHomeOnFit = void 0),
                            this._scheduleHome(t ? t.duration : n && e ? e.duration : void 0)),
                            (this._fitted = !0);
                    }
                    (this.isDirty("translateX") ||
                        this.isDirty("translateY") ||
                        this.isDirty("zoomLevel") ||
                        this.isDirty("rotationX") ||
                        this.isDirty("rotationY") ||
                        this.isDirty("rotationZ") ||
                        this.isDirty("projection") ||
                        this._sizeDirty) &&
                        this._scheduleFocusView();
                }
                _processSeries(t) {
                    super._processSeries(t),
                        this._disposers.push(
                            t.events.on("datavalidated", () => {
                                this._scheduleFocusView();
                            })
                        );
                }
                _scheduleFocusView() {
                    this._focusViewTimeout &&
                        (this.removeDispose(this._focusViewTimeout), this._focusViewTimeout.dispose()),
                        (this._focusViewTimeout = this.setTimeout(() => {
                            (this._focusViewTimeout = void 0), this._updateFocusView();
                        }, 100));
                }
                _updateFocusView() {
                    let t = 0,
                        e = 0,
                        i = this._root.container.width(),
                        n = this._root.container.height();
                    const o = this.chartContainer;
                    if (o.get("maskContent")) {
                        const s = o.toGlobal({ x: 0, y: 0 }),
                            r = o.toGlobal({ x: o.width(), y: o.height() });
                        (t = Math.max(t, Math.min(s.x, r.x))),
                            (e = Math.max(e, Math.min(s.y, r.y))),
                            (i = Math.min(i, Math.max(s.x, r.x))),
                            (n = Math.min(n, Math.max(s.y, r.y)));
                    }
                    const r = (s) => {
                        if (s && s.get("focusable")) {
                            const o = s._focusBounds(),
                                r = o.right - t >= 1 && i - o.left >= 1 && o.bottom - e >= 1 && n - o.top >= 1;
                            s.setPrivate("focusOutOfView", !r);
                        }
                    };
                    this.series.each((t) => {
                        s.each(t.dataItems, (t) => {
                            r(t.get("mapPolygon")),
                                r(t.get("mapLine")),
                                s.each(t.bullets || [], (t) => {
                                    r(t.get("sprite"));
                                });
                        });
                    });
                }
                _applyZoom() {
                    const t = this.getPrivate("mapScale");
                    t && this.get("projection").scale(t * this.get("zoomLevel", 1));
                }
                _fitMap() {
                    const t = this.get("projection");
                    let e = this.innerWidth(),
                        i = this.innerHeight();
                    if (e > 0 && i > 0) {
                        t.fitSize([e, i], this._geometryColection), this.setPrivateRaw("mapScale", t.scale());
                        const n = t.translate();
                        this.setRaw("translateX", n[0]),
                            this.setRaw("translateY", n[1]),
                            (this._centerX = n[0]),
                            (this._centerY = n[1]);
                        const s = this.getPrivate("geoPath");
                        (this._mapBounds = s.bounds(this._geometryColection)),
                            (this._geoCentroid = pe(this._geometryColection));
                        const o = _e(this._geometryColection);
                        if (((this._geoBounds = o), this._geometryColection.geometries.length > 0)) {
                            (o.left = l.round(this._geoBounds.left, 3)),
                                (o.right = l.round(this._geoBounds.right, 3)),
                                (o.top = l.round(this._geoBounds.top, 3)),
                                (o.bottom = l.round(this._geoBounds.bottom, 3));
                            const t = this._prevGeoBounds;
                            t && !Fn.sameBounds(o, t) && ((this._dispatchBounds = !0), (this._prevGeoBounds = o));
                        }
                        this._mapFitted = !0;
                    }
                }
                homeGeoPoint() {
                    let t = this.get("homeGeoPoint");
                    if (!t) {
                        const e = this.get("projection"),
                            i = this.innerWidth(),
                            n = this.innerHeight(),
                            s = this._geometryColection;
                        if (i > 0 && n > 0 && s.geometries.length > 0 && e.invert) {
                            const t = e.scale(),
                                o = e.translate(),
                                r = e.rotate ? e.rotate() : void 0;
                            if (r) {
                                const t = this._homeRotation();
                                e.rotate([t[0], t[1], r[2]]);
                            }
                            e.fitSize([i, n], s);
                            const l = e.invert([i / 2, n / 2]);
                            if (
                                (e.scale(t),
                                e.translate(o),
                                r && e.rotate(r),
                                l && a.isNumber(l[0]) && a.isNumber(l[1]))
                            )
                                return { longitude: l[0], latitude: l[1] };
                        }
                        t = this.invert({ x: i / 2, y: n / 2 });
                    }
                    return t;
                }
                _homeRotation() {
                    return [
                        this.get("homeRotationX", this.get("rotationX", 0)),
                        this.get("homeRotationY", this.get("rotationY", 0)),
                    ];
                }
                _view() {
                    return s.map(Gn, (t) => this.get(t));
                }
                _isGoingHome() {
                    const t = this._homeTarget;
                    if (t) {
                        const e = this._animatingSettings,
                            i = this._view();
                        for (let n = 0; n < Gn.length; n++) {
                            const s = e[Gn[n]],
                                o = i[n],
                                r = t.view[n],
                                l = o !== r && !(a.isNumber(o) && a.isNumber(r) && Math.abs(o - r) < 1e-6);
                            if (s ? s !== t.animations[n] : l) return (this._homeTarget = void 0), !1;
                        }
                        return !0;
                    }
                    return !1;
                }
                _scheduleHome(t) {
                    this._homeScheduled ||
                        ((this._homeScheduled = !0),
                        this._root.events.once("frameended", () => {
                            if (((this._homeScheduled = !1), !this.isDisposed())) {
                                (this._silentZoom = !0), this.goHome(t), (this._silentZoom = !1);
                                const e = this._animatingSettings,
                                    i = s.map(Gn, (t) => e[t]),
                                    n = this._view();
                                this._homeTarget = {
                                    view: s.map(i, (t, e) => (t ? t.to : n[e])),
                                    animations: i,
                                    duration: t,
                                };
                            }
                        }));
                }
                goHome(t) {
                    if (
                        (this.series.each((t) => {
                            t._onGoHome();
                        }),
                        !this._fitted)
                    )
                        return void (this._goHomeOnFit = { duration: t });
                    const e =
                        null != this.get("homeRotationX") || null != this.get("homeRotationY")
                            ? this._homeRotation()
                            : [void 0, void 0];
                    this.zoomToGeoPoint(this.homeGeoPoint(), this.get("homeZoomLevel", 1), !0, t, e[0], e[1]);
                }
                _updateChildren() {
                    const t = this.get("projection");
                    if (t.invert) {
                        let e = this.innerWidth(),
                            i = this.innerHeight();
                        if (e > 0 && i > 0) {
                            const n = t.invert([e / 2, i / 2]);
                            n && isFinite(n[0]) && isFinite(n[1]) && (this._centerLocation = n);
                        }
                    }
                    super._updateChildren();
                }
                _afterChanged() {
                    if ((super._afterChanged(), this._dispatchBounds)) {
                        this._dispatchBounds = !1;
                        const t = "geoboundschanged";
                        this.events.isEnabled(t) && this.events.dispatch(t, { type: t, target: this });
                    }
                }
                _setUpTouch() {
                    this.chartContainer._display.cancelTouch ||
                        (this.chartContainer._display.cancelTouch = !!(
                            this.get("pinchZoom") ||
                            this.get("panX") ||
                            this.get("panY")
                        ));
                }
                markDirtyGeometries() {
                    (this._dirtyGeometries = !0), this.markDirty();
                }
                markDirtyProjection() {
                    this.series.each((t) => {
                        t.markDirtyProjection();
                    });
                }
                _afterNew() {
                    this._defaultThemes.push(Ni.new(this._root)),
                        (this._settings.themeTags = Fn.mergeTags(this._settings.themeTags, ["map"])),
                        this.children.push(this.bulletsContainer),
                        super._afterNew(),
                        this._makeGeoPath(),
                        this.chartContainer.children.push(this.seriesContainer),
                        this.chartContainer.children.push(this.boxZoomSelection),
                        null == this.get("translateX") && this.set("translateX", this.width() / 2),
                        null == this.get("translateY") && this.set("translateY", this.height() / 2),
                        this.chartContainer.set("interactive", !0),
                        this.chartContainer.set("interactiveChildren", !1),
                        this.chartContainer.set(
                            "background",
                            Oi.M.new(this._root, {
                                themeTags: ["map", "background"],
                                fill: Ke.Q1.fromHex(0),
                                fillOpacity: 0,
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("pointerdown", (t) => {
                                this._handleChartDown(t);
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("globalpointerup", (t) => {
                                this._handleChartUp(t);
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("globalpointermove", (t) => {
                                this._handleChartMove(t);
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("dblclick", (t) => {
                                this._handleDoubleClick(t);
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("pointerdown", (t) => {
                                this._handleBoxDown(t);
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("globalpointermove", (t) => {
                                this._handleBoxMove(t);
                            })
                        ),
                        this._disposers.push(
                            this.chartContainer.events.on("globalpointerup", (t) => {
                                this._handleBoxUp(t);
                            })
                        );
                    let t = !1;
                    for (let e = 0; e < c.u5.licenses.length; e++) c.u5.licenses[e].match(/^AM5M.{5,}/i) && (t = !0);
                    t ? this._root._licenseApplied() : this._root._showBranding(), this._setUpTouch();
                }
                _handleChartDown(t) {
                    this._downZoomLevel = this.get("zoomLevel", 1);
                    const e = this.chartContainer._downPoints;
                    let i = o.keys(e).length;
                    if (1 == i) {
                        let n = e[1];
                        n || (n = e[0]), n && n.x == t.point.x && n.y == t.point.y && (i = 0);
                    }
                    if (i > 0) {
                        (this._downTranslateX = this.get("translateX")),
                            (this._downTranslateY = this.get("translateY")),
                            (this._downRotationX = this.get("rotationX")),
                            (this._downRotationY = this.get("rotationY")),
                            (this._downRotationZ = this.get("rotationZ"));
                        const t = this.chartContainer._getDownPointId();
                        if (t) {
                            let e = this._movePoints[t];
                            e && (this.chartContainer._downPoints[t] = e);
                        }
                    } else if (0 == i) {
                        let e = this.chartContainer.get("background");
                        if ((e && e.events.enableType("click"), this.get("panX") || this.get("panY"))) {
                            this._za && this._za.stop(),
                                this._txa && this._txa.stop(),
                                this._tya && this._tya.stop(),
                                this._rxa && this._rxa.stop(),
                                this._rya && this._rya.stop();
                            const e = this.chartContainer._display.toLocal(t.point);
                            (this._downTranslateX = this.get("translateX")),
                                (this._downTranslateY = this.get("translateY")),
                                (this._downRotationX = this.get("rotationX")),
                                (this._downRotationY = this.get("rotationY")),
                                (this._downRotationZ = this.get("rotationZ"));
                            let i = this.get("projection");
                            if (i.invert) {
                                let t = i.invert([e.x, e.y]),
                                    n = i.invert([e.x + 1, e.y + 1]);
                                t && n && ((this._pLon = Math.abs(n[0] - t[0])), (this._pLat = Math.abs(n[1] - t[1])));
                            }
                        }
                    }
                }
                invert(t) {
                    let e = this.get("projection");
                    if (e.invert) {
                        const i = e.invert([t.x, t.y]);
                        if (i) return { longitude: i[0], latitude: i[1] };
                    }
                    return { longitude: 0, latitude: 0 };
                }
                convert(t, e, i) {
                    let n,
                        s = this.get("projection");
                    if ((s.rotate || ((e = void 0), (i = void 0)), null != e || null != i)) {
                        null == e && (e = 0), null == i && (i = 0);
                        let o = s.rotate();
                        s.rotate([e, i, 0]), (n = s([t.longitude, t.latitude])), s.rotate(o);
                    } else n = s([t.longitude, t.latitude]);
                    return n ? { x: n[0], y: n[1] } : { x: 0, y: 0 };
                }
                _handleChartUp(t) {
                    this.chartContainer._downPoints = {};
                }
                _handlePinch() {
                    const t = this.chartContainer;
                    let e = 0,
                        i = [],
                        n = [];
                    if (
                        (o.each(t._downPoints, (t, s) => {
                            i[e] = s;
                            let o = this._movePoints[t];
                            o && (n[e] = o), e++;
                        }),
                        i.length > 1 && n.length > 1)
                    ) {
                        const e = t._display;
                        let s = i[0],
                            o = i[1],
                            r = n[0],
                            a = n[1];
                        if (s && o && r && a) {
                            (s = e.toLocal(s)), (o = e.toLocal(o)), (r = e.toLocal(r)), (a = e.toLocal(a));
                            let t = Math.hypot(o.x - s.x, o.y - s.y),
                                i = (Math.hypot(a.x - r.x, a.y - r.y) / t) * this._downZoomLevel;
                            i = l.fitToRange(i, this.get("minZoomLevel", 1), this.get("maxZoomLevel", 32));
                            let n = { x: r.x + (a.x - r.x) / 2, y: r.y + (a.y - r.y) / 2 },
                                h = { x: s.x + (o.x - s.x) / 2, y: s.y + (o.y - s.y) / 2 },
                                c = this._downTranslateX || 0,
                                u = this._downTranslateY || 0,
                                d = this._downZoomLevel,
                                g = n.x - ((-c + h.x) / d) * i,
                                p = n.y - ((-u + h.y) / d) * i;
                            this.set("zoomLevel", i), this.set("translateX", g), this.set("translateY", p);
                        }
                    }
                }
                _handleChartMove(t) {
                    const e = this.chartContainer;
                    let i = e._getDownPoint();
                    const n = e._getDownPointId(),
                        s = t.originalEvent.pointerId;
                    if (
                        this.get("pinchZoom") &&
                        s &&
                        ((this._movePoints[s] = t.point), o.keys(e._downPoints).length > 1)
                    )
                        this._handlePinch();
                    else if ((!n || !s || s == n) && i) {
                        const n = this.get("panX"),
                            s = this.get("panY");
                        if ("none" != n || "none" != s) {
                            const o = e._display;
                            let r = o.toLocal(t.point);
                            i = o.toLocal(i);
                            let l = this._downTranslateX,
                                h = this._downTranslateY;
                            if (Math.hypot(i.x - r.x, i.y - r.y) > 5) {
                                let t = e.get("background");
                                if ((t && t.events.disableType("click"), a.isNumber(l) && a.isNumber(h))) {
                                    let t = this.get("projection");
                                    const e = this.get("zoomLevel", 1),
                                        o = this.get("maxPanOut", 0.4),
                                        a = this._mapBounds,
                                        c = this.innerWidth(),
                                        u = this.innerHeight(),
                                        d = a[1][0] - a[0][0],
                                        g = a[1][1] - a[0][1],
                                        p = l,
                                        f = h;
                                    if ("translateX" == n) {
                                        l += r.x - i.x;
                                        const t = c / 2 - (c / 2 - this._centerX) * e,
                                            n = Math.max(d * o * e, (d * e - c) / 2);
                                        (l = Math.min(l, Math.max(t + n, p))), (l = Math.max(l, Math.min(t - n, p)));
                                    }
                                    if ("translateY" == s) {
                                        h += r.y - i.y;
                                        const t = u / 2 - (u / 2 - this._centerY) * e,
                                            n = Math.max(g * o * e, (g * e - u) / 2);
                                        (h = Math.min(h, Math.max(t + n, f))), (h = Math.max(h, Math.min(t - n, f)));
                                    }
                                    if ((this.set("translateX", l), this.set("translateY", h), t.invert)) {
                                        let e = t.invert([i.x, i.y]);
                                        location &&
                                            e &&
                                            ("rotateX" == n &&
                                                this.set("rotationX", this._downRotationX - (i.x - r.x) * this._pLon),
                                            "rotateY" == s &&
                                                this.set("rotationY", this._downRotationY + (i.y - r.y) * this._pLat));
                                    }
                                }
                            }
                        }
                    }
                }
                _handleWheelRotateY(t, e, i) {
                    this._rya = this.animate({
                        key: "rotationY",
                        to: this.get("rotationY", 0) - t,
                        duration: e,
                        easing: i,
                    });
                }
                _handleWheelRotateX(t, e, i) {
                    this._rxa = this.animate({
                        key: "rotationX",
                        to: this.get("rotationX", 0) - t,
                        duration: e,
                        easing: i,
                    });
                }
                _handleWheelZoom(t, e) {
                    let i = this.get("zoomStep", 2),
                        n = this.get("zoomLevel", 1),
                        s = n;
                    t > 0 ? (s = n / i) : t < 0 && (s = n * i), s != n && this.zoomToPoint(e, s);
                }
                zoomToGeoBounds(t, e, i, n) {
                    t.right < t.left && (t = { left: -180, right: 180, top: t.top, bottom: t.bottom });
                    const s = this.getPrivate("geoPath").bounds(this._geometryColection);
                    let o = this.convert({ longitude: t.left, latitude: t.top }, i, n),
                        r = this.convert({ longitude: t.right, latitude: t.bottom }, i, n);
                    o.y < s[0][1] && (o.y = s[0][1]), r.y > s[1][1] && (r.y = s[1][1]);
                    let a = this.get("zoomLevel", 1),
                        l = o.x,
                        h = r.x,
                        c = o.y,
                        u = r.y,
                        d = this.seriesContainer,
                        g = 0.9 * Math.min((d.innerWidth() / (h - l)) * a, (d.innerHeight() / (u - c)) * a),
                        p = l + (h - l) / 2,
                        f = c + (u - c) / 2,
                        _ = this.invert({ x: p, y: f });
                    return (null == i && null == n) || this.rotate(i, n, e), this.zoomToGeoPoint(_, g, !0, e);
                }
                zoomToPoint(t, e, i, n) {
                    e && (e = l.fitToRange(e, this.get("minZoomLevel", 1), this.get("maxZoomLevel", 32))),
                        a.isNumber(n) || (n = this.get("animationDuration", 0));
                    const s = this.get("animationEasing"),
                        o = this.get("zoomLevel", 1);
                    if (this.get("centerMapOnZoomOut") && e == this.get("homeZoomLevel", 1)) {
                        const e =
                            null != this.get("homeRotationX") || null != this.get("homeRotationY")
                                ? this._homeRotation()
                                : [void 0, void 0];
                        (t = this.convert(this.homeGeoPoint(), e[0], e[1])), (i = !0);
                    }
                    let r = t.x,
                        h = t.y,
                        c = this.get("translateX", 0),
                        u = this.get("translateY", 0),
                        d = r,
                        g = h;
                    i && ((d = this.innerWidth() / 2), (g = this.innerHeight() / 2));
                    let p = d - ((r - c) / o) * e,
                        f = g - ((h - u) / o) * e;
                    return (
                        (this._txa = this.animate({ key: "translateX", to: p, duration: n, easing: s })),
                        (this._tya = this.animate({ key: "translateY", to: f, duration: n, easing: s })),
                        (this._za = this.animate({ key: "zoomLevel", to: e, duration: n, easing: s })),
                        o == e || this._silentZoom || this._announceZoom(e),
                        this._za
                    );
                }
                _announceZoom(t) {
                    this._zoomAlert && (this.removeDispose(this._zoomAlert), this._zoomAlert.dispose()),
                        (this._zoomAlert = this.setTimeout(() => {
                            (this._zoomAlert = void 0),
                                this._root.readerAlert(
                                    this._t(
                                        "Zoom level changed to %1",
                                        this._root.locale,
                                        this._root.numberFormatter.format(t, "#.#")
                                    )
                                );
                        }, 300));
                }
                zoomToGeoPoint(t, e, i, n, s, o) {
                    let r = this.convert(t, s, o);
                    if (((null == s && null == o) || this.rotate(s, o, n), r)) return this.zoomToPoint(r, e, i, n);
                }
                rotate(t, e, i) {
                    if (this.get("projection").rotate) {
                        a.isNumber(i) || (i = this.get("animationDuration", 0));
                        const n = this.get("animationEasing");
                        null != t && this.animate({ key: "rotationX", to: t, duration: i, easing: n }),
                            null != e && this.animate({ key: "rotationY", to: e, duration: i, easing: n });
                    }
                }
                animateProjection(t, e, i, n, s) {
                    this._projectionBlendAnim &&
                        (this._projectionBlendAnim.stop(),
                        (this._projectionBlendAnim = void 0),
                        (this._projectionBlendData = void 0)),
                        s && (this._projectionRaw = s);
                    const o = this._projectionRaw;
                    if (!o) return this.set("projection", t), void (this._projectionRaw = e);
                    if ((null == i && (i = this.get("animationDuration", 0)), !i))
                        return this.set("projection", t), void (this._projectionRaw = e);
                    n || (n = this.get("animationEasing")),
                        this._za && this._za.stop(),
                        this._txa && this._txa.stop(),
                        this._tya && this._tya.stop(),
                        this._rxa && this._rxa.stop(),
                        this._rya && this._rya.stop();
                    const r = this.innerWidth(),
                        a = this.innerHeight(),
                        l = this.getPrivate("mapScale"),
                        h = this.get("translateX", r / 2),
                        c = this.get("translateY", a / 2),
                        u = Ti(e);
                    u.fitSize([r, a], this._geometryColection);
                    const d = u.scale(),
                        g = u.translate(),
                        p = ki((t) => (i, n) => {
                            const s = o(i, n),
                                r = e(i, n);
                            return [(1 - t) * s[0] + t * r[0], (1 - t) * s[1] + t * r[1]];
                        }),
                        f = p(0);
                    f.scale(l * this.get("zoomLevel", 1)),
                        f.translate([h, c]),
                        f.precision(0.5),
                        f.rotate &&
                            f.rotate([this.get("rotationX", 0), this.get("rotationY", 0), this.get("rotationZ", 0)]),
                        this.setRaw("projection", f),
                        this._makeGeoPath(),
                        (this._projectionBlendData = {
                            blended: f,
                            mutate: p,
                            sourceScale: l,
                            targetScale: d,
                            sourceTranslateX: h,
                            sourceTranslateY: c,
                            targetTranslateX: g[0],
                            targetTranslateY: g[1],
                            target: t,
                            targetRaw: e,
                        }),
                        (this._projectionBlendAnim = this.animatePrivate({
                            key: "projectionBlend",
                            from: 0,
                            to: 1,
                            duration: i,
                            easing: n,
                        }));
                }
                zoomIn() {
                    return this.zoomToPoint(
                        { x: this.innerWidth() / 2, y: this.innerHeight() / 2 },
                        this.get("zoomLevel", 1) * this.get("zoomStep", 2)
                    );
                }
                zoomOut() {
                    return this.zoomToPoint(
                        { x: this.innerWidth() / 2, y: this.innerHeight() / 2 },
                        this.get("zoomLevel", 1) / this.get("zoomStep", 2)
                    );
                }
                _clearDirty() {
                    super._clearDirty(), (this._dirtyGeometries = !1), (this._mapFitted = !1);
                }
                getArea(t) {
                    const e = this.getPrivate("geoPath"),
                        i = t.get("geometry");
                    return i ? e.area(i) : 0;
                }
            }
            (jn.className = "MapChart"), (jn.classNames = zi.d.classNames.concat([jn.className]));
            class Xn extends r {
                constructor() {
                    super(...arguments),
                        (this._types = ["Point", "MultiPoint"]),
                        (this._travel = new WeakMap()),
                        (this._lineChangedDps = new Map());
                }
                _movingBack(t, e, i) {
                    var n;
                    const o = i.get("sprite"),
                        r =
                            o &&
                            s.any(o._declaredAnimations || [], (e) => e.target === t && "positionOnLine" === e.key) &&
                            !!(null === (n = t._animatingSettings) || void 0 === n ? void 0 : n.positionOnLine),
                        a = this._travel.get(t);
                    let l = !1;
                    if (r && a) {
                        const t = e - a.position;
                        l = 0 === t || Math.abs(t) > 0.5 ? a.back : t < 0;
                    }
                    return this._travel.set(t, { position: e, back: l }), l;
                }
                _afterNew() {
                    this.fields.push(
                        "polygonId",
                        "lineId",
                        "longitude",
                        "latitude",
                        "altitude",
                        "fixed",
                        "positionOnLine",
                        "autoRotate",
                        "autoRotateAngle"
                    ),
                        this._setRawDefault("longitudeField", "longitude"),
                        this._setRawDefault("latitudeField", "latitude"),
                        this._setRawDefault("lineIdField", "lineId"),
                        this._setRawDefault("positionOnLineField", "positionOnLine"),
                        this._setRawDefault("autoRotateField", "autoRotate"),
                        this._setRawDefault("autoRotateAngleField", "autoRotateAngle"),
                        super._afterNew();
                }
                markDirtyProjection() {
                    this.markDirty();
                }
                markDirtyValues(t) {
                    super.markDirtyValues(), t && this._positionBullets(t);
                }
                processDataItem(t) {
                    super.processDataItem(t);
                    let e = t.get("geometry");
                    if (e) {
                        if ("Point" == e.type) {
                            const i = e.coordinates;
                            i && (t.set("longitude", i[0]), t.set("latitude", i[1]));
                        } else if ("MultiPoint" == e.type) {
                            const i = e.coordinates;
                            i && i[0] && (t.set("longitude", i[0][0]), t.set("latitude", i[0][1]));
                        }
                    } else
                        (e = { type: "Point", coordinates: [t.get("longitude", 0), t.get("latitude", 0)] }),
                            t.set("geometry", e);
                    this._addGeometry(e, this);
                }
                _makeBullets(t) {
                    (t.bullets = []),
                        this.bullets.each((e) => {
                            const i = t.get("geometry");
                            if (i)
                                if ("Point" == i.type) this._setBulletParent(this._makeBullet(t, e));
                                else if ("MultiPoint" == i.type) {
                                    let n = 0;
                                    s.each(i.coordinates, () => {
                                        this._setBulletParent(this._makeBullet(t, e, n)), n++;
                                    });
                                }
                        });
                }
                _setBulletParent(t) {
                    if (t) {
                        const e = t.get("sprite"),
                            i = this.chart;
                        if (e && i) {
                            const t = e.dataItem;
                            t &&
                                (t.get("fixed")
                                    ? e.parent != i.bulletsContainer && i.bulletsContainer.children.moveValue(e)
                                    : e.parent != this.bulletsContainer && this.bulletsContainer.children.moveValue(e));
                        }
                    }
                }
                _positionBullet(t) {
                    const e = t.get("sprite");
                    if (e) {
                        const i = e.dataItem;
                        if (i && i.get("fixed")) return;
                        const n = i.get("latitude"),
                            s = i.get("longitude"),
                            o = i.get("lineDataItem"),
                            r = i.get("fixed"),
                            h = this.chart;
                        let c;
                        if (o) c = o.get("mapLine");
                        else {
                            const t = i.get("lineId");
                            t &&
                                h &&
                                h.series.each((e) => {
                                    if (e.isType("MapLineSeries")) {
                                        let n = e.getDataItemById(t);
                                        n && (i.set("lineDataItem", n), (c = n.get("mapLine")));
                                    }
                                });
                        }
                        const u = this._lineChangedDps.get(i);
                        u && u.line !== c && (u.dp.dispose(), this._lineChangedDps.delete(i)),
                            !c ||
                                (u && u.line === c) ||
                                this._lineChangedDps.set(i, {
                                    line: c,
                                    dp: c.events.on("linechanged", () => {
                                        this._positionBullets(i);
                                    }),
                                });
                        const d = i.get("polygonDataItem");
                        let g;
                        if (d) g = d.get("mapPolygon");
                        else {
                            const t = i.get("polygonId");
                            t &&
                                h &&
                                h.series.each((e) => {
                                    if (e.isType("MapPolygonSeries")) {
                                        let n = e.getDataItemById(t);
                                        n && (i.set("polygonDataItem", n), (g = n.get("mapPolygon")));
                                    }
                                });
                        }
                        const p = i.get("positionOnLine");
                        let f,
                            _,
                            m = i.get("altitude", 0);
                        if (g) {
                            let t = g.visualCentroid();
                            (f = [t.longitude, t.latitude]),
                                i.setRaw("longitude", t.longitude),
                                i.setRaw("latitude", t.latitude);
                        } else if (c && a.isNumber(p)) {
                            let e = c.positionToGeoPoint(p);
                            if (
                                ((f = [e.longitude, e.latitude]),
                                (m = c.positionToAltitude(p)),
                                i.get("autoRotate", t.get("autoRotate")) && h)
                            ) {
                                const e = c.positionToGeoPoint(p - 0.002),
                                    n = c.positionToGeoPoint(p + 0.002),
                                    s = this._raisedPoint(e, c.positionToAltitude(p - 0.002)) || h.convert(e),
                                    o = this._raisedPoint(n, c.positionToAltitude(p + 0.002)) || h.convert(n);
                                (_ = l.getAngle(s, o)), this._movingBack(i, p, t) && (_ += 180);
                            }
                            i.setRaw("longitude", e.longitude), i.setRaw("latitude", e.latitude);
                        } else if (a.isNumber(s) && a.isNumber(n)) f = [s, n];
                        else {
                            const e = i.get("geometry");
                            if (e)
                                if ("Point" == e.type) this._positionBulletReal(t, e, e.coordinates, _, m);
                                else if ("MultiPoint" == e.type) {
                                    let i = t._index || 0;
                                    f = e.coordinates[i];
                                }
                        }
                        !r && f && this._positionBulletReal(t, { type: "Point", coordinates: f }, f, _, m);
                    }
                }
                _raisedPoint(t, e) {
                    const i = this.chart;
                    if (i && e) return Me(i.get("projection"), t.longitude, t.latitude, e);
                }
                _positionBulletReal(t, e, i, n, s) {
                    const o = t.get("sprite"),
                        r = this.chart;
                    if (r) {
                        const a = r.get("projection"),
                            l = r.getPrivate("geoPath"),
                            h = o.dataItem;
                        let c = !0;
                        if (s) {
                            const t = Me(a, i[0], i[1], s);
                            if (t) {
                                const e = { x: t.x, y: t.y };
                                o.setAll(e),
                                    h.setRaw("point", e),
                                    (c = t.far ? !(t.hidden && this.get("clipBack")) : !this.get("clipFront"));
                            } else c = !1;
                        } else {
                            const t = a(i);
                            if (t) {
                                const e = { x: t[0], y: t[1] };
                                o.setAll(e), h.setRaw("point", e);
                            }
                            l(e) ? this.get("clipFront") && (c = !1) : this.get("clipBack") && (c = !1);
                        }
                        o.setPrivate("visible", c),
                            h.set("clipped", !c),
                            h &&
                                null != n &&
                                h.get("autoRotate", t.get("autoRotate")) &&
                                o.set("rotation", n + h.get("autoRotateAngle", t.get("autoRotateAngle", 0)));
                        const u = this.get("surfaceBullets") ? this._surfaceDeform(i[0], i[1]) : void 0,
                            d = o.getPrivate("deform");
                        (u && d && u.a === d.a && u.b === d.b && u.c === d.c && u.d === d.d) ||
                            o.setPrivate("deform", u);
                    }
                }
                _prepareChildren() {
                    super._prepareChildren(),
                        this.isDirty("surfaceBullets") &&
                            s.each(this.dataItems, (t) => {
                                this._positionBullets(t);
                            });
                }
                _surfaceDeform(t, e) {
                    const i = this.chart;
                    if (!i) return;
                    const n = i.get("projection"),
                        s = n.scale(),
                        o = n([t, e]),
                        r = n([t, Math.min(89.99, e + 0.5)]);
                    if (!o || !r) return;
                    const a = 0.5 / Math.max(Math.cos(e * l.RADIANS), 0.01);
                    let h = n([t + a, e]),
                        c = 1;
                    if (((!h || Math.abs(h[0] - o[0]) > (Math.PI * s) / 2) && ((h = n([t - a, e])), (c = -1)), !h))
                        return;
                    const u = 1 / (0.5 * l.RADIANS * s);
                    return {
                        a: (h[0] - o[0]) * u * c,
                        b: (h[1] - o[1]) * u * c,
                        c: -(r[0] - o[0]) * u,
                        d: -(r[1] - o[1]) * u,
                    };
                }
                zoomToDataItem(t, e, i) {
                    const n = this.chart;
                    if (n) {
                        const s = t.get("longitude", 0),
                            o = t.get("latitude", 0);
                        return i
                            ? n.zoomToGeoPoint({ longitude: s, latitude: o }, e, !0, void 0, -s, -o)
                            : n.zoomToGeoPoint({ longitude: s, latitude: o }, e, !0);
                    }
                }
                zoomToDataItems(t, e) {
                    let i = null,
                        n = null,
                        o = null,
                        r = null;
                    if (
                        (s.each(t, (t) => {
                            const e = t.get("longitude", 0),
                                s = t.get("latitude", 0);
                            (null == i || i > e) && (i = e),
                                (null == n || n < e) && (n = e),
                                (null == o || o < s) && (o = s),
                                (null == r || r > s) && (r = s);
                        }),
                        null != i && null != n && null != o && null != r)
                    ) {
                        const t = this.chart;
                        if (t)
                            return e
                                ? t.zoomToGeoBounds(
                                      { left: i, right: n, top: o, bottom: r },
                                      void 0,
                                      -(i + (n - i) / 2),
                                      -(r + (o - r) / 2)
                                  )
                                : t.zoomToGeoBounds({ left: i, right: n, top: o, bottom: r });
                    }
                }
                disposeDataItem(t) {
                    const e = this.chart;
                    e &&
                        e.series.each((e) => {
                            e.isType("MapLineSeries") &&
                                s.each(e.dataItems, (i) => {
                                    const n = i.get("pointsToConnect");
                                    n &&
                                        s.each(n, (o) => {
                                            o == t && (s.remove(n, o), e.markDirtyValues(i));
                                        });
                                });
                        });
                    const i = this._lineChangedDps.get(t);
                    i && (i.dp.dispose(), this._lineChangedDps.delete(t)), super.disposeDataItem(t);
                }
                _dispose() {
                    this._lineChangedDps.forEach((t) => {
                        t.dp.dispose();
                    }),
                        this._lineChangedDps.clear(),
                        super._dispose();
                }
                _excludeDataItem(t) {
                    super._excludeDataItem(t);
                    const e = t.bullets;
                    e &&
                        s.each(e, (t) => {
                            const e = t.get("sprite");
                            e && this._setExcluded(e, !0);
                        });
                }
                _unexcludeDataItem(t) {
                    super._unexcludeDataItem(t);
                    const e = t.bullets;
                    e &&
                        s.each(e, (t) => {
                            const e = t.get("sprite");
                            e && this._setExcluded(e, !1);
                        });
                }
                _notIncludeDataItem(t) {
                    super._notIncludeDataItem(t);
                    const e = t.bullets;
                    e &&
                        s.each(e, (t) => {
                            const e = t.get("sprite");
                            e && this._setExcluded(e, !0);
                        });
                }
                _unNotIncludeDataItem(t) {
                    super._unNotIncludeDataItem(t);
                    const e = t.bullets;
                    e &&
                        s.each(e, (t) => {
                            const e = t.get("sprite");
                            e && this._setExcluded(e, !1);
                        });
                }
            }
            (Xn.className = "MapPointSeries"), (Xn.classNames = r.classNames.concat([Xn.className]));
            class Yn {
                constructor(t) {
                    (this._entity = t), (this._disposed = !1);
                }
                update() {
                    const t = this._entity,
                        e = t.get("sunDate");
                    if (e !== this._sunDate && ((this._sunDate = e), this._stop(), null != e)) {
                        const i = () => {
                            const i = "now" == e ? new Date() : new Date(e);
                            isNaN(i.getTime()) || t._setC("sunPosition", ve(i));
                        };
                        i(), "now" == e && (this._timer = window.setInterval(i, 6e4));
                    }
                }
                _stop() {
                    void 0 !== this._timer && (window.clearInterval(this._timer), (this._timer = void 0));
                }
                isDisposed() {
                    return this._disposed;
                }
                dispose() {
                    (this._disposed = !0), this._stop();
                }
            }
            var Zn = i(6047);
            let Hn;
            function Wn() {
                if (void 0 === Hn) {
                    Hn = null;
                    try {
                        const t = document.createElement("canvas"),
                            e = t.getContext("webgl2", {
                                alpha: !0,
                                premultipliedAlpha: !0,
                                antialias: !1,
                                depth: !1,
                                stencil: !1,
                                failIfMajorPerformanceCaveat: !0,
                            });
                        if (e) {
                            const i = { canvas: t, gl: e, generation: 0 };
                            t.addEventListener("webglcontextlost", (t) => t.preventDefault()),
                                t.addEventListener("webglcontextrestored", () => i.generation++),
                                (Hn = i);
                        }
                    } catch (t) {}
                }
                return Hn && !Hn.gl.isContextLost() ? Hn : void 0;
            }
            let Un = 0;
            function qn(t, e, i) {
                const n = t.createShader(e);
                if (n) {
                    if ((t.shaderSource(n, i), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS))) return n;
                    console.warn("WebGL shader: " + t.getShaderInfoLog(n)), t.deleteShader(n);
                }
            }
            const Vn = Math.PI / 2,
                Kn = 1 / Math.PI,
                Jn = 1 / (2 * Math.PI),
                $n = Math.PI / 180,
                Qn = 180 / Math.PI;
            function ts(t, e, i) {
                if (0 === t) {
                    const t = e * e + i * i;
                    return t > 1 ? void 0 : [Math.sqrt(1 - t), e, i];
                }
                const n = ls(t, i);
                if (!n) return;
                const s = n[0],
                    o = e * n[1];
                return Math.abs(o) > Math.PI
                    ? void 0
                    : [Math.cos(s) * Math.cos(o), Math.cos(s) * Math.sin(o), Math.sin(s)];
            }
            const es = 1.340264,
                is = -0.081106,
                ns = 893e-6,
                ss = 0.003796,
                os = Math.sqrt(3) / 2,
                rs = 1.3173627591574133,
                as = 1.4223905067305962;
            function ls(t, e) {
                if (3 === t) {
                    if (e > rs || e < -rs) return;
                    let t = e;
                    for (let i = 0; i < 12; i++) {
                        const i = t * t,
                            n = i * i * i,
                            s =
                                (t * (es + is * i + n * (ns + ss * i)) - e) /
                                (es + 3 * is * i + n * (7 * ns + 9 * ss * i));
                        if (((t -= s), Math.abs(s) < 1e-9)) break;
                    }
                    const i = Math.max(-1, Math.min(1, Math.sin(t) / os)),
                        n = t * t,
                        s = n * n * n;
                    return [Math.asin(i), (os * (es + 3 * is * n + s * (7 * ns + 9 * ss * n))) / Math.cos(t)];
                }
                if (4 === t) {
                    if (e > as || e < -as) return;
                    let t = e;
                    for (let i = 0; i < 25; i++) {
                        const i = t * t,
                            n = i * i,
                            s =
                                (t * (1.007226 + i * (0.015085 + n * (0.028874 * i - 0.044475 - 0.005916 * n))) - e) /
                                (1.007226 + i * (0.045255 + n * (0.259866 * i - 0.311325 - 0.065076 * n)));
                        if (((t -= s), Math.abs(s) < 1e-9)) break;
                    }
                    t = Math.max(-Vn, Math.min(Vn, t));
                    const i = t * t;
                    return [t, 1 / (0.8707 + i * (i * (i * i * i * (0.003971 - 0.001529 * i) - 0.013791) - 0.131979))];
                }
                const i = 2 === t ? 2 * Math.atan(Math.exp(e)) - Vn : e;
                return i > Vn || i < -Vn ? void 0 : [i, 1];
            }
            function hs(t, e, i) {
                const n = t.width,
                    s = t.height;
                let o = (e * n) | 0;
                o >= n && (o -= n);
                let r = (i * s) | 0;
                return r >= s && (r = s - 1), t.pixels[r * n + o];
            }
            function cs(t, e, i) {
                const n = t.width,
                    s = t.height,
                    o = t.pixels,
                    r = e * n - 0.5,
                    a = i * s - 0.5;
                let l = Math.floor(r),
                    h = Math.floor(a);
                const c = r - l,
                    u = a - h;
                let d = l + 1,
                    g = h + 1;
                l < 0 && (l += n), d >= n && (d -= n), h < 0 && (h = 0), g >= s && (g = s - 1);
                const p = o[h * n + l],
                    f = o[h * n + d],
                    _ = o[g * n + l],
                    m = o[g * n + d],
                    y = (1 - c) * (1 - u),
                    v = c * (1 - u),
                    w = (1 - c) * u,
                    x = c * u;
                let D = 0;
                for (let t = 0; t < 32; t += 8)
                    D |=
                        ((((p >>> t) & 255) * y +
                            ((f >>> t) & 255) * v +
                            ((_ >>> t) & 255) * w +
                            ((m >>> t) & 255) * x +
                            0.5) |
                            0) <<
                        t;
                return D;
            }
            function us(t, e, i) {
                let n = 0;
                for (let s = 0; s < 32; s += 8) {
                    const o = (t >>> s) & 255;
                    n |= ((o + (((e >>> s) & 255) - o) * i + 0.5) | 0) << s;
                }
                return n;
            }
            function ds(t, e, i) {
                let n = (i - t) / (e - t);
                return (n = n < 0 ? 0 : n > 1 ? 1 : n), n * n * (3 - 2 * n);
            }
            function gs(t, e) {
                const i = Math.cos(e * $n);
                return [i * Math.cos(t * $n), i * Math.sin(t * $n), Math.sin(e * $n)];
            }
            const ps = `#version 300 es\nprecision highp float;\nuniform sampler2D u_image;\nuniform sampler2D u_night;\nuniform float u_height;\nuniform float u_resolution;\nuniform vec2 u_translate;\nuniform float u_scale;\nuniform mat3 u_rotation;\nuniform int u_kind;\nuniform int u_dayNight;\nuniform vec3 u_sun;\nuniform float u_twilight;\nout vec4 color;\n\nconst float PI = 3.141592653589793;\nconst float EQUAL_EARTH_TOP = ${rs};\nconst float NATURAL_EARTH_TOP = ${as};\n\n// Equal Earth: the latitude of the row at raw y, and the longitude a unit of raw x covers there\nvec2 equalEarthRow(float y) {\n\tconst float A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = 0.8660254037844386;\n\tfloat l = y;\n\tfor (int i = 0; i < 8; i++) {\n\t\tfloat l2 = l * l;\n\t\tfloat l6 = l2 * l2 * l2;\n\t\tl -= (l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y) / (A1 + 3.0 * A2 * l2 + l6 * (7.0 * A3 + 9.0 * A4 * l2));\n\t}\n\tfloat l2 = l * l;\n\tfloat l6 = l2 * l2 * l2;\n\treturn vec2(asin(clamp(sin(l) / M, -1.0, 1.0)), M * (A1 + 3.0 * A2 * l2 + l6 * (7.0 * A3 + 9.0 * A4 * l2)) / cos(l));\n}\n\n// Natural Earth, likewise\nvec2 naturalEarthRow(float y) {\n\tfloat phi = y;\n\tfor (int i = 0; i < 12; i++) {\n\t\tfloat p2 = phi * phi;\n\t\tfloat p4 = p2 * p2;\n\t\tphi -= (phi * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4))) - y) / (1.007226 + p2 * (0.045255 + p4 * (-0.311325 + 0.259866 * p2 - 0.065076 * p4)));\n\t}\n\tfloat p2 = phi * phi;\n\treturn vec2(phi, 1.0 / (0.8707 + p2 * (-0.131979 + p2 * (-0.013791 + p2 * p2 * p2 * (0.003971 - 0.001529 * p2)))));\n}\n\nvoid main() {\n\tvec2 css = vec2(gl_FragCoord.x, u_height - gl_FragCoord.y) / u_resolution;\n\tvec2 p = vec2(css.x - u_translate.x, u_translate.y - css.y) / u_scale;\n\tvec3 v;\n\tfloat alpha;\n\tif (u_kind == 0) {\n\t\tfloat r = length(p);\n\t\tfloat edge = 0.5 / (u_scale * u_resolution);\n\t\talpha = clamp((1.0 + edge - r) / (2.0 * edge), 0.0, 1.0);\n\t\tv = vec3(sqrt(max(0.0, 1.0 - r * r)), p.x, p.y);\n\t}\n\telse if (u_kind >= 3) {\n\t\t// Rows off the map are clamped onto it, so the iteration stays finite\n\t\tfloat limit = u_kind == 3 ? EQUAL_EARTH_TOP : NATURAL_EARTH_TOP;\n\t\tfloat y = clamp(p.y, -limit, limit);\n\t\tvec2 row = u_kind == 3 ? equalEarthRow(y) : naturalEarthRow(y);\n\t\tfloat phi = clamp(row.x, -PI / 2.0, PI / 2.0);\n\t\tfloat lambda = p.x * row.y;\n\t\t// The curved sides are anti-aliased half a pixel either side\n\t\tfloat edge = max(fwidth(lambda), 1e-6);\n\t\talpha = abs(p.y) <= limit ? clamp((PI - abs(lambda)) / edge + 0.5, 0.0, 1.0) : 0.0;\n\t\tlambda = clamp(lambda, -PI, PI);\n\t\tv = vec3(cos(phi) * cos(lambda), cos(phi) * sin(lambda), sin(phi));\n\t}\n\telse {\n\t\tfloat phi = u_kind == 2 ? 2.0 * atan(exp(p.y)) - PI / 2.0 : p.y;\n\t\talpha = abs(p.x) <= PI && abs(phi) <= PI / 2.0 ? 1.0 : 0.0;\n\t\tv = vec3(cos(phi) * cos(p.x), cos(phi) * sin(p.x), sin(phi));\n\t}\n\tv = u_rotation * v;\n\tvec2 uv = vec2(atan(v.y, v.x) / (2.0 * PI) + 0.5, 0.5 - asin(clamp(v.z, -1.0, 1.0)) / PI);\n\n\t// Gradients without the jump where longitude wraps round\n\tvec2 wrapped = vec2(fract(uv.x + 0.5), uv.y);\n\tvec2 dx = dFdx(uv);\n\tvec2 dy = dFdy(uv);\n\tvec2 dxWrapped = dFdx(wrapped);\n\tvec2 dyWrapped = dFdy(wrapped);\n\tif (abs(dxWrapped.x) + abs(dyWrapped.x) < abs(dx.x) + abs(dy.x)) {\n\t\tdx = dxWrapped;\n\t\tdy = dyWrapped;\n\t}\n\tvec4 day = textureGrad(u_image, uv, dx, dy);\n\n\t// The sine of the sun's height there: day above the twilight band, night below\n\tif (u_dayNight == 1) {\n\t\tfloat t = smoothstep(-u_twilight, u_twilight, dot(normalize(v), u_sun));\n\t\tday = mix(textureGrad(u_night, uv, dx, dy), day, t);\n\t}\n\tcolor = day * alpha;\n}`;
            let fs,
                _s = -1;
            class ms extends r {
                constructor() {
                    super(...arguments),
                        (this._day = { ready: !1, levels: [] }),
                        (this._night = { ready: !1, levels: [] }),
                        (this._sharp = !1),
                        (this._sunClock = new Yn(this)),
                        (this._stale = !1),
                        (this._webgl = !0);
                }
                _autoAppearReady() {
                    return !0;
                }
                _afterNew() {
                    super._afterNew(),
                        Un++,
                        (this._raster = this.children.push(
                            ke.A.new(this._root, { isMeasured: !1, draw: (t) => this._drawRaster(t) })._markC(
                                "isMeasured",
                                "draw"
                            )
                        ));
                }
                _prepareChildren() {
                    super._prepareChildren(),
                        !this._world &&
                            this.chart &&
                            ((this._world = me(90, 180, -90, -180)), this._addGeometry(this._world, this)),
                        this._stale &&
                            (this.isDirty("visible") || this.isPrivateDirty("visible")) &&
                            this._raster.markDirtyKey("draw"),
                        (this.isDirty("src") || this.isDirty("cors")) && this._load(this._day, this.get("src")),
                        (this.isDirty("nightSrc") || this.isDirty("cors")) &&
                            this._load(this._night, this.get("nightSrc")),
                        this.isDirty("sunDate") && this._sunClock.update(),
                        (this.isDirty("sunPosition") || this.isDirty("twilight")) && this._raster.markDirtyKey("draw");
                }
                markDirtyProjection() {
                    this._raster.markDirtyKey("draw");
                }
                _load(t, e) {
                    const i = t.image;
                    if (
                        ((t.image = void 0),
                        i && (i.src = ""),
                        (t.ready = !1),
                        (t.levels = []),
                        this._deleteTexture(t),
                        this._raster.markDirtyKey("draw"),
                        e)
                    ) {
                        const i = new Image();
                        (i.crossOrigin = this.get("cors", "anonymous")), (i.src = e), (t.image = i);
                        const n = this.events;
                        i.decode()
                            .then(() => {
                                if (t.image === i && !this.isDisposed()) {
                                    if (!this._upload(t) && !this._level(t, 0))
                                        throw new Error(
                                            "MapRasterSeries: the image can not be read; a cross-origin image needs CORS headers"
                                        );
                                    (t.ready = !0),
                                        this._raster.markDirtyKey("draw"),
                                        this._loaded() &&
                                            n.isEnabled("loaded") &&
                                            n.dispatch("loaded", { type: "loaded", target: this });
                                }
                            })
                            .catch((e) => {
                                t.image === i &&
                                    ((t.image = void 0),
                                    e && e.message && console.warn(e.message),
                                    !n.isDisposed() &&
                                        n.isEnabled("loaderror") &&
                                        n.dispatch("loaderror", { type: "loaderror", target: this }));
                            });
                    }
                }
                _loaded() {
                    return this._day.ready && (!this.get("nightSrc") || this._night.ready);
                }
                _nightImage() {
                    return this.get("sunPosition") && this.get("nightSrc") && this._night.ready ? this._night : void 0;
                }
                _upload(t) {
                    const e = this._webgl ? Wn() : void 0,
                        i = t.image;
                    if (!e || !i) return !1;
                    const n = e.gl,
                        s = n.getParameter(n.MAX_TEXTURE_SIZE);
                    let o = i;
                    if (i.naturalWidth > s || i.naturalHeight > s) {
                        const t = Math.min(s / i.naturalWidth, s / i.naturalHeight),
                            e = document.createElement("canvas");
                        (e.width = Math.floor(i.naturalWidth * t)), (e.height = Math.floor(i.naturalHeight * t));
                        const n = e.getContext("2d");
                        (n.imageSmoothingQuality = "high"), n.drawImage(i, 0, 0, e.width, e.height), (o = e);
                    }
                    const r = n.createTexture();
                    if (!r) return !1;
                    n.bindTexture(n.TEXTURE_2D, r),
                        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
                        n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
                    try {
                        n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, o);
                    } catch (t) {
                        return n.deleteTexture(r), !1;
                    }
                    n.generateMipmap(n.TEXTURE_2D),
                        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR_MIPMAP_LINEAR),
                        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR),
                        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.REPEAT),
                        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
                    const a = n.getExtension("EXT_texture_filter_anisotropic");
                    return (
                        a &&
                            n.texParameterf(
                                n.TEXTURE_2D,
                                a.TEXTURE_MAX_ANISOTROPY_EXT,
                                Math.min(8, n.getParameter(a.MAX_TEXTURE_MAX_ANISOTROPY_EXT))
                            ),
                        (t.texture = { generation: e.generation, texture: r }),
                        !0
                    );
                }
                _textureOf(t, e) {
                    return (t.texture && t.texture.generation === e.generation) || this._upload(t);
                }
                _deleteTexture(t) {
                    if (t.texture) {
                        const e = Wn();
                        e && e.generation === t.texture.generation && e.gl.deleteTexture(t.texture.texture),
                            (t.texture = void 0);
                    }
                }
                _level(t, e) {
                    let i = t.levels[e];
                    const n = t.image;
                    if (!i && n && n.naturalWidth) {
                        const s = Math.max(1, Math.round(n.naturalWidth / Math.pow(2, e))),
                            o = Math.max(1, Math.round(n.naturalHeight / Math.pow(2, e))),
                            r = document.createElement("canvas");
                        (r.width = s), (r.height = o);
                        const a = r.getContext("2d");
                        (a.imageSmoothingQuality = "high"), a.drawImage(n, 0, 0, s, o);
                        try {
                            i = {
                                width: s,
                                height: o,
                                pixels: new Uint32Array(a.getImageData(0, 0, s, o).data.buffer),
                            };
                        } catch (t) {
                            return;
                        }
                        t.levels[e] = i;
                    }
                    return i;
                }
                _drawRaster(t) {
                    const e = this.chart,
                        i = this.projection();
                    if (!e || !i || !this._day.ready) return;
                    const n = e.seriesContainer.width(),
                        s = e.seriesContainer.height();
                    if (!(n > 0 && s > 0)) return;
                    if (!1 === this.get("visible") || !1 === this.getPrivate("visible")) return void (this._stale = !0);
                    this._stale = !1;
                    const o = this._render(i, n, s);
                    o && t.image(o, n, s, 0, 0);
                }
                _target(t, e) {
                    let i = this._canvas;
                    return (
                        i ||
                            ((i = document.createElement("canvas")),
                            (this._canvas = i),
                            (this._context = i.getContext("2d"))),
                        (i.width === t && i.height === e) || ((i.width = t), (i.height = e)),
                        i
                    );
                }
                _render(t, e, i) {
                    const n = t.scale(),
                        s = t.translate(),
                        o = (function (t) {
                            const e = t.rotate ? U(t.rotate()) : void 0,
                                i = [];
                            for (const t of [
                                [0, 0],
                                [90, 0],
                                [0, 90],
                            ]) {
                                const n = e ? e.invert(t) : t;
                                i.push(...gs(n[0], n[1]));
                            }
                            return i;
                        })(t),
                        r = (function (t, e) {
                            const i = t.scale(),
                                n = t.translate();
                            for (const s of [0, 1, 2, 3, 4]) {
                                let o = !0;
                                for (const [r, a] of [
                                    [0.1, 0.2],
                                    [-0.3, 0.1],
                                    [0.25, -0.35],
                                ]) {
                                    const l = ts(s, r, a),
                                        h = e[0] * l[0] + e[3] * l[1] + e[6] * l[2],
                                        c = e[1] * l[0] + e[4] * l[1] + e[7] * l[2],
                                        u = e[2] * l[0] + e[5] * l[1] + e[8] * l[2],
                                        d = t([Math.atan2(c, h) * Qn, Math.asin(Math.max(-1, Math.min(1, u))) * Qn]);
                                    if (
                                        !d ||
                                        Math.abs(d[0] - (n[0] + i * r)) > 0.01 ||
                                        Math.abs(d[1] - (n[1] - i * a)) > 0.01
                                    ) {
                                        o = !1;
                                        break;
                                    }
                                }
                                if (o) return s;
                            }
                        })(t, o),
                        a = this._nightImage(),
                        l = this.get("sunPosition"),
                        h = a && l ? gs(l.longitude, l.latitude) : void 0,
                        c = Math.sin((Math.max(this.get("twilight", 12), 0.01) / 2) * $n);
                    let u, d;
                    void 0 !== r &&
                        this._webgl &&
                        ((u = Wn()),
                        (d =
                            u &&
                            (function (t) {
                                if (!fs || fs.generation !== t.generation) {
                                    if (((fs = void 0), _s === t.generation)) return;
                                    const e = t.gl,
                                        i = (function (t, e, i) {
                                            const n = qn(
                                                    t,
                                                    t.VERTEX_SHADER,
                                                    "#version 300 es\nvoid main() {\n\tvec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));\n\tgl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);\n}"
                                                ),
                                                s = qn(t, t.FRAGMENT_SHADER, i),
                                                o = t.createProgram();
                                            if (n && s && o)
                                                return (
                                                    t.attachShader(o, n),
                                                    t.attachShader(o, s),
                                                    t.linkProgram(o),
                                                    t.deleteShader(n),
                                                    t.deleteShader(s),
                                                    t.getProgramParameter(o, t.LINK_STATUS)
                                                        ? o
                                                        : (console.warn("WebGL program: " + t.getProgramInfoLog(o)),
                                                          void t.deleteProgram(o))
                                                );
                                        })(e, 0, ps),
                                        n = e.createVertexArray();
                                    if (i && n) {
                                        const s = {};
                                        for (const t of [
                                            "image",
                                            "night",
                                            "height",
                                            "resolution",
                                            "translate",
                                            "scale",
                                            "rotation",
                                            "kind",
                                            "dayNight",
                                            "sun",
                                            "twilight",
                                        ])
                                            s[t] = e.getUniformLocation(i, "u_" + t);
                                        fs = { generation: t.generation, program: i, vertexArray: n, uniforms: s };
                                    } else _s = t.generation;
                                }
                                return fs;
                            })(u)),
                        (u && d && this._textureOf(this._day, u) && (!a || this._textureOf(a, u))) || (u = void 0));
                    let g = this._root._renderer.resolution;
                    (u && this._root._renderer instanceof Zn.KB) || (g = this._draftResolution(g));
                    const p = Math.max(1, Math.round(e * g)),
                        f = Math.max(1, Math.round(i * g));
                    if (u && d) {
                        const t = this._renderGL(u, d, r, o, n, s[0], s[1], p, f, g, a, h, c);
                        if (t) return t;
                    }
                    if (!this._level(this._day, 0) || (a && !this._level(a, 0))) return;
                    const _ = this._target(p, f);
                    let m = this._output;
                    (m && m.width === p && m.height === f) ||
                        ((m = this._context.createImageData(p, f)), (this._output = m));
                    const y = new Uint32Array(m.data.buffer);
                    return (
                        y.fill(0),
                        void 0 === r
                            ? this._renderInverse(t, y, p, f, g, a, h, c)
                            : this._renderRaw(r, o, n, s[0], s[1], y, p, f, g, a, h, c),
                        this._context.putImageData(m, 0, 0),
                        _
                    );
                }
                _draftResolution(t) {
                    return t <= 1
                        ? t
                        : (this._settle && (this.removeDispose(this._settle), (this._settle = void 0)),
                          this._sharp
                              ? ((this._sharp = !1), t)
                              : ((this._settle = this.setTimeout(() => {
                                    (this._settle = void 0), (this._sharp = !0), this._raster.markDirtyKey("draw");
                                }, 250)),
                                1));
                }
                _renderGL(t, e, i, n, s, o, r, a, l, h, c, u, d) {
                    const g = t.gl,
                        p = t.canvas,
                        f = g.getParameter(g.MAX_VIEWPORT_DIMS);
                    if (a > f[0] || l > f[1]) return;
                    if (
                        ((p.width < a || p.height < l) &&
                            ((p.width = Math.max(p.width, a)), (p.height = Math.max(p.height, l))),
                        (g.drawingBufferWidth < p.width || g.drawingBufferHeight < p.height) &&
                            ((p.width = a), (p.height = l), g.drawingBufferWidth < a || g.drawingBufferHeight < l))
                    )
                        return;
                    g.viewport(0, 0, a, l),
                        g.clearColor(0, 0, 0, 0),
                        g.clear(g.COLOR_BUFFER_BIT),
                        g.useProgram(e.program),
                        g.bindVertexArray(e.vertexArray);
                    const _ = this._day.texture.texture;
                    g.activeTexture(g.TEXTURE0),
                        g.bindTexture(g.TEXTURE_2D, _),
                        g.activeTexture(g.TEXTURE1),
                        g.bindTexture(g.TEXTURE_2D, c ? c.texture.texture : _);
                    const m = e.uniforms;
                    g.uniform1i(m.image, 0),
                        g.uniform1i(m.night, 1),
                        g.uniform1f(m.height, l),
                        g.uniform1f(m.resolution, h),
                        g.uniform2f(m.translate, o, r),
                        g.uniform1f(m.scale, s),
                        g.uniformMatrix3fv(m.rotation, !1, n),
                        g.uniform1i(m.kind, i),
                        g.uniform1i(m.dayNight, c && u ? 1 : 0),
                        g.uniform3f(m.sun, u ? u[0] : 0, u ? u[1] : 0, u ? u[2] : 1),
                        g.uniform1f(m.twilight, d),
                        g.drawArrays(g.TRIANGLES, 0, 3);
                    const y = this._target(a, l),
                        v = this._context;
                    return (
                        v.clearRect(0, 0, a, l),
                        v.drawImage(p, 0, p.height - l, a, l, 0, 0, a, l),
                        g.isContextLost() && this.setTimeout(() => this._raster.markDirtyKey("draw"), 0),
                        y
                    );
                }
                _pick(t, e) {
                    return e < 1 ? [t.levels[0], !0] : [this._level(t, Math.floor(Math.log2(e))) || t.levels[0], !1];
                }
                _renderRaw(t, e, i, n, s, o, r, a, l, h, c, u) {
                    const d = e[0],
                        g = e[1],
                        p = e[2],
                        f = e[3],
                        _ = e[4],
                        m = e[5],
                        y = e[6],
                        v = e[7],
                        w = e[8],
                        x = i * l,
                        D = 1 / x,
                        M = 0 === t,
                        P = this._day.levels[0],
                        S = !(!h || !c),
                        I = c ? c[0] : 0,
                        b = c ? c[1] : 0,
                        T = c ? c[2] : 0,
                        k = (P.width * Jn) / x,
                        C = (P.height * Kn) / x,
                        A = (S ? h.levels[0] : P).width / P.width,
                        L = 0.5 / x,
                        N = (1 + L) * (1 + L);
                    let [R, E] = this._pick(this._day, Math.min(k, C)),
                        [B, F] = S ? this._pick(h, Math.min(k, C) * A) : [R, E],
                        z = R.width,
                        O = R.height,
                        G = R.pixels;
                    for (let e = 0; e < a; e++) {
                        const a = (s - (e + 0.5) / l) / i;
                        let c = 0,
                            x = r - 1,
                            P = 0,
                            j = 0,
                            X = 1;
                        if (M) {
                            const t = N - a * a;
                            if (t <= 0) continue;
                            const e = Math.sqrt(t);
                            (c = Math.max(0, Math.floor((n - e * i) * l - 0.5))),
                                (x = Math.min(r - 1, Math.ceil((n + e * i) * l - 0.5)));
                        } else {
                            const e = ls(t, a);
                            if (!e) continue;
                            const i = e[0];
                            (X = e[1]), (P = Math.cos(i)), (j = Math.sin(i));
                            const n = Math.min(k * X, 2 === t ? C * P : C);
                            ([R, E] = this._pick(this._day, n)),
                                S && ([B, F] = this._pick(h, n * A)),
                                (z = R.width),
                                (O = R.height),
                                (G = R.pixels);
                        }
                        const Y = e * r;
                        let Z = ((c + 0.5) / l - n) / i;
                        for (let t = c; t <= x; t++, Z += D) {
                            let e,
                                i,
                                n,
                                s = 1;
                            if (M) {
                                const t = Z * Z + a * a;
                                if (t >= N) continue;
                                let o = 0;
                                t < 1 && (o = Math.sqrt(1 - t));
                                const r = Math.sqrt(t);
                                r > 1 - L && (s = (1 + L - r) / (2 * L)),
                                    (e = d * o + f * Z + y * a),
                                    (i = g * o + _ * Z + v * a),
                                    (n = p * o + m * Z + w * a);
                            } else {
                                let t = Z * X;
                                const o = (t < 0 ? -t : t) - Math.PI;
                                if (1 === X) {
                                    if (o > 0) continue;
                                } else {
                                    const e = D * X;
                                    if (o > e / 2) continue;
                                    o > -e / 2 && ((s = 0.5 - o / e), o > 0 && (t = t < 0 ? -Math.PI : Math.PI));
                                }
                                const r = P * Math.cos(t),
                                    a = P * Math.sin(t);
                                (e = d * r + f * a + y * j), (i = g * r + _ * a + v * j), (n = p * r + m * a + w * j);
                            }
                            const r = Math.atan2(i, e),
                                l = Math.asin(n > 1 ? 1 : n < -1 ? -1 : n),
                                h = r * Jn + 0.5,
                                c = 0.5 - l * Kn;
                            let x;
                            if (E) x = cs(R, h, c);
                            else {
                                let t = (h * z) | 0;
                                t >= z && (t -= z);
                                let e = (c * O) | 0;
                                e >= O && (e = O - 1), (x = G[e * z + t]);
                            }
                            if (S) {
                                const t = ds(-u, u, (e * I + i * b + n * T) / Math.sqrt(e * e + i * i + n * n));
                                if (t < 1) {
                                    const e = F ? cs(B, h, c) : hs(B, h, c);
                                    x = t > 0 ? us(e, x, t) : e;
                                }
                            }
                            s < 1 && (x = (16777215 & x) | (((x >>> 24) * s) << 24)), (o[Y + t] = x);
                        }
                    }
                }
                _renderInverse(t, e, i, n, s, o, r, a) {
                    const l = t.invert;
                    if (!l) return;
                    const h = (this._day.levels[0].width * Jn) / (t.scale() * s),
                        [c, u] = this._pick(this._day, h),
                        d = u ? cs : hs,
                        g = !(!o || !r),
                        [p, f] = g ? this._pick(o, (h * o.levels[0].width) / this._day.levels[0].width) : [c, u],
                        _ = f ? cs : hs,
                        m = 0.5 / s,
                        y = [0, 0];
                    for (let o = 0; o < n; o++) {
                        y[1] = (o + 0.5) / s;
                        const n = o * i;
                        for (let o = 0; o < i; o++) {
                            y[0] = (o + 0.5) / s;
                            const i = l(y);
                            if (!i || !isFinite(i[0]) || !isFinite(i[1]) || i[1] > 90 || i[1] < -90) continue;
                            const h = t(i);
                            if (!h || Math.abs(h[0] - y[0]) > m || Math.abs(h[1] - y[1]) > m) continue;
                            let u = i[0] / 360 + 0.5;
                            u -= Math.floor(u);
                            const f = 0.5 - i[1] / 180;
                            let v = d(c, u, f);
                            if (g) {
                                const t = gs(i[0], i[1]),
                                    e = ds(-a, a, t[0] * r[0] + t[1] * r[1] + t[2] * r[2]);
                                if (e < 1) {
                                    const t = _(p, u, f);
                                    v = e > 0 ? us(t, v, e) : t;
                                }
                            }
                            e[n + o] = v;
                        }
                    }
                }
                _dispose() {
                    this._world && this._removeGeometry(this._world),
                        this._sunClock.dispose(),
                        (Un = Math.max(0, Un - 1)),
                        0 === Un && Hn && ((Hn.canvas.width = 1), (Hn.canvas.height = 1)),
                        super._dispose();
                    for (const t of [this._day, this._night])
                        this._deleteTexture(t), t.image && (t.image.src = ""), (t.image = void 0), (t.levels = []);
                    (this._output = void 0), (this._canvas = void 0), (this._context = void 0);
                }
            }
            (ms.className = "MapRasterSeries"), (ms.classNames = r.classNames.concat([ms.className]));
            var ys = i(1272),
                vs = i.n(ys);
            class ws extends ke.A {
                constructor() {
                    super(...arguments), (this._projectionDirty = !1);
                }
                _afterNew() {
                    super._afterNew(), this.setPrivate("trustBounds", !0);
                }
                _beforeChanged() {
                    if ((super._beforeChanged(), this.isDirty("focusable") && this.get("focusable"))) {
                        const t = this.dataItem && this.dataItem.component,
                            e = t && t.chart;
                        e && e._scheduleFocusView();
                    }
                    if (this._projectionDirty || this.isDirty("geometry") || this.isDirty("precision")) {
                        const t = this.get("geometry");
                        if (t) {
                            const e = this.series;
                            if (e) {
                                const i = e.projection();
                                i && i.precision(this.get("precision", 0.5));
                                const n = e.geoPath();
                                n &&
                                    ((this._clear = !0),
                                    this.set("draw", (e) => {
                                        n.context(this._display), n(t), n.context(null);
                                    }),
                                    this.isHover() && this.showTooltip());
                            }
                        }
                    }
                }
                markDirtyProjection() {
                    this.markDirty(), (this._projectionDirty = !0);
                }
                _clearDirty() {
                    super._clearDirty(), (this._projectionDirty = !1);
                }
                geoCentroid() {
                    const t = this.get("geometry");
                    return t ? pe(t) : { latitude: 0, longitude: 0 };
                }
                visualCentroid() {
                    let t = 0,
                        e = [];
                    const i = this.get("geometry");
                    if (i) {
                        if ("Polygon" == i.type) e = i.coordinates;
                        else if ("MultiPolygon" == i.type)
                            for (let n = 0; n < i.coordinates.length; n++) {
                                let s = i.coordinates[n],
                                    o = te({ type: "Polygon", coordinates: s });
                                o > t && ((e = s), (t = o));
                            }
                        if (e) {
                            let t = vs()(e);
                            return { longitude: t[0], latitude: t[1] };
                        }
                    }
                    return { longitude: 0, latitude: 0 };
                }
                _getTooltipPoint() {
                    const t = this.series;
                    if (t) {
                        const e = t.projection();
                        if (e) {
                            const t = this.visualCentroid(),
                                i = e([t.longitude, t.latitude]);
                            if (i) return { x: i[0], y: i[1] };
                        }
                    }
                    return { x: 0, y: 0 };
                }
            }
            (ws.className = "MapPolygon"), (ws.classNames = ke.A.classNames.concat([ws.className]));
            class xs extends r {
                constructor() {
                    super(...arguments),
                        (this._clickDps = new Map()),
                        (this.mapPolygons = this.addDisposer(
                            new je.TS(Xe.Bj.new({}), () => ws._new(this._root, {}, [this.mapPolygons.template]))
                        )),
                        (this._types = ["Polygon", "MultiPolygon"]);
                }
                makeMapPolygon(t) {
                    const e = this.children.push(this._newMapPolygon());
                    return (
                        e._setDataItem(t),
                        this._linkSprite(e, t),
                        this.mapPolygons.push(e),
                        this.get("clickZoom") && this._watchClick(e),
                        e
                    );
                }
                _newMapPolygon() {
                    return this.mapPolygons.make();
                }
                markDirtyProjection() {
                    s.each(this.dataItems, (t) => {
                        let e = t.get("mapPolygon");
                        e && e.markDirtyProjection();
                    });
                }
                _prepareChildren() {
                    super._prepareChildren(),
                        (this.isDirty("clickZoom") || this.chart !== this._clickZoomChart) && this._setUpClickZoom(),
                        this.isDirty("fill") && this.mapPolygons.template._setC("fill", this.get("fill")),
                        this.isDirty("stroke") && this.mapPolygons.template._setC("stroke", this.get("stroke"));
                }
                processDataItem(t) {
                    super.processDataItem(t);
                    let e = t.get("mapPolygon");
                    e || (e = this.makeMapPolygon(t)), t.set("mapPolygon", e);
                    let i = t.get("geometry");
                    if (i) {
                        if (this.get("reverseGeodata") && !i._reversed && i.coordinates) {
                            for (let t = 0; t < i.coordinates.length; t++)
                                if ("MultiPolygon" == i.type)
                                    for (let e = 0; e < i.coordinates[t].length; e++) i.coordinates[t][e].reverse();
                                else i.coordinates[t].reverse();
                            i._reversed = !0;
                        }
                        e._setC("geometry", i);
                    }
                    (e.series = this), this._addGeometry(t.get("geometry"), this);
                }
                disposeDataItem(t) {
                    super.disposeDataItem(t);
                    const e = t.get("mapPolygon");
                    e && (this._clickDps.delete(e), this.mapPolygons.removeValue(e), e.dispose()),
                        this._zoomedDataItem === t && (this._zoomedDataItem = void 0),
                        this._removeGeometry(t.get("geometry"));
                }
                _excludeDataItem(t) {
                    super._excludeDataItem(t);
                    const e = t.get("mapPolygon");
                    e && this._setExcluded(e, !0);
                }
                _unexcludeDataItem(t) {
                    super._unexcludeDataItem(t);
                    const e = t.get("mapPolygon");
                    e && this._setExcluded(e, !1);
                }
                _notIncludeDataItem(t) {
                    super._notIncludeDataItem(t);
                    const e = t.get("mapPolygon");
                    e && this._setExcluded(e, !0);
                }
                _unNotIncludeDataItem(t) {
                    super._unNotIncludeDataItem(t);
                    const e = t.get("mapPolygon");
                    e && this._setExcluded(e, !1);
                }
                markDirtyValues(t) {
                    if ((super.markDirtyValues(), t)) {
                        const e = t.get("mapPolygon");
                        e && e._setC("geometry", t.get("geometry"));
                    }
                }
                _watchClick(t) {
                    this._clickDps.set(
                        t,
                        t.events.on("click", () => {
                            this._clickZoomTo(t);
                        })
                    );
                }
                _unwatchClicks() {
                    this._clickDps.forEach((t) => {
                        t.dispose();
                    }),
                        this._clickDps.clear(),
                        this._clickBackgroundDp &&
                            (this._clickBackgroundDp.dispose(), (this._clickBackgroundDp = void 0));
                }
                _setUpClickZoom() {
                    this._unwatchClicks();
                    const t = this.chart;
                    if (((this._clickZoomChart = t), this.get("clickZoom"))) {
                        this.mapPolygons.each((t) => {
                            this._watchClick(t);
                        });
                        const e = t ? t.chartContainer.get("background") : void 0;
                        e &&
                            (this._clickBackgroundDp = e.events.on("click", () => {
                                this._clickZoomOut();
                            }));
                    } else this._markZoomed(void 0);
                }
                _onGoHome() {
                    this._markZoomed(void 0);
                }
                _dispose() {
                    super._dispose(), this._unwatchClicks();
                }
                _clickZoomTo(t) {
                    const e = this.chart,
                        i = t.dataItem;
                    e &&
                        i &&
                        (this._zoomedDataItem === i
                            ? this._clickZoomOut(t)
                            : (this._markZoomed(i, t),
                              this.zoomToDataItem(i, "rotateX" == e.get("panX") || "rotateY" == e.get("panY"))));
                }
                _clickZoomOut(t) {
                    const e = this.chart;
                    e && this._zoomedDataItem && (this._markZoomed(void 0, t), e.goHome());
                }
                _markZoomed(t, e) {
                    const i = this._zoomedDataItem ? this._zoomedDataItem.get("mapPolygon") : void 0,
                        n = t ? t.get("mapPolygon") : void 0;
                    (this._zoomedDataItem = t),
                        s.each([i, n], (t) => {
                            !t ||
                                t.isDisposed() ||
                                (t === e && "active" == t.get("toggleKey")) ||
                                t._setC("active", t === n);
                        });
                }
                zoomToDataItem(t, e) {
                    const i = t.get("mapPolygon");
                    if (i) {
                        const t = i.get("geometry"),
                            n = this.chart;
                        if (t && n) {
                            if (e) {
                                const e = pe(t);
                                return (
                                    n.rotate(-e.longitude, -e.latitude),
                                    n.zoomToGeoBounds(_e(t), void 0, -e.longitude, -e.latitude)
                                );
                            }
                            return n.zoomToGeoBounds(_e(t));
                        }
                    }
                }
                zoomToDataItems(t, e) {
                    let i, n, o, r;
                    if (
                        (s.each(t, (t) => {
                            const e = t.get("mapPolygon");
                            if (e) {
                                const t = e.get("geometry");
                                if (t) {
                                    let e = _e(t);
                                    null == i && (i = e.left),
                                        null == n && (n = e.right),
                                        null == o && (o = e.top),
                                        null == r && (r = e.bottom),
                                        (i = Math.min(e.left, i)),
                                        (n = Math.max(e.right, n)),
                                        (o = Math.max(e.top, o)),
                                        (r = Math.min(e.bottom, r));
                                }
                            }
                        }),
                        null != i && null != n && null != o && null != r)
                    ) {
                        const t = this.chart;
                        if (t) {
                            if (e) {
                                const e = i + (n - i) / 2,
                                    s = r + (o - r) / 2;
                                return (
                                    t.rotate(-e, -s),
                                    t.zoomToGeoBounds({ left: i, right: n, top: o, bottom: r }, void 0, -e, -s)
                                );
                            }
                            return t.zoomToGeoBounds({ left: i, right: n, top: o, bottom: r });
                        }
                    }
                }
                getPolygonByPoint(t) {
                    let e;
                    const i = this._display._renderer.getObjectAtPoint(t);
                    if (i)
                        return (
                            this.mapPolygons.each(function (t) {
                                t._display == i && (e = t);
                            }),
                            e
                        );
                }
                getPolygonByGeoPoint(t) {
                    const e = this.chart;
                    return this.getPolygonByPoint(e.seriesContainer.toGlobal(e.convert(t)));
                }
            }
            (xs.className = "MapPolygonSeries"), (xs.classNames = r.classNames.concat([xs.className]));
            var Ds = i(3002),
                Ms = i(9484),
                Ps = i(1527),
                Ss = i(3100);
            class Is extends Xn {
                constructor() {
                    super(...arguments),
                        (this._dataItem = this.makeDataItem({})),
                        (this._clusterIndex = 0),
                        (this._clusters = []),
                        (this.clusteredDataItems = []),
                        (this._scatterIndex = 0),
                        (this._scatters = []),
                        (this._packLayout = Ss.A()),
                        (this._spiral = []),
                        (this._previousZL = 0);
                }
                _afterNew() {
                    this.fields.push("groupId"), this._setRawDefault("groupIdField", "groupId"), super._afterNew();
                }
                _afterDataChange() {
                    super._afterDataChange(), (this._previousZL = 0);
                }
                _updateChildren() {
                    super._updateChildren(),
                        this.isDirty("scatterRadius") && (this._spiral = l.spiralPoints(0, 0, 300, 300, 0, 3, 3, 0, 0));
                    const t = this.chart;
                    if (t) {
                        const e = t.get("zoomLevel", 1);
                        if (e != this._previousZL) {
                            const t = this.get("clusterDelay", 0);
                            t
                                ? this._clusterDP
                                    ? (this._clusterDP.dispose(),
                                      (this._clusterDP = this.setTimeout(() => {
                                          this._doTheCluster();
                                      }, t)))
                                    : (this._doTheCluster(), (this._clusterDP = this.setTimeout(() => {}, 0)))
                                : this._doTheCluster(),
                                (this._previousZL = e);
                        }
                        s.each(this.clusteredDataItems, (t) => {
                            const e = t.get("bullet"),
                                i = t.get("longitude", 0),
                                n = t.get("latitude", 0);
                            this._positionBulletReal(
                                e,
                                { type: "Point", coordinates: [i, n] },
                                [i, n],
                                void 0,
                                t.get("altitude")
                            );
                        });
                    }
                }
                _doTheCluster() {
                    const t = {};
                    s.each(this.dataItems, (e) => {
                        const i = e.get("groupId", "_default");
                        t[i] || (t[i] = []), t[i].push(e);
                    }),
                        (this._scatterIndex = -1),
                        (this._scatters = []),
                        (this._clusterIndex = -1),
                        (this._clusters = []),
                        s.each(this.clusteredDataItems, (t) => {
                            t.setRaw("children", void 0);
                        }),
                        s.each(this.dataItems, (t) => {
                            t.setRaw("cluster", void 0);
                        }),
                        o.each(t, (t, e) => {
                            this._scatterGroup(e);
                        }),
                        o.each(t, (t, e) => {
                            this._clusterGroup(e);
                        }),
                        s.each(this.dataItems, (t) => {
                            if (!t.get("cluster")) {
                                const e = t.bullets;
                                e &&
                                    s.each(e, (t) => {
                                        const e = t.get("sprite");
                                        e && e.set("forceHidden", !1);
                                    });
                            }
                        });
                }
                zoomToCluster(t, e) {
                    this.zoomToDataItems(t.get("children", []), e);
                }
                _clusterGroup(t) {
                    const e = this.chart;
                    if (e && e.get("zoomLevel", 1) >= e.get("maxZoomLevel", 100) * this.get("stopClusterZoom", 0.95));
                    else {
                        const e = this.get("minDistance", 20),
                            i = e * e,
                            n = [];
                        for (let e = 0; e < t.length; e++) {
                            const i = t[e];
                            if (!i.get("clipped")) {
                                const t = i.get("point");
                                t && n.push({ di: i, x: t.x, y: t.y });
                            }
                        }
                        const s = new Map();
                        for (let t = 0; t < n.length; t++) {
                            const i = n[t],
                                o = Math.floor(i.x / e) + "," + Math.floor(i.y / e);
                            let r = s.get(o);
                            r || ((r = []), s.set(o, r)), r.push(t);
                        }
                        const o = new Uint8Array(n.length);
                        for (let t = 0; t < n.length; t++) {
                            if (o[t]) continue;
                            (o[t] = 1), this._clusterIndex++, (this._clusters[this._clusterIndex] = []);
                            const r = this._clusters[this._clusterIndex],
                                a = n[t];
                            r.push(a.di);
                            const l = [a];
                            let h = 0;
                            for (; h < l.length; ) {
                                const t = l[h++],
                                    a = Math.floor(t.x / e),
                                    c = Math.floor(t.y / e);
                                for (let e = -1; e <= 1; e++)
                                    for (let h = -1; h <= 1; h++) {
                                        const u = s.get(a + e + "," + (c + h));
                                        if (u)
                                            for (let e = 0; e < u.length; e++) {
                                                const s = u[e];
                                                if (o[s]) continue;
                                                const a = n[s],
                                                    h = a.x - t.x,
                                                    c = a.y - t.y;
                                                h * h + c * c < i && ((o[s] = 1), r.push(a.di), l.push(a));
                                            }
                                    }
                            }
                        }
                    }
                    let i = 0;
                    const n = this.get("clusteredBullet");
                    n &&
                        s.each(this._clusters, (t) => {
                            let e = 0,
                                o = 0,
                                r = 0,
                                a = 0,
                                h = 0,
                                c = 0,
                                u = t.length;
                            if (u > 1) {
                                let d,
                                    g = this.clusteredDataItems[i];
                                if (!g) {
                                    g = new Ds.s(this, void 0, {});
                                    const t = g.set("bullet", n(this._root, this, g));
                                    if (t) {
                                        const e = t.get("sprite");
                                        e &&
                                            (this.bulletsContainer.children.push(e),
                                            e._setDataItem(g),
                                            this.root.events.once("frameended", () => {
                                                e instanceof Ms.m &&
                                                    e.walkChildren((t) => {
                                                        t instanceof Ds.u && t.markDirtyValues();
                                                    });
                                            }));
                                    }
                                    this.clusteredDataItems.push(g);
                                }
                                s.each(t, (t) => {
                                    t.setRaw("cluster", g);
                                    const i = t.get("point");
                                    i && ((e += i.x), (o += i.y));
                                    const n = t.get("longitude", 0) * l.RADIANS,
                                        u = t.get("latitude", 0) * l.RADIANS;
                                    (r += t.get("altitude", 0)),
                                        (a += Math.cos(u) * Math.cos(n)),
                                        (h += Math.cos(u) * Math.sin(n)),
                                        (c += Math.sin(u));
                                    const p = t.bullets;
                                    p &&
                                        s.each(p, (t) => {
                                            const e = t.get("sprite");
                                            e && e.set("forceHidden", !0);
                                        }),
                                        (d = t.get("groupId"));
                                });
                                let p = e / u,
                                    f = o / u;
                                g.setRaw("children", t), g.setRaw("groupId", d);
                                const _ = g.get("value");
                                g.setRaw("value", u);
                                const m = r / u;
                                g.setRaw("altitude", m || void 0);
                                const y = g.get("bullet");
                                if (y) {
                                    let t = m
                                        ? {
                                              longitude: Math.atan2(h, a) * l.DEGREES,
                                              latitude: Math.atan2(c, Math.sqrt(a * a + h * h)) * l.DEGREES,
                                          }
                                        : this.chart.invert({ x: p, y: f });
                                    t && g.setAll({ longitude: t.longitude, latitude: t.latitude }),
                                        this._positionBullets(g);
                                    const e = y.get("sprite");
                                    e &&
                                        (e.set("forceHidden", !1),
                                        _ != u &&
                                            e instanceof Ms.m &&
                                            e.walkChildren((t) => {
                                                t instanceof Ps.J && t.text.markDirtyText();
                                            }));
                                }
                                i++;
                            }
                        }),
                        s.each(this.clusteredDataItems, (t) => {
                            let e = t.get("children");
                            if (!e || 0 == e.length) {
                                const e = t.get("bullet");
                                if (e) {
                                    const t = e.get("sprite");
                                    t && t.set("forceHidden", !0);
                                }
                            }
                        });
                }
                _onDataClear() {
                    super._onDataClear(),
                        s.each(this.clusteredDataItems, (t) => {
                            const e = t.get("bullet");
                            if (e) {
                                const t = e.get("sprite");
                                t && t.dispose();
                            }
                        }),
                        (this.clusteredDataItems = []);
                }
                _scatterGroup(t) {
                    const e = this.chart;
                    if (e && e.get("zoomLevel", 1) >= e.get("maxZoomLevel", 100) * this.get("stopClusterZoom", 0.95)) {
                        const e = this.get("scatterDistance", 5),
                            i = e * e,
                            n = [];
                        for (let e = 0; e < t.length; e++) {
                            const i = t[e];
                            if (!i.get("clipped")) {
                                const t = i.get("point");
                                t && n.push({ di: i, x: t.x, y: t.y });
                            }
                        }
                        const o = new Map();
                        for (let t = 0; t < n.length; t++) {
                            const i = n[t],
                                s = Math.floor(i.x / e) + "," + Math.floor(i.y / e);
                            let r = o.get(s);
                            r || ((r = []), o.set(s, r)), r.push(t);
                        }
                        const r = new Uint8Array(n.length);
                        for (let t = 0; t < n.length; t++) {
                            if (r[t]) continue;
                            (r[t] = 1), this._scatterIndex++, (this._scatters[this._scatterIndex] = []);
                            const s = this._scatters[this._scatterIndex],
                                a = n[t];
                            s.push(a.di);
                            const l = [a];
                            let h = 0;
                            for (; h < l.length; ) {
                                const t = l[h++],
                                    a = Math.floor(t.x / e),
                                    c = Math.floor(t.y / e);
                                for (let e = -1; e <= 1; e++)
                                    for (let h = -1; h <= 1; h++) {
                                        const u = o.get(a + e + "," + (c + h));
                                        if (u)
                                            for (let e = 0; e < u.length; e++) {
                                                const o = u[e];
                                                if (r[o]) continue;
                                                const a = n[o],
                                                    h = a.x - t.x,
                                                    c = a.y - t.y;
                                                h * h + c * c < i && ((r[o] = 1), s.push(a.di), l.push(a));
                                            }
                                    }
                            }
                        }
                        s.each(this._scatters, (t) => {
                            if (t.length > 1) {
                                let e = [],
                                    i = 0,
                                    n = this.get("scatterRadius", 8);
                                s.each(t, (t) => {
                                    let o = this._spiral[i],
                                        r = !0;
                                    if (e.length > 0)
                                        for (; r; )
                                            s.each(e, (t) => {
                                                for (r = !1; l.circlesOverlap({ x: o.x, y: o.y, radius: n }, t); )
                                                    i++,
                                                        null == this._spiral[i]
                                                            ? (r = !1)
                                                            : ((r = !0), (o = this._spiral[i]));
                                            });
                                    const a = o.x,
                                        h = o.y;
                                    e.push({ x: a, y: h, radius: n }), t.set("dx", a), t.set("dy", h);
                                    const c = t.bullets;
                                    c &&
                                        s.each(c, (t) => {
                                            const e = t.get("sprite");
                                            e && e.setAll({ dx: a, dy: h });
                                        });
                                });
                            }
                        });
                    }
                }
            }
            (Is.className = "ClusteredPointSeries"), (Is.classNames = Xn.classNames.concat([Is.className]));
            class bs extends n.s {
                constructor() {
                    super(...arguments),
                        (this._userDataSet = !1),
                        (this.mapPolygons = this.addDisposer(
                            new je.TS(Xe.Bj.new({}), () => ws._new(this._root, {}, [this.mapPolygons.template]))
                        ));
                }
                _applyThemes(t = !1) {
                    const e = this.get("colors");
                    return e && e.reset(), super._applyThemes(t);
                }
                _afterNew() {
                    this.fields.push("name", "fill", "longitude", "latitude"),
                        this._setRawDefault("idField", "id"),
                        this._setRawDefault("nameField", "name"),
                        this._setRawDefault("fillField", "fill"),
                        this._setRawDefault("longitudeField", "longitude"),
                        this._setRawDefault("latitudeField", "latitude"),
                        super._afterNew();
                }
                _onDataClear() {
                    const t = this.get("colors");
                    t && t.reset(), (this._userDataSet = !0);
                }
                processDataItem(t) {
                    if ((super.processDataItem(t), null == t.get("fill"))) {
                        const e = this.get("colors");
                        e && t.setRaw("fill", e.next());
                    }
                    const e = this.makeMapPolygon(t);
                    t.setRaw("mapPolygon", e);
                }
                _updateNodeColor(t) {
                    const e = t.get("mapPolygon");
                    e && e._setC("fill", t.get("fill")), this.flow && this.flow._applyLinkColors();
                }
                makeMapPolygon(t) {
                    const e = this.mapPolygons.make();
                    this.mapPolygons.push(e),
                        e._setDataItem(t),
                        this.flow && ((e.series = this.flow), this.flow.children.push(e));
                    const i = t.get("fill");
                    return (
                        i && e._setSoft("fill", i),
                        t.on("fill", () => {
                            this._updateNodeColor(t);
                        }),
                        e
                    );
                }
                addIncomingLink(t, e) {
                    let i = t.get("incomingLinks");
                    i || ((i = []), t.setRaw("incomingLinks", i)), i.push(e);
                }
                addOutgoingLink(t, e) {
                    let i = t.get("outgoingLinks");
                    i || ((i = []), t.setRaw("outgoingLinks", i)), i.push(e);
                }
                disposeDataItem(t) {
                    super.disposeDataItem(t);
                    const e = t.get("mapPolygon");
                    e && (this.mapPolygons.removeValue(e), e.dispose());
                }
            }
            (bs.className = "MapSankeyNodes"), (bs.classNames = n.s.classNames.concat([bs.className]));
            const Ts = [
                "controlPointDistance",
                "controlPointDistanceSource",
                "controlPointDistanceTarget",
                "orientation",
                "maxWidth",
                "resolution",
                "nodePadding",
                "autoSort",
                "antimeridian",
                "nodeType",
                "nodeWidth",
            ];
            class ks extends xs {
                constructor() {
                    super(...arguments),
                        (this._types = []),
                        (this.nodes = this.addDisposer(bs.new(this._root, {}))),
                        (this._bezierSegments = new Map()),
                        (this._segmentCumulativeLengths = new Map()),
                        (this._geoSourceCoords = new Map()),
                        (this._geoTargetCoords = new Map()),
                        (this._geoWidths = new Map()),
                        (this._geoSourceGroups = new Map()),
                        (this._geoTargetGroups = new Map()),
                        (this._geoNodeSourceTotal = new Map()),
                        (this._geoNodeTargetTotal = new Map()),
                        (this._geoNodeRange = new Map()),
                        (this._geoSourceOffsets = new Map()),
                        (this._geoTargetOffsets = new Map());
                }
                _afterNew() {
                    this.fields.push(
                        "sourceId",
                        "targetId",
                        "sourceLongitude",
                        "sourceLatitude",
                        "targetLongitude",
                        "targetLatitude",
                        "waypoints"
                    ),
                        this.valueFields.push("value"),
                        this._setRawDefault("sourceIdField", "sourceId"),
                        this._setRawDefault("targetIdField", "targetId"),
                        this._setRawDefault("sourceLongitudeField", "sourceLongitude"),
                        this._setRawDefault("sourceLatitudeField", "sourceLatitude"),
                        this._setRawDefault("targetLongitudeField", "targetLongitude"),
                        this._setRawDefault("targetLatitudeField", "targetLatitude"),
                        this._setRawDefault("valueField", "value"),
                        this._setRawDefault("waypointsField", "waypoints"),
                        (this.nodes.flow = this),
                        this.on("polygonSeries", () => {
                            this._setupPolygonSeriesListener();
                        }),
                        super._afterNew(),
                        this._setupPolygonSeriesListener(),
                        this._disposers.push(
                            this.nodes.events.on("datavalidated", () => {
                                this._rebindLinks();
                            })
                        );
                }
                _applyLinkColors() {
                    const t = this.get("linkColorMode", "solid");
                    s.each(this.dataItems, (e) => {
                        const i = e.get("mapPolygon");
                        if (!i) return;
                        let n;
                        if ("solid" !== t) {
                            const i = "source" === t ? e.get("sourceNode") : e.get("targetNode");
                            n = i ? i.get("fill") : void 0;
                        }
                        n ? i._setC("fill", n) : i.isComputedSetting("fill") && i.remove("fill");
                    });
                }
                _rebindLinks() {
                    const t = this.nodes.dataItems;
                    s.each(this.dataItems, (e) => {
                        const i = e.get("sourceNode");
                        i && -1 == t.indexOf(i) && e.setRaw("sourceNode", void 0);
                        const n = e.get("targetNode");
                        n && -1 == t.indexOf(n) && e.setRaw("targetNode", void 0);
                    }),
                        this._resolvePendingDataItems();
                }
                _setupPolygonSeriesListener() {
                    this._polygonSeriesDP && (this._polygonSeriesDP.dispose(), (this._polygonSeriesDP = void 0));
                    const t = this.get("polygonSeries");
                    t &&
                        ((this._polygonSeriesDP = t.events.on("datavalidated", () => {
                            this._resolvePendingDataItems();
                        })),
                        t.dataItems.length > 0 && this._resolvePendingDataItems());
                }
                _resolvePendingDataItems() {
                    let t = !1;
                    s.each(this.dataItems, (e) => {
                        this._resolveEndpoints(e) && (t = !0);
                    }),
                        t && ((this._valuesDirty = !0), this.markDirty());
                }
                markDirtyProjection() {
                    super.markDirtyProjection(),
                        s.each(this.nodes.dataItems, (t) => {
                            const e = t.get("mapPolygon");
                            e && e.markDirtyProjection();
                        }),
                        this.bullets.length && this.markDirty();
                }
                _evalBezier(t, e) {
                    const i = 1 - e;
                    return {
                        longitude:
                            i * i * i * t.p0Lon +
                            3 * i * i * e * t.cp0Lon +
                            3 * i * e * e * t.cp1Lon +
                            e * e * e * t.p1Lon,
                        latitude:
                            i * i * i * t.p0Lat +
                            3 * i * i * e * t.cp0Lat +
                            3 * i * e * e * t.cp1Lat +
                            e * e * e * t.p1Lat,
                    };
                }
                _segmentArcLength(t, e = 20) {
                    let i = 0,
                        n = this._evalBezier(t, 0);
                    for (let s = 1; s <= e; s++) {
                        const o = this._evalBezier(t, s / e),
                            r = ((o.longitude - n.longitude) * Math.PI) / 180,
                            a = ((o.latitude - n.latitude) * Math.PI) / 180,
                            l =
                                Math.pow(Math.sin(a / 2), 2) +
                                Math.cos((n.latitude * Math.PI) / 180) *
                                    Math.cos((o.latitude * Math.PI) / 180) *
                                    Math.pow(Math.sin(r / 2), 2);
                        (i += 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l))), (n = o);
                    }
                    return i;
                }
                _computeCumulativeLengths(t, e) {
                    const i = [];
                    let n = 0;
                    for (let t = 0; t < e.length; t++) (n += this._segmentArcLength(e[t])), i.push(n);
                    this._segmentCumulativeLengths.set(t, i);
                }
                _resolveLocation(t, e, i) {
                    const n = this._segmentCumulativeLengths.get(t);
                    if (n && n.length > 0) {
                        const t = l.resolveLocationOnPath(e, n);
                        return { segIdx: t.index, t: t.t };
                    }
                    const s = i.length,
                        o = e * s,
                        r = Math.min(Math.floor(o), s - 1);
                    return { segIdx: r, t: o - r };
                }
                getPoint(t, e) {
                    const i = this._bezierSegments.get(t),
                        n = this.chart;
                    if (!i || 0 === i.length || !n) return { x: 0, y: 0, angle: 0 };
                    const { segIdx: s, t: o } = this._resolveLocation(t, e, i),
                        r = i[s],
                        a = this._evalBezier(r, o),
                        l = n.convert({ longitude: a.longitude, latitude: a.latitude }),
                        h = 0.001;
                    let c,
                        u = 1;
                    o + h <= 1 ? (c = this._evalBezier(r, o + h)) : ((c = this._evalBezier(r, o - h)), (u = -1));
                    const d = n.convert({ longitude: c.longitude, latitude: c.latitude }),
                        g = (180 * Math.atan2(u * (d.y - l.y), u * (d.x - l.x))) / Math.PI;
                    return { x: l.x, y: l.y, angle: g };
                }
                getGeoPoint(t, e) {
                    const i = this._bezierSegments.get(t);
                    if (!i || 0 === i.length) return;
                    const { segIdx: n, t: s } = this._resolveLocation(t, e, i);
                    return this._evalBezier(i[n], s);
                }
                getPathLength(t) {
                    const e = this._segmentCumulativeLengths.get(t);
                    return e && e.length > 0 ? e[e.length - 1] : 0;
                }
                _getPointWithGeo(t, e) {
                    const i = this._bezierSegments.get(t),
                        n = this.chart;
                    if (!i || 0 === i.length || !n) return;
                    const { segIdx: s, t: o } = this._resolveLocation(t, e, i),
                        r = i[s],
                        a = this._evalBezier(r, o),
                        l = n.convert({ longitude: a.longitude, latitude: a.latitude }),
                        h = 0.001;
                    let c,
                        u = 1;
                    o + h <= 1 ? (c = this._evalBezier(r, o + h)) : ((c = this._evalBezier(r, o - h)), (u = -1));
                    const d = n.convert({ longitude: c.longitude, latitude: c.latitude }),
                        g = (180 * Math.atan2(u * (d.y - l.y), u * (d.x - l.x))) / Math.PI;
                    return { x: l.x, y: l.y, angle: g, geoPoint: a };
                }
                _positionBullet(t) {
                    const e = t.get("sprite");
                    if (e) {
                        const i = e.dataItem;
                        if (i) {
                            const n = t.get("locationX", 0.5),
                                s = this._getPointWithGeo(i, n);
                            if (!s) return;
                            e.setAll({ x: s.x, y: s.y }),
                                t.get("autoRotate") && e.set("rotation", s.angle + t.get("autoRotateAngle", 0));
                            const o = this.chart;
                            if (o) {
                                const t = o.getPrivate("geoPath");
                                if (t) {
                                    const i = {
                                        type: "Point",
                                        coordinates: [s.geoPoint.longitude, s.geoPoint.latitude],
                                    };
                                    e.setPrivate("visible", !!t(i));
                                }
                            }
                        }
                    }
                }
                disposeDataItem(t) {
                    super.disposeDataItem(t), this._bezierSegments.delete(t), this._segmentCumulativeLengths.delete(t);
                }
                _dispose() {
                    super._dispose(),
                        this._polygonSeriesDP && (this._polygonSeriesDP.dispose(), (this._polygonSeriesDP = void 0)),
                        this._bezierSegments.clear(),
                        this._segmentCumulativeLengths.clear(),
                        this._geoSourceCoords.clear(),
                        this._geoTargetCoords.clear(),
                        this._geoWidths.clear(),
                        this._geoSourceGroups.clear(),
                        this._geoTargetGroups.clear(),
                        this._geoNodeSourceTotal.clear(),
                        this._geoNodeTargetTotal.clear(),
                        this._geoNodeRange.clear(),
                        this._geoSourceOffsets.clear(),
                        this._geoTargetOffsets.clear();
                }
                processDataItem(t) {
                    t.get("geometry") || t.set("geometry", { type: "Polygon", coordinates: [] }),
                        super.processDataItem(t),
                        this._resolveEndpoints(t);
                }
                _resolveEndpoints(t) {
                    const e = this.get("polygonSeries");
                    let i = !1;
                    if (!t.get("sourceNode")) {
                        let n = t.get("sourceLongitude"),
                            s = t.get("sourceLatitude");
                        const o = t.get("sourceId");
                        if (o && e) {
                            const t = e.getDataItemById(o);
                            if (t) {
                                const e = t.get("geometry");
                                if (e) {
                                    const t = pe(e);
                                    (n = t.longitude), (s = t.latitude);
                                }
                            }
                        }
                        if (null != n && null != s) {
                            const e = null != o ? o : Number(n) + "," + Number(s);
                            let r = this.nodes.getDataItemById(e);
                            if (r)
                                (null != r.get("longitude") && null != r.get("latitude")) ||
                                    (r.setRaw("longitude", Number(n)), r.setRaw("latitude", Number(s)));
                            else {
                                const i = t.dataContext,
                                    o = (i && i.source) || e;
                                this.nodes.data.push({ id: e, name: o, longitude: Number(n), latitude: Number(s) }),
                                    (r = this.nodes.dataItems[this.nodes.dataItems.length - 1]);
                            }
                            r && (t.setRaw("sourceNode", r), this.nodes.addOutgoingLink(r, t), (i = !0));
                        }
                    }
                    if (!t.get("targetNode")) {
                        let n = t.get("targetLongitude"),
                            s = t.get("targetLatitude");
                        const o = t.get("targetId");
                        if (o && e) {
                            const t = e.getDataItemById(o);
                            if (t) {
                                const e = t.get("geometry");
                                if (e) {
                                    const t = pe(e);
                                    (n = t.longitude), (s = t.latitude);
                                }
                            }
                        }
                        if (null != n && null != s) {
                            const e = null != o ? o : Number(n) + "," + Number(s);
                            let r = this.nodes.getDataItemById(e);
                            if (r)
                                (null != r.get("longitude") && null != r.get("latitude")) ||
                                    (r.setRaw("longitude", Number(n)), r.setRaw("latitude", Number(s)));
                            else {
                                const i = t.dataContext,
                                    o = (i && i.target) || e;
                                this.nodes.data.push({ id: e, name: o, longitude: Number(n), latitude: Number(s) }),
                                    (r = this.nodes.dataItems[this.nodes.dataItems.length - 1]);
                            }
                            r && (t.setRaw("targetNode", r), this.nodes.addIncomingLink(r, t), (i = !0));
                        }
                    }
                    return i;
                }
                _onDataClear() {
                    s.each(this.nodes.dataItems, (t) => {
                        t.setRaw("incomingLinks", []), t.setRaw("outgoingLinks", []);
                    }),
                        this.nodes._userDataSet || (this.nodes.data.setAll([]), (this.nodes._userDataSet = !1));
                }
                _prepareChildren() {
                    s.any(Ts, (t) => this.isDirty(t)) && (this._valuesDirty = !0),
                        this._valuesDirty || this._sizeDirty
                            ? this._generateGeometries()
                            : this.isDirty("linkColorMode") && this._applyLinkColors(),
                        super._prepareChildren();
                    const t = this.children,
                        e = this.bulletsContainer;
                    e.parent === this && t.getIndex(t.length - 1) !== e && t.moveValue(e);
                }
                _generateGeometries() {
                    const t = this.get("maxWidth", 5),
                        e = Math.min(0.4999, this.get("controlPointDistance", 0.5)),
                        i = Math.min(0.4999, this.get("controlPointDistanceSource", e)),
                        n = Math.min(0.4999, this.get("controlPointDistanceTarget", e)),
                        o = this.get("resolution", 50);
                    let r = 0;
                    s.each(this.dataItems, (t) => {
                        const e = t.get("value");
                        null != e && e > r && (r = e);
                    }),
                        0 === r && (r = 1);
                    const a = this._geoSourceCoords;
                    a.clear();
                    const l = this._geoTargetCoords;
                    l.clear();
                    const h = this._geoWidths;
                    h.clear();
                    const c = this._geoSourceGroups;
                    c.clear();
                    const u = this._geoTargetGroups;
                    u.clear(),
                        s.each(this.dataItems, (e) => {
                            const i = +(e.get("value") || 0);
                            h.set(e, (t * i) / r);
                            const n = e.get("sourceNode");
                            if (n) {
                                const t = n.get("longitude"),
                                    i = n.get("latitude");
                                if (null != t && null != i) {
                                    a.set(e, { longitude: t, latitude: i });
                                    const s = n.get("id");
                                    c.has(s) || c.set(s, []), c.get(s).push(e);
                                }
                            }
                            const s = e.get("targetNode");
                            if (s) {
                                const t = s.get("longitude"),
                                    i = s.get("latitude");
                                if (null != t && null != i) {
                                    l.set(e, { longitude: t, latitude: i });
                                    const n = s.get("id");
                                    u.has(n) || u.set(n, []), u.get(n).push(e);
                                }
                            }
                        });
                    const d = this.get("nodePadding", 0.3),
                        g = this.get("autoSort", !0),
                        p = this._geoNodeSourceTotal;
                    p.clear();
                    const f = this._geoNodeTargetTotal;
                    f.clear(),
                        c.forEach((t, e) => {
                            let i = 0;
                            s.each(t, (t) => {
                                i += h.get(t) || 0;
                            }),
                                p.set(e, i);
                        }),
                        u.forEach((t, e) => {
                            let i = 0;
                            s.each(t, (t) => {
                                i += h.get(t) || 0;
                            }),
                                f.set(e, i);
                        });
                    const _ = this._geoNodeRange;
                    _.clear(),
                        new Set([...p.keys(), ...f.keys()]).forEach((t) => {
                            _.set(t, Math.max(p.get(t) || 0, f.get(t) || 0));
                        });
                    const m = this._geoSourceOffsets;
                    m.clear();
                    const y = this._geoTargetOffsets;
                    y.clear(),
                        c.forEach((t, e) => {
                            g &&
                                t.sort((t, e) => {
                                    var i, n;
                                    return (
                                        ((null === (i = l.get(t)) || void 0 === i ? void 0 : i.latitude) || 0) -
                                        ((null === (n = l.get(e)) || void 0 === n ? void 0 : n.latitude) || 0)
                                    );
                                });
                            const i = p.get(e) || 0,
                                n = _.get(e) || i;
                            let o = -n / 2 + (n - i) / 2;
                            s.each(t, (t) => {
                                const e = h.get(t) || 0;
                                m.set(t, o + e / 2), (o += e);
                            });
                        }),
                        u.forEach((t, e) => {
                            g &&
                                t.sort((t, e) => {
                                    var i, n;
                                    return (
                                        ((null === (i = a.get(t)) || void 0 === i ? void 0 : i.latitude) || 0) -
                                        ((null === (n = a.get(e)) || void 0 === n ? void 0 : n.latitude) || 0)
                                    );
                                });
                            const i = f.get(e) || 0,
                                n = _.get(e) || i;
                            let o = -n / 2 + (n - i) / 2;
                            s.each(t, (t) => {
                                const e = h.get(t) || 0;
                                y.set(t, o + e / 2), (o += e);
                            });
                        });
                    const v = this.get("orientation", "horizontal");
                    s.each(this.dataItems, (t) => {
                        var s, r, c, u, d;
                        const g = a.get(t),
                            p = l.get(t);
                        if (!g || !p) return;
                        const f = h.get(t) || 0;
                        if (f <= 0) return;
                        const _ = f / 2,
                            w = m.get(t) || 0,
                            x = y.get(t) || 0;
                        let D, M, P, S;
                        "vertical" === v
                            ? ((D = g.longitude + w), (M = g.latitude), (P = p.longitude + x), (S = p.latitude))
                            : ((D = g.longitude), (M = g.latitude + w), (P = p.longitude), (S = p.latitude + x));
                        const I = Math.min(
                                0.4999,
                                null !== (s = t.get("controlPointDistance")) && void 0 !== s ? s : e
                            ),
                            b = Math.min(
                                0.4999,
                                null !==
                                    (c =
                                        null !== (r = t.get("controlPointDistanceSource")) && void 0 !== r
                                            ? r
                                            : t.get("controlPointDistance")) && void 0 !== c
                                    ? c
                                    : i
                            ),
                            T = Math.min(
                                0.4999,
                                null !==
                                    (d =
                                        null !== (u = t.get("controlPointDistanceTarget")) && void 0 !== u
                                            ? u
                                            : t.get("controlPointDistance")) && void 0 !== d
                                    ? d
                                    : n
                            ),
                            k = t.get("waypoints"),
                            C = k && k.length > 0;
                        if (!C && "short" === this.get("antimeridian", "short")) {
                            let t = P - D;
                            t > 180 ? (P -= 360) : t < -180 && (P += 360);
                        }
                        const A = [{ longitude: D, latitude: M }];
                        if (C) for (const t of k) A.push({ longitude: t.longitude, latitude: t.latitude });
                        A.push({ longitude: P, latitude: S });
                        const L = [];
                        for (let t = 0; t < A.length - 1; t++) {
                            const e = A[t],
                                i = A[t + 1];
                            let n, s, o, r;
                            if (0 === t && 2 === A.length)
                                if ("vertical" === v) {
                                    const t = i.latitude - e.latitude;
                                    (n = 0), (s = t), (o = 0), (r = t);
                                } else {
                                    const t = i.longitude - e.longitude;
                                    (n = t), (s = 0), (o = t), (r = 0);
                                }
                            else {
                                if (0 === t) (n = i.longitude - e.longitude), (s = i.latitude - e.latitude);
                                else {
                                    const e = A[t - 1];
                                    (n = i.longitude - e.longitude), (s = i.latitude - e.latitude);
                                }
                                if (t === A.length - 2) (o = i.longitude - e.longitude), (r = i.latitude - e.latitude);
                                else {
                                    const i = A[t + 2];
                                    (o = i.longitude - e.longitude), (r = i.latitude - e.latitude);
                                }
                            }
                            const a = Math.sqrt(
                                    Math.pow(i.longitude - e.longitude, 2) + Math.pow(i.latitude - e.latitude, 2)
                                ),
                                l = Math.sqrt(Math.pow(n, 2) + Math.pow(s, 2)),
                                h = Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2)),
                                c = a * (0 === t ? b : I),
                                u = a * (t === A.length - 2 ? T : I),
                                d = e.longitude + (l > 0 ? (n / l) * c : 0),
                                g = e.latitude + (l > 0 ? (s / l) * c : 0),
                                p = i.longitude - (h > 0 ? (o / h) * u : 0),
                                f = i.latitude - (h > 0 ? (r / h) * u : 0);
                            L.push({
                                p0Lon: e.longitude,
                                p0Lat: e.latitude,
                                p1Lon: i.longitude,
                                p1Lat: i.latitude,
                                cp0Lon: d,
                                cp0Lat: g,
                                cp1Lon: p,
                                cp1Lat: f,
                            });
                        }
                        this._bezierSegments.set(t, L), this._computeCumulativeLengths(t, L);
                        const N = [],
                            R = [];
                        for (let t = 0; t < L.length; t++) {
                            const e = L[t];
                            for (let i = 0 === t ? 0 : 1; i <= o; i++) {
                                const t = i / o,
                                    n = 1 - t,
                                    s =
                                        n * n * n * e.p0Lon +
                                        3 * n * n * t * e.cp0Lon +
                                        3 * n * t * t * e.cp1Lon +
                                        t * t * t * e.p1Lon,
                                    r =
                                        n * n * n * e.p0Lat +
                                        3 * n * n * t * e.cp0Lat +
                                        3 * n * t * t * e.cp1Lat +
                                        t * t * t * e.p1Lat,
                                    a =
                                        3 * n * n * (e.cp0Lon - e.p0Lon) +
                                        6 * n * t * (e.cp1Lon - e.cp0Lon) +
                                        3 * t * t * (e.p1Lon - e.cp1Lon),
                                    l =
                                        3 * n * n * (e.cp0Lat - e.p0Lat) +
                                        6 * n * t * (e.cp1Lat - e.cp0Lat) +
                                        3 * t * t * (e.p1Lat - e.cp1Lat),
                                    h = Math.sqrt(a * a + l * l);
                                if (0 === h) continue;
                                const c = -l / h,
                                    u = a / h;
                                N.push([s + _ * c, r + _ * u]), R.push([s - _ * c, r - _ * u]);
                            }
                        }
                        const E = [];
                        for (let t = 0; t < N.length; t++) E.push(N[t]);
                        for (let t = R.length - 1; t >= 0; t--) E.push(R[t]);
                        E.push(N[0]);
                        let B = { type: "Polygon", coordinates: [E] };
                        te(B) > 2 * Math.PI && (E.reverse(), (B = { type: "Polygon", coordinates: [E] })),
                            t.setRaw("geometry", B);
                        const F = t.get("mapPolygon");
                        F && F._setC("geometry", B);
                    }),
                        this._applyLinkColors();
                    const w = this.get("nodeType", "circle"),
                        x = this.get("nodeWidth", 1);
                    s.each(this.nodes.dataItems, (t) => {
                        const e = t.get("outgoingLinks") || [],
                            i = t.get("incomingLinks") || [],
                            n = t.get("id");
                        let o = 0;
                        s.each(e, (t) => {
                            o += t.get("value") || 0;
                        });
                        let r = 0;
                        s.each(i, (t) => {
                            r += t.get("value") || 0;
                        }),
                            t.setRaw("sumOutgoing", o),
                            t.setRaw("sumIncoming", r),
                            t.setRaw("sum", o + r);
                        const a = _.get(n) || 0,
                            l = t.get("longitude"),
                            h = t.get("latitude");
                        if (null == l || null == h) return;
                        let c;
                        if ("bar" === w) {
                            const t = 10,
                                e = a / 2 + d,
                                i = x / 2,
                                n = [];
                            if ("vertical" === v) {
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l - e + 2 * e * o, h - i]);
                                }
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l + e, h - i + x * o]);
                                }
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l + e - 2 * e * o, h + i]);
                                }
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l - e, h + i - x * o]);
                                }
                                n.push([l - e, h - i]);
                            } else {
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l - i, h - e + 2 * e * o]);
                                }
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l - i + x * o, h + e]);
                                }
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l + i, h + e - 2 * e * o]);
                                }
                                for (let s = 0; s <= t; s++) {
                                    const o = s / t;
                                    n.push([l + i - x * o, h - e]);
                                }
                                n.push([l - i, h - e]);
                            }
                            (c = { type: "Polygon", coordinates: [n] }),
                                te(c) > 2 * Math.PI && (n.reverse(), (c = { type: "Polygon", coordinates: [n] }));
                        } else c = ge({ longitude: l, latitude: h }, a / 2 + d);
                        const u = t.get("mapPolygon");
                        u &&
                            (u._setC("geometry", c),
                            this._childrenDisplay.removeChild(u._display),
                            this._childrenDisplay.addChild(u._display));
                    });
                }
            }
            (ks.className = "MapSankeySeries"), (ks.classNames = xs.classNames.concat([ks.className]));
            var Cs = i(1293);
            class As extends xs {
                constructor() {
                    super(...arguments), (this._steps = []), (this._sunClock = new Yn(this)), (this._sunDirty = !1);
                }
                _afterNew() {
                    super._afterNew(),
                        (this._shadeDp = this.mapPolygons.template.on("fillOpacity", () => this._shade())),
                        this.get("sun") ||
                            this._setC(
                                "sun",
                                Cs.j.new(this._root, { themeTags: ["night", "sun"] })._markC("themeTags")
                            );
                }
                makeMapPolygon(t) {
                    const e = this.mapPolygons.template,
                        i = this.children.push(
                            ws._new(this._root, { themeTags: Fn.mergeTags(e.get("themeTags", []), ["night"]) }, [e])
                        );
                    return i._setDataItem(t), this._linkSprite(i, t), this.mapPolygons.push(i), i;
                }
                markDirtyProjection() {
                    super.markDirtyProjection(), (this._sunDirty = !0), this.markDirty();
                }
                _addGeometry(t, e) {}
                _removeGeometry(t) {}
                _prepareChildren() {
                    super._prepareChildren(), this.isDirty("sunDate") && this._sunClock.update();
                    const t = this.chart;
                    t !== this._drawnFor && ((this._drawnFor = t), t && this.markDirtyProjection());
                    const e = this.get("sun"),
                        i = this._sun;
                    e !== i &&
                        (i && (this.children.removeValue(i), i.dispose()),
                        e && this.children.push(e),
                        (this._sun = e),
                        (this._sunDirty = !0));
                }
                _updateChildren() {
                    super._updateChildren(),
                        (this.isDirty("sunPosition") || this.isDirty("twilight") || this.isDirty("twilightSteps")) &&
                            (this._generate(), (this._sunDirty = !0)),
                        this.isDirty("sunAltitude") && (this._sunDirty = !0),
                        this._sunDirty && ((this._sunDirty = !1), this._positionSun());
                }
                _generate() {
                    const t = this._steps,
                        e = Math.max(1, Math.round(this.get("twilightSteps", 4)));
                    for (; t.length < e; ) {
                        const e = this.makeDataItem({});
                        this.dataItems.push(e), t.push(e);
                    }
                    for (; t.length > e; ) {
                        const e = t.pop();
                        s.remove(this.dataItems, e), e.dispose();
                    }
                    const i = this.get("sun");
                    i && this.children.moveValue(i);
                    const n = this.get("sunPosition"),
                        o = Math.max(this.get("twilight", 12), 0);
                    s.each(t, (t, i) => {
                        const s = t.get("mapPolygon");
                        if (s) {
                            if (n) {
                                const r = ge(
                                    ye({ longitude: n.longitude + 180, latitude: -n.latitude }),
                                    90 + o / 2 - ((i + 0.5) * o) / e
                                );
                                t.setRaw("geometry", r), s._setC("geometry", r);
                            }
                            s.setPrivate("visible", !!n);
                        }
                    }),
                        this._shade();
                }
                _shade() {
                    const t = this._steps,
                        e = t.length;
                    s.each(t, (t, i) => {
                        const n = t.get("mapPolygon");
                        if (n) {
                            const t = n.get("fillOpacity", 1),
                                s = 1 - (t * (i + 1)) / e,
                                o = 1 - (t * i) / e;
                            n._setC("opacity", t > 0 && o > 0 ? (1 - s / o) / t : 1);
                        }
                    });
                }
                _positionSun() {
                    const t = this.get("sun"),
                        e = this.chart;
                    if (t && e) {
                        const i = this.get("sunPosition");
                        let n = !1;
                        if (i) {
                            const s = e.get("projection"),
                                o = [i.longitude, i.latitude],
                                r = this.get("sunAltitude", 0);
                            if (r) {
                                const e = Me(s, o[0], o[1], r);
                                e && !e.hidden && (t._setCAll({ x: e.x, y: e.y }), (n = !0));
                            } else {
                                const i = s(o);
                                i &&
                                    e.getPrivate("geoPath")({ type: "Point", coordinates: o }) &&
                                    (t._setCAll({ x: i[0], y: i[1] }), (n = !0));
                            }
                        }
                        t.setPrivate("visible", n);
                    }
                }
                _dispose() {
                    this._sunClock.dispose(), this._shadeDp && this._shadeDp.dispose(), super._dispose();
                }
            }
            (As.className = "NightSeries"), (As.classNames = xs.classNames.concat([As.className]));
            const Ls = {
                    square: { points: [1, 1, -1, 1, -1, -1, 1, -1], across: 1, between: 1, stagger: !1 },
                    squareStaggered: { points: [1, 1, -1, 1, -1, -1, 1, -1], across: 1, between: 1, stagger: !0 },
                    circle: {
                        points: [0, 0, 1, 0, 0, 2 / Math.sqrt(3), -1, 0, 0, -2 / Math.sqrt(3)],
                        across: 1,
                        between: Math.sqrt(3) / 2,
                        stagger: !0,
                    },
                    circleAligned: { points: [0, 0, 1, 0, 0, 1, -1, 0, 0, -1], across: 1, between: 1, stagger: !1 },
                    hexagon: {
                        points: [0, 4 / 3, 1, 2 / 3, 1, -2 / 3, 0, -4 / 3, -1, -2 / 3, -1, 2 / 3],
                        across: 1,
                        between: Math.sqrt(3) / 2,
                        stagger: !0,
                    },
                    diamond: {
                        points: [0, 2, 1, 0, 0, -2, -1, 0],
                        across: Math.SQRT2,
                        between: Math.SQRT1_2,
                        stagger: !0,
                    },
                },
                Ns = 0.5523,
                Rs = 0.35,
                Es = 5e5,
                Bs = 0.001;
            function Fs(t, e, i) {
                let n = 0;
                for (let s = 0; s < i; s++) {
                    const o = (s + 1) % i;
                    n += t[s] * e[o] - t[o] * e[s];
                }
                return n;
            }
            function zs(t, e, i, n, s, o) {
                let r = 0;
                for (let a = 0; a < o; a++) {
                    const l = s + a,
                        h = s + ((a + 1) % o),
                        c = (i[h] - i[l]) * (e - n[l]) - (n[h] - n[l]) * (t - i[l]);
                    if (0 != c) {
                        const t = c > 0 ? 1 : -1;
                        if (r) {
                            if (t != r) return !1;
                        } else r = t;
                    }
                }
                return !0;
            }
            class Os extends xs {
                constructor() {
                    super(...arguments),
                        (this.pixels = this.children.push(
                            ke.A._new(this._root, { themeTags: ["pixels"], isMeasured: !1 })._markC(
                                "themeTags",
                                "isMeasured"
                            )
                        )),
                        (this._hitArea = this.children.push(
                            ke.A._new(this._root, { themeTags: ["pixels", "hit"], isMeasured: !1, opacity: 0 })._markC(
                                "themeTags",
                                "isMeasured",
                                "opacity"
                            )
                        )),
                        (this._gridDirty = !0),
                        (this._positionsDirty = !0),
                        (this._lon = new Float64Array(0)),
                        (this._lat = new Float64Array(0)),
                        (this._halfLon = new Float64Array(0)),
                        (this._halfLat = 0),
                        (this._unit = new Float64Array(0)),
                        (this._owners = []),
                        (this._ownerStart = new Uint32Array(1)),
                        (this._vx = new Float64Array(0)),
                        (this._vy = new Float64Array(0)),
                        (this._shown = new Uint8Array(0)),
                        (this._height = new Float32Array(0)),
                        (this._heightsDirty = !0),
                        (this._pixelOwner = new Uint32Array(0)),
                        (this._depth = new Float64Array(0)),
                        (this._step = 2),
                        (this._interactionDirty = !0),
                        (this._projectionStale = !1),
                        (this._x = new Float64Array(0)),
                        (this._y = new Float64Array(0)),
                        (this._spacing = 0);
                }
                _afterNew() {
                    super._afterNew(),
                        this.pixels._setC("draw", (t) => {
                            this._drawPixels(t);
                        });
                    const t = this._hitArea;
                    t._setC("draw", (t) => {
                        this._drawHitArea(t);
                    }),
                        t.states.create("default", {})._setC("opacity", 0);
                    let e = !1;
                    const i = (t) => {
                        const e = this._pointerPolygon(t);
                        e !== this._hovered
                            ? this._setHovered(e, t)
                            : e && "pointer" == e.get("tooltipPosition") && e.showTooltip(t.point);
                    };
                    this._disposers.push(
                        t.events.on("pointerover", (t) => {
                            (e = !0), i(t);
                        })
                    ),
                        this._disposers.push(
                            t.events.on("globalpointermove", (t) => {
                                e && i(t);
                            })
                        ),
                        this._disposers.push(
                            t.events.on("pointerout", () => {
                                (e = !1), this._setHovered(void 0);
                            })
                        ),
                        s.each(["click", "dblclick", "rightclick", "middleclick", "pointerdown", "pointerup"], (e) => {
                            this._disposers.push(
                                t.events.on(e, (t) => {
                                    const i = this._pointerPolygon(t);
                                    i && this._dispatch(i, e, t);
                                })
                            );
                        });
                }
                _takesPointer(t) {
                    return !!(t.get("interactive") || t.get("tooltipText") || t.get("tooltipHTML"));
                }
                _pointerPolygon(t) {
                    const e = this.getPolygonByPoint(t.point);
                    return e && this._takesPointer(e) ? e : void 0;
                }
                _updateInteraction() {
                    this._interactionDirty = !1;
                    let t = !1;
                    this.mapPolygons.each((e) => {
                        !t && this._takesPointer(e) && (t = !0);
                    });
                    const e = this._hitArea;
                    e.get("interactive") !== t && (e._setC("interactive", t), e._markDirtyKey("draw"));
                    const i = this.mapPolygons.template.get("cursorOverStyle");
                    e.get("cursorOverStyle") !== i && e._setC("cursorOverStyle", i);
                }
                _markInteractionDirty() {
                    (this._interactionDirty = !0), this.markDirty();
                }
                _setHovered(t, e) {
                    const i = this._hovered;
                    (this._hovered = t),
                        i && !i.isDisposed() && (i.unhover(), this._dispatch(i, "pointerout", e)),
                        t && e && (t.showTooltip(e.point), t.hover(), this._dispatch(t, "pointerover", e));
                }
                _dispatch(t, e, i) {
                    const n = t.events;
                    i &&
                        n.isEnabled(e) &&
                        n.dispatch(e, {
                            type: e,
                            target: t,
                            originalEvent: i.originalEvent,
                            point: i.point,
                            simulated: i.simulated,
                        });
                }
                _newMapPolygon() {
                    const t = this.mapPolygons.template;
                    return ws
                        ._new(this._root, { themeTags: Fn.mergeTags(t.get("themeTags", []), ["pixel"]) }, [t])
                        ._markC("themeTags");
                }
                makeMapPolygon(t) {
                    const e = super.makeMapPolygon(t);
                    e._setC("forceHidden", !0), e._setC("forceInactive", !0);
                    const i = () => this._markInteractionDirty();
                    e.on("interactive", i),
                        e.on("tooltipText", i),
                        e.on("tooltipHTML", i),
                        e.on("cursorOverStyle", i),
                        this._markInteractionDirty();
                    const n = () => this._markPixelsDirty(),
                        s = () => this._markShapesDirty();
                    return (
                        e.on("fill", n),
                        e.on("fillOpacity", n),
                        e.on("stroke", n),
                        e.on("strokeWidth", n),
                        e.on("strokeOpacity", n),
                        e.on("visible", s),
                        e.onPrivate("visible", s),
                        e.on("pixelHeight", () => {
                            (this._heightsDirty = !0), this._markShapesDirty();
                        }),
                        e
                    );
                }
                markDirtyProjection() {
                    this.isVisible() ? this._markShapesDirty() : (this._projectionStale = !0);
                }
                _prepareChildren() {
                    super._prepareChildren(),
                        this._projectionStale &&
                            this.isVisible() &&
                            ((this._projectionStale = !1), this._markShapesDirty()),
                        this._interactionDirty && this._updateInteraction(),
                        (this.isDirty("step") ||
                            this.isDirty("equalArea") ||
                            this.isDirty("pixelType") ||
                            this.isDirty("stagger") ||
                            this.isDirty("uniform") ||
                            this.isDirty("include") ||
                            this.isDirty("exclude")) &&
                            this._markGridDirty(),
                        (this.isDirty("pixelSize") || this.isDirty("equalWidth")) &&
                            (this.get("uniform", !1) || (this._positionsDirty = !0), this._markShapesDirty()),
                        (this.isDirty("pixelHeightFunction") || this._valuesDirty) &&
                            ((this._heightsDirty = !0), this._markShapesDirty()),
                        this.isDirty("columnHeight") &&
                            (this.get("uniform", !1) || (this._positionsDirty = !0), this._markShapesDirty());
                }
                processDataItem(t) {
                    super.processDataItem(t), this._markGridDirty();
                }
                disposeDataItem(t) {
                    super.disposeDataItem(t), this._markGridDirty();
                }
                markDirtyValues(t) {
                    const e = t ? t.get("mapPolygon") : void 0,
                        i = !!e && e.get("geometry") !== t.get("geometry");
                    super.markDirtyValues(t),
                        i ? this._markGridDirty() : ((this._heightsDirty = !0), this._markShapesDirty());
                }
                _isLeftOut(t) {
                    const e = t.get("id"),
                        i = this.get("include"),
                        n = this.get("exclude");
                    return !!e && ((!!n && -1 != n.indexOf(e)) || (!!i && -1 == i.indexOf(e)));
                }
                _markGridDirty() {
                    (this._gridDirty = !0), (this._positionsDirty = !0), this._markShapesDirty();
                }
                _markPixelsDirty() {
                    this.pixels && this.pixels._markDirtyKey("draw");
                }
                _markShapesDirty() {
                    this._markPixelsDirty(), this._hitArea && this._hitArea._markDirtyKey("draw");
                }
                _prepareLayout(t) {
                    this._gridDirty ||
                        this._positionsDirty ||
                        this._viewHolds(t) ||
                        (this.get("uniform", !1) ? (this._gridDirty = !0) : (this._positionsDirty = !0)),
                        this._layOut(t);
                }
                _visibleOwners() {
                    const t = [],
                        e = this._owners;
                    for (let i = 0; i < e.length; i++) {
                        const n = e[i],
                            s = n.get("mapPolygon");
                        t.push(
                            !!s &&
                                s.get("visible", !0) &&
                                s.getPrivate("visible", !0) &&
                                !n.isHidden() &&
                                !!s.get("fill")
                        );
                    }
                    return t;
                }
                _unwrapRing(t) {
                    const e = t.length,
                        i = [];
                    if (!e) return i;
                    let n = 0,
                        s = 0;
                    for (let o = 0; o <= e; o++) {
                        const r = t[o % e];
                        if (o > 0) {
                            const e = r[0] - t[o - 1][0];
                            e > 180 ? (n -= 360) : e < -180 && (n += 360);
                        }
                        i.push([r[0] + n, r[1]]), (s += r[1]);
                    }
                    if (0 != n) {
                        const t = s < 0 ? -90 : 90;
                        i.push([i[e][0], t], [i[0][0], t]);
                    }
                    return i;
                }
                _buildGrid() {
                    this._gridDirty = !1;
                    const t = this._shape(),
                        e = this.get("equalArea", !0),
                        i = [];
                    let n = 0;
                    for (let o = 0; o < this.dataItems.length; o++) {
                        const r = this.dataItems[o],
                            a = r.get("geometry");
                        if (!a || this._isLeftOut(r)) continue;
                        const h = "Polygon" == a.type ? [a.coordinates] : "MultiPolygon" == a.type ? a.coordinates : [],
                            c = [];
                        for (let i = 0; i < h.length; i++) {
                            const o = h[i].map((t) => this._unwrapRing(t));
                            if (!o.length || !o[0].length) continue;
                            let r = 1 / 0,
                                a = -1 / 0,
                                u = 1 / 0,
                                d = -1 / 0;
                            s.each(o[0], (t) => {
                                (r = Math.min(r, t[0])),
                                    (a = Math.max(a, t[0])),
                                    (u = Math.min(u, t[1])),
                                    (d = Math.max(d, t[1]));
                            });
                            for (let t = 1; t < o.length; t++) {
                                const e = o[t];
                                if (e.length) {
                                    const i = e[0][0] < r ? 360 : e[0][0] > a ? -360 : 0;
                                    i && (o[t] = e.map((t) => [t[0] + i, t[1]]));
                                }
                            }
                            c.push(o);
                            const g = u <= 0 && d >= 0 ? 1 : Math.cos(Math.min(Math.abs(u), Math.abs(d)) * l.RADIANS);
                            n += (((d - u) / t.between) * Math.min(360, a - r) * (e ? g : 1)) / t.across;
                        }
                        i.push({ dataItem: r, polygons: c });
                    }
                    const o = this.get("step", 2),
                        r = Math.max(Bs, o);
                    let a = r;
                    n / (a * a) > 2e6 && (a = Math.sqrt(n / 2e6));
                    const h = i.map((t) => t.polygons);
                    let c = this._gridRows(a, t, e),
                        u = this._gridSpans(h, c);
                    (u.count > Es || (a > r && u.count < 25e4)) &&
                        ((a = Math.max(r, a * Math.sqrt(u.count / Es) * 1.02)),
                        (c = this._gridRows(a, t, e)),
                        (u = this._gridSpans(h, c)),
                        u.count > Es &&
                            ((a *= 1.02 * Math.sqrt(u.count / Es)),
                            (c = this._gridRows(a, t, e)),
                            (u = this._gridSpans(h, c)))),
                        (this._step = a),
                        this._warnCoarse(o, a);
                    const { rowCount: d, rowStep: g, rowLat: p, rowLonStep: f, rowStart: _, counts: m } = c,
                        y = [],
                        v = [],
                        w = [];
                    for (let t = 0; t < i.length; t++) {
                        const e = u.spans[t];
                        let n = 0;
                        for (let i = 0; i < e.length; i += 3) {
                            const s = e[i],
                                o = m[s],
                                r = y[s] || (y[s] = new Map());
                            for (let s = e[i + 1]; s <= e[i + 2]; s++) {
                                const e = ((s % o) + o) % o;
                                r.has(e) || (r.set(e, t), n++);
                            }
                        }
                        v.push(i[t].dataItem), w.push(n);
                    }
                    const x = new Uint32Array(v.length + 1);
                    for (let t = 0; t < v.length; t++) x[t + 1] = x[t] + w[t];
                    const D = x[v.length],
                        M = new Float64Array(D),
                        P = new Float64Array(D),
                        S = new Float64Array(D),
                        I = new Float64Array(3 * D),
                        b = x.slice(0, v.length);
                    for (let t = 0; t < d; t++) {
                        const e = y[t];
                        if (!e) continue;
                        const i = Array.from(e.keys()).sort((t, e) => t - e);
                        for (let n = 0; n < i.length; n++) {
                            const s = i[n],
                                o = b[e.get(s)]++,
                                r = _[t] + s * f[t],
                                a = p[t];
                            (M[o] = r), (P[o] = a), (S[o] = f[t] / 2);
                            const h = Math.cos(a * l.RADIANS);
                            (I[3 * o] = h * Math.cos(r * l.RADIANS)),
                                (I[3 * o + 1] = h * Math.sin(r * l.RADIANS)),
                                (I[3 * o + 2] = Math.sin(a * l.RADIANS));
                        }
                    }
                    (this._owners = v),
                        (this._ownerStart = x),
                        (this._lon = M),
                        (this._lat = P),
                        (this._halfLon = S),
                        (this._halfLat = g / 2),
                        (this._unit = I),
                        (this._x = new Float64Array(0)),
                        (this._y = new Float64Array(0)),
                        (this._shown = new Uint8Array(D)),
                        (this._depth = new Float64Array(D)),
                        (this._height = new Float32Array(D)),
                        (this._pixelOwner = new Uint32Array(D));
                    for (let t = 0; t < v.length; t++) this._pixelOwner.fill(t, x[t], x[t + 1]);
                    (this._positionsDirty = !0), (this._heightsDirty = !0);
                }
                _warnCoarse(t, e) {
                    e > Math.max(Bs, t) &&
                        this._warnedStep !== t &&
                        ((this._warnedStep = t),
                        console.warn(
                            "PixelMapSeries: a step of " +
                                t +
                                " would make more than " +
                                Es +
                                " pixels, so " +
                                l.round(e, 4) +
                                " is used."
                        ));
                }
                _gridRows(t, e, i) {
                    const n = e.stagger,
                        s = Math.max(1, Math.round(180 / (t * e.between))),
                        o = 180 / s,
                        r = [];
                    for (let n = 0; n < s; n++) {
                        const s = o * (n + 0.5) - 90,
                            a = (t * e.across) / (i ? Math.max(Math.cos(s * l.RADIANS), 0.001) : 1);
                        r.push(Math.max(1, Math.round(360 / a)));
                    }
                    if (i) {
                        const t = (t, e, i) => {
                                let n = t;
                                for (; n != e; ) {
                                    let t = n;
                                    for (; t + i != e && r[n] / r[t + i] <= 1.15 * 1.15; ) t += i;
                                    const s = Math.max(1, Math.round(Math.sqrt(r[n] * r[t])));
                                    for (let e = n; e != t + i; e += i) r[e] = s;
                                    n = t + i;
                                }
                            },
                            e = Math.floor(s / 2);
                        t(e, s, 1), t(s % 2 ? e : e - 1, -1, -1);
                    }
                    const a = [],
                        h = [],
                        c = [];
                    for (let t = 0; t < s; t++) {
                        const e = 360 / r[t];
                        a.push(o * (t + 0.5) - 90), h.push(e), c.push(e * (n && t % 2 ? 1 : 0.5) - 180);
                    }
                    return { rowCount: s, rowStep: o, rowLat: a, rowLonStep: h, rowStart: c, counts: r };
                }
                _gridSpans(t, e) {
                    const { rowCount: i, rowStep: n, rowLat: s, rowLonStep: o, rowStart: r, counts: a } = e,
                        l = [];
                    let h = 0;
                    for (let e = 0; e < t.length; e++) {
                        const c = [],
                            u = t[e];
                        for (let t = 0; t < u.length; t++) {
                            const e = {},
                                l = u[t];
                            for (let t = 0; t < l.length; t++) {
                                const o = l[t],
                                    r = o.length;
                                for (let t = 0; t < r; t++) {
                                    const a = o[t],
                                        l = o[(t + 1) % r];
                                    if (a[1] == l[1]) continue;
                                    const h = Math.min(a[1], l[1]),
                                        c = Math.max(a[1], l[1]),
                                        u = Math.max(0, Math.ceil((h + 90) / n - 0.5)),
                                        d = Math.min(i - 1, Math.ceil((c + 90) / n - 0.5) - 1);
                                    for (let t = u; t <= d; t++) {
                                        const i = s[t];
                                        i >= h &&
                                            i < c &&
                                            (e[t] = e[t] || []).push(
                                                a[0] + ((i - a[1]) * (l[0] - a[0])) / (l[1] - a[1])
                                            );
                                    }
                                }
                            }
                            for (const t in e) {
                                const i = +t,
                                    n = e[i].sort((t, e) => t - e),
                                    s = a[i],
                                    l = o[i],
                                    u = r[i];
                                for (let t = 0; t + 1 < n.length; t += 2) {
                                    const e = Math.ceil((n[t] - u) / l),
                                        o = Math.min(Math.floor((n[t + 1] - u) / l), e + s - 1);
                                    o >= e && (c.push(i, e, o), (h += o - e + 1));
                                }
                            }
                        }
                        l.push(c);
                    }
                    return { spans: l, count: h };
                }
                _computeHeights() {
                    this._heightsDirty = !1;
                    const t = this.get("pixelHeightFunction"),
                        e = "function" == typeof t ? t : void 0,
                        i = this.getPrivate("valueLow"),
                        n = this.getPrivate("valueHigh"),
                        s = this._height,
                        o = this._owners,
                        r = this._ownerStart;
                    for (let t = 0; t < o.length; t++) {
                        const a = o[t];
                        let l = 1;
                        if (!e) {
                            const t = a.get("mapPolygon"),
                                e = t ? t.get("pixelHeight") : void 0,
                                s = a.get("value");
                            null != e
                                ? (l = e)
                                : null != i && null != n && n > i && (l = null != s ? (s - i) / (n - i) : 0);
                        }
                        for (let i = r[t]; i < r[t + 1]; i++) {
                            const t = e ? e(a, this._lon[i], this._lat[i]) : l;
                            s[i] = Math.max(0, Math.min(1, t || 0));
                        }
                    }
                }
                _shape() {
                    const t = this.get("pixelType", "square"),
                        e = this.get("stagger");
                    return "square" == t && e
                        ? Ls.squareStaggered
                        : "circle" == t && !1 === e
                          ? Ls.circleAligned
                          : Ls[t] || Ls.square;
                }
                _buildScreenGrid(t) {
                    (this._gridDirty = !1), (this._positionsDirty = !1);
                    const e = t.scale(),
                        i = t.translate(),
                        n = i[0],
                        o = i[1],
                        r = this._shape(),
                        a = this.get("step", 2),
                        h = Math.max(Bs, a);
                    let c = h;
                    const u = [];
                    s.each(this.dataItems, (t) => {
                        const e = t.get("geometry");
                        e && !this._isLeftOut(t) && u.push(e);
                    });
                    const d = Bn(t).bounds({ type: "GeometryCollection", geometries: u }),
                        g = (d[1][0] - d[0][0]) * (d[1][1] - d[0][1]),
                        p = l.RADIANS * e;
                    g > 0 &&
                        g / (c * p * c * p * r.across * r.between) > 2e6 &&
                        (c = Math.sqrt(g / (2e6 * r.across * r.between)) / p);
                    const f = r.stagger,
                        _ = (e) => {
                            const i = e * p,
                                s = i * r.across,
                                a = i * r.between,
                                l = [],
                                h = [],
                                c = new Set();
                            let u = 0,
                                d = [],
                                g = [];
                            const _ = Bn(t, {
                                moveTo: (t, e) => {
                                    (g = [t, e]), d.push(g);
                                },
                                lineTo: (t, e) => {
                                    g.push(t, e);
                                },
                                closePath: () => {},
                                beginPath: () => {},
                                arc: () => {},
                            });
                            for (let t = 0; t < this.dataItems.length; t++) {
                                const e = this.dataItems[t],
                                    i = e.get("geometry");
                                if (!i || this._isLeftOut(e)) continue;
                                (d = []), _(i);
                                const r = {};
                                for (let t = 0; t < d.length; t++) {
                                    const e = d[t],
                                        i = e.length;
                                    for (let t = 0; t < i; t += 2) {
                                        const n = e[t],
                                            s = e[t + 1],
                                            l = e[(t + 2) % i],
                                            h = e[(t + 3) % i];
                                        if (s == h) continue;
                                        const c = Math.min(s, h),
                                            u = Math.max(s, h),
                                            d = Math.ceil((u - o) / a) - 1;
                                        for (let t = Math.ceil((c - o) / a); t <= d; t++) {
                                            const e = o + t * a;
                                            e >= c &&
                                                e < u &&
                                                (r[t] = r[t] || []).push(n + ((e - s) * (l - n)) / (h - s));
                                        }
                                    }
                                }
                                const g = [];
                                for (const t in r) {
                                    const e = +t,
                                        i = r[e].sort((t, e) => t - e),
                                        l = o + e * a,
                                        h = n + (f && 1 & e ? s / 2 : 0);
                                    for (let t = 0; t + 1 < i.length; t += 2) {
                                        const n = Math.floor((i[t + 1] - h) / s);
                                        for (let o = Math.ceil((i[t] - h) / s); o <= n; o++) {
                                            const t = 4194304 * e + o;
                                            c.has(t) || (c.add(t), g.push(h + o * s, l));
                                        }
                                    }
                                }
                                l.push(e), h.push(g), (u += g.length / 2);
                            }
                            return { owners: l, ownerPoints: h, spacing: i, count: u };
                        };
                    let m = _(c);
                    (m.count > Es || (c > h && m.count < 25e4)) &&
                        ((c = Math.max(h, c * Math.sqrt(m.count / Es) * 1.02)),
                        (m = _(c)),
                        m.count > Es && ((c *= 1.02 * Math.sqrt(m.count / Es)), (m = _(c)))),
                        (this._step = c),
                        this._warnCoarse(a, c);
                    const { owners: y, ownerPoints: v, spacing: w } = m,
                        x = new Uint32Array(y.length + 1);
                    for (let t = 0; t < y.length; t++) x[t + 1] = x[t] + v[t].length / 2;
                    const D = x[y.length],
                        M = new Float64Array(D),
                        P = new Float64Array(D);
                    for (let t = 0; t < y.length; t++) {
                        const e = v[t];
                        for (let i = 0, n = x[t]; i < e.length; i += 2, n++) (M[n] = e[i]), (P[n] = e[i + 1]);
                    }
                    (this._owners = y),
                        (this._ownerStart = x),
                        (this._lon = new Float64Array(0)),
                        (this._lat = new Float64Array(0)),
                        (this._halfLon = new Float64Array(0)),
                        (this._unit = new Float64Array(0)),
                        (this._x = M),
                        (this._y = P),
                        (this._spacing = w),
                        (this._pixelOwner = new Uint32Array(D));
                    for (let t = 0; t < y.length; t++) this._pixelOwner.fill(t, x[t], x[t + 1]);
                    (this._vx = new Float64Array(0)),
                        (this._vy = new Float64Array(0)),
                        (this._shown = new Uint8Array(D).fill(1));
                    const S = [];
                    if (D && t.invert) {
                        const e = [0, D >> 1, D - 1];
                        for (let i = 0; i < e.length; i++) {
                            const n = t.invert([M[e[i]], P[e[i]]]);
                            n && isFinite(n[0]) && isFinite(n[1]) && S.push(n);
                        }
                    }
                    this._setView(t, S);
                }
                _setView(t, e) {
                    const i = t.translate();
                    this._view = {
                        projection: t,
                        scale: t.scale(),
                        x: i[0],
                        y: i[1],
                        clip: this._clipKey(t),
                        geo: e,
                        probes: this._probe(t, e),
                    };
                }
                _projectPixels(t) {
                    this._positionsDirty = !1;
                    const e = this._lon,
                        i = this._lat,
                        n = this._halfLon,
                        s = this._unit,
                        o = this._shown,
                        r = e.length,
                        a = this._shape().points,
                        h = a.length / 2,
                        c = this.get("pixelSize", 0.8),
                        u = this._halfLat * c,
                        d = this.get("equalWidth", !1),
                        g = ((this._step * this._shape().across) / 2) * c;
                    this._vx.length != r * h &&
                        ((this._vx = new Float64Array(r * h)), (this._vy = new Float64Array(r * h)));
                    const p = this._vx,
                        f = this._vy,
                        _ = t.clipAngle ? t.clipAngle() : 0,
                        m = t.rotate ? t.rotate() : [0, 0, 0];
                    let y = 0,
                        v = 0,
                        w = 0,
                        x = -2;
                    if (_) {
                        const t = -m[0] * l.RADIANS,
                            e = -m[1] * l.RADIANS;
                        (y = Math.cos(e) * Math.cos(t)),
                            (v = Math.cos(e) * Math.sin(t)),
                            (w = Math.sin(e)),
                            (x = Math.cos(_ * l.RADIANS));
                    }
                    const D = this.get("uniform", !1) ? 0 : this.get("columnHeight", 0),
                        M = D > 0 && De(t) ? -Math.sqrt(1 - 1 / ((1 + D) * (1 + D))) : x,
                        P = !_ && !m[1] && !m[2],
                        S = 179.999999,
                        I = 3 * l.RADIANS * t.scale(),
                        b = this._depth;
                    for (let _ = 0; _ < r; _++) {
                        o[_] = 0;
                        let r = !1;
                        if (x > -2 && ((b[_] = s[3 * _] * y + s[3 * _ + 1] * v + s[3 * _ + 2] * w), b[_] < x)) {
                            if (b[_] < M) continue;
                            r = !0;
                        }
                        const D = e[_],
                            T = i[_],
                            k = n[_] * c,
                            C = P ? ((((D + m[0] + 180) % 360) + 360) % 360) - 180 : 0;
                        let A = 1 / 0,
                            L = -1 / 0,
                            N = k,
                            R = 0;
                        for (; R < h; R++) {
                            const e = Math.max(-90, Math.min(90, T + a[2 * R + 1] * u));
                            let i = a[2 * R] * k;
                            d &&
                                ((i = a[2 * R] * Math.min(179, g / Math.max(Math.cos(e * l.RADIANS), 0.01))),
                                (N = Math.max(N, Math.abs(i)))),
                                P && (i = Math.max(-S - C, Math.min(S - C, i)));
                            const n = t([D + i, e]);
                            if (!n || !isFinite(n[0]) || !isFinite(n[1])) break;
                            (p[_ * h + R] = n[0]),
                                (f[_ * h + R] = n[1]),
                                (A = Math.min(A, n[0])),
                                (L = Math.max(L, n[0]));
                        }
                        R == h && L - A <= I * N * 2 + 1 && (o[_] = r ? 2 : 1);
                    }
                    const T = [];
                    if (r) {
                        const t = [0, r >> 1, r - 1];
                        for (let n = 0; n < t.length; n++) T.push([e[t[n]], i[t[n]]]);
                    }
                    this._setView(t, T);
                }
                _clipKey(t) {
                    return (
                        String(t.clipAngle ? t.clipAngle() : null) + "|" + String(t.clipExtent ? t.clipExtent() : null)
                    );
                }
                _probe(t, e) {
                    const i = [];
                    for (let n = 0; n < e.length; n++) {
                        const s = t(e[n]);
                        i.push(s ? s[0] : NaN, s ? s[1] : NaN);
                    }
                    return i;
                }
                _viewHolds(t) {
                    const e = this._view;
                    if (!e || e.projection !== t || e.clip != this._clipKey(t) || !e.geo.length) return !1;
                    const i = t.translate(),
                        n = t.scale() / e.scale,
                        s = i[0] - e.x * n,
                        o = i[1] - e.y * n,
                        r = this._probe(t, e.geo);
                    for (let t = 0; t < r.length; t++) {
                        const i = e.probes[t],
                            a = r[t];
                        if (isNaN(i) || isNaN(a)) {
                            if (isNaN(i) != isNaN(a)) return !1;
                        } else if (Math.abs(i * n + (t % 2 ? o : s) - a) > 0.001) return !1;
                    }
                    return !0;
                }
                _drawPixels(t) {
                    const e = this.projection();
                    if (!e) return;
                    const i = this.get("uniform", !1);
                    this._prepareLayout(e);
                    const n = this._view,
                        s = e.translate(),
                        o = e.scale() / n.scale,
                        r = s[0] - n.x * o,
                        a = s[1] - n.y * o,
                        l = this._root,
                        h = this.pixels.toLocal({ x: 0, y: 0 }),
                        c = this.pixels.toLocal({ x: l.width(), y: l.height() }),
                        u = h.x,
                        d = h.y,
                        g = c.x,
                        p = c.y;
                    if (!i && this.get("columnHeight", 0) > 0) return void this._drawColumns(t, e, o, r, a, u, d, g, p);
                    const f = this.get("pixelType", "square"),
                        _ = this._shape(),
                        m = _.points,
                        y = m.length / 2,
                        v = "circle" == f,
                        w = this._owners,
                        x = this._ownerStart,
                        D = this._shown,
                        M = this.get("pixelSize", 0.8),
                        P = ((this._spacing * _.across) / 2) * M * o,
                        S = ((this._spacing * _.between) / 2) * M * o,
                        I = Math.max(P, 2 * S),
                        b = this._x,
                        T = this._y,
                        k = this._vx,
                        C = this._vy,
                        A = new Float64Array(y),
                        L = new Float64Array(y);
                    for (let e = 0; e < w.length; e++) {
                        const n = w[e],
                            s = n.get("mapPolygon");
                        if (!s || !s.get("visible", !0) || !s.getPrivate("visible", !0) || n.isHidden()) continue;
                        const l = s.get("fill");
                        if (!l) continue;
                        const h = s.get("stroke"),
                            c = s.get("strokeWidth", 0),
                            f = s.get("strokeOpacity", 1),
                            _ = !!h && c > 0 && f > 0,
                            M = n.dataContext;
                        t.beginGroup(n.get("id"), M ? M.name : void 0),
                            t.beginPath(),
                            t.beginFill(l, s.get("fillOpacity", 1));
                        for (let n = x[e]; n < x[e + 1]; n++) {
                            if (1 != D[n]) continue;
                            if (i) {
                                const e = b[n] * o + r,
                                    i = T[n] * o + a;
                                if (e + I < u || e - I > g || i + I < d || i - I > p) continue;
                                if (v) t.drawCircle(e, i, P);
                                else {
                                    t.moveTo(e + m[0] * P, i - m[1] * S);
                                    for (let n = 1; n < y; n++) t.lineTo(e + m[2 * n] * P, i - m[2 * n + 1] * S);
                                    _ && t.closePath();
                                }
                                continue;
                            }
                            let e = 1 / 0,
                                s = -1 / 0,
                                l = 1 / 0,
                                h = -1 / 0;
                            for (let t = 0; t < y; t++) {
                                const i = k[n * y + t] * o + r,
                                    c = C[n * y + t] * o + a;
                                (A[t] = i),
                                    (L[t] = c),
                                    (e = Math.min(e, i)),
                                    (s = Math.max(s, i)),
                                    (l = Math.min(l, c)),
                                    (h = Math.max(h, c));
                            }
                            if (!(s < u || e > g || h < d || l > p))
                                if (v) {
                                    const e = Ns,
                                        i = A[0],
                                        n = L[0];
                                    t.moveTo(A[1], L[1]);
                                    for (let s = 1; s <= 4; s++) {
                                        const o = s,
                                            r = (s % 4) + 1;
                                        t.bezierCurveTo(
                                            A[o] + e * (A[r] - i),
                                            L[o] + e * (L[r] - n),
                                            A[r] + e * (A[o] - i),
                                            L[r] + e * (L[o] - n),
                                            A[r],
                                            L[r]
                                        );
                                    }
                                } else {
                                    t.moveTo(A[0], L[0]);
                                    for (let e = 1; e < y; e++) t.lineTo(A[e], L[e]);
                                    _ && t.closePath();
                                }
                        }
                        t.endFill(), _ && (t.lineStyle(c, h, f), t.endStroke()), t.endGroup();
                    }
                }
                _drawColumns(t, e, i, n, s, o, r, a, l) {
                    const h = this._shape().points.length / 2,
                        c = "circle" == this.get("pixelType", "square"),
                        u = c ? 12 : h,
                        d = this.get("columnHeight", 0),
                        g = e.scale(),
                        p = e.translate(),
                        f = p[0],
                        _ = p[1],
                        m = !(!e.clipAngle || !e.clipAngle()),
                        y = this._owners,
                        v = this._pixelOwner,
                        w = this._shown,
                        x = this._height,
                        D = this._vx,
                        M = this._vy,
                        P = w.length,
                        S = [];
                    for (let t = 0; t < y.length; t++) {
                        const e = y[t],
                            i = e.get("mapPolygon");
                        S.push(
                            !!i &&
                                i.get("visible", !0) &&
                                i.getPrivate("visible", !0) &&
                                !e.isHidden() &&
                                !!i.get("fill")
                        );
                    }
                    const I = new Float64Array(P),
                        b = [];
                    for (let t = 0; t < P; t++)
                        w[t] &&
                            S[v[t]] &&
                            ((I[t] = m ? this._depth[t] : M[t * h] * i + s - Rs * (D[t * h] * i + n)), b.push(t));
                    b.sort((t, e) => I[t] - I[e]);
                    const T = [],
                        k = new Float64Array(u),
                        C = new Float64Array(u),
                        A = new Float64Array(u),
                        L = new Float64Array(u),
                        N = new Float64Array(u),
                        R = new Float64Array(u);
                    for (let e = 0; e < b.length; e++) {
                        const p = b[e],
                            D = v[p],
                            M = y[D].get("mapPolygon"),
                            P = M.get("fill"),
                            S = M.get("fillOpacity", 1),
                            I = M.get("stroke"),
                            E = M.get("strokeWidth", 0),
                            B = M.get("strokeOpacity", 1),
                            F = !!I && E > 0 && B > 0,
                            z = () => {
                                F ? (t.closePath(), t.endFill(), t.lineStyle(E, I, B), t.endStroke()) : t.endFill();
                            };
                        this._screenOutline(p, h, c, i, n, s, k, C);
                        const O = 2 == w[p],
                            G = d * x[p];
                        if (O && G <= 0) continue;
                        const j = Fs(k, C, u);
                        let X = k,
                            Y = C;
                        if (
                            (O && (N.set(k), R.set(C), (X = N), (Y = R)), !this._raise(m, O, G, g, f, _, k, C, A, L, u))
                        )
                            continue;
                        let Z = 1 / 0,
                            H = -1 / 0,
                            W = 1 / 0,
                            U = -1 / 0;
                        for (let t = 0; t < u; t++)
                            (Z = Math.min(Z, k[t], A[t])),
                                (H = Math.max(H, k[t], A[t])),
                                (W = Math.min(W, C[t], L[t])),
                                (U = Math.max(U, C[t], L[t]));
                        if (!(H < o || Z > a || U < r || W > l)) {
                            if (G > 0)
                                for (let e = 0; e < u; e++) {
                                    const i = (e + 1) % u,
                                        n =
                                            k[e] * C[i] -
                                            k[i] * C[e] +
                                            (k[i] * L[i] - A[i] * C[i]) +
                                            (A[i] * L[e] - A[e] * L[i]) +
                                            (A[e] * C[e] - k[e] * L[e]);
                                    if (O ? n * j >= 0 : n * j <= 0) continue;
                                    let s = Y[i] - Y[e],
                                        o = X[e] - X[i];
                                    if ((j < 0 && ((s = -s), (o = -o)), O)) {
                                        const t = (X[e] + X[i]) / 2 - f,
                                            n = (Y[e] + Y[i]) / 2 - _,
                                            r = (2 * (s * t + o * n)) / (t * t + n * n || 1);
                                        (s -= r * t), (o -= r * n);
                                    }
                                    const r = (-0.6 * s - 0.8 * o) / (Math.sqrt(s * s + o * o) || 1),
                                        a = Math.round(((r + 1) / 2) * 5);
                                    let l = T[D];
                                    if (!l) {
                                        l = [];
                                        for (let t = 0; t < 6; t++) l.push(Ke.Q1.brighten(P, (0.4 * t) / 5 - 0.55));
                                        T[D] = l;
                                    }
                                    t.beginPath(),
                                        t.beginFill(l[a], S),
                                        t.moveTo(k[e], C[e]),
                                        t.lineTo(k[i], C[i]),
                                        t.lineTo(A[i], L[i]),
                                        t.lineTo(A[e], L[e]),
                                        z();
                                }
                            if (!O) {
                                t.beginPath(), t.beginFill(P, S), t.moveTo(A[0], L[0]);
                                for (let e = 1; e < u; e++) t.lineTo(A[e], L[e]);
                                z();
                            }
                        }
                    }
                }
                _screenOutline(t, e, i, n, s, o, r, a) {
                    const l = this._vx,
                        h = this._vy,
                        c = t * e;
                    if (i) {
                        const t = l[c] * n + s,
                            e = h[c] * n + o;
                        for (let i = 0; i < 4; i++) {
                            const u = c + 1 + i,
                                d = c + 1 + ((i + 1) % 4),
                                g = l[u] * n + s,
                                p = h[u] * n + o,
                                f = l[d] * n + s,
                                _ = h[d] * n + o,
                                m = g + Ns * (f - t),
                                y = p + Ns * (_ - e),
                                v = f + Ns * (g - t),
                                w = _ + Ns * (p - e);
                            for (let t = 0; t < 3; t++) {
                                const e = t / 3,
                                    n = 1 - e,
                                    s = n * n * n,
                                    o = 3 * n * n * e,
                                    l = 3 * n * e * e,
                                    h = e * e * e;
                                (r[3 * i + t] = s * g + o * m + l * v + h * f),
                                    (a[3 * i + t] = s * p + o * y + l * w + h * _);
                            }
                        }
                    } else for (let t = 0; t < e; t++) (r[t] = l[c + t] * n + s), (a[t] = h[c + t] * n + o);
                }
                _cellWeights() {
                    const t = this._shape().points;
                    let e = 0,
                        i = 0;
                    for (let n = 0; n < t.length; n += 2) (e += t[n] * t[n]), (i += t[n + 1] * t[n + 1]);
                    const n = [],
                        s = [];
                    for (let o = 0; o < t.length; o += 2) n.push(t[o] / e), s.push(t[o + 1] / i);
                    return { east: n, north: s };
                }
                _cellOutline(t, e, i, n, s, o, r, a) {
                    const l = this._vx,
                        h = this._vy,
                        c = t * e,
                        u = this.get("pixelSize", 0.8) || 1;
                    let d = 0,
                        g = 0,
                        p = 0,
                        f = 0,
                        _ = 0,
                        m = 0;
                    for (let t = 0; t < e; t++) {
                        const e = l[c + t] * n + s,
                            r = h[c + t] * n + o;
                        (d += e),
                            (g += r),
                            (p += i.east[t] * e),
                            (f += i.east[t] * r),
                            (_ += i.north[t] * e),
                            (m += i.north[t] * r);
                    }
                    (d /= e),
                        (g /= e),
                        (p /= u),
                        (f /= u),
                        (_ /= u),
                        (m /= u),
                        (r[0] = d + p + _),
                        (a[0] = g + f + m),
                        (r[1] = d - p + _),
                        (a[1] = g - f + m),
                        (r[2] = d - p - _),
                        (a[2] = g - f - m),
                        (r[3] = d + p - _),
                        (a[3] = g + f - m);
                }
                _raise(t, e, i, n, s, o, r, a, l, h, c) {
                    let u = !e;
                    for (let d = 0; d < c; d++)
                        if (e) {
                            const t = r[d] - s,
                                e = a[d] - o,
                                c = Math.sqrt(t * t + e * e) || 1,
                                g = c * (1 + i);
                            g > n && (u = !0);
                            const p = Math.max(n, g) / c;
                            (l[d] = s + t * p), (h[d] = o + e * p), (r[d] = s + (t * n) / c), (a[d] = o + (e * n) / c);
                        } else
                            t
                                ? ((l[d] = s + (r[d] - s) * (1 + i)), (h[d] = o + (a[d] - o) * (1 + i)))
                                : ((l[d] = r[d] + Rs * i * n), (h[d] = a[d] - i * n));
                    return u;
                }
                _drawHitArea(t) {
                    const e = this.projection();
                    if (!e || !this._hitArea.get("interactive")) return;
                    this._prepareLayout(e);
                    const i = this._view,
                        n = e.translate(),
                        s = e.scale(),
                        o = s / i.scale,
                        r = n[0] - i.x * o,
                        a = n[1] - i.y * o,
                        l = this._root,
                        h = this._hitArea.toLocal({ x: 0, y: 0 }),
                        c = this._hitArea.toLocal({ x: l.width(), y: l.height() }),
                        u = this.get("uniform", !1),
                        d = u ? 0 : this.get("columnHeight", 0),
                        g = !(!e.clipAngle || !e.clipAngle()),
                        p = this._shape(),
                        f = p.points.length / 2,
                        _ = this._cellWeights(),
                        m = this._visibleOwners(),
                        y = this._pixelOwner,
                        v = this._shown,
                        w = new Float64Array(4),
                        x = new Float64Array(4),
                        D = new Float64Array(4),
                        M = new Float64Array(4),
                        P = ((this._spacing * p.across) / 2) * o,
                        S = ((this._spacing * p.between) / 2) * o;
                    t.beginPath(), t.beginFill(Ke.Q1.fromHex(0), 1);
                    for (let e = 0; e < v.length; e++) {
                        if (!v[e] || !m[y[e]]) continue;
                        if (u) {
                            const i = this._x[e] * o + r,
                                n = this._y[e] * o + a;
                            i + P >= h.x &&
                                i - P <= c.x &&
                                n + S >= h.y &&
                                n - S <= c.y &&
                                t.drawRect(i - P, n - S, 2 * P, 2 * S);
                            continue;
                        }
                        this._cellOutline(e, f, _, o, r, a, w, x);
                        const i = 2 == v[e],
                            l = d * this._height[e];
                        if (i && l <= 0) continue;
                        let p = w,
                            I = x;
                        if (l > 0) {
                            const e = Fs(w, x, 4);
                            if (!this._raise(g, i, l, s, n[0], n[1], w, x, D, M, 4)) continue;
                            (p = D), (I = M);
                            for (let n = 0; n < 4; n++) {
                                const s = (n + 1) % 4,
                                    o =
                                        w[n] * x[s] -
                                        w[s] * x[n] +
                                        (w[s] * M[s] - D[s] * x[s]) +
                                        (D[s] * M[n] - D[n] * M[s]) +
                                        (D[n] * x[n] - w[n] * M[n]);
                                (i ? o * e < 0 : o * e > 0) &&
                                    (t.moveTo(w[n], x[n]),
                                    t.lineTo(w[s], x[s]),
                                    t.lineTo(D[s], M[s]),
                                    t.lineTo(D[n], M[n]));
                            }
                        }
                        Math.max(p[0], p[1], p[2], p[3]) < h.x ||
                            Math.min(p[0], p[1], p[2], p[3]) > c.x ||
                            Math.max(I[0], I[1], I[2], I[3]) < h.y ||
                            Math.min(I[0], I[1], I[2], I[3]) > c.y ||
                            i ||
                            (t.moveTo(p[0], I[0]), t.lineTo(p[1], I[1]), t.lineTo(p[2], I[2]), t.lineTo(p[3], I[3]));
                    }
                    t.endFill();
                }
                getPolygonByPoint(t) {
                    const e = this.projection(),
                        i = this._view;
                    if (!e || !i || this._gridDirty || this._positionsDirty) return;
                    const n = this.pixels.toLocal(t),
                        s = e.translate(),
                        o = e.scale(),
                        r = o / i.scale,
                        a = s[0] - i.x * r,
                        l = s[1] - i.y * r,
                        h = this.get("uniform", !1),
                        c = h ? 0 : this.get("columnHeight", 0),
                        u = !(!e.clipAngle || !e.clipAngle()),
                        d = this._shape(),
                        g = d.points.length / 2,
                        p = this._cellWeights(),
                        f = this._visibleOwners(),
                        _ = this._owners,
                        m = this._pixelOwner,
                        y = this._shown,
                        v = new Float64Array(4),
                        w = new Float64Array(4),
                        x = new Float64Array(4),
                        D = new Float64Array(4),
                        M = new Float64Array(4),
                        P = new Float64Array(4),
                        S = ((this._spacing * d.across) / 2) * r,
                        I = ((this._spacing * d.between) / 2) * r;
                    let b = -1,
                        T = -1 / 0;
                    for (let t = 0; t < y.length; t++) {
                        if (!y[t] || !f[m[t]]) continue;
                        if (h) {
                            if (
                                Math.abs(n.x - (this._x[t] * r + a)) <= S &&
                                Math.abs(n.y - (this._y[t] * r + l)) <= I
                            ) {
                                b = t;
                                break;
                            }
                            continue;
                        }
                        this._cellOutline(t, g, p, r, a, l, v, w);
                        const e = 2 == y[t],
                            i = c * this._height[t];
                        if (i <= 0) {
                            if (!e && zs(n.x, n.y, v, w, 0, 4)) {
                                b = t;
                                break;
                            }
                            continue;
                        }
                        const d = u ? this._depth[t] : w[0] - Rs * v[0];
                        if (d <= T) continue;
                        if (!this._raise(u, e, i, o, s[0], s[1], v, w, x, D, 4)) continue;
                        let _ = zs(n.x, n.y, x, D, 0, 4) || (!e && zs(n.x, n.y, v, w, 0, 4));
                        for (let t = 0; t < 4 && !_; t++) {
                            const e = (t + 1) % 4;
                            (M[0] = v[t]),
                                (P[0] = w[t]),
                                (M[1] = v[e]),
                                (P[1] = w[e]),
                                (M[2] = x[e]),
                                (P[2] = D[e]),
                                (M[3] = x[t]),
                                (P[3] = D[t]),
                                (_ = zs(n.x, n.y, M, P, 0, 4));
                        }
                        _ && ((b = t), (T = d));
                    }
                    return b >= 0 ? _[m[b]].get("mapPolygon") : void 0;
                }
                pixelCount() {
                    const t = this.projection();
                    return (
                        t ? this._layOut(t) : this._gridDirty && !this.get("uniform", !1) && this._buildGrid(),
                        this._shown.length
                    );
                }
                _layOut(t) {
                    this._gridDirty && (this.get("uniform", !1) ? this._buildScreenGrid(t) : this._buildGrid()),
                        this._positionsDirty && this._projectPixels(t),
                        this._heightsDirty && !this.get("uniform", !1) && this._computeHeights();
                }
            }
            (Os.className = "PixelMapSeries"), (Os.classNames = xs.classNames.concat([Os.className]));
            var Gs = i(1335);
            class js extends Gs.V {
                _afterNew() {
                    super._afterNew(), this.addTag("zoomtools");
                }
                _prepareChildren() {
                    super._prepareChildren(),
                        this.isPrivateDirty("chart") && this.set("target", this.getPrivate("chart"));
                }
            }
            function Xs(t, e) {
                return [D(e) * b(t), b(e)];
            }
            function Ys(t, e) {
                return [t, e];
            }
            function Zs(t, e) {
                var i = b(t),
                    n = (i + b(e)) / 2;
                if (v(n) < u)
                    return (function (t) {
                        var e = D(t);
                        function i(t, i) {
                            return [t * e, b(i) / e];
                        }
                        return (
                            (i.invert = function (t, i) {
                                return [t / e, A(i * e)];
                            }),
                            i
                        );
                    })(t);
                var s = 1 + i * (2 * n - i),
                    o = k(s) / n;
                function r(t, e) {
                    var i = k(s - 2 * n * b(e)) / n;
                    return [i * b((t *= n)), o - i * D(t)];
                }
                return (
                    (r.invert = function (t, e) {
                        var i = o - e,
                            r = x(t, v(i)) * T(i);
                        return i * n < 0 && (r -= g * T(t) * T(i)), [r / n, A((s - (t * t + i * i) * n * n) / (2 * n))];
                    }),
                    r
                );
            }
            function Hs() {
                return (function (t) {
                    var e = 0,
                        i = g / 3,
                        n = ki(t),
                        s = n(e, i);
                    return (
                        (s.parallels = function (t) {
                            return arguments.length ? n((e = t[0] * y), (i = t[1] * y)) : [e * m, i * m];
                        }),
                        s
                    );
                })(Zs)
                    .scale(155.424)
                    .center([0, 33.6442]);
            }
            (js.className = "ZoomControl"),
                (js.classNames = Gs.V.classNames.concat([js.className])),
                (Xs.invert = (function (t) {
                    return function (e, i) {
                        var n = k(e * e + i * i),
                            s = t(n),
                            o = b(s),
                            r = D(s);
                        return [x(e * o, n * r), A(n && (i * o) / n)];
                    };
                })(A)),
                (Ys.invert = Ys);
            var Ws = 1.340264,
                Us = -0.081106,
                qs = 893e-6,
                Vs = 0.003796,
                Ks = k(3) / 2;
            function Js(t, e) {
                var i = A(Ks * b(e)),
                    n = i * i,
                    s = n * n * n;
                return [
                    (t * D(i)) / (Ks * (Ws + 3 * Us * n + s * (7 * qs + 0.034164 * n))),
                    i * (Ws + Us * n + s * (qs + Vs * n)),
                ];
            }
            function $s(t, e) {
                var i = e * e,
                    n = i * i;
                return [
                    t * (0.8707 - 0.131979 * i + n * (n * (0.003971 * i - 0.001529 * n) - 0.013791)),
                    e * (1.007226 + i * (0.015085 + n * (0.028874 * i - 0.044475 - 0.005916 * n))),
                ];
            }
            (Js.invert = function (t, e) {
                for (
                    var i, n = e, s = n * n, o = s * s * s, r = 0;
                    r < 12 &&
                    ((o =
                        (s =
                            (n -= i =
                                (n * (Ws + Us * s + o * (qs + Vs * s)) - e) /
                                (Ws + 3 * Us * s + o * (7 * qs + 0.034164 * s))) * n) *
                        s *
                        s),
                    !(v(i) < d));
                    ++r
                );
                return [(Ks * t * (Ws + 3 * Us * s + o * (7 * qs + 0.034164 * s))) / D(n), A(b(n) / Ks)];
            }),
                ($s.invert = function (t, e) {
                    var i,
                        n = e,
                        s = 25;
                    do {
                        var o = n * n,
                            r = o * o;
                        n -= i =
                            (n * (1.007226 + o * (0.015085 + r * (0.028874 * o - 0.044475 - 0.005916 * r))) - e) /
                            (1.007226 + o * (0.045255 + r * (0.259866 * o - 0.311325 - 0.005916 * 11 * r)));
                    } while (v(i) > u && --s > 0);
                    return [
                        t /
                            (0.8707 +
                                (o = n * n) * (o * (o * o * o * (0.003971 - 0.001529 * o) - 0.013791) - 0.131979)),
                        n,
                    ];
                });
            const Qs = On("geoMercator", Ai),
                to = On("geoOrthographic", function () {
                    return Ti(Xs)
                        .scale(249.5)
                        .clipAngle(90 + u);
                }),
                eo = On("geoEquirectangular", function () {
                    return Ti(Ys).scale(152.63);
                }),
                io = On("geoAlbersUsa", function () {
                    var t,
                        e,
                        i,
                        n,
                        s,
                        o,
                        r = Hs()
                            .parallels([29.5, 45.5])
                            .scale(1070)
                            .translate([480, 250])
                            .rotate([96, 0])
                            .center([-0.6, 38.7]),
                        a = Hs().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
                        l = Hs().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
                        h = {
                            point: function (t, e) {
                                o = [t, e];
                            },
                        };
                    function c(t) {
                        var e = t[0],
                            r = t[1];
                        return (o = null), i.point(e, r), o || (n.point(e, r), o) || (s.point(e, r), o);
                    }
                    function d() {
                        return (t = e = null), c;
                    }
                    return (
                        (c.invert = function (t) {
                            var e = r.scale(),
                                i = r.translate(),
                                n = (t[0] - i[0]) / e,
                                s = (t[1] - i[1]) / e;
                            return (
                                s >= 0.12 && s < 0.234 && n >= -0.425 && n < -0.214
                                    ? a
                                    : s >= 0.166 && s < 0.234 && n >= -0.214 && n < -0.115
                                      ? l
                                      : r
                            ).invert(t);
                        }),
                        (c.stream = function (i) {
                            return t && e === i
                                ? t
                                : ((n = [r.stream((e = i)), a.stream(i), l.stream(i)]),
                                  (s = n.length),
                                  (t = {
                                      point: function (t, e) {
                                          for (var i = -1; ++i < s; ) n[i].point(t, e);
                                      },
                                      sphere: function () {
                                          for (var t = -1; ++t < s; ) n[t].sphere();
                                      },
                                      lineStart: function () {
                                          for (var t = -1; ++t < s; ) n[t].lineStart();
                                      },
                                      lineEnd: function () {
                                          for (var t = -1; ++t < s; ) n[t].lineEnd();
                                      },
                                      polygonStart: function () {
                                          for (var t = -1; ++t < s; ) n[t].polygonStart();
                                      },
                                      polygonEnd: function () {
                                          for (var t = -1; ++t < s; ) n[t].polygonEnd();
                                      },
                                  }));
                            var n, s;
                        }),
                        (c.precision = function (t) {
                            return arguments.length
                                ? (r.precision(t), a.precision(t), l.precision(t), d())
                                : r.precision();
                        }),
                        (c.scale = function (t) {
                            return arguments.length
                                ? (r.scale(t), a.scale(0.35 * t), l.scale(t), c.translate(r.translate()))
                                : r.scale();
                        }),
                        (c.translate = function (t) {
                            if (!arguments.length) return r.translate();
                            var e = r.scale(),
                                o = +t[0],
                                c = +t[1];
                            return (
                                (i = r
                                    .translate(t)
                                    .clipExtent([
                                        [o - 0.455 * e, c - 0.238 * e],
                                        [o + 0.455 * e, c + 0.238 * e],
                                    ])
                                    .stream(h)),
                                (n = a
                                    .translate([o - 0.307 * e, c + 0.201 * e])
                                    .clipExtent([
                                        [o - 0.425 * e + u, c + 0.12 * e + u],
                                        [o - 0.214 * e - u, c + 0.234 * e - u],
                                    ])
                                    .stream(h)),
                                (s = l
                                    .translate([o - 0.205 * e, c + 0.212 * e])
                                    .clipExtent([
                                        [o - 0.214 * e + u, c + 0.166 * e + u],
                                        [o - 0.115 * e - u, c + 0.234 * e - u],
                                    ])
                                    .stream(h)),
                                d()
                            );
                        }),
                        (c.fitExtent = function (t, e) {
                            return wi(c, t, e);
                        }),
                        (c.fitSize = function (t, e) {
                            return xi(c, t, e);
                        }),
                        (c.fitWidth = function (t, e) {
                            return Di(c, t, e);
                        }),
                        (c.fitHeight = function (t, e) {
                            return Mi(c, t, e);
                        }),
                        c.scale(1070)
                    );
                }),
                no = On("geoEqualEarth", function () {
                    return Ti(Js).scale(177.158);
                }),
                so = On("geoNaturalEarth1", function () {
                    return Ti($s).scale(175.295);
                });
        },
        5416: function (t, e, i) {
            i.r(e),
                i.d(e, {
                    am5map: function () {
                        return n;
                    },
                });
            const n = i(4836);
        },
        6929: function (t, e, i) {
            i.r(e),
                i.d(e, {
                    default: function () {
                        return n;
                    },
                });
            class n {
                constructor(t = [], e = s) {
                    if (((this.data = t), (this.length = this.data.length), (this.compare = e), this.length > 0))
                        for (let t = (this.length >> 1) - 1; t >= 0; t--) this._down(t);
                }
                push(t) {
                    this.data.push(t), this.length++, this._up(this.length - 1);
                }
                pop() {
                    if (0 === this.length) return;
                    const t = this.data[0],
                        e = this.data.pop();
                    return this.length--, this.length > 0 && ((this.data[0] = e), this._down(0)), t;
                }
                peek() {
                    return this.data[0];
                }
                _up(t) {
                    const { data: e, compare: i } = this,
                        n = e[t];
                    for (; t > 0; ) {
                        const s = (t - 1) >> 1,
                            o = e[s];
                        if (i(n, o) >= 0) break;
                        (e[t] = o), (t = s);
                    }
                    e[t] = n;
                }
                _down(t) {
                    const { data: e, compare: i } = this,
                        n = this.length >> 1,
                        s = e[t];
                    for (; t < n; ) {
                        let n = 1 + (t << 1),
                            o = e[n];
                        const r = n + 1;
                        if ((r < this.length && i(e[r], o) < 0 && ((n = r), (o = e[r])), i(o, s) >= 0)) break;
                        (e[t] = o), (t = n);
                    }
                    e[t] = s;
                }
            }
            function s(t, e) {
                return t < e ? -1 : t > e ? 1 : 0;
            }
        },
    },
    function (t) {
        var e = t((t.s = 5416)),
            i = window;
        for (var n in e) i[n] = e[n];
        e.__esModule && Object.defineProperty(i, "__esModule", { value: !0 });
    },
]);

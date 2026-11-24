/* =========================================================================
   SM-Map — Cards (Learn mode, optional)

   Shows a place's name as a card at the end of a leader line instead of a
   label. Cards place themselves clear of each other, other points and the
   toolbars; drag one to put it where you like (remembered per map).
   Leader lines: straight, elbow or curve.

   Placement and leader geometry are adapted from Cartouche (map infographic).
   ========================================================================= */
(function () {
  'use strict';

  var SM = window.SM;
  var LINES = ['straight', 'elbow', 'curve'];
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* Leader from the point (0, 0) to the edge of a card centred at (cx, cy) */
  function leader(cx, cy, w, h, style) {
    var hw = w / 2, hh = h / 2, ex, ey, s, k;
    if (Math.abs(cx) <= hw + 3 && Math.abs(cy) <= hh + 3) return null; // point is under the card
    if (style === 'straight') {
      ex = clamp(0, cx - hw, cx + hw);
      ey = clamp(0, cy - hh, cy + hh);
      return { d: 'M0 0L' + ex + ' ' + ey, ex: ex, ey: ey };
    }
    if (Math.abs(cx) > hw + 14) {                       // card to the side
      s = Math.sign(cx);
      ex = cx - s * hw;
      ey = clamp(0, cy - hh + Math.min(12, hh), cy + hh - Math.min(12, hh));
      if (style === 'curve') return { d: 'M0 0C' + ex * 0.35 + ' ' + ey + ' ' + ex * 0.55 + ' ' + ey + ' ' + ex + ' ' + ey, ex: ex, ey: ey };
      k = ex - s * Math.min(22, Math.abs(ex) * 0.45);
      return { d: 'M0 0L' + k + ' ' + ey + 'L' + ex + ' ' + ey, ex: ex, ey: ey };
    }
    s = Math.sign(cy) || -1;                            // card above / below
    ex = clamp(0, cx - hw + 10, cx + hw - 10);
    ey = cy - s * hh;
    if (style === 'curve') return { d: 'M0 0C' + ex + ' ' + ey * 0.35 + ' ' + ex + ' ' + ey * 0.55 + ' ' + ex + ' ' + ey, ex: ex, ey: ey };
    k = ey - s * Math.min(18, Math.abs(ey) * 0.45);
    return { d: 'M0 0L' + ex + ' ' + k + 'L' + ex + ' ' + ey, ex: ex, ey: ey };
  }

  /* ---- Geometry helpers for placement ---------------------------------- */

  function overlapArea(a, b, m) {
    var x = Math.min(a.x + a.w + m, b.x + b.w) - Math.max(a.x - m, b.x);
    var y = Math.min(a.y + a.h + m, b.y + b.h) - Math.max(a.y - m, b.y);
    return x > 0 && y > 0 ? x * y : 0;
  }
  function outside(R, W, H, m) {
    var inW = Math.max(0, Math.min(R.x + R.w, W - m) - Math.max(R.x, m));
    var inH = Math.max(0, Math.min(R.y + R.h, H - m) - Math.max(R.y, m));
    return R.w * R.h - inW * inH;
  }
  function segsCross(a, b, c, d) {
    var o = function (p, q, r) { return Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x)); };
    return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
  }
  function segHitsRect(a, b, R) {
    for (var t = 0.15; t < 0.95; t += 0.1) {
      var x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
      if (x > R.x && x < R.x + R.w && y > R.y && y < R.y + R.h) return true;
    }
    return false;
  }

  /* ---- Module ----------------------------------------------------------- */

  /**
   * opts.anchors()   -> container points of every feature in view (cards avoid covering them)
   * opts.obstacles() -> DOM elements cards should avoid (toolbars, list…)
   */
  SM.createCards = function (map, opts) {
    var POS_KEY = 'cardPos:' + SM.key;
    var saved = {};
    try { saved = JSON.parse(SM.store.get(POS_KEY)) || {}; } catch (e) { saved = {}; }

    var line = SM.store.get('cardLine');
    if (LINES.indexOf(line) === -1) line = 'elbow';

    var pane = map.createPane('cardPane');
    pane.style.zIndex = 645; // above features and markers, below labels

    var cards = new Map();   // feature -> card
    var pending = new Set();
    var frame = 0;

    function anchorOf(c) { return c.f.anchor(); }

    function build(f) {
      var marker = L.marker(f.anchor(), {
        pane: 'cardPane',
        interactive: false,
        keyboard: false,
        icon: L.divIcon({ className: 'sm-cardmark', iconSize: [0, 0], html: '' })
      });
      var c = { f: f, marker: marker, dx: null, dy: null, manual: false, el: null };
      var pos = saved[f.key];
      if (pos) { c.dx = pos[0]; c.dy = pos[1]; c.manual = true; }
      return c;
    }

    function fill(c) {
      var el = c.marker.getElement();
      el.innerHTML =
        '<svg class="sm-leader" width="1" height="1" aria-hidden="true"><circle class="sm-anchor" r="2.4"/><path/><circle class="sm-end" r="2.2"/></svg>' +
        '<div class="sm-card"><div class="sm-card-title"></div></div>';
      c.el = el;
      c.card = el.querySelector('.sm-card');
      c.path = el.querySelector('path');
      c.end = el.querySelector('.sm-end');
      c.card.querySelector('.sm-card-title').textContent = SM.plainText(c.f.label);

      var notes = (c.f.info || '').replace(/\.\s*<\/span>/g, '</span>').replace(/(\.+\s*)$/, '')
        .split(';').map(function (s) { return s.trim(); }).filter(function (s) { return SM.plainText(s); });
      if (notes.length) {
        var ul = document.createElement('ul');
        ul.className = 'sm-card-notes';
        ul.innerHTML = notes.map(function (n) { return '<li>' + n + '</li>'; }).join('');
        c.card.appendChild(ul);
      }
      L.DomEvent.disableClickPropagation(c.card);
      L.DomEvent.disableScrollPropagation(c.card);
      bindDrag(c);
    }

    /* ---- Position one card ---- */
    function place(c) {
      if (!c.el) return;
      var w = c.card.offsetWidth, h = c.card.offsetHeight;
      if (c.dx == null) { c.dx = 0; c.dy = -(h / 2 + 40); }
      c.card.style.left = Math.round(c.dx - w / 2) + 'px';
      c.card.style.top = Math.round(c.dy - h / 2) + 'px';
      var l = leader(c.dx, c.dy, w, h, line);
      c.path.setAttribute('d', l ? l.d : '');
      c.end.style.display = l ? '' : 'none';
      if (l) { c.end.setAttribute('cx', l.ex); c.end.setAttribute('cy', l.ey); }
    }

    /* ---- Automatic placement (only = Set of cards to place; null = all not moved by hand) ---- */
    function layout(only) {
      var size = map.getSize();
      var box = map.getContainer().getBoundingClientRect();
      var items = [];
      cards.forEach(function (c) {
        if (!c.el) return;
        items.push({
          c: c,
          p: map.latLngToContainerPoint(anchorOf(c)),
          w: c.card.offsetWidth || 120,
          h: c.card.offsetHeight || 28,
          movable: only ? only.has(c) : !c.manual
        });
      });
      if (!items.length) return;

      var cx = 0, cy = 0;
      items.forEach(function (i) { cx += i.p.x; cy += i.p.y; });
      cx /= items.length; cy /= items.length;

      // Toolbars and panels (soft) + every other point in view
      var obstacles = (opts.obstacles ? opts.obstacles() : []).map(function (el) {
        var r = el.getBoundingClientRect();
        return { x: r.left - box.left - 8, y: r.top - box.top - 8, w: r.width + 16, h: r.height + 16 };
      }).filter(function (o) { return o.w > 16 && o.h > 16; });
      var points = opts.anchors ? opts.anchors() : [];

      var placed = [];
      items.forEach(function (i) {
        if (i.movable) return;
        var x = i.p.x + i.c.dx, y = i.p.y + i.c.dy;
        placed.push({ x: x - i.w / 2, y: y - i.h / 2, w: i.w, h: i.h, p: i.p, c: { x: x, y: y } });
      });

      var mov = items.filter(function (i) { return i.movable; });
      mov.forEach(function (i) {
        i.crowd = items.reduce(function (n, j) { return n + (Math.hypot(j.p.x - i.p.x, j.p.y - i.p.y) < 180 ? 1 : 0); }, 0);
      });
      mov.sort(function (a, b) { return b.crowd - a.crowd || a.p.y - b.p.y; });

      var ANGLES = 32, GAPS = [26, 46, 72, 108, 160, 230];
      mov.forEach(function (it) {
        var ox = it.p.x - cx, oy = it.p.y - cy, ol = Math.hypot(ox, oy);
        if (ol < 1) { ox = 1; oy = -0.4; ol = Math.hypot(ox, oy); }
        ox /= ol; oy /= ol;
        var best = null, bestS = Infinity;
        for (var g = 0; g < GAPS.length; g++) {
          for (var k = 0; k < ANGLES; k++) {
            var a = (k / ANGLES) * Math.PI * 2, ux = Math.cos(a), uy = Math.sin(a);
            var t = Math.min(Math.abs(ux) > 1e-6 ? it.w / 2 / Math.abs(ux) : Infinity,
                             Math.abs(uy) > 1e-6 ? it.h / 2 / Math.abs(uy) : Infinity);
            var x = it.p.x + ux * (t + GAPS[g]), y = it.p.y + uy * (t + GAPS[g]);
            var R = { x: x - it.w / 2, y: y - it.h / 2, w: it.w, h: it.h }, c = { x: x, y: y };
            var s = GAPS[g] * 1.1;
            s += (1 - (ux * ox + uy * oy)) * 26;   // point away from the cluster
            s += Math.abs(uy) * 18;                // sideways cards read better with leaders
            for (var q = 0; q < placed.length && s < bestS; q++) {
              var P = placed[q];
              s += overlapArea(R, P, 12) * 4;
              if (segsCross(it.p, c, P.p, P.c)) s += 420;
              if (segHitsRect(it.p, c, P)) s += 300;
              if (segHitsRect(P.p, P.c, R)) s += 300;
            }
            for (var o = 0; o < obstacles.length; o++) s += overlapArea(R, obstacles[o], 0) * 1.5;
            for (var j = 0; j < points.length && s < bestS; j++) {
              var pt = points[j];
              if (pt.x > R.x - 12 && pt.x < R.x + R.w + 12 && pt.y > R.y - 12 && pt.y < R.y + R.h + 12) s += 900;
            }
            s += outside(R, size.x, size.y, 12) * 5;
            if (s < bestS) { bestS = s; best = { R: R, c: c }; }
          }
        }
        placed.push({ x: best.R.x, y: best.R.y, w: best.R.w, h: best.R.h, p: it.p, c: best.c });
        it.c.dx = Math.round(best.c.x - it.p.x);
        it.c.dy = Math.round(best.c.y - it.p.y);
        place(it.c);
      });
    }

    // Batch: cards shown in the same frame are placed together
    function schedule(c) {
      if (c) pending.add(c);
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var only = new Set();
        pending.forEach(function (p) { if (p.el && !p.manual) only.add(p); else if (p.el) place(p); });
        pending.clear();
        if (only.size) layout(only);
      });
    }

    /* ---- Dragging a card ---- */
    function bindDrag(c) {
      var drag = null;
      // A plain press starts a drag, not a text selection (double-click still selects)
      c.card.addEventListener('mousedown', function (e) { if (e.detail === 1) e.preventDefault(); });
      c.card.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return;
        e.stopPropagation();
        bringToFront(c);
        drag = { x: e.clientX, y: e.clientY, dx: c.dx, dy: c.dy, moved: false, id: e.pointerId };
      });
      c.card.addEventListener('pointermove', function (e) {
        if (!drag) return;
        var mx = e.clientX - drag.x, my = e.clientY - drag.y;
        if (!drag.moved) {
          if (Math.hypot(mx, my) < 4) return;
          drag.moved = true;
          try { c.card.setPointerCapture(drag.id); } catch (err) { /* ignore */ }
          c.card.classList.add('is-dragging');
          map.dragging.disable();
        }
        c.dx = drag.dx + mx;
        c.dy = drag.dy + my;
        c.manual = true;
        place(c);
      });
      var end = function () {
        if (!drag) return;
        if (drag.moved) {
          map.dragging.enable();
          saved[c.f.key] = [Math.round(c.dx), Math.round(c.dy)];
          SM.store.set(POS_KEY, JSON.stringify(saved));
        }
        c.card.classList.remove('is-dragging');
        drag = null;
      };
      c.card.addEventListener('pointerup', end);
      c.card.addEventListener('pointercancel', end);
    }

    var front = null;
    function bringToFront(c) {
      if (front && front !== c) front.marker.setZIndexOffset(0);
      c.marker.setZIndexOffset(1000);
      front = c;
    }

    // After a zoom, re-place automatic cards that now collide
    map.on('zoomend', function () {
      if (!cards.size) return;
      requestAnimationFrame(function () {
        var list = [], rects = [];
        cards.forEach(function (c) {
          if (!c.el) return;
          var r = c.card.getBoundingClientRect();
          list.push(c); rects.push({ x: r.left, y: r.top, w: r.width, h: r.height });
        });
        var redo = new Set();
        for (var i = 0; i < list.length; i++) {
          if (list[i].manual) continue;
          for (var j = 0; j < list.length; j++) {
            if (i !== j && overlapArea(rects[i], rects[j], 4)) { redo.add(list[i]); break; }
          }
        }
        if (redo.size) layout(redo);
      });
    });

    /* ---- Public API ---- */
    return {
      show: function (f, on) {
        var c = cards.get(f);
        if (on) {
          if (!c) { c = build(f); cards.set(f, c); }
          if (!map.hasLayer(c.marker)) {
            c.marker.addTo(map);
            fill(c);
            place(c);
            schedule(c);
          }
        } else if (c) {
          map.removeLayer(c.marker);
          c.el = null;
          cards.delete(f);
          if (front === c) front = null;
        }
      },
      highlight: function (f, on) {
        var c = cards.get(f);
        if (!c || !c.el) return;
        c.card.classList.toggle('highlighted', on);
        if (on) bringToFront(c);
      },
      // Card sizes changed (notes, label size): re-measure, re-place automatic ones
      refresh: function () {
        cards.forEach(function (c) { place(c); });
        layout(null);
      },
      line: function () { return line; },
      setLine: function (style) {
        line = LINES.indexOf(style) === -1 ? 'elbow' : style;
        SM.store.set('cardLine', line);
        cards.forEach(function (c) { place(c); });
      },
      nextLine: function () { this.setLine(LINES[(LINES.indexOf(line) + 1) % LINES.length]); return line; },
      // Forget dragged positions and lay everything out again
      rearrange: function () {
        saved = {};
        SM.store.del(POS_KEY);
        cards.forEach(function (c) { c.manual = false; });
        layout(null);
      }
    };
  };
})();

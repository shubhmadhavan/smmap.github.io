/* =========================================================================
   SM-Map — Guessr mode (Map_Guessr.html)

   A place is named; nothing is marked on the map. Click to drop your pin,
   then Guess (Space). The real place is revealed with a line to your pin,
   an approximate distance and a verdict. 10 rounds, up to 5,000 points each.
   ========================================================================= */
(function () {
  'use strict';

  var SM = window.SM;
  var ROUNDS = 10;
  var COL = '#d45f5d', LOC = '#68c8de', INK = '#14152a';

  /* Verdicts by distance (km). Combos: 3 Elite in a row = Rainbolt,
     3 misses of 1,000 km or more in a row = Irredeemable. */
  var TIERS = [
    { max: 10,       name: 'Elite',                            cls: 't-elite' },
    { max: 50,       name: 'Great',                            cls: 't-great' },
    { max: 250,      name: 'Good',                             cls: 't-good' },
    { max: 500,      name: 'Alright',                          cls: 't-alright' },
    { max: 1000,     name: 'Same world for sure',              cls: 't-meh' },
    { max: 2000,     name: 'It’s not there, lil bro',          cls: 't-bad' },
    { max: 3000,     name: 'Not even close',                   cls: 't-bad' },
    { max: 5000,     name: 'You really thought it was there?', cls: 't-worse' },
    { max: 8000,     name: 'Putting the guessing in Guessr',   cls: 't-worse' },
    { max: Infinity, name: 'Commoner',                         cls: 't-worst' }
  ];
  var VERY_BAD = 1000;

  SM.ready.then(init, SM.showError);

  /* ---- Geometry ---------------------------------------------------------- */

  var R_EARTH = 6371;
  var rad = function (d) { return d * Math.PI / 180; };

  function haversine(a, b) {
    var dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R_EARTH * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  // Nearest point on a polyline to g, using a flat projection around g (fine for picking the point)
  function nearestOnLine(g, pts) {
    var kx = 111.32 * Math.cos(rad(g[0])), ky = 110.57;
    var best = null, bestD = Infinity;
    function xy(p) { return [(p[1] - g[1]) * kx, (p[0] - g[0]) * ky]; }
    for (var i = 0; i < pts.length; i++) {
      var a = xy(pts[i]), b = xy(pts[Math.min(i + 1, pts.length - 1)]);
      var dx = b[0] - a[0], dy = b[1] - a[1], len = dx * dx + dy * dy;
      var t = len ? Math.max(0, Math.min(1, -(a[0] * dx + a[1] * dy) / len)) : 0;
      var x = a[0] + t * dx, y = a[1] + t * dy, d = x * x + y * y;
      if (d < bestD) { bestD = d; best = [g[0] + y / ky, g[1] + x / kx]; }
    }
    return best;
  }

  function insideRing(g, ring) {
    var inside = false, y = g[0], x = g[1];
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var yi = ring[i][0], xi = ring[i][1], yj = ring[j][0], xj = ring[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  // -> { km, at: [lat, lng] nearest point of the place, inside: bool }
  function measure(g, geom) {
    if (!Array.isArray(geom) && geom.type === 'Point') {
      return { km: haversine(g, geom.coordinates), at: geom.coordinates, inside: false };
    }
    var parts = Array.isArray(geom) ? geom : [geom];
    var area = parts.some(function (p) { return p.isPolygonBoundary; });
    if (area && parts.some(function (p) { return insideRing(g, p.coordinates); })) {
      return { km: 0, at: g, inside: true };
    }
    var best = null;
    parts.forEach(function (p) {
      var at = nearestOnLine(g, p.coordinates);
      var km = haversine(g, at);
      if (!best || km < best.km) best = { km: km, at: at, inside: false };
    });
    return best;
  }

  /* ---- Words and numbers ------------------------------------------------- */

  var fmt = function (n) { return Math.round(n).toLocaleString('en-IN'); };

  // Distances are shown as a range on purpose: the map data is approximate
  function rangeText(m, area) {
    if (m.inside) return 'inside ' + (area ? 'it' : 'the area');
    var d = m.km;
    if (d < 1) return 'right on it';
    if (d < 10) return 'under 10 km away';
    var step = d < 50 ? 10 : d < 250 ? 25 : d < 1000 ? 50 : d < 3000 ? 250 : 500;
    var lo = Math.floor(d / step) * step;
    return 'about ' + fmt(lo) + '–' + fmt(lo + step) + ' km away';
  }

  function tierFor(km) {
    for (var i = 0; i < TIERS.length; i++) if (km < TIERS[i].max || (i === 0 && km <= 10)) return TIERS[i];
    return TIERS[TIERS.length - 1];
  }

  /* ---- Game -------------------------------------------------------------- */

  function init() {
    var map = SM.createMap();
    SM.initChrome();

    var $ = function (id) { return document.getElementById(id); };
    var question = $('header'), find = document.querySelector('.question-find'), verdict = $('verdict'), done = $('result2');
    var actBtn = $('Advance'), actText = actBtn.querySelector('.advance-text');
    var roundEl = document.querySelector('.round-count'), scoreEl = document.querySelector('.total-score');
    var streakEl = document.querySelector('.streak'), hint = document.querySelector('.guess-hint');

    var startView = { center: map.getCenter(), zoom: map.getZoom() };
    var maxD = SM.world ? 14000 : 3000;          // distance scale for points (GeoGuessr-style)
    var BEST_KEY = 'guessrBest:' + SM.key;

    var pool = SM.readEntries().filter(function (en) { return en.geom && (!Array.isArray(en.geom) || en.geom.length); });
    var game, round;

    var layers = L.layerGroup().addTo(map);
    var pin = null;

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    }

    function newGame() {
      game = {
        order: shuffle(pool.slice()).slice(0, Math.min(ROUNDS, pool.length)),
        i: -1, score: 0, results: [], elite: 0, bad: 0, rainbolts: 0, irredeemable: 0
      };
      done.style.display = 'none';
      nextRound();
    }

    function nextRound() {
      game.i++;
      layers.clearLayers();
      pin = null;
      verdict.className = '';
      verdict.innerHTML = '';
      if (game.i >= game.order.length) { finish(); return; }
      var en = game.order[game.i];
      round = { en: en, guessed: false };
      question.textContent = SM.plainText(en.label);
      find.hidden = false;
      roundEl.textContent = (game.i + 1) + ' / ' + game.order.length;
      setAction('Guess', true);
      hint.hidden = false;
      map.flyTo(startView.center, startView.zoom, { duration: 0.6 });
    }

    function setAction(text, disabled) {
      actText.textContent = text;
      actBtn.disabled = !!disabled;
    }

    // Drop / move the pin
    map.on('click', function (e) {
      if (!round || round.guessed) return;
      if (!pin) {
        pin = L.marker(e.latlng, {
          icon: L.divIcon({ className: 'guess-pin', html: '<span></span>', iconSize: [0, 0] }),
          interactive: false, keyboard: false
        }).addTo(layers);
      } else {
        pin.setLatLng(e.latlng);
      }
      hint.hidden = true;
      setAction('Guess', false);
    });

    function drawTarget(geom) {
      var style = { color: LOC, weight: 3.5, opacity: 1, interactive: false, className: 'guessr-target' };
      if (!Array.isArray(geom) && geom.type === 'Point') {
        L.circleMarker(geom.coordinates, { radius: 7, color: INK, weight: 2, fillColor: LOC, fillOpacity: 1, interactive: false, className: 'guessr-target' }).addTo(layers);
        L.marker(geom.coordinates, { icon: L.divIcon({ className: 'guessr-pulse', html: '<span></span>', iconSize: [0, 0] }), interactive: false, keyboard: false }).addTo(layers);
        return L.latLngBounds([geom.coordinates]);
      }
      var parts = Array.isArray(geom) ? geom : [geom];
      var area = parts.some(function (p) { return p.isPolygonBoundary; });
      var group = L.featureGroup(parts.map(function (p) {
        return area
          ? L.polygon(p.coordinates, L.extend({ fillColor: COL, fillOpacity: 0.22 }, style))
          : L.polyline(p.coordinates, style);
      })).addTo(layers);
      return group.getBounds();
    }

    function guess() {
      if (!round || round.guessed || !pin) return;
      round.guessed = true;
      var en = round.en, g = [pin.getLatLng().lat, pin.getLatLng().lng];
      var m = measure(g, en.geom);
      var area = Array.isArray(en.geom) && en.geom.some(function (p) { return p.isPolygonBoundary; });
      var points = m.km < 0.5 ? 5000 : Math.round(5000 * Math.exp(-10 * m.km / maxD));

      // Reveal: the place, a line from the pin, the name
      var bounds = drawTarget(en.geom);
      if (!m.inside) {
        L.polyline([g, m.at], { color: COL, weight: 2.5, dashArray: '6 7', opacity: 0.95, interactive: false, className: 'guessr-line' }).addTo(layers);
      }
      L.marker(m.inside ? g : m.at, { icon: L.divIcon({ className: 'guessr-anchor', iconSize: [0, 0] }), interactive: false, keyboard: false })
        .bindTooltip(en.key, { permanent: true, direction: 'top', offset: [0, -10], className: 'correct-tooltip guessr-name' })
        .addTo(layers);

      // Verdict and combos
      var tier = tierFor(m.km), title = tier.name, cls = tier.cls, badge = '';
      if (m.km <= 10) { game.elite++; game.bad = 0; } else { game.elite = 0; }
      if (m.km >= VERY_BAD) { game.bad++; } else { game.bad = 0; }
      if (game.elite >= 3) {
        title = 'Rainbolt'; cls = 't-rainbolt'; game.rainbolts++;
        badge = game.elite === 3 ? 'Three Elites in a row' : game.elite + ' Elites in a row';
      } else if (game.bad >= 3) {
        title = 'Irredeemable'; cls = 't-irredeemable'; game.irredeemable++;
        badge = game.bad === 3 ? 'Three huge misses in a row' : game.bad + ' huge misses in a row';
      }

      game.score += points;
      game.results.push({ en: en, km: m.km, inside: m.inside, points: points, tier: tier.name });
      scoreEl.textContent = fmt(game.score);
      streakEl.textContent = game.elite >= 2 ? game.elite + ' Elite streak' : '';

      verdict.innerHTML = '<div class="verdict-title"></div><div class="verdict-sub"></div>' + (badge ? '<div class="verdict-badge"></div>' : '');
      verdict.querySelector('.verdict-title').textContent = title;
      verdict.querySelector('.verdict-sub').textContent = rangeText(m, area) + '  ·  +' + fmt(points);
      if (badge) verdict.querySelector('.verdict-badge').textContent = badge;
      verdict.className = 'show ' + cls;

      // Frame the pin and the place (whole place if it is small enough to matter)
      var view = L.latLngBounds([g, m.at]);
      var nw = bounds.getNorthWest(), se = bounds.getSouthEast();
      if (haversine([nw.lat, nw.lng], [se.lat, se.lng]) < 1500) view.extend(bounds);
      map.flyToBounds(view, { paddingTopLeft: [60, 190], paddingBottomRight: [60, 130], maxZoom: 7, duration: 0.9 });

      setAction(game.i + 1 >= game.order.length ? 'See results' : 'Next', false);
    }

    function finish() {
      round = null;
      question.textContent = 'Game over';
      find.hidden = true;
      layers.clearLayers();
      verdict.className = '';
      map.flyTo(startView.center, startView.zoom, { duration: 0.8 });
      var r = game.results;
      var avg = r.reduce(function (s, x) { return s + x.km; }, 0) / (r.length || 1);
      var best = r.slice().sort(function (a, b) { return a.km - b.km; })[0];
      var prev = parseInt(SM.store.get(BEST_KEY), 10) || 0;
      var newBest = game.score > prev;
      if (newBest) SM.store.set(BEST_KEY, game.score);
      var title = tierFor(avg).name;
      if (game.rainbolts) title = 'Rainbolt energy';
      else if (game.irredeemable && avg >= VERY_BAD) title = 'Irredeemable';

      done.innerHTML =
        '<h2></h2>' +
        '<p class="done-score"><b></b> / ' + fmt(r.length * 5000) + '</p>' +
        '<dl class="done-stats">' +
          '<dt>Average miss</dt><dd class="s-avg"></dd>' +
          '<dt>Best guess</dt><dd class="s-best"><span></span><small></small></dd>' +
          (game.rainbolts ? '<dt>Rainbolts</dt><dd>' + game.rainbolts + '</dd>' : '') +
          (game.irredeemable ? '<dt>Irredeemables</dt><dd>' + game.irredeemable + '</dd>' : '') +
          '<dt>Best on this map</dt><dd class="s-record"></dd>' +
        '</dl>';
      done.querySelector('h2').textContent = title;
      done.querySelector('.done-score b').textContent = fmt(game.score);
      done.querySelector('.s-avg').textContent = avg < 10 ? 'under 10 km' : '≈ ' + fmt(avg) + ' km';
      if (best) {
        done.querySelector('.s-best span').textContent = SM.plainText(best.en.label);
        done.querySelector('.s-best small').textContent = best.inside ? 'inside' : best.km < 10 ? 'under 10 km' : '≈ ' + fmt(best.km) + ' km';
      }
      done.querySelector('.s-record').textContent = newBest ? fmt(game.score) + ' (new best!)' : fmt(prev);
      done.append(
        button('Play again', 'pill pill-accent', newGame),
        button('All maps', 'pill', function () { location.href = '../index.html'; })
      );
      done.style.display = 'block';
      setAction('Play again', false);
      roundEl.textContent = game.order.length + ' / ' + game.order.length;
    }

    function button(text, cls, onClick) {
      var b = document.createElement('button');
      b.className = cls;
      b.textContent = text;
      b.addEventListener('click', onClick);
      return b;
    }

    function act() {
      if (!round) { newGame(); return; }
      if (!round.guessed) guess();
      else nextRound();
    }

    actBtn.addEventListener('click', act);
    SM.onKey(function (e, key) {
      if (e.ctrlKey || e.metaKey || e.altKey || SM.isTyping(e)) return false;
      if (key === ' ' || key === 'Enter') {
        if (e.target.closest && e.target.closest('button:not(#Advance), a, input')) return false;
        if (!actBtn.disabled) act();
        return true;
      }
      return false;
    });

    if (!pool.length) { question.textContent = 'No places on this map'; setAction('Guess', true); return; }
    newGame();
  }
})();

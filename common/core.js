/* =========================================================================
   SM-Map core — shared by the Learn page (Map_Game_2_dark.html)
   and the Quiz page (Map_Game_dark.html).

   - Leaflet map + India base image / world tiles
   - WKT parsing (POINT, LINESTRING, POLYGON, GEOMETRYCOLLECTION)
   - Themes (base image + stylesheet), font size, shared keyboard shortcuts
   ========================================================================= */
(function () {
  'use strict';

  var boot = window.SM_BOOT || { key: '', world: false, ready: Promise.reject(new Error('maps.js missing')) };

  /* ---- Constants -------------------------------------------------------- */

  // Lat/Lng of the India base image's corners. Every India_OS_*.jpg shares
  // these bounds, so coordinates line up whichever theme is active.
  var IMAGE_BOUNDS = [[-2.0, 36.78], [41.33, 121.216]];
  var DEFAULT_IMAGE = '../Map_Images/India_OS_dark.jpg';
  var TILES = '../Map_Images/map_tiles/{z}_{x}_{y}.png';   // zoom 0–6, enlarged beyond

  /* Tile themes (same as Cartouche): each recolours the tiles with a "gradient map".
     The tiles have three brightness bands (labels dark, water ~0.85, land ~0.98) with
     borders in between, so each band gets its own colour. pal = [land, water, border, label].
     "classic" keeps the world maps' original look (CSS filters in app.css). */
  var TILE_THEMES = {
    classic:   { name: 'Classic',   note: 'The original world map look', sw: ['#d3d8da', '#7d8a92'] },
    atlas:     { name: 'Atlas',     note: 'Ink on cream',        pal: ['#f6f1e6', '#cdd7d6', '#d8b3a6', '#6b6255'], sw: ['#f6f1e6', '#b4361f'] },
    gazette:   { name: 'Gazette',   note: 'Antique broadsheet',  pal: ['#efe2c3', '#cbb894', '#9c7c55', '#5a4228'], sw: ['#e9dcc0', '#8a3a12'] },
    nocturne:  { name: 'Nocturne',  note: 'Dark, amber leaders', pal: ['#26282e', '#111216', '#4f473b', '#a59d8d'], sw: ['#1b1d22', '#e8b04a'] },
    blueprint: { name: 'Blueprint', note: 'Drafting table',      pal: ['#1f4d8f', '#133a74', '#88aade', '#dbe6ff'], sw: ['#173a6b', '#ffffff'] },
    verdant:   { name: 'Verdant',   note: 'Soft greens',         pal: ['#edf0da', '#b7d2d4', '#b3c494', '#4d5c44'], sw: ['#dfe6d0', '#2f6b3a'] },
    chart:     { name: 'Chart',     note: 'Nautical blues',      pal: ['#f4efe1', '#a7c3d8', '#c4a283', '#33475e'], sw: ['#cfdcc0', '#1f4e79'] },
    ember:     { name: 'Ember',     note: 'Charcoal & gold',     pal: ['#2b2723', '#131517', '#6e5730', '#c9b48a'], sw: ['#2c2a26', '#ffd25a'] },
    graphite:  { name: 'Graphite',  note: 'Stark monochrome',    pal: ['#ffffff', '#dedede', '#a9a9a9', '#4a4a4a'], sw: ['#e4e4e4', '#111111'] },
    coast:     { name: 'Coast',     note: 'Clean & colourful',   pal: ['#fbfaf5', '#9fd0de', '#e3b3be', '#3b5560'], sw: ['#eaf0f2', '#0b6e99'] },
    original:  { name: 'Original',  note: 'Tiles as they are',   sw: ['#fafaf8', '#d4dadc'] }
  };
  var HOME = '../index.html';

  // Map styles: base image + interface colours (html[data-theme], see app.css).
  // Ctrl/Alt/Cmd + 1-3 picks one; picking the active one again (or Ctrl+4) returns to the default.
  // The ids are the localStorage values used since the first version, so saved choices carry over.
  var THEMES = [
    { id: 'isToggled3', key: '1', image: '../Map_Images/India_OS_Grey.jpg',  ui: 'default' },
    { id: 'isToggled4', key: '2', image: '../Map_Images/India_OS_Green.jpg', ui: 'green' },
    { id: 'isToggled1', key: '3', image: '../Map_Images/India_OS_baige.jpg', ui: 'beige' }
  ];

  var FONT = { min: 11, max: 17, step: 1, fallback: 10 };

  /* ---- Small helpers ---------------------------------------------------- */

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  function isTyping(e) {
    var t = e.target;
    return !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
  }

  // "Name<br><span class='nl'>notes</span>" -> plain "Name"
  var scratch = document.createElement('div');
  function plainText(html) {
    scratch.innerHTML = html;
    return (scratch.textContent || '').trim();
  }

  var isPhone = window.matchMedia('(max-width: 768px)').matches ||
                /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* ---- WKT parsing ------------------------------------------------------
     Kept behaviour-identical to the original parser: WKT stores "lon lat",
     Leaflet wants [lat, lon]. POLYGON rings become closed LineStrings flagged
     isPolygonBoundary (drawn as outlines, filled by location_color.css).
     ----------------------------------------------------------------------- */
  function toLatLng(pair) {
    var p = pair.split(' ');
    return [parseFloat(p[1]), parseFloat(p[0])];
  }

  function parseGeometry(wkt) {
    var type = wkt.split(' ')[0];

    if (type === 'GEOMETRYCOLLECTION') {
      var polys = wkt.match(/(POLYGON) \(\([^)]+\)\)/g);
      if (!polys) return [];
      var out = [];
      polys.forEach(function (g) {
        var parsed = parseGeometry(g.trim());
        if (Array.isArray(parsed)) out.push.apply(out, parsed);
        else if (parsed) out.push(parsed);
      });
      return out;
    }

    if (type === 'POINT') {
      var c = wkt.replace(type, '').trim().slice(1, -1).split(', ')[0];
      return { type: 'Point', coordinates: toLatLng(c) };
    }

    if (type === 'POLYGON') {
      var rings = wkt.match(/\(\(.+?\)\)/g);
      if (!rings) return null;
      return rings.map(function (ring) {
        return {
          type: 'LineString',
          coordinates: ring.replace(/[()]/g, '').split(', ').map(toLatLng),
          isPolygonBoundary: true
        };
      });
    }

    if (type === 'LINESTRING') {
      return {
        type: 'LineString',
        coordinates: wkt.replace(type, '').trim().slice(1, -1).split(', ').map(toLatLng)
      };
    }

    return null;
  }

  // Average of every vertex (same label anchor the original used)
  function centroid(parts) {
    var lat = 0, lng = 0, n = 0;
    parts.forEach(function (g) {
      var pts = g.type === 'Point' ? [g.coordinates] : g.coordinates;
      pts.forEach(function (p) { lat += p[0]; lng += p[1]; n++; });
    });
    return n ? [lat / n, lng / n] : null;
  }

  /* Read the loaded mapData into a list of entries:
     { key, label, info, empty, geom }   geom = parsed geometry, or null */
  function readEntries() {
    /* global mapData */
    var data = typeof mapData !== 'undefined' ? mapData : {};
    return Object.keys(data).map(function (key) {
      var raw = data[key];
      var parts = key.split('<br>');
      var empty = !(raw && raw.trim());
      return {
        key: key,
        label: (parts[0] || '').trim(),
        info: (parts[1] || '').trim(),
        empty: empty,                       // headings / notes in the list
        geom: empty ? null : parseGeometry(raw)
      };
    });
  }

  /* ---- Map -------------------------------------------------------------- */

  var map = null, overlay = null, tiles = null;
  var tileMode = boot.world || store.get('baseMap') === 'tiles';

  function createMap() {
    map = L.map('map', { doubleClickZoom: false, zoomSnap: 0.5, zoomDelta: 0.5, zoomControl: false, scrollWheelZoom: false })
      .setView(isPhone ? [20.0760, 80.9629] : [20.5937, 80.9629], isPhone ? 4 : 5);
    window.map = map; // handy from the console

    if (boot.world) {
      document.body.classList.add('world-map');
      map.setView([0, 0], 2);
      map.setMaxZoom(6.3);
    } else if (isPhone) {
      // Tall phone screens: zoom in towards filling the height, but keep all of India in view
      var fill = map.getBoundsZoom(IMAGE_BOUNDS, true);
      var india = map.getBoundsZoom([[6.5, 68], [35.7, 97.4]]);
      var z = Math.min(fill, india);
      if (z > map.getZoom()) map.setView([22, 82.7], z, { animate: false });
    }
    buildTileFilters();
    setBase(tileMode, true);

    // Keep Leaflet's size in sync when late CSS / mobile bars / rotation resize the container
    var pending = 0;
    function refresh() {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(function () { map.invalidateSize(); });
    }
    if (window.ResizeObserver) new ResizeObserver(refresh).observe(map.getContainer());
    window.addEventListener('load', refresh);
    window.addEventListener('orientationchange', function () { setTimeout(refresh, 300); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) refresh(); });

    // Let the user select tooltip text without dragging the map
    var tipPane = map.getPane('tooltipPane');
    tipPane.addEventListener('pointerover', function (e) {
      if (e.target.closest('.leaflet-tooltip')) map.dragging.disable();
    });
    tipPane.addEventListener('pointerout', function (e) {
      var to = e.relatedTarget;
      if (!(to && to.closest && to.closest('.leaflet-tooltip'))) map.dragging.enable();
    });

    smoothWheelZoom(map);
    initThemes();
    initTileThemes();
    var baseBtn = document.querySelector('.base-toggle');
    if (baseBtn) baseBtn.addEventListener('click', toggleBase);
    return map;
  }

  /* ---- Smooth wheel / trackpad zoom --------------------------------------
     Leaflet's built-in wheel zoom jumps half a level per notch with a short
     animation, which stutters when events arrive quickly (trackpads, fast
     wheels). Instead, glide towards the target zoom on every animation frame,
     keeping the point under the cursor still. Layers are only scaled while
     gliding and re-drawn once at the end, like Leaflet's own zoom animation.
     ----------------------------------------------------------------------- */
  function smoothWheelZoom(map) {
    var PX_PER_LEVEL = 150;  // one mouse-wheel notch (~100px) is about two-thirds of a level
    var PINCH_BOOST = 4;     // trackpad pinch (ctrl + wheel) sends small deltas
    var EASE = 0.78;         // share of the distance left after each 60 Hz frame
    var target = null, anchorPt = null, anchorLL = null, raf = 0, last = 0;

    function finish() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (target !== null) { target = null; map._moveEnd(true); }
    }

    function step(now) {
      if (map._animatingZoom) { finish(); return; }
      var dt = Math.min(64, now - last);
      last = now;
      var z = map.getZoom();
      var next = z + (target - z) * (1 - Math.pow(EASE, dt / 16.7));
      var done = Math.abs(target - next) < 0.002;
      if (done) next = target;
      // keep the point under the cursor fixed
      var centerPx = map.project(anchorLL, next).subtract(anchorPt).add(map.getSize().divideBy(2));
      map._move(map.unproject(centerPx, next), next);
      if (done) { raf = 0; finish(); }
      else raf = requestAnimationFrame(step);
    }

    map.getContainer().addEventListener('wheel', function (e) {
      e.preventDefault();
      // scroll distance in pixels, the same on every OS (lines / pages converted)
      var d = -e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 100 : 1);
      if (!d) return;
      if (e.ctrlKey) d *= PINCH_BOOST;
      d = Math.max(-PX_PER_LEVEL, Math.min(PX_PER_LEVEL, d));  // at most 1 level per event
      if (target === null) {
        map._stop();
        target = map.getZoom();
        map._moveStart(true, false);
      }
      target = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), target + d / PX_PER_LEVEL));
      anchorPt = map.mouseEventToContainerPoint(e);
      anchorLL = map.containerPointToLatLng(anchorPt);
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
    }, { passive: false });

    map.on('dragstart', finish);  // grabbing the map stops the glide
  }

  /* ---- Base map: India image or tiles (B) -------------------------------- */

  function setBase(useTiles, initial) {
    if (boot.world) useTiles = true;
    tileMode = useTiles;
    document.body.classList.toggle('tiles-base', useTiles);
    if (!boot.world && !initial) store.set('baseMap', useTiles ? 'tiles' : 'image');

    if (useTiles) {
      if (overlay) { map.removeLayer(overlay); overlay = null; }
      if (!tiles) {
        tiles = L.tileLayer(TILES, boot.world
          ? { attribution: '&copy; CARTO' }
          : { attribution: '&copy; CARTO', maxNativeZoom: 6, maxZoom: 12 });
      }
      if (!map.hasLayer(tiles)) tiles.addTo(map);
      document.documentElement.removeAttribute('data-theme'); // the interface keeps its night colours
      applyTileTheme(tileThemeKey());
    } else {
      if (tiles && map.hasLayer(tiles)) map.removeLayer(tiles);
      map.getPane('tilePane').style.filter = '';
      document.body.classList.remove('tiles-classic', 'tiles-themed');
      if (!overlay) {
        var theme = activeTheme();
        overlay = L.imageOverlay(theme ? theme.image : DEFAULT_IMAGE, IMAGE_BOUNDS).addTo(map);
        overlay.on('load', function () { map.invalidateSize(); });
      }
      applyTheme(activeTheme());
    }

    var btn = document.querySelector('.base-toggle');
    if (btn) btn.setAttribute('aria-pressed', useTiles);
    closeThemePop();
  }

  function toggleBase() { if (!boot.world) setBase(!tileMode); }

  /* ---- Tile themes ------------------------------------------------------- */

  function hexRGB(h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16) / 255; }); }

  // One <filter> per palette theme (gradient map over the tiles' brightness), as in Cartouche
  function buildTileFilters() {
    if (document.getElementById('tile-filters')) return;
    var N = 160, defs = '';
    Object.keys(TILE_THEMES).forEach(function (key) {
      var t = TILE_THEMES[key];
      if (!t.pal) return;
      var c = t.pal.map(hexRGB), land = c[0], water = c[1], border = c[2], label = c[3];
      var stops = [[0, label], [0.7, label], [0.83, water], [0.875, water], [0.925, border], [0.962, land], [1, land]];
      var ch = [[], [], []];
      for (var i = 0; i < N; i++) {
        var x = i / (N - 1), k = 0;
        while (k < stops.length - 2 && x > stops[k + 1][0]) k++;
        var x0 = stops[k][0], c0 = stops[k][1], x1 = stops[k + 1][0], c1 = stops[k + 1][1];
        var f = x1 === x0 ? 0 : Math.max(0, Math.min(1, (x - x0) / (x1 - x0)));
        for (var j = 0; j < 3; j++) ch[j].push((c0[j] + (c1[j] - c0[j]) * f).toFixed(4));
      }
      defs += '<filter id="tf-' + key + '" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">' +
        '<feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/>' +
        '<feComponentTransfer>' + ['R', 'G', 'B'].map(function (n, j) {
          return '<feFunc' + n + ' type="table" tableValues="' + ch[j].join(' ') + '"/>';
        }).join('') + '</feComponentTransfer></filter>';
    });
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'tile-filters';
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    svg.innerHTML = '<defs>' + defs + '</defs>';
    document.body.prepend(svg);
  }

  // World maps start in Classic (their original look); India tile maps in Atlas
  function tileThemeKey() {
    var k = store.get('tileTheme');
    return TILE_THEMES[k] ? k : (boot.world ? 'classic' : 'atlas');
  }

  function swatch(t) {
    return 'linear-gradient(135deg, ' + t.sw[0] + ' 52%, ' + t.sw[1] + ' 52%)';
  }

  function applyTileTheme(key, save) {
    var t = TILE_THEMES[key] || TILE_THEMES.atlas;
    if (save) store.set('tileTheme', key);
    if (tileMode) {
      document.body.classList.toggle('tiles-classic', key === 'classic');
      document.body.classList.toggle('tiles-themed', key !== 'classic');
      map.getPane('tilePane').style.filter = t.pal ? 'url(#tf-' + key + ')' : '';
    }
    var sw = document.querySelector('.tile-theme-btn .tile-swatch');
    if (sw) sw.style.background = swatch(t);
    var btn = document.querySelector('.tile-theme-btn');
    if (btn) btn.title = 'Map theme: ' + t.name;
    document.querySelectorAll('.theme-pop [data-tile-theme]').forEach(function (b) {
      b.setAttribute('aria-checked', b.getAttribute('data-tile-theme') === key);
    });
  }

  function closeThemePop() {
    var pop = document.querySelector('.theme-pop');
    var btn = document.querySelector('.tile-theme-btn');
    if (pop) pop.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function initTileThemes() {
    var btn = document.querySelector('.tile-theme-btn');
    var pop = document.querySelector('.theme-pop');
    if (!btn || !pop) return;
    pop.innerHTML = Object.keys(TILE_THEMES).map(function (key) {
      var t = TILE_THEMES[key];
      return '<button role="menuitemradio" aria-checked="false" data-tile-theme="' + key + '">' +
        '<i class="tile-swatch" style="background:' + swatch(t) + '"></i>' +
        '<span>' + t.name + '<small>' + t.note + '</small></span></button>';
    }).join('');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = pop.hidden;
      pop.hidden = !open;
      btn.setAttribute('aria-expanded', open);
      if (open) {
        var on = pop.querySelector('[aria-checked="true"]');
        if (on) on.focus();
      }
    });
    pop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tile-theme]');
      if (!b) return;
      applyTileTheme(b.getAttribute('data-tile-theme'), true);
    });
    document.addEventListener('pointerdown', function (e) {
      if (!pop.hidden && !e.target.closest('.theme-pop, .tile-theme-btn')) closeThemePop();
    });
    applyTileTheme(tileThemeKey());
  }

  /* ---- Map styles (India image) ------------------------------------------ */

  function activeTheme() {
    var id = store.get('activeTheme');
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    if (id) store.del('activeTheme');
    return null;
  }

  function applyTheme(theme) {
    if (tileMode) { // remember the choice for when the India image comes back
      if (theme) store.set('activeTheme', theme.id); else store.del('activeTheme');
      return;
    }
    var ui = theme ? theme.ui : 'default';
    if (ui === 'default') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', ui);
    if (overlay) {
      var url = theme ? theme.image : DEFAULT_IMAGE;
      if (overlay._url !== url) overlay.setUrl(url);
    }
    document.querySelectorAll('[data-theme-id]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme-id') === (theme ? theme.id : 'default'));
    });
    if (theme) store.set('activeTheme', theme.id);
    else store.del('activeTheme');
  }

  function toggleTheme(theme) {
    applyTheme(activeTheme() === theme ? null : theme);
  }

  function initThemes() {
    document.querySelectorAll('[data-theme-id]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-theme-id');
        applyTheme(THEMES.filter(function (t) { return t.id === id; })[0] || null);
      });
    });
    if (!tileMode) applyTheme(activeTheme());
  }

  /* ---- Font size (Z) ---------------------------------------------------- */

  var fontSize = parseInt(store.get('fontSize'), 10) || FONT.fallback;
  function applyFont(size) {
    document.documentElement.style.setProperty('--tooltip-font-size', size + 'px');
    store.set('fontSize', size);
    document.dispatchEvent(new Event('sm:fontsize'));
  }
  function nextFont() {
    fontSize = fontSize + FONT.step > FONT.max ? FONT.min : fontSize + FONT.step;
    applyFont(fontSize);
  }
  applyFont(fontSize);

  /* ---- Navigation (WASD / FG / D-pad) ----------------------------------- */

  var STEP = 200, FAST = STEP * 1.2;
  var PAN = { w: [0, -STEP], s: [0, STEP], a: [-STEP, 0], d: [STEP, 0] };

  function pan(dir) { if (map) map.panBy(PAN[dir], { animate: true }); }

  function bindDpad() {
    var dirs = { up: 'w', down: 's', left: 'a', right: 'd' };
    Object.keys(dirs).forEach(function (cls) {
      var b = document.querySelector('.arrow-btn.' + cls);
      if (b) b.addEventListener('click', function () { pan(dirs[cls]); });
    });
  }

  /* ---- Shared keyboard shortcuts ----------------------------------------
     Page scripts register extra keys through SM.onKey(fn); fn returns true
     when it handled the key. Browser shortcuts (Ctrl/Cmd + C, F, R, T, …)
     are never swallowed.
     ----------------------------------------------------------------------- */
  var keyHandlers = [];

  document.addEventListener('keydown', function (e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    var mod = e.ctrlKey || e.metaKey;

    if (mod && key === 'h') { e.preventDefault(); location.href = HOME; return; }
    if (key === 'Escape') closeThemePop();

    if (mod || e.altKey) {
      // Ctrl / Alt / Cmd + 1-3 theme, + 4 default theme (e.code so Option+digit works on macOS)
      var digit = /^Digit([1-4])$/.exec(e.code || '');
      digit = digit ? digit[1] : e.key;
      var theme = THEMES.filter(function (t) { return t.key === digit; })[0];
      if (theme) { e.preventDefault(); toggleTheme(theme); return; }
      if (digit === '4') { e.preventDefault(); applyTheme(null); return; }
    }

    for (var i = 0; i < keyHandlers.length; i++) {
      if (keyHandlers[i](e, key)) { e.preventDefault(); e.stopPropagation(); return; }
    }

    if (mod || e.altKey || isTyping(e) || !map) return;

    if (key === 'z') { nextFont(); return; }
    if (key === 'b') { toggleBase(); return; }
    if (key === 'f') { e.preventDefault(); map.zoomIn(); return; }
    if (key === 'g') { e.preventDefault(); map.zoomOut(); return; }
    if (PAN[key]) {
      e.preventDefault();
      if (e.shiftKey && key === 'w') map.zoomIn();
      else if (e.shiftKey && key === 's') map.zoomOut();
      else if (e.shiftKey) map.panBy([PAN[key][0] / STEP * FAST, 0], { animate: true });
      else pan(key);
    }
  }, true); // capture: runs before Leaflet's own arrow-key handler

  /* ---- iOS: stop the page itself pinch-zooming (the map still zooms) ---- */

  if (/iPhone|iPad/.test(navigator.userAgent)) {
    document.addEventListener('touchstart', function (e) {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });
  }
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (t) {
    document.addEventListener(t, function (e) { e.preventDefault(); });
  });

  /* ---- Page chrome shared by both modes --------------------------------- */

  function initChrome() {
    // Title plate + Learn / Quiz switch for the same map
    var title = document.querySelector('.map-title');
    if (title && boot.title) title.textContent = boot.title;
    document.querySelectorAll('.mode-switch a[data-page]').forEach(function (a) {
      a.href = a.getAttribute('data-page') + (boot.key ? '?selection=' + encodeURIComponent(boot.key) : '');
    });

    var fontBtn = document.getElementById('font-switcher');
    if (fontBtn) fontBtn.addEventListener('click', nextFont);

    var zin = document.querySelector('.zoom-in'), zout = document.querySelector('.zoom-out');
    if (zin) zin.addEventListener('click', function () { if (map) map.zoomIn(); });
    if (zout) zout.addEventListener('click', function () { if (map) map.zoomOut(); });

    bindDpad();
  }

  function showError(err) {
    var box = document.getElementById('map');
    if (!box) return;
    box.classList.add('map-error');
    box.innerHTML = '<div class="map-error-box"><p></p><p><a href="' + HOME + '">Back to the map list</a></p></div>';
    box.querySelector('p').textContent = (err && err.message) || 'This map could not be loaded.';
    console.error(err);
  }

  /* ---- Public API ------------------------------------------------------- */

  window.SM = {
    key: boot.key,
    title: boot.title,
    world: boot.world,
    ready: boot.ready,
    isPhone: isPhone,
    store: store,
    isTyping: isTyping,
    plainText: plainText,
    parseGeometry: parseGeometry,
    centroid: centroid,
    readEntries: readEntries,
    createMap: createMap,
    initChrome: initChrome,
    showError: showError,
    onKey: function (fn) { keyHandlers.push(fn); }
  };
})();

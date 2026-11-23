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
  var DEFAULT_CSS = 'theme1.css';
  var WORLD_TILES = '../Map_Images/map_tiles/{z}_{x}_{y}.png';
  var HOME = '../index.html';

  // Ctrl/Alt/Cmd + key switches theme; clicking the active theme (or Ctrl+4) returns to default.
  var THEMES = [
    { button: '.toggle-map-3', id: 'isToggled3', key: '1', image: '../Map_Images/India_OS_Grey.jpg', css: 'theme1.css' },
    { button: '.toggle-map-4', id: 'isToggled4', key: '2', image: '../Map_Images/India_OS_Green.jpg', css: 'theme2.css' },
    { button: '.toggle-map-1', id: 'isToggled1', key: '3', image: '../Map_Images/India_OS_baige.jpg', css: 'themebaige.css' }
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

  var map = null, overlay = null;

  function createMap() {
    map = L.map('map', { doubleClickZoom: false, zoomSnap: 0.5, zoomDelta: 0.5 })
      .setView(isPhone ? [20.0760, 80.9629] : [20.5937, 80.9629], isPhone ? 4 : 5);
    window.map = map; // handy from the console

    if (boot.world) {
      document.body.classList.add('world-map');
      map.setView([0, 0], 2);
      map.setMaxZoom(6.3);
      L.tileLayer(WORLD_TILES, { attribution: '&copy; CARTO' }).addTo(map);
    } else {
      var theme = activeTheme();
      overlay = L.imageOverlay(theme ? theme.image : DEFAULT_IMAGE, IMAGE_BOUNDS).addTo(map);
      overlay.on('load', function () { map.invalidateSize(); });
    }

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

    initThemes();
    return map;
  }

  /* ---- Themes ----------------------------------------------------------- */

  var themeLink = null;

  function activeTheme() {
    var id = store.get('activeTheme');
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    if (id) store.del('activeTheme');
    return null;
  }

  function applyTheme(theme) {
    themeLink = themeLink || document.getElementById('themeStylesheet');
    if (themeLink) themeLink.setAttribute('href', theme ? theme.css : DEFAULT_CSS);
    if (overlay) {
      var url = theme ? theme.image : DEFAULT_IMAGE;
      if (overlay._url !== url) overlay.setUrl(url);
    }
    THEMES.forEach(function (t) {
      var b = document.querySelector(t.button);
      if (b) b.classList.toggle('active', t === theme);
    });
    if (theme) store.set('activeTheme', theme.id);
    else store.del('activeTheme');
  }

  function toggleTheme(theme) {
    applyTheme(activeTheme() === theme ? null : theme);
  }

  function initThemes() {
    THEMES.forEach(function (t) {
      var b = document.querySelector(t.button);
      if (b) b.addEventListener('click', function () { toggleTheme(t); });
    });
    applyTheme(activeTheme());
  }

  /* ---- Font size (Z) ---------------------------------------------------- */

  var fontSize = parseInt(store.get('fontSize'), 10) || FONT.fallback;
  function applyFont(size) {
    document.documentElement.style.setProperty('--tooltip-font-size', size + 'px');
    store.set('fontSize', size);
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

  function initChrome(otherPage) {
    // The ⌂ / ⇌ buttons wrap a link: make the whole button clickable, not just the glyph
    document.querySelectorAll('.home-link-button, .mode-switch').forEach(function (btn) {
      var a = btn.querySelector('a');
      if (a) btn.addEventListener('click', function (e) { if (!a.contains(e.target)) a.click(); });
    });

    // ⇌ switches Learn <-> Quiz for the same map
    var sw = document.querySelector('.switcher');
    if (sw && boot.key) sw.href = otherPage + '?selection=' + encodeURIComponent(boot.key);

    var fontBtn = document.getElementById('font-switcher');
    if (fontBtn) fontBtn.addEventListener('click', nextFont);

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

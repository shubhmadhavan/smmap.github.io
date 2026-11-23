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
  var WORLD_TILES = '../Map_Images/map_tiles/{z}_{x}_{y}.png';
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

  var map = null, overlay = null;

  function createMap() {
    map = L.map('map', { doubleClickZoom: false, zoomSnap: 0.5, zoomDelta: 0.5, zoomControl: false, scrollWheelZoom: false })
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
      // Tall phone screens: zoom in towards filling the height, but keep all of India in view
      if (isPhone) {
        var fill = map.getBoundsZoom(IMAGE_BOUNDS, true);
        var india = map.getBoundsZoom([[6.5, 68], [35.7, 97.4]]);
        var z = Math.min(fill, india);
        if (z > map.getZoom()) map.setView([22, 82.7], z, { animate: false });
      }
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

    smoothWheelZoom(map);
    initThemes();
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

  /* ---- Map styles ------------------------------------------------------- */

  function activeTheme() {
    var id = store.get('activeTheme');
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    if (id) store.del('activeTheme');
    return null;
  }

  function applyTheme(theme) {
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

/* =========================================================================
   SM-Map — Learn mode (Map_Game_2_dark.html)

   Click a feature to toggle its name. Reveal (R) shows every name.
   Sidebar (☰ / F4) lists everything; arrows + Enter highlight on the map.
   Press ? on the page for the full list of shortcuts.
   ========================================================================= */
(function () {
  'use strict';

  var SM = window.SM;

  // Vector styles. location_color.css (per map) overrides colours via CSS.
  var POINT_STYLE   = { radius: 4, weight: 2, fillOpacity: 1, className: 'point_leaflet' };
  var LINE_STYLE    = { color: '#60A6C2', weight: 3, opacity: 1, className: 'line_leaflet' };
  var OUTLINE_STYLE = { color: '#EDC1A0', weight: 3, opacity: 1, className: 'polygon_leaflet' };
  // Under-layer for points and lines (see drawFeatures)
  var UNDER_POINT   = { radius: 4, color: '#EDC1A0', weight: 2, fillColor: '#FF9B50', fillOpacity: 1, className: 'point_leaflet' };
  var UNDER_LINE    = { color: '#EDC1A0', weight: 3, opacity: 1, className: 'line_leaflet' };
  var LABEL         = { permanent: true, className: 'reveal-all-tooltip' };
  var TAP_RADIUS    = 20; // px: touch taps this close to a point still hit it

  SM.ready.then(init, SM.showError);

  function init() {
    var map = SM.createMap();
    SM.initChrome('Map_Game_dark.html');

    var entries = SM.readEntries();
    var features = drawFeatures(map, entries);   // index-aligned with entries
    var state = { revealed: false, activeTip: null };

    /* ---------------------------------------------------------------------
       Labels
       --------------------------------------------------------------------- */

    function isShown(f) { return f.tip.style.display === 'block'; }

    function setShown(f, show) {
      var was = f.tip.style.display === 'block';
      f.tip.style.display = show ? 'block' : 'none';
      // Labels are measured by Leaflet while hidden (width 0), so left-hand
      // labels would overlap their point until the next zoom. Re-place on show.
      if (show && !was) f.layer.getTooltip()._updatePosition();
    }

    // Click on a feature: toggle its name and its "selected-path" style
    function toggleFeature(f) {
      if (!f.tip) return;
      var show = !isShown(f);
      setShown(f, show);
      f.paths().forEach(function (el) { if (el) el.classList.toggle('selected-path', show); });
    }

    features.forEach(function (f) {
      if (!f) return;
      f.clickable.forEach(function (layer) {
        layer.on('click', function (e) {
          L.DomEvent.stopPropagation(e);
          // Alt + click keeps a feature painted (used by Paint India)
          if (e.originalEvent.altKey) layer.getElement().classList.toggle('persistent-hover');
          toggleFeature(f);
        });
      });
    });

    // Touch: a tap that just misses a small point still selects it
    var lastPointer = 'mouse';
    map.getContainer().addEventListener('pointerdown', function (e) { lastPointer = e.pointerType; }, true);
    map.on('click', function (e) {
      if (lastPointer === 'mouse') return;
      var best = null, bestDist = TAP_RADIUS;
      features.forEach(function (f) {
        if (!f || f.kind !== 'point') return;
        var d = map.latLngToContainerPoint(f.layer.getLatLng()).distanceTo(e.containerPoint);
        if (d < bestDist) { bestDist = d; best = f; }
      });
      if (best) toggleFeature(best);
    });

    /* ---------------------------------------------------------------------
       Reveal all (button / R)
       --------------------------------------------------------------------- */

    var revealBtn = document.querySelector('.reveal-all');

    function toggleReveal() {
      state.revealed = !state.revealed;
      features.forEach(function (f) { if (f && f.tip) setShown(f, state.revealed); });
      if (revealBtn) revealBtn.setAttribute('aria-pressed', state.revealed);
    }
    if (revealBtn) revealBtn.addEventListener('click', toggleReveal);

    /* ---------------------------------------------------------------------
       Info mode (ⓘ / T / Ctrl+I): show the notes inside the labels
       --------------------------------------------------------------------- */

    var infoBtn = document.querySelector('.info-br');
    var notesFormatted = false;

    function setInfo(on) {
      var notes = document.querySelectorAll('.kl, .nl');
      document.body.classList.toggle('hide-ui', on);
      document.body.classList.toggle('toggle-active', on);
      if (on && !notesFormatted) {
        notes.forEach(function (el) { el.innerHTML = el.innerHTML.replace(/;/g, '.<br>'); });
        notesFormatted = true;
      }
      notes.forEach(function (el) { el.classList.toggle('visible-force', on); });
      if (infoBtn) infoBtn.classList.toggle('active', on);
      SM.store.set('ui-active', on ? '1' : '0');
    }
    function toggleInfo() { setInfo(!document.body.classList.contains('hide-ui')); }
    if (infoBtn) infoBtn.addEventListener('click', toggleInfo);
    if (SM.store.get('ui-active') === '1') setInfo(true);

    /* ---------------------------------------------------------------------
       Sidebar list + notes popup
       --------------------------------------------------------------------- */

    var sidebar = document.getElementById('sidebar');
    var list = sidebar.querySelector('.map-data-list');
    var search = sidebar.querySelector('.sidebar-search');
    var listBtn = document.querySelector('.reveal-list');
    var items = [];
    var current = -1;
    var popup = null;
    var INDEX_KEY = 'sidebarIndex:' + SM.key;

    function sidebarOpen() { return sidebar.style.display !== 'none'; }

    function buildList() {
      if (items.length) return;
      var frag = document.createDocumentFragment();
      entries.forEach(function (en, i) {
        var li = document.createElement('li');
        li.textContent = SM.plainText(en.label);
        li.tabIndex = -1;
        if (en.empty) li.classList.add('empty-item');
        li.addEventListener('click', function () { highlight(i); setCurrent(i); });
        items.push(li);
        frag.appendChild(li);
      });
      list.appendChild(frag);
    }

    // Toggle the map label for list item i (bring it to the front)
    function highlight(i) {
      var f = features[i], li = items[i];
      if (!f || !f.tip) return;
      document.querySelectorAll('.leaflet-tooltip').forEach(function (el) { el.style.zIndex = 1; });
      f.tip.style.zIndex = 9999;
      var on = !li.classList.contains('highlighted');
      li.classList.toggle('highlighted', on);
      f.tip.classList.toggle('highlighted', on);
      if (on) setShown(f, true);
      else if (!state.revealed) setShown(f, false);
    }

    function setCurrent(i) {
      if (current >= 0 && items[current]) items[current].classList.remove('focused');
      current = i;
      var li = items[i];
      if (!li) return;
      li.classList.add('focused');
      if (document.activeElement !== search) li.focus({ preventScroll: true });
      li.scrollIntoView({ block: 'nearest' });
      showPopup(entries[i].info);
      SM.store.set(INDEX_KEY, i);
    }

    function visibleItems() {
      return items.filter(function (li) { return !li.hidden; });
    }

    function step(dir) {
      openSidebar();
      var vis = visibleItems();
      if (!vis.length) return;
      var pos = vis.indexOf(items[current]);
      pos = pos === -1 ? (dir > 0 ? 0 : vis.length - 1) : (pos + dir + vis.length) % vis.length;
      setCurrent(items.indexOf(vis[pos]));
    }

    function clearPopup() {
      if (popup) { popup.remove(); popup = null; }
    }

    // Notes after <br> in a key, one bullet per ";"
    function showPopup(info) {
      clearPopup();
      if (!info) return;
      info = info.replace(/\.\s*<\/span>/g, '</span>').replace(/(\.+\s*)$/, '');
      var bullets = info.split(';').map(function (s) { return s.trim(); }).filter(Boolean);
      popup = document.createElement('div');
      popup.className = 'sidebar-popup';
      popup.innerHTML = '<ul class="safe-nl">' + bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
      document.body.appendChild(popup);
    }

    function openSidebar() {
      if (sidebarOpen()) return;
      sidebar.style.display = 'flex';
      SM.store.set('sidebarVisible', 'true');
      buildList();
    }

    function closeSidebar() {
      sidebar.style.display = 'none';
      SM.store.set('sidebarVisible', 'false');
      clearPopup();
    }

    function toggleSidebar() { if (sidebarOpen()) closeSidebar(); else openSidebar(); }

    if (listBtn) listBtn.addEventListener('click', toggleSidebar);

    // Filter box
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        var first = -1;
        items.forEach(function (li, i) {
          var hit = !q || (!entries[i].empty && li.textContent.toLowerCase().indexOf(q) !== -1);
          li.hidden = !hit;
          if (hit && first === -1 && q) first = i;
        });
        if (first !== -1) setCurrent(first);
      });
      search.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && search.value) {
          e.stopPropagation();
          search.value = '';
          search.dispatchEvent(new Event('input'));
        }
      });
    }

    // Restore the sidebar as the user left it
    if (SM.store.get('sidebarVisible') === 'true') {
      openSidebar();
      var saved = parseInt(SM.store.get(INDEX_KEY), 10);
      if (saved >= 0 && saved < items.length) setCurrent(saved);
    }

    /* ---------------------------------------------------------------------
       Full-screen list (⛶ / Esc)
       --------------------------------------------------------------------- */

    var fullBtn = document.querySelector('.full-list');
    function setFullList(on) {
      document.body.classList.toggle('full-list-active', on);
      if (fullBtn) fullBtn.classList.toggle('active', on);
      if (on) openSidebar();
    }
    if (fullBtn) fullBtn.addEventListener('click', function () {
      setFullList(!document.body.classList.contains('full-list-active'));
    });

    /* ---------------------------------------------------------------------
       Nudge a label: click a shown label, then I / J / K / L
       --------------------------------------------------------------------- */

    var offsets = new WeakMap();
    document.addEventListener('pointerdown', function (e) {
      var tip = e.target.closest && e.target.closest('.reveal-all-tooltip');
      state.activeTip = tip && tip.style.display !== 'none' ? tip : null;
    });

    function nudge(tip, dx, dy) {
      var o = offsets.get(tip) || { x: 0, y: 0 };
      o.x += dx; o.y += dy;
      offsets.set(tip, o);
      tip.style.translate = o.x + 'px ' + o.y + 'px'; // survives Leaflet repositioning
    }

    /* ---------------------------------------------------------------------
       Shortcut help (?)
       --------------------------------------------------------------------- */

    var help = document.getElementById('help');
    function toggleHelp(force) {
      if (!help) return;
      help.hidden = typeof force === 'boolean' ? !force : !help.hidden;
    }
    if (help) help.addEventListener('click', function () { toggleHelp(false); });

    /* ---------------------------------------------------------------------
       Keyboard
       --------------------------------------------------------------------- */

    var NUDGE = { i: [0, -10], k: [0, 10], j: [-10, 0], l: [10, 0] };

    SM.onKey(function (e, key) {
      var mod = e.ctrlKey || e.metaKey;

      if (mod && key === 'i') { toggleInfo(); return true; }
      if (mod || e.altKey) return false;

      var inSearch = e.target === search;
      var focusOnControl = !inSearch && e.target.closest && e.target.closest('button, a, input, select, textarea');

      // Sidebar navigation works whether or not the list has focus
      if ((key === 'ArrowDown' || key === 'ArrowUp') && sidebarOpen() && !focusOnControl) {
        step(key === 'ArrowDown' ? 1 : -1);
        return true;
      }
      if (key === 'Enter' && sidebarOpen() && current >= 0 && !focusOnControl) {
        items[current].click();
        return true;
      }
      if (key === 'F4' || (e.shiftKey && key === '$')) { toggleSidebar(); return true; }
      if (key === 'F3') {
        openSidebar();
        (items[current] || sidebar).focus();
        return true;
      }
      if (key === 'Escape') {
        if (help && !help.hidden) toggleHelp(false);
        else setFullList(false);
        state.activeTip = null;
        return false;
      }

      if (SM.isTyping(e)) return false;

      if (state.activeTip && NUDGE[key]) {
        nudge(state.activeTip, NUDGE[key][0], NUDGE[key][1]);
        return true;
      }
      switch (key) {
        case 'r': toggleReveal(); return true;
        case 't':
        case 'i': toggleInfo(); return true;
        case '/': openSidebar(); if (search) search.focus(); return true;
        case '?': toggleHelp(); return true;
      }
      return false;
    });
  }

  /* -----------------------------------------------------------------------
     Draw the features.

     Pass 1 (data order): polygon outlines, plus an under-layer copy of every
     point and line. Points and lines have always been painted twice on this
     site, and the translucent fills / thin strokes in location_color.css were
     tuned against that look, so the under-layer is kept on purpose (it has no
     label and shares the feature's click handler).

     Pass 2 (data order): the clickable point / line layers and the anchors for
     polygon labels, each with a permanent label that starts hidden.
     ----------------------------------------------------------------------- */
  function drawFeatures(map, entries) {
    var features = entries.map(function () { return null; });
    var under = [];

    entries.forEach(function (en, i) {
      var g = en.geom;
      if (!g) return;
      if (Array.isArray(g)) {
        var parts = g.map(function (part) { return L.polyline(part.coordinates, OUTLINE_STYLE).addTo(map); });
        features[i] = {
          kind: 'area',
          clickable: parts,
          paths: function () { return parts.map(function (p) { return p.getElement(); }); }
        };
      } else if (g.type === 'Point') {
        under[i] = L.circleMarker(g.coordinates, UNDER_POINT).addTo(map);
      } else if (g.type === 'LineString') {
        under[i] = L.polyline(g.coordinates, UNDER_LINE).addTo(map);
      }
    });

    entries.forEach(function (en, i) {
      var g = en.geom, layer = null, f = features[i];
      if (!g) return;

      if (Array.isArray(g)) {
        var c = SM.centroid(g);
        if (c) {
          layer = L.marker(c, {
            icon: L.divIcon({ className: 'reveal-all-tooltip-icon', html: '●', iconSize: [1, 1] })
          });
        }
      } else if (g.type === 'Point') {
        layer = L.circleMarker(g.coordinates, POINT_STYLE);
        f = features[i] = { kind: 'point', clickable: [layer, under[i]] };
      } else if (g.type === 'LineString') {
        layer = L.polyline(g.coordinates, LINE_STYLE);
        f = features[i] = { kind: 'line', clickable: [layer, under[i]] };
      }
      if (!layer) return;

      layer.bindTooltip(en.key, LABEL).addTo(map);
      f.layer = layer;
      f.tip = layer.getTooltip().getElement();
      f.tip.style.display = 'none';
      if (!f.paths) f.paths = function () { return [layer.getElement()]; };
    });

    return features;
  }
})();

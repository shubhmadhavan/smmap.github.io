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
    SM.initChrome();

    var entries = SM.readEntries();
    var features = drawFeatures(map, entries);   // index-aligned with entries
    var state = { revealed: false, activeTip: null };

    /* ---------------------------------------------------------------------
       Labels
       --------------------------------------------------------------------- */

    // A shown name is drawn as a label (default) or, in card mode, as a card
    var cards = SM.createCards(map, { anchors: anchorsInView, obstacles: cardObstacles });
    var cardsOn = SM.store.get('cards') === '1';

    function isShown(f) { return !!f.shown; }

    function render(f) {
      if (cardsOn) {
        f.tip.style.display = 'none';
        cards.show(f, !!f.shown);
        if (f.shown) cards.highlight(f, f.tip.classList.contains('highlighted'));
        return;
      }
      cards.show(f, false);
      var was = f.tip.style.display === 'block';
      f.tip.style.display = f.shown ? 'block' : 'none';
      // Labels are measured by Leaflet while hidden (width 0), so left-hand
      // labels would overlap their point until the next zoom. Re-place on show.
      if (f.shown && !was) f.layer.getTooltip()._updatePosition();
    }

    function setShown(f, show) {
      f.shown = show;
      render(f);
    }

    function anchorsInView() {
      var size = map.getSize(), out = [];
      features.forEach(function (f) {
        if (!f || !f.layer) return;
        var p = map.latLngToContainerPoint(f.anchor());
        if (p.x > -20 && p.y > -20 && p.x < size.x + 20 && p.y < size.y + 20) out.push(p);
      });
      return out;
    }

    function cardObstacles() {
      return Array.prototype.slice.call(document.querySelectorAll('.plate, .rail-top, .rail-bottom, #sidebar, .sidebar-popup'));
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
          if (e.originalEvent && e.originalEvent.altKey) layer.getElement().classList.toggle('persistent-hover');
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
      if (cardsOn) requestAnimationFrame(cards.refresh);
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
        if (!li.textContent) li.classList.add('blank');
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
      if (cardsOn) cards.highlight(f, on);
    }

    function setCurrent(i) {
      if (current >= 0 && items[current]) items[current].classList.remove('focused');
      current = i;
      var li = items[i];
      if (!li) return;
      li.classList.add('focused');
      if (document.activeElement !== search) li.focus({ preventScroll: true });
      li.scrollIntoView({ block: 'nearest' });
      showPopup(li.textContent, entries[i].info);
      SM.store.set(INDEX_KEY, i);
    }

    function visibleItems() {
      return items.filter(function (li) { return !li.hidden && !li.classList.contains('blank'); });
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
    function showPopup(title, info) {
      clearPopup();
      if (!info) return;
      info = info.replace(/\.\s*<\/span>/g, '</span>').replace(/(\.+\s*)$/, '');
      var bullets = info.split(';').map(function (s) { return s.trim(); }).filter(Boolean);
      popup = document.createElement('div');
      popup.className = 'sidebar-popup';
      popup.innerHTML = '<div class="popup-title"></div><ul class="safe-nl">' +
        bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
      popup.firstChild.textContent = title;
      document.body.appendChild(popup);
    }

    function openSidebar() {
      if (sidebarOpen()) return;
      sidebar.style.display = 'flex';
      SM.store.set('sidebarVisible', 'true');
      buildList();
      if (listBtn) listBtn.classList.add('active');
    }

    function closeSidebar() {
      sidebar.style.display = 'none';
      SM.store.set('sidebarVisible', 'false');
      clearPopup();
      if (listBtn) listBtn.classList.remove('active');
      setFullList(false);
    }

    function toggleSidebar() { if (sidebarOpen()) closeSidebar(); else openSidebar(); }

    if (listBtn) listBtn.addEventListener('click', toggleSidebar);
    var closeBtn = sidebar.querySelector('.sidebar-close');
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

    // Number of places (not headings) next to the list title
    var count = sidebar.querySelector('.sidebar-count');
    if (count) count.textContent = entries.filter(function (en) { return !en.empty; }).length;

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

    function moveTip(tip, x, y) {
      offsets.set(tip, { x: x, y: y });
      tip.style.translate = x + 'px ' + y + 'px'; // survives Leaflet repositioning
    }

    function nudge(tip, dx, dy) {
      var o = offsets.get(tip) || { x: 0, y: 0 };
      moveTip(tip, o.x + dx, o.y + dy);
    }

    // Drag a label to move it. A plain press no longer starts a text selection;
    // double-click still selects the label's text for copying.
    var tipPane = map.getPane('tooltipPane');
    var tipDrag = null;
    tipPane.addEventListener('mousedown', function (e) {
      if (e.detail === 1 && e.target.closest('.reveal-all-tooltip')) e.preventDefault();
    });
    tipPane.addEventListener('pointerdown', function (e) {
      var tip = e.target.closest('.reveal-all-tooltip');
      if (!tip || e.button !== 0) return;
      e.stopPropagation();
      state.activeTip = tip;
      var o = offsets.get(tip) || { x: 0, y: 0 };
      tipDrag = { tip: tip, x: e.clientX, y: e.clientY, ox: o.x, oy: o.y, moved: false, id: e.pointerId };
    });
    tipPane.addEventListener('pointermove', function (e) {
      if (!tipDrag) return;
      var mx = e.clientX - tipDrag.x, my = e.clientY - tipDrag.y;
      if (!tipDrag.moved) {
        if (Math.hypot(mx, my) < 4) return;
        tipDrag.moved = true;
        try { tipDrag.tip.setPointerCapture(tipDrag.id); } catch (err) { /* ignore */ }
        tipDrag.tip.classList.add('is-dragging');
        map.dragging.disable();
      }
      moveTip(tipDrag.tip, tipDrag.ox + mx, tipDrag.oy + my);
    });
    function endTipDrag() {
      if (!tipDrag) return;
      if (tipDrag.moved) map.dragging.enable();
      tipDrag.tip.classList.remove('is-dragging');
      tipDrag = null;
    }
    tipPane.addEventListener('pointerup', endTipDrag);
    tipPane.addEventListener('pointercancel', endTipDrag);

    // Double-click a label or card: select its text (ready for Ctrl/Cmd+C)
    map.getContainer().addEventListener('dblclick', function (e) {
      var el = e.target.closest('.reveal-all-tooltip, .sm-card');
      if (!el) return;
      e.preventDefault();
      var range = document.createRange();
      range.selectNodeContents(el.querySelector('.sm-card-title') || el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });

    /* ---------------------------------------------------------------------
       Cards mode (C), card lines (Shift+C), re-arrange
       --------------------------------------------------------------------- */

    var cardsBtn = document.querySelector('.cards-btn');
    var lineBtns = document.querySelectorAll('[data-line]');
    var rearrangeBtn = document.querySelector('.rearrange-btn');

    function syncCardUi() {
      document.body.classList.toggle('cards-mode', cardsOn);
      if (cardsBtn) cardsBtn.setAttribute('aria-pressed', cardsOn);
      lineBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-line') === cards.line()); });
    }

    // Leader lines and the card edge take the colour of this map's labels
    function cardAccent() {
      var tip = document.querySelector('.reveal-all-tooltip');
      var bg = tip ? getComputedStyle(tip).backgroundColor : '';
      if (!bg || /rgba\(.*,\s*0\)|transparent/.test(bg)) document.documentElement.style.removeProperty('--card-accent');
      else document.documentElement.style.setProperty('--card-accent', bg);
    }
    new MutationObserver(cardAccent).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    cardAccent();

    function setCards(on) {
      cardsOn = on;
      SM.store.set('cards', on ? '1' : '0');
      syncCardUi();
      features.forEach(function (f) { if (f && f.tip) render(f); });
    }

    if (cardsBtn) cardsBtn.addEventListener('click', function () { setCards(!cardsOn); });
    lineBtns.forEach(function (b) {
      b.addEventListener('click', function () { cards.setLine(b.getAttribute('data-line')); syncCardUi(); });
    });
    if (rearrangeBtn) rearrangeBtn.addEventListener('click', function () { cards.rearrange(); });
    document.addEventListener('sm:fontsize', function () { if (cardsOn) requestAnimationFrame(cards.refresh); });
    syncCardUi();

    /* ---------------------------------------------------------------------
       Shortcut help (?)
       --------------------------------------------------------------------- */

    var help = document.getElementById('help');
    function toggleHelp(force) {
      if (!help) return;
      help.hidden = typeof force === 'boolean' ? !force : !help.hidden;
    }
    if (help) help.addEventListener('click', function () { toggleHelp(false); });
    var helpBtn = document.querySelector('.help-btn');
    if (helpBtn) helpBtn.addEventListener('click', function () { toggleHelp(); });

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
      var focusOnField = !inSearch && e.target.closest && e.target.closest('input, select, textarea');

      // Sidebar navigation works whether or not the list has focus
      if ((key === 'ArrowDown' || key === 'ArrowUp') && sidebarOpen() && !focusOnField) {
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
        case 'c':
          if (e.shiftKey) { if (!cardsOn) setCards(true); cards.nextLine(); syncCardUi(); }
          else setCards(!cardsOn);
          return true;
        case 't':
        case 'i': toggleInfo(); return true;
        case '?': toggleHelp(); return true;
        case '/':
          if (e.shiftKey) { toggleHelp(); return true; } // some layouts report Shift+/ as "/"
          openSidebar(); if (search) search.focus(); return true;
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
          key: en.key, label: en.label, info: en.info,
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
        f = features[i] = { kind: 'point', key: en.key, label: en.label, info: en.info, clickable: [layer, under[i]] };
      } else if (g.type === 'LineString') {
        layer = L.polyline(g.coordinates, LINE_STYLE);
        f = features[i] = { kind: 'line', key: en.key, label: en.label, info: en.info, clickable: [layer, under[i]] };
      }
      if (!layer) return;

      layer.bindTooltip(en.key, LABEL).addTo(map);
      f.layer = layer;
      f.tip = layer.getTooltip().getElement();
      f.tip.style.display = 'none';
      if (!f.paths) f.paths = function () { return [layer.getElement()]; };
      // Where a card's leader starts: the point, a river's midpoint, or an area's centre
      f.anchor = function () { return f._anchor || (f._anchor = layer.getLatLng ? layer.getLatLng() : layer.getCenter()); };
    });

    return features;
  }
})();

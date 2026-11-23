/* =========================================================================
   SM-Map — Quiz mode (Map_Game_dark.html)

   A name appears at the top; click the matching feature on the map.
   Space / Enter / the big bar at the bottom: skip, or go to the next round.
   ========================================================================= */
(function () {
  'use strict';

  var SM = window.SM;

  var BASE = '#EDC1A0', HOVER = '#D2D2D2';
  var POINT_STYLE = { radius: 4, color: BASE, weight: 2, fillColor: '#FF9B50', fillOpacity: 1, className: 'point_leaflet' };
  var LINE_STYLE  = { color: BASE, weight: 3, opacity: 1 };

  SM.ready.then(init, SM.showError);

  function init() {
    var map = SM.createMap();
    SM.initChrome('Map_Game_2_dark.html');

    var $ = function (id) { return document.getElementById(id); };
    var header = $('header'), result = $('result'), done = $('result2');
    var advanceBtn = $('Advance'), autoNext = $('auto_next'), noRepeat = $('noRepeat');
    var slider = $('timeoutSlider'), sliderValue = $('timeoutValue');
    var scoreOk = document.querySelector('.correct-ans'), scoreAll = document.querySelector('.items-shown');

    var delay = +slider.value;
    slider.addEventListener('input', function () { delay = +slider.value; sliderValue.textContent = delay; });

    /* ---- Draw: one entry may have several parts (islands, rings) -------- */

    var byKey = {};      // key -> { parts: [layers], main: layer }
    SM.readEntries().forEach(function (en) {
      if (!en.geom) return;
      var geoms = Array.isArray(en.geom) ? en.geom : [en.geom];
      var parts = geoms.map(function (g) {
        var layer = g.type === 'Point'
          ? L.circleMarker(g.coordinates, POINT_STYLE)
          : L.polyline(g.coordinates, L.extend({ className: g.isPolygonBoundary ? 'polygon_leaflet' : 'line_leaflet' }, LINE_STYLE));
        layer.addTo(map);
        layer.on('mouseover', function () { layer.setStyle({ color: HOVER }); });
        layer.on('mouseout', function () { layer.setStyle({ color: BASE }); });
        layer.on('click', function () { answer(en.key, layer); });
        return layer;
      });
      if (!parts.length) return;
      // Show "the answer" on the biggest part (mainland rather than an island)
      var main = parts.reduce(function (a, b) {
        return (b.getLatLngs ? b.getLatLngs().length : 0) > (a.getLatLngs ? a.getLatLngs().length : 0) ? b : a;
      });
      byKey[en.key] = { parts: parts, main: main };
    });

    var pool = Object.keys(byKey);   // only things that can actually be clicked
    var shown = new Set();
    var round = null;                // { key, answered, timer, tips: [] }

    /* ---- Rounds ----------------------------------------------------------- */

    function pick() {
      var left = pool.filter(function (k) { return !shown.has(k); });
      if (!left.length) {
        if (noRepeat.checked) return null;
        left = pool;
      }
      var key = left[Math.floor(Math.random() * left.length)];
      if (noRepeat.checked) shown.add(key);
      return key;
    }

    function startRound() {
      clearRound();
      var key = pick();
      if (key === null) { finished(); return; }
      round = { key: key, answered: false, correct: false, timer: 0, tips: [] };
      header.textContent = SM.plainText(key.split(/<br\s*\/?>/i)[0]);
    }

    function clearRound() {
      if (!round) return;
      clearTimeout(round.timer);
      round.tips.forEach(function (l) { l.closeTooltip(); });
      result.style.display = 'none';
    }

    function showName(layer, key, cls) {
      layer.bindTooltip(key, { permanent: true, className: cls }).openTooltip();
      round.tips.push(layer);
    }

    function answer(key, layer) {
      if (!round) return;
      showName(layer, key, 'selected-tooltip');
      if (round.answered) return;                // later clicks just show names

      round.answered = true;
      round.correct = key === round.key;
      result.textContent = round.correct ? '✔ Correct' : '✘ Incorrect';
      result.style.backgroundColor = round.correct ? '#029193' : '#894545';
      result.style.display = 'block';
      if (!round.correct) showName(byKey[round.key].main, round.key, 'correct-tooltip');

      if (autoNext.checked) round.timer = setTimeout(next, delay);
    }

    function next() {
      if (!round) return;
      scoreAll.textContent = +scoreAll.textContent + 1;
      if (round.correct) scoreOk.textContent = +scoreOk.textContent + 1;
      startRound();
    }

    // Skip: reveal the answer briefly, then move on
    function advance() {
      if (!round) return;
      if (round.answered) { next(); return; }
      if (round.skipping) return;
      round.skipping = true;
      showName(byKey[round.key].main, round.key, 'correct-tooltip');
      round.timer = setTimeout(next, delay);
    }

    function finished() {
      round = null;
      header.textContent = '—';
      done.innerHTML = 'Iteration Completed.<br>';
      var restart = button('Restart', function () {
        shown.clear();
        done.style.display = 'none';
        startRound();
      });
      var home = button('Home', function () { location.href = '../index.html'; });
      done.append(restart, document.createElement('br'), home);
      done.style.display = 'block';
    }

    function button(text, onClick) {
      var b = document.createElement('button');
      b.textContent = text;
      b.style.cssText = 'margin-top:10px;padding:5px 10px;cursor:pointer';
      b.addEventListener('click', onClick);
      return b;
    }

    advanceBtn.addEventListener('click', advance);
    SM.onKey(function (e, key) {
      if (e.ctrlKey || e.metaKey || e.altKey || SM.isTyping(e)) return false;
      if (key === ' ' || key === 'Enter') {
        if (e.target.closest && e.target.closest('button, a, input')) return false;
        advance();
        return true;
      }
      return false;
    });

    startRound();
  }
})();

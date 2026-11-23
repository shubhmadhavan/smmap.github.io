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
    SM.initChrome();

    var $ = function (id) { return document.getElementById(id); };
    var header = $('header'), result = $('result'), done = $('result2');
    var advanceBtn = $('Advance'), autoNext = $('auto_next'), noRepeat = $('noRepeat');
    var slider = $('timeoutSlider'), sliderValue = $('timeoutValue');
    var scoreOk = document.querySelector('.correct-ans'), scoreAll = document.querySelector('.items-shown');

    var advanceText = advanceBtn.querySelector('.advance-text');
    var leftCount = document.querySelector('.left-count');

    var delay = +slider.value;
    slider.addEventListener('input', function () {
      delay = +slider.value;
      sliderValue.textContent = (delay / 1000).toFixed(1) + ' s';
    });

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
      advanceText.textContent = 'Skip';
      if (leftCount) {
        var left = noRepeat.checked ? pool.length - shown.size : null;
        leftCount.textContent = left === null ? '' : left + ' left';
      }
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
      result.textContent = round.correct ? 'Correct' : 'Not quite: it’s highlighted on the map';
      result.className = round.correct ? 'is-correct' : 'is-wrong';
      result.style.display = 'block';
      advanceText.textContent = 'Next';
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
      advanceText.textContent = 'Next';
      showName(byKey[round.key].main, round.key, 'correct-tooltip');
      round.timer = setTimeout(next, delay);
    }

    function finished() {
      round = null;
      header.textContent = '…';
      if (leftCount) leftCount.textContent = '';
      done.innerHTML = '<h2>That’s every place</h2><p></p>';
      done.querySelector('p').textContent = scoreOk.textContent + ' of ' + scoreAll.textContent + ' correct';
      done.append(
        button('Start again', 'pill pill-accent', function () {
          shown.clear();
          scoreOk.textContent = '0';
          scoreAll.textContent = '0';
          done.style.display = 'none';
          startRound();
        }),
        button('All maps', 'pill', function () { location.href = '../index.html'; })
      );
      done.style.display = 'block';
    }

    function button(text, cls, onClick) {
      var b = document.createElement('button');
      b.className = cls;
      b.textContent = text;
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

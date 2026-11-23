/* =========================================================================
   SM-Map hub pages (index-1 … index-5)
   - Zipper cards: click (or drag the handle) to unzip, then open the map
   - Keyboard: type a number to open that card, or type letters to find a
     card by name (Enter opens it, Esc / Backspace edits the search)
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.zipper-block'));
  var resets = [];

  /* ---- Zipper cards ----------------------------------------------------- */

  blocks.forEach(function (block) {
    var zipper = block.querySelector('.zipper');
    var handle = zipper.querySelector('.zipper-handle');
    var progress = 0;   // 0 = closed, 1 = fully unzipped
    var busy = false;   // unzip-and-navigate has started
    var drag = null;

    function setProgress(p) {
      progress = Math.min(1, Math.max(0, p));
      zipper.style.setProperty('--p', progress.toFixed(3));
    }

    function finish() {
      zipper.classList.add('unzipped');
      location.href = block.href;
    }

    function open() {
      if (busy) return;
      busy = true;
      if (reduceMotion.matches || progress >= 1) { setProgress(1); finish(); return; }

      var from = progress, duration = (1 - from) * 650, start = performance.now();
      requestAnimationFrame(function frame(now) {
        var t = Math.min(1, (now - start) / duration);
        setProgress(from + (1 - from) * t);
        if (t < 1) requestAnimationFrame(frame); else finish();
      });
    }
    block._open = open;

    // Drag the handle (mouse, touch or pen)
    if (handle) {
      handle.addEventListener('pointerdown', function (e) {
        if (busy || e.button !== 0) return;
        e.preventDefault();
        handle.setPointerCapture(e.pointerId);
        drag = { y: e.clientY, p: progress };
      });
      handle.addEventListener('pointermove', function (e) {
        if (!drag) return;
        // account for the hover scale so the handle tracks the pointer
        var scale = zipper.getBoundingClientRect().height / zipper.offsetHeight || 1;
        var travel = zipper.clientHeight - handle.offsetHeight;
        setProgress(drag.p + (e.clientY - drag.y) / (scale * travel));
        if (progress >= 1) { drag = null; open(); }
      });
      var endDrag = function () { drag = null; };
      handle.addEventListener('pointerup', endDrag);
      handle.addEventListener('pointercancel', endDrag);
    }

    // Click the card: unzip, then navigate. Modified clicks (new tab etc.)
    // and the text label go straight to the link.
    block.addEventListener('click', function (e) {
      var modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      if (e.defaultPrevented || e.button !== 0 || modified) return;
      if (e.target.closest('.zipper-label')) return;
      e.preventDefault();
      open();
    });

    resets.push(function () {
      busy = false;
      drag = null;
      zipper.classList.remove('unzipped');
      setProgress(0);
    });
  });

  // Back/forward cache: don't show a card stuck in the unzipped state
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) resets.forEach(function (reset) { reset(); });
  });

  /* ---- Keyboard --------------------------------------------------------- */

  var digits = '', digitTimer = 0;
  var query = '', queryTimer = 0;
  var match = null;

  function openBlock(block) {
    var zipper = block.querySelector('.zipper');
    zipper.classList.add('hovered');
    setTimeout(function () { block._open(); }, 310);
    setTimeout(function () { zipper.classList.remove('hovered'); }, 800);
  }

  function clearMatch() {
    if (match) match.querySelector('.zipper').classList.remove('zipper-highlight');
    match = null;
  }

  function findMatch() {
    clearMatch();
    if (!query) return;
    for (var i = 0; i < blocks.length; i++) {
      var label = blocks[i].querySelector('.zipper-label');
      if (label && label.textContent.toLowerCase().indexOf(query) !== -1) {
        match = blocks[i];
        match.querySelector('.zipper').classList.add('zipper-highlight');
        match.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  }

  function resetQuery() { query = ''; clearTimeout(queryTimer); clearMatch(); }

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // 1-9 (or two digits typed quickly): open that card
    if (/^\d$/.test(e.key)) {
      digits += e.key;
      clearTimeout(digitTimer);
      digitTimer = setTimeout(function () {
        var block = blocks[parseInt(digits, 10) - 1];
        digits = '';
        if (block) openBlock(block);
      }, 240);
      return;
    }

    if (e.key === 'Escape') { resetQuery(); return; }
    if (e.key === 'Enter' && match) { e.preventDefault(); location.href = match.href; return; }
    if (e.key === 'Backspace') {
      if (!query) return;
      e.preventDefault();
      query = query.slice(0, -1);
      findMatch();
      return;
    }

    if (e.key.length === 1 && (query || e.key !== ' ')) {
      if (e.key === ' ') e.preventDefault(); // don't scroll while typing a name
      query += e.key.toLowerCase();
      clearTimeout(queryTimer);
      queryTimer = setTimeout(resetQuery, 1500);
      findMatch();
    }
  });
})();

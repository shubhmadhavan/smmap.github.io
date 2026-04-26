let keyBuffer = '';
let textBuffer = '';
let timer = null;
let textTimer = null;
let currentMatch = null;

document.addEventListener('keydown', function(e) {

  /* =========================
     🔢 NUMBER SHORTCUT LOGIC
  ========================= */
  if (/^\d$/.test(e.key)) {
    keyBuffer += e.key;
    clearTimeout(timer);

    timer = setTimeout(() => {
      const index = parseInt(keyBuffer, 10);
      const folders = document.querySelectorAll('.zipper');

      if (index >= 1 && index <= folders.length) {
        const target = folders[index - 1];

        target.classList.add('hovered');

        setTimeout(() => {
          target.click();
        }, 310);

        setTimeout(() => {
          target.classList.remove('hovered');
        }, 800);
      }

      keyBuffer = '';
    }, 240);

    return;
  }


  /* =========================
     🔤 TEXT SEARCH LOGIC
  ========================= */

  // ESC → reset search immediately
  // ESC → full reset
if (e.key === "Escape" || e.key === "Backspace") {
  textBuffer = '';
  clearTimeout(textTimer);
  clearHighlight();
  return;
}



  // Handle typing
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    textBuffer += e.key.toLowerCase();

    clearTimeout(textTimer);
    textTimer = setTimeout(() => {
      textBuffer = '';
      clearHighlight();
    }, 1500);

    findMatch();
  }

  // Backspace
  if (e.key === "Backspace") {
    textBuffer = textBuffer.slice(0, -1);
    findMatch();
  }

  // Enter → redirect
  if (e.key === "Enter" && currentMatch) {
    const zipper = currentMatch.querySelector(".zipper");
    const link = zipper.getAttribute("data-href");

    window.location.href = link;
  }
});

function findMatch() {
  clearHighlight();

  if (!textBuffer) return;

  const blocks = document.querySelectorAll(".zipper-block");

  for (let block of blocks) {
    const label = block.querySelector(".zipper-label");
    const zipper = block.querySelector(".zipper"); 

    if (!label || !zipper) continue;

    const text = label.textContent.toLowerCase();

    if (text.includes(textBuffer)) {
      currentMatch = block;

      //       label.classList.add("zipper-highlight");
      zipper.classList.add("zipper-highlight"); 

      block.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      break;
    }
  }
}

function clearHighlight() {
  currentMatch = null;
  document.querySelectorAll(".zipper").forEach(el => {
    el.classList.remove("zipper-highlight");
  });
}
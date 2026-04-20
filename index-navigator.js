
let keyBuffer = '';
let timer = null;

document.addEventListener('keydown', function(e) {
  if (!/^\d$/.test(e.key)) return;

  keyBuffer += e.key;
  clearTimeout(timer);

  timer = setTimeout(() => {
    const index = parseInt(keyBuffer, 10);
    const folders = document.querySelectorAll('.zipper');

    if (index >= 1 && index <= folders.length) {
      const target = folders[index - 1];

      // trigger hover effect
      target.classList.add('hovered');

      // delay so animation is visible
      setTimeout(() => {
        target.click();
      }, 310);

      // cleanup (in case navigation is slow)
      setTimeout(() => {
        target.classList.remove('hovered');
      }, 800);
    }

    keyBuffer = '';
  }, 240);
});
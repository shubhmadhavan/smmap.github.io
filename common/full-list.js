document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".full-list");
  if (!button) return;

  // Inject CSS once
  const style = document.createElement("style");
  style.id = "full-list-style";
  style.textContent = `
    body.full-list-active #sidebar {
      position: fixed !important;
      min-width: 100vw !important;
      width: 100vw !important;
      max-width: 100vw !important;
      margin-left: unset !important;
      zoom: unset !important;
      outline: solid 1px #6c6c6c !important;
    }

    body.full-list-active .sidebar ul {
      padding-left: 12px !important;
    }

    body.full-list-active .sidebar-popup {
      width: 98vw !important;
      max-width: 98vw !important;
      left: unset !important;
    }

    body.full-list-active #map,
    body.full-list-active .custom-control {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  function activate() {
    document.body.classList.add("full-list-active");
    button.classList.add("active");
  }

  function deactivate() {
    document.body.classList.remove("full-list-active");
    button.classList.remove("active");
  }

  function toggle() {
    if (document.body.classList.contains("full-list-active")) {
      deactivate();
    } else {
      activate();
    }
  }

  // Button click
  button.addEventListener("click", toggle);

  // Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      deactivate();
    }
  });

});
(() => {
  const toggle = document.getElementById("nav-toggle");
  const btn = document.querySelector(".nav-toggle-btn");
  const nav = document.querySelector(".nav");
  if (!toggle || !btn || !nav) return;

  nav.id = "site-nav";
  btn.setAttribute("aria-controls", "site-nav");

  const sync = () => {
    btn.setAttribute("aria-expanded", toggle.checked ? "true" : "false");
  };

  toggle.addEventListener("change", sync);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.checked) {
      toggle.checked = false;
      sync();
      btn.focus();
    }
  });
  sync();
})();

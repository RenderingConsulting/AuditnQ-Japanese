(() => {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const slides = [...root.querySelectorAll(".carousel__slide")];
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const toggle = root.querySelector("[data-carousel-toggle]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");
  const intervalMs = Number(root.dataset.interval || 5000);
  const live = root.querySelector("[data-carousel-live]") || root;

  let index = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  let playing = true;
  let timer = null;

  // Naming attrs are prohibited on generic divs — ensure landmark roles.
  root.setAttribute("role", "region");
  if (!root.getAttribute("aria-label")) {
    root.setAttribute("aria-label", "製品画面のスライドショー");
  }
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("tabindex", "0");

  if (dotsWrap) {
    dotsWrap.setAttribute("role", "group");
    if (!dotsWrap.getAttribute("aria-label")) {
      dotsWrap.setAttribute("aria-label", "スライド選択");
    }
  }

  live.setAttribute("aria-live", "polite");
  live.removeAttribute("aria-label");
  let status = live.querySelector("[data-carousel-status]");
  if (!status) {
    status = document.createElement("span");
    status.className = "visually-hidden";
    status.setAttribute("data-carousel-status", "");
    live.prepend(status);
  }

  const renderDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "carousel__dot" + (i === index ? " is-active" : "");
      btn.setAttribute("aria-label", `スライド ${i + 1}`);
      if (i === index) btn.setAttribute("aria-current", "true");
      btn.addEventListener("click", () => go(i));
      dotsWrap.appendChild(btn);
    });
  };

  const go = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => {
      const active = n === index;
      slide.classList.toggle("is-active", active);
      if (active) slide.removeAttribute("aria-hidden");
      else slide.setAttribute("aria-hidden", "true");
    });
    renderDots();
    status.textContent = `スライド ${index + 1} / ${slides.length}`;
  };

  const stop = () => {
    playing = false;
    if (timer) clearInterval(timer);
    timer = null;
    if (toggle) {
      toggle.textContent = "▶";
      toggle.setAttribute("aria-label", "自動再生を開始");
      toggle.setAttribute("aria-pressed", "true");
    }
  };

  const start = () => {
    playing = true;
    if (timer) clearInterval(timer);
    timer = setInterval(() => go(index + 1), intervalMs);
    if (toggle) {
      toggle.textContent = "❚❚";
      toggle.setAttribute("aria-label", "自動再生を停止");
      toggle.setAttribute("aria-pressed", "false");
    }
  };

  prev?.addEventListener("click", () => {
    go(index - 1);
    if (playing) start();
  });
  next?.addEventListener("click", () => {
    go(index + 1);
    if (playing) start();
  });
  toggle?.addEventListener("click", () => (playing ? stop() : start()));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
      if (playing) start();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
      if (playing) start();
    }
  });

  root.addEventListener("mouseenter", () => {
    if (timer) clearInterval(timer);
  });
  root.addEventListener("mouseleave", () => {
    if (playing) start();
  });

  go(index);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    stop();
  } else {
    start();
  }
  reduceMotion.addEventListener("change", (e) => {
    if (e.matches) stop();
    else start();
  });
})();

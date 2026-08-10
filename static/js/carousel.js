(() => {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const slides = [...root.querySelectorAll(".carousel__slide")];
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const toggle = root.querySelector("[data-carousel-toggle]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");
  const intervalMs = Number(root.dataset.interval || 5000);

  let index = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  let playing = true;
  let timer = null;

  const renderDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "carousel__dot" + (i === index ? " is-active" : "");
      btn.setAttribute("aria-label", `スライド ${i + 1}`);
      btn.addEventListener("click", () => go(i));
      dotsWrap.appendChild(btn);
    });
  };

  const go = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle("is-active", n === index));
    renderDots();
  };

  const stop = () => {
    playing = false;
    if (timer) clearInterval(timer);
    timer = null;
    if (toggle) {
      toggle.textContent = "▶";
      toggle.setAttribute("aria-label", "自動再生を開始");
    }
  };

  const start = () => {
    playing = true;
    if (timer) clearInterval(timer);
    timer = setInterval(() => go(index + 1), intervalMs);
    if (toggle) {
      toggle.textContent = "❚❚";
      toggle.setAttribute("aria-label", "自動再生を停止");
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

  root.addEventListener("mouseenter", () => {
    if (timer) clearInterval(timer);
  });
  root.addEventListener("mouseleave", () => {
    if (playing) start();
  });

  go(index);
  start();
})();

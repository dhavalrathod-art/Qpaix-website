/* Home page – Version 2: hero slider, services switcher, testimonial slider */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Hero slider with progress bars ----------
  const hero = document.querySelector('[data-hero-slider]');
  if (hero) {
    const slides = [...hero.querySelectorAll('.hs-slide')];
    const tabs = [...hero.querySelectorAll('.hs-tab')];
    const counter = hero.querySelector('[data-hs-current]');
    let index = 0;

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => {
        s.classList.toggle('is-active', n === index);
        s.setAttribute('aria-hidden', String(n !== index));
      });
      tabs.forEach((t, n) => {
        t.classList.remove('is-active');
        t.classList.toggle('is-done', n < index);
        t.setAttribute('aria-selected', String(n === index));
      });
      // restart the CSS progress animation on the active tab
      void tabs[index].offsetWidth;
      tabs[index].classList.add('is-active');
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    };

    // When the active bar finishes filling, move to the next slide
    tabs.forEach((t, n) => {
      t.querySelector('.hs-fill').addEventListener('animationend', () => { if (n === index) go(index + 1); });
      t.addEventListener('click', () => go(n));
    });
    hero.querySelector('[data-hs-prev]')?.addEventListener('click', () => go(index - 1));
    hero.querySelector('[data-hs-next]')?.addEventListener('click', () => go(index + 1));

    // Pause while the mouse is over the slide content or the tab is hidden
    const content = hero.querySelector('[data-hs-pause]') || hero;
    content.addEventListener('mouseenter', () => hero.classList.add('hs-paused'));
    content.addEventListener('mouseleave', () => hero.classList.remove('hs-paused'));
    document.addEventListener('visibilitychange', () => hero.classList.toggle('hs-paused', document.hidden));
    hero.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    });
    if (reduceMotion) hero.classList.add('hs-paused');

    // Swipe on touch devices
    let startX = null;
    hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    go(0);
  }

  // ---------- Services switcher (hover/click a row, image panel changes) ----------
  const svc = document.querySelector('[data-svc]');
  if (svc) {
    const rows = [...svc.querySelectorAll('.svc-row')];
    const panels = [...svc.querySelectorAll('.svc-panel')];
    const set = (i) => {
      rows.forEach((r, n) => { r.classList.toggle('is-active', n === i); r.setAttribute('aria-selected', String(n === i)); });
      panels.forEach((p, n) => p.classList.toggle('is-active', n === i));
    };
    rows.forEach((r, n) => {
      r.addEventListener('mouseenter', () => set(n));
      r.addEventListener('focus', () => set(n));
      r.addEventListener('click', () => set(n));
    });
    set(0);
  }

  // ---------- Testimonial slider ----------
  const ts = document.querySelector('[data-ts]');
  if (ts) {
    const items = [...ts.querySelectorAll('.ts-item')];
    const dots = [...ts.querySelectorAll('.ts-dot')];
    let i = 0;
    let timer;
    const show = (n) => {
      i = (n + items.length) % items.length;
      items.forEach((it, k) => { it.classList.toggle('is-active', k === i); it.setAttribute('aria-hidden', String(k !== i)); });
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    };
    const auto = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => show(i + 1), 7000); };
    ts.querySelector('[data-ts-prev]')?.addEventListener('click', () => { show(i - 1); auto(); });
    ts.querySelector('[data-ts-next]')?.addEventListener('click', () => { show(i + 1); auto(); });
    dots.forEach((d, k) => d.addEventListener('click', () => { show(k); auto(); }));
    ts.addEventListener('mouseenter', () => clearInterval(timer));
    ts.addEventListener('mouseleave', auto);
    show(0);
    auto();
  }
});

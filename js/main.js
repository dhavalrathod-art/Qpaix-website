/* Qpaix shared scripts (header/footer logic lives in components.js). */
document.documentElement.classList.add('js-reveal');

document.addEventListener('DOMContentLoaded', () => {
  // Click-to-copy (style guide colour swatches)
  document.querySelectorAll('[data-copy]').forEach((el) => {
    el.addEventListener('click', async () => {
      const value = el.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        const tip = el.querySelector('[data-copy-tip]');
        if (tip) {
          const old = tip.textContent;
          tip.textContent = 'Copied!';
          setTimeout(() => (tip.textContent = old), 1200);
        }
      } catch (e) { /* clipboard not available */ }
    });
  });

  // Reveal-on-scroll: add data-reveal to any element
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Tabs: <div data-tabs> with [data-tab-btn="id"] buttons and [data-tab-panel="id"] panels
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const btns = group.querySelectorAll('[data-tab-btn]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    const show = (id) => {
      btns.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tabBtn === id)));
      panels.forEach((p) => { p.hidden = p.dataset.tabPanel !== id; });
    };
    btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.tabBtn)));
    if (btns[0]) show(btns[0].dataset.tabBtn);
  });

  // Animated counters: <span data-count="50">0</span>
  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }
});

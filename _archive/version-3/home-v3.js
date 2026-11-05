/* Home page – Version 3: typing headline, quote form, timeline, drag carousel, industries preview */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Typing word in the hero ----------
  const typed = document.querySelector('[data-typed]');
  if (typed) {
    const words = JSON.parse(typed.dataset.typed);
    if (reduceMotion) {
      typed.textContent = words[0];
    } else {
      let w = 0, c = words[0].length, deleting = true;
      typed.textContent = words[0];
      const tick = () => {
        const word = words[w];
        if (deleting) {
          c--;
          if (c <= 0) { deleting = false; w = (w + 1) % words.length; }
        } else {
          c++;
          if (c >= words[w].length) { deleting = true; typed.textContent = words[w]; return setTimeout(tick, 1800); }
        }
        typed.textContent = (deleting ? word : words[w]).slice(0, Math.max(c, 0));
        setTimeout(tick, deleting ? 45 : 85);
      };
      setTimeout(tick, 2200);
    }
  }

  // ---------- Quote form (front-end only for now) ----------
  const form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      // TODO: send to backend / CRM when it is ready
      form.hidden = true;
      document.querySelector('[data-quote-done]').hidden = false;
    });
  }

  // ---------- Timeline fills as you scroll ----------
  const tl = document.querySelector('[data-timeline]');
  if (tl) {
    const steps = [...tl.querySelectorAll('.tl-step')];
    const update = () => {
      const r = tl.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      tl.style.setProperty('--tl', p.toFixed(3));
      steps.forEach((s) => {
        const dot = s.querySelector('.tl-dot').getBoundingClientRect();
        s.classList.toggle('is-reached', dot.top + dot.height / 2 < mid);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---------- Drag / button carousel ----------
  const track = document.querySelector('[data-drag]');
  if (track) {
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + 24;
    document.querySelector('[data-drag-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    document.querySelector('[data-drag-next]')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    let down = false, startX = 0, startScroll = 0, moved = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
      track.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      setTimeout(() => track.classList.remove('is-dragging'), 0);
    });
    track.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
    // progress bar under the carousel
    const bar = document.querySelector('[data-drag-bar]');
    const syncBar = () => {
      if (!bar) return;
      const max = track.scrollWidth - track.clientWidth;
      const ratio = track.clientWidth / track.scrollWidth;
      bar.style.width = `${Math.max(ratio * 100, 12)}%`;
      bar.style.marginLeft = `${max > 0 ? (track.scrollLeft / max) * (100 - Math.max(ratio * 100, 12)) : 0}%`;
    };
    track.addEventListener('scroll', syncBar, { passive: true });
    window.addEventListener('resize', syncBar);
    syncBar();
  }

  // ---------- Industries: image follows the cursor ----------
  const list = document.querySelector('[data-ind]');
  const preview = document.querySelector('.ind-preview');
  if (list && preview && window.matchMedia('(hover: hover)').matches) {
    const imgs = [...preview.querySelectorAll('img')];
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const follow = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      preview.style.left = `${cx}px`; preview.style.top = `${cy}px`;
      raf = requestAnimationFrame(follow);
    };
    list.querySelectorAll('.ind-row').forEach((row, i) => {
      row.addEventListener('mouseenter', () => imgs.forEach((im, k) => im.classList.toggle('is-active', k === i)));
    });
    list.addEventListener('mouseenter', (e) => {
      x = cx = e.clientX + 160; y = cy = e.clientY;
      preview.classList.add('is-on');
      cancelAnimationFrame(raf); follow();
    });
    list.addEventListener('mousemove', (e) => { x = e.clientX + 160; y = e.clientY; });
    list.addEventListener('mouseleave', () => { preview.classList.remove('is-on'); cancelAnimationFrame(raf); });
  }
});

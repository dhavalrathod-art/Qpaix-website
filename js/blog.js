/* Blog list (filter + search) and blog details (TOC, reading bar, share). */
document.addEventListener('DOMContentLoaded', () => {
  // ---------- LIST: category chips + search ----------
  const grid = document.querySelector('[data-blog-grid]');
  if (grid) {
    const cards = [...grid.querySelectorAll('.blog-card')];
    const chips = document.querySelectorAll('[data-blog-cat]');
    const search = document.querySelector('[data-blog-search]');
    const empty = document.querySelector('[data-blog-empty]');
    let cat = 'All';
    const apply = () => {
      const q = (search?.value || '').trim().toLowerCase();
      let shown = 0;
      cards.forEach((c) => {
        const ok = (cat === 'All' || c.dataset.category === cat) && (!q || c.dataset.title.includes(q));
        c.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      empty?.classList.toggle('hidden', shown > 0);
    };
    chips.forEach((b) => b.addEventListener('click', () => {
      cat = b.dataset.blogCat;
      chips.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      apply();
    }));
    search?.addEventListener('input', () => {
      apply();
      if (search.value && window.scrollY < 200) document.querySelector('[data-blog]')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ---------- DETAILS: table of contents from the article's H2s ----------
  const article = document.querySelector('[data-article]');
  const toc = document.querySelector('[data-toc]');
  if (article && toc) {
    const heads = [...article.querySelectorAll('h2')];
    heads.forEach((h, i) => {
      if (!h.id) h.id = 'section-' + (i + 1) + '-' + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${h.id}">${h.textContent}</a>`;
      toc.appendChild(li);
    });
    const links = [...toc.querySelectorAll('a')];
    const setActive = () => {
      let current = heads[0];
      heads.forEach((h) => { if (h.getBoundingClientRect().top < 140) current = h; });
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current?.id));
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // ---------- DETAILS: reading progress bar ----------
  const bar = document.querySelector('[data-read-progress]');
  const ring = document.querySelector('[data-read-ring]');
  const ringText = document.querySelector('[data-read-percent]');
  if (bar && article) {
    const update = () => {
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(Math.max(-r.top / (total > 0 ? total : 1), 0), 1);
      bar.style.transform = `scaleX(${p})`;
      if (ring) ring.style.setProperty('--p', Math.round(p * 100));
      if (ringText) ringText.textContent = Math.round(p * 100) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---------- DETAILS: share buttons ----------
  // (works for every share block: vertical rail on desktop + row on mobile)
  const shares = document.querySelectorAll('[data-share]');
  if (shares.length) {
    const url = encodeURIComponent(location.href);
    const title = encodeURIComponent(document.title.replace(/ \| Qpaix Blog$/, ''));
    const targets = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      x: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    const copied = document.querySelector('[data-copied]');
    shares.forEach((share) => {
      share.querySelectorAll('[data-share-to]').forEach((a) => { a.href = targets[a.dataset.shareTo]; });
      share.querySelector('[data-copy-link]')?.addEventListener('click', async (e) => {
        try { await navigator.clipboard.writeText(location.href); } catch (err) { /* ignore */ }
        const btn = e.currentTarget;
        btn.classList.add('is-copied');
        btn.setAttribute('aria-label', 'Link copied');
        if (copied) copied.hidden = false;
        setTimeout(() => { btn.classList.remove('is-copied'); btn.setAttribute('aria-label', 'Copy link'); if (copied) copied.hidden = true; }, 1800);
      });
    });
  }

  // ---------- DETAILS: "Was this helpful?" (front-end only for now) ----------
  const helpful = document.querySelector('[data-helpful]');
  if (helpful) {
    helpful.querySelectorAll('[data-helpful-btn]').forEach((b) => b.addEventListener('click', () => {
      helpful.querySelectorAll('[data-helpful-btn]').forEach((x) => x.classList.toggle('is-picked', x === b));
      helpful.querySelector('[data-helpful-thanks]').hidden = false;
      // TODO: send the vote to the backend
    }));
  }

  // ---------- DETAILS: sidebar newsletter (front-end only for now) ----------
  const news = document.querySelector('[data-side-news]');
  news?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!news.checkValidity()) { news.reportValidity(); return; }
    news.reset();
    const t = document.querySelector('[data-side-news-thanks]');
    if (t) t.hidden = false;
  });
});

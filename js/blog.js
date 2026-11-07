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
  if (bar && article) {
    const update = () => {
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(Math.max(-r.top / (total > 0 ? total : 1), 0), 1);
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---------- DETAILS: share buttons ----------
  const share = document.querySelector('[data-share]');
  if (share) {
    const url = encodeURIComponent(location.href);
    const title = encodeURIComponent(document.title.replace(/ \| Qpaix Blog$/, ''));
    const targets = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      x: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    share.querySelectorAll('[data-share-to]').forEach((a) => { a.href = targets[a.dataset.shareTo]; });
    const copyBtn = share.querySelector('[data-copy-link]');
    const copied = document.querySelector('[data-copied]');
    copyBtn?.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); } catch (e) { /* ignore */ }
      if (copied) { copied.hidden = false; setTimeout(() => (copied.hidden = true), 1800); }
    });
  }
});

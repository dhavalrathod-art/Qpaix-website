/* Qpaix shared layout: header, footer, CTA band and WhatsApp button.
   Every page includes:
     <div id="site-header"></div>  ... page content ...  <div id="site-footer"></div>
     <script src="js/components.js"></script>   (use ../js/components.js inside sub-folders)
   Optional on <body>:
     data-page="home|about|services|industries|portfolio|blog|careers|contact"  -> highlights menu item
     data-no-cta                                                                 -> hides the footer CTA band
   When the backend is built, this markup moves into the server templates. */
(function () {
  // ---------- 1. Company details: edit here once, used everywhere ----------
  const SITE = {
    name: 'Qpaix Infitech Private Limited',
    email: 'info@qpaix.com',
    phone: '+91 79 4605 9032',
    whatsapp: '917946059032',         // TODO: confirm WhatsApp is active on this number
    address: '14th Floor, D&amp;C Dynasty, Near Stadium Circle, C.G. Road, Swastik Society, Navrangpura, Ahmedabad, Gujarat 380009',
    hours: 'Mon – Sat, 10:00 AM – 7:00 PM', // TODO: confirm office hours
    social: {
      // Order here = order of icons in the footer. Empty string = icon hidden.
      linkedin: 'https://www.linkedin.com/company/qpaix-infitech-private-limited/',
      instagram: '#', // TODO: Instagram profile URL
      facebook: '#',  // TODO: Facebook page URL
      youtube: '#',   // TODO: YouTube channel URL
      x: '',
    },
  };

  // Root of the site, worked out from this script's own URL, so links work from any folder.
  const ROOT = (document.currentScript && document.currentScript.src || '').replace(/js\/components\.js.*$/, '');
  const url = (p) => ROOT + p;

  // ---------- 2. Icons (Lucide-style, inline SVG) ----------
  const svg = (paths, cls = 'w-5 h-5') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICON = {
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    ai: '<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
    iot: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    drone: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
  };
  // Brand icons (filled)
  const BRAND = {
    linkedin: '<path fill="currentColor" stroke="none" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    x: '<path fill="currentColor" stroke="none" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/>',
    youtube: '<path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    whatsapp: '<path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.41z"/>',
  };

  // ---------- 3. Navigation data ----------
  const SERVICES = [
    { icon: 'code', title: 'Software Development', desc: 'Custom web, mobile and enterprise apps', href: 'services/software-development.html' },
    { icon: 'ai', title: 'Enterprise AI Solutions', desc: 'Chatbots, automation and AI models', href: 'services/enterprise-ai.html' },
    { icon: 'chart', title: 'Data Analytics', desc: 'Dashboards, reports and insights', href: 'services/data-analytics.html' },
    { icon: 'cloud', title: 'Cloud Platform Services', desc: 'AWS, Azure and GCP setup and migration', href: 'services/cloud-services.html' },
    { icon: 'iot', title: 'IoT Solutions', desc: 'Connected devices and monitoring', href: 'services/iot-solutions.html' },
    { icon: 'drone', title: 'Drone Services', desc: 'Aerial survey, inspection and mapping', href: 'services/drone-services.html' },
    { icon: 'shield', title: 'IT Consulting & Security', desc: 'Strategy, audits and cybersecurity', href: 'services/it-consulting.html' },
  ];
  // Home page design versions, shown in the "Home" dropdown. Add Version 3 / 4 here.
  const HOME_VERSIONS = [
    { key: 'v1', label: 'Version 1', desc: 'Classic navy hero', href: 'index.html' },
    { key: 'v2', label: 'Version 2', desc: 'Image slider, rounded header', href: 'index-v2.html' },  ];
  const NAV = [
    { key: 'home', label: 'Home', href: 'index.html', children: HOME_VERSIONS },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'services', label: 'Services', href: 'services.html', mega: true },
    { key: 'industries', label: 'Industries', href: 'industries.html' },
    { key: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
    { key: 'blog', label: 'Blog', href: 'blog.html' },
    { key: 'careers', label: 'Careers', href: 'careers.html' },
  ];
  const COMPANY_LINKS = [
    ['About Us', 'about.html'], ['Portfolio', 'portfolio.html'], ['Industries', 'industries.html'],
    ['Life at Qpaix', 'team.html'], ['Careers', 'careers.html'], ['Blog', 'blog.html'], ['Contact Us', 'contact.html'],
  ];

  const current = document.body.dataset.page || '';
  const currentVersion = document.body.dataset.version || '';
  // Header style: <body data-header="pill"> = floating rounded header (Version 2). Default = classic.
  const isPill = document.body.dataset.header === 'pill';
  // <body data-header="overlay"> = minimal header + full-screen overlay menu (Version 3)
  const isOverlay = document.body.dataset.header === 'overlay';

  // ---------- 4. Header ----------
  const megaItems = SERVICES.map((s) => `
    <a href="${url(s.href)}" class="group flex gap-3 rounded-xl p-3 hover:bg-canvas transition-colors">
      <span class="icon-fill shrink-0 w-10 h-10 rounded-lg bg-accent-50 text-accent-600 grid place-items-center">${svg(ICON[s.icon])}</span>
      <span>
        <span class="block font-semibold text-navy-900 text-[15px] group-hover:text-accent-600">${s.title}</span>
        <span class="block text-sm text-muted mt-0.5">${s.desc}</span>
      </span>
    </a>`).join('');

  const panelPad = isPill ? 'pt-4' : 'pt-[18px]';
  const panelRound = isPill ? 'rounded-3xl' : '';

  const megaPanel = `
        <div id="mega-services" class="mega-panel absolute left-1/2 top-full ${panelPad} w-[min(880px,calc(100vw-2rem))] -translate-x-1/2" hidden>
          <div class="card ${panelRound} shadow-lift p-3 grid grid-cols-[1fr_260px] gap-3">
            <div>
              <div class="grid grid-cols-2 gap-1">${megaItems}</div>
              <a href="${url('services.html')}" class="mt-1 mx-3 mb-1 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-accent-600">View all services ${svg(ICON.arrow, 'w-4 h-4')}</a>
            </div>
            <div class="${isPill ? 'rounded-2xl' : 'rounded-xl'} bg-navy-900 bg-grid text-white p-6 flex flex-col">
              <span class="badge bg-white/10 text-accent-300 self-start">Free consultation</span>
              <p class="mt-4 font-heading text-xl font-bold leading-snug">Not sure which service fits your idea?</p>
              <p class="mt-2 text-sm text-navy-100">Talk to our team for 30 minutes. No cost, no commitment.</p>
              <a href="${url('contact.html')}" class="btn btn-accent btn-sm mt-auto self-start ${isPill ? 'btn-pill' : ''}">Book a Free Call</a>
            </div>
          </div>
        </div>`;

  const versionPanel = `
        <div id="home-versions" class="mega-panel absolute left-0 top-full ${panelPad} w-72" hidden>
          <div class="card ${panelRound} shadow-lift p-2">
            <p class="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">Home page designs</p>
            ${HOME_VERSIONS.map((v) => {
              const on = v.key === currentVersion;
              return `<a href="${url(v.href)}" class="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors ${on ? 'bg-canvas' : 'hover:bg-canvas'}" ${on ? 'aria-current="page"' : ''}>
                <span><span class="block font-semibold text-navy-900 text-[15px]">${v.label}</span><span class="block text-xs text-muted">${v.desc}</span></span>
                ${on ? '<span class="badge">Viewing</span>' : `<span class="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-600">${svg(ICON.arrow, 'w-4 h-4')}</span>`}
              </a>`;
            }).join('')}
          </div>
        </div>`;

  const desktopNav = NAV.map((n) => {
    const active = n.key === current;
    const base = isPill
      ? `inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-colors duration-300 ${active ? 'bg-navy-900 text-white' : 'text-ink/70 hover:text-navy-900 hover:bg-navy-50'}`
      : `relative inline-flex items-center gap-1 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors ${active ? 'text-navy-900' : 'text-ink/70 hover:text-navy-900'}`;
    const dot = active && !isPill ? '<span class="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent-500 rounded-full"></span>' : '';
    if (!n.mega && !n.children) return `<li><a href="${url(n.href)}" class="${base}" ${active ? 'aria-current="page"' : ''}>${n.label}${dot}</a></li>`;
    const id = n.mega ? 'mega-services' : 'home-versions';
    return `
      <li class="relative" data-mega>
        <button type="button" class="${base}" aria-expanded="false" aria-controls="${id}" data-mega-btn>
          ${n.label}${svg(ICON.chevron, 'w-4 h-4 transition-transform duration-200')}${dot}
        </button>
        ${n.mega ? megaPanel : versionPanel}
      </li>`;
  }).join('');

  const mobileNav = NAV.map((n) => {
    const active = n.key === current;
    const cls = `flex items-center justify-between w-full py-3.5 text-base font-semibold border-b border-line ${active ? 'text-accent-600' : 'text-navy-900'}`;
    if (!n.mega && !n.children) return `<a href="${url(n.href)}" class="${cls}">${n.label}</a>`;
    const items = n.mega
      ? SERVICES.map((s) => `<a href="${url(s.href)}" class="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] text-ink/80 hover:bg-canvas"><span class="text-accent-600">${svg(ICON[s.icon], 'w-5 h-5')}</span>${s.title}</a>`).join('')
        + `<a href="${url('services.html')}" class="block px-2 py-2.5 text-sm font-semibold text-accent-600">View all services →</a>`
      : n.children.map((v) => `<a href="${url(v.href)}" class="flex items-center justify-between rounded-lg px-2 py-2.5 text-[15px] ${v.key === currentVersion ? 'text-accent-600 font-semibold' : 'text-ink/80'} hover:bg-canvas">${v.label}<span class="text-xs text-muted font-normal">${v.desc}</span></a>`).join('');
    return `
      <div>
        <button type="button" class="${cls}" aria-expanded="false" data-acc-btn>${n.label}${svg(ICON.chevron, 'w-5 h-5 transition-transform duration-200')}</button>
        <div class="py-2 space-y-1" hidden data-acc-panel>${items}</div>
      </div>`;
  }).join('');

  const mobileExtras = `
        <div class="${isPill ? 'px-5' : 'container'} pb-6 pt-4 space-y-3">
          <a href="${url('contact.html')}" class="btn btn-primary w-full ${isPill ? 'btn-pill' : ''}">Book a Free Call</a>
          <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" class="btn btn-outline w-full ${isPill ? 'btn-pill' : ''}">${svg(BRAND.whatsapp)}Chat on WhatsApp</a>
          <div class="pt-2 text-sm text-muted space-y-1">
            <a href="mailto:${SITE.email}" class="block">${SITE.email}</a>
            <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="block">${SITE.phone}</a>
          </div>
        </div>`;

  const menuButton = `
          <button type="button" class="lg:hidden w-10 h-10 grid place-items-center ${isPill ? 'rounded-full bg-navy-50' : 'rounded-lg'} text-navy-900 hover:bg-canvas" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-btn>
            <span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>`;

  const skipLink = `<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-primary btn-sm">Skip to content</a>`;

  const classicHeader = `
    ${skipLink}
    <div class="hidden md:block bg-navy-950 text-navy-100 text-[13px]">
      <div class="container flex items-center justify-between h-9">
        <div class="flex items-center gap-6">
          <a href="mailto:${SITE.email}" class="inline-flex items-center gap-2 hover:text-white">${svg(ICON.mail, 'w-3.5 h-3.5')}${SITE.email}</a>
          <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="inline-flex items-center gap-2 hover:text-white">${svg(ICON.phone, 'w-3.5 h-3.5')}${SITE.phone}</a>
        </div>
        <a href="${url('careers.html')}" class="inline-flex items-center gap-2 hover:text-white">
          <span class="relative flex w-2 h-2"><span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span><span class="relative inline-flex rounded-full w-2 h-2 bg-emerald-400"></span></span>
          We're hiring – view openings
        </a>
      </div>
    </div>

    <header class="site-header sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line transition-shadow">
      <div class="container flex items-center justify-between h-16 lg:h-[72px]">
        <a href="${url('index.html')}" class="shrink-0" aria-label="Qpaix home">
          <img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="h-7 lg:h-8 w-auto">
        </a>
        <nav class="hidden lg:block" aria-label="Main">
          <ul class="flex items-center gap-1">${desktopNav}</ul>
        </nav>
        <div class="flex items-center gap-2">
          <a href="${url('contact.html')}" class="hidden sm:inline-flex btn btn-primary btn-sm">Book a Free Call</a>
          ${menuButton}
        </div>
      </div>
      <div id="mobile-menu" class="lg:hidden border-t border-line bg-white overflow-y-auto" style="max-height:calc(100dvh - 64px)" hidden>
        <nav class="container py-2" aria-label="Mobile">${mobileNav}</nav>
        ${mobileExtras}
      </div>
    </header>`;

  // Floating rounded "pill" header (Version 2): shrinks a little on scroll.
  const pillHeader = `
    ${skipLink}
    <header class="site-header site-header--pill fixed inset-x-0 top-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4 pointer-events-none">
      <div class="pill-bar pointer-events-auto mx-auto flex items-center justify-between gap-3 rounded-full bg-white/85 backdrop-blur-xl border border-white/70 shadow-lift pl-5 pr-2">
        <a href="${url('index.html')}" class="shrink-0" aria-label="Qpaix home">
          <img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="h-6 lg:h-7 w-auto">
        </a>
        <nav class="hidden lg:block" aria-label="Main">
          <ul class="flex items-center gap-0.5">${desktopNav}</ul>
        </nav>
        <div class="flex items-center gap-2">
          <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="hidden xl:grid w-11 h-11 place-items-center rounded-full border border-line text-navy-900 hover:bg-navy-900 hover:text-white transition-colors duration-300" aria-label="Call ${SITE.phone}">${svg(ICON.phone, 'w-[18px] h-[18px]')}</a>
          <a href="${url('contact.html')}" class="hidden sm:inline-flex btn btn-primary btn-pill pl-5 pr-1.5 py-1.5 group">
            Let's Talk
            <span class="w-8 h-8 rounded-full bg-accent-500 text-navy-950 grid place-items-center transition-transform duration-500 group-hover:rotate-[-45deg]">${svg(ICON.arrow, 'w-4 h-4')}</span>
          </a>
          ${menuButton}
        </div>
      </div>
      <div id="mobile-menu" class="pointer-events-auto lg:hidden mx-auto max-w-[1240px] mt-2 rounded-3xl bg-white shadow-lift border border-line overflow-y-auto" style="max-height:calc(100dvh - 100px)" hidden>
        <nav class="px-5 py-2" aria-label="Mobile">${mobileNav}</nav>
        ${mobileExtras}
      </div>
    </header>`;

  // ----- Overlay header (Version 3): logo + call + "Menu" button that opens a full-screen menu -----
  const OVERLAY_LINKS = [...NAV.map((n) => [n.key, n.label, n.href]), ['contact', 'Contact', 'contact.html']];
  const overlayBurger = '<span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>';
  const overlayHeader = `
    ${skipLink}
    <header class="site-header site-header--overlay fixed inset-x-0 top-0 z-50">
      <div class="container flex items-center justify-between h-[72px] md:h-20">
        <a href="${url('index.html')}" class="shrink-0" aria-label="Qpaix home">
          <img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="h-7 md:h-8 w-auto">
        </a>
        <div class="flex items-center gap-2 md:gap-4">
          <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-accent-600 transition-colors">${svg(ICON.phone, 'w-4 h-4')}${SITE.phone}</a>
          <a href="${url('contact.html')}" class="hidden sm:inline-flex btn btn-accent btn-sm btn-pill">Book a Call</a>
          <button type="button" class="ov-btn inline-flex items-center gap-3 h-11 pl-5 pr-4 rounded-full bg-navy-900 text-white hover:bg-navy-700 transition-colors" aria-expanded="false" aria-controls="overlay-menu" data-ov-open>
            <span class="text-sm font-semibold">Menu</span>${overlayBurger}
          </button>
        </div>
      </div>
    </header>

    <div id="overlay-menu" class="ov-menu" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden="true">
      <div class="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-accent-500/15 blur-3xl pointer-events-none"></div>
      <div class="container relative h-full flex flex-col">
        <div class="flex items-center justify-between h-[72px] md:h-20 shrink-0">
          <a href="${url('index.html')}" aria-label="Qpaix home"><img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="logo-white h-7 md:h-8 w-auto"></a>
          <button type="button" class="ov-btn is-open inline-flex items-center gap-3 h-11 pl-5 pr-4 rounded-full bg-white text-navy-900 hover:bg-accent-400 transition-colors" data-ov-close>
            <span class="text-sm font-semibold">Close</span>${overlayBurger}
          </button>
        </div>
        <div class="flex-1 overflow-y-auto grid gap-12 lg:grid-cols-[1.35fr_1fr] py-8 md:py-12 content-start">
          <nav aria-label="Main">
            <ol class="space-y-1 md:space-y-2">
              ${OVERLAY_LINKS.map(([key, label, href], i) => `
              <li class="ov-item" style="--i:${i}">
                <a href="${url(href)}" class="ov-link group inline-flex items-baseline gap-4 md:gap-6 py-1 ${key === current ? 'text-accent-400' : 'text-white'}" ${key === current ? 'aria-current="page"' : ''}>
                  <span class="font-heading text-xs md:text-sm font-bold text-accent-400/80 w-6">${String(i + 1).padStart(2, '0')}</span>
                  <span class="ov-link-text font-heading text-[34px] sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.1]">${label}</span>
                </a>
                ${key === 'home' ? `<div class="ml-10 md:ml-12 mt-2 mb-3 flex flex-wrap gap-2">${HOME_VERSIONS.map((v) => `<a href="${url(v.href)}" class="rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${v.key === currentVersion ? 'bg-accent-500 border-accent-500 text-navy-950' : 'border-white/20 text-navy-100 hover:border-accent-400 hover:text-white'}">${v.label}</a>`).join('')}</div>` : ''}
              </li>`).join('')}
            </ol>
          </nav>
          <div class="ov-item space-y-10 lg:pt-4" style="--i:${OVERLAY_LINKS.length}">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[.2em] text-navy-300">Services</p>
              <ul class="mt-4 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
                ${SERVICES.map((s) => `<li><a href="${url(s.href)}" class="flex items-center gap-3 text-navy-100 hover:text-white transition-colors"><span class="text-accent-400">${svg(ICON[s.icon], 'w-[18px] h-[18px]')}</span>${s.title}</a></li>`).join('')}
              </ul>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[.2em] text-navy-300">Get in touch</p>
              <a href="mailto:${SITE.email}" class="mt-4 block font-heading text-2xl font-bold hover:text-accent-400 transition-colors">${SITE.email}</a>
              <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="mt-1 block font-heading text-xl font-bold text-navy-100 hover:text-accent-400 transition-colors">${SITE.phone}</a>
              <p class="mt-4 max-w-sm text-sm text-navy-200 leading-relaxed">${SITE.address}</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <a href="${url('contact.html')}" class="btn btn-accent btn-pill">Book a Free Call</a>
              ${Object.entries(SITE.social).filter(([, l]) => l).map(([k, l]) => `<a href="${l}" target="_blank" rel="noopener" aria-label="Qpaix on ${k}" class="w-11 h-11 rounded-full border border-white/15 grid place-items-center text-navy-100 hover:bg-accent-500 hover:text-navy-950 hover:border-accent-500 transition-colors">${svg(BRAND[k], 'w-[17px] h-[17px]')}</a>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const header = isOverlay ? overlayHeader : isPill ? pillHeader : classicHeader;

  // ---------- 5. Footer ----------
  const socials = Object.entries(SITE.social).filter(([, link]) => link).map(([k, link]) => `
    <a href="${link}" target="_blank" rel="noopener" aria-label="Qpaix on ${k}" class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-navy-100 hover:bg-accent-500 hover:text-navy-950 hover:border-accent-500 transition-colors">${svg(BRAND[k], 'w-[18px] h-[18px]')}</a>`).join('');

  const footLink = (label, href) => `<li><a href="${url(href)}" class="foot-link"><span class="foot-arrow" aria-hidden="true">${svg(ICON.arrow, 'w-4 h-4')}</span><span class="foot-text">${label}</span></a></li>`;
  const year = new Date().getFullYear();

  const ctaBand = document.body.hasAttribute('data-no-cta') ? '' : `
    <section class="bg-white">
      <div class="container py-16 md:py-20">
        <div class="relative overflow-hidden rounded-2xl bg-navy-900 bg-grid px-6 py-12 md:px-14 md:py-14">
          <div class="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-accent-500/25 blur-3xl"></div>
          <div class="absolute -left-16 -bottom-24 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl"></div>
          <div class="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Have a project in mind?</h2>
              <p class="mt-3 max-w-xl text-navy-100 text-lg">Tell us what you want to build. We'll reply within one business day with next steps and a rough estimate.</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <a href="${url('contact.html')}" class="btn btn-accent btn-lg">Get a Free Quote ${svg(ICON.arrow)}</a>
              <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" class="btn btn-outline-light btn-lg">${svg(BRAND.whatsapp)}WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  // Short company intro under the footer logo (used by both footers)
  const brandText = `
          <p class="mt-5 max-w-xs text-[15px] font-semibold leading-snug text-white">Software, AI, cloud and data solutions for growing businesses across India.</p>
          <p class="mt-3 max-w-xs text-sm leading-relaxed">From custom apps to AI automation, our Ahmedabad team helps startups, SMEs and enterprises work faster, cut manual effort and serve customers better.</p>`;

  const legalLinks = `
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            <li><a href="${url('privacy-policy.html')}" class="hover:text-white">Privacy Policy</a></li>
            <li><a href="${url('terms.html')}" class="hover:text-white">Terms &amp; Conditions</a></li>
          </ul>`;

  // ----- Classic footer (Version 1 and inner pages) -----
  const classicFooter = `
    ${ctaBand}
    <footer class="bg-navy-950 text-navy-200 text-[15px]">
      <div class="container pt-16 pb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <a href="${url('index.html')}" aria-label="Qpaix home"><img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="logo-white h-8 w-auto"></a>
          ${brandText}
          <a href="${url('contact.html')}" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors">Let's talk about your project ${svg(ICON.arrow, 'w-4 h-4')}</a>
          <div class="mt-6 flex flex-wrap gap-2">${socials}</div>
        </div>

        <div>
          <h3 class="text-white font-semibold text-base">Services</h3>
          <ul class="mt-4 space-y-3">${SERVICES.map((s) => footLink(s.title, s.href)).join('')}</ul>
        </div>

        <div>
          <h3 class="text-white font-semibold text-base">Company</h3>
          <ul class="mt-4 space-y-3">${COMPANY_LINKS.map(([l, h]) => footLink(l, h)).join('')}</ul>
        </div>

        <div>
          <h3 class="text-white font-semibold text-base">Get in touch</h3>
          <ul class="mt-4 space-y-4">
            <li class="flex gap-3"><span class="text-accent-400 mt-0.5">${svg(ICON.pin, 'w-[18px] h-[18px]')}</span><span>${SITE.address}</span></li>
            <li class="flex gap-3"><span class="text-accent-400 mt-0.5">${svg(ICON.mail, 'w-[18px] h-[18px]')}</span><a href="mailto:${SITE.email}" class="hover:text-white">${SITE.email}</a></li>
            <li class="flex gap-3"><span class="text-accent-400 mt-0.5">${svg(ICON.phone, 'w-[18px] h-[18px]')}</span><a href="tel:${SITE.phone.replace(/\s/g, '')}" class="hover:text-white">${SITE.phone}</a></li>
            <li class="flex gap-3"><span class="text-accent-400 mt-0.5">${svg(ICON.clock, 'w-[18px] h-[18px]')}</span><span>${SITE.hours}</span></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10">
        <div class="container py-6 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between text-sm text-navy-300">
          <p>© ${year} ${SITE.name}. All rights reserved.</p>
          ${legalLinks}
        </div>
      </div>
    </footer>`;

  // ----- Rounded footer (Version 2): big CTA, contact cards, newsletter, giant logo -----
  const contactCard = (icon, label, value, href, ext) => `
          <a href="${href}" ${ext ? 'target="_blank" rel="noopener"' : ''} class="group flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 p-4 md:p-5 hover:bg-white/[0.08] hover:border-accent-500/40 transition-colors duration-300">
            <span class="w-11 h-11 shrink-0 rounded-full bg-accent-500/15 text-accent-400 grid place-items-center transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-navy-950">${icon}</span>
            <span class="min-w-0"><span class="block text-xs text-navy-300">${label}</span><span class="block text-sm font-semibold text-white truncate">${value}</span></span>
          </a>`;

  // Version 2 footer link: a dot before the text; on hover dot + text slide right together
  const dotLink = (label, href) => `<li><a href="${url(href)}" class="dot-link"><span class="dot-link-dot" aria-hidden="true"></span><span>${label}</span></a></li>`;

  const pillSocials =Object.entries(SITE.social).filter(([, link]) => link).map(([k, link]) => `
    <a href="${link}" target="_blank" rel="noopener" aria-label="Qpaix on ${k}" class="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-navy-100 hover:bg-accent-500 hover:text-navy-950 hover:border-accent-500 transition-colors duration-300">${svg(BRAND[k], 'w-[17px] h-[17px]')}</a>`).join('');

  const pillFooter = `
    <footer class="bg-canvas px-3 sm:px-4 pt-16 md:pt-24 pb-3 sm:pb-4">
      <div class="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-navy-950 text-navy-200 text-[15px]">
        <div class="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-accent-500/15 blur-3xl"></div>
        <div class="absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full bg-accent-500/10 blur-3xl"></div>

        <!-- Big CTA -->
        <div class="container relative pt-16 md:pt-24 pb-12 md:pb-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span class="eyebrow text-accent-300">Let's work together</span>
            <h2 class="mt-5 text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.02]">Have an idea?<br><span class="text-gradient">Let's build it.</span></h2>
            <p class="mt-5 max-w-lg text-navy-100">Share your idea and we'll reply within one business day with next steps and a rough estimate.</p>
          </div>
          <!-- Circle button: rotating text ring with an icon in the centre -->
          <a href="${url('contact.html')}" aria-label="Start a project" class="group relative w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full bg-accent-500 text-navy-950 grid place-items-center transition-transform duration-500 hover:scale-105">
            <svg class="cta-ring absolute inset-0 w-full h-full" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="cta-ring-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs>
              <text font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="800" letter-spacing="4.2" fill="#021624"><textPath href="#cta-ring-path">START A PROJECT · START A PROJECT · </textPath></text>
            </svg>
            <span class="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-navy-950 text-accent-400 grid place-items-center shadow-lift transition-all duration-500 group-hover:bg-navy-700 group-hover:text-accent-300">
              <svg class="w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
            </span>
          </a>
        </div>

        <!-- Contact cards -->
        <div class="container relative pb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          ${contactCard(svg(ICON.mail, 'w-5 h-5'), 'Email us', SITE.email, `mailto:${SITE.email}`)}
          ${contactCard(svg(ICON.phone, 'w-5 h-5'), 'Call us', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`)}
          ${contactCard(svg(BRAND.whatsapp, 'w-5 h-5'), 'WhatsApp', 'Chat with our team', `https://wa.me/${SITE.whatsapp}`, true)}
        </div>

        <!-- Links -->
        <div class="container relative pt-12 pb-10 border-t border-white/10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <a href="${url('index.html')}" aria-label="Qpaix home"><img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="logo-white h-7 w-auto"></a>
            ${brandText}
            <div class="mt-6 flex flex-wrap gap-2">${pillSocials}</div>
          </div>
          <div>
            <h3 class="text-white font-semibold text-base">Services</h3>
            <ul class="mt-4 space-y-3">${SERVICES.map((s) => dotLink(s.title, s.href)).join('')}</ul>
          </div>
          <div>
            <h3 class="text-white font-semibold text-base">Company</h3>
            <ul class="mt-4 space-y-3">${COMPANY_LINKS.map(([l, h]) => dotLink(l, h)).join('')}</ul>
          </div>
          <div>
            <h3 class="text-white font-semibold text-base">Stay updated</h3>
            <p class="mt-4 text-sm leading-relaxed">Practical tech tips for business owners. One email a month, no spam.</p>
            <!-- TODO: connect to the backend / email service -->
            <form class="mt-4 flex items-center gap-1 rounded-full bg-white/[0.06] border border-white/15 p-1.5 focus-within:border-accent-500 transition-colors" onsubmit="event.preventDefault(); this.querySelector('input').value=''; this.nextElementSibling.hidden=false;">
              <label for="news-email" class="sr-only">Email address</label>
              <input id="news-email" type="email" required placeholder="Your email" class="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-navy-300 outline-none">
              <button type="submit" class="w-10 h-10 shrink-0 rounded-full bg-accent-500 text-navy-950 grid place-items-center hover:bg-accent-400 transition-colors" aria-label="Subscribe">${svg(ICON.arrow, 'w-4 h-4')}</button>
            </form>
            <p class="mt-2 text-xs text-accent-300" hidden>Thanks! You're subscribed.</p>
            <p class="mt-5 flex items-center gap-2 text-sm">${svg(ICON.clock, 'w-4 h-4 text-accent-400')}${SITE.hours}</p>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="container relative py-6 border-t border-white/10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-navy-300">
          <p>© ${year} ${SITE.name}. All rights reserved.</p>
          ${legalLinks}
        </div>
      </div>
    </footer>`;

  const floatingButtons = `
    <!-- WhatsApp tab: fixed to the left edge, vertically centred -->
    <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" class="wa-tab">
      ${svg(BRAND.whatsapp, 'w-6 h-6')}
      <span class="wa-tab-text">Chat with us</span>
    </a>
    <button type="button" aria-label="Back to top" data-to-top
       class="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 w-11 h-11 rounded-full bg-white border border-line text-navy-900 grid place-items-center shadow-card opacity-0 pointer-events-none transition-opacity hover:bg-canvas">
      ${svg(ICON.up)}
    </button>`;

  // ----- Light footer (Version 3): big contact headline, underline-on-hover links -----
  const uLink = (label, href) => `<li><a href="${url(href)}" class="u-link text-muted hover:text-navy-900">${label}</a></li>`;
  const lightSocials = Object.entries(SITE.social).filter(([, link]) => link).map(([k, link]) => `
    <a href="${link}" target="_blank" rel="noopener" aria-label="Qpaix on ${k}" class="w-10 h-10 rounded-full border border-line grid place-items-center text-navy-900 hover:bg-navy-900 hover:text-accent-400 hover:border-navy-900 transition-colors duration-300">${svg(BRAND[k], 'w-[17px] h-[17px]')}</a>`).join('');

  const lightFooter = `
    <footer class="bg-white border-t border-line">
      <div class="container py-16 md:py-24 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
        <div>
          <span class="eyebrow">Get in touch</span>
          <h2 class="mt-5 text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-navy-900 tracking-tight leading-[1.04]">Let's build something<br><span class="text-accent-600">your customers love.</span></h2>
        </div>
        <div class="lg:text-right">
          <a href="mailto:${SITE.email}" class="u-link font-heading text-2xl md:text-[32px] font-bold text-navy-900">${SITE.email}</a>
          <div class="mt-2"><a href="tel:${SITE.phone.replace(/\s/g, '')}" class="u-link font-heading text-xl md:text-2xl font-bold text-navy-700">${SITE.phone}</a></div>
          <div class="mt-7 flex flex-wrap gap-3 lg:justify-end">
            <a href="${url('contact.html')}" class="btn btn-primary btn-pill">Book a Free Call ${svg(ICON.arrow)}</a>
            <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" class="btn btn-outline btn-pill">${svg(BRAND.whatsapp)}WhatsApp</a>
          </div>
        </div>
      </div>

      <div class="container"><div class="h-px bg-line"></div></div>

      <div class="container py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <a href="${url('index.html')}" aria-label="Qpaix home"><img src="${url('img/Qpaix-logo.png')}" alt="Qpaix" class="h-8 w-auto"></a>
          <p class="mt-5 max-w-xs text-[15px] font-semibold leading-snug text-navy-900">Software, AI, cloud and data solutions for growing businesses across India.</p>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-muted">From custom apps to AI automation, our Ahmedabad team helps startups, SMEs and enterprises work faster and serve customers better.</p>
          <div class="mt-6 flex flex-wrap gap-2">${lightSocials}</div>
        </div>
        <div>
          <h3 class="text-navy-900 font-bold text-base">Services</h3>
          <ul class="mt-4 space-y-3 text-[15px]">${SERVICES.map((s) => uLink(s.title, s.href)).join('')}</ul>
        </div>
        <div>
          <h3 class="text-navy-900 font-bold text-base">Company</h3>
          <ul class="mt-4 space-y-3 text-[15px]">${COMPANY_LINKS.map(([l, h]) => uLink(l, h)).join('')}</ul>
        </div>
        <div>
          <h3 class="text-navy-900 font-bold text-base">Office</h3>
          <p class="mt-4 text-[15px] text-muted leading-relaxed">${SITE.address}</p>
          <p class="mt-4 flex items-center gap-2 text-[15px] text-muted">${svg(ICON.clock, 'w-4 h-4 text-accent-600')}${SITE.hours}</p>
        </div>
      </div>

      <div class="bg-canvas">
        <div class="container py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-muted">
          <p>© ${year} ${SITE.name}. All rights reserved.</p>
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            <li><a href="${url('privacy-policy.html')}" class="u-link hover:text-navy-900">Privacy Policy</a></li>
            <li><a href="${url('terms.html')}" class="u-link hover:text-navy-900">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>`;

  const footer = (isOverlay ? lightFooter : isPill ? pillFooter : classicFooter) + floatingButtons;

  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.outerHTML = header;
  if (footerSlot) footerSlot.outerHTML = footer;

  // ---------- 6. Behaviour ----------
  // Shadow on scroll + back-to-top button
  const siteHeader = document.querySelector('.site-header');
  const toTop = document.querySelector('[data-to-top]');
  const onScroll = () => {
    const y = window.scrollY;
    if (siteHeader) siteHeader.classList.toggle(isPill || isOverlay ? 'is-scrolled' : 'shadow-card', y > (isPill ? 40 : 8));
    if (toTop) {
      toTop.classList.toggle('opacity-0', y < 600);
      toTop.classList.toggle('pointer-events-none', y < 600);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Desktop mega menu: opens on hover or click, closes on Esc / outside click
  document.querySelectorAll('[data-mega]').forEach((wrap) => {
    const btn = wrap.querySelector('[data-mega-btn]');
    const panel = wrap.querySelector('.mega-panel');
    const chevron = btn.querySelector('svg');
    let timer;
    let openedAt = 0;
    const set = (open) => {
      if (open && panel.hidden) openedAt = Date.now();
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      chevron.classList.toggle('rotate-180', open);
    };
    wrap.addEventListener('mouseenter', () => { clearTimeout(timer); set(true); });
    wrap.addEventListener('mouseleave', () => { timer = setTimeout(() => set(false), 150); });
    // Hover already opened it just before the click: keep it open instead of toggling shut
    btn.addEventListener('click', () => set(panel.hidden || Date.now() - openedAt < 400));
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); } });
  });

  // Mobile menu
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    const setMenu = (open) => {
      mobileMenu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuBtn.classList.toggle('is-open', open); // animates the 3 lines into an X
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => setMenu(mobileMenu.hidden));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobileMenu.hidden) setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024 && !mobileMenu.hidden) setMenu(false); });
  }

  // Full-screen overlay menu (Version 3)
  const ovMenu = document.getElementById('overlay-menu');
  const ovOpen = document.querySelector('[data-ov-open]');
  const ovClose = document.querySelector('[data-ov-close]');
  if (ovMenu && ovOpen && ovClose) {
    const setOv = (open) => {
      ovMenu.classList.toggle('is-open', open);
      ovMenu.setAttribute('aria-hidden', String(!open));
      ovOpen.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) setTimeout(() => ovClose.focus(), 300); else ovOpen.focus();
    };
    ovOpen.addEventListener('click', () => setOv(true));
    ovClose.addEventListener('click', () => setOv(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ovMenu.classList.contains('is-open')) setOv(false); });
    ovMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { document.body.style.overflow = ''; }));
  }

  // Mobile accordion (Services)
  document.querySelectorAll('[data-acc-btn]').forEach((btn) => {
    const panel = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('svg').classList.toggle('rotate-180', open);
    });
  });
})();

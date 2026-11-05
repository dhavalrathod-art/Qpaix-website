// Generates index-v3.html (run: node build-v3.js <output-path>)
const fs = require('fs');
const out = process.argv[2];
const U = (id, w) => `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;
const ARROW = (c = 'w-5 h-5') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const CHECK = (c = 'w-4 h-4') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
const CROSS = (c = 'w-4 h-4') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
const MINUS = (c = 'w-4 h-4') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>`;

// ---------- data ----------
const services = [
  { t: 'Software Development', href: 'services/software-development.html', img: 'photo-1486312338219-ce68d2c6f44d', d: 'Custom web apps, mobile apps, portals and ERPs that fit the way your business actually works.', f: ['Web & mobile apps', 'ERP & CRM systems', 'API integrations', 'Maintenance & support'] },
  { t: 'Enterprise AI Solutions', href: 'services/enterprise-ai.html', img: 'photo-1677442136019-21780ecad995', d: 'Chatbots, document reading and workflow automation that save your team hours every week.', f: ['AI chatbots', 'Document AI', 'Smart search', 'Process automation'] },
  { t: 'Data Analytics', href: 'services/data-analytics.html', img: 'photo-1551288049-bebda4e38f71', d: 'Live dashboards and reports that bring sales, stock and finance data into one clear view.', f: ['Power BI dashboards', 'Data pipelines', 'Sales forecasting', 'Custom reports'] },
  { t: 'Cloud Platform Services', href: 'services/cloud-services.html', img: 'photo-1558494949-ef010cbdcc31', d: 'Move to AWS, Azure or Google Cloud safely, and keep your monthly cloud bill under control.', f: ['Cloud migration', 'DevOps & CI/CD', 'Cost optimisation', '24/7 monitoring'] },
  { t: 'IoT Solutions', href: 'services/iot-solutions.html', img: 'photo-1581091226825-a6a2a5aee158', d: 'Connect machines and sensors, watch them live and get alerts before problems cost you money.', f: ['Sensor integration', 'Live dashboards', 'Smart alerts', 'Predictive maintenance'] },
  { t: 'Drone Services', href: 'services/drone-services.html', img: 'photo-1473968512647-3e447244af8f', d: 'Aerial survey, mapping, inspection and precision agriculture with trained, certified pilots.', f: ['Aerial survey & mapping', 'Crop monitoring', 'Site inspection', 'Photo & video'] },
  { t: 'IT Consulting & Security', href: 'services/it-consulting.html', img: 'photo-1454165804606-c3d57bc86b40', d: 'Plan the right technology, audit your systems and protect your business data.', f: ['Technology roadmap', 'Security audit', 'Data protection', 'Team training'] },
];

const work = [
  { t: 'Clinic management platform', tag: 'Healthcare', img: 'photo-1576091160399-112ba8d25d1d', m: [['40%', 'less admin time'], ['3x', 'faster billing']] },
  { t: 'Drone crop health monitoring', tag: 'Agriculture', img: 'photo-1473968512647-3e447244af8f', m: [['500+', 'acres surveyed'], ['25%', 'less pesticide']] },
  { t: 'IoT factory dashboard', tag: 'Manufacturing', img: 'photo-1581092160562-40aa08e78837', m: [['30%', 'less downtime'], ['24/7', 'live alerts']] },
  { t: 'Retail billing & inventory app', tag: 'Retail', img: 'photo-1556742049-0cfed4f6a45d', m: [['12', 'stores connected'], ['0', 'stock-outs in 3 months']] },
  { t: 'School ERP mobile app', tag: 'Education', img: 'photo-1512941937669-90a1b58e7e9c', m: [['8,000+', 'parents on app'], ['70%', 'less paperwork']] },
  { t: 'Real estate CRM & site survey', tag: 'Real Estate', img: 'photo-1600585154340-be6161a56a0c', m: [['2x', 'more site visits'], ['60%', 'faster follow-ups']] },
];

const industries = [
  ['Healthcare', 'Clinic, lab and hospital software', 'photo-1580281657527-47f249e8f4df', 'healthcare'],
  ['Education', 'LMS, school ERP and coaching apps', 'photo-1503676260728-1c00da094a0b', 'education'],
  ['Agriculture', 'Drone surveys and IoT for farms', 'photo-1625246333195-78d9c38ad449', 'agriculture'],
  ['Manufacturing', 'ERP, IoT and quality control', 'photo-1581091226825-a6a2a5aee158', 'manufacturing'],
  ['Real Estate', 'CRM, listings and site surveys', 'photo-1560518883-ce09059eeffa', 'real-estate'],
  ['Retail & E-commerce', 'Online stores, POS and inventory', 'photo-1441986300917-64674bd600d8', 'retail'],
  ['Logistics', 'Fleet tracking and delivery apps', 'photo-1586528116311-ad8dd3c8310d', 'logistics'],
  ['Finance', 'Fintech apps, reports and compliance', 'photo-1554224155-6726b3ff858f', 'finance'],
];

// Comparison: [label, freelancer, qpaix, agency] each cell: [icon, text]
const Y = 'y', N = 'n', M = 'm';
const cmp = [
  ['Cost', [M, 'Low, but risky'], [Y, 'Fair, fixed quotes'], [N, 'Very high']],
  ['Full team (design, dev, QA)', [N, 'One person'], [Y, 'Yes, in-house'], [Y, 'Yes']],
  ['Speed of delivery', [M, 'Depends on availability'], [Y, 'Weekly sprints & demos'], [M, 'Slow approvals']],
  ['Support after launch', [N, 'Often disappears'], [Y, 'Included + monthly plans'], [M, 'Extra cost']],
  ['You own the code', [M, 'Not always clear'], [Y, '100%, with NDA'], [M, 'Licence terms']],
  ['Direct access to the team', [Y, 'Yes'], [Y, 'Yes, on WhatsApp & calls'], [N, 'Through managers']],
];
const cell = ([k, txt], q) => {
  const icon = k === Y ? CHECK() : k === N ? CROSS() : MINUS();
  const iconCls = q ? (k === Y ? 'bg-accent-500 text-navy-950' : 'bg-white/15 text-white') : (k === Y ? 'bg-emerald-50 text-emerald-600' : k === N ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600');
  return `<td class="px-5 py-5 ${q ? 'cmp-qpaix' : ''}"><div class="flex items-center gap-3"><span class="w-7 h-7 shrink-0 rounded-full grid place-items-center ${iconCls}">${icon}</span><span class="text-sm ${q ? 'font-semibold' : 'text-ink/80'}">${txt}</span></div></td>`;
};

const faqs = [
  ['How much does a software project cost?', 'It depends on features and complexity. After a free discovery call we send a clear written estimate, either a fixed price or a monthly team cost, so you know the budget before we start.'],
  ['How long will it take to build my app?', 'A simple app or website usually takes 4–8 weeks. Larger platforms are built in phases, so you can launch a first version early and add features over time.'],
  ['Will I own the source code?', 'Yes. You get full ownership of the code, designs and data. We sign an NDA before the project starts.'],
  ['Do you provide support after launch?', 'Yes. Every project includes a free support period after go-live, and we offer monthly maintenance plans for updates, monitoring and new features.'],
  ['Can you work with our existing software or team?', 'Absolutely. We regularly improve, integrate with or take over existing systems, and our developers can join your in-house team.'],
  ['Do you only work with clients in Ahmedabad?', 'No. We work with businesses across India. Most meetings happen on video calls, and we visit on site whenever the project needs it.'],
];

// ---------- sections ----------
const hero = `
    <!-- ===================== 1. HERO: typing headline + quote form ===================== -->
    <section class="v3-hero-bg relative overflow-hidden">
      <div class="container relative pt-28 md:pt-36 pb-16 md:pb-24 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <div class="inline-flex items-center gap-3 rounded-full bg-white border border-line shadow-card pl-2 pr-4 py-1.5">
            <span class="flex -space-x-2">
              <span class="w-7 h-7 rounded-full bg-navy-900 text-white text-[10px] font-bold grid place-items-center ring-2 ring-white">RP</span>
              <span class="w-7 h-7 rounded-full bg-accent-500 text-navy-950 text-[10px] font-bold grid place-items-center ring-2 ring-white">NS</span>
              <span class="w-7 h-7 rounded-full bg-navy-600 text-white text-[10px] font-bold grid place-items-center ring-2 ring-white">AD</span>
            </span>
            <span class="text-sm text-ink/80"><span class="text-amber-400">★★★★★</span> <span class="font-semibold text-navy-900">4.9/5</span> from 50+ businesses</span>
          </div>
          <h1 class="mt-7 text-[40px] sm:text-6xl lg:text-[68px] font-extrabold text-navy-900 tracking-tight leading-[1.05]">
            We build<br><span class="typed-word" data-typed='["Mobile Apps","AI Solutions","Dashboards","Cloud Systems","Business Software"]'>Mobile Apps</span><span class="typed-caret" aria-hidden="true"></span><br>for growing businesses.
          </h1>
          <p class="mt-6 max-w-xl text-lg text-muted leading-relaxed">Qpaix is an Ahmedabad-based software and AI company. Tell us your idea today and get a clear plan and quote within 24 hours.</p>
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <a href="#quote" class="btn btn-primary btn-lg btn-pill">Get a Free Quote ${ARROW()}</a>
            <a href="#work" class="u-link font-semibold text-navy-900">See our work</a>
          </div>
          <ul class="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <li><p class="font-heading text-2xl md:text-3xl font-extrabold text-navy-900">24 hr</p><p class="text-xs md:text-sm text-muted">Quote turnaround</p></li>
            <li><p class="font-heading text-2xl md:text-3xl font-extrabold text-navy-900">100%</p><p class="text-xs md:text-sm text-muted">Code ownership</p></li>
            <li><p class="font-heading text-2xl md:text-3xl font-extrabold text-navy-900">NDA</p><p class="text-xs md:text-sm text-muted">Signed day one</p></li>
          </ul>
        </div>

        <!-- Quote form -->
        <div id="quote" class="relative scroll-mt-28">
          <div class="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-accent-300/40 via-transparent to-navy-200/40 blur-xl" aria-hidden="true"></div>
          <div class="relative rounded-[2rem] bg-white border border-line shadow-lift p-6 sm:p-8">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="font-heading text-2xl font-extrabold text-navy-900">Get a free quote</p>
                <p class="mt-1 text-sm text-muted">Reply within 24 hours. No spam, ever.</p>
              </div>
              <span class="hidden sm:grid w-12 h-12 shrink-0 rounded-2xl bg-accent-50 text-accent-600 place-items-center">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              </span>
            </div>
            <!-- TODO: connect this form to the backend / CRM -->
            <form class="mt-6 grid gap-4" data-quote-form novalidate>
              <div class="grid gap-4 sm:grid-cols-2">
                <div><label class="field-label" for="q-name">Your name</label><input id="q-name" class="field" type="text" required placeholder="Full name" autocomplete="name"></div>
                <div><label class="field-label" for="q-phone">Phone / WhatsApp</label><input id="q-phone" class="field" type="tel" required placeholder="+91 98765 43210" autocomplete="tel"></div>
              </div>
              <div><label class="field-label" for="q-email">Work email</label><input id="q-email" class="field" type="email" placeholder="you@company.com" autocomplete="email"></div>
              <div>
                <label class="field-label" for="q-service">What do you need?</label>
                <select id="q-service" class="field" required>
                  <option value="">Choose a service</option>
                  ${services.map((s) => `<option>${s.t}</option>`).join('')}
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <span class="field-label">Budget (approx.)</span>
                <div class="grid grid-cols-3 gap-2">
                  <label class="cursor-pointer"><input type="radio" name="budget" class="peer sr-only" checked><span class="block text-center rounded-xl border border-line py-2.5 text-sm font-medium text-ink/70 peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white transition-colors">&lt; ₹2L</span></label>
                  <label class="cursor-pointer"><input type="radio" name="budget" class="peer sr-only"><span class="block text-center rounded-xl border border-line py-2.5 text-sm font-medium text-ink/70 peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white transition-colors">₹2–10L</span></label>
                  <label class="cursor-pointer"><input type="radio" name="budget" class="peer sr-only"><span class="block text-center rounded-xl border border-line py-2.5 text-sm font-medium text-ink/70 peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white transition-colors">₹10L+</span></label>
                </div>
              </div>
              <button type="submit" class="btn btn-accent btn-lg btn-pill w-full mt-1">Get My Free Quote ${ARROW()}</button>
              <p class="flex items-center justify-center gap-2 text-xs text-muted">
                <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Your details are safe and never shared.
              </p>
            </form>
            <div class="mt-6 text-center py-10" data-quote-done hidden>
              <span class="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center">${CHECK('w-8 h-8')}</span>
              <p class="mt-5 font-heading text-2xl font-extrabold text-navy-900">Thank you!</p>
              <p class="mt-2 text-muted">We've received your request and will call you within one business day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;

const stats = `
    <!-- ===================== 2. STATS BAND ===================== -->
    <!-- TODO: confirm these numbers with real company data -->
    <section class="bg-accent-500 text-navy-950">
      <div class="container py-10 md:py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        <div class="text-center lg:border-r border-navy-950/15"><p class="font-heading text-4xl md:text-5xl font-extrabold"><span data-count="50">50</span>+</p><p class="mt-1 text-sm font-medium text-navy-900/80">Projects delivered</p></div>
        <div class="text-center lg:border-r border-navy-950/15"><p class="font-heading text-4xl md:text-5xl font-extrabold"><span data-count="5">5</span>+</p><p class="mt-1 text-sm font-medium text-navy-900/80">Years in business</p></div>
        <div class="text-center lg:border-r border-navy-950/15"><p class="font-heading text-4xl md:text-5xl font-extrabold"><span data-count="12">12</span>+</p><p class="mt-1 text-sm font-medium text-navy-900/80">In-house experts</p></div>
        <div class="text-center"><p class="font-heading text-4xl md:text-5xl font-extrabold"><span data-count="95">95</span>%</p><p class="mt-1 text-sm font-medium text-navy-900/80">Clients who return</p></div>
      </div>
    </section>`;

const serviceCards = services.map((s, i) => {
  const dark = i % 2 === 1;
  return `
          <article class="stack-card" style="--n:${i}">
            <div class="grid md:grid-cols-2 overflow-hidden rounded-[2rem] border ${dark ? 'bg-navy-900 border-navy-800 text-white' : 'bg-white border-line'} shadow-lift min-h-[400px]">
              <div class="p-7 md:p-10 lg:p-12 flex flex-col">
                <span class="font-heading text-sm font-bold ${dark ? 'text-accent-300' : 'text-accent-600'}">${String(i + 1).padStart(2, '0')} / ${String(services.length).padStart(2, '0')}</span>
                <h3 class="mt-4 text-2xl md:text-[34px] font-extrabold tracking-tight leading-tight ${dark ? '' : 'text-navy-900'}">${s.t}</h3>
                <p class="mt-4 ${dark ? 'text-navy-100' : 'text-muted'} leading-relaxed">${s.d}</p>
                <ul class="mt-6 grid grid-cols-2 gap-3">
                  ${s.f.map((f) => `<li class="flex items-center gap-2 text-sm font-medium ${dark ? 'text-white' : 'text-ink'}"><span class="w-5 h-5 shrink-0 rounded-full grid place-items-center ${dark ? 'bg-accent-500 text-navy-950' : 'bg-accent-50 text-accent-600'}">${CHECK('w-3 h-3')}</span>${f}</li>`).join('')}
                </ul>
                <a href="${s.href}" class="mt-auto pt-8 inline-flex items-center gap-2 font-semibold ${dark ? 'text-accent-300 hover:text-white' : 'text-navy-900 hover:text-accent-600'} transition-colors">Explore service ${ARROW('w-4 h-4')}</a>
              </div>
              <div class="relative min-h-[220px] md:min-h-0 order-first md:order-none">
                <img src="${U(s.img, 900)}" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
              </div>
            </div>
          </article>`;
}).join('');

const servicesSec = `
    <!-- ===================== 3. SERVICES: stacking cards ===================== -->
    <section class="bg-canvas" id="services">
      <div class="container py-20 md:py-28">
        <div class="grid gap-6 lg:grid-cols-2 lg:items-end" data-reveal>
          <div>
            <span class="eyebrow">What we do</span>
            <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">Everything you need to go digital, under one roof</h2>
          </div>
          <p class="text-lg text-muted lg:pb-2">Scroll through our seven core services. Each one is delivered by our in-house team, with one point of contact from start to finish.</p>
        </div>
        <div class="mt-14 space-y-6 md:space-y-10">${serviceCards}
        </div>
      </div>
    </section>`;

const compareSec = `
    <!-- ===================== 4. COMPARISON TABLE ===================== -->
    <section class="bg-white">
      <div class="container py-20 md:py-28">
        <div class="max-w-2xl mx-auto text-center" data-reveal>
          <span class="eyebrow">Why Qpaix</span>
          <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">The best of both worlds</h2>
          <p class="mt-4 text-lg text-muted">Agency-level quality at a fair price, with the personal attention of a small team.</p>
        </div>
        <div class="mt-12 overflow-x-auto -mx-4 px-4 pb-2" data-reveal>
          <table class="w-full min-w-[720px] border-separate border-spacing-0 rounded-[1.75rem] overflow-hidden border border-line">
            <thead>
              <tr>
                <th class="text-left px-5 py-5 bg-canvas text-sm font-semibold text-muted w-[28%]">What matters</th>
                <th class="text-left px-5 py-5 bg-canvas text-sm font-semibold text-navy-900">Freelancer</th>
                <th class="text-left px-5 py-5 cmp-qpaix">
                  <div class="flex items-center gap-3"><img src="img/Qpaix-logo.png" alt="Qpaix" class="logo-white h-5 w-auto"><span class="badge bg-accent-500 text-navy-950">Best value</span></div>
                </th>
                <th class="text-left px-5 py-5 bg-canvas text-sm font-semibold text-navy-900">Big agency</th>
              </tr>
            </thead>
            <tbody>
              ${cmp.map(([label, a, b, c], i) => `<tr class="cmp-row">
                <th scope="row" class="text-left px-5 py-5 font-semibold text-navy-900 text-[15px] ${i ? 'border-t border-line' : ''}">${label}</th>
                ${cell(a).replace('<td class="', `<td class="${i ? 'border-t border-line ' : ''}`)}
                ${cell(b, true).replace('<td class="', `<td class="${i ? 'border-t border-white/10 ' : ''}`)}
                ${cell(c).replace('<td class="', `<td class="${i ? 'border-t border-line ' : ''}`)}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

const steps = [
  ['Discover', 'A free 30-minute call to understand your business, users and goals. You get a written scope and estimate within 24 hours.', 'Day 1–3'],
  ['Design', 'Wireframes and clickable screens, so you see and approve the product before a single line of code is written.', 'Week 1–3'],
  ['Build & Test', 'Two-week sprints with a live demo at the end of each. Our QA team tests every release on real devices.', 'Sprint by sprint'],
  ['Launch', 'We deploy to the cloud or app stores, set up monitoring and train your team to use the product with confidence.', 'Go-live week'],
  ['Grow', 'Ongoing support, updates and new features based on real user feedback and your business goals.', 'Ongoing'],
];
const processSec = `
    <!-- ===================== 5. PROCESS: scroll-progress timeline ===================== -->
    <section class="bg-canvas">
      <div class="container py-20 md:py-28 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="lg:sticky lg:top-32 self-start" data-reveal>
          <span class="eyebrow">How we work</span>
          <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">A clear path from idea to launch</h2>
          <p class="mt-5 text-lg text-muted">No surprises. You always know what's happening, what's next and what it costs.</p>
          <a href="#quote" class="btn btn-primary btn-pill mt-8">Start with a free call</a>
        </div>
        <ol class="relative" data-timeline>
          <div class="absolute left-6 top-6 bottom-6 w-[2px] bg-line rounded-full" aria-hidden="true"><div class="tl-fill w-full h-full bg-gradient-to-b from-navy-900 to-accent-500 rounded-full"></div></div>
          ${steps.map(([t, d, time], i) => `
          <li class="tl-step relative pl-20 ${i < steps.length - 1 ? 'pb-12' : ''}">
            <span class="tl-dot absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-line text-navy-900 grid place-items-center font-heading font-extrabold">${String(i + 1).padStart(2, '0')}</span>
            <div class="rounded-[1.5rem] bg-white border border-line p-6 md:p-7">
              <div class="flex flex-wrap items-center justify-between gap-2"><h3 class="text-xl font-bold text-navy-900">${t}</h3><span class="badge">${time}</span></div>
              <p class="mt-3 text-muted leading-relaxed">${d}</p>
            </div>
          </li>`).join('')}
        </ol>
      </div>
    </section>`;

const workSec = `
    <!-- ===================== 6. WORK: drag carousel ===================== -->
    <!-- TODO: replace sample projects with real case studies -->
    <section class="bg-white overflow-hidden" id="work">
      <div class="container py-20 md:py-28">
        <div class="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div class="max-w-2xl">
            <span class="eyebrow">Our work</span>
            <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">Results our clients can measure</h2>
          </div>
          <div class="flex items-center gap-3">
            <button type="button" data-drag-prev class="w-12 h-12 rounded-full border border-line text-navy-900 grid place-items-center hover:bg-navy-900 hover:text-accent-400 hover:border-navy-900 transition-colors" aria-label="Previous projects">${ARROW('w-5 h-5 rotate-180')}</button>
            <button type="button" data-drag-next class="w-12 h-12 rounded-full bg-navy-900 text-accent-400 grid place-items-center hover:bg-navy-700 transition-colors" aria-label="Next projects">${ARROW()}</button>
          </div>
        </div>
        <div class="mt-12 flex gap-6 overflow-x-auto pb-2 drag-track" data-drag>
          ${work.map((w) => `
          <a href="portfolio.html" class="zoom-img group shrink-0 w-[82%] sm:w-[46%] lg:w-[31.5%] select-none" draggable="false">
            <div class="relative rounded-[1.75rem] overflow-hidden aspect-[4/3]">
              <img src="${U(w.img, 800)}" alt="${w.t}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable="false">
              <span class="badge absolute left-4 top-4 bg-white text-navy-900">${w.tag}</span>
            </div>
            <h3 class="mt-5 text-xl font-bold text-navy-900 group-hover:text-accent-600 transition-colors">${w.t}</h3>
            <div class="mt-3 flex gap-6">
              ${w.m.map(([n, l]) => `<p><span class="font-heading text-2xl font-extrabold text-navy-900">${n}</span> <span class="text-sm text-muted">${l}</span></p>`).join('')}
            </div>
          </a>`).join('')}
        </div>
        <div class="mt-8 h-1 rounded-full bg-line overflow-hidden"><div class="h-full rounded-full bg-navy-900 transition-[margin] duration-150" data-drag-bar></div></div>
      </div>
    </section>`;

const indSec = `
    <!-- ===================== 7. INDUSTRIES: hover-reveal list ===================== -->
    <section class="bg-canvas">
      <div class="container py-20 md:py-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="lg:sticky lg:top-32 self-start" data-reveal>
          <span class="eyebrow">Industries</span>
          <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">We understand how your industry works</h2>
          <p class="mt-5 text-lg text-muted">Hover over an industry to see the kind of work we do there.</p>
        </div>
        <ul class="border-t border-navy-900/10" data-ind>
          ${industries.map(([t, d, , slug], i) => `
          <li><a href="industries.html#${slug}" class="ind-row flex items-center gap-5 py-6 border-b border-navy-900/10">
            <span class="font-heading text-sm font-bold text-accent-600 w-7">${String(i + 1).padStart(2, '0')}</span>
            <span class="flex-1 min-w-0"><span class="ind-title block font-heading text-2xl md:text-[32px] font-extrabold text-navy-900">${t}</span><span class="block mt-1 text-sm text-muted">${d}</span></span>
            <span class="ind-arrow w-11 h-11 shrink-0 rounded-full border border-navy-900/15 text-navy-900 grid place-items-center">${ARROW('w-4 h-4')}</span>
          </a></li>`).join('')}
        </ul>
      </div>
      <div class="ind-preview" aria-hidden="true">${industries.map(([, , img]) => `<img src="${U(img, 600)}" alt="" loading="lazy">`).join('')}</div>
    </section>`;

const plan = (name, sub, best, feats, cta, dark) => `
          <div class="plan-card relative rounded-[2rem] p-7 md:p-9 flex flex-col ${dark ? 'bg-navy-900 text-white shadow-lift lg:-mt-6 lg:mb-6' : 'bg-white border border-line'}" data-reveal>
            ${dark ? '<span class="absolute -top-3.5 left-1/2 -translate-x-1/2 badge bg-accent-500 text-navy-950 shadow-card">Most popular</span>' : ''}
            <p class="font-heading text-2xl font-extrabold ${dark ? '' : 'text-navy-900'}">${name}</p>
            <p class="mt-2 text-sm ${dark ? 'text-navy-100' : 'text-muted'}">${sub}</p>
            <p class="mt-6 text-sm font-semibold ${dark ? 'text-accent-300' : 'text-accent-600'}">${best}</p>
            <ul class="mt-6 space-y-3 flex-1">
              ${feats.map((f) => `<li class="flex items-start gap-3 text-[15px] ${dark ? 'text-white' : 'text-ink/80'}"><span class="mt-0.5 w-5 h-5 shrink-0 rounded-full grid place-items-center ${dark ? 'bg-accent-500 text-navy-950' : 'bg-accent-50 text-accent-600'}">${CHECK('w-3 h-3')}</span>${f}</li>`).join('')}
            </ul>
            <a href="#quote" class="btn ${dark ? 'btn-accent' : 'btn-outline'} btn-pill w-full mt-8">${cta}</a>
          </div>`;
const plansSec = `
    <!-- ===================== 8. ENGAGEMENT MODELS ===================== -->
    <section class="bg-white">
      <div class="container py-20 md:py-28">
        <div class="max-w-2xl mx-auto text-center" data-reveal>
          <span class="eyebrow">How to work with us</span>
          <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">Pick the model that fits your budget</h2>
          <p class="mt-4 text-lg text-muted">Every plan includes NDA, full code ownership and support after launch.</p>
        </div>
        <div class="mt-16 grid gap-6 lg:grid-cols-3 lg:items-start">
          ${plan('Fixed Price', 'For projects with a clear scope.', 'Best for: websites, MVPs, first versions', ['Fixed cost agreed upfront', 'Clear milestones & timeline', 'Weekly progress demos', '30 days free support'], 'Get a fixed quote', false)}
          ${plan('Dedicated Team', 'Your own team, managed by us.', 'Best for: growing products, long-term work', ['Developers, QA & PM on monthly plan', 'Scale the team up or down', 'Daily updates on WhatsApp / Slack', 'Priority support'], 'Build my team', true)}
          ${plan('Hourly / Support', 'Flexible help when you need it.', 'Best for: fixes, upgrades, small tasks', ['Pay only for hours used', 'Bug fixes & improvements', 'Monthly maintenance plans', 'Quick response time'], 'Talk to us', false)}
        </div>
      </div>
    </section>`;

const faqSec = `
    <!-- ===================== 9. FAQ (two columns) ===================== -->
    <section class="bg-canvas">
      <div class="container py-20 md:py-28">
        <div class="max-w-2xl" data-reveal>
          <span class="eyebrow">FAQ</span>
          <h2 class="mt-4 text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.08]">Good questions, honest answers</h2>
        </div>
        <div class="mt-12 grid gap-4 md:grid-cols-2 md:items-start">
          ${[0, 1].map((col) => `<div class="space-y-4">${faqs.filter((_, i) => i % 2 === col).map(([q, a]) => `
            <details class="faq rounded-[1.5rem] bg-white border border-line" data-reveal>
              <summary class="flex items-center justify-between gap-4 p-6 font-semibold text-navy-900">${q}
                <span class="faq-icon shrink-0 w-9 h-9 rounded-full bg-canvas grid place-items-center text-lg transition-transform">+</span></summary>
              <p class="px-6 pb-6 -mt-1 text-muted leading-relaxed">${a}</p>
            </details>`).join('')}</div>`).join('')}
        </div>
      </div>
    </section>`;

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Qpaix | Software, AI &amp; Cloud Development Company in Ahmedabad</title>
  <meta name="description" content="Qpaix Infitech builds custom software, AI, data analytics, cloud, IoT and drone solutions for growing businesses across India. Get a free quote in 24 hours.">
  <link rel="icon" type="image/png" href="img/Qpaix-logo.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://images.unsplash.com">

  <script>document.documentElement.classList.add('js-reveal');</script>
  <script src="https://cdn.tailwindcss.com/3.4.16"></script>
  <script src="js/tailwind-config.js"></script>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/home-v3.css">
</head>
<!-- HOME PAGE · VERSION 3 : light theme, typing hero + quote form, full-screen overlay menu
     (this file is generated; edit freely – it is plain HTML) -->
<body data-page="home" data-version="v3" data-header="overlay">

  <div id="site-header"></div>

  <main id="main">
${hero}
${stats}
${servicesSec}
${compareSec}
${processSec}
${workSec}
${indSec}
${plansSec}
${faqSec}

  </main>

  <div id="site-footer"></div>

  <script src="js/components.js"></script>
  <script src="js/main.js"></script>
  <script src="js/home-v3.js"></script>
</body>
</html>
`;
fs.writeFileSync(out, page);
console.log('written', out, page.length, 'chars');

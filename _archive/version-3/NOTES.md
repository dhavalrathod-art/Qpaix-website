# Home page – Version 3 (archived)

Removed from the live site on 2026-11-05 at the user's request. Kept here so the ideas
can be reused later. Nothing in this folder is linked from the site.

## Files
| File | What it is |
|---|---|
| `index-v3.html` | The full page (was in the site root) |
| `home-v3.css` | Page styles (was `css/home-v3.css`) |
| `home-v3.js` | Page scripts (was `js/home-v3.js`) |
| `build-v3.js` | Node script that generated `index-v3.html` from data |

To bring it back: move `index-v3.html` to the root, `home-v3.css` to `css/`, `home-v3.js` to `js/`,
and add `{ key: 'v3', label: 'Version 3', desc: '...', href: 'index-v3.html' }` to `HOME_VERSIONS`
in `js/components.js`.

## Still in the shared code (unused for now, ready to reuse)
- `js/components.js`: `data-header="overlay"` → minimal header + **full-screen overlay menu**
  (`overlayHeader`) and the **light footer** (`lightFooter`, underline links `.u-link`).
- `css/style.css`: `.ov-menu`, `.ov-item`, `.ov-link-text`, `.site-header--overlay`, `.u-link`.

## Design summary
Theme: light / white, navy text, cyan accents. Focus on lead generation and scroll interactions.

1. **Header** – logo, phone, cyan "Book a Call", navy "Menu ☰" pill. Opens a full-screen navy
   menu that reveals as a circle from the top-right; big numbered links (01–08) slide in one by
   one, Home shows Version chips, side column has services, contact, socials. Esc/Close shuts it.
2. **Hero** – light grid background with cyan glow; rating badge with avatar stack;
   "We build *[typing word]* for growing businesses." (Mobile Apps → AI Solutions → Dashboards →
   Cloud Systems → Business Software); 3 mini stats (24 hr quote, 100% code ownership, NDA).
   Right side: **"Get a free quote" form** – name, phone/WhatsApp, email, service, budget chips
   (< ₹2L / ₹2–10L / ₹10L+), success message on submit (front-end only).
3. **Stats band** – full-width cyan strip with 4 counting numbers.
4. **Services** – 7 **stacking sticky cards** (alternating white / navy), text + 4 feature ticks + image.
5. **Why Qpaix** – **comparison table** Freelancer vs Qpaix (highlighted navy column) vs Big agency.
6. **Process** – 5-step **vertical timeline** whose line fills on scroll; sticky heading on the left.
7. **Our work** – 6-project **drag carousel** with prev/next buttons and a progress bar.
8. **Industries** – 8 big text rows; on desktop hover an **image preview follows the cursor**.
9. **Engagement models** – Fixed Price / Dedicated Team ("Most popular", navy) / Hourly.
10. **FAQ** – 6 questions in two columns.
11. **Footer** – light footer: big "Let's build something your customers love.", large email
    and phone, links with grow-from-left underline on hover.

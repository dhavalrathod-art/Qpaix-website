# Admin panel – content fields

The front-end pages are built so every dynamic part maps to a field the admin panel will manage.
Each list on the site uses **one repeated HTML template** (marked with an HTML comment such as
`<!-- BLOG CARD · admin fields: ... -->`), so the backend only needs to loop over records and fill
these fields in.

---

## 1. Blog posts
Used on: `blog.html` (list), `blog/<slug>.html` (details), Home page "Insights" section.

| Field | Type | Example / notes |
|---|---|---|
| `title` | text | How Indian SMEs can start using AI without a big budget |
| `slug` | text, unique | `ai-for-small-business` → URL `/blog/ai-for-small-business` |
| `category` | select (from Categories) | AI, Software, Cloud, Data, Drones, IoT, Design, Guides |
| `excerpt` | text (1–2 lines) | Shown on cards and under the title on the details page |
| `cover_image` | image, 16:10, min 1600×1000 | Card, featured block and details page header |
| `content` | rich text | Allowed: H2, H3, paragraph, bold, link, bullet / numbered list, quote (with author), image with caption |
| `author` | relation → Team member | Shows photo, name and designation |
| `published_date` | date | Newest first |
| `read_time` | number (minutes) | Can be auto-calculated: words ÷ 200 |
| `tags` | list of text | Shown at the end of the article |
| `is_featured` | yes / no | One post shown in the big "Featured" block on the blog list |
| `status` | draft / published | Only published posts appear |
| `seo_title`, `seo_description` | text | `<title>` and meta description; fall back to title / excerpt |

**Automatic on the details page (no admin field needed):** table of contents (built from H2
headings), reading progress bar, share buttons, previous / next article, 3 related posts
(same category first).

## 2. Blog categories
| Field | Type |
|---|---|
| `name` | text |
| `slug` | text |
| `order` | number |

## 3. Team members
Used on: `about.html` (team slider), blog author boxes.

| Field | Type | Notes |
|---|---|---|
| `name` | text | |
| `designation` | text | e.g. Java Developer, Web Designer TL |
| `photo` | image, **4:5 ratio**, min 800×1000 | Same size for everyone looks best |
| `linkedin_url` | url | LinkedIn icon on the photo |
| `order` | number | Position in the slider |
| `is_active` | yes / no | Hide people who left |

## 4. CEO / leadership (About page)
`name`, `title`, `photo` (4:5), `message` (rich text), `phone`, `email`.

## 5. Portfolio / case studies (coming next)
Planned fields: `title`, `slug`, `client_name`, `industry`, `services` (multi), `cover_image`,
`gallery` (images), `short_description`, `challenge`, `solution`, `results` (list of
number + label, e.g. "40%" / "less admin time"), `tech_stack` (tags), `testimonial`
(optional), `is_featured`, `order`.

## 6. Contact form submissions
Form on `contact.html` sends: `name`*, `phone`*, `email`*, `company`, `services` (multi),
`budget`, `timeline`, `message`*, `source`, `nda_requested` (yes/no). (* = required)

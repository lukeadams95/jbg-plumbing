# JBG Commercial Plumbing website

Astro static site built from the Claude Design handoff in `design/`. The
design file is `design/project/JBG Homepage.dc.html` (the homepage plus 21
inner pages), and the design chats are in `design/chats/`. The site outputs
plain HTML/CSS with a small script, and can be hosted on any static host.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview
```

## How it is put together

| Path | What it is |
| --- | --- |
| `tools/convert.mjs` | Converts the prototype template into Astro components. Run `npm run convert` after re-exporting the design. |
| `src/components/generated/` | **Generated.** Header, footer, CTA band, mobile call bar and one component per page. Don't hand-edit these: the next conversion overwrites them. |
| `src/styles/generated.css` | **Generated.** Hover and focus styles from the prototype's `style-hover` / `style-focus`. |
| `src/data/vals.ts` | Build-time data (nav, service cards, footer menus, review lists, icons). A static port of the prototype's `renderVals()`. |
| `src/data/reviews-raw.js` | Google reviews, copied from `design/project/reviews-data.js`. |
| `src/styles/responsive.css` | The prototype's width-dependent values (`svcCols`, `gt2`, `fb3` and others) as CSS variables with the same breakpoints. |
| `src/styles/base.css` | Global styles from the prototype's `<helmet>`. |
| `src/scripts/site.ts` | Client behavior: mobile menu, review "See more" and "Load more", the rotating word on /services/, and form validation. |
| `src/scripts/forms.ts` | Form submission stub (see below). |
| `src/pages/[...slug].astro` | One route per page in `PAGE_PATH` (`src/data/vals.ts`). |
| `src/pages/reviews.json.ts` | All reviews. "Load more reviews" fetches this file, so pages only ship the first 6 or 30. |
| `astro.config.mjs` | Site URL and redirects from the old jbgplumbingtx.com URLs. |

### Prototype → site mapping

- Hash routes (`#/about-us/`) are now real paths (`/about-us/`), and jump links (`/services/water-heaters/#water-heater-installation-repair`) keep their anchors.
- `isDesktop` / `isMobile` blocks (1080px) and the CTA badge variants (900px) are both rendered, then shown or hidden with media queries.
- Header dropdowns open on hover or keyboard focus with CSS. The prototype used `mouseenter`.
- Form validation rules and messages match the prototype's `qSubmit` and `cSubmit`. Successful quote and contact submissions go to `/thank-you/`. The CTA band form shows its inline thank-you.

## Forms

All three forms (Request a Quote, Contact Us, the CTA band) post `multipart/form-data` to
`PUBLIC_FORM_ENDPOINT`. Copy `.env.example` to `.env` and set it before
building. While it is empty, submissions are only logged to the browser
console, so wire it up before going live. Each submission includes a `form`
field (`quote`, `contact` or `cta`). The quote form also sends `work_type` and
any attached `files`. The contact form sends `contact_method`.

## Redirects

`astro.config.mjs` maps the old live URLs
(`/commercial-plumber-services/...`, `/latest-from-jbg/...`,
`/locations/texas/...`) to the new paths. On a plain static host Astro writes a
meta-refresh page for each one. Hosts with real redirect support (Netlify,
Vercel, Cloudflare) can serve 301s instead through their Astro adapter.

## Images

Local images are in `public/uploads/`. These are the files from
`design/project/uploads/` that the design uses. Several heroes and photos still
hot-link `i0.wp.com/jbgplumbingtx.com/wp-content/...`, as the design does.
Download them into `public/uploads/` before the old WordPress site is retired.

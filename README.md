# Wikitech Group — website

Single-page marketing site for Wikitech Group, plus About, Contact and legal pages.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react.
No animation, charting or UI library — motion is CSS + `IntersectionObserver`, and the
charts, diagrams and flags are hand-authored SVG.

Two Python scripts in `scripts/` build the static assets. They are run by hand, not
during `next build`; their output is committed.

```bash
python scripts/extract-logo.py    # seal  -> public/brand/ + src/app/icon.png
python scripts/build-images.py    # photos -> public/img/ + src/data/images.ts
```

---

## Structure

```
src/
  app/
    page.tsx              homepage — every section, in order
    about/ contact/
    privacy-policy/ terms/
    globals.css           the design system (tokens + base + utilities)
    icon.png  apple-icon.png  opengraph-image.tsx  sitemap.ts  robots.ts
  components/
    brand/Logo.tsx        the seal + horizontal lockup
    layout/               header, footer, legal page shell
    sections/             one file per homepage section
    ui/                   Button, Section, Reveal, CardImage, SectionBackdrop, Flag
  data/                   all copy and catalog content
  lib/cn.ts
public/
  brand/                  the seal, as WebP with alpha
  img/                    35 treated photographs
scripts/                  asset build scripts (Python + Pillow)
```

**Content lives in `src/data/`, not in components.** Editing services, ERP platforms,
tax regions or case studies means editing those files only.

---

## Design system

Everything is defined once in the `@theme` block of `src/app/globals.css`.

**Colour** is derived from the corporate seal. The logo ink (hue ~228°) is
`--color-brand-700: #12338a`; the rest of the scale extends it. Accents
(`accent`, `signal`) are deliberately rare — they mark data flow and status, not decoration.

**Chart colours** are `#3760c8 / #0d96a6 / #b9821a`, validated for colour-vision
deficiency separation and contrast against a light surface. If you add a series, re-validate
rather than picking by eye.

**Type:** Inter Tight (display) · Inter (body) · IBM Plex Mono (labels, data, eyebrows).
Sizes are `--text-display-*` clamps — use those, not ad-hoc font sizes.

**Layout:** `.shell` sets the page gutter, `.section` the vertical rhythm. Use them instead
of per-section padding so the page stays one document.

**Motion** is the `Reveal` component and CSS transitions only. `prefers-reduced-motion`
is honoured globally, and `Reveal` skips anything already on screen so nothing flashes on load.

**Photography** is handled in one place, `scripts/build-images.py`, with two treatments:

* `ground` — dimmed, for the images behind dark sections. No colour cast; white type
  sits on top, so these only need to be dark. Used through `SectionBackdrop`, which
  adds an even neutral veil (`dim`, 0–1) over the photograph.
* `card` — the photograph as shot. Used through `CardImage`.
* `cutout` — for client-supplied artwork shot on a white studio backdrop. The
  backdrop is keyed out by flooding inward from the border, so only white that is
  connected to an edge goes transparent and the subject's white shirt survives.
  Listed in the `LOCAL` table rather than `ASSETS`, since it is read from disk.

Because the dark sections now carry photographs rather than flat navy, the panels on
top of them (the hero stack, the OT/IT diagram, the AI architecture, the Why-us
columns) use a near-opaque `bg-brand-950/80` backing rather than a translucent wash —
without it, busy image detail reads straight through the text.

To change a picture, edit its entry in the `ASSETS` table in `scripts/build-images.py`
and re-run it. Every image is `alt=""` — the heading beside it already carries the
meaning, so they are decorative by design.

**Generated filenames carry a content hash** (`hero.16b9ffb0.webp`), and the scripts
write the paths into `src/data/images.ts` and `src/data/brand.ts`. Nothing references
an image path by hand. This exists because swapping a photograph used to keep the same
URL: Next's image optimiser and the browser both went on serving the previous version
until someone cleared `.next/cache` and hard-refreshed. A changed picture is now a
different URL, which no cache can get wrong. Both scripts clear their output directory
first, so superseded hashes do not accumulate.

---

## Content policy

No client names, statistics, testimonials, certifications, partnerships, founding dates or
headcounts appear anywhere on this site, because none were supplied. Two consequences:

- `src/data/cases.ts` describes engagements by **shape** — challenge, solution, technology,
  scope of outcome. Replace each `outcome` with a published figure once it is cleared.
- The forecasting chart is labelled in the UI as an illustrative demonstration of model
  structure. Do not relabel it as client data.

### To complete before launch

| Where | What is needed |
|---|---|
| `src/data/site.ts` | `url` is `https://wikitechgroup.com` — set the real domain (used by canonical URLs, sitemap, OG tags). |
| `src/data/site.ts` | `email` is the address from the project brief (a Gmail address). A domain mailbox would read as more credible to enterprise buyers. |
| `src/app/privacy-policy/page.tsx` | Registered entity name and address; list of processors. Marked inline with `<Tbc>`. |
| `src/app/terms/page.tsx` | Governing jurisdiction. Marked inline with `<Tbc>`. |
| `src/app/contact/page.tsx` | Phone, address and office hours — an HTML comment marks the spot. |
| `src/components/sections/LeadershipSection.tsx` | The owner's full name, shown as a `<span class="tbc">` placeholder. A short statement from them can go where the HTML comment marks it — nothing is written on their behalf. |
| `src/app/about/page.tsx` | Team bios, formation date, registrations — an HTML comment marks the spot. |

The `<Tbc>` markers render as a small highlighted note, so unfinished legal details are
visible rather than silently wrong.

---

## Forms

The consultation builder and the contact form assemble a structured message and hand it to
the visitor's email client via `mailto:`. Nothing is posted to a server and nothing is stored,
which is why the privacy policy can say so plainly.

Both build their payload in one place and then open the link — to send to a CRM instead,
replace that single step with a `POST`. Search for `ponytail:` in
`src/components/sections/QuoteBuilder.tsx` and `ContactForm.tsx`.

---

## Logo

The supplied asset (`wikitech group logo.jpeg`) is a photograph of the seal printed on
textured stock: rotated 2.1°, on a grey studio background. `scripts/extract-logo.py`
deskews it about the seal's centre, keys the paper out into an alpha channel, and re-inks
the mark in the exact brand blue — so what the site shows is the client's own artwork,
not a redrawing.

It produces:

| File | Use |
|---|---|
| `public/brand/seal.<hash>.webp` (256px) | header and footer lockups |
| `public/brand/seal-light.<hash>.webp` (512px) | white version, for dark sections |
| `public/brand/seal-large.<hash>.webp` (512px) | large use on light grounds |
| `src/app/icon.png`, `apple-icon.png` | favicons — the seal on a white disc, so it reads on light and dark browser chrome |
| `public/brand/seal-light-og.png` | read from disk by the OG image route (satori cannot decode WebP) |

Two components consume them: `Seal` (the mark, `tone="brand" | "light"`) and
`WikitechLogo` (the mark plus the wordmark). The seal carries the company name in its
ring, but that type is unreadable below ~96px, which is why the header pairs it with a
typeset wordmark rather than relying on the mark alone.

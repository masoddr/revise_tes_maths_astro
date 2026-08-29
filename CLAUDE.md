# CLAUDE.md

Instructions for AI assistants working on **revise-tes-maths.fr**.

## Project

Marketing site for a private maths/science tutor (collège & lycée, visio or Paris). Goal: conversion to a first interview, not generic tutoring marketplace copy.

- Live site: `https://revise-tes-maths.fr`
- Static Astro 5 site, Tailwind 3, React island integration (no `.tsx` files today)
- Hosted on Vercel (`output: 'static'`)
- Language: French (`lang="fr"`). UI copy, SEO, and commit messages in French. Code comments in English.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run preview
```

No test suite. After UI changes, run `npm run build` and check the affected routes.

## Layout

```
src/pages/          # File-based routes (*.astro)
src/layouts/        # Layout.astro — SEO, OG, JSON-LD, gtag, Vercel Analytics
src/components/     # Reusable .astro components
src/styles/         # global.css (Tailwind + Inter)
src/scripts/        # Client-side demos (canvas / TS)
src/data/           # Static data (e.g. python notebooks)
public/             # Images, PDFs, logos
devbook_md/         # Product/SEO/ads docs (read before rewriting copy or landing pages)
```

Typical page shell:

```astro
<Layout title="..." description="...">
  <Header />
  <!-- content -->
  <Footer />
</Layout>
```

Reuse existing components (`Header`, `Footer`, `ContactForm`, `Breadcrumbs`, `FAQ`, `WhatsAppButton`, …) instead of duplicating markup.

## Routing map

| Area | Paths |
| --- | --- |
| Home | `/` |
| Levels | `/3eme`, `/seconde`, `/premiere`, `/terminale` (+ `/cours`, `/exercices`, annales) |
| Offers | `/cours-maths-visio`, `/cours-paris`, `/cours-collectifs-maths`, `/enseignement-python`, `/tarifs`, `/stage-preparation-bac-maths` |
| Ads landing | `/cours-maths-google-ads` (own header: `HeaderLanding`) |
| Content | `/blog`, `/blog/<slug>`, `/annales`, `/a-propos` |
| Demos | `/demo/derivee-tangente`, `/demo/frequence-cardiaque`, `/demo/classification-chiffres` |

New blog post: add `src/pages/blog/<slug>.astro` **and** an entry in the `articles` array in `src/pages/blog/index.astro`.

## Tone and UX

Follow `devbook_md/devbook.md`:

- Primary CTA: **Demander un entretien** (or “Demander un premier échange gratuit” on home). Link to `#contact` when the form is on the page.
- Calm, precise, institutional. Short sentences. No aggressive superlatives, fake counters, or marketplace tone.
- Proof: 10+ years, destinations (McGill, Bocconi, King’s).
- One H1 per page. Keep lists to 3–5 items. High contrast, visible buttons.

## Design

- Font: Inter (`font-sans`). Content width: `max-w-[1040px]` (blog articles often `max-w-4xl`).
- Background white / light blue washes (`from-blue-50`). Text anthracite (`text-gray-900`, Tailwind `primary` = `#1f2937`).
- Accent: blue (`text-blue-600`, `bg-blue-50`). Orange reserved for small badges (e.g. “-30%”), not primary CTAs.
- Primary buttons: `bg-gray-900 text-white rounded-xl` (or `rounded-lg`), hover `bg-gray-800`.
- Prefer Tailwind utilities. Put page-specific CSS in a `<style>` block on that page.

## Code conventions

- Prefer `.astro` pages and components. Add React only for interactive islands that Astro cannot handle cleanly.
- Type frontmatter with TypeScript. Path alias: `@/*` → `./src/*`.
- Do not invent new CSS frameworks, UI kits, or backend services.
- Do not commit `.env`. Contact form uses Web3Forms; access key via `PUBLIC_WEB3FORMS_ACCESS_KEY` (see `devbook_md/FORM_SETUP.md`). Never hardcode new secrets.
- Keep Google tag `AW-17870752943` and Vercel Analytics in `Layout.astro`. Do not remove tracking without an explicit request.
- WhatsApp number used on ads/annales pages: `33616635187`. Contact email: `contact@revise-tes-maths.fr`.
- PDFs live under `public/pdf/`. Do not move or rename them without updating every link on the level pages.

## SEO

Every page must pass `title` and `description` to `Layout`. Canonical and Open Graph are generated there. After adding a public route, confirm the canonical path matches the file route.

## Docs (not the site)

`mathadata/` and `script_appel.md` are interview/ops notes, not site source. Do not expose them as routes.
`devbook_md/` is the source of truth for copy, SEO keywords, ads landings, and form setup.

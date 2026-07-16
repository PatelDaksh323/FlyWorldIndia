# Flyworld India — Website Rebuild

A fast, code-built, lead-generation website for **Flyworld India**, an overseas
education & immigration consultancy in Ahmedabad. It repositions Flyworld from a
Canada-focused consultancy into a **global mobility partner** (Study Abroad,
Europe Work Permits, Visitor Visas, PR) with a signature **3D globe** hero.

> This repo implements the decisions in `PRD` and `CLAUDE.md`. Read those first.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.ts` — never hardcode colours)
- **react-router-dom** for routing, **react-helmet-async** for per-page SEO
- **Three.js** for the one homepage globe (lazy-loaded + code-split)
- **Supabase** for the enquiry form (RLS-protected)
- **Bun** as the package manager

## Getting started

```bash
bun install
cp .env.example .env      # fill in Supabase + contact details
bun run dev               # http://localhost:5173
bun run build             # type-check + production build to dist/
bun run preview           # preview the production build
```

### Environment variables

Only `VITE_`-prefixed vars belong in `.env` — they are **bundled into public
browser JS**, so they must contain **no secrets**. The Supabase anon key is
public by design and protected by Row Level Security. See `.env.example`.

If Supabase env vars are missing, the enquiry form degrades gracefully to its
WhatsApp fallback instead of crashing.

## Architecture: one template, many pages

The key decision (see `CLAUDE.md`). Every country/service page is rendered by a
single template from a single data file:

- `src/data/countries.ts` — the data (Study Abroad, Work Permit, Visitor Visa)
- `src/pages/CountryPage.tsx` — the template
- `src/components/shared/ServiceHub.tsx` — the hub listing per service

**Adding a country = adding one object to `COUNTRIES`** (and its route to the
sitemap script). No new page file.

## The 3D globe

- Lives on the homepage **only** (`src/components/globe/`).
- **Lazy-loaded + code-split**: Three.js (~470 KB) is a separate chunk that only
  downloads when the globe renders — it never blocks first paint (PRD H-2).
- **Graceful fallback**: a pure-CSS globe shows if WebGL is unavailable or the
  chunk is still loading (`GlobeFallback.tsx`, PRD H-3).
- **Respects `prefers-reduced-motion`**: renders a single static frame.
- Adding a destination = one `{lat, lon}` in `src/components/globe/destinations.ts`.

## Content integrity (non-negotiable)

- **No invented figures.** Unverified fees/timelines are marked `// VERIFY` in
  `src/data/countries.ts` and render as "to be confirmed" until Rahul confirms
  them from official sources. Grep for `VERIFY` to find them all.
- **No fake testimonials or team details.** The current ones are clearly-marked
  placeholders (`src/data/content.ts`, `src/pages/Team.tsx`) — replace before launch.
- **Contact details** default to placeholders in `src/config/site.ts` — set the
  real WhatsApp number, phone, email and address via `.env` before launch.

## SEO

- Per-page `<title>`/meta/canonical/OG via `src/components/shared/Seo.tsx`.
- `FAQPage` + `BreadcrumbList` structured data on country pages.
- `public/robots.txt` and a generated `public/sitemap.xml` (`scripts/gen-sitemap.mjs`,
  runs on `prebuild`).

### ⚠ Prerendering (biggest technical risk — see PRD §9)

This is a Vite SPA. For reliable indexing, add a prerender step so each route
emits real static HTML at build time (e.g. `vite-react-ssg`). `react-helmet-async`
alone is the minimum, **not sufficient**. This is the top pre-launch task.

### ⚠ Preserve old URLs (see PRD §9 risk 2)

`flyworldindia.com` has ranked for years. Before finalising routes, crawl the old
site, map every URL, and add 301 redirects (`deploy/redirects.map` is a starter).
Changing URLs without redirects loses hard-earned organic traffic.

## Backend (Supabase)

`supabase/migrations/0001_create_enquiries.sql` creates the `enquiries` table
with **Row Level Security**: the public may `INSERT` only, never `SELECT`.
Run the verification snippet at the bottom of that file before launch.

## Deployment

Static files behind a CDN (see PRD §7.2). The origin is a personal VPS, so the
CDN safety net must be built, not assumed:

1. `bun run build` → static files in `dist/`.
2. Serve `dist/` with **nginx** (gzip + cache headers) — see `deploy/nginx.conf.sample`.
   SPA routes need a `try_files ... /index.html` fallback.
3. Put **Cloudflare (free)** in front to absorb traffic spikes and DDoS.
4. **SSL** via certbot; enforce HTTPS.
5. Install analytics and record a baseline **before** launch (PRD §4).

## Project status

Phase 1 foundation is in place: homepage + globe, the country template with all
Phase-1 destinations, all core pages, the enquiry form, SEO scaffolding and the
Supabase migration. Remaining pre-launch work is tracked in `CLAUDE.md` (prerender,
301 map, and the real content/figures from Rahul).

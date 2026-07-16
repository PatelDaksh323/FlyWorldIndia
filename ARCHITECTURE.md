# Architecture & scaling — "10,000 people click at once"

The PRD requires the site to survive large, sudden traffic ("10,000 people
click at once", §7.2). This document explains how the architecture meets that,
and where the limits are.

## The core idea: nothing dynamic on the hot path

The website is **100% static files** (HTML, CSS, JS, images) produced by
`bun run build`. Serving a static file is the cheapest thing a server can do,
and it can be cached at the edge. The only dynamic action a visitor can take is
**submitting the enquiry form**, and that runs on separate infrastructure. So a
traffic spike hits static, cached assets — not application code or a database.

```
                    ┌─────────────────────────────┐
   10k visitors ──▶ │  Cloudflare CDN (free plan)  │  ◀── absorbs the spike
                    │  edge cache + DDoS shield    │      at the edge
                    └──────────────┬──────────────┘
                          cache miss│(rare)
                                    ▼
                    ┌─────────────────────────────┐
                    │  nginx on the VPS (origin)   │  static dist/ only
                    │  gzip + immutable cache hdrs │  gzip + immutable caching
                    └─────────────────────────────┘

   Enquiry form  ──▶  Supabase Edge Function  ──▶  Postgres (RLS + rate limit)
   (separate path)     validate · rate limit        public INSERT only
```

## Why this scales

1. **Static build behind a CDN.** Hashed assets (`/assets/*.[hash].js`) are
   immutable and served with `Cache-Control: public, immutable, max-age=1y`
   (see `deploy/nginx.conf.sample`). Cloudflare caches them at the edge, so the
   overwhelming majority of requests are answered by Cloudflare and never reach
   the VPS. One box can therefore back a very large audience.

2. **Cloudflare in front is the safety net.** The origin is a personal VPS, so
   unlike Vercel/Netlify the CDN is **not automatic — it must be set up**.
   Cloudflare's free plan absorbs spikes and DDoS before they reach the box.
   Without it, one viral ad could take the site down.

3. **The form never touches the origin.** The enquiry form calls a **Supabase
   Edge Function** (`supabase/functions/submit-enquiry`), which runs on
   Supabase's infrastructure and writes to Supabase Postgres. A flood of form
   submissions loads Supabase, not the VPS serving the site.

4. **The form path is rate-limited and locked down.**
   - Server-side per-IP rate limiting (`0002_rate_limit.sql` +
     `check_rate_limit`), keyed on a **salted hash** of the IP (no raw IP or PII
     stored), atomic in Postgres.
   - Row Level Security: the public anon key may **INSERT** enquiries and can
     **never SELECT** them (`0001_create_enquiries.sql`). Reads are service-role
     only.
   - Honeypot + strict validation reject bots and malformed data before insert.
   - A client-side throttle is a courtesy; the real limit is server-side.

## Capacity, concretely

- **Static assets:** effectively bounded by Cloudflare's edge, not the VPS.
  Tens of thousands of concurrent readers are comfortable because they're
  served cached bytes from the nearest edge PoP.
- **Enquiry submissions:** bounded by Supabase, and deliberately throttled
  (default 5 per IP per 10 min). Genuine users are unaffected; abuse is capped.
- **First-load weight:** the main app bundle is ~65 KB gzipped; **Three.js
  (~118 KB gzipped) is code-split** and only loads when the homepage globe
  renders, so it never blocks first paint or content pages.

## Pre-launch checklist for the scaling story

- [ ] Point the domain at Cloudflare (free plan); enable "Always Online" + caching.
- [ ] Deploy `dist/` to nginx with gzip + immutable cache headers (sample provided).
- [ ] Enforce HTTPS (certbot).
- [ ] Deploy the Edge Function: `supabase functions deploy submit-enquiry --no-verify-jwt`.
- [ ] Set secrets: `supabase secrets set RATE_LIMIT_SALT=<random>`.
- [ ] Apply migrations `0001` + `0002`; run the RLS verification snippet in `0001`.
- [ ] Load-test the form endpoint and confirm the rate limiter triggers.
- [ ] Add analytics and record a 2-week baseline **before** launch (PRD §4).

## Prerendering (separate, SEO-critical — see README)

For search indexing, add a prerender step (e.g. `vite-react-ssg`) so each route
emits real static HTML at build time. This is orthogonal to scaling but is the
top pre-launch technical risk, because the business runs on organic search.

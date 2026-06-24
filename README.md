# shakha.uz — Personal Portfolio

Multilingual (en/uz/ru) statically-exported portfolio built with Next.js 15. Three locales, four pages (Home, Projects, About, Contact), five curated projects, build-time OG images, sitemap, robots.txt, JSON-LD Person schema, and a downloadable CV.

## Design system

Typography: **Space Grotesk** (headings) + **IBM Plex Sans / IBM Plex Mono** (body/code). Accent: ultramarine signal (`#1d3be8`). Aesthetic: clean light "systems spec sheet" — technical, editorial, reduced ornamentation.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  (visit /en to start)
```

## Test

```bash
npm run test       # vitest: i18n parity, data integrity, routes
npm run typecheck  # tsc --noEmit
```

## Build (static export)

```bash
npm run build      # outputs to ./out
```

Deploy the `out/` directory behind Nginx. See `deploy/nginx.conf.example`.

## Configuration

| What | Where |
|---|---|
| Site URL, contact email, Telegram handle | `src/lib/site.ts` |
| Social links (LinkedIn, GitHub) | `src/lib/site.ts` |
| Content (projects, experience, skills, education) | `src/lib/data/*` |
| UI strings per locale | `src/lib/i18n/dictionaries/*` |

> **TODO:** `CONTACT.telegram` in `src/lib/site.ts` is currently `"@PLACEHOLDER"`. Replace with the real Telegram handle before going live — this is a single-point-of-change field that propagates to the Contact page and JSON-LD across all three locales.

## Project structure

```
src/
  app/
    [locale]/       # en / uz / ru — Home, Projects, About, Contact pages
                    # + per-page opengraph-image routes
    sitemap.ts      # build-time sitemap (12 URLs)
    robots.ts       # robots
  lib/
    data/           # single source of truth for all content
    i18n/           # typed dictionaries per locale
    site.ts         # SITE_URL, CONTACT, SOCIALS, CV_PATH
  components/       # shared UI components
public/
  Shakhzodbek-Sharipov-CV.pdf
deploy/
  nginx.conf.example
```

## Locales

| Code | Language |
|---|---|
| `en` | English (default) |
| `uz` | O'zbek |
| `ru` | Русский |

Root `/` redirects to `/en/` at build time (static redirect page) and at the Nginx layer.

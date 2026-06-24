# shakha.uz — Personal Portfolio: Design Spec

**Date:** 2026-06-24
**Owner:** Shakhzodbek Sharipov
**Status:** Approved

## 1. Goal

A fast, SEO-optimized, mobile-responsive personal portfolio for a full-stack developer.
Multilingual (English / Uzbek / Russian) with locale-based routing. Statically exported
for self-hosting behind Nginx.

## 2. Decisions (locked)

| Decision | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript + Tailwind CSS |
| Output | `output: 'export'` — static HTML for Nginx |
| Locales | `en` (default), `uz`, `ru` via `[locale]` segment |
| Aesthetic | Clean light & editorial (serif display headings, sans body, single accent, whitespace) |
| Projects | Curated 5 from CV: BookUp, MyPolis, InterRail, Do'mbirobod City, Baxtiyor Oila |
| Domain | `shakha.uz` |
| Contact | Email + LinkedIn + GitHub + Telegram (no backend) + Download CV button |

## 3. Architecture

### Routing & i18n
- All content under `app/[locale]/`. `generateStaticParams` returns `['en','uz','ru']`.
- Root `/` resolves to the English site (static redirect / generated index — no middleware,
  since static export cannot run middleware; `Accept-Language` negotiation is not available
  on a static host, so default-locale fallback is `en`).
- Translations are typed dictionaries: `lib/i18n/dictionaries/{en,uz,ru}.ts`, accessed via
  `getDictionary(locale)`. No runtime i18n library.
- `LocaleSwitcher` swaps the locale segment while preserving the current path.

### Data layer (single source of truth)
- `lib/data/projects.ts` — the 5 projects, each with locale-keyed `title`/`description`,
  `role`, `tech[]`, `url`, `slug`.
- `lib/data/experience.ts` — experience timeline + education, locale-keyed.
- `lib/data/skills.ts` — skill groups (Languages, Frontend, Backend, Databases,
  Integrations, DevOps & Tools, AI & Workflow) from the CV.
- `lib/site.ts` — `SITE_URL` (`https://shakha.uz`), social links, contact handles.

### Folder shape
```
src/
  app/
    [locale]/
      layout.tsx              # html lang, nav, footer, fonts, metadata base
      page.tsx                # Home
      projects/page.tsx
      about/page.tsx
      contact/page.tsx
      opengraph-image.tsx     # home OG (build-time PNG)
      projects/opengraph-image.tsx
      about/opengraph-image.tsx
      contact/opengraph-image.tsx
    sitemap.ts
    robots.ts
    layout.tsx                # root: redirect-to-/en index
  components/                 # Nav, Footer, LocaleSwitcher, Hero, Section,
                              # ProjectCard, SkillGroup, ExperienceItem, StatStrip, Reveal
  lib/
    i18n/ (config.ts, dictionaries/, get-dictionary.ts)
    data/ (projects.ts, experience.ts, skills.ts)
    site.ts
```

## 4. Pages (each rendered ×3 locales)

1. **Home** — hero (name, value-prop from CV objective, CTAs: Contact + Download CV),
   stats strip (5+ yrs, 6+ countries, 20+ businesses), 3 featured projects, skills snapshot,
   footer.
2. **Projects** — grid of all 5. Card: name, role, localized description, tech tags, live link.
3. **About** — narrative bio, full skills matrix (grouped), experience timeline
   (BookUp; InterRail Full-Stack; InterRail Intern), education (WIUT BSc 2020–2024).
4. **Contact** — email / LinkedIn / GitHub / Telegram cards + CTA. Static, no backend.

## 5. SEO

- Per-page, per-locale `generateMetadata`: localized title + description, `metadataBase`,
  canonical URL, `alternates.languages` (`en`, `uz`, `ru`, `x-default`) for hreflang.
- Build-time OG images via `opengraph-image.tsx` → static PNG per page (name + page title +
  accent). Matching Twitter `summary_large_image` meta.
- `sitemap.ts` enumerates every locale × page. `robots.ts` allows all + sitemap ref.
- JSON-LD `Person` / `ProfilePage` in the home layout.
- Semantic HTML, mobile-first, fast (static, minimal JS), good Lighthouse.

## 6. Design language

- Light background, generous whitespace, serif display font for headings + clean sans body,
  one restrained accent color, thin dividers, subtle scroll-reveal motion.
- Mobile-first responsive. Accessible: WCAG-AA contrast, visible focus states,
  `prefers-reduced-motion` respected.

## 7. Content

- Copy seeded from the CV (objective, project blurbs, skills, experience, education),
  rewritten per page and translated to UZ + RU. Stats sourced from CV claims.
- "Download CV" links to the PDF placed in `public/`.

## 8. Out of scope (YAGNI)

- No CMS, no blog, no backend, no contact-form service, no analytics (can be added later).
- No dark mode in v1.

## 9. Open items

- Telegram handle (placeholder until provided).
```

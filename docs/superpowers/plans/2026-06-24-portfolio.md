# shakha.uz Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, multilingual (en/uz/ru), SEO-optimized, statically-exported personal portfolio for Shakhzodbek Sharipov, deployable behind Nginx.

**Architecture:** Next.js 15 App Router with a `[locale]` dynamic segment, fully pre-rendered via `output: 'export'`. Content lives in typed dictionaries and data modules (single source of truth, locale-keyed). SEO metadata, hreflang alternates, sitemap, robots, JSON-LD, and build-time OG images are generated per page per locale.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Vitest (for pure-logic unit tests), next/og (build-time OG images).

## Global Constraints

- Next.js `15.x`, App Router only. `next.config` MUST set `output: 'export'` and `images.unoptimized: true`.
- Locales: `en` (default), `uz`, `ru`. Locale type: `type Locale = 'en' | 'uz' | 'ru'`.
- Site URL constant: `SITE_URL = 'https://shakha.uz'`.
- Featured projects (exactly 5): BookUp, MyPolis, InterRail, Do'mbirobod City, Baxtiyor Oila.
- Aesthetic: clean light & editorial — serif display headings, sans body, one accent color, generous whitespace. No dark mode in v1.
- Accessibility: WCAG-AA contrast, visible focus states, honor `prefers-reduced-motion`.
- No backend, no CMS, no analytics, no contact-form service.
- Source `src/` directory. Path alias `@/*` → `src/*`.
- Contact: email `shakhzodbek.me@gmail.com`, LinkedIn `linkedin.com/in/shakhzodbek-sharipov`, GitHub `github.com/ShakhCo`, Telegram `@PLACEHOLDER` (in one constant, easy to swap).
- Every task ends with a passing `npx tsc --noEmit` (where TS changed) and a clean commit.

---

### Task 1: Scaffold project, config, Tailwind, fonts

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `.gitignore`, `vitest.config.ts`
- Create: `src/app/globals.css`
- Create: `src/lib/site.ts`

**Interfaces:**
- Produces: `next.config.ts` with static export; global CSS with Tailwind + design tokens; `src/lib/site.ts` exporting `SITE_URL`, `CONTACT`, `SOCIALS`.

- [ ] **Step 1: Create package.json**

```json
{
  "name": "shakha-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "15.3.0",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.1.4",
    "@types/node": "22.14.0",
    "@types/react": "19.1.0",
    "@types/react-dom": "19.1.0",
    "tailwindcss": "4.1.4",
    "typescript": "5.8.3",
    "vitest": "3.1.1"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 4: Create postcss.config.mjs**

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};
export default config;
```

- [ ] **Step 5: Create .gitignore**

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.DS_Store
```

- [ ] **Step 6: Create vitest.config.ts**

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: { environment: "node" },
});
```

- [ ] **Step 7: Create src/app/globals.css (Tailwind v4 + design tokens)**

```css
@import "tailwindcss";

@theme {
  --font-serif: "Fraunces", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-ink: #1a1a1a;
  --color-muted: #6b6b6b;
  --color-line: #e6e3dd;
  --color-paper: #faf8f4;
  --color-accent: #b4541f;
}

:root {
  color-scheme: light;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 8: Create src/lib/site.ts**

```ts
export const SITE_URL = "https://shakha.uz";

export const CONTACT = {
  email: "shakhzodbek.me@gmail.com",
  telegram: "@PLACEHOLDER",
} as const;

export const SOCIALS = {
  linkedin: "https://linkedin.com/in/shakhzodbek-sharipov",
  github: "https://github.com/ShakhCo",
} as const;

export const CV_PATH = "/Shakhzodbek-Sharipov-CV.pdf";
```

- [ ] **Step 9: Install dependencies**

Run: `npm install`
Expected: completes, creates `node_modules` and `package-lock.json`.

- [ ] **Step 10: Verify typecheck passes**

Run: `npx tsc --noEmit`
Expected: no errors (no app pages yet, but config valid).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js static export project with Tailwind"
```

---

### Task 2: i18n foundation with dictionary key-parity test

**Files:**
- Create: `src/lib/i18n/config.ts`
- Create: `src/lib/i18n/dictionaries/en.ts`
- Create: `src/lib/i18n/dictionaries/uz.ts`
- Create: `src/lib/i18n/dictionaries/ru.ts`
- Create: `src/lib/i18n/get-dictionary.ts`
- Test: `src/lib/i18n/dictionaries.test.ts`

**Interfaces:**
- Produces:
  - `type Locale = 'en' | 'uz' | 'ru'`, `LOCALES: Locale[]`, `DEFAULT_LOCALE: Locale`, `isLocale(x): x is Locale`, `LOCALE_LABELS: Record<Locale,string>` (from `config.ts`).
  - `type Dictionary` (shape of `en.ts`), `getDictionary(locale: Locale): Dictionary`.

- [ ] **Step 1: Create src/lib/i18n/config.ts**

```ts
export const LOCALES = ["en", "uz", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
```

- [ ] **Step 2: Create the English dictionary `src/lib/i18n/dictionaries/en.ts`**

This defines the canonical shape. Keep UI strings only (project/experience copy lives in data modules).

```ts
export const en = {
  nav: { home: "Home", projects: "Projects", about: "About", contact: "Contact" },
  meta: {
    home: {
      title: "Shakhzodbek Sharipov — Full-Stack Developer",
      description:
        "Full-stack developer building multi-tenant SaaS, marketplaces, and ERP systems with Next.js, NestJS, and PostgreSQL.",
    },
    projects: {
      title: "Projects — Shakhzodbek Sharipov",
      description: "Selected work: SaaS booking platform, insurance marketplace, logistics ERP, and more.",
    },
    about: {
      title: "About — Shakhzodbek Sharipov",
      description: "Full-stack developer from Tashkent with 5+ years shipping products from empty repo to real users.",
    },
    contact: {
      title: "Contact — Shakhzodbek Sharipov",
      description: "Get in touch with Shakhzodbek Sharipov.",
    },
  },
  hero: {
    eyebrow: "Full-Stack Developer · Tashkent",
    title: "I build the platforms businesses run on.",
    subtitle:
      "Over 5 years I've shipped a multi-tenant SaaS booking marketplace, an online insurance marketplace, and ERP systems used across 6+ countries — each from empty repo to real users.",
    ctaContact: "Get in touch",
    ctaCv: "Download CV",
  },
  stats: { years: "Years building", countries: "Countries served", businesses: "Businesses onboarded" },
  sections: {
    featured: "Featured work",
    featuredViewAll: "View all projects",
    skills: "What I work with",
    experience: "Experience",
    education: "Education",
    letsTalk: "Let's build something",
  },
  projects: { role: "Role", stack: "Stack", visit: "Visit site" },
  contact: {
    title: "Let's talk",
    intro: "Looking for an ambitious team building products thousands of businesses depend on. Reach out through any channel below.",
    email: "Email",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: { built: "Built with Next.js. Designed and developed by Shakhzodbek Sharipov.", rights: "All rights reserved." },
} as const;

export type Dictionary = typeof en;
```

- [ ] **Step 3: Create `src/lib/i18n/dictionaries/uz.ts`**

```ts
import type { Dictionary } from "./en";

export const uz: Dictionary = {
  nav: { home: "Bosh sahifa", projects: "Loyihalar", about: "Men haqimda", contact: "Aloqa" },
  meta: {
    home: {
      title: "Shakhzodbek Sharipov — Full-Stack dasturchi",
      description:
        "Next.js, NestJS va PostgreSQL yordamida ko'p ijarali SaaS, marketpleyslar va ERP tizimlarini yaratuvchi full-stack dasturchi.",
    },
    projects: {
      title: "Loyihalar — Shakhzodbek Sharipov",
      description: "Tanlangan ishlar: SaaS bandlov platformasi, sug'urta marketpleysi, logistika ERP va boshqalar.",
    },
    about: {
      title: "Men haqimda — Shakhzodbek Sharipov",
      description: "Toshkentlik full-stack dasturchi, 5+ yil davomida mahsulotlarni noldan real foydalanuvchilarga yetkazgan.",
    },
    contact: {
      title: "Aloqa — Shakhzodbek Sharipov",
      description: "Shakhzodbek Sharipov bilan bog'laning.",
    },
  },
  hero: {
    eyebrow: "Full-Stack dasturchi · Toshkent",
    title: "Men biznes ishlaydigan platformalarni yarataman.",
    subtitle:
      "5+ yil davomida ko'p ijarali SaaS bandlov marketpleysi, onlayn sug'urta marketpleysi va 6+ davlatda ishlatiladigan ERP tizimlarini — har birini noldan real foydalanuvchilargacha yetkazdim.",
    ctaContact: "Bog'lanish",
    ctaCv: "CV yuklab olish",
  },
  stats: { years: "Yillik tajriba", countries: "Davlatlar", businesses: "Bizneslar" },
  sections: {
    featured: "Tanlangan ishlar",
    featuredViewAll: "Barcha loyihalar",
    skills: "Men ishlatadigan texnologiyalar",
    experience: "Tajriba",
    education: "Ta'lim",
    letsTalk: "Keling, nimadir yarataylik",
  },
  projects: { role: "Rol", stack: "Texnologiyalar", visit: "Saytga o'tish" },
  contact: {
    title: "Keling, gaplashaylik",
    intro: "Minglab bizneslar ishonadigan mahsulotlarni yaratayotgan ambitsiyali jamoa qidiryapman. Quyidagi har qanday kanal orqali bog'laning.",
    email: "Email",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: { built: "Next.js yordamida yaratilgan. Shakhzodbek Sharipov tomonidan ishlab chiqilgan.", rights: "Barcha huquqlar himoyalangan." },
};
```

- [ ] **Step 4: Create `src/lib/i18n/dictionaries/ru.ts`**

```ts
import type { Dictionary } from "./en";

export const ru: Dictionary = {
  nav: { home: "Главная", projects: "Проекты", about: "Обо мне", contact: "Контакты" },
  meta: {
    home: {
      title: "Шахзодбек Шарипов — Full-Stack разработчик",
      description:
        "Full-stack разработчик, создающий мультитенантные SaaS, маркетплейсы и ERP-системы на Next.js, NestJS и PostgreSQL.",
    },
    projects: {
      title: "Проекты — Шахзодбек Шарипов",
      description: "Избранные работы: SaaS-платформа бронирования, страховой маркетплейс, ERP для логистики и другое.",
    },
    about: {
      title: "Обо мне — Шахзодбек Шарипов",
      description: "Full-stack разработчик из Ташкента с опытом 5+ лет, доводящий продукты от пустого репозитория до реальных пользователей.",
    },
    contact: {
      title: "Контакты — Шахзодбек Шарипов",
      description: "Свяжитесь с Шахзодбеком Шариповым.",
    },
  },
  hero: {
    eyebrow: "Full-Stack разработчик · Ташкент",
    title: "Я создаю платформы, на которых работает бизнес.",
    subtitle:
      "За 5+ лет я запустил мультитенантный SaaS-маркетплейс бронирования, онлайн-маркетплейс страхования и ERP-системы, используемые в 6+ странах — каждый от пустого репозитория до реальных пользователей.",
    ctaContact: "Связаться",
    ctaCv: "Скачать CV",
  },
  stats: { years: "Лет в разработке", countries: "Стран", businesses: "Бизнесов" },
  sections: {
    featured: "Избранные работы",
    featuredViewAll: "Все проекты",
    skills: "С чем я работаю",
    experience: "Опыт",
    education: "Образование",
    letsTalk: "Давайте что-нибудь создадим",
  },
  projects: { role: "Роль", stack: "Стек", visit: "Открыть сайт" },
  contact: {
    title: "Давайте поговорим",
    intro: "Ищу амбициозную команду, создающую продукты, на которые полагаются тысячи компаний. Свяжитесь любым удобным способом ниже.",
    email: "Email",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: { built: "Создано на Next.js. Разработано Шахзодбеком Шариповым.", rights: "Все права защищены." },
};
```

- [ ] **Step 5: Create `src/lib/i18n/get-dictionary.ts`**

```ts
import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";

const dictionaries: Record<Locale, Dictionary> = { en, uz, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
```

- [ ] **Step 6: Write the failing key-parity test `src/lib/i18n/dictionaries.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { en } from "./dictionaries/en";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") return [prefix];
  return Object.entries(obj as Record<string, unknown>)
    .flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k))
    .sort();
}

describe("dictionary parity", () => {
  const base = keyPaths(en);
  it("uz has the same keys as en", () => {
    expect(keyPaths(uz)).toEqual(base);
  });
  it("ru has the same keys as en", () => {
    expect(keyPaths(ru)).toEqual(base);
  });
});
```

- [ ] **Step 7: Run the test**

Run: `npx vitest run src/lib/i18n/dictionaries.test.ts`
Expected: PASS (2 tests). If a locale is missing/extra a key, fix that dictionary until green.

- [ ] **Step 8: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (uz/ru typed as `Dictionary` catch shape drift at compile time).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: i18n config, dictionaries (en/uz/ru), and parity test"
```

---

### Task 3: Data layer (projects, experience, skills) with integrity test

**Files:**
- Create: `src/lib/data/projects.ts`
- Create: `src/lib/data/experience.ts`
- Create: `src/lib/data/skills.ts`
- Test: `src/lib/data/data.test.ts`

**Interfaces:**
- Produces:
  - `type Localized = Record<Locale, string>`
  - `type Project = { slug: string; name: string; url: string | null; tags: string[]; role: Localized; description: Localized }`, `PROJECTS: Project[]` (length 5).
  - `type ExperienceItem = { org: string; period: string; role: Localized; bullets: Localized[] }`, `EXPERIENCE: ExperienceItem[]`.
  - `type Education = { school: string; period: string; degree: Localized }`, `EDUCATION: Education`.
  - `type SkillGroup = { label: Localized; items: string[] }`, `SKILLS: SkillGroup[]`.
  - `STATS: { value: string; key: 'years' | 'countries' | 'businesses' }[]`.

- [ ] **Step 1: Create `src/lib/data/projects.ts`**

```ts
import type { Locale } from "@/lib/i18n/config";

export type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  url: string | null;
  tags: string[];
  role: Localized;
  description: Localized;
};

export const PROJECTS: Project[] = [
  {
    slug: "bookup",
    name: "BookUp",
    url: "https://bookup.uz",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Telegram Mini App", "Payme"],
    role: {
      en: "Founder & Full-Stack Developer",
      uz: "Asoschi va Full-Stack dasturchi",
      ru: "Основатель и Full-Stack разработчик",
    },
    description: {
      en: "Multi-tenant booking & client-management SaaS for service businesses — a Telegram mini-app for owners, a Next.js booking site for customers, and a NestJS/PostgreSQL backend. Integrated Payme payments and Instagram auto-reply automation.",
      uz: "Xizmat ko'rsatuvchi bizneslar uchun ko'p ijarali bandlov va mijozlarni boshqarish SaaS — egalar uchun Telegram mini-ilova, mijozlar uchun Next.js bandlov sayti va NestJS/PostgreSQL backend. Payme to'lovlari va Instagram avto-javob avtomatlashtirilgan.",
      ru: "Мультитенантный SaaS для бронирования и управления клиентами — Telegram мини-приложение для владельцев, сайт бронирования на Next.js для клиентов и бэкенд на NestJS/PostgreSQL. Интегрированы платежи Payme и авто-ответы в Instagram.",
    },
  },
  {
    slug: "mypolis",
    name: "MyPolis",
    url: "https://my-polis.uz",
    tags: ["Vue 3", "NestJS", "PostgreSQL", "Payments", "Admin Panel"],
    role: {
      en: "Full-Stack Developer",
      uz: "Full-Stack dasturchi",
      ru: "Full-Stack разработчик",
    },
    description: {
      en: "An insurance marketplace where customers buy policies in one place and insurance companies join as listed partners. Delivered payment processing, point-of-sale systems, contract management, an admin panel, and business reporting.",
      uz: "Sug'urta marketpleysi: mijozlar bir joydan polislar sotib oladi, sug'urta kompaniyalari hamkor sifatida qo'shiladi. To'lovlarni qayta ishlash, savdo nuqtalari, shartnomalarni boshqarish, admin panel va biznes hisobotlari yaratildi.",
      ru: "Страховой маркетплейс, где клиенты покупают полисы в одном месте, а страховые компании подключаются как партнёры. Реализованы обработка платежей, POS-системы, управление договорами, админ-панель и бизнес-отчётность.",
    },
  },
  {
    slug: "interrail",
    name: "InterRail",
    url: "https://system.interrail.uz",
    tags: ["Vue.js", "Next.js", "Django", "Docker", "ERP/CRM"],
    role: {
      en: "Full-Stack Developer",
      uz: "Full-Stack dasturchi",
      ru: "Full-Stack разработчик",
    },
    description: {
      en: "ERP and CRM platforms built from zero to fully automate core business processes for an international rail-freight logistics company — accounting, contract management, KPI tracking, and AI-powered document processing.",
      uz: "Xalqaro temir yo'l yuk logistikasi kompaniyasi uchun noldan qurilgan ERP va CRM platformalari — buxgalteriya, shartnomalarni boshqarish, KPI kuzatuvi va AI yordamida hujjatlarni qayta ishlash.",
      ru: "ERP и CRM платформы, построенные с нуля для полной автоматизации бизнес-процессов международной железнодорожной логистической компании — бухгалтерия, управление договорами, отслеживание KPI и обработка документов с ИИ.",
    },
  },
  {
    slug: "dombirobod-city",
    name: "Do'mbirobod City",
    url: "https://dombirobod-city.uz",
    tags: ["Next.js", "Figma", "Landing", "Real Estate"],
    role: {
      en: "Front-End Developer",
      uz: "Front-End dasturchi",
      ru: "Front-End разработчик",
    },
    description: {
      en: "A professional enterprise landing page for a local real estate company, featuring apartment floor plans, virtual tours, and a price calculator. Built with Next.js and Figma-based UI/UX prototyping.",
      uz: "Mahalliy ko'chmas mulk kompaniyasi uchun professional landing sahifa — kvartira rejalari, virtual sayohatlar va narx kalkulyatori. Next.js va Figma asosidagi UI/UX prototiplash bilan qurilgan.",
      ru: "Профессиональный корпоративный лендинг для местной компании недвижимости — планировки квартир, виртуальные туры и калькулятор цен. Создан на Next.js с прототипированием UI/UX в Figma.",
    },
  },
  {
    slug: "baxtiyor-oila",
    name: "Baxtiyor Oila",
    url: null,
    tags: ["React", "Go", "Python", "Telegram Mini App"],
    role: {
      en: "Full-Stack Developer",
      uz: "Full-Stack dasturchi",
      ru: "Full-Stack разработчик",
    },
    description: {
      en: "A matchmaking service for the Uzbek community in Germany, delivered as user-facing and admin Telegram Mini Apps with a profile-matching algorithm. Built with React, a Go API backend, and a Python notification bot.",
      uz: "Germaniyadagi o'zbek jamoasi uchun tanishuv xizmati — foydalanuvchi va admin Telegram Mini Ilovalari va profil moslashtirish algoritmi bilan. React, Go API backend va Python bildirishnoma boti bilan qurilgan.",
      ru: "Сервис знакомств для узбекского сообщества в Германии — пользовательское и админ Telegram Mini-приложения с алгоритмом подбора профилей. Создан на React, Go API и Python-боте уведомлений.",
    },
  },
];
```

- [ ] **Step 2: Create `src/lib/data/experience.ts`**

```ts
import type { Localized } from "./projects";

export type ExperienceItem = {
  org: string;
  period: string;
  role: Localized;
  bullets: Localized[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    org: "BookUp (bookup.uz)",
    period: "Jun 2025 — Present",
    role: { en: "Founder & Full-Stack Developer", uz: "Asoschi va Full-Stack dasturchi", ru: "Основатель и Full-Stack разработчик" },
    bullets: [
      {
        en: "Built a multi-tenant booking & business-management SaaS serving 20+ service businesses, spanning a Telegram mini-app, a Next.js booking site, and a NestJS/PostgreSQL backend.",
        uz: "20+ xizmat biznesiga xizmat ko'rsatuvchi ko'p ijarali bandlov va biznes-boshqaruv SaaS qurdim — Telegram mini-ilova, Next.js bandlov sayti va NestJS/PostgreSQL backend.",
        ru: "Создал мультитенантный SaaS для бронирования и управления бизнесом для 20+ компаний — Telegram мини-приложение, сайт на Next.js и бэкенд на NestJS/PostgreSQL.",
      },
      {
        en: "Built an Instagram automation suite (comment/DM auto-replies, ice breakers, AI-powered replies) on the Meta Graph API, turning social engagement into bookings.",
        uz: "Meta Graph API asosida Instagram avtomatlashtirish to'plamini qurdim (izoh/DM avto-javoblar, AI javoblar), ijtimoiy faollikni bandlovga aylantirib.",
        ru: "Создал набор автоматизации Instagram (авто-ответы на комментарии/DM, AI-ответы) на Meta Graph API, превращая активность в бронирования.",
      },
      {
        en: "Designed and shipped end-to-end payments with Payme: a per-user prepaid wallet that auto-deducts SaaS subscription fees from top-ups.",
        uz: "Payme bilan to'liq to'lov tizimini ishlab chiqdim: SaaS obuna to'lovlarini hisobdan avtomatik yechib oluvchi prepaid hamyon.",
        ru: "Разработал сквозные платежи с Payme: предоплаченный кошелёк, автоматически списывающий плату за подписку SaaS.",
      },
    ],
  },
  {
    org: "InterRail Central Asia",
    period: "Jan 2022 — Present",
    role: { en: "Full-Stack Developer", uz: "Full-Stack dasturchi", ru: "Full-Stack разработчик" },
    bullets: [
      {
        en: "Developed and maintained multiple custom ERP systems to automate accounting (acts, contract management), KPI tracking, and inquiry handling.",
        uz: "Buxgalteriya (aktlar, shartnomalar), KPI kuzatuvi va so'rovlarni qayta ishlashni avtomatlashtiruvchi bir nechta ERP tizimlarini ishlab chiqdim va qo'llab-quvvatladim.",
        ru: "Разработал и поддерживал несколько ERP-систем для автоматизации бухгалтерии (акты, договоры), отслеживания KPI и обработки запросов.",
      },
      {
        en: "Led development of an AI-powered document processing tool that reads scanned documents, extracts data, and stores it structured — eliminating manual Excel entry.",
        uz: "Skanerlangan hujjatlarni o'qib, ma'lumotlarni ajratib, tuzilgan holda saqlovchi AI hujjat qayta ishlash vositasini boshqardim — qo'lda Excel kiritishni yo'q qildi.",
        ru: "Руководил разработкой инструмента обработки документов с ИИ, который читает сканы, извлекает данные и хранит их структурированно — устранив ручной ввод в Excel.",
      },
      {
        en: "Built a KPI monitoring system for the sales department to evaluate team and individual performance metrics.",
        uz: "Savdo bo'limi uchun jamoa va shaxsiy ko'rsatkichlarni baholovchi KPI monitoring tizimini qurdim.",
        ru: "Создал систему мониторинга KPI для отдела продаж для оценки командных и индивидуальных показателей.",
      },
    ],
  },
  {
    org: "InterRail Central Asia",
    period: "Feb 2022 — Aug 2022",
    role: { en: "Backend Developer Intern", uz: "Backend dasturchi (intern)", ru: "Backend разработчик (стажёр)" },
    bullets: [
      {
        en: "Developed unit tests using pytest for a Django project, improving code reliability and quality.",
        uz: "Django loyihasi uchun pytest yordamida unit testlar yozdim, kod ishonchliligini oshirdim.",
        ru: "Разработал юнит-тесты на pytest для Django-проекта, повысив надёжность кода.",
      },
      {
        en: "Optimized order handling, significantly reducing processing time.",
        uz: "Buyurtmalarni qayta ishlashni optimallashtirib, qayta ishlash vaqtini sezilarli qisqartirdim.",
        ru: "Оптимизировал обработку заказов, значительно сократив время обработки.",
      },
    ],
  },
];

export type Education = { school: string; period: string; degree: Localized };

export const EDUCATION: Education = {
  school: "Westminster International University in Tashkent",
  period: "2020 — 2024",
  degree: {
    en: "BSc Computer Science",
    uz: "BSc Kompyuter fanlari",
    ru: "BSc Компьютерные науки",
  },
};
```

- [ ] **Step 3: Create `src/lib/data/skills.ts`**

```ts
import type { Localized } from "./projects";

export type SkillGroup = { label: Localized; items: string[] };

export const SKILLS: SkillGroup[] = [
  { label: { en: "Languages", uz: "Tillar", ru: "Языки" }, items: ["TypeScript", "JavaScript", "Python"] },
  { label: { en: "Frontend", uz: "Frontend", ru: "Frontend" }, items: ["Next.js", "React", "Vue 3", "Remix", "Tailwind CSS", "Zod", "Pinia"] },
  { label: { en: "Backend", uz: "Backend", ru: "Backend" }, items: ["NestJS", "FastAPI", "Django", "REST APIs", "WebSocket", "Prisma"] },
  { label: { en: "Databases", uz: "Ma'lumotlar bazasi", ru: "Базы данных" }, items: ["PostgreSQL", "MongoDB", "Redis"] },
  { label: { en: "Integrations", uz: "Integratsiyalar", ru: "Интеграции" }, items: ["Click", "Payme", "Telegram Bot & Mini Apps", "Meta Graph API", "SMS/OTP"] },
  { label: { en: "DevOps & Tools", uz: "DevOps va vositalar", ru: "DevOps и инструменты" }, items: ["Docker", "Nginx", "Linux", "CI/CD", "GitHub Actions", "RabbitMQ", "PM2"] },
  { label: { en: "AI & Workflow", uz: "AI va ish jarayoni", ru: "AI и процессы" }, items: ["Claude Code", "AI-assisted development", "LLM integration"] },
];

export const STATS: { value: string; key: "years" | "countries" | "businesses" }[] = [
  { value: "5+", key: "years" },
  { value: "6+", key: "countries" },
  { value: "20+", key: "businesses" },
];
```

- [ ] **Step 4: Write the failing integrity test `src/lib/data/data.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/i18n/config";
import { PROJECTS } from "./projects";
import { EXPERIENCE, EDUCATION } from "./experience";
import { SKILLS } from "./skills";

function hasAllLocales(obj: Record<string, string>) {
  return LOCALES.every((l) => typeof obj[l] === "string" && obj[l].length > 0);
}

describe("data integrity", () => {
  it("has exactly 5 projects with unique slugs", () => {
    expect(PROJECTS).toHaveLength(5);
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(5);
  });

  it("every project has all locales for role and description", () => {
    for (const p of PROJECTS) {
      expect(hasAllLocales(p.role), `${p.slug} role`).toBe(true);
      expect(hasAllLocales(p.description), `${p.slug} description`).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it("every experience item and its bullets are fully localized", () => {
    for (const e of EXPERIENCE) {
      expect(hasAllLocales(e.role), e.org).toBe(true);
      for (const b of e.bullets) expect(hasAllLocales(b)).toBe(true);
    }
    expect(hasAllLocales(EDUCATION.degree)).toBe(true);
  });

  it("every skill group label is fully localized", () => {
    for (const s of SKILLS) {
      expect(hasAllLocales(s.label)).toBe(true);
      expect(s.items.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 5: Run the test**

Run: `npx vitest run src/lib/data/data.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: localized data layer (projects, experience, skills) with integrity test"
```

---

### Task 4: Root layout, locale layout, static params, root redirect

**Files:**
- Create: `src/app/layout.tsx` (root — minimal, redirects `/` to `/en`)
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (temporary stub, replaced in Task 6)
- Create: `src/lib/seo.ts`

**Interfaces:**
- Consumes: `getDictionary`, `LOCALES`, `isLocale`, `SITE_URL`.
- Produces:
  - `src/lib/seo.ts`: `buildMetadata({ locale, path, title, description }): Metadata` with canonical + hreflang alternates; `localizedPath(locale, path)`.
  - `[locale]/layout.tsx` exports `generateStaticParams(): { locale: Locale }[]` returning all 3 locales.
  - Page components receive `params: Promise<{ locale: string }>` (Next 15 async params).

- [ ] **Step 1: Create `src/lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

// path is the route AFTER the locale, e.g. "" for home, "projects" for /projects
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function buildMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, path, title, description } = opts;
  const canonical = `${SITE_URL}${localizedPath(locale, path)}`;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}${localizedPath(l, path)}`;
  languages["x-default"] = `${SITE_URL}${localizedPath("en", path)}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Shakhzodbek Sharipov",
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
```

- [ ] **Step 2: Create root `src/app/layout.tsx`**

The root layout sets `metadataBase`. The root index page (Step 4) handles redirect.

```tsx
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 3: Create `src/app/[locale]/layout.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE_URL } from "@/lib/site";
import { SOCIALS, CONTACT } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shakhzodbek Sharipov",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer",
    email: CONTACT.email,
    address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" },
    sameAs: [SOCIALS.linkedin, SOCIALS.github],
  };

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
```

Note: `Nav` and `Footer` are created in Task 5; this layout will not build until then. That is expected — Task 5 immediately follows and the build verification lives there.

- [ ] **Step 4: Create root redirect page `src/app/page.tsx`**

Static export can't use middleware. Use a client redirect + `<meta http-equiv refresh>` fallback and a link for no-JS.

```tsx
import Link from "next/link";

export default function RootIndex() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="https://shakha.uz/en/" />
      </head>
      <body>
        <p>
          Redirecting to <Link href="/en/">English site</Link>…
        </p>
        <script
          dangerouslySetInnerHTML={{ __html: `location.replace('/en/');` }}
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create temporary home stub `src/app/[locale]/page.tsx`**

```tsx
export default function Home() {
  return <div>home</div>;
}
```

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: errors ONLY about missing `@/components/Nav` and `@/components/Footer` (resolved in Task 5). No other errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: root + locale layouts, static params, SEO helper, root redirect"
```

---

### Task 5: Shared components (Nav, Footer, LocaleSwitcher, primitives)

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/LocaleSwitcher.tsx`
- Create: `src/components/Section.tsx`
- Create: `src/components/Reveal.tsx`

**Interfaces:**
- Consumes: `Dictionary`, `Locale`, `LOCALES`, `LOCALE_LABELS`, `SOCIALS`.
- Produces:
  - `Nav({ locale, dict }: { locale: Locale; dict: Dictionary })`
  - `Footer({ locale, dict }: { locale: Locale; dict: Dictionary })`
  - `LocaleSwitcher({ locale }: { locale: Locale })` — client component, swaps locale segment preserving path.
  - `Section({ id?, className?, children })` — layout wrapper (max-width, padding).
  - `Reveal({ children, className? })` — client component, scroll-reveal fade-in.

- [ ] **Step 1: Create `src/components/Section.tsx`**

```tsx
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-5xl px-6 md:px-8 ${className}`}>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/LocaleSwitcher.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;

  function swap(target: Locale): string {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${target}/`;
    parts[0] = target;
    return `/${parts.join("/")}/`;
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={swap(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded px-2 py-1 transition-colors ${
            l === locale ? "text-[var(--color-accent)] font-semibold" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          {LOCALE_LABELS[l]}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/Nav.tsx`**

```tsx
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: `${base}/`, label: dict.nav.home },
    { href: `${base}/projects/`, label: dict.nav.projects },
    { href: `${base}/about/`, label: dict.nav.about },
    { href: `${base}/contact/`, label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8">
        <Link href={`${base}/`} className="font-serif text-lg font-semibold tracking-tight">
          Shakhzodbek<span className="text-[var(--color-accent)]">.</span>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden gap-6 text-sm text-[var(--color-muted)] md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-[var(--color-ink)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher locale={locale} />
        </div>
      </nav>
    </header>
  );
}
```

Note: a compact mobile menu is intentionally a plain horizontal locale switcher + the page links collapse to the footer; nav links hidden under `md` keep the header clean. (Mobile users reach pages via hero CTAs and footer.)

- [ ] **Step 5: Create `src/components/Footer.tsx`**

```tsx
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import { SOCIALS, CONTACT } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="text-sm text-[var(--color-muted)]">
          <p>{dict.footer.built}</p>
          <p>© {year} Shakhzodbek Sharipov. {dict.footer.rights}</p>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li><Link href={`${base}/projects/`} className="hover:text-[var(--color-accent)]">{dict.nav.projects}</Link></li>
          <li><Link href={`${base}/about/`} className="hover:text-[var(--color-accent)]">{dict.nav.about}</Link></li>
          <li><Link href={`${base}/contact/`} className="hover:text-[var(--color-accent)]">{dict.nav.contact}</Link></li>
          <li><a href={SOCIALS.github} className="hover:text-[var(--color-accent)]">GitHub</a></li>
          <li><a href={SOCIALS.linkedin} className="hover:text-[var(--color-accent)]">LinkedIn</a></li>
          <li><a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--color-accent)]">Email</a></li>
        </ul>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Verify dev build compiles**

Run: `npm run build`
Expected: build succeeds; `out/` contains `en/index.html`, `uz/index.html`, `ru/index.html`. (Pages are stubs; that's fine.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: shared components — Nav, Footer, LocaleSwitcher, Section, Reveal"
```

---

### Task 6: Home page + reusable ProjectCard / StatStrip

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/StatStrip.tsx`
- Modify: `src/app/[locale]/page.tsx` (replace stub)

**Interfaces:**
- Consumes: `PROJECTS`, `STATS`, `SKILLS`, `Dictionary`, `getDictionary`, `buildMetadata`, `CV_PATH`.
- Produces:
  - `ProjectCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary })`
  - `StatStrip({ dict }: { dict: Dictionary })`
  - Home `generateMetadata` + default export.

- [ ] **Step 1: Create `src/components/StatStrip.tsx`**

```tsx
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { STATS } from "@/lib/data/skills";

export function StatStrip({ dict }: { dict: Dictionary }) {
  return (
    <dl className="grid grid-cols-3 gap-4 border-y border-[var(--color-line)] py-8">
      {STATS.map((s) => (
        <div key={s.key} className="text-center">
          <dt className="font-serif text-3xl font-semibold md:text-5xl">{s.value}</dt>
          <dd className="mt-1 text-xs text-[var(--color-muted)] md:text-sm">{dict.stats[s.key]}</dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 2: Create `src/components/ProjectCard.tsx`**

```tsx
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-[var(--color-line)] bg-white/40 p-6 transition-shadow hover:shadow-md">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold">{project.name}</h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm text-[var(--color-accent)] hover:underline"
          >
            {dict.projects.visit} ↗
          </a>
        )}
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{project.role[locale]}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed">{project.description[locale]}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full border border-[var(--color-line)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 3: Replace `src/app/[locale]/page.tsx` with the home page**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { CV_PATH } from "@/lib/site";
import { PROJECTS } from "@/lib/data/projects";
import { SKILLS } from "@/lib/data/skills";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { StatStrip } from "@/components/StatStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "", title: dict.meta.home.title, description: dict.meta.home.description });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">{dict.hero.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">{dict.hero.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{dict.hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={`/${l}/contact/`} className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
            {dict.hero.ctaContact}
          </Link>
          <a href={CV_PATH} download className="rounded-full border border-[var(--color-ink)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-ink)] hover:text-white">
            {dict.hero.ctaCv}
          </a>
        </div>
      </Section>

      <Section className="py-4"><StatStrip dict={dict} /></Section>

      <Section className="py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">{dict.sections.featured}</h2>
          <Link href={`/${l}/projects/`} className="text-sm text-[var(--color-accent)] hover:underline">{dict.sections.featuredViewAll} →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.slug}><ProjectCard project={p} locale={l} dict={dict} /></Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">{dict.sections.skills}</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {SKILLS.flatMap((g) => g.items).map((s) => (
            <span key={s} className="rounded-full border border-[var(--color-line)] bg-white/40 px-3 py-1 text-sm">{s}</span>
          ))}
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds; `out/en/index.html` contains the hero title text.

- [ ] **Step 5: Verify hreflang in output**

Run: `grep -c 'hreflang' out/en/index.html`
Expected: a number ≥ 4 (en, uz, ru, x-default).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: home page with hero, stats, featured projects, skills"
```

---

### Task 7: Projects page

**Files:**
- Create: `src/app/[locale]/projects/page.tsx`

**Interfaces:**
- Consumes: `PROJECTS`, `ProjectCard`, `buildMetadata`, `getDictionary`.

- [ ] **Step 1: Create `src/app/[locale]/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { PROJECTS } from "@/lib/data/projects";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "projects", title: dict.meta.projects.title, description: dict.meta.projects.description });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <Section className="py-16 md:py-24">
      <h1 className="font-serif text-4xl font-semibold md:text-5xl">{dict.nav.projects}</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{dict.meta.projects.description}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Reveal key={p.slug}><ProjectCard project={p} locale={l} dict={dict} /></Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds; `out/en/projects/index.html` exists and contains "BookUp".

Run: `grep -l 'BookUp' out/en/projects/index.html`
Expected: prints the path.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: projects page"
```

---

### Task 8: About page + ExperienceItem / SkillGroup components

**Files:**
- Create: `src/components/ExperienceItem.tsx`
- Create: `src/components/SkillGroupList.tsx`
- Create: `src/app/[locale]/about/page.tsx`

**Interfaces:**
- Consumes: `EXPERIENCE`, `EDUCATION`, `SKILLS`, `Dictionary`.
- Produces:
  - `ExperienceItemRow({ item, locale }: { item: ExperienceItem; locale: Locale })`
  - `SkillGroupList({ locale }: { locale: Locale })`

- [ ] **Step 1: Create `src/components/ExperienceItem.tsx`**

```tsx
import type { Locale } from "@/lib/i18n/config";
import type { ExperienceItem } from "@/lib/data/experience";

export function ExperienceItemRow({ item, locale }: { item: ExperienceItem; locale: Locale }) {
  return (
    <div className="border-l-2 border-[var(--color-line)] pl-6 pb-10 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif text-lg font-semibold">{item.role[locale]}</h3>
        <span className="text-sm text-[var(--color-muted)]">{item.period}</span>
      </div>
      <p className="text-sm font-medium text-[var(--color-accent)]">{item.org}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-muted)]">
        {item.bullets.map((b, i) => (
          <li key={i}>{b[locale]}</li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/SkillGroupList.tsx`**

```tsx
import type { Locale } from "@/lib/i18n/config";
import { SKILLS } from "@/lib/data/skills";

export function SkillGroupList({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {SKILLS.map((g) => (
        <div key={g.label.en}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">{g.label[locale]}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s} className="rounded-full border border-[var(--color-line)] bg-white/40 px-3 py-1 text-sm">{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/[locale]/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { EXPERIENCE, EDUCATION } from "@/lib/data/experience";
import { Section } from "@/components/Section";
import { ExperienceItemRow } from "@/components/ExperienceItem";
import { SkillGroupList } from "@/components/SkillGroupList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "about", title: dict.meta.about.title, description: dict.meta.about.description });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <Section className="py-16 md:py-24">
      <h1 className="font-serif text-4xl font-semibold md:text-5xl">{dict.nav.about}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{dict.hero.subtitle}</p>

      <h2 className="mt-16 font-serif text-2xl font-semibold">{dict.sections.skills}</h2>
      <div className="mt-8"><SkillGroupList locale={l} /></div>

      <h2 className="mt-16 font-serif text-2xl font-semibold">{dict.sections.experience}</h2>
      <div className="mt-8">
        {EXPERIENCE.map((e, i) => (
          <ExperienceItemRow key={i} item={e} locale={l} />
        ))}
      </div>

      <h2 className="mt-16 font-serif text-2xl font-semibold">{dict.sections.education}</h2>
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold">{EDUCATION.degree[l]}</h3>
          <span className="text-sm text-[var(--color-muted)]">{EDUCATION.period}</span>
        </div>
        <p className="text-sm font-medium text-[var(--color-accent)]">{EDUCATION.school}</p>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds; `out/ru/about/index.html` contains "Опыт".

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: about page with skills, experience timeline, education"
```

---

### Task 9: Contact page

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`

**Interfaces:**
- Consumes: `CONTACT`, `SOCIALS`, `Dictionary`, `buildMetadata`.

- [ ] **Step 1: Create `src/app/[locale]/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SOCIALS } from "@/lib/site";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "contact", title: dict.meta.contact.title, description: dict.meta.contact.description });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const tgHandle = CONTACT.telegram.replace(/^@/, "");
  const cards = [
    { label: dict.contact.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: dict.contact.telegram, value: CONTACT.telegram, href: `https://t.me/${tgHandle}` },
    { label: dict.contact.linkedin, value: "shakhzodbek-sharipov", href: SOCIALS.linkedin },
    { label: dict.contact.github, value: "ShakhCo", href: SOCIALS.github },
  ];

  return (
    <Section className="py-16 md:py-24">
      <h1 className="font-serif text-4xl font-semibold md:text-5xl">{dict.contact.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{dict.contact.intro}</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group rounded-lg border border-[var(--color-line)] bg-white/40 p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-[var(--color-muted)]">{c.label}</p>
            <p className="mt-1 font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">{c.value} ↗</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds; `out/uz/contact/index.html` contains the email address.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: contact page"
```

---

### Task 10: sitemap, robots, and a sitemap content test

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/routes.ts`
- Test: `src/lib/routes.test.ts`

**Interfaces:**
- Produces: `ROUTE_PATHS: string[]` (the post-locale paths: `["", "projects", "about", "contact"]`); `allUrls(): string[]` (every locale × route absolute URL).

- [ ] **Step 1: Create `src/lib/routes.ts`**

```ts
import { LOCALES } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";
import { localizedPath } from "@/lib/seo";

export const ROUTE_PATHS = ["", "projects", "about", "contact"] as const;

export function allUrls(): string[] {
  const urls: string[] = [];
  for (const locale of LOCALES) {
    for (const path of ROUTE_PATHS) {
      urls.push(`${SITE_URL}${localizedPath(locale, path)}`);
    }
  }
  return urls;
}
```

- [ ] **Step 2: Write failing test `src/lib/routes.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { allUrls } from "./routes";

describe("routes", () => {
  it("produces 12 urls (3 locales × 4 pages)", () => {
    expect(allUrls()).toHaveLength(12);
  });
  it("includes localized home and contact", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/");
    expect(urls).toContain("https://shakha.uz/ru/contact/");
    expect(urls).toContain("https://shakha.uz/uz/projects/");
  });
});
```

- [ ] **Step 3: Run the test**

Run: `npx vitest run src/lib/routes.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 4: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { allUrls } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allUrls().map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: url.endsWith(".uz/en/") || /\/(en|uz|ru)\/$/.test(url) ? 1 : 0.8,
  }));
}
```

- [ ] **Step 5: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 6: Build + verify output**

Run: `npm run build`
Expected: succeeds.

Run: `test -f out/sitemap.xml && test -f out/robots.txt && grep -c '<loc>' out/sitemap.xml`
Expected: prints `12`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: sitemap, robots, route helper with test"
```

---

### Task 11: Build-time OG images (per page)

**Files:**
- Create: `src/components/og/og-template.tsx`
- Create: `src/app/[locale]/opengraph-image.tsx`
- Create: `src/app/[locale]/projects/opengraph-image.tsx`
- Create: `src/app/[locale]/about/opengraph-image.tsx`
- Create: `src/app/[locale]/contact/opengraph-image.tsx`

**Interfaces:**
- Consumes: `getDictionary`, `LOCALES`.
- Produces: `OgCard({ title, subtitle }): JSX` reused by each route's `Image` default export. Each OG file exports `size`, `contentType`, `generateStaticParams`, and default `Image`.

Note: with `output: 'export'`, OG image routes must be statically generated for every locale — each file therefore exports `generateStaticParams` returning all locales.

- [ ] **Step 1: Create `src/components/og/og-template.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOg(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#b4541f", fontWeight: 600 }}>Shakhzodbek Sharipov</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#6b6b6b", marginTop: 24 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 28, color: "#6b6b6b" }}>shakha.uz</div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/opengraph-image.tsx`**

```tsx
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return renderOg("Full-Stack Developer", dict.hero.title);
}
```

- [ ] **Step 3: Create `src/app/[locale]/projects/opengraph-image.tsx`**

```tsx
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return renderOg(dict.nav.projects, dict.meta.projects.description);
}
```

- [ ] **Step 4: Create `src/app/[locale]/about/opengraph-image.tsx`**

```tsx
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return renderOg(dict.nav.about, dict.meta.about.description);
}
```

- [ ] **Step 5: Create `src/app/[locale]/contact/opengraph-image.tsx`**

```tsx
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return renderOg(dict.contact.title, dict.meta.contact.description);
}
```

- [ ] **Step 6: Build + verify OG PNGs exist**

Run: `npm run build`
Expected: succeeds.

Run: `find out -name 'opengraph-image*.png' | wc -l`
Expected: `12` (4 pages × 3 locales).

Run: `grep -o 'og:image[^>]*' out/en/index.html | head -1`
Expected: a line referencing the opengraph-image PNG URL.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: build-time OG images per page and locale"
```

---

### Task 12: Public assets — CV PDF, favicon, manifest

**Files:**
- Create: `public/Shakhzodbek-Sharipov-CV.pdf` (copied from the source PDF)
- Create: `src/app/icon.svg`
- Create: `src/app/manifest.ts`

**Interfaces:**
- Consumes: nothing new.

- [ ] **Step 1: Copy the CV PDF into public/**

Run:
```bash
mkdir -p public
cp "/Users/shahzod/Downloads/FAANGPath_Simple_Template__5_-5.pdf" public/Shakhzodbek-Sharipov-CV.pdf
test -f public/Shakhzodbek-Sharipov-CV.pdf && echo OK
```
Expected: prints `OK`.

- [ ] **Step 2: Create `src/app/icon.svg` (monogram favicon)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1a1a1a"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Georgia, serif" font-size="34" fill="#faf8f4" font-weight="700">S</text>
  <circle cx="48" cy="44" r="3" fill="#b4541f"/>
</svg>
```

- [ ] **Step 3: Create `src/app/manifest.ts`**

```ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shakhzodbek Sharipov — Portfolio",
    short_name: "Shakhzodbek",
    start_url: "/en/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#1a1a1a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
```

- [ ] **Step 4: Build + verify assets**

Run: `npm run build`
Expected: succeeds.

Run: `test -f out/Shakhzodbek-Sharipov-CV.pdf && test -f out/manifest.webmanifest && echo OK`
Expected: prints `OK`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: CV download, favicon, web manifest"
```

---

### Task 13: Final verification, README, Nginx config

**Files:**
- Create: `README.md`
- Create: `deploy/nginx.conf.example`

**Interfaces:** none.

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: all tests pass (parity, data, routes).

- [ ] **Step 2: Clean build**

Run: `rm -rf .next out && npm run build`
Expected: succeeds with no errors.

- [ ] **Step 3: Verify the full static surface**

Run:
```bash
for p in en/ uz/ ru/ en/projects/ uz/about/ ru/contact/; do test -f "out/$p/index.html" && echo "OK $p" || echo "MISSING $p"; done
```
Expected: six `OK` lines.

- [ ] **Step 4: Create `deploy/nginx.conf.example`**

```nginx
server {
  listen 80;
  server_name shakha.uz www.shakha.uz;
  root /var/www/shakha.uz/out;
  index index.html;

  # Static export uses trailingSlash; serve directory index.html
  location / {
    try_files $uri $uri/ $uri.html /en/index.html;
  }

  # Long cache for hashed assets
  location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location = / {
    return 302 /en/;
  }

  error_page 404 /en/index.html;
}
```

- [ ] **Step 5: Create `README.md`**

```markdown
# shakha.uz — Personal Portfolio

Multilingual (en/uz/ru) statically-exported portfolio built with Next.js 15.

## Develop
\`\`\`bash
npm install
npm run dev      # http://localhost:3000  (visit /en)
\`\`\`

## Test
\`\`\`bash
npm run test       # vitest: i18n parity, data integrity, routes
npm run typecheck  # tsc --noEmit
\`\`\`

## Build (static export)
\`\`\`bash
npm run build      # outputs to ./out
\`\`\`

Deploy the `out/` directory behind Nginx. See `deploy/nginx.conf.example`.

## Configuration
- Site URL, contact, socials, Telegram handle: `src/lib/site.ts`
- Content: `src/lib/data/*`, UI strings: `src/lib/i18n/dictionaries/*`
\`\`\`
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: README and Nginx deploy config; final verification"
```

---

## Self-Review

**Spec coverage:**
- Next.js App Router + static export → Task 1 ✓
- en/uz/ru locale routing + generateStaticParams → Tasks 2, 4 ✓
- Translations as typed dictionaries → Task 2 ✓
- Data layer single source of truth → Task 3 ✓
- 4 pages (Home, Projects, About, Contact) → Tasks 6–9 ✓
- 5 curated projects → Task 3 data + Task 7 ✓
- Skills matrix, experience timeline, education → Tasks 3, 8 ✓
- Per-page per-locale metadata + hreflang + canonical → Task 4 (`buildMetadata`), used in 6–9 ✓
- Build-time OG images → Task 11 ✓
- sitemap + robots → Task 10 ✓
- JSON-LD Person → Task 4 layout ✓
- Clean light & editorial design, responsive, reduced-motion, focus → Tasks 1 (tokens/CSS), 5–9 ✓
- Email/LinkedIn/GitHub/Telegram contact + Download CV → Tasks 6, 9, 12 ✓
- Static-safe root redirect to /en → Task 4 ✓
- Deploy behind Nginx → Task 13 ✓

**Placeholder scan:** Telegram handle `@PLACEHOLDER` is the one intentional, spec-tracked placeholder in `src/lib/site.ts` (single point of change). No other placeholders.

**Type consistency:** `Locale`, `Dictionary`, `Project`, `Localized`, `ExperienceItem`, `Education`, `SkillGroup`, `buildMetadata`, `localizedPath`, `allUrls`, `renderOg/OG_SIZE/OG_CONTENT_TYPE` are defined once and consumed with matching signatures across tasks. Next 15 async `params: Promise<{ locale: string }>` used consistently in all pages and OG routes.

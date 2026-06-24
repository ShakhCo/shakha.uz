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

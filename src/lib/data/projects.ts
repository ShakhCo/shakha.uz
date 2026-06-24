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
    slug: "automations",
    name: "Automations.uz",
    url: "https://automations.uz",
    tags: ["NestJS", "BullMQ", "PostgreSQL", "Next.js", "OpenAI", "Python SDK"],
    role: {
      en: "Founder & Full-Stack Developer",
      uz: "Asoschi va Full-Stack dasturchi",
      ru: "Основатель и Full-Stack разработчик",
    },
    description: {
      en: "A multi-tenant Instagram automation platform — comment and DM auto-replies, AI-powered responses, an ice-breaker rule engine, and webhook-driven message processing, plus a published Python SDK for building bots. Built with NestJS, BullMQ, PostgreSQL, and a Next.js dashboard.",
      uz: "Ko'p ijarali Instagram avtomatlashtirish platformasi — izoh va DM avto-javoblar, AI javoblar, ice-breaker qoidalar mexanizmi va webhook orqali xabarlarni qayta ishlash, hamda botlar yaratish uchun chop etilgan Python SDK. NestJS, BullMQ, PostgreSQL va Next.js boshqaruv paneli bilan qurilgan.",
      ru: "Мультитенантная платформа автоматизации Instagram — авто-ответы на комментарии и DM, ответы с ИИ, движок правил ice-breaker и обработка сообщений через вебхуки, плюс опубликованный Python SDK для создания ботов. Создана на NestJS, BullMQ, PostgreSQL и панели на Next.js.",
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
  {
    slug: "outlookid",
    name: "OutlookID",
    url: null,
    tags: ["Fastify", "TypeScript", "Microsoft Graph", "Drizzle", "PostgreSQL"],
    role: {
      en: "Full-Stack Developer",
      uz: "Full-Stack dasturchi",
      ru: "Full-Stack разработчик",
    },
    description: {
      en: "A self-hosted email service that lets a single application read, send, and organize mail across many users' Outlook mailboxes through Microsoft Graph, delivering a signed webhook on every new message. Built with Fastify, Drizzle ORM, PostgreSQL, and a pg-boss job queue.",
      uz: "O'z serverida joylashtiriladigan email xizmati — bitta ilova Microsoft Graph orqali ko'plab foydalanuvchilarning Outlook pochtalarini o'qiydi, yuboradi va tartiblaydi, har bir yangi xat uchun imzolangan webhook yuboradi. Fastify, Drizzle ORM, PostgreSQL va pg-boss navbati bilan qurilgan.",
      ru: "Самостоятельно размещаемый email-сервис, позволяющий одному приложению читать, отправлять и систематизировать почту в множестве почтовых ящиков Outlook через Microsoft Graph, отправляя подписанный вебхук на каждое новое письмо. Создан на Fastify, Drizzle ORM, PostgreSQL и очереди pg-boss.",
    },
  },
  {
    slug: "ijara",
    name: "Ijara",
    url: null,
    tags: ["Django", "DRF", "Nuxt 3", "Vue 3", "PostgreSQL"],
    role: {
      en: "Full-Stack Developer",
      uz: "Full-Stack dasturchi",
      ru: "Full-Stack разработчик",
    },
    description: {
      en: "A peer-to-peer rental marketplace for Tashkent where owners list items — tools, electronics, event gear, vehicles — and renters browse, book, and pay online. Built with a Django REST Framework backend and a Nuxt 3 + Pinia frontend.",
      uz: "Toshkent uchun ijaralar marketpleysi — egalar buyumlarni (asboblar, elektronika, tadbir jihozlari, transport) joylaydi, ijarachilar ko'rib chiqadi, bron qiladi va onlayn to'laydi. Django REST Framework backend va Nuxt 3 + Pinia frontend bilan qurilgan.",
      ru: "Маркетплейс аренды для Ташкента, где владельцы размещают вещи — инструменты, электронику, оборудование для мероприятий, транспорт — а арендаторы выбирают, бронируют и оплачивают онлайн. Создан на Django REST Framework и фронтенде Nuxt 3 + Pinia.",
    },
  },
  {
    slug: "noserver",
    name: "noServer",
    url: null,
    tags: ["Node.js", "TCP Sockets", "HTTP/1.1", "WebSocket", "Zero-dependency"],
    role: {
      en: "Creator & Open-Source Author",
      uz: "Yaratuvchi va ochiq kodli muallif",
      ru: "Создатель и опенсорс-автор",
    },
    description: {
      en: "A zero-dependency Node.js web framework built from scratch on raw TCP sockets — a custom HTTP/1.1 parser and WebSocket implementation with config-driven routing, CRUD, CORS, rate limiting, and static file serving. A from-first-principles study of how web servers really work.",
      uz: "Noldan, faqat xom TCP soketlar ustida qurilgan, hech qanday bog'liqliksiz Node.js veb-freymvork — maxsus HTTP/1.1 parser va WebSocket, konfiguratsiyaga asoslangan routing, CRUD, CORS, rate limiting va statik fayllar. Veb-serverlar qanday ishlashini asoslardan o'rganish loyihasi.",
      ru: "Node.js веб-фреймворк без единой зависимости, построенный с нуля на «голых» TCP-сокетах — собственный парсер HTTP/1.1 и реализация WebSocket с конфигурируемой маршрутизацией, CRUD, CORS, ограничением частоты и раздачей статики. Изучение того, как на самом деле работают веб-серверы, с первых принципов.",
    },
  },
];

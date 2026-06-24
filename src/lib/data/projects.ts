import type { Locale } from "@/lib/i18n/config";

export type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  url: string | null;
  tags: string[];
  role: Localized;
  description: Localized;
  category: Localized;
  year: string | null;
  github: string | null;
  overview: Localized;
  highlights: Localized[];
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
    category: {
      en: "Booking SaaS Platform",
      uz: "Bandlov SaaS Platformasi",
      ru: "SaaS-платформа бронирования",
    },
    year: "2025 — Present",
    github: null,
    overview: {
      en: "BookUp is a multi-tenant SaaS that gives service businesses — barbershops, salons, billiards clubs — everything they need to take bookings and manage clients. It spans a Telegram mini-app for owners, a Next.js booking site for their customers, and a NestJS/PostgreSQL backend, and today serves 20+ businesses.",
      uz: "BookUp — xizmat ko'rsatuvchi bizneslar (sartaroshxonalar, salonlar, bilyard klublar) uchun ko'p ijarali SaaS bo'lib, egalar uchun Telegram mini-ilova, mijozlar uchun Next.js bandlov sayti va NestJS/PostgreSQL backenddan iborat. Bugun 20+ biznesga xizmat qiladi.",
      ru: "BookUp — мультитенантный SaaS, дающий сервисному бизнесу — барбершопам, салонам, бильярдным клубам — всё необходимое для приёма бронирований и управления клиентами. Включает Telegram мини-приложение для владельцев, сайт бронирования на Next.js для клиентов и бэкенд на NestJS/PostgreSQL. Сегодня обслуживает 20+ бизнесов.",
    },
    highlights: [
      {
        en: "Multi-tenant architecture serving 20+ service businesses from one platform.",
        uz: "Bitta platformadan 20+ xizmat biznesiga xizmat qiluvchi ko'p ijarali arxitektura.",
        ru: "Мультитенантная архитектура, обслуживающая 20+ сервисных бизнесов с одной платформы.",
      },
      {
        en: "End-to-end Payme payments with a per-user prepaid wallet that auto-deducts subscription fees from top-ups.",
        uz: "Har bir foydalanuvchi uchun to'ldirishdan obuna to'lovlarini avtomatik yechib oladigan oldindan to'langan hamyon bilan Payme to'lovlari.",
        ru: "Сквозные платежи Payme с предоплаченным кошельком на пользователя, автоматически списывающим абонентскую плату из пополнений.",
      },
      {
        en: "Instagram automation suite (comment/DM auto-replies, ice breakers, AI replies) on the Meta Graph API that turns social engagement into bookings.",
        uz: "Meta Graph API orqali ijtimoiy faollikni bronlovlarga aylantiruvchi Instagram avtomatlashtirish to'plami (izohlar/DM avto-javoblar, ice breaker, AI javoblar).",
        ru: "Пакет автоматизации Instagram (авто-ответы на комментарии/DM, ice breakers, ответы с ИИ) через Meta Graph API, превращающий социальную активность в бронирования.",
      },
    ],
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
    category: {
      en: "Insurance Marketplace",
      uz: "Sug'urta Marketpleysi",
      ru: "Страховой маркетплейс",
    },
    year: null,
    github: null,
    overview: {
      en: "MyPolis is an online insurance marketplace where customers compare and buy policies in one place and insurance companies join as listed partners. I delivered payment processing, point-of-sale systems, contract management, an admin panel, and business reporting.",
      uz: "MyPolis — onlayn sug'urta marketpleysi bo'lib, mijozlar bir joyda polislarni solishtirib sotib oladi, sug'urta kompaniyalari esa ro'yxatdagi hamkor sifatida qo'shiladi. To'lovlarni qayta ishlash, savdo nuqtalari, shartnomalarni boshqarish, admin panel va biznes hisobotlari yaratildi.",
      ru: "MyPolis — онлайн-маркетплейс страхования, где клиенты сравнивают и покупают полисы в одном месте, а страховые компании подключаются как партнёры. Реализованы обработка платежей, POS-системы, управление договорами, админ-панель и бизнес-отчётность.",
    },
    highlights: [
      {
        en: "Marketplace connecting customers with multiple insurance-company partners.",
        uz: "Mijozlarni bir nechta sug'urta kompaniyasi hamkorlari bilan bog'laydigan marketpleysi.",
        ru: "Маркетплейс, соединяющий клиентов с несколькими партнёрами-страховыми компаниями.",
      },
      {
        en: "Payment processing and point-of-sale systems for policy purchases.",
        uz: "Polis sotib olish uchun to'lovlarni qayta ishlash va savdo nuqtasi tizimlari.",
        ru: "Обработка платежей и POS-системы для приобретения полисов.",
      },
      {
        en: "Admin panel, contract management, and business reporting for operators.",
        uz: "Operatorlar uchun admin panel, shartnomalarni boshqarish va biznes hisobotlari.",
        ru: "Админ-панель, управление договорами и бизнес-отчётность для операторов.",
      },
    ],
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
    category: {
      en: "Automation SaaS",
      uz: "Avtomatlashtirish SaaS",
      ru: "SaaS-автоматизация",
    },
    year: null,
    github: null,
    overview: {
      en: "Automations.uz is a multi-tenant platform for automating Instagram engagement — auto-replies to comments and DMs, AI-powered responses, and an ice-breaker rule engine — built on a webhook-driven message pipeline. It ships with a published Python SDK so developers can build their own bots on top of the API.",
      uz: "Automations.uz — Instagram faolligini avtomatlashtirish uchun ko'p ijarali platforma: izohlar va DM larga avto-javoblar, AI javoblar va ice-breaker qoidalar mexanizmi — webhook orqali xabarlar quvurida qurilgan. Ishlab chiquvchilar API ustida o'z botlarini qurishlari uchun chop etilgan Python SDK bilan birga keladi.",
      ru: "Automations.uz — мультитенантная платформа для автоматизации активности в Instagram: авто-ответы на комментарии и DM, ответы с ИИ и движок правил ice-breaker — построена на конвейере обработки сообщений через вебхуки. Поставляется с опубликованным Python SDK, чтобы разработчики могли создавать собственных ботов поверх API.",
    },
    highlights: [
      {
        en: "Multi-tenant NestJS API with BullMQ-backed webhook processing and PostgreSQL.",
        uz: "BullMQ webhook ishlovchi va PostgreSQL bilan ko'p ijarali NestJS API.",
        ru: "Мультитенантный NestJS API с обработкой вебхуков на BullMQ и PostgreSQL.",
      },
      {
        en: "AI-powered auto-replies via OpenAI, plus a configurable ice-breaker rule engine.",
        uz: "OpenAI orqali AI yordamida avto-javoblar, shuningdek sozlanuvchi ice-breaker qoidalar mexanizmi.",
        ru: "Авто-ответы с ИИ через OpenAI, плюс настраиваемый движок правил ice-breaker.",
      },
      {
        en: "Published Python SDK (PyPI) and a Next.js dashboard for managing automations.",
        uz: "Chop etilgan Python SDK (PyPI) va avtomatlashtiruvlarni boshqarish uchun Next.js boshqaruv paneli.",
        ru: "Опубликованный Python SDK (PyPI) и панель управления на Next.js для управления автоматизациями.",
      },
    ],
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
    category: {
      en: "Logistics ERP / CRM",
      uz: "Logistika ERP / CRM",
      ru: "Логистика ERP / CRM",
    },
    year: "2022 — Present",
    github: null,
    overview: {
      en: "InterRail is a suite of ERP and CRM platforms I built from zero to automate the core operations of an international rail-freight logistics company, used across 6+ countries. It covers accounting, contract management, KPI tracking, and AI-assisted document processing.",
      uz: "InterRail — 6+ davlatda qo'llaniladigan xalqaro temir yo'l yuk logistikasi kompaniyasining asosiy operatsiyalarini avtomatlashtirish uchun noldan qurilgan ERP va CRM platformalari to'plami. Buxgalteriya, shartnomalarni boshqarish, KPI kuzatuvi va AI yordamida hujjatlarni qayta ishlashni qamrab oladi.",
      ru: "InterRail — набор ERP и CRM платформ, которые я построил с нуля для автоматизации ключевых операций международной компании железнодорожных грузоперевозок, используемых в 6+ странах. Охватывает бухгалтерию, управление договорами, отслеживание KPI и обработку документов с ИИ.",
    },
    highlights: [
      {
        en: "Custom ERP/CRM automating accounting (acts, contracts), KPIs, and inquiry handling.",
        uz: "Buxgalteriya (aktlar, shartnomalar), KPI va so'rovlarni boshqarishni avtomatlashtiradigan maxsus ERP/CRM.",
        ru: "Кастомная ERP/CRM, автоматизирующая бухгалтерию (акты, договоры), KPI и обработку заявок.",
      },
      {
        en: "AI document-processing tool that reads scanned documents and stores structured data, eliminating manual Excel entry.",
        uz: "Skanerlangan hujjatlarni o'qib, tuzilgan ma'lumotlarni saqlaydigan va qo'lda Excel kiritishini yo'q qiladigan AI hujjat qayta ishlash vositasi.",
        ru: "Инструмент обработки документов с ИИ, считывающий сканированные документы и сохраняющий структурированные данные, исключая ручной ввод в Excel.",
      },
      {
        en: "KPI monitoring system evaluating team and individual sales performance.",
        uz: "Jamoa va individual savdo ko'rsatkichlarini baholaydigan KPI monitoring tizimi.",
        ru: "Система мониторинга KPI, оценивающая командные и индивидуальные показатели продаж.",
      },
    ],
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
    category: {
      en: "Real-Estate Landing Page",
      uz: "Ko'chmas Mulk Landing Sahifasi",
      ru: "Лендинг для недвижимости",
    },
    year: null,
    github: null,
    overview: {
      en: "A professional enterprise landing page for a local real-estate developer, designed to showcase apartments and drive inquiries. It features interactive apartment floor plans, virtual tours, and a price calculator, built from Figma prototypes.",
      uz: "Mahalliy ko'chmas mulk ishlab chiqaruvchisi uchun professional landing sahifa — kvartiralarni namoyish etish va so'rovlarni rag'batlantirish uchun mo'ljallangan. Figma prototiplari asosida qurilgan interaktiv kvartira rejalari, virtual sayohatlar va narx kalkulyatorini o'z ichiga oladi.",
      ru: "Профессиональный корпоративный лендинг для местного застройщика, созданный для демонстрации квартир и привлечения обращений. Включает интерактивные планировки квартир, виртуальные туры и калькулятор цен, реализован по прототипам Figma.",
    },
    highlights: [
      {
        en: "Interactive apartment floor plans and virtual tours.",
        uz: "Interaktiv kvartira rejalari va virtual sayohatlar.",
        ru: "Интерактивные планировки квартир и виртуальные туры.",
      },
      {
        en: "Built-in price calculator for prospective buyers.",
        uz: "Potentsial xaridorlar uchun o'rnatilgan narx kalkulyatori.",
        ru: "Встроенный калькулятор цен для потенциальных покупателей.",
      },
      {
        en: "Next.js front-end implemented from Figma-based UI/UX prototypes.",
        uz: "Figma asosidagi UI/UX prototiplardan amalga oshirilgan Next.js fronted.",
        ru: "Фронтенд на Next.js, реализованный по UI/UX прототипам на основе Figma.",
      },
    ],
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
    category: {
      en: "Matchmaking Platform",
      uz: "Tanishuv Platformasi",
      ru: "Платформа знакомств",
    },
    year: null,
    github: null,
    overview: {
      en: "Baxtiyor Oila is a matchmaking service for the Uzbek community in Germany, delivered entirely through Telegram Mini Apps. It pairs a user-facing app and an admin app with a profile-matching algorithm.",
      uz: "Baxtiyor Oila — Germaniyadagi o'zbek jamoasi uchun to'liq Telegram Mini Ilovalar orqali taqdim etiladigan tanishuv xizmati. Foydalanuvchilarga mo'ljallangan ilova va admin ilova profil moslashtirish algoritmi bilan birlashtirilgan.",
      ru: "Baxtiyor Oila — сервис знакомств для узбекского сообщества в Германии, реализованный полностью через Telegram Mini Apps. Объединяет пользовательское приложение и приложение для администраторов с алгоритмом подбора профилей.",
    },
    highlights: [
      {
        en: "User-facing and admin Telegram Mini Apps with a profile-matching algorithm.",
        uz: "Foydalanuvchi va admin Telegram Mini Ilovalari profil moslashtirish algoritmi bilan.",
        ru: "Пользовательское и административное Telegram Mini-приложения с алгоритмом подбора профилей.",
      },
      {
        en: "Go API backend powering matching and data.",
        uz: "Moslashtirish va ma'lumotlarni boshqaradigan Go API backend.",
        ru: "Go API бэкенд, обеспечивающий подбор и данные.",
      },
      {
        en: "Python notification bot keeping users updated on matches.",
        uz: "Foydalanuvchilarni moslashtiruvchilar haqida xabardor qiladigan Python bildirishnoma boti.",
        ru: "Python-бот уведомлений, держащий пользователей в курсе совпадений.",
      },
    ],
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
    category: {
      en: "Email Infrastructure",
      uz: "Email Infratuzilmasi",
      ru: "Почтовая инфраструктура",
    },
    year: null,
    github: null,
    overview: {
      en: "OutlookID is a self-hosted backend that lets a single application read, send, and organize email across many users' Outlook mailboxes through Microsoft Graph. Every incoming message fires a signed webhook to the downstream app, so products can build on Outlook without handling OAuth themselves.",
      uz: "OutlookID — o'z serverida joylashtirilgan backend bo'lib, bitta ilovaga Microsoft Graph orqali ko'plab foydalanuvchilarning Outlook pochtalarini o'qish, yuborish va tartiblashtirish imkonini beradi. Har bir kiruvchi xabar pastdagi ilovaga imzolangan webhook yuboradi, shuning uchun mahsulotlar OAuth ni mustaqil boshqarmasdan Outlook ustida qurishadi.",
      ru: "OutlookID — самостоятельно размещаемый бэкенд, позволяющий одному приложению читать, отправлять и систематизировать почту в множестве почтовых ящиков Outlook через Microsoft Graph. Каждое входящее сообщение отправляет подписанный вебхук в нижестоящее приложение, поэтому продукты могут строиться на Outlook без самостоятельной обработки OAuth.",
    },
    highlights: [
      {
        en: "Multi-mailbox Outlook access via Microsoft Graph, with per-user OAuth handled centrally.",
        uz: "Microsoft Graph orqali ko'p qutili Outlook kirish, har bir foydalanuvchi uchun OAuth markaziy boshqariladi.",
        ru: "Доступ к нескольким почтовым ящикам Outlook через Microsoft Graph с централизованной обработкой OAuth на пользователя.",
      },
      {
        en: "Signed webhooks on new mail, backed by a pg-boss job queue with retry handling.",
        uz: "Yangi xatlarda imzolangan webhooklar, takror urinishlarni boshqaruvchi pg-boss ish navbati bilan ta'minlangan.",
        ru: "Подписанные вебхуки на новые письма, поддерживаемые очередью задач pg-boss с обработкой повторных попыток.",
      },
      {
        en: "Built on Fastify, Drizzle ORM, and PostgreSQL — fully self-hostable via Docker.",
        uz: "Fastify, Drizzle ORM va PostgreSQL da qurilgan — Docker orqali to'liq o'z serverida joylashtirilishi mumkin.",
        ru: "Построен на Fastify, Drizzle ORM и PostgreSQL — полностью самостоятельно размещаемый через Docker.",
      },
    ],
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
    category: {
      en: "Rental Marketplace",
      uz: "Ijara Marketpleysi",
      ru: "Маркетплейс аренды",
    },
    year: null,
    github: null,
    overview: {
      en: "Ijara is a peer-to-peer rental marketplace for Tashkent where owners list items — tools, electronics, event gear, vehicles — and renters browse, book, and pay online. It pairs a Django REST Framework backend with a Nuxt 3 + Pinia front-end.",
      uz: "Ijara — Toshkent uchun tengdoshlar arasi ijara marketpleysi bo'lib, egalar buyumlarni (asboblar, elektronika, tadbir jihozlari, transport) joylaydi, ijarachilar ko'rib chiqadi, bron qiladi va onlayn to'laydi. Django REST Framework backend va Nuxt 3 + Pinia fronted bilan birlashtirilgan.",
      ru: "Ijara — одноранговый маркетплейс аренды для Ташкента, где владельцы размещают вещи — инструменты, электронику, оборудование для мероприятий, транспорт — а арендаторы выбирают, бронируют и оплачивают онлайн. Сочетает бэкенд Django REST Framework с фронтендом Nuxt 3 + Pinia.",
    },
    highlights: [
      {
        en: "Two-sided marketplace with listings, search, booking, and online payments.",
        uz: "E'lonlar, qidiruv, bron va onlayn to'lovlar bilan ikki tomonlama marketpleysi.",
        ru: "Двусторонний маркетплейс с объявлениями, поиском, бронированием и онлайн-оплатой.",
      },
      {
        en: "Django REST Framework backend on PostgreSQL.",
        uz: "PostgreSQL ustidagi Django REST Framework backend.",
        ru: "Бэкенд Django REST Framework на PostgreSQL.",
      },
      {
        en: "Nuxt 3 + Pinia front-end for browsing and managing rentals.",
        uz: "Ijaralarni ko'rib chiqish va boshqarish uchun Nuxt 3 + Pinia fronted.",
        ru: "Фронтенд Nuxt 3 + Pinia для просмотра и управления арендой.",
      },
    ],
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
    category: {
      en: "Open-Source Framework",
      uz: "Ochiq Kodli Freymvork",
      ru: "Опенсорс-фреймворк",
    },
    year: null,
    github: null,
    overview: {
      en: "noServer is a Node.js web framework I built from scratch with zero dependencies, directly on raw TCP sockets. It implements its own HTTP/1.1 parser and a WebSocket layer, with config-driven routing, CRUD, CORS, rate limiting, and static-file serving — a study in how web servers actually work under the hood.",
      uz: "noServer — men noldan, hech qanday bog'liqliksiz, to'g'ridan-to'g'ri xom TCP soketlar ustida qurilgan Node.js veb-freymvork. U o'zining HTTP/1.1 parser va WebSocket qatlamini, konfiguratsiyaga asoslangan routing, CRUD, CORS, rate limiting va statik fayl xizmatini amalga oshiradi — veb-serverlar qanday ishlashini o'rganish loyihasi.",
      ru: "noServer — Node.js веб-фреймворк, который я построил с нуля без каких-либо зависимостей, напрямую на «голых» TCP-сокетах. Реализует собственный парсер HTTP/1.1 и слой WebSocket с конфигурируемой маршрутизацией, CRUD, CORS, ограничением частоты и раздачей статических файлов — изучение того, как веб-серверы работают под капотом.",
    },
    highlights: [
      {
        en: "Custom HTTP/1.1 parser and WebSocket implementation on raw TCP sockets.",
        uz: "Xom TCP soketlar ustida maxsus HTTP/1.1 parser va WebSocket implementatsiyasi.",
        ru: "Кастомный парсер HTTP/1.1 и реализация WebSocket на «голых» TCP-сокетах.",
      },
      {
        en: "Config-driven routing, CRUD, CORS, rate limiting, and static-file serving.",
        uz: "Konfiguratsiyaga asoslangan routing, CRUD, CORS, tezlik cheklash va statik fayl xizmati.",
        ru: "Конфигурируемая маршрутизация, CRUD, CORS, ограничение частоты и раздача статических файлов.",
      },
      {
        en: "Zero runtime dependencies — pure Node.js standard library.",
        uz: "Hech qanday ish vaqti bog'liqliklari yo'q — sof Node.js standart kutubxonasi.",
        ru: "Ноль зависимостей во время выполнения — чистая стандартная библиотека Node.js.",
      },
    ],
  },
];

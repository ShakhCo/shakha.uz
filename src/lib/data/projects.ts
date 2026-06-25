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
  image: string | null;
  overview: Localized;
  responsibilities: Localized[];
  architecture: Localized;
  engineering: Localized[];
  stackGroups: { label: Localized; items: string[] }[];
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
    image: "/projects/bookup.png",
    overview: {
      en: "BookUp is a multi-tenant SaaS that gives service businesses — barbershops, salons, billiards clubs — everything they need to take bookings and manage clients. It spans a Telegram mini-app for owners, a Next.js booking site for their customers, and a NestJS/PostgreSQL backend, and today serves 20+ businesses.",
      uz: "BookUp — xizmat ko'rsatuvchi bizneslar (sartaroshxonalar, salonlar, bilyard klublar) uchun ko'p ijarali SaaS bo'lib, egalar uchun Telegram mini-ilova, mijozlar uchun Next.js bandlov sayti va NestJS/PostgreSQL backenddan iborat. Bugun 20+ biznesga xizmat qiladi.",
      ru: "BookUp — мультитенантный SaaS, дающий сервисному бизнесу — барбершопам, салонам, бильярдным клубам — всё необходимое для приёма бронирований и управления клиентами. Включает Telegram мини-приложение для владельцев, сайт бронирования на Next.js для клиентов и бэкенд на NestJS/PostgreSQL. Сегодня обслуживает 20+ бизнесов.",
    },
    responsibilities: [
      {
        en: "Architected and built the entire Next.js 16 public tenant site — ISR-cached tenant pages, SSR booking flows (service selection → OTP → confirmation), and subdomain routing via middleware rewrite.",
        uz: "To'liq Next.js 16 ommaviy tenant saytini yaratdim — ISR keshli tenant sahifalari, SSR bandlov oqimlari (xizmat tanlash → OTP → tasdiqlash) va middleware rewrite orqali subdomain routingi.",
        ru: "Спроектировал и построил весь публичный сайт Next.js 16 — ISR-кешированные страницы тенантов, SSR потоки бронирования (выбор услуги → OTP → подтверждение) и маршрутизацию поддоменов через middleware rewrite.",
      },
      {
        en: "Owned the full Telegram Mini App — Zustand auth store with token rotation, Payme top-up + ledger UI, timetable layout engine, and Instagram OAuth integration flow.",
        uz: "To'liq Telegram Mini Ilovasini boshqardim — Zustand auth store'i token rotatsiyasi bilan, Payme to'ldirish + daftar UI, jadval layout mexanizmi va Instagram OAuth integratsiya oqimi.",
        ru: "Полностью владел Telegram Mini App — Zustand auth store с ротацией токенов, UI пополнения Payme и журнала операций, движок раскладки расписания и поток OAuth-интеграции Instagram.",
      },
      {
        en: "Designed the SaaS pricing model and billing frontend — tiered plans (Starter/Pro/Enterprise), per-staff pricing, SMS packs, and an add-ons calculator, all driven by lib/pricing.ts.",
        uz: "SaaS narxlash modelini va billing frontendini loyihalashtirdim — bosqichli rejalar (Starter/Pro/Enterprise), xodimga asoslangan narxlash, SMS to'plamlari va qo'shimchalar kalkulyatori, barchasi lib/pricing.ts orqali.",
        ru: "Спроектировал модель ценообразования SaaS и биллинговый фронтенд — многоуровневые планы (Starter/Pro/Enterprise), цены за сотрудника, SMS-пакеты и калькулятор дополнений, управляемый lib/pricing.ts.",
      },
      {
        en: "Implemented multi-tenancy security — tenant-jail in-process rate limiter (lib/tenant-jail.ts) tracking misses per IP in a rolling 1-hour window with a bounded 100k-entry cap.",
        uz: "Ko'p ijarali xavfsizlikni amalga oshirdim — tenant-jail ichki protsess rate limiter (lib/tenant-jail.ts) IP bo'yicha xatolarni 1 soatlik aylanma oynada 100k yozuv chegarasida kuzatadi.",
        ru: "Реализовал безопасность мультитенантности — внутрипроцессный ограничитель скорости tenant-jail (lib/tenant-jail.ts), отслеживающий промахи по IP в скользящем 1-часовом окне с ограничением в 100k записей.",
      },
    ],
    architecture: {
      en: "BookUp separates concerns into three deployable units: the Next.js landing/tenant site handles marketing pages, ISR-cached tenant public pages, and SSR booking flows via Server Actions; the Vite-built Telegram Mini App serves as the owner/staff dashboard inside Telegram; a NestJS REST API acts as the single backend consumed by both frontends. Multi-tenancy is implemented at the edge: Next.js middleware reads the Host header, strips the subdomain, validates it against a DNS label regex, and rewrites the request to an internal /tenant/[subdomain] route — keeping tenant routes unreachable on the root domain.",
      uz: "BookUp uchta mustaqil joylashtiriluvchi birlikka ajratilgan: Next.js landing/tenant sayti marketing sahifalar, ISR keshli tenant sahifalar va Server Actions orqali SSR bandlov oqimlarini boshqaradi; Vite bilan qurilgan Telegram Mini Ilova egalar/xodimlar boshqaruv paneli sifatida xizmat qiladi; NestJS REST API ikkala frontendning yagona backendi hisoblanadi. Ko'p ijaralilik edge'da amalga oshirilgan: Next.js middleware Host sarlavhasini o'qiydi, subdomenni ajratib oladi, DNS label regexiga solishtirib tekshiradi va so'rovni ichki /tenant/[subdomain] yo'liga yo'naltiradi.",
      ru: "BookUp разделён на три развёртываемых блока: сайт Next.js для лендинга и тенантов обрабатывает маркетинговые страницы, ISR-кешированные страницы тенантов и SSR потоки бронирования через Server Actions; Vite-приложение Telegram Mini App служит панелью управления для владельцев/сотрудников внутри Telegram; NestJS REST API является единственным бэкендом, потребляемым обоими фронтендами. Мультитенантность реализована на границе: middleware Next.js читает заголовок Host, извлекает поддомен, проверяет его по DNS-regex и переписывает запрос во внутренний маршрут /tenant/[subdomain].",
    },
    engineering: [
      {
        en: "Subdomain multi-tenancy with edge security: middleware.ts resolves <sub>.bookup.uz → /tenant/<sub> via NextResponse.rewrite, validates labels with /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, and blocks direct /tenant/* access on the root host. lib/tenant-jail.ts is a pure, unit-tested in-memory fail2ban that tracks misses per IP in a rolling 1-hour window with a bounded 100k-entry cap and O(1) sweep.",
        uz: "Subdomen ko'p ijaraliligi edge xavfsizligi bilan: middleware.ts NextResponse.rewrite orqali <sub>.bookup.uz → /tenant/<sub> ga yo'naltiradi, labellarni /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/ bilan tekshiradi va root hostda /tenant/* ga to'g'ridan-to'g'ri kirishni bloklaydi. lib/tenant-jail.ts 100k yozuv chegarasi va O(1) tozalash bilan 1 soatlik oynada IP bo'yicha xatolarni kuzatuvchi sof, testlangan xotira ichidagi fail2ban.",
        ru: "Мультитенантность поддоменов с защитой на границе: middleware.ts разрешает <sub>.bookup.uz → /tenant/<sub> через NextResponse.rewrite, проверяет метки с /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/ и блокирует прямой доступ /tenant/* на корневом хосте. lib/tenant-jail.ts — чистый протестированный fail2ban в памяти, отслеживающий промахи по IP в скользящем 1-часовом окне с ограничением 100k записей и сверткой O(1).",
      },
      {
        en: "Payme prepaid wallet with typed ledger: owners top up via Payme (POST /me/balance/topups → returns checkoutUrl). The backend auto-deducts saas_fee, per-SMS charges, and refunds, all surfaced as typed UserLedgerKind entries in a paginated ledger UI (BalancePage.tsx). Minimum top-up 10,000 UZS; presets 50k/100k/200k/500k.",
        uz: "Payme oldindan to'langan hamyon va yozilgan daftar: egalar Payme orqali to'ldiradi (POST /me/balance/topups → checkoutUrl qaytaradi). Backend saas_fee, SMS to'lovlari va qaytarishlarni avtomatik yechadi, barchasi BalancePage.tsx'da sahifalangan daftar UI'da UserLedgerKind yozuvlari sifatida ko'rsatiladi. Minimal to'ldirish 10 000 UZS; oldindan belgilangan: 50k/100k/200k/500k.",
        ru: "Предоплаченный кошелёк Payme с типизированным журналом: владельцы пополняют через Payme (POST /me/balance/topups → возвращает checkoutUrl). Бэкенд автоматически списывает saas_fee, плату за SMS и возвраты, всё отображается как типизированные записи UserLedgerKind в постраничном UI журнала (BalancePage.tsx). Минимальное пополнение 10 000 UZS; пресеты 50k/100k/200k/500k.",
      },
      {
        en: "Single-flight token refresh in Telegram Mini App: authStore.ts implements single-flight bootstrap (stored refresh token → silent Telegram initData HMAC login → OTP fallback). A de-duplicated refreshOnce() in http.ts ensures concurrent 401s share one refresh round-trip, avoiding reuse-token revocation bugs.",
        uz: "Telegram Mini Ilovasida single-flight token yangilash: authStore.ts single-flight bootstrap'ni amalga oshiradi (saqlangan refresh token → jim Telegram initData HMAC login → OTP zaxirasi). http.ts'dagi takrorlanmaydigan refreshOnce() bir vaqtdagi 401 larning bitta yangilash aylanmasini baham ko'rishini ta'minlaydi, token qayta ishlatish revokatsiya xatolarini oldini oladi.",
        ru: "Обновление токена single-flight в Telegram Mini App: authStore.ts реализует single-flight bootstrap (сохранённый refresh token → тихий HMAC-логин через initData Telegram → резерв OTP). Дедуплицированный refreshOnce() в http.ts гарантирует, что параллельные 401 используют один цикл обновления, исключая ошибки отзыва токена повторного использования.",
      },
      {
        en: "Dual pricing modes for bookings: offerings support fixed (flat price + duration) or time_rate (per-hour rate + peak-window RateRule[]) pricing. Bookable resources are typed as staff or asset (tables, courts), each linked to offerings via ResourceUnit.offerings[] — modelling both barbershops and per-hour rental businesses in one schema.",
        uz: "Bandlovlar uchun qo'sh narxlash rejimlari: takliflar fixed (tekis narx + davomiylik) yoki time_rate (soatbay stavka + cho'qqi oyna RateRule[]) narxlashni qo'llab-quvvatlaydi. Bronlanadigan resurslar staff yoki asset (stollar, kortlar) sifatida turlanadi, har biri ResourceUnit.offerings[] orqali takliflarga bog'langan — bir sxemada sartaroshxonalar va soatbay ijara bizneslarini modellashtiradi.",
        ru: "Два режима ценообразования бронирований: предложения поддерживают fixed (фиксированная цена + длительность) или time_rate (почасовая ставка + пиковые окна RateRule[]). Бронируемые ресурсы типизированы как staff или asset (столы, корты), каждый связан с предложениями через ResourceUnit.offerings[] — моделируя и барбершопы, и почасовую аренду в одной схеме.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend (Public Site)", uz: "Frontend (Ommaviy Sayt)", ru: "Фронтенд (публичный сайт)" },
        items: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "shadcn/ui", "Framer Motion", "GSAP"],
      },
      {
        label: { en: "Frontend (Telegram Mini App)", uz: "Frontend (Telegram Mini Ilova)", ru: "Фронтенд (Telegram Mini App)" },
        items: ["Vite", "React 18", "Zustand 5", "TanStack Query 5", "@tma.js/sdk-react", "i18next"],
      },
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["NestJS", "PostgreSQL", "REST API"],
      },
      {
        label: { en: "Infra & Tools", uz: "Infratuzilma va Asboblar", ru: "Инфраструктура и инструменты" },
        items: ["Docker", "Cloudflare", "Google Maps API", "Payme", "Vitest"],
      },
    ],
  },
  {
    slug: "mypolis",
    name: "MyPolis",
    url: "https://my-polis.uz",
    tags: ["Next.js", "Django REST", "PostgreSQL", "Telegram Mini App", "Payments"],
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
    image: "/projects/mypolis.png",
    overview: {
      en: "MyPolis is an online insurance marketplace where customers compare and buy OSAGO, KASKO, and Travel policies in one place across multiple insurers. I designed and built the customer Next.js storefront, the Django 4.2 REST backend integrating with EuroAsia EAI, Asia Insurance, and O'zagrosug'urta APIs, and a standalone admin panel.",
      uz: "MyPolis — onlayn sug'urta marketpleysi bo'lib, mijozlar bir joyda OSAGO, KASKO va sayohat polislarini bir nechta sug'urtachidan taqqoslab sotib oladi. Men Next.js mijozlar saytini, EuroAsia EAI, Asia Insurance va O'zagrosug'urta APIlari bilan integratsiyalashgan Django 4.2 REST backendini va alohida admin panelini yaratdim.",
      ru: "MyPolis — онлайн-маркетплейс страхования, где клиенты сравнивают и покупают полисы ОСАГО, КАСКО и Travel от нескольких страховщиков в одном месте. Я спроектировал и построил клиентский сайт на Next.js, бэкенд Django 4.2 REST с интеграцией API EuroAsia EAI, Asia Insurance и O'zagrosug'urta, а также отдельную админ-панель.",
    },
    responsibilities: [
      {
        en: "Sole full-stack developer: designed and built the customer frontend (Next.js 16 + React 19), the Django 4.2 REST backend, and the separate admin panel from scratch.",
        uz: "Yagona full-stack dasturchi: mijozlar frontendini (Next.js 16 + React 19), Django 4.2 REST backendini va alohida admin panelini noldan loyihalashtirdim va yaratdim.",
        ru: "Единственный full-stack разработчик: спроектировал и построил с нуля клиентский фронтенд (Next.js 16 + React 19), бэкенд Django 4.2 REST и отдельную админ-панель.",
      },
      {
        en: "Architected the multi-provider integration layer — EuroAsia EAI, Asia Insurance, O'zagrosug'urta — each with its own Django app, typed API client, and serializers.",
        uz: "Ko'p provayder integratsiya qatlamini loyihalashtirdim — EuroAsia EAI, Asia Insurance, O'zagrosug'urta — har biri o'z Django ilovasi, turli API klienti va serializatorlariga ega.",
        ru: "Спроектировал слой интеграции с несколькими провайдерами — EuroAsia EAI, Asia Insurance, O'zagrosug'urta — каждый со своим Django-приложением, типизированным API-клиентом и сериализаторами.",
      },
      {
        en: "Implemented the Telegram Mini App dashboard with real-time revenue and policy monitoring, including the Telegram WebApp initData HMAC verification flow.",
        uz: "Real vaqtdagi daromad va polis monitoringi bilan Telegram Mini Ilova boshqaruv panelini amalga oshirdim, jumladan Telegram WebApp initData HMAC tasdiqlash oqimini.",
        ru: "Реализовал панель управления Telegram Mini App с мониторингом выручки и полисов в реальном времени, включая поток HMAC-верификации initData Telegram WebApp.",
      },
      {
        en: "Owned all data modelling: Contract, Insurant, Owner, Vehicle, Driver, CommissionRate, PromoCode, PartnershipApplication, and a custom CustomUser with PINFL + OneID fields.",
        uz: "Barcha ma'lumot modellashtirish: Contract, Insurant, Owner, Vehicle, Driver, CommissionRate, PromoCode, PartnershipApplication va PINFL + OneID maydonlari bilan maxsus CustomUser.",
        ru: "Владел всем моделированием данных: Contract, Insurant, Owner, Vehicle, Driver, CommissionRate, PromoCode, PartnershipApplication и кастомный CustomUser с полями PINFL + OneID.",
      },
    ],
    architecture: {
      en: "The system is split into three applications: a Next.js 16 customer storefront (multi-locale: uz-lat, uz-cyr, ru), a Django 4.2 / DRF backend serving a versioned REST API (/api/v1/), and a separate Next.js 16 admin SPA. The backend routes each provider through its own Django app (euroasia, asiainsurance, ozagrosugurta), each holding a typed API client and serializers, while cross-cutting concerns (contracts, company registry, promo codes) live in a shared contracts app. The Organization model stores display order and a show_on_landing flag that drives the landing page partner section directly.",
      uz: "Tizim uchta ilovaga bo'lingan: Next.js 16 mijozlar sayti (ko'p tilli: uz-lat, uz-cyr, ru), versiyalangan REST API (/api/v1/) taqdim etuvchi Django 4.2 / DRF backend va alohida Next.js 16 admin SPA. Backend har bir provayderni o'z Django ilovasi (euroasia, asiainsurance, ozagrosugurta) orqali yo'naltiradi, har biri turli API klienti va serializatorlarga ega, umumiy tashvishlar (shartnomalar, kompaniya ro'yxati, promo kodlar) esa umumiy contracts ilovasida joylashadi.",
      ru: "Система разделена на три приложения: клиентский сайт Next.js 16 (мультилокаль: uz-lat, uz-cyr, ru), бэкенд Django 4.2 / DRF с версионированным REST API (/api/v1/) и отдельная SPA-админка на Next.js 16. Бэкенд маршрутизирует каждого провайдера через своё Django-приложение (euroasia, asiainsurance, ozagrosugurta), каждое со своим типизированным API-клиентом и сериализаторами; общие сущности (договоры, реестр компаний, промокоды) живут в общем приложении contracts.",
    },
    engineering: [
      {
        en: "Atomic multi-insurer POS flow with rollback + Telegram orphan-policy alert: each insurer's create view wraps contract creation in transaction.atomic — creates the local Contract in payment_status='pending', calls the insurer API, retrieves the payment URL, then commits. If payment-link retrieval fails after the insurer has already registered the policy, the handler rolls back and fires a Telegram alert for the orphan-policy edge case.",
        uz: "Rollback va Telegram orfan-polis ogohlantirishi bilan atomik ko'p sug'urtachi POS oqimi: har bir sug'urtachining create ko'rinishi shartnoma yaratishni transaction.atomic'da o'raydi — mahalliy Contractni payment_status='pending'da yaratadi, sug'urtachi APIni chaqiradi, to'lov URLini oladi, keyin bajaradi. Agar sug'urtachi allaqachon polisni ro'yxatdan o'tkazgandan so'ng to'lov havolasini olish muvaffaqiyatsiz bo'lsa, handler orqaga qaytadi va orfan-polis chekka holati uchun Telegram ogohlantirishini yuboradi.",
        ru: "Атомарный POS-поток для нескольких страховщиков с откатом и Telegram-уведомлением об «осиротевшем» полисе: каждый view создания оборачивает создание договора в transaction.atomic — создаёт локальный Contract в payment_status='pending', вызывает API страховщика, получает URL оплаты, затем фиксирует. Если получение ссылки оплаты не удаётся после того, как страховщик уже зарегистрировал полис, обработчик откатывается и отправляет Telegram-уведомление об «осиротевшем» полисе.",
      },
      {
        en: "Commission and promo-code engine: CommissionRate stores per-company, per-product-type brokerage percentages (unique_together = (company, product_type)). PromoCode supports both percentage and fixed-UZS discount types, scoped to a M2M set of companies with date-range validity. A shared validate_promo_code() service re-validates on every create request before persisting.",
        uz: "Komissiya va promo-kod mexanizmi: CommissionRate kompaniya va mahsulot turi bo'yicha maklering foizlarini saqlaydi (unique_together = (company, product_type)). PromoCode foiz va belgilangan UZS chegirma turlarini, sana oralig'i amal qilish muddati bilan M2M kompaniyalar to'plamiga moslashtirilgan holda qo'llab-quvvatlaydi. Umumiy validate_promo_code() xizmati saqlaganga qadar har bir yaratish so'rovida qayta tekshiradi.",
        ru: "Движок комиссий и промокодов: CommissionRate хранит брокерские проценты по компании и типу продукта (unique_together = (company, product_type)). PromoCode поддерживает как процентные, так и фиксированные UZS-скидки, привязанные к M2M-набору компаний с диапазоном дат действия. Общий сервис validate_promo_code() повторно проверяет перед сохранением при каждом запросе на создание.",
      },
      {
        en: "Telegram Mini App initData HMAC auth: the tma app issues 12-hour bearer tokens after verifying Telegram's HMAC initData signature per core.telegram.org spec, including the 24-hour auth_date staleness check. Whitelisted admin Telegram IDs gate dashboard access.",
        uz: "Telegram Mini Ilova initData HMAC autentifikatsiyasi: tma ilovasi core.telegram.org spetsifikatsiyasi bo'yicha Telegram HMAC initData imzosini tekshirgandan so'ng, 24 soatlik auth_date eskirganlik tekshiruvi ham kiritilgan holda 12 soatlik bearer tokenlar beradi. Ro'yxatga olingan admin Telegram IDlari boshqaruv paneliga kirishni nazorat qiladi.",
        ru: "HMAC-аутентификация initData Telegram Mini App: приложение tma выдаёт 12-часовые bearer-токены после проверки HMAC-подписи initData Telegram по спецификации core.telegram.org, включая проверку устаревания auth_date на 24 часа. Белый список admin Telegram ID контролирует доступ к панели управления.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend (Storefront + Admin)", uz: "Frontend (Do'kon + Admin)", ru: "Фронтенд (витрина + админка)" },
        items: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "shadcn/ui", "TanStack Query v5", "next-intl"],
      },
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["Python 3.9", "Django 4.2", "Django REST Framework 3.14", "djangorestframework-simplejwt", "django-modeltranslation"],
      },
      {
        label: { en: "Data", uz: "Ma'lumotlar", ru: "Данные" },
        items: ["PostgreSQL", "Django ORM", "pandas", "openpyxl"],
      },
      {
        label: { en: "Infra & Tools", uz: "Infratuzilma va Asboblar", ru: "Инфраструктура и инструменты" },
        items: ["Docker", "Nginx", "Telegram Bot API", "Gunicorn", "Whitenoise"],
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
    image: "/projects/automations.png",
    overview: {
      en: "Automations.uz is a multi-tenant platform for automating Instagram engagement — auto-replies to comments and DMs, AI-powered responses, and an ice-breaker rule engine — built on a webhook-driven message pipeline. It ships with a published Python SDK so developers can build their own bots on top of the API.",
      uz: "Automations.uz — Instagram faolligini avtomatlashtirish uchun ko'p ijarali platforma: izohlar va DM larga avto-javoblar, AI javoblar va ice-breaker qoidalar mexanizmi — webhook orqali xabarlar quvurida qurilgan. Ishlab chiquvchilar API ustida o'z botlarini qurishlari uchun chop etilgan Python SDK bilan birga keladi.",
      ru: "Automations.uz — мультитенантная платформа для автоматизации активности в Instagram: авто-ответы на комментарии и DM, ответы с ИИ и движок правил ice-breaker — построена на конвейере обработки сообщений через вебхуки. Поставляется с опубликованным Python SDK, чтобы разработчики могли создавать собственных ботов поверх API.",
    },
    responsibilities: [
      {
        en: "Designed and built the entire NestJS API: multi-tenant Account/User/ApiKey model, Instagram OAuth flow, webhook ingestion pipeline, rule engine, AI reply layer, and ice-breaker sync.",
        uz: "To'liq NestJS APIni loyihalashtirdim va yaratdim: ko'p ijarali Account/User/ApiKey modeli, Instagram OAuth oqimi, webhook qabul quvuri, qoidalar mexanizmi, AI javob qatlami va ice-breaker sinxronizatsiyasi.",
        ru: "Спроектировал и построил весь NestJS API: мультитенантная модель Account/User/ApiKey, поток Instagram OAuth, конвейер входящих вебхуков, движок правил, слой ответов ИИ и синхронизация ice-breaker.",
      },
      {
        en: "Built the Next.js customer dashboard (automations.uz) and admin panel from scratch.",
        uz: "Next.js mijozlar boshqaruv paneli (automations.uz) va admin panelini noldan yaratdim.",
        ru: "Построил с нуля клиентскую панель управления Next.js (automations.uz) и админ-панель.",
      },
      {
        en: "Authored and published the Python SDK (social-media-automations v0.1.5 on PyPI) including the async Bot class, handler decorators, long-poll client, and full test suite.",
        uz: "Python SDK (social-media-automations v0.1.5 PyPI'da) ni asinxron Bot klassi, handler dekoratorlar, long-poll klient va to'liq test to'plami bilan yazdim va nashr etdim.",
        ru: "Разработал и опубликовал Python SDK (social-media-automations v0.1.5 на PyPI), включая асинхронный класс Bot, декораторы обработчиков, long-poll клиент и полный набор тестов.",
      },
      {
        en: "Maintained 14-migration TypeORM schema history, Dockerfiles, and docker-compose setup for API + Redis + Postgres.",
        uz: "14 migratsiyali TypeORM sxema tarixini, Dockerfile va docker-compose sozlamasini API + Redis + Postgres uchun saqladim.",
        ru: "Вёл историю схемы TypeORM из 14 миграций, Dockerfile и настройку docker-compose для API + Redis + Postgres.",
      },
    ],
    architecture: {
      en: "The NestJS API is the authoritative multi-tenant backend: every resource (Channel, Rule, KnowledgeBase, BotUpdate) is scoped to an Account, and all external API calls are gated by ApiKeyGuard. Meta Graph API webhooks are received, HMAC-verified, and immediately queued into BullMQ's instagram-ingestion queue; the IngestionProcessor runs transactions to persist events before dispatching to either the rule engine (AI + canned replies) or the bot delivery layer (for SDK consumers in polling mode). The Python SDK wraps the /bot/v1/getUpdates long-poll endpoint so developers write decorator-based handlers without hosting webhook infrastructure.",
      uz: "NestJS API yetakchi ko'p ijarali backend: har bir resurs (Channel, Rule, KnowledgeBase, BotUpdate) Account'ga bog'langan, barcha tashqi API chaqiruvlari ApiKeyGuard tomonidan nazorat qilinadi. Meta Graph API webhooklari qabul qilinadi, HMAC tekshiriladi va darhol BullMQ'ning instagram-ingestion navbatiga qo'shiladi; IngestionProcessor voqealarni saqlash uchun tranzaksiyalarni ishlatadi, keyin qoidalar mexanizmi yoki bot yetkazish qatlamiga yuboradi. Python SDK /bot/v1/getUpdates long-poll endpointini o'raydi.",
      ru: "NestJS API является авторитетным мультитенантным бэкендом: каждый ресурс (Channel, Rule, KnowledgeBase, BotUpdate) привязан к Account, все внешние вызовы API контролируются ApiKeyGuard. Вебхуки Meta Graph API принимаются, проверяются HMAC и немедленно ставятся в очередь BullMQ instagram-ingestion; IngestionProcessor выполняет транзакции для сохранения событий перед отправкой в движок правил или слой доставки бота. Python SDK оборачивает long-poll эндпоинт /bot/v1/getUpdates.",
    },
    engineering: [
      {
        en: "SHA-256 API-key hashing with timing-safe compare: Account owns ApiKey[]; each key stores only a keyPrefix (first 12 chars of ak_live_<48-hex>) and a SHA-256 keyHash — the raw key is never persisted (api-key.util.ts). ApiKeyGuard resolves the account by prefix lookup then bcrypt-timing-safe hash comparison.",
        uz: "Vaqt-xavfsiz taqqoslash bilan SHA-256 API-kalit xeshlash: Account ApiKey[]'ni egallaydi; har bir kalit faqat keyPrefix (ak_live_<48-hex>'ning birinchi 12 belgisi) va SHA-256 keyHash'ni saqlaydi — xom kalit hech qachon saqlanmaydi (api-key.util.ts). ApiKeyGuard hisobni prefix qidiruvi, keyin bcrypt-vaqt-xavfsiz xesh taqqoslash bilan aniqlaydi.",
        ru: "Хеширование API-ключей SHA-256 с timing-safe сравнением: Account владеет ApiKey[]; каждый ключ хранит только keyPrefix (первые 12 символов ak_live_<48-hex>) и SHA-256 keyHash — сырой ключ никогда не сохраняется (api-key.util.ts). ApiKeyGuard разрешает аккаунт по поиску префикса, затем bcrypt-timing-safe сравнением хешей.",
      },
      {
        en: "Ice-breaker token indirection into the rule engine: IceBreakersService.set() mints a stable random token per CTA (IB::<16-hex>), persists an exact-match DM rule pointing to the reply text, then pushes the token (not the text) to Instagram's Messenger Profile API. When a user taps a button, Meta fires a messaging_postback with the token; rule-engine.service.ts matches it as a dm-kind rule and sends the correct reply.",
        uz: "Ice-breaker token indireksiyasi qoidalar mexanizmi ichida: IceBreakersService.set() har bir CTA uchun barqaror tasodifiy token (IB::<16-hex>) yaratadi, javob matniga ishora qiluvchi aniq mos DM qoidasini saqlaydi, keyin tokenni (matnni emas) Instagram Messenger Profile APIga yuboradi. Foydalanuvchi tugmani bosganda, Meta messaging_postback ni token bilan yubora; rule-engine.service.ts uni dm-turi qoidasi sifatida topib, to'g'ri javob yuboradi.",
        ru: "Косвенная адресация токена ice-breaker в движке правил: IceBreakersService.set() чеканит стабильный случайный токен на каждый CTA (IB::<16-hex>), сохраняет правило DM точного соответствия, указывающее на текст ответа, затем отправляет токен (не текст) в Messenger Profile API Instagram. Когда пользователь нажимает кнопку, Meta отправляет messaging_postback с токеном; rule-engine.service.ts сопоставляет его как правило dm-типа и отправляет нужный ответ.",
      },
      {
        en: "OpenAI tool-calling lead-capture loop: OpenAiProvider.generateReply() calls client.responses.create() with per-account model selection, injects up to 12 recent conversation turns as role-based history, and runs a tool-calling loop (max 3 steps) for the capture_lead function tool — which forwards a captured phone number to the lead notifier service. 20s timeout + maxRetries=1 prevents hung requests from blocking reply workers.",
        uz: "OpenAI vosita-chaqiruv lead-olish tsikli: OpenAiProvider.generateReply() hisobga asoslangan model tanlash bilan client.responses.create()'ni chaqiradi, oxirgi 12 suhbat o'girishini rol-asosli tarix sifatida kiritadi va capture_lead funksiya vositasi uchun vosita-chaqiruv tsiklini (maksimal 3 qadam) ishlatadi — bu raqamni lead xabardor qilish xizmatiga yuboradi. 20s timeout + maxRetries=1 osilib qolgan so'rovlar javob ishchilarini bloklamasligini ta'minlaydi.",
        ru: "Цикл захвата лидов через tool-calling OpenAI: OpenAiProvider.generateReply() вызывает client.responses.create() с выбором модели на аккаунт, вставляет до 12 последних реплик разговора как историю на основе ролей и выполняет цикл tool-calling (максимум 3 шага) для инструмента-функции capture_lead — который пересылает захваченный номер телефона в сервис уведомлений о лидах. Таймаут 20с + maxRetries=1 предотвращает блокировку воркеров ответов зависшими запросами.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend", uz: "Frontend", ru: "Фронтенд" },
        items: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4", "shadcn/ui", "Vitest", "TanStack Query"],
      },
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["NestJS 11", "TypeScript 5", "Node.js 22", "TypeORM", "PostgreSQL", "bcryptjs", "@nestjs/jwt"],
      },
      {
        label: { en: "Queue & Data", uz: "Navbat va Ma'lumotlar", ru: "Очередь и данные" },
        items: ["BullMQ 5", "Redis", "ioredis 5", "PostgreSQL"],
      },
      {
        label: { en: "Python SDK", uz: "Python SDK", ru: "Python SDK" },
        items: ["Python 3.9+", "httpx", "pytest", "pytest-asyncio", "PyPI"],
      },
      {
        label: { en: "Infra & Tools", uz: "Infratuzilma va Asboblar", ru: "Инфраструктура и инструменты" },
        items: ["Docker", "docker-compose", "@nestjs/swagger", "OpenAI API"],
      },
    ],
  },
  {
    slug: "interrail",
    name: "InterRail",
    url: "https://system.interrail.uz",
    tags: ["Vue 3", "Django", "PostgreSQL", "OpenAI", "Celery", "Docker"],
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
    image: "/projects/interrail.jpg",
    overview: {
      en: "InterRail is a suite of ERP and CRM platforms I built from zero to automate the core operations of an international rail-freight logistics company, used across 6+ countries. It covers accounting, contract management, KPI tracking, and AI-assisted document processing.",
      uz: "InterRail — 6+ davlatda qo'llaniladigan xalqaro temir yo'l yuk logistikasi kompaniyasining asosiy operatsiyalarini avtomatlashtirish uchun noldan qurilgan ERP va CRM platformalari to'plami. Buxgalteriya, shartnomalarni boshqarish, KPI kuzatuvi va AI yordamida hujjatlarni qayta ishlashni qamrab oladi.",
      ru: "InterRail — набор ERP и CRM платформ, которые я построил с нуля для автоматизации ключевых операций международной компании железнодорожных грузоперевозок, используемых в 6+ странах. Охватывает бухгалтерию, управление договорами, отслеживание KPI и обработку документов с ИИ.",
    },
    responsibilities: [
      {
        en: "Built both ERP backends (order_service and interrail-trk) from scratch in Django 4.1 + DRF, authoring all data models, REST APIs, and Celery async tasks.",
        uz: "Ikkala ERP backendini (order_service va interrail-trk) Django 4.1 + DRF'da noldan yaratdim, barcha ma'lumot modellari, REST APIlar va Celery asinxron vazifalarini yozdim.",
        ru: "Построил оба ERP-бэкенда (order_service и interrail-trk) с нуля на Django 4.1 + DRF, написал все модели данных, REST API и асинхронные задачи Celery.",
      },
      {
        en: "Designed and owned all Vue 3 frontends (admin CRM, tracking dashboard, Telegram mini-app) including state management with Vuex 4, multi-language i18n, and Playwright E2E tests.",
        uz: "Barcha Vue 3 frontendlarini (admin CRM, kuzatuv boshqaruv paneli, Telegram mini-ilova) Vuex 4 bilan holat boshqaruvi, ko'p tilli i18n va Playwright E2E testlarini o'z ichiga olgan holda loyihalashtirdim va boshqardim.",
        ru: "Спроектировал и владел всеми фронтендами Vue 3 (CRM для администраторов, панель отслеживания, Telegram mini-app), включая управление состоянием с Vuex 4, многоязычную i18n и E2E-тесты Playwright.",
      },
      {
        en: "Implemented the AI assistant layer: integrated the OpenAI Agents SDK (openai-agents==0.17.6), designed the scoped system prompt, and built function tools for inquiry CRUD and order lookups with per-user token-cost tracking.",
        uz: "AI yordamchi qatlamini amalga oshirdim: OpenAI Agents SDK (openai-agents==0.17.6) ni integratsiya qildim, doirali tizim so'rovini loyihalashtirdim va foydalanuvchi boshiga token-xarajat kuzatuvi bilan so'rov CRUD va buyurtma qidirish uchun funksiya vositalarini yaratdim.",
        ru: "Реализовал слой AI-ассистента: интегрировал OpenAI Agents SDK (openai-agents==0.17.6), спроектировал ограниченный системный промпт и создал функциональные инструменты для CRUD запросов и поиска заказов с отслеживанием стоимости токенов на пользователя.",
      },
      {
        en: "Engineered the SMGS document pipeline that parses rail waybill PDFs (pdfplumber), XLSX (openpyxl), and DOCX (python-docx) into structured Smgs records linked to wagons, stations, trains, and counterparties.",
        uz: "Temir yo'l yuk hujjatlari PDFlarini (pdfplumber), XLSX (openpyxl) va DOCX (python-docx) vagon, stantsiya, poyezd va kontragentlarga bog'langan tuzilgan Smgs yozuvlariga tahlil qiluvchi SMGS hujjat quvurini yaratdim.",
        ru: "Разработал конвейер документов СМГС, который разбирает PDF железнодорожных накладных (pdfplumber), XLSX (openpyxl) и DOCX (python-docx) в структурированные записи Smgs, связанные с вагонами, станциями, поездами и контрагентами.",
      },
    ],
    architecture: {
      en: "The monorepo contains two full-stack sub-systems: order_service (Central Asia ERP) with an admin Vue 3 SPA, and interrail-trk with its own backend and frontend. Both share the same pattern: Django + DRF REST API behind Daphne (ASGI/WebSocket), PostgreSQL 14, Redis 7, and a Celery worker for async jobs, orchestrated via Docker Compose. File storage uses MinIO (S3-compatible), Elasticsearch handles full-text search, and Daphne handles real-time notifications over WebSocket.",
      uz: "Monorepo ikkita full-stack quyi tizimni o'z ichiga oladi: order_service (O'rta Osiyo ERP) admin Vue 3 SPA bilan va interrail-trk o'z backend va frontendi bilan. Ikkalasi ham bir xil naqshni baham ko'radi: Daphne (ASGI/WebSocket) orqasidagi Django + DRF REST API, PostgreSQL 14, Redis 7 va Docker Compose orqali tashkil etilgan asinxron ishlar uchun Celery worker. Fayl saqlash MinIO (S3-muvofiq) ishlatadi, Elasticsearch to'liq matn qidiruvini boshqaradi.",
      ru: "Монорепозиторий содержит две полностековые подсистемы: order_service (ERP Центральной Азии) с admin SPA на Vue 3 и interrail-trk с собственным бэкендом и фронтендом. Обе разделяют один шаблон: Django + DRF REST API за Daphne (ASGI/WebSocket), PostgreSQL 14, Redis 7 и воркер Celery для асинхронных задач, оркестрированных через Docker Compose. Хранение файлов использует MinIO (S3-совместимый), Elasticsearch обеспечивает полнотекстовый поиск.",
    },
    engineering: [
      {
        en: "OpenAI Agents SDK assistant with per-user token-cost tracking: a root_agent in apps/ai_integrations/agents/root.py uses function_tool wrappers for inquiry CRUD and order lookups. State is stored in the DB (Conversation/Message models); OpenAI server-side storage is disabled (store=False). AiUsage records per-run token counts and estimated USD cost per user.",
        uz: "Foydalanuvchi boshiga token-xarajat kuzatuvi bilan OpenAI Agents SDK yordamchisi: apps/ai_integrations/agents/root.py'dagi root_agent so'rov CRUD va buyurtma qidirish uchun function_tool o'ramlarini ishlatadi. Holat DB'da saqlanadi (Conversation/Message modellari); OpenAI server tomonidagi saqlash o'chirilgan (store=False). AiUsage har bir ishga token sonlarini va taxminiy USD xarajatni yozib boradi.",
        ru: "Ассистент OpenAI Agents SDK с отслеживанием стоимости токенов на пользователя: root_agent в apps/ai_integrations/agents/root.py использует обёртки function_tool для CRUD запросов и поиска заказов. Состояние хранится в БД (модели Conversation/Message); серверное хранилище OpenAI отключено (store=False). AiUsage записывает количество токенов и расчётную стоимость в USD за запуск на пользователя.",
      },
      {
        en: "Polymorphic Order + Celery act-completion signals: Order uses a child_type field (container_order, wagon_order, wagon_empty_order) with separate shipment and payment status lifecycles. A Celery shared_task (check_act_info_connections_helper) fires on every ActInfo save/delete and auto-marks acts as completed when all cost line items are populated.",
        uz: "Polimorfik Order + Celery akt-yakunlash signallari: Order alohida jo'natma va to'lov holati tsikllari bilan child_type maydonidan (container_order, wagon_order, wagon_empty_order) foydalanadi. Celery shared_task (check_act_info_connections_helper) har ActInfo saqlash/o'chirishda ishga tushadi va barcha xarajat qatorlari to'ldirilganda aktlarni avtomatik yakunlangan deb belgilaydi.",
        ru: "Полиморфный Order + Celery-сигналы завершения актов: Order использует поле child_type (container_order, wagon_order, wagon_empty_order) с раздельными жизненными циклами статусов отгрузки и оплаты. Celery shared_task (check_act_info_connections_helper) срабатывает при каждом сохранении/удалении ActInfo и автоматически помечает акты завершёнными, когда все позиции стоимости заполнены.",
      },
      {
        en: "SMGS waybill extraction pipeline: extract.py dispatches by file extension — pdfplumber for PDF, openpyxl for XLSX, python-docx for DOCX — with hard caps (40 pages, 400 rows, 24 000 chars) before injecting into the AI context. The Smgs model links extracted waybill data back to Train and Document records.",
        uz: "SMGS yuk xati ajratib olish quvuri: extract.py fayl kengaytmasi bo'yicha yuboradi — PDF uchun pdfplumber, XLSX uchun openpyxl, DOCX uchun python-docx — AI kontekstiga kiritishdan oldin qattiq chegaralar (40 sahifa, 400 qator, 24 000 belgi) bilan. Smgs modeli ajratib olingan yuk xati ma'lumotlarini Train va Document yozuvlariga bog'laydi.",
        ru: "Конвейер извлечения накладных СМГС: extract.py диспетчеризирует по расширению файла — pdfplumber для PDF, openpyxl для XLSX, python-docx для DOCX — с жёсткими ограничениями (40 страниц, 400 строк, 24 000 символов) перед внедрением в контекст ИИ. Модель Smgs связывает извлечённые данные накладной с записями Train и Document.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend", uz: "Frontend", ru: "Фронтенд" },
        items: ["Vue 3", "Vuex 4", "Vue Router 4", "Bootstrap 5", "ApexCharts", "Leaflet", "Playwright"],
      },
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["Python 3.11", "Django 4.1", "Django REST Framework 3.14", "Daphne/ASGI", "Celery 5.3", "openai-agents"],
      },
      {
        label: { en: "Data & Search", uz: "Ma'lumotlar va Qidiruv", ru: "Данные и поиск" },
        items: ["PostgreSQL 14", "Redis 7", "Elasticsearch 7", "MinIO"],
      },
      {
        label: { en: "Infra & Tools", uz: "Infratuzilma va Asboblar", ru: "Инфраструктура и инструменты" },
        items: ["Docker Compose", "Docker Swarm", "GitHub Actions", "ruff", "mypy"],
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
    image: "/projects/dombirobod-city.jpg",
    overview: {
      en: "A professional enterprise landing page for a local real-estate developer, designed to showcase apartments and drive inquiries. It features interactive apartment floor plans, virtual tours, and a price calculator, built from Figma prototypes.",
      uz: "Mahalliy ko'chmas mulk ishlab chiqaruvchisi uchun professional landing sahifa — kvartiralarni namoyish etish va so'rovlarni rag'batlantirish uchun mo'ljallangan. Figma prototiplari asosida qurilgan interaktiv kvartira rejalari, virtual sayohatlar va narx kalkulyatorini o'z ichiga oladi.",
      ru: "Профессиональный корпоративный лендинг для местного застройщика, созданный для демонстрации квартир и привлечения обращений. Включает интерактивные планировки квартир, виртуальные туры и калькулятор цен, реализован по прототипам Figma.",
    },
    responsibilities: [
      {
        en: "Implemented the full front-end build from Figma designs — component library, responsive layout, and animations.",
        uz: "Figma dizaynlaridan to'liq frontend qurilishini amalga oshirdim — komponent kutubxonasi, moslashuvchan tartib va animatsiyalar.",
        ru: "Реализовал полную сборку фронтенда из дизайнов Figma — библиотека компонентов, адаптивная вёрстка и анимации.",
      },
      {
        en: "Built interactive apartment floor plan viewer allowing prospective buyers to explore unit layouts.",
        uz: "Potentsial xaridorlarga xonadon rejalarini ko'rib chiqish imkonini beruvchi interaktiv kvartira reja ko'rgazmasini yaratdim.",
        ru: "Создал интерактивный просмотрщик планировок квартир, позволяющий потенциальным покупателям изучать варианты расположения.",
      },
      {
        en: "Integrated a price calculator and virtual tour components to support pre-sale engagement.",
        uz: "Oldindan sotish uchun narx kalkulyatori va virtual sayohat komponentlarini integratsiya qildim.",
        ru: "Интегрировал калькулятор цен и компоненты виртуальных туров для поддержки взаимодействия до продажи.",
      },
    ],
    architecture: {
      en: "A Next.js static landing site built from Figma prototypes. Pages are statically generated for fast load times, with interactive UI components (floor plan viewer, price calculator, virtual tour embed) handled client-side.",
      uz: "Figma prototiplaridan qurilgan Next.js statik landing sayti. Sahifalar tez yuklash vaqti uchun statik ravishda yaratiladi, interaktiv UI komponentlari (reja ko'rgazmasi, narx kalkulyatori, virtual sayohat) esa mijoz tomonida boshqariladi.",
      ru: "Статический лендинг на Next.js, построенный по прототипам Figma. Страницы статически генерируются для быстрой загрузки, интерактивные UI-компоненты (просмотрщик планировок, калькулятор цен, виртуальный тур) обрабатываются на стороне клиента.",
    },
    engineering: [
      {
        en: "Interactive apartment floor plan component with room-level highlighting and unit selection, enabling buyers to visualize available apartments.",
        uz: "Xonalar darajasidagi ajratib ko'rsatish va birlik tanlash imkoniyatiga ega interaktiv kvartira reja komponenti, xaridorlarga mavjud kvartiralarni tasavvur qilish imkonini beradi.",
        ru: "Интерактивный компонент планировки квартиры с подсветкой на уровне комнат и выбором блока, позволяющий покупателям визуализировать доступные апартаменты.",
      },
      {
        en: "Client-side price calculator taking unit type, floor, and area as inputs and computing costs based on configured pricing rules.",
        uz: "Birlik turi, qavat va maydonni kirish sifatida qabul qilib, sozlangan narxlash qoidalariga asoslanib xarajatlarni hisoblaydigan mijoz tomoni narx kalkulyatori.",
        ru: "Клиентский калькулятор цен, принимающий тип блока, этаж и площадь как входные данные и вычисляющий стоимость на основе настроенных правил ценообразования.",
      },
      {
        en: "Next.js front-end faithfully implemented from Figma UI/UX prototypes with pixel-accurate components and smooth scroll animations.",
        uz: "Figma UI/UX prototiplaridan piksel-aniq komponentlar va yumshoq aylantirish animatsiyalari bilan sodiqlik bilan amalga oshirilgan Next.js frontend.",
        ru: "Фронтенд Next.js точно реализован по UI/UX прототипам Figma с пиксельно-точными компонентами и плавными scroll-анимациями.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend", uz: "Frontend", ru: "Фронтенд" },
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        label: { en: "Design & Tooling", uz: "Dizayn va Asboblar", ru: "Дизайн и инструменты" },
        items: ["Figma", "ESLint", "Prettier"],
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
    image: null,
    overview: {
      en: "Baxtiyor Oila is a matchmaking service for the Uzbek community in Germany, delivered entirely through Telegram Mini Apps. It pairs a user-facing app and an admin app with a profile-matching algorithm.",
      uz: "Baxtiyor Oila — Germaniyadagi o'zbek jamoasi uchun to'liq Telegram Mini Ilovalar orqali taqdim etiladigan tanishuv xizmati. Foydalanuvchilarga mo'ljallangan ilova va admin ilova profil moslashtirish algoritmi bilan birlashtirilgan.",
      ru: "Baxtiyor Oila — сервис знакомств для узбекского сообщества в Германии, реализованный полностью через Telegram Mini Apps. Объединяет пользовательское приложение и приложение для администраторов с алгоритмом подбора профилей.",
    },
    responsibilities: [
      {
        en: "Built user-facing and admin Telegram Mini Apps (React) for profile creation, browsing matches, and admin moderation.",
        uz: "Profil yaratish, moslashtiruvchilarni ko'rib chiqish va admin moderatsiyasi uchun foydalanuvchi va admin Telegram Mini Ilovalarini (React) yaratdim.",
        ru: "Создал пользовательское и административное Telegram Mini-приложения (React) для создания профилей, просмотра совпадений и модерации администраторами.",
      },
      {
        en: "Developed the Go REST API backend handling user profiles, matching logic, and data persistence.",
        uz: "Foydalanuvchi profillari, moslashtirish mantiqi va ma'lumotlarni saqlashni boshqaruvchi Go REST API backendini ishlab chiqdim.",
        ru: "Разработал Go REST API бэкенд, обрабатывающий профили пользователей, логику подбора и хранение данных.",
      },
      {
        en: "Implemented the profile-matching algorithm and a Python notification bot keeping users informed of new matches.",
        uz: "Profil moslashtirish algoritmini va foydalanuvchilarni yangi moslashtiruvchilar haqida xabardor qiladigan Python bildirishnoma botini amalga oshirdim.",
        ru: "Реализовал алгоритм подбора профилей и Python-бот уведомлений, информирующий пользователей о новых совпадениях.",
      },
    ],
    architecture: {
      en: "Two React Telegram Mini Apps (user and admin) talk to a Go REST API backend. A Python Telegram bot runs separately to deliver match notifications. User data and match state are persisted in the Go service's data store.",
      uz: "Ikkita React Telegram Mini Ilovalari (foydalanuvchi va admin) Go REST API backendi bilan muloqot qiladi. Python Telegram boti moslashtirish bildirishnomalarini yetkazish uchun alohida ishlaydi. Foydalanuvchi ma'lumotlari va moslashtirish holati Go xizmatining ma'lumotlar omborida saqlanadi.",
      ru: "Два React Telegram Mini App (пользовательский и административный) обращаются к Go REST API бэкенду. Python Telegram-бот работает отдельно для доставки уведомлений о совпадениях. Данные пользователей и состояние совпадений сохраняются в хранилище данных Go-сервиса.",
    },
    engineering: [
      {
        en: "Telegram Mini App initData verification for both user and admin apps, ensuring only legitimate Telegram users can authenticate.",
        uz: "Foydalanuvchi va admin ilovalari uchun Telegram Mini Ilova initData tekshiruvi, faqat qonuniy Telegram foydalanuvchilari autentifikatsiya qilishini ta'minlaydi.",
        ru: "Верификация initData Telegram Mini App для пользовательского и административного приложений, гарантирующая аутентификацию только легитимных пользователей Telegram.",
      },
      {
        en: "Profile-matching algorithm evaluating compatibility criteria (age range, interests, location) to surface ranked candidate profiles to users.",
        uz: "Foydalanuvchilarga darajalangan nomzod profillarini ko'rsatish uchun muvofiqlik mezonlarini (yosh diapazoni, qiziqishlar, joylashuv) baholaydigan profil moslashtirish algoritmi.",
        ru: "Алгоритм подбора профилей, оценивающий критерии совместимости (возрастной диапазон, интересы, местоположение) для отображения пользователям ранжированных профилей-кандидатов.",
      },
      {
        en: "Python notification bot with Telegram Bot API integration delivering real-time match alerts and status updates to users.",
        uz: "Foydalanuvchilarga real vaqt moslashtirish ogohlantirishlari va holat yangilanishlarini yetkazuvchi Telegram Bot API integratsiyasi bilan Python bildirishnoma boti.",
        ru: "Python-бот уведомлений с интеграцией Telegram Bot API, доставляющий пользователям уведомления о совпадениях и обновления статуса в реальном времени.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend", uz: "Frontend", ru: "Фронтенд" },
        items: ["React", "TypeScript", "@telegram-apps/sdk"],
      },
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["Go", "REST API"],
      },
      {
        label: { en: "Bot & Notifications", uz: "Bot va Bildirishnomalar", ru: "Бот и уведомления" },
        items: ["Python", "Telegram Bot API"],
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
    image: null,
    overview: {
      en: "OutlookID is a self-hosted backend that lets a single application read, send, and organize email across many users' Outlook mailboxes through Microsoft Graph. Every incoming message fires a signed webhook to the downstream app, so products can build on Outlook without handling OAuth themselves.",
      uz: "OutlookID — o'z serverida joylashtirilgan backend bo'lib, bitta ilovaga Microsoft Graph orqali ko'plab foydalanuvchilarning Outlook pochtalarini o'qish, yuborish va tartiblashtirish imkonini beradi. Har bir kiruvchi xabar pastdagi ilovaga imzolangan webhook yuboradi, shuning uchun mahsulotlar OAuth ni mustaqil boshqarmasdan Outlook ustida qurishadi.",
      ru: "OutlookID — самостоятельно размещаемый бэкенд, позволяющий одному приложению читать, отправлять и систематизировать почту в множестве почтовых ящиков Outlook через Microsoft Graph. Каждое входящее сообщение отправляет подписанный вебхук в нижестоящее приложение, поэтому продукты могут строиться на Outlook без самостоятельной обработки OAuth.",
    },
    responsibilities: [
      {
        en: "Designed and built the entire system from scratch: OAuth flows, token encryption layer, Graph subscription lifecycle, outbound webhook delivery pipeline, Drizzle schema, and Docker deployment.",
        uz: "To'liq tizimni noldan loyihalashtirdim va yaratdim: OAuth oqimlari, token shifrlash qatlami, Graph obuna hayot tsikli, chiquvchi webhook yetkazish quvuri, Drizzle sxemasi va Docker joylash.",
        ru: "Спроектировал и построил всю систему с нуля: потоки OAuth, слой шифрования токенов, жизненный цикл подписок Graph, конвейер доставки исходящих вебхуков, схема Drizzle и развёртывание Docker.",
      },
      {
        en: "Wrote all integration tests against real ephemeral Postgres instances using Testcontainers, and unit tests with Vitest + nock for HTTP mocking.",
        uz: "Testcontainers yordamida haqiqiy vaqtinchalik Postgres nusxalariga qarshi barcha integratsiya testlarini va HTTP simulyatsiyasi uchun Vitest + nock bilan birlik testlarini yozdim.",
        ru: "Написал все интеграционные тесты против реальных временных экземпляров Postgres с помощью Testcontainers и модульные тесты с Vitest + nock для имитации HTTP.",
      },
      {
        en: "Authored the README/DEPLOY docs, OpenAPI spec, and maintained the Drizzle migration history (4 SQL migrations) and Caddy reverse-proxy configuration.",
        uz: "README/DEPLOY hujjatlarini, OpenAPI spetsifikatsiyasini yozdim va Drizzle migratsiya tarixini (4 SQL migratsiya) va Caddy teskari proksi konfiguratsiyasini saqladim.",
        ru: "Написал документацию README/DEPLOY, спецификацию OpenAPI и вёл историю миграций Drizzle (4 SQL-миграции) и конфигурацию обратного прокси Caddy.",
      },
    ],
    architecture: {
      en: "OAuth connect flows (PKCE + MSAL for Outlook, OIDC for Google) are initiated by the downstream via POST /v1/connect; OutlookID redirects to the provider, exchanges the auth code, persists AES-256-GCM-encrypted tokens, and immediately creates a Graph subscription or Gmail watch. Inbound Graph notifications arrive at /graph/notifications, are validated against the stored clientState, and enqueue a dispatch_outbound pg-boss job that delivers a signed JSON payload to the downstream webhook URL. pg-boss cron jobs renew expiring Graph subscriptions every 30 minutes.",
      uz: "OAuth ulanish oqimlari (Outlook uchun PKCE + MSAL, Google uchun OIDC) pastki tomondan POST /v1/connect orqali boshlanadi; OutlookID provaydarga yo'naltiradi, autentifikatsiya kodini almashadi, AES-256-GCM shifrlangan tokenlarni saqlaydi va darhol Graph obunasi yoki Gmail kuzatuvini yaratadi. Kiruvchi Graph bildirnomalari /graph/notifications'ga keladi, saqlangan clientState'ga nisbatan tekshiriladi va imzolangan JSON yukini pastki webhook URL'ga yetkazuvchi dispatch_outbound pg-boss ishini navbatga qo'yadi.",
      ru: "Потоки подключения OAuth (PKCE + MSAL для Outlook, OIDC для Google) инициируются нижестоящим приложением через POST /v1/connect; OutlookID перенаправляет к провайдеру, обменивает код авторизации, сохраняет AES-256-GCM-зашифрованные токены и сразу создаёт подписку Graph или Gmail watch. Входящие уведомления Graph поступают в /graph/notifications, проверяются против сохранённого clientState и ставят в очередь задание pg-boss dispatch_outbound, доставляющее подписанную JSON-нагрузку на URL вебхука нижестоящего приложения.",
    },
    engineering: [
      {
        en: "AES-256-GCM token encryption with custom Drizzle bytea: src/crypto/tokens.ts encrypts each access/refresh token with a random 12-byte IV, stores iv || tag || ciphertext as a bytea column (via a custom Drizzle customType because bytea was not exported from drizzle-orm v0.33). The 32-byte key is injected from TOKEN_ENCRYPTION_KEY env var.",
        uz: "Maxsus Drizzle bytea bilan AES-256-GCM token shifrlash: src/crypto/tokens.ts har bir kirish/yangilash tokenini tasodifiy 12-baytli IV bilan shifrlaydi, iv || tag || ciphertext ni bytea ustun sifatida saqlaydi (drizzle-orm v0.33 dan bytea eksport qilinmagani uchun maxsus Drizzle customType orqali). 32-baytli kalit TOKEN_ENCRYPTION_KEY muhit o'zgaruvchisidan kiritiladi.",
        ru: "Шифрование токенов AES-256-GCM с пользовательским Drizzle bytea: src/crypto/tokens.ts шифрует каждый токен доступа/обновления случайным 12-байтным IV, хранит iv || tag || ciphertext как столбец bytea (через кастомный Drizzle customType, потому что bytea не экспортировался из drizzle-orm v0.33). 32-байтный ключ вводится из переменной окружения TOKEN_ENCRYPTION_KEY.",
      },
      {
        en: "MSAL refresh-token cache workaround: because MSAL does not expose refresh tokens in AuthenticationResult, extractRefreshTokenFromCache in src/auth/msal.ts deserializes MSAL's internal RefreshToken cache map and pulls the secret by home_account_id.",
        uz: "MSAL refresh-token kesh vaqtinchalik yechimi: MSAL AuthenticationResult'da refresh tokenlarni oshkor qilmaganligi sababli, src/auth/msal.ts'dagi extractRefreshTokenFromCache MSAL ichki RefreshToken kesh xaritasini deserializatsiya qiladi va home_account_id bo'yicha sirni tortib oladi.",
        ru: "Обходной путь кеша refresh-токена MSAL: поскольку MSAL не раскрывает refresh-токены в AuthenticationResult, extractRefreshTokenFromCache в src/auth/msal.ts десериализует внутреннюю карту кеша RefreshToken MSAL и извлекает секрет по home_account_id.",
      },
      {
        en: "HMAC-signed webhooks with exponential backoff + dead-letter: src/crypto/hmac.ts builds a Stripe-style header t=<unix>,v1=<sha256-hex> signing '${ts}.${body}' with timingSafeEqual. Backoff schedule is [0, 60, 300, 1800, 7200, 43200] seconds (6 attempts); HTTP 410 or exhausted retries flip to dead_letter. Admin endpoints let operators re-queue failed deliveries.",
        uz: "Eksponensial backoff + dead-letter bilan HMAC-imzolangan webhooklar: src/crypto/hmac.ts timingSafeEqual bilan '${ts}.${body}'ni imzolovchi Stripe-uslubli sarlavha t=<unix>,v1=<sha256-hex> yaratadi. Backoff jadvali [0, 60, 300, 1800, 7200, 43200] soniya (6 urinish); HTTP 410 yoki tugagan qayta urinishlar dead_letter'ga o'tadi. Admin endpointlari operatorlarga muvaffaqiyatsiz yetkazishlarni qayta navbatga qo'yish imkonini beradi.",
        ru: "HMAC-подписанные вебхуки с экспоненциальной задержкой + dead-letter: src/crypto/hmac.ts строит заголовок в стиле Stripe t=<unix>,v1=<sha256-hex>, подписывая '${ts}.${body}' с помощью timingSafeEqual. График задержки [0, 60, 300, 1800, 7200, 43200] секунд (6 попыток); HTTP 410 или исчерпанные повторы переводят в dead_letter. Эндпоинты администратора позволяют операторам повторно ставить в очередь неудачные доставки.",
      },
      {
        en: "Concurrency-safe token refresh: TokenService keeps an in-flight Map<mailboxId, Promise<string>>; simultaneous requests for the same mailbox coalesce onto one refresh rather than racing. On invalid_grant it marks the mailbox status='error' and throws ReauthRequiredError (HTTP 401, reauth_required).",
        uz: "Parallellik-xavfsiz token yangilash: TokenService faol Map<mailboxId, Promise<string>> saqlaydi; bir xil pochta qutiси uchun bir vaqtdagi so'rovlar poygalashmay bitta yangilashda birlashadi. invalid_grant da pochta qutisi holati='error' deb belgilanadi va ReauthRequiredError (HTTP 401, reauth_required) tashlaydi.",
        ru: "Потокобезопасное обновление токена: TokenService хранит активную Map<mailboxId, Promise<string>>; одновременные запросы для одного почтового ящика объединяются в одно обновление вместо гонки. При invalid_grant помечает статус почтового ящика как 'error' и бросает ReauthRequiredError (HTTP 401, reauth_required).",
      },
    ],
    stackGroups: [
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["Node.js 20+", "TypeScript 5", "Fastify 4", "Zod", "Pino"],
      },
      {
        label: { en: "Data & Queue", uz: "Ma'lumotlar va Navbat", ru: "Данные и очередь" },
        items: ["PostgreSQL 14+", "Drizzle ORM", "drizzle-kit", "pg-boss 9"],
      },
      {
        label: { en: "Integrations", uz: "Integratsiyalar", ru: "Интеграции" },
        items: ["@azure/msal-node 2", "@microsoft/microsoft-graph-client 3", "Google OAuth2", "Gmail API", "Node.js crypto"],
      },
      {
        label: { en: "Infra & Testing", uz: "Infratuzilma va Testlash", ru: "Инфраструктура и тестирование" },
        items: ["Docker", "Caddy", "Vitest", "Testcontainers", "nock", "pnpm"],
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
    image: null,
    overview: {
      en: "Ijara is a peer-to-peer rental marketplace for Tashkent where owners list items — tools, electronics, event gear, vehicles — and renters browse, book, and pay online. It pairs a Django REST Framework backend with a Nuxt 3 + Pinia front-end.",
      uz: "Ijara — Toshkent uchun tengdoshlar arasi ijara marketpleysi bo'lib, egalar buyumlarni (asboblar, elektronika, tadbir jihozlari, transport) joylaydi, ijarachilar ko'rib chiqadi, bron qiladi va onlayn to'laydi. Django REST Framework backend va Nuxt 3 + Pinia fronted bilan birlashtirilgan.",
      ru: "Ijara — одноранговый маркетплейс аренды для Ташкента, где владельцы размещают вещи — инструменты, электронику, оборудование для мероприятий, транспорт — а арендаторы выбирают, бронируют и оплачивают онлайн. Сочетает бэкенд Django REST Framework с фронтендом Nuxt 3 + Pinia.",
    },
    responsibilities: [
      {
        en: "Designed and built the full Django REST API: five apps (accounts, catalog, bookings, payments, search), serializers, services layer, and OpenAPI schema via drf-spectacular.",
        uz: "To'liq Django REST APIni loyihalashtirdim va yaratdim: beshta ilova (accounts, catalog, bookings, payments, search), serializatorlar, xizmatlar qatlami va drf-spectacular orqali OpenAPI sxemasi.",
        ru: "Спроектировал и построил полный Django REST API: пять приложений (accounts, catalog, bookings, payments, search), сериализаторы, сервисный слой и схема OpenAPI через drf-spectacular.",
      },
      {
        en: "Implemented the booking FSM, double-booking ExclusionConstraint, and audit trail — model design, service logic, and pytest coverage.",
        uz: "Bandlov FSM, ikki marta bronlashdan himoya qiluvchi ExclusionConstraint va audit izini — model dizayni, xizmat mantiqi va pytest qamrovi bilan amalga oshirdim.",
        ru: "Реализовал FSM бронирования, ExclusionConstraint для предотвращения двойного бронирования и аудиторский след — проектирование модели, логика сервиса и покрытие pytest.",
      },
      {
        en: "Built the Nuxt 3 frontend: page routing, Pinia auth store (JWT in memory + httpOnly refresh cookie), TanStack Query data fetching, vee-validate/Zod forms, and Stripe.js checkout flow.",
        uz: "Nuxt 3 frontendini yaratdim: sahifa routingi, Pinia auth store (xotiradagi JWT + httpOnly yangilash cookie), TanStack Query ma'lumot olish, vee-validate/Zod formalari va Stripe.js to'lov oqimi.",
        ru: "Построил фронтенд Nuxt 3: маршрутизация страниц, Pinia auth store (JWT в памяти + httpOnly refresh cookie), получение данных TanStack Query, формы vee-validate/Zod и поток оплаты Stripe.js.",
      },
      {
        en: "Wired Stripe PaymentIntent and Checkout Session flows on both backend (webhook idempotency table) and frontend (useStripe composable), plus OpenAI-powered listing-creation suggestions from uploaded photos.",
        uz: "Backend (webhook idempotentlik jadvali) va frontendda (useStripe composable) Stripe PaymentIntent va Checkout Session oqimlarini ulash, shuningdek yuklangan fotosuratlardan OpenAI yordamida e'lon yaratish takliflari.",
        ru: "Подключил потоки Stripe PaymentIntent и Checkout Session как на бэкенде (таблица идемпотентности вебхуков), так и на фронтенде (composable useStripe), плюс предложения по созданию объявлений на основе OpenAI из загружаемых фотографий.",
      },
    ],
    architecture: {
      en: "The Django API (/api/v1/) is containerised separately from the Nuxt SSR frontend; Docker Compose health-checks gate startup order (db → api → web). The Nuxt server proxy routes all /api/* calls to the Django container, so the browser never hits Django directly. JWT auth uses SimpleJWT: short-lived access tokens in memory, refresh tokens in httpOnly cookies refreshed on app init() via the Pinia auth store.",
      uz: "Django API (/api/v1/) Nuxt SSR frontendidan alohida konteynerga joylashtirilgan; Docker Compose sog'liq-tekshiruvlari ishga tushirish tartibini nazorat qiladi (db → api → web). Nuxt server proksi barcha /api/* chaqiruvlarini Django konteyneriga yo'naltiradi. JWT autentifikatsiya SimpleJWT ishlatadi: xotiradagi qisqa muddatli kirish tokenlari, Pinia auth store orqali ilova init() da yangilanadigan httpOnly cookie larida yangilash tokenlari.",
      ru: "Django API (/api/v1/) контейнеризирован отдельно от SSR-фронтенда Nuxt; Docker Compose health-checks контролируют порядок запуска (db → api → web). Серверный прокси Nuxt маршрутизирует все вызовы /api/* в контейнер Django. Аутентификация JWT использует SimpleJWT: краткосрочные токены доступа в памяти, refresh-токены в httpOnly cookies, обновляемые при init() приложения через Pinia auth store.",
    },
    engineering: [
      {
        en: "Postgres ExclusionConstraint double-booking prevention via btree_gist: apps/bookings/models.py defines an ExclusionConstraint using TsTzRange(start_at, end_at) with RangeOperators.OVERLAPS filtered to ACTIVE_STATES (requested, accepted, paid, picked_up). The btree_gist extension is seeded at container init (backend/scripts/init_extensions.sql). Cancelled/completed states fall outside so the same window can be re-booked.",
        uz: "btree_gist orqali Postgres ExclusionConstraint ikki marta bron qilishni oldini olish: apps/bookings/models.py ACTIVE_STATES (requested, accepted, paid, picked_up) ga filtrlangan RangeOperators.OVERLAPS bilan TsTzRange(start_at, end_at) ishlatuvchi ExclusionConstraint'ni belgilaydi. btree_gist kengaytmasi konteyner init da ekiladi (backend/scripts/init_extensions.sql). Bekor qilingan/yakunlangan holatlar tashqarida, shuning uchun bir xil oyna qayta bron qilinishi mumkin.",
        ru: "Предотвращение двойного бронирования через Postgres ExclusionConstraint с btree_gist: apps/bookings/models.py определяет ExclusionConstraint с использованием TsTzRange(start_at, end_at) с RangeOperators.OVERLAPS, отфильтрованным по ACTIVE_STATES (requested, accepted, paid, picked_up). Расширение btree_gist засевается при инициализации контейнера (backend/scripts/init_extensions.sql). Отменённые/завершённые состояния выходят за рамки, поэтому одно окно может быть забронировано повторно.",
      },
      {
        en: "Role-gated booking FSM with audit log: a _TRANSITIONS dict encodes 9 states and 4 actor roles (owner/renter/system/admin). transition() is the sole writer of Booking.state; each call is wrapped in transaction.atomic() and appends a BookingStateTransition row for a full audit trail.",
        uz: "Audit logi bilan rol-himoyalangan bandlov FSM: _TRANSITIONS lug'ati 9 holat va 4 aktyor rolini (ega/ijaralab oluvchi/tizim/admin) kodlaydi. transition() Booking.state ning yagona yozuvchisi; har bir chaqiruv transaction.atomic() ga o'ralgan va to'liq audit izi uchun BookingStateTransition qatori qo'shiladi.",
        ru: "Ограниченный ролью FSM бронирования с журналом аудита: словарь _TRANSITIONS кодирует 9 состояний и 4 роли актора (owner/renter/system/admin). transition() — единственный писатель Booking.state; каждый вызов обёрнут в transaction.atomic() и добавляет строку BookingStateTransition для полного аудиторского следа.",
      },
      {
        en: "Stripe webhook idempotency: supports both PaymentIntent (Elements) and Checkout Session paths. Webhook events are deduplicated via StripeEvent (unique event_id) to guard against Stripe re-delivery. Frontend useStripe.ts composable lazy-loads @stripe/stripe-js only if the backend config endpoint returns configured: true.",
        uz: "Stripe webhook idempotentligi: PaymentIntent (Elements) va Checkout Session yo'llarini qo'llab-quvvatlaydi. Webhook voqealari Stripe qayta yetkazishiga qarshi himoya uchun StripeEvent (noyob event_id) orqali takrorlanmaydi. Frontend useStripe.ts composable @stripe/stripe-js'ni faqat backend konfiguratsiya endpointi configured: true qaytarsa kechiktirib yuklaydi.",
        ru: "Идемпотентность вебхуков Stripe: поддерживает как путь PaymentIntent (Elements), так и Checkout Session. События вебхуков дедуплицируются через StripeEvent (уникальный event_id) для защиты от повторной доставки Stripe. Composable useStripe.ts фронтенда лениво загружает @stripe/stripe-js только если конфигурационный эндпоинт бэкенда возвращает configured: true.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Frontend", uz: "Frontend", ru: "Фронтенд" },
        items: ["Nuxt 3", "Vue 3", "TypeScript", "Pinia", "TanStack Query", "vee-validate", "Zod", "@stripe/stripe-js"],
      },
      {
        label: { en: "Backend", uz: "Backend", ru: "Бэкенд" },
        items: ["Django 5.2", "Django REST Framework 3.16", "SimpleJWT", "drf-spectacular", "Stripe Python SDK v10", "OpenAI Python SDK v1"],
      },
      {
        label: { en: "Data", uz: "Ma'lumotlar", ru: "Данные" },
        items: ["PostgreSQL 16", "btree_gist", "pg_trgm", "SearchVectorField", "GinIndex"],
      },
      {
        label: { en: "Infra & Testing", uz: "Infratuzilma va Testlash", ru: "Инфраструктура и тестирование" },
        items: ["Docker Compose", "uv", "pytest-django", "factory-boy", "Playwright", "Ruff"],
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
    image: null,
    overview: {
      en: "noServer is a Node.js web framework I built from scratch with zero dependencies, directly on raw TCP sockets. It implements its own HTTP/1.1 parser and a WebSocket layer, with config-driven routing, CRUD, CORS, rate limiting, and static-file serving — a study in how web servers actually work under the hood.",
      uz: "noServer — men noldan, hech qanday bog'liqliksiz, to'g'ridan-to'g'ri xom TCP soketlar ustida qurilgan Node.js veb-freymvork. U o'zining HTTP/1.1 parser va WebSocket qatlamini, konfiguratsiyaga asoslangan routing, CRUD, CORS, rate limiting va statik fayl xizmatini amalga oshiradi — veb-serverlar qanday ishlashini o'rganish loyihasi.",
      ru: "noServer — Node.js веб-фреймворк, который я построил с нуля без каких-либо зависимостей, напрямую на «голых» TCP-сокетах. Реализует собственный парсер HTTP/1.1 и слой WebSocket с конфигурируемой маршрутизацией, CRUD, CORS, ограничением частоты и раздачей статических файлов — изучение того, как веб-серверы работают под капотом.",
    },
    responsibilities: [
      {
        en: "Sole author; built every layer from first principles: TCP socket handling, HTTP parsing, routing engine, WebSocket protocol, and developer-facing config API.",
        uz: "Yagona muallif; har bir qatlamni asoslardan yaratdim: TCP soket boshqaruvi, HTTP tahlili, routing mexanizmi, WebSocket protokoli va dasturchi tomoni konfiguratsiya API.",
        ru: "Единственный автор; построил каждый слой с первых принципов: обработка TCP-сокетов, парсинг HTTP, движок маршрутизации, протокол WebSocket и конфигурационный API для разработчиков.",
      },
      {
        en: "Benchmarked three routing algorithm strategies (linear scan, single-regex Hono-style, hybrid) to justify the final design choice recorded in bench.js.",
        uz: "Bench.js'da qayd etilgan yakuniy dizayn tanlovini asoslash uchun uchta routing algoritm strategiyasini (chiziqli skanerlash, yagona-regex Hono-uslub, gibrid) o'lchadim.",
        ru: "Протестировал три стратегии алгоритмов маршрутизации (линейное сканирование, single-regex в стиле Hono, гибридный) для обоснования окончательного выбора дизайна, записанного в bench.js.",
      },
      {
        en: "Wrote a raw-TCP test client (test.js) that hand-crafts HTTP/1.1 request strings to validate server behavior end-to-end.",
        uz: "Server xatti-harakatini uchidan-uchiga tasdiqlash uchun HTTP/1.1 so'rov satrlarini qo'lda yaratuvchi xom-TCP test klientini (test.js) yozdim.",
        ru: "Написал raw-TCP тестовый клиент (test.js), вручную создающий строки HTTP/1.1 запросов для сквозной проверки поведения сервера.",
      },
    ],
    architecture: {
      en: "The server is created with Node's net.createServer, accepting raw TCP sockets. Each connection buffers incoming data events as a string; once \\r\\n\\r\\n is detected and the full body (verified via Content-Length) is received, the request is parsed and dispatched. Routes are stored in two structures: a plain-object hash map for static paths (O(1)) and a compiled single-regex for dynamic paths — both keyed per HTTP method. On a WebSocket upgrade, the socket transitions to binary frame mode for the remainder of its lifetime.",
      uz: "Server Node'ning net.createServer bilan yaratiladi, xom TCP soketlarni qabul qiladi. Har bir ulanish kiruvchi ma'lumotlar hodisalarini satr sifatida buferlaydi; \\r\\n\\r\\n aniqlanib, to'liq tanasi (Content-Length orqali tekshirilgan) qabul qilinganida, so'rov tahlil qilinib yuboriladi. Marshrutlar ikki tuzilmada saqlanadi: statik yo'llar uchun oddiy-ob'ekt xesh-xarita (O(1)) va dinamik yo'llar uchun kompilyatsiya qilingan yagona-regex — ikkalasi HTTP metodi bo'yicha kalit. WebSocket yangilashda, soket qolgan umr davomida ikkilik kadr rejimiga o'tadi.",
      ru: "Сервер создаётся с помощью Node's net.createServer, принимая «голые» TCP-сокеты. Каждое соединение буферизирует входящие события данных как строку; как только обнаруживается \\r\\n\\r\\n и получено полное тело (проверенное по Content-Length), запрос разбирается и диспетчеризируется. Маршруты хранятся в двух структурах: хеш-карта обычных объектов для статических путей (O(1)) и скомпилированный одиночный regex для динамических путей — оба с ключом по методу HTTP. При WebSocket-апгрейде сокет переходит в режим бинарных фреймов на оставшийся срок жизни.",
    },
    engineering: [
      {
        en: "Hand-rolled RFC 6455 WebSocket frame decode/encode: wsHandshake concatenates the client's Sec-WebSocket-Key with the RFC GUID 258EAFA5-E914-47DA-95CA-5AB5DC786C11, SHA-1 hashes it, and returns the base64 result as Sec-WebSocket-Accept. wsDecodeFrame supports all three length encodings (7-bit, 16-bit UInt16BE, 64-bit BigUInt64BE) and XOR-unmasks payloads with the 4-byte mask key.",
        uz: "Qo'lda yozilgan RFC 6455 WebSocket kadr dekodlash/kodlash: wsHandshake mijozning Sec-WebSocket-Key'ini RFC GUID 258EAFA5-E914-47DA-95CA-5AB5DC786C11 bilan birlashtiradi, SHA-1 xeshlaydi va base64 natijasini Sec-WebSocket-Accept sifatida qaytaradi. wsDecodeFrame uchta uzunlik kodlashni (7-bit, 16-bit UInt16BE, 64-bit BigUInt64BE) qo'llab-quvvatlaydi va yukni 4-baytli niqob kalit bilan XOR-niqobdan chiqaradi.",
        ru: "Самописный декодер/кодировщик фреймов RFC 6455 WebSocket: wsHandshake конкатенирует Sec-WebSocket-Key клиента с RFC GUID 258EAFA5-E914-47DA-95CA-5AB5DC786C11, хеширует SHA-1 и возвращает результат base64 как Sec-WebSocket-Accept. wsDecodeFrame поддерживает все три кодировки длины (7-bit, 16-bit UInt16BE, 64-bit BigUInt64BE) и XOR-демаскирует полезные нагрузки 4-байтным ключом маски.",
      },
      {
        en: "Hybrid router with precompiled regex + capture-group offsets: static routes in staticByMethod[method][path] for O(1) hash lookup; dynamic routes per method compiled into a single regex with alternation — each route's capture-group offset is pre-computed in compileRouter so a single url.match() identifies the matched route and extracts all named params in one pass. Benchmarked against linear scan and Hono-style single-regex at ~500k iterations.",
        uz: "Oldindan kompilyatsiya qilingan regex + qayta ushlash guruhi ofsetlari bilan gibrid router: O(1) xesh qidiruvi uchun staticByMethod[method][path]'dagi statik marshrutlar; metod bo'yicha dinamik marshrutlar alternatsiya bilan yagona regex'ga kompilyatsiya qilinadi — har bir marshrutning qayta ushlash guruhi ofseti compileRouter'da oldindan hisoblanadi, shuning uchun bitta url.match() mos marshrutni aniqlaydi va barcha nomlangan parametrlarni bir o'tishda ajratib oladi. ~500k iteratsiyada chiziqli skanerlash va Hono-uslubi yagona-regex ga qarshi o'lchov o'tkazilgan.",
        ru: "Гибридный роутер с предварительно скомпилированным regex + смещениями групп захвата: статические маршруты в staticByMethod[method][path] для хеш-поиска O(1); динамические маршруты на метод скомпилированы в единый regex с чередованием — смещение группы захвата каждого маршрута предварительно вычислено в compileRouter, поэтому один url.match() идентифицирует совпавший маршрут и извлекает все именованные параметры за один проход. Протестировано против линейного сканирования и Hono-style single-regex на ~500k итерациях.",
      },
      {
        en: "HTTP/1.1 body-completeness guard: the connection buffers incoming data events as a string and only invokes parseRequest once Content-Length bytes are received — preventing partial-body dispatch. The parser splits on \\r\\n\\r\\n to separate headers from body, then parses headers in a for-loop using indexOf(':') for key/value splitting.",
        uz: "HTTP/1.1 tana to'liqlik qo'riqchisi: ulanish kiruvchi ma'lumotlar hodisalarini satr sifatida buferlaydi va faqat Content-Length baytlari qabul qilinganida parseRequest'ni chaqiradi — qisman-tana yuborishini oldini oladi. Parser sarlavhalarni tanadan ajratish uchun \\r\\n\\r\\n bo'yicha ajratadi, keyin kalit/qiymat ajratish uchun indexOf(':') ishlatuvchi for-tsiklda sarlavhalarni tahlil qiladi.",
        ru: "Защита полноты тела HTTP/1.1: соединение буферизирует входящие события данных как строку и вызывает parseRequest только после получения байт Content-Length — предотвращая диспетчеризацию неполного тела. Парсер разделяет на \\r\\n\\r\\n для отделения заголовков от тела, затем парсит заголовки в for-цикле с использованием indexOf(':') для разделения ключ/значение.",
      },
    ],
    stackGroups: [
      {
        label: { en: "Runtime", uz: "Ishlash Vaqti", ru: "Среда выполнения" },
        items: ["Node.js", "net (TCP)", "crypto", "fs", "path"],
      },
      {
        label: { en: "Built from Scratch (Zero Dependencies)", uz: "Noldan Qurilgan (Hech qanday bog'liqlik yo'q)", ru: "Построено с нуля (нет зависимостей)" },
        items: ["HTTP/1.1 parser", "RFC 6455 WebSocket", "Hybrid router", "Rate limiter", "Auto-CRUD store", "ETag caching", "Static file server"],
      },
      {
        label: { en: "Tooling", uz: "Asboblar", ru: "Инструменты" },
        items: ["node --watch", "bench.js (router benchmark)", "test.js (raw-TCP test client)"],
      },
    ],
  },
];

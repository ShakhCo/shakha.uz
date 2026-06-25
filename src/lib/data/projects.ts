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
  learnings: Localized[];
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
      en: "BookUp started from a simple frustration: small service businesses — barbershops, salons, billiards clubs — were juggling bookings across Telegram chats and paper notebooks. I built an all-in-one platform so an owner can run the whole business from their phone while customers book online in a few taps. It now powers 20+ businesses.",
      uz: "BookUp oddiy muammodan boshlandi: kichik xizmat bizneslari — sartaroshxonalar, salonlar, bilyard klublar — Telegram chatlar va qog'oz daftarlar orqali bandlovlarni boshqarardi. Men egasi telefonidan biznesni boshqarishi, mijozlar esa bir necha tugma bosish bilan onlayn bron qilishi uchun yagona platforma yaratdim. Hozir 20+ biznesga xizmat qiladi.",
      ru: "BookUp начался с простого раздражения: малый сервисный бизнес — барбершопы, салоны, бильярдные клубы — жонглировал бронированиями через Telegram-чаты и бумажные тетради. Я создал универсальную платформу, чтобы владелец мог управлять всем бизнесом с телефона, а клиенты бронировали онлайн в несколько касаний. Сейчас она обслуживает 20+ бизнесов.",
    },
    responsibilities: [
      {
        en: "Took it from an empty repo to 20+ paying businesses — owner app, customer booking site, and the backend behind them.",
        uz: "Noldan 20+ to'lovchi biznesga yetkazdim — egalar ilovasi, mijozlar bandlov sayti va ularning orqasidagi backend.",
        ru: "Довёл от пустого репозитория до 20+ платящих бизнесов — приложение для владельцев, сайт бронирования для клиентов и бэкенд за ними.",
      },
      {
        en: "Designed wallet-based billing so platform fees are deducted automatically from a prepaid balance — no chasing invoices.",
        uz: "Hamyon asosida hisob-kitob tizimini loyihalashtirdim — platform to'lovlari avans balansdan avtomatik ushlanadi, hisob-fakturalarni quvlamay.",
        ru: "Разработал биллинг на основе кошелька, чтобы комиссии платформы списывались автоматически с предоплаченного баланса — никакой погони за счетами.",
      },
      {
        en: "Built the Instagram automation that turns comments and DMs into bookings — connecting the owner's account with a single OAuth flow.",
        uz: "Izohlar va DMlarni bandlovlarga aylantiruvchi Instagram avtomatlashtirishni yaratdim — eganing hisobini yagona OAuth oqimi bilan ulash.",
        ru: "Создал Instagram-автоматизацию, превращающую комментарии и DM в бронирования — подключение аккаунта владельца одним OAuth-потоком.",
      },
      {
        en: "Defined the pricing model and SaaS billing — tiered plans, per-staff pricing, SMS packs, and an add-ons calculator.",
        uz: "Narxlash modelini va SaaS billingini belgiladim — bosqichli rejalar, xodimga asoslangan narxlash, SMS to'plamlari va qo'shimchalar kalkulyatori.",
        ru: "Определил модель ценообразования и SaaS-биллинг — многоуровневые планы, цены за сотрудника, SMS-пакеты и калькулятор дополнений.",
      },
    ],
    architecture: {
      en: "Every business gets its own isolated space on a shared platform — multi-tenant — reached via its own subdomain. Owners manage everything from a Telegram mini-app, customers book through a fast Next.js site, and a NestJS/PostgreSQL backend ties it all together. Cloudflare sits in front for edge security.",
      uz: "Har bir biznes umumiy platformada o'z izolyatsiya qilingan maydoniga ega — ko'p ijarali — o'z subdomenida joylashgan. Egalar hamma narsani Telegram mini-ilovadan boshqaradi, mijozlar tez Next.js sayt orqali bron qiladi, NestJS/PostgreSQL backend ularni bir-biriga bog'laydi. Cloudflare xavfsizlik uchun old tomonda.",
      ru: "Каждый бизнес получает собственное изолированное пространство на общей платформе — мультитенантной — через свой поддомен. Владельцы управляют всем из Telegram мини-приложения, клиенты бронируют через быстрый сайт на Next.js, а бэкенд на NestJS/PostgreSQL связывает всё вместе. Cloudflare стоит впереди для безопасности на периметре.",
    },
    engineering: [
      {
        en: "Multi-tenancy at the edge: every request hits Next.js first, which reads the subdomain, validates it, and internally routes to the right tenant — so no tenant can ever stumble into another's data, and onboarding a new business is instant.",
        uz: "Edge'da ko'p ijaralik: har bir so'rov avval Next.js'ga keladi, u subdomenni o'qiydi, tekshiradi va ichki yo'l bilan to'g'ri tenantga yo'naltiradi — hech bir tenant boshqasining ma'lumotlariga kirib qolmaydi, yangi biznesni qo'shish esa bir zumda amalga oshadi.",
        ru: "Мультитенантность на периметре: каждый запрос сначала попадает в Next.js, который читает поддомен, проверяет его и внутренне маршрутизирует к нужному тенанту — ни один тенант никогда не попадёт в данные другого, а подключение нового бизнеса происходит мгновенно.",
      },
      {
        en: "Prepaid-wallet billing modeled as a ledger of typed transactions — fee deductions, SMS charges, and refunds all happen automatically and stay auditable, so owners always know exactly where their money went.",
        uz: "Avans hamyon billinging yozilgan tranzaksiyalar daftari sifatida modellanishi — to'lov ushlamalari, SMS to'lovlari va qaytarishlar avtomatik sodir bo'ladi va tekshirilishi mumkin, shuning uchun egalar pullarining qaerga ketganini doim aniq biladi.",
        ru: "Биллинг предоплаченного кошелька смоделирован как журнал типизированных транзакций — списания комиссий, SMS-оплаты и возвраты происходят автоматически и остаются проверяемыми, так что владельцы всегда точно знают, куда ушли деньги.",
      },
      {
        en: "Token-refresh handling that survives flaky connections and double-taps without logging users out — concurrent 401s coalesce into a single refresh round-trip, preventing the reuse-token race that plagues mini-apps.",
        uz: "Beqaror ulanishlar va ikki marta bosishlarda foydalanuvchini chiqarmay token yangilashni boshqarish — bir vaqtdagi 401lar bitta yangilash aylanmasiga birlashadi, mini-ilovaları qiynayotgan token qayta ishlatish poygasini oldini oladi.",
        ru: "Обработка обновления токена, выдерживающая нестабильные соединения и двойные нажатия без выхода пользователя — параллельные 401 объединяются в один цикл обновления, предотвращая гонку повторного использования токена, которая преследует мини-приложения.",
      },
      {
        en: "Dual pricing modes — flat-rate or per-hour with peak-window rules — plus resource types for both staff and assets like tables and courts, so one schema models barbershops and billiard clubs without hacks.",
        uz: "Qo'sh narxlash rejimlari — tekis stavka yoki cho'qqi oyna qoidalari bilan soatbay — hamda xodimlar va stollar, kortlar kabi aktivlar uchun resurs turlari, shuning uchun bir sxema sartaroshxonalar va bilyard klublarini buzilishlarsiz modellashtiradi.",
        ru: "Два режима ценообразования — фиксированный или почасовой с правилами пиковых окон — плюс типы ресурсов для персонала и активов вроде столов и кортов, так что одна схема моделирует барбершопы и бильярдные клубы без костылей.",
      },
    ],
    learnings: [
      {
        en: "Running my own SaaS taught me the hard part isn't the code — it's billing edge cases and keeping real customers happy when things break.",
        uz: "O'z SaaSimni boshqarish menga qiyin qismi kod emas — bu billing chekka holatlari va narsa buzilganda real mijozlarni xursand saqlash ekanini o'rgandi.",
        ru: "Управление собственным SaaS научило меня, что сложная часть — не код, а крайние случаи биллинга и поддержание довольных клиентов, когда что-то ломается.",
      },
      {
        en: "Getting tenant isolation right early made every later feature simpler — one architectural decision that saved weeks of rework.",
        uz: "Tenant izolyatsiyasini erta to'g'rilash keyingi har bir xususiyatni soddalashtirdi — haftalar davomida qayta ishlashni tejagan bitta arxitektura qarori.",
        ru: "Правильная изоляция тенантов с самого начала упростила каждую последующую функцию — одно архитектурное решение сэкономило недели переработки.",
      },
      {
        en: "Telegram Mini Apps have quirks that don't show up in docs — auth edge cases, keyboard pop-ups breaking layouts — you only learn them by shipping.",
        uz: "Telegram Mini Ilovalarida hujjatlarda ko'rinmaydigan o'ziga xos xususiyatlar bor — auth chekka holatlari, klaviatura ochilib tartibni buzishi — bularni faqat yetkazib ko'rib bilib olasiz.",
        ru: "В Telegram Mini Apps есть нюансы, которые не встречаются в документации — крайние случаи аутентификации, всплывающие клавиатуры, ломающие вёрстку — это узнаёшь только при запуске.",
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
      en: "Buying insurance in Uzbekistan meant visiting each company separately or relying on a broker. MyPolis changes that — it's an online marketplace where customers compare and buy OSAGO, KASKO, and Travel policies from multiple insurers in one place. I built the whole thing: storefront, backend integrations with three insurance APIs, and the admin panel that operations teams use daily.",
      uz: "O'zbekistonda sug'urta sotib olish har bir kompaniyaga alohida borishni yoki brokka tayanishni anglatardi. MyPolis buni o'zgartiradi — mijozlar bir joyda bir nechta sug'urtachilardan OSAGO, KASKO va sayohat polislarini taqqoslab sotib oladigan onlayn marketpleys. Men hammasini yaratdim: do'kon sayti, uchta sug'urta APIsi bilan backend integratsiyalari va operatsiya jamoalari har kuni foydalanadigan admin panel.",
      ru: "Покупка страховки в Узбекистане означала визит к каждой компании отдельно или работу через брокера. MyPolis это меняет — это онлайн-маркетплейс, где клиенты сравнивают и покупают полисы ОСАГО, КАСКО и Travel от нескольких страховщиков в одном месте. Я построил всё: витрину, backend-интеграции с тремя страховыми API и админ-панель, которой ежедневно пользуются операционные команды.",
    },
    responsibilities: [
      {
        en: "Solo full-stack: designed and shipped the customer storefront, the Django REST backend, and a separate admin panel — all from scratch.",
        uz: "Yagona full-stack: mijozlar do'kon saytini, Django REST backendini va alohida admin panelini loyihalashtirdim va yetkazdim — barchasini noldan.",
        ru: "Единственный full-stack: спроектировал и запустил клиентскую витрину, Django REST бэкенд и отдельную админ-панель — всё с нуля.",
      },
      {
        en: "Wired three insurance providers (EuroAsia, Asia Insurance, O'zagrosug'urta) into a single purchase flow — each with its own API quirks, but the same smooth experience for the customer.",
        uz: "Uchta sug'urta provayderini (EuroAsia, Asia Insurance, O'zagrosug'urta) yagona xarid oqimiga uladi — har birining o'z API xususiyatlari bor, lekin mijoz uchun bir xil qulay tajriba.",
        ru: "Подключил трёх страховщиков (EuroAsia, Asia Insurance, O'zagrosug'urta) в единый поток покупки — у каждого свои особенности API, но одинаковый плавный опыт для клиента.",
      },
      {
        en: "Built a Telegram Mini App dashboard for real-time revenue and policy monitoring — so the ops team can check numbers from anywhere.",
        uz: "Real vaqtdagi daromad va polis monitoringi uchun Telegram Mini Ilova boshqaruv panelini yaratdim — operatsiya jamoasi raqamlarni istalgan joydan tekshira oladi.",
        ru: "Создал панель мониторинга в Telegram Mini App для отслеживания выручки и полисов в реальном времени — операционная команда проверяет показатели откуда угодно.",
      },
      {
        en: "Owned all data modelling — contracts, vehicles, drivers, commission rates, promo codes, and a custom user model ready for national ID and OneID SSO.",
        uz: "Barcha ma'lumot modellashtirish — shartnomalar, transport vositalari, haydovchilar, komissiya stavkalari, promo kodlar va milliy ID va OneID SSO uchun tayyor maxsus foydalanuvchi modeli.",
        ru: "Владел всем моделированием данных — договора, транспортные средства, водители, комиссионные ставки, промокоды и кастомная модель пользователя, готовая для национального ID и OneID SSO.",
      },
    ],
    architecture: {
      en: "Three applications talk to each other: a Next.js storefront serving customers in Uzbek and Russian, a Django REST backend that proxies calls to each insurer's own API, and a separate admin SPA for operations. Each insurance provider lives in its own module on the backend, so adding a new one doesn't touch existing ones.",
      uz: "Uchta ilova bir-biri bilan muloqot qiladi: o'zbek va rus tillarida mijozlarga xizmat qiluvchi Next.js do'kon sayti, har bir sug'urtachining o'z APIsi ga chaqiruvlarni proxylaydi Django REST backend va operatsiyalar uchun alohida admin SPA. Har bir sug'urta provayderi backend'da o'z modulida joylashgan, shuning uchun yangisini qo'shish mavjudlarga tegmaydi.",
      ru: "Три приложения взаимодействуют друг с другом: витрина Next.js, обслуживающая клиентов на узбекском и русском языках, бэкенд Django REST, проксирующий вызовы к API каждого страховщика, и отдельная SPA-админка для операций. Каждый страховой провайдер живёт в собственном модуле на бэкенде, поэтому добавление нового не затрагивает существующих.",
    },
    engineering: [
      {
        en: "Atomic policy purchase with automatic rollback: creating a contract wraps the local database write, the insurer API call, and the payment URL retrieval in a single transaction — so if the payment link fails after the insurer has already registered the policy, the system rolls back and fires a Telegram alert instead of silently losing the sale.",
        uz: "Avtomatik orqaga qaytarish bilan atomik polis xaridi: shartnoma yaratish mahalliy ma'lumotlar bazasi yozuvini, sug'urtachi API chaqiruvini va to'lov URL olishni yagona tranzaksiyaga o'raydi — agar sug'urtachi allaqachon polisni ro'yxatdan o'tkazgandan so'ng to'lov havolasi muvaffaqiyatsiz bo'lsa, tizim orqaga qaytadi va sotuv jim yo'qolishdan ko'ra Telegram ogohlantirishini yuboradi.",
        ru: "Атомарная покупка полиса с автоматическим откатом: создание договора оборачивает локальную запись в БД, вызов API страховщика и получение URL оплаты в одну транзакцию — если ссылка на оплату падает после того, как страховщик уже зарегистрировал полис, система откатывается и отправляет Telegram-уведомление вместо того, чтобы молча потерять продажу.",
      },
      {
        en: "Commission and promo-code engine: broker percentages are stored per company and product type, and promo codes support both percentage and fixed-sum discounts scoped to specific insurers with date-range validity — all re-validated at purchase time so nothing slips through stale.",
        uz: "Komissiya va promo-kod mexanizmi: broker foizlari kompaniya va mahsulot turi bo'yicha saqlanadi, promo kodlar esa sana oralig'i amal qilish muddati bilan ma'lum sug'urtachilarga moslashtirilgan foiz va belgilangan summa chegirmalarini qo'llab-quvvatlaydi — xarid vaqtida qayta tekshiriladi, shuning uchun hech narsa eskirgan holda o'tmaydi.",
        ru: "Движок комиссий и промокодов: брокерские проценты хранятся по компании и типу продукта, промокоды поддерживают как процентные, так и фиксированные скидки, привязанные к конкретным страховщикам с диапазоном дат действия — всё повторно проверяется в момент покупки, чтобы ничего не прошло устаревшим.",
      },
      {
        en: "Telegram dashboard authentication using Telegram's own HMAC initData spec — the backend verifies the cryptographic signature and checks the timestamp freshness before issuing tokens, so the dashboard is only accessible to whitelisted admins.",
        uz: "Telegram o'z HMAC initData spetsifikatsiyasidan foydalangan holda Telegram boshqaruv paneli autentifikatsiyasi — backend tokenlar bermasdan oldin kriptografik imzoni tekshiradi va vaqt tamg'asi yangiligini tekshiradi, shuning uchun boshqaruv paneliga faqat ro'yxatga olingan adminlar kira oladi.",
        ru: "Аутентификация Telegram-дашборда по собственной спецификации HMAC initData Telegram — бэкенд проверяет криптографическую подпись и свежесть временной метки перед выдачей токенов, поэтому дашборд доступен только администраторам из белого списка.",
      },
    ],
    learnings: [
      {
        en: "Integrating multiple third-party APIs taught me to expect inconsistency — each insurer had different error formats, timeouts, and edge cases that only appear under real load.",
        uz: "Bir nechta uchinchi tomon APIlari bilan integratsiya meni izchilsizlikka kutishga o'rgatti — har bir sug'urtachida real yuklama ostida paydo bo'ladigan turli xil xato formatlari, kutish vaqtlari va chekka holatlari bor edi.",
        ru: "Интеграция нескольких сторонних API научила меня ожидать непоследовательности — у каждого страховщика были разные форматы ошибок, тайм-ауты и крайние случаи, которые появляются только под реальной нагрузкой.",
      },
      {
        en: "Keeping the provider integrations in separate modules from day one meant I could swap or update one without fear of breaking the others.",
        uz: "Provayder integratsiyalarini dastlabki kundan boshlab alohida modullarda saqlash boshqalarini buzishdan qo'rqmay birini almashtirishim yoki yangilashim mumkinligini anglatardi.",
        ru: "Хранение интеграций провайдеров в отдельных модулях с первого дня означало, что я мог заменить или обновить один, не опасаясь сломать другие.",
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
      en: "Businesses were losing leads in their Instagram comments and DMs — too many messages, not enough time. Automations.uz lets them set keyword rules, AI-powered replies, and interactive ice-breaker menus that engage followers automatically. I built the platform and also published a Python SDK on PyPI so developers can build their own bots on top of the same API.",
      uz: "Bizneslar Instagram izohlari va DMlarida lidlarini yo'qotardi — juda ko'p xabar, vaqt esa yetishmas edi. Automations.uz ularga avtomatik ravishda obunachilarni jalb qiladigan kalit so'z qoidalari, AI javoblar va interaktiv ice-breaker menyularni sozlash imkonini beradi. Men platformani yaratdim va ishlab chiquvchilar xuddi shu API ustida o'z botlarini yaratishlari uchun PyPI'da Python SDK nashr etdim.",
      ru: "Бизнесы теряли лиды в комментариях и DM Instagram — слишком много сообщений, слишком мало времени. Automations.uz позволяет им настраивать правила по ключевым словам, ИИ-ответы и интерактивные меню ice-breaker, автоматически вовлекающие подписчиков. Я построил платформу и также опубликовал Python SDK на PyPI, чтобы разработчики могли строить своих ботов поверх того же API.",
    },
    responsibilities: [
      {
        en: "Designed and built the entire multi-tenant backend — account management, Instagram OAuth, webhook ingestion pipeline, rule engine, AI reply layer, and bot delivery mode.",
        uz: "To'liq ko'p ijarali backendni loyihalashtirdim va yaratdim — hisob boshqaruvi, Instagram OAuth, webhook qabul quvuri, qoidalar mexanizmi, AI javob qatlami va bot yetkazish rejimi.",
        ru: "Спроектировал и построил весь мультитенантный бэкенд — управление аккаунтами, Instagram OAuth, конвейер входящих вебхуков, движок правил, слой ответов ИИ и режим доставки через бота.",
      },
      {
        en: "Built the Next.js customer dashboard and admin panel from scratch — where businesses configure their automation rules and review conversation history.",
        uz: "Next.js mijozlar boshqaruv paneli va admin panelini noldan yaratdim — bizneslar avtomatlashtirish qoidalarini sozlaydigan va suhbat tarixini ko'rib chiqadigan joy.",
        ru: "Построил с нуля клиентскую панель Next.js и админ-панель — где бизнесы настраивают правила автоматизации и просматривают историю переписки.",
      },
      {
        en: "Authored and published the Python SDK on PyPI — async handler decorators, long-poll client, and a full test suite, so developers can consume the API without hosting webhooks themselves.",
        uz: "Python SDK'ni PyPI'da yozdim va nashr etdim — asinxron handler dekoratorlar, long-poll klient va to'liq test to'plami, shuning uchun ishlab chiquvchilar o'zlari webhooklar joylashtirmasdan APIni ishlatishi mumkin.",
        ru: "Написал и опубликовал Python SDK на PyPI — декораторы асинхронных обработчиков, long-poll клиент и полный набор тестов, чтобы разработчики могли использовать API без самостоятельного хостинга вебхуков.",
      },
      {
        en: "Maintained the full schema migration history, Docker infrastructure, and CI — keeping the system stable as features landed.",
        uz: "To'liq sxema migratsiya tarixini, Docker infratuzilmasini va CI'ni saqladim — xususiyatlar qo'shilishi bilan tizimni barqaror ushlab turib.",
        ru: "Вёл полную историю миграций схемы, Docker-инфраструктуру и CI — поддерживая стабильность системы по мере добавления функций.",
      },
    ],
    architecture: {
      en: "Instagram sends events (new comments, DMs) as webhooks; the platform verifies each one with a cryptographic signature check, queues it in BullMQ, and processes it asynchronously — so a spike in Instagram traffic never blocks the API. Each business account is fully isolated, and developers who don't want to run webhook infrastructure can poll for events instead using the Python SDK.",
      uz: "Instagram voqealarni (yangi izohlar, DMlar) webhooklar sifatida yuboradi; platforma har birini kriptografik imzo tekshiruvi bilan tekshiradi, BullMQ'da navbatga qo'yadi va asinkron ravishda qayta ishlaydi — shuning uchun Instagram trafikidagi keskin o'sish hech qachon APIni bloklamaydi. Har bir biznes hisobi to'liq izolyatsiya qilingan, webhook infratuzilmasini ishlatishni xohlamagan ishlab chiquvchilar esa Python SDK yordamida voqealarni so'rashlari mumkin.",
      ru: "Instagram отправляет события (новые комментарии, DM) как вебхуки; платформа проверяет каждый криптографической проверкой подписи, ставит в очередь BullMQ и обрабатывает асинхронно — так что всплеск трафика Instagram никогда не блокирует API. Каждый бизнес-аккаунт полностью изолирован, а разработчики, не желающие разворачивать инфраструктуру вебхуков, могут опрашивать события через Python SDK.",
    },
    engineering: [
      {
        en: "API keys are hashed at creation time and the raw key is never stored — so even a database leak exposes nothing usable. Lookup works by checking only the key prefix, then comparing the hash, which keeps authentication both fast and safe.",
        uz: "API kalitlari yaratish vaqtida xeshlanadi va xom kalit hech qachon saqlanmaydi — shuning uchun ma'lumotlar bazasi sizishi ham ishlatish mumkin bo'lgan narsani ochib bermaydi. Qidiruv faqat kalit prefiksini tekshirish, keyin xeshni solishtirish orqali ishlaydi, bu autentifikatsiyani ham tez, ham xavfsiz saqlaydi.",
        ru: "API-ключи хешируются при создании, и сырой ключ никогда не хранится — так что даже утечка базы данных не раскрывает ничего пригодного. Поиск работает проверкой только префикса ключа, затем сравнением хеша — что делает аутентификацию одновременно быстрой и безопасной.",
      },
      {
        en: "Ice-breaker buttons work via token indirection — each call-to-action button gets a stable random token that the platform stores alongside the reply text, then only the token is sent to Instagram. When a user taps, Meta fires back the token, and the platform looks up the right reply. This means reply text can be updated without re-syncing anything with Instagram.",
        uz: "Ice-breaker tugmalari token indireksiyasi orqali ishlaydi — har bir harakatga chaqiruv tugmasi javob matni bilan birgalikda platforma saqlaydigan barqaror tasodifiy tokenni oladi, keyin faqat token Instagram'ga yuboriladi. Foydalanuvchi bosganda, Meta tokenni qaytarib yuboradi va platforma to'g'ri javobni qidiradi. Bu javob matnini Instagram bilan hech narsani qayta sinxronlashtirmay yangilash imkonini beradi.",
        ru: "Кнопки ice-breaker работают через косвенную адресацию токена — каждая кнопка призыва к действию получает стабильный случайный токен, который платформа хранит вместе с текстом ответа, затем только токен отправляется в Instagram. Когда пользователь нажимает, Meta возвращает токен, и платформа находит нужный ответ. Это значит, что текст ответа можно обновлять без повторной синхронизации с Instagram.",
      },
      {
        en: "The AI reply layer uses OpenAI with tool-calling to capture leads — it injects recent conversation history for context, and if the model decides to capture a phone number, it calls a function tool that routes it to the lead notification service. A timeout and retry cap prevent one stuck AI call from delaying the whole queue.",
        uz: "AI javob qatlami lidlarni qo'lga kiritish uchun vosita-chaqiruv bilan OpenAI'dan foydalanadi — u kontekst uchun so'nggi suhbat tarixini kiritadi, va agar model telefon raqamini olishga qaror qilsa, uni lead bildirishnoma xizmatiga yo'naltiradigan funksiya vositasini chaqiradi. Timeout va qayta urinish chegarasi bitta to'xtab qolgan AI chaqiruvining butun navbatni kechiktirishiga yo'l qo'ymaydi.",
        ru: "Слой ИИ-ответов использует OpenAI с tool-calling для захвата лидов — он вставляет недавнюю историю разговора для контекста, и если модель решает захватить номер телефона, вызывает инструмент-функцию, который направляет его в сервис уведомлений о лидах. Тайм-аут и ограничение повторов предотвращают задержку всей очереди из-за одного зависшего вызова ИИ.",
      },
    ],
    learnings: [
      {
        en: "Building a queue-backed pipeline early was the right call — it decoupled ingestion from processing and made the system trivially retryable when downstream calls failed.",
        uz: "Navbatga asoslangan quvurni erta qurish to'g'ri qaror bo'ldi — u qabul qilishni qayta ishlashdan ajratdi va pastki chaqiruvlar muvaffaqiyatsiz bo'lganda tizimni qayta urinish uchun ahamiyatsiz qildi.",
        ru: "Создание конвейера на основе очереди с самого начала было правильным решением — оно отделило приём от обработки и сделало систему тривиально повторяемой при сбоях нижестоящих вызовов.",
      },
      {
        en: "Publishing an SDK forced me to think about the API from the outside — it exposed awkward interfaces I had accepted internally but would never hand to a developer.",
        uz: "SDK nashr etish meni APIni tashqaridan o'ylashga majbur qildi — u ichki qabul qilgan, lekin hech qachon ishlab chiquvchiga topshirmaydigan noqulay interfeyslarni ochib berdi.",
        ru: "Публикация SDK заставила меня думать об API снаружи — она обнажила неудобные интерфейсы, которые я принял внутренне, но никогда бы не передал разработчику.",
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
      en: "InterRail is a suite of ERP and CRM systems I built from scratch for an international rail-freight logistics company operating across Central Asia and Russia. Before these tools existed, the team tracked orders, contracts, and KPIs in spreadsheets. Now everything — from inquiry through shipment to financial settlement — lives in one place, used daily across 6+ countries.",
      uz: "InterRail — men O'rta Osiyo va Rossiyada faoliyat yurituvchi xalqaro temir yo'l yuk logistikasi kompaniyasi uchun noldan qurilgan ERP va CRM tizimlari to'plami. Bu vositalar paydo bo'lgunga qadar, jamoa buyurtmalar, shartnomalar va KPIlarni elektron jadvalda kuzatardi. Endi hamma narsa — so'rovdan jo'natmaga va moliyaviy hisob-kitobgacha — bir joyda, 6+ davlatda har kuni ishlatiladi.",
      ru: "InterRail — набор ERP и CRM систем, которые я построил с нуля для международной компании железнодорожных грузоперевозок, работающей в Центральной Азии и России. До этих инструментов команда отслеживала заказы, контракты и KPI в таблицах. Теперь всё — от запроса через отгрузку до финансового расчёта — живёт в одном месте, используется ежедневно в 6+ странах.",
    },
    responsibilities: [
      {
        en: "Built both ERP backends from scratch in Django — all data models, REST APIs, and async background jobs for a company that tracks rail freight across Central Asia.",
        uz: "Ikkalasi ERP backendlarini Django'da noldan yaratdim — O'rta Osiyo bo'ylab temir yo'l yukini kuzatuvchi kompaniya uchun barcha ma'lumot modellari, REST APIlar va asinkron background ishlar.",
        ru: "Построил оба ERP-бэкенда с нуля на Django — все модели данных, REST API и асинхронные фоновые задачи для компании, отслеживающей железнодорожные грузы по Центральной Азии.",
      },
      {
        en: "Owned all three Vue 3 frontends — the admin CRM, the tracking dashboard, and a Telegram mini-app — including multi-language support and end-to-end tests.",
        uz: "Uchala Vue 3 frontendni — admin CRM, kuzatuv boshqaruv paneli va Telegram mini-ilovani — ko'p tilli qo'llab-quvvatlash va uchidan-uchiga testlarni o'z ichiga olgan holda boshqardim.",
        ru: "Владел всеми тремя фронтендами Vue 3 — CRM для администраторов, панелью отслеживания и Telegram мини-приложением — включая многоязычную поддержку и сквозные тесты.",
      },
      {
        en: "Integrated an AI assistant so staff can ask about orders and inquiries in plain language — it reads from the live database and tracks cost per user.",
        uz: "Xodimlar oddiy tilda buyurtmalar va so'rovlar haqida so'rashlari uchun AI yordamchini integratsiya qildim — u jonli ma'lumotlar bazasidan o'qiydi va foydalanuvchi boshiga xarajatni kuzatadi.",
        ru: "Интегрировал ИИ-ассистента, чтобы сотрудники могли спрашивать о заказах и запросах на обычном языке — он читает из живой базы данных и отслеживает стоимость на пользователя.",
      },
      {
        en: "Built the document pipeline that parses rail waybill PDFs, spreadsheets, and Word files into structured records — saving hours of manual data entry per shipment.",
        uz: "Temir yo'l yuk xati PDFlari, elektron jadvallar va Word fayllarini tuzilgan yozuvlarga tahlil qiluvchi hujjat quvurini yaratdim — har bir jo'natmada soatlab qo'lda ma'lumot kiritishni tejaydi.",
        ru: "Создал конвейер документов, который разбирает PDF железнодорожных накладных, таблицы и файлы Word в структурированные записи — экономя часы ручного ввода данных на каждую отгрузку.",
      },
    ],
    architecture: {
      en: "Two independent full-stack systems — one for the Central Asia ERP, one for the tracking platform — each following the same pattern: a Django REST backend with real-time WebSocket support, PostgreSQL, Redis, and a Celery worker for background tasks, all in Docker Compose. Vue 3 SPAs talk to their respective backend over JWT auth, and MinIO handles file storage so waybill documents stay accessible without bloating the database.",
      uz: "Ikkita mustaqil full-stack tizim — biri O'rta Osiyo ERP uchun, biri kuzatuv platformasi uchun — har biri bir xil naqshni baham ko'radi: real vaqtdagi WebSocket qo'llab-quvvatlashi bilan Django REST backend, PostgreSQL, Redis va background ishlar uchun Celery worker, barchasi Docker Compose'da. Vue 3 SPAlar JWT autentifikatsiya orqali o'z backendlari bilan muloqot qiladi, MinIO esa yuk xati hujjatlarini ma'lumotlar bazasini o'ldirmasdan ulash imkonini beradi.",
      ru: "Две независимые полностековые системы — одна для ERP Центральной Азии, другая для платформы отслеживания — каждая следует одному шаблону: Django REST бэкенд с поддержкой WebSocket в реальном времени, PostgreSQL, Redis и воркер Celery для фоновых задач, всё в Docker Compose. Vue 3 SPA обращаются к своим бэкендам через JWT-аутентификацию, а MinIO обрабатывает хранилище файлов, чтобы документы накладных оставались доступными без раздувания базы данных.",
    },
    engineering: [
      {
        en: "Contract and act accounting with automatic completion signals: when all line items on an act are filled in, a background task marks it complete automatically — no one needs to remember to close it manually. Django signals keep denormalized totals on the company record in sync without expensive re-aggregation queries.",
        uz: "Aktdagi barcha qatorlar to'ldirilganda, background vazifa avtomatik ravishda uni yakunlangan deb belgilaydi — hech kim uni qo'lda yopishni unutishiga to'g'ri kelmasdi. Django signallar kompaniya yozuvidagi denormallashtirilgan jami miqdorlarni qimmat qayta agregatsiya so'rovlarisiz sinxron saqlaydi.",
        ru: "Учёт договоров и актов с автоматическими сигналами завершения: когда все позиции акта заполнены, фоновая задача автоматически помечает его как выполненный — никому не нужно помнить о ручном закрытии. Сигналы Django синхронизируют денормализованные итоги в записи компании без дорогостоящих запросов повторной агрегации.",
      },
      {
        en: "Polymorphic order model: a single order table covers container shipments, wagon loads, and empty wagon returns — each with its own shipment and payment status lifecycle — so the ops team works in one view regardless of cargo type.",
        uz: "Polimorfik buyurtma modeli: bitta buyurtma jadvali konteyner jo'natmalar, vagon yuklar va bo'sh vagon qaytarishlarni qamrab oladi — har biri o'z jo'natma va to'lov holati tsikliga ega — shuning uchun operatsiya jamoasi yuk turiga qaramasdan bitta ko'rinishda ishlaydi.",
        ru: "Полиморфная модель заказа: единая таблица заказов охватывает контейнерные отгрузки, вагонные грузы и возврат пустых вагонов — каждый со своим жизненным циклом статуса отгрузки и оплаты — так что операционная команда работает в одном представлении независимо от типа груза.",
      },
      {
        en: "AI-assisted waybill extraction: the document pipeline dispatches by file type — PDF, spreadsheet, or Word — extracts the text within safe size caps, and feeds it to the AI to produce structured waybill records. Staff went from entering 30+ fields per document by hand to reviewing the AI's output and clicking confirm.",
        uz: "AI yordamida yuk xati ajratib olish: hujjat quvuri fayl turi bo'yicha yuboradi — PDF, elektron jadval yoki Word — xavfsiz hajm chegaralari ichida matnni ajratib oladi va tuzilgan yuk xati yozuvlarini yaratish uchun AIga uzatadi. Xodimlar hujjat boshiga 30+ maydonni qo'lda kiritishdan AIning natijasini ko'rib chiqish va tasdiqlash tugmasini bosishga o'tishdi.",
        ru: "Извлечение накладных с помощью ИИ: конвейер документов диспетчеризирует по типу файла — PDF, таблица или Word — извлекает текст в рамках безопасных ограничений размера и передаёт ИИ для создания структурированных записей накладных. Сотрудники перешли от ручного ввода 30+ полей на документ к проверке вывода ИИ и нажатию кнопки подтверждения.",
      },
    ],
    learnings: [
      {
        en: "ERP scope always expands — the most important engineering decision was keeping each subsystem (contracts, orders, finance) cleanly separated so new requirements didn't cascade everywhere.",
        uz: "ERP ko'lami doim kengayadi — eng muhim muhandislik qarori har bir quyi tizimni (shartnomalar, buyurtmalar, moliya) yangi talablar hamma joyga tarqalib ketmasligi uchun aniq ajratilgan holda saqlash edi.",
        ru: "Охват ERP всегда расширяется — важнейшим инженерным решением было чёткое разделение каждой подсистемы (договора, заказы, финансы), чтобы новые требования не каскадировали повсюду.",
      },
      {
        en: "Adding an AI layer to document processing revealed that the bottleneck wasn't extraction accuracy — it was data quality upstream. Garbage in, garbage out applies even with good models.",
        uz: "Hujjatlarni qayta ishlashga AI qatlamini qo'shish tortib olish aniqligi bo'lmaganini ko'rsatdi — bu upstream ma'lumotlar sifati edi. Axlat kirsa, axlat chiqadi, hatto yaxshi modellar bilan ham.",
        ru: "Добавление слоя ИИ к обработке документов выявило, что узкое место — не точность извлечения, а качество данных выше по потоку. Мусор на входе — мусор на выходе, даже с хорошими моделями.",
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
      en: "Real estate developers need a site that does more than list apartments — it has to make buyers feel confident before they visit. I built the Do'mbirobod City landing page from Figma designs, giving prospective buyers interactive floor plans, a virtual tour, and a price calculator so they can explore the property at their own pace.",
      uz: "Ko'chmas mulk ishlab chiqaruvchilar kvartiralarni ro'yxatga olishdan ko'proq narsa qiladigan saytga muhtoj — u tashrif buyurishdan oldin xaridorlarga ishonch hosil qilishi kerak. Men Figma dizaynlaridan Do'mbirobod City landing sahifasini yaratdim, potentsial xaridorlarga interaktiv reja ko'rgazmasi, virtual sayohat va narx kalkulyatori berdim, shunda ular mulkni o'z jadvalida ko'rib chiqishi mumkin.",
      ru: "Застройщикам нужен сайт, который делает больше, чем просто перечисляет квартиры — он должен давать покупателям уверенность до визита. Я построил лендинг Do'mbirobod City из дизайнов Figma, предоставив потенциальным покупателям интерактивные планировки, виртуальный тур и калькулятор цен, чтобы они могли изучить объект в удобном темпе.",
    },
    responsibilities: [
      {
        en: "Translated the Figma designs into a pixel-accurate Next.js site — component by component, with smooth scroll animations throughout.",
        uz: "Figma dizaynlarini piksel-aniq Next.js saytiga aylantirdim — komponent bo'yicha komponent, barcha joyda yumshoq aylantirish animatsiyalari bilan.",
        ru: "Перевёл дизайны Figma в пиксельно-точный сайт Next.js — компонент за компонентом, с плавными scroll-анимациями по всему сайту.",
      },
      {
        en: "Built the interactive floor plan viewer that lets buyers explore unit layouts with room-level highlighting.",
        uz: "Xaridorlarga xona darajasidagi ajratib ko'rsatish bilan xonadon rejalarini ko'rib chiqish imkonini beruvchi interaktiv reja ko'rgazmasini yaratdim.",
        ru: "Создал интерактивный просмотрщик планировок, позволяющий покупателям изучать расположение квартир с подсветкой на уровне комнат.",
      },
      {
        en: "Integrated the price calculator and virtual tour components to give buyers a full picture before they set foot on site.",
        uz: "Xaridorlarga joylashuvga qadam bosmasdan oldin to'liq tasavvur berish uchun narx kalkulyatori va virtual sayohat komponentlarini integratsiya qildim.",
        ru: "Интегрировал калькулятор цен и компоненты виртуального тура, чтобы дать покупателям полное представление до визита.",
      },
    ],
    architecture: {
      en: "A statically generated Next.js site — fast by default, no backend needed. The interactive components (floor plan viewer, price calculator, virtual tour) all run client-side, keeping the site snappy while the static pages load instantly from the edge.",
      uz: "Statik ravishda yaratilgan Next.js sayti — standart bo'yicha tez, backend kerak emas. Interaktiv komponentlar (reja ko'rgazmasi, narx kalkulyatori, virtual sayohat) hammasi mijoz tomonida ishlaydi, statik sahifalar esa edge'dan bir zumda yuklanadi.",
      ru: "Статически генерированный сайт Next.js — быстрый по умолчанию, бэкенд не нужен. Интерактивные компоненты (просмотрщик планировок, калькулятор цен, виртуальный тур) работают на клиенте, статические страницы загружаются мгновенно с периметра.",
    },
    engineering: [
      {
        en: "Interactive floor plan with room-level highlighting and unit selection — buyers can click through each apartment layout and see which rooms are part of the unit.",
        uz: "Xona darajasidagi ajratib ko'rsatish va birlik tanlash bilan interaktiv reja — xaridorlar har bir kvartira rejasini bosib ko'rishlari va qaysi xonalar birliklaning bir qismi ekanini ko'rishlari mumkin.",
        ru: "Интерактивная планировка с подсветкой на уровне комнат и выбором блока — покупатели могут кликать по каждой планировке квартиры и видеть, какие комнаты входят в блок.",
      },
      {
        en: "Client-side price calculator taking unit type, floor, and area as inputs and computing final costs based on the developer's configured pricing rules.",
        uz: "Birlik turi, qavat va maydonni kirish sifatida qabul qilib, ishlab chiqaruvchining sozlangan narxlash qoidalariga asoslanib yakuniy xarajatlarni hisoblaydigan mijoz tomoni narx kalkulyatori.",
        ru: "Клиентский калькулятор цен, принимающий тип блока, этаж и площадь как входные данные и вычисляющий итоговую стоимость на основе настроенных правил ценообразования застройщика.",
      },
      {
        en: "Smooth scroll animations and polished transitions throughout — matching the premium feel the client's brand needed.",
        uz: "Butun sayt bo'ylab yumshoq aylantirish animatsiyalari va sayqallangan o'tishlar — mijozning brendiga kerakli premium tuyg'uga mos keladi.",
        ru: "Плавные scroll-анимации и отполированные переходы по всему сайту — соответствующие премиальному ощущению, необходимому бренду клиента.",
      },
    ],
    learnings: [
      {
        en: "Working from Figma designs taught me that pixel accuracy matters less than capturing the intended mood — sometimes you have to make small adjustments in code to match what the designer actually envisioned.",
        uz: "Figma dizaynlaridan ishlash menga piksel aniqligi niyat qilingan kayfiyatni aks ettirishdan ko'ra muhimroq ekanini o'rgaldi — ba'zan dizayner aslida tasavvur qilganiga mos kelish uchun kodda kichik tuzatishlar kiritishingiz kerak.",
        ru: "Работа по дизайнам Figma научила меня, что пиксельная точность важна меньше, чем передача задуманного настроения — иногда нужно вносить небольшие правки в код, чтобы соответствовать тому, что дизайнер действительно имел в виду.",
      },
      {
        en: "Static sites are underrated for marketing pages — you get near-instant load times and no infrastructure to worry about, which made the client happy on launch day.",
        uz: "Statik saytlar marketing sahifalari uchun past baholanadi — deyarli bir zumda yuklanish vaqtlari va tashvish qiladigan infratuzilma yo'q, bu esa mijozni ishga tushirish kuni xursand qildi.",
        ru: "Статические сайты недооценены для маркетинговых страниц — почти мгновенное время загрузки и никакой инфраструктуры для беспокойства, что сделало клиента довольным в день запуска.",
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
    image: "/projects/baxtiyor-oila.jpg",
    overview: {
      en: "Baxtiyor Oila is a matchmaking platform built for the Uzbek diaspora in Germany — a community with limited ways to meet compatible partners within their culture. The whole service lives inside Telegram as a Mini App, so users don't need to download anything. A matching algorithm surfaces compatible profiles, and a Python bot keeps users notified of new matches.",
      uz: "Baxtiyor Oila — Germaniyadagi o'zbek diasporas uchun yaratilgan tanishuv platformasi — o'z madaniyati doirasida mos sheriklarga duch kelishning cheklangan yo'llari bor jamoa. Butun xizmat Telegram ichida Mini Ilova sifatida joylashgan, shuning uchun foydalanuvchilar hech narsani yuklab olishiga hojat yo'q. Moslashtirish algoritmi mos profillarni ko'rsatadi va Python boti foydalanuvchilarga yangi moslashtiruvchilar haqida xabar beradi.",
      ru: "Baxtiyor Oila — платформа знакомств для узбекской диаспоры в Германии — сообщества с ограниченными возможностями познакомиться с подходящими партнёрами в рамках своей культуры. Весь сервис живёт внутри Telegram как Mini App, поэтому пользователям не нужно ничего скачивать. Алгоритм подбора выводит совместимые профили, а Python-бот держит пользователей в курсе новых совпадений.",
    },
    responsibilities: [
      {
        en: "Built the user-facing Telegram Mini App in React — profile creation, browsing matches, and messaging — plus a separate admin app for moderation.",
        uz: "React'da foydalanuvchilarga mo'ljallangan Telegram Mini Ilovasini yaratdim — profil yaratish, moslashtiruvchilarni ko'rib chiqish va xabar almashish — hamda moderatsiya uchun alohida admin ilova.",
        ru: "Создал пользовательское Telegram Mini App на React — создание профиля, просмотр совпадений и обмен сообщениями — плюс отдельное приложение администратора для модерации.",
      },
      {
        en: "Developed the Go REST API backend — user profiles, matching logic, and all data persistence.",
        uz: "Go REST API backendini ishlab chiqdim — foydalanuvchi profillari, moslashtirish mantiqi va barcha ma'lumotlarni saqlash.",
        ru: "Разработал Go REST API бэкенд — профили пользователей, логику подбора и всё хранение данных.",
      },
      {
        en: "Built the matching algorithm and the Python notification bot that tells users when a new compatible profile appears.",
        uz: "Moslashtirish algoritmini va yangi mos profil paydo bo'lganda foydalanuvchilarga xabar beruvchi Python bildirishnoma botini yaratdim.",
        ru: "Создал алгоритм подбора и Python-бот уведомлений, который сообщает пользователям о появлении нового совместимого профиля.",
      },
    ],
    architecture: {
      en: "Two React Telegram Mini Apps — one for users, one for admins — talk to a Go REST API that handles profiles and matching logic. A separate Python Telegram bot handles asynchronous notifications, so users get a message the moment a new match appears without polling.",
      uz: "Ikkita React Telegram Mini Ilovalari — biri foydalanuvchilar, biri adminlar uchun — profillar va moslashtirish mantiqini boshqaruvchi Go REST APIga murojaat qiladi. Alohida Python Telegram boti asinkron bildirishnomalarni boshqaradi, shuning uchun foydalanuvchilar yangi moslashtiruvchi paydo bo'lishi bilanoq so'rovsiz xabar oladi.",
      ru: "Два React Telegram Mini App — один для пользователей, один для администраторов — обращаются к Go REST API, обрабатывающему профили и логику подбора. Отдельный Python Telegram-бот обрабатывает асинхронные уведомления, так что пользователи получают сообщение в момент появления нового совпадения без опроса.",
    },
    engineering: [
      {
        en: "Telegram Mini App initData verification for both user and admin apps — each request is verified against Telegram's cryptographic signature spec, so only legitimate Telegram users can authenticate.",
        uz: "Foydalanuvchi va admin ilovalari uchun Telegram Mini Ilova initData tekshiruvi — har bir so'rov Telegram'ning kriptografik imzo spetsifikatsiyasiga nisbatan tekshiriladi, shuning uchun faqat qonuniy Telegram foydalanuvchilari autentifikatsiya qila oladi.",
        ru: "Верификация initData Telegram Mini App для пользовательского и административного приложений — каждый запрос проверяется по криптографической спецификации подписи Telegram, поэтому только законные пользователи Telegram могут аутентифицироваться.",
      },
      {
        en: "Profile-matching algorithm that evaluates age range, shared interests, and location to surface ranked candidate profiles — giving users the most compatible matches first.",
        uz: "Darajalangan nomzod profillarini ko'rsatish uchun yosh diapazoni, umumiy qiziqishlar va joylashuvni baholaydigan profil moslashtirish algoritmi — foydalanuvchilarga birinchi navbatda eng mos moslashtiruvchilarni beradi.",
        ru: "Алгоритм подбора профилей, оценивающий возрастной диапазон, общие интересы и местоположение для отображения ранжированных профилей-кандидатов — давая пользователям наиболее совместимые совпадения первыми.",
      },
      {
        en: "Python notification bot that pushes real-time match alerts via Telegram Bot API — decoupled from the main API so match delivery doesn't depend on the user opening the app.",
        uz: "Telegram Bot API orqali real vaqtdagi moslashtirish ogohlantirishlarini yuboruvchi Python bildirishnoma boti — asosiy APIdan ajratilgan, shuning uchun moslashtirish yetkazilishi foydalanuvchining ilovani ochishiga bog'liq emas.",
        ru: "Python-бот уведомлений, отправляющий уведомления о совпадениях в реальном времени через Telegram Bot API — отделён от основного API, поэтому доставка совпадений не зависит от открытия пользователем приложения.",
      },
    ],
    learnings: [
      {
        en: "Delivering inside Telegram eliminates the hardest part of any new consumer app — getting users to install something. Distribution was built-in from day one.",
        uz: "Telegram ichida yetkazish har qanday yangi iste'molchi ilovasining eng qiyin qismini yo'q qiladi — foydalanuvchilarni biror narsani o'rnatishga undash. Tarqatish birinchi kundan boshlab o'rnatilgan edi.",
        ru: "Доставка внутри Telegram устраняет самую сложную часть любого нового потребительского приложения — заставить пользователей что-то установить. Дистрибуция была встроена с первого дня.",
      },
      {
        en: "Separating the notification layer (Python bot) from the API was the right call — it meant we could deploy, update, or restart either service without affecting the other.",
        uz: "Bildirishnoma qatlamini (Python boti) APIdan ajratish to'g'ri qaror bo'ldi — bu ikkalasiga ham boshqasiga ta'sir qilmasdan joylash, yangilash yoki qayta ishga tushirish imkonini berdi.",
        ru: "Отделение уровня уведомлений (Python-бот) от API было правильным решением — это позволяло развёртывать, обновлять или перезапускать любой сервис без влияния на другой.",
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
      en: "Connecting an app to many users' Outlook inboxes means handling OAuth per user, rotating tokens, renewing Microsoft Graph subscriptions, and reliably delivering each new email as an event. OutlookID handles all that plumbing so a product team doesn't have to — they connect once, and from then on they get a signed webhook on every new message.",
      uz: "Ilovani ko'plab foydalanuvchilarning Outlook pochtasiga ulash har foydalanuvchi uchun OAuth boshqarishni, tokenlarni aylantirishni, Microsoft Graph obunalarini yangilashni va har bir yangi emailni voqea sifatida ishonchli yetkazishni anglatadi. OutlookID barcha bu sanitarik ishlarni boshqaradi, shuning uchun mahsulot jamoasi buni qilmaydi — ular bir marta ulanadi va undan keyin har bir yangi xabarda imzolangan webhook oladi.",
      ru: "Подключение приложения ко многим почтовым ящикам Outlook пользователей означает обработку OAuth для каждого пользователя, ротацию токенов, обновление подписок Microsoft Graph и надёжную доставку каждого нового письма как события. OutlookID берёт на себя всю эту «сантехнику», чтобы команде продукта не пришлось — они подключаются один раз, и с тех пор получают подписанный вебхук на каждое новое сообщение.",
    },
    responsibilities: [
      {
        en: "Designed and built the entire system from scratch — OAuth flows, token encryption, Microsoft Graph subscription lifecycle, webhook delivery pipeline, database schema, and Docker deployment.",
        uz: "To'liq tizimni noldan loyihalashtirdim va yaratdim — OAuth oqimlari, token shifrlash, Microsoft Graph obuna hayot tsikli, webhook yetkazish quvuri, ma'lumotlar bazasi sxemasi va Docker joylash.",
        ru: "Спроектировал и построил всю систему с нуля — OAuth-потоки, шифрование токенов, жизненный цикл подписок Microsoft Graph, конвейер доставки вебхуков, схема базы данных и развёртывание Docker.",
      },
      {
        en: "Wrote integration tests against real ephemeral Postgres instances using Testcontainers, and unit tests for all cryptographic and token logic.",
        uz: "Testcontainers yordamida haqiqiy vaqtinchalik Postgres nusxalariga qarshi integratsiya testlarini va barcha kriptografik va token mantiqi uchun birlik testlarini yozdim.",
        ru: "Написал интеграционные тесты против реальных временных экземпляров Postgres с помощью Testcontainers и модульные тесты для всей криптографической и токенной логики.",
      },
      {
        en: "Authored the README, OpenAPI spec, and deployment guide — so another team could pick this up and run it without needing to read the source.",
        uz: "README, OpenAPI spetsifikatsiyasi va joylash qo'llanmasini yozdim — shuning uchun boshqa jamoa manba kodni o'qimay uni olib, ishga tushira oladi.",
        ru: "Написал README, спецификацию OpenAPI и руководство по развёртыванию — чтобы другая команда могла взять это и запустить без необходимости читать исходный код.",
      },
    ],
    architecture: {
      en: "A downstream application calls a single endpoint to start the OAuth flow for a user. OutlookID handles the redirect, exchanges the auth code, encrypts the tokens, and immediately sets up a Microsoft Graph subscription on that mailbox. From then on, Graph pushes change notifications to OutlookID, which validates them and queues a delivery job. The job system retries with exponential backoff for up to 6 attempts before moving to a dead-letter queue that operators can replay.",
      uz: "Pastki ilova foydalanuvchi uchun OAuth oqimini boshlash uchun yagona endpointni chaqiradi. OutlookID qayta yo'naltirish boshqaradi, autentifikatsiya kodini almashinadi, tokenlarni shifrlaydi va o'sha pochtada Microsoft Graph obunasini darhol o'rnatadi. Undan keyin Graph o'zgarish bildirishnomalarini OutlookID ga suradi, u ularni tekshiradi va yetkazish ishini navbatga qo'yadi. Ish tizimi dead-letter navbatiga o'tishdan oldin 6 urinishgacha eksponensial backoff bilan qayta urinadi.",
      ru: "Нижестоящее приложение вызывает единственный эндпоинт для запуска OAuth-потока для пользователя. OutlookID обрабатывает перенаправление, обменивает код авторизации, шифрует токены и немедленно настраивает подписку Microsoft Graph на этот почтовый ящик. С тех пор Graph отправляет уведомления об изменениях в OutlookID, который их проверяет и ставит в очередь задание доставки. Система задач повторяет попытки с экспоненциальной задержкой до 6 попыток перед переходом в очередь dead-letter, которую операторы могут воспроизвести.",
    },
    engineering: [
      {
        en: "OAuth tokens are encrypted at rest with AES-256-GCM using a random initialization vector per token — so even if someone pulls the database, they get ciphertext rather than credentials that work.",
        uz: "OAuth tokenlari har bir token uchun tasodifiy boshlang'ich vektor bilan AES-256-GCM yordamida dam olishda shifrlanadi — shuning uchun hatto kimdir ma'lumotlar bazasini tortib olsa ham, ishlaydigan hisoblar o'rniga shifrlangan matn oladi.",
        ru: "OAuth-токены шифруются в покое с помощью AES-256-GCM, используя случайный вектор инициализации для каждого токена — так что даже если кто-то вытащит базу данных, он получит шифртекст, а не рабочие учётные данные.",
      },
      {
        en: "Concurrent token refresh is coalesced: if two requests hit the same mailbox while its token is expired, they share one refresh round-trip instead of racing and invalidating each other. This prevents the hard-to-debug double-refresh bug that shows up in multi-tenant systems.",
        uz: "Bir vaqtdagi token yangilash birlashtiriladi: agar ikkita so'rov tokeni muddati o'tgan paytda bir xil pochtaga duch kelsa, ular poyga o'rniga bitta yangilash aylanmasini baham ko'radi. Bu ko'p ijarali tizimlarda paydo bo'ladigan disk raskach qilish qiyin qo'sh yangilash xatosini oldini oladi.",
        ru: "Параллельное обновление токена объединяется: если два запроса попадают в один почтовый ящик при истёкшем токене, они используют один цикл обновления вместо того, чтобы гоняться и аннулировать друг друга. Это предотвращает трудно отлаживаемую ошибку двойного обновления, которая появляется в мультитенантных системах.",
      },
      {
        en: "Outbound webhooks are signed with a Stripe-style HMAC header — the downstream app can verify every delivery is genuine and hasn't been tampered with, and exponential backoff with dead-letter management means no event is permanently lost.",
        uz: "Chiquvchi webhooklar Stripe-uslubi HMAC sarlavhasi bilan imzolanadi — pastki ilova har bir yetkazish haqiqiy va o'zgartirilmaganligini tasdiqlashi mumkin, va dead-letter boshqaruvi bilan eksponensial backoff hech bir voqea doimiy ravishda yo'qolmasligini ta'minlaydi.",
        ru: "Исходящие вебхуки подписываются заголовком HMAC в стиле Stripe — нижестоящее приложение может проверить, что каждая доставка подлинная и не была подделана, а экспоненциальная задержка с управлением dead-letter означает, что ни одно событие не теряется навсегда.",
      },
      {
        en: "Microsoft's MSAL library doesn't expose refresh tokens in its standard result — so I had to deserialize its internal token cache to extract the secret by account ID. A necessary workaround, well-tested and documented.",
        uz: "Microsoft'ning MSAL kutubxonasi standart natijasida refresh tokenlarni oshkor qilmaydi — shuning uchun hisob IDsi bo'yicha sirni ajratib olish uchun uning ichki token keshini deserializatsiya qilishim kerak edi. Zarur vaqtinchalik yechim, yaxshi testlangan va hujjatlashtirilgan.",
        ru: "Библиотека MSAL от Microsoft не раскрывает refresh-токены в стандартном результате — поэтому мне пришлось десериализовать её внутренний кеш токенов для извлечения секрета по идентификатору аккаунта. Необходимый обходной путь, хорошо протестированный и задокументированный.",
      },
    ],
    learnings: [
      {
        en: "Infrastructure libraries (like MSAL) have undocumented behaviors that only reveal themselves at the edge cases — reading the source was the only way to understand what was happening with token caching.",
        uz: "Infratuzilma kutubxonalari (MSAL kabi) faqat chekka holatlarda o'zini namoyon qiladigan hujjatlashtirilmagan xatti-harakatlarga ega — manba kodini o'qish token keshlash bilan nima sodir bo'layotganini tushunishning yagona yo'li edi.",
        ru: "Инфраструктурные библиотеки (вроде MSAL) имеют недокументированное поведение, которое проявляется только в крайних случаях — чтение исходников было единственным способом понять, что происходит с кешированием токенов.",
      },
      {
        en: "Building the dead-letter queue and retry admin endpoints from the start — rather than adding them after a real failure — was the right call. You need observability before you need it.",
        uz: "Dead-letter navbati va qayta urinish admin endpointlarini boshdanoq qurish — ularni haqiqiy muvaffaqiyatsizlikdan keyin qo'shish o'rniga — to'g'ri qaror edi. Sizga kerak bo'lishidan oldin kuzatuvchanlik kerak.",
        ru: "Создание очереди dead-letter и эндпоинтов администратора для повторных попыток с самого начала — вместо их добавления после реального сбоя — было правильным решением. Наблюдаемость нужна до того, как она понадобится.",
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
      en: "Tashkent has a lot of things people own once and then loan to neighbours informally. Ijara formalizes that: owners list tools, electronics, event gear, and vehicles; renters browse by date, book, and pay online. I built the full stack — from the Django API handling booking logic to the Nuxt 3 frontend where transactions happen.",
      uz: "Toshkentda odamlar bir marta sotib olib keyin qo'shnilarga norasmiy ravishda qarz beradigan ko'p narsa bor. Ijara buni rasmiylashtiradi: egalar asboblar, elektronika, tadbir jihozlari va transportni joylaydi; ijarachilar sana bo'yicha ko'rib chiqadi, bron qiladi va onlayn to'laydi. Men to'liq stek yaratdim — bandlov mantiqini boshqaruvchi Django APIdan tranzaksiyalar sodir bo'ladigan Nuxt 3 frontendgacha.",
      ru: "В Ташкенте есть много вещей, которые люди покупают однажды, а потом неформально одалживают соседям. Ijara формализует это: владельцы размещают инструменты, электронику, оборудование для мероприятий и транспорт; арендаторы выбирают по дате, бронируют и платят онлайн. Я построил полный стек — от Django API, обрабатывающего логику бронирования, до фронтенда Nuxt 3, где происходят транзакции.",
    },
    responsibilities: [
      {
        en: "Designed and built the full Django REST API — five application modules covering accounts, listings, bookings, payments, and search, all with an OpenAPI schema for clear contracts.",
        uz: "To'liq Django REST APIni loyihalashtirdim va yaratdim — hisoblar, ro'yxatlar, bandlovlar, to'lovlar va qidiruvni qamrab oluvchi beshta ilova moduli, barchasi aniq shartnomalar uchun OpenAPI sxemasi bilan.",
        ru: "Спроектировал и построил полный Django REST API — пять модулей приложений, охватывающих аккаунты, объявления, бронирования, платежи и поиск, все со схемой OpenAPI для чётких контрактов.",
      },
      {
        en: "Built the booking state machine and double-booking prevention — a Postgres range constraint that makes it physically impossible to book the same item for overlapping dates.",
        uz: "Bandlov holat mashinasini va ikki marta bron qilishni oldini olishni yaratdim — bir xil buyumni kesishuvchi sanalarda bron qilishni fizik jihatdan imkonsiz qiladigan Postgres diapazoni cheklovi.",
        ru: "Создал машину состояний бронирования и предотвращение двойного бронирования — ограничение диапазона Postgres, которое делает физически невозможным бронирование одного и того же предмета на пересекающиеся даты.",
      },
      {
        en: "Built the Nuxt 3 frontend — page routing, auth with JWT tokens in memory plus secure refresh cookies, data fetching, form validation, and the Stripe checkout flow.",
        uz: "Nuxt 3 frontendini yaratdim — sahifa routingi, xotiradagi JWT tokenlari va xavfsiz yangilash cookielari bilan autentifikatsiya, ma'lumot olish, forma tekshiruvi va Stripe to'lov oqimi.",
        ru: "Построил фронтенд Nuxt 3 — маршрутизация страниц, аутентификация с JWT токенами в памяти плюс безопасные refresh cookies, получение данных, валидация форм и поток оплаты Stripe.",
      },
      {
        en: "Added an OpenAI-powered listing assistant that suggests title, description, and category from uploaded photos — reducing the barrier for owners to list their first item.",
        uz: "Yuklangan fotosuratlardan sarlavha, tavsif va toifani taklif qiluvchi OpenAI-yordamli ro'yxat yordamchisini qo'shdim — egalar uchun birinchi buyumni joylashning to'sig'ini kamaytiradi.",
        ru: "Добавил ИИ-ассистент на основе OpenAI, предлагающий заголовок, описание и категорию по загруженным фотографиям — снижая барьер для владельцев при размещении первого объявления.",
      },
    ],
    architecture: {
      en: "The Django API and Nuxt frontend run in separate containers, health-checked so they start in the right order. The Nuxt server acts as a proxy for all API calls, so the browser only ever talks to one origin. JWT tokens live in memory (secure but wiped on refresh), and refresh tokens live in an httpOnly cookie — the auth pattern that balances security with a smooth user experience.",
      uz: "Django API va Nuxt frontend alohida konteynerda ishlaydi, to'g'ri tartibda ishga tushishlari uchun sog'liq tekshiruvlari. Nuxt serveri barcha API chaqiruvlari uchun proksi vazifasini bajaradi, shuning uchun brauzer faqat bitta manbaga murojaat qiladi. JWT tokenlari xotirada (xavfsiz, lekin yangilanishda o'chiriladi), yangilash tokenlari esa httpOnly cookieda — xavfsizlik va qulay foydalanuvchi tajribasini muvozanatlashtiradigan autentifikatsiya namunasi.",
      ru: "Django API и фронтенд Nuxt работают в отдельных контейнерах, проверяемых на работоспособность для запуска в правильном порядке. Сервер Nuxt действует как прокси для всех API-вызовов, поэтому браузер обращается только к одному источнику. JWT токены живут в памяти (безопасно, но очищаются при обновлении), а refresh-токены живут в httpOnly cookie — шаблон аутентификации, балансирующий безопасность с хорошим пользовательским опытом.",
    },
    engineering: [
      {
        en: "Double-booking prevention enforced at the database level using a Postgres range overlap constraint — so even if two requests arrive simultaneously, the database rejects the second one. Cancelled or completed bookings fall outside the constraint, so the same time window can be re-booked.",
        uz: "Postgres diapazoni kesishish cheklovi yordamida ma'lumotlar bazasi darajasida ikki marta bron qilishni oldini olish — hatto ikkita so'rov bir vaqtda kelsa ham, ma'lumotlar bazasi ikkinchisini rad etadi. Bekor qilingan yoki yakunlangan bandlovlar cheklovdan tashqarida, shuning uchun bir xil vaqt oynasi qayta bronlanishi mumkin.",
        ru: "Предотвращение двойного бронирования на уровне базы данных с использованием ограничения перекрытия диапазонов Postgres — поэтому даже если два запроса поступают одновременно, база данных отклоняет второй. Отменённые или завершённые бронирования выходят за рамки ограничения, поэтому то же временное окно может быть забронировано повторно.",
      },
      {
        en: "Booking state machine with a full audit trail: every state change goes through a single function that checks role permissions and appends a transition record — so there's a complete history of who changed what and when.",
        uz: "To'liq audit izi bilan bandlov holat mashinasi: har bir holat o'zgarishi rol ruxsatlarini tekshiradigan va o'tish yozuvini qo'shadigan yagona funksiya orqali o'tadi — shuning uchun kim nimani va qachon o'zgartirganining to'liq tarixi mavjud.",
        ru: "Машина состояний бронирования с полным журналом аудита: каждое изменение состояния проходит через единственную функцию, проверяющую права ролей и добавляющую запись перехода — так что есть полная история того, кто что и когда изменил.",
      },
      {
        en: "Full-text search with trigram fallback: listings are indexed for fast keyword search, and a trigram similarity check catches typos and partial matches — so renters find what they're looking for even when their spelling is off.",
        uz: "Trigram zaxirasi bilan to'liq matn qidiruvi: ro'yxatlar tez kalit so'z qidiruvi uchun indekslanadi va trigram o'xshashlik tekshiruvi yozuv xatolarini va qisman moslikni ushlaydi — shuning uchun ijarachilar imlosi noto'g'ri bo'lsa ham qidirayotgan narsasini topadi.",
        ru: "Полнотекстовый поиск с тригрэмным запасным вариантом: объявления индексируются для быстрого поиска по ключевым словам, а проверка тригрэмного сходства ловит опечатки и частичные совпадения — так что арендаторы находят то, что ищут, даже при неправильном написании.",
      },
    ],
    learnings: [
      {
        en: "Enforcing business rules at the database level — not just in application code — is the only way to stay safe when multiple services or requests touch the same data simultaneously.",
        uz: "Biznes qoidalarini ma'lumotlar bazasi darajasida amalga oshirish — faqat ilova kodida emas — bir vaqtda bir xil ma'lumotlarga bir nechta xizmatlar yoki so'rovlar tegsa xavfsiz qolishning yagona yo'li.",
        ru: "Применение бизнес-правил на уровне базы данных — не только в коде приложения — единственный способ оставаться в безопасности, когда несколько сервисов или запросов одновременно обращаются к одним данным.",
      },
      {
        en: "The AI listing suggestion feature had an outsized impact on the listing creation experience relative to the effort it took — sometimes the highest-leverage features are the smallest ones.",
        uz: "AI ro'yxat taklif xususiyati sarflangan sa'y-harakatga nisbatan ro'yxat yaratish tajribasiga katta ta'sir ko'rsatdi — ba'zan eng katta ta'sir xususiyatlari eng kichiklari.",
        ru: "Функция ИИ-предложения объявления оказала непропорционально большое влияние на опыт создания объявления относительно затраченных усилий — иногда функции с наибольшим рычагом — самые маленькие.",
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
      en: "I built noServer to understand what actually happens when a web server handles a request — not through a framework's abstraction, but at the raw socket level. Zero dependencies: no npm packages, no http module. It implements HTTP/1.1 parsing, a hybrid router, WebSocket, rate limiting, CRUD generation, and static file serving — all in a single file, from first principles.",
      uz: "Men noServer ni veb-server so'rovni boshqarganda aslida nima sodir bo'lishini tushunish uchun yaratdim — freymvorkning abstraktsiyasi orqali emas, balki xom soket darajasida. Hech qanday bog'liqlik: npm paketlari yo'q, http moduli yo'q. U HTTP/1.1 tahlilini, gibrid routerni, WebSocket, rate limiting, CRUD generatsiyasini va statik fayl xizmatini amalga oshiradi — barchasi bitta faylda, asoslardan.",
      ru: "Я создал noServer, чтобы понять, что на самом деле происходит, когда веб-сервер обрабатывает запрос — не через абстракцию фреймворка, а на уровне сырого сокета. Ноль зависимостей: никаких npm-пакетов, никакого модуля http. Реализует парсинг HTTP/1.1, гибридный роутер, WebSocket, ограничение частоты, генерацию CRUD и раздачу статических файлов — всё в одном файле, с первых принципов.",
    },
    responsibilities: [
      {
        en: "Sole author — built every layer from scratch: TCP socket handling, HTTP parsing, routing engine, WebSocket protocol, and the config API that developers use.",
        uz: "Yagona muallif — har bir qatlamni noldan yaratdim: TCP soket boshqaruvi, HTTP tahlili, routing mexanizmi, WebSocket protokoli va ishlab chiquvchilar foydalanadigan konfiguratsiya API.",
        ru: "Единственный автор — построил каждый слой с нуля: обработка TCP-сокетов, парсинг HTTP, движок маршрутизации, протокол WebSocket и конфигурационный API для разработчиков.",
      },
      {
        en: "Benchmarked three different routing strategies to justify the final design — the benchmark results are committed alongside the code so the decision is always traceable.",
        uz: "Yakuniy dizaynni asoslash uchun uchta turli routing strategiyasini o'lchadim — o'lchov natijalari qaror har doim kuzatilishi uchun kod bilan birgalikda amalga oshiriladi.",
        ru: "Протестировал три разные стратегии маршрутизации для обоснования финального дизайна — результаты бенчмарка зафиксированы вместе с кодом, чтобы решение всегда было отслеживаемым.",
      },
      {
        en: "Wrote a raw-TCP test client that hand-crafts HTTP/1.1 request strings to verify server behavior end-to-end — no testing library, just raw sockets.",
        uz: "Server xatti-harakatini uchidan-uchiga tasdiqlash uchun HTTP/1.1 so'rov satrlarini qo'lda yaratuvchi xom-TCP test klientini yozdim — test kutubxonasi yo'q, faqat xom soketlar.",
        ru: "Написал raw-TCP тестовый клиент, вручную создающий HTTP/1.1 строки запросов для проверки поведения сервера сквозным образом — никакой тестовой библиотеки, только сырые сокеты.",
      },
    ],
    architecture: {
      en: "The server opens a raw TCP socket and buffers incoming data until a complete HTTP request arrives — detected by the blank line after headers plus the Content-Length for the body. Routes are stored in two structures: a plain object hash map for static paths (constant-time lookup) and a single compiled regex for parameterized paths, so one match call captures the route and extracts all parameters at once. WebSocket upgrades switch the socket from text to binary frame mode for the rest of its life.",
      uz: "Server xom TCP soketini ochadi va to'liq HTTP so'rovi kelmaguncha kiruvchi ma'lumotlarni buferlaydi — sarlavhalar keyin bo'sh qator va tana uchun Content-Length orqali aniqlanadi. Marshrutlar ikki tuzilmada saqlanadi: statik yo'llar uchun oddiy ob'ekt xesh-xarita (doimiy vaqtli qidiruv) va parametrlangan yo'llar uchun bitta kompilyatsiya qilingan regex, shuning uchun bitta mos qidiruv chaqiruvi marshrutni ushlaydi va barcha parametrlarni bir vaqtda ajratib oladi. WebSocket yangilash soketni qolgan umri davomida matn rejimidan ikkilik kadr rejimiga o'tkazadi.",
      ru: "Сервер открывает сырой TCP-сокет и буферизирует входящие данные до прихода полного HTTP-запроса — определяемого пустой строкой после заголовков плюс Content-Length для тела. Маршруты хранятся в двух структурах: хеш-карта простых объектов для статических путей (поиск за константное время) и единый скомпилированный regex для параметризованных путей, так что один вызов match захватывает маршрут и извлекает все параметры сразу. WebSocket-апгрейд переключает сокет из текстового в режим бинарных фреймов на оставшееся время жизни.",
    },
    engineering: [
      {
        en: "WebSocket implemented from the RFC spec by hand — the handshake, frame decoding, and frame encoding, including all three payload length encodings and XOR unmasking. Ping is automatically answered with Pong. Nothing borrowed from npm.",
        uz: "WebSocket RFC spetsifikatsiyasidan qo'lda amalga oshirilgan — handshake, kadr dekodlash va kadr kodlash, uch xil yuklanma uzunlik kodlamasini va XOR niqobdan chiqarishni o'z ichiga oladi. Ping avtomatik ravishda Pong bilan javob beriladi. npm dan hech narsa qarzga olinmagan.",
        ru: "WebSocket реализован вручную по RFC-спецификации — хендшейк, декодирование фреймов и кодирование фреймов, включая все три кодировки длины полезной нагрузки и XOR-демаскирование. Ping автоматически отвечает Pong. Ничего из npm не заимствовано.",
      },
      {
        en: "Hybrid router benchmarked against two alternatives: static paths use a hash map for constant-time lookup, dynamic paths use a single compiled regex where each route's capture-group offset is pre-computed — so one match call does both routing and parameter extraction. Benchmark confirmed it beats linear scan and the Hono-style approach at 500k iterations.",
        uz: "Gibrid router ikkita muqobilga qarshi o'lchov o'tkazildi: statik yo'llar doimiy vaqtli qidiruv uchun xesh-xaritadan foydalanadi, dinamik yo'llar har bir marshrutning qayta ushlash guruhi ofseti oldindan hisoblanadigan bitta kompilyatsiya qilingan regex ishlatadi — shuning uchun bitta mos qidiruv chaqiruvi ham routing, ham parametr ajratishni amalga oshiradi. O'lchov 500k iteratsiyada chiziqli skanerlash va Hono-uslubini yengishini tasdiqladi.",
        ru: "Гибридный роутер проверен против двух альтернатив: статические пути используют хеш-карту для поиска за константное время, динамические пути используют единый скомпилированный regex, где смещение группы захвата каждого маршрута предварительно вычислено — так что один вызов match выполняет и маршрутизацию, и извлечение параметров. Бенчмарк подтвердил превосходство над линейным сканированием и подходом в стиле Hono на 500k итерациях.",
      },
      {
        en: "HTTP body completeness guard: the server buffers incoming data and only dispatches a request once all bytes promised by Content-Length have arrived — preventing partial-body processing bugs that are notoriously hard to reproduce.",
        uz: "HTTP tana to'liqlik qo'riqchisi: server kiruvchi ma'lumotlarni buferlaydi va faqat Content-Length tomonidan va'da qilingan barcha baytlar kelganida so'rovni yuboradi — takrorlash qiyin bo'lgan qisman tana qayta ishlash xatolarini oldini oladi.",
        ru: "Защита полноты тела HTTP: сервер буферизирует входящие данные и только диспетчеризирует запрос после получения всех байт, обещанных Content-Length — предотвращая баги неполной обработки тела, которые печально известны сложностью воспроизведения.",
      },
    ],
    learnings: [
      {
        en: "Implementing HTTP from scratch gave me a clear picture of what frameworks hide — and made me appreciate why they exist. The boundary between 'educational' and 'production-ready' is real.",
        uz: "HTTP ni noldan amalga oshirish menga freymvorklar nimani yashirishini aniq ko'rsatdi — va ular nima uchun mavjudligini qadrlaydigan qildi. 'Ta'limiy' va 'ishlab chiqarishga tayyor' o'rtasidagi chegara haqiqiy.",
        ru: "Реализация HTTP с нуля дала мне чёткое представление о том, что скрывают фреймворки — и заставила оценить, почему они существуют. Граница между «образовательным» и «готовым к продакшену» реальна.",
      },
      {
        en: "Benchmarking routing algorithms before committing to one saved time later — having the numbers in the repo means I never had to re-argue the decision.",
        uz: "Birini tanlashdan oldin routing algoritmlarini o'lchash keyinchalik vaqt tejadi — repoda raqamlar bo'lishi qarorni qayta muhokama qilmasligimni anglatadi.",
        ru: "Бенчмаркинг алгоритмов маршрутизации перед окончательным выбором сэкономил время впоследствии — наличие чисел в репозитории означает, что мне никогда не приходилось заново аргументировать решение.",
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

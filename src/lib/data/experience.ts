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

export type EducationItem = {
  slug: string;
  school: string;
  degree: Localized;
  period: string;
  url: string | null;
  logo: string;
  overview: Localized;
  learned: Localized[];
  modules: string[];
};

export const EDUCATION: EducationItem[] = [
  {
    slug: "bsc-computer-science",
    school: "Westminster International University in Tashkent",
    degree: {
      en: "BSc (Hons) in Computer Science",
      uz: "BSc (Hons) Kompyuter fanlari",
      ru: "BSc (с отличием) Компьютерные науки",
    },
    period: "2021 — 2024",
    url: "https://wiut.uz/bsc-hons-in-computer-science",
    logo: "/brand/wiut.png",
    overview: {
      en: "I joined the BSc (Hons) in Computer Science at WIUT in 2021, building on my foundation year. The three-year programme — validated by the University of Westminster — covers the full breadth of computing: from algorithms and operating systems to software engineering, databases, and cybersecurity. It is designed to produce independent thinkers who can analyse complex problems and communicate solutions with clarity and confidence.",
      uz: "Men 2021-yilda WIUT'ning BSc (Hons) Kompyuter fanlari dasturiga qo'shildim va fondament yilimni davom ettirib. Vestminster universiteti tomonidan tasdiqlangan uch yillik dastur algoritmlardan tortib, operatsion tizimlar, dasturiy ta'minot muhandisligi, ma'lumotlar bazalari va kiberxavfsizlikkacha hisoblash sohalarining barcha qirralarini qamrab oladi. Dastur mustaqil fikrlovchi, murakkab muammolarni tahlil qila oladigan va yechimlarni aniq ifodalay oladigan mutaxassislarni tayyorlash uchun mo'ljallangan.",
      ru: "В 2021 году я поступил на программу BSc (с отличием) по компьютерным наукам в WIUT, продолжив обучение после подготовительного года. Трёхлетняя программа, аккредитованная Вестминстерским университетом, охватывает весь спектр вычислительных дисциплин — от алгоритмов и операционных систем до программной инженерии, баз данных и кибербезопасности. Программа нацелена на подготовку самостоятельных мыслителей, способных анализировать сложные задачи и уверенно представлять решения.",
    },
    learned: [
      {
        en: "Mastered computer science fundamentals — algorithms, data structures, operating systems, and programming paradigms — that underpin everything I build today.",
        uz: "Bugun qurayotgan hamma narsamning asosini tashkil etuvchi algoritmlar, ma'lumotlar tuzilmalari, operatsion tizimlar va dasturlash paradigmalarini — kompyuter fanlari asoslarini o'rgandim.",
        ru: "Освоил фундаментальные принципы компьютерных наук — алгоритмы, структуры данных, операционные системы и парадигмы программирования — которые лежат в основе всего, что я создаю сегодня.",
      },
      {
        en: "Gained hands-on experience with distributed systems and cloud computing, learning how to design resilient, scalable architectures that work at real-world scale.",
        uz: "Taqsimlangan tizimlar va bulutli hisoblash bo'yicha amaliy tajriba orttirib, haqiqiy ko'lamdagi ishlab chiqarishda ishlovchi bardoshli va miqyoslanadigan arxitekturalarni loyihalashni o'rgandim.",
        ru: "Получил практический опыт в области распределённых систем и облачных вычислений, научился проектировать отказоустойчивые масштабируемые архитектуры для реальных нагрузок.",
      },
      {
        en: "Studied software quality, performance, and testing — building the discipline to write code that is not just functional but reliable, maintainable, and measurable.",
        uz: "Dasturiy ta'minot sifati, ishlash samaradorligi va testlashni o'rganib — nafaqat ishlovchi, balki ishonchli, qo'llab-quvvatlash mumkin va o'lchanadigan kod yozish intizomini shakllantirdim.",
        ru: "Изучал качество программного обеспечения, производительность и тестирование — выработал дисциплину написания кода, который не просто работает, но надёжен, поддерживаем и измерим.",
      },
      {
        en: "Built a thorough understanding of database systems — from relational modelling and SQL to transaction management and performance optimisation — which feeds directly into how I design data layers today.",
        uz: "Relatsion modellash va SQL dan tranzaksiyalarni boshqarish va ishlash optimallashtirishgacha — ma'lumotlar bazalari tizimlarini chuqur tushundim, bu bugun ma'lumotlar qatlamlarini qanday loyihalashimga to'g'ridan-to'g'ri ta'sir qiladi.",
        ru: "Глубоко разобрался в системах баз данных — от реляционного моделирования и SQL до управления транзакциями и оптимизации производительности — что напрямую влияет на то, как я проектирую слои данных сегодня.",
      },
    ],
    modules: [
      "Computer Science Fundamentals",
      "Distributed Systems and Cloud Computing",
      "Software Quality, Performance and Testing",
      "Database Systems Development",
      "Algorithms and Data Structures",
      "Operating Systems",
      "Software Engineering",
      "Cybersecurity",
    ],
  },
  {
    slug: "ifs",
    school: "Westminster International University in Tashkent",
    degree: {
      en: "Certificate in International Foundation Studies",
      uz: "Xalqaro fondament ta'lim sertifikati",
      ru: "Сертификат международных подготовительных исследований",
    },
    period: "2020 — 2021",
    url: "https://wiut.uz/certificate-international-foundation-studies",
    logo: "/brand/wiut.png",
    overview: {
      en: "I began my academic journey at WIUT in 2020 with the Certificate in International Foundation Studies — a one-year, two-semester programme validated by the University of Westminster. The Foundation is designed as the first step into higher education, preparing students for degree-level study through a combination of academic skills, critical thinking, and subject knowledge. As a UK university award, it is also recognised as an entry qualification for degree courses at universities around the world.",
      uz: "Men 2020-yilda WIUT'da akademik yo'limni Xalqaro fondament ta'lim sertifikati bilan boshladim — Vestminster universiteti tomonidan tasdiqlangan bir yillik, ikki semestrli dastur. Fondament oliy ta'limga birinchi qadam sifatida tuzilgan bo'lib, talabalarni akademik ko'nikmalar, tanqidiy fikrlash va fan bilimlari orqali daraja darajasidagi o'qishga tayyorlaydi. Britaniya universiteti mukofoti sifatida u butun dunyo universitetlarida daraja kurslariga kirish malakasi sifatida ham tan olinadi.",
      ru: "Я начал своё академическое путешествие в WIUT в 2020 году с программы «Сертификат международных подготовительных исследований» — однолетней, двухсеместровой программы, аккредитованной Вестминстерским университетом. Подготовительный курс задуман как первый шаг в высшее образование: он готовит студентов к обучению на уровне бакалавриата через сочетание академических навыков, критического мышления и предметных знаний. Как награда британского университета, он также признаётся вступительной квалификацией в университетах по всему миру.",
    },
    learned: [
      {
        en: "Developed strong academic communication skills — argumentation, citation, paraphrasing, and writing in the academic register — which shaped how I document and explain technical work.",
        uz: "Kuchli akademik muloqot ko'nikmalarini — dalillash, iqtibos keltirish, qayta ifodalash va akademik uslubda yozishni — rivojlantirdim, bu texnik ishlarni qanday hujjatlashtirishim va tushuntirishimga ta'sir qildi.",
        ru: "Развил навыки академической коммуникации — аргументацию, цитирование, перефразирование и академическое письмо — что повлияло на то, как я документирую и объясняю техническую работу.",
      },
      {
        en: "Honed critical thinking and analytical reasoning, learning to evaluate sources, question assumptions, and structure complex arguments — skills that translate directly into engineering decisions.",
        uz: "Tanqidiy fikrlash va tahliliy mulohazani sayqallab, manbalarni baholash, taxminlarni so'roq qilish va murakkab argumentlarni tuzishni o'rgandim — bu ko'nikmalar muhandislik qarorlariga to'g'ridan-to'g'ri tarjima bo'ladi.",
        ru: "Отточил критическое мышление и аналитические рассуждения — научился оценивать источники, ставить под сомнение предположения и выстраивать сложные аргументы. Эти навыки напрямую применяются в инженерных решениях.",
      },
      {
        en: "Built the study habits and self-discipline — independent research, time management, and academic integrity — that sustained me through three subsequent years of degree study.",
        uz: "Mustaqil tadqiqot, vaqtni boshqarish va akademik halollik — menga keyingi uch yillik daraja ta'limida dosh beradigan o'qish odatlari va o'z-o'zini intizomini shakllantirib oldim.",
        ru: "Сформировал привычки к учёбе и самодисциплину — самостоятельные исследования, тайм-менеджмент и академическую честность — которые поддерживали меня на протяжении трёх последующих лет обучения.",
      },
    ],
    modules: [
      "Academic Communication Skills",
      "Critical Thinking and Research Skills",
      "Introduction to Computing",
      "Mathematics for Computing",
      "Business and Economics Fundamentals",
    ],
  },
];

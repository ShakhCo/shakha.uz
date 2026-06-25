import type { Localized } from "./projects";

export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  gradient: string;
  title: Localized;
  excerpt: Localized;
  content: Localized;
};

export const POSTS: BlogPost[] = [
  {
    slug: "designing-multi-tenant-saas",
    gradient: "linear-gradient(135deg, #5b6cff 0%, #a855f7 50%, #ec4899 100%)",
    date: "2025-09-12",
    tags: ["SaaS", "Architecture", "Multi-tenancy", "Next.js"],
    readingMinutes: 6,
    title: {
      en: "Designing a multi-tenant SaaS from scratch",
      uz: "Ko'p ijarali SaaS-ni noldan loyihalash",
      ru: "Проектирование мультитенантного SaaS с нуля",
    },
    excerpt: {
      en: "How I gave each business its own isolated space on a single platform — subdomain routing, data isolation, and instant onboarding — and what I'd tell my past self before starting.",
      uz: "Har bir biznesga bitta platformada o'z ajratilgan maydonini qanday berdim — subdomain yo'naltirish, ma'lumotlarni izolyatsiya qilish va tezkor onboarding — va boshlashdan oldin o'zimga nima derdim.",
      ru: "Как я дал каждому бизнесу собственное изолированное пространство на единой платформе — поддомены, изоляция данных и мгновенный онбординг — и что бы я сказал себе до начала разработки.",
    },
    content: {
      en: `## Why multi-tenancy, and why it's harder than it looks

When I started building BookUp, the vision was simple: one platform where any business — a barbershop, a massage studio, a fitness club — could sign up and immediately start taking bookings. Simple vision, complex reality.

The first question you have to answer is: *how isolated do tenants actually need to be?* There's a spectrum. At one end, you throw every tenant's data into the same tables with a \`tenant_id\` column. At the other end, each tenant gets their own database. I landed somewhere in the middle, and here's why.

## Subdomain routing as the backbone

The URL is the clearest signal of isolation that a tenant's *customers* ever see. When you land on \`barbershop-mustafa.bookup.uz\`, you're psychologically in Mustafa's world — his branding, his schedule, his service menu. That experience starts with the subdomain.

In Next.js I handle this in middleware. On each request, I read \`req.headers.get('host')\`, strip the base domain, and extract the tenant slug. The middleware then rewrites the request to an internal path that carries the slug as a route segment. From there, every data fetch is scoped to that tenant.

\`\`\`ts
// middleware.ts (simplified)
const host = req.headers.get('host') ?? '';
const slug = host.replace('.bookup.uz', '');
if (slug && slug !== 'www') {
  return NextResponse.rewrite(
    new URL(\`/t/\${slug}\${req.nextUrl.pathname}\`, req.url)
  );
}
\`\`\`

The beautiful thing: this costs nothing per new tenant. There's no Nginx config to update, no DNS record to create per tenant (a wildcard DNS entry covers all subdomains). A business signs up, picks their slug, and they're live in seconds.

## Data isolation: the design decision that matters most

I chose a single-database, shared-schema approach with strict row-level scoping. Every table that holds tenant-specific data has a \`tenant_id\` foreign key. Every query in the NestJS service layer is wrapped in a guard that injects the tenant ID from the request context — you literally cannot query tenant A's data from tenant B's context without bypassing the guard, and the guard is the only place the ID comes from.

This is simpler to operate than per-tenant databases (one migration to run, not N), and for a platform at BookUp's scale it's the right call. If I were building for enterprises with contractual data-residency requirements, I'd look at per-schema or per-database isolation instead.

What I *wish* I'd done from day one: put the tenant ID guard on the NestJS module level, not on individual services. I spent a couple of weeks refactoring early code that had accidentally grown tenant-agnostic query helpers.

## Instant onboarding: making the empty state feel like a start, not a void

The moment a tenant finishes registration they land on their subdomain. Empty schedule. No services. No staff. The worst experience is a blank screen with a generic "Get started" message.

What we built instead: a guided setup flow that creates three sample services ("30-minute consultation", "60-minute session", one more) and a placeholder staff member. The tenant can delete these, but they immediately see *what their booking page looks like with data* — which is far more motivating than staring at an empty calendar.

## What I'd tell my past self

**Don't model the tenant as an afterthought.** The tenant ID belongs in your auth token, your request context, and your ORM query builder from day one. Bolting it on later is painful.

**Wildcard subdomains beat path prefixes for tenant UX.** \`/businesses/mustafa/\` works, but \`mustafa.bookup.uz\` feels like the tenant actually *owns* something.

**Write the onboarding as if the tenant is also the tester.** The first five minutes of the tenant experience will define whether they stay or churn. Invest there early.

Multi-tenancy is a great forcing function for building disciplined code: every query must know whose data it's touching. That discipline pays off long after the architecture decisions are forgotten.`,

      uz: `## Nima uchun ko'p ijaralilik va u nima uchun ko'ringanidan murakkabrok

BookUp-ni qura boshlaganimda, tasavvur oddiy edi: bitta platforma, u yerda har qanday biznes — sartaroshxona, massaj studiyasi, fitnes klub — ro'yxatdan o'tib, darhol bron qabul qila boshlaydi. Oddiy tasavvur, murakkab haqiqat.

Birinchi savolga javob berish kerak: *ijarachilar qanchalik izolyatsiya qilinishi kerak?* Bu spektr. Bir uchida barcha ijarachining ma'lumotlari \`tenant_id\` ustuni bilan bir xil jadvallarga joylashtiriladi. Boshqa uchida har bir ijarachi o'z ma'lumotlar bazasiga ega bo'ladi. Men o'rtada joylashtim va sababi shunda.

## Asosiy tizim sifatida subdomain yo'naltirish

URL — ijarachining *mijozlari* ko'radigan izolyatsiyaning eng aniq belgisi. \`barbershop-mustafa.bookup.uz\`-ga kirganingizda, siz psixologik jihatdan Mustafaning dunyosidasiz — uning brendingi, jadvali, xizmatlar ro'yxati. Bu tajriba subdomain bilan boshlanadi.

Next.js-da buni middleware'da hal qilaman. Har bir so'rovda \`req.headers.get('host')\`-ni o'qiyman, asosiy domenni olib tashlayman va ijarachi slug-ini ajratib olaman. Middleware so'ngra so'rovni slug-ni marshrut segmenti sifatida o'z ichiga olgan ichki yo'lga qayta yozadi.

\`\`\`ts
// middleware.ts (soddalashtrilgan)
const host = req.headers.get('host') ?? '';
const slug = host.replace('.bookup.uz', '');
if (slug && slug !== 'www') {
  return NextResponse.rewrite(
    new URL(\`/t/\${slug}\${req.nextUrl.pathname}\`, req.url)
  );
}
\`\`\`

Ajoyib narsa: har yangi ijarachi uchun bu hech narsaga tushmaydi. Nginx konfiguratsiyasini yangilash shart emas, har bir ijarachi uchun DNS yozuvini yaratish ham shart emas (joker DNS yozuvi barcha subdomainlarni qoplaydi). Biznes ro'yxatdan o'tadi, o'z slug-ini tanlaydi va sekundlar ichida ishlaydi.

## Ma'lumotlarni izolyatsiya qilish: eng muhim dizayn qarori

Men bir ma'lumotlar bazasi, umumiy sxema yondashuvi va qat'iy qator darajasidagi chegaralashni tanladim. Ijarachiga xos ma'lumotlarni saqlagan har bir jadvalda \`tenant_id\` tashqi kaliti mavjud. NestJS xizmat qatlamidagi har bir so'rov so'rov kontekstidan ijarachi ID-sini kiritadigan himoyachi bilan o'ralgan.

Bu har bir ijarachi uchun alohida ma'lumotlar bazalariga qaraganda operatsiya qilish osonroq (bitta migratsiya, N emas). Katta miqyos uchun yoki shartnomaviy ma'lumotlarni joylashtirishni talab qiladigan korporativ mijozlar uchun sxema yoki ma'lumotlar bazasi bo'yicha izolyatsiyani ko'rib chiqardim.

**O'zimga nima derdim:** ijarachi ID himoyachisini alohida xizmatlar darajasida emas, NestJS modul darajasida joylashtiring.

## Darhol onboarding: bo'sh holatni boshlanish kabi ko'rsatish

Ijarachi ro'yxatdan o'tishni tugatgan zahoti u o'z subdomainiga tushadi. Bo'sh jadval. Xizmatlar yo'q. Xodimlar yo'q. Eng yomon tajriba — umumiy "Boshlang" xabari bilan bo'sh ekran.

Buning o'rniga biz yaratgan narsa: uchta namuna xizmatini yaratuvchi yo'naltiruvchi sozlash jarayoni. Ijarachi bularni o'chirishi mumkin, ammo u darhol *ma'lumotlar bilan bron sahifasi qanday ko'rinishini* ko'radi.

## Ko'p ijaralilik uchun saboqlar

**Ijarachini keyinchalik o'ylamang.** Ijarachi ID-si dastlabki kundan boshlab autentifikatsiya tokeningizda, so'rov kontekstingizda va ORM so'rov quruvchingizda bo'lishi kerak.

**Joker subdomainlar yo'l prefikslari o'rniga ijarachi UX uchun afzalroq.** \`/businesses/mustafa/\` ishlaydi, ammo \`mustafa.bookup.uz\` ijarachi haqiqatan ham *o'z narsasiga ega* bo'lganday his ettiradi.

Ko'p ijaralilik — intizomli kod yozish uchun ajoyib vosita: har bir so'rov kimin ma'lumotlarini ko'rayotganini bilishi kerak.`,

      ru: `## Почему мультитенантность и почему это сложнее, чем кажется

Когда я начинал создавать BookUp, идея была простой: одна платформа, где любой бизнес — парикмахерская, студия массажа, фитнес-клуб — мог зарегистрироваться и сразу начать принимать бронирования. Простая идея, сложная реальность.

Первый вопрос: *насколько изолированными действительно должны быть тенанты?* Существует спектр. На одном конце — все данные тенантов в общих таблицах с колонкой \`tenant_id\`. На другом — каждый тенант получает собственную базу данных. Я выбрал нечто среднее, и вот почему.

## Поддомены как основа маршрутизации

URL — это самый чёткий сигнал изоляции, который видят *клиенты* тенанта. Попадая на \`barbershop-mustafa.bookup.uz\`, вы психологически находитесь в мире Мустафы — его брендинг, его расписание, его меню услуг. Этот опыт начинается с поддомена.

В Next.js это решается в middleware. При каждом запросе я читаю \`req.headers.get('host')\`, отрезаю базовый домен и извлекаю слаг тенанта. Middleware переписывает запрос на внутренний путь, который несёт слаг как сегмент маршрута.

\`\`\`ts
// middleware.ts (упрощённо)
const host = req.headers.get('host') ?? '';
const slug = host.replace('.bookup.uz', '');
if (slug && slug !== 'www') {
  return NextResponse.rewrite(
    new URL(\`/t/\${slug}\${req.nextUrl.pathname}\`, req.url)
  );
}
\`\`\`

Прелесть в том, что это не стоит ничего для каждого нового тенанта. Не нужно обновлять конфигурацию Nginx, не нужно создавать DNS-запись для каждого тенанта (wildcard DNS-запись покрывает все поддомены). Бизнес регистрируется, выбирает слаг и через секунды работает.

## Изоляция данных: самое важное архитектурное решение

Я выбрал подход единой базы данных с общей схемой и строгой изоляцией на уровне строк. В каждой таблице с данными тенанта есть внешний ключ \`tenant_id\`. Каждый запрос в сервисном слое NestJS обёрнут в гарды, которые инжектируют ID тенанта из контекста запроса.

Это проще в эксплуатации, чем базы данных для каждого тенанта (одна миграция, а не N). Для предприятий с требованиями к размещению данных по контракту я бы рассматривал изоляцию по схеме или базе данных.

**Что бы я посоветовал себе:** размещайте гард tenant ID на уровне NestJS-модуля, а не отдельных сервисов.

## Мгновенный онбординг: пустое состояние как старт, а не пустота

Как только тенант завершает регистрацию, он попадает на свой поддомен. Пустое расписание. Нет услуг. Нет персонала. Худший опыт — пустой экран с общим сообщением "Начать".

Что мы построили вместо этого: пошаговый процесс настройки, который создаёт три примерные услуги. Тенант может их удалить, но сразу видит *как выглядит его страница бронирования с данными*.

## Уроки мультитенантности

**Не добавляйте тенанта постфактум.** ID тенанта должен быть в токене аутентификации, контексте запроса и конструкторе ORM-запросов с первого дня.

**Wildcard-поддомены лучше путевых префиксов для UX тенанта.** \`/businesses/mustafa/\` работает, но \`mustafa.bookup.uz\` ощущается так, будто тенант действительно *владеет* чем-то.

Мультитенантность — отличный инструмент для написания дисциплинированного кода: каждый запрос должен знать, чьи данные он обрабатывает.`,
    },
  },
  {
    slug: "prepaid-wallet-billing-with-payme",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    date: "2025-08-20",
    tags: ["Payments", "Billing", "Payme", "NestJS"],
    readingMinutes: 5,
    title: {
      en: "Building prepaid-wallet billing with Payme",
      uz: "Payme bilan oldindan to'lov hamyon tizimini qurish",
      ru: "Создание биллинга с предоплатным кошельком через Payme",
    },
    excerpt: {
      en: "Why I modeled money as a ledger of typed transactions, how auto-deduction of subscription fees works, and the billing edge cases I wish I'd known about before writing the first line.",
      uz: "Nima uchun pulni yozilgan tranzaksiyalar registri sifatida modelladim, obuna to'lovlarini avtomatik ayirib olish qanday ishlaydi va birinchi qatorni yozishdan oldin bilishni istagan billing muammolari.",
      ru: "Почему я смоделировал деньги как журнал типизированных транзакций, как работает автоматическое списание абонентской платы и о каких граничных случаях биллинга я хотел бы знать заранее.",
    },
    content: {
      en: `## The problem with ad-hoc billing

The first version of BookUp's billing was embarrassingly simple: a \`subscription_active\` boolean on the tenant record, and a cron job that flipped it to \`false\` at the end of the month if the invoice wasn't paid. It worked for exactly two weeks before I started getting support messages like "I topped up but my account is still locked" and "why was I charged twice?"

The root problem: I was treating money as a state, not as a history.

## Modeling money as a ledger

The fix was to stop storing *balances* directly and start storing *movements*. Every time money touches the system, it becomes a row in a \`wallet_transactions\` table with a type, an amount, a reference, and a timestamp.

The types I use:

- \`top_up\` — a Payme payment credited to the tenant's wallet
- \`subscription_fee\` — monthly auto-deduction for the platform fee
- \`refund\` — manual credit issued by support
- \`adjustment\` — rare manual correction

The current balance is always derived: \`SUM(amount) WHERE tenant_id = ?\`. That one query gives you the truth. There's no separate "balance" column to drift out of sync.

\`\`\`sql
-- Current balance
SELECT SUM(amount) AS balance
FROM wallet_transactions
WHERE tenant_id = $1;
\`\`\`

The sign convention matters: top-ups are positive, fees and deductions are negative. Keep it consistent and arithmetic becomes your friend.

## Integrating Payme

Payme is Uzbekistan's dominant payment processor, and it uses a callback-based flow: your backend exposes a JSON-RPC endpoint, Payme calls it when a payment changes state (created → paid → cancelled), and you react accordingly.

The critical implementation detail is idempotency. Payme *will* retry callbacks. If your handler isn't idempotent, you'll double-credit accounts. My approach:

1. When a \`PerformTransaction\` callback arrives, check if a \`top_up\` row with \`payme_transaction_id = X\` already exists.
2. If yes, return success without writing anything — Payme is happy, the ledger is unchanged.
3. If no, insert the row and return success.

That's it. The check-then-insert is wrapped in a database transaction, so there's no race condition between two simultaneous callbacks.

## Auto-deduction of subscription fees

On the first of each month, a NestJS scheduled task runs a query that finds all active tenants and calls \`chargeSubscriptionFee(tenantId)\`. That function:

1. Checks the current balance (the ledger SUM).
2. If balance ≥ fee, inserts a negative \`subscription_fee\` transaction.
3. If balance < fee, marks the tenant as \`payment_overdue\` and queues a notification.

No money leaves the system here — the wallet is a prepaid ledger, not connected to a payment card for pull payments. The tenant already loaded credit in advance; we just deduct from it.

## Edge cases I learned the hard way

**Concurrent top-ups and fee deductions.** If a top-up and a fee deduction hit the ledger at the same millisecond, and both read a balance of 0 before writing, the fee will go through even if the top-up should have prevented it. Solution: use a SELECT FOR UPDATE on the wallet row (or use optimistic locking with a version counter) when performing the balance check and insert together.

**Timezone-aware billing dates.** "First of the month" means first of the month in Tashkent, not UTC. Get this wrong and you'll run billing at 8 PM on December 31st for some users. Store the tenant's timezone; run the billing job in that timezone.

**Partial state on failed jobs.** If the cron job charges 400 out of 500 tenants and then crashes, restarting it naively charges the remaining 100 — but some of those 400 might get charged again if the job iterates sequentially without checkpointing. Solution: process in idempotent batches, track which tenants have been charged for the current billing period in a separate table.

## The lesson

Model money as events, not state. Once you internalize that, the rest is just careful implementation. And write idempotency checks before you write the happy path — you'll be glad you did when Payme retries at 3 AM.`,

      uz: `## Ad-hoc billing bilan muammo

BookUp-ning billing-ning birinchi versiyasi uyatli darajada oddiy edi: ijarachi yozuvida \`subscription_active\` mantiqiy qiymati va oyning oxirida hisob-faktura to'lanmagan bo'lsa uni \`false\`-ga o'zgartiradigan cron ishchi. U aynan ikki hafta ishladi, keyin "To'ldirdim lekin hisobim hali ham bloklangan" kabi qo'llab-quvvatlash xabarlarini ola boshladim.

Asosiy muammo: men pulni tarix sifatida emas, holat sifatida ko'rib chiqardim.

## Pulni registr sifatida modellashtirish

Yechim — *qoldiqlarni* bevosita saqlashni to'xtatib, *harakatlarni* saqlashni boshlash edi. Pul tizimga har safar tegsa, tur, miqdor, havola va vaqt belgisi bilan \`wallet_transactions\` jadvalidagi qatorga aylanadi.

Men ishlatiladigan turlar:

- \`top_up\` — Payme to'lovi ijarachi hamyoniga kreditlangan
- \`subscription_fee\` — platforma to'lovi uchun oylik avtomatik ayirish
- \`refund\` — qo'llab-quvvatlash tomonidan berilgan qo'lda kredit
- \`adjustment\` — kamdan-kam qo'lda tuzatish

Joriy qoldiq har doim olinadi: \`SUM(amount) WHERE tenant_id = ?\`. Bu bitta so'rov sizga haqiqatni beradi.

\`\`\`sql
-- Joriy qoldiq
SELECT SUM(amount) AS balance
FROM wallet_transactions
WHERE tenant_id = $1;
\`\`\`

Belgini bir xil saqlang: to'ldirish ijobiy, to'lovlar va chegirmalar manfiy.

## Payme integratsiyasi

Payme Callback-asosidagi oqimdan foydalanadi: backend JSON-RPC endpoint-ni ochadi, Payme to'lov holati o'zgarganda uni chaqiradi va siz mos ravishda javob berasiz.

Muhim amalga oshirish tafsiloti — idempotentlik. Payme callbacklarni qayta urinadi. Agar ishlovchingiz idempotent bo'lmasa, hisoblarni ikki marta kreditlaysiz. Mening yondashuvim:

1. \`PerformTransaction\` callback kelsa, \`payme_transaction_id = X\` bilan \`top_up\` qatori mavjudligini tekshiring.
2. Ha bo'lsa, hech narsa yozmasdan muvaffaqiyat qaytaring.
3. Yo'q bo'lsa, qatorni kiriting va muvaffaqiyat qaytaring.

## Obuna to'lovlarini avtomatik ayirish

Har oyning birinchisida NestJS rejalashtirilgan vazifa barcha faol ijarachilarni topib, \`chargeSubscriptionFee(tenantId)\`-ni chaqiradigan so'rovni ishga tushiradi. Bu funksiya:

1. Joriy qoldiqni tekshiradi (registr SUM).
2. Qoldiq ≥ to'lov bo'lsa, manfiy \`subscription_fee\` tranzaksiyasini kiritadi.
3. Qoldiq < to'lov bo'lsa, ijarachini \`payment_overdue\` deb belgilaydi.

## Qiyin yo'l bilan o'rgangan chekka holatlar

**Bir vaqtda to'ldirish va to'lov ayirish.** Ikkalasi bir vaqtda 0 qoldiqni o'qisa, to'lov to'ldirish oldini olishi kerak bo'lsa ham o'tib ketadi. Yechim: balansni tekshirish va kiritishni birga bajarishda SELECT FOR UPDATE ishlating.

**Vaqt mintaqasiga sezgir billing sanalari.** "Oyning birinchisi" Toshkentda oyning birinchisini anglatadi, UTC emas.

**Ishlamagan ishchilardagi qisman holat.** Cron ishi qulasa va qayta ishga tushirilsa, ba'zi ijarachilardan ikki marta to'lov olinishi mumkin. Yechim: idempotent paketlarda qayta ishlang.

## Dars

Pulni holat sifatida emas, voqealar sifatida modellashtiring. Idempotentlik tekshiruvlarini baxtli yo'ldan oldin yozing.`,

      ru: `## Проблема с ad-hoc биллингом

Первая версия биллинга BookUp была до неловкости простой: булево поле \`subscription_active\` в записи тенанта и крон-задание, которое переключало его в \`false\` в конце месяца, если счёт не был оплачен. Это работало ровно две недели, пока я не начал получать сообщения поддержки вроде "я пополнил, но аккаунт всё ещё заблокирован".

Корневая проблема: я относился к деньгам как к состоянию, а не как к истории.

## Моделирование денег как журнала

Решение — прекратить хранить *балансы* напрямую и начать хранить *движения*. Каждый раз, когда деньги касаются системы, это становится строкой в таблице \`wallet_transactions\` с типом, суммой, ссылкой и временной меткой.

Типы, которые я использую:

- \`top_up\` — платёж Payme, зачисленный на кошелёк тенанта
- \`subscription_fee\` — ежемесячное автоматическое списание платформенной комиссии
- \`refund\` — ручной кредит от поддержки
- \`adjustment\` — редкая ручная корректировка

Текущий баланс всегда вычисляется: \`SUM(amount) WHERE tenant_id = ?\`. Этот один запрос даёт вам правду.

\`\`\`sql
-- Текущий баланс
SELECT SUM(amount) AS balance
FROM wallet_transactions
WHERE tenant_id = $1;
\`\`\`

Знаковое соглашение важно: пополнения положительные, комиссии и списания отрицательные.

## Интеграция с Payme

Payme использует callback-based поток: ваш backend открывает JSON-RPC эндпоинт, Payme вызывает его при изменении состояния платежа. Критическая деталь реализации — идемпотентность. Payme *будет* повторять колбэки.

Мой подход:

1. При поступлении callback \`PerformTransaction\` проверяем, существует ли строка \`top_up\` с \`payme_transaction_id = X\`.
2. Если да, возвращаем успех без записи.
3. Если нет, вставляем строку и возвращаем успех.

Проверка и вставка обёрнуты в транзакцию базы данных, поэтому гонки условий нет.

## Автоматическое списание абонентской платы

Первого числа каждого месяца запускается запланированная задача NestJS, которая находит всех активных тенантов и вызывает \`chargeSubscriptionFee(tenantId)\`. Эта функция:

1. Проверяет текущий баланс (SUM из журнала).
2. Если баланс ≥ комиссии, вставляет отрицательную транзакцию \`subscription_fee\`.
3. Если баланс < комиссии, помечает тенанта как \`payment_overdue\`.

## Граничные случаи, усвоенные на своих ошибках

**Конкурентное пополнение и списание.** Если оба операции читают баланс 0 до записи, списание пройдёт, даже если пополнение должно было его предотвратить. Решение: используйте SELECT FOR UPDATE при совместной проверке баланса и вставке.

**Биллинговые даты с учётом часового пояса.** "Первое число месяца" означает первое число в Ташкенте, а не по UTC. Храните часовой пояс тенанта.

**Частичное состояние при сбое заданий.** Если крон-задание обработает 400 из 500 тенантов и упадёт, перезапуск может повторно списать часть. Решение: обрабатывайте в идемпотентных пакетах.

## Урок

Моделируйте деньги как события, а не как состояние. Пишите проверки идемпотентности до "счастливого пути" — будете рады в 3 часа ночи, когда Payme повторит запрос.`,
    },
  },
  {
    slug: "zero-dependency-websocket-server",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #6366f1 100%)",
    date: "2025-07-30",
    tags: ["Node.js", "WebSocket", "Networking", "From scratch"],
    readingMinutes: 7,
    title: {
      en: "Writing a zero-dependency WebSocket server",
      uz: "Noldan WebSocket serverni yozish",
      ru: "Написание WebSocket-сервера без зависимостей",
    },
    excerpt: {
      en: "Building WebSocket on raw TCP sockets — the RFC 6455 handshake, frame parsing and unmasking, and why doing it by hand made me understand the protocol in a way that reading the spec never could.",
      uz: "WebSocket-ni xom TCP soketlarida qurish — RFC 6455 handshake, kadr tahlili va demasking, va buni qo'lda bajarish menga protokolni faqat spetsifikatsiyani o'qishdan ko'ra yaxshiroq tushunishga qanday yordam berdi.",
      ru: "WebSocket на сырых TCP-сокетах — рукопожатие RFC 6455, разбор и демаскирование фреймов, и почему ручная реализация дала мне понимание протокола, которого чтение спецификации никогда бы не дало.",
    },
    content: {
      en: `## Why build something that already exists?

The honest answer: because I kept using WebSockets without really understanding them. I knew the API — \`new WebSocket(url)\`, \`socket.onmessage\`, \`socket.send()\` — but I had no mental model of what happened between the client and the server. What is a "frame"? Why is masking required? What does the upgrade handshake look like on the wire?

So I built noServer: a zero-dependency Node.js web framework on raw TCP, including a full WebSocket implementation. Here's what I learned.

\`\`\`bash
node server.js
# WebSocket server listening on :3000
\`\`\`

## The foundation: raw TCP in Node.js

Node.js gives you \`net.createServer()\`, which hands you a \`Socket\` object for each connection. That socket is a readable/writable stream of bytes. No HTTP, no WebSocket — just bytes. This is your starting point.

\`\`\`ts
import net from 'net';
const server = net.createServer((socket) => {
  socket.on('data', (chunk: Buffer) => {
    // chunk is raw bytes — could be HTTP, WebSocket, anything
  });
});
server.listen(3000);
\`\`\`

First challenge: distinguishing an HTTP upgrade request (which opens a WebSocket) from a regular HTTP request. The client sends a standard HTTP GET with specific upgrade headers. You parse the raw bytes as HTTP text to find out.

## The RFC 6455 handshake

The WebSocket protocol upgrade works like this:

1. The client sends an HTTP GET with headers including \`Upgrade: websocket\` and a \`Sec-WebSocket-Key\` header containing a base64-encoded random 16-byte value.
2. Your server must respond with \`101 Switching Protocols\`, and the critical header is \`Sec-WebSocket-Accept\`.
3. The accept value is computed as: \`base64(sha1(clientKey + MAGIC_GUID))\`.

The magic GUID is hardcoded in the RFC: \`258EAFA5-E914-47DA-95CA-C5AB0DC85B11\`. It exists purely to prevent non-WebSocket servers from accidentally accepting upgrade requests.

\`\`\`ts
import crypto from 'crypto';
const MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
function acceptKey(clientKey: string): string {
  return crypto
    .createHash('sha1')
    .update(clientKey + MAGIC)
    .digest('base64');
}
\`\`\`

Once the server sends the 101 response, the connection is "upgraded" — no more HTTP, from now on it's the WebSocket framing protocol.

## Frame parsing: the heart of it

A WebSocket message is carried in one or more *frames*. Each frame has a binary header, then the payload. The header layout (from the RFC):

- **Byte 0**: bit 7 is FIN (is this the last frame?), bits 4-6 are reserved, bits 0-3 are the opcode (0x1 = text, 0x2 = binary, 0x8 = close, 0x9 = ping, 0xA = pong).
- **Byte 1**: bit 7 is MASK (client frames are always masked; server frames must NOT be), bits 0-6 are payload length (or 126/127 for extended lengths).
- Then 0, 2, or 8 bytes of extended payload length.
- Then 4 bytes of masking key (if MASK bit is set).
- Then the payload.

Reading this manually forces you to understand *why* the protocol is designed this way. The masking requirement exists because some poorly written HTTP proxies interpret WebSocket frames as HTTP traffic and can cause cache poisoning. Masking breaks that possibility.

\`\`\`ts
function unmask(payload: Buffer, mask: Buffer): Buffer {
  const result = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    result[i] = payload[i] ^ mask[i % 4];
  }
  return result;
}
\`\`\`

That XOR loop is the entirety of WebSocket "encryption" (it's not encryption — it's just masking to prevent proxy confusion). Simple, but you have to implement it yourself before you truly believe it.

## Fragmentation and the FIN bit

A single message can be split across multiple frames. The FIN bit on byte 0 tells you whether this is the last fragment. If FIN is 0, buffer the payload and wait for more frames with opcode 0 (continuation). When you see FIN=1, concatenate all buffered payloads and emit the complete message.

I got this wrong twice. The first time, I ignored fragmentation entirely (worked until I sent a message >125 bytes from the browser). The second time, I forgot that continuation frames have opcode 0, not the original text/binary opcode. Reading the RFC after writing the wrong code is far more effective than reading it first.

## What I know now that I didn't before

**The protocol is simpler than the tooling suggests.** ws and socket.io are excellent libraries, but they add so much that it's hard to see the protocol underneath. At its core, WebSocket is: one HTTP handshake, then length-prefixed binary frames.

**Masking is a client obligation, not a server one.** Clients MUST mask their frames. Servers MUST NOT mask their frames. If you accidentally mask a server frame, the client will silently corrupt data.

**Ping/pong is how you detect dead connections.** The browser won't always tell you when a connection drops. Sending a ping every 30 seconds and expecting a pong within 10 is how you reliably detect disconnections in a production WebSocket server.

Building noServer was the most educational project I've done in years. I'd recommend it to any developer who uses WebSockets in production — not to replace ws, but to understand what ws is doing for you.`,

      uz: `## Nima uchun allaqachon mavjud narsani qurish kerak?

Halol javob: chunki men WebSocket-lardan foydalanib kelar edim, lekin ularni haqiqatan ham tushunmayotgan edim. API-ni bilardim — \`new WebSocket(url)\`, \`socket.onmessage\`, \`socket.send()\` — lekin mijoz va server o'rtasida nima sodir bo'layotganini tushunmasdim. "Kadr" nima? Nima uchun masking talab qilinadi?

Shuning uchun men noServer-ni qurdim: xom TCP-da noldan WebSocket ilovasi bilan. Mana nima o'rgandim.

\`\`\`bash
node server.js
# WebSocket serveri :3000-da tinglayapti
\`\`\`

## Asos: Node.js-da xom TCP

Node.js \`net.createServer()\`-ni beradi va har bir ulanish uchun \`Socket\` obyektini taqdim etadi. Bu soket baytlarning o'qilishi/yozilishi oqimidir. HTTP yo'q, WebSocket yo'q — faqat baytlar.

\`\`\`ts
import net from 'net';
const server = net.createServer((socket) => {
  socket.on('data', (chunk: Buffer) => {
    // chunk xom baytlar — HTTP, WebSocket yoki boshqa narsa bo'lishi mumkin
  });
});
server.listen(3000);
\`\`\`

## RFC 6455 handshake

WebSocket protokol yangilash quyidagicha ishlaydi:

1. Mijoz \`Upgrade: websocket\` va \`Sec-WebSocket-Key\` sarlavhalari bilan HTTP GET yuboradi.
2. Serveringiz \`101 Switching Protocols\` bilan javob berishi kerak va muhim sarlavha \`Sec-WebSocket-Accept\`.
3. Qabul qilish qiymati quyidagicha hisoblanadi: \`base64(sha1(clientKey + MAGIC_GUID))\`.

Sehrli GUID RFC-da qattiq kodlangan: \`258EAFA5-E914-47DA-95CA-C5AB0DC85B11\`.

\`\`\`ts
import crypto from 'crypto';
const MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
function acceptKey(clientKey: string): string {
  return crypto
    .createHash('sha1')
    .update(clientKey + MAGIC)
    .digest('base64');
}
\`\`\`

## Kadr tahlili: asosiy qism

WebSocket xabari bir yoki bir nechta *kadrlarda* tashiladi. Har bir kadrning ikkilik sarlavhasi, keyin yuk bo'ladi:

- **0-bayt**: bit 7 FIN (bu oxirgi kadrmi?), bitlar 0-3 — opcode (0x1 = matn, 0x2 = ikkilik, 0x8 = yopish, 0x9 = ping, 0xA = pong).
- **1-bayt**: bit 7 MASK (mijoz kadrlari har doim masklangan; server kadrlari masklangan BO'LMASLIGI kerak), bitlar 0-6 — yuk uzunligi.
- Keyin masklar kaliti va yuk.

Masking talabi yomon yozilgan ba'zi HTTP proxy-lar WebSocket kadrlarini HTTP trafigi sifatida izohlashi va kesh zararlanishiga olib kelishi mumkinligi sababli mavjud.

\`\`\`ts
function unmask(payload: Buffer, mask: Buffer): Buffer {
  const result = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    result[i] = payload[i] ^ mask[i % 4];
  }
  return result;
}
\`\`\`

## Endi bilgan, lekin oldin bilmagan narsalarim

**Protokol tooling ko'rsatganidan oddiyroq.** ws va socket.io ajoyib kutubxonalar, ammo ular ostidagi protokolni ko'rish qiyin. Asosida WebSocket: bitta HTTP handshake, keyin uzunlik oldida ikkilik kadrlar.

**Masking mijoz majburiyati, server emas.** Mijozlar kadrlarini masklashi KERAK. Serverlar masklashi KERAK EMAS.

**Ping/pong o'lik ulanishlarni aniqlash usuli.** Har 30 sekundda ping yuborish va 10 soniya ichida pong kutish ishlab chiqarish WebSocket serveri uchun uzilishlarni ishonchli aniqlash usuli.

noServer-ni qurish yillar davomida qilgan eng ta'limli loyiham bo'ldi. WebSocket-dan foydalanayotgan har bir ishlab chiquvchiga tavsiya qilaman — ws-ni almashtirish uchun emas, balki ws sizning uchun nima qilishini tushunish uchun.`,

      ru: `## Зачем строить то, что уже существует?

Честный ответ: потому что я постоянно использовал WebSocket, не понимая его по-настоящему. Я знал API — \`new WebSocket(url)\`, \`socket.onmessage\`, \`socket.send()\` — но у меня не было ментальной модели того, что происходит между клиентом и сервером. Что такое "фрейм"? Почему требуется маскирование?

Поэтому я построил noServer: веб-фреймворк на Node.js без зависимостей на сырых TCP-сокетах, включая полную реализацию WebSocket. Вот что я узнал.

\`\`\`bash
node server.js
# WebSocket-сервер слушает на порту :3000
\`\`\`

## Основа: сырой TCP в Node.js

Node.js предоставляет \`net.createServer()\`, который отдаёт объект \`Socket\` для каждого соединения. Это поток байтов для чтения/записи. Никакого HTTP, никакого WebSocket — только байты.

\`\`\`ts
import net from 'net';
const server = net.createServer((socket) => {
  socket.on('data', (chunk: Buffer) => {
    // chunk — сырые байты: HTTP, WebSocket или что угодно
  });
});
server.listen(3000);
\`\`\`

## Рукопожатие RFC 6455

Обновление протокола WebSocket работает так:

1. Клиент отправляет HTTP GET с заголовками \`Upgrade: websocket\` и \`Sec-WebSocket-Key\` с base64-закодированным случайным значением из 16 байт.
2. Сервер должен ответить \`101 Switching Protocols\`, критический заголовок — \`Sec-WebSocket-Accept\`.
3. Значение accept вычисляется: \`base64(sha1(clientKey + MAGIC_GUID))\`.

Магический GUID жёстко закодирован в RFC: \`258EAFA5-E914-47DA-95CA-C5AB0DC85B11\`.

\`\`\`ts
import crypto from 'crypto';
const MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
function acceptKey(clientKey: string): string {
  return crypto
    .createHash('sha1')
    .update(clientKey + MAGIC)
    .digest('base64');
}
\`\`\`

## Разбор фреймов: суть протокола

Сообщение WebSocket передаётся в одном или нескольких *фреймах*. Каждый фрейм имеет двоичный заголовок и полезную нагрузку:

- **Байт 0**: бит 7 — FIN (это последний фрейм?), биты 0-3 — opcode (0x1 = текст, 0x2 = бинарный, 0x8 = закрытие, 0x9 = ping, 0xA = pong).
- **Байт 1**: бит 7 — MASK (фреймы клиента всегда маскированы; фреймы сервера НЕ должны быть маскированы), биты 0-6 — длина полезной нагрузки.
- Затем ключ маскирования и полезная нагрузка.

Требование маскирования существует потому, что некоторые плохо написанные HTTP-прокси интерпретируют фреймы WebSocket как HTTP-трафик и могут вызвать отравление кэша.

\`\`\`ts
function unmask(payload: Buffer, mask: Buffer): Buffer {
  const result = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    result[i] = payload[i] ^ mask[i % 4];
  }
  return result;
}
\`\`\`

## Фрагментация и бит FIN

Одно сообщение может быть разбито на несколько фреймов. Бит FIN говорит, является ли это последним фрагментом. Если FIN=0, буферизуйте полезную нагрузку и ждите фреймов с opcode 0 (продолжение). Когда FIN=1, объедините все буферизованные данные.

Я сделал это неправильно дважды. Первый раз — проигнорировал фрагментацию. Второй — забыл, что у фреймов продолжения opcode 0, а не исходный.

## Что я теперь знаю

**Протокол проще, чем предполагает инструментарий.** ws и socket.io — отличные библиотеки, но они добавляют так много, что сложно увидеть протокол под ними. В основе WebSocket: одно HTTP-рукопожатие, затем двоичные фреймы с префиксом длины.

**Маскирование — обязанность клиента, не сервера.** Клиенты ДОЛЖНЫ маскировать свои фреймы. Серверы НЕ ДОЛЖНЫ маскировать свои фреймы.

**Ping/pong — способ обнаружить разорванные соединения.** Отправка пинга каждые 30 секунд и ожидание понга в течение 10 секунд — надёжный способ обнаружить разрывы в продакшн WebSocket-сервере.

Создание noServer было самым поучительным проектом за последние годы. Рекомендую любому разработчику, использующему WebSocket в продакшне — не чтобы заменить ws, а чтобы понять, что ws делает за вас.`,
    },
  },
];

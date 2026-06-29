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
    slug: "ai-agents-demystified",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #6366f1 50%, #a855f7 100%)",
    date: "2026-06-29",
    tags: ["AI", "Agents", "LangGraph", "Python"],
    readingMinutes: 6,
    title: {
      en: "What I learned building my first AI agent",
      uz: "Birinchi AI agentimni qurganimda nimalarni o'rgandim",
      ru: "Чему я научился, создавая своего первого AI-агента",
    },
    excerpt: {
      en: "I built a small research agent — it searches the web on its own and answers with citations. Building it made the buzzwords click: what an agent actually is, what LangGraph and Tavily really do, and the honest answer to 'why not just Next.js and OpenAI?'",
      uz: "Men kichik bir tadqiqot agenti yasadim — u o'zi internetda qidiradi va manbalar ko'rsatib javob beradi. Uni qurish jarayonida ko'p atama nihoyat o'z o'rnini topdi: agent nima ekanligini, LangGraph va Tavily aslida nima qilishini, va \"nima uchun shunchaki Next.js va OpenAI ishlatmaslik\" savoliga halol javobni.",
      ru: "Я собрал небольшого исследовательского агента — он сам ищет в интернете и отвечает со ссылками. В процессе сборки многие buzzword-ы наконец встали на место: что такое агент на самом деле, что реально делают LangGraph и Tavily, и честный ответ на вопрос «почему не просто Next.js и OpenAI?»",
    },
    content: {
      en: `## I built a tiny AI agent this week

Not a chatbot — an *agent*. You ask it a question, it searches the web on its own, reads what it finds, decides whether it needs to search again, and then writes you a cited answer. Maybe 300 lines of Python. Building it finally made a few buzzwords click for me, so here's the honest version — what an "agent" actually is, what the moving parts do, and the question I kept asking myself: *why not just build this with the tools I already know?*

## An agent is just a loop

Strip away the hype and an agent is a loop around a language model:

1. Send the model the question, and tell it which tools it's allowed to use.
2. The model replies with one of two things: "call this tool with these arguments" or "here's the final answer."
3. If it asked for a tool, you run the tool, hand the result back, and go to step 1.
4. If it gave an answer, you're done.

That's it. The "intelligence" is the model deciding, each time around, whether it has enough to answer or needs to reach for a tool. When I watched mine run, it searched **twice** on a hard question and **once** on an easy one — nobody told it how many times to search. That decision *is* the agent.

## Why it needs a search tool at all

Here's a thing people miss: the OpenAI API can't browse the web. The model has a training cutoff and no internet. Ask it about something that happened last month and it'll either shrug or guess.

So the agent needs a tool that fetches live information. I used **Tavily** — a search engine built for LLMs. You send it a query, it returns clean, ranked results (title, snippet, link) as plain text the model can actually read. Regular Google would hand you an HTML page full of ads and markup; Tavily hands you the answer-shaped text. That's the only reason my agent could tell me who won the 2024 Nobel Prize — it searched, got fresh text, and summarized it. Swap Tavily for Bing or DuckDuckGo and nothing else changes; it's just "the thing that fetches reality."

## So what does LangGraph actually do?

This is where I had to be honest with myself. **LangGraph** manages that loop — but as a *graph*. You define nodes (an "agent" node that calls the model, a "tools" node that runs the search) and edges between them, including a conditional edge that says "after the agent speaks, if it asked for a tool, go to the tools node and come back; otherwise, stop." Run it, and you get the search-decide-search-answer cycle, plus each step streamed out so the UI can show progress live.

But here's the thing I couldn't ignore: that loop, in plain code, is about fifteen lines.

\`\`\`js
let messages = [systemPrompt, userQuestion]
while (true) {
  const reply = await openai.chat(messages, { tools: [search] })
  messages.push(reply)
  if (reply.toolCalls) {
    for (const call of reply.toolCalls)
      messages.push(await runSearch(call))   // search, feed results back
  } else {
    return reply.content                      // model is done
  }
}
\`\`\`

For one tool and a simple loop, that plain \`while\` is honestly fine — lighter than pulling in a framework.

## "Why not just Next.js and OpenAI?"

I kept asking this, and it's the right question — with one trap in it. Next.js and LangGraph aren't competitors. They live on different layers:

- **Next.js** is the app — the UI and the server. It replaces the FastAPI + HTML I used, not LangGraph.
- **OpenAI** is the brain.
- **Tavily** is the live-web tool — you'd still need it.
- **LangGraph** is the loop — the part you'd otherwise hand-write.

So "Next.js + OpenAI" really means *Next.js for the app, OpenAI for the brain, and you write the loop yourself.* For my little demo, that would've worked and been simpler. I'm not going to pretend otherwise.

## Where the framework earns its place

LangGraph starts paying off on the *second* and *third* feature, not the first — when the loop stops being simple:

- **Multiple tools with branching** — "if it's a math question route here, if it's a search route there." That's a clean edge in a graph and a pile of nested \`if\`s in a hand-rolled loop.
- **Memory that survives restarts** — checkpoint the state to a database, pause mid-run for a human to approve something, resume later. This is the big one; hand-rolling persistence gets ugly fast.
- **Streaming each step** — I got the \`searching → reading → answer\` progress events almost for free.
- **Multiple agents** — a researcher handing off to a writer, each its own graph.

The honest summary: for a single tool and a straight loop, reach for the \`while\` loop. The day a client asks for "an agent that uses these five tools, remembers the conversation, and pauses for approval before it does anything expensive" — that's when the hand-rolled version turns to spaghetti and the graph stays readable.

## Why I learned it on something this small

I could've waited until a project forced me into agents. I didn't, on purpose. Learning a pattern on an easy problem means it's already familiar when the hard one shows up — and on Upwork, "build me an AI agent that does X, Y, and Z" is a request I see more every month. Now when it lands, I won't be learning the tool and the problem at the same time.

That's the whole point of a weekend demo: pay the learning cost when the stakes are zero.`,

      uz: `## Bu hafta men kichkina bir AI agenti qurdim

Chatbot emas — *agent*. Unga savol berasan, u o'zi internetda qidiradi, topganlarini o'qiydi, yana qidirish kerakmi yoki yo'qligini hal qiladi, keyin esa manbalar ko'rsatib javob yozadi. Taxminan 300 qator Python. Uni qurish jarayonida bir nechta atama nihoyat o'z o'rnini topdi — shuning uchun mana shu "agent" aslida nima ekanligini, tarkibiy qismlar nima qilishini va o'zimga doim bergan savolimga — *nima uchun men allaqachon biladigan vositalar bilan qurmadim?* — halol javobni yozmoqchiman.

## Agent — shunchaki tsikl

Barcha shovqin-suronni chetlab qo'ysak, agent — bu til modeli atrofidagi tsikl:

1. Modelga savol yubor va qaysi toollardan foydalana olishini ayt.
2. Model ikki narsadan birini qaytaradi: "shu tool-ni shu argumentlar bilan chaqir" yoki "mana yakuniy javob."
3. Agar tool so'ragan bo'lsa — tool-ni ishga tushir, natijani qaytarib ber va 1-bosqichga o't.
4. Agar javob bergan bo'lsa — tamom.

Hammasi shu. "Intellekt" — modelning har tsiklda yetarli ma'lumot bor-yo'qligini yoki tool kerak-kerakmasligini hal qilishidir. Mening agentim qiyin savolda **ikki marta**, oson savolda **bir marta** qidirdi — hech kim necha marta qidirish kerakligini aytmagan edi. Ana o'sha qaror *agentning o'zi*.

## Nima uchun unga qidiruv tool-i kerak

Ko'pchilik e'tibor bermagan bir narsa: OpenAI API internet bilan ishlay olmaydi. Modelning ma'lumotlari ma'lum sanagacha, internetga ulanishi yo'q. O'tgan oy bo'lgan narsa haqida so'rasang — u ya yelka qisadi yoki taxmin qiladi.

Shuning uchun agentga jonli ma'lumot olib keladigan tool kerak. Men **Tavily**-dan foydalandim — LLM-lar uchun yaratilgan qidiruv tizimi. Unga so'rov yuborasan, u model o'qiy oladigan toza, tartibli natijalar qaytaradi (sarlavha, parcha, havola) — oddiy matn ko'rinishida. Oddiy Google sanga reklamalar va markup to'la HTML sahifa beradi; Tavily esa javobga tayyor matnni beradi. Shuning uchun mening agentim 2024 Nobel mukofoti g'olibini aytib bera oldi — u qidirdi, yangi matn oldi va uni xulosalab berdi. Tavily-ni Bing yoki DuckDuckGo-ga almashtirsang boshqa hech narsa o'zgarmaydi; u shunchaki "voqelikni olib keladigan narsa."

## Xo'sh, LangGraph aslida nima qiladi?

Bu yerda o'zim bilan halol bo'lishim kerak edi. **LangGraph** ana shu tsiklni boshqaradi — lekin *graf* sifatida. Nodelar belgilaysan (modelni chaqiradigan "agent" node, qidiruvni ishga tushiradigan "tools" node) va ular orasidagi edgelarni, jumladan shartli edge-ni: "agent gaplagandan so'ng, agar tool so'ragan bo'lsa — tools node-ga o't va qaytib kel; aks holda to'xta." Ishga tushirasan — qidirish-qaror-qidirish-javob tsikli paydo bo'ladi, plus har bir qadam stream qilinadi, UI esa jonli holda jarayonni ko'rsata oladi.

Lekin men e'tiborsiz qoldira olmaydigan narsa bor edi: bu tsikl oddiy kodda taxminan o'n besh qator.

\`\`\`js
let messages = [systemPrompt, userQuestion]
while (true) {
  const reply = await openai.chat(messages, { tools: [search] })
  messages.push(reply)
  if (reply.toolCalls) {
    for (const call of reply.toolCalls)
      messages.push(await runSearch(call))   // qidirish, natijalarni qaytarish
  } else {
    return reply.content                      // model tugatdi
  }
}
\`\`\`

Bitta tool va oddiy tsikl uchun oddiy \`while\` to'liq yetarli — framework ulashdan ancha yengil.

## "Nima uchun shunchaki Next.js va OpenAI ishlatmaslik?"

Men buni o'zimga doim so'rab yurdim va bu to'g'ri savol — ichida bitta tuzoq bilan. Next.js va LangGraph raqobatchi emas. Ular turli qatlamlarda joylashgan:

- **Next.js** — ilova: UI va server. U men ishlatgan FastAPI + HTML-ni almashtiradi, LangGraph-ni emas.
- **OpenAI** — miya.
- **Tavily** — jonli web tool, baribir kerak bo'ladi.
- **LangGraph** — tsikl, aks holda o'zing yozgan bo'larding.

Demak "Next.js + OpenAI" aslida shuni anglatadi: *ilova uchun Next.js, miya uchun OpenAI, tsiklni esa o'zing yozasan.* Mening kichkina demom uchun bu ishlagan bo'lar edi va ancha sodda bo'lar edi. Buning aksini da'vo qilmayman.

## Framework o'z o'rnini qayerda oqlaydi

LangGraph birinchi feature-da emas, *ikkinchi* va *uchinchi*-da o'zini oqlaydi — tsikl sodda bo'lmaganda:

- **Ko'p tool-lar va tarmoqlanish** — "matematika savoli bo'lsa bu yerga, qidiruv bo'lsa u yerga." Bu grafda toza edge, qo'lda yozilgan tsiklda esa bir-biriga kirgan \`if\`-lar to'dasi.
- **Qayta ishga tushgandan keyin ham saqlanadigan xotira** — holatni ma'lumotlar bazasiga checkpoint qil, inson biror narsani tasdiqlashi uchun to'xtat, keyin davom ettir. Bu eng muhim qismi; qo'lda persistence yozish tezda xunukka aylanadi.
- **Har bir qadamning stream qilinishi** — \`qidiryapti → o'qiyapti → javob\` jarayon hodisalarini deyarli tekin oldim.
- **Ko'p agentlar** — yozuvchiga topshiradigan tadqiqotchi, har biri o'z grafi bilan.

Halol xulosa: bitta tool va to'g'ri tsikl uchun — \`while\` tsikliga yur. Mijoz "beshta tool ishlatadigan, suhbatni eslaydigan va qimmat biror narsa qilishdan oldin tasdiqlash kutadigan agent yasab ber" degan kun keladi — o'shanda qo'lda yozilgan variant spaghetti-ga aylanadi, graf esa o'qilishi mumkin bo'lib qoladi.

## Nima uchun buni shu darajada kichkina narsada o'rgandim

Men loyiha majburlagunicha kutishim mumkin edi. Ataylab kutmadim. Bir pattern-ni oson muammoda o'rganish uni qiyin muammo paydo bo'lganda allaqachon tanish qiladi — va Upwork-da "menga X, Y va Z qiladigan AI agent qur" so'rovi har oy ko'payib bormoqda. Endi u kelib tushganda — tool-ni ham, muammoni ham bir vaqtda o'rganmaymen.

Dam olish kuni demosi-ning butun mohiyati shu: bahsiz paytda o'rganish narxini to'la.`,

      ru: `## На этой неделе я собрал маленького AI-агента

Не чатбот — *агент*. Задаёшь ему вопрос, он сам ищет в интернете, читает найденное, решает, нужно ли искать ещё, и пишет ответ со ссылками. Строк триста на Python. В процессе сборки несколько buzzword-ов наконец встали на место — поэтому вот честная версия: что такое «агент» на самом деле, что делают отдельные части, и вопрос, который я постоянно задавал себе: *почему не собрать это на инструментах, которые я уже знаю?*

## Агент — это просто цикл

Уберём весь хайп — агент это цикл вокруг языковой модели:

1. Отправляем модели вопрос и говорим, какими тулами она может пользоваться.
2. Модель отвечает одним из двух: «вызови этот тул с этими аргументами» или «вот финальный ответ».
3. Если попросила тул — запускаем его, отдаём результат обратно и идём к шагу 1.
4. Если дала ответ — всё.

Вот и всё. «Интеллект» — это то, что модель каждый раз решает: хватает ли данных для ответа или нужно потянуться к тулу. Когда я смотрел, как мой агент работает, на сложном вопросе он искал **дважды**, на простом — **один раз**. Никто не говорил ему, сколько раз искать. Вот это решение *и есть* агент.

## Зачем вообще нужен тул для поиска

Вот что многие упускают: OpenAI API не умеет лазить в интернет. У модели есть дата среза обучения — интернета нет. Спроси про что-то, что случилось в прошлом месяце — она либо пожмёт плечами, либо угадает.

Поэтому агенту нужен тул, который достаёт живую информацию. Я использовал **Tavily** — поисковик, заточенный под LLM-ы. Отправляешь запрос, он возвращает чистые, ранжированные результаты (заголовок, сниппет, ссылка) в виде обычного текста, который модель реально может прочитать. Обычный Google выдаст тебе HTML-страницу, набитую рекламой и разметкой; Tavily отдаёт текст в форме ответа. Именно поэтому мой агент смог назвать лауреата Нобелевской премии 2024 года — нашёл, получил свежий текст, суммаризировал. Заменишь Tavily на Bing или DuckDuckGo — ничего больше не изменится; это просто «штука, которая достаёт реальность».

## Так что же реально делает LangGraph?

Вот здесь мне пришлось быть честным с собой. **LangGraph** управляет этим циклом — но как *граф*. Определяешь ноды (нода «агент», которая вызывает модель; нода «тулы», которая запускает поиск) и рёбра между ними, включая условное ребро: «после того как агент ответил — если попросил тул, иди к ноде тулов и возвращайся; иначе остановись». Запускаешь — и получаешь цикл поиск-решение-поиск-ответ, плюс каждый шаг стримится, чтобы UI мог показывать прогресс вживую.

Но было кое-что, что я не мог игнорировать: этот цикл на обычном коде — примерно пятнадцать строк.

\`\`\`js
let messages = [systemPrompt, userQuestion]
while (true) {
  const reply = await openai.chat(messages, { tools: [search] })
  messages.push(reply)
  if (reply.toolCalls) {
    for (const call of reply.toolCalls)
      messages.push(await runSearch(call))   // поиск, передаём результаты обратно
  } else {
    return reply.content                      // модель завершила работу
  }
}
\`\`\`

Для одного тула и простого цикла обычный \`while\` — честно говоря, нормально. Легче, чем тащить фреймворк.

## «Почему не просто Next.js и OpenAI?»

Я постоянно задавал себе этот вопрос, и он правильный — с одной ловушкой внутри. Next.js и LangGraph — не конкуренты. Они живут на разных слоях:

- **Next.js** — это приложение: UI и сервер. Он заменяет FastAPI + HTML, которые использовал я, а не LangGraph.
- **OpenAI** — мозг.
- **Tavily** — тул для живого веба, он тебе всё равно понадобится.
- **LangGraph** — цикл, та часть, которую иначе пришлось бы писать вручную.

Так что «Next.js + OpenAI» на самом деле означает: *Next.js для приложения, OpenAI для мозга, а цикл пишешь сам.* Для моего маленького демо это сработало бы и было бы проще. Не буду делать вид, что иначе.

## Где фреймворк оправдывает своё место

LangGraph начинает окупаться на *второй* и *третьей* фиче, не на первой — когда цикл перестаёт быть простым:

- **Несколько тулов с ветвлением** — «математический вопрос — сюда, поиск — туда». В графе это чистое ребро, в рукописном цикле — куча вложенных \`if\`-ов.
- **Память, которая переживает рестарты** — чекпойним состояние в базу данных, останавливаем посередине, чтобы человек что-то подтвердил, потом продолжаем. Это самое важное; ручная реализация персистентности быстро превращается в кашу.
- **Стриминг каждого шага** — события \`ищет → читает → отвечает\` достались мне почти бесплатно.
- **Несколько агентов** — исследователь передаёт работу писателю, у каждого свой граф.

Честное резюме: для одного тула и прямого цикла — берёшь \`while\`. Когда клиент попросит «агента, который использует пять тулов, помнит разговор и перед чем-то дорогим ждёт подтверждения» — вот тогда рукописная версия превращается в спагетти, а граф остаётся читаемым.

## Почему я учился на чём-то настолько маленьком

Я мог подождать, пока проект не загонит меня в агентов. Не стал — специально. Изучить паттерн на простой задаче значит, что он уже знаком, когда появится сложная — а на Upwork запрос «собери мне AI-агента, который делает X, Y и Z» попадается всё чаще каждый месяц. Теперь, когда он придёт, я не буду одновременно разбираться в инструменте и в задаче.

В этом весь смысл демо на выходных: заплатить за обучение, когда ставки нулевые.`,
    },
  },
  {
    slug: "shipping-with-ai",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
    date: "2026-05-12",
    tags: ["AI", "Workflow", "Claude Code"],
    readingMinutes: 5,
    title: {
      en: "How I actually use AI to ship",
      uz: "Men haqiqatda AI yordamida qanday yetkazib beraman",
      ru: "Как я на самом деле использую ИИ в работе",
    },
    excerpt: {
      en: "Honest take from a senior dev: where AI actually helps (boilerplate, translations, refactors), where it falls flat (architecture, judgment, knowing what to build), and how I stay in control.",
      uz: "Senior dasturchi sifatida halol fikr: AI qayerda haqiqatan foydali (boilerplate, tarjimalar, refaktorlar), qayerda yiqiladi (arxitektura, mulohaza, nima qurish kerakligini bilish) va men qanday nazoratni saqlayman.",
      ru: "Честный взгляд senior разработчика: где ИИ реально помогает (бойлерплейт, переводы, рефакторы), где пасует (архитектура, суждения, понимание что строить), и как я остаюсь у руля.",
    },
    content: {
      en: `## Let me be upfront about something

I use AI tools every day. Claude Code has genuinely changed how fast I move on certain things. But I'm also a bit tired of the discourse — either "AI will replace developers" or "AI is useless hype." Neither is accurate for me.

Here's my honest experience after shipping real products with it.

## Where it actually helps

**Boilerplate is the obvious one.** I can describe a NestJS controller with a particular shape, and it writes the skeleton. I can say "add pagination to this endpoint" and it adds the right query params, the DTO, the service method. Stuff that's purely mechanical — I don't need to think about it anymore, which is genuinely nice.

**Translations are huge for me.** My portfolio and BookUp have content in Uzbek, Russian, and English. Before, that meant sitting with Google Translate plus manual cleanup for every string. Now I write the English version, give it context ("this is informal, conversational, aimed at small business owners"), and get a first draft in uz/ru that's actually decent. Still review it, but it's 80% done.

**Exploration.** When I'm unfamiliar with something — say, Telegram's initData HMAC verification — I can have a back-and-forth that's faster than reading docs linearly. "What are the gotchas with this?" gets me to the interesting stuff quickly.

**Refactoring with a clear spec.** "Rename all these fields from camelCase to snake_case" or "extract this repeated pattern into a helper" — mechanical changes in a known codebase, AI handles this well.

\`\`\`bash
# The stuff I don't think about anymore
# - DTOs and validators
# - migration skeletons
# - test fixtures
# - i18n string drafts
\`\`\`

## Where it doesn't help

**Architecture decisions.** What should be a separate service vs. staying in a monolith? Does this feature belong in the booking flow or the tenant dashboard? Should we use a queue here or just process synchronously? AI gives opinions, sometimes confident-sounding ones, but they're not grounded in the actual constraints of my system. I've tried delegating these and gotten myself into trouble.

**Knowing what to build.** This is the actual senior developer skill. Understanding users, reading between the lines of what clients say, prioritizing ruthlessly — none of that is AI-assisted. The hardest part of my job is still entirely human.

**Judgment on quality.** AI doesn't know when something is "good enough" vs. over-engineered. It doesn't feel the difference between a clean abstraction and a leaky one. I can ask it to review code and it'll find real issues sometimes, but it'll also suggest changes that make things worse in ways that are hard to articulate.

**Anything where context is subtle.** My codebase has decisions that make sense in context — a slightly unusual data model because of a specific business rule, a workaround for a Payme quirk. AI doesn't know about these and will confidently suggest changes that break things.

## How I stay in control

I think of it as a pair programmer who's very fast, very tireless, and very bad at judgment. My job is to use the speed without delegating the thinking.

Concretely: I write the plan. I know what I'm building before I start. AI helps me build it faster. I review everything it produces — not just "does it compile" but "is this actually right." I keep the diff small enough that I can review it properly.

I'll be real: it's easy to get lazy. To accept something because it looks plausible. The times I've gotten burned have been when I was tired and just merged without really reading. The tool didn't fail me; I failed myself.

It's good tooling. Use it. Just don't let it think for you.`,

      uz: `## Avval bir narsani ochiq aytay

Men AI vositalarini har kuni ishlataman. Claude Code muayyan narsalarda qanchalik tez harakatlanishimni haqiqatan ham o'zgartirdi. Lekin men bu munozaradan bir oz charchadim — "AI dasturchilarni almashtiradi" yoki "AI befoyda shov-shuv." Men uchun ikkisi ham to'g'ri emas.

Mana men bilan haqiqiy mahsulotlarni yetkazib berganidan keyin mening halol tajribam.

## Haqiqatda qayerda yordam beradi

**Boilerplate eng aniq narsa.** NestJS kontrollerini muayyan shakl bilan tavsiflasam, u skeletni yozadi. "Bu endpoint-ga sahifalash qo'sh" desam, to'g'ri query parametrlarini, DTO-ni, service metodini qo'shadi. Sof mexanik narsalar — endi u haqida o'ylashim shart emas, bu haqiqatan yaxshi.

**Tarjimalar men uchun juda katta.** Mening portfolyom va BookUp Uzbek, Rus va Ingliz tillarida kontentga ega. Avval bu har bir satr uchun Google Translate bilan o'tirish va qo'lda tozalash degani edi. Endi inglizcha versiyasini yozaman, kontekst beraman ("bu norasmiy, suhbatli, kichik biznes egalariga qaratilgan") va uz/ru-da haqiqatan ham yaxshi birinchi qoralamani olaman.

**Tadqiqot.** Biror narsaga notanish bo'lsam — masalan, Telegram-ning initData HMAC tekshiruvi — hujjatlarni chiziqli o'qishdan tezroq orqaga-oldinga dialog olib boraman.

**Aniq spetsifikatsiya bilan refaktorlash.** "Bu maydonlarning barchasini camelCase-dan snake_case-ga o'zgartir" yoki "bu takrorlanuvchi naqshni helper-ga chiqar" — AI bularni yaxshi hal qiladi.

\`\`\`bash
# Endi o'ylamaydigan narsalar
# - DTO va validatorlar
# - migratsiya skeletlari
# - test fixture-lari
# - i18n qatorlari qoralamasi
\`\`\`

## Qayerda yordam bermaydi

**Arxitektura qarorlari.** Nima alohida xizmat bo'lishi kerak, nima monolitda qolishi? Bu xususiyat bron oqimiga yoki ijarachi boshqaruv paneliga tegishlimi? Bu yerda navbat ishlatishimiz kerakmi yoki shunchaki sinxron qayta ishlashimiz kerakmi? AI fikr bildiradi, ba'zan ishonchli eshitiladi, lekin ular mening tizimimning haqiqiy cheklovlariga asoslanmagan.

**Nima qurishni bilish.** Bu haqiqiy senior dasturchi mahorati. Foydalanuvchilarni tushunish, mijozlarning so'zlari ortidagi ma'noni o'qish, qat'iy ustuvorlashtirish — bularning hech biri AI yordamida emas. Ishimning eng qiyin qismi hali ham butunlay insoniy.

**Sifat bo'yicha mulohaza.** AI "yetarlicha yaxshi" va ortiqcha muhandislangan o'rtasidagi farqni bilmaydi. U kodni ko'rib chiqishni so'rasam, ba'zida haqiqiy muammolarni topadi, lekin narsalarni yomonlashtirgan o'zgartirishlarni ham tavsiya qiladi.

## Nazoratda qanday qolaman

Uni juda tez, juda charchamaydigan va mulohazada juda yomon bo'lgan juft dasturchi sifatida ko'raman. Mening vazifam tezlikdan foydalanib, fikrlashni topshirmaslikdir.

Konkret: Men rejani yozaman. Boshlamishdan oldin nima qurаyotganimni bilaman. AI uni tezroq qurishimga yordam beradi. U ishlab chiqargan hamma narsani ko'rib chiqaman — faqat "kompilyatsiya bo'ladimi" emas, balki "bu haqiqatan to'g'rimi". Diffni yetarli kichik saqlaman.

Bu yaxshi asbob. Undan foydalaning. Shunchaki u siz uchun o'ylasin dema.`,

      ru: `## Позвольте быть честным

Я использую AI-инструменты каждый день. Claude Code реально изменил скорость работы на определённых задачах. Но мне надоел этот дискурс — либо "ИИ заменит разработчиков", либо "ИИ — бесполезный хайп". Ни то, ни другое не соответствует моему опыту.

Вот моя честная оценка после реальных поставок с его помощью.

## Где реально помогает

**Бойлерплейт — самое очевидное.** Описываю NestJS-контроллер нужной формы — получаю скелет. "Добавь пагинацию к этому эндпоинту" — и получаю правильные query-параметры, DTO, метод сервиса. Чисто механические вещи. Больше не думаю об этом, и это честно приятно.

**Переводы — это огромно для меня.** Мой портфолио и BookUp имеют контент на узбекском, русском и английском. Раньше это означало сидеть с Google Translate и вручную чистить каждую строку. Теперь пишу английскую версию, даю контекст ("неформально, разговорно, для владельцев малого бизнеса") и получаю первый черновик на uz/ru, который уже довольно приличный.

**Исследование.** Когда что-то незнакомо — скажем, верификация HMAC для initData в Telegram — диалог туда-обратно быстрее линейного чтения документации.

**Рефакторинг с чёткой спецификацией.** "Переименуй все эти поля из camelCase в snake_case" — AI справляется хорошо.

\`\`\`bash
# Что я больше не обдумываю
# - DTO и валидаторы
# - скелеты миграций
# - тестовые фикстуры
# - черновики i18n-строк
\`\`\`

## Где не помогает

**Архитектурные решения.** Что должно быть отдельным сервисом, а что остаться в монолите? Эта фича относится к флоу бронирования или к дашборду тенанта? AI даёт мнения, иногда звучащие уверенно, но они не основаны на реальных ограничениях моей системы. Я пробовал делегировать это — и попадал в неприятности.

**Знать, что строить.** Это реальный навык senior-разработчика. Понимание пользователей, чтение между строк того, что говорят клиенты, жёсткая расстановка приоритетов — ничего из этого AI не помогает. Самая сложная часть моей работы по-прежнему полностью человеческая.

**Суждение о качестве.** AI не знает, когда что-то "достаточно хорошо" против переспроектированного. Я могу попросить его проверить код, и иногда он найдёт реальные проблемы, но и предложит изменения, которые сделают хуже — так, что сложно объяснить почему.

## Как я остаюсь у руля

Я думаю о нём как о пар-программисте: очень быстром, неутомимом и с очень плохим суждением. Моя работа — использовать скорость, не делегируя мышление.

Конкретно: я пишу план. Я знаю, что строю, до начала. AI помогает строить быстрее. Я проверяю всё, что он производит — не просто "компилируется ли", а "это правильно?". Держу дифф достаточно маленьким для нормальной проверки.

Хороший инструмент. Используйте. Просто не давайте ему думать за вас.`,
    },
  },
  {
    slug: "telegram-mini-apps",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    date: "2026-03-20",
    tags: ["Telegram", "Mobile", "Product"],
    readingMinutes: 5,
    title: {
      en: "Building where the users already are: Telegram Mini Apps",
      uz: "Foydalanuvchilar allaqachon bo'lgan joyda qurish: Telegram Mini Apps",
      ru: "Строить там, где уже есть пользователи: Telegram Mini Apps",
    },
    excerpt: {
      en: "Why Telegram Mini Apps made sense for BookUp and MyPolis in this region, the quirks you'll run into (HMAC auth, keyboard weirdness, no real back button), and my honest pros/cons after shipping a few of them.",
      uz: "Nima uchun Telegram Mini Apps bu mintaqada BookUp va MyPolis uchun mantiqiy edi, duch keladigan g'alatiliklar (HMAC autentifikatsiyasi, klaviatura g'alatiliklar, haqiqiy orqa tugma yo'q) va bir nechtasini yetkazib berganidan keyin mening halol ijobiy/salbiy tomonlarim.",
      ru: "Почему Telegram Mini Apps имел смысл для BookUp и MyPolis в этом регионе, с какими особенностями столкнётесь (HMAC-аутентификация, странности клавиатуры, нет настоящей кнопки назад) и мои честные плюсы/минусы после нескольких поставок.",
    },
    content: {
      en: `## The distribution problem

Here's the thing about building for Central Asia: your users are already in Telegram. Not "some users" — basically everyone. Telegram penetration here is unlike anywhere else I know of. So when I was thinking about how to distribute BookUp's customer-facing booking UI, the answer was kind of obvious.

Why convince someone to download an app or remember a URL when they're going to be in Telegram anyway?

## What we actually built

For BookUp, the Telegram Mini App is the main customer interface. Someone wants to book at a barbershop — they open the bot, the mini app loads inside Telegram, they pick a time, done. No new app to install. No login — Telegram handles identity.

MyPolis uses a similar approach for a civic platform. The matchmaking app I built also ran as a TMA. Same reasoning each time: meet users where they are.

## The auth flow is actually clever

The way Telegram passes user identity to your mini app is interesting. When the app loads, Telegram injects a \`initData\` string into the JavaScript context. This contains user info (ID, name, username) and a hash.

To verify it's legitimate and not someone crafting a fake payload, you validate the HMAC:

\`\`\`ts
import crypto from 'crypto';

function verifyInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => \`\${k}=\${v}\`)
    .join('\\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return hash === expectedHash;
}
\`\`\`

Once you verify this on your backend, you can trust the user identity and issue your own session token. It's genuinely clean once you understand it.

## The quirks that will catch you

**The back button is fake.** Telegram provides a "back button" in the header, but it's not a real browser back button — it's an event you have to handle in JavaScript. If you build a single-page app with react-router expecting normal navigation, you'll need to wire up the Telegram back button event to your router. Easy once you know, confusing before you do.

**The keyboard on iOS is... special.** When a text input gets focus on iOS inside a Telegram mini app, the viewport shifts in ways that are different from a normal Safari web view. Lots of "input is hidden behind the keyboard" bugs. I've spent more time on this than I'd like to admit.

**Layout viewport vs. visual viewport.** Telegram exposes \`window.Telegram.WebApp.viewportHeight\` and \`viewportStableHeight\`. You want \`viewportStableHeight\` for layout — \`viewportHeight\` changes as the keyboard opens and causes layout jumps. Took me a while to figure that one out.

**Theme variables are a gift.** Telegram passes CSS variables for the user's current theme (dark/light, accent colors, background). Using these makes your app feel native to the Telegram skin the user has. Worth doing.

## Honest pros and cons

Pros: near-zero distribution friction, no App Store review, instant updates, identity for free, users are already there.

Cons: you're building inside someone else's container. Telegram can change the API. The WebView has quirks that browsers don't. Debugging is harder. You're dependent on Telegram's infrastructure.

For the markets I'm building for, the pros win clearly. If you're building consumer software for a Telegram-heavy region, think hard before building a separate app instead.`,

      uz: `## Tarqatish muammosi

Markaziy Osiyo uchun qurish haqida qiziq narsa: sizning foydalanuvchilaringiz allaqachon Telegramda. "Ba'zi foydalanuvchilar" emas — deyarli hamma. Bu yerda Telegram tarqalishi men bilgan boshqa joydan farqli. Shuning uchun BookUp-ning mijozlarga yo'naltirilgan bron interfeysini qanday tarqatish haqida o'ylayotganimda, javob aniq edi.

Nima uchun kimnidir ilova yuklab olishga yoki URL-ni eslab qolishga ishontirish kerak, agar u baribir Telegramda bo'ladigan bo'lsa?

## Aslida nima qurdik

BookUp uchun Telegram Mini App asosiy mijoz interfeysidir. Kimdir sartaroshxonada bron qilmoqchi — botni ochadi, mini ilova Telegram ichida yuklanadi, vaqt tanlaydi, tamom. O'rnatish kerak bo'lgan yangi ilova yo'q. Login yo'q — Telegram identifikatsiyani boshqaradi.

MyPolis fuqarolik platformasi uchun shunga o'xshash yondashuvdan foydalanadi. Men qurgan matchmaking ilovasi ham TMA sifatida ishladi. Har safar bir xil mulohaza: foydalanuvchilar qayerda bo'lsa, o'sha yerda uchrashing.

## Auth oqimi haqiqatan aqlli

Telegram foydalanuvchi shaxsini mini ilovanizga qanday uzatishi qiziqarli. Ilova yuklanganida, Telegram JavaScript kontekstiga \`initData\` qatorini kiritadi. Bu foydalanuvchi ma'lumotlarini (ID, ism, foydalanuvchi nomi) va hashni o'z ichiga oladi.

Uni qonuniy ekanligini va kimdir soxta yuk yaratmaganini tekshirish uchun HMAC ni tasdiqlaysiz:

\`\`\`ts
import crypto from 'crypto';

function verifyInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => \`\${k}=\${v}\`)
    .join('\\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return hash === expectedHash;
}
\`\`\`

Buni backendda tasdiqlasangiz, foydalanuvchi shaxsiga ishonishingiz va o'z session tokeningizni chiqarishingiz mumkin.

## Sizni tutib qoladigan g'alatiliklar

**Orqa tugma soxta.** Telegram sarlavhada "orqa tugma" beradi, ammo bu haqiqiy brauzer orqa tugmasi emas — bu JavaScript-da hal qilishingiz kerak bo'lgan hodisa.

**iOS-dagi klaviatura... maxsus.** Telegram mini ilovasi ichida iOS-da matn kiritish fokus olganida, viewport oddiy Safari web viewdan farqli yo'llar bilan siljiydi. Juda ko'p "kirish klaviatura ortida yashiringan" xatolar.

**Layout viewport vs visual viewport.** Telegram \`window.Telegram.WebApp.viewportStableHeight\`-ni ochadi — buni layout uchun ishlating.

**Mavzu o'zgaruvchilari sovg'a.** Telegram foydalanuvchining joriy mavzusi uchun CSS o'zgaruvchilarini uzatadi. Bulardan foydalanish ilovangizni Telegram skin-iga mahalliy ko'rinishga keltiradi.

## Halol ijobiy/salbiy tomonlar

Ijobiy: deyarli nol tarqatish to'sqinligi, App Store tekshiruvi yo'q, darhol yangilanishlar, bepul identifikatsiya, foydalanuvchilar allaqachon o'sha yerda.

Salbiy: siz boshqa birovning konteynerida qurmoqdasiz. Telegram API-ni o'zgartirishi mumkin. Debugging qiyinroq.

Men qurаyotgan bozorlar uchun ijobiy tomonlar aniq g'alaba qozonadi.`,

      ru: `## Проблема дистрибуции

Вот в чём дело со строительством для Центральной Азии: ваши пользователи уже в Telegram. Не "некоторые пользователи" — практически все. Проникновение Telegram здесь не такое, как где-либо ещё. Так что когда я думал, как распространить пользовательский интерфейс бронирования BookUp, ответ был довольно очевидным.

Зачем убеждать кого-то скачивать приложение или запоминать URL, когда они всё равно будут в Telegram?

## Что мы на самом деле построили

Для BookUp Telegram Mini App — это основной клиентский интерфейс. Кто-то хочет забронировать в барбершопе — открывает бота, мини-приложение загружается внутри Telegram, выбирает время, готово. Никакого нового приложения для установки. Никакого логина — Telegram управляет идентификацией.

MyPolis использует аналогичный подход для гражданской платформы. Приложение для знакомств, которое я построил, тоже работало как TMA. Каждый раз одна и та же логика: встречайте пользователей там, где они есть.

## Auth-поток на самом деле умный

Способ, которым Telegram передаёт идентификацию пользователя в мини-приложение, интересен. При загрузке приложения Telegram инжектирует строку \`initData\` в JavaScript-контекст. Она содержит данные пользователя (ID, имя, username) и хеш.

Для проверки подлинности нужно провалидировать HMAC:

\`\`\`ts
import crypto from 'crypto';

function verifyInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => \`\${k}=\${v}\`)
    .join('\\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return hash === expectedHash;
}
\`\`\`

После верификации на бэкенде можно доверять идентификации пользователя и выдавать собственный сессионный токен.

## Особенности, которые вас поймают

**Кнопка назад — ненастоящая.** Telegram предоставляет "кнопку назад" в заголовке, но это не реальная кнопка браузера — это событие, которое нужно обрабатывать в JavaScript.

**Клавиатура на iOS... особенная.** Когда текстовый ввод получает фокус на iOS внутри Telegram Mini App, viewport смещается иначе, чем в обычном Safari WebView. Много багов "ввод скрыт за клавиатурой".

**Layout viewport vs visual viewport.** Telegram предоставляет \`window.Telegram.WebApp.viewportStableHeight\` — используйте его для layout.

**Переменные темы — подарок.** Telegram передаёт CSS-переменные для текущей темы пользователя. Использование их делает приложение нативным для скина Telegram пользователя.

## Честные плюсы и минусы

Плюсы: почти нулевое трение дистрибуции, не нужна проверка App Store, мгновенные обновления, идентификация бесплатно, пользователи уже там.

Минусы: вы строите внутри чужого контейнера. Telegram может изменить API. Отладка сложнее.

Для рынков, на которые я строю, плюсы явно побеждают.`,
    },
  },
  {
    slug: "erp-nobody-screenshots",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #6366f1 100%)",
    date: "2026-02-08",
    tags: ["ERP", "Internal tools", "Career"],
    readingMinutes: 5,
    title: {
      en: "Building software nobody will screenshot",
      uz: "Hech kim screenshot olmaydiganligini qurishni",
      ru: "Создание программного обеспечения, которое никто не будет скриншотить",
    },
    excerpt: {
      en: "The unglamorous internal ERP/CRM work at InterRail — automating accounting, acts and contracts, KPI dashboards, AI document processing that killed manual Excel entry. Why boring internal tools are some of the most satisfying work I've done.",
      uz: "InterRail-dagi nufursiz ichki ERP/CRM ishi — hisobot yuritishni avtomatlashtirish, aktlar va shartnomalar, KPI boshqaruv panellari, qo'lda Excel kiritishni yo'q qilgan AI hujjat qayta ishlash. Nima uchun zerikarli ichki vositalar men qilgan eng qoniqarli ishlardan ba'zilari.",
      ru: "Незаметная работа по внутреннему ERP/CRM в InterRail — автоматизация бухгалтерии, актов и контрактов, KPI-дашбордов, AI-обработки документов, которая убила ручной ввод в Excel. Почему скучные внутренние инструменты — одна из самых удовлетворительных работ, которую я делал.",
    },
    content: {
      en: `## Nobody will tweet about this

When I was working at InterRail, I built a lot of things that will never appear in a portfolio screenshot. No beautiful UI, no clever product. Just: an accountant used to spend half her day manually copying numbers from documents into Excel. Now she doesn't.

That's it. That's the whole story.

But honestly? That's some of the most satisfying work I've done.

## What the actual problem was

InterRail is a logistics and infrastructure company. The back-office work involves a lot of paper: contracts, acts of completion, invoices, KPI reports for clients. Most of it was being handled manually.

A senior accountant would receive a PDF — a scanned act of completion from a partner company — and spend time extracting the numbers, verifying them against contract terms, entering them into a spreadsheet, and then creating the corresponding accounting entry. For every document. Every day.

The developers before me had built a basic CRM. But the accounting and document workflows were still manual.

## What we built

The core piece was AI-assisted document processing. A document comes in — scanned PDF, sometimes handwritten, sometimes a Word export — and the system extracts the structured data: parties, amounts, dates, line items, payment terms.

We used an LLM to handle the extraction. The tricky part isn't the model call; it's the validation layer. You can't just trust what the model extracts. You need to:

- Cross-reference amounts against the contract stored in the system
- Flag discrepancies for human review rather than silently accepting them
- Handle the cases where the document is ambiguous or partially readable

The result: what used to take 15-20 minutes per document now takes under a minute, mostly human review of flagged items.

We also built:

**Acts and contracts module.** Create, version, sign-off flow. Not exciting to describe but eliminated a huge amount of email back-and-forth.

**KPI dashboards for clients.** InterRail reports performance metrics to its clients. Before: a report was assembled manually in Excel and sent as an attachment. After: clients have a portal, data updates automatically, the report is just a button.

**Accounting automation.** Standard entries for common transaction types, auto-suggested from the extracted document data. The accountant confirms or adjusts; she doesn't start from blank.

## Why this work matters

Here's what I've learned: the impact of a consumer product is diffuse. You ship a feature, some percentage of users use it, you see it in some metric. The impact of a well-built internal tool is immediate and specific. You watch someone's workflow change in front of you.

The accountant told me she could now leave work on time instead of staying late to finish data entry. That's real. That's more tangible than a conversion rate improvement.

I think there's a bias in tech culture toward "product" work — things you can show, things that are publicly visible. Internal tools get less prestige even when they deliver more measurable value per hour of engineering time.

## The unglamorous lessons

**Data quality is always the real problem.** The documents are inconsistent. Partner companies use different formats. Amounts are expressed differently. Building the extraction is maybe 30% of the work; building the normalization and validation is 70%.

**Build for the actual user, not the spec.** The accountant doesn't want a "document processing system." She wants to not do the boring parts of her job. The frame matters.

**Internal users will tell you exactly what's wrong.** Consumer users churn silently. Internal users come to your desk. This is a feature, not a bug — it's the fastest feedback loop I've experienced in software.

I'm proud of this work even though nobody will ever screenshot it.`,

      uz: `## Hech kim buni tweet qilmaydi

InterRail-da ishlayotganimda, hech qachon portfolio screenshotida ko'rinmaydigan ko'p narsalar qurdim. Chiroyli UI yo'q, aqlli mahsulot yo'q. Shunchaki: buxgalter kunining yarmini hujjatlardan Excel-ga raqamlarni qo'lda nusxalashga sarflardi. Endi sarflamaydi.

Hammasi shu. Bu butun hikoya.

Lekin halol aytganda? Bu men qilgan eng qoniqarli ishlardan ba'zilari.

## Haqiqiy muammo nima edi

InterRail — logistika va infratuzilma kompaniyasi. Back-office ishi juda ko'p qog'ozni o'z ichiga oladi: shartnomalar, bajarilgan ishlar dalolatnomalari, hisob-fakturalar, mijozlar uchun KPI hisobotlari. Ko'pgina narsalar qo'lda bajarilmoqda edi.

Katta buxgalter PDF qabul qilardi — hamkor kompaniyadan skanerlangan ish bajarilganligi dalolatnomasini — va raqamlarni chiqarish, ularni shartnoma shartlari bilan tekshirish, elektron jadvalga kiritish va keyin tegishli buxgalteriya yozuvini yaratishga vaqt sarflardi. Har bir hujjat uchun. Har kuni.

## Nima qurdik

Asosiy qism AI yordamida hujjat qayta ishlash edi. Hujjat keladi — skanerlangan PDF, ba'zan qo'lda yozilgan — va tizim tuzilgan ma'lumotlarni ajratib oladi: tomonlar, miqdorlar, sanalar, to'lov shartlari.

Ajratib olish uchun LLM-dan foydalandik. Qiyin qism model chaqiruvi emas; tasdiqlash qatlamidir. Modelning ajratib olganiga shunchaki ishona olmaysiz:

- Miqdorlarni tizimda saqlangan shartnoma bilan o'zaro tekshiring
- Tafovutlarni jim qabul qilish o'rniga inson ko'rib chiqishi uchun belgilang
- Hujjat noaniq yoki qisman o'qiladigan holatlarni hal qiling

Natija: hujjat boshiga 15-20 daqiqa ketgan narsa endi daqiqadan kamroq vaqt oladi.

Shuningdek qurdik:

**Aktlar va shartnomalar moduli.** Yaratish, versiyalash, tasdiqlash oqimi. Tasvirlash uchun hayajonli emas, lekin juda ko'p email almashinuvini bartaraf etdi.

**Mijozlar uchun KPI boshqaruv panellari.** InterRail mijozlariga ishlash ko'rsatkichlari hisobotini beradi. Ilgari: hisobot Excel-da qo'lda yig'ilib qo'shimcha sifatida yuborilardi. Keyin: mijozlar portalga ega, ma'lumotlar avtomatik yangilanadi.

**Buxgalteriya avtomatizatsiyasi.** Umumiy tranzaksiya turlari uchun standart yozuvlar, ajratilgan hujjat ma'lumotlaridan avtomatik taklif qilingan. Buxgalter tasdiqlaydi yoki sozlaydi; u bo'shdan boshlaydi.

## Nima uchun bu ish muhim

Mana men o'rganganum: iste'molchi mahsulotining ta'siri tarqoq. Xususiyat yuborasan, foydalanuvchilarning ma'lum foizi undan foydalanadi. Yaxshi qurilgan ichki vositaning ta'siri darhol va aniq. Siz kimningdir ish oqimining ko'z oldingizda o'zgarishini kuzatasiz.

Buxgalter menga ma'lumot kiritishni tugatish uchun kechikish o'rniga endi vaqtida ishdan keta olishini aytdi. Bu haqiqiy. Bu konversiya darajasi yaxshilanishidan ko'ra ko'proq moddiy.

## Nufursiz saboqlar

**Ma'lumotlar sifati har doim haqiqiy muammo.** Hujjatlar bir xil emas. Hamkor kompaniyalar turli formatlardan foydalanadi. Ajratib olishni qurish ishning taxminan 30% ini tashkil qiladi; normallash va tasdiqlashni qurish 70%.

**Spetsifikatsiya uchun emas, haqiqiy foydalanuvchi uchun qurin.** Buxgalter "hujjat qayta ishlash tizimini" xohlamaydi. U ishining zerikarli qismlarini qilmaslikni xohlaydi.

**Ichki foydalanuvchilar nima noto'g'ri ekanligini aniq aytadilar.** Iste'molchi foydalanuvchilar jim chiqib ketadilar. Ichki foydalanuvchilar stolingizga keladi. Bu xato emas — bu men dasturiy ta'minotda boshdan kechirgan eng tez fikr-mulohaza aylanishidir.`,

      ru: `## Никто не будет это твитить

Когда я работал в InterRail, я построил много вещей, которые никогда не появятся на скриншоте портфолио. Нет красивого UI, нет умного продукта. Просто: бухгалтер тратила полдня на ручное копирование чисел из документов в Excel. Теперь не тратит.

Вот и всё. Это вся история.

Но честно? Это одна из самых удовлетворительных работ, которую я делал.

## В чём была настоящая проблема

InterRail — логистическая и инфраструктурная компания. Back-office работа включает много бумаг: контракты, акты выполненных работ, счета, KPI-отчёты для клиентов. Большинство обрабатывалось вручную.

Старший бухгалтер получала PDF — отсканированный акт выполненных работ от партнёрской компании — и тратила время на извлечение чисел, проверку их против условий контракта, внесение в таблицу и создание соответствующей бухгалтерской записи. Для каждого документа. Каждый день.

## Что мы построили

Ключевой частью была AI-обработка документов. Документ поступает — отсканированный PDF, иногда рукописный — и система извлекает структурированные данные: стороны, суммы, даты, условия оплаты.

Для извлечения использовали LLM. Сложность не в вызове модели; это слой валидации. Нельзя просто доверять тому, что извлекает модель. Нужно:

- Сверять суммы с контрактом, хранящимся в системе
- Отмечать расхождения для проверки человеком, а не принимать молча
- Обрабатывать случаи, когда документ неоднозначен или частично читаем

Результат: то, что раньше занимало 15-20 минут на документ, теперь занимает меньше минуты.

Также построили:

**Модуль актов и контрактов.** Создание, версионирование, поток согласования. Скучно описывать, но устранило огромный объём email-переписки.

**KPI-дашборды для клиентов.** Раньше: отчёт собирался вручную в Excel и отправлялся как вложение. После: у клиентов есть портал, данные обновляются автоматически.

**Автоматизация бухгалтерии.** Стандартные записи для распространённых типов транзакций, автоматически предложенные из извлечённых данных документа. Бухгалтер подтверждает или корректирует.

## Почему эта работа важна

Вот что я понял: влияние потребительского продукта размыто. Поставляешь фичу, какой-то процент пользователей использует её. Влияние хорошо построенного внутреннего инструмента немедленно и конкретно. Наблюдаешь, как рабочий процесс человека меняется прямо перед тобой.

Бухгалтер сказала мне, что теперь может уходить с работы вовремя, а не задерживаться для завершения ввода данных. Это реально. Это более осязаемо, чем улучшение коэффициента конверсии.

## Незаметные уроки

**Качество данных — всегда настоящая проблема.** Документы непоследовательны. Партнёрские компании используют разные форматы. Построить извлечение — примерно 30% работы; построить нормализацию и валидацию — 70%.

**Стройте для реального пользователя, не для спецификации.** Бухгалтер не хочет "систему обработки документов". Она хочет не делать скучные части своей работы.

**Внутренние пользователи скажут вам точно, что не так.** Потребители молча уходят. Внутренние пользователи приходят к вашему столу. Это особенность, а не баг — самый быстрый цикл обратной связи в разработке ПО.

Я горжусь этой работой, даже если никто никогда не сделает её скриншот.`,
    },
  },
  {
    slug: "boring-tech-postgres",
    gradient: "linear-gradient(135deg, #5b6cff 0%, #a855f7 50%, #ec4899 100%)",
    date: "2025-12-15",
    tags: ["Postgres", "Architecture", "Opinion"],
    readingMinutes: 4,
    title: {
      en: "Why I keep reaching for boring tech",
      uz: "Nima uchun men doim zerikarli texnologiyalarga murojaat qilaman",
      ru: "Почему я снова и снова тянусь к скучным технологиям",
    },
    excerpt: {
      en: "After shipping several real products, I keep landing on Postgres, NestJS, and plain TypeScript. Not because I haven't tried the shiny stuff — I have. Just because boring works.",
      uz: "Bir nechta haqiqiy mahsulotlarni yetkazib berganidan keyin, men doim Postgres, NestJS va oddiy TypeScript-ga qaytaman. Yangi narsalarni sinab ko'rmaganimdan emas — sinab ko'rganman. Shunchaki zerikarli narsa ishlaydi.",
      ru: "После поставки нескольких реальных продуктов я снова и снова прихожу к Postgres, NestJS и простому TypeScript. Не потому что не пробовал блестящие штуки — пробовал. Просто скучное работает.",
    },
    content: {
      en: `## I want to be clear about what I'm not saying

I'm not saying new tech is bad or that you should never try anything. I've used newer databases, played with edge runtimes, experimented with ORMs that promise to make everything easier. Some of it's genuinely interesting.

But after several years of shipping real products — BookUp, the InterRail ERP, projects for clients — I keep landing in the same place: Postgres, NestJS, TypeScript, Redis for caching and queues. The same stack, more or less.

Here's why I'm at peace with that.

## Postgres does everything

I mean this literally. Postgres handles:

- Relational data with foreign keys and joins (obviously)
- JSON and JSONB columns when you need a flexible schema
- Full-text search that's good enough for most applications
- Geospatial queries via PostGIS
- Time-series patterns via TimescaleDB
- Row-level security for multi-tenancy
- Triggers and stored procedures when you need them

Every time I've thought "maybe I need a separate database for X", the honest answer has been "no, Postgres can do X." The cost of operating one database is much lower than operating three. And Postgres has been around long enough that the gotchas are well-documented.

For BookUp's multi-tenant billing, the wallet ledger, the scheduling system — all Postgres. No second thoughts.

\`\`\`sql
-- Postgres doing multi-tenancy, JSONB metadata, and filtering in one query
SELECT b.id, b.starts_at, b.metadata->>'notes' AS notes
FROM bookings b
WHERE b.tenant_id = $1
  AND b.starts_at > now()
ORDER BY b.starts_at;
\`\`\`

## NestJS is opinionated in the right ways

I've built APIs in Express, Fastify, Hono, and NestJS. Express and Fastify are great for small things. As projects grow, you end up building your own conventions — dependency injection, module structure, guard/middleware patterns.

NestJS has all of that built in. It's heavier, but when I'm joining a project or bringing someone else onto one, the conventions are already there. The DI system means I can test service logic without spinning up a database. The decorator-based guards mean auth is impossible to forget on a controller.

The criticism is that it's "too Angular-y" or "too enterprise." I don't disagree with that framing, honestly. But I'm not building toy apps.

## The reliability argument

Here's the thing about boring tech: it fails in boring ways. When Postgres has a problem, there's a StackOverflow answer. When a new database has a problem, you're reading the GitHub issues from three weeks ago trying to figure out if it's a known bug.

I've been burned twice by choosing cutting-edge persistence layers early in projects. Both times, I spent more time working around limitations than building features. Both times, I ended up migrating to Postgres anyway.

The hype cycle is real. Technologies that are "the future of databases" in year one often have caveats that only appear in year two when your data grows.

## When I do reach for something different

There are times I reach outside the boring stack. Queues: I use BullMQ on Redis because job processing genuinely needs it. Real-time: WebSockets when needed (and I built noServer to understand the protocol). Search: if the app's primary use case is search, Elasticsearch or Typesense makes sense. LLM integration: obviously not Postgres.

The pattern: I add something new when there's a specific need that the boring stack genuinely can't handle well. Not because it's interesting, not because it's on the trending repos list.

Boring isn't the same as simple. Postgres is sophisticated. NestJS is complex. But they're battle-tested, and their complexity is documented. That matters more than novelty when you're shipping real things.`,

      uz: `## Nima demasliyotganimni aniqlashtirmoqchiman

Yangi texnologiya yomon yoki hech qachon hech narsa sinab ko'rmasligingiz kerak demayapman. Yangi ma'lumotlar bazalarini ishlatganman, edge runtime-larni sinab ko'rganman, hamma narsani osonlashtirish va'da qiladigan ORM-lar bilan tajriba o'tkazganman. Ba'zilari haqiqatan qiziqarli.

Ammo bir necha yil real mahsulotlar yetkazib berganidan keyin — BookUp, InterRail ERP, mijozlar uchun loyihalar — men doim bir joyga qaytaman: Postgres, NestJS, TypeScript, keshlash va navbatlar uchun Redis. Deyarli bir xil stack.

Mana nima uchun men bu bilan tinch.

## Postgres hamma narsani qiladi

Bu so'zma-so'z. Postgres quyidagilarni hal qiladi:

- Foreign key va join-larli relatsion ma'lumotlar (albatta)
- Moslashuvchan sxema kerak bo'lganda JSON va JSONB ustunlari
- Ko'pchilik ilovalar uchun yetarli to'liq matnli qidiruv
- PostGIS orqali geofazoviy so'rovlar
- Ko'p ijarachilik uchun qator darajasidagi xavfsizlik

Har safar "X uchun alohida ma'lumotlar bazasi kerak bo'lsa kerak" deb o'ylaganimda, halol javob "yo'q, Postgres X ni qila oladi" bo'lgan. Bir ma'lumotlar bazasini boshqarish narxi uchtasini boshqarishdan ancha past.

\`\`\`sql
-- Bitta so'rovda ko'p ijarachilik, JSONB metadata va filtrlash
SELECT b.id, b.starts_at, b.metadata->>'notes' AS notes
FROM bookings b
WHERE b.tenant_id = $1
  AND b.starts_at > now()
ORDER BY b.starts_at;
\`\`\`

## NestJS to'g'ri yo'lda qat'iyatli

Express, Fastify, Hono va NestJS-da API-lar qurdim. Express va Fastify kichik narsalar uchun ajoyib. Loyihalar o'sib borsa, o'z konventsiyalaringizni qurishga to'g'ri keladi — dependency injection, modul tuzilishi, guard/middleware naqshlari.

NestJS-da bularning barchasi o'rnatilgan. Og'irroq, ammo loyihaga qo'shilayotganda yoki kimnidir u yerga olib kelganda, konventsiyalar allaqachon tayyor. DI tizimi ma'lumotlar bazasini ishga tushirmasdan service mantiqini sinab ko'rish imkonini beradi.

## Ishonchlilik dalili

Mana zerikarli texnologiya haqidagi gap: u zerikarli yo'llar bilan ishdan chiqadi. Postgres muammosi bo'lsa, StackOverflow javobi bor. Yangi ma'lumotlar bazasining muammosi bo'lsa, uch hafta oldingi GitHub masalalarini o'qib, bu ma'lum xato ekanligini aniqlashga harakat qilasiz.

Loyihalarda erta keskin saqlash qatlamlarini tanlash natijasida ikki marta kuyganman. Har safar xususiyatlarni qurishdan ko'ra cheklovlar atrofida ishlashga ko'proq vaqt sarfladim.

## Qachon boshqa narsaga murojaat qilaman

Navbatlar: BullMQ Redis-da ishlataman. Real-vaqt: kerak bo'lganda WebSocket-lar. Qidiruv: ilovaning asosiy foydalanish holati qidiruv bo'lsa, Elasticsearch mantiqiy. LLM integratsiyasi: albatta Postgres emas.

Naqsh: zerikarli stack haqiqatan yaxshi boshqara olmaydigan muayyan ehtiyoj bo'lganida yangi narsa qo'shaman. Qiziqarliligi yoki trending repo ro'yxatida bo'lganligi uchun emas.

Zerikarli oddiy bilan bir xil emas. Postgres murakkab. NestJS murakkab. Ammo ular sinovdan o'tgan va ularning murakkabligi hujjatlashtirilgan.`,

      ru: `## Сразу оговорюсь о том, чего я не говорю

Я не говорю, что новые технологии плохие или что никогда не стоит ничего пробовать. Я использовал новые базы данных, играл с edge-рантаймами, экспериментировал с ORM, которые обещают упростить всё. Часть из этого реально интересна.

Но после нескольких лет поставки реальных продуктов — BookUp, ERP InterRail, проекты для клиентов — я снова и снова прихожу в одно место: Postgres, NestJS, TypeScript, Redis для кэширования и очередей. Примерно один и тот же стек.

Вот почему я с этим в мире.

## Postgres делает всё

Я имею в виду буквально. Postgres обрабатывает:

- Реляционные данные с внешними ключами и джойнами (очевидно)
- JSON и JSONB столбцы когда нужна гибкая схема
- Полнотекстовый поиск, достаточно хороший для большинства приложений
- Геопространственные запросы через PostGIS
- Row-level security для мультитенантности

Каждый раз, когда я думал "может, нужна отдельная база для X", честный ответ был "нет, Postgres может X." Стоимость управления одной базой данных намного ниже, чем тремя.

\`\`\`sql
-- Postgres: мультитенантность, метаданные JSONB и фильтрация в одном запросе
SELECT b.id, b.starts_at, b.metadata->>'notes' AS notes
FROM bookings b
WHERE b.tenant_id = $1
  AND b.starts_at > now()
ORDER BY b.starts_at;
\`\`\`

## NestJS упрямый в правильных местах

Я строил API на Express, Fastify, Hono и NestJS. Express и Fastify отлично подходят для небольшого. По мере роста проектов приходится строить свои конвенции — dependency injection, структуру модулей, паттерны guard/middleware.

В NestJS всё это встроено. Тяжелее, но когда присоединяешься к проекту или вводишь кого-то, конвенции уже есть. DI-система позволяет тестировать логику сервиса без запуска базы данных.

## Аргумент надёжности

Вот в чём дело со скучными технологиями: они ломаются скучными способами. Когда у Postgres проблема, есть ответ на StackOverflow. Когда у новой базы данных проблема, вы читаете GitHub issues трёхнедельной давности.

Меня дважды обжигал выбор передовых слоёв хранения в начале проектов. Оба раза я тратил больше времени на обходные пути, чем на создание функций.

## Когда я всё же тянусь к чему-то другому

Очереди: использую BullMQ на Redis. Реальное время: WebSocket когда нужно. Поиск: если основной сценарий приложения — поиск, Elasticsearch имеет смысл.

Паттерн: добавляю что-то новое, когда есть конкретная потребность, которую скучный стек реально не может хорошо закрыть. Не потому что интересно, не потому что это в тренде.

Скучное — не то же самое, что простое. Postgres сложен. NestJS сложен. Но они проверены боем, и их сложность задокументирована. Это важнее новизны, когда поставляешь реальные вещи.`,
    },
  },
  {
    slug: "designing-multi-tenant-saas",
    gradient: "linear-gradient(135deg, #5b6cff 0%, #a855f7 50%, #ec4899 100%)",
    date: "2025-10-30",
    tags: ["SaaS", "Architecture", "Multi-tenancy", "Next.js"],
    readingMinutes: 6,
    title: {
      en: "Multi-tenant SaaS: what I actually had to figure out",
      uz: "Ko'p ijarali SaaS: men haqiqatan nima bilan shug'ullanishim kerak edi",
      ru: "Мультитенантный SaaS: что мне на самом деле пришлось разобрать",
    },
    excerpt: {
      en: "BookUp started because I was annoyed. Barbershops and salons running bookings out of Telegram DMs and a paper notebook. I built the thing I wished they had — and here's the messy part nobody talks about: the multi-tenancy.",
      uz: "BookUp mening jizzat chiqishimdan boshlandi. Sartaroshxonalar va salonlar Telegram DM va qog'oz daftardan bron yuritmoqda. Men ularda bo'lishini xohlagan narsani qurdim — va mana hech kim gapirmaydigan murakkab qism: ko'p ijarachilik.",
      ru: "BookUp начался потому что меня это раздражало. Барбершопы и салоны ведут бронирования через Telegram DM и бумажный блокнот. Я построил то, что хотел бы у них видеть — и вот запутанная часть, о которой никто не говорит: мультитенантность.",
    },
    content: {
      en: `## BookUp started because I was annoyed

Every barbershop and salon around here runs bookings out of Telegram DMs and a paper notebook. It works until it really doesn't — double bookings, missed appointments, no way to see your week at a glance. So I built the thing I wished they had.

The business idea is simple: one platform, many businesses. Each business gets its own booking page, its own schedule, its own client list. Customers book without creating an account. Businesses manage everything from a dashboard.

The tricky engineering part is making "each business gets their own space" feel real. That's multi-tenancy, and here's what it actually involves.

## Subdomains: the part the customer sees

When a customer books at Mustafa's barbershop, they go to \`mustafa.bookup.uz\`. Not \`bookup.uz/businesses/mustafa\` — that URL says "you're renting space in someone else's app." A subdomain says "this is Mustafa's place."

In Next.js this runs in middleware. Every request comes in, I read the host header, strip the base domain, and get the tenant slug. Then I rewrite the URL to carry that slug as a route segment internally.

\`\`\`ts
// middleware.ts
const host = req.headers.get('host') ?? '';
const slug = host.replace('.bookup.uz', '');
if (slug && slug !== 'www') {
  return NextResponse.rewrite(
    new URL(\`/t/\${slug}\${req.nextUrl.pathname}\`, req.url)
  );
}
\`\`\`

The nice thing: wildcard DNS handles this for free. One DNS record, every subdomain routes to the same server. When a new business signs up and picks a slug, they're live instantly — no infrastructure work, no waiting.

## Data isolation: the part that bites you

One database, shared tables, every tenant row has a \`tenant_id\` column. This is the standard approach and it's the right call at this scale — one migration to run instead of N, simpler backups, simpler monitoring.

The part that bites you if you're not careful: you forget to add the tenant filter somewhere. You build a "recent bookings" query, it works great in dev with one tenant's data, and then in production you're accidentally showing one business's bookings to another business's dashboard.

My fix: I put the tenant context into the NestJS request scope and inject it into every service. The service layer can't make a query without knowing which tenant it's working for. It's not perfect but it catches the obvious mistakes.

\`\`\`ts
// Every service gets the tenant from context, not from caller
@Injectable()
export class BookingsService {
  constructor(
    private readonly db: DatabaseService,
    @Inject(REQUEST) private readonly request: TenantRequest,
  ) {}

  async getUpcoming() {
    return this.db.bookings.findMany({
      where: { tenant_id: this.request.tenantId, starts_at: { gt: new Date() } }
    });
  }
}
\`\`\`

What I wish I'd done from day one: enforce this at the module level, not the service level. I spent a couple of weeks refactoring code that had grown tenant-agnostic query helpers before I caught the pattern.

## Onboarding: don't leave people in an empty room

New tenant signs up, picks their slug, lands on their dashboard. Empty schedule. No services listed. No staff. The worst thing you can do is show them a blank screen with a "Get started" button.

What I did instead: create three sample services and a placeholder staff member automatically. The tenant sees what their booking page looks like with data in it. They can delete the samples, but the first impression is "oh, this is what it does" instead of "where do I even begin."

Small thing, made a big difference in how many tenants actually set up their account after registering.

## What I'd tell my past self

The tenant ID needs to live in your auth token, your request context, and your query builder from day one. Retrofitting it is a weekend of annoying work.

Subdomains beat path prefixes. The URL communicates ownership, and ownership makes the product feel premium for zero extra engineering.

The onboarding empty state is the first real user experience. Invest there early.`,

      uz: `## BookUp mening jizzat chiqishimdan boshlandi

Bu atrofdagi har bir sartaroshxona va salon Telegram DM va qog'oz daftardan bron yuritadi. Bu ishlaydi, keyin haqiqatan ishlamay qoladi — qo'shaloq bronlar, o'tkazib yuborilgan uchrashuv, haftangizni bir qarashda ko'rish imkoni yo'q. Shuning uchun men ularda bo'lishini xohlagan narsani qurdim.

Biznes g'oyasi oddiy: bitta platforma, ko'p bizneslar. Har bir biznes o'zining bron sahifasini, o'z jadvalini, o'z mijozlar ro'yxatini oladi.

Qiyin muhandislik qismi — "har bir biznes o'z maydoniga ega" degan hissiyotni haqiqiy qilish. Bu ko'p ijarachilik va mana u aslida nimani o'z ichiga oladi.

## Subdomainlar: mijoz ko'radigan qism

Mijoz Mustafaning sartaroshxonasida bron qilganida, \`mustafa.bookup.uz\`-ga boradi. \`bookup.uz/businesses/mustafa\` emas — bu URL "siz boshqa birovning ilovasida joy ijaralayapsiz" deydi. Subdomain esa "bu Mustafaning joyi" deydi.

Next.js-da bu middleware-da ishlaydi. Har bir so'rov keladi, host sarlavhasini o'qiyman, asosiy domenni kesib tashlayman va ijarachi slugini olaman.

\`\`\`ts
// middleware.ts
const host = req.headers.get('host') ?? '';
const slug = host.replace('.bookup.uz', '');
if (slug && slug !== 'www') {
  return NextResponse.rewrite(
    new URL(\`/t/\${slug}\${req.nextUrl.pathname}\`, req.url)
  );
}
\`\`\`

Yoqimli narsa: joker DNS buni bepul hal qiladi. Bitta DNS yozuvi, har bir subdomain bir xil serverga yo'naladi. Yangi biznes ro'yxatdan o'tib, slug tanlasa — darhol ishlaydi.

## Ma'lumotlarni izolyatsiya qilish: sizni tishlagan qism

Bitta ma'lumotlar bazasi, umumiy jadvallar, har bir ijarachi qatorida \`tenant_id\` ustuni bor. Bu standart yondashuv.

Ehtiyot bo'lmasangiz sizni tishlagan qism: biror joyda tenant filtrini qo'shishni unutasiz. "So'nggi bronlar" so'rovi quraysiz, dev-da bitta ijarachi ma'lumotlari bilan ajoyib ishlaydi, keyin production-da siz beixtiyor bir biznesning bronlarini boshqa biznesning boshqaruv paneliga ko'rsatmoqdasiz.

\`\`\`ts
@Injectable()
export class BookingsService {
  constructor(
    private readonly db: DatabaseService,
    @Inject(REQUEST) private readonly request: TenantRequest,
  ) {}

  async getUpcoming() {
    return this.db.bookings.findMany({
      where: { tenant_id: this.request.tenantId, starts_at: { gt: new Date() } }
    });
  }
}
\`\`\`

Birinchi kundan qilishni xohlagan narsam: buni xizmat darajasida emas, modul darajasida qo'llash. Men naqshni sezmagunicha ijarachi neytral so'rov yordamchilariga aylangan kodni qayta ishlashga bir necha hafta sarfladim.

## Onboarding: odamlarni bo'sh xonada qoldirmang

Yangi ijarachi ro'yxatdan o'tadi, slug tanlaydi, boshqaruv paneliga tushadi. Bo'sh jadval. Xizmatlar yo'q. Xodimlar yo'q.

Men nima qildim: avtomatik ravishda uchta namuna xizmati va zahira xodimni yaratdim. Ijarachi bron sahifasining ma'lumotlar bilan qanday ko'rinishini ko'radi. Namunalarni o'chirishi mumkin, ammo birinchi taassurot "oh, u shunday qiladi" bo'ladi, "qayerdan boshlayman" emas.

## O'zimga nima derdim

Ijarachi ID autentifikatsiya tokeningizda, so'rov kontekstingizda va so'rov quruvchingizda birinchi kundan bo'lishi kerak.

Subdomainlar yo'l prefikslaridan ustun. URL egalikni ifodalaydi va egalik mahsulotni hech qanday qo'shimcha muhandislik uchun premium his ettiradi.

Onboarding bo'sh holati birinchi haqiqiy foydalanuvchi tajribasidir. Erta o'sha yerga sarmoya kiriting.`,

      ru: `## BookUp начался потому что меня это раздражало

Каждый барбершоп и салон здесь ведёт бронирования через Telegram DM и бумажный блокнот. Работает, пока не перестаёт — двойные брони, пропущенные записи, невозможность видеть свою неделю одним взглядом. Так что я построил то, что хотел бы у них видеть.

Бизнес-идея простая: одна платформа, много бизнесов. Каждый бизнес получает собственную страницу бронирования, собственное расписание, собственный список клиентов.

Сложная инженерная часть — сделать "каждый бизнес получает своё пространство" настоящим. Это мультитенантность, и вот что она на самом деле включает.

## Поддомены: то, что видит клиент

Когда клиент бронирует в барбершопе Мустафы, он идёт на \`mustafa.bookup.uz\`. Не на \`bookup.uz/businesses/mustafa\` — этот URL говорит "вы снимаете место в чужом приложении." Поддомен говорит "это место Мустафы."

В Next.js это работает в middleware. Каждый запрос приходит, читаю заголовок host, отрезаю базовый домен, получаю слаг тенанта.

\`\`\`ts
// middleware.ts
const host = req.headers.get('host') ?? '';
const slug = host.replace('.bookup.uz', '');
if (slug && slug !== 'www') {
  return NextResponse.rewrite(
    new URL(\`/t/\${slug}\${req.nextUrl.pathname}\`, req.url)
  );
}
\`\`\`

Приятное: wildcard DNS решает это бесплатно. Одна DNS-запись, каждый поддомен идёт на тот же сервер. Когда новый бизнес регистрируется — он сразу в сети.

## Изоляция данных: та часть, которая кусает

Одна база данных, общие таблицы, в каждой строке тенанта есть столбец \`tenant_id\`. Это стандартный подход.

Часть, которая кусает, если не осторожен: вы где-то забываете добавить фильтр по тенанту. Строите запрос "последние брони", он отлично работает в dev с данными одного тенанта, а в production вы случайно показываете брони одного бизнеса на дашборде другого.

\`\`\`ts
@Injectable()
export class BookingsService {
  constructor(
    private readonly db: DatabaseService,
    @Inject(REQUEST) private readonly request: TenantRequest,
  ) {}

  async getUpcoming() {
    return this.db.bookings.findMany({
      where: { tenant_id: this.request.tenantId, starts_at: { gt: new Date() } }
    });
  }
}
\`\`\`

Что хотел бы сделать с первого дня: применять это на уровне модуля, а не сервиса.

## Онбординг: не оставляйте людей в пустой комнате

Новый тенант регистрируется, выбирает слаг, попадает на дашборд. Пустое расписание. Нет услуг. Нет персонала.

Что я сделал: автоматически создаю три примерные услуги и заполнителя сотрудника. Тенант видит, как выглядит его страница бронирования с данными. Может удалить примеры, но первое впечатление — "о, вот как это работает", а не "с чего вообще начать."

## Что бы сказал себе раньше

ID тенанта должен быть в токене аутентификации, контексте запроса и конструкторе запросов с первого дня.

Поддомены лучше путевых префиксов. URL транслирует владение, а владение делает продукт ощущаться премиальным.

Пустое состояние онбординга — первый реальный опыт пользователя. Инвестируйте туда рано.`,
    },
  },
  {
    slug: "prepaid-wallet-billing-with-payme",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    date: "2025-09-18",
    tags: ["Payments", "Billing", "Payme", "NestJS"],
    readingMinutes: 5,
    title: {
      en: "Modeling money as a ledger (and why I had to rewrite billing twice)",
      uz: "Pulni registr sifatida modellashtirish (va nima uchun billing-ni ikki marta qayta yozishim kerak bo'ldi)",
      ru: "Моделирование денег как журнала (и почему мне пришлось переписывать биллинг дважды)",
    },
    excerpt: {
      en: "The first billing system I built for BookUp lasted two weeks before the support messages started. Here's what I got wrong, how I fixed it, and what I now know about integrating Payme in a multi-tenant app.",
      uz: "BookUp uchun qurgan birinchi billing tizimim qo'llab-quvvatlash xabarlari kelishdan oldin ikki hafta davom etdi. Mana men nima xato qildim, qanday to'g'irladim va hozir ko'p ijarali ilovada Payme integratsiyasi haqida nima bilaman.",
      ru: "Первая система биллинга, которую я построил для BookUp, продержалась две недели до первых обращений в поддержку. Вот что я сделал неправильно, как исправил, и что теперь знаю об интеграции Payme в мультитенантном приложении.",
    },
    content: {
      en: `## What the first version looked like

Honestly, it was embarrassing. A \`subscription_active\` boolean on the tenant record. A cron job that flipped it to \`false\` at the end of the month if payment hadn't come in. A separate "top up" endpoint that called the Payme API.

It worked fine for the first two weeks. Then the support messages started: "I topped up but my account is still locked." "Why was I charged twice?" "My subscription ran out mid-month even though I had credit."

The root problem was simple: I was treating money as a state (\`active\` / \`inactive\`), when money is actually a history of events. You can't reconstruct what happened from a boolean. When something goes wrong, you have no audit trail.

## Money is a ledger

The fix: stop storing balances, start storing movements.

Every time money touches the system, it becomes a row in \`wallet_transactions\`. The row has a type, a signed amount (positive = credit, negative = debit), a reference ID, and a timestamp. Nothing else.

Types I use:

- \`top_up\` — Payme payment credited to the wallet
- \`subscription_fee\` — monthly auto-deduction
- \`refund\` — manual credit from support
- \`adjustment\` — rare manual correction

The balance at any point is just a SUM query:

\`\`\`sql
SELECT SUM(amount) AS balance
FROM wallet_transactions
WHERE tenant_id = $1;
\`\`\`

That's it. One query, always accurate, impossible to drift out of sync because there's nothing to sync — the balance is derived on demand.

When a support ticket comes in now, I can run:

\`\`\`sql
SELECT type, amount, reference, created_at
FROM wallet_transactions
WHERE tenant_id = $1
ORDER BY created_at DESC;
\`\`\`

And immediately see exactly what happened. This alone was worth the rewrite.

## Integrating Payme

Payme is the dominant payment processor in Uzbekistan. The flow is callback-based: you expose a JSON-RPC endpoint, Payme calls it when payment state changes.

The one thing you must get right: **idempotency**. Payme will retry callbacks. If your handler isn't idempotent, you'll double-credit accounts.

My handler for \`PerformTransaction\`:

1. Check if a \`top_up\` row with \`payme_transaction_id = X\` already exists
2. If yes → return success, don't write anything
3. If no → insert the row in a DB transaction, return success

The check-then-insert is wrapped in a database transaction. No race conditions, no duplicates.

\`\`\`ts
async performTransaction(params: PaymeParams) {
  return this.db.$transaction(async (tx) => {
    const existing = await tx.walletTransaction.findFirst({
      where: { reference: params.id, type: 'top_up' }
    });
    if (existing) return { result: { transaction: existing.id } };

    const txn = await tx.walletTransaction.create({
      data: {
        tenant_id: params.account.tenant_id,
        type: 'top_up',
        amount: params.amount / 100, // Payme sends tiyin
        reference: params.id,
      }
    });
    return { result: { transaction: txn.id } };
  });
}
\`\`\`

## The subscription auto-deduction

First of each month, a NestJS cron runs and charges every active tenant. The logic:

1. Read current balance (the SUM)
2. If balance ≥ fee: insert a negative \`subscription_fee\` transaction
3. If balance < fee: set \`payment_overdue = true\`, queue a notification

No money leaves the system — this is a prepaid ledger. The tenant loaded credit in advance; we just move it from "available" to "used."

## Edge cases I learned the hard way

**Concurrent writes.** If a top-up and a deduction both read the balance at the same time and it's 0, both might proceed in a way that creates a negative balance. Solution: \`SELECT FOR UPDATE\` on the wallet when you need to check-and-debit atomically.

**Timezone.** "First of the month" means first of the month in Tashkent (UTC+5). I got this wrong once. The billing job ran at 8 PM on January 31st for some users. Store the timezone, run the job in it.

**Partial job failure.** If the cron charges 400 out of 500 tenants and crashes, a naive restart will charge some tenants twice. Process in idempotent batches — track which tenant/billing-period combos have been charged in a separate table.

Billing is boring until it isn't. Model money as events, write idempotency checks before the happy path, and you'll sleep better when Payme retries at 3 AM.`,

      uz: `## Birinchi versiya qanday ko'ringan edi

Halol aytganda, uyatli edi. Ijarachi yozuvida \`subscription_active\` mantiqiy qiymati. Oyning oxirida to'lov kelmagan bo'lsa uni \`false\`-ga o'zgartiradigan cron ishi.

Birinchi ikki hafta yaxshi ishladi. Keyin qo'llab-quvvatlash xabarlari boshlandi: "To'ldirdim lekin hisobim hali ham bloklangan." "Nima uchun ikki marta to'lov oldingiz?"

Asosiy muammo oddiy edi: men pulni holat (\`faol\` / \`nofaol\`) sifatida ko'rib chiqardim, aslida pul voqealar tarixi. Mantiqiy qiymatdan nima bo'lganini qayta qurib bo'lmaydi.

## Pul — bu registr

Yechim: qoldiqlarni saqlashni to'xtatib, harakatlarni saqlashni boshlash.

Pul tizimga har safar tegsa, \`wallet_transactions\`-da qatorga aylanadi. Qatorda tur, imzolangan miqdor (ijobiy = kredit, manfiy = debet), havola ID va vaqt belgisi bor.

Men ishlatiladigan turlar:

- \`top_up\` — Payme to'lovi hamyonga kreditlangan
- \`subscription_fee\` — oylik avtomatik ayirish
- \`refund\` — qo'llab-quvvatdan qo'lda kredit
- \`adjustment\` — kamdan-kam qo'lda tuzatish

Istalgan vaqtdagi qoldiq shunchaki SUM so'rovidir:

\`\`\`sql
SELECT SUM(amount) AS balance
FROM wallet_transactions
WHERE tenant_id = $1;
\`\`\`

Bu hammasi. Bitta so'rov, har doim aniq, sinxronlashdan chiqib keta olmaydi — chunki sinxronlash kerak bo'lgan narsa yo'q.

## Payme integratsiyasi

Payme Callback-asosidagi oqimdan foydalanadi. Siz JSON-RPC endpoint-ni ochasiz, Payme to'lov holati o'zgarganda uni chaqiradi.

To'g'ri bajarish kerak bo'lgan bitta narsa: **idempotentlik**. Payme callbacklarni qayta urinadi.

\`PerformTransaction\` uchun ishlovchim:

1. \`payme_transaction_id = X\` bilan \`top_up\` qatori mavjudligini tekshiring
2. Ha bo'lsa → muvaffaqiyat qaytaring, hech narsa yozmang
3. Yo'q bo'lsa → DB tranzaksiyasida qatorni kiriting, muvaffaqiyat qaytaring

\`\`\`ts
async performTransaction(params: PaymeParams) {
  return this.db.$transaction(async (tx) => {
    const existing = await tx.walletTransaction.findFirst({
      where: { reference: params.id, type: 'top_up' }
    });
    if (existing) return { result: { transaction: existing.id } };

    const txn = await tx.walletTransaction.create({
      data: {
        tenant_id: params.account.tenant_id,
        type: 'top_up',
        amount: params.amount / 100,
        reference: params.id,
      }
    });
    return { result: { transaction: txn.id } };
  });
}
\`\`\`

## Obuna avtomatik ayirish

Har oyning birinchisi NestJS cron har faol ijarachini to'lashga harakat qiladi:

1. Joriy qoldiqni o'qing (SUM)
2. Qoldiq ≥ to'lov bo'lsa: manfiy \`subscription_fee\` tranzaksiyasini kiriting
3. Qoldiq < to'lov bo'lsa: \`payment_overdue = true\` qo'ying, bildirishnomani navbatga qo'ying

## Qiyin yo'l bilan o'rgangan chekka holatlar

**Bir vaqtda yozishlar.** Agar to'ldirish va ayirish ikkalasi ham bir vaqtda qoldiqni o'qib, u 0 bo'lsa, ikkalasi ham salbiy qoldiq yaratuvchi tarzda davom etishi mumkin. Yechim: atomik tekshirish-debet kerak bo'lganda \`SELECT FOR UPDATE\`.

**Vaqt mintaqasi.** "Oyning birinchisi" Toshkentda (UTC+5) oyning birinchisini anglatadi. Bu xatoni bir marta qildim.

**Qisman ish muvaffaqiyatsizligi.** Cron 500 ta ijarachidan 400 tasini to'lov qilib qulasa, sodda restart ba'zi ijarachilardan ikki marta to'lov oladi. Idempotent paketlarda qayta ishlang.

Billing zerikarli, keyin emas. Pulni voqealar sifatida modellashtiring, idempotentlik tekshiruvlarini baxtli yo'ldan oldin yozing.`,

      ru: `## Как выглядела первая версия

Честно — было стыдно. Булево поле \`subscription_active\` в записи тенанта. Крон-задание, которое переключало его в \`false\` в конце месяца, если платёж не поступил.

Первые две недели всё работало. Потом начались обращения в поддержку: "Я пополнил, но аккаунт всё ещё заблокирован." "Почему списали дважды?"

Корневая проблема была проста: я относился к деньгам как к состоянию (\`активный\`/\`неактивный\`), тогда как деньги — это история событий. Из булева нельзя воссоздать, что произошло.

## Деньги — это журнал

Решение: перестать хранить балансы, начать хранить движения.

Каждый раз, когда деньги касаются системы, это строка в \`wallet_transactions\`. Строка имеет тип, знаковую сумму (положительная = кредит, отрицательная = дебет), ID ссылки и временную метку.

Типы, которые я использую:

- \`top_up\` — платёж Payme, зачисленный на кошелёк
- \`subscription_fee\` — ежемесячное автоматическое списание
- \`refund\` — ручной кредит от поддержки
- \`adjustment\` — редкая ручная корректировка

Баланс в любой момент — просто SUM-запрос:

\`\`\`sql
SELECT SUM(amount) AS balance
FROM wallet_transactions
WHERE tenant_id = $1;
\`\`\`

Один запрос, всегда точный, не может рассинхронизироваться — синхронизировать нечего.

## Интеграция Payme

Payme работает на колбэках: вы открываете JSON-RPC-эндпоинт, Payme вызывает его при изменении состояния платежа.

Единственное, что нужно сделать правильно: **идемпотентность**. Payme будет повторять колбэки.

Мой обработчик \`PerformTransaction\`:

1. Проверяю, существует ли строка \`top_up\` с \`payme_transaction_id = X\`
2. Если да → возвращаю успех, ничего не пишу
3. Если нет → вставляю строку в DB-транзакции, возвращаю успех

\`\`\`ts
async performTransaction(params: PaymeParams) {
  return this.db.$transaction(async (tx) => {
    const existing = await tx.walletTransaction.findFirst({
      where: { reference: params.id, type: 'top_up' }
    });
    if (existing) return { result: { transaction: existing.id } };

    const txn = await tx.walletTransaction.create({
      data: {
        tenant_id: params.account.tenant_id,
        type: 'top_up',
        amount: params.amount / 100,
        reference: params.id,
      }
    });
    return { result: { transaction: txn.id } };
  });
}
\`\`\`

## Автоматическое списание подписки

Первого числа каждого месяца NestJS cron пытается списать у каждого активного тенанта:

1. Читаю текущий баланс (SUM)
2. Если баланс ≥ комиссии: вставляю отрицательную транзакцию \`subscription_fee\`
3. Если баланс < комиссии: ставлю \`payment_overdue = true\`, отправляю уведомление в очередь

## Граничные случаи, усвоенные на своих ошибках

**Конкурентная запись.** Если пополнение и списание одновременно читают баланс 0, оба могут создать отрицательный баланс. Решение: \`SELECT FOR UPDATE\` при атомарной проверке и дебете.

**Часовой пояс.** "Первое число месяца" означает первое в Ташкенте (UTC+5). Однажды ошибся. Биллинг запустился в 8 вечера 31 января для некоторых пользователей.

**Частичный сбой задания.** Если cron зарядит 400 из 500 тенантов и упадёт, наивный перезапуск снова зарядит часть. Обрабатывайте идемпотентными пакетами.

Биллинг скучный, пока не перестаёт быть. Моделируйте деньги как события, пишите проверки идемпотентности до счастливого пути.`,
    },
  },
  {
    slug: "zero-dependency-websocket-server",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #6366f1 100%)",
    date: "2025-08-05",
    tags: ["Node.js", "WebSocket", "Networking", "From scratch"],
    readingMinutes: 7,
    title: {
      en: "I built a WebSocket server from raw TCP to actually understand it",
      uz: "Men uni haqiqatan tushunish uchun xom TCP-dan WebSocket serverni qurdim",
      ru: "Я построил WebSocket-сервер из сырого TCP, чтобы по-настоящему его понять",
    },
    excerpt: {
      en: "I'd been using WebSockets for years without really knowing what was happening under the hood. So I built one from scratch on raw TCP sockets — RFC 6455 handshake, frame parsing, masking, the whole thing. Here's what I learned.",
      uz: "Men yillar davomida nima bo'layotganini bilmagan holda WebSocket-lardan foydalanardim. Shuning uchun xom TCP soketlarida noldan bittasini qurdim — RFC 6455 handshake, kadr tahlili, masking, hammasi. Mana nima o'rgandim.",
      ru: "Я годами использовал WebSocket, не понимая, что происходит под капотом. Поэтому построил его с нуля на сырых TCP-сокетах — рукопожатие RFC 6455, разбор фреймов, маскирование, всё. Вот что узнал.",
    },
    content: {
      en: `## Why build something that already exists?

Honest answer: because I'd been using WebSockets for years and I still couldn't answer "what actually is a frame?" or "why does masking exist?" I knew the browser API. I knew how to wire up socket.io. I had zero understanding of what was happening between the client and the server.

So I built noServer: a zero-dependency Node.js HTTP and WebSocket server on raw TCP. No express, no ws library, no socket.io — just Node's \`net\` module and the RFC.

\`\`\`bash
node server.js
# Listening on :3000
# GET / → 200
# GET /ws → 101 Switching Protocols
\`\`\`

Here's what I actually learned by doing it.

## Raw TCP is where you start

Node's \`net.createServer()\` gives you a socket for each connection. That socket is bytes in, bytes out. No protocol, no framing — just a stream.

\`\`\`ts
import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (chunk: Buffer) => {
    // Raw bytes. Could be HTTP. Could be WebSocket. Could be anything.
  });
});

server.listen(3000);
\`\`\`

First task: parse the incoming bytes as HTTP to figure out if this is a regular request or an upgrade request. WebSocket starts with a normal HTTP GET that has specific headers. You're basically writing a minimal HTTP parser — read until you hit \`\r\n\r\n\`, then extract headers.

## The handshake

Here's what the client sends to upgrade to WebSocket:

\`\`\`
GET /ws HTTP/1.1
Host: localhost:3000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
\`\`\`

Your server has to respond with \`101 Switching Protocols\`. The critical part is the \`Sec-WebSocket-Accept\` header, which is derived from the client's key.

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

The magic GUID is hardcoded in RFC 6455. Its only purpose is to prevent non-WebSocket servers from accidentally accepting upgrade requests — if a regular HTTP server echoed back the key, the SHA1+GUID combination wouldn't match.

After the 101 response, the connection is upgraded. No more HTTP. From here it's the WebSocket framing protocol.

## Frames: the actual protocol

A WebSocket message is broken into frames. Each frame has a binary header followed by a payload. This is the thing I had no model for before building it.

The header:

- **Byte 0**: bit 7 = FIN (is this the last frame of a message?), bits 0-3 = opcode. 0x1 = text frame, 0x2 = binary frame, 0x8 = close, 0x9 = ping, 0xA = pong.
- **Byte 1**: bit 7 = MASK flag, bits 0-6 = payload length (or 126 / 127 for extended).
- Then 0, 2, or 8 bytes of extended length.
- Then 4 bytes masking key (if masked).
- Then the payload.

Parsing this by hand means I now have this entire structure in my head. Reading the RFC was fine. Writing the parser made it permanent.

\`\`\`ts
function parseFrame(buffer: Buffer) {
  const fin = (buffer[0] & 0x80) !== 0;
  const opcode = buffer[0] & 0x0f;
  const masked = (buffer[1] & 0x80) !== 0;
  let payloadLen = buffer[1] & 0x7f;
  let offset = 2;

  if (payloadLen === 126) {
    payloadLen = buffer.readUInt16BE(offset);
    offset += 2;
  } else if (payloadLen === 127) {
    // 8-byte extended length (BigInt territory)
    offset += 8;
  }

  const mask = masked ? buffer.slice(offset, offset + 4) : null;
  if (masked) offset += 4;

  const payload = buffer.slice(offset, offset + payloadLen);
  return { fin, opcode, payload, mask };
}
\`\`\`

## Masking and why it exists

Client frames MUST be masked. Server frames MUST NOT be masked. This isn't optional.

Masking is XOR with a 4-byte key:

\`\`\`ts
function unmask(payload: Buffer, mask: Buffer): Buffer {
  const result = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    result[i] = payload[i] ^ mask[i % 4];
  }
  return result;
}
\`\`\`

It's not encryption. It's not security. Its entire purpose is preventing WebSocket frames from looking like valid HTTP to intermediate proxies that might cache or modify them. Masking randomises the bytes so a proxy can't misinterpret them as HTTP.

Before I built this I'd seen "masking" mentioned and assumed it was a security feature. It's not. It's a proxy-confusion prevention mechanism.

## Fragmentation

A message can span multiple frames. The FIN bit tells you if more frames are coming. If FIN is 0, buffer the payload and wait. If FIN is 1, concatenate everything you've buffered and emit the message.

Continuation frames have opcode 0. I got this wrong the first time and couldn't figure out why messages over a certain size were corrupted. Turned out I was treating the continuation frames as new messages because I forgot to check for opcode 0.

## What I know now

The \`ws\` library is about 2000 lines. After building noServer I understand what most of those lines are doing. I understand why ping/pong exists (keep-alive and dead connection detection), why the FIN bit exists (large message fragmentation), and why masking is client-only.

I'm still using \`ws\` in production. This wasn't about replacing libraries — it was about understanding them.

If you use WebSockets and you've never read RFC 6455, build a toy implementation. You'll understand the protocol in an afternoon in a way that no amount of documentation reading will give you.`,

      uz: `## Nima uchun allaqachon mavjud narsani qurish kerak?

Halol javob: chunki men yillar davomida WebSocket-lardan foydalanardim va hali ham "frame nima?" yoki "masking nima uchun mavjud?" ga javob bera olmardim.

Shuning uchun men noServer-ni qurdim: xom TCP-da noldan Node.js HTTP va WebSocket serveri. Express yo'q, ws kutubxonasi yo'q — faqat Node-ning \`net\` moduli va RFC.

\`\`\`bash
node server.js
# :3000-da tinglayapti
# GET / → 200
# GET /ws → 101 Switching Protocols
\`\`\`

## Xom TCP — boshlash joyi

Node-ning \`net.createServer()\` har bir ulanish uchun soket beradi. Bu soket kiruvchi baytlar, chiquvchi baytlar. Protokol yo'q, freymlash yo'q.

\`\`\`ts
import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (chunk: Buffer) => {
    // Xom baytlar. HTTP bo'lishi mumkin. WebSocket bo'lishi mumkin.
  });
});

server.listen(3000);
\`\`\`

Birinchi vazifa: bu oddiy so'rovmi yoki yangilash so'rovimi aniqlash uchun kiruvchi baytlarni HTTP sifatida tahlil qilish.

## Handshake

RFC 6455 sehrli GUID-ni belgilaydi: \`258EAFA5-E914-47DA-95CA-C5AB0DC85B11\`. Uning yagona maqsadi: oddiy HTTP serverlar tasodifan yangilash so'rovlarini qabul qilmasligi uchun.

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

101 javobidan keyin ulanish yangilangan. Endi HTTP yo'q. Bu yerdan WebSocket freymlash protokoli.

## Freymlar: haqiqiy protokol

WebSocket xabari freymlariga bo'linadi. Har bir freymda ikkilik sarlavha, keyin yuk bor.

\`\`\`ts
function parseFrame(buffer: Buffer) {
  const fin = (buffer[0] & 0x80) !== 0;
  const opcode = buffer[0] & 0x0f;
  const masked = (buffer[1] & 0x80) !== 0;
  let payloadLen = buffer[1] & 0x7f;
  let offset = 2;

  if (payloadLen === 126) {
    payloadLen = buffer.readUInt16BE(offset);
    offset += 2;
  }

  const mask = masked ? buffer.slice(offset, offset + 4) : null;
  if (masked) offset += 4;

  const payload = buffer.slice(offset, offset + payloadLen);
  return { fin, opcode, payload, mask };
}
\`\`\`

## Masking va nima uchun mavjud

Mijoz freymlariga masking LOZIM. Server freymlariga masking KERAK EMAS. Bu ixtiyoriy emas.

Masking 4 baytli kalit bilan XOR:

\`\`\`ts
function unmask(payload: Buffer, mask: Buffer): Buffer {
  const result = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    result[i] = payload[i] ^ mask[i % 4];
  }
  return result;
}
\`\`\`

Bu shifrlash emas. Bu xavfsizlik emas. Uning yagona maqsadi: WebSocket freymlarining HTTP kabi ko'rinishining oldini olish, proksi-serverlar ularni keshlash yoki o'zgartirmasligi uchun.

## Endi bilgan narsalarim

ws kutubxonasi taxminan 2000 qator. noServer qurganidan keyin, bu qatorlarning ko'pchiligi nima qilayotganini tushunaman. Nima uchun ping/pong mavjud (aloqani tirik saqlash va o'lik ulanishlarni aniqlash), nima uchun FIN biti mavjud (katta xabar parchalanishi) va nima uchun masking faqat mijozga tegishliligini tushunaman.

Men production-da hali ham \`ws\` ishlataman. Bu kutubxonalarni almashtirish haqida emas edi — ularni tushunish haqida edi.`,

      ru: `## Зачем строить то, что уже существует?

Честный ответ: потому что я годами использовал WebSocket и всё равно не мог ответить "что такое фрейм?" или "почему существует маскирование?" Я знал API браузера. Знал, как подключить socket.io. Нулевое понимание того, что происходит между клиентом и сервером.

Поэтому я построил noServer: Node.js HTTP и WebSocket сервер без зависимостей на сырых TCP. Без express, без ws, без socket.io — только \`net\`-модуль Node и RFC.

\`\`\`bash
node server.js
# Слушает на :3000
# GET / → 200
# GET /ws → 101 Switching Protocols
\`\`\`

## Сырой TCP — отправная точка

\`net.createServer()\` от Node даёт сокет для каждого соединения. Этот сокет — байты на входе, байты на выходе. Никакого протокола, никакой разбивки на фреймы.

\`\`\`ts
import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (chunk: Buffer) => {
    // Сырые байты. Может быть HTTP. Может быть WebSocket.
  });
});

server.listen(3000);
\`\`\`

## Рукопожатие

RFC 6455 определяет магический GUID: \`258EAFA5-E914-47DA-95CA-C5AB0DC85B11\`. Единственная цель: не дать обычным HTTP-серверам случайно принять upgrade-запросы.

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

После ответа 101 соединение обновлено. Больше нет HTTP. Дальше — протокол фреймов WebSocket.

## Фреймы: настоящий протокол

Сообщение WebSocket разбивается на фреймы. У каждого фрейма двоичный заголовок, затем полезная нагрузка.

\`\`\`ts
function parseFrame(buffer: Buffer) {
  const fin = (buffer[0] & 0x80) !== 0;
  const opcode = buffer[0] & 0x0f;
  const masked = (buffer[1] & 0x80) !== 0;
  let payloadLen = buffer[1] & 0x7f;
  let offset = 2;

  if (payloadLen === 126) {
    payloadLen = buffer.readUInt16BE(offset);
    offset += 2;
  }

  const mask = masked ? buffer.slice(offset, offset + 4) : null;
  if (masked) offset += 4;

  const payload = buffer.slice(offset, offset + payloadLen);
  return { fin, opcode, payload, mask };
}
\`\`\`

## Маскирование и почему оно существует

Фреймы клиента ДОЛЖНЫ быть маскированы. Фреймы сервера НЕ ДОЛЖНЫ быть маскированы. Это не опционально.

Маскирование — XOR с 4-байтным ключом:

\`\`\`ts
function unmask(payload: Buffer, mask: Buffer): Buffer {
  const result = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    result[i] = payload[i] ^ mask[i % 4];
  }
  return result;
}
\`\`\`

Это не шифрование. Не безопасность. Единственная цель — не дать фреймам WebSocket выглядеть как HTTP для промежуточных прокси.

## Что я теперь знаю

Библиотека \`ws\` — около 2000 строк. После построения noServer я понимаю, что делает большинство этих строк. Почему существует ping/pong, почему бит FIN, почему маскирование только на клиенте.

Я всё ещё использую \`ws\` в продакшне. Речь шла не о замене библиотек — о понимании.

Если вы используете WebSocket и никогда не читали RFC 6455, постройте игрушечную реализацию. Вы поймёте протокол за один день так, как не даст никакое количество чтения документации.`,
    },
  },
];

// URL-safe slug for a tag, e.g. "Claude Code" -> "claude-code".
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Unique tags across all posts, preserving their original display casing,
// sorted alphabetically.
export function allTags(): string[] {
  const bySlug = new Map<string, string>();
  for (const post of POSTS) {
    for (const tag of post.tags) bySlug.set(tagSlug(tag), tag);
  }
  return [...bySlug.values()].sort((a, b) => a.localeCompare(b));
}

// Resolve a tag slug back to its display label + matching posts (newest first).
export function postsForTagSlug(
  slug: string,
): { tag: string; posts: BlogPost[] } | null {
  const tag = allTags().find((t) => tagSlug(t) === slug);
  if (!tag) return null;
  const posts = POSTS.filter((p) => p.tags.some((t) => tagSlug(t) === slug)).sort(
    (a, b) => (a.date < b.date ? 1 : -1),
  );
  return { tag, posts };
}

// Other posts sharing the most tags with the given post (newest first).
export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = POSTS.find((p) => p.slug === slug);
  if (!current) return [];
  const tagSet = new Set(current.tags.map(tagSlug));
  return POSTS.filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => tagSet.has(tagSlug(t))).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.post);
}

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

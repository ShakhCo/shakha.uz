import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiVuedotjs,
  SiRemix,
  SiTailwindcss,
  SiZod,
  SiPinia,
  SiNestjs,
  SiFastapi,
  SiDjango,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiNginx,
  SiLinux,
  SiGithubactions,
  SiRabbitmq,
  SiPm2,
  SiTelegram,
  SiMeta,
  SiClaude,
} from "react-icons/si";
import {
  LuCode,
  LuWaypoints,
  LuRadio,
  LuMessageSquare,
  LuInfinity,
  LuCreditCard,
  LuWallet,
  LuSparkles,
  LuBrain,
  LuSquareCode,
} from "react-icons/lu";

const SKILL_ICON_MAP: Record<string, IconType> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,

  // Frontend
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Vue 3": SiVuedotjs,
  Remix: SiRemix,
  "Tailwind CSS": SiTailwindcss,
  Zod: SiZod,
  Pinia: SiPinia,

  // Backend
  NestJS: SiNestjs,
  FastAPI: SiFastapi,
  Django: SiDjango,
  "REST APIs": LuWaypoints,
  WebSocket: LuRadio,
  Prisma: SiPrisma,

  // Databases
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,

  // Integrations
  Click: LuCreditCard,
  Payme: LuWallet,
  "Telegram Bot & Mini Apps": SiTelegram,
  "Meta Graph API": SiMeta,
  "SMS/OTP": LuMessageSquare,

  // DevOps & Tools
  Docker: SiDocker,
  Nginx: SiNginx,
  Linux: SiLinux,
  "CI/CD": LuInfinity,
  "GitHub Actions": SiGithubactions,
  RabbitMQ: SiRabbitmq,
  PM2: SiPm2,

  // AI & Workflow
  "Claude Code": SiClaude,
  "AI-assisted development": LuSparkles,
  "LLM integration": LuBrain,
};

/** Default fallback for unmapped skills */
const DEFAULT_ICON: IconType = LuSquareCode;

/** Official brand colors (Simple Icons). Generic/non-brand skills are omitted
 *  and fall back to a neutral muted tone. A few very light brand colors are
 *  darkened slightly so they stay legible on a white pill. */
const SKILL_COLOR_MAP: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#C9A800", // darkened from #F7DF1E for contrast on white
  Python: "#3776AB",
  "Next.js": "#1d1d1f",
  React: "#149ECA", // darkened from #61DAFB for contrast
  "Vue 3": "#42B883",
  Remix: "#1d1d1f",
  "Tailwind CSS": "#06B6D4",
  Zod: "#3E67B1",
  Pinia: "#B59A00", // darkened from #FFD859
  NestJS: "#E0234E",
  FastAPI: "#009688",
  Django: "#092E20",
  Prisma: "#2D3748",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Redis: "#D82C20",
  "Telegram Bot & Mini Apps": "#26A5E4",
  "Meta Graph API": "#0467DF",
  Docker: "#2496ED",
  Nginx: "#009639",
  Linux: "#B58900", // darkened from #FCC624
  "GitHub Actions": "#2088FF",
  RabbitMQ: "#FF6600",
  PM2: "#2B037A",
  "Claude Code": "#D97757",
};

export function getSkillIcon(name: string): IconType {
  return SKILL_ICON_MAP[name] ?? DEFAULT_ICON;
}

export function getSkillColor(name: string): string | undefined {
  return SKILL_COLOR_MAP[name];
}

export { LuCode };

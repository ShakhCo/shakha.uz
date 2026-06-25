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

export function getSkillIcon(name: string): IconType {
  return SKILL_ICON_MAP[name] ?? DEFAULT_ICON;
}

export { LuCode };

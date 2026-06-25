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
  SiGreensock,
  SiFramer,
  SiShadcnui,
  SiReactquery,
  SiGooglemaps,
  SiVite,
  SiDrizzle,
  SiMinio,
  SiStripe,
  SiOpenai,
  SiElasticsearch,
  SiCelery,
  SiCloudflare,
  SiNuxt,
  SiNodedotjs,
  SiGo,
  SiFigma,
  SiVitest,
  SiLeaflet,
  SiTypeorm,
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
  LuPackage,
  LuServer,
  LuDatabase,
  LuBoxes,
  LuLayers,
  LuNetwork,
  LuFlame,
  LuBolt,
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
  Vue: SiVuedotjs,
  "Vue.js": SiVuedotjs,
  Remix: SiRemix,
  "Tailwind CSS": SiTailwindcss,
  Zod: SiZod,
  Pinia: SiPinia,
  Vite: SiVite,
  Nuxt: SiNuxt,
  "Nuxt 3": SiNuxt,
  GSAP: SiGreensock,
  "Framer Motion": SiFramer,
  "shadcn/ui": SiShadcnui,
  "TanStack Query": SiReactquery,
  "React Query": SiReactquery,
  Figma: SiFigma,
  Vitest: SiVitest,
  Leaflet: SiLeaflet,

  // Backend
  NestJS: SiNestjs,
  FastAPI: SiFastapi,
  Django: SiDjango,
  "Django REST": SiDjango,
  "REST API": LuWaypoints,
  "REST APIs": LuWaypoints,
  WebSocket: LuRadio,
  Prisma: SiPrisma,
  Drizzle: SiDrizzle,
  "Drizzle ORM": SiDrizzle,
  TypeORM: SiTypeorm,
  Go: SiGo,
  Golang: SiGo,
  "Node.js": SiNodedotjs,
  Node: SiNodedotjs,

  // Databases & Storage
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Elasticsearch: SiElasticsearch,
  MinIO: SiMinio,

  // Queues & Background
  BullMQ: LuFlame,
  Celery: SiCelery,
  RabbitMQ: SiRabbitmq,

  // Integrations & Payments
  Click: LuCreditCard,
  Payme: LuWallet,
  Stripe: SiStripe,
  "Telegram Bot & Mini Apps": SiTelegram,
  "Telegram Mini App": SiTelegram,
  "Telegram Bot API": SiTelegram,
  "@tma.js/sdk-react": SiTelegram,
  "@telegram-apps/sdk": SiTelegram,
  "Meta Graph API": SiMeta,
  "Microsoft Graph": LuNetwork,
  OpenAI: SiOpenai,
  "OpenAI API": SiOpenai,
  "Google Maps API": SiGooglemaps,
  "SMS/OTP": LuMessageSquare,

  // DevOps & Tools
  Docker: SiDocker,
  "Docker Compose": SiDocker,
  "Docker Swarm": SiDocker,
  "docker-compose": SiDocker,
  Cloudflare: SiCloudflare,
  Nginx: SiNginx,
  Linux: SiLinux,
  "CI/CD": LuInfinity,
  "GitHub Actions": SiGithubactions,
  PM2: SiPm2,

  // AI & Workflow
  "Claude Code": SiClaude,
  "AI-assisted development": LuSparkles,
  "LLM integration": LuBrain,

  // Generic / project-specific non-brand
  Landing: LuLayers,
  "Real Estate": LuBoxes,
  "ERP-CRM": LuServer,
  Payments: LuCreditCard,
  "Admin Panel": LuDatabase,
  "Python SDK": SiPython,
  "pg-boss": LuDatabase,
  i18next: LuMessageSquare,
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
  Vue: "#42B883",
  "Vue.js": "#42B883",
  Remix: "#1d1d1f",
  "Tailwind CSS": "#06B6D4",
  Zod: "#3E67B1",
  Pinia: "#B59A00", // darkened from #FFD859
  Vite: "#646CFF",
  Nuxt: "#00DC82",
  "Nuxt 3": "#00DC82",
  GSAP: "#0AE448",
  "Framer Motion": "#0055FF",
  "shadcn/ui": "#1d1d1f",
  "TanStack Query": "#FF4154",
  "React Query": "#FF4154",
  Figma: "#F24E1E",
  Vitest: "#6E9F18",
  Leaflet: "#199900",
  TypeORM: "#E83524",
  NestJS: "#E0234E",
  FastAPI: "#009688",
  Django: "#092E20",
  "Django REST": "#092E20",
  Prisma: "#2D3748",
  Drizzle: "#C5F74F",
  "Drizzle ORM": "#C5F74F",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Redis: "#D82C20",
  Elasticsearch: "#005571",
  MinIO: "#C72E49",
  Celery: "#37814A",
  BullMQ: "#BF2323",
  "Telegram Bot & Mini Apps": "#26A5E4",
  "Telegram Mini App": "#26A5E4",
  "Telegram Bot API": "#26A5E4",
  "@tma.js/sdk-react": "#26A5E4",
  "@telegram-apps/sdk": "#26A5E4",
  "Meta Graph API": "#0467DF",
  OpenAI: "#412991",
  "OpenAI API": "#412991",
  "Google Maps API": "#4285F4",
  Stripe: "#6772E5",
  Cloudflare: "#F48120",
  Docker: "#2496ED",
  "Docker Compose": "#2496ED",
  "Docker Swarm": "#2496ED",
  "docker-compose": "#2496ED",
  Nginx: "#009639",
  Linux: "#B58900", // darkened from #FCC624
  "GitHub Actions": "#2088FF",
  RabbitMQ: "#FF6600",
  PM2: "#2B037A",
  Go: "#00ADD8",
  Golang: "#00ADD8",
  "Node.js": "#5FA04E",
  Node: "#5FA04E",
  "Claude Code": "#D97757",
  "Python SDK": "#3776AB",
};

/** Strip a trailing version token from a tech name.
 *  "React 19" → "React", "Next.js 16" → "Next.js",
 *  "Tailwind CSS v4" → "Tailwind CSS", "TanStack Query 5" → "TanStack Query"
 *  "TanStack Query v5" → "TanStack Query" */
function normalizeSkillName(name: string): string {
  return name.replace(/\s+v?\d[\d.]*\+?$/, "").trim();
}

/** Alias map: additional normalized spellings → canonical key */
const ALIAS_MAP: Record<string, string> = {
  "Tailwind CSS 4": "Tailwind CSS",
  "Tailwind CSS v4": "Tailwind CSS",
  "Vue 3": "Vue 3",
  "Nuxt 3": "Nuxt",
  "Django REST Framework": "Django REST",
  "Django REST Framework 3.14": "Django REST",
  "Django REST Framework 3.16": "Django REST",
  djangorestframework: "Django REST",
  "Django 4.1": "Django",
  "Django 4.2": "Django",
  "Django 5.2": "Django",
  "Python 3.9": "Python",
  "Python 3.9+": "Python",
  "Python 3.11": "Python",
  Node: "Node.js",
  "@tma.js/sdk-react": "@tma.js/sdk-react",
  "@telegram-apps/sdk": "@telegram-apps/sdk",
  "BullMQ 5": "BullMQ",
  "ioredis 5": "Redis",
  ioredis: "Redis",
  "TanStack Query v5": "TanStack Query",
  "Zustand 5": "Zustand",
  "TanStack Query 5": "TanStack Query",
  "next-intl": "i18next",
  "OpenAI Python SDK v1": "OpenAI",
  "openai-agents": "OpenAI",
  "Stripe Python SDK v10": "Stripe",
  "@stripe/stripe-js": "Stripe",
  "Telegram Bot API": "Telegram Bot API",
  "@azure/msal-node 2": "Microsoft Graph",
  "@microsoft/microsoft-graph-client 3": "Microsoft Graph",
  "Google OAuth2": "Google Maps API",
  "Gmail API": "Google Maps API",
};

function resolveSkillName(name: string): string {
  // 1. Check alias map for exact match first
  if (ALIAS_MAP[name]) return ALIAS_MAP[name];
  // 2. Strip version suffix and check again
  const normalized = normalizeSkillName(name);
  if (ALIAS_MAP[normalized]) return ALIAS_MAP[normalized];
  // 3. Return normalized name (with version stripped)
  return normalized;
}

export function getSkillIcon(name: string): IconType {
  // Direct lookup first (exact key works for known skills)
  if (SKILL_ICON_MAP[name]) return SKILL_ICON_MAP[name];
  // Resolve through normalization/alias
  const resolved = resolveSkillName(name);
  if (SKILL_ICON_MAP[resolved]) return SKILL_ICON_MAP[resolved];
  // Case-insensitive fallback
  const lower = resolved.toLowerCase();
  const found = Object.keys(SKILL_ICON_MAP).find(
    (k) => k.toLowerCase() === lower
  );
  return found ? SKILL_ICON_MAP[found] : DEFAULT_ICON;
}

export function getSkillColor(name: string): string | undefined {
  // Direct lookup first
  if (SKILL_COLOR_MAP[name]) return SKILL_COLOR_MAP[name];
  // Resolve through normalization/alias
  const resolved = resolveSkillName(name);
  if (SKILL_COLOR_MAP[resolved]) return SKILL_COLOR_MAP[resolved];
  // Case-insensitive fallback
  const lower = resolved.toLowerCase();
  const found = Object.keys(SKILL_COLOR_MAP).find(
    (k) => k.toLowerCase() === lower
  );
  return found ? SKILL_COLOR_MAP[found] : undefined;
}

/** Renders a brand-colored tech icon for any skill/tech name.
 *  Falls back to a neutral muted Lucide icon for non-brand names. */
export function TechIcon({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = getSkillIcon(name);
  const color = getSkillColor(name);
  return (
    <Icon
      className={`${className} shrink-0${color ? "" : " text-[var(--color-muted)]"}`}
      style={color ? { color } : undefined}
      aria-hidden
    />
  );
}

export { LuCode, LuPackage, LuBolt };

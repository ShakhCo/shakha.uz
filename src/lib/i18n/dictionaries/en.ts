export const en = {
  nav: { home: "Home", projects: "Projects", about: "About", contact: "Contact" },
  metaBar: { role: "Full-Stack Engineer", availability: "Open to work" },
  meta: {
    home: {
      title: "Shakhzodbek Sharipov — Full-Stack Developer",
      description:
        "Full-stack developer building multi-tenant SaaS, marketplaces, and ERP systems with Next.js, NestJS, and PostgreSQL.",
    },
    projects: {
      title: "Projects — Shakhzodbek Sharipov",
      description: "Selected work: SaaS booking platform, insurance marketplace, logistics ERP, and more.",
    },
    about: {
      title: "About — Shakhzodbek Sharipov",
      description: "Full-stack developer from Tashkent with 5+ years shipping products from empty repo to real users.",
    },
    contact: {
      title: "Contact — Shakhzodbek Sharipov",
      description: "Get in touch with Shakhzodbek Sharipov.",
    },
  },
  hero: {
    eyebrow: "Full-Stack Developer · Tashkent",
    title: "I build the platforms businesses run on.",
    subtitle:
      "Over 5 years I've shipped a multi-tenant SaaS booking marketplace, an online insurance marketplace, and ERP systems used across 6+ countries — each from empty repo to real users.",
    ctaContact: "Get in touch",
    ctaCv: "Download CV",
  },
  stats: { years: "Years building", countries: "Countries served", businesses: "Businesses onboarded" },
  sections: {
    featured: "Featured work",
    featuredViewAll: "View all projects",
    skills: "What I work with",
    experience: "Experience",
    education: "Education",
    letsTalk: "Let's build something",
  },
  projects: { role: "Role", stack: "Stack", visit: "Visit site" },
  projectPage: {
    back: "All projects",
    overview: "Overview",
    whatIBuilt: "What I built",
    architecture: "Architecture",
    underTheHood: "Under the hood",
    learnings: "What I learned",
    builtWith: "Built with",
    role: "Role",
    visit: "Visit site",
    viewCode: "View code",
    next: "Next project",
  },
  educationPage: {
    overview: "Overview",
    whatILearned: "What I learned",
    modules: "Key modules",
    visit: "Visit programme",
  },
  contact: {
    title: "Let's talk",
    intro: "Looking for an ambitious team building products thousands of businesses depend on. Reach out through any channel below.",
    email: "Email",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: { built: "Built with Next.js. Designed and developed by Shakhzodbek Sharipov.", rights: "All rights reserved." },
} as const;

type DeepWriteable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepWriteable<T[K]> : string;
};

export type Dictionary = DeepWriteable<typeof en>;

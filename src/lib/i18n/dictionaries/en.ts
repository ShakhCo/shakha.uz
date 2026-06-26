export const en = {
  nav: { home: "Home", projects: "Projects", blog: "Blog", about: "About", contact: "Contact" },
  metaBar: { role: "Full-Stack Engineer", availability: "Open to work" },
  meta: {
    home: {
      title: "Shakhzodbek Sharipov — Full-Stack Software Developer",
      description:
        "Full-Stack Software Developer from Tashkent, Uzbekistan. Building multi-tenant SaaS, marketplaces, and ERP systems with Next.js, NestJS, React, and PostgreSQL.",
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
    blog: {
      title: "Blog — Shakhzodbek Sharipov",
      description: "Notes on building software — architecture, payments, and lessons from shipping real products.",
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
  blogPage: {
    title: "Blog",
    lede: "Notes on building software — architecture, payments, and lessons from shipping real products.",
    readingTime: "min read",
    backToBlog: "All posts",
    postedOn: "Published",
    onThisPage: "On this page",
    relatedPosts: "Related posts",
    taggedHeading: "Posts tagged",
    taggedLede: "All posts about",
  },
  notFound: {
    title: "Page not found",
    message: "The page you're looking for doesn't exist or may have moved.",
    backHome: "Back to home",
  },
  educationPage: {
    overview: "Overview",
    whatILearned: "What I learned",
    modules: "Key modules",
    visit: "Visit programme",
    more: "Learn more",
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

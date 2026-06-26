import { notFound } from "next/navigation";
import { Onest } from "next/font/google";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE_URL, SOCIALS, CONTACT } from "@/lib/site";
import { localizedPath } from "@/lib/seo";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const navItems = [
    { label: dict.nav.home, path: "" },
    { label: dict.nav.projects, path: "projects" },
    { label: dict.nav.blog, path: "blog" },
    { label: dict.nav.about, path: "about" },
    { label: dict.nav.contact, path: "contact" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Shakhzodbek Sharipov",
        alternateName: "Shakhzodbek",
        url: SITE_URL,
        jobTitle: "Full-Stack Software Developer",
        description:
          "Full-Stack Software Developer from Tashkent, Uzbekistan, specialising in multi-tenant SaaS, marketplaces, and ERP systems.",
        email: CONTACT.email,
        image: `${SITE_URL}/icon.svg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        sameAs: [SOCIALS.linkedin, SOCIALS.github],
        knowsAbout: [
          "TypeScript",
          "JavaScript",
          "Python",
          "Next.js",
          "React",
          "Vue",
          "NestJS",
          "FastAPI",
          "Django",
          "PostgreSQL",
          "Redis",
          "Docker",
          "multi-tenant SaaS",
          "REST APIs",
          "WebSocket",
          "Telegram Mini Apps",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Westminster International University in Tashkent",
          sameAs: "https://wiut.uz",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Shakhzodbek Sharipov",
        url: SITE_URL,
        inLanguage: ["en", "uz", "ru"],
        author: { "@id": `${SITE_URL}/#person` },
      },
      ...navItems.map((item) => ({
        "@type": "SiteNavigationElement",
        name: item.label,
        url: `${SITE_URL}${localizedPath(locale, item.path)}`,
      })),
    ],
  };

  return (
    <html lang={locale} className={sans.variable}>
      <body className="overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}

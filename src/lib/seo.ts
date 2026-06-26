import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

// path is the route AFTER the locale, e.g. "" for home, "projects" for /projects
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

// Builds BreadcrumbList JSON-LD. `crumbs` are ordered from the locale home
// down to (but not including) the current page is fine too — include the
// current page as the last crumb for a complete trail.
export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${localizedPath(locale, c.path)}`,
    })),
  };
}

export function buildMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const { locale, path, title, description, keywords } = opts;
  const canonical = `${SITE_URL}${localizedPath(locale, path)}`;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}${localizedPath(l, path)}`;
  languages["x-default"] = `${SITE_URL}${localizedPath("en", path)}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    authors: [{ name: "Shakhzodbek Sharipov", url: SITE_URL }],
    creator: "Shakhzodbek Sharipov",
    publisher: "Shakhzodbek Sharipov",
    category: "technology",
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Shakhzodbek Sharipov",
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

// path is the route AFTER the locale, e.g. "" for home, "projects" for /projects
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function buildMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, path, title, description } = opts;
  const canonical = `${SITE_URL}${localizedPath(locale, path)}`;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}${localizedPath(l, path)}`;
  languages["x-default"] = `${SITE_URL}${localizedPath("en", path)}`;

  return {
    title,
    description,
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

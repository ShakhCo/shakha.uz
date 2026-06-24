import { LOCALES } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";
import { localizedPath } from "@/lib/seo";
import { PROJECTS } from "@/lib/data/projects";

export const ROUTE_PATHS = ["", "projects", "about", "contact"] as const;

export function allUrls(): string[] {
  const urls: string[] = [];
  for (const locale of LOCALES) {
    for (const path of ROUTE_PATHS) {
      urls.push(`${SITE_URL}${localizedPath(locale, path)}`);
    }
  }
  for (const locale of LOCALES) {
    for (const project of PROJECTS) {
      urls.push(`${SITE_URL}${localizedPath(locale, `projects/${project.slug}`)}`);
    }
  }
  return urls;
}

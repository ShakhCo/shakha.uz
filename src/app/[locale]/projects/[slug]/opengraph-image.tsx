import { LOCALES, type Locale } from "@/lib/i18n/config";
import { PROJECTS } from "@/lib/data/projects";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const project of PROJECTS) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return renderOg("Project", "shakha.uz");
  }
  return renderOg(project.name, project.category[locale]);
}

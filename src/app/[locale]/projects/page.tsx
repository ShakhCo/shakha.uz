import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { PROJECTS } from "@/lib/data/projects";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "projects", title: dict.meta.projects.title, description: dict.meta.projects.description });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <Section className="py-16 md:py-24">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">▦ {dict.sections.featured}</span>
      <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">{dict.nav.projects}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{dict.meta.projects.description}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Reveal key={p.slug}><ProjectCard project={p} locale={l} dict={dict} /></Reveal>
        ))}
      </div>
    </Section>
  );
}

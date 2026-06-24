import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { PROJECTS } from "@/lib/data/projects";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const project of PROJECTS) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return buildMetadata({
    locale,
    path: `projects/${slug}`,
    title: `${project.name} — Shakhzodbek Sharipov`,
    description: project.description[locale],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const dict = getDictionary(l);

  const currentIndex = PROJECTS.indexOf(project);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <>
      {/* Header band — white */}
      <Section className="py-24 md:py-32">
        {/* Back link */}
        <Link
          href={`/${l}/projects/`}
          className="text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
        >
          ← {dict.projectPage.back}
        </Link>

        {/* Category label */}
        <p className="mt-8 text-sm font-medium text-[var(--color-muted)]">
          {project.category[l]}
        </p>

        {/* Project name */}
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:text-6xl">
          {project.name}
        </h1>

        {/* Role · Year */}
        <p className="mt-4 text-base text-[var(--color-muted)] md:text-lg">
          {project.role[l]}
          {project.year ? ` · ${project.year}` : ""}
        </p>

        {/* Action buttons */}
        {(project.url || project.github) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                {dict.projectPage.visit} ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--color-line)] px-7 py-3.5 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-alt)]"
              >
                {dict.projectPage.viewCode} ↗
              </a>
            )}
          </div>
        )}
      </Section>

      {/* Overview band — alt */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
              {dict.projectPage.overview}
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[var(--color-muted)] md:text-2xl">
              {project.overview[l]}
            </p>
          </Reveal>
        </Section>
      </div>

      {/* Highlights band — white */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
            {dict.projectPage.highlights}
          </h2>
          <ul className="mt-10 space-y-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
                <p className="text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
                  {h[l]}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Built with band — alt */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
              {dict.projectPage.builtWith}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm text-[var(--color-muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </div>

      {/* Next project band — white */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <p className="text-sm font-medium text-[var(--color-muted)]">
            {dict.projectPage.next}
          </p>
          <Link
            href={`/${l}/projects/${nextProject.slug}/`}
            className="mt-3 inline-block text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)] md:text-5xl"
          >
            {nextProject.name} →
          </Link>
        </Reveal>
      </Section>
    </>
  );
}

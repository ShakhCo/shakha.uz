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
      {/* ── Header band — white ── */}
      <Section className="py-24 md:py-32">
        <Reveal>
          {/* Back link */}
          <Link
            href={`/${l}/projects/`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
          >
            ← {dict.projectPage.back}
          </Link>

          {/* Category label */}
          <p className="mt-10 text-sm font-medium uppercase tracking-widest text-[var(--color-muted)]">
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

          {/* Action pills */}
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
        </Reveal>
      </Section>

      {/* ── Screenshot band — only when image exists ── */}
      {project.image && (
        <div className="bg-[var(--color-bg-alt)]">
          <Section className="py-10 md:py-14">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-[var(--color-line)]">
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </Section>
        </div>
      )}

      {/* ── Overview band — alt (or white if no image) ── */}
      <div className={project.image ? "bg-white" : "bg-[var(--color-bg-alt)]"}>
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.projectPage.overview}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
              {project.overview[l]}
            </p>
          </Reveal>
        </Section>
      </div>

      {/* ── What I built band — alternating ── */}
      <div className={project.image ? "bg-[var(--color-bg-alt)]" : "bg-white"}>
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.projectPage.whatIBuilt}
            </h2>
            <ul className="mt-8 space-y-5">
              {project.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  <p className="text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
                    {r[l]}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </div>

      {/* ── Architecture band — alternating ── */}
      <div className={project.image ? "bg-white" : "bg-[var(--color-bg-alt)]"}>
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.projectPage.architecture}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
              {project.architecture[l]}
            </p>
          </Reveal>
        </Section>
      </div>

      {/* ── Under the hood band — accent-adjacent alt ── */}
      <div className={project.image ? "bg-[var(--color-bg-alt)]" : "bg-white"}>
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.projectPage.underTheHood}
            </h2>
            <ul className="mt-8 divide-y divide-[var(--color-line)]">
              {project.engineering.map((e, i) => (
                <li key={i} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex gap-4">
                    <span
                      className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-semibold text-white"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
                      {e[l]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </div>

      {/* ── Built with band — alt ── */}
      <div className={project.image ? "bg-white" : "bg-[var(--color-bg-alt)]"}>
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.projectPage.builtWith}
            </h2>
            <div className="mt-8 space-y-8">
              {project.stackGroups.map((group, gi) => (
                <div key={gi}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                    {group.label[l]}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--color-line)] bg-white px-4 py-1.5 text-sm text-[var(--color-ink)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      </div>

      {/* ── Next project band — white ── */}
      <div className={project.image ? "bg-[var(--color-bg-alt)]" : "bg-white"}>
        <Section className="py-24 md:py-32">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)]">
              {dict.projectPage.next}
            </p>
            <Link
              href={`/${l}/projects/${nextProject.slug}/`}
              className="mt-4 inline-block text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)] md:text-5xl"
            >
              {nextProject.name} →
            </Link>
          </Reveal>
        </Section>
      </div>
    </>
  );
}

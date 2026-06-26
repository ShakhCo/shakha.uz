import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PROJECTS } from "@/lib/data/projects";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { BrowserFrame } from "@/components/BrowserFrame";
import { TechIcon } from "@/lib/skill-icons";

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
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.projects, path: "projects" },
          { name: project.name, path: `projects/${project.slug}` },
        ])}
      />
      {/* ── Header band — white ── */}
      <Section className="pb-8 pt-20 md:pb-10 md:pt-28">
        <Reveal>
          {/* Eyebrow + title + description */}
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)]">
            {project.category[l]}
          </p>
          <h1 className="mt-3 break-words text-3xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] sm:text-4xl md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            {project.description[l]}
          </p>
          {project.github && (
            <div className="mt-8">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--color-line)] px-6 py-3 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-alt)]"
              >
                {dict.projectPage.viewCode} ↗
              </a>
            </div>
          )}
        </Reveal>
      </Section>

      {/* ── Screenshot band — screenshot floating on a gradient stage ── */}
      {project.image && (
        <div className="bg-white">
          <Section className="pb-6 pt-2 md:pb-8 md:pt-4">
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#5b6cff_0%,#a855f7_48%,#ec4899_100%)] p-4 sm:p-8 md:p-14 lg:p-20">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dict.projectPage.visit} — ${project.name}`}
                  className="group relative mx-auto block max-w-4xl overflow-hidden rounded-[14px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                >
                  <BrowserFrame url={project.url}>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </BrowserFrame>
                  {/* Centered Visit button on hover */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1d1d1f]/0 opacity-0 transition-all duration-300 group-hover:bg-[#1d1d1f]/35 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-7 py-3.5 text-base font-medium text-[var(--color-ink)] shadow-lg">
                      {dict.projectPage.visit} ↗
                    </span>
                  </div>
                </a>
              ) : (
                <BrowserFrame
                  url={project.url}
                  className="mx-auto max-w-4xl rounded-[14px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              )}
            </div>
          </Section>
        </div>
      )}

      {/* ── Overview band — alt (or white if no image) ── */}
      <div className={project.image ? "bg-white" : "bg-[var(--color-bg-alt)]"}>
        <Section className="pb-16 pt-8 sm:pb-24 sm:pt-12 md:pb-32 md:pt-16">
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
        <Section className="py-16 sm:py-24 md:py-32">
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
        <Section className="py-16 sm:py-24 md:py-32">
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
        <Section className="py-16 sm:py-24 md:py-32">
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

      {/* ── What I learned band — alternating (after Under the hood) ── */}
      {project.learnings.length > 0 && (
        <div className={project.image ? "bg-white" : "bg-[var(--color-bg-alt)]"}>
          <Section className="py-16 sm:py-24 md:py-32">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
                {dict.projectPage.learnings}
              </h2>
              <ul className="mt-8 space-y-5">
                {project.learnings.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <p className="text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
                      {item[l]}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Section>
        </div>
      )}

      {/* ── Built with band — alt ── */}
      <div className={project.image ? "bg-[var(--color-bg-alt)]" : "bg-white"}>
        <Section className="py-16 sm:py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.projectPage.builtWith}
            </h2>
            <div className="mt-10 border-t border-[var(--color-line)]">
              {project.stackGroups.map((group, gi) => (
                <div
                  key={gi}
                  className="grid gap-3 border-b border-[var(--color-line)] py-6 md:grid-cols-[240px_1fr] md:gap-8"
                >
                  <p className="text-sm font-medium text-[var(--color-muted)] md:pt-1.5">
                    {group.label[l]}
                  </p>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-1.5 text-sm font-medium text-[var(--color-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                      >
                        <TechIcon name={item} />
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

      {/* ── Next project band — contrasting card ── */}
      <div className={project.image ? "bg-white" : "bg-[var(--color-bg-alt)]"}>
        <Section className="py-16 md:py-24">
          <Reveal>
            <Link
              href={`/${l}/projects/${nextProject.slug}/`}
              className="group block rounded-[24px] border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-5 transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] sm:p-8 md:p-12"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)]">
                    {dict.projectPage.next}
                  </p>
                  <h2 className="mt-3 break-words text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] sm:text-3xl md:text-5xl">
                    {nextProject.name}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-muted)] md:text-base">
                    {nextProject.category[l]}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-6">
                  {nextProject.image && (
                    <div className="hidden w-48 overflow-hidden rounded-xl border border-[var(--color-line)] shadow-sm lg:block">
                      <div className="aspect-[16/10] w-full bg-white">
                        <img
                          src={nextProject.image}
                          alt={nextProject.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>
                  )}
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-xl text-[var(--color-ink)] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-white"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </Section>
      </div>
    </>
  );
}

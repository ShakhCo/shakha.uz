import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { CV_PATH } from "@/lib/site";
import { PROJECTS } from "@/lib/data/projects";
import { SKILLS } from "@/lib/data/skills";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { StatStrip } from "@/components/StatStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { Schematic } from "@/components/Schematic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      {/* Top meta-bar — §3: mono, muted, hairline-bottom */}
      <div className="border-b border-[var(--color-line)] bg-[var(--color-paper)]">
        <div className="mx-auto flex w-full max-w-5xl items-center px-6 py-2 md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            TASHKENT, UZ · UTC+5 · {dict.metaBar.role.toUpperCase()} ·{" "}
            {dict.metaBar.availability.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Hero — two columns on desktop, single column on mobile */}
      <Section className="pt-14 pb-10 md:pt-20 md:pb-16">
        <div className="md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
          {/* Left column: eyebrow, h1, lede, CTAs */}
          <div>
            {/* Mono eyebrow */}
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">
              ▦ {dict.hero.eyebrow}
            </span>

            {/* Hero h1 */}
            <h1 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] md:text-[4.5rem]">
              {dict.hero.title}
            </h1>

            {/* Lede */}
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
              {dict.hero.subtitle}
            </p>

            {/* CTAs — primary signal-filled rounded-md, secondary ghost ink-hairline rounded-md */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${l}/contact/`}
                className="rounded-md bg-[var(--color-signal)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]"
              >
                {dict.hero.ctaContact}
              </Link>
              <a
                href={CV_PATH}
                download
                className="rounded-md border border-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]"
              >
                {dict.hero.ctaCv}
              </a>
            </div>
          </div>

          {/* Right column: Schematic — below text on mobile, right column on desktop */}
          <div className="mt-12 md:mt-0">
            <Schematic />
          </div>
        </div>
      </Section>

      {/* StatStrip */}
      <Section className="py-4">
        <StatStrip dict={dict} />
      </Section>

      {/* Featured projects */}
      <Section className="py-16">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">
            ▦ {dict.sections.featured}
          </span>
          <Link
            href={`/${l}/projects/`}
            className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-signal)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]"
          >
            {dict.sections.featuredViewAll} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} locale={l} dict={dict} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Skills snapshot */}
      <Section className="border-t border-[var(--color-line)] py-16">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">
          ▦ {dict.sections.skills}
        </span>
        <div className="mt-6 flex flex-wrap gap-2">
          {SKILLS.flatMap((g) => g.items).map((s) => (
            <span
              key={s}
              className="rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1 font-mono text-xs text-[var(--color-ink)]"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}

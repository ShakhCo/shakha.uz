import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { CV_PATH } from "@/lib/site";
import { PROJECTS } from "@/lib/data/projects";
import { SKILLS } from "@/lib/data/skills";
import { EXPERIENCE } from "@/lib/data/experience";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { StatStrip } from "@/components/StatStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillTile } from "@/components/SkillTile";
import { ExperienceItemRow } from "@/components/ExperienceItem";
import { EducationCard } from "@/components/EducationCard";

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
  const featured = PROJECTS.slice(0, 4);

  return (
    <>
      {/* Hero — centered, spacious */}
      <div className="bg-[var(--color-bg)]">
        <Section className="pb-24 pt-24 md:pb-32 md:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Role label */}
            <p className="text-sm font-medium text-[var(--color-muted)]">
              {dict.hero.eyebrow}
            </p>

            {/* Hero h1 */}
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              {dict.hero.title}
            </h1>

            {/* Lede */}
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[var(--color-muted)] md:text-2xl">
              {dict.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${l}/contact/`}
                className="rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                {dict.hero.ctaContact}
              </Link>
              <a
                href={CV_PATH}
                download
                className="rounded-full border border-[var(--color-line)] px-7 py-3.5 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-alt)]"
              >
                {dict.hero.ctaCv}
              </a>
            </div>
          </div>
        </Section>
      </div>

      {/* StatStrip — alt band */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-16 md:py-20">
          <StatStrip dict={dict} />
        </Section>
      </div>

      {/* Featured projects — white band */}
      <div className="bg-[var(--color-bg)]">
        <Section className="py-24 md:py-32">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
              {dict.sections.featured}
            </h2>
            <Link
              href={`/${l}/projects/`}
              className="text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
            >
              {dict.sections.featuredViewAll} →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {featured.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} locale={l} dict={dict} />
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* Skills snapshot — alt band */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
            {dict.sections.skills}
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {SKILLS.flatMap((g) => g.items).map((s) => (
              <SkillTile key={s} name={s} label={s} />
            ))}
          </div>
        </Section>
      </div>

      {/* Experience — white band */}
      <div className="bg-[var(--color-bg)]">
        <Section className="py-24 md:py-32">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
            {dict.sections.experience}
          </h2>
          <div className="mt-12">
            {EXPERIENCE.map((e, i) => (
              <ExperienceItemRow key={i} item={e} locale={l} index={i} />
            ))}
          </div>
        </Section>
      </div>

      {/* Education — alt band */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
            {dict.sections.education}
          </h2>
          <div className="mt-12">
            <EducationCard locale={l} />
          </div>
        </Section>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { EXPERIENCE, EDUCATION } from "@/lib/data/experience";
import { Section } from "@/components/Section";
import { ExperienceItemRow } from "@/components/ExperienceItem";
import { SkillGroupList } from "@/components/SkillGroupList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "about", title: dict.meta.about.title, description: dict.meta.about.description });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <>
      {/* Hero band — white */}
      <Section className="py-24 md:py-32">
        <h1 className="text-4xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:text-6xl">
          {dict.nav.about}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--color-muted)] md:text-2xl">
          {dict.hero.subtitle}
        </p>
      </Section>

      {/* Skills band — bg-alt */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
            {dict.sections.skills}
          </h2>
          <div className="mt-12">
            <SkillGroupList locale={l} />
          </div>
        </Section>
      </div>

      {/* Experience band — white */}
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

      {/* Education band — bg-alt */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-5xl">
            {dict.sections.education}
          </h2>
          <div className="mt-12 border-t border-[var(--color-line)] pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-3xl">
                {EDUCATION.degree[l]}
              </h3>
              <span className="text-sm text-[var(--color-muted)]">{EDUCATION.period}</span>
            </div>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{EDUCATION.school}</p>
          </div>
        </Section>
      </div>
    </>
  );
}

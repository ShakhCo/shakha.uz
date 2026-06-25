import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { EXPERIENCE } from "@/lib/data/experience";
import { Section } from "@/components/Section";
import { ExperienceItemRow } from "@/components/ExperienceItem";
import { SkillGroupList } from "@/components/SkillGroupList";
import { EducationCard } from "@/components/EducationCard";

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
          <div className="mt-12">
            <EducationCard locale={l} />
          </div>
        </Section>
      </div>
    </>
  );
}

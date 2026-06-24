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
    <Section className="py-16 md:py-24">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">▦ {dict.nav.about}</span>
      <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">{dict.nav.about}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{dict.hero.subtitle}</p>

      {/* Skills */}
      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">▦ {dict.sections.skills}</span>
        <h2 className="mt-3 font-display text-2xl font-semibold md:text-[2rem]">{dict.sections.skills}</h2>
        <div className="mt-8">
          <SkillGroupList locale={l} />
        </div>
      </div>

      {/* Experience */}
      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">▦ {dict.sections.experience}</span>
        <h2 className="mt-3 font-display text-2xl font-semibold md:text-[2rem]">{dict.sections.experience}</h2>
        <div className="mt-8">
          {EXPERIENCE.map((e, i) => (
            <ExperienceItemRow key={i} item={e} locale={l} index={i} />
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">▦ {dict.sections.education}</span>
        <h2 className="mt-3 font-display text-2xl font-semibold md:text-[2rem]">{dict.sections.education}</h2>
        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold">{EDUCATION.degree[l]}</h3>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">{EDUCATION.period}</span>
          </div>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-signal)]">{EDUCATION.school}</p>
        </div>
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { EDUCATION } from "@/lib/data/experience";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const item of EDUCATION) {
      params.push({ locale, slug: item.slug });
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
  const item = EDUCATION.find((e) => e.slug === slug);
  if (!item) return {};
  return buildMetadata({
    locale,
    path: `education/${slug}`,
    title: `${item.degree[locale as Locale]} — Shakhzodbek Sharipov`,
    description: item.overview[locale as Locale].slice(0, 160),
  });
}

export default async function EducationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const item = EDUCATION.find((e) => e.slug === slug);
  if (!item) notFound();

  const dict = getDictionary(l);

  return (
    <>
      {/* ── Header band — white ── */}
      <Section className="pb-8 pt-20 md:pb-10 md:pt-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)]">
            {item.school}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:text-6xl">
            {item.degree[l]}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            {item.period}
          </p>
        </Reveal>
      </Section>

      {/* ── Hero cover image ── */}
      <div className="bg-white">
        <Section className="pb-6 pt-2 md:pb-10 md:pt-4">
          <Reveal>
            <div className="group relative overflow-hidden rounded-[24px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.cover}
                alt={item.school}
                className="aspect-[16/9] w-full object-cover md:aspect-[16/6]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
              />
              {/* Visit programme — top right, on hover (always visible on mobile) */}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-5 top-5 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] shadow-lg backdrop-blur transition-all duration-300 hover:bg-white md:opacity-0 md:group-hover:opacity-100"
                >
                  {dict.educationPage.visit} ↗
                </a>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-6 md:p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={item.school}
                  className="h-14 w-14 shrink-0 rounded-xl ring-2 ring-white/80 md:h-16 md:w-16"
                />
                <div className="min-w-0 text-white">
                  <p className="truncate text-base font-semibold md:text-lg">
                    {item.school}
                  </p>
                  <p className="text-sm text-white/80">{item.period}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* ── Overview band — alt ── */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.educationPage.overview}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
              {item.overview[l]}
            </p>
          </Reveal>
        </Section>
      </div>

      {/* ── What I learned band — white ── */}
      <div className="bg-white">
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.educationPage.whatILearned}
            </h2>
            <ul className="mt-8 space-y-5">
              {item.learned.map((bullet, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  <p className="text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
                    {bullet[l]}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </div>

      {/* ── Key modules band — alt ── */}
      <div className="bg-[var(--color-bg-alt)]">
        <Section className="py-24 md:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl">
              {dict.educationPage.modules}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {item.modules.map((mod) => (
                <li
                  key={mod}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  {mod}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </div>

      {/* ── Back link band — white ── */}
      <div className="bg-white">
        <Section className="py-12 md:py-16">
          <Reveal>
            <Link
              href={`/${l}/`}
              className="text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
            >
              ← {dict.nav.home}
            </Link>
          </Reveal>
        </Section>
      </div>
    </>
  );
}

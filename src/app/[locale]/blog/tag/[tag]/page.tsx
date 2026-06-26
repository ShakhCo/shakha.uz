import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { allTags, tagSlug, postsForTagSlug } from "@/lib/data/blog";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams(): { locale: string; tag: string }[] {
  const params: { locale: string; tag: string }[] = [];
  for (const locale of LOCALES) {
    for (const tag of allTags()) {
      params.push({ locale, tag: tagSlug(tag) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isLocale(locale)) return {};
  const match = postsForTagSlug(tag);
  if (!match) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: `blog/tag/${tag}`,
    title: `${dict.blogPage.taggedHeading} “${match.tag}” — Shakhzodbek Sharipov`,
    description: `${dict.blogPage.taggedLede} ${match.tag}.`,
    keywords: [match.tag, "blog"],
  });
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(
    locale === "ru" ? "ru-RU" : locale === "uz" ? "uz-UZ" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const match = postsForTagSlug(tag);
  if (!match) notFound();

  return (
    <Section className="py-16 sm:py-24 md:py-32">
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.blog, path: "blog" },
          { name: match.tag, path: `blog/tag/${tag}` },
        ])}
      />
      <Reveal>
        <Link
          href={`/${l}/blog/`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
        >
          <span aria-hidden="true">←</span>
          {dict.blogPage.backToBlog}
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:text-6xl">
          {dict.blogPage.taggedHeading} “{match.tag}”
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--color-muted)] md:text-2xl">
          {dict.blogPage.taggedLede} {match.tag}.
        </p>
      </Reveal>

      <div
        className="mt-16 rounded-[28px] p-3 sm:p-8 md:p-10"
        style={{ backgroundImage: "linear-gradient(135deg, #5b6cff 0%, #a855f7 50%, #ec4899 100%)" }}
      >
        <div className="flex flex-col gap-5">
          {match.posts.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/${l}/blog/${post.slug}/`}
                className="group block rounded-[18px] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.2)] sm:p-7 md:p-9"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-black/[0.04] bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-medium text-[var(--color-muted)] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] md:text-3xl">
                  {post.title[l]}
                </h2>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {formatDate(post.date, l)} · {post.readingMinutes} {dict.blogPage.readingTime}
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
                  {post.excerpt[l]}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

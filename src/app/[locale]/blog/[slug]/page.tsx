import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/data/blog";
import { Section } from "@/components/Section";
import { CodeBlock, InlineCode } from "@/components/ui/code-block";

export function generateStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const post of POSTS) {
      params.push({ locale, slug: post.slug });
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
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const base = buildMetadata({
    locale,
    path: `blog/${slug}`,
    title: `${post.title[locale]} — Shakhzodbek Sharipov`,
    description: post.excerpt[locale],
    keywords: post.tags,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: ["Shakhzodbek Sharipov"],
      tags: post.tags,
    },
  };
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(
    locale === "ru" ? "ru-RU" : locale === "uz" ? "uz-UZ" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const dict = getDictionary(l);

  const canonical = `${SITE_URL}/${l}/blog/${post.slug}/`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[l],
    description: post.excerpt[l],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: l,
    author: {
      "@type": "Person",
      name: "Shakhzodbek Sharipov",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Shakhzodbek Sharipov",
      url: SITE_URL,
    },
    image: `${SITE_URL}/en/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    keywords: post.tags.join(", "),
    url: canonical,
  };

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Section className="pb-8 pt-16 md:pb-10 md:pt-24">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href={`/${l}/blog/`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <span aria-hidden="true">←</span>
            {dict.blogPage.backToBlog}
          </Link>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-black/[0.04] bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-medium text-[var(--color-muted)] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:text-5xl lg:text-6xl">
            {post.title[l]}
          </h1>

          {/* Meta line */}
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            {dict.blogPage.postedOn} {formatDate(post.date, l)} · {post.readingMinutes} {dict.blogPage.readingTime}
          </p>
        </div>
      </Section>

      {/* Article body */}
      <div className="bg-white">
        <Section className="pb-16 pt-4 md:pb-24 md:pt-6">
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-neutral max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[var(--color-ink)]
                prose-p:text-[var(--color-ink)] prose-p:leading-relaxed
                prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[var(--color-ink)]
                prose-li:text-[var(--color-ink)]
                prose-code:rounded prose-code:bg-[var(--color-bg-alt)] prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:font-medium prose-code:text-[var(--color-ink)] prose-code:before:content-none prose-code:after:content-none
                prose-pre:rounded-2xl prose-pre:bg-[var(--color-ink)] prose-pre:text-white prose-pre:shadow-lg
                prose-blockquote:border-[var(--color-accent)] prose-blockquote:text-[var(--color-muted)]
                prose-hr:border-[var(--color-line)]"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                  code: ({ node: _node, className, children, ...rest }) => {
                    // Fenced code blocks are handled by `pre` above.
                    // This handles only inline code (no className).
                    if (!className) {
                      return <InlineCode {...rest}>{children}</InlineCode>;
                    }
                    // Inside a pre — return as-is; CodeBlock reads it directly.
                    return (
                      <code className={className} {...rest}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content[l]}
              </ReactMarkdown>
            </div>

            {/* Back link at bottom */}
            <div className="mt-16 border-t border-[var(--color-line)] pt-10">
              <Link
                href={`/${l}/blog/`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                <span aria-hidden="true">←</span>
                {dict.blogPage.backToBlog}
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

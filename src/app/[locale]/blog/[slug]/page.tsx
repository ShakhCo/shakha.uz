import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { POSTS, tagSlug, relatedPosts } from "@/lib/data/blog";
import { extractHeadings, headingSlug } from "@/lib/toc";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
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

// Flatten a React markdown heading's children into plain text so we can
// derive the same anchor id the table of contents links to.
function childrenToText(node: React.ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(childrenToText).join("");
  if (typeof node === "object" && "props" in node) {
    return childrenToText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
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

  const headings = extractHeadings(post.content[l]);
  const related = relatedPosts(post.slug);

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
      <ReadingProgress />
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.blog, path: "blog" },
          { name: post.title[l], path: `blog/${post.slug}` },
        ])}
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
              <Link
                key={tag}
                href={`/${l}/blog/tag/${tagSlug(tag)}/`}
                className="inline-flex items-center rounded-full border border-black/[0.04] bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-medium text-[var(--color-muted)] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-6 break-words text-3xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] sm:text-4xl md:text-5xl lg:text-6xl">
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
            {/* Table of contents */}
            {headings.length >= 3 && (
              <nav
                aria-label={dict.blogPage.onThisPage}
                className="mb-12 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-5 sm:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                  {dict.blogPage.onThisPage}
                </p>
                <ul className="mt-4 space-y-2">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                      <a
                        href={`#${h.id}`}
                        className="text-sm leading-relaxed text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
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
                  h2: ({ children }) => (
                    <h2 id={headingSlug(childrenToText(children))} className="scroll-mt-24">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 id={headingSlug(childrenToText(children))} className="scroll-mt-24">
                      {children}
                    </h3>
                  ),
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

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-16 border-t border-[var(--color-line)] pt-10">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  {dict.blogPage.relatedPosts}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {related.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${l}/blog/${rp.slug}/`}
                      className="group block rounded-2xl border border-[var(--color-line)] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-ink)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    >
                      <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                        {rp.title[l]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {rp.excerpt[l]}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back link at bottom */}
            <div className="mt-12 border-t border-[var(--color-line)] pt-10">
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

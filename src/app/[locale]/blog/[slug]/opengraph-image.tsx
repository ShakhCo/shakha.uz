import { LOCALES, type Locale } from "@/lib/i18n/config";
import { POSTS } from "@/lib/data/blog";
import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const post of POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return renderOg("Blog", "Shakhzodbek Sharipov");
  return renderOg(post.title[locale], "Blog");
}

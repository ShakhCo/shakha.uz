import type { MetadataRoute } from "next";
import { allUrls } from "@/lib/routes";
import { POSTS } from "@/lib/data/blog";

export const dynamic = "force-static";

// Most-recent post date — used as lastmod for the homepage and blog index,
// which surface the latest writing.
const latestPostDate = [...POSTS].map((p) => p.date).sort().at(-1);

// Map each blog post URL slug to its publish date for per-post lastmod.
const postDateBySlug = new Map(POSTS.map((p) => [p.slug, p.date]));

function lastModFor(url: string): string | undefined {
  // Blog post detail: /{locale}/blog/{slug}/
  const post = url.match(/\/blog\/([^/]+)\/$/);
  if (post && postDateBySlug.has(post[1])) return postDateBySlug.get(post[1]);
  // Homepage or blog index → latest post date.
  if (/\/(en|uz|ru)\/$/.test(url) || /\/blog\/$/.test(url)) return latestPostDate;
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return allUrls().map((url) => {
    const lastModified = lastModFor(url);
    return {
      url,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: /\/(en|uz|ru)\/$/.test(url) ? 1 : 0.8,
    };
  });
}

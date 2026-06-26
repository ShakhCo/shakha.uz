import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/data/blog";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// English RSS feed for the blog. Posts are sorted newest-first.
export function GET(): Response {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const lastBuild = posts[0]?.date ?? new Date(0).toISOString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/en/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title.en)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt.en)}</description>
${post.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shakhzodbek Sharipov — Blog</title>
    <link>${SITE_URL}/en/blog/</link>
    <description>Notes on building software — architecture, payments, and lessons from shipping real products.</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

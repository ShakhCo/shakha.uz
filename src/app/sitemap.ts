import type { MetadataRoute } from "next";
import { allUrls } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allUrls().map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: url.endsWith(".uz/en/") || /\/(en|uz|ru)\/$/.test(url) ? 1 : 0.8,
  }));
}

import { describe, expect, it } from "vitest";
import { allUrls, ROUTE_PATHS } from "./routes";
import { LOCALES } from "@/lib/i18n/config";
import { PROJECTS } from "@/lib/data/projects";
import { EDUCATION } from "@/lib/data/experience";
import { POSTS, allTags } from "@/lib/data/blog";

describe("routes", () => {
  it("produces one url per locale for static pages, projects, education, posts, and tags", () => {
    const perLocale =
      ROUTE_PATHS.length +
      PROJECTS.length +
      EDUCATION.length +
      POSTS.length +
      allTags().length;
    expect(allUrls()).toHaveLength(perLocale * LOCALES.length);
  });
  it("includes localized home and contact", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/");
    expect(urls).toContain("https://shakha.uz/ru/contact/");
    expect(urls).toContain("https://shakha.uz/uz/projects/");
  });
  it("includes project detail pages", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/projects/bookup/");
    expect(urls).toContain("https://shakha.uz/uz/projects/noserver/");
    expect(urls).toContain("https://shakha.uz/ru/projects/automations/");
  });
  it("includes education detail pages", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/education/bsc-computer-science/");
    expect(urls).toContain("https://shakha.uz/ru/education/ifs/");
    expect(urls).toContain("https://shakha.uz/uz/education/bsc-computer-science/");
  });
  it("includes blog index and post detail pages", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/blog/");
    expect(urls).toContain("https://shakha.uz/ru/blog/");
    expect(urls).toContain("https://shakha.uz/uz/blog/");
    expect(urls).toContain("https://shakha.uz/en/blog/designing-multi-tenant-saas/");
    expect(urls).toContain("https://shakha.uz/ru/blog/designing-multi-tenant-saas/");
    expect(urls).toContain("https://shakha.uz/uz/blog/designing-multi-tenant-saas/");
  });
  it("includes blog tag pages", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/blog/tag/saas/");
    expect(urls).toContain("https://shakha.uz/ru/blog/tag/claude-code/");
  });
});

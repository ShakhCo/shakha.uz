import { describe, expect, it } from "vitest";
import { allUrls } from "./routes";

describe("routes", () => {
  it("produces 69 urls (3 locales × 5 static pages + 3 locales × 9 projects + 3 locales × 2 education + 3 locales × 7 blog posts)", () => {
    expect(allUrls()).toHaveLength(69);
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
});

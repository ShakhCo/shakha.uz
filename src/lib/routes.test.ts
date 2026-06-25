import { describe, expect, it } from "vitest";
import { allUrls } from "./routes";

describe("routes", () => {
  it("produces 45 urls (3 locales × 4 static pages + 3 locales × 9 projects + 3 locales × 2 education)", () => {
    expect(allUrls()).toHaveLength(45);
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
});

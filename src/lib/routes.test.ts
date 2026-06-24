import { describe, expect, it } from "vitest";
import { allUrls } from "./routes";

describe("routes", () => {
  it("produces 39 urls (3 locales × 4 static pages + 3 locales × 9 projects)", () => {
    expect(allUrls()).toHaveLength(39);
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
});

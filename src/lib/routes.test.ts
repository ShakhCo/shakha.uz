import { describe, expect, it } from "vitest";
import { allUrls } from "./routes";

describe("routes", () => {
  it("produces 12 urls (3 locales × 4 pages)", () => {
    expect(allUrls()).toHaveLength(12);
  });
  it("includes localized home and contact", () => {
    const urls = allUrls();
    expect(urls).toContain("https://shakha.uz/en/");
    expect(urls).toContain("https://shakha.uz/ru/contact/");
    expect(urls).toContain("https://shakha.uz/uz/projects/");
  });
});

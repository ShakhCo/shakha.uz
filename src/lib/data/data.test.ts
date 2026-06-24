import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/i18n/config";
import { PROJECTS } from "./projects";
import { EXPERIENCE, EDUCATION } from "./experience";
import { SKILLS } from "./skills";

function hasAllLocales(obj: Record<string, string>) {
  return LOCALES.every((l) => typeof obj[l] === "string" && obj[l].length > 0);
}

describe("data integrity", () => {
  it("has 9 projects with unique slugs", () => {
    expect(PROJECTS).toHaveLength(9);
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(9);
  });

  it("every project has all locales for role and description", () => {
    for (const p of PROJECTS) {
      expect(hasAllLocales(p.role), `${p.slug} role`).toBe(true);
      expect(hasAllLocales(p.description), `${p.slug} description`).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it("every project has fully localized category, overview, and highlights", () => {
    for (const p of PROJECTS) {
      expect(hasAllLocales(p.category), `${p.slug} category`).toBe(true);
      expect(hasAllLocales(p.overview), `${p.slug} overview`).toBe(true);
      expect(p.highlights.length, `${p.slug} highlights non-empty`).toBeGreaterThan(0);
      for (const h of p.highlights) {
        expect(hasAllLocales(h), `${p.slug} highlight bullet`).toBe(true);
      }
    }
  });

  it("every experience item and its bullets are fully localized", () => {
    for (const e of EXPERIENCE) {
      expect(hasAllLocales(e.role), e.org).toBe(true);
      for (const b of e.bullets) expect(hasAllLocales(b)).toBe(true);
    }
    expect(hasAllLocales(EDUCATION.degree)).toBe(true);
  });

  it("every skill group label is fully localized", () => {
    for (const s of SKILLS) {
      expect(hasAllLocales(s.label)).toBe(true);
      expect(s.items.length).toBeGreaterThan(0);
    }
  });
});

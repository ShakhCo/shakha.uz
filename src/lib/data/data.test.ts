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

  it("every project has fully localized category, overview, and architecture", () => {
    for (const p of PROJECTS) {
      expect(hasAllLocales(p.category), `${p.slug} category`).toBe(true);
      expect(hasAllLocales(p.overview), `${p.slug} overview`).toBe(true);
      expect(hasAllLocales(p.architecture), `${p.slug} architecture`).toBe(true);
    }
  });

  it("every project responsibilities and engineering are non-empty and fully localized", () => {
    for (const p of PROJECTS) {
      expect(p.responsibilities.length, `${p.slug} responsibilities non-empty`).toBeGreaterThan(0);
      for (const r of p.responsibilities) {
        expect(hasAllLocales(r), `${p.slug} responsibility bullet`).toBe(true);
      }
      expect(p.engineering.length, `${p.slug} engineering non-empty`).toBeGreaterThan(0);
      for (const e of p.engineering) {
        expect(hasAllLocales(e), `${p.slug} engineering bullet`).toBe(true);
      }
    }
  });

  it("every project learnings is a non-empty array with each bullet fully localized", () => {
    for (const p of PROJECTS) {
      expect(p.learnings.length, `${p.slug} learnings non-empty`).toBeGreaterThan(0);
      for (const item of p.learnings) {
        expect(hasAllLocales(item), `${p.slug} learnings bullet`).toBe(true);
      }
    }
  });

  it("every project stackGroups are non-empty with fully localized labels and non-empty items", () => {
    for (const p of PROJECTS) {
      expect(p.stackGroups.length, `${p.slug} stackGroups non-empty`).toBeGreaterThan(0);
      for (const g of p.stackGroups) {
        expect(hasAllLocales(g.label), `${p.slug} stackGroup label`).toBe(true);
        expect(g.items.length, `${p.slug} stackGroup items non-empty`).toBeGreaterThan(0);
      }
    }
  });

  it("every experience item and its bullets are fully localized", () => {
    for (const e of EXPERIENCE) {
      expect(hasAllLocales(e.role), e.org).toBe(true);
      for (const b of e.bullets) expect(hasAllLocales(b)).toBe(true);
    }
  });

  it("EDUCATION has 2 items with unique slugs", () => {
    expect(EDUCATION).toHaveLength(2);
    expect(new Set(EDUCATION.map((e) => e.slug)).size).toBe(2);
  });

  it("every education item has localized degree, overview, non-empty localized learned bullets, and non-empty modules", () => {
    for (const item of EDUCATION) {
      expect(hasAllLocales(item.degree), `${item.slug} degree`).toBe(true);
      expect(hasAllLocales(item.overview), `${item.slug} overview`).toBe(true);
      expect(item.learned.length, `${item.slug} learned non-empty`).toBeGreaterThan(0);
      for (const bullet of item.learned) {
        expect(hasAllLocales(bullet), `${item.slug} learned bullet`).toBe(true);
      }
      expect(item.modules.length, `${item.slug} modules non-empty`).toBeGreaterThan(0);
      for (const mod of item.modules) {
        expect(mod.name.length, `${item.slug} module name non-empty`).toBeGreaterThan(0);
        expect(hasAllLocales(mod.description), `${item.slug} module description localized`).toBe(true);
      }
    }
  });

  it("every skill group label is fully localized", () => {
    for (const s of SKILLS) {
      expect(hasAllLocales(s.label)).toBe(true);
      expect(s.items.length).toBeGreaterThan(0);
    }
  });
});

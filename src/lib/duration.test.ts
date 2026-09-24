import { describe, it, expect } from "vitest";
import { periodMonths, formatDuration } from "./duration";

describe("periodMonths", () => {
  const now = new Date(2026, 8, 24); // Sep 2026

  it("counts months inclusively", () => {
    expect(periodMonths("Jan 2022 — Aug 2026", now)).toBe(56);
    expect(periodMonths("Feb 2022 — Aug 2022", now)).toBe(7);
  });

  it("treats Present as the current month", () => {
    expect(periodMonths("Aug 2026 — Present", now)).toBe(2);
  });

  it("returns null for unparseable periods", () => {
    expect(periodMonths("2021 — 2024", now)).toBeNull();
  });
});

describe("formatDuration", () => {
  it("formats per locale", () => {
    expect(formatDuration(56, "en")).toBe("4 yrs 8 mos");
    expect(formatDuration(12, "en")).toBe("1 yr");
    expect(formatDuration(1, "en")).toBe("1 mo");
    expect(formatDuration(56, "uz")).toBe("4 yil 8 oy");
    expect(formatDuration(56, "ru")).toBe("4 г. 8 мес.");
  });
});

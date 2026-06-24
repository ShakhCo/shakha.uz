import { describe, expect, it } from "vitest";
import { en } from "./dictionaries/en";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") return [prefix];
  return Object.entries(obj as Record<string, unknown>)
    .flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k))
    .sort();
}

describe("dictionary parity", () => {
  const base = keyPaths(en);
  it("uz has the same keys as en", () => {
    expect(keyPaths(uz)).toEqual(base);
  });
  it("ru has the same keys as en", () => {
    expect(keyPaths(ru)).toEqual(base);
  });
});

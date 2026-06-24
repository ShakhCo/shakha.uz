import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";

const dictionaries: Record<Locale, Dictionary> = { en, uz, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

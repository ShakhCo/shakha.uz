import type { Locale } from "@/lib/i18n/config";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "Aug 2026" → months since year 0; "Present" → the current month.
function toMonthIndex(part: string, now: Date): number | null {
  if (part.trim() === "Present") return now.getFullYear() * 12 + now.getMonth();
  const m = part.trim().match(/^([A-Z][a-z]{2}) (\d{4})$/);
  if (!m) return null;
  const month = MONTHS.indexOf(m[1]);
  return month < 0 ? null : Number(m[2]) * 12 + month;
}

// Inclusive month count for a period like "Jan 2022 — Aug 2026" (LinkedIn-style).
export function periodMonths(period: string, now = new Date()): number | null {
  const [start, end] = period.split("—");
  if (!start || !end) return null;
  const a = toMonthIndex(start, now);
  const b = toMonthIndex(end, now);
  if (a === null || b === null || b < a) return null;
  return b - a + 1;
}

const UNITS: Record<Locale, { y: (n: number) => string; m: (n: number) => string }> = {
  en: { y: (n) => `${n} ${n === 1 ? "yr" : "yrs"}`, m: (n) => `${n} ${n === 1 ? "mo" : "mos"}` },
  uz: { y: (n) => `${n} yil`, m: (n) => `${n} oy` },
  ru: { y: (n) => `${n} г.`, m: (n) => `${n} мес.` },
};

export function formatDuration(months: number, locale: Locale): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const u = UNITS[locale];
  return [years && u.y(years), rest && u.m(rest)].filter(Boolean).join(" ");
}

const MONTH_NAMES: Record<Locale, string[]> = {
  en: MONTHS,
  uz: ["yan.", "fev.", "mar.", "apr.", "may", "iyun", "iyul", "avg.", "sen.", "okt.", "noy.", "dek."],
  ru: ["янв.", "февр.", "март", "апр.", "май", "июнь", "июль", "авг.", "сент.", "окт.", "нояб.", "дек."],
};

const PRESENT: Record<Locale, string> = { en: "Present", uz: "hozirgacha", ru: "наст. время" };

// "Aug 2026 — Present" → "авг. 2026 — наст. время". Unrecognized parts pass through as-is.
export function formatPeriod(period: string, locale: Locale): string {
  return period
    .split("—")
    .map((part) => {
      const t = part.trim();
      if (t === "Present") return PRESENT[locale];
      const m = t.match(/^([A-Z][a-z]{2}) (\d{4})$/);
      const month = m ? MONTHS.indexOf(m[1]) : -1;
      return m && month >= 0 ? `${MONTH_NAMES[locale][month]} ${m[2]}` : t;
    })
    .join(" — ");
}

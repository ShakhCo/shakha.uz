import type { Locale } from "@/lib/i18n/config";
import type { ExperienceItem } from "@/lib/data/experience";

export function ExperienceItemRow({ item, locale, index }: { item: ExperienceItem; locale: Locale; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="relative border-l border-[var(--color-line)] pl-8 pb-12 last:pb-0">
      {/* Mono numbered index in signal */}
      <span
        className="absolute -left-4 top-0 font-mono text-xs font-medium leading-none text-[var(--color-signal)]"
        aria-hidden="true"
      >
        {num}
      </span>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold">{item.role[locale]}</h3>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">{item.period}</span>
      </div>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-signal)]">{item.org}</p>
      <ul className="mt-3 space-y-2 pl-0 text-base leading-relaxed text-[var(--color-muted)]">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[0.4em] shrink-0 text-[var(--color-line)]">◦</span>
            <span>{b[locale]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

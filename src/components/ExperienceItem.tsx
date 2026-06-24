import type { Locale } from "@/lib/i18n/config";
import type { ExperienceItem } from "@/lib/data/experience";

export function ExperienceItemRow({ item, locale }: { item: ExperienceItem; locale: Locale; index: number }) {
  return (
    <div className="border-t border-[var(--color-line)] pt-8 pb-10 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-3xl">
          {item.role[locale]}
        </h3>
        <span className="text-sm text-[var(--color-muted)]">{item.period}</span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{item.org}</p>
      <ul className="mt-4 space-y-2 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[0.45em] shrink-0 text-[var(--color-line)]">–</span>
            <span>{b[locale]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Locale } from "@/lib/i18n/config";
import type { ExperienceItem } from "@/lib/data/experience";

export function ExperienceItemRow({
  item,
  locale,
}: {
  item: ExperienceItem;
  locale: Locale;
  index: number;
}) {
  return (
    <div className="relative pb-12 pl-8 last:pb-0 md:pl-10">
      {/* Vertical rail */}
      <div
        aria-hidden="true"
        className="absolute left-[5px] top-2 h-full w-px bg-[var(--color-line)]"
      />
      {/* Node dot */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)] ring-1 ring-[var(--color-line)]"
      />

      {/* Period pill */}
      <span className="inline-block rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
        {item.period}
      </span>

      {/* Role + company */}
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-3xl">
        {item.role[locale]}
      </h3>
      <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
        {item.org}
      </p>

      {/* Bullets */}
      <ul className="mt-5 space-y-3">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-line)]"
            />
            <span className="text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
              {b[locale]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Locale } from "@/lib/i18n/config";
import type { ExperienceItem } from "@/lib/data/experience";
import { periodMonths, formatDuration, formatPeriod } from "@/lib/duration";

export function ExperienceItemRow({
  item,
  locale,
}: {
  item: ExperienceItem;
  locale: Locale;
  index: number;
}) {
  const months = periodMonths(item.period);

  return (
    <div className="relative pb-12 pl-8 last:pb-0 md:pb-14 md:pl-10">
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
      <span className="inline-flex flex-wrap items-center gap-x-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-alt)] px-3 py-1 text-sm font-medium text-[var(--color-ink)]">
        {formatPeriod(item.period, locale)}
        {months !== null && (
          <>
            <span aria-hidden="true" className="text-[var(--color-muted)]">·</span>
            <span className="text-[var(--color-muted)]">{formatDuration(months, locale)}</span>
          </>
        )}
      </span>

      {/* Logo + role + company */}
      <div className="mt-4 flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.logo}
          alt=""
          width={56}
          height={56}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1.5 ring-1 ring-[var(--color-line)] md:h-14 md:w-14"
        />
        <div className="min-w-0">
          <h3 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-3xl">
            {item.role[locale]}
          </h3>
          <p className="mt-1.5 text-base font-medium text-[var(--color-accent)] md:text-lg">
            {item.org[locale]}
          </p>
        </div>
      </div>

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

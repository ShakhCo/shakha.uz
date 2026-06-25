import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { EducationItem } from "@/lib/data/experience";

export function EducationCard({
  item,
  locale,
}: {
  item: EducationItem;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/education/${item.slug}/`}
      className="group flex items-center gap-5 rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[var(--color-line)] border border-transparent md:gap-6 md:p-8"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.logo}
        alt={item.school}
        className="h-14 w-14 shrink-0 rounded-xl md:h-16 md:w-16"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-2xl">
            {item.degree[locale]}
          </h3>
          <span className="text-sm text-[var(--color-muted)]">
            {item.period}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--color-muted)] md:text-base">
          {item.school}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        →
      </span>
    </Link>
  );
}

import type { Locale } from "@/lib/i18n/config";
import { EDUCATION } from "@/lib/data/experience";

export function EducationCard({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] md:gap-6 md:p-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/wiut.png"
        alt="Westminster International University in Tashkent"
        className="h-14 w-14 shrink-0 rounded-xl md:h-16 md:w-16"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-2xl">
            {EDUCATION.degree[locale]}
          </h3>
          <span className="text-sm text-[var(--color-muted)]">
            {EDUCATION.period}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--color-muted)] md:text-base">
          {EDUCATION.school}
        </p>
      </div>
    </div>
  );
}

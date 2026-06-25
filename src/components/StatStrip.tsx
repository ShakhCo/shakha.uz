import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { STATS } from "@/lib/data/skills";

export function StatStrip({ dict }: { dict: Dictionary }) {
  return (
    <dl className="grid grid-cols-3 py-8">
      {STATS.map((s, i) => (
        <div
          key={s.key}
          className={`flex flex-col items-center gap-1 px-3 text-center sm:px-6${
            i < STATS.length - 1
              ? " border-r border-[var(--color-line)]"
              : ""
          }`}
        >
          <dt className="text-3xl font-semibold leading-none tracking-tight text-[var(--color-ink)] sm:text-4xl md:text-6xl">
            {s.value}
          </dt>
          <dd className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm md:text-base">
            {dict.stats[s.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}

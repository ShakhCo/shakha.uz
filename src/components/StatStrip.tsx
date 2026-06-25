import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { STATS } from "@/lib/data/skills";

export function StatStrip({ dict }: { dict: Dictionary }) {
  return (
    <dl className="grid grid-cols-3 py-8">
      {STATS.map((s, i) => (
        <div
          key={s.key}
          className={`flex flex-col items-center gap-1 text-center${
            i < STATS.length - 1
              ? " border-r border-[var(--color-line)]"
              : ""
          }`}
        >
          <dt className="text-4xl font-semibold leading-none tracking-tight text-[var(--color-ink)] md:text-6xl">
            {s.value}
          </dt>
          <dd className="text-sm text-[var(--color-muted)] md:text-base">
            {dict.stats[s.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}

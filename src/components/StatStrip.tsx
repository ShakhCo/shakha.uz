/**
 * StatStrip — Three key stats with display bold numerals and mono uppercase captions.
 * Vertical hairline separators between stats (not cards).
 * Per design-system §5: font-display for numerals, font-mono uppercase muted captions.
 */

import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { STATS } from "@/lib/data/skills";

export function StatStrip({ dict }: { dict: Dictionary }) {
  return (
    <dl className="grid grid-cols-3 border-y border-[var(--color-line)] py-8">
      {STATS.map((s, i) => (
        <div
          key={s.key}
          className={`flex flex-col items-center gap-1 text-center${
            i < STATS.length - 1
              ? " border-r border-[var(--color-line)]"
              : ""
          }`}
        >
          <dt className="font-display text-4xl font-bold leading-none tracking-tight text-[var(--color-ink)] md:text-6xl">
            {s.value}
          </dt>
          <dd className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] md:text-xs">
            {dict.stats[s.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}

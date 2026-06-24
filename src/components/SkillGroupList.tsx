import type { Locale } from "@/lib/i18n/config";
import { SKILLS } from "@/lib/data/skills";

export function SkillGroupList({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {SKILLS.map((g) => (
        <div key={g.label.en}>
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{g.label[locale]}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li
                key={s}
                className="rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-ink)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

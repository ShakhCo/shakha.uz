import type { Locale } from "@/lib/i18n/config";
import { SKILLS } from "@/lib/data/skills";
import { SkillPill } from "@/components/SkillPill";

export function SkillGroupList({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {SKILLS.map((g) => (
        <div key={g.label.en}>
          <p className="text-sm font-medium text-[var(--color-muted)]">{g.label[locale]}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s}>
                <SkillPill name={s} label={s} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

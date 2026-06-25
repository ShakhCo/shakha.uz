import { getSkillIcon, getSkillColor } from "@/lib/skill-icons";

interface SkillTileProps {
  name: string;
  label: string;
}

/** A logo tile: large brand-colored icon over a small name label. */
export function SkillTile({ name, label }: SkillTileProps) {
  const Icon = getSkillIcon(name);
  const color = getSkillColor(name);
  return (
    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-3 py-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <Icon
        className={`h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-110${color ? "" : " text-[var(--color-muted)]"}`}
        style={color ? { color } : undefined}
        aria-hidden
      />
      <span className="text-xs font-medium leading-tight text-[var(--color-ink)]">
        {label}
      </span>
    </div>
  );
}

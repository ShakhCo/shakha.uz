import { getSkillIcon } from "@/lib/skill-icons";

interface SkillPillProps {
  name: string;
  label: string;
}

export function SkillPill({ name, label }: SkillPillProps) {
  const Icon = getSkillIcon(name);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-3.5 py-1.5 text-sm text-[var(--color-ink)]">
      <Icon className="h-4 w-4 shrink-0 text-[var(--color-muted)]" aria-hidden />
      {label}
    </span>
  );
}

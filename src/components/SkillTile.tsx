import { getSkillIcon, getSkillColor } from "@/lib/skill-icons";

interface SkillTileProps {
  name: string;
  label: string;
}

/** Skills whose real brand mark is an image rather than an icon font. */
const SKILL_IMAGE_MAP: Record<string, string> = {
  Payme: "/brand/payme.png",
};

/** A logo tile: large brand-colored icon (or brand image) over a name label. */
export function SkillTile({ name, label }: SkillTileProps) {
  const image = SKILL_IMAGE_MAP[name];
  const Icon = getSkillIcon(name);
  const color = getSkillColor(name);
  return (
    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-white px-3 py-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <span className="flex h-8 items-center justify-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={label}
            className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <Icon
            className={`h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-110${color ? "" : " text-[var(--color-muted)]"}`}
            style={color ? { color } : undefined}
            aria-hidden
          />
        )}
      </span>
      <span className="break-words text-xs font-medium leading-tight text-[var(--color-ink)]">
        {label}
      </span>
    </div>
  );
}

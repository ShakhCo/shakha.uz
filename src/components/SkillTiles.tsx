import { SKILLS } from "@/lib/data/skills";
import { SkillTile } from "./SkillTile";

/** The "What I work with" logo-tile grid inside a gradient container. */
export function SkillTiles() {
  return (
    <div
      className="rounded-[28px] p-5 sm:p-8 md:p-10"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #5b6cff 0%, #a855f7 50%, #ec4899 100%)",
      }}
    >
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {SKILLS.flatMap((g) => g.items).map((s) => (
          <SkillTile key={s} name={s} label={s} />
        ))}
      </div>
    </div>
  );
}

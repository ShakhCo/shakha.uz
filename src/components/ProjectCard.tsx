import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/projects";
import { BrowserFrame } from "./BrowserFrame";
import { TechIcon } from "@/lib/skill-icons";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}/`}
      className="group flex h-full flex-col rounded-[20px] bg-[var(--color-bg-alt)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      {/* Thumbnail — bright screenshot in a browser-window frame (or fallback) */}
      <BrowserFrame url={project.url}>
        {project.image ? (
          <div className="aspect-[16/10] w-full overflow-hidden bg-white">
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center bg-[var(--color-bg)]">
            <span className="px-6 text-center text-base font-semibold leading-snug text-[var(--color-muted)]">
              {project.name}
            </span>
          </div>
        )}
      </BrowserFrame>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-8 md:p-10">
        {/* Role */}
        <p className="text-sm text-[var(--color-muted)]">
          {project.role[locale]}
        </p>

        {/* Project name */}
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-3xl">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-3 flex-1 text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
          {project.description[locale]}
        </p>

        {/* Stack tag pills */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm text-[var(--color-muted)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <TechIcon name={t} />
              {t}
            </li>
          ))}
        </ul>

        {/* Navigate affordance */}
        <div className="mt-6">
          <span className="text-sm font-medium text-[var(--color-accent)]">
            {dict.projects.visit} →
          </span>
        </div>
      </div>
    </Link>
  );
}

import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/data/projects";

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
    <article className="group flex h-full flex-col rounded-[20px] bg-[var(--color-bg-alt)] p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-10">
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
            className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-sm text-[var(--color-muted)]"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* Visit link */}
      {project.url && (
        <div className="mt-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
          >
            {dict.projects.visit} ↗
          </a>
        </div>
      )}
    </article>
  );
}

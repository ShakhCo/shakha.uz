/**
 * ProjectCard — Flat surface+hairline card for a project.
 * Per design-system §5:
 *   - bg-[--color-surface] + 1px --color-line border at rest
 *   - Hover: border→ink, translateY(-2px)
 *   - font-display project name
 *   - mono `visit ↗` link in signal
 *   - mono uppercase text-[10px] muted role
 *   - Stack tags as mono chips: hairline border, text-[11px], rounded-sm (NOT pill)
 */

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
    <article
      className="group flex h-full flex-col border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-ink)]"
      style={{ borderRadius: 0 }}
    >
      {/* Top row: project name + visit link */}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-semibold leading-snug text-[var(--color-ink)]">
          {project.name}
        </h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-[11px] text-[var(--color-signal)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]"
          >
            {dict.projects.visit} ↗
          </a>
        )}
      </div>

      {/* Role */}
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {project.role[locale]}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink)]">
        {project.description[locale]}
      </p>

      {/* Stack chips — mono, rounded-sm, hairline border */}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-sm border border-[var(--color-line)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-muted)]"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

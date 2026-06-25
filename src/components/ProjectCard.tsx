import Link from "next/link";
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
    <Link
      href={`/${locale}/projects/${project.slug}/`}
      className="group flex h-full flex-col rounded-[20px] bg-[var(--color-bg-alt)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      {/* Thumbnail — image or tasteful fallback */}
      {project.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[14px]">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-all duration-500 [filter:saturate(0.8)_brightness(0.93)] group-hover:scale-[1.02] group-hover:[filter:saturate(1)_brightness(1)]"
          />
          {/* Rest-dim overlay that clears on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[var(--color-ink)]/[0.12] transition-opacity duration-500 group-hover:opacity-0"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] w-full flex items-center justify-center rounded-t-[14px] bg-[var(--color-bg)] border-b border-[var(--color-line)]">
          <span className="text-base font-semibold text-[var(--color-muted)] px-6 text-center leading-snug">
            {project.name}
          </span>
        </div>
      )}

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
              className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-sm text-[var(--color-muted)]"
            >
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

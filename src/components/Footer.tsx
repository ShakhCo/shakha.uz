import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import { SOCIALS, CONTACT } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="text-sm text-[var(--color-muted)]">
          <p>{dict.footer.built}</p>
          <p>© {year} Shakhzodbek Sharipov. {dict.footer.rights}</p>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <li>
            <Link href={`${base}/projects/`} className="transition-colors hover:text-[var(--color-ink)]">
              {dict.nav.projects}
            </Link>
          </li>
          <li>
            <Link href={`${base}/blog/`} className="transition-colors hover:text-[var(--color-ink)]">
              {dict.nav.blog}
            </Link>
          </li>
          <li>
            <Link href={`${base}/about/`} className="transition-colors hover:text-[var(--color-ink)]">
              {dict.nav.about}
            </Link>
          </li>
          <li>
            <Link href={`${base}/contact/`} className="transition-colors hover:text-[var(--color-ink)]">
              {dict.nav.contact}
            </Link>
          </li>
          <li>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-ink)]">
              GitHub
            </a>
          </li>
          <li>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-ink)]">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-[var(--color-ink)]">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

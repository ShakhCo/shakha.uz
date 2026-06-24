import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: `${base}/`, label: dict.nav.home },
    { href: `${base}/projects/`, label: dict.nav.projects },
    { href: `${base}/about/`, label: dict.nav.about },
    { href: `${base}/contact/`, label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href={`${base}/`}
          className="font-display text-lg font-bold tracking-tight"
        >
          Shakhzodbek<span className="text-[var(--color-signal)]">.</span>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher locale={locale} />
        </div>
      </nav>
    </header>
  );
}

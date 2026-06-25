import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: `${base}/`, label: dict.nav.home },
    { href: `${base}/projects/`, label: dict.nav.projects },
    { href: `${base}/blog/`, label: dict.nav.blog },
    { href: `${base}/about/`, label: dict.nav.about },
    { href: `${base}/contact/`, label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        <Link
          href={`${base}/`}
          className="text-lg font-semibold text-[var(--color-ink)]"
        >
          Shakhzodbek
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <NavLinks links={links} />
          <LocaleSwitcher locale={locale} />
          <NavMobileMenu links={links} />
        </div>
      </nav>
    </header>
  );
}

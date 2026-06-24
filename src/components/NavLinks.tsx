"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string };

export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  // Normalize: ensure trailing slash for comparison
  const normalized = pathname.endsWith("/") ? pathname : pathname + "/";

  return (
    <ul className="hidden gap-6 md:flex">
      {links.map((l) => {
        const isActive = normalized === l.href;
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              className={
                isActive
                  ? "border-b border-[var(--color-signal)] pb-0.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink)]"
                  : "font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

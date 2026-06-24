"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;

  function swap(target: Locale): string {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${target}/`;
    parts[0] = target;
    return `/${parts.join("/")}/`;
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={swap(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded px-2 py-1 text-sm transition-colors ${
            l === locale
              ? "font-medium text-[var(--color-ink)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          {LOCALE_LABELS[l]}
        </Link>
      ))}
    </div>
  );
}

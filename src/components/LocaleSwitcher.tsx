"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";

const FLAG: Record<Locale, string> = { en: "🇬🇧", uz: "🇺🇿", ru: "🇷🇺" };
const NAME: Record<Locale, string> = { en: "English", uz: "O'zbek", ru: "Русский" };

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function swap(target: Locale): string {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${target}/`;
    parts[0] = target;
    return `/${parts.join("/")}/`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-alt)]"
      >
        <span className="text-base leading-none">{FLAG[locale]}</span>
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          className={`h-3.5 w-3.5 text-[var(--color-muted)] transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[var(--color-line)] bg-white py-1 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        >
          {LOCALES.map((l) => (
            <Link
              key={l}
              href={swap(l)}
              role="option"
              aria-selected={l === locale}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg-alt)] ${
                l === locale
                  ? "font-medium text-[var(--color-ink)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              <span className="text-base leading-none">{FLAG[l]}</span>
              <span>{NAME[l]}</span>
              {l === locale && (
                <svg
                  className="ml-auto h-4 w-4 text-[var(--color-accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

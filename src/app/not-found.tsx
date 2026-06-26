import Link from "next/link";
import { Onest } from "next/font/google";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// The global 404 renders outside the [locale] tree, so it provides its own
// <html>/<body>. Content defaults to English; links point into /en/.
export default function NotFound() {
  const dict = getDictionary("en");

  return (
    <html lang="en" className={sans.variable}>
      <body className="overflow-x-hidden">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-7xl font-semibold tracking-[-0.03em] text-[var(--color-ink)] md:text-9xl">
            404
          </p>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--color-ink)] md:text-3xl">
            {dict.notFound.title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {dict.notFound.message}
          </p>
          <Link
            href="/en/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-7 py-3.5 text-base font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {dict.notFound.backHome}
            <span aria-hidden="true">→</span>
          </Link>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SOCIALS } from "@/lib/site";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "contact", title: dict.meta.contact.title, description: dict.meta.contact.description });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const tgHandle = CONTACT.telegram.replace(/^@/, "");
  const cards = [
    { label: dict.contact.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: dict.contact.telegram, value: CONTACT.telegram, href: `https://t.me/${tgHandle}` },
    { label: dict.contact.linkedin, value: "shakhzodbek-sharipov", href: SOCIALS.linkedin },
    { label: dict.contact.github, value: "ShakhCo", href: SOCIALS.github },
  ];

  return (
    <Section className="py-16 md:py-24">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-signal)]">▦ {dict.contact.title}</span>
      <h1 className="mt-3 font-display text-4xl font-semibold md:text-6xl">{dict.contact.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{dict.contact.intro}</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-transform hover:-translate-y-0.5 hover:border-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{c.label}</p>
            <p className="mt-2 font-display text-lg font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-signal)]">
              {c.value} ↗
            </p>
          </a>
        ))}
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SOCIALS } from "@/lib/site";
import { Section } from "@/components/Section";
import { SiTelegram } from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

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
    { label: dict.contact.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: LuMail, color: "#0071e3" },
    { label: dict.contact.telegram, value: CONTACT.telegram, href: `https://t.me/${tgHandle}`, Icon: SiTelegram, color: "#26A5E4" },
    { label: dict.contact.linkedin, value: "shakhzodbek-sharipov", href: SOCIALS.linkedin, Icon: FaLinkedin, color: "#0A66C2" },
    { label: dict.contact.github, value: "ShakhCo", href: SOCIALS.github, Icon: FaGithub, color: "#1d1d1f" },
  ];

  return (
    <Section className="py-24 md:py-32">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:text-6xl">
          {dict.contact.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-[var(--color-muted)] md:text-2xl">
          {dict.contact.intro}
        </p>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-[20px] bg-[var(--color-bg-alt)] p-8 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <c.Icon className="h-6 w-6" style={{ color: c.color }} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-muted)]">{c.label}</p>
              <p className="mt-1 truncate text-xl font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                {c.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

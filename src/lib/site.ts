import type { Locale } from "@/lib/i18n/config";

export const SITE_URL = "https://shakha.uz";

export const CONTACT = {
  email: "shakhzodbek.me@gmail.com",
  telegram: "@ShakhCo",
} as const;

export const SOCIALS = {
  linkedin: "https://linkedin.com/in/shakhzodbek-sharipov",
  github: "https://github.com/ShakhCo",
} as const;

// English CV doubles as the Russian one; Uzbek has its own.
export function cvPath(locale: Locale): string {
  return locale === "uz" ? "/Shakhzodbek-Sharipov-CV-uz.pdf" : "/Shakhzodbek-Sharipov-CV.pdf";
}

// Real headshot used for the Person ImageObject + on-page photo.
// Drop a square JPG (>=1000x1000) at public/shakhzodbek-sharipov.jpg.
export const PROFILE_IMAGE = {
  path: "/shakhzodbek-sharipov.jpg",
  width: 1200,
  height: 1200,
} as const;

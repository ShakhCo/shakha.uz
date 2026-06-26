import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Shakhzodbek Sharipov",
  referrer: "origin-when-cross-origin",
  alternates: {
    types: {
      "application/rss+xml": [
        { url: `${SITE_URL}/feed.xml`, title: "Shakhzodbek Sharipov — Blog" },
      ],
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

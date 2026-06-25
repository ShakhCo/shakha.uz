import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shakhzodbek Sharipov — Portfolio",
    short_name: "Shakhzodbek",
    start_url: "/en/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d1d1f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

export const SITE_URL = "https://shakha.uz";

export const CONTACT = {
  email: "shakhzodbek.me@gmail.com",
  telegram: "@ShakhCo",
} as const;

export const SOCIALS = {
  linkedin: "https://linkedin.com/in/shakhzodbek-sharipov",
  github: "https://github.com/ShakhCo",
} as const;

export const CV_PATH = "/Shakhzodbek-Sharipov-CV.pdf";

// Cloudflare Web Analytics beacon token. Get it from the Cloudflare dashboard:
// Analytics & Logs → Web Analytics → Add a site (shakha.uz) → copy the token
// from the JS snippet (the value of data-cf-beacon `"token": "..."`).
// Leave empty to disable the beacon (nothing renders).
export const CF_BEACON_TOKEN = "";

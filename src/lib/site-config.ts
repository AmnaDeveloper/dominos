/**
 * CENTRAL SITE CONFIG — single source of truth.
 *
 * To point the site at your real registered domain, change SITE_URL below
 * (no trailing slash) and update public/robots.txt, public/ads.txt and
 * next-sitemap.config.js which are static files.
 */

export const SITE_URL = "https://dominos-menu.us";
export const SITE_DOMAIN = "dominos-menu.us";

export const SITE_NAME = "Domino's Menu Guide";
export const SITE_TAGLINE = "Unofficial Domino's Menu & Deals Guide";
export const SITE_TITLE_DEFAULT =
  "Domino's Menu with Prices 2026 | Complete USA Guide";
export const SITE_DESCRIPTION =
  "Unofficial guide to the Domino's menu with example prices, coupons, deals, rewards, nutrition and ordering tips for 2026. Independent — always verify final prices at official checkout.";

// --- Brand palette (Domino's-inspired, on-brand blue + red) ---
export const COLORS = {
  primary: "#006491", // Domino's Blue — headers, hero bg, table headers
  accent: "#E31837", // Domino's Red — borders, markers, highlights, badges
  cta: "#C8102E", // deep red — buttons, in-text links, alerts
  bg: "#ffffff", // page background
  lightBlue: "#E6F2F7", // section bands
  lightRed: "#FDE8EC", // highlight bg
  navy: "#003F5C", // deep text
} as const;

// --- Third-party IDs ---
// Keep empty until real IDs are issued. Placeholder IDs should not be rendered
// during AdSense review because they make the site look unfinished.
export const GA4_ID = "";
export const ADSENSE_PUB_ID = "";
export const ADSENSE_ADS_TXT_ID = "";
export const GOOGLE_SITE_VERIFICATION = "";
export const CLARITY_ID = "";

export const NOT_AFFILIATED_DISCLAIMER =
  "This is an independent, unofficial informational guide. It is not affiliated with, endorsed by, or sponsored by Domino's Pizza LLC. All trademarks belong to their respective owners. Prices shown are examples and may vary by location — always verify final prices at official checkout.";

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

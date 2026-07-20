/**
 * CENTRAL SITE CONFIG — single source of truth.
 *
 * To point the site at your real registered domain, change SITE_URL below
 * (no trailing slash) and update public/robots.txt, public/ads.txt and
 * next-sitemap.config.js which are static files.
 */

export const SITE_URL = "https://dominos-menu-guide.us";
export const SITE_DOMAIN = "dominos-menu-guide.us";

export const SITE_NAME = "Domino's Menu Guide";
export const SITE_TAGLINE = "Unofficial Domino's Menu & Deals Guide";
export const SITE_TITLE_DEFAULT =
  "Domino's Menu with Prices 2026 | Complete USA Guide";
export const SITE_DESCRIPTION =
  "Unofficial guide to the Domino's menu with example prices, coupons, deals, rewards, nutrition and ordering tips for 2026. Independent — always verify final prices at official checkout.";

// Display-only phone. Always direct users to the official app/site to order.
export const DISPLAY_PHONE = "1-800-DOMINOS";

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

// --- Third-party IDs (placeholders — swap when provisioned) ---
export const GA4_ID = "G-XXXXXXX";
export const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX";
export const ADSENSE_ADS_TXT_ID = "pub-XXXXXXXXXXXXXXXX";
export const GOOGLE_SITE_VERIFICATION = "google-site-verification-placeholder";
export const CLARITY_ID = "XXXXXXXXXX";

// --- Social links (external, rel="nofollow noopener") ---
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/Dominos",
  twitter: "https://twitter.com/dominos",
  instagram: "https://www.instagram.com/dominos",
  youtube: "https://www.youtube.com/dominos",
} as const;

export const NOT_AFFILIATED_DISCLAIMER =
  "This is an independent, unofficial informational guide. It is not affiliated with, endorsed by, or sponsored by Domino's Pizza LLC. All trademarks belong to their respective owners. Prices shown are examples and may vary by location — always verify final prices at official checkout.";

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

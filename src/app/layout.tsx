import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AutoDateUpdater from "@/components/AutoDateUpdater";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_DESCRIPTION,
  ADSENSE_PUB_ID,
  GA4_ID,
  GOOGLE_SITE_VERIFICATION,
  absoluteUrl,
} from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Local font stub kept intentionally (see reference). Swap for a real
// next/font/local declaration if a licensed brand font is added later.
const papaSans = { variable: "" };

const hasRealAdSenseId = /^ca-pub-\d+$/.test(ADSENSE_PUB_ID);
const hasRealGa4Id = /^G-[A-Z0-9]+$/.test(GA4_ID);
const hasRealGoogleVerification = Boolean(GOOGLE_SITE_VERIFICATION);

export const viewport: Viewport = {
  themeColor: "#C8102E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: "%s | Domino's Menu Guide",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Domino's menu with prices",
    "Domino's coupons",
    "Domino's deals 2026",
    "Domino's rewards",
    "Domino's menu prices",
    "Domino's near me",
    "Domino's specialty pizzas",
    "Domino's nutrition",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: "Amna Sadam" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // FAVICON TEST: change these two paths to try each favicon.
    // Options: /favicon.png, /favicon.jpeg, /favicon1.jpeg
    icon: "/favicon1.jpeg",
    apple: "/favicon1.jpeg",
  },
  ...(hasRealGoogleVerification ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
        width: 512,
        height: 512,
      },
      description:
        "Independent, unofficial informational guide to Domino's menu prices, coupons, delivery and ordering tips.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      // No SearchAction. This used to declare a sitewide search at
      // `/?s={search_term_string}` — the WordPress search convention, on a
      // Next.js site that has no search at all. `/?s=pizza` simply returns the
      // homepage. Google crawled the literal template URL and reported it under
      // "Alternate page with proper canonical tag". Announcing a feature that
      // does not exist is the sort of inaccurate markup this site is trying to
      // get away from; add it back only if real search is ever built.
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#about-this-site`,
      url: SITE_URL,
      name: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: [
        "Domino's menu prices",
        "Domino's coupons",
        "Domino's delivery",
        "Pizza ordering guides",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hero is a CSS gradient (no LCP image to preload) */}
        {/* Ad/analytics perf hints */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {hasRealAdSenseId ? <meta name="google-adsense-account" content={ADSENSE_PUB_ID} /> : null}

        {/* Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${papaSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-[#C8102E] focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
        >
          Skip to content
        </a>
        <AutoDateUpdater />
        {children}

        {hasRealAdSenseId ? (
          <Script
            id="adsbygoogle-init"
            async
            strategy="lazyOnload"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
          />
        ) : null}

        {hasRealGa4Id ? (
          <>
            <Script
              id="ga4-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', { anonymize_ip: true });
          `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

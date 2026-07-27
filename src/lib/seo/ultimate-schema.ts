import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site-config";

/** Full @graph for high-value informational pages. */
export function ultimateSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/favicon.png"),
        description:
          "Independent, unofficial informational guide to Domino's menu prices, coupons, delivery and ordering tips.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#about-this-site`,
        url: SITE_URL,
        name: "Domino's Menu Guide",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: ["Domino's menu prices", "Domino's coupons", "Domino's delivery"],
      },
    ],
  };
}

export function menuItemSchema(item: {
  title: string;
  description: string;
  price: string;
  slug: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.title,
    description: item.description,
    image: absoluteUrl(item.image),
    url: absoluteUrl(`/menus-prices/${item.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: item.price.replace(/[^0-9.]/g, ""),
    },
  };
}

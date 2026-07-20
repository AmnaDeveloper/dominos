import { SITE_URL, SITE_NAME, SOCIAL_LINKS, absoluteUrl } from "@/lib/site-config";

/** Full @graph for high-value pages (Organization + WebSite + Restaurant). */
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
        sameAs: Object.values(SOCIAL_LINKS),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Restaurant",
        "@id": `${SITE_URL}/#restaurant`,
        name: "Domino's Pizza",
        servesCuisine: ["Pizza", "Italian-American", "Fast Food"],
        priceRange: "$$",
        hasMenu: absoluteUrl("/menus-prices"),
        acceptsReservations: false,
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

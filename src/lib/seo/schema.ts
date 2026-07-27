import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site-config";
import type { FAQ } from "@/data/types";

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export function generateRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Domino's Menu Guide",
    description:
      "Independent, unofficial guide to Domino's menu prices, coupons, delivery and ordering tips.",
    url: SITE_URL,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: ["Domino's menu prices", "Domino's coupons", "Domino's delivery"],
  };
}

export function generateMenuSchema(
  items: { title: string; description: string; price: string; slug: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Domino's Menu (Unofficial Guide)",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Menu Items",
      hasMenuItem: items.map((i) => ({
        "@type": "MenuItem",
        name: i.title,
        description: i.description,
        url: absoluteUrl(`/menus-prices/${i.slug}`),
        offers: { "@type": "Offer", price: i.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD" },
      })),
    },
  };
}

export function generateProductSchema(item: {
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  sizes: { size: string; price: string }[];
  slug: string;
}) {
  const prices = item.sizes.map((s) => parseFloat(s.price.replace(/[^0-9.]/g, ""))).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.description,
    image: absoluteUrl(item.image),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: item.sizes.length,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/menus-prices/${item.slug}`),
    },
  };
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripHtml(f.question),
      acceptedAnswer: { "@type": "Answer", text: stripHtml(f.answer) },
    })),
  };
}

export function generateBreadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  url: string;
  wordCount?: number;
  section?: string;
  keywords?: string[];
  content?: string;
}) {
  const wordCount =
    post.wordCount ??
    (post.content ? stripHtml(post.content).split(/\s+/).filter(Boolean).length : undefined);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.slice(0, 110),
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(post.image),
      width: 1200,
      height: 630,
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    ...(post.section ? { articleSection: post.section } : {}),
    ...(post.keywords && post.keywords.length ? { keywords: post.keywords.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: {
      "@type": "Person",
      name: post.authorName,
      url: `${SITE_URL}/team`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": post.url },
  };
}

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site-config";
import { getMonthYear } from "@/lib/utils/date";

export const siteName = SITE_NAME;

/** Trim a description to a clean ~158 chars so it doesn't get cut off in SERPs. */
export function clampDescription(s: string, max = 158): string {
  const text = s.trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "").trim() + "…";
}

interface PageSEOInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}

export function generatePageSEO({
  title,
  description,
  path,
  keywords = [],
  image = "/dominos-menu-with-prices.jpeg",
}: PageSEOInput): Metadata {
  const url = absoluteUrl(path);
  const desc = clampDescription(description);
  return {
    title,
    description: desc,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [absoluteUrl(image)] },
  };
}

export function generateMenuItemSEO(item: {
  title: string;
  description: string;
  slug: string;
  image: string;
  price: string;
}): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `${item.title} Price & Calories (${month})`,
    description: `${item.description} Example price from ${item.price}. Verify at official checkout.`,
    path: `/menus-prices/${item.slug}`,
    image: item.image,
    keywords: [`${item.title} price`, `Domino's ${item.title}`, "Domino's menu"],
  });
}

export function generateArticleSEO(post: {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  keywords?: string[];
  rootLevel?: boolean;
}): Metadata {
  const path = post.rootLevel ? `/${post.slug}` : `/posts/${post.slug}`;
  const url = absoluteUrl(path);
  const desc = clampDescription(post.excerpt);
  return {
    title: post.title,
    description: desc,
    keywords: post.keywords ?? [],
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: absoluteUrl(post.image), width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: desc, images: [absoluteUrl(post.image)] },
  };
}

export { SITE_URL };

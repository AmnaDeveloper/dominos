import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { posts, postHref } from "@/data/posts";
import { getMenuSlugsExcludingDrinks } from "@/data/complete-menu";
import { getLocationSlugs } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/menus-prices`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/coupons`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/dominos-rewards`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/dominos-delivery-near-me`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/store-locator`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/posts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/drinks`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/hours`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}${postHref(p)}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "weekly",
    priority: p.featured ? 0.85 : 0.7,
  }));

  const menuUrls: MetadataRoute.Sitemap = getMenuSlugsExcludingDrinks().map((slug) => ({
    url: `${SITE_URL}/menus-prices/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const locationUrls: MetadataRoute.Sitemap = getLocationSlugs().map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...core, ...postUrls, ...menuUrls, ...locationUrls];
}

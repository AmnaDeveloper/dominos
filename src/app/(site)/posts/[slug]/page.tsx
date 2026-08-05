import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostArticle from "@/components/posts/PostArticle";
import InternalLinks from "@/components/seo/InternalLinks";
import { getPostBySlug, getStandardPostSlugs, postHref } from "@/data/posts";
import { getAuthor } from "@/data/authors";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schema";
import { generateArticleSEO } from "@/lib/seo-config";
import { absoluteUrl } from "@/lib/site-config";
import { getMonthYear, getTodayFormatted } from "@/lib/utils/date";

export const revalidate = 86400;

export function generateStaticParams() {
  // Root-level flagship posts are excluded (they render at /slug).
  return getStandardPostSlugs().map((slug) => ({ slug }));
}

const CUSTOM_TITLES: Record<string, (m: string, d: string) => string> = {
  "dominos-menu-with-prices-2026": (m) => `Domino's Menu with Prices (${m}): Complete USA Guide`,
  "dominos-coupons-promo-codes-2026": (m) => `Domino's Coupons & Promo Codes (${m})`,
  "how-to-save-money-at-dominos": (m) => `How to Save Money at Domino's (${m})`,
  "dominos-calories-nutrition-guide": (m) => `Domino's Calories Per Slice & Nutrition (${m})`,
  "dominos-parmesan-stuffed-crust": (m) => `Domino's Parmesan Stuffed Crust: Price & Calories (${m})`,
  "dominos-sides-menu-prices": (m) => `Domino's Sides Menu with Prices (${m})`,
  "dominos-specialty-pizzas": (m) => `Domino's Specialty Pizzas & Prices (${m})`,
  "dominos-toppings-list-prices": (m) => `Domino's Toppings List & Prices (${m})`,
  "dominos-vegetarian-vegan-options": (m) => `Domino's Vegetarian & Vegan Options (${m})`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const month = getMonthYear();
  const date = getTodayFormatted();
  const base = generateArticleSEO(post);

  // Root-level flagship: canonical must point to /slug
  if (post.rootLevel) {
    return { ...base, alternates: { canonical: `/${slug}` } };
  }
  if (CUSTOM_TITLES[slug]) {
    return { ...base, title: CUSTOM_TITLES[slug](month, date) };
  }
  return base;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.rootLevel) notFound();

  const article = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    authorName: getAuthor(post.author).name,
    url: absoluteUrl(postHref(post)),
    section: post.category,
    keywords: post.keywords,
    content: post.content,
  });
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/posts" },
    { name: post.title, path: postHref(post) },
  ]);
  const faq = generateFAQSchema(post.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <PostArticle post={post} />
      <div className="container-max">
        <InternalLinks />
      </div>
    </>
  );
}

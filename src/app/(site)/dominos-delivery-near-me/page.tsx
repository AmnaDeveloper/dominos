import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostArticle from "@/components/posts/PostArticle";
import InternalLinks from "@/components/seo/InternalLinks";
import { getPostBySlug, postHref } from "@/data/posts";
import { getAuthor } from "@/data/authors";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schema";
import { generateArticleSEO } from "@/lib/seo-config";
import { absoluteUrl } from "@/lib/site-config";

export const revalidate = 86400;

const SLUG = "dominos-delivery-near-me";

export function generateMetadata(): Metadata {
  const post = getPostBySlug(SLUG);
  if (!post) return {};
  return generateArticleSEO(post); // canonical resolves to /slug via rootLevel
}

export default function DeliveryNearMePage() {
  const post = getPostBySlug(SLUG);
  if (!post) notFound();

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
    { name: post.title, path: `/${SLUG}` },
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

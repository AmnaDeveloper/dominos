import type { Post } from "./types";
import postsData from "./posts.json";

export const posts = postsData as Post[];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Slugs that render under /posts/[slug] (excludes root-level flagships). */
export function getStandardPostSlugs(): string[] {
  return posts.filter((p) => !p.rootLevel).map((p) => p.slug);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Canonical internal link for a post. Root-level flagship posts (e.g.
 * dominos-delivery-near-me) live at /slug; everything else at /posts/slug.
 */
export function postHref(post: Pick<Post, "slug" | "rootLevel">): string {
  return post.rootLevel ? `/${post.slug}` : `/posts/${post.slug}`;
}

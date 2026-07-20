import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MenuItemDetail from "@/components/MenuItemDetail";
import InternalLinks from "@/components/seo/InternalLinks";
import { getMenuItemBySlug, getMenuSlugsExcludingDrinks } from "@/data/complete-menu";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { generateMenuItemSEO } from "@/lib/seo-config";

export const revalidate = 86400;

export function generateStaticParams() {
  return getMenuSlugsExcludingDrinks().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) return {};
  return generateMenuItemSEO(item);
}

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item || item.slug === "drinks") notFound();

  const product = generateProductSchema(item);
  const faq = generateFAQSchema(item.faqs);
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Menu & Prices", path: "/menus-prices" },
    { name: item.title, path: `/menus-prices/${item.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <MenuItemDetail item={item} pagePath={`/menus-prices/${item.slug}`} />
      <div className="container-max">
        <InternalLinks />
      </div>
    </>
  );
}

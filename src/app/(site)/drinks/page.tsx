import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MenuItemDetail from "@/components/MenuItemDetail";
import InternalLinks from "@/components/seo/InternalLinks";
import { getMenuItemBySlug } from "@/data/complete-menu";
import { generateMenuItemSchema, generateFAQSchema } from "@/lib/seo/schema";
import { generateMenuItemSEO } from "@/lib/seo-config";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const item = getMenuItemBySlug("drinks");
  if (!item) return {};
  return generateMenuItemSEO(item);
}

export default function DrinksPage() {
  const item = getMenuItemBySlug("drinks");
  if (!item) notFound();

  const menuItem = generateMenuItemSchema(item);
  const faq = generateFAQSchema(item.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuItem) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <MenuItemDetail item={item} pagePath="/drinks" />
      <div className="container-max">
        <InternalLinks />
      </div>
    </>
  );
}

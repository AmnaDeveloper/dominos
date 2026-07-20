import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import MenuGuideSection from "@/components/MenuGuideSection";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { completeMenu, MENU_CATEGORIES } from "@/data/complete-menu";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schema";
import { generatePageSEO } from "@/lib/seo-config";
import { getMonthYear } from "@/lib/utils/date";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `Domino's Menu with Prices (${month})`,
    description: "The full Domino's menu organized by category with example 2026 prices — pizzas, specialty pizzas, chicken, sides, desserts and drinks. Verify at checkout.",
    path: "/menus-prices",
    keywords: ["Domino's menu with prices", "Domino's menu prices", "Domino's menu 2026"],
  });
}

const menuFaqs: FAQ[] = [
  { question: "How much is the Domino's menu on average?", answer: "Large pizzas typically run $11.99–$17.99, sides $6.99–$8.99, and desserts $4.99–$6.99 at carryout. Prices are franchise-set and vary — verify at official checkout." },
  { question: "What's the cheapest thing on the Domino's menu?", answer: "Sides like bread twists and value deals like Mix & Match items are the cheapest ways to order. Carryout is cheaper than delivery." },
  { question: "Does Domino's menu change?", answer: "The core menu is stable, but limited-time items and prices change. We update this guide monthly." },
  { question: "Are Domino's prices the same nationwide?", answer: "No. Each franchise sets its own prices, so the same item costs different amounts in different locations." },
];

export default function MenusPricesPage() {
  const month = getMonthYear();
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Menu & Prices", path: "/menus-prices" },
  ]);
  const faqSchema = generateFAQSchema(menuFaqs);

  const categoriesWithItems = MENU_CATEGORIES.map((cat) => ({
    name: cat,
    items: completeMenu.filter((m) => m.category === cat),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s Menu with Prices ({month})</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Browse the full Domino&apos;s menu by category with example 2026
            prices. Domino&apos;s is franchise-priced, so treat every figure as
            guidance and verify the final total at official checkout.
          </p>
        </div>
      </div>

      {/* Category anchor buttons */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-max py-3 flex flex-wrap gap-2">
          {MENU_CATEGORIES.map((c) => (
            <a key={c} href={`#${c.replace(/\s|&/g, "-").toLowerCase()}`} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#006491]">
              {c}
            </a>
          ))}
        </div>
      </div>

      <MenuGuideSection />

      {/* Per-category cards for items with detail pages */}
      <div className="container-max pb-10">
        {categoriesWithItems.filter((c) => c.items.length > 0).map((cat) => (
          <section key={cat.name} id={cat.name.replace(/\s|&/g, "-").toLowerCase()} className="py-6">
            <h2 className="section-mini-heading mb-4">{cat.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug === "drinks" ? "/drinks" : `/menus-prices/${item.slug}`}
                  className="rounded-xl border border-slate-200 overflow-hidden hover:border-[#006491] hover:shadow-sm transition flex flex-col"
                >
                  <div className="relative aspect-[16/9]">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width:768px) 100vw, 350px" className="object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-slate-900 leading-snug">{item.title}</h3>
                      <span className="font-black shrink-0" style={{ color: "#C8102E" }}>{item.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <FaqAccordion faqs={menuFaqs} title={`Domino's Menu FAQ (${month})`} />
        <InternalLinks />
      </div>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Star, Check, X } from "lucide-react";
import type { MenuItem } from "@/data/types";
import FaqAccordion from "@/components/FaqAccordion";
import PageComments from "@/components/PageComments";
import AuthorBio from "@/components/AuthorBio";
import LastUpdated from "@/components/LastUpdated";
import Breadcrumbs from "@/components/Breadcrumbs";
import { completeMenu } from "@/data/complete-menu";

export default function MenuItemDetail({
  item,
  pagePath,
}: {
  item: MenuItem;
  pagePath: string;
}) {
  const related = completeMenu.filter((m) => m.slug !== item.slug).slice(0, 3);

  return (
    <>
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <LastUpdated />
            <h1 className="post-hero-title mt-3">{item.title}</h1>
            <p className="mt-3 text-white/85">{item.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1">
                <Star size={15} fill="#E31837" color="#E31837" /> {item.rating} ({item.reviewCount.toLocaleString()} reviews)
              </span>
              <span>From {item.price} · {item.calories} cal</span>
            </div>
          </div>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container-max pt-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Menu & Prices", href: "/menus-prices" },
            { name: item.title },
          ]}
        />
      </div>

      <div className="container-max py-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: item.fullContent }} />

          {/* Sizes price table */}
          <h2 className="post-table-heading mt-8 mb-3" style={{ color: "#006491" }}>Sizes & Example Prices</h2>
          <div className="blog-content">
            <table>
              <thead>
                <tr><th>Size / Option</th><th>Example Price</th><th>Calories</th></tr>
              </thead>
              <tbody>
                {item.sizes.map((s) => (
                  <tr key={s.size}><td>{s.size}</td><td>{s.price}</td><td>{s.calories ?? "—"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="price-disclaimer">Example prices — verify final price at official checkout.</p>

          {/* Allergen grid */}
          <h2 className="post-table-heading mt-8 mb-3" style={{ color: "#006491" }}>Allergens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {item.allergens.map((a) => (
              <div key={a.name} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                {a.present ? <Check size={15} className="text-red-600" /> : <X size={15} className="text-slate-300" />}
                <span className={a.present ? "font-semibold" : "text-slate-400"}>{a.name}</span>
              </div>
            ))}
          </div>
          <p className="price-disclaimer mt-2">
            Prepared in shared kitchens — not suitable for severe allergies. Verify allergen info officially.
          </p>

          <div className="mt-8">
            <FaqAccordion faqs={item.faqs} title={`${item.title} — FAQ`} />
          </div>

          <div className="mt-8">
            <AuthorBio authorId="dana-lopez" />
          </div>

          <PageComments pagePath={pagePath} />
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="post-sidebar-heading mb-3" style={{ color: "#006491" }}>Ingredients</h3>
            <ul className="space-y-1 text-sm">
              {item.ingredients.map((ing) => (
                <li key={ing} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#E31837" }} /> {ing}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: "#E6F2F7" }}>
            <h3 className="post-sidebar-heading mb-3" style={{ color: "#006491" }}>Related Items</h3>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={r.slug === "drinks" ? "/drinks" : `/menus-prices/${r.slug}`} className="group flex items-center gap-3">
                    <span className="relative h-14 w-16 shrink-0 rounded-lg overflow-hidden">
                      <Image src={r.image} alt={r.imageAlt} fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-[#C8102E] leading-snug">
                      {r.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/data/types";
import { posts, postHref } from "@/data/posts";
import FaqAccordion from "@/components/FaqAccordion";
import PageComments from "@/components/PageComments";
import AuthorBio from "@/components/AuthorBio";
import LastUpdated from "@/components/LastUpdated";
import Breadcrumbs from "@/components/Breadcrumbs";
import SavingsCalculator from "@/components/posts/SavingsCalculator";
import FamilyPicks from "@/components/posts/FamilyPicks";

export default function PostArticle({ post }: { post: Post }) {
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const path = postHref(post);

  return (
    <>
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <LastUpdated />
            <span className="ml-2 text-[10px] uppercase font-bold bg-white/15 px-2 py-1 rounded">{post.category}</span>
            <h1 className="post-hero-title mt-3">{post.title}</h1>
            <p className="mt-3 text-white/85">{post.excerpt}</p>
            <p className="mt-3 text-sm text-white/70">{post.readTime}</p>
          </div>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image
              src={post.image}
              alt={post.imageAlt}
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
          items={
            post.rootLevel
              ? [{ name: "Home", href: "/" }, { name: post.title }]
              : [{ name: "Home", href: "/" }, { name: "Guides", href: "/posts" }, { name: post.title }]
          }
        />
      </div>

      <div className="container-max py-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          {/* Special interactive blocks */}
          {post.slug === "how-to-save-money-at-dominos" && <SavingsCalculator />}
          {post.slug === "best-dominos-pizzas-for-families" && <FamilyPicks />}

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.pricing && post.pricing.length > 0 && (
            <>
              <h2 className="post-table-heading mt-8 mb-3" style={{ color: "#006491" }}>Example Prices</h2>
              <div className="blog-content">
                <table>
                  <thead>
                    <tr><th>Item</th><th>Size / Option</th><th>Example Price</th><th>Cal.</th></tr>
                  </thead>
                  <tbody>
                    {post.pricing.map((r, i) => (
                      <tr key={i}><td>{r.item}</td><td>{r.size ?? r.notes ?? "—"}</td><td>{r.price}</td><td>{r.calories ?? "—"}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="price-disclaimer">Example prices — verify at official checkout.</p>
            </>
          )}

          <div className="mt-8">
            <FaqAccordion faqs={post.faqs} title={`${post.title} — FAQ`} />
          </div>

          <div className="mt-8">
            <AuthorBio authorId={post.author} />
          </div>

          <PageComments pagePath={path} />
        </article>

        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <div className="rounded-xl p-5" style={{ backgroundColor: "#E6F2F7" }}>
            <h3 className="post-sidebar-heading mb-3" style={{ color: "#006491" }}>Related Guides</h3>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={postHref(r)} className="group flex items-center gap-3">
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
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="post-sidebar-heading mb-3" style={{ color: "#006491" }}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menus-prices" className="hover:underline" style={{ color: "#C8102E" }}>Menu with Prices</Link></li>
              <li><Link href="/coupons" className="hover:underline" style={{ color: "#C8102E" }}>Coupons & Deals</Link></li>
              <li><Link href="/dominos-rewards" className="hover:underline" style={{ color: "#C8102E" }}>Domino's Rewards</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

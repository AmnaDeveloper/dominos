import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Tag, Star, Truck } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { posts, postHref } from "@/data/posts";
import { generatePageSEO } from "@/lib/seo-config";
import { getMonthYear } from "@/lib/utils/date";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `Domino's Guides, Tips & Menu Help (${month})`,
    description:
      "The complete library of Domino's guides — menu with prices, coupons, deals, rewards, pizza sizes, crusts, delivery and money-saving tips for 2026. Original, monthly-updated, and genuinely useful.",
    path: "/posts",
    keywords: ["Domino's guides", "Domino's tips", "Domino's menu guide", "Domino's how to save"],
  });
}

const faqs: FAQ[] = [
  { question: "How often are these guides updated?", answer: "We refresh the content monthly and stamp every guide with a date, so you always know how current it is. Prices and deals change, and we'd rather keep up than let a page go stale." },
  { question: "Are these official Domino's guides?", answer: "No, and we say so on every page. This is an independent, unofficial resource built by people who order a lot of pizza. Always verify live prices and deals on the official Domino's app before you pay." },
  { question: "Which guide should I start with?", answer: "If you're brand new, start with the Menu with Prices pillar to get the lay of the land, then read the Coupons guide so you never overpay again. Those two cover most of what people need." },
  { question: "Do you cover local Domino's info?", answer: "We do. Head to the store locator and the city guides for location-specific hours, delivery notes and example prices near you." },
  { question: "How do you decide what to write about?", answer: "We write the guides people actually search for — real questions about prices, deals, sizes, crusts and ordering. If readers keep asking something, it becomes a guide." },
  { question: "Can I trust the prices you list?", answer: "Treat every price as a realistic example, not a guarantee. Domino's is franchise-priced, so numbers vary by location. We cross-check against publicly posted menus and label everything clearly." },
];

const CATEGORY_ORDER = [
  "Menu Guides",
  "Deals & Coupons",
  "Money Saving",
  "Rewards",
  "Ordering Guides",
];

export default function PostsIndexPage() {
  const month = getMonthYear();
  const featured = posts.filter((p) => p.featured);

  // Group posts by category, preserving a sensible order.
  const byCategory = new Map<string, typeof posts>();
  for (const p of posts) {
    if (!byCategory.has(p.category)) byCategory.set(p.category, []);
    byCategory.get(p.category)!.push(p);
  }
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <>
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-14">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s Guides, Tips &amp; Menu Help ({month})</h1>
          <p className="mt-4 max-w-2xl text-white/85 leading-relaxed">
            Everything we know about ordering Domino&apos;s well, in one place.
            Real prices, honest deal breakdowns, size and crust advice, and the
            money-saving moves most people miss. All original, all updated
            monthly, none of it copied from anywhere.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5"><BookOpen size={15} /> {posts.length} in-depth guides</span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5"><Tag size={15} /> Deals decoded</span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5"><Star size={15} /> Rewards explained</span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5"><Truck size={15} /> Ordering &amp; delivery</span>
          </div>
        </div>
      </div>

      <div className="container-max py-14">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <p className="text-slate-700 leading-relaxed">
            Let&apos;s be honest — most &quot;Domino&apos;s menu&quot; pages online
            are thin, out of date, or just scraped from somewhere else. We wanted
            something better. Every guide here is written from scratch by people
            who genuinely order this stuff, fact-checked against posted menus, and
            refreshed month to month. Whether you&apos;re trying to figure out the
            cheapest way to feed a family or you just want to know how big a large
            actually is, there&apos;s a guide below for it.
          </p>
        </div>

        {/* Start here — featured */}
        {featured.length > 0 && (
          <section className="mb-14">
            <h2 className="section-mini-heading mb-2">Start Here</h2>
            <p className="text-slate-600 mb-6 max-w-2xl">New to the site? These are the guides we&apos;d hand a first-timer.</p>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <Link key={p.slug} href={postHref(p)} className="rounded-2xl border-2 overflow-hidden hover:shadow-md transition flex flex-col" style={{ borderColor: "#006491" }}>
                  <div className="relative aspect-[16/9]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wide" style={{ color: "#C8102E" }}>{p.category}</span>
                    <h3 className="font-bold mt-2 text-slate-900 leading-snug">{p.title}</h3>
                    <p className="text-sm text-slate-600 mt-3 flex-1 leading-relaxed">{p.excerpt}</p>
                    <span className="text-xs text-slate-400 mt-4">{p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category-grouped */}
        {orderedCategories.map((cat) => (
          <section key={cat} className="mb-14">
            <h2 className="section-mini-heading mb-6">{cat}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory.get(cat)!.map((p) => (
                <Link key={p.slug} href={postHref(p)} className="rounded-xl border border-slate-200 overflow-hidden hover:border-[#006491] hover:shadow-sm transition flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 350px" className="object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{p.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">{p.excerpt}</p>
                    <span className="text-xs text-slate-400 mt-3">{p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Editorial standards */}
        <section className="rounded-2xl p-8 mb-14" style={{ backgroundColor: "#E6F2F7" }}>
          <h2 className="section-mini-heading mb-4">How We Write These Guides</h2>
          <p className="text-slate-700 leading-relaxed max-w-3xl">
            Here&apos;s our promise, plainly. We publish only original writing —
            never copied from Domino&apos;s or a competitor. Every price is
            labeled as an example and checked against publicly posted menus. We
            tell you upfront that we&apos;re unofficial, and we always point you
            to the official app for live prices and orders. When something
            changes, we update the page and re-date it. That&apos;s the whole
            deal, and it&apos;s why these guides hold up.
          </p>
        </section>

        <FaqAccordion faqs={faqs} title="Questions About Our Guides" />
        <InternalLinks />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import CouponsClient from "@/components/CouponsClient";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { coupons } from "@/data/coupons";
import { generatePageSEO } from "@/lib/seo-config";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site-config";
import { getMonthYear } from "@/lib/utils/date";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `Domino's Coupons & Promo Codes (${month})`,
    description: "Example Domino's coupons, promo codes and value deals for 2026 — Mix & Match, $6.99 Each, 50% off and more. Verify live deals at official checkout.",
    path: "/coupons",
    keywords: ["Domino's coupons", "Domino's promo codes", "Domino's deals"],
  });
}

const couponFaqs: FAQ[] = [
  { question: "Where do I enter a Domino's promo code?", answer: "On the official Domino's app or website in the coupon/deals section at checkout. Many deals apply automatically once qualifying items are in your cart." },
  { question: "Are these coupon codes guaranteed?", answer: "No. These are example offers for guidance, not guaranteed codes. Always verify the live deal on the official Domino's app before ordering." },
  { question: "What's the best Domino's deal right now?", answer: "Mix & Match and $6.99 Each are the most reliable everyday value deals. For the lowest total, order carryout to skip the delivery fee." },
  { question: "Can I combine two Domino's coupons?", answer: "Generally you can't stack two coupons on the same items, but you can combine a value deal with carryout and rewards points." },
  { question: "Does Domino's have a first-order discount?", answer: "Promotions vary. New-customer offers appear from time to time in the app — check the deals tab when you create an account." },
  { question: "How often do Domino's deals change?", answer: "The core deals (Mix & Match, $6.99 Each) are long-running, but limited-time promotions rotate frequently. Check the app before each order." },
  { question: "Is the 50% off deal real?", answer: "Domino's periodically runs a 50% off menu-price pizza promotion online. It comes and goes, so confirm availability in the app." },
  { question: "Do coupons work for delivery?", answer: "Most do, but delivery adds a fee. Carryout is cheaper for the same deal." },
  { question: "What is Emergency Pizza?", answer: "A promotion where rewards members who place a qualifying order unlock a free pizza to redeem later. Availability is limited." },
  { question: "Can I use a coupon with Domino's Rewards?", answer: "Yes — you still earn points when ordering through a paid deal, so rewards stack with coupons over time." },
  { question: "Are carryout deals cheaper than delivery deals?", answer: "Almost always, because carryout avoids the delivery fee and often has exclusive specials." },
];

const breadcrumb = generateBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Coupons & Deals", path: "/coupons" },
]);

export default function CouponsPage() {
  const month = getMonthYear();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": absoluteUrl("/coupons"), name: `Domino's Coupons (${month})`, dateModified: new Date().toISOString() },
      breadcrumb,
      {
        "@type": "ItemList",
        itemListElement: coupons.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "Offer", name: c.title, description: c.desc, url: `${SITE_URL}/coupons#${c.id}` },
        })),
      },
      { "@type": "FAQPage", mainEntity: couponFaqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s Coupons &amp; Deals ({month})</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            The best example Domino&apos;s coupons and value deals, explained in
            plain English. Copy a code, then verify the live offer on the
            official Domino&apos;s app.
          </p>
        </div>
      </div>

      <CouponsClient coupons={coupons} faqs={couponFaqs} />

      <div className="container-max pb-8">
        {/* How deals work */}
        <section className="mb-14 max-w-3xl">
          <h2 className="section-mini-heading mb-4">How Domino&apos;s Deals Really Work</h2>
          <p className="text-slate-700 leading-relaxed">
            Here&apos;s the truth most coupon sites won&apos;t tell you:
            Domino&apos;s doesn&apos;t really run on secret codes. It runs on a
            handful of recurring value deals, and once you understand those,
            you&apos;ll never need to hunt for a coupon again. The offers above
            are examples of what&apos;s typically available — the live versions
            live in the official app, and many apply automatically the moment you
            add qualifying items to your cart. For the full breakdown of every
            deal, read our <Link href="/posts/dominos-coupons-promo-codes-2026" className="font-semibold underline" style={{ color: "#C8102E" }}>coupons and promo codes guide</Link>.
          </p>
        </section>

        {/* Deal comparison */}
        <section className="mb-14">
          <h2 className="section-mini-heading mb-6">Which Deal Should You Use?</h2>
          <div className="blog-content">
            <table>
              <thead><tr><th>Deal</th><th>How It Works</th><th>Best For</th></tr></thead>
              <tbody>
                <tr><td>Mix &amp; Match</td><td>2+ items at a fixed price each</td><td>Everyday orders, any size</td></tr>
                <tr><td>$6.99 Each</td><td>3+ items at a low flat price</td><td>Families, parties, groups</td></tr>
                <tr><td>50% Off Menu</td><td>Half off full-price pizzas</td><td>A specialty not in the deal</td></tr>
                <tr><td>Carryout Special</td><td>Discount for pickup orders</td><td>Anyone who can drive over</td></tr>
                <tr><td>Emergency Pizza</td><td>Free pizza to redeem later</td><td>Rewards members</td></tr>
              </tbody>
            </table>
          </div>
          <p className="price-disclaimer">Example offers — confirm what&apos;s live in the official Domino&apos;s app.</p>
        </section>

        {/* How to redeem */}
        <section className="mb-14 rounded-2xl p-8" style={{ backgroundColor: "#E6F2F7" }}>
          <h2 className="section-mini-heading mb-4">How to Redeem a Domino&apos;s Coupon</h2>
          <p className="text-slate-700 leading-relaxed max-w-3xl">
            It&apos;s simpler than people expect. Open the app or website, head to
            the deals section, and add qualifying items — most deals apply
            themselves with no code needed. When there is a code, it goes in the
            coupon box at checkout. If a deal isn&apos;t showing up, back out and
            check your items actually qualify; that&apos;s the fix nine times out
            of ten. Then choose carryout to skip the delivery fee and stay signed
            into <Link href="/dominos-rewards" className="font-semibold underline" style={{ color: "#C8102E" }}>Domino&apos;s Rewards</Link> so every order still earns toward a free pizza.
          </p>
        </section>

        {/* Trust note */}
        <section className="mb-14 max-w-3xl">
          <h2 className="section-mini-heading mb-4">A Word on Fake Coupons</h2>
          <p className="text-slate-700 leading-relaxed">
            If a code promises something absurd — a free large pizza with no
            purchase, say — it&apos;s almost certainly fake or a data-harvesting
            trap. Real Domino&apos;s deals live in the official app and on the
            official site, full stop. Anything asking you to complete surveys or
            hand over personal details to &quot;unlock&quot; a coupon is a red
            flag worth walking away from. Stick to official sources and you&apos;ll
            never get burned.
          </p>
        </section>

        <InternalLinks />
      </div>
    </>
  );
}

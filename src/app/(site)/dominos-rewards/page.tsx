import type { Metadata } from "next";
import { Star } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generateFAQSchema } from "@/lib/seo/schema";
import { generatePageSEO } from "@/lib/seo-config";
import { getMonthYear } from "@/lib/utils/date";
import { NOT_AFFILIATED_DISCLAIMER } from "@/lib/site-config";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `Domino's Rewards Explained (${month}): Piece of the Pie`,
    description: "How Domino's Rewards works — earn points on every order and redeem for a free pizza. Point values, redemption tiers and tips for 2026.",
    path: "/dominos-rewards",
    keywords: ["Domino's Rewards", "Piece of the Pie", "Domino's points", "Domino's free pizza"],
  });
}

const EARN_STEPS = [
  { n: "1", t: "Create a free account", d: "Sign up in the Domino's app or website — enrollment in rewards costs nothing." },
  { n: "2", t: "Order & earn points", d: "Earn points on qualifying orders of $5+ (traditionally 10 points each), delivery or carryout." },
  { n: "3", t: "Redeem for free food", d: "Cash in your points for a free pizza or other menu items once you hit the threshold." },
];

const CATALOGUE = [
  { item: "Free Medium 2-Topping Pizza", points: "60 pts", popular: true },
  { item: "Bread Twists", points: "20 pts" },
  { item: "Stuffed Cheesy Bread", points: "40 pts" },
  { item: "Boneless Chicken (8 pc)", points: "40 pts" },
  { item: "Chocolate Lava Crunch Cakes", points: "20 pts" },
  { item: "Marbled Cookie Brownie", points: "20 pts" },
  { item: "20 oz Drink", points: "20 pts" },
  { item: "Pasta Dish", points: "40 pts" },
  { item: "Specialty Chicken", points: "40 pts" },
  { item: "Free Large 3-Topping Pizza", points: "60 pts" },
];

const faqs: FAQ[] = [
  { question: "How many points for a free Domino's pizza?", answer: "Traditionally 60 points earns a free medium two-topping pizza. Domino's has tested lower tiers, so check the app for current thresholds." },
  { question: "How many points do you earn per order?", answer: "The classic program awards 10 points per qualifying order of $5 or more, before tax and tip." },
  { question: "Is Domino's Rewards free?", answer: "Yes. Creating an account and enrolling costs nothing." },
  { question: "Do Domino's points expire?", answer: "Points generally expire after a period of account inactivity. Ordering keeps your balance active." },
  { question: "Can I stack rewards with deals?", answer: "Yes. You still earn points when ordering through paid deals like Mix & Match, so rewards and deals combine over time." },
];

export default function RewardsPage() {
  const month = getMonthYear();
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s Rewards Explained ({month})</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Domino&apos;s Rewards — the &quot;Piece of the Pie&quot; loyalty
            program — earns you points on every qualifying order toward free
            food. Here&apos;s how it works and how to maximize it.
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { n: "10", l: "Points per order" },
            { n: "60", l: "Points for free pizza" },
            { n: "$0", l: "Cost to join" },
            { n: "~6", l: "Orders to a free pizza" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#E6F2F7" }}>
              <div className="text-2xl font-black" style={{ color: "#006491" }}>{s.n}</div>
              <div className="text-xs text-slate-600">{s.l}</div>
            </div>
          ))}
        </div>

        {/* How to earn */}
        <h2 className="section-mini-heading mb-5">How to Earn Points</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {EARN_STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border border-slate-200 p-5">
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-black mb-3" style={{ backgroundColor: "#C8102E" }}>{s.n}</div>
              <h3 className="font-bold text-slate-900">{s.t}</h3>
              <p className="text-sm text-slate-600 mt-1">{s.d}</p>
            </div>
          ))}
        </div>

        {/* Catalogue */}
        <h2 className="section-mini-heading mb-5">Rewards Catalogue (Example)</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATALOGUE.map((c) => (
            <div key={c.item} className={`flex items-center justify-between rounded-lg border p-4 ${c.popular ? "border-[#C8102E]" : "border-slate-200"}`}>
              <span className="font-medium text-slate-900 flex items-center gap-2">
                {c.popular && <Star size={14} fill="#E31837" color="#E31837" />}
                {c.item}
              </span>
              <span className="font-black" style={{ color: "#006491" }}>{c.points}</span>
            </div>
          ))}
        </div>
        <p className="price-disclaimer mt-3">
          Example redemption tiers — Domino&apos;s sets the real values, which
          change over time. Verify in the official app.
        </p>

        {/* How to redeem */}
        <h2 className="section-mini-heading mt-12 mb-4">How to Redeem</h2>
        <p className="text-slate-600 max-w-2xl">
          Once you have enough points, add a qualifying reward to your cart in
          the Domino&apos;s app and apply your points at checkout. Points and
          paid deals combine, so you keep earning even on discounted orders.
        </p>

        {/* Maximize */}
        <h2 className="section-mini-heading mt-12 mb-4">How to Maximize Your Points</h2>
        <p className="text-slate-700 leading-relaxed max-w-3xl">
          The single habit that matters is simple: sign in before every order,
          every time. People lose points not because the program is stingy but
          because they check out as a guest and forget. Beyond that, don&apos;t
          bother splitting one order into tiny ones to farm points — points come
          per qualifying order, not per dollar, so it&apos;s not worth the hassle.
          Just order normally, stay signed in, and pair rewards with a{" "}
          <a href="/posts/dominos-mix-and-match-deal" className="font-semibold underline" style={{ color: "#C8102E" }}>value deal</a> and carryout so you&apos;re saving three ways at once.
        </p>

        {/* Is it worth it */}
        <section className="mt-10 rounded-2xl p-8" style={{ backgroundColor: "#E6F2F7" }}>
          <h2 className="section-mini-heading mb-4">Is Domino&apos;s Rewards Worth It?</h2>
          <p className="text-slate-700 leading-relaxed max-w-3xl">
            Honestly? Yes, and it&apos;s not close. If a free medium two-topping is
            worth roughly ten dollars and it takes about six qualifying orders to
            earn, you&apos;re getting a quiet discount baked into every order for
            doing nothing extra. It&apos;s free to join, points stack on top of
            deals, and there&apos;s no downside. For the full breakdown — earning
            rates, redemption tiers and the real math — read our{" "}
            <a href="/posts/dominos-rewards-piece-of-the-pie" className="font-semibold underline" style={{ color: "#C8102E" }}>Domino&apos;s Rewards guide</a>.
          </p>
        </section>

        <FaqAccordion faqs={faqs} title="Domino's Rewards FAQ" />

        <div className="rounded-xl bg-slate-100 p-5 text-sm text-slate-600">
          {NOT_AFFILIATED_DISCLAIMER}
        </div>

        <InternalLinks />
      </div>
    </>
  );
}

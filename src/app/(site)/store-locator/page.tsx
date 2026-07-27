import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, Route, Search, ShoppingBag } from "lucide-react";
import StoreLocatorClient from "@/components/StoreLocatorClient";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import FaqAccordion from "@/components/FaqAccordion";
import { locations } from "@/data/locations";
import { generateFAQSchema } from "@/lib/seo/schema";
import { generatePageSEO } from "@/lib/seo-config";
import { getMonthYear } from "@/lib/utils/date";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `Domino's Store Locator (${month}): Find a Location Near You`,
    description:
      "Find Domino's near you with our city guides — example prices, typical hours and delivery info across the USA. Learn how delivery zones work and when carryout beats delivery. Verify exact stores on the official Domino's locator.",
    path: "/store-locator",
    keywords: ["Domino's store locator", "Domino's near me", "Domino's locations", "Domino's delivery near me"],
  });
}

const faqs: FAQ[] = [
  { question: "How do I find the Domino's nearest to me?", answer: "Enter your city or state in the search above to jump to a local guide, then use the official Domino's locator with your full address to confirm the exact store and whether you're in its delivery zone." },
  { question: "Does Domino's deliver to my address?", answer: "Most urban and suburban addresses fall inside a store's delivery zone, but rural or edge-of-map locations may be carryout-only. The official locator confirms your specific address in seconds." },
  { question: "Are prices the same at every Domino's?", answer: "No. Each store is individually franchised and sets its own prices, so the same pizza can cost a little more or less depending on the city. Treat our figures as examples and verify at checkout." },
  { question: "How late is Domino's open near me?", answer: "Many stores stay open until midnight, and metro locations often run until 1 AM. Hours vary by store, so check our hours page or the official app for your exact location." },
  { question: "Is carryout or delivery better near me?", answer: "If a store is close, carryout skips the delivery fee and often unlocks pickup-only deals, so it's cheaper. Delivery wins purely on convenience, especially in bad weather." },
];

const featuredCities = locations.slice(0, 8);

const locatorSteps = [
  {
    title: "Start with your full address",
    body:
      "City names are useful for planning, but Domino's delivery assignment is address-based. Enter the street address, apartment number if needed and ZIP code in the official ordering flow before relying on a delivery estimate.",
    icon: Search,
  },
  {
    title: "Compare delivery against carryout",
    body:
      "Delivery adds convenience, but carryout can unlock pickup-only deals and avoid delivery charges. Check both options when a store is close enough to pick up from comfortably.",
    icon: ShoppingBag,
  },
  {
    title: "Use local guides for context",
    body:
      "Our city pages explain neighborhood timing, example menu prices, coupon strategy and ordering notes. Use them to plan, then use Domino's checkout to verify the live store details.",
    icon: Route,
  },
];

export default function StoreLocatorPage() {
  const month = getMonthYear();
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-14">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s Store Locator ({month})</h1>
          <p className="mt-4 max-w-2xl text-white/85 leading-relaxed">
            Find Domino&apos;s near you. Our city guides cover example prices,
            typical hours and delivery notes for locations across the USA. For
            the exact store and live details, the official Domino&apos;s locator
            is always the final word.
          </p>
        </div>
      </div>

      <StoreLocatorClient />

      <div className="container-max pb-8">
        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {locatorSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#E6F2F7] text-[#006491]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h2 className="text-lg font-bold text-slate-950">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">{step.body}</p>
              </div>
            );
          })}
        </section>

        {/* How delivery zones work */}
        <section className="mb-14 max-w-3xl">
          <h2 className="section-mini-heading mb-4">How Domino&apos;s Delivery Zones Actually Work</h2>
          <p className="text-slate-700 leading-relaxed">
            Here&apos;s something worth understanding before you order. Domino&apos;s
            doesn&apos;t deliver from one central kitchen — every order comes from
            whichever franchised store your address falls under. Each store draws
            its own delivery radius, usually a handful of miles, to keep pizzas
            hot on the drive. That&apos;s why two neighbors on opposite ends of a
            zone can get very different delivery times, and why a rural address
            sometimes gets a &quot;carryout only&quot; message. It&apos;s not
            personal, it&apos;s just geography and hot-food logistics.
          </p>
        </section>

        <section className="mb-14 max-w-3xl">
          <h2 className="section-mini-heading mb-4">Why the Nearest Store May Not Be Your Store</h2>
          <p className="text-slate-700 leading-relaxed">
            A map pin can be misleading. Domino&apos;s stores are franchised, and
            delivery areas are drawn around practical routes, staffing, traffic
            patterns and store capacity. A nearby store might be carryout-only
            for your address, while another store a little farther away handles
            delivery. This is especially common in dense cities, college areas,
            suburbs split by highways, downtown hotel districts and neighborhoods
            where parking or building access slows down handoffs.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            The safest way to use this guide is simple: choose the city guide
            that matches where you are ordering, review the example prices and
            ordering notes, then confirm everything through Domino&apos;s official
            locator. That final check protects you from stale hours, unavailable
            coupons, changing delivery zones and local price differences.
          </p>
        </section>

        {/* Carryout vs delivery */}
        <section className="mb-14 rounded-2xl p-8" style={{ backgroundColor: "#E6F2F7" }}>
          <h2 className="section-mini-heading mb-4">Carryout or Delivery Near You?</h2>
          <p className="text-slate-700 leading-relaxed max-w-3xl">
            If your local store is close, carryout is almost always the smarter
            call — you skip the delivery fee entirely and often unlock
            pickup-only specials. Delivery earns its keep when you can&apos;t or
            don&apos;t want to leave: bad weather, no car, or you just want the
            couch. Neither is wrong. Just know that convenience has a price, and
            near a store, that price is usually four to six dollars plus a tip.
            Our <Link href="/dominos-delivery-near-me" className="font-semibold underline" style={{ color: "#C8102E" }}>delivery guide</Link> breaks down the full trade-off.
          </p>
        </section>

        {/* Popular cities */}
        <section className="mb-14">
          <h2 className="section-mini-heading mb-2">Popular Domino&apos;s City Guides</h2>
          <p className="text-slate-600 mb-6 max-w-2xl">Jump straight to a local guide with example prices, hours and delivery notes.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCities.map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`} className="flex items-center gap-2 rounded-xl border border-slate-200 p-4 hover:border-[#006491] hover:shadow-sm transition font-semibold text-slate-900">
                <MapPin size={16} style={{ color: "#C8102E" }} /> Domino&apos;s {l.city}, {l.state}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="section-mini-heading mb-2">All Domino&apos;s City Guides</h2>
          <p className="text-slate-600 mb-6 max-w-3xl">
            Browse every city guide on this site. Each page is an independent,
            unofficial planning guide with example prices, neighborhood ordering
            notes, carryout-versus-delivery advice and a link to the official
            Domino&apos;s locator for final verification.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`} className="flex items-center gap-2 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-900 transition hover:border-[#006491] hover:shadow-sm">
                <MapPin size={15} style={{ color: "#C8102E" }} aria-hidden="true" />
                <span>Domino&apos;s {l.city}, {l.state}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* How to find your store */}
        <section className="mb-14 max-w-3xl">
          <h2 className="section-mini-heading mb-4">How to Find Your Exact Store</h2>
          <p className="text-slate-700 leading-relaxed">
            Our guides are the research; the official locator is the confirmation.
            When you&apos;re ready to actually order, open the Domino&apos;s app or
            site, punch in your full street address, and it&apos;ll show your
            assigned store, whether delivery is available, the live wait, and the
            real prices. Use our city pages to plan your order and know what to
            expect, then let the app lock in the details. That two-step approach
            saves you from surprises.
          </p>
        </section>

        <section className="mb-14 max-w-3xl">
          <h2 className="section-mini-heading mb-4">What to Check Before You Order</h2>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Check delivery availability first, because not every address inside
              a city is inside an active delivery zone. Next, compare the menu
              prices and coupons shown for your assigned store. Domino&apos;s
              national offers can vary by participation, and local stores may
              price crusts, toppings, wings, pasta, desserts or drinks
              differently.
            </p>
            <p>
              If you live in an apartment, dorm, hotel or office building, add
              clear handoff notes. Building name, lobby desk, gate process,
              floor, suite or a public meeting point can make a delivery much
              smoother. Keep notes short and practical. You do not need to share
              extra personal information, just enough for the driver to find the
              correct entrance.
            </p>
            <p>
              For larger orders, build the cart before collecting money from a
              group. The final checkout total includes taxes, delivery charges,
              tip decisions and any local coupon rules. A simple order with
              cheese, pepperoni, one specialty pizza and a few sides is usually
              easier to split than a cart full of custom combinations.
            </p>
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-slate-200 p-8">
          <h2 className="section-mini-heading mb-4">Official Store Verification</h2>
          <p className="max-w-3xl text-slate-700 leading-relaxed">
            This site is an independent guide, not Domino&apos;s official ordering
            system. Use it for research, comparison and planning. For the actual
            store, current hours, live prices, delivery status and checkout
            total, verify directly with Domino&apos;s.
          </p>
          <a
            href="https://www.dominos.com/en/pages/order/#!/locations/search/"
            target="_blank"
            rel="nofollow noopener"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#006491] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#004f73]"
          >
            Open official Domino&apos;s locator
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </section>

        <FaqAccordion faqs={faqs} title="Store Locator FAQ" />
        <InternalLinks />
      </div>
    </>
  );
}

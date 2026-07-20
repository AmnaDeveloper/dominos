import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
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

const featuredCities = locations.slice(0, 12);

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

        <FaqAccordion faqs={faqs} title="Store Locator FAQ" />
        <InternalLinks />
      </div>
    </>
  );
}

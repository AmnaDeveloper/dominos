import type { Metadata } from "next";
import Link from "next/link";
import FAQJsonLd from "@/components/FAQJsonLd";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { authors } from "@/data/authors";
import { NOT_AFFILIATED_DISCLAIMER } from "@/lib/site-config";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "About Us",
    description: "About the Domino's Menu Guide — an independent, unofficial resource for Domino's menu prices, coupons and deals. Learn our editorial standards.",
    path: "/about",
    keywords: ["about Domino's menu guide", "unofficial Domino's guide"],
  });
}

const faqs: FAQ[] = [
  { question: "Is this the official Domino's website?", answer: "No. We are an independent, unofficial informational guide with no affiliation to Domino's Pizza LLC. To order, use the official Domino's app or website." },
  { question: "How do you keep prices accurate?", answer: "We cross-check example prices against publicly posted information and refresh guides monthly. All prices are labeled as examples to verify at checkout." },
  { question: "How do you make money?", answer: "The site is supported by advertising. Ads never influence our editorial guidance." },
  { question: "Can I suggest a correction?", answer: "Yes — use our contact page. We welcome corrections and reader tips." },
];

const editors = [authors["editorial-team"], authors["priya-nair"], authors["marcus-bell"]];

export default function AboutPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">About Us</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            We&apos;re an independent team documenting the Domino&apos;s menu,
            prices, coupons and deals so you can order smarter.
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        <h2 className="section-mini-heading mb-4">Our Mission</h2>
        <p className="text-slate-700 max-w-3xl">
          Fast-food pricing is confusing and inconsistent. Our mission is to
          make the Domino&apos;s menu easy to understand — with clear example
          prices, honest deal breakdowns and practical ordering advice — while
          always directing you to official channels for live prices and orders.
        </p>

        <h2 className="section-mini-heading mt-10 mb-5">Meet the Editors</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {editors.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 p-5">
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-black mb-3" style={{ backgroundColor: "#006491" }}>{a.avatarInitials}</div>
              <h3 className="font-bold text-slate-900">{a.name}</h3>
              <p className="text-xs uppercase" style={{ color: "#C8102E" }}>{a.role}</p>
              <p className="text-sm text-slate-600 mt-2">{a.bio}</p>
            </div>
          ))}
        </div>

        <h2 className="section-mini-heading mt-10 mb-4">Editorial Standards</h2>
        <p className="text-slate-700 max-w-3xl leading-relaxed">
          We publish only original writing, label every price as an example to
          verify at checkout, disclose that we&apos;re unofficial, and update
          content monthly. We never copy Domino&apos;s or competitor content,
          and we correct errors promptly when readers flag them. That&apos;s not
          a marketing line — it&apos;s the actual bar every page has to clear
          before it goes live.
        </p>

        <h2 className="section-mini-heading mt-10 mb-4">How We Verify Prices</h2>
        <p className="text-slate-700 max-w-3xl leading-relaxed">
          Domino&apos;s is franchise-priced, which means there&apos;s no single
          national price list to copy — and honestly, that&apos;s why so many
          menu sites are wrong. We build our example figures from publicly posted
          menus across multiple locations, then refresh them monthly and stamp
          each page with a date. When Domino&apos;s changes a price or a deal, we
          update. And we say the same thing on every page: treat our numbers as a
          realistic guide, then let the official app confirm your real total.
        </p>

        <h2 className="section-mini-heading mt-10 mb-4">How We Make Money</h2>
        <p className="text-slate-700 max-w-3xl leading-relaxed">
          We&apos;ll be transparent, because you deserve that. This site is
          supported by advertising, which is what keeps the guides free to read.
          Ads never influence our editorial guidance — we don&apos;t take money to
          recommend one thing over another, and we&apos;ll happily tell you when
          carryout beats delivery even though nobody&apos;s paying us to. Our only
          goal is helping you order Domino&apos;s smarter.
        </p>

        <h2 className="section-mini-heading mt-10 mb-4">Why People Trust Us</h2>
        <p className="text-slate-700 max-w-3xl leading-relaxed">
          Simple: we&apos;re honest about what we are. We&apos;re not Domino&apos;s,
          we don&apos;t take orders, and we never pretend a price is guaranteed
          when it isn&apos;t. What we offer is clear, original, regularly updated
          guidance from people who genuinely order this food and want you to get
          the best deal on it. No hype, no fake urgency, no misleading
          &quot;official&quot; claims — just useful information you can act on.
        </p>

        <div className="rounded-xl bg-slate-100 p-5 text-sm text-slate-600 mt-8">
          {NOT_AFFILIATED_DISCLAIMER}
        </div>

        <h2 className="section-mini-heading mt-10 mb-5">Popular Guides</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { l: "Menu with Prices", h: "/menus-prices" },
            { l: "Coupons & Deals", h: "/coupons" },
            { l: "Domino's Rewards", h: "/dominos-rewards" },
          ].map((t) => (
            <Link key={t.h} href={t.h} className="rounded-lg border border-slate-200 p-4 font-semibold hover:border-[#006491]">{t.l}</Link>
          ))}
        </div>

        <InternalLinks />
      </div>
    </>
  );
}

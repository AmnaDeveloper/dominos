import type { Metadata } from "next";
import Link from "next/link";
import FAQJsonLd from "@/components/FAQJsonLd";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { authors, PRIMARY_AUTHOR_ID } from "@/data/authors";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Who Writes This Site & How It's Researched",
    description:
      "Who runs the Domino's Menu Guide, where the information comes from, what is verified, what is only an estimate, and what this site deliberately does not publish.",
    path: "/team",
    keywords: ["about the editor", "editorial process", "Domino's menu guide"],
  });
}

const faqs: FAQ[] = [
  {
    question: "Who writes this site?",
    answer:
      "One person — Amna Sadam, who runs the site and is responsible for everything published on it. There is no team of specialists behind it, and inventing one would be a strange way to ask readers to trust the prices.",
  },
  {
    question: "Are you connected to Domino's?",
    answer:
      "No. This is an independent, unofficial guide. It is not affiliated with, endorsed by or sponsored by Domino's Pizza LLC, and it has no access to internal pricing, store data or announcements. Everything here comes from publicly available information.",
  },
  {
    question: "Why are all the prices called examples?",
    answer:
      "Because Domino's stores are individually franchised and set their own prices. There is no single national price list to publish, so every figure on this site is a guide to the ballpark rather than a quote. The checkout screen is the only accurate price.",
  },
  {
    question: "Why don't you list store addresses or opening hours?",
    answer:
      "Because we cannot verify them continuously. Stores relocate, change hours and adjust delivery zones, and a wrong address sends someone to a store that isn't there. Every city page links to Domino's own finder instead, which is correct by definition.",
  },
  {
    question: "How accurate are the calorie numbers?",
    answer:
      "They are approximations, and they are labelled as such. Third-party nutrition sources disagree with each other by 30 to 40 calories a slice because portioning is done by hand and recipes change. Use them for planning, and the Domino's app for exact figures.",
  },
  {
    question: "What happens if you find something wrong here?",
    answer:
      "It gets corrected. If you spot an error, send it through the contact page with the page name and what looks wrong, and it will be checked against the official source and fixed.",
  },
];

const editor = authors[PRIMARY_AUTHOR_ID];

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Publicly available information only",
    body: "Everything on this site is built from what Domino's publishes and from cross-checking that against other public sources. There is no insider access, no supplied data and no press relationship.",
  },
  {
    title: "Prices are labelled as examples, always",
    body: "Franchised stores set their own prices, so a single figure would be wrong somewhere the moment it was published. Prices appear as examples with a reminder to confirm at checkout, and pages that show a range say so.",
  },
  {
    title: "Nothing that can't be verified gets published",
    body: "This is why there are no store addresses, no opening-hours tables and no phone numbers here. Those details change per franchise, and a page that guesses them is worse than a page that links to the source. Every city page carries a link to Domino's own store finder.",
  },
  {
    title: "Approximations are named as approximations",
    body: "Calorie figures are rounded and labelled. Where sources disagree, the page says so rather than picking a number and presenting it as fact. Sandwich calories, for example, appear as a 700-900 range because per-item figures could not be confirmed.",
  },
  {
    title: "No reviews, no ratings, no invented staff",
    body: "This site collects no customer reviews, so it publishes no star ratings and no aggregate scores — including in its structured data, where inventing them is a common shortcut. It also has no fabricated author profiles.",
  },
  {
    title: "Pages get corrected and dated",
    body: "Guides are reviewed and refreshed rather than left to go stale, and each one shows when it was last updated. Corrections sent through the contact page are checked against the official source.",
  },
];

export default function TeamPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Who Writes This Site</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            One person, a clear method, and an honest account of what this guide can and
            cannot tell you.
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        <div className="rounded-2xl border border-slate-200 p-6 max-w-3xl">
          <div className="flex gap-4 items-start">
            <div
              className="shrink-0 h-16 w-16 rounded-full flex items-center justify-center text-white font-black text-xl"
              style={{ backgroundColor: "#006491" }}
              aria-hidden
            >
              {editor.avatarInitials}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">{editor.name}</h2>
              <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#C8102E" }}>
                {editor.role}
              </p>
              <p className="text-slate-700 mt-3 leading-relaxed">{editor.bio}</p>
              <p className="text-sm text-slate-500 mt-3">
                What that involves: {editor.specialties.join(" · ")}
              </p>
            </div>
          </div>
        </div>

        <h2 className="section-mini-heading mt-12 mb-2">How This Site Is Researched</h2>
        <p className="text-slate-700 max-w-3xl mb-6">
          These are the rules the guides are written against. They exist mostly to keep the
          site from claiming more than it actually knows.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className="section-mini-heading mt-12 mb-2">What This Site Is Not</h2>
        <div className="rounded-xl p-5 max-w-3xl" style={{ backgroundColor: "#FDE8EC" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#8a1220" }}>
            It is not Domino&apos;s, and it is not a way to place an order. It cannot tell you
            what your local store charges, when it closes tonight, or whether it delivers to
            your street — only Domino&apos;s can, and every relevant page links there. It is a
            reference for understanding the menu, the deals and the trade-offs before you
            order, written by someone who reads the fine print so you don&apos;t have to.
          </p>
        </div>

        <div className="rounded-xl p-6 mt-10 text-center" style={{ backgroundColor: "#E6F2F7" }}>
          <p className="font-bold text-slate-900">Spotted something wrong?</p>
          <p className="text-sm text-slate-600 mt-1">
            Corrections are genuinely welcome — tell me the page and what looks off.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 font-bold px-6 py-3 rounded-lg text-white"
            style={{ backgroundColor: "#C8102E" }}
          >
            Send a correction
          </Link>
        </div>
      </div>
    </>
  );
}

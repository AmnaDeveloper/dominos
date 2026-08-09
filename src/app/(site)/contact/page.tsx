import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Mail, PencilLine, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQJsonLd from "@/components/FAQJsonLd";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { CONTACT_EMAIL } from "@/lib/site-config";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Contact & Corrections",
    description:
      "Report a price that looks wrong, flag an error, or ask a question about the Domino's Menu Guide. Corrections are checked against official sources and the page is updated.",
    path: "/contact",
    keywords: ["contact Domino's menu guide", "report incorrect price", "corrections"],
  });
}

const faqs: FAQ[] = [
  {
    question: "How do I report a price that looks wrong?",
    answer:
      "Tell me which page it's on, what price is shown and what you actually paid or saw, and roughly where you are. Prices on this site are examples because every Domino's is franchised and sets its own, but if an example is far off the mark it gets corrected.",
  },
  {
    question: "Can you help me with my Domino's order?",
    answer:
      "No, and it's worth being clear about it. This is an independent guide with no connection to Domino's. It cannot check your order, refund you, contact a store or resolve a delivery problem. Domino's own app and customer service are the only route for any of that.",
  },
  {
    question: "How quickly will I get a reply?",
    answer:
      "This site is run by one person alongside other work, so a reply can take several days. Corrections are prioritised over general questions, and a correction may be fixed on the site before you get a reply.",
  },
  {
    question: "Do you accept guest posts, link exchanges or sponsored articles?",
    answer:
      "No. This site doesn't publish guest posts, sell links or accept paid placements in articles, so there's no need to pitch. Messages about link building generally won't get a response.",
  },
  {
    question: "What's the most useful thing to include in a message?",
    answer:
      "The page name and the specific thing that looks wrong. 'The sides guide says Parmesan Bread Bites are 16 pieces, my store gave 8' is something that can be checked and acted on. 'Your prices are wrong' cannot.",
  },
];

const REASONS: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <PencilLine size={18} aria-hidden="true" />,
    title: "A correction",
    body: "Something on a page looks wrong, out of date or contradicts what you saw at checkout. This is the most useful message you can send.",
  },
  {
    icon: <Mail size={18} aria-hidden="true" />,
    title: "A question the guides don't answer",
    body: "If you looked for something and couldn't find it, that's worth knowing — it usually means a page is missing or badly written.",
  },
  {
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    title: "A privacy or content request",
    body: "Questions about the privacy policy, cookies or how this site uses data. Also the right route for any takedown or attribution concern.",
  },
];

export default function ContactPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Contact &amp; Corrections</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            If something on this site looks wrong, tell me. Corrections get checked against the
            official source and the page gets fixed.
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        {/* The one thing people arrive here confused about */}
        <div
          className="rounded-xl p-5 flex items-start gap-3 max-w-4xl"
          style={{ backgroundColor: "#FDE8EC" }}
        >
          <AlertTriangle size={20} className="shrink-0 mt-0.5" style={{ color: "#C8102E" }} aria-hidden="true" />
          <div>
            <p className="font-bold" style={{ color: "#8a1220" }}>
              This is not Domino&apos;s
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "#8a1220" }}>
              It&apos;s an independent, unofficial guide. I can&apos;t place, change, track or
              refund an order, contact a store on your behalf, or resolve a delivery problem. For
              anything to do with a real order, use the Domino&apos;s app or their customer service —
              messages about orders sent here can&apos;t be helped and only delay your resolution.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="section-mini-heading mb-3">Send a message</h2>
            <p className="text-slate-700 mb-6 max-w-2xl leading-relaxed">
              Email is the most reliable way to reach me:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-bold underline"
                style={{ color: "#C8102E" }}
              >
                {CONTACT_EMAIL}
              </a>
              . You can also use the form below.
            </p>
            <ContactForm fallbackEmail={CONTACT_EMAIL} />
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl p-5" style={{ backgroundColor: "#E6F2F7" }}>
              <h2 className="font-bold" style={{ color: "#006491" }}>
                Check here first
              </h2>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                Most questions are already answered in the guides — the{" "}
                <Link href="/menus-prices" className="underline font-semibold" style={{ color: "#C8102E" }}>
                  menu with prices
                </Link>
                ,{" "}
                <Link href="/coupons" className="underline font-semibold" style={{ color: "#C8102E" }}>
                  current coupons
                </Link>{" "}
                and the{" "}
                <Link href="/posts" className="underline font-semibold" style={{ color: "#C8102E" }}>
                  full guide index
                </Link>
                .
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <h2 className="font-bold text-slate-900">How this site works</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Where the information comes from, what&apos;s verified, what&apos;s an estimate and
                what this site deliberately won&apos;t publish.
              </p>
              <Link
                href="/team"
                className="inline-block text-sm font-bold underline mt-3"
                style={{ color: "#C8102E" }}
              >
                Read the editorial process
              </Link>
            </div>
          </aside>
        </div>

        <h2 className="section-mini-heading mt-14 mb-5">What&apos;s worth writing in about</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span style={{ color: "#C8102E" }}>{r.icon}</span>
                {r.title}
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        <h2 className="section-mini-heading mt-12 mb-3">How corrections are handled</h2>
        <div className="max-w-3xl text-slate-700 leading-relaxed space-y-3">
          <p>
            A correction gets checked against the official source before anything changes — Domino&apos;s
            own menu, its published nutrition information, or its store finder, depending on what the
            correction is about. If it checks out, the page is updated and its last-updated date moves.
          </p>
          <p>
            Sometimes the answer is that both of us are right. Prices genuinely differ between
            franchised stores, so an example price being wrong in your city doesn&apos;t always mean it
            is wrong everywhere — in those cases the page usually gets a clearer range or a stronger
            reminder to check at checkout, rather than a new number.
          </p>
          <p>
            And occasionally a correction shows something can&apos;t be verified at all. When that
            happens the claim comes off the site rather than getting replaced with a better guess. That
            is why there are no store addresses or opening hours here.
          </p>
        </div>

        <InternalLinks />
      </div>
    </>
  );
}

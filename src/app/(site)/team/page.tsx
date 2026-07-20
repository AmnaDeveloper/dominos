import type { Metadata } from "next";
import Link from "next/link";
import FAQJsonLd from "@/components/FAQJsonLd";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { authors } from "@/data/authors";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Editorial Team",
    description: "Meet the editors behind the Domino's Menu Guide and learn how we research, write and fact-check every guide.",
    path: "/team",
    keywords: ["Domino's menu guide team", "editorial team"],
  });
}

const faqs: FAQ[] = [
  { question: "Who writes these guides?", answer: "A small editorial team with backgrounds in food-service pricing, loyalty programs and consumer research. Each guide lists its author." },
  { question: "How do you fact-check?", answer: "We cross-reference example prices with publicly posted information and update monthly, labeling all prices as examples." },
  { question: "Are authors real people?", answer: "Yes — our editors write under their own bylines and specialties, shown below." },
  { question: "How can I reach an editor?", answer: "Use the contact page and mention the guide or topic; we'll route it to the right editor." },
];

const team = [authors["priya-nair"], authors["marcus-bell"], authors["dana-lopez"]];

export default function TeamPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Editorial Team</h1>
          <p className="mt-3 max-w-2xl text-white/85">The people who research and write our Domino&apos;s guides.</p>
        </div>
      </div>

      <div className="container-max py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          {team.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 p-5">
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-black mb-3" style={{ backgroundColor: "#006491" }}>{a.avatarInitials}</div>
              <h2 className="font-bold text-slate-900">{a.name}</h2>
              <p className="text-xs uppercase" style={{ color: "#C8102E" }}>{a.role}</p>
              <p className="text-sm text-slate-600 mt-2">{a.bio}</p>
              <p className="text-xs text-slate-500 mt-2">Specialties: {a.specialties.join(" · ")}</p>
            </div>
          ))}
        </div>

        <h2 className="section-mini-heading mt-10 mb-4">Our Editorial Process</h2>
        <p className="text-slate-700 max-w-3xl">
          Every guide starts with research against publicly available
          information, is written in original prose, reviewed for accuracy and
          clarity, then dated and scheduled for monthly refresh. We label all
          prices as examples and always point readers to official channels.
        </p>

        <div className="rounded-xl p-6 mt-8 text-center" style={{ backgroundColor: "#E6F2F7" }}>
          <p className="font-bold text-slate-900">Have a question or correction?</p>
          <Link href="/contact" className="inline-block mt-3 font-bold px-6 py-3 rounded-lg text-white" style={{ backgroundColor: "#C8102E" }}>Contact the Team</Link>
        </div>
      </div>
    </>
  );
}

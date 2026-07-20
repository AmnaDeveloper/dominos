import type { Metadata } from "next";
import FAQJsonLd from "@/components/FAQJsonLd";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { NOT_AFFILIATED_DISCLAIMER } from "@/lib/site-config";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Terms of Use",
    description: "The terms governing your use of the Domino's Menu Guide, an independent, unofficial informational website.",
    path: "/terms",
  });
}

const faqs: FAQ[] = [
  { question: "Is this the official Domino's site?", answer: "No. This is an independent, unofficial guide with no affiliation to Domino's Pizza LLC." },
  { question: "Are the prices guaranteed?", answer: "No. All prices are examples for guidance and may change. Verify at official checkout." },
  { question: "Can I reuse your content?", answer: "Our content is protected by copyright. Contact us for permission before reproducing it." },
  { question: "Do you sell anything?", answer: "No. We don't take orders or process payments. Use the official Domino's app to order." },
];

const SECTIONS = [
  { t: "1. Acceptance of Terms", b: "By accessing this website, you agree to these Terms of Use. If you do not agree, please do not use the site." },
  { t: "2. Informational Purpose Only", b: "This site is an independent, unofficial informational guide. It does not take orders, process payments, or represent Domino's Pizza LLC." },
  { t: "3. No Guarantee of Accuracy", b: "Prices, deals and menu details are examples that may be outdated or vary by location. Always verify at official Domino's channels before relying on any information." },
  { t: "4. Intellectual Property", b: "All original text and design on this site are protected by copyright. Trademarks referenced belong to their respective owners." },
  { t: "5. Third-Party Links & Ads", b: "We link to third-party sites and display advertising. We are not responsible for the content, products or practices of third parties." },
  { t: "6. Limitation of Liability", b: "We are not liable for any loss arising from reliance on information on this site. Use it at your own discretion." },
  { t: "7. Changes to These Terms", b: "We may update these Terms at any time. Continued use of the site constitutes acceptance of the revised Terms." },
  { t: "8. Contact", b: "Questions about these Terms can be sent via our contact page." },
];

export default function TermsPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div className="container-max py-12 max-w-3xl">
        <LastUpdated />
        <h1 className="post-article-title mt-3 mb-6">Terms of Use</h1>
        <div className="blog-content">
          {SECTIONS.map((s) => (
            <div key={s.t}>
              <h2>{s.t}</h2>
              <p>{s.b}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-slate-100 p-5 text-sm text-slate-600 mt-6">{NOT_AFFILIATED_DISCLAIMER}</div>
        <InternalLinks />
      </div>
    </>
  );
}

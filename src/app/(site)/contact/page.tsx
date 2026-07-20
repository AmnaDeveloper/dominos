import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQJsonLd from "@/components/FAQJsonLd";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { SOCIAL_LINKS } from "@/lib/site-config";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Contact Us",
    description: "Get in touch with the Domino's Menu Guide team — questions, corrections and reader tips welcome.",
    path: "/contact",
    keywords: ["contact Domino's menu guide"],
  });
}

const faqs: FAQ[] = [
  { question: "How can I contact you?", answer: "Use the form on this page. We read every message and respond to questions and corrections." },
  { question: "Can you help me place a Domino's order?", answer: "No — we're an unofficial guide and can't take orders. Use the official Domino's app or website to order." },
  { question: "How do I report an incorrect price?", answer: "Send us the item and your location via the contact form and we'll review and update the example." },
  { question: "Do you accept guest posts?", answer: "We occasionally collaborate. Reach out via the form with your idea." },
  { question: "How fast do you reply?", answer: "We aim to respond within a few business days." },
];

export default function ContactPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Questions, corrections or tips? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="container-max py-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <ContactForm />
        </div>
        <aside className="space-y-5">
          <div className="rounded-xl p-5" style={{ backgroundColor: "#E6F2F7" }}>
            <h3 className="font-bold flex items-center gap-2" style={{ color: "#006491" }}>
              <MessageCircle size={18} /> Instant Help
            </h3>
            <p className="text-sm text-slate-700 mt-2">
              Looking for prices or deals? Most answers are already in our{" "}
              <a href="/menus-prices" className="underline font-semibold" style={{ color: "#C8102E" }}>menu</a> and{" "}
              <a href="/coupons" className="underline font-semibold" style={{ color: "#C8102E" }}>coupons</a> guides.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold flex items-center gap-2 text-slate-900">
              <Mail size={18} style={{ color: "#C8102E" }} /> Follow Us
            </h3>
            <ul className="text-sm mt-2 space-y-1">
              <li><a href={SOCIAL_LINKS.facebook} target="_blank" rel="nofollow noopener" className="underline" style={{ color: "#C8102E" }}>Facebook</a></li>
              <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="nofollow noopener" className="underline" style={{ color: "#C8102E" }}>Instagram</a></li>
              <li><a href={SOCIAL_LINKS.twitter} target="_blank" rel="nofollow noopener" className="underline" style={{ color: "#C8102E" }}>Twitter/X</a></li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="container-max">
        <InternalLinks />
      </div>
    </>
  );
}

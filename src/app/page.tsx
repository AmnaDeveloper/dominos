import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { DollarSign, Percent, CalendarCheck, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/HeroSection";
import MenuGuideSection from "@/components/MenuGuideSection";
import FaqAccordion from "@/components/FaqAccordion";
import InternalLinks from "@/components/seo/InternalLinks";
import { generateFAQSchema } from "@/lib/seo/schema";
import { homeFaqs } from "@/data/home-faqs";
import { posts, postHref } from "@/data/posts";
import { getMonthYear } from "@/lib/utils/date";
import { SITE_TITLE_DEFAULT, SITE_DESCRIPTION } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const WHY_CARDS = [
  { icon: DollarSign, t: "Clear example prices", d: "Every category laid out with realistic 2026 prices you can plan around." },
  { icon: Percent, t: "Deals decoded", d: "Plain-English breakdowns of Mix & Match, $6.99 Each and rewards." },
  { icon: CalendarCheck, t: "Always current", d: "Guides are updated monthly and dated so you know they're fresh." },
  { icon: ShieldCheck, t: "Honest & independent", d: "Unofficial and ad-supported — we always tell you to verify at checkout." },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl mb-10">
      <h2 className="section-mini-heading">{title}</h2>
      {subtitle && <p className="text-slate-600 mt-3">{subtitle}</p>}
    </div>
  );
}

export default function HomePage() {
  const month = getMonthYear();
  const featuredMarked = posts.filter((p) => p.featured);
  const featured = [
    ...featuredMarked,
    ...posts.filter((p) => !p.featured),
  ].slice(0, 3);
  const gridA = posts.slice(0, 4);
  const gridB = posts.slice(4, 8);
  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="main-content">
        <HeroSection />

        {/* Menu tables — white (section has its own padding + category jump bar) */}
        <MenuGuideSection />

        {/* Featured guides — light blue band */}
        <section className="py-20" style={{ backgroundColor: "#E6F2F7" }}>
          <div className="container-max">
            <SectionHeading
              title="Featured Guides"
              subtitle="Start here — our most useful reads on prices, deals and delivery."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={postHref(p)}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 hover:border-[#006491] transition flex flex-col"
                >
                  <div className="relative aspect-[16/9]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wide" style={{ color: "#C8102E" }}>{p.category}</span>
                    <h3 className="font-bold mt-2 text-slate-900 leading-snug">{p.title}</h3>
                    <p className="text-sm text-slate-600 mt-3 flex-1 leading-relaxed">{p.excerpt}</p>
                    <span className="text-xs text-slate-400 mt-4 inline-block">{p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular now — slate band */}
        <section className="py-20 bg-slate-50">
          <div className="container-max">
            <SectionHeading title="Popular Right Now" subtitle="The guides readers are opening most this month." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {gridA.map((p) => (
                <Link key={p.slug} href={postHref(p)} className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-[#006491] hover:shadow-sm transition flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 300px" className="object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{p.title}</h3>
                    <p className="text-xs text-slate-500 mt-3 flex-1 leading-relaxed line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why use this site — blue band with horizontal white cards */}
        <section className="py-16" style={{ backgroundColor: "#E6F2F7" }}>
          <div className="container-max">
            <SectionHeading title="Why People Use This Site" subtitle="No hype, no fake urgency — just clear, current info." />
            <div className="grid gap-5 sm:grid-cols-2">
              {WHY_CARDS.map((c) => (
                <div
                  key={c.t}
                  className="flex items-start gap-5 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#006491] transition-all duration-200"
                >
                  <div
                    className="shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }}
                  >
                    <c.icon size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">{c.t}</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More guides — slate band */}
        <section className="py-20 bg-slate-50">
          <div className="container-max">
            <SectionHeading title="More Guides" subtitle="Sizes, crusts, saving money and everything in between." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {gridB.map((p) => (
                <Link key={p.slug} href={postHref(p)} className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-[#006491] hover:shadow-sm transition flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 300px" className="object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{p.title}</h3>
                    <p className="text-xs text-slate-500 mt-3 flex-1 leading-relaxed line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ + internal links — white */}
        <section className="py-20">
          <div className="container-max">
            <FaqAccordion faqs={homeFaqs} title={`Domino's Menu & Deals FAQ (${month})`} />
            <InternalLinks />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

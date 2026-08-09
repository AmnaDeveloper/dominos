import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import OfficialLocatorCta from "@/components/locations/OfficialLocatorCta";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { getLocationBySlug, getLocationSlugs } from "@/data/locations";
import { getRichLocation } from "@/data/locationRichContent";
import { generateFAQSchema } from "@/lib/seo/schema";
import { generatePageSEO } from "@/lib/seo-config";
import { absoluteUrl } from "@/lib/site-config";
import { getMonthYear } from "@/lib/utils/date";
import type { FAQ } from "@/data/types";

export const revalidate = 0;

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};
  const rich = getRichLocation(slug);
  return generatePageSEO({
    title: `${loc.title.replace(/ —.*/, "")} (${getMonthYear()})`,
    description: rich?.heroSubtitle ?? loc.description,
    path: `/locations/${slug}`,
    keywords: [`Domino's ${loc.city}`, `Domino's ${loc.city} delivery`, `Domino's ${loc.city} menu`],
  });
}

function locationFaqs(city: string, locatorUrl: string): FAQ[] {
  return [
    { question: `Does Domino's deliver in ${city}?`, answer: `Domino's operates stores across ${city}, but delivery zones are set per store and not every address falls inside one. Enter your address on the official Domino's locator to get a definitive answer for where you live.` },
    { question: `What are Domino's hours in ${city}?`, answer: `We don't publish hours for ${city}. Every Domino's is independently franchised and sets its own opening and closing times, which also change on holidays, so any schedule listed here would be a guess. The store's own page on ${locatorUrl} shows its current hours.` },
    { question: `Why doesn't this page list ${city} store addresses?`, answer: `Because a wrong address is worse than no address — it sends someone to a store that has moved or closed. Store lists change, and we have no way to verify every location continuously, so we link to Domino's own finder instead of republishing details we can't stand behind.` },
    { question: `How much is Domino's in ${city}?`, answer: `Domino's stores are individually franchised and set their own prices, so ${city} prices are broadly in line with national examples rather than fixed. Expect a large pizza somewhere around $11.99 to $17.99 before tax, and confirm the real total at checkout.` },
    { question: `Is carryout cheaper than delivery in ${city}?`, answer: `Yes, and by more than most people expect. Carryout skips the delivery fee, which is typically $4 to $6, and removes the tip, and Domino's regularly runs carryout-only specials that delivery orders can't access.` },
  ];
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const rich = getRichLocation(slug);
  const faqs = locationFaqs(loc.city, loc.locatorUrl);
  const faqSchema = generateFAQSchema(faqs);
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: loc.title,
    description: rich?.heroSubtitle ?? loc.description,
    url: absoluteUrl(`/locations/${slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-12">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s {loc.city}, {loc.state}</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            {rich?.heroSubtitle ?? loc.description}
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        {rich && (
          <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {rich.stats.map((s) => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#E6F2F7" }}>
                <div className="text-base sm:text-xl font-black" style={{ color: "#006491" }}>{s.value}</div>
                <div className="text-xs text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <OfficialLocatorCta city={loc.city} locatorUrl={loc.locatorUrl} />

        <p className="text-slate-700 mb-6">
          {rich?.intro ?? `This unofficial guide covers Domino's in ${loc.city}, ${loc.state} — example menu prices, typical hours and delivery information. Domino's stores are individually franchised, so always verify exact prices, hours and delivery zones on the official Domino's locator.`}
        </p>

        {rich?.editorialSections && (
          <section className="mb-8">
            <h2 className="section-mini-heading mb-4">{loc.city} Ordering Guide</h2>
            <div className="space-y-5">
              {rich.editorialSections.map((section) => (
                <div key={section.heading}>
                  <h3 className="font-bold text-slate-900">{section.heading}</h3>
                  <p className="text-sm text-slate-600 mt-1">{section.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No weekly hours table here on purpose. It used to render two
            hard-coded presets across all twenty cities, which presented a guess
            as a schedule. Hours are set per franchise — the locator has them. */}

        {/* Price tables (rich) */}
        {rich && (
          <>
            <h2 className="section-mini-heading mt-10 mb-4">Example Menu Prices in {loc.city}</h2>
            <div className="blog-content">
              <table>
                <thead><tr><th>Item</th><th>Size</th><th>Example Price</th></tr></thead>
                <tbody>
                  {[...rich.pizzaPrices, ...rich.sidePrices].map((r, i) => (
                    <tr key={i}><td>{r.item}</td><td>{r.size ?? "—"}</td><td>{r.price}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="price-disclaimer">Example prices — verify at official checkout.</p>

            {/* Neighborhoods */}
            <h2 className="section-mini-heading mt-10 mb-4">Ordering Across {loc.city}</h2>
            {rich.neighborhoods.map((n) => (
              <div key={n.heading} className="mb-4">
                <h3 className="font-bold text-slate-900">{n.heading}</h3>
                <p className="text-sm text-slate-600 mt-1">{n.body}</p>
              </div>
            ))}
            <div className="rounded-xl p-4 my-4" style={{ backgroundColor: "#E6F2F7" }}>
              <p className="text-sm font-semibold" style={{ color: "#006491" }}>Popular areas:</p>
              <p className="text-sm text-slate-600 mt-1">{rich.additionalLocations.join(" · ")}</p>
            </div>

            {rich.orderingTips && (
              <>
                <h2 className="section-mini-heading mt-10 mb-4">Practical Ordering Tips for {loc.city}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {rich.orderingTips.map((tip) => (
                    <div key={tip.heading} className="rounded-xl border border-slate-200 p-4">
                      <h3 className="font-bold text-slate-900">{tip.heading}</h3>
                      <p className="text-sm text-slate-600 mt-1">{tip.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {rich.resourceLinks && (
              <>
                <h2 className="section-mini-heading mt-10 mb-4">Helpful {loc.city} Ordering Links</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {rich.resourceLinks.map((resource) => (
                    resource.external ? (
                      <a
                        key={resource.href}
                        href={resource.href}
                        target="_blank"
                        rel="nofollow noopener"
                        className="rounded-xl border border-slate-200 p-4 hover:border-[#006491] hover:shadow-sm transition"
                      >
                        <span className="font-bold text-slate-900">{resource.label}</span>
                        <span className="block text-sm text-slate-600 mt-1">{resource.description}</span>
                      </a>
                    ) : (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="rounded-xl border border-slate-200 p-4 hover:border-[#006491] hover:shadow-sm transition"
                      >
                        <span className="font-bold text-slate-900">{resource.label}</span>
                        <span className="block text-sm text-slate-600 mt-1">{resource.description}</span>
                      </Link>
                    )
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <div className="rounded-lg p-4 my-6 text-sm" style={{ backgroundColor: "#FDE8EC", color: "#8a1220" }}>
          Verify exact stores, hours, prices and delivery zones on the official Domino&apos;s locator. This is an unofficial guide.
        </div>

        <FaqAccordion faqs={faqs} title={`Domino's ${loc.city} FAQ`} />

        {/* Repeated at the end: readers who scroll the whole page are the ones
            most likely to be about to order. */}
        <div className="mt-8">
          <OfficialLocatorCta city={loc.city} locatorUrl={loc.locatorUrl} variant="compact" />
        </div>

        <p className="text-sm">
          Explore more: <Link href="/menus-prices" className="font-semibold underline" style={{ color: "#C8102E" }}>Menu with Prices</Link>,{" "}
          <Link href="/coupons" className="font-semibold underline" style={{ color: "#C8102E" }}>Coupons</Link>,{" "}
          <Link href="/store-locator" className="font-semibold underline" style={{ color: "#C8102E" }}>All Cities</Link>.
        </p>

        <InternalLinks />
      </div>
    </>
  );
}

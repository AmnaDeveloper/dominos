import { ExternalLink, MapPin } from "lucide-react";

/**
 * Sends readers to Domino's own store finder for their city.
 *
 * This site publishes no store addresses and no opening hours on purpose: every
 * Domino's is independently franchised, details change, and a wrong address
 * sends someone to a store that isn't there. Linking out is the only answer
 * that is correct by definition, so it gets a prominent button rather than a
 * footnote.
 */
export default function OfficialLocatorCta({
  city,
  locatorUrl,
  variant = "full",
}: {
  city: string;
  locatorUrl: string;
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <a
        href={locatorUrl}
        target="_blank"
        rel="nofollow noopener"
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        style={{ backgroundColor: "#C8102E" }}
      >
        <MapPin size={16} aria-hidden="true" />
        Find a {city} store on Domino&apos;s
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    );
  }

  return (
    <section
      className="rounded-2xl border p-5 sm:p-6 my-8"
      style={{ backgroundColor: "#E6F2F7", borderColor: "#bcdfee" }}
      aria-labelledby="locator-cta-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 id="locator-cta-heading" className="text-lg font-black" style={{ color: "#006491" }}>
            Find your nearest {city} store
          </h2>
          <p className="mt-1.5 text-sm text-slate-700">
            We don&apos;t list store addresses or opening hours here. Every Domino&apos;s is
            independently franchised and those details change, so we send you to Domino&apos;s own
            finder — it&apos;s the only place they&apos;re guaranteed to be right.
          </p>
        </div>
        <a
          href={locatorUrl}
          target="_blank"
          rel="nofollow noopener"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          style={{ backgroundColor: "#C8102E" }}
        >
          <MapPin size={18} aria-hidden="true" />
          Official store finder
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Opens dominos.com in a new tab. This is an independent, unofficial guide and is not
        affiliated with Domino&apos;s Pizza LLC.
      </p>
    </section>
  );
}

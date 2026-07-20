import type { Metadata } from "next";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Cookie Policy",
    description: "How the Domino's Menu Guide uses essential, performance and advertising cookies, and how to control them.",
    path: "/cookies",
  });
}

const CARDS = [
  { t: "Essential Cookies", d: "Required for basic site function such as navigation and security. The site cannot work properly without them." },
  { t: "Performance Cookies", d: "Help us understand how visitors use the site (e.g. via analytics) so we can improve content and speed. Aggregated and anonymous." },
  { t: "Advertising Cookies", d: "Set by Google AdSense and partners to serve relevant ads and limit repetition. You can opt out via Google Ads Settings." },
  { t: "Functional Cookies", d: "Remember choices you make, like filters, to improve your experience." },
  { t: "Managing Cookies", d: "You can block or delete cookies in your browser settings. Doing so may affect some site features." },
  { t: "Third-Party Cookies", d: "Some cookies are set by third parties (advertising and analytics vendors). Their use is governed by their own policies." },
];

export default function CookiesPage() {
  return (
    <div className="container-max py-12 max-w-4xl">
      <LastUpdated />
      <h1 className="post-article-title mt-3 mb-6">Cookie Policy</h1>
      <p className="text-slate-700 mb-8 max-w-2xl">
        This page explains the types of cookies we use and how you can control
        them. For how we handle data more broadly, see our{" "}
        <a href="/privacy-policy" className="underline font-semibold" style={{ color: "#C8102E" }}>Privacy Policy</a>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <div key={c.t} className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900">{c.t}</h2>
            <p className="text-sm text-slate-600 mt-2">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

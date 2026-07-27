import { MessageCircle } from "lucide-react";

export default function PageComments({ pagePath }: { pagePath: string }) {
  return (
    <section className="my-12 rounded-xl border border-slate-200 p-5">
      <h2 className="section-mini-heading flex items-center gap-2 mb-5">
        <MessageCircle style={{ color: "#C8102E" }} /> Reader Feedback
      </h2>
      <p className="text-sm leading-6 text-slate-700">
        Found an outdated example price, missing allergen note or unclear
        ordering tip on this page? Send the page path{" "}
        <span className="font-semibold text-slate-900">{pagePath}</span> through
        our contact page. We review corrections before publishing changes so
        the site stays accurate and safe for readers.
      </p>
      <a
        href="/contact"
        className="mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-bold text-white"
        style={{ backgroundColor: "#C8102E" }}
      >
        Send a correction
      </a>
    </section>
  );
}

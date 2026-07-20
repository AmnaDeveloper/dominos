import type { FAQ } from "@/data/types";

/** Server-rendered, CSS-only FAQ accordion using <details>. */
export default function FaqAccordion({
  faqs,
  title = "Frequently Asked Questions",
}: {
  faqs: FAQ[];
  title?: string;
}) {
  return (
    <section className="my-12">
      <h2 className="section-mini-heading mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            open={i === 0}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <span
                className="font-bold text-slate-900 text-base sm:text-[1.075rem] leading-snug tracking-tight"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {f.question}
              </span>
              <span
                className="shrink-0 grid place-items-center h-8 w-8 rounded-full text-white text-xl font-light leading-none transition-transform duration-200 group-open:rotate-45"
                style={{ backgroundColor: "#C8102E" }}
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 text-[0.95rem] leading-relaxed">
              {f.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

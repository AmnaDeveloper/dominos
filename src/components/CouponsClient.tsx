"use client";

import { useState } from "react";
import { Copy, Check, Star } from "lucide-react";
import type { Coupon, FAQ } from "@/data/types";

export default function CouponsClient({
  coupons,
  faqs,
}: {
  coupons: Coupon[];
  faqs: FAQ[];
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="container-max py-10">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { n: `${coupons.length}`, l: "Live example deals" },
          { n: "40%", l: "Typical max savings" },
          { n: "$0", l: "Carryout delivery fee" },
          { n: "60", l: "Points for free pizza" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#E6F2F7" }}>
            <div className="text-2xl font-black" style={{ color: "#006491" }}>{s.n}</div>
            <div className="text-xs text-slate-600">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Coupons grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`relative rounded-xl border p-5 flex flex-col ${
              c.featured ? "border-[#C8102E] shadow-sm" : "border-slate-200"
            }`}
          >
            {c.featured && (
              <span className="absolute -top-2 -right-2 inline-flex items-center gap-1 text-[10px] font-bold text-white px-2 py-1 rounded-full" style={{ backgroundColor: "#E31837" }}>
                <Star size={10} /> FEATURED
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black" style={{ color: "#C8102E" }}>{c.discount}</span>
              <span className="text-xs text-slate-500">{c.sub}</span>
            </div>
            <h3 className="mt-1 font-bold text-slate-900">{c.title}</h3>
            <p className="text-sm text-slate-600 mt-2 flex-1">{c.desc}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {c.tags.map((t) => (
                <span key={t} className="text-[10px] uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
              <div>
                <div className="font-mono text-sm font-bold">{c.code}</div>
                <div className="text-[11px] text-slate-400">{c.noCodeLabel} · Exp: {c.expiry}</div>
              </div>
              <button
                onClick={() => copy(c.code)}
                className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: copied === c.code ? "#006491" : "#C8102E" }}
              >
                {copied === c.code ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="price-disclaimer mt-6">
        These are example offers for guidance, not guaranteed codes. Verify all
        deals on the official Domino&apos;s app before ordering.
      </p>

      {/* Tip cards */}
      <div className="grid gap-4 sm:grid-cols-3 my-12">
        {[
          { t: "Choose carryout", d: "Skip the delivery fee entirely for the lowest total." },
          { t: "Stack rewards", d: "Stay signed in to earn points on every deal order." },
          { t: "Compare deals", d: "Mix & Match vs. $6.99 Each — the app shows which wins." },
        ].map((tip) => (
          <div key={tip.t} className="rounded-xl p-5" style={{ backgroundColor: "#FDE8EC" }}>
            <h3 className="font-bold" style={{ color: "#C8102E" }}>{tip.t}</h3>
            <p className="text-sm text-slate-700 mt-1">{tip.d}</p>
          </div>
        ))}
      </div>

      {/* FAQ accordion */}
      <section className="my-10">
        <h2 className="section-mini-heading mb-6">Coupons &amp; Deals FAQ</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span className="font-bold text-slate-900 text-base sm:text-[1.075rem] leading-snug tracking-tight">
                    {f.question}
                  </span>
                  <span
                    className={`shrink-0 grid place-items-center h-8 w-8 rounded-full text-white text-xl font-light leading-none transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    style={{ backgroundColor: "#C8102E" }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-slate-600 text-[0.95rem] leading-relaxed">{f.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";

const BUNDLES = [
  {
    id: "family-4",
    title: "Family of 4",
    items: ["2× Large Pepperoni", "Stuffed Cheesy Bread", "2-Liter Coke"],
    est: "~$28–34 via Mix & Match",
    note: "Leftovers likely. Swap one pizza to Cheese for picky eaters.",
  },
  {
    id: "budget",
    title: "Budget Night",
    items: ["3× Medium 2-Topping ($6.99 Each)", "Marbled Cookie Brownie"],
    est: "~$25 carryout",
    note: "The $6.99 Each deal shines with 3+ items.",
  },
  {
    id: "mixed",
    title: "Mixed Tastes",
    items: ["1× Pepperoni", "1× ExtravaganZZa", "Boneless Chicken"],
    est: "~$30–36 via Mix & Match",
    note: "Covers simple and adventurous eaters at once.",
  },
];

export default function FamilyPicks() {
  const [active, setActive] = useState(BUNDLES[0].id);
  const bundle = BUNDLES.find((b) => b.id === active)!;

  return (
    <div className="rounded-2xl border-2 p-6 my-8" style={{ borderColor: "#006491" }}>
      <h3 className="flex items-center gap-2 text-xl font-black mb-4" style={{ color: "#006491" }}>
        <Users /> Family Bundle Cheat-Sheet
      </h3>

      <div className="flex flex-wrap gap-2 mb-5">
        {BUNDLES.map((b) => (
          <button
            key={b.id}
            onClick={() => setActive(b.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold border"
            style={
              active === b.id
                ? { backgroundColor: "#C8102E", color: "#fff", borderColor: "#C8102E" }
                : { borderColor: "#cbd5e1", color: "#334155" }
            }
          >
            {b.title}
          </button>
        ))}
      </div>

      <div className="rounded-xl p-5" style={{ backgroundColor: "#E6F2F7" }}>
        <ul className="space-y-1">
          {bundle.items.map((it) => (
            <li key={it} className="text-sm font-medium">• {it}</li>
          ))}
        </ul>
        <p className="mt-3 font-bold" style={{ color: "#006491" }}>{bundle.est}</p>
        <p className="text-sm text-slate-600 mt-1">{bundle.note}</p>
      </div>

      <p className="text-sm mt-4">
        Order these through the{" "}
        <Link href="/posts/dominos-mix-and-match-deal" className="font-semibold underline" style={{ color: "#C8102E" }}>
          Mix &amp; Match deal
        </Link>{" "}
        and choose carryout for the lowest total. Prices are examples — verify at checkout.
      </p>
    </div>
  );
}

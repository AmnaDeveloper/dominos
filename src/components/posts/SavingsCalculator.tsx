"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export default function SavingsCalculator() {
  const [orderType, setOrderType] = useState<"carryout" | "delivery">("carryout");
  const [subtotal, setSubtotal] = useState(30);
  const [rewards, setRewards] = useState(false);

  const deliveryFee = orderType === "delivery" ? 4.99 : 0;
  const dealSavings = subtotal * 0.2; // value-deal discount estimate
  const rewardsSavings = rewards ? Math.min(subtotal * 0.15, 12) : 0;

  const menuPriceTotal = subtotal + deliveryFee;
  const optimizedTotal = subtotal - dealSavings - rewardsSavings + deliveryFee;
  const totalSaved = Math.max(0, menuPriceTotal - optimizedTotal);

  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="rounded-2xl border-2 p-6 my-8" style={{ borderColor: "#006491" }}>
      <h3 className="flex items-center gap-2 text-xl font-black mb-4" style={{ color: "#006491" }}>
        <Calculator /> Domino&apos;s Savings Calculator
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold block mb-2">Order type</label>
          <div className="flex gap-2">
            {(["carryout", "delivery"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize border"
                style={
                  orderType === t
                    ? { backgroundColor: "#C8102E", color: "#fff", borderColor: "#C8102E" }
                    : { borderColor: "#cbd5e1", color: "#334155" }
                }
              >
                {t}
              </button>
            ))}
          </div>

          <label className="text-sm font-semibold block mt-5 mb-2">
            Order subtotal: {money(subtotal)}
          </label>
          <input
            type="range"
            min={10}
            max={80}
            step={1}
            value={subtotal}
            onChange={(e) => setSubtotal(Number(e.target.value))}
            className="w-full accent-[#C8102E]"
          />

          <label className="flex items-center gap-2 mt-5 text-sm font-semibold">
            <input type="checkbox" checked={rewards} onChange={(e) => setRewards(e.target.checked)} className="accent-[#006491]" />
            Apply a Domino&apos;s Rewards redemption
          </label>
        </div>

        <div className="rounded-xl p-5" style={{ backgroundColor: "#E6F2F7" }}>
          <div className="flex justify-between text-sm py-1">
            <span>Menu-price total</span>
            <span>{money(menuPriceTotal)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Value-deal savings (~20%)</span>
            <span className="text-red-600">-{money(dealSavings)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Rewards savings</span>
            <span className="text-red-600">-{money(rewardsSavings)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Delivery fee</span>
            <span>{money(deliveryFee)}</span>
          </div>
          <hr className="my-2 border-slate-300" />
          <div className="flex justify-between font-bold">
            <span>Optimized total</span>
            <span style={{ color: "#006491" }}>{money(Math.max(0, optimizedTotal))}</span>
          </div>
          <div className="mt-3 text-center rounded-lg py-2 font-black text-white" style={{ backgroundColor: "#C8102E" }}>
            You save {money(totalSaved)}
          </div>
        </div>
      </div>
      <p className="price-disclaimer mt-4">
        Estimates only — actual savings depend on the specific deal, items and
        your location. Verify at official checkout.
      </p>
    </div>
  );
}

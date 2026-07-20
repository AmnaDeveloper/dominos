"use client";

import { useState } from "react";
import { locations, getStates } from "@/data/locations";

const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function RestaurantHoursSection() {
  const states = getStates();
  const [state, setState] = useState<string>("all");

  const filtered = state === "all" ? locations : locations.filter((l) => l.state === state);

  return (
    <section className="container-max py-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <h2 className="section-mini-heading">Domino&apos;s Hours by City</h2>
        <select
          aria-label="Filter by state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm sm:ml-auto"
        >
          <option value="all">All states</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <p className="text-slate-600 mb-6 max-w-2xl text-sm">
        Typical Domino&apos;s hours by location. Individual stores set their own
        hours, and many deliver late into the night — always verify on the
        official Domino&apos;s locator.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((loc) => (
          <div key={loc.slug} className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 text-white font-bold" style={{ backgroundColor: "#006491" }}>
              {loc.city}, {loc.state}
            </div>
            <table className="w-full text-sm">
              <tbody>
                {loc.hours.map((h) => {
                  const isToday = h.day === TODAY;
                  return (
                    <tr
                      key={h.day}
                      style={isToday ? { backgroundColor: "#FDE8EC" } : undefined}
                    >
                      <td className="px-4 py-1.5 font-medium">
                        {h.day} {isToday && <span className="text-[10px]" style={{ color: "#C8102E" }}>(Today)</span>}
                      </td>
                      <td className="px-4 py-1.5 text-right text-slate-600">
                        {h.open} – {h.close}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}

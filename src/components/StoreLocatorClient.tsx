"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { locations, getStates } from "@/data/locations";

export default function StoreLocatorClient() {
  const states = getStates();
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter((l) => {
      const matchState = state === "all" || l.state === state;
      const matchQuery = !q || l.city.toLowerCase().includes(q) || l.state.toLowerCase().includes(q);
      return matchState && matchQuery;
    });
  }, [query, state]);

  return (
    <div className="container-max py-10">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center border border-slate-300 rounded-lg px-3 py-2 flex-1">
          <Search size={16} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or state…"
            aria-label="Search locations"
            className="ml-2 w-full text-sm outline-none"
          />
        </div>
        <select value={state} onChange={(e) => setState(e.target.value)} aria-label="Filter by state" className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
          <option value="all">All states</option>
          {states.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>

      <div className="rounded-lg p-4 mb-6 text-sm" style={{ backgroundColor: "#FDE8EC", color: "#8a1220" }}>
        These city guides are informational. To find an exact store, hours and
        delivery zone, use the official Domino&apos;s locator.
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm">No matching cities. Try another search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-[#006491] hover:shadow-sm transition">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin size={16} style={{ color: "#C8102E" }} /> {l.city}, {l.state}
              </div>
              <p className="text-sm text-slate-500 mt-1">{l.address}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

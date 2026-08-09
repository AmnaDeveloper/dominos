"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { locations, getStates } from "@/data/locations";

/**
 * City picker that sends readers to Domino's own store finder.
 *
 * This used to render a seven-day hours table per city. Those tables came from
 * two hard-coded presets shared across all twenty cities, so a reader looking
 * at "New York, NY" was shown a schedule that had never been checked against a
 * single New York store. Publishing a made-up timetable is worse than
 * publishing none — someone turns up at a closed store.
 *
 * Hours are set per franchise and change on holidays, so the honest version of
 * this section is a fast route to the source that actually knows.
 */
export default function RestaurantHoursSection() {
  const states = getStates();
  const [state, setState] = useState<string>("all");

  const filtered = state === "all" ? locations : locations.filter((l) => l.state === state);

  return (
    <section className="container-max py-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <h2 className="section-mini-heading">Check Hours for Your City</h2>
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
        We don&apos;t publish store-by-store hours. Every Domino&apos;s is independently
        franchised and sets its own opening and closing times, and those shift on holidays —
        so any timetable here would be a guess. Pick your city to open Domino&apos;s own
        finder, which shows each store&apos;s live hours.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((loc) => (
          <div
            key={loc.slug}
            className="rounded-xl border border-slate-200 p-4 transition hover:border-[#006491] hover:shadow-sm"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <MapPin size={16} style={{ color: "#C8102E" }} aria-hidden="true" />
              {loc.city}, {loc.state}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a
                href={loc.locatorUrl}
                target="_blank"
                rel="nofollow noopener"
                className="inline-flex items-center gap-1.5 font-semibold underline"
                style={{ color: "#C8102E" }}
              >
                Store hours
                <ExternalLink size={13} aria-hidden="true" />
              </a>
              <Link
                href={`/locations/${loc.slug}`}
                className="font-semibold underline"
                style={{ color: "#006491" }}
              >
                Ordering guide
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

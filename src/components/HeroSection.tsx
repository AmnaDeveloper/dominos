import Link from "next/link";
import {
  MapPin, Pizza, Tag, Star, CupSoda, Utensils, Drumstick,
  Sandwich, Croissant, CakeSlice, Apple, LayoutGrid,
} from "lucide-react";
import { getTodayFormatted } from "@/lib/utils/date";

const QUICK_LINKS = [
  { icon: Tag, label: "Deals", href: "/coupons" },
  { icon: Pizza, label: "Specialty Pizzas", href: "/menus-prices" },
  { icon: Utensils, label: "Pasta", href: "/menus-prices" },
  { icon: Drumstick, label: "Chicken", href: "/menus-prices/boneless-chicken" },
  { icon: Sandwich, label: "Sides", href: "/menus-prices/stuffed-cheesy-bread" },
  { icon: Croissant, label: "Bread", href: "/menus-prices/stuffed-cheesy-bread" },
  { icon: CakeSlice, label: "Desserts", href: "/menus-prices" },
  { icon: CupSoda, label: "Drinks", href: "/drinks" },
  { icon: Star, label: "Rewards", href: "/dominos-rewards" },
  { icon: Apple, label: "Nutrition", href: "/menus-prices" },
  { icon: LayoutGrid, label: "View All Menu", href: "/menus-prices" },
];

export default function HeroSection() {
  return (
    <section
      className="relative text-white"
      style={{ background: "linear-gradient(135deg, #006491 0%, #003F5C 100%)" }}
    >
      <div className="container-max py-16 lg:py-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Left — headline + intro + CTAs */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-white/80 mb-3">
            UPDATED AT: {getTodayFormatted()}
          </p>
          <h1 className="hero-main-heading">
            Domino&apos;s Menu with Prices, Coupons &amp; Deals — 2026 Guide
          </h1>
          <p className="mt-5 max-w-xl text-white/85 text-base leading-relaxed">
            Your independent, unofficial guide to the{" "}
            <Link href="/menus-prices" className="underline font-semibold">
              Domino&apos;s menu with example prices
            </Link>
            , the best{" "}
            <Link href="/coupons" className="underline font-semibold">
              coupons and deals
            </Link>
            ,{" "}
            <Link href="/dominos-rewards" className="underline font-semibold">
              rewards
            </Link>
            , nutrition and{" "}
            <Link href="/dominos-delivery-near-me" className="underline font-semibold">
              delivery
            </Link>{" "}
            info. Always verify final prices at official checkout.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/menus-prices"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white"
              style={{ backgroundColor: "#C8102E" }}
            >
              <Pizza size={18} /> View Menu &amp; Prices
            </Link>
            <Link
              href="/store-locator"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg bg-white text-[#006491]"
            >
              <MapPin size={18} /> Find a Store
            </Link>
          </div>
        </div>

        {/* Right — quick links panel */}
        <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-6 shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-4">
            Explore the Guide
          </p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-white/5 hover:bg-white/20 border border-transparent hover:border-white/25 transition text-sm font-semibold ${
                  l.label === "View All Menu" ? "col-span-2 justify-center" : ""
                }`}
              >
                <l.icon size={16} className="opacity-80 shrink-0" />
                <span className="truncate">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

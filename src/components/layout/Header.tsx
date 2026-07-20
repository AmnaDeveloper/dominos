"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Tag } from "lucide-react";
import { posts, postHref } from "@/data/posts";
import { completeMenu } from "@/data/complete-menu";

interface SearchResult {
  label: string;
  href: string;
  type: string;
}

const STATIC_PAGES: SearchResult[] = [
  { label: "Menu & Prices", href: "/menus-prices", type: "Page" },
  { label: "Coupons & Deals", href: "/coupons", type: "Page" },
  { label: "Domino's Rewards", href: "/dominos-rewards", type: "Page" },
  { label: "Store Locator", href: "/store-locator", type: "Page" },
  { label: "Hours", href: "/hours", type: "Page" },
  { label: "Delivery Near Me", href: "/dominos-delivery-near-me", type: "Page" },
];

const MENU_DROPDOWN = [
  { label: "All Menu & Prices", href: "/menus-prices" },
  { label: "Pepperoni Pizza", href: "/menus-prices/pepperoni-pizza" },
  { label: "ExtravaganZZa", href: "/menus-prices/extravaganzza-pizza" },
  { label: "Philly Cheese Steak", href: "/menus-prices/philly-cheese-steak-pizza" },
  { label: "Stuffed Cheesy Bread", href: "/menus-prices/stuffed-cheesy-bread" },
  { label: "Boneless Chicken", href: "/menus-prices/boneless-chicken" },
  { label: "Drinks", href: "/drinks" },
];

const NAV_LINKS = [
  { label: "Coupons", href: "/coupons" },
  { label: "Rewards", href: "/dominos-rewards" },
  { label: "Guides", href: "/posts" },
  { label: "Store Locator", href: "/store-locator" },
  { label: "Hours", href: "/hours" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchIndex = useMemo<SearchResult[]>(() => {
    const menuResults = completeMenu.map((m) => ({
      label: m.title,
      href: m.slug === "drinks" ? "/drinks" : `/menus-prices/${m.slug}`,
      type: "Menu",
    }));
    const postResults = posts.map((p) => ({
      label: p.title,
      href: postHref(p),
      type: "Guide",
    }));
    return [...STATIC_PAGES, ...menuResults, ...postResults];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .map((r) => {
        const label = r.label.toLowerCase();
        let score = 0;
        if (label === q) score += 100;
        if (label.startsWith(q)) score += 50;
        if (label.includes(q)) score += 20;
        return { ...r, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query, searchIndex]);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-black text-white text-xs">
        <div className="container-max flex items-center justify-between h-9">
          <span className="hidden sm:inline opacity-80">
            Unofficial Domino&apos;s Menu &amp; Deals Guide — verify prices at official checkout
          </span>
          <Link
            href="/coupons"
            className="ml-auto inline-flex items-center gap-1 font-bold px-3 py-1 rounded"
            style={{ backgroundColor: "#C8102E" }}
          >
            <Tag size={13} /> Coupons &amp; Deals
          </Link>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-max flex items-center gap-4 h-16">
          <button
            aria-label="Open menu"
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={26} />
          </button>

          <Link href="/" className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
            <span style={{ color: "#E31837" }}>DOMI</span>
            <span style={{ color: "#006491" }}>NOS</span>
          </Link>

          {/* Live search */}
          <div className="relative ml-auto w-full max-w-xs hidden md:block">
            <div className="flex items-center border border-slate-300 rounded-full px-3 py-1.5">
              <Search size={16} className="text-slate-400" />
              <input
                type="search"
                aria-label="Search the site"
                placeholder="Search menu, deals, guides…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 w-full text-sm outline-none bg-transparent"
              />
            </div>
            {results.length > 0 && (
              <ul className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
                {results.map((r) => (
                  <li key={r.href + r.label}>
                    <Link
                      href={r.href}
                      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50"
                      onClick={() => setQuery("")}
                    >
                      <span className="truncate">{r.label}</span>
                      <span className="text-[10px] uppercase text-slate-400 ml-2">{r.type}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Nav bar */}
        <nav className="border-t border-slate-100 hidden lg:block">
          <div className="container-max flex items-center gap-6 h-11 text-sm font-semibold">
            <details className="relative group">
              <summary className="nav-link-header cursor-pointer list-none py-1">
                Menu &amp; Prices ▾
              </summary>
              <ul className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-56 z-50">
                {MENU_DROPDOWN.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="block px-4 py-2 hover:bg-slate-50">
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link-header py-1">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full bg-white shadow-xl p-5 flex flex-col" style={{ width: "400px", maxWidth: "85vw" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-black">
                <span style={{ color: "#E31837" }}>DOMI</span>
                <span style={{ color: "#006491" }}>NOS</span>
              </span>
              <button aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center border border-slate-300 rounded-full px-3 py-2 mb-2">
              <Search size={16} className="text-slate-400" />
              <input
                type="search"
                aria-label="Search the site"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 w-full text-sm outline-none"
              />
            </div>
            {results.length > 0 && (
              <ul className="mb-4 border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                {results.map((r) => (
                  <li key={r.href + r.label}>
                    <Link
                      href={r.href}
                      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50"
                      onClick={() => {
                        setQuery("");
                        setDrawerOpen(false);
                      }}
                    >
                      <span className="truncate">{r.label}</span>
                      <span className="text-[10px] uppercase text-slate-400 ml-2 shrink-0">{r.type}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <nav className="flex flex-col gap-1 overflow-y-auto">
              {[...MENU_DROPDOWN, ...NAV_LINKS].map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="py-2 border-b border-slate-100 font-medium"
                  onClick={() => setDrawerOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

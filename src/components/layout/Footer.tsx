import Link from "next/link";
import { SITE_DOMAIN, NOT_AFFILIATED_DISCLAIMER } from "@/lib/site-config";

const COLS = [
  {
    title: "Menu & Deals",
    links: [
      { label: "Menu & Prices", href: "/menus-prices" },
      { label: "Coupons & Deals", href: "/coupons" },
      { label: "Domino's Rewards", href: "/dominos-rewards" },
      { label: "Delivery Near Me", href: "/dominos-delivery-near-me" },
      { label: "Drinks", href: "/drinks" },
    ],
  },
  {
    title: "Guides & Info",
    links: [
      { label: "All Guides", href: "/posts" },
      { label: "Store Locator", href: "/store-locator" },
      { label: "Hours", href: "/hours" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Editorial Team", href: "/team" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16">
      <div style={{ backgroundColor: "#006491" }} className="text-white">
        <div className="container-max py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-black mb-3">
              <span style={{ color: "#E31837" }}>DOMI</span>
              <span className="text-white">NOS</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              An independent, unofficial guide to the Domino&apos;s menu, prices, coupons and deals in the USA.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-bold mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#C8102E" }} className="text-white">
        <div className="container-max py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/90 text-center md:text-left">
            Independent informational guide. We do not take orders or represent Domino&apos;s Pizza LLC.
          </p>
          <p className="text-xs text-white/90 text-center md:text-right">
            © {year} {SITE_DOMAIN}
          </p>
        </div>
      </div>

      <div className="bg-slate-100 text-slate-600">
        <div className="container-max py-4">
          <p className="text-[11px] leading-relaxed text-center">{NOT_AFFILIATED_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LinkItem {
  label: string;
  href: string;
  desc?: string;
}

const DEFAULT_LINKS: LinkItem[] = [
  { label: "Menu with Prices", href: "/menus-prices", desc: "Every category with example 2026 prices" },
  { label: "Coupons & Deals", href: "/coupons", desc: "Mix & Match, $6.99 Each and more" },
  { label: "Domino's Rewards", href: "/dominos-rewards", desc: "Earn points toward a free pizza" },
  { label: "Delivery Near Me", href: "/dominos-delivery-near-me", desc: "Times, fees and how to order" },
  { label: "Pizza Sizes & Prices", href: "/posts/dominos-pizza-sizes-and-prices", desc: "Small to Extra Large compared" },
  { label: "Save Money at Domino's", href: "/posts/how-to-save-money-at-dominos", desc: "The full money-saving playbook" },
  { label: "Calories & Nutrition", href: "/posts/dominos-calories-nutrition-guide", desc: "Calories per slice, size and side" },
  { label: "Crust Types Explained", href: "/posts/dominos-crust-types-explained", desc: "Hand Tossed, Pan, Thin and more" },
  { label: "Parmesan Stuffed Crust", href: "/posts/dominos-parmesan-stuffed-crust", desc: "Price, sizes, calories and verdict" },
  { label: "Sides Menu with Prices", href: "/posts/dominos-sides-menu-prices", desc: "Pasta, sandwiches, tots and desserts" },
  { label: "Specialty Pizzas", href: "/posts/dominos-specialty-pizzas", desc: "All 13 recipes, prices and calories" },
  { label: "Toppings List & Prices", href: "/posts/dominos-toppings-list-prices", desc: "Every meat, veggie, cheese and sauce" },
  { label: "Vegetarian & Vegan", href: "/posts/dominos-vegetarian-vegan-options", desc: "What you can actually order" },
  { label: "Domino's vs Pizza Hut vs Papa John's", href: "/posts/dominos-vs-pizza-hut-vs-papa-johns", desc: "Which chain is actually cheaper" },
];

export default function InternalLinks({
  title = "Explore More Guides",
  links = DEFAULT_LINKS,
}: {
  title?: string;
  links?: LinkItem[];
}) {
  return (
    <section className="my-12">
      <h2 className="section-mini-heading mb-5">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-xl border border-slate-200 p-4 hover:border-[#006491] hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{l.label}</span>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-[#C8102E]" />
            </div>
            {l.desc && <p className="text-sm text-slate-500 mt-1">{l.desc}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}

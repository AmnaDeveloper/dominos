import { getMonthYear } from "@/lib/utils/date";

interface Category {
  name: string;
  anchor: string;
  columns: string[];
  rows: string[][];
}

const CATEGORIES: Category[] = [
  {
    name: "Pizzas (Build Your Own)",
    anchor: "pizzas",
    columns: ["Pizza", "Small (10\")", "Medium (12\")", "Large (14\")"],
    rows: [
      ["Cheese", "$7.99", "$9.99", "$11.99"],
      ["Pepperoni", "$8.99", "$10.99", "$12.99"],
      ["Sausage", "$8.99", "$10.99", "$12.99"],
      ["2-Topping", "$9.49", "$11.49", "$13.49"],
      ["3-Topping", "$10.49", "$12.49", "$14.49"],
    ],
  },
  {
    name: "Pasta",
    anchor: "pasta",
    columns: ["Item", "Price", "Calories"],
    rows: [
      ["Chicken Alfredo", "$7.99", "600"],
      ["Chicken Carbonara", "$8.49", "640"],
      ["Italian Sausage Marinara", "$7.99", "620"],
      ["Pasta Primavera", "$7.99", "540"],
      ["Build Your Own Pasta", "$7.99", "~500"],
    ],
  },
  {
    name: "Specialty Pizzas",
    anchor: "specialty-pizzas",
    columns: ["Specialty Pizza", "Small", "Medium", "Large"],
    rows: [
      ["ExtravaganZZa", "$12.99", "$14.99", "$16.99"],
      ["MeatZZa", "$12.99", "$14.99", "$16.99"],
      ["Ultimate Pepperoni", "$12.99", "$14.99", "$16.99"],
      ["Buffalo Chicken", "$12.99", "$14.99", "$16.99"],
      ["Cali Chicken Bacon Ranch", "$12.99", "$14.99", "$16.99"],
      ["Deluxe", "$12.99", "$14.99", "$16.99"],
      ["Memphis BBQ Chicken", "$12.99", "$14.99", "$16.99"],
      ["Pacific Veggie", "$12.99", "$14.99", "$16.99"],
      ["Wisconsin 6 Cheese", "$12.99", "$14.99", "$16.99"],
      ["Philly Cheese Steak", "$12.99", "$14.99", "$16.99"],
    ],
  },
  {
    name: "Chicken & Wings",
    anchor: "chicken",
    columns: ["Item", "Portion", "Price", "Calories"],
    rows: [
      ["Boneless Chicken", "8 pc", "$8.99", "540"],
      ["Hot Buffalo Wings", "8 pc", "$9.49", "800"],
      ["BBQ Wings", "8 pc", "$9.49", "820"],
      ["Crispy Bacon & Tomato Specialty Chicken", "Order", "$8.99", "620"],
      ["Classic Hot Buffalo Specialty Chicken", "Order", "$8.99", "600"],
      ["Spicy Jalapeño-Pineapple Specialty Chicken", "Order", "$8.99", "640"],
      ["Sweet BBQ Bacon Specialty Chicken", "Order", "$8.99", "660"],
    ],
  },
  {
    name: "Sandwiches",
    anchor: "sandwiches",
    columns: ["Sandwich", "Price", "Calories"],
    rows: [
      ["Italian", "$6.99", "710"],
      ["Chicken Habanero", "$7.49", "730"],
      ["Mediterranean Veggie", "$6.99", "630"],
      ["Buffalo Chicken", "$7.49", "810"],
      ["Chicken Bacon Ranch", "$7.49", "790"],
      ["Philly Cheese Steak", "$7.49", "720"],
    ],
  },
  {
    name: "Drinks",
    anchor: "drinks",
    columns: ["Drink", "Size", "Price"],
    rows: [
      ["Coca-Cola", "20 oz", "$2.49"],
      ["Coca-Cola", "2-Liter", "$3.49"],
      ["Diet Coke", "20 oz / 2 L", "$2.49 / $3.49"],
      ["Coke Zero Sugar", "20 oz / 2 L", "$2.49 / $3.49"],
      ["Sprite", "20 oz / 2 L", "$2.49 / $3.49"],
      ["Fanta Orange", "20 oz / 2 L", "$2.49 / $3.49"],
      ["Barq's Root Beer", "20 oz / 2 L", "$2.49 / $3.49"],
    ],
  },
  {
    name: "Sides & Bread",
    anchor: "sides-bread",
    columns: ["Item", "Portion", "Price", "Calories"],
    rows: [
      ["Stuffed Cheesy Bread", "8 pc", "$7.99", "1140"],
      ["Parmesan Bread Bites", "16 pc", "$6.99", "790"],
      ["Garlic Bread Twists", "8 pc", "$6.99", "1160"],
      ["Cinnamon Bread Twists", "8 pc", "$6.99", "1200"],
      ["Bread Twists (Garlic/Plain)", "8 pc", "$6.49", "1080"],
      ["Dipping Sauces", "Each", "$0.99", "40–220"],
    ],
  },
  {
    name: "Desserts",
    anchor: "desserts",
    columns: ["Dessert", "Portion", "Price", "Calories"],
    rows: [
      ["Chocolate Lava Crunch Cakes", "2 pack", "$4.99", "690"],
      ["Cinnamon Bread Twists", "8 pc", "$6.99", "1200"],
      ["Marbled Cookie Brownie", "9 pc", "$6.99", "1300"],
    ],
  },
];

export default function MenuGuideSection() {
  const month = getMonthYear();
  return (
    <section className="container-max py-20">
      <style>{`
        .mg-table { width:100%; border-collapse:collapse; }
        .mg-table thead { background:#006491; }
        .mg-table th { color:#fff; text-align:left; padding:.7rem 1.1rem; font-size:.72rem; text-transform:uppercase; letter-spacing:.04em; font-weight:800; white-space:nowrap; }
        .mg-table td { padding:.62rem 1.1rem; border-top:1px solid #eef4f7; font-size:.9rem; color:#334155; }
        .mg-table tbody tr:nth-child(even){ background:#f7fbfc; }
        .mg-table tbody tr:hover{ background:#e6f2f7; }
        .mg-table td:first-child{ font-weight:700; color:#006491; }
      `}</style>

      <h2 className="section-mini-heading">Domino&apos;s Menu with Prices ({month})</h2>
      <p className="text-slate-600 mt-3 mb-6 max-w-2xl">
        The full Domino&apos;s menu with example US prices across every category —
        pizzas, specialty pizzas, pasta, chicken and wings, sandwiches, sides,
        desserts and drinks. Domino&apos;s is franchise-priced, so treat these as
        a realistic guide and verify the final total at official checkout.
      </p>

      {/* Category jump bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <a
            key={c.anchor}
            href={`#${c.anchor}`}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 text-slate-700 border border-transparent hover:bg-white hover:border-[#006491] hover:text-[#006491] transition"
          >
            {c.name}
          </a>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.anchor}
            id={cat.anchor}
            className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
              <span className="h-4 w-1.5 rounded-full" style={{ backgroundColor: "#C8102E" }} />
              <h3 className="text-base font-black text-slate-900">{cat.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="mg-table">
                <thead>
                  <tr>
                    {cat.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cat.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <p className="price-disclaimer mt-6">
        Prices and calories are examples that vary by location and may change at
        any time. This is an independent, unofficial guide — always verify at
        official checkout.
      </p>
    </section>
  );
}

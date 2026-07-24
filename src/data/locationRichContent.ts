import type { PricingRow } from "./types";

// Shared example price constants reused across rich location pages.
export const standardPizzaPrices2026: PricingRow[] = [
  { item: "Cheese Pizza", size: "Large (14\")", price: "$11.99" },
  { item: "Pepperoni Pizza", size: "Large (14\")", price: "$12.99" },
  { item: "ExtravaganZZa", size: "Large (14\")", price: "$16.99" },
  { item: "Philly Cheese Steak", size: "Large (14\")", price: "$16.99" },
  { item: "Pacific Veggie", size: "Large (14\")", price: "$16.99" },
];

export const standardSidePrices2026: PricingRow[] = [
  { item: "Stuffed Cheesy Bread", size: "8 pieces", price: "$7.99" },
  { item: "Boneless Chicken", size: "8 pieces", price: "$8.99" },
  { item: "Garlic Bread Twists", size: "8 pieces", price: "$6.99" },
  { item: "Chocolate Lava Crunch Cakes", size: "2 pack", price: "$4.99" },
  { item: "2-Liter Coca-Cola", size: "2 L", price: "$3.49" },
];

export interface NeighborhoodSection {
  heading: string;
  body: string;
}

export interface RichLocationData {
  slug: string;
  heroSubtitle: string;
  stats: { label: string; value: string }[];
  intro: string;
  editorialSections?: NeighborhoodSection[];
  neighborhoods: NeighborhoodSection[];
  orderingTips?: NeighborhoodSection[];
  additionalLocations: string[];
  pizzaPrices: PricingRow[];
  sidePrices: PricingRow[];
}

export const locationRichContent: Record<string, RichLocationData> = {
  "new-york-ny": {
    slug: "new-york-ny",
    heroSubtitle: "Menu prices, hours, delivery zones and ordering tips for Domino's across New York City.",
    stats: [
      { label: "Stores in metro", value: "150+" },
      { label: "Typical delivery", value: "25–40 min" },
      { label: "Late-night", value: "Until 1 AM" },
    ],
    intro:
      "Domino's is one of the most widely available pizza options in New York City, with locations across Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Because NYC stores are busy and often keep late hours, delivery times can stretch on weekends. This unofficial guide covers example prices and ordering tips — always verify on the official Domino's locator.",
    neighborhoods: [
      { heading: "Manhattan", body: "Dense store coverage means short delivery radiuses and generally fast times midweek. Carryout is easy in most neighborhoods and skips the delivery fee." },
      { heading: "Brooklyn & Queens", body: "Extensive coverage with many late-night stores. Brooklyn Style crust is a natural fit if you want big, foldable slices." },
    ],
    additionalLocations: ["Midtown Manhattan", "Downtown Brooklyn", "Long Island City", "The Bronx", "Staten Island"],
    pizzaPrices: standardPizzaPrices2026,
    sidePrices: standardSidePrices2026,
  },
  "los-angeles-ca": {
    slug: "los-angeles-ca",
    heroSubtitle: "Menu prices, hours, delivery zones and ordering tips for Domino's across Los Angeles.",
    stats: [
      { label: "Stores in metro", value: "120+" },
      { label: "Typical delivery", value: "25–40 min" },
      { label: "Late-night", value: "Until 1 AM" },
    ],
    intro:
      "Domino's blankets Los Angeles County, from Downtown and Hollywood to the San Fernando Valley and the South Bay. With so many stores, most addresses fall inside a delivery zone, though traffic can affect delivery times. This is an unofficial guide — confirm prices and store details on the official Domino's app.",
    neighborhoods: [
      { heading: "Central LA & Hollywood", body: "High store density keeps delivery times reasonable. Carryout is the cheapest option if you're nearby." },
      { heading: "The Valley & South Bay", body: "Broad coverage with many stores keeping extended hours for late-night orders." },
    ],
    additionalLocations: ["Downtown LA", "Hollywood", "Santa Monica", "Long Beach", "Pasadena"],
    pizzaPrices: standardPizzaPrices2026,
    sidePrices: standardSidePrices2026,
  },
  "chicago-il": {
    slug: "chicago-il",
    heroSubtitle: "Chicago Domino's menu prices, delivery zones, carryout tips and neighborhood ordering notes for 2026.",
    stats: [
      { label: "Best first check", value: "Official locator" },
      { label: "Value angle", value: "Carryout" },
      { label: "Plan for", value: "Traffic" },
    ],
    intro:
      "Chicago is a big pizza city, and Domino's competes in a market where customers compare speed, price, carryout convenience and late-night availability before they order. This guide is written as a practical planning page, not as an official store directory. It does not publish a single fixed Chicago address or phone number because Domino's delivery zones, hours, prices and participating offers can vary by store. Use this page to understand what to check before ordering, then confirm your exact address, nearest store, menu prices and open hours on the official Domino's locator or app.",
    editorialSections: [
      {
        heading: "What makes ordering Domino's in Chicago different?",
        body:
          "Chicago orders are shaped by neighborhood density, apartment access, event traffic and weather. A delivery that is simple on a quiet Tuesday can become slower near game time, during a lakefront event or after heavy snow. That is why the safest ordering habit is to compare the final checkout total, not only the menu price. The app can show whether your address is eligible for delivery, whether carryout is available, which coupons your local store participates in and whether a delivery minimum applies.",
      },
      {
        heading: "Why this page avoids exact store addresses",
        body:
          "Exact Domino's addresses, phone numbers and hours should come from Domino's directly because stores can relocate, change hours, pause delivery, update phone routing or adjust service areas. Publishing stale local contact details can confuse users and create low-quality information. Instead, this guide focuses on evergreen Chicago ordering decisions: when carryout saves money, what types of orders travel well, how to handle high-rise delivery notes and how to avoid surprises at checkout.",
      },
      {
        heading: "Best use case for this Chicago guide",
        body:
          "Use this page before you request indexing or compare city pages for quality. A strong local food page should help the reader make a better decision even if they already know the brand. For Chicago, that means explaining neighborhood ordering patterns, delivery-versus-carryout tradeoffs, likely fee considerations, and practical situations such as office lunch, student orders, family dinners and late-night food. The final order should still be placed through Domino's official channels.",
      },
    ],
    neighborhoods: [
      {
        heading: "Logan Square, Bucktown & Avondale",
        body:
          "Northwest Side neighborhoods are busy with apartments, small homes, late work schedules and weekend demand. Domino's can make sense here for fast weeknight dinners, roommate orders and small group meals. The biggest decision is usually carryout versus delivery. If the official app shows a nearby carryout option, pickup may reduce the final total because you avoid the delivery charge and driver tip. Delivery is still convenient, but add clear instructions if your building has a gate, buzzer, rear entrance or limited street parking.",
      },
      {
        heading: "Lakeview, Lincoln Park & Wrigleyville",
        body:
          "Lakeview and Lincoln Park orders often overlap with sports nights, college housing, bars, theaters and dense residential blocks. Around major events, delivery timing can stretch because drivers deal with traffic, crowds and parking. If you are ordering for a watch party or group, place the order before peak hunger time and choose items that are easy to share. Medium pizzas, breads, chicken and desserts can be easier to split than one complicated large pizza with toppings that not everyone wants.",
      },
      {
        heading: "Loop, West Loop & South Loop",
        body:
          "Downtown Chicago is different from a simple suburban delivery zone. High-rise buildings, lobby security, loading zones, office towers and one-way streets can slow down the handoff even when the kitchen prepares food quickly. For office lunches, include the company name, floor, suite number and pickup instructions in the order notes. For apartments, meet the driver where your building allows food delivery. Clear instructions can protect food quality and reduce missed-call problems.",
      },
      {
        heading: "Hyde Park, Bronzeville & South Side routes",
        body:
          "South Side orders can include student housing, family meals, hospital-area shifts and late dinners after work. The most important step is address verification. Delivery availability can change block by block, and one nearby address may be eligible while another is assigned to a different store or carryout only. Enter the full street address in the official Domino's app before comparing prices. If delivery is unavailable, carryout may still be a useful option.",
      },
      {
        heading: "Rogers Park, Edgewater & Andersonville",
        body:
          "Far North Side ordering has its own rhythm because of lakefront roads, campus-area demand, apartment density and longer north-south travel times. If you are ordering late, verify current hours in the app rather than assuming every store follows the same schedule. For value, compare a carryout coupon against the delivered total after tax, delivery charge and tip. The lowest menu price is not always the lowest final price.",
      },
    ],
    orderingTips: [
      {
        heading: "For cheapest Chicago orders",
        body:
          "Start with carryout coupons, then check Mix & Match or national deals. Carryout is often the strongest value when you can pick up without a long trip. Delivery becomes more worthwhile when the order is larger, the weather is bad or pickup would cost more in time, parking or transit. Always compare the final checkout total because taxes, delivery charges, tips and store participation can change the real cost.",
      },
      {
        heading: "For delivery quality",
        body:
          "Simple pizzas, breads and chicken tend to hold up better than overloaded pies during longer delivery windows. If your order is going to a high-rise, campus building, hotel or office, add exact handoff notes. If the app allows driver instructions, mention the entrance, buzzer, lobby desk or meeting point. Good instructions are not just polite; they can help the food arrive faster and warmer.",
      },
      {
        heading: "For groups and office meals",
        body:
          "Avoid building one pizza for everyone. A better Chicago group order usually mixes cheese, pepperoni, one specialty pizza, a bread item and chicken or dessert. This keeps the order flexible for picky eaters and makes leftovers easier. For offices, order earlier than the lunch rush and verify whether the store accepts the coupon you plan to use before you promise a final per-person price.",
      },
      {
        heading: "For late-night orders",
        body:
          "Do not rely on a generic closing time. Chicago stores can have different hours depending on staffing, neighborhood demand, day of week and local conditions. Before a late order, open the official app, enter the exact address and check whether delivery or carryout is currently available. If only carryout appears, decide whether pickup is realistic before building a large cart.",
      },
    ],
    additionalLocations: [
      "Logan Square",
      "Lakeview",
      "Lincoln Park",
      "South Loop",
      "West Loop",
      "Hyde Park",
      "Rogers Park",
      "Little Village",
    ],
    pizzaPrices: standardPizzaPrices2026,
    sidePrices: standardSidePrices2026,
  },
};

export function getRichLocation(slug: string): RichLocationData | undefined {
  return locationRichContent[slug];
}

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
  neighborhoods: NeighborhoodSection[];
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
};

export function getRichLocation(slug: string): RichLocationData | undefined {
  return locationRichContent[slug];
}

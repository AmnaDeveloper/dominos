export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  avatarInitials: string;
}

export const authors: Record<string, Author> = {
  "editorial-team": {
    id: "editorial-team",
    name: "The Editorial Team",
    role: "Menu Guide Editorial Team",
    bio: "Our editorial team researches and cross-checks Domino's menu items, example prices and deals against publicly posted information, updating guides monthly. We only publish original writing and clearly label every price as an example to verify at checkout.",
    specialties: ["Menu research", "Price tracking", "Editorial standards"],
    avatarInitials: "ET",
  },
  "priya-nair": {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Deals & Coupons Editor",
    bio: "Priya has spent years tracking fast-food promotions and loyalty programs. She focuses on translating confusing deal fine print into plain-English guidance so readers can find the cheapest legitimate way to order.",
    specialties: ["Coupons & deals", "Loyalty programs", "Value analysis"],
    avatarInitials: "PN",
  },
  "marcus-bell": {
    id: "marcus-bell",
    name: "Marcus Bell",
    role: "Ordering & Delivery Editor",
    bio: "Marcus covers the logistics of ordering — delivery zones, fees, tracking and store hours. He tests ordering flows and documents how the process actually works so readers know what to expect.",
    specialties: ["Delivery & carryout", "Ordering tech", "Store hours"],
    avatarInitials: "MB",
  },
  "dana-lopez": {
    id: "dana-lopez",
    name: "Dana Lopez",
    role: "Nutrition & Menu Editor",
    bio: "Dana breaks down calories, allergens and ingredient information across the menu, helping readers make informed choices without the marketing spin.",
    specialties: ["Nutrition", "Allergens", "Ingredient sourcing"],
    avatarInitials: "DL",
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors["editorial-team"];
}

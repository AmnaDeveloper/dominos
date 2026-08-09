import type { Coupon } from "./types";

/**
 * Example Domino's offers for the /coupons page.
 *
 * These describe the kinds of deals Domino's runs, not a live feed, and they
 * carry no promo codes because Domino's deals are not claimed that way — they
 * are selected from the deals screen in the app. This file previously held
 * invented codes (MIXMATCH, HALFOFF, SIX99) which the page rendered with a
 * copy-to-clipboard button, so every reader who copied one found it did not
 * work. Each offer now states how it is actually claimed instead.
 */
export const coupons: Coupon[] = [
  {
    id: "mix-and-match",
    discount: "2+ items",
    sub: "each",
    title: "Mix & Match Deal",
    desc: "Pick any two or more qualifying items — pizzas, sides, pasta, chicken and more — at one fixed price each. Domino's most flexible everyday value.",
    howToGet: "Auto-applies in cart",
    expiry: "Ongoing",
    tags: ["Popular", "Value", "Family"],
    featured: true,
  },
  {
    id: "50-percent-off",
    discount: "50% OFF",
    sub: "menu price",
    title: "50% Off Menu-Price Pizzas",
    desc: "Take half off pizzas ordered at regular menu price. Great for specialty pies that aren't in the current Mix & Match lineup.",
    howToGet: "Select offer at checkout",
    expiry: "Limited time",
    tags: ["Pizza", "Online only"],
    featured: true,
  },
  {
    id: "699-each",
    discount: "$6.99",
    sub: "each (3+)",
    title: "$6.99 Each — 3 or More",
    desc: "Order three or more qualifying items and each drops to a low fixed price. The best value for parties and larger orders.",
    howToGet: "Auto-applies with 3+ items",
    expiry: "Ongoing",
    tags: ["Value", "Party"],
  },
  {
    id: "emergency-pizza",
    discount: "FREE",
    sub: "pizza later",
    title: "Emergency Pizza",
    desc: "Rewards members who place a qualifying order can unlock a free pizza to redeem on a later visit. Availability comes and goes.",
    howToGet: "Rewards members",
    expiry: "While promotion runs",
    tags: ["Rewards", "Free"],
  },
  {
    id: "carryout-special",
    discount: "$9.99",
    sub: "carryout",
    title: "Large Carryout Special",
    desc: "A carryout-only price on large pizzas that beats delivery. Skip the delivery fee and pick up for the lowest total.",
    howToGet: "Carryout only",
    expiry: "Ongoing",
    tags: ["Carryout", "Cheapest"],
  },
  {
    id: "free-delivery-threshold",
    discount: "FREE",
    sub: "delivery*",
    title: "Free Delivery Over Threshold",
    desc: "Some stores waive the delivery fee on orders above a set subtotal. Availability and the minimum vary by franchise.",
    howToGet: "Select stores",
    expiry: "Varies by store",
    tags: ["Delivery"],
  },
  {
    id: "boneless-chicken-deal",
    discount: "$6.99",
    sub: "boneless",
    title: "Boneless Chicken Deal",
    desc: "Add an order of boneless chicken at a deal price when combined with a qualifying purchase. A cheap way to add protein.",
    howToGet: "With qualifying order",
    expiry: "Limited time",
    tags: ["Chicken", "Add-on"],
  },
  {
    id: "weekend-bundle",
    discount: "Bundle",
    sub: "deal",
    title: "Weekend Family Bundle",
    desc: "A multi-item bundle — pizzas, a side and a 2-liter — priced for family dinners. Perfect for feeding four or more.",
    howToGet: "Select offer at checkout",
    expiry: "Weekends, limited time",
    tags: ["Family", "Bundle"],
  },
];

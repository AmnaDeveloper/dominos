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
  "houston-tx": {
    slug: "houston-tx",
    heroSubtitle: "Houston Domino's menu prices, delivery-area checks, carryout value tips and neighborhood ordering guidance for 2026.",
    stats: [
      { label: "Best first check", value: "Exact address" },
      { label: "Value angle", value: "Coupons" },
      { label: "Plan for", value: "Distance" },
    ],
    intro:
      "Houston is spread across a large metro area, so ordering Domino's here is less about one central store and more about matching your exact address to the right delivery zone. This page is an independent planning guide for Houston customers who want to compare example menu prices, carryout value, delivery convenience and group-order strategy before opening the official Domino's app. It does not list a fixed Houston address or local phone number because store assignments, hours, delivery boundaries and prices can change by location. Always confirm the final store, checkout total, hours and delivery eligibility through Domino's official locator.",
    editorialSections: [
      {
        heading: "Why Houston delivery zones need an exact address",
        body:
          "Houston neighborhoods can feel close on a map but still fall into different delivery zones because of highways, bayous, traffic patterns and franchise boundaries. A restaurant near one side of town may not deliver across another major road or into a different suburb. The safest way to avoid wrong information is to enter your full street address in the official Domino's app before comparing prices or planning a large order. That address check will show whether delivery, carryout or both are available from the assigned store.",
      },
      {
        heading: "How Houston traffic changes the best ordering choice",
        body:
          "Delivery timing in Houston can shift quickly around rush hour, rain, road work, sporting events and long cross-town drives. If the app shows a nearby carryout option, pickup can be better for hot food and lower final cost. If pickup requires a long drive, paid delivery may be worth it. The useful comparison is not just pizza price; it is pizza price plus delivery charge, tip, taxes, travel time and how quickly the food needs to arrive.",
      },
      {
        heading: "Why this guide avoids unverified addresses and phone numbers",
        body:
          "Local food pages can become low quality when they publish stale store addresses, old hours or phone numbers that no longer route correctly. Houston has many moving parts, including new developments, changing traffic corridors and stores with different delivery settings. For AdSense and user trust, this page gives practical ordering guidance without pretending to be an official directory. Use Domino's official locator for exact store details, then use this guide to think through value, timing and order planning.",
      },
    ],
    neighborhoods: [
      {
        heading: "Downtown, Midtown & EaDo",
        body:
          "Central Houston orders often involve apartments, offices, hotels, event venues and limited curb access. For delivery, include the building name, entrance, floor, suite number or lobby instructions. If you are ordering around a game, concert or nightlife rush, place the order earlier than normal. For office lunches, a mix of pizzas, breads, chicken and desserts usually works better than one heavily customized pizza because teams have different preferences.",
      },
      {
        heading: "Montrose, Heights & Washington Corridor",
        body:
          "These areas combine dense housing, restaurants, bars and busy evening traffic. Carryout can be a strong value when the assigned store is close and parking is manageable. Delivery is convenient for group nights, but apartment and townhouse access notes matter. Add gate codes only where it is safe and allowed, and be ready to answer the phone if the driver needs clarification at the entrance.",
      },
      {
        heading: "Galleria, Uptown & West Houston",
        body:
          "West Houston trips can be affected by shopping traffic, office parks, freeway congestion and large apartment complexes. If delivery time looks long, consider choosing menu items that travel well, such as classic pizzas, breads and chicken. For larger groups, check whether the store participates in the deal you plan to use before collecting money from everyone, because local participation can vary.",
      },
      {
        heading: "Medical Center, Rice Village & Museum District",
        body:
          "Orders around the Medical Center and nearby campuses often need very clear handoff instructions. Hospitals, clinics, hotels and campus buildings may restrict driver access. If food must reach a group at a specific time, order earlier and choose a pickup point that is easy to find. Domino's can work well for shift meals and student orders, but exact delivery eligibility should be verified in the official app.",
      },
      {
        heading: "Katy, Cypress, Sugar Land & Greater Houston suburbs",
        body:
          "Many Houston-area customers live outside the city core, where distances are longer and delivery boundaries can be more specific. A suburb may have several Domino's stores, but your address may still map to only one. Before assuming a coupon, hour or delivery estimate applies, run the exact address check. Carryout may show more predictable timing when delivery routes are stretched by distance or weather.",
      },
    ],
    orderingTips: [
      {
        heading: "For cheapest Houston orders",
        body:
          "Start with carryout coupons, then compare the final delivery total. Houston driving distances can make delivery feel attractive, but fees and tips can change the real price quickly. If you are already near the assigned store, carryout is often the better value. If pickup takes a long drive or parking is difficult, delivery may be worth the added cost.",
      },
      {
        heading: "For rainy or hot-weather ordering",
        body:
          "Houston weather can affect delivery windows and food quality. During heavy rain, flooding risk or extreme heat, place orders earlier and keep instructions simple. Choose items that hold temperature well, and be ready at the door or lobby so the handoff is quick. If weather is severe, verify the app still shows delivery before planning around it.",
      },
      {
        heading: "For apartments, gates and offices",
        body:
          "Houston has many gated communities, high-rise apartments, office parks and large medical buildings. Good delivery notes can prevent delays: include building number, gate process, front desk instructions and the safest meeting point. If the location is hard to navigate, meeting the driver at a visible entrance can be faster than asking them to search the property.",
      },
      {
        heading: "For families and groups",
        body:
          "A balanced order is usually better than a single specialty pizza. Consider one cheese or pepperoni pizza, one specialty pizza, a bread side and chicken or dessert. This keeps the order flexible for kids, adults and picky eaters. For bigger groups, check coupons before choosing sizes because a deal with multiple medium pizzas can sometimes beat one or two large pizzas.",
      },
    ],
    additionalLocations: [
      "Downtown Houston",
      "Midtown",
      "EaDo",
      "The Heights",
      "Montrose",
      "Galleria",
      "Medical Center",
      "Katy",
      "Sugar Land",
      "Cypress",
    ],
    pizzaPrices: standardPizzaPrices2026,
    sidePrices: standardSidePrices2026,
  },
};

export function getRichLocation(slug: string): RichLocationData | undefined {
  return locationRichContent[slug];
}

import type { Location } from "./types";

/**
 * City-level index for the /locations pages.
 *
 * Deliberately holds NO store addresses and NO opening hours. Both used to be
 * invented here — addresses were placeholder text like "Multiple locations
 * across the five boroughs", and hours came from two hard-coded presets applied
 * across all twenty cities. Every Domino's is an independently franchised store
 * that sets its own hours, so any hours table on this site would be guesswork
 * presented as fact, and a wrong address is worse than no address.
 *
 * Instead each city carries `locatorUrl`, a link to Domino's own store finder
 * for that city. That is the only source that is correct by definition.
 * All twenty URLs were verified to return HTTP 200 before being added here.
 */
interface RawLocation {
  city: string;
  state: string;
  slug: string;
  /** Path segment on pizza.dominos.com — {state-name}/{city-name}. */
  locatorPath: string;
}

const RAW: RawLocation[] = [
  { city: "New York", state: "NY", slug: "new-york-ny", locatorPath: "new-york/new-york" },
  { city: "Los Angeles", state: "CA", slug: "los-angeles-ca", locatorPath: "california/los-angeles" },
  { city: "Chicago", state: "IL", slug: "chicago-il", locatorPath: "illinois/chicago" },
  { city: "Houston", state: "TX", slug: "houston-tx", locatorPath: "texas/houston" },
  { city: "Phoenix", state: "AZ", slug: "phoenix-az", locatorPath: "arizona/phoenix" },
  { city: "Philadelphia", state: "PA", slug: "philadelphia-pa", locatorPath: "pennsylvania/philadelphia" },
  { city: "San Antonio", state: "TX", slug: "san-antonio-tx", locatorPath: "texas/san-antonio" },
  { city: "San Diego", state: "CA", slug: "san-diego-ca", locatorPath: "california/san-diego" },
  { city: "Dallas", state: "TX", slug: "dallas-tx", locatorPath: "texas/dallas" },
  { city: "Austin", state: "TX", slug: "austin-tx", locatorPath: "texas/austin" },
  { city: "San Jose", state: "CA", slug: "san-jose-ca", locatorPath: "california/san-jose" },
  { city: "Jacksonville", state: "FL", slug: "jacksonville-fl", locatorPath: "florida/jacksonville" },
  { city: "Columbus", state: "OH", slug: "columbus-oh", locatorPath: "ohio/columbus" },
  { city: "Charlotte", state: "NC", slug: "charlotte-nc", locatorPath: "north-carolina/charlotte" },
  { city: "Indianapolis", state: "IN", slug: "indianapolis-in", locatorPath: "indiana/indianapolis" },
  { city: "Seattle", state: "WA", slug: "seattle-wa", locatorPath: "washington/seattle" },
  { city: "Denver", state: "CO", slug: "denver-co", locatorPath: "colorado/denver" },
  { city: "Miami", state: "FL", slug: "miami-fl", locatorPath: "florida/miami" },
  { city: "Atlanta", state: "GA", slug: "atlanta-ga", locatorPath: "georgia/atlanta" },
  { city: "Boston", state: "MA", slug: "boston-ma", locatorPath: "massachusetts/boston" },
];

export const locations: Location[] = RAW.map((r) => ({
  city: r.city,
  state: r.state,
  slug: r.slug,
  title: `Domino's ${r.city}, ${r.state} — Menu, Prices & Ordering Guide`,
  description: `Unofficial guide to ordering Domino's in ${r.city}, ${r.state}: example menu prices, local sales tax, delivery and carryout tips. Find exact stores and hours on the official Domino's locator.`,
  locatorUrl: `https://pizza.dominos.com/${r.locatorPath}`,
}));

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}

export function getStates(): string[] {
  return Array.from(new Set(locations.map((l) => l.state))).sort();
}

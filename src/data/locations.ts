import type { Location, LocationHours } from "./types";

// --- Weekly hour presets ---
// Standard: 10:00–00:00 Sun–Thu, 10:00–01:00 Fri–Sat
// Extended: 10:00–01:00 every day (late-night / metro stores)
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const std: LocationHours[] = DAYS.map((day) => ({
  day,
  open: "10:00 AM",
  close: day === "Friday" || day === "Saturday" ? "1:00 AM" : "12:00 AM",
}));

export const ext: LocationHours[] = DAYS.map((day) => ({
  day,
  open: "10:00 AM",
  close: "1:00 AM",
}));

interface RawLocation {
  city: string;
  state: string;
  slug: string;
  address: string;
  hoursType: "std" | "ext";
}

const RAW: RawLocation[] = [
  { city: "New York", state: "NY", slug: "new-york-ny", address: "Multiple locations across the five boroughs", hoursType: "ext" },
  { city: "Los Angeles", state: "CA", slug: "los-angeles-ca", address: "Multiple locations across LA County", hoursType: "ext" },
  { city: "Chicago", state: "IL", slug: "chicago-il", address: "Multiple locations across Chicagoland", hoursType: "ext" },
  { city: "Houston", state: "TX", slug: "houston-tx", address: "Multiple locations across Greater Houston", hoursType: "std" },
  { city: "Phoenix", state: "AZ", slug: "phoenix-az", address: "Multiple locations across the Valley", hoursType: "std" },
  { city: "Philadelphia", state: "PA", slug: "philadelphia-pa", address: "Multiple locations across Philadelphia", hoursType: "std" },
  { city: "San Antonio", state: "TX", slug: "san-antonio-tx", address: "Multiple locations across San Antonio", hoursType: "std" },
  { city: "San Diego", state: "CA", slug: "san-diego-ca", address: "Multiple locations across San Diego County", hoursType: "std" },
  { city: "Dallas", state: "TX", slug: "dallas-tx", address: "Multiple locations across DFW", hoursType: "std" },
  { city: "Austin", state: "TX", slug: "austin-tx", address: "Multiple locations across Austin", hoursType: "std" },
  { city: "San Jose", state: "CA", slug: "san-jose-ca", address: "Multiple locations across Silicon Valley", hoursType: "std" },
  { city: "Jacksonville", state: "FL", slug: "jacksonville-fl", address: "Multiple locations across Jacksonville", hoursType: "std" },
  { city: "Columbus", state: "OH", slug: "columbus-oh", address: "Multiple locations across Columbus", hoursType: "std" },
  { city: "Charlotte", state: "NC", slug: "charlotte-nc", address: "Multiple locations across Charlotte", hoursType: "std" },
  { city: "Indianapolis", state: "IN", slug: "indianapolis-in", address: "Multiple locations across Indianapolis", hoursType: "std" },
  { city: "Seattle", state: "WA", slug: "seattle-wa", address: "Multiple locations across Seattle", hoursType: "std" },
  { city: "Denver", state: "CO", slug: "denver-co", address: "Multiple locations across Denver metro", hoursType: "std" },
  { city: "Miami", state: "FL", slug: "miami-fl", address: "Multiple locations across Miami-Dade", hoursType: "ext" },
  { city: "Atlanta", state: "GA", slug: "atlanta-ga", address: "Multiple locations across metro Atlanta", hoursType: "std" },
  { city: "Boston", state: "MA", slug: "boston-ma", address: "Multiple locations across Greater Boston", hoursType: "std" },
];

export const locations: Location[] = RAW.map((r) => ({
  city: r.city,
  state: r.state,
  slug: r.slug,
  title: `Domino's ${r.city}, ${r.state} — Menu, Prices, Hours & Delivery`,
  description: `Unofficial guide to Domino's in ${r.city}, ${r.state}: example menu prices, store hours, delivery info and ordering tips. Verify details on the official Domino's locator.`,
  address: r.address,
  hours: r.hoursType === "ext" ? ext : std,
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

// Shared data types for the Domino's Menu Guide content layer.

export interface PricingRow {
  item: string;
  size?: string;
  price: string; // display string, always example ("$8.99")
  calories?: string;
  notes?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string; // author id — see AuthorBio
  datePublished: string; // ISO
  dateModified: string; // ISO (kept fresh via ISR/AutoDateUpdater)
  readTime: string;
  image: string; // /public webp path
  imageAlt: string;
  keywords: string[];
  featured?: boolean;
  rootLevel?: boolean; // renders at /slug instead of /posts/slug
  pricing?: PricingRow[];
  faqs: FAQ[];
  content: string; // .blog-content HTML
}

export interface Allergen {
  name: string;
  present: boolean;
  note?: string;
}

export interface MenuSize {
  size: string;
  price: string;
  calories?: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  fullContent: string; // .blog-content HTML
  price: string;
  currency: string;
  calories: string;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  ingredients: string[];
  allergens: Allergen[];
  sizes: MenuSize[];
  faqs: FAQ[];
  featured?: boolean;
}

export interface Coupon {
  id: string;
  discount: string;
  sub: string;
  title: string;
  desc: string;
  code: string;
  noCodeLabel?: string;
  expiry: string;
  tags: string[];
  featured?: boolean;
}

export interface LocationHours {
  day: string;
  open: string;
  close: string;
}

export interface Location {
  city: string;
  state: string;
  slug: string;
  title: string;
  description: string;
  address: string;
  phone: string;
  hours: LocationHours[];
}

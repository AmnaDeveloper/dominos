export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** What this person actually does on the site — not claimed credentials. */
  specialties: string[];
  avatarInitials: string;
}

/**
 * One author, because one person runs this site.
 *
 * This file previously held four invented editors — Priya Nair, Marcus Bell,
 * Dana Lopez and an "Editorial Team" — each with a role, a specialism and a
 * biography describing experience that nobody had. None of them existed. The
 * /team page even carried a FAQ answering "Are authors real people?" with
 * "Yes — our editors write under their own bylines", which was not true.
 *
 * Invented bylines are a straightforward misrepresentation to readers, and a
 * site that fabricates its own staff has no standing to ask anyone to trust its
 * prices. Replaced with the real person responsible for the site. Nothing here
 * claims industry experience, insider access or store visits, because there
 * aren't any.
 */
export const authors: Record<string, Author> = {
  "amna-sadam": {
    id: "amna-sadam",
    name: "Amna Sadam",
    role: "Editor",
    bio:
      "I run this guide. I track Domino's publicly available menu, prices and deals, cross-check what I publish against official sources, and keep the pages updated. This is an independent, unofficial guide with no connection to Domino's — I don't run a store and I have no insider information. Prices here are examples to verify at checkout, and where I can't verify something I don't publish it, which is why you won't find store addresses or opening hours on this site.",
    specialties: ["Menu research", "Price tracking", "Editorial standards"],
    avatarInitials: "AS",
  },
};

export const PRIMARY_AUTHOR_ID = "amna-sadam";

export function getAuthor(id: string): Author {
  return authors[id] ?? authors[PRIMARY_AUTHOR_ID];
}

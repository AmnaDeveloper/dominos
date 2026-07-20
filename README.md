# Domino's Menu & Deals Guide (Unofficial)

An independent, unofficial informational website about the Domino's menu, prices, coupons, deals, rewards and ordering — built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

> **Not affiliated with Domino's Pizza LLC.** All prices are examples for guidance — verify at official checkout. No Domino's logos or copyrighted assets are used.

## Getting started

```bash
npm install
node scripts/generate-assets.mjs   # creates hero-background.webp, logo.png, apple-touch-icon.webp, favicon.ico
npm run dev                         # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## Set your domain

The domain lives in **one place**: `src/lib/site-config.ts` → `SITE_URL` / `SITE_DOMAIN`. Change it there, then update the two static files that can't import config:

- `public/robots.txt` (the `Sitemap:` line)
- `public/ads.txt` (leave the `pub-XXXX…` placeholder until you have your AdSense publisher ID)

Third-party IDs (GA4, AdSense, Clarity, Google verification) are also in `site-config.ts` as placeholders — swap them when you have real values.

## Placeholder images

Because this project was scaffolded without an image pipeline, SVG placeholders live in `/public` (`hero-background.svg`, `logo.svg`) and `src/app/icon.svg` (auto favicon). Running `node scripts/generate-assets.mjs` (uses `sharp`) produces the exact binary assets referenced by the app: `hero-background.webp`, `logo.png`, `apple-touch-icon.webp`, `favicon.ico`. Replace the SVGs with your own artwork and re-run to update. Post/menu hero images referenced in content (`/public/posts/*.webp`, `/public/menu/*.webp`) still need to be added — they 404 harmlessly until then.

## Project structure

```
src/
  app/
    layout.tsx            Root layout + global SEO/JSON-LD (no header/footer)
    page.tsx              Home (renders its own Header/Footer)
    sitemap.ts            Dynamic sitemap from data
    (site)/               Route group: Header + main + Footer
      menus-prices/       Index + [slug] menu-item pages
      posts/              Index + [slug] guide pages
      locations/[slug]/   City pages (rich or generic)
      coupons, drinks, dominos-rewards, store-locator, hours,
      dominos-delivery-near-me (root-level flagship),
      about, contact, team, accessibility, terms, privacy-policy, cookies, seo-tools
    api/                  contact, comments, revalidate, auto-index, index-url, update-coupons
  components/             Header, Footer, HeroSection, MenuGuideSection, Coupons,
                         Hours, ContactForm, PageComments, FAQ, AuthorBio, etc.
  data/                   posts.json, menu-items.json, coupons, locations, authors, FAQs
  lib/                    site-config, seo config + schema builders, indexing, date utils
```

## Content status (phased build)

This is the **core-first** build: full scaffold, all routes, components, APIs, SEO, and **8 full posts** (including the two interactive specials — savings calculator and family picks — and the root-level `dominos-delivery-near-me` flagship) plus **6 menu items** and **20 city guides**.

The original spec plans **29 posts** total. The remaining ~21 guides are not yet written. A handful of in-content cross-links already point to their future URLs and will 404 until added:

`dominos-crust-types-explained`, `dominos-chicken-and-wings-menu`, `dominos-sandwiches-menu`, `dominos-emergency-pizza`, `dominos-carryout-deals-guide`, `dominos-gluten-free-crust-guide`, `dominos-delivery-fee-explained`, `how-to-track-your-dominos-order`, `dominos-drinks-menu-and-prices`, plus others from the 28-post list.

To add a post, append an entry to `src/data/posts.json` (matching the `Post` type in `src/data/types.ts`) — it will automatically get a page, sitemap entry, and internal links. Same for menu items in `menu-items.json` and cities in `src/data/locations.ts`.

## Notes

- If `next build` ever fails on CSS optimization, remove `experimental.optimizeCss` from `next.config.ts` (it relies on `critters`).
- Comments are stored in `os.tmpdir()` at runtime (ephemeral). Swap `src/app/api/comments/route.ts` for a database for persistence.
- `/seo-tools` is intentionally `noindex` + `notFound()`.

/**
 * Generates the binary image assets referenced by the app from the SVG
 * placeholders in /public. Run after `npm install` (sharp is a dependency):
 *
 *   node scripts/generate-assets.mjs
 *
 * Produces:
 *   public/hero-background.webp   (LCP preload)
 *   public/logo.png               (Organization JSON-LD)
 *   public/apple-touch-icon.webp  (apple icon)
 *   public/favicon.ico            (browser tab icon)
 *
 * Replace the SVG placeholders with your own artwork and re-run to update.
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const pub = path.join(process.cwd(), "public");

async function run() {
  const heroSvg = await readFile(path.join(pub, "hero-background.svg"));
  const logoSvg = await readFile(path.join(pub, "logo.svg"));

  await sharp(heroSvg).resize(1600, 900).webp({ quality: 80 }).toFile(path.join(pub, "hero-background.webp"));
  console.log("✓ hero-background.webp");

  await sharp(logoSvg).resize(512, 512).png().toFile(path.join(pub, "logo.png"));
  console.log("✓ logo.png");

  await sharp(logoSvg).resize(180, 180).webp({ quality: 90 }).toFile(path.join(pub, "apple-touch-icon.webp"));
  console.log("✓ apple-touch-icon.webp");

  const favPng = await sharp(logoSvg).resize(48, 48).png().toBuffer();
  // Minimal ICO wrapper around a 48x48 PNG.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(48, 0);
  entry.writeUInt8(48, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(favPng.length, 8);
  entry.writeUInt32LE(6 + 16, 12);
  await writeFile(path.join(pub, "favicon.ico"), Buffer.concat([header, entry, favPng]));
  console.log("✓ favicon.ico");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

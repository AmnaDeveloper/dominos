import { NextResponse } from "next/server";
import { submitBatchUrls } from "@/lib/indexing/googleIndex";
import { SITE_URL } from "@/lib/site-config";

const PRIORITY_PAGES = [
  "/",
  "/menus-prices",
  "/coupons",
  "/dominos-rewards",
  "/dominos-delivery-near-me",
  "/posts",
].map((p) => `${SITE_URL}${p}`);

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const results = await submitBatchUrls(PRIORITY_PAGES);
  return NextResponse.json({ ok: true, submitted: results.length, results });
}

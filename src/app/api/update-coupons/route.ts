import { NextResponse } from "next/server";
import { notifyCouponUpdates } from "@/lib/googleIndexing";

export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.ADMIN_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Mocked update: in production, persist new coupon data here.
  const notify = await notifyCouponUpdates();

  return NextResponse.json({ ok: true, updated: true, notify });
}

export async function GET() {
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

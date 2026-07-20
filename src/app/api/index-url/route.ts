import { NextResponse } from "next/server";
import { submitUrlWithDetails } from "@/lib/indexing/googleIndex";

export async function POST(request: Request) {
  try {
    const { url, secret } = await request.json();
    if (secret !== process.env.INDEXING_API_SECRET) {
      return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
    }
    if (!url) {
      return NextResponse.json({ error: "Missing url." }, { status: 400 });
    }
    const result = await submitUrlWithDetails(url);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }
  if (!path) {
    return NextResponse.json({ error: "Missing path." }, { status: 400 });
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path, now: Date.now() });
}

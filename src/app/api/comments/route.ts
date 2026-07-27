import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ comments: [] });
}

export async function POST() {
  return NextResponse.json(
    { error: "Public comments are disabled. Please use the contact page for corrections." },
    { status: 410 }
  );
}

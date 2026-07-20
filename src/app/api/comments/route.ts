import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import seed from "@/data/comments.json";

interface Comment {
  id: string;
  pagePath: string;
  name: string;
  comment: string;
  createdAt: string;
}

const STORE_DIR = path.join(os.tmpdir(), "dominos-comments");
const STORE_FILE = path.join(STORE_DIR, "comments.json");

async function readStore(): Promise<Comment[]> {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf-8");
    return JSON.parse(raw) as Comment[];
  } catch {
    return seed as Comment[];
  }
}

async function writeStore(comments: Comment[]) {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(STORE_FILE, JSON.stringify(comments, null, 2), "utf-8");
}

const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim().slice(0, 1000);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  let comments = await readStore();
  if (page) comments = comments.filter((c) => c.pagePath === page);
  comments = comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = sanitize(String(body.name ?? ""));
    const comment = sanitize(String(body.comment ?? ""));
    const pagePath = String(body.pagePath ?? "/");

    if (!name || comment.length < 3) {
      return NextResponse.json({ error: "Name and a comment (3+ chars) are required." }, { status: 400 });
    }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      pagePath,
      name,
      comment,
      createdAt: new Date().toISOString(),
    };

    const comments = await readStore();
    comments.unshift(newComment);
    await writeStore(comments);

    return NextResponse.json({ comment: newComment });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

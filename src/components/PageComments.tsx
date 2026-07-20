"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  pagePath: string;
  name: string;
  comment: string;
  createdAt: string;
}

export default function PageComments({ pagePath }: { pagePath: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/comments?page=${encodeURIComponent(pagePath)}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [pagePath]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || text.trim().length < 3) {
      setError("Please add your name and a comment of at least 3 characters.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagePath, name, comment: text }),
      });
      const data = await res.json();
      if (data.comment) setComments((c) => [data.comment, ...c]);
      setName("");
      setText("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="my-12">
      <h2 className="section-mini-heading flex items-center gap-2 mb-5">
        <MessageCircle style={{ color: "#C8102E" }} /> Comments
      </h2>

      <form onSubmit={submit} className="space-y-3 mb-8 rounded-xl border border-slate-200 p-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Share your tip or experience…"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="font-bold px-5 py-2 rounded-lg text-white disabled:opacity-60"
          style={{ backgroundColor: "#C8102E" }}
        >
          {submitting ? "Posting…" : "Post Comment"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-400">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-slate-400">Be the first to comment.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{c.name}</span>
                <span className="text-xs text-slate-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{c.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

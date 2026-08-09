"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

/**
 * Contact form.
 *
 * Previously this reported success unconditionally: it awaited fetch without
 * checking response.ok, then waited an artificial 1.5s "for UX consistency"
 * and showed "Message sent". A server error, a validation rejection or a
 * misconfigured mail provider all produced the same green tick, so a reader
 * could be told their correction had been sent when nothing had been
 * delivered. Now the server's actual answer decides what the user is told.
 */
export default function ContactForm({ fallbackEmail }: { fallbackEmail?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, a valid email and a message.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(
          data?.error ??
            "That didn't go through. Please try again, or email instead if the problem continues."
        );
        setStatus("error");
        return;
      }
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 flex items-start gap-3">
        <CheckCircle className="text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-green-800 !bg-transparent">Message received</p>
          <p className="text-sm text-green-700 mt-1">
            Thanks — it&apos;s come through. If you sent a correction, it gets checked against
            the official source before anything on the site changes.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-bold underline mt-3 text-green-800"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={update("name")}
            required
            autoComplete="name"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={update("email")}
            required
            autoComplete="email"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="subject">
          Subject <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={update("subject")}
          placeholder="e.g. Wrong price on the sides guide"
          className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          value={form.message}
          onChange={update("message")}
          required
          placeholder="If you're reporting something that looks wrong, the page name and what you expected to see is the most useful thing you can include."
          className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {status === "error" && error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3"
        >
          <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">
            {error}
            {fallbackEmail && (
              <>
                {" "}
                You can also email{" "}
                <a href={`mailto:${fallbackEmail}`} className="font-semibold underline">
                  {fallbackEmail}
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white disabled:opacity-60"
        style={{ backgroundColor: "#C8102E" }}
      >
        <Send size={16} aria-hidden="true" />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

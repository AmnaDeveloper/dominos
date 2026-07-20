"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Mock latency for UX consistency
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 flex items-center gap-3">
        <CheckCircle className="text-green-600" />
        <div>
          <p className="font-bold text-green-800 !bg-transparent">Message sent</p>
          <p className="text-sm text-green-700">Thanks for reaching out — we&apos;ll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold" htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={update("name")} required
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold" htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={update("email")} required
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="subject">Subject</label>
        <input id="subject" value={form.subject} onChange={update("subject")}
          className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="message">Message</label>
        <textarea id="message" rows={5} value={form.message} onChange={update("message")} required
          className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Please fill in your name, a valid email, and a message.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white disabled:opacity-60"
        style={{ backgroundColor: "#C8102E" }}
      >
        <Send size={16} /> {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

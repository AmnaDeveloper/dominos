import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    // If SendGrid is configured, send a real email. Otherwise, log (dev/stub).
    if (apiKey && to && apiKey !== "replace-me-sendgrid-key") {
      try {
        const sgMail = (await import("@sendgrid/mail")).default;
        sgMail.setApiKey(apiKey);
        await sgMail.send({
          to,
          from: to, // must be a verified SendGrid sender
          replyTo: email,
          subject: subject ? `[Contact] ${subject}` : `[Contact] New message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject ?? "(none)"}\n\n${message}`,
        });
        return NextResponse.json({ ok: true, message: "Message sent." });
      } catch (err) {
        console.error("[contact] SendGrid error:", (err as Error).message);
        return NextResponse.json(
          { error: "Could not send your message right now. Please try again later." },
          { status: 502 }
        );
      }
    }

    // Fallback: no email provider configured yet.
    console.log("[contact] New message (no email provider configured):", {
      name,
      email,
      subject,
      message,
    });
    return NextResponse.json({ ok: true, message: "Message received." });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

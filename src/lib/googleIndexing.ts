/**
 * Google Indexing helpers (googleapis JWT). These are safe no-ops when
 * credentials are not configured, so the app builds and runs without them.
 */
import { google } from "googleapis";

function getClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) return null;

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
}

export async function notifyGoogle(url: string): Promise<{ ok: boolean; message: string }> {
  const auth = getClient();
  if (!auth) return { ok: false, message: "Google indexing credentials not configured (skipped)." };

  try {
    const indexing = google.indexing({ version: "v3", auth });
    await indexing.urlNotifications.publish({
      requestBody: { url, type: "URL_UPDATED" },
    });
    return { ok: true, message: `Notified Google of ${url}` };
  } catch (err) {
    return { ok: false, message: `Indexing failed: ${(err as Error).message}` };
  }
}

export async function notifyCouponUpdates(): Promise<{ ok: boolean; message: string }> {
  return notifyGoogle(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/coupons`);
}

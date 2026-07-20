/**
 * Google Indexing API (google-auth-library). Safe no-ops when credentials
 * are absent. Used by the daily /api/auto-index cron.
 */
import { GoogleAuth } from "google-auth-library";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const projectId = process.env.GOOGLE_PROJECT_ID;
  if (!email || !key || !projectId) return null;

  return new GoogleAuth({
    credentials: { client_email: email, private_key: key, project_id: projectId },
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
}

export async function submitUrlToGoogle(url: string) {
  const auth = getAuth();
  if (!auth) return { ok: false, url, message: "Indexing credentials not configured (skipped)." };

  try {
    const client = await auth.getClient();
    const res = await client.request({
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      data: { url, type: "URL_UPDATED" },
    });
    return { ok: true, url, status: res.status };
  } catch (err) {
    return { ok: false, url, message: (err as Error).message };
  }
}

export async function submitUrlWithDetails(url: string, type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED") {
  const auth = getAuth();
  if (!auth) return { ok: false, url, message: "Indexing credentials not configured (skipped)." };
  const client = await auth.getClient();
  const res = await client.request({
    url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
    method: "POST",
    data: { url, type },
  });
  return { ok: true, url, type, status: res.status };
}

export async function submitBatchUrls(urls: string[]) {
  const results = [];
  for (const url of urls) {
    results.push(await submitUrlToGoogle(url));
    // 1s delay to respect rate limits
    await new Promise((r) => setTimeout(r, 1000));
  }
  return results;
}

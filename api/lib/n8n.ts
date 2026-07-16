import { env } from "./env";

export interface QuoteWebhookPayload {
  event: "quote.created";
  timestamp: string;
  data: {
    id: number;
    serviceType: string;
    city: string;
    details: string | null;
    name: string;
    email: string | null;
    phone: string;
    status: string;
    createdAt: string;
  };
}

/**
 * Sends a webhook to n8n when a new quote is created.
 * Fires and forgets — errors are logged but never bubble up to the caller.
 */
export async function sendQuoteWebhook(payload: QuoteWebhookPayload): Promise<void> {
  const url = env.n8nWebhookUrl;
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.warn(`[n8n] Webhook returned ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("[n8n] Failed to send webhook:", err);
  }
}

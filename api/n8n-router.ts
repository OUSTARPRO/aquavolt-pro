import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";

export const n8nRouter = createRouter({
  /** Returns which n8n webhooks are currently configured. */
  status: adminQuery.query(() => {
    return {
      chatWebhookConfigured: !!process.env.N8N_CHAT_WEBHOOK_URL,
      quoteWebhookConfigured: !!process.env.N8N_QUOTE_WEBHOOK_URL,
    };
  }),

  /** Sends a test ping to the chat webhook and reports success/failure. */
  testChatWebhook: adminQuery.mutation(async () => {
    const url = process.env.N8N_CHAT_WEBHOOK_URL;
    if (!url) {
      return { success: false, error: "N8N_CHAT_WEBHOOK_URL not configured" };
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Test de connexion AquaVolt Pro" }],
          language: "fr",
          test: true,
        }),
      });
      if (!res.ok) {
        return { success: false, error: `HTTP ${res.status}` };
      }
      const data = (await res.json()) as Record<string, unknown>;
      return { success: true, response: data };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }),

  /** Sends a test ping to the quote webhook and reports success/failure. */
  testQuoteWebhook: adminQuery.mutation(async () => {
    const url = process.env.N8N_QUOTE_WEBHOOK_URL;
    if (!url) {
      return { success: false, error: "N8N_QUOTE_WEBHOOK_URL not configured" };
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_quote",
          test: true,
          timestamp: new Date().toISOString(),
          data: {
            serviceType: "electricity",
            city: "Khouribga",
            details: "Test de connexion depuis le panel admin",
            name: "Test AquaVolt",
            email: "test@aquavoltpro.ma",
            phone: "0600000000",
          },
        }),
      });
      if (!res.ok) {
        return { success: false, error: `HTTP ${res.status}` };
      }
      const data = (await res.json()) as Record<string, unknown>;
      return { success: true, response: data };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }),

  /** Validates that a given webhook URL is reachable (without sending real data). */
  validateWebhookUrl: adminQuery
    .input(z.object({ url: z.string().url(), type: z.enum(["chat", "quote"]) }))
    .mutation(async ({ input }) => {
      try {
        const testPayload =
          input.type === "chat"
            ? {
                messages: [{ role: "user", content: "ping" }],
                language: "fr",
                test: true,
              }
            : {
                event: "new_quote",
                test: true,
                timestamp: new Date().toISOString(),
                data: { serviceType: "other", city: "Test", name: "Ping", phone: "0600000000" },
              };

        const res = await fetch(input.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload),
        });

        return { reachable: res.ok, status: res.status };
      } catch (err) {
        return {
          reachable: false,
          status: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
});

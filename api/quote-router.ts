import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { quotes } from "@db/schema";

/**
 * Notifies the n8n workflow of a new quote submission.
 * The workflow can then send WhatsApp/email alerts, update a CRM, etc.
 * Failures are logged but never surface to the client.
 */
async function notifyN8nNewQuote(quoteData: {
  serviceType: string;
  city: string;
  details: string | null;
  name: string;
  email: string | null;
  phone: string;
}): Promise<void> {
  const webhookUrl = process.env.N8N_QUOTE_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_quote",
        timestamp: new Date().toISOString(),
        data: quoteData,
      }),
    });
    if (!response.ok) {
      console.error(`n8n quote webhook responded with status ${response.status}`);
    }
  } catch (error) {
    console.error("n8n quote webhook error:", error);
  }
}

export const quoteRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        serviceType: z.enum(["electricity", "plumbing", "pool", "maintenance", "other"]),
        city: z.string().min(1),
        details: z.string().optional(),
        name: z.string().min(1),
        email: z.string().email().optional(),
        phone: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(quotes).values({
        serviceType: input.serviceType,
        city: input.city,
        details: input.details || null,
        name: input.name,
        email: input.email || null,
        phone: input.phone,
      });

      // Trigger n8n workflow asynchronously — do not await to avoid delaying the response
      void notifyN8nNewQuote({
        serviceType: input.serviceType,
        city: input.city,
        details: input.details || null,
        name: input.name,
        email: input.email || null,
        phone: input.phone,
      });

      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(quotes)
      .orderBy(desc(quotes.createdAt));
    return items;
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "quoted", "accepted", "rejected"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(quotes)
        .set({ status: input.status })
        .where(eq(quotes.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(quotes).where(eq(quotes.id, input.id));
      return { success: true };
    }),
});

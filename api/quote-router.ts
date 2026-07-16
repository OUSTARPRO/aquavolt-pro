import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { quotes } from "@db/schema";
import { sendQuoteWebhook } from "./lib/n8n";

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
      const result = await db.insert(quotes).values({
        serviceType: input.serviceType,
        city: input.city,
        details: input.details || null,
        name: input.name,
        email: input.email || null,
        phone: input.phone,
      });

      void sendQuoteWebhook({
        event: "quote.created",
        timestamp: new Date().toISOString(),
        data: {
          id: Number(result[0].insertId),
          serviceType: input.serviceType,
          city: input.city,
          details: input.details || null,
          name: input.name,
          email: input.email || null,
          phone: input.phone,
          status: "new",
          createdAt: new Date().toISOString(),
        },
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

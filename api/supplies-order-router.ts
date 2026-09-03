import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { suppliesOrders } from "@db/schema";

const suppliesItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
  unit: z.string().optional(),
  reference: z.string().optional(),
});

export const suppliesOrderRouter = createRouter({
  list: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(suppliesOrders)
      .orderBy(desc(suppliesOrders.createdAt));
  }),

  create: adminQuery
    .input(
      z.object({
        clientName: z.string().min(1),
        clientPhone: z.string().min(1),
        clientCity: z.string().optional(),
        quoteId: z.number().optional(),
        category: z.enum(["electricity", "plumbing", "pool", "other"]),
        items: z.array(suppliesItemSchema).min(1),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(suppliesOrders).values({
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientCity: input.clientCity || null,
        quoteId: input.quoteId || null,
        category: input.category,
        items: input.items,
        notes: input.notes || null,
      });
      return { success: true };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "ordered", "delivered", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(suppliesOrders)
        .set({ status: input.status })
        .where(eq(suppliesOrders.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(suppliesOrders).where(eq(suppliesOrders.id, input.id));
      return { success: true };
    }),
});

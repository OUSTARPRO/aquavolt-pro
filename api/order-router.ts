import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { orders } from "@db/schema";

const orderItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
});

export const orderRouter = createRouter({
  create: adminQuery
    .input(
      z.object({
        clientName: z.string().min(1),
        clientPhone: z.string().min(1),
        clientCity: z.string().min(1),
        items: z.array(orderItemSchema).min(1),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(orders).values({
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientCity: input.clientCity,
        items: input.items,
        notes: input.notes || null,
      });
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(orders).orderBy(desc(orders.createdAt));
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
        .update(orders)
        .set({ status: input.status })
        .where(eq(orders.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(orders).where(eq(orders.id, input.id));
      return { success: true };
    }),
});

import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { supplements, supplementOrders } from "@db/schema";

const orderItemSchema = z.object({
  supplementId: z.number(),
  supplementName: z.string(),
  quantity: z.number().min(1),
  unit: z.string(),
});

export const supplementRouter = createRouter({
  // --- Catalog ---
  listCatalog: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(supplements).orderBy(desc(supplements.createdAt));
  }),

  createCatalog: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        unit: z.string().min(1),
        category: z.enum(["pool", "electricity", "plumbing", "other"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(supplements).values({
        name: input.name,
        description: input.description || null,
        unit: input.unit,
        category: input.category,
      });
      return { success: true };
    }),

  deleteCatalog: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(supplements).where(eq(supplements.id, input.id));
      return { success: true };
    }),

  // --- Orders ---
  listOrders: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(supplementOrders).orderBy(desc(supplementOrders.createdAt));
  }),

  createOrder: adminQuery
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
      await db.insert(supplementOrders).values({
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        clientCity: input.clientCity,
        items: input.items,
        notes: input.notes || null,
      });
      return { success: true };
    }),

  updateOrderStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "ordered", "delivered", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(supplementOrders)
        .set({ status: input.status })
        .where(eq(supplementOrders.id, input.id));
      return { success: true };
    }),

  deleteOrder: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(supplementOrders).where(eq(supplementOrders.id, input.id));
      return { success: true };
    }),
});

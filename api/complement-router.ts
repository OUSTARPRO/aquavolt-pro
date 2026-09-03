import { eq, desc, inArray } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import {
  complements,
  complementOrders,
  type ComplementOrderItem,
} from "@db/schema";

export const complementRouter = createRouter({
  // --- Catalogue des compléments ---
  list: adminQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(complements)
      .orderBy(desc(complements.createdAt));
    return items;
  }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().optional(),
        category: z.enum(["electricity", "plumbing", "pool", "other"]),
        price: z.number().nonnegative(),
        unit: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(complements).values({
        name: input.name,
        nameAr: input.nameAr || null,
        category: input.category,
        price: input.price,
        unit: input.unit,
      });
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(complements).where(eq(complements.id, input.id));
      return { success: true };
    }),

  // --- Commandes de compléments pour les clients ---
  listOrders: adminQuery.query(async () => {
    const db = getDb();
    const orders = await db
      .select()
      .from(complementOrders)
      .orderBy(desc(complementOrders.createdAt));
    return orders;
  }),

  createOrder: adminQuery
    .input(
      z.object({
        clientName: z.string().min(1),
        clientPhone: z.string().min(1),
        city: z.string().optional(),
        notes: z.string().optional(),
        items: z
          .array(
            z.object({
              complementId: z.number(),
              quantity: z.number().int().positive(),
            })
          )
          .min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const ids = input.items.map((i) => i.complementId);
      const products = await db
        .select()
        .from(complements)
        .where(inArray(complements.id, ids));

      // Les prix sont relus depuis le catalogue côté serveur
      const items: ComplementOrderItem[] = input.items.map((i) => {
        const product = products.find((p) => p.id === i.complementId);
        if (!product) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Complément introuvable dans le catalogue",
          });
        }
        return {
          complementId: product.id,
          name: product.name,
          unit: product.unit,
          quantity: i.quantity,
          unitPrice: product.price,
        };
      });

      const total = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      await db.insert(complementOrders).values({
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        city: input.city || null,
        notes: input.notes || null,
        items,
        total: Math.round(total * 100) / 100,
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
        .update(complementOrders)
        .set({ status: input.status })
        .where(eq(complementOrders.id, input.id));
      return { success: true };
    }),

  deleteOrder: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .delete(complementOrders)
        .where(eq(complementOrders.id, input.id));
      return { success: true };
    }),
});

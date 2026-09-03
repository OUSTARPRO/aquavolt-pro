import { eq, desc, inArray } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products, productOrders, type OrderItem } from "@db/schema";

export const orderRouter = createRouter({
  // --- Catalogue de compléments (produits) ---
  listProducts: adminQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    return items;
  }),

  createProduct: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().optional(),
        category: z.enum(["electricity", "plumbing", "pool", "other"]),
        price: z.number().int().min(0),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(products).values({
        name: input.name,
        nameAr: input.nameAr || null,
        category: input.category,
        price: input.price,
        imageUrl: input.imageUrl || null,
      });
      return { success: true };
    }),

  deleteProduct: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(products).where(eq(products.id, input.id));
      return { success: true };
    }),

  // --- Commandes de compléments pour les clients ---
  list: adminQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(productOrders)
      .orderBy(desc(productOrders.createdAt));
    return items;
  }),

  create: adminQuery
    .input(
      z.object({
        clientName: z.string().min(1),
        clientPhone: z.string().min(1),
        city: z.string().optional(),
        notes: z.string().optional(),
        items: z
          .array(
            z.object({
              productId: z.number(),
              quantity: z.number().int().min(1),
            })
          )
          .min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const productIds = input.items.map((i) => i.productId);
      const catalog = await db
        .select()
        .from(products)
        .where(inArray(products.id, productIds));

      const orderItems: OrderItem[] = input.items.map((item) => {
        const product = catalog.find((p) => p.id === item.productId);
        if (!product) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Produit introuvable: ${item.productId}`,
          });
        }
        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      });

      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await db.insert(productOrders).values({
        clientName: input.clientName,
        clientPhone: input.clientPhone,
        city: input.city || null,
        items: orderItems,
        total,
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
        .update(productOrders)
        .set({ status: input.status })
        .where(eq(productOrders.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(productOrders).where(eq(productOrders.id, input.id));
      return { success: true };
    }),
});

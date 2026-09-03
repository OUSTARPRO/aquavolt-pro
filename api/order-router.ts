import { desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { productOrders } from "@db/schema";
import { CATALOG, computeOrderLines } from "@contracts/catalog";
import { env } from "./lib/env";

const orderItemInput = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
});

export const orderRouter = createRouter({
  catalog: publicQuery.query(() => CATALOG),

  create: publicQuery
    .input(
      z.object({
        clientName: z.string().min(1).max(255),
        clientPhone: z.string().min(6).max(50),
        clientEmail: z.string().email().optional().or(z.literal("")),
        city: z.string().min(1).max(255),
        address: z.string().max(500).optional(),
        orderedBy: z.string().max(255).optional(),
        notes: z.string().max(2000).optional(),
        items: z.array(orderItemInput).min(1).max(40),
      }),
    )
    .mutation(async ({ input }) => {
      let priced;
      try {
        priced = computeOrderLines(input.items);
      } catch (error) {
        const message = error instanceof Error ? error.message : "INVALID_ORDER";
        throw new TRPCError({
          code: "BAD_REQUEST",
          message,
        });
      }

      if (env.databaseUrl) {
        const db = getDb();
        await db.insert(productOrders).values({
          clientName: input.clientName.trim(),
          clientPhone: input.clientPhone.trim(),
          clientEmail: input.clientEmail?.trim() || null,
          city: input.city.trim(),
          address: input.address?.trim() || null,
          orderedBy: input.orderedBy?.trim() || null,
          notes: input.notes?.trim() || null,
          items: priced.lines,
          totalMad: priced.totalMad,
        });
      }

      return {
        success: true,
        totalMad: priced.totalMad,
        lines: priced.lines,
      };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(productOrders).orderBy(desc(productOrders.createdAt));
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "confirmed", "preparing", "delivered", "cancelled"]),
      }),
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

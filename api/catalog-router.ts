import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { websitePackages } from "@db/schema";

const packageInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["vitrine", "ecommerce", "portfolio", "blog", "corporate", "custom"]),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional().nullable(),
  options: z.array(z.string()),
  badge: z.string().optional().nullable(),
  badgeColor: z.string().optional().nullable(),
  promoPercent: z.number().int().min(0).max(100).optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const catalogRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(websitePackages)
      .where(eq(websitePackages.isActive, true))
      .orderBy(asc(websitePackages.sortOrder), asc(websitePackages.id));
  }),

  listAll: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(websitePackages)
      .orderBy(asc(websitePackages.sortOrder), asc(websitePackages.id));
  }),

  create: adminQuery
    .input(packageInput)
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(websitePackages).values({
        name: input.name,
        description: input.description,
        category: input.category,
        price: input.price,
        oldPrice: input.oldPrice ?? null,
        options: input.options,
        badge: input.badge ?? null,
        badgeColor: input.badgeColor ?? "emerald",
        promoPercent: input.promoPercent ?? null,
        isActive: input.isActive,
        sortOrder: input.sortOrder,
      });
      return { success: true };
    }),

  update: adminQuery
    .input(packageInput.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db
        .update(websitePackages)
        .set({
          ...data,
          oldPrice: data.oldPrice ?? null,
          badge: data.badge ?? null,
          badgeColor: data.badgeColor ?? "emerald",
          promoPercent: data.promoPercent ?? null,
        })
        .where(eq(websitePackages.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(websitePackages).where(eq(websitePackages.id, input.id));
      return { success: true };
    }),

  toggleActive: adminQuery
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(websitePackages)
        .set({ isActive: input.isActive })
        .where(eq(websitePackages.id, input.id));
      return { success: true };
    }),
});

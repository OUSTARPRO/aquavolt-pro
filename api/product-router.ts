import { eq, desc, asc, and } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products } from "@db/schema";

const productInput = z.object({
  name: z.string().min(1),
  nameAr: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  descriptionAr: z.string().optional().nullable(),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional().nullable(),
  promoPercent: z.number().int().min(0).max(100).optional().nullable(),
  category: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  stock: z.number().int().min(0).default(0),
  sku: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const productRouter = createRouter({
  list: publicQuery
    .input(z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      featured: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [eq(products.isActive, true)];
      if (input?.category && input.category !== "all") {
        conditions.push(eq(products.category, input.category));
      }
      if (input?.featured) {
        conditions.push(eq(products.isFeatured, true));
      }
      return db
        .select()
        .from(products)
        .where(and(...conditions))
        .orderBy(asc(products.sortOrder), desc(products.createdAt));
    }),

  listAll: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(products).orderBy(asc(products.sortOrder), desc(products.createdAt));
  }),

  categories: publicQuery.query(async () => {
    const db = getDb();
    const rows = await db
      .selectDistinct({ category: products.category })
      .from(products)
      .where(eq(products.isActive, true));
    return rows.map((r) => r.category).filter(Boolean);
  }),

  create: adminQuery
    .input(productInput)
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(products).values({
        name: input.name,
        nameAr: input.nameAr ?? null,
        description: input.description ?? null,
        descriptionAr: input.descriptionAr ?? null,
        price: input.price,
        oldPrice: input.oldPrice ?? null,
        promoPercent: input.promoPercent ?? null,
        category: input.category,
        imageUrl: input.imageUrl ?? null,
        images: input.images,
        tags: input.tags,
        stock: input.stock,
        sku: input.sku ?? null,
        isActive: input.isActive,
        isFeatured: input.isFeatured,
        sortOrder: input.sortOrder,
      });
      return { success: true };
    }),

  update: adminQuery
    .input(productInput.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(products).set({
        ...data,
        nameAr: data.nameAr ?? null,
        description: data.description ?? null,
        descriptionAr: data.descriptionAr ?? null,
        oldPrice: data.oldPrice ?? null,
        promoPercent: data.promoPercent ?? null,
        imageUrl: data.imageUrl ?? null,
        sku: data.sku ?? null,
      }).where(eq(products.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(products).where(eq(products.id, input.id));
      return { success: true };
    }),

  toggleActive: adminQuery
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(products).set({ isActive: input.isActive }).where(eq(products.id, input.id));
      return { success: true };
    }),

  toggleFeatured: adminQuery
    .input(z.object({ id: z.number(), isFeatured: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(products).set({ isFeatured: input.isFeatured }).where(eq(products.id, input.id));
      return { success: true };
    }),

  updateStock: adminQuery
    .input(z.object({ id: z.number(), stock: z.number().int().min(0) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(products).set({ stock: input.stock }).where(eq(products.id, input.id));
      return { success: true };
    }),
});

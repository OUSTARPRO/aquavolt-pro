import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { websitePackages, type WebsitePackage } from "@db/schema";
import {
  DEFAULT_PACKAGES,
  PACKAGE_TYPES,
  type CatalogItem,
} from "@contracts/catalog";

function toCatalogItem(row: WebsitePackage): CatalogItem {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.nameAr ?? null,
    type: row.type,
    description: row.description ?? null,
    descriptionAr: row.descriptionAr ?? null,
    imageUrl: row.imageUrl ?? null,
    price: row.price,
    promoPrice: row.promoPrice ?? null,
    options: Array.isArray(row.options) ? row.options : [],
    optionsAr: Array.isArray(row.optionsAr) ? row.optionsAr : null,
    deliveryDays: row.deliveryDays ?? null,
    popular: row.popular,
    active: row.active,
    sortOrder: row.sortOrder,
  };
}

const packageInput = z.object({
  name: z.string().min(1),
  nameAr: z.string().optional(),
  type: z.enum(PACKAGE_TYPES),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  price: z.number().int().min(0),
  promoPrice: z.number().int().min(0).nullable().optional(),
  options: z.array(z.string()).default([]),
  optionsAr: z.array(z.string()).optional(),
  deliveryDays: z.number().int().min(0).nullable().optional(),
  popular: z.boolean().default(false),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const catalogRouter = createRouter({
  /**
   * Public catalog. Returns active packages from the database, and falls back
   * to the built-in default catalog when the DB is empty or unreachable so the
   * catalog page always has content to display.
   */
  list: publicQuery.query(async (): Promise<CatalogItem[]> => {
    try {
      const db = getDb();
      const rows = await db
        .select()
        .from(websitePackages)
        .orderBy(asc(websitePackages.sortOrder));
      const active = rows.filter((r) => r.active).map(toCatalogItem);
      if (active.length > 0) return active;
    } catch {
      // Database not available - use defaults below.
    }
    return DEFAULT_PACKAGES.filter((p) => p.active);
  }),

  /** Admin view: every package including inactive ones. */
  adminList: adminQuery.query(async (): Promise<CatalogItem[]> => {
    try {
      const db = getDb();
      const rows = await db
        .select()
        .from(websitePackages)
        .orderBy(asc(websitePackages.sortOrder));
      if (rows.length > 0) return rows.map(toCatalogItem);
    } catch {
      // fall through to defaults
    }
    return DEFAULT_PACKAGES;
  }),

  create: adminQuery.input(packageInput).mutation(async ({ input }) => {
    const db = getDb();
    await db.insert(websitePackages).values({
      name: input.name,
      nameAr: input.nameAr || null,
      type: input.type,
      description: input.description || null,
      descriptionAr: input.descriptionAr || null,
      imageUrl: input.imageUrl || null,
      price: input.price,
      promoPrice: input.promoPrice ?? null,
      options: input.options,
      optionsAr: input.optionsAr ?? null,
      deliveryDays: input.deliveryDays ?? null,
      popular: input.popular,
      active: input.active,
      sortOrder: input.sortOrder,
    });
    return { success: true };
  }),

  update: adminQuery
    .input(packageInput.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(websitePackages)
        .set({
          name: input.name,
          nameAr: input.nameAr || null,
          type: input.type,
          description: input.description || null,
          descriptionAr: input.descriptionAr || null,
          imageUrl: input.imageUrl || null,
          price: input.price,
          promoPrice: input.promoPrice ?? null,
          options: input.options,
          optionsAr: input.optionsAr ?? null,
          deliveryDays: input.deliveryDays ?? null,
          popular: input.popular,
          active: input.active,
          sortOrder: input.sortOrder,
        })
        .where(eq(websitePackages.id, input.id));
      return { success: true };
    }),

  toggleActive: adminQuery
    .input(z.object({ id: z.number(), active: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(websitePackages)
        .set({ active: input.active })
        .where(eq(websitePackages.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(websitePackages).where(eq(websitePackages.id, input.id));
      return { success: true };
    }),
});

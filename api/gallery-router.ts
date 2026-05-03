import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { galleryItems } from "@db/schema";

export const galleryRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(galleryItems)
      .orderBy(desc(galleryItems.createdAt));
    return items;
  }),

  listByCategory: publicQuery
    .input(z.object({ category: z.enum(["electricity", "plumbing", "pool", "other"]) }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db
        .select()
        .from(galleryItems)
        .where(eq(galleryItems.category, input.category))
        .orderBy(desc(galleryItems.createdAt));
      return items;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        titleAr: z.string().optional(),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        imageUrl: z.string().url(),
        category: z.enum(["electricity", "plumbing", "pool", "other"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(galleryItems).values({
        title: input.title,
        titleAr: input.titleAr || null,
        description: input.description || null,
        descriptionAr: input.descriptionAr || null,
        imageUrl: input.imageUrl,
        category: input.category,
      });
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(galleryItems).where(eq(galleryItems.id, input.id));
      return { success: true };
    }),
});

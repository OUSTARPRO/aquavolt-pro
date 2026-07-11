import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  json,
  int,
  boolean,
  float,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const galleryItems = mysqlTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }),
  description: text("description"),
  descriptionAr: text("description_ar"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  category: mysqlEnum("category", ["electricity", "plumbing", "pool", "other"]).default("other").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quotes = mysqlTable("quotes", {
  id: serial("id").primaryKey(),
  serviceType: mysqlEnum("service_type", ["electricity", "plumbing", "pool", "maintenance", "other"]).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  details: text("details"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["new", "contacted", "quoted", "accepted", "rejected"]).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatLogs = mysqlTable("chat_logs", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  messages: json("messages").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;
export type ChatLog = typeof chatLogs.$inferSelect;
export type InsertChatLog = typeof chatLogs.$inferInsert;

export const websitePackages = mysqlTable("website_packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: mysqlEnum("category", ["vitrine", "ecommerce", "portfolio", "blog", "corporate", "custom"]).notNull().default("vitrine"),
  price: float("price").notNull(),
  oldPrice: float("old_price"),
  options: json("options").$type<string[]>().notNull().default([]),
  badge: varchar("badge", { length: 100 }),
  badgeColor: varchar("badge_color", { length: 100 }).default("emerald"),
  promoPercent: int("promo_percent"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: int("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type WebsitePackage = typeof websitePackages.$inferSelect;
export type InsertWebsitePackage = typeof websitePackages.$inferInsert;

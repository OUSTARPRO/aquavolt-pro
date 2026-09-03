import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  json,
  double,
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

export const complements = mysqlTable("complements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }),
  category: mysqlEnum("category", ["electricity", "plumbing", "pool", "other"]).default("other").notNull(),
  price: double("price").notNull(),
  unit: varchar("unit", { length: 50 }).default("pièce").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ComplementOrderItem = {
  complementId: number;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
};

export const complementOrders = mysqlTable("complement_orders", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientPhone: varchar("client_phone", { length: 50 }).notNull(),
  city: varchar("city", { length: 255 }),
  items: json("items").$type<ComplementOrderItem[]>().notNull(),
  total: double("total").notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["pending", "ordered", "delivered", "cancelled"]).default("pending").notNull(),
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
export type Complement = typeof complements.$inferSelect;
export type InsertComplement = typeof complements.$inferInsert;
export type ComplementOrder = typeof complementOrders.$inferSelect;
export type InsertComplementOrder = typeof complementOrders.$inferInsert;

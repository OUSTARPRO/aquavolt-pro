import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { websitePackages } from "./schema.ts";
import { DEFAULT_PACKAGES } from "../contracts/catalog.ts";

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to seed the database");
  }
  const db = drizzle(databaseUrl, { mode: "planetscale" });
  console.log("Seeding database...");

  const existing = await db.select().from(websitePackages);
  if (existing.length === 0) {
    console.log(`Inserting ${DEFAULT_PACKAGES.length} website packages...`);
    await db.insert(websitePackages).values(
      DEFAULT_PACKAGES.map((p) => ({
        name: p.name,
        nameAr: p.nameAr,
        type: p.type,
        description: p.description,
        descriptionAr: p.descriptionAr,
        imageUrl: p.imageUrl,
        price: p.price,
        promoPrice: p.promoPrice,
        options: p.options,
        optionsAr: p.optionsAr,
        deliveryDays: p.deliveryDays,
        popular: p.popular,
        active: p.active,
        sortOrder: p.sortOrder,
      })),
    );
    console.log("Website packages inserted.");
  } else {
    console.log("Website packages already present, skipping.");
  }

  console.log("Done.");
  process.exit(0); // close MySQL connection pool
}

seed();

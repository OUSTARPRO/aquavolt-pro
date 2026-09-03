import { getDb } from "../api/queries/connection";
import { products } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  const existingProducts = await db.select({ id: products.id }).from(products).limit(1);
  if (existingProducts.length === 0) {
    await db.insert(products).values([
      // Piscine
      { name: "Chlore galets 5kg", nameAr: "كلور أقراص 5 كلغ", category: "pool", price: 350 },
      { name: "pH moins 5kg", nameAr: "مخفض الحموضة 5 كلغ", category: "pool", price: 180 },
      { name: "Épuisette de surface", nameAr: "شبكة تنظيف السطح", category: "pool", price: 120 },
      { name: "Pompe de filtration 1CV", nameAr: "مضخة ترشيح 1 حصان", category: "pool", price: 2800 },
      { name: "Filtre à sable", nameAr: "فلتر رملي", category: "pool", price: 3500 },
      // Plomberie
      { name: "Chauffe-eau 100L", nameAr: "سخان ماء 100 لتر", category: "plumbing", price: 1900 },
      { name: "Mitigeur de cuisine", nameAr: "خلاط مطبخ", category: "plumbing", price: 450 },
      { name: "Flexible de douche", nameAr: "أنبوب دش مرن", category: "plumbing", price: 80 },
      // Électricité
      { name: "Spot LED encastrable", nameAr: "سبوت LED مدمج", category: "electricity", price: 60 },
      { name: "Disjoncteur 32A", nameAr: "قاطع تيار 32 أمبير", category: "electricity", price: 150 },
      { name: "Tableau électrique 12 modules", nameAr: "لوحة كهربائية 12 وحدة", category: "electricity", price: 320 },
    ]);
    console.log("Inserted default products.");
  } else {
    console.log("Products already seeded, skipping.");
  }

  console.log("Done.");
  process.exit(0); // close MySQL connection pool
}

seed();

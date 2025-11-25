import "dotenv/config";
import { db } from "./index";
import {
  unitType,
  brand,
  category,
  productInfo,
  location,
  locationInfo,
  storageInfo,
} from "./schema";

// AI generated seed script so i could test out if the tables worked or not.
// Not using it anymore

async function seed() {
  console.log("🌱 Starting seed...");

  // 1. Unit Types
  console.log("📏 Seeding unit types...");
  const unitTypes = await db
    .insert(unitType)
    .values([
      { name: "kg" },
      { name: "g" },
      { name: "L" },
      { name: "ml" },
      { name: "stuks" },
      { name: "blikken" },
    ])
    .returning();
  console.log(`✓ Created ${unitTypes.length} unit types`);

  // 2. Brands
  console.log("🏷️  Seeding brands...");
  const brands = await db
    .insert(brand)
    .values([
      { name: "AH Huismerk" },
      { name: "Unox" },
      { name: "Coca Cola" },
      { name: "Heineken" },
      { name: "Maggi" },
      { name: "Dr. Oetker" },
      { name: "Calvé" },
    ])
    .returning();
  console.log(`✓ Created ${brands.length} brands`);

  // 3. Categories
  console.log("📂 Seeding categories...");
  const categories = await db
    .insert(category)
    .values([
      { name: "Soep" },
      { name: "Drank" },
      { name: "Saus" },
      { name: "Pizza" },
      { name: "Pasta" },
      { name: "Conserven" },
    ])
    .returning();
  console.log(`✓ Created ${categories.length} categories`);

  // 4. Products
  console.log("🛒 Seeding products...");
  const products = await db
    .insert(productInfo)
    .values([
      {
        name: "Tomatensoep",
        content: 400,
        brandId: brands[0].id,
        unitTypeId: unitTypes[3].id, // ml
        categoryId: categories[0].id,
      },
      {
        name: "Kippensoep",
        content: 300,
        brandId: brands[1].id,
        unitTypeId: unitTypes[3].id, // ml
        categoryId: categories[0].id,
      },
      {
        name: "Cola Zero",
        content: 1.5,
        brandId: brands[2].id,
        unitTypeId: unitTypes[2].id, // L
        categoryId: categories[1].id,
      },
      {
        name: "Bier",
        content: 330,
        brandId: brands[3].id,
        unitTypeId: unitTypes[3].id, // ml
        categoryId: categories[1].id,
      },
      {
        name: "Mayonaise",
        content: 500,
        brandId: brands[6].id,
        unitTypeId: unitTypes[3].id, // ml
        categoryId: categories[2].id,
      },
      {
        name: "Pizza Margherita",
        content: 350,
        brandId: brands[5].id,
        unitTypeId: unitTypes[1].id, // g
        categoryId: categories[3].id,
      },
      {
        name: "Spaghetti",
        content: 500,
        brandId: brands[0].id,
        unitTypeId: unitTypes[1].id, // g
        categoryId: categories[4].id,
      },
    ])
    .returning();
  console.log(`✓ Created ${products.length} products`);

  // 5. Locations
  console.log("📍 Seeding locations...");
  const locations = await db
    .insert(location)
    .values([
      { name: "Keuken" },
      { name: "Bijkeuken" },
      { name: "Voorraadkast" },
      { name: "Koelkast" },
      { name: "Vriezer" },
      { name: "Plank 1" },
      { name: "Plank 2" },
      { name: "Deur schap" },
    ])
    .returning();
  console.log(`✓ Created ${locations.length} locations`);

  // 6. Location Hierarchy
  console.log("🏗️  Seeding location hierarchy...");
  const locationInfos = await db
    .insert(locationInfo)
    .values([
      // Voorraadkast heeft 2 planken
      {
        locationId: locations[5].id, // Plank 1
        parentId: locations[2].id, // Voorraadkast
      },
      {
        locationId: locations[6].id, // Plank 2
        parentId: locations[2].id, // Voorraadkast
      },
      // Koelkast heeft deur schap
      {
        locationId: locations[7].id, // Deur schap
        parentId: locations[3].id, // Koelkast
      },
    ])
    .returning();
  console.log(`✓ Created ${locationInfos.length} location hierarchies`);

  // 7. Storage Info
  console.log("📦 Seeding storage info...");
  const storageInfos = await db
    .insert(storageInfo)
    .values([
      // Voorraadkast - Plank 1
      {
        quantity: 3,
        expiration_date: "2026-12-31",
        locationId: locations[5].id,
        productInfoId: products[0].id, // Tomatensoep
      },
      {
        quantity: 2,
        expiration_date: "2026-06-30",
        locationId: locations[5].id,
        productInfoId: products[1].id, // Kippensoep
      },
      // Voorraadkast - Plank 2
      {
        quantity: 500,
        expiration_date: "2027-03-15",
        locationId: locations[6].id,
        productInfoId: products[6].id, // Spaghetti
      },
      // Bijkeuken
      {
        quantity: 6,
        expiration_date: "2026-09-01",
        locationId: locations[1].id,
        productInfoId: products[2].id, // Cola
      },
      {
        quantity: 24,
        expiration_date: "2026-08-15",
        locationId: locations[1].id,
        productInfoId: products[3].id, // Bier
      },
      // Koelkast - Deur schap
      {
        quantity: 500,
        expiration_date: "2025-12-01",
        locationId: locations[7].id,
        productInfoId: products[4].id, // Mayonaise
      },
      // Vriezer
      {
        quantity: 2,
        expiration_date: "2026-11-30",
        locationId: locations[4].id,
        productInfoId: products[5].id, // Pizza
      },
    ])
    .returning();
  console.log(`✓ Created ${storageInfos.length} storage entries`);

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   Unit Types: ${unitTypes.length}`);
  console.log(`   Brands: ${brands.length}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   Locations: ${locations.length}`);
  console.log(`   Location Hierarchies: ${locationInfos.length}`);
  console.log(`   Storage Entries: ${storageInfos.length}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});

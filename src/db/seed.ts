import "dotenv/config";
import { db } from "./index";
import {
  unitType,
  brand,
  category,
  productName,
  productInfo,
  locationTable,
  locationInfo,
  storageInfo,
} from "./schema";
import * as fs from "fs";

// Seed script based on exported database data

async function seed() {
  console.log("🌱 Starting seed...");

  // Load exported data
  const exportData = JSON.parse(
    fs.readFileSync("db-export.json", "utf-8")
  ) as any;

  // 1. Unit Types
  console.log("📏 Seeding unit types...");
  const unitTypes = await db
    .insert(unitType)
    .values(
      exportData.unitTypes.map((u: any) => ({
        name: u.name,
      }))
    )
    .returning();
  console.log(`✓ Created ${unitTypes.length} unit types`);

  // 2. Brands
  console.log("🏷️  Seeding brands...");
  const brands = await db
    .insert(brand)
    .values(
      exportData.brands.map((b: any) => ({
        name: b.name,
      }))
    )
    .returning();
  console.log(`✓ Created ${brands.length} brands`);

  // 3. Categories
  console.log("📂 Seeding categories...");
  const categories = await db
    .insert(category)
    .values(
      exportData.categories.map((c: any) => ({
        name: c.name,
      }))
    )
    .returning();
  console.log(`✓ Created ${categories.length} categories`);

  // 4. Product Names (NIEUW!)
  console.log("📝 Seeding product names...");
  const productNames = await db
    .insert(productName)
    .values(
      exportData.productNames.map((pn: any) => ({
        name: pn.name,
      }))
    )
    .returning();
  console.log(`✓ Created ${productNames.length} product names`);

  // 5. Products (AANGEPAST - nu met productNameId ipv name)
  console.log("🛒 Seeding products...");
  const products = await db
    .insert(productInfo)
    .values(
      exportData.products.map((p: any) => {
        // Find productNameId by matching name
        const productNameRecord = productNames.find(
          (pn) => pn.name === p.name
        );
        const brandRecord = brands.find(
          (b) => b.id === (p.brand || p.brandId)
        );
        const unitTypeRecord = unitTypes.find(
          (u) => u.id === (p.unit_type || p.unitTypeId)
        );
        const categoryRecord = categories.find(
          (c) => c.id === (p.category || p.categoryId)
        );

        return {
          content: p.content,
          imgUrl: p.imgUrl,
          productNameId: productNameRecord!.id,
          brandId: brandRecord?.id,
          unitTypeId: unitTypeRecord?.id,
          categoryId: categoryRecord?.id,
        };
      })
    )
    .returning();
  console.log(`✓ Created ${products.length} products`);

  // 6. Locations
  console.log("📍 Seeding locations...");
  const locations = await db
    .insert(locationTable)
    .values(
      exportData.locations.map((l: any) => ({
        name: l.name,
        imgUrl: l.imgUrl,
      }))
    )
    .returning();
  console.log(`✓ Created ${locations.length} locations`);

  // 7. Location Hierarchy
  console.log("🏗️  Seeding location hierarchy...");
  const locationInfos = await db
    .insert(locationInfo)
    .values(
      exportData.locationInfos.map((li: any) => {
        const locationRecord = locations.find(
          (l) => l.id === (li.location_id || li.locationId)
        );
        const parentRecord = locations.find(
          (l) => l.id === (li.parent_id || li.parentId)
        );

        return {
          locationId: locationRecord?.id,
          parentId: parentRecord?.id,
        };
      })
    )
    .returning();
  console.log(`✓ Created ${locationInfos.length} location hierarchies`);

  // 8. Storage Info
  console.log("📦 Seeding storage info...");
  const storageInfos = await db
    .insert(storageInfo)
    .values(
      exportData.storage.map((s: any) => {
        const locationRecord = locations.find(
          (l) => l.id === (s.location || s.locationId)
        );
        const productRecord = products.find(
          (p) => p.id === (s.product_info || s.productInfoId)
        );

        return {
          quantity: s.quantity,
          expiration_date: s.expiration_date,
          locationId: locationRecord!.id,
          productInfoId: productRecord!.id,
        };
      })
    )
    .returning();
  console.log(`✓ Created ${storageInfos.length} storage entries`);

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   Unit Types: ${unitTypes.length}`);
  console.log(`   Brands: ${brands.length}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Product Names: ${productNames.length}`);
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

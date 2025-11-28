import "dotenv/config";
import { db } from "../src/db";
import * as fs from "fs";

async function exportData() {
  console.log("📤 Exporting database...");

  try {
    // 1. Unit Types
    const unitTypes = await db.query.unitType.findMany();
    console.log(`✓ Found ${unitTypes.length} unit types`);

    // 2. Brands
    const brands = await db.query.brand.findMany();
    console.log(`✓ Found ${brands.length} brands`);

    // 3. Categories
    const categories = await db.query.category.findMany();
    console.log(`✓ Found ${categories.length} categories`);

    // 4. Products (oude structuur met name in productInfo)
    const products = await db.query.productInfo.findMany({
      with: {
        brand: true,
        unitType: true,
        category: true,
      },
    });
    console.log(`✓ Found ${products.length} products`);

    // Extract unique product names from products
    const productNames = [
      ...new Set(products.map((p: any) => p.name).filter(Boolean)),
    ].map((name) => ({ name }));
    console.log(`✓ Extracted ${productNames.length} unique product names`);

    // 6. Locations
    const locations = await db.query.locationTable.findMany();
    console.log(`✓ Found ${locations.length} locations`);

    // 7. Location Info
    const locationInfos = await db.query.locationInfo.findMany({
      with: {
        location: true,
        parent: true,
      },
    });
    console.log(`✓ Found ${locationInfos.length} location hierarchies`);

    // 8. Storage Info (oude structuur)
    const storage = await db.query.storageInfo.findMany({
      with: {
        product: {
          with: {
            brand: true,
            unitType: true,
            category: true,
          },
        },
        location: {
          with: {
            locationInfo: {
              with: {
                parent: true,
              },
            },
          },
        },
      },
    });
    console.log(`✓ Found ${storage.length} storage entries`);

    // Export to JSON
    const exportData = {
      unitTypes,
      brands,
      categories,
      productNames,
      products,
      locations,
      locationInfos,
      storage,
    };

    fs.writeFileSync(
      "db-export.json",
      JSON.stringify(exportData, null, 2),
      "utf-8"
    );

    console.log("\n✅ Export completed!");
    console.log("📄 Data saved to: db-export.json");
    console.log("\n📊 Summary:");
    console.log(`   Unit Types: ${unitTypes.length}`);
    console.log(`   Brands: ${brands.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Product Names: ${productNames.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Locations: ${locations.length}`);
    console.log(`   Location Hierarchies: ${locationInfos.length}`);
    console.log(`   Storage Entries: ${storage.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Export failed:", error);
    process.exit(1);
  }
}

exportData();

import "dotenv/config";
import { createClient } from "@libsql/client";
import * as fs from "fs";

async function exportData() {
  console.log("📤 Exporting database with raw SQL...");

  const dbFile = process.env.DB_FILE_NAME || "file:local.db";

  const client = createClient({
    url: dbFile,
  });

  try {
    // 1. Unit Types
    const unitTypes = await client.execute("SELECT * FROM unit_type");
    console.log(`✓ Found ${unitTypes.rows.length} unit types`);

    // 2. Brands
    const brands = await client.execute("SELECT * FROM brand");
    console.log(`✓ Found ${brands.rows.length} brands`);

    // 3. Categories
    const categories = await client.execute("SELECT * FROM category");
    console.log(`✓ Found ${categories.rows.length} categories`);

    // 4. Products - haal oude structuur op (met name kolom)
    const products = await client.execute("SELECT * FROM product_info");
    console.log(`✓ Found ${products.rows.length} products`);

    // Extract unique product names
    const productNames = [
      ...new Set(products.rows.map((p: any) => p.name).filter(Boolean)),
    ];
    console.log(`✓ Extracted ${productNames.length} unique product names`);

    // 5. Locations
    const locations = await client.execute("SELECT * FROM location");
    console.log(`✓ Found ${locations.rows.length} locations`);

    // 6. Location Info
    const locationInfos = await client.execute("SELECT * FROM location_info");
    console.log(`✓ Found ${locationInfos.rows.length} location hierarchies`);

    // 7. Storage Info
    const storage = await client.execute("SELECT * FROM storage_info");
    console.log(`✓ Found ${storage.rows.length} storage entries`);

    // Export to JSON
    const exportData = {
      unitTypes: unitTypes.rows,
      brands: brands.rows,
      categories: categories.rows,
      productNames: productNames.map((name) => ({ name })),
      products: products.rows,
      locations: locations.rows,
      locationInfos: locationInfos.rows,
      storage: storage.rows,
    };

    fs.writeFileSync(
      "db-export.json",
      JSON.stringify(exportData, null, 2),
      "utf-8"
    );

    console.log("\n✅ Export completed!");
    console.log("📄 Data saved to: db-export.json");
    console.log("\n📊 Summary:");
    console.log(`   Unit Types: ${unitTypes.rows.length}`);
    console.log(`   Brands: ${brands.rows.length}`);
    console.log(`   Categories: ${categories.rows.length}`);
    console.log(`   Product Names: ${productNames.length}`);
    console.log(`   Products: ${products.rows.length}`);
    console.log(`   Locations: ${locations.rows.length}`);
    console.log(`   Location Hierarchies: ${locationInfos.rows.length}`);
    console.log(`   Storage Entries: ${storage.rows.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Export failed:", error);
    process.exit(1);
  }
}

exportData();

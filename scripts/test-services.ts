import "dotenv/config";
import { GetAllProducts, GetProductId } from "../src/services/productService";
import { GetAllStorage } from "../src/services/storageService";

async function testServices() {
  console.log("🧪 Testing services...\n");

  try {
    // Test 1: GetAllProducts
    console.log("1️⃣ Testing GetAllProducts('Mayo')...");
    const products = await GetAllProducts("Mayo");
    console.log(`   Found ${products.length} products:`, products);
    console.log("   ✅ PASS\n");

    // Test 2: GetProductId
    console.log("2️⃣ Testing GetProductId('Mayonaise')...");
    const productId = await GetProductId("Mayonaise");
    console.log(`   Product ID: ${productId}`);
    if (productId) {
      console.log("   ✅ PASS\n");
    } else {
      console.log("   ❌ FAIL - No product found\n");
    }

    // Test 3: GetAllStorage
    console.log("3️⃣ Testing GetAllStorage()...");
    const storage = await GetAllStorage();
    console.log(`   Found ${storage.length} storage items`);
    console.log("   First item:", JSON.stringify(storage[0], null, 2));

    // Check if product names are populated correctly
    const hasProductNames = storage.every(item => item.product.name);
    if (hasProductNames) {
      console.log("   ✅ PASS - All products have names\n");
    } else {
      console.log("   ❌ FAIL - Some products missing names\n");
    }

    console.log("\n✅ All tests completed!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  }
}

testServices();

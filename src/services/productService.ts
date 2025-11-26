"use server";

import { db } from "@/db";
import { like, eq } from "drizzle-orm";
import { productInfo } from "@/db/schema";

// Get all proudtcs based on query
async function GetAllProducts(query: string): Promise<string[]> {
  const products = await db
    .select({ name: productInfo.name })
    .from(productInfo)
    .where(like(productInfo.name, `%${query}%`));

  return products.map((p) => p.name);
}

// Get productId by name
async function GetProductId(name: string): Promise<number | undefined> {
  try {
    const existing = await db
      .select({ id: productInfo.id })
      .from(productInfo)
      .where(eq(productInfo.name, name))
      .limit(1);

    if (existing.length > 0) {
      return existing[0].id;
    }

    return undefined;
  } catch (error: unknown) {
    console.log(error);
  }
}
export { GetAllProducts, GetProductId };

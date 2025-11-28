"use server";

import { db } from "@/db";
import { like, eq } from "drizzle-orm";
import { productInfo, productName } from "@/db/schema";

// Get all proudtcs based on query
async function GetAllProducts(query: string): Promise<string[]> {
  const products = await db
    .select({ name: productName.name })
    .from(productInfo)
    .innerJoin(productName, eq(productInfo.productNameId, productName.id))
    .where(like(productName.name, `%${query}%`));

  return products.map((p) => p.name);
}

// Get productId by name
async function GetProductId(name: string): Promise<number | undefined> {
  try {
    // Stap 1: Zoek productNameId
    const productNameResult = await db
      .select({ id: productName.id })
      .from(productName)
      .where(eq(productName.name, name))
      .limit(1);

    if (productNameResult.length === 0) {
      return undefined;
    }

    // Stap 2: Zoek productInfoId via productNameId
    const existing = await db
      .select({ id: productInfo.id })
      .from(productInfo)
      .where(eq(productInfo.productNameId, productNameResult[0].id))
      .limit(1);

    if (existing.length > 0) {
      return existing[0].id;
    }

    return undefined;
  } catch (error: unknown) {
    console.log(error);
  }
}

async function GetProductIdsByName(name: string): Promise<number[]> {
  try {
    const products = await db
      .select({ id: productInfo.id })
      .from(productInfo)
      .innerJoin(productName, eq(productInfo.productNameId, productName.id))
      .where(eq(productName.name, name));

    return products.map((p) => p.id);
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

export { GetAllProducts, GetProductId, GetProductIdsByName };

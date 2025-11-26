"use server";

import { db } from "@/db";
import { StorageItem, StorageInfo } from "@/types";
import { productInfo, storageInfo } from "@/db/schema";
import { like, eq } from "drizzle-orm";

async function GetAllStorage(): Promise<StorageItem[]> {
  try {
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

    // format it to the StorageInfo type
    return storage.map((storageInfo) => ({
      id: storageInfo.id,
      quantity: storageInfo.quantity,
      expirationDate: storageInfo.expiration_date ?? "",
      product: {
        id: storageInfo.product.id,
        name: storageInfo.product.name,
        content: storageInfo.product.content ?? 0,
        brand: storageInfo.product.brand?.name,
        unitType: storageInfo.product.unitType?.name,
        category: storageInfo.product.category?.name,
      },
      location: {
        id: storageInfo.location.id,
        name: storageInfo.location.name,
        parentName: storageInfo.location.locationInfo?.parent?.name,
      },
    }));
  } catch (exception: unknown) {
    const error =
      exception instanceof Error ? exception : new Error(String(exception));
    console.error("Error fetching storage:", error.message);
    throw new Error(`Failed to fetch storage: ${error.message}`);
  }
}

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

// Add product and other storage info data to the database
async function AddStorageItem(data: StorageInfo) {
  try {
    await db.insert(storageInfo).values(data);
  } catch (error: unknown) {
    console.log("error:", error);
  }
}

export { GetAllStorage, GetAllProducts, GetProductId, AddStorageItem };

"use server";

import { db } from "@/db";
import { StorageItem, StorageInfo } from "@/types";
import { storageInfo } from "@/db/schema";

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

// Add product and other storage info data to the database
async function AddStorageItem(data: StorageInfo) {
  try {
    await db.insert(storageInfo).values(data);
  } catch (error: unknown) {
    console.log("error:", error);
  }
}

export { GetAllStorage, AddStorageItem };

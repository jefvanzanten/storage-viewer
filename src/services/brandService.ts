"use server";

import { db } from "@/db";
import { brand } from "@/db/schema";
import { DropdownOption } from "@/types";

async function GetAllBrands(): Promise<DropdownOption[]> {
  try {
    const brandResults = await db
      .select({ id: brand.id, name: brand.name })
      .from(brand);

    if (brandResults.length === 0) return [];

    return brandResults;
  } catch (error: unknown) {
    console.log("Error fetching brands: ", error);
    return [];
  }
}

export { GetAllBrands };

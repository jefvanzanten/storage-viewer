"use server";

import { db } from "@/db";
import { category } from "@/db/schema";
import { DropdownOption } from "@/types";

async function GetAllCategories(): Promise<DropdownOption[]> {
  try {
    const categoryResults = await db
      .select({ id: category.id, name: category.name })
      .from(category);

    if (categoryResults.length === 0) return [];

    return categoryResults;
  } catch (error: unknown) {
    console.log("Error fetching brands: ", error);
    return [];
  }
}

export { GetAllCategories };

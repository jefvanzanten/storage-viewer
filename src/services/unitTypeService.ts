"use server";

import { db } from "@/db";
import { unitType } from "@/db/schema";
import { DropdownOption } from "@/types";

async function GetAllUnitTypes(): Promise<DropdownOption[]> {
  try {
    const unitTypeResults = await db
      .select({ id: unitType.id, name: unitType.name })
      .from(unitType);

    if (unitTypeResults.length === 0) return [];

    return unitTypeResults;
  } catch (error: unknown) {
    console.log("Error fetching brands: ", error);
    return [];
  }
}

export { GetAllUnitTypes };

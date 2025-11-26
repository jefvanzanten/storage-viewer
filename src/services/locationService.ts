"use server";

import { db } from "@/db";
import { locationTable, locationInfo } from "@/db/schema";
import { Location } from "@/types";
import { inArray, isNotNull, eq } from "drizzle-orm";

async function GetAllParentLocations(): Promise<Location[]> {
  try {
    const parentIdsResult = await db
      .selectDistinct({ parentId: locationInfo.parentId })
      .from(locationInfo)
      .where(isNotNull(locationInfo.parentId));

    if (parentIdsResult.length === 0) {
      return [];
    }

    const parentIds = parentIdsResult
      .map((p) => p.parentId)
      .filter((id): id is number => id !== null);

    const parentLocations = await db
      .select({ id: locationTable.id, name: locationTable.name })
      .from(locationTable)
      .where(inArray(locationTable.id, parentIds));

    return parentLocations;
  } catch (error: unknown) {
    console.log("Error fetching parent locations: ", error);
    return [];
  }
}

async function GetAllSubLocationsForParent(
  id: number
): Promise<Location[]> {
  try {
    // Get all location ids for the parent id
    const subIdsResult = await db
      .select({ id: locationInfo.locationId })
      .from(locationInfo)
      .where(eq(locationInfo.parentId, id));

    if (subIdsResult.length === 0) {
      return [];
    }

    const subIds = subIdsResult
      .map((p) => p.id)
      .filter((id): id is number => id !== null);

    const subLocations = await db
      .select({ id: locationTable.id, name: locationTable.name })
      .from(locationTable)
      .where(inArray(locationTable.id, subIds));

    return subLocations;
  } catch (error: unknown) {
    console.log("Error fetching sub locations: ", error);
    return [];
  }
}

export { GetAllParentLocations, GetAllSubLocationsForParent };

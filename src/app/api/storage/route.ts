import { db } from "@/db";
import { storageInfo } from "@/db/schema";
import { StorageInfo } from "@/types";

// A post endpoint for a 3rd party app, ie: React Native app
async function POST(request: Request) {
  try {
    const data = (await request.json()) as StorageInfo;

    await db.insert(storageInfo).values(data);

    return Response.json({ created: true });
  } catch (error: unknown) {
    console.log("error: ", error);
  }
}

export { POST };

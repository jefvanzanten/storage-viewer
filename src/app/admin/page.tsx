// This is the admin page I use to add products.

import AddStorageForm from "@/components/AddStorageForm/AddStorageForm";
import { GetAllParentLocations } from "@/services/locationService";

export default async function Home() {
  const parentLocations = await GetAllParentLocations();

  return <AddStorageForm parentLocations={parentLocations} />;
}

"use client";

import { AddStorageItem } from "@/services/storageService";
import { GetProductId } from "@/services/productService";
import { StorageInfo, Location } from "@/types";
import AddProduct from "./ui/AddProduct";
import AddLocation from "./ui/AddLocation";

type AddStorageFormProps = {
  parentLocations: Location[];
};

// TODO:
// This is very primitive and I need to cleanup a lot of the code.
// A lot of repeating code that needs to go to css classes. Also needs more seperation of concerns

function AddStorageForm({ parentLocations }: AddStorageFormProps) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("onSubmit");
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("productName") as string;
    const subLocationId = formData.get("subLocationId");
    const parentLocationId = formData.get("parentLocationId");
    const locationId = subLocationId || parentLocationId;
    console.log("locationId for form", locationId);

    try {
      const productId = await GetProductId(productName);

      const storageInfoItem: StorageInfo = {
        productInfoId: productId!,
        locationId: Number(locationId),
        quantity: Number(formData.get("quantity")),
        expiration_date: (formData.get("date") as string) || undefined,
      };

      console.log("storage item: ", storageInfoItem);

      await AddStorageItem(storageInfoItem);
      alert("Product toegevoegd!");
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Fout bij toevoegen");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-4 text-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-[24em]">
        <AddProduct />
        <AddLocation parentLocations={parentLocations} />
        <div className="flex flex-row gap-2 justify-between">
          <p>Quantity*</p>
          <input
            name="quantity"
            type="number"
            className="w-[3em] bg-white text-black text-center"
            defaultValue={1}
            required
          />
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <p>Datum</p>
          <input
            name="date"
            type="date"
            className="w-[10em] bg-white text-black p-1"
          />
        </div>
        <button
          type="submit"
          className="bg-red-900 px-4 py-2 rounded-lg w-full"
        >
          Voeg toe
        </button>
      </form>
    </div>
  );
}

export default AddStorageForm;

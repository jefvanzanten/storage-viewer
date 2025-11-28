"use client";

import { Location } from "@/types";
import ProductSelector from "./ui/ProductSelector";
import LocationSelectorWrapper from "./ui/LocationSelectorWrapper";
import useStorageForm from "./hooks/useStorageForm";

type AddStorageFormProps = {
  parentLocations: Location[];
};

function AddStorageForm({ parentLocations }: AddStorageFormProps) {
  const { onSubmit } = useStorageForm();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-sm">
      <ProductSelector />
      <LocationSelectorWrapper parentLocations={parentLocations} />
      <div className="flex flex-row gap-2 justify-between">
        <p>Hoeveelheid*</p>
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
      <button type="submit" className="bg-red-900 px-4 py-2 rounded-lg w-full">
        Voeg toe
      </button>
    </form>
  );
}

export default AddStorageForm;

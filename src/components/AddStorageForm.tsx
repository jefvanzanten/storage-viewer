"use client";

import { GetAllSubLocationsForParent } from "@/services/locationService";
import { AddStorageItem, GetProductId } from "@/services/storageService";
import { StorageInfo, Location } from "@/types";
import { useState } from "react";

type AddStorageFormProps = {
  parentLocations: Location[];
};

// TODO:
// This is very primitive and I need to cleanup a lot of the code.
// A lot of repeating code that needs to go to css classes. Also needs more seperation of concerns

function AddStorageForm({ parentLocations }: AddStorageFormProps) {
  const [productQuery, setProductQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentParentLocation, setCurrentParentLocation] =
    useState<Location>();
  const [subLocations, setSubLocations] = useState<Location[]>([]);

  const subLocationsTest = GetAllSubLocationsForParent(2);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("onSubmit");
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("productName") as string;

    try {
      console.log("start of try block");
      const productId = await GetProductId(productName);
      console.log("after GetProduct");
      const storageInfoItem: StorageInfo = {
        productInfoId: productId!,
        locationId: Number(formData.get("locationId")),
        quantity: Number(formData.get("quantity")),
        expiration_date: (formData.get("date") as string) || undefined,
      };

      console.log("storage item: ", storageInfoItem);

      await AddStorageItem(storageInfoItem);
      alert("Product toegevoegd!");
      e.currentTarget.reset();
      setProductQuery("");
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Fout bij toevoegen");
    }
  };

  const handleProductChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setProductQuery(value);

    if (value.length > 0) {
      // Fetch suggestions via API
      const response = await fetch(`/api/products?q=${value}`);
      const data = await response.json();
      setSuggestions(data.products || []);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setProductQuery(suggestion);
    setShowSuggestions(false);
  };

  const onParentLocationChange = async (parentLocationId: number) => {
    const parent = parentLocations.find((loc) => loc.id === parentLocationId);
    setCurrentParentLocation(parent);

    const subs = await GetAllSubLocationsForParent(parentLocationId);
    setSubLocations(subs);
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-4 text-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-[24em]">
        <div className="flex flex-row gap-2 justify-between relative">
          <p>Product*</p>
          <div className="relative">
            <input
              name="productName"
              type="text"
              className="w-[10em] bg-white text-black px-2"
              value={productQuery}
              onChange={handleProductChange}
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between items-center">
          <p>Locatie*</p>
          <div className="flex gap-2">
            <select
              name="locationId"
              className="w-[14em] bg-white text-black"
              onChange={(e) => onParentLocationChange(Number(e.target.value))}
              required
            >
              <option value="">-- Kies een optie --</option>
              {parentLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <button className="rounded-md bg-red-900 px-2 py-1">+</button>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between items-center">
          <p>Sub-locatie</p>
          <div className="flex gap-2">
            <select
              name="subLocationId"
              className="w-[10em] bg-white text-black text-center"
            >
              <option value="">Geen</option>
              {subLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <button className="rounded-md bg-red-900 px-2 py-1">+</button>
          </div>
        </div>
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

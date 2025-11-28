"use client";

import { DropdownOption } from "@/types";
import useAddProductForm from "../hooks/useAddProductForm";
import UnitSelector from "./UnitSelector";
import BrandSelector from "./BrandSelector";
import CategorySelector from "./CategorySelector";
import ProductImageSelector from "./ProductImageSelector";

type AddProductFormProps = {
  unitTypes: DropdownOption[];
  brands: DropdownOption[];
  categories: DropdownOption[];
};

function AddProductForm({
  unitTypes,
  brands,
  categories,
}: AddProductFormProps) {
  const { onSubmit } = useAddProductForm();

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between">
        <p>Productnaam* </p>
        <input
          name="productName"
          type="text"
          className="w-[40%] bg-white text-black px-2 py-1 text-right"
          required
        />
      </div>
      <div className="flex flex-row justify-between">
        <p>Inhoud </p>
        <input
          name="content"
          type="number"
          className="w-[20%] bg-white text-black px-2 py-1 text-right"
          defaultValue={200}
          required
        />
      </div>
      <UnitSelector unitTypes={unitTypes} />
      <BrandSelector brands={brands} />
      <CategorySelector categories={categories} />
      <ProductImageSelector />
      <button type="submit" className="bg-red-900 px-4 py-2 rounded-lg w-full">
        Voeg toe
      </button>
    </form>
  );
}

export default AddProductForm;

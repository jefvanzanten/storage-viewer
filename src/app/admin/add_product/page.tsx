import AddProductForm from "@/components/AddProductForm/ui/AddProductForm";
import { GetAllBrands } from "@/services/brandService";
import { GetAllCategories } from "@/services/categoryService";
import { GetAllUnitTypes } from "@/services/unitTypeService";

export default async function Page() {
  const unitTypes = await GetAllUnitTypes();
  const brands = await GetAllBrands();
  const categories = await GetAllCategories();

  return (
    <AddProductForm
      unitTypes={unitTypes}
      brands={brands}
      categories={categories}
    />
  );
}

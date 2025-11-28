import { GetProductId } from "@/services/productService";
import { AddStorageItem } from "@/services/storageService";
import { StorageInfo } from "@/types";

function useStorageForm() {
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

  return { onSubmit };
}

export default useStorageForm;

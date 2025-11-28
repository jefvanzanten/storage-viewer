import DropdownWithLabel from "@/components/Shared/ui/DropdownWithLabel";
import { DropdownOption } from "@/types";

type BrandSelectorProps = {
  brands: DropdownOption[];
};

function BrandSelector({ brands }: BrandSelectorProps) {
  return (
    <DropdownWithLabel
      label="Merk"
      required={true}
      options={brands}
      openForm={() => {}}
    />
  );
}

export default BrandSelector;

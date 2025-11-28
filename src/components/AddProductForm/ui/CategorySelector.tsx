import DropdownWithLabel from "@/components/Shared/ui/DropdownWithLabel";
import { DropdownOption } from "@/types";

type CategorySelectorProps = {
  categories: DropdownOption[];
};

function CategorySelector({ categories }: CategorySelectorProps) {
  return (
    <DropdownWithLabel
      label={"Categorie"}
      required={false}
      options={categories}
      openForm={() => {}}
    />
  );
}

export default CategorySelector;

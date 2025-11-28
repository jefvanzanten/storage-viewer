import DropdownWithLabel from "@/components/Shared/ui/DropdownWithLabel";
import { DropdownOption } from "@/types";

type UnitSelectorProps = {
  unitTypes: DropdownOption[];
};

function UnitSelector({ unitTypes }: UnitSelectorProps) {
  return (
    <DropdownWithLabel
      label="Eenheid"
      required={true}
      options={unitTypes}
      openForm={() => {}}
    />
  );
}

export default UnitSelector;

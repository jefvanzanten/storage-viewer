import { DropdownOption } from "@/types";

type DropdownWithLabelProps = {
  label: string;
  required: boolean;
  options: DropdownOption[];
  openForm: () => void;
};

function DropdownWithLabel({
  label,
  required,
  options,
  openForm,
}: DropdownWithLabelProps) {
  return (
    <div className="flex flex-row w-full gap-2">
      <div className="flex flex-row justify-between w-full">
        <p>{label}</p>
        <select
          className="bg-white text-black w-[20%] p-2 text-right"
          required={required}
        >
          <option> </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <button className="bg-red-800 px-3 rounded-lg" onClick={openForm}>
        +
      </button>
    </div>
  );
}

export default DropdownWithLabel;

import { Location } from "@/types";

export type LocationType = "parentLocationId" | "subLocationId";

type LocationSelectorProps = {
  onChange: (locationId: number) => void;
  openForm: () => void;
  locations: Location[];
  required: boolean;
  type: LocationType;
};

function LocationSelector({
  onChange,
  openForm,
  locations,
  required,
  type,
}: LocationSelectorProps) {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <p>Locatie*</p>
      <div className="flex gap-2">
        <select
          name={type}
          className="w-[14em] bg-white text-black"
          onChange={(e) => onChange(Number(e.target.value))}
          required
        >
          <option>{`${required ? `-- Kies een optie --` : `Geen`}`}</option>
          {locations?.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <button className="rounded-md bg-red-900 px-2 py-1">+</button>
      </div>
    </div>
  );
}

export default LocationSelector;

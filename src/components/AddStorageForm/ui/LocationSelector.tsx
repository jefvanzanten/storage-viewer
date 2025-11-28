import { Location } from "@/types";

export type LocationType = "parentLocationId" | "subLocationId";

type LocationSelectorProps = {
  onChange: (locationId: number) => void;
  locations: Location[];
  required: boolean;
  type: LocationType;
};

function LocationSelector({
  onChange,
  locations,
  required,
  type,
}: LocationSelectorProps) {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <p>Opbergplaats{`${required ? `*` : ``} `}</p>
      <div className="flex gap-2">
        <select
          name={type}
          className="w-[14em] py-1 bg-white text-black text-center"
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
      </div>
    </div>
  );
}

export default LocationSelector;

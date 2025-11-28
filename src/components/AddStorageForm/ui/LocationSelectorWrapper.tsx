import { GetAllSubLocationsForParent } from "@/services/locationService";
import { useState } from "react";
import LocationSelector from "./LocationSelector";
import { Location } from "@/types";

type AddLocationProps = {
  parentLocations: Location[];
};

function LocationSelectorWrapper({ parentLocations }: AddLocationProps) {
  const [subLocations, setSubLocations] = useState<Location[]>([]);

  const onParentLocationChange = async (parentLocationId: number) => {
    const subs = await GetAllSubLocationsForParent(parentLocationId);
    setSubLocations(subs);
  };

  return (
    <>
      <LocationSelector
        type="parentLocationId"
        onChange={onParentLocationChange}
        locations={parentLocations}
        openForm={() => {}}
        required={true}
      />
      <LocationSelector
        type="subLocationId"
        onChange={() => {}}
        locations={subLocations}
        openForm={() => {}}
        required={false}
      />
    </>
  );
}

export default LocationSelectorWrapper;

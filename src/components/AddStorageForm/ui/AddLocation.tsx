import { GetAllSubLocationsForParent } from "@/services/locationService";
import { useState } from "react";
import LocationSelector from "./LocationSelector";
import { Location } from "@/types";

type AddLocationProps = {
  parentLocations: Location[];
};

function AddLocation({ parentLocations }: AddLocationProps) {
  const [currentParentLocation, setCurrentParentLocation] =
    useState<Location>();
  const [currentSubLocation, setCurrentSubLocation] = useState<Location>();
  const [subLocations, setSubLocations] = useState<Location[]>([]);

  const onParentLocationChange = async (parentLocationId: number) => {
    const parent = parentLocations?.find((loc) => loc.id === parentLocationId);
    setCurrentParentLocation(parent);

    const subs = await GetAllSubLocationsForParent(parentLocationId);
    setSubLocations(subs);
  };

  const onSubLocationChange = async (subLocationId: number) => {
    const sub = subLocations?.find((loc) => loc.id === subLocationId);
    setCurrentSubLocation(sub);
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
        onChange={onSubLocationChange}
        locations={subLocations}
        openForm={() => {}}
        required={false}
      />
    </>
  );
}

export default AddLocation;

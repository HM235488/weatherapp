import { useContext } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { LocationContext } from "./LocationContext";

export default function SearchBar({ searchParams, onSearchParams }) {
  const map = useMap(); // hook to access Leaflet map instance within child components

  const { updateCurrentLocation } = useContext(LocationContext);
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    // create search bar
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
    });

    // add search bar to map
    map.addControl(searchControl);

    const long = searchParams.get("long");
    const lat = searchParams.get("lat");

    const onSearchLocation = (e) => {
      // update currentLocation state
      updateCurrentLocation({
        latitude: e.location.y || lat,
        longitude: e.location.x || long,
        name: e.location.label || "Unknown location",
      });
      // add query params to URL
      onSearchParams({ long: e.location.x, lat: e.location.y });
    };

    // add event listener, updates state after geosearch
    map.on("geosearch/showlocation", (e) => onSearchLocation(e));

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", (e) => onSearchLocation(e));
    };
  }, [map, updateCurrentLocation, onSearchParams, searchParams]);
}

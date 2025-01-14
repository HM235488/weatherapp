import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect } from "react";
import { LocationContext } from "./LocationContext.jsx";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";

function SearchBar() {
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

    // update currentLocation state
    const onSearchLocation = (e) => {
      updateCurrentLocation({
        latitute: e.location.x,
        longitude: e.location.y,
        name: e.location.label,
      });
    };

    // add event listener, updates state after geosearch
    map.on("geosearch/showlocation", (e) => onSearchLocation(e));

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", (e) => onSearchLocation(e));
    };
  }, [map, provider, updateCurrentLocation]);
}

export default function Map() {
  const { userLocation, isLoading, error } = useContext(LocationContext);

  // if (isLoading) return <div>Loading map...</div>;

  const center =
    userLocation.latitude && userLocation.longitude
      ? [userLocation.latitude, userLocation.longitude]
      : [51.505, -0.09];

  return (
    <div style={{ height: "300px", width: "50%" }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {userLocation.latitude && userLocation.longitude && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              User&apos;s location
              {/* Lat: {userLocation.latitude}, Lon: {userLocation.longitude} */}
            </Popup>
          </Marker>
        )}
        <SearchBar />
      </MapContainer>
    </div>
  );
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { LocationContext } from "./LocationContext.jsx";
import "leaflet-geosearch/dist/geosearch.css";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import styles from "./Map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userLocation } = useContext(LocationContext);

  const defaultLong = searchParams.get("long");
  const defaultLat = searchParams.get("lat");

  const long = defaultLong ? Number(defaultLong) : userLocation.longitude;
  const lat = defaultLat ? Number(defaultLat) : userLocation.latitude;

  const center = long && lat ? [lat, long] : [51.505, -0.09];

  console.log(long, lat, userLocation.latitude, userLocation.longitude);
  // render map
  return (
    <div className={styles.mapContainer}>
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
        {long && lat && (
          <Marker position={[lat, long]}>
            <Popup>Location</Popup>
          </Marker>
        )}
        <SearchBar
          searchParams={searchParams}
          onSearchParams={setSearchParams}
        />
      </MapContainer>
    </div>
  );
}

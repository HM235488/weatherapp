import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect } from "react";
import { LocationContext } from "./LocationContext.jsx";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import { useNavigate, useParams } from "react-router-dom";

function SearchBar() {
  // const { city } = useParams();
  const navigate = useNavigate();
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

    const onSearchLocation = (e) => {
      // update currentLocation state
      updateCurrentLocation({
        latitude: e.location.y,
        longitude: e.location.x,
        name: e.location.label,
      });
      // update URL to .../name of the city
      navigate(`/${e.location.label}`);
    };

    // add event listener, updates state after geosearch
    map.on("geosearch/showlocation", (e) => onSearchLocation(e));

    // const searchCity = async () => {
    //   if (city) {
    //     const results = await provider.search({ query: city });
    //     if (results.length > 0) {
    //       const { x, y, label } = results[0];
    //       map.setView([y, x], 13);
    //       updateCurrentLocation({
    //         latitude: y,
    //         longitude: x,
    //         name: label,
    //       });
    //     }
    //   }
    // };

    // searchCity();

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", (e) => onSearchLocation(e));
    };
  }, [map, updateCurrentLocation, navigate, provider]);
}

export default function Map() {
  const { userLocation } = useContext(LocationContext);

  const center =
    userLocation.latitude && userLocation.longitude
      ? [userLocation.latitude, userLocation.longitude]
      : [51.505, -0.09];

  // render map
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

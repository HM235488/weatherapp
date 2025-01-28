import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Forecast from "./Forecast";
import Graph from "./Graph";
import LocationProvider from "./LocationContext";
import WeatherProvider from "./WeatherContext";
import Map from "./Map";

export default function Layout() {
  return (
    <>
      <LocationProvider>
        <WeatherProvider>
          <Header />
          <main>
            <Map />
            <Outlet />
            <Forecast />
          </main>
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

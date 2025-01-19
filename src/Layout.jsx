import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Forecast from "./Forecast";
import Graph from "./Graph";
import LocationProvider from "./LocationContext";
import WeatherProvider from "./WeatherContext";

export default function Layout() {
  return (
    <>
      <LocationProvider>
        <WeatherProvider>
          <Header />
          <nav>
            <Link to="map">Map</Link>
          </nav>
          <main>
            <Outlet />
            <Graph />
            <Forecast />
          </main>
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

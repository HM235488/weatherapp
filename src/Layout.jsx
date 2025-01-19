import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Forecast from "./Forecast";
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
            <Link to="favorite_places">Favorites</Link>
          </nav>
          <main>
            <Outlet />
            <Forecast />
          </main>
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

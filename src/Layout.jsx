import { Outlet } from "react-router-dom";
import Header from "./Header";
import Forecast from "./Forecast";
import "./style.css";
import LocationProvider from "./LocationContext";
import WeatherProvider from "./WeatherContext";

export default function Layout() {
  return (
    <div className="app-container">
      <LocationProvider>
        <WeatherProvider>
          <Header />
          <main>
            <Outlet />
            <Forecast />
          </main>
        </WeatherProvider>
      </LocationProvider>
    </div>
  );
}

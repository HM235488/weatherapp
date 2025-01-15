import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export default function Forecast() {
  const { weather } = useContext(WeatherContext);
  return <h3>Forecast</h3>;
}

import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import { LineChart } from "@mui/x-charts";

export default function Graph() {
  const { weather } = useContext(WeatherContext);

  if (!weather || !weather.list) return "Please wait...";

  const temperatures = weather.list.map((item) => item.main.temp);
  const timestamps = weather.list.map((item) => new Date(item.dt * 1000));

  return (
    <LineChart
      xAxis={[
        {
          data: timestamps,
          scaleType: "time",
        },
      ]}
      series={[
        {
          data: temperatures,
          label: "Temperature (°C)",
        },
      ]}
      width={800}
      height={300}
    />
  );
}

import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import { LineChart } from "@mui/x-charts";

export default function Graph({ isCelsius, convertToFahrenheit }) {
  const { weather } = useContext(WeatherContext);

  if (!weather || !weather.list) return "Please wait...";

  const temperatures = weather.list.map((item) =>
    isCelsius ? item.main.temp : convertToFahrenheit(item.main.temp)
  );
  const timestamps = weather.list.map((item) => new Date(item.dt * 1000));
  const precipitation = weather.list.map((item) => item.rain?.["3h"] || 0);

  return (
    <>
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

      <LineChart
        xAxis={[
          {
            data: timestamps,
            scaleType: "time",
          },
        ]}
        series={[
          {
            data: precipitation,
            label: "Precipitation (mm)",
          },
        ]}
        width={800}
        height={300}
      />
    </>
  );
}

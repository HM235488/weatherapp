import { useContext, useMemo } from "react";
import { WeatherContext } from "./WeatherContext";
import { LineChart } from "@mui/x-charts";
import { number } from "prop-types";

export default function Graph() {
  const { weather } = useContext(WeatherContext);

  const chartData = useMemo(() => {
    if (!weather || !weather.list) return null;

    const temperatures = weather.list.map((item) => item.main.temp);
    const timestamps = weather.list.map((item) => new Date(item.dt * 1000));
    console.log(timestamps);

    return { temperatures, timestamps };
  }, [weather]);

  if (!chartData) return "Please wait...";

  return (
    <LineChart
      xAxis={[
        {
          data: chartData.timestamps,
          scaleType: "time",
        },
      ]}
      series={[
        {
          data: chartData.temperatures,
          label: "Temperature (°C)",
        },
      ]}
      width={800}
      height={300}
    />
  );
}

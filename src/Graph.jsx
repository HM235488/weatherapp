import { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { LineChart } from "@mui/x-charts";
import styles from "./Graph.module.css";

export default function Graph({ isCelsius, convertToFahrenheit }) {
  const { weather } = useContext(WeatherContext);
  const [currentGraph, setCurrentGraph] = useState(0);

  if (!weather || !weather.list) return "Please wait...";

  const temperatures = weather.list.map((item) =>
    isCelsius ? item.main.temp : convertToFahrenheit(item.main.temp)
  );
  const timestamps = weather.list.map((item) => new Date(item.dt * 1000));
  const precipitation = weather.list.map((item) => item.rain?.["3h"] || 0);

  return (
    <div className={styles.graphContainer}>
      <div
        className={styles.graphWrapper}
        style={{ transform: `translateX(-${currentGraph * 50}%)` }}
      >
        <div>
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
                label: `Temperature (${isCelsius ? "°C" : "°F"})`,
              },
            ]}
            width={800}
            height={300}
          />
        </div>
        <div>
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
        </div>
      </div>

      <button
        className={styles.slideButton}
        onClick={() => setCurrentGraph((prev) => (prev === 0 ? 1 : 0))}
      >
        →
      </button>
    </div>
  );
}

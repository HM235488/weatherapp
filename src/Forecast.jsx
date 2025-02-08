import { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import Graph from "./Graph";
import styles from "./Forecast.module.css";

export default function Forecast() {
  const { weather } = useContext(WeatherContext);
  const [day, setDay] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);

  function handleSetDay(day) {
    return setDay(day);
  }

  // toggle between Celsius and Fahrenheit
  function toggleTemperatureUnit() {
    setIsCelsius(!isCelsius);
  }

  function convertToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  function formatTemperature(temp) {
    const temperature = isCelsius ? temp : convertToFahrenheit(temp);
    return `${temperature.toFixed(1)} ${isCelsius ? "°C" : "°F"}`;
  }

  let currentDate;
  let daysArr = new Map();

  weather?.list?.forEach((index) => {
    // weather.list is an array of objects
    const date = new Date(index.dt_txt);
    const options = {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("cz-CZ", options).format(
      date
    );

    console.log(weather);
    // divide dt into several arrays by days
    if (!daysArr.has(formattedDate)) {
      daysArr.set(formattedDate, []);
      currentDate = formattedDate;
    }

    daysArr.get(formattedDate).push({
      time: date.toLocaleTimeString("cz-CZ", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: index.main.temp,
    });
  }); // Map(5) {'Mon, 27/01' => Array(8), 'Tue, 28/01' => Array(8), 'Wed, 29/01' => Array(8), 'Thu, 30/01' => Array(8), 'Fri, 31/01' => Array(8)}
  // each array contains an object with time and temp

  console.log(daysArr);

  return (
    <div className={styles.forecastContainer}>
      <h4 className={styles.forecastTitle}>Forecast - {weather?.city?.name}</h4>
      <button className={styles.unitToggle} onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
      <div className={styles.currentWeather}>
        {weather?.list && weather.list[0]?.weather && (
          <div>
            <img
              className={styles.weatherIcon}
              src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`}
              alt="Weather icon"
            />
            <div className={styles.weatherInfo}>
              <span className={styles.temperature}>
                {formatTemperature(weather.list[0].main.temp)}
              </span>
              <span className={styles.description}>
                {weather.list[0].weather[0].description}
              </span>
            </div>
            <span>{daysArr.keys().next().value}</span>
          </div>
        )}
      </div>

      <Graph isCelsius={isCelsius} convertToFahrenheit={convertToFahrenheit} />
      <div className={styles.dayTabs}>
        {Array.from(daysArr.keys()).map((dayItem) => (
          <button
            key={dayItem}
            className={`${styles.dayTab} ${
              day === dayItem ? styles.active : ""
            }`}
            onClick={() => handleSetDay(dayItem)}
          >
            {dayItem}
          </button>
        ))}
      </div>

      <table className={styles.forecastTable}>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {daysArr.get(day)?.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{formatTemperature(item.temp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

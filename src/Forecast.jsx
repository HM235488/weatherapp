import { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";

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

    daysArr.get(formattedDate).push(index.main.temp);
  });

  return (
    <div>
      <h4>Forecast - {weather?.city?.name}</h4>
      <button onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
      <div>
        {weather?.list && weather.list[0]?.weather && (
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`}
              alt="Weather icon"
            />
            <span>{formatTemperature(weather.list[0].main.temp)}</span>
            <span>{weather.list[0].weather[0].description}</span>
          </div>
        )}
      </div>
      {/* create tabs */}
      {Array.from(daysArr.keys()).map((day) => (
        <button key={day} onClick={(e) => handleSetDay(e.target.innerHTML)}>
          {day}
        </button>
      ))}
      <p></p>
      <p>
        {daysArr
          .get(day)
          ?.map((temp) => formatTemperature(temp))
          .join(", ")}
      </p>
    </div>
  );
}

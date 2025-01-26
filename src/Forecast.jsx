import { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";

export default function Forecast() {
  const { weather } = useContext(WeatherContext);
  const [day, setDay] = useState("");

  function handleSetDay(day) {
    return setDay(day);
  }

  const cityName = weather?.city?.name;

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
      <div>
        {weather?.list && weather.list[0]?.weather && (
          <img
            src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`}
          />
        )}
      </div>
      {/* create tabs */}
      {Array.from(daysArr.keys()).map((day) => (
        <button key={day} onClick={(e) => handleSetDay(e.target.innerHTML)}>
          {day}
        </button>
      ))}
      <p>{daysArr.get(day)}</p>
    </div>
  );
}

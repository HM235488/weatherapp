import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export default function Forecast() {
  const { weather } = useContext(WeatherContext);

  if (!weather.city || !weather.list) return <div>Loading data...</div>;

  const cityName = weather.city.name;

  let currentDate;
  let daysArr = new Map();

  weather.list.forEach((index) => {
    // weather.list is an array of objects
    const date = new Date(index.dt_txt);
    const options = {
      weekday: "short",
      // month: "numeric",
      // day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("cz-CZ", options).format(
      date
    );

    // divide dt into several arrays by days
    if (!daysArr.has(formattedDate)) {
      daysArr.set(formattedDate, []);
      currentDate = formattedDate;
    }

    daysArr.get(formattedDate).push(index.main.temp);
  });

  console.log(daysArr);

  return (
    <div>
      <h3>{cityName}</h3>
      <h4>DATE</h4>
    </div>
  );
}

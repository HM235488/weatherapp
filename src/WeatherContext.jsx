import { createContext, useContext, useReducer } from "react";
import dispatch from "react";
import { useState } from "react";
import { LocationContext } from "./LocationContext";
import { useEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";

const myAPIKey = "664f7b9fd16536dbdd5d637ec703564d";

export const WeatherContext = createContext();

const initialWeather = {
  weather: {},
  error: "",
};

function weatherReducer(state, action) {
  switch (action.type) {
    case "weather/loaded":
      return { ...state, weather: action.payload };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const WeatherProvider = ({ children }) => {
  const { currentLocation, userLocation } = useContext(LocationContext);
  const [{ weather, error }, dispatch] = useReducer(
    weatherReducer,
    initialWeather
  );

  useEffect(
    function () {
      async function getWeatherData() {
        if (!userLocation.latitude || !userLocation.longitude)
          return console.log("Location not available yet.");

        let location;
        if (currentLocation.latitude && currentLocation.longitude) {
          location = currentLocation;
        } else if (userLocation.latitude && userLocation.longitude) {
          location = userLocation;
        } else {
          console.log("No location available.");
        }

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${myAPIKey}`
          );
          const data = await res.json();
          dispatch({ type: "weather/loaded", payload: data });
          console.log(data);
          if (!res.ok) {
            throw new Error("Weather data could not be fetched.");
          }
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error fetching the weather data...",
          });
        }
      }

      getWeatherData();
    },
    [userLocation, currentLocation]
  );

  return (
    <WeatherContext.Provider value={{ weather, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;

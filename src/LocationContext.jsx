import { useEffect, useReducer } from "react";
import { createContext } from "react";

const initialState = {
  currentLocation: {},
  userLocation: {},
  isLoading: false,
  error: "",
};

function locationReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "city/loaded":
      return { ...state, currentLocation: action.payload };
    case "userCity/loaded":
      return { ...state, userLocation: action.payload };
    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [{ currentLocation, userLocation, isLoading, error }, dispatch] =
    useReducer(locationReducer, initialState);

  useEffect(() => {
    dispatch({ type: "loading" });

    if (!navigator.geolocation) {
      dispatch({
        type: "rejected",
        payload: "Geolocation is not supported by this browser.",
      });
      return;
    }

    // get userLocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        dispatch({ type: "userCity/loaded", payload: { latitude, longitude } });
      },
      (error) => {
        dispatch({ type: "rejected", payload: error.message });
      }
    );
  }, []);

  // update currentLocation
  const updateCurrentLocation = (searchedLocation) => {
    dispatch({
      type: "city/loaded",
      payload: searchedLocation,
    });
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        updateCurrentLocation,
        userLocation,
        isLoading,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

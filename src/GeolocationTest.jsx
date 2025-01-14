import React, { useState, useEffect } from "react";

function GeolocationTest() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    console.log("GeolocationTest effect running");
    setStatus("Checking geolocation support...");

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      setError("Geolocation is not supported by your browser");
      setStatus("Error: Geolocation not supported");
      return;
    }

    setStatus("Requesting geolocation...");

    const successHandler = (position) => {
      console.log("Geolocation success:", position);
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setStatus("Location received");
    };

    const errorHandler = (error) => {
      console.log("Geolocation error:", error);
      setError(error.message);
      setStatus("Error: " + error.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const geoId = navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(geoId);
    };
  }, []);

  console.log("Rendering GeolocationTest", { location, error, status });

  return (
    <div>
      <h2>Geolocation Test</h2>
      <p>Status: {status}</p>
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Waiting for location...</p>
      )}
    </div>
  );
}

export default GeolocationTest;

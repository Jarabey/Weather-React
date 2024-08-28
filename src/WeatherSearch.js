import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState("metric"); // Default to Celsius (metric)

  const API_KEY = "217474443533be7fa7d7e3e24fcca45f";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const handleSearch = async () => {
    if (city === "") return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(
        err.response
          ? err.response.data.message
          : "City not found or invalid API key."
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  return (
    <div>
      <div className="weather-container">
        <h1>Weather Search</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={toggleUnits}>
           {units === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
        {loading && <p>Loading...</p>}
        {weatherData && (
          <div className="weather">
            <h2>{weatherData.name}</h2>
            <p>
              Temperature: {weatherData.main.temp}°{" "}
              {units === "metric" ? "C" : "F"}
            </p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>
              Wind Speed: {weatherData.wind.speed}{" "}
              {units === "metric" ? "m/s" : "mph"}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
      <div>
        <p className="credits">
          Coded by{" "}
          <a
            className="credits"
            href="http://linkedin.com/in/jasmin-santos-70b343324"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jasmin Santos
          </a>
          . Open Source on{" "}
          <a
            className="credits"
            href="https://github.com/Jarabey/Weather-React"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default WeatherSearch;

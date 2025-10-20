import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [units, setUnits] = useState('metric'); // For C/F toggle

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleUnits = () => {
    setUnits((prev) => (prev === 'metric' ? 'metric' : 'metric'));
    if (weatherData) fetchWeather(weatherData.name); // Refresh data
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = '7bcff94fb176fc12ec2979ba1f67ae6d';
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
      );
      setWeatherData(weatherResponse.data);
    } catch (err) {
      setError('City not found or API error');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={`App ${theme} `}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <button className="units-toggle" onClick={toggleUnits}>
        {units === 'metric' ? '°C' : '°F'}
      </button>
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <div className="loader">Loading...</div>}
      {error && <p className="error">{error}</p>}
      <WeatherDisplay data={weatherData} units={units} />
    </div>
  );
}

export default App;
import React from 'react';

const WeatherDisplay = ({ data, units }) => {
  if (!data) return null;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="weather-info fade-in glass-card neumorphic">
      <h2>{data.name}, {data.sys.country}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt={`${data.weather[0].description} icon`}
        className="weather-icon"
      />
      <p className="temp-main">{Math.round(data.main.temp)}{unitSymbol}</p>
      <p className="description">{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
      <div className="details-grid">
        <p>Feels Like: {Math.round(data.main.feels_like)}{unitSymbol}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} {windUnit}</p>
        <p>Pressure: {data.main.pressure} hPa</p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
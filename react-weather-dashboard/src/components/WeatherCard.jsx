import React, { useState, useEffect } from 'react';

const WeatherCard = ({ data }) => {
  const { location, current } = data;
  const { name, country } = location;
  const { 
    temp_c, 
    humidity, 
    wind_kph, 
    condition, 
    pressure_mb, 
    cloud,
    feelslike_c,
    uv,
    vis_km
  } = current;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="weather-card animated fadeIn">
      <div className="weather-card-inner">
        <div className="weather-header">
          <div>
            <h2 className="location-name">
              {name}, {country}
            </h2>
            <p className="location-date">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="location-time">
              {formatTime(currentTime)}
            </p>
          </div>
          <div className="weather-icon-container">
            <img 
              src={`https:${condition.icon}`} 
              alt={condition.text} 
              className="weather-icon"
            />
          </div>
        </div>

        <div className="weather-temp-section">
          <div className="current-temp">
            {temp_c}°<span>C</span>
          </div>
          <div className="weather-condition">
            {condition.text}
            <div className="feels-like">
              Feels like: {feelslike_c}°C
            </div>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <div className="detail-icon humidity">
              <i className="fas fa-tint"></i>
            </div>
            <div className="detail-info">
              <div className="detail-value">{humidity}%</div>
              <div className="detail-label">Humidity</div>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon wind">
              <i className="fas fa-wind"></i>
            </div>
            <div className="detail-info">
              <div className="detail-value">{wind_kph} km/h</div>
              <div className="detail-label">Wind Speed</div>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon pressure">
              <i className="fas fa-compress-alt"></i>
            </div>
            <div className="detail-info">
              <div className="detail-value">{pressure_mb} hPa</div>
              <div className="detail-label">Pressure</div>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon cloud">
              <i className="fas fa-cloud"></i>
            </div>
            <div className="detail-info">
              <div className="detail-value">{cloud}%</div>
              <div className="detail-label">Cloudiness</div>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon uv">
              <i className="fas fa-sun"></i>
            </div>
            <div className="detail-info">
              <div className="detail-value">{uv}</div>
              <div className="detail-label">UV Index</div>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon visibility">
              <i className="fas fa-eye"></i>
            </div>
            <div className="detail-info">
              <div className="detail-value">{vis_km} km</div>
              <div className="detail-label">Visibility</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
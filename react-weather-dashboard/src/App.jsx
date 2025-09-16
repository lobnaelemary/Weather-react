import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [weatherClass, setWeatherClass] = useState('default');

  // تحميل سجل البحث من localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // حفظ سجل البحث في localStorage
  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // دالة لتحديد خلفية الصفحة حسب حالة الطقس
  const getWeatherClass = (data) => {
    if (!data) return 'default';
    
    const { current } = data;
    const isDay = current.is_day === 1;
    const conditionText = current.condition.text.toLowerCase();
    
    if (conditionText.includes('sunny') || conditionText.includes('clear')) {
      return isDay ? 'sunny' : 'clear-night';
    } else if (conditionText.includes('cloud')) {
      return isDay ? 'cloudy' : 'cloudy-night';
    } else if (conditionText.includes('rain') || conditionText.includes('drizzle')) {
      return 'rainy';
    } else if (conditionText.includes('snow')) {
      return 'snowy';
    } else {
      return isDay ? 'default' : 'default-night';
    }
  };

  const handleSearch = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=${city}&days=3`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setWeatherClass(getWeatherClass(data));
      
      // إضافة إلى سجل البحث مع منع التكرار
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
      setWeatherClass('default');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className={`weather-app ${weatherClass}`}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <header className="text-center mb-5">
              <h1 className="app-title">
                <i className="fas fa-cloud-sun me-2"></i>
                Weather Dashboard
              </h1>
              <p className="app-subtitle">Discover current weather conditions anywhere</p>
            </header>
            
            <SearchBox 
              onSearch={handleSearch} 
              loading={loading} 
              searchHistory={searchHistory}
              onHistoryItemClick={handleSearch}
              onClearHistory={clearHistory}
            />
            
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            )}
            
            {weatherData && <WeatherCard data={weatherData} />}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
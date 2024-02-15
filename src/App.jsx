import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  }

  return (
    <>
      <div className="App">
        <div className="background"></div>
        <div className="container content">
          <h1 className="mt-5 mb-4 text-white text-center">Weather App</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary" onClick={fetchWeather}>
                  Get Weather
                </button>
              </div>
              {weather && (
                <div className="card mt-3 shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">{weather.name}, {weather.sys.country}</h5>
                    <p className="card-text text-capitalize">{weather.weather[0].description}</p>
                    <p className="card-text">Temperature: {weather.main.temp}°C</p>
                    <p className="card-text">Humidity: {weather.main.humidity}%</p>
                  </div>
                </div>
              )}
              {error && <p className="mt-3 text-danger fw-bolder fs-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
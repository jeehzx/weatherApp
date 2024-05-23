import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assests/search.png'
import clear_icon from '../Assests/clear.png'
import cloud_icon from '../Assests/cloud.png'
import drizzle_icon from '../Assests/drizzle.png'
import rain_icon from '../Assests/rain.png'
import snow_icon from '../Assests/snow.png'
import wind_icon from '../Assests/wind.png'
import humidity_icon from '../Assests/humidity.png'

const WeatherApp = () => {
  const api_key = '0ab4ad69768f54b23ec1e9bfec6cf184'

  const [weatherIcon, setWeatherIcon] = useState(cloud_icon)
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    location: '',
    humidity: '',
    windSpeed: '',
  })
  const [cityInput, setCityInput] = useState('')

  const updateWeatherData = async () => {
    if (!cityInput) return

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${api_key}`
    const response = await fetch(URL)
    const data = await response.json()

    setWeatherData({
      temperature: Math.floor(data.main.temp) + ' °C',
      location: data.name,
      humidity: data.main.humidity + ' %',
      windSpeed: Math.floor(data.wind.speed) + ' km/h',
    })

    updateWeatherIcon(data.weather[0].icon)
  }

  const updateWeatherIcon = (icon) => {
    switch (icon) {
      case '01d':
      case '01n':
        setWeatherIcon(clear_icon)
        break
      case '02d':
      case '02n':
      case '03d':
      case '03n':
        setWeatherIcon(cloud_icon)
        break
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        setWeatherIcon(rain_icon)
        break
      case '13d':
      case '13n':
        setWeatherIcon(snow_icon)
        break
      default:
        setWeatherIcon(cloud_icon)
        break
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div className="search-icon" onClick={updateWeatherData}>
          <img src={search_icon} />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} id="icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} id="wihuser" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} id="wihuser" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp

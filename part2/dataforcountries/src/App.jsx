import axios from "axios"
import React, { useState, useEffect } from "react"
import Country from "./components/Country"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
      const capital = selectedCountry.capital[0]
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setWeather(response.data)
        })
    }
  }, [selectedCountry])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setSelectedCountry(countriesToShow[0])
    }
  }, [filter, countries])

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLocaleLowerCase())
  )

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        {countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : selectedCountry ? (
          <div>
            <Country country={selectedCountry} />
            {weather && (
              <div>
                <h2>Weather in {selectedCountry.capital[0]}</h2>
                <p>Temperature {weather.main.temp} Celcius</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>wind {weather.wind.speed} m/s</p>
              </div>
            )}
          </div>
        ) : countriesToShow.length === 1 ? (
          <Country country={countriesToShow[0]} />
        ) : (
          countriesToShow.map((country, index) => (
            <div key={index}>
              <p>
                {country.name.common}
                <button onClick={() => handleShowClick(country)}>show</button>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

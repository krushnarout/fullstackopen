import axios from "axios"
import React, { useState, useEffect } from "react"
import Country from "./components/Country"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }

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
          <Country country={selectedCountry} />
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

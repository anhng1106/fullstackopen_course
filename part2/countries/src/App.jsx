import React, { useState, useEffect, use } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>

      <div>
        {search === " " ? null : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map((country) => (
            <p key={country.cca3}>{country.name.common}</p>
          ))
        ) : filteredCountries.length === 1 ? (
          <CountryDetails country={filteredCountries[0]} />
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </>
  );
}

export default App;

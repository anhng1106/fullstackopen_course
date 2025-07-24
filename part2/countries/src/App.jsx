import React, { useState, useEffect, use } from "react";
import CountryDetails from "./components/CountryDetails";
import countryService from "./services/countryService";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
      setSelectedCountry(null);
    });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("https://studies.cs.helsinki.fi/restcountries/api/all")
  //     .then((response) => {
  //       setCountries(response.data);
  //     });
  // }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
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
        ) : filteredCountries.length === 1 ? (
          <CountryDetails country={filteredCountries[0]} />
        ) : selectedCountry ? (
          <CountryDetails country={selectedCountry} />
        ) : (
          filteredCountries.map((country) => (
            <p key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </p>
          ))
        )}
      </div>
      {/* if (search === '') return null;
          if (filtered.length > 10) return <p>Too many matches</p>;
          if (filtered.length === 1) return <CountryDetails country={filtered[0]} />;
          if (selectedCountry) return <CountryDetails country={selectedCountry} />;

          return filtered.map(...); */}
    </>
  );
}

export default App;

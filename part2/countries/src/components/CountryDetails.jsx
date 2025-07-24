const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages</h2>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  );
};

export default CountryDetails;

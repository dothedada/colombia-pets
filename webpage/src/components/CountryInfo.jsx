const CountryInfo = ({ countryInfo, loading, error }) => (
  <div className="general-info">
    <h2>Información del país (Año actual)</h2>
    {loading && <p>Cargando...</p>}
    {error && <p style={{color:'red'}}>Error: {error}</p>}
    {!loading && !error && countryInfo.length > 0 && (
      <ul>
        {countryInfo.map(pet => (
          <li key={pet.id}>
            {pet.name}: {pet.count}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CountryInfo;

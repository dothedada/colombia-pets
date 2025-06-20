import "../styles/DepartmentInfo.css";

const DepartmentInfo = ({ info, loading, error }) => {
  if (loading) return <div className="general-info">Cargando...</div>;
  if (error) return <div className="general-info">Error: {error}</div>;
  if (!info) return <div></div>;

  const mascotas = info.pets
    .filter((mascota) => mascota.count > 0)
    .map((mascota) => {
      return mascota.name;
    });

  return (
    <div className="general-info">
      <h3>Información general</h3>
      <ul>
        <li>
          <strong>Departamento:</strong> {info.name}
        </li>
        <li>
          <strong>Capital:</strong> {info.capital}
        </li>
        {info.municipalities && (
          <li>
            <strong>Municipios:</strong> 000{" "}
          </li>
        )}
        {mascotas.length > 0 && (
          <li>
            <strong>Mascotas:</strong>
            {mascotas.map((mascota) => `${mascota} `)}
          </li>
        )}
      </ul>
    </div>
  );
};

export default DepartmentInfo;

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/ColombiaMap.css";
import { useEffect, useState } from "react";

const colombiaCenter = [4.5709, -74.2973];

// Componente para manejar el cambio de centro del mapa y la animación
const ChangeMapCenter = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
};

const ColombiaMap = ({ selectedDepartment }) => {
  const [mapCenter, setMapCenter] = useState(colombiaCenter);

  useEffect(() => {
    if (selectedDepartment === null) {
      setMapCenter(colombiaCenter);
      return;
    }
    const { lat, lng } = selectedDepartment.center_point;
    setMapCenter([lat, lng]);
  }, [selectedDepartment]);

  return (
    <div className="colombia-map">
      <h2>Mapa de Colombia</h2>
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapCenter center={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default ColombiaMap;

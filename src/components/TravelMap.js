import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTravelContext } from '../context/TravelContext';
import 'leaflet/dist/leaflet.css';
import './TravelMap.css';
import L from 'leaflet';
import icon from './location.png'; // 引入图标

const customIcon = L.icon({
  iconUrl: icon,
  iconSize: [32, 32], // 图标大小
  iconAnchor: [16, 32], // 图标锚点
  popupAnchor: [0, -32] // 弹出框锚点
});

function TravelMap() {
  const { state } = useTravelContext();
  const defaultCenter = [0, 0];
  const defaultZoom = 2;

  return (
    <div className="travel-map">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {state.entries.map(entry => (
          <Marker
            key={entry.id}
            position={[entry.location.latitude, entry.location.longitude]}
			icon={customIcon}
          >
            <Popup>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                {entry.photo && (
                  <img
                    src={entry.photo}
                    alt={entry.title}
                    style={{ width: '100%', maxWidth: '200px' }}
                  />
                )}
                <p>{new Date(entry.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TravelMap; 
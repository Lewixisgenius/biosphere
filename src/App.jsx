import { useState } from 'react';
import MapView from './MapView';
import Navbar from './Navbar';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function App() {
  const [selectedObservation, setSelectedObservation] = useState(null);

  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <div className="map-container">
          <MapView onMarkerClick={setSelectedObservation} />
        </div>

      </div>
    </div>
  );
}

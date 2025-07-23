import { useState } from 'react';
import MapView from './MapView';
import Navbar from './Navbar';
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

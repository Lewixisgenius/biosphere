import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "./SearchBar";
import SpeciesCard from "./components/SpeciesCard";
import { getAllSpecies } from "./services/api";
import L from "leaflet";
const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// Custom hook to handle map bounds
function MapBounds({ speciesList }) {
  const map = useMap();
  
  useEffect(() => {
    if (speciesList.length > 0) {
      const bounds = speciesList
        .filter(species => species.location && Array.isArray(species.location))
        .map(species => species.location);
      
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [speciesList, map]);

  return null;
}

// Custom hook to handle map zoom to species
function MapZoomToSpecies({ selectedSpecies }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedSpecies && selectedSpecies.location && Array.isArray(selectedSpecies.location)) {
      map.setView(selectedSpecies.location, 12);
    }
  }, [selectedSpecies, map]);

  return null;
}

export default function MapView() {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadSpecies = async () => {
      setIsLoading(true);
      try {
        const data = await getAllSpecies();
        setSpeciesList(data);
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpecies();
  }, []);

  const handleSpeciesSelect = (species) => {
    setSelectedSpecies(species);
  };

  const handleMarkerClick = (species) => {
    setSelectedSpecies(species);
  };

  const handleCloseCard = () => {
    setSelectedSpecies(null);
  };

  const defaultCenter = [39.9334, 32.8597]; // Turkey center
  const defaultZoom = 6;

  const containerStyle = {
    display: "flex",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#eee",
    position: "relative"
  };

  const mapContainerStyle = {
    width: isMobile ? "100%" : selectedSpecies ? "70%" : "100%",
    height: "100%",
    transition: "width 0.3s ease"
  };

  const sidebarStyle = {
    width: isMobile ? "100%" : "30%",
    height: isMobile ? "auto" : "100%",
    position: isMobile ? "fixed" : "relative",
    bottom: isMobile ? "0" : "auto",
    left: isMobile ? "0" : "auto",
    zIndex: isMobile ? 1000 : "auto",
    backgroundColor: "#1e1e1e",
    borderLeft: isMobile ? "none" : "1px solid #333",
    boxShadow: isMobile ? "0 -4px 12px rgba(0,0,0,0.3)" : "none",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  };

  const searchContainerStyle = {
    padding: isMobile ? "12px" : "20px",
    borderBottom: "1px solid #333",
    backgroundColor: "#1e1e1e",
    flexShrink: 0
  };

  const cardContainerStyle = {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#eee",
    fontSize: "18px"
  };

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <div>Map Loading...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Map Container */}
      <div style={mapContainerStyle}>
        <MapContainer 
          center={defaultCenter} 
          zoom={defaultZoom} 
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <MapBounds speciesList={speciesList} />
          <MapZoomToSpecies selectedSpecies={selectedSpecies} />
          
          {speciesList.map((species) => (
            species.location && Array.isArray(species.location) && (
              <Marker
                key={species.id}
                position={species.location}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(species),
                }}
              >
                <Popup>
                  <div style={{ 
                    textAlign: "center",
                    minWidth: "150px"
                  }}>
                    <div style={{ 
                      fontWeight: "600", 
                      marginBottom: "4px",
                      color: "#333"
                    }}>
                      {species.name}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      color: "#666",
                      fontStyle: "italic"
                    }}>
                      {species.scientificName}
                    </div>
                    {species.location_name && (
                      <div style={{ 
                        fontSize: "11px", 
                        color: "#888",
                        marginTop: "4px"
                      }}>
                        📍 {species.location_name}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      {/* Sidebar for Desktop or Bottom Panel for Mobile */}
      {(selectedSpecies || !isMobile) && (
        <div style={sidebarStyle}>
          {/* Search Bar */}
          <div style={searchContainerStyle}>
            <SearchBar 
              onSelect={handleSpeciesSelect} 
              isMobile={isMobile}
            />
          </div>

          {/* Species Card */}
          <div style={cardContainerStyle}>
            {selectedSpecies ? (
              <SpeciesCard 
                species={selectedSpecies} 
                onClose={handleCloseCard}
                isMobile={isMobile}
              />
            ) : !isMobile ? (
              <div style={{ 
                padding: "20px", 
                textAlign: "center",
                color: "#888"
              }}>
                <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                  🗺️ Biosphere Map
                </div>
                <div style={{ fontSize: "14px" }}>
                  Select a species from the map or search above
                </div>
                <div style={{ 
                  fontSize: "12px", 
                  marginTop: "16px",
                  color: "#666"
                }}>
                  {speciesList.length} species found
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

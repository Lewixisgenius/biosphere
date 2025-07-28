import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "./SearchBar";
import SpeciesCard from "./components/SpeciesCard";
import FilterPanel from "./components/FilterPanel";
import FavoritesPanel from "./components/FavoritesPanel";
import ObservationForm from "./components/ObservationForm";
import { getAllSpecies, filterSpecies, submitObservation, exportToCSV, exportToJSON, generateShareableURL, parseSharedURL } from "./services/api";
import { useLanguage } from "./contexts/LanguageContext";

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
  const { t } = useLanguage();
  const [speciesList, setSpeciesList] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showObservationForm, setShowObservationForm] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all',
    threatStatus: 'all',
    searchTerm: '',
    showEndemic: false,
    showThreatened: false
  });
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
        setFilteredSpecies(data);
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpecies();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    const filtered = filterSpecies(speciesList, filters);
    setFilteredSpecies(filtered);
  }, [speciesList, filters]);

  // Parse URL parameters on load
  useEffect(() => {
    const { filters: urlFilters, selectedSpeciesId } = parseSharedURL();
    if (Object.keys(urlFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...urlFilters }));
    }
    if (selectedSpeciesId) {
      const species = speciesList.find(s => s.id === selectedSpeciesId);
      if (species) {
        setSelectedSpecies(species);
      }
    }
  }, [speciesList]);

  const handleSpeciesSelect = (species) => {
    setSelectedSpecies(species);
    // Update URL with selected species
    const shareableURL = generateShareableURL(filters, species);
    window.history.replaceState({}, '', shareableURL);
  };

  const handleMarkerClick = (species) => {
    setSelectedSpecies(species);
  };

  const handleCloseCard = () => {
    setSelectedSpecies(null);
    // Update URL without selected species
    const shareableURL = generateShareableURL(filters, null);
    window.history.replaceState({}, '', shareableURL);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update URL with filters
    const shareableURL = generateShareableURL(newFilters, selectedSpecies);
    window.history.replaceState({}, '', shareableURL);
  };

  const handleObservationSubmit = async (observation) => {
    try {
      const result = await submitObservation(observation);
      console.log('Observation submitted:', result);
      // Optionally refresh species list or show success message
    } catch (error) {
      console.error('Observation submission failed:', error);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(filteredSpecies);
  };

  const handleExportJSON = () => {
    exportToJSON(filteredSpecies);
  };

  const handleShare = () => {
    const shareableURL = generateShareableURL(filters, selectedSpecies);
    navigator.clipboard.writeText(shareableURL).then(() => {
      alert('The link has been copied to the clipboard!');
    });
  };

  const defaultCenter = [39.9334, 32.8597]; // Turkey center
  const defaultZoom = 6;

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#eee",
    position: "relative",
    overflowY: "auto"
  };

  const mapContainerStyle = {
    width: isMobile ? "100%" : selectedSpecies ? "70%" : "100%",
    height: "100vh",
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

  const controlsContainerStyle = {
    padding: isMobile ? "8px" : "12px",
    borderBottom: "1px solid #333",
    backgroundColor: "#1e1e1e",
    flexShrink: 0,
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  };

  const buttonStyle = {
    backgroundColor: "#4ea8de",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    flex: "1",
    minWidth: "80px"
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

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    padding: "20px"
  };

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <div>{t('map.loading')}</div>
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
          
          <MapBounds speciesList={filteredSpecies} />
          <MapZoomToSpecies selectedSpecies={selectedSpecies} />
          
          {filteredSpecies.map((species) => (
            species.location && Array.isArray(species.location) && (
            <Marker
              key={species.id}
                position={species.location}
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
                    {species.isEndemic && (
                      <div style={{ 
                        fontSize: "10px", 
                        color: "#e74c3c",
                        marginTop: "2px"
                      }}>
                        🏆 Endemik
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

          {/* Controls */}
          <div style={controlsContainerStyle}>
            <button 
              style={buttonStyle}
              onClick={() => setShowFilters(!showFilters)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
            >
              🔍 {t('filters.title')}
            </button>
            <button 
              style={buttonStyle}
              onClick={() => setShowFavorites(!showFavorites)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
            >
              ⭐ {t('favorites.title')}
            </button>
            <button 
              style={buttonStyle}
              onClick={() => setShowObservationForm(true)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
            >
              📝 {t('observation.title')}
            </button>
            <button 
              style={buttonStyle}
              onClick={handleExportCSV}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
            >
              📊 CSV
            </button>
            <button 
              style={buttonStyle}
              onClick={handleExportJSON}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
            >
              📄 JSON
            </button>
            <button 
              style={buttonStyle}
              onClick={handleShare}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
            >
              🔗 {t('common.share')}
            </button>
          </div>

          {/* Content Area */}
          <div style={cardContainerStyle}>
            {showFilters && (
              <FilterPanel 
                speciesList={speciesList}
                onFilterChange={handleFilterChange}
                isMobile={isMobile}
              />
            )}

            {showFavorites && (
              <FavoritesPanel 
                speciesList={speciesList}
                onSpeciesSelect={handleSpeciesSelect}
                isMobile={isMobile}
              />
            )}

            {selectedSpecies ? (
              <SpeciesCard 
                species={selectedSpecies} 
                onClose={handleCloseCard}
                isMobile={isMobile}
              />
            ) : !isMobile && !showFilters && !showFavorites ? (
              <div style={{ 
                padding: "20px", 
                textAlign: "center",
                color: "#888"
              }}>
                <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                  🗺️ {t('nav.title')}
                </div>
                <div style={{ fontSize: "14px" }}>
                  {t('map.selectSpecies')}
                </div>
                <div style={{ 
                  fontSize: "12px", 
                  marginTop: "16px",
                  color: "#666"
                }}>
                  {filteredSpecies.length} {t('map.totalSpecies')}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Observation Form Modal */}
      {showObservationForm && (
        <div style={overlayStyle}>
          <ObservationForm 
            onSubmit={handleObservationSubmit}
            onClose={() => setShowObservationForm(false)}
            isMobile={isMobile}
          />
      </div>
      )}
    </div>
  );
}

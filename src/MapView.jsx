import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [wikiSummary, setWikiSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res1 = await fetch(
          "https://api.inaturalist.org/v1/observations?per_page=100&geo=true"
        );
        const data1 = await res1.json();

        const res2 = await fetch(
          "https://api.inaturalist.org/v1/observations?taxon_id=47158&per_page=200&geo=true&nelat=90&nelng=180&swlat=-90&swlng=-180"
        );
        const data2 = await res2.json();

        const combined = [...data1.results, ...data2.results];

        const filtered = combined
          .filter((item) => item.geojson && item.geojson.coordinates)
          .map((item) => ({
            id: item.id,
            name: item.species_guess || "Bilinmeyen Tür",
            scientificName: item.taxon?.name || "Bilinmeyen Bilimsel İsim",
            lat: item.geojson.coordinates[1],
            lng: item.geojson.coordinates[0],
            photo:
              item.photos && item.photos.length > 0
                ? item.photos[0].url.replace("square", "medium")
                : null,
            wikipedia_url: item.taxon?.wikipedia_url || null,
            observed_on: item.observed_on || "Tarih yok",
            location: item.place_guess || "Konum yok",
          }));

        setSpeciesList(filtered);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchAll();
  }, []);

  const fetchWikiSummary = async (title) => {
    setLoadingSummary(true);
    setWikiSummary(null);
    try {
      const response = await fetch(
        `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      if (!response.ok) throw new Error("Wikipedia özeti bulunamadı");
      const data = await response.json();
      setWikiSummary(data.extract || "Wikipedia özeti bulunamadı.");
    } catch (error) {
      setWikiSummary("Wikipedia özeti bulunamadı.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const onSelectSpecies = (species) => {
    setSelectedSpecies(species);
    if (species.scientificName) {
      fetchWikiSummary(species.scientificName);
    } else {
      setWikiSummary("Bilimsel isim bulunamadığı için özet alınamıyor.");
    }
  };

  const center =
    speciesList.length > 0
      ? [speciesList[0].lat, speciesList[0].lng]
      : [20, 0];

  const renderSpeciesCard = () => (
    <div>
      <h2 style={{ marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>
        {selectedSpecies.name}
      </h2>
      <h4 style={{ fontStyle: "italic", color: "#aaa", marginTop: 0 }}>
        {selectedSpecies.scientificName}
      </h4>

      {selectedSpecies.photo && (
        <img
          src={selectedSpecies.photo}
          alt={selectedSpecies.name}
          style={{ width: "100%", borderRadius: 8, marginBottom: "1rem" }}
        />
      )}

      <p><strong>Konum:</strong> {selectedSpecies.location}</p>
      <p><strong>Gözlem Tarihi:</strong> {selectedSpecies.observed_on}</p>

      <p style={{ whiteSpace: "pre-line" }}>
        {loadingSummary ? "Özet yükleniyor..." : wikiSummary}
      </p>

      {selectedSpecies.wikipedia_url && (
        <p>
          <a
            href={selectedSpecies.wikipedia_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4ea8de", textDecoration: "underline" }}
          >
            Vikipedi'de Oku
          </a>
        </p>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "100vh", backgroundColor: "#121212", color: "#eee" }}>
      
      {/* Harita */}
      <div style={{ width: isMobile ? "100%" : "75%", height: isMobile ? "100%" : "100%" }}>
        <MapContainer center={center} zoom={3} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {speciesList.map((species) => (
            <Marker
              key={species.id}
              position={[species.lat, species.lng]}
              eventHandlers={{
                click: () => onSelectSpecies(species),
              }}
            >
              <Popup>{species.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Masaüstü Bilgi Kartı */}
      {!isMobile && (
        <div style={{
          width: "25%",
          padding: "1rem",
          overflowY: "auto",
          borderLeft: "1px solid #333",
          backgroundColor: "#1e1e1e",
          boxSizing: "border-box"
        }}>
          {selectedSpecies ? renderSpeciesCard() : <p>Haritadan bir tür seçin.</p>}
        </div>
      )}

      {/* Mobil Popup Kart */}
      {isMobile && selectedSpecies && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "65%",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          zIndex: 1000,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          padding: "1rem",
          overflowY: "auto",
          animation: "slideUp 0.3s ease-out"
        }}>
          <button
            onClick={() => setSelectedSpecies(null)}
            style={{
              position: "absolute",
              top: "10px",
              right: "16px",
              fontSize: "1.5rem",
              background: "none",
              border: "none",
              color: "#aaa",
              cursor: "pointer"
            }}
          >
            ×
          </button>
          {renderSpeciesCard()}
        </div>
      )}
    </div>
  );
}

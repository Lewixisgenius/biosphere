import { useState, useEffect, useRef } from "react";

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(query)}&per_page=8`
        );
        const data = await res.json();
        setSuggestions(data.results);
      } catch (err) {
        console.error("Autocomplete hatası:", err);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item.preferred_common_name || item.name);
    setSuggestions([]);

    const mapped = {
      id: item.id,
      name: item.preferred_common_name || "Bilinmeyen Tür",
      scientificName: item.name || "Bilinmeyen",
      lat: item.default_observation?.geojson?.coordinates?.[1] || 0,
      lng: item.default_observation?.geojson?.coordinates?.[0] || 0,
      photo: item.default_photo?.medium_url || null,
      wikipedia_url: item.wikipedia_url || null,
      observed_on: "Arama sonucu",
      location: "Bilinmiyor",
    };

    onSelect(mapped);
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem", zIndex: 999 }}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Tür ara (ör: kelebek, martı)"
        style={{
          width: "425px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #555",
          backgroundColor: "#2a2a2a",
          color: "#fff",
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            color: "#000",
            maxHeight: "240px",
            overflowY: "auto",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #e0e0e0",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
            >
              <strong>{item.preferred_common_name || "Bilinmeyen"}</strong>{" "}
              <em style={{ color: "#666" }}>({item.name})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

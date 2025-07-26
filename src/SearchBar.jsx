import { useState, useEffect, useRef } from "react";
import { searchSpecies } from "./services/api";

function SearchBar({ onSelect, isMobile = false }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();
  const suggestionsRef = useRef();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const results = await searchSpecies(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Autocomplete hatası:", err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (species) => {
    setQuery(species.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(species);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const containerStyle = {
    position: "relative",
    marginBottom: isMobile ? "0.5rem" : "1rem",
    zIndex: 999,
    width: isMobile ? "100%" : "425px"
  };

  const inputStyle = {
    width: "100%",
    padding: isMobile ? "12px 16px" : "12px 16px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: isMobile ? "16px" : "14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box"
  };

  const suggestionsStyle = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    maxHeight: "240px",
    overflowY: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    borderRadius: "8px",
    border: "1px solid #333",
    zIndex: 1000
  };

  const suggestionItemStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid #333",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  };

  const loadingStyle = {
    padding: "12px 16px",
    textAlign: "center",
    color: "#888",
    fontStyle: "italic"
  };

  return (
    <div style={containerStyle} ref={suggestionsRef}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder={isMobile ? "Search" : "Search"}
        style={inputStyle}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onMouseOver={(e) => e.target.style.borderColor = "#4ea8de"}
        onMouseOut={(e) => e.target.style.borderColor = "#555"}
      />
      
      {showSuggestions && (
        <ul style={suggestionsStyle}>
          {isLoading ? (
            <li style={loadingStyle}>Aranıyor...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((species) => (
              <li
                key={species.id}
                onClick={() => handleSelect(species)}
                style={suggestionItemStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2a2a2a"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <div style={{ fontWeight: "600", color: "#fff" }}>
                  {species.name}
                </div>
                <div style={{ 
                  fontSize: "12px", 
                  color: "#888", 
                  fontStyle: "italic" 
                }}>
                  {species.scientificName}
                </div>
                {species.location_name && (
                  <div style={{ 
                    fontSize: "11px", 
                    color: "#666" 
                  }}>
                    📍 {species.location_name}
                  </div>
                )}
              </li>
            ))
          ) : query.length >= 2 ? (
            <li style={loadingStyle}>Sonuç bulunamadı</li>
          ) : null}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

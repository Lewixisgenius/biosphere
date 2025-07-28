import { useState, useEffect } from 'react';

const FavoritesPanel = ({ speciesList, onSpeciesSelect, isMobile = false }) => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('biosphere-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('biosphere-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (species) => {
    if (!favorites.find(fav => fav.id === species.id)) {
      setFavorites([...favorites, species]);
    }
  };

  const removeFromFavorites = (speciesId) => {
    setFavorites(favorites.filter(fav => fav.id !== speciesId));
  };

  const isFavorite = (speciesId) => {
    return favorites.find(fav => fav.id === speciesId);
  };

  const toggleFavorite = (species) => {
    if (isFavorite(species.id)) {
      removeFromFavorites(species.id);
    } else {
      addToFavorites(species);
    }
  };

  const panelStyle = {
    backgroundColor: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: isMobile ? '12px' : '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    cursor: 'pointer'
  };

  const titleStyle = {
    margin: 0,
    fontSize: '16px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px'
  };

  const favoritesListStyle = {
    maxHeight: showFavorites ? '300px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease'
  };

  const favoriteItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    border: '1px solid #444',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const favoriteImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    objectFit: 'cover',
    marginRight: '12px'
  };

  const favoriteInfoStyle = {
    flex: 1,
    minWidth: 0
  };

  const favoriteNameStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const favoriteScientificStyle = {
    fontSize: '12px',
    color: '#888',
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const removeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: '#888',
    fontSize: '14px',
    padding: '20px'
  };

  return (
    <div style={panelStyle}>
      <div 
        style={headerStyle}
        onClick={() => setShowFavorites(!showFavorites)}
      >
        <h3 style={titleStyle}>
          ⭐ Favorite Species
          <span style={{ fontSize: '12px', color: '#888' }}>
            ({favorites.length})
          </span>
        </h3>
        <button style={toggleButtonStyle}>
          {showFavorites ? '▼' : '▶'}
        </button>
      </div>

      <div style={favoritesListStyle}>
        {favorites.length === 0 ? (
          <div style={emptyStateStyle}>
            You don't have a favorite species yet.<br />
            Select a species from the map and click the ⭐ button.
          </div>
        ) : (
          favorites.map(species => (
            <div 
              key={species.id}
              style={favoriteItemStyle}
              onClick={() => onSpeciesSelect(species)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
            >
              {species.image && (
                <img 
                  src={species.image} 
                  alt={species.name}
                  style={favoriteImageStyle}
                />
              )}
              <div style={favoriteInfoStyle}>
                <div style={favoriteNameStyle}>
                  {species.name}
                </div>
                <div style={favoriteScientificStyle}>
                  {species.scientificName}
                </div>
              </div>
              <button
                style={removeButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(species.id);
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ff6b6b20'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel; 
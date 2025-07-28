import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllSpecies, filterSpecies, getSpeciesStats } from '../services/api';
import SpeciesCard from '../components/SpeciesCard';
import Navigation from '../components/Navigation';

const SpeciesList = () => {
  const { t } = useLanguage();
  const [speciesList, setSpeciesList] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'scientific', 'date', 'threat'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all',
    threatStatus: 'all',
    searchTerm: '',
    showEndemic: false,
    showThreatened: false
  });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadSpecies = async () => {
      setIsLoading(true);
      try {
        const data = await getAllSpecies();
        setSpeciesList(data);
        setFilteredSpecies(data);
        setStats(getSpeciesStats(data));
      } catch (error) {
        console.error("Data loading error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpecies();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = filterSpecies(speciesList, filters);
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
          break;
        case 'scientific':
          aValue = a.scientificName?.toLowerCase() || '';
          bValue = b.scientificName?.toLowerCase() || '';
          break;
        case 'date':
          aValue = new Date(a.observed_on || 0);
          bValue = new Date(b.observed_on || 0);
          break;
        case 'threat':
          aValue = a.threatStatus || 'common';
          bValue = b.threatStatus || 'common';
          break;
        default:
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredSpecies(filtered);
  }, [speciesList, filters, sortBy, sortOrder]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSpeciesSelect = (species) => {
    setSelectedSpecies(species);
  };

  const handleCloseCard = () => {
    setSelectedSpecies(null);
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#eee',
    padding: '20px'
  };

  const headerStyle = {
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#fff'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#888',
    marginBottom: '20px'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  };

  const statCardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #333',
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#4ea8de',
    marginBottom: '4px'
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const controlsStyle = {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
    alignItems: 'center'
  };

  const buttonStyle = {
    backgroundColor: '#4ea8de',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  };

  const selectStyle = {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    border: '1px solid #444',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none'
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
    gap: '20px',
    marginBottom: '24px'
  };

  const speciesCardStyle = {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    border: '1px solid #333',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  };

  const speciesImageStyle = {
    width: '100%',
    height: viewMode === 'grid' ? '200px' : '100px',
    objectFit: 'cover'
  };

  const speciesInfoStyle = {
    padding: '16px'
  };

  const speciesNameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '4px'
  };

  const speciesScientificStyle = {
    fontSize: '14px',
    color: '#888',
    fontStyle: 'italic',
    marginBottom: '8px'
  };

  const speciesLocationStyle = {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px'
  };

  const tagsContainerStyle = {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap'
  };

  const tagStyle = {
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '10px',
    fontWeight: '600',
    textTransform: 'uppercase'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '18px',
    color: '#888'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#888'
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          {t('common.loading')}...
        </div>
      </div>
    );
  }

  return (
    <div>
                <Navigation />
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>🦋 {t('nav.title')} - Species</h1>
        <p style={subtitleStyle}>
          A comprehensive list of species on Earth
        </p>
      </div>

      {/* Statistics */}
      {stats && (
        <div style={statsContainerStyle}>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{stats.total}</div>
            <div style={statLabelStyle}>Total Species</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{stats.endemic}</div>
            <div style={statLabelStyle}>Endemic Species</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{stats.threatened}</div>
            <div style={statLabelStyle}>Under Threat</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{Object.keys(stats.byClass).length}</div>
            <div style={statLabelStyle}>Class</div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={controlsStyle}>
        <button 
          style={buttonStyle}
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
        >
          {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
        </button>
        
        <select 
          style={selectStyle}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">By Name</option>
          <option value="scientific">By Scientific Name</option>
          <option value="date">By Date</option>
          <option value="threat">By Threat Level</option>
        </select>
        
        <select 
          style={selectStyle}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Increased</option>
          <option value="desc">Decreasing</option>
        </select>
        
        <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#888' }}>
          {filteredSpecies.length} species
        </div>
      </div>

      {/* Species Grid/List */}
      <div style={gridContainerStyle}>
        {filteredSpecies.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
            <div>No matching species found for your filters</div>
          </div>
        ) : (
          filteredSpecies.map(species => (
            <div 
              key={species.id}
              style={speciesCardStyle}
              onClick={() => handleSpeciesSelect(species)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {species.image && (
                <img 
                  src={species.image} 
                  alt={species.name}
                  style={speciesImageStyle}
                />
              )}
              <div style={speciesInfoStyle}>
                <div style={speciesNameStyle}>{species.name}</div>
                <div style={speciesScientificStyle}>{species.scientificName}</div>
                <div style={speciesLocationStyle}>
                  📍 {species.location_name}
                </div>
                <div style={tagsContainerStyle}>
                  {species.isEndemic && (
                    <span style={{ ...tagStyle, backgroundColor: '#f39c12', color: '#fff' }}>
                      Endemic
                    </span>
                  )}
                  {species.threatStatus === 'threatened' && (
                    <span style={{ ...tagStyle, backgroundColor: '#e74c3c', color: '#fff' }}>
                      Under Threat
                    </span>
                  )}
                  {species.taxonomy?.class && (
                    <span style={{ ...tagStyle, backgroundColor: '#2ecc71', color: '#fff' }}>
                      {species.taxonomy.class}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Selected Species Modal */}
      {selectedSpecies && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <SpeciesCard 
            species={selectedSpecies} 
            onClose={handleCloseCard}
            isMobile={false}
          />
        </div>
      )}
    </div>
  );
};

export default SpeciesList; 
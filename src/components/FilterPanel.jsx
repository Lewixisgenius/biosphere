import { useState, useEffect } from 'react';

const FilterPanel = ({ speciesList, onFilterChange, isMobile = false }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all',
    threatStatus: 'all',
    searchTerm: '',
    showEndemic: false,
    showThreatened: false
  });

  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  // Extract unique categories and regions from species data
  useEffect(() => {
    if (speciesList.length > 0) {
      const uniqueCategories = [...new Set(speciesList.map(s => s.taxonomy?.class).filter(Boolean))];
      const uniqueRegions = [...new Set(speciesList.map(s => s.location_name?.split(',')[0]).filter(Boolean))];
      
      setCategories(uniqueCategories.sort());
      setRegions(uniqueRegions.sort());
    }
  }, [speciesList]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: 'all',
      region: 'all',
      threatStatus: 'all',
      searchTerm: '',
      showEndemic: false,
      showThreatened: false
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const panelStyle = {
    backgroundColor: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: isMobile ? '12px' : '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  };

  const sectionStyle = {
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    color: '#888',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600'
  };

  const selectStyle = {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none'
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    cursor: 'pointer'
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

  const statsStyle = {
    fontSize: '12px',
    color: '#666',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #333'
  };

  return (
    <div style={panelStyle}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>
          🔍 Filters
        </h3>
        <button 
          style={buttonStyle}
          onClick={clearFilters}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
        >
          Clear
        </button>
      </div>

      {/* Kategori Filtresi */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Categories</label>
        <select 
          style={selectStyle}
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Bölge Filtresi */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Regions</label>
        <select 
          style={selectStyle}
          value={filters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
        >
          <option value="all">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Tehdit Durumu */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Risk Status</label>
        <select 
          style={selectStyle}
          value={filters.threatStatus}
          onChange={(e) => handleFilterChange('threatStatus', e.target.value)}
        >
          <option value="all">All Species</option>
          <option value="endemic">Endemic Species</option>
          <option value="threatened">Under Threat</option>
          <option value="common">Common Species</option>
        </select>
      </div>

      {/* Metin Arama */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Search</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Species name or description..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        />
      </div>

      {/* Özel Filtreler */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Custom Filters</label>
        <div style={checkboxStyle}>
          <input
            type="checkbox"
            id="showEndemic"
            checked={filters.showEndemic}
            onChange={(e) => handleFilterChange('showEndemic', e.target.checked)}
          />
          <label htmlFor="showEndemic" style={{ color: '#fff', fontSize: '14px' }}>
            Only Endemic Species
          </label>
        </div>
        <div style={checkboxStyle}>
          <input
            type="checkbox"
            id="showThreatened"
            checked={filters.showThreatened}
            onChange={(e) => handleFilterChange('showThreatened', e.target.checked)}
          />
          <label htmlFor="showThreatened" style={{ color: '#fff', fontSize: '14px' }}>
            Only Threatened Species
          </label>
        </div>
      </div>

      {/* İstatistikler */}
      <div style={statsStyle}>
        <div>📊 Total: {speciesList.length} species</div>
        <div>🔍 Active Filters: {
          Object.values(filters).filter(v => v !== 'all' && v !== '' && v !== false).length
        }</div>
      </div>
    </div>
  );
};

export default FilterPanel; 
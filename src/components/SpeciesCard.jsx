import { useState, useEffect } from 'react';

const SpeciesCard = ({ species, onClose, isMobile = false }) => {
  const [wikiSummary, setWikiSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    if (species?.scientificName) {
      fetchWikiSummary(species.scientificName);
    }
  }, [species]);

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

  if (!species) return null;

  const cardStyle = {
    backgroundColor: '#1e1e1e',
    borderRadius: '12px',
    padding: '20px',
    margin: isMobile ? '10px' : '0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    border: '1px solid #333',
    overflow: 'hidden',
    maxHeight: isMobile ? '60vh' : '100%',
    overflowY: 'auto'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '24px', 
            color: '#fff',
            fontWeight: '600'
          }}>
            {species.name}
          </h2>
          <h3 style={{ 
            margin: '0', 
            fontSize: '16px', 
            color: '#888', 
            fontStyle: 'italic',
            fontWeight: '400'
          }}>
            {species.scientificName}
          </h3>
        </div>
        {!isMobile && (
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        )}
      </div>

      {species.image && (
        <div style={{ 
          marginBottom: '16px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <img
            src={species.image}
            alt={species.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      )}

      {species.taxonomy && (
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ 
            margin: '0 0 8px 0', 
            color: '#4ea8de',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Taksonomi
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '8px',
            fontSize: '12px'
          }}>
            {Object.entries(species.taxonomy).map(([key, value]) => (
              <div key={key} style={{ 
                backgroundColor: '#2a2a2a',
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid #444'
              }}>
                <div style={{ color: '#888', textTransform: 'capitalize' }}>{key}</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: '#4ea8de',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Konum Bilgileri
        </h4>
        <div style={{ 
          backgroundColor: '#2a2a2a',
          padding: '12px',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: '#888' }}>Konum:</strong> {species.location}
          </div>
          {species.observed_on && (
            <div>
              <strong style={{ color: '#888' }}>Gözlem Tarihi:</strong> {species.observed_on}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: '#4ea8de',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Açıklama
        </h4>
        <div style={{ 
          backgroundColor: '#2a2a2a',
          padding: '12px',
          borderRadius: '6px',
          lineHeight: '1.6',
          fontSize: '14px'
        }}>
          {loadingSummary ? (
            <div style={{ color: '#888', fontStyle: 'italic' }}>Özet yükleniyor...</div>
          ) : (
            <div style={{ whiteSpace: 'pre-line' }}>
              {wikiSummary || species.description || "Bu tür hakkında henüz açıklama bulunmuyor."}
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {species.wikipedia_url && (
          <a
            href={species.wikipedia_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#4ea8de',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3d8bc7'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4ea8de'}
          >
            📖 Vikipedi
          </a>
        )}
        
        {species.inaturalist_url && (
          <a
            href={species.inaturalist_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#2ecc71',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
          >
            🦋 iNaturalist
          </a>
        )}
      </div>
    </div>
  );
};

export default SpeciesCard; 
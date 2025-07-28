import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllSpecies } from '../services/api';

const SpeciesDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [observations, setObservations] = useState([]);
  const [relatedSpecies, setRelatedSpecies] = useState([]);

  useEffect(() => {
    const loadSpecies = async () => {
      setIsLoading(true);
      try {
        const allSpecies = await getAllSpecies();
        const foundSpecies = allSpecies.find(s => s.id === parseInt(id));
        
        if (foundSpecies) {
          setSpecies(foundSpecies);
          // Mock observations
          setObservations([
            {
              id: 1,
              user: 'Doğa Gözlemcisi',
              date: '2024-01-15',
              location: foundSpecies.location_name,
              photo: foundSpecies.image,
              verified: true,
              votes: 5,
              comment: 'Harika bir gözlem! Türü net bir şekilde görebiliyorum.'
            },
            {
              id: 2,
              user: 'Kuş Uzmanı',
              date: '2024-01-10',
              location: foundSpecies.location_name,
              photo: null,
              verified: false,
              votes: 2,
              comment: 'Bu türü daha önce bu bölgede görmemiştim.'
            }
          ]);
          
          // Mock related species
          setRelatedSpecies(allSpecies.filter(s => 
            s.id !== foundSpecies.id && 
            s.taxonomy?.family === foundSpecies.taxonomy?.family
          ).slice(0, 3));
        } else {
          navigate('/species');
        }
      } catch (error) {
        console.error("Tür yükleme hatası:", error);
        navigate('/species');
      } finally {
        setIsLoading(false);
      }
    };

    loadSpecies();
  }, [id, navigate]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#eee',
    padding: '20px'
  };

  const headerStyle = {
    marginBottom: '24px'
  };

  const backButtonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #444',
    color: '#888',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '16px',
    transition: 'all 0.2s'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#fff'
  };

  const scientificNameStyle = {
    fontSize: '18px',
    color: '#888',
    fontStyle: 'italic',
    marginBottom: '16px'
  };

  const imageContainerStyle = {
    position: 'relative',
    marginBottom: '24px'
  };

  const imageStyle = {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  const statusBadgeStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase'
  };

  const tabsContainerStyle = {
    display: 'flex',
    borderBottom: '1px solid #333',
    marginBottom: '24px'
  };

  const tabStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#888',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s'
  };

  const activeTabStyle = {
    ...tabStyle,
    color: '#4ea8de',
    borderBottomColor: '#4ea8de'
  };

  const contentStyle = {
    backgroundColor: '#1e1e1e',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #333'
  };

  const sectionStyle = {
    marginBottom: '24px'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '12px',
    borderBottom: '1px solid #333',
    paddingBottom: '8px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  };

  const infoCardStyle = {
    backgroundColor: '#2a2a2a',
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid #444'
  };

  const infoLabelStyle = {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px'
  };

  const infoValueStyle = {
    fontSize: '14px',
    color: '#fff',
    fontWeight: '500'
  };

  const observationsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const observationCardStyle = {
    backgroundColor: '#2a2a2a',
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid #444'
  };

  const observationHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  };

  const userStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4ea8de'
  };

  const dateStyle = {
    fontSize: '12px',
    color: '#888'
  };

  const verifiedBadgeStyle = {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600'
  };

  const unverifiedBadgeStyle = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600'
  };

  const relatedSpeciesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  };

  const relatedSpeciesCardStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '6px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '18px',
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

  if (!species) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          Tür bulunamadı
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <button 
          style={backButtonStyle}
          onClick={() => navigate('/species')}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#333';
            e.target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#888';
          }}
        >
          ← Türlere Dön
        </button>
        
        <h1 style={titleStyle}>{species.name}</h1>
        <div style={scientificNameStyle}>{species.scientificName}</div>
      </div>

      {/* Image */}
      <div style={imageContainerStyle}>
        {species.image && (
          <img src={species.image} alt={species.name} style={imageStyle} />
        )}
        {species.threatStatus === 'threatened' && (
          <span style={{ ...statusBadgeStyle, backgroundColor: '#e74c3c', color: '#fff' }}>
            Tehdit Altında
          </span>
        )}
        {species.isEndemic && (
          <span style={{ ...statusBadgeStyle, backgroundColor: '#f39c12', color: '#fff' }}>
            Endemik
          </span>
        )}
      </div>

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        <button 
          style={activeTab === 'overview' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('overview')}
        >
          Genel Bakış
        </button>
        <button 
          style={activeTab === 'habitat' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('habitat')}
        >
          Yaşam Alanı
        </button>
        <button 
          style={activeTab === 'observations' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('observations')}
        >
          Gözlemler ({observations.length})
        </button>
        <button 
          style={activeTab === 'conservation' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('conservation')}
        >
          Korunma Durumu
        </button>
        <button 
          style={activeTab === 'related' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('related')}
        >
          İlgili Türler
        </button>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        {activeTab === 'overview' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Temel Bilgiler</h3>
              <div style={gridStyle}>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Taksonomi</div>
                  <div style={infoValueStyle}>
                    {species.taxonomy?.kingdom} → {species.taxonomy?.phylum} → {species.taxonomy?.class} → {species.taxonomy?.order} → {species.taxonomy?.family} → {species.taxonomy?.genus}
                  </div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Habitat</div>
                  <div style={infoValueStyle}>{species.habitat || 'Bilinmiyor'}</div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Korunma Durumu</div>
                  <div style={infoValueStyle}>{species.conservationStatus || 'LC'}</div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Endemik</div>
                  <div style={infoValueStyle}>{species.isEndemic ? 'Evet' : 'Hayır'}</div>
                </div>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Açıklama</h3>
              <p style={{ lineHeight: '1.6', color: '#ccc' }}>
                {species.description || 'Bu tür hakkında detaylı açıklama bulunmuyor.'}
              </p>
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Dağılım</h3>
              <p style={{ lineHeight: '1.6', color: '#ccc' }}>
                Bu tür {species.location_name} bölgesinde gözlemlenmiştir. 
                {species.isEndemic ? ' Türkiye\'ye özgü endemik bir türdür.' : ' Türkiye\'de yaygın olarak bulunur.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'habitat' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Yaşam Alanı Haritası</h3>
              <div style={{ 
                backgroundColor: '#2a2a2a', 
                height: '300px', 
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888'
              }}>
                🗺️ Harita yükleniyor...
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Habitat Özellikleri</h3>
              <div style={gridStyle}>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Tercih Ettiği Habitat</div>
                  <div style={infoValueStyle}>{species.habitat || 'Bilinmiyor'}</div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Yükseklik Aralığı</div>
                  <div style={infoValueStyle}>0-2000m</div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>İklim Tercihi</div>
                  <div style={infoValueStyle}>Ilıman</div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Beslenme Alışkanlığı</div>
                  <div style={infoValueStyle}>Omnivor</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'observations' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Topluluk Gözlemleri</h3>
              <div style={observationsContainerStyle}>
                {observations.map((observation, idx) => (
                  <div key={observation.id} style={observationCardStyle}>
                    <div style={observationHeaderStyle}>
                      <div>
                        <div style={userStyle}>{observation.user}</div>
                        <div style={dateStyle}>{observation.date}</div>
                      </div>
                      <span style={observation.verified ? verifiedBadgeStyle : unverifiedBadgeStyle}>
                        {observation.verified ? 'Doğrulandı' : 'Doğrulanmadı'}
                      </span>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      📍 {observation.location}
                    </div>
                    <div style={{ color: '#ccc', fontSize: '14px' }}>
                      {observation.comment}
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        style={{
                          background: '#2a2a2a',
                          color: '#4ea8de',
                          border: '1px solid #4ea8de',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                        onClick={() => {
                          // Mock: increase votes
                          setObservations(prev => prev.map((o, i) => i === idx ? { ...o, votes: o.votes + 1 } : o));
                        }}
                      >
                        👍 Bu türdür ({observation.votes})
                      </button>
                      <button
                        style={{
                          background: 'transparent',
                          color: '#888',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          marginRight: '4px'
                        }}
                        onClick={() => {
                          // Mock: upvote
                          setObservations(prev => prev.map((o, i) => i === idx ? { ...o, votes: o.votes + 1 } : o));
                        }}
                        title="Onayla"
                      >
                        ▲
                      </button>
                      <button
                        style={{
                          background: 'transparent',
                          color: '#888',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          // Mock: downvote
                          setObservations(prev => prev.map((o, i) => i === idx ? { ...o, votes: Math.max(0, o.votes - 1) } : o));
                        }}
                        title="Onaylama"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conservation' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Korunma Durumu</h3>
              <div style={gridStyle}>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>IUCN Kategorisi</div>
                  <div style={infoValueStyle}>{species.conservationStatus || 'LC'}</div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Tehdit Seviyesi</div>
                  <div style={infoValueStyle}>
                    {species.threatStatus === 'threatened' ? 'Yüksek' : 'Düşük'}
                  </div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Koruma Önlemleri</div>
                  <div style={infoValueStyle}>
                    {species.threatStatus === 'threatened' ? 'Aktif koruma' : 'İzleme'}
                  </div>
                </div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>Popülasyon Trendi</div>
                  <div style={infoValueStyle}>Kararlı</div>
                </div>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Tehditler</h3>
              <ul style={{ color: '#ccc', lineHeight: '1.6' }}>
                <li>Habitat kaybı ve parçalanması</li>
                <li>İklim değişikliği</li>
                <li>Kirlilik</li>
                <li>İnsan aktiviteleri</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Koruma Önerileri</h3>
              <ul style={{ color: '#ccc', lineHeight: '1.6' }}>
                <li>Habitat koruma alanlarının genişletilmesi</li>
                <li>Çevre eğitimi programları</li>
                <li>Bilimsel araştırmaların desteklenmesi</li>
                <li>Yasal koruma önlemlerinin artırılması</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'related' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>İlgili Türler</h3>
              <div style={relatedSpeciesContainerStyle}>
                {relatedSpecies.map(related => (
                  <div 
                    key={related.id} 
                    style={relatedSpeciesCardStyle}
                    onClick={() => navigate(`/species/${related.id}`)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {related.image && (
                      <img 
                        src={related.image} 
                        alt={related.name}
                        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>
                        {related.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                        {related.scientificName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeciesDetail; 
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from '../components/Navigation';
import MapView from '../MapView';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#eee'
  };

  const heroStyle = {
    background: 'url(./earth.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: isMobile ? '40px 20px' : '80px 40px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const heroContentStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  };

  const titleStyle = {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '16px',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '16px' : '20px',
    color: '#e0e0e0',
    marginBottom: '32px',
    lineHeight: '1.6'
  };

  const ctaButtonsStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const primaryButtonStyle = {
    backgroundColor: '#4ea8de',
    color: '#fff',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    padding: '14px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };

  const featuresStyle = {
    padding: isMobile ? '40px 20px' : '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginTop: '48px'
  };

  const featureCardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid #333',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s'
  };

  const featureIconStyle = {
    fontSize: '48px',
    marginBottom: '16px'
  };

  const featureTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '12px'
  };

  const featureDescriptionStyle = {
    fontSize: '14px',
    color: '#ccc',
    lineHeight: '1.6'
  };

  const statsStyle = {
    backgroundColor: '#1e1e1e',
    padding: isMobile ? '40px 20px' : '60px 40px',
    textAlign: 'center'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: '32px',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const statCardStyle = {
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#4ea8de',
    marginBottom: '8px'
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const mapSectionStyle = {
    padding: isMobile ? '20px' : '40px'
  };

  const sectionTitleStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '16px'
  };

  const sectionSubtitleStyle = {
    fontSize: '16px',
    color: '#888',
    textAlign: 'center',
    marginBottom: '32px'
  };

  return (
    <div style={containerStyle}>
      <Navigation isMobile={isMobile} />
      
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroContentStyle}>
          <h1 style={titleStyle}>
            🌍 Discover the World's Biological Diversity
          </h1>
          <p style={subtitleStyle}>
            Explore the world's rich flora and fauna on a map, 
            share your observations, and contribute to nature conservation efforts.
          </p>
          <div style={ctaButtonsStyle}>
            <Link
              to="/map"
              style={primaryButtonStyle}
              onMouseOver={e => e.target.style.backgroundColor = '#3d8bc7'}
              onMouseOut={e => e.target.style.backgroundColor = '#4ea8de'}
            >
              🗺️ Discover the Map
            </Link>
            <Link
              to="/species"
              style={secondaryButtonStyle}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#1e3c72';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fff';
              }}
            >
              🦋 Explore Types
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresStyle}>
        <h2 style={sectionTitleStyle}>Features</h2>
        <p style={sectionSubtitleStyle}>
          What can you do with the Biosphere Map?
        </p>
        
        <div style={featuresGridStyle}>
          <div 
            style={featureCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>🗺️</div>
            <h3 style={featureTitleStyle}>Interactive Map</h3>
            <p style={featureDescriptionStyle}>
              Discover species from all regions of the world on an interactive map.
            </p>
          </div>

          <div 
            style={featureCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>📝</div>
            <h3 style={featureTitleStyle}>Sharing Observations</h3>
            <p style={featureDescriptionStyle}>
              Share your observations and have them verified by the community.  
            </p>
          </div>

          <div 
            style={featureCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>🏆</div>
            <h3 style={featureTitleStyle}>Badge System</h3>
            <p style={featureDescriptionStyle}>
              Earn badges for your contributions and level up. Coming soon.
            </p>
          </div>

          <div 
            style={featureCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>🔍</div>
            <h3 style={featureTitleStyle}>Advanced Filtering</h3>
            <p style={featureDescriptionStyle}>
              Filter by criteria such as type, region, and threat status.
            </p>
          </div>

          <div 
            style={featureCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>📊</div>
            <h3 style={featureTitleStyle}>Data Analysis</h3>
            <p style={featureDescriptionStyle}>
              Detailed analyses of species distributions and population trends. Coming soon.
            </p>
          </div>

          <div 
            style={featureCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>🌍</div>
            <h3 style={featureTitleStyle}>Multilingual Support</h3>
            <p style={featureDescriptionStyle}>
              International access with English and other language support. Coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={statsStyle}>
        <h2 style={sectionTitleStyle}>Platform Statistics</h2>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>100+</div>
            <div style={statLabelStyle}>Species</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>100+</div>
            <div style={statLabelStyle}>Observation</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>50+</div>
            <div style={statLabelStyle}>User</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>25+</div>
            <div style={statLabelStyle}>Region</div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;


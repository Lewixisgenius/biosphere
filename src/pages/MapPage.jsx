import Navigation from '../components/Navigation';
import MapView from '../MapView';
import { useState, useEffect } from 'react';

const MapPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#121212' }}>
      <Navigation isMobile={isMobile} />
      <div style={{ height: 'calc(100vh - 64px)', minHeight: 400 }}>
        <MapView />
      </div>
    </div>
  );
};

export default MapPage; 
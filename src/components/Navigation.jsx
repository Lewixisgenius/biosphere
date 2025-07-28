import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react';

const Navigation = ({ isMobile = false }) => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage();
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#1e1e1e',
    borderBottom: '1px solid #333',
    padding: isMobile ? '12px 16px' : '16px 24px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  };

  const navContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const logoStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#4ea8de',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '12px' : '24px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navLinkStyle = {
    color: '#888',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    color: '#4ea8de',
    backgroundColor: '#2a2a2a'
  };

  const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const languageSelectStyle = {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    border: '1px solid #444',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    outline: 'none',
    cursor: 'pointer'
  };

  const profileButtonStyle = {
    backgroundColor: '#4ea8de',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const mobileMenuStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #333'
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/map', label: 'Map', icon: '🗺️' },
    { path: '/species', label: 'Species', icon: '🦋' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <Link to="/" style={logoStyle}>
          🌍 {'Biosphere'}
        </Link>

        {!isMobile && (
          <ul style={navLinksStyle}>
            {navItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  style={isActive(item.path) ? activeNavLinkStyle : navLinkStyle}
                  onMouseOver={(e) => !isActive(item.path) && (e.target.style.backgroundColor = '#2a2a2a')}
                  onMouseOut={(e) => !isActive(item.path) && (e.target.style.backgroundColor = 'transparent')}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div style={controlsStyle}>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button style={profileButtonStyle}>Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button style={{ ...profileButtonStyle, background: '#2ecc71', marginLeft: 8 }}>
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>

      {isMobile && (
        <div style={mobileMenuStyle}>
          <ul style={{ ...navLinksStyle, flexDirection: 'column', gap: '8px' }}>
            {navItems.map(item => (
              <li key={item.path} style={{ width: '100%' }}>
                <Link 
                  to={item.path} 
                  style={{
                    ...(isActive(item.path) ? activeNavLinkStyle : navLinkStyle),
                    width: '100%',
                    justifyContent: 'flex-start'
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

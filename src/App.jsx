import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import SpeciesList from './pages/SpeciesList';
import SpeciesDetail from './pages/SpeciesDetail';
import UserProfile from './components/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Data from './pages/data';

export default function App() {
  return (

    <LanguageProvider>
      <AuthProvider>
        
        <Router>

          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/species" element={<SpeciesList />} />
              <Route path="/species/:id" element={<SpeciesDetail />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

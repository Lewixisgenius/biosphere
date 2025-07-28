import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('biosphere-user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock: any email/pass accepted
    const mockUser = { email, username: email.split('@')[0], id: 1 };
    setUser(mockUser);
    localStorage.setItem('biosphere-user', JSON.stringify(mockUser));
    return true;
  };

  const register = (email, password, username) => {
    // Mock: always success
    const mockUser = { email, username, id: 1 };
    setUser(mockUser);
    localStorage.setItem('biosphere-user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('biosphere-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 
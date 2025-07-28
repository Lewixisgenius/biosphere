import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setError('Tüm alanlar gereklidir');
      return;
    }
    const success = register(email, password, username);
    if (success) {
      navigate('/');
    } else {
      setError('Kayıt başarısız');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#121212' }}>
      <Navigation />
      <div style={{ maxWidth: 400, margin: '60px auto', background: '#1e1e1e', borderRadius: 12, padding: 32, boxShadow: '0 4px 16px #0002' }}>
        <h2 style={{ color: '#fff', marginBottom: 24 }}>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #444', background: '#222', color: '#fff' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #444', background: '#222', color: '#fff' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #444', background: '#222', color: '#fff' }}
            />
          </div>
          {error && <div style={{ color: '#e74c3c', marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={{ width: '100%', background: '#4ea8de', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            Kayıt Ol
          </button>
        </form>
        <div style={{ marginTop: 16, color: '#888', fontSize: 14 }}>
          Zaten hesabınız var mı? <Link to="/login" style={{ color: '#4ea8de' }}>Giriş Yap</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/icons/Logo Placeholder.svg';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('لطفاً ایمیل و رمز عبور را وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      if (email === 'admin' && password === '123456789') {
        const fakeToken = 'fake-jwt-token';

        const userData = {
          email,
          name: 'مدیر سیستم',
          role: 'admin',
        };

        // login
        login(fakeToken, userData);

        // برای toast خوش‌آمدگویی
        sessionStorage.setItem('welcome', JSON.stringify({ name: userData.name }));

        // انتقال
        navigate('/dashboard');
      } else {
        setError('ایمیل یا رمز عبور اشتباه است');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="sing-in">
        <img src={Logo} alt="لوگو" />

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <span>ایمیل</span>
          </label>

          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            disabled={isLoading}
          />

          <label htmlFor="password">
            <span>رمز ورود</span>
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isLoading}
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// src/pages/Login/Login.jsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async ({ username, password }) => {
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      if (username === 'admin' && password === '123456789') {
        const fakeToken = 'fake-jwt-token';
        const userData = { username, name: 'مدیر سیستم', role: 'admin' };
        login(fakeToken, userData);
        navigate('/dashboard');
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Login;

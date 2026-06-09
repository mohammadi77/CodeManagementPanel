// src/components/LoginForm/LoginForm.jsx
import { useState } from 'react';
import Logo from '../../assets/icons/Logo Placeholder.svg';
import './LoginForm.css';

function LoginForm({ onSubmit, isLoading, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <div className="sing-in">
      <img src={Logo} alt="لوگو" />

      <form onSubmit={handleSubmit}>
        <label>
          <span>ایمیل</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            disabled={isLoading}
          />
        </label>

        <label>
          <span>رمز ورود</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isLoading}
          />
        </label>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

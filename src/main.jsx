import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // اضافه کن
import './assets/styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/CodeManagementPanel">
      <AuthProvider>
        {' '}
        {/* محافظت از کل برنامه */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

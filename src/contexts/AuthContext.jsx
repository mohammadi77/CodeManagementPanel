import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // بررسی وجود توکن در localStorage هنگام بارگذاری اولیه
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // در اینجا می‌توانید اعتبار توکن را با سرور بررسی کنید (اختیاری)
      setIsAuthenticated(true);
      setUser({ name: 'کاربر' }); // اطلاعات کاربر را از توکن یا state بگیرید
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // کاربر وارد نشده → به صفحه لاگین هدایت شود
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;

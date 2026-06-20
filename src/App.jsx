import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import TransactionList from './pages/TransactionList/TransactionList';
import { TransactionProvider } from './contexts/TransactionContext';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TransactionProvider>
      <Routes>
        {/* صفحه لاگین خارج از MainLayout */}
        <Route path="/login" element={<Login />} />

        {/* مسیرهای محافظت شده */}
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <TransactionList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Toast باید اینجا باشه */}
      <ToastContainer position="top-right" />
    </TransactionProvider>
  );
}

export default App;

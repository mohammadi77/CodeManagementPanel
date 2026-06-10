import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import TransactionList from './pages/TransactionList/TransactionList';
import { TransactionProvider } from './contexts/TransactionContext';
import ProtectedRoute from './components/ProtectedRoute'; // اضافه کن

function App() {
  return (
    <TransactionProvider>
      <Routes>
        {/* صفحه لاگین خارج از MainLayout (بدون احراز هویت) */}
        <Route path="/Login" element={<Login />} />

        {/* مسیرهای محافظت شده داخل MainLayout */}
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
        </Route>

        {/* صفحه 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TransactionProvider>
  );
}

export default App;

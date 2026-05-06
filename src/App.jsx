import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import SingIn from "./pages/SingIn/SingIn";
import TransactionList from "./pages/TransactionList/TransactionList";
import { TransactionProvider } from "./constants/TransactionContext";
import "./App.css";

function App() {
  return (
    <TransactionProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signin" element={<SingIn />} />
          <Route path="*" element={<NotFound />} />
          <Route path="transactionlist" element={<TransactionList />} />
        </Route>
      </Routes>
    </TransactionProvider>
  );
}

export default App;

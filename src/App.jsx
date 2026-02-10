import { useEffect, useState } from "react";
import TransactionList from "./pages/TransactionList/TransactionList";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import SingIn from "./pages/SingIn/SingIn";

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("transactions");
    return savedData ? JSON.parse(savedData) : [];
  });

  const dataAdd = (formData) => {
    const newData = {
      date: formData.date,
      income: Number(formData.income) || 0,
      cost: Number(formData.cost) || 0,
      description: formData.description,
    };

    setData((prevData) => [newData, ...prevData]);
  };

  const dataDelete = (id) => {
    setData((prevData) => prevData.filter((_, index) => index !== id));
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signin" element={<SingIn />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="transactionlist"
          element={
            <TransactionList
              data={data}
              dataDelete={dataDelete}
              dataAdd={dataAdd}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

import { useEffect, useState } from "react";
import TransactionList from "./pages/TransactionList/TransactionList";
import Dashboard from "./pages/Dashboard/Dashboard";
import Undefined from "./pages/Undefined/Undefined";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";

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
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route
            path="TransactionList"
            element={
              <TransactionList
                data={data}
                dataDelete={dataDelete}
                dataAdd={dataAdd}
              />
            }
          />{" "}
          <Route path="Dashboard" element={<Dashboard />} />{" "}
          <Route path="*" element={<Undefined />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

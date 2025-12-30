import React, { useEffect } from "react";
import { useState } from "react";
import TransactionList from "./pages/TransactionList/TransactionList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("transactions");
    return savedData ? JSON.parse(savedData) : [];
  });

  const dataDelete = (id) => {
    setData(data.filter((_, i) => i !== id));
  };
  const dataAdd = (formData) => {
    const newData = {
      date: formData.date,
      income: formData.income || 0,
      cost: formData.cost || 0,
      description: formData.description,
    };

    setData((prevData) => [...prevData, newData]);
  };
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div className="container">
        <TransactionList
          data={data}
          dataDelete={dataDelete}
          dataAdd={dataAdd}
        />
      </div>
    </>
  );
}

export default App;

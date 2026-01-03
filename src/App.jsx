import { useEffect, useState } from "react";
import TransactionList from "./pages/TransactionList/TransactionList";
import "./App.css";
import {
  getInitialData,
  addTransaction,
  deleteTransaction,
} from "./contest/Transaction";

function App() {
  const [data, setData] = useState(getInitialData);

  const dataAdd = (formData) => {
    addTransaction(setData, formData);
  };

  const dataDelete = (id) => {
    deleteTransaction(setData, id);
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  return (
    <div className="container">
      <TransactionList data={data} dataDelete={dataDelete} dataAdd={dataAdd} />
    </div>
  );
}

export default App;

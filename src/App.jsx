import React from "react";
// import Dashbord from "./pages/dashbord/dashbord";
import TransactionList from "./pages/TransactionList/TransactionList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
function App() {
  return (
    <>
      <div className="container">
        <TransactionList />
      </div>{" "}
    </>
  );
}

export default App;

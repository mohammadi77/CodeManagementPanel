import { useState } from "react";
import TransactionList from "./layout/TransactionList/TransactionList.jsx";
import "./Home.css";
function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="div-Home">
      <TransactionList />
    </div>
  );
}

export default Home;

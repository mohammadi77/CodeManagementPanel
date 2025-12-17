import TransactionList from "./pages/TransactionList/TransactionList";
import "./Home.css";
function Home() {
  return (
    <div className="container">
      <div className="div-Home">
        <TransactionList />
      </div>
    </div>
  );
}

export default Home;

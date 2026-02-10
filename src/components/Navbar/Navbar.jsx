import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import Logo from "../../assets/icons/Logo.svg"; // ⚡ Import عکس
function Navbar() {
  return (
    <nav className="nav">
      <div id="icon">
        <img src={Logo} alt="" />
      </div>
      <div id="nav">
        <ul>
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              داشبورد{" "}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="transactionList"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              لیست هزینه‌ها
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

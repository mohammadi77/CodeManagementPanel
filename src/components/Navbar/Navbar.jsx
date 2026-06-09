import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';
import Logo from '../../assets/icons/Logo.svg';
import Out from '../../assets/icons/mingcute_exit-line.svg';

function Navbar() {
  const { isAuthenticated, logout } = useAuth(); // فقط یک بار

  return (
    <nav className="nav">
      <div id="icon">
        <img src={Logo} alt="" />
      </div>
      <div id="nav">
        <ul>
          <li>
            <NavLink to="dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              داشبورد
            </NavLink>
          </li>
          <li>
            <NavLink to="transactionList" className={({ isActive }) => (isActive ? 'active' : '')}>
              لیست هزینه‌ها
            </NavLink>
          </li>
        </ul>{' '}
        {isAuthenticated && <img src={Out} alt="" onClick={logout} className="logout-btn" />}
      </div>
    </nav>
  );
}

export default Navbar;

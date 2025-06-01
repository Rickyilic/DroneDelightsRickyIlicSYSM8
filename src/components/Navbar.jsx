import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Logo.png";

function Navbar() {
  return (
      <>
        <div className="navbar-logo">
          <img src={logo} alt="Drone Delights logo" className="logo" />
        </div>

          <nav className="navbar">
              <ul className="navbar-links">
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/menu">Meny</Link></li>
                <li><Link to="/cart">Varukorg</Link></li>
                <li><Link to="/checkout">Betalning</Link></li>
              </ul>
          </nav>
      </>
  );
}

export default Navbar;
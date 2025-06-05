import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Logo.png";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



function Navbar() {   // Navbar visar navigationsmenyn högst upp på sidan
  const { totalItems } = useContext(CartContext); // Hämtar total antal varor i varukorgen från CartContext
  return (
      <>
        <div className="navbar-logo">
          <img src={logo} alt="Drone Delights logo" className="logo" />
        </div>

          <nav className="navbar">
              <ul className="navbar-links">
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/menu">Meny</Link></li>
                <li><Link to="/cart">🛒 Varukorg {totalItems > 0 && <span className="cart-count">{totalItems}</span>}</Link></li>
                <li><Link to="/checkout">Betalning</Link></li>
              </ul>
          </nav>
      </>
  );
}

export default Navbar;
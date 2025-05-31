import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h1>Din varukorg</h1>

      {cartItems.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>

                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                    <p>Totalt: {item.price * item.quantity} kr</p>

                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        
            <div className="cart-summary">
                <h2>Totalt: {total} kr</h2>
                <button className="clear-btn" onClick={clearCart}>Töm varukorgen</button>
                <Link to="/checkout" className="checkout-btn">Gå till kassan</Link>
            </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
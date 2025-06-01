import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";


function Cart() {
    // Vi hämtar varukorgens data och funktioner från CartContext
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

    // Hook för att navigera till en annan sida
  const navigate = useNavigate();

    // Räknar ut totalsumman
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h1>Din varukorg</h1>
        
        {/* Om varukorgen är tom visas detta */}
      {cartItems.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <div className="cart-content">
            {/* Lista med produkter i varukorgen */}
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>

                    {/* Knapp för att öka/minska kvantitet */}
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                    {/* Totalt pris för den specifika produkten */}
                    <p>Totalt: {item.price * item.quantity} kr</p>

                    {/* Ta bort produkt från varukorgen */}
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
            
            {/* Sammanfattning av varukorgen */}
            <div className="cart-summary">
                <h2>Totalt: {total} kr</h2>

                {/* Tömmer hela varukorgen */}
                <button className="clear-btn" onClick={clearCart}>Töm varukorgen</button>
                
                {/* Navigerar till checkout-sidan */}
                 <button className="checkout-btn" onClick={() => navigate("/checkout")}> Gå till betalning</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
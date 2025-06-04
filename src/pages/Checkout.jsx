import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {

  const { cartItems, clearCart } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    paymentMethod: "swish",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.city || !form.address) {
      alert("Fyll i alla fält!");
      return;
    }
  
 
    const orderData = { 
    ...form,
    cartItems,
    total 
  };

  // Skickar beställningen till servern
  fetch("http://localhost:3001/orders", { 
    method: "POST", // Använder POST-metoden för att skicka data
    headers: {
      "Content-Type": "application/json" // Anger att vi skickar JSON-data
    },
    body: JSON.stringify(orderData) // Skickar orderdata som JSON
  }) 
  .then(res => { 
      if (!res.ok) throw new Error("Något gick fel vid beställning."); // Kollar om svaret är okej
      return res.json(); // Omvandlar svaret till JSON
    })
  .then(data => {
      console.log("Beställning lyckades:", data); // Loggar bekräftelse från servern
      alert("Din beställning har skickats!"); // Visar en bekräftelse till användaren
      clearCart(); // Tömmer varukorgen efter beställning
      navigate("/confirmation"); // Navigerar till bekräftelsesidan
    })
  .catch(error => {
      console.error("Fel vid beställning:", error);  // Loggar felmeddelandet
      alert("Något gick fel. Försök igen senare.");   // Visar ett användarvänligt felmeddelande
    });
};

  return (
    <div className="checkout">
      <h1>Betalning</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
        {cartItems.length > 0 && (
        <div className="checkout-summary">
            <h2>Din beställning:</h2>
            <ul>
            {cartItems.map(item => (
                <li key={item.id}>
                {item.name} × {item.quantity} – {item.price * item.quantity} kr
                </li>
            ))}
            </ul>
            <h3>Totalt att betala: {total} kr</h3>
        </div>
        )}
        <label>
          Namn:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Stad:
          <input type="text" name="city" value={form.city} onChange={handleChange} required />
        </label>
        <label>
          Adress:
          <input type="text" name="address" value={form.address} onChange={handleChange} required />
        </label>

        <label>
          Betalningsmetod:
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option value="swish">Swish</option>
            <option value="card">Kontokort</option>
          </select>
        </label>

        <button type="submit" className="confirm-btn">Bekräfta beställning</button>
      </form>
    </div>
  );
}

export default Checkout;
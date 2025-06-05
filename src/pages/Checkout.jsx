import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() { // Checkout-komponenten hanterar betalningsprocessen


  const { cartItems, clearCart } = useContext(CartContext); // Använder CartContext för att få tillgång till varukorgens innehåll och tömningsfunktion
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Beräknar totalbeloppet för varukorgen genom att summera varje items pris multiplicerat med dess kvantitet
  const navigate = useNavigate(); // useNavigate används för att navigera till andra sidor i applikationen

  const [form, setForm] = useState({ // State för att hantera formulärets data
    name: "",
    city: "",
    address: "",
    paymentMethod: "swish",
  });

  const handleChange = (e) => { // Funktion som uppdaterar formulärets state när användaren skriver i fälten
    setForm({ ...form, [e.target.name]: e.target.value });  // Uppdaterar det specifika fältet i formuläret baserat på användarens inmatning
  }

  const handleSubmit = (e) => { // Funktion som hanterar formulärets inlämning
    e.preventDefault(); // Förhindrar att sidan laddas om när formuläret skickas

    if (!form.name || !form.city || !form.address) { // Kollar om alla obligatoriska fält är ifyllda
      alert("Fyll i alla fält!"); 
      return;
    }
  
 
    const orderData = {  // Skapar ett objekt med beställningsdata som ska skickas till servern
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
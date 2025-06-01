import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    paymentMethod: "swish",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.city || !form.address) {
      alert("Fyll i alla fält!");
      return;
    }

    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="checkout">
      <h1>Betalning</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
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
import { useEffect, useState, useContext } from 'react';
import "./Menu.css";
import { CartContext } from "../context/CartContext";

// Funktionell komponent för menyn
function Menu() {
  // State för att lagra produkter och filtrerade produkter
  const [products, setProducts] = useState([]);
  // State för att lagra filtrerade produkter
  const [filtered, setFiltered] = useState([]);
  // State för att lagra aktivt filter
  const [activeFilter, setActiveFilter] = useState("alla");

  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
  // Hämtar produkter från API:et och sorterar dem efter kategori
  fetch("http://localhost:3001/products")
    .then(res => res.json())
    .then(data => {
  // Sorterar produkterna i rätt ordning (huvudrätt → dryck → efterrätt)
  const categoryOrder = ["huvudrätt", "dryck", "efterrätt"];
  const sorted = [...data].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );
  setProducts(sorted); // Sparar sorterade produkter
  setFiltered(sorted); // Visar dem direkt vid start
});
}, []);

  // Funktion som filtrerar produkterna när man klickar på en knapp
  const filterByCategory = (category) => {
  if (category === "alla") {
    // Om "Alla" väljs, sortera och visa allt
    const categoryOrder = ["huvudrätt", "dryck", "efterrätt"];
    const sorted = [...products].sort(
      (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    );
    setFiltered(sorted);
  } else {
    // Annars filtrera produkterna på vald kategori
    setFiltered(products.filter((item) => item.category === category));
  }
  setActiveFilter(category); // Markera knappen som aktiv
};

  return (
    <div className="menu">
      <h1>Vår Meny</h1>

      {/* Filterknappar för att visa olika kategorier */} 
      <div className="filter-buttons">
        <button onClick={() => filterByCategory("alla")} className={activeFilter === "alla" ? "active" : ""}>Alla</button>
        <button onClick={() => filterByCategory("huvudrätt")} className={activeFilter === "huvudrätt" ? "active" : ""}>Huvudrätter</button>
        <button onClick={() => filterByCategory("dryck")} className={activeFilter === "dryck" ? "active" : ""}>Drycker</button>
        <button onClick={() => filterByCategory("efterrätt")} className={activeFilter === "efterrätt" ? "active" : ""}>Efterrätter</button>
      </div>

      {/* Här visas produkterna i ett rutnät */}
      <div className="menu-grid">
        {filtered.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} />

            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="product-price">{item.price} kr</p>
              <button className="add-btn" onClick={() => addToCart(item)}>Lägg till i varukorg</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
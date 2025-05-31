import { useEffect, useState } from 'react';
import "./Menu.css";


function Menu() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("alla");
  
  useEffect(() => {
  fetch("http://localhost:3001/products")
    .then(res => res.json())
    .then(data => {
  const categoryOrder = ["huvudrätt", "dryck", "efterrätt"];
  const sorted = [...data].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );
  setProducts(sorted);
  setFiltered(sorted);
});
}, []);

  const filterByCategory = (category) => {
  if (category === "alla") {
    const categoryOrder = ["huvudrätt", "dryck", "efterrätt"];
    const sorted = [...products].sort(
      (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    );
    setFiltered(sorted);
  } else {
    setFiltered(products.filter((item) => item.category === category));
  }
  setActiveFilter(category);
};

  return (
    <div className="menu">
      <h1>Vår Meny</h1>
      <div className="filter-buttons">
        <button onClick={() => filterByCategory("alla")} className={activeFilter === "alla" ? "active" : ""}>Alla</button>
        <button onClick={() => filterByCategory("huvudrätt")} className={activeFilter === "huvudrätt" ? "active" : ""}>Huvudrätter</button>
        <button onClick={() => filterByCategory("dryck")} className={activeFilter === "dryck" ? "active" : ""}>Drycker</button>
        <button onClick={() => filterByCategory("efterrätt")} className={activeFilter === "efterrätt" ? "active" : ""}>Efterrätter</button>
      </div>

      <div className="menu-grid">
        {filtered.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} />

            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.price} kr</p>
              <button className="add-btn">Lägg till i varukorg</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
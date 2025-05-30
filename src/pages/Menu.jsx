import { useEffect, useState } from 'react';

function Menu() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = filter
    ? products.filter(p => p.category === filter)
    : products;

  return (
    <div>
      <h2>Vår meny</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('')}>Alla</button>
        <button onClick={() => setFilter('huvudrätt')}>Huvudrätter</button>
        <button onClick={() => setFilter('dryck')}>Drycker</button>
        <button onClick={() => setFilter('efterrätt')}>Efterrätter</button>
      </div>

      <ul>
        {filteredProducts.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.price} kr
            <br />
            <em>{p.category}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
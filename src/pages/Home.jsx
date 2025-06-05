import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Home.css";

function Home() {
  const [popular, setPopular] = useState([]); 
  const { addToCart } = useContext(CartContext);    

  useEffect(() => { // Hämtar populära produkter från API:et
    fetch("http://localhost:3001/products?popular=true")  // Anropar API:et för att hämta produkter som är populära
      .then((res) => res.json()) // Omvandlar svaret till JSON
      .then((data) => setPopular(data)) // Sparar de populära produkterna i state
      .catch((err) => console.error(err)); // Hanterar eventuella fel vid hämtning
  }, []);

  const popularMain = popular.filter(p => p.category === "huvudrätt");  
  const popularDrinks = popular.filter(p => p.category === "dryck");  
  const popularDesserts = popular.filter(p => p.category === "efterrätt");  
  // Filtrerar de populära produkterna baserat på deras kategori

  return (
    <div className="home">
      <div className="hero-text">
        <h1>Välkommen till <span>Drone Delights!</span></h1>
        <p>Mat på minuter • Schysta priser • Levererat med drönare</p>
      </div>

      {/* Huvudrätter */}
      {popularMain.length > 0 && (
        <>
        <div className="product-section">
          <h2>Populära rätter</h2>
          <div className="popular-products">
            {popularMain.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>
                  <button onClick={() => addToCart(item)}>Lägg till i varukorg</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}

      {/* Drycker */}
      {popularDrinks.length > 0 && (
        <>
        <div className="product-section">
          <h2>Populära drycker</h2>
          <div className="popular-products">
            {popularDrinks.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>
                  <button onClick={() => addToCart(item)}>Lägg till i varukorg</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}

      {/* Efterrätter */}
      {popularDesserts.length > 0 && (
        <>
        <div className="product-section">
          <h2>Populära efterrätter</h2>
          <div className="popular-products">
            {popularDesserts.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>
                  <button onClick={() => addToCart(item)}>Lägg till i varukorg</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default Home;
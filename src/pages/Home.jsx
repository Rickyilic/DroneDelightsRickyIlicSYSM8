import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products?popular=true")
      .then((res) => res.json())
      .then((data) => setPopular(data))
      .catch((err) => console.error(err));
  }, []);

  const popularMain = popular.filter(p => p.category === "huvudrätt");
  const popularDrinks = popular.filter(p => p.category === "dryck");
  const popularDesserts = popular.filter(p => p.category === "efterrätt");

  return (
    <div className="home">
      <h1>Välkommen till Drone Delights!</h1>
      <p>Mat på minuter! - För schysta priser! - Levererat hem till dig med drönare! 🚁</p>

      {/* Huvudrätter */}
      {popularMain.length > 0 && (
        <>
          <h2>Populära rätter</h2>
          <div className="popular-products">
            {popularMain.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Drycker */}
      {popularDrinks.length > 0 && (
        <>
          <h2>Populära drycker</h2>
          <div className="popular-products">
            {popularDrinks.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Efterrätter */}
      {popularDesserts.length > 0 && (
        <>
          <h2>Populära efterrätter</h2>
          <div className="popular-products">
            {popularDesserts.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.price} kr</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
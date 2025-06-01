import { Link } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  return (
    <div className="confirmation">
      <h1>Beställning genomförd!</h1>
      <p>Tack för din beställning hos Drone Delights. Din mat är på väg med drönare!</p>
      
      <Link to="/" className="home-btn">Till startsidan</Link>
    </div>
  );
}

export default Confirmation;
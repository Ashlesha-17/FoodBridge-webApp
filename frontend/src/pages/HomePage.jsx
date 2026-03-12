import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      <div className="hero">
        <h1>FoodBridge</h1>
        <p>Connecting surplus food with people who need it</p>
      </div>

      <div className="card-container">

        <div className="card">
          <h2>Register as NGO</h2>
          <p>Receive food donations and help communities.</p>
          <button onClick={() => navigate("/signup", { state: { role: "NGO" } })}>
            Register NGO
          </button>
        </div>

        <div className="card">
          <h2>Register as Donor</h2>
          <p>Donate excess food and reduce waste.</p>
          <button onClick={() => navigate("/signup", { state: { role: "Donor" } })}>
            Register Donor
          </button>
        </div>

      </div>

      <div className="login-section">
        <button className="login-btn" onClick={() => navigate("/login")}>
          Already have an account? Login
        </button>
      </div>

    </div>
  );
}

export default HomePage;
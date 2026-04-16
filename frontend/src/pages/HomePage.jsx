import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">FoodBridge</h2>
        <ul className="nav-links">
          <li>Our Story</li>
          <li>Ripples of Change</li>
          <li>Raise a Concern</li>
          <li>Reach Us</li>
        </ul>
      </nav>

      {/* Hero */}
      <div className="hero">
        <h1>FoodBridge</h1>
        <p>Where every extra meal finds a home</p>
      </div>

      {/* Cards */}
      <div className="card-container">

        <div className="card">
          <h2>Be a Helping Hand</h2>
          <p>Join as an NGO and bring hope to those in need.</p>
          <button onClick={() => navigate("/signup", { state: { role: "NGO" } })}>
            Join as NGO
          </button>
        </div>

        <div className="card">
          <h2>Share Your Kindness</h2>
          <p>Donate surplus food and make someone’s day better.</p>
          <button onClick={() => navigate("/signup", { state: { role: "Donor" } })}>
            Join as Donor
          </button>
        </div>

      </div>

      {/* Login */}
      <div className="login-section">
        <button className="login-btn" onClick={() => navigate("/login")}>
          Already have an account, Login here!
        </button>
      </div>

    </div>
  );
}

export default HomePage;
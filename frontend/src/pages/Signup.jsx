import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "Donor";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        role,
      });

      console.log("Signup response:", response.data);
      alert(`Registered successfully as ${role}!`);
      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);

      if (err.response) {
        alert(err.response.data?.message || "Registration failed.");
      } else if (err.request) {
        alert("Server not responding. Please try again later.");
      } else {
        alert("An error occurred. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        <h1>Signup ({role})</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Signup;
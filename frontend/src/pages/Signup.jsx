import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "Donor"; // default Donor if nothing passed

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
        // Server responded with a status code outside 2xx
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        alert(err.response.data?.message || "Registration failed. Please check your input.");
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        alert("Server not responding. Please try again later.");
      } else {
        // Something else went wrong
        console.error("Error message:", err.message);
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Signup ({role})</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        /><br/>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            width: "100%",
            background: "#2ecc71",
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend login route
      const res = await axios.post("http://localhost:5000/api/login", { email, password });

      const { token, role } = res.data;

      // Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);

      alert("Login successful!");

      // Navigate based on role
      if (role === "NGO") {
        navigate("/ngo");
      } else if (role === "Donor") {
        navigate("/donor");
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      alert("Login failed! Check email and password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={{ padding: "10px 20px" }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

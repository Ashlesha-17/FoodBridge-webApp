import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token, role, userId } = res.data;

      // ✅ Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);

      alert("Login successful 🎉");

      // ✅ Redirect based on role
      if (role === "NGO") {
        navigate("/ngo");
      } else if (role === "Donor") {
        navigate("/donor");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Server error. Try again later.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;
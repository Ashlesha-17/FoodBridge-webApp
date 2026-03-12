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
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      const { token, role, userId } = res.data;

      if (!token || !role || !userId) {
        console.error("Missing fields in response:", res.data);
        alert("Server returned incomplete data. Please check backend.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", userId);

      alert("Login successful!");

      if (role === "NGO") {
        navigate("/ngo");
      } else if (role === "Donor") {
        navigate("/donor");
      } else {
        navigate("/");
      }
    } catch (err) {
      // Detailed error logging
      if (err.response) {
        // Server responded with a status code outside 2xx
        console.error("Login error response:", err.response.data);
        console.error("Status:", err.response.status);
        alert(err.response.data?.message || "Login failed! Check email and password.");
      } else if (err.request) {
        // Request was made but no response
        console.error("No response from server:", err.request);
        alert("Server not responding. Please try again later.");
      } else {
        // Something else
        console.error("Error:", err.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
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
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
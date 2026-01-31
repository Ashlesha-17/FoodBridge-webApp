import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleRegisterNGO = () => {
    navigate("/signup", { state: { role: "NGO" } }); // pass role via state
  };

  const handleRegisterDonor = () => {
    navigate("/signup", { state: { role: "Donor" } });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to FoodBridge</h1>
      <p>Select an option:</p>
      <div>
        <button onClick={handleRegisterNGO} style={{ margin: "10px" }}>Register as NGO</button>
        <button onClick={handleRegisterDonor} style={{ margin: "10px" }}>Register as Donor</button>
        <button onClick={handleLogin} style={{ margin: "10px" }}>Login</button>
      </div>
    </div>
  );
}

export default HomePage;

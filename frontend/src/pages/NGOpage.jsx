import { useNavigate } from "react-router-dom";
import "./NGOpage.css";

function NGODashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <h1>NGO Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card" onClick={() => navigate("/ngo/profile")}>
          View Profile
        </div>

        <div className="card" onClick={() => navigate("/ngo/edit-profile")}>
          Edit Profile
        </div>

        <div className="card" onClick={() => navigate("/ngo/donations")}>
          View Donations
        </div>

        <div className="card" onClick={() => navigate("/ngo/emergency")}>
          Emergency Food Request
        </div>

      </div>

    </div>
  );
}

export default NGODashboard;
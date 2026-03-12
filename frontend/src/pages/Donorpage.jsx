import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DonorPage.css";

function DonorPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, delivered: 0 });
  const [donorName, setDonorName] = useState("");
  const [loading, setLoading] = useState(true);

  const donorId = localStorage.getItem("userId");

  useEffect(() => {
    if (!donorId || donorId === "undefined" || donorId === "null") {
      alert("Invalid user session. Please log in again.");
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/donor/stats/${donorId}`
        );
        setDonorName(res.data.donorName || "Donor");
        setStats({
          total: res.data.total,
          pending: res.data.pending,
          delivered: res.data.delivered,
        });
      } catch (err) {
        console.error("Error fetching donor stats", err);
        alert("Failed to load dashboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [donorId, navigate]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="donor-dashboard">
      <h1>Welcome {donorName} 👋</h1>
      <p>Manage your food donations from here</p>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{stats.total}</h2>
          <p>Total Donations</p>
        </div>
        <div className="stat-card">
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <h2>{stats.delivered}</h2>
          <p>Delivered</p>
        </div>
      </div>

      <div className="donor-buttons">
        <button className="donate-btn" onClick={() => navigate("/donate")}>
          Donate Food
        </button>
        <button className="history-btn" onClick={() => navigate("/my-donations")}>
          View My Donations
        </button>
      </div>
    </div>
  );
}

export default DonorPage;
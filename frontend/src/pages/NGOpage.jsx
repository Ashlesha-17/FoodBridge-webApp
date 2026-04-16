import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEdit, FaHandsHelping, FaExclamationTriangle } from "react-icons/fa";
import "./NGOpage.css";

function NGODashboard() {

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [isEmergency, setIsEmergency] = useState(false);

  // 🔥 Fetch current emergency status
  useEffect(() => {

    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/ngo/profile/${userId}`
        );

        setIsEmergency(res.data.isEmergency || false);

      } catch (err) {
        console.log("Error fetching status");
      }
    };

    if (userId) fetchStatus();

  }, [userId]);

  // 🚨 Toggle Emergency
  const handleEmergency = async () => {

    try {

      await axios.put(
        `http://localhost:5000/api/ngo/emergency/${userId}`,
        { isEmergency: !isEmergency }
      );

      setIsEmergency(!isEmergency);

    } catch (err) {
      console.error(err);
      alert("Error updating emergency status");
    }

  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="header">
        <h1>Welcome Back 🌿</h1>
        <p className="subtitle">Here’s what’s happening today</p>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <h3>12</h3>
          <p>Pending Donations</p>
        </div>
        <div className="stat-card">
          <h3>30</h3>
          <p>Completed Donations</p>
        </div>
        <div className="stat-card">
          <h3>3</h3>
          <p>Emergency Requests</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-content">

        {/* LEFT: Actions */}
        <div className="dashboard-cards">

          <div className="card" onClick={() => navigate("/ngo/profile")}>
            <FaUser size={22} />
            <h3>Your Profile</h3>
            <p>View your NGO details</p>
          </div>

          <div className="card" onClick={() => navigate("/ngo/edit-profile")}>
            <FaEdit size={22} />
            <h3>Edit Profile</h3>
            <p>Update your information</p>
          </div>

          <div className="card" onClick={() => navigate("/ngo-donations")}>
            <FaHandsHelping size={22} />
            <h3>Donations</h3>
            <p>Manage received food</p>
          </div>

          {/* 🚨 UPDATED EMERGENCY CARD */}
          <div
            className={`card danger ${isEmergency ? "active-emergency" : ""}`}
            onClick={handleEmergency}
          >
            <FaExclamationTriangle size={22} />
            <h3>
              {isEmergency ? "Emergency Active" : "Emergency"}
            </h3>
            <p>
              {isEmergency
                ? "You are marked as urgent 🚨"
                : "Request urgent food"}
            </p>
          </div>

        </div>

        {/* RIGHT: Activity */}
        <div className="activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Donation received from ABC Caterers</li>
            <li>Emergency request sent yesterday</li>
            <li>Profile updated successfully</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default NGODashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import "./myDonations.css";

function MyDonations() {

  const [donations, setDonations] = useState([]);
  const donorId = localStorage.getItem("userId");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donation/donor/${donorId}`
      );
      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Separate donations
  const pending = donations.filter(d => d.status === "pending");
  const accepted = donations.filter(d => d.status === "accepted");

  return (
    <div className="donations-page">

      <h2>My Donations ❤️</h2>

      {/* ================= PENDING ================= */}
      <h3 className="section-title">⏳ Waiting for Approval</h3>

      {pending.length === 0 ? (
        <p className="empty">No pending donations</p>
      ) : (
        pending.map((d) => (
          <div className="donation-card pending" key={d._id}>

            <h4>{d.foodItem} ({d.quantity})</h4>

            <p><b>Status:</b> ⏳ Pending</p>

            <p><b>Food Type:</b> {d.foodType}</p>

          <p>
            <b>Pickup:</b>{" "}
            {d.pickupLocation?.addressLine}, {d.pickupLocation?.city},{" "}
            {d.pickupLocation?.state} - {d.pickupLocation?.pincode}
          </p>

            <p>
              <b>Date:</b> {new Date(d.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))
      )}

      {/* ================= ACCEPTED ================= */}
      <h3 className="section-title">✅ Approved Donations</h3>

      {accepted.length === 0 ? (
        <p className="empty">No approved donations yet</p>
      ) : (
        accepted.map((d) => (
          <div className="donation-card accepted" key={d._id}>

            <h4>{d.foodItem} ({d.quantity})</h4>

            <p><b>Status:</b> ✅ Accepted</p>

            <p><b>Food Type:</b> {d.foodType}</p>

          <p>
            <b>Pickup:</b>{" "}
            {d.pickupLocation?.addressLine}, {d.pickupLocation?.city},{" "}
            {d.pickupLocation?.state} - {d.pickupLocation?.pincode}
          </p>

            <p>
              <b>Date:</b> {new Date(d.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default MyDonations;
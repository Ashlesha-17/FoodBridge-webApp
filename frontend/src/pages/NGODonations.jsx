import { useEffect, useState } from "react";
import axios from "axios";
import "./ngoDonations.css";

function NGODonations() {

  const [donations, setDonations] = useState([]);

  // ✅ IMPORTANT: use ngoId (not userId)
  const ngoId = localStorage.getItem("userId");

  useEffect(() => {
    if (ngoId) fetchDonations();
  }, [ngoId]);

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donation/ngo/${ngoId}`
      );
      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptDonation = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/donation/accept/${id}`);
      fetchDonations();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectDonation = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/donation/reject/${id}`);
      fetchDonations();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Filters
  const pending = donations.filter(d => d.status === "pending");
  const accepted = donations.filter(d => d.status === "accepted");

  // ✅ Safe pickup formatter
  const formatPickup = (p) => {
    if (!p) return "Not provided";

    return `${p.addressLine || ""}, ${p.city || ""}, ${p.state || ""} - ${p.pincode || ""}`;
  };

  return (
    <div className="ngo-donations">

      <h2>NGO Donations 📦</h2>

      {/* 🔹 PENDING */}
      <h3>📥 Incoming Requests</h3>

      {pending.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        pending.map((d) => (
          <div className="donation-card pending" key={d._id}>

            <h4>{d.foodItem} ({d.quantity})</h4>

            <p><b>Status:</b> ⏳ Pending</p>

            <p><b>Food Type:</b> {d.foodType}</p>

            <p>
              <b>Pickup:</b> {formatPickup(d.pickupLocation)}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(d.createdAt).toLocaleDateString()}
            </p>

            <p>
              <b>Donor:</b> {d.donorId?.name || "Unknown"}
            </p>

            <div className="actions">
              <button
                className="accept"
                onClick={() => acceptDonation(d._id)}
              >
                Accept ✅
              </button>

              <button
                className="reject"
                onClick={() => rejectDonation(d._id)}
              >
                Reject ❌
              </button>
            </div>

          </div>
        ))
      )}

      {/* 🔹 ACCEPTED */}
      <h3>✅ Accepted Donations</h3>

      {accepted.length === 0 ? (
        <p>No accepted donations</p>
      ) : (
        accepted.map((d) => (
          <div className="donation-card accepted" key={d._id}>

            <h4>{d.foodItem} ({d.quantity})</h4>

            <p><b>Status:</b> ✅ Accepted</p>

            <p><b>Food Type:</b> {d.foodType}</p>

            <p>
              <b>Pickup:</b> {formatPickup(d.pickupLocation)}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(d.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default NGODonations;
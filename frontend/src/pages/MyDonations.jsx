import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyDonations.css";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const donorId = localStorage.getItem("userId");

  useEffect(() => {
    if (!donorId || donorId === "undefined" || donorId === "null") {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donor/${donorId}`
      );

      console.log("Full API response:", res.data);

      let data = [];
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data.donations) {
        data = res.data.donations;
      }

      if (data.length > 0) {
        console.log("First donation object:", data[0]);
        console.log("All keys in first donation:", Object.keys(data[0]));
      }

      setDonations(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError("Failed to load donations.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (donationId) => {
    if (!window.confirm("Delete this donation?")) return;

    setDeletingId(donationId);

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/donor/donation/${donationId}`,
        { data: { donorId } }
      );

      if (res.data.success) {
        setDonations((prev) => prev.filter((d) => d._id !== donationId));
        alert("Donation deleted successfully");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  const getLocation = (donation) => {
    return (
      donation.pickupLocation ||
      donation.location ||
      donation.address ||
      "Not specified"
    );
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading donations...
      </h2>
    );

  if (error)
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>
    );

  return (
    <div className="donations-container">
      <h1>My Donations</h1>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>{/* All <th> on one line to avoid whitespace */}
                <th>Food Type</th><th>Quantity</th><th>Location</th><th>Status</th><th>Date</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.foodType}</td><td>{donation.quantity}</td><td>{getLocation(donation)}</td><td>{donation.status || "Pending"}</td><td>{formatDate(donation.createdAt)}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(donation._id)}
                      disabled={deletingId === donation._id}
                    >
                      {deletingId === donation._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyDonations;
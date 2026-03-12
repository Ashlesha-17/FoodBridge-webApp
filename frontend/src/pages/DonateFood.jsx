import { useState, useEffect } from "react";
import axios from "axios";
import "./DonateFood.css";

function DonateFood() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [donorId, setDonorId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");

    if (!storedId || storedId === "undefined" || storedId === "null") {
      alert("Please login first.");
      window.location.href = "/login";
    } else {
      setDonorId(storedId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donorId || donorId === "undefined" || donorId === "null") {
      alert("Invalid user session. Please log in again.");
      window.location.href = "/login";
      return;
    }

    if (!foodType || !quantity || !location) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending donorId:", donorId);

      const response = await axios.post(
        "http://localhost:5000/api/donor/donate",
        {
          donorId,
          foodType,
          quantity,
          location,
        }
      );

      if (response.data.success) {
        alert("Donation submitted successfully!");
      } else {
        alert(response.data.message || "Donation submitted");
      }

      setFoodType("");
      setQuantity("");
      setLocation("");
    } catch (error) {
      console.error("Donation error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Server error while submitting donation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-container">
      <h1>Donate Food</h1>

      <form className="donate-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Type (Rice, Bread, Meals...)"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Quantity (10 packs, 5 kg...)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pickup Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
}

export default DonateFood;
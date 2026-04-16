import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./donate.css";

function Donate() {
  const { ngoId } = useParams();

  const [formData, setFormData] = useState({
    foodItem: "",
    quantity: "",
    expiry: "",
    foodType: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    await axios.post("http://localhost:5000/api/donation/create", {
      foodItem: formData.foodItem,
      quantity: formData.quantity,
      expiry: formData.expiry,
      foodType: formData.foodType,
      notes: formData.notes,

      ngoId,
      donorId: localStorage.getItem("userId"),

      // ✅ IMPORTANT
      pickupLocation: {
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      }
    });

      alert("Donation request sent ❤️ Waiting for NGO approval");

      setFormData({
        foodItem: "",
        quantity: "",
        expiry: "",
        foodType: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        notes: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error sending donation");
    }
  };

  return (
    <div className="donate-container">

      <h2>Donate Food 🍱</h2>

      <form onSubmit={handleSubmit}>

        {/* FOOD DETAILS */}
        <h3 className="section-title">🍽 Food Details</h3>

        <input
          type="text"
          name="foodItem"
          placeholder="Food Item"
          value={formData.foodItem}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="quantity"
          placeholder="Quantity (e.g. 10 plates)"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="expiry"
          value={formData.expiry}
          onChange={handleChange}
          required
        />

        {/* FOOD TYPE */}
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="foodType"
              value="Cooked"
              onChange={handleChange}
              required
            />
            Cooked 🍛
          </label>

          <label>
            <input
              type="radio"
              name="foodType"
              value="Uncooked"
              onChange={handleChange}
            />
            Uncooked 🌾
          </label>
        </div>

        {/* PICKUP LOCATION */}
        <h3 className="section-title">📍 Pickup Location</h3>

        <input
          type="text"
          name="addressLine"
          placeholder="House / Building / Area"
          value={formData.addressLine}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City / District"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        {/* NOTES */}
        <textarea
          name="notes"
          placeholder="Additional Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Donate ❤️</button>

      </form>
    </div>
  );
}

export default Donate;
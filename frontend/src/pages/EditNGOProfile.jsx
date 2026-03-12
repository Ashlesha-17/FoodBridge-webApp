import { useState } from "react";
import axios from "axios";
import "./EditNGOProfile.css";

function EditNGOProfile() {

  const [ngoName, setNgoName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("ngoName", ngoName);
    formData.append("owner", owner);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("image", image);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/ngo/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Profile saved successfully!");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="ngo-profile-page">

      <div className="profile-card">

        <h1>Set Your NGO Profile</h1>
        <p className="subtitle">
          Provide details so donors can find and trust your NGO
        </p>

        <form onSubmit={handleSubmit} className="profile-form">

          <div className="form-row">
            <input
              type="text"
              placeholder="NGO Name"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Owner Name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              placeholder="Contact Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <h3>NGO Location</h3>

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="form-row">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />

          <h3>Upload NGO Image</h3>

          <div className="image-upload">
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </div>

          <button type="submit" className="save-btn">
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditNGOProfile;
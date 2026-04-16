import { useState, useEffect } from "react";
import axios from "axios";
import "./EditNGOProfile.css";

function EditNGOProfile() {

  const userId = localStorage.getItem("userId");
  const storedEmail = localStorage.getItem("email");

  const [ngoName, setNgoName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState(storedEmail || "");
  const [contact, setContact] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [workPhotos, setWorkPhotos] = useState([]);
  const [workPreview, setWorkPreview] = useState([]);

  // 🔥 FETCH EXISTING PROFILE
  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/ngo/profile/${userId}`
        );

        const data = res.data;

        setNgoName(data.ngoName || "");
        setOwner(data.owner || "");
        setEmail(data.email || "");
        setContact(data.contact || "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPincode(data.pincode || "");

        // Profile image
        if (data.image) {
          setPreview(`http://localhost:5000/uploads/${data.image}`);
        }

        // Work photos
        if (data.workPhotos) {
          const previews = data.workPhotos.map(
            (img) => `http://localhost:5000/uploads/${img}`
          );
          setWorkPreview(previews);
        }

      } catch (err) {
        console.log("No profile found");
      }
    };

    if (userId) {
      fetchProfile();
    }

  }, [userId]);

  // IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // WORK PHOTOS
  const handleWorkPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setWorkPhotos(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setWorkPreview(previews);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("ngoName", ngoName);
    formData.append("owner", owner);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);

    if (image) {
      formData.append("image", image);
    }

    workPhotos.forEach((photo) => {
      formData.append("workPhotos", photo);
    });

    try {
      await axios.post(
        "http://localhost:5000/api/ngo/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Profile saved successfully!");

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

        {/* IMAGE */}
        <div className="profile-image-section">
          <label htmlFor="imageUpload">
            <img
              src={
                preview
                  ? preview
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="profile"
              className="profile-image"
            />
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          <p className="upload-text">
            Click image to upload NGO logo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">

          <div className="form-row">
            <input type="text" placeholder="NGO Name" value={ngoName} onChange={(e) => setNgoName(e.target.value)} required />
            <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} required />
          </div>

          <div className="form-row">
            <input type="email" placeholder="Contact Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </div>

          <h3>NGO Location</h3>

          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

          <div className="form-row">
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
          </div>

          <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />

          <h3>NGO Work Photos</h3>

          <input type="file" multiple accept="image/*" onChange={handleWorkPhotosChange} />

          <div className="work-preview">
            {workPreview.map((img, index) => (
              <img key={index} src={img} alt="work" className="work-img" />
            ))}
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
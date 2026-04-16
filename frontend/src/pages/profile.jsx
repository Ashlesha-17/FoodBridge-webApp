import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./profile.css";

function NgoProfile() {

  const { id } = useParams();
  const navigate = useNavigate();   // ✅ FIX

  const [ngo, setNgo] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {
      try {

        let res;

        if (id) {
          // ✅ Donor view
          res = await axios.get(`http://localhost:5000/api/ngo/${id}`);
        } else {
          // ✅ NGO self
          const userId = localStorage.getItem("userId");

          if (!userId) {
            console.log("User ID missing");
            return;
          }

          res = await axios.get(
            `http://localhost:5000/api/ngo/profile/${userId}`
          );
        }

        setNgo(res.data);

      } catch (err) {

        if (err.response?.status === 404) {
          // 👉 No profile → redirect
          navigate("/ngo/edit-profile");
        } else {
          console.log(err);
        }

      }
    };

    fetchProfile();

  }, [id, navigate]);

  if (!ngo) return <h2 style={{ textAlign: "center" }}>Loading profile...</h2>;

  return (
    <div className="profile-page">

      <div className="profile-banner"></div>

      <div className="profile-card">

        <img
          src={`http://localhost:5000/uploads/${ngo.image}`}
          alt="ngo"
          className="profile-image"
        />

        <h1>{ngo.ngoName}</h1>
        <p className="owner">Managed by {ngo.owner}</p>

        <div className="profile-info">

          <div className="info-card">
            <h3>Email</h3>
            <p>{ngo.email}</p>
          </div>

          <div className="info-card">
            <h3>Contact</h3>
            <p>{ngo.contact}</p>
          </div>

          <div className="info-card">
            <h3>Address</h3>
            <p>
              {ngo.address}, {ngo.city}, {ngo.state} - {ngo.pincode}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default NgoProfile;
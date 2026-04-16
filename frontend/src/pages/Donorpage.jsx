import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DonorPage.css";

function DonorDashboard() {

  const navigate = useNavigate();

  const [ngos, setNgos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNGOs();
  }, []);

  const fetchNGOs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ngo/all");
      setNgos(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search filter
  const filteredNGOs = ngos.filter((ngo) =>
    ngo.ngoName.toLowerCase().includes(search.toLowerCase()) ||
    ngo.city.toLowerCase().includes(search.toLowerCase()) ||
    ngo.state.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 Sort emergency first
  const sortedNGOs = [...filteredNGOs].sort(
    (a, b) => b.isEmergency - a.isEmergency
  );

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading NGOs...</h2>;
  }

  return (
    <div className="dashboard">

      {/* NAVBAR */}
      <div className="navbar">

        <h2>FoodBridge Donor</h2>

        <div className="nav-actions">

          <input
            type="text"
            placeholder="Search NGO by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="donation-history-btn"
            onClick={() => navigate("/my-donations")}
          >
            My Donations
          </button>

        </div>

      </div>

      {/* NGO LIST */}
      <div className="ngo-container">

        {sortedNGOs.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No NGOs found</h3>
        ) : (
          sortedNGOs.map((ngo) => (

            <div
              className={`ngo-card ${ngo.isEmergency ? "emergency" : ""}`}
              key={ngo._id}
            >

              {/* Image */}
              <img
                src={`http://localhost:5000/uploads/${ngo.image}`}
                alt="ngo"
              />

              {/* Info */}
              <div className="ngo-info">

                <h3>
                  {ngo.ngoName}

                  {ngo.isEmergency && (
                    <span className="emergency-badge">
                      🚨 Emergency
                    </span>
                  )}
                </h3>

                <p><b>Owner:</b> {ngo.owner}</p>
                <p><b>Location:</b> {ngo.city}, {ngo.state}</p>
                <p><b>Contact:</b> {ngo.contact}</p>

              </div>

              {/* Actions */}
              <div className="ngo-actions">

                <button
                  className="view-btn"
                  onClick={() => navigate(`/ngo-profile/${ngo._id}`)}
                >
                  View Profile
                </button>

                <button
                  className="donate-btn"
                  onClick={() => navigate(`/donate/${ngo._id}`)}
                >
                  Donate
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default DonorDashboard;
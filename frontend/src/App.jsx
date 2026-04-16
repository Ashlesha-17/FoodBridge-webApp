import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NGOPage from "./pages/NGOpage";
import DonorPage from "./pages/DonorPage";
import MyDonations from "./pages/MyDonations";
import EditNGOProfile from "./pages/EditNGOProfile";
import NgoProfile from "./pages/profile";
import Donate from "./pages/Donate";
import NGODonations from "./pages/NGODonations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/ngo" element={<NGOPage />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/donate/:ngoId" element={<Donate />} />

        <Route path="/my-donations" element={<MyDonations />} />

        {/* ✅ NGO self profile */}
        <Route path="/ngo/profile" element={<NgoProfile />} />

        {/* ✅ Donor viewing NGO */}
        <Route path="/ngo-profile/:id" element={<NgoProfile />} />

        <Route path="/ngo/edit-profile" element={<EditNGOProfile />} />

        <Route path="/ngo-donations" element={<NGODonations />} />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
// ngos.js
import express from "express";
import multer from "multer";
import path from "path";
import NGO from "../models/NGO.js"; // also change model to ESM import

const router = express.Router();

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/ngo/update-profile
router.post("/update-profile", upload.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { ngoName, owner, email, contact, address, city, state, pincode } = req.body;
    let image = req.file ? req.file.filename : null;

    let profile = await NGO.findOne();
    if (!profile) {
      profile = new NGO({ ngoName, owner, email, contact, address, city, state, pincode, image });
    } else {
      profile.ngoName = ngoName;
      profile.owner = owner;
      profile.email = email;
      profile.contact = contact;
      profile.address = address;
      profile.city = city;
      profile.state = state;
      profile.pincode = pincode;
      if (image) profile.image = image;
    }

    await profile.save();
    res.json({ message: "Profile saved successfully!" });

  } catch (err) {
    console.error("Error in /update-profile:", err);
    res.status(500).json({ message: "Error saving profile", error: err.message });
  }
});

// GET /api/ngo/profile
router.get("/profile", async (req, res) => {
  try {
    const profile = await NGO.findOne();
    if (!profile) return res.status(404).json({ message: "No profile found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router; // ✅ ESM default export
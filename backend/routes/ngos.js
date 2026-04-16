import express from "express";
import multer from "multer";
import path from "path";
import NGO from "../models/NGO.js";

const router = express.Router();


// ================= MULTER =================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });


// ================= UPDATE PROFILE =================

router.post(
  "/update-profile",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "workPhotos", maxCount: 10 }
  ]),
  async (req, res) => {

    try {

      const {
        userId,
        ngoName,
        owner,
        email,
        contact,
        address,
        city,
        state,
        pincode
      } = req.body;

      const image = req.files?.image
        ? req.files.image[0].filename
        : null;

      const workPhotos = req.files?.workPhotos
        ? req.files.workPhotos.map(file => file.filename)
        : [];

      // 🔴 IMPORTANT FIX
      let profile = await NGO.findOne({ user: userId });

      if (!profile) {

        profile = new NGO({
          user: userId,
          ngoName,
          owner,
          email,
          contact,
          address,
          city,
          state,
          pincode,
          image,
          workPhotos
        });

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

        if (workPhotos.length > 0) {
          profile.workPhotos = workPhotos;
        }

      }

      await profile.save();

      res.json({ message: "Profile saved successfully!" });

    } catch (err) {

      console.error(err);
      res.status(500).json({ message: "Server error" });

    }

  }
);


// ================= GET PROFILE =================

router.get("/profile/:userId", async (req, res) => {

  try {

    const profile = await NGO.findOne({ user: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json(profile);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});


// ================= GET ALL NGOs =================

router.get("/all", async (req, res) => {

  try {

    const ngos = await NGO.find();

    res.json(ngos);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching NGOs"
    });

  }

});

// ================= EMERGENCY TOGGLE =================

router.put("/emergency/:userId", async (req, res) => {

  try {

    const { isEmergency } = req.body;

    const profile = await NGO.findOne({ user: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: "NGO not found" });
    }

    profile.isEmergency = isEmergency;

    await profile.save();

    res.json({ message: "Emergency status updated" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

});

// ================= GET NGO BY ID (FOR DONOR) =================

router.get("/:id", async (req, res) => {
  try {

    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json(ngo);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
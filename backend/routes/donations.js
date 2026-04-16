import express from "express";
import Donation from "../models/Donation.js";
import mongoose from "mongoose";

const router = express.Router();


// ================= CREATE =================
router.post("/create", async (req, res) => {
  try {

    const {
      donorId,
      ngoId,
      foodItem,
      quantity,
      expiry,
      foodType,
      pickupLocation,
      notes
    } = req.body;

    const donation = new Donation({
      donorId,
      ngoId,
      foodItem,
      quantity,
      expiry,
      foodType,

pickupLocation: pickupLocation,

      notes,
      status: "pending"
    });

    await donation.save();

    res.status(201).json(donation);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET NGO =================
router.get("/ngo/:ngoId", async (req, res) => {
  try {

    const ngoId = req.params.ngoId;

    const donations = await Donation.find({
      $or: [
        { ngoId: ngoId }, // string match
        { ngoId: new mongoose.Types.ObjectId(ngoId) } // ObjectId match
      ]
    })
      .populate("donorId")
      .sort({ createdAt: -1 });

    console.log("RESULT:", donations);

    res.json(donations);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= GET DONOR =================
router.get("/donor/:donorId", async (req, res) => {
  try {

    const { status } = req.query;

    const filter = { donorId: req.params.donorId };

    if (status) filter.status = status;

    const donations = await Donation.find(filter)
      .populate("ngoId")   // ✅
      .sort({ createdAt: -1 });

    res.json(donations);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= ACCEPT =================
router.put("/accept/:id", async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= REJECT =================
router.put("/reject/:id", async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
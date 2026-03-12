import express from "express";
import Donation from "../models/Donation.js";
import User from "../models/User.js";

const router = express.Router();

// ================= TEST ROUTE =================
router.get("/test", (req, res) => {
  res.json({ message: "Donor router is working" });
});

// ================= CREATE DONATION =================
router.post("/donate", async (req, res) => {
  try {
    const { donorId, foodType, quantity, location } = req.body;
    console.log("📦 Incoming donation:", { donorId, foodType, quantity, location });

    if (!donorId || !foodType || !quantity || !location) {
      return res.status(400).json({ message: "All fields required" });
    }

    const donor = await User.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    const donation = new Donation({
      donorId,
      donorName: donor.name,
      foodType,
      quantity,
      pickupLocation: location,
      status: "Pending"
    });

    await donation.save();
    console.log("✅ Donation saved with pickupLocation:", donation.pickupLocation);

    res.status(201).json({
      success: true,
      message: "Donation submitted",
      donation
    });
  } catch (error) {
    console.error("Create donation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= DELETE DONATION =================
router.delete("/donation/:donationId", async (req, res) => {
  console.log("🔥 DELETE route hit for donation:", req.params.donationId);
  try {
    const { donationId } = req.params;
    const { donorId } = req.body;

    if (!donorId) {
      return res.status(400).json({ message: "Invalid donor ID" });
    }

    const donation = await Donation.findOne({ _id: donationId, donorId });
    if (!donation) {
      return res.status(404).json({ message: "Donation not found or unauthorized" });
    }

    if (donation.status !== "Pending") {
      return res.status(400).json({ message: "Only pending donations can be deleted" });
    }

    await Donation.findByIdAndDelete(donationId);
    res.json({ success: true, message: "Donation deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= DONOR STATS (with donorName) =================
router.get("/stats/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;

    // Fetch donor name
    const donor = await User.findById(donorId).select("name");
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    const total = await Donation.countDocuments({ donorId });
    const pending = await Donation.countDocuments({ donorId, status: "Pending" });
    const delivered = await Donation.countDocuments({ donorId, status: "Delivered" });

    res.json({
      donorName: donor.name,
      total,
      pending,
      delivered
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

// ================= GET DONOR DONATIONS =================
router.get("/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;

    const donations = await Donation.find({ donorId }).sort({ createdAt: -1 });

    console.log(`Found ${donations.length} donations for donor ${donorId}`);
    donations.forEach((d, i) => {
      console.log(`Donation ${i}: id=${d._id}, pickupLocation="${d.pickupLocation}"`);
    });

    // Enhance each donation: add a 'location' alias and ensure pickupLocation is present
    const enhanced = donations.map(doc => {
      const obj = doc.toObject();
      if (!obj.pickupLocation) {
        obj.pickupLocation = "Not specified";
      }
      obj.location = obj.pickupLocation;
      return obj;
    });

    res.json(enhanced);
  } catch (error) {
    console.error("Fetch donations error:", error);
    res.status(500).json({ message: "Error fetching donations" });
  }
});

export default router;
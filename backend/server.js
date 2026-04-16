import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/auth.js";
import donorRoutes from "./routes/donor.js";
import ngoRoutes from "./routes/ngos.js";
import donationRoutes from "./routes/donations.js"; // ✅ donation routes

dotenv.config();

const app = express();

// =============== MIDDLEWARE ===============
app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =============== ROUTES ===============

// Auth routes
app.use("/api", authRoutes);

// Donor routes
app.use("/api/donor", donorRoutes);

// NGO routes
app.use("/api/ngo", ngoRoutes);

// Donation routes
app.use("/api/donation", donationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// =============== DATABASE ===============
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });

// =============== SERVER ===============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/Auth.js"; // ← import auth routes

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// use auth routes
app.use("/api", authRoutes); // ← this line is key for /api/register

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

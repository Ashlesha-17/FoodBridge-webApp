import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({

  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },

  foodItem: { type: String, required: true },
  quantity: { type: String, required: true },
  expiry: { type: Date, required: true },
  foodType: { type: String, required: true },
  notes: { type: String },

  // ✅ FIXED PICKUP STRUCTURE
  pickupLocation: {
    addressLine: String,
    city: String,
    state: String,
    pincode: String
  },

  status: { type: String, default: "pending" }

}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);
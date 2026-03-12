import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  donorName: {
    type: String,
    required: true
  },

  foodType: {
    type: String,
    required: true
  },

  quantity: {
    type: String,
    required: true
  },

  pickupLocation: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Delivered"],
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Donation", donationSchema);
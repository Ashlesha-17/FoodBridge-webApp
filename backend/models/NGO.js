import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  ngoName: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },

  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },

  image: { type: String },

  workPhotos: [
    { type: String }
  ],

    isEmergency: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("NGO", ngoSchema);
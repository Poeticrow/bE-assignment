const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, lowercase: true },
    email: { type: String, require: true, unique: true },
    tourLocation: { type: String, require: true },
    location: { type: String },
    password: { type: String, require: true },
    refreshToken: { type: String },
    passkey: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const Tourists = mongoose.model("Tourists", touristSchema);

module.exports = Tourists;

const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;

const connectDB = async () => {
  await mongoose.connect(URL).then(() => console.log("MongoDB Connected..."));
};

module.exports = connectDB;

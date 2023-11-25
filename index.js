// IMPORTS:  MODULES

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const studentRoutes = require("./routes/productRoutes");
const touristRoutes = require("./routes/touristRoutes");
// FUNCTION CALLS
const app = express();
app.use(express.json());
connectDB();
dotenv.config();

const port = process.env.PORT || 8080;

// TEST ENDPOINT
app.get("/api/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to my backend App",
  });
});

app.use("/api", studentRoutes);

app.use("/api", touristRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// console.log(process.env.TOKEN);
// const express = require("express")
// const dotenv = require("dotenv")
// const connectDB = require("./db")
// const Staff = require("./models/staffModel")
// const studentsRoutes = require("./routes/studentRoutes")

// dotenv.config()

// const app = express()

// app.use(express.json())

// connectDB()

// app.use("/api", studentsRoutes)

// // APIs

// app.get("/", (req, res)=>{
//     return res.status(200).json({
//         message: "Welcome to our backend"
//     })
// })

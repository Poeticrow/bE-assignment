// IMPORTS:  MODULES

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const Products = require("./models/productModel");

// FUNCTION CALLS
const app = express();
app.use(express.json());
connectDB();
dotenv.config({});

const port = process.env.PORT || 8080;

// TEST ENDPOINT
app.get("/api/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to my backend App",
  });
});

// API

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({ message: "Success", products });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Get one products
app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product)
      return res.status(404).json({ msg: "This product does not exist." });

    return res.status(200).json({ message: "Success", product });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Add one products
app.post("/api/product", async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    const newProduct = new Products({
      title,
      price,
      description,
      category,
      image,
    });
    await newProduct.save();

    return res
      .status(200)
      .json({ message: "Succesfully added product", newProduct });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Update one products
app.put("/api/product/:id", async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        title,
        price,
        description,
        category,
        image,
      },
      { new: true }
    );

    if (!product)
      return res.status(404).json({ msg: "This product does not exist." });

    return res
      .status(200)
      .json({ message: "Info Updated succesfully", product });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// Delete one products
app.delete("/api/product/:id", async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ msg: "This product does not exist." });

    return res.status(200).json({ msg: "Delete Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

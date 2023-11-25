const Products = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({ message: "Success", products });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteOneProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ msg: "This product does not exist." });

    return res.status(200).json({ msg: "Delete Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product)
      return res.status(404).json({ msg: "This product does not exist." });

    return res.status(200).json({ message: "Success", product });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const addOneProduct = async (req, res) => {
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
};

const updateOneProduct = async (req, res) => {
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
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
};

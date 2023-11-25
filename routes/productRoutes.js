const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/productCtrls");
// const { validateStudentSignUp } = require("../middleware/validation");

const router = express.Router();

// API
router.get("/api/all-products", getAllProducts);
router.get("/api/product/:id", getOneProduct);
router.post("/api/product", addOneProduct);
router.put("/api/product/:id", deleteOneProduct);
router.delete("/api/product/:id", updateOneProduct);

// SIGNUP
// router.post("/api/register", validateStudentSignUp, studentSignUp);

// console.log(router);
module.exports = router;

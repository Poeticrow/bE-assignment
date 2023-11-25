const express = require("express");
const {
  getAllTourists,
  touristLogin,
  touristSignUp,
} = require("../controllers/touristCtrl");
const { touristValidation } = require("../middleware/validations");
touristValidation;

const router = express.Router();

router.get("/all-tourists", getAllTourists);

router.post(
  "/register",
  touristValidation.validateTouristSignUp,
  touristSignUp
);

router.post("/login", touristValidation.validateTouristLogin, touristLogin);

module.exports = router;

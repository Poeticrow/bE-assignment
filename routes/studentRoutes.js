const express = require("express");
const {
  getAllStudents,
  studentSignUp,
  studentLogin,
} = require("../controllers/studentCtrl");
const {
  validateStudentSignup,
  validateStudentLogin,
} = require("../middleware/validations");

const router = express.Router();

router.get("/all-students", getAllStudents);

router.post("/register", validateStudentSignup, studentSignUp);

router.post("/login", validateStudentLogin, studentLogin);

module.exports = router;

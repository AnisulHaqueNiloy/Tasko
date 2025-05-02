const express = require("express");

const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  login
);

module.exports = router;

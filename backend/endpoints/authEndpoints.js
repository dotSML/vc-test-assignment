const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/user");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
    body("firstName")
      .trim()
      .not()
      .isEmpty(),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").isLength({ min: 5 })
  ],
  authController.login
);

module.exports = router;

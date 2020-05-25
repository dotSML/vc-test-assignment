const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const { validateData } = require("../util/validation");

exports.signup = async (req, res, next) => {
  try {
    validateData(req);
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findAll({ where: { email: email } });
    if (existingUser.length) {
      console.log(existingUser, "EXISTING");
      return res
        .status(400)
        .json({ message: "User with this email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    });
    res.status(200).json({ message: "User Created!", user: user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log("LOGIN");
    validateData(req);
    const { email, password } = req.body;
    let loadedUser = await User.findAll({ where: { email: email }, raw: true });
    if (!loadedUser.length) {
      const error = new Error("User not found!");
      error.statusCode = 401;
      throw error;
    }

    let pwMatches = await bcrypt.compare(password, loadedUser[0].password);

    if (!pwMatches) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: loadedUser[0].email, userId: loadedUser[0].id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: loadedUser[0].id });
  } catch (err) {
    next(err);
  }
};

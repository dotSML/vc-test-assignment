const userController = require("../controllers/userController");
const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/users", isAuth, userController.getUser);

module.exports = router;

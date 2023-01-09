const express = require("express");
const router = express.Router();
const usersController = require("../controllers/authController");

router.route("/").post(usersController.Login);

module.exports = router;

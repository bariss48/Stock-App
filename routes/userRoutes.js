const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/").post(usersController.addNewUser);

module.exports = router;

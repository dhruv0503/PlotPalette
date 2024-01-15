const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController")

router.route("/all").get(userController.getAllUsers)

router.route("/new").post(userController.newUser)

router.route("/:id").get(userController.findUser)

module.exports = router;
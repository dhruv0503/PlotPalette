const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController")
const wrapAsync = require("../util/catchAsync");
const { authorizeRoles } = require("../middleware/auth");

router.route("/all").get(authorizeRoles("Admin"),(wrapAsync(userController.getAllUsers)));

router.route("/:id")
.get(wrapAsync(userController.findUser))
.put(authorizeRoles("Admin"),(wrapAsync(userController.makeAdmin)));

module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController")
const wrapAsync = require("../util/catchAsync");
const { authorizeRoles, isLoggedIn } = require("../middleware");

router.route("/options").get(isLoggedIn(), wrapAsync(userController.optionsList));

router.route("/all").get(isLoggedIn(),wrapAsync(userController.getAllUsers));

router.route("/myProfile").get(isLoggedIn(), wrapAsync(userController.getProfile));

router.route("/search").get(wrapAsync(userController.findUser));

router.route("/bio").post(isLoggedIn(), wrapAsync(userController.updateBio));

router.route("/makeAdmin").put(isLoggedIn(), authorizeRoles("Admin"),(wrapAsync(userController.makeAdmin)));

module.exports = router;
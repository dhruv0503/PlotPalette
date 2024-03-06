const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController")
const wrapAsync = require("../util/catchAsync");
const { authorizeRoles, isLoggedIn } = require("../middleware");
 
router.route("/friendList/:userId").get(isLoggedIn(), wrapAsync(userController.friendList))

router.route("/friend/:userId").delete(isLoggedIn(), wrapAsync(userController.removeFriend))

router.route("/options/:parameter").get(isLoggedIn(), wrapAsync(userController.optionsList));

router.route("/all").get(isLoggedIn(),wrapAsync(userController.getAllUsers));

router.route("/myProfile").get(isLoggedIn(), wrapAsync(userController.getProfile));

router.route("/search/userName").get(wrapAsync(userController.getUserByUsername));

router.route("/:id")
    .get(wrapAsync(userController.findUser))
    .put(isLoggedIn(), authorizeRoles("Admin"),(wrapAsync(userController.makeAdmin)));

module.exports = router;
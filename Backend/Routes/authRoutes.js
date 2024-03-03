const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController")
const wrapAsync = require("../util/catchAsync")
const {isLoggedIn} = require("../middleware")

router.route("/signup").post(wrapAsync(authController.signUp));

router.route("/signin").post(wrapAsync(authController.signIn));

router.route("/signout").get(isLoggedIn(), wrapAsync(authController.signOut))

router.route("/resetPassword").post(isLoggedIn(), wrapAsync(authController.resetPassword))

router.route("/forgetPassword").post(wrapAsync(authController.forgetPassword))

module.exports = router;
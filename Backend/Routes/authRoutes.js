const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController")
const wrapAsync = require("../util/catchAsync")

router.route("/signup").post(wrapAsync(authController.signUp));
router.route("/signin").post(wrapAsync(authController.signIn));
router.route("/signout").get(wrapAsync(authController.signOut))

module.exports = router;
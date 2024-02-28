const friendController = require("../Controllers/friendController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();
const {isLoggedIn} = require("../middleware")

router.route("/list/:userId").get(isLoggedIn(), wrapAsync(friendController.requestList))

router.route("/send/:userId").post(isLoggedIn(), wrapAsync(friendController.addFriend))

router.route("/accept/:userId").post(isLoggedIn(), wrapAsync(friendController.acceptFriend))

router.route("/deny/:userId").delete(isLoggedIn(), wrapAsync(friendController.denyFriend))

module.exports = router;
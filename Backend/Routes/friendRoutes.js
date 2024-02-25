const friendController = require("../Controllers/friendController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/list/:userId").get(wrapAsync(friendController.requestList))

router.route("/send/:userId").post(wrapAsync(friendController.addFriend))

router.route("/accept/:userId").post(wrapAsync(friendController.acceptFriend))

router.route("/deny/:userId").delete(wrapAsync(friendController.denyFriend))

module.exports = router;
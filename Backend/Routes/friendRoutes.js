const friendController = require("../Controllers/friendController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();
const {isLoggedIn} = require("../middleware")

router.route("/requestList").get(isLoggedIn(), wrapAsync(friendController.requestList))
router.route("/friendList").get(isLoggedIn(), wrapAsync(friendController.friendList))
router.route("/send").post(isLoggedIn(), wrapAsync(friendController.addFriend))
router.route("/accept").post(isLoggedIn(), wrapAsync(friendController.acceptFriend))
router.route("/deny").delete(isLoggedIn(), wrapAsync(friendController.denyFriend))
router.route("/removeFriend").delete(isLoggedIn(), wrapAsync(friendController.removeFriend))

module.exports = router;
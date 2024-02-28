const friendController = require("../Controllers/friendController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();
const {isLoggedIn} = require("../middleware")

router.route("/:userId/list").get(isLoggedIn(), wrapAsync(friendController.requestList))
router.route("/:userId/send").post(isLoggedIn(), wrapAsync(friendController.addFriend))
router.route("/:userId/accept").post(isLoggedIn(), wrapAsync(friendController.acceptFriend))
router.route("/:userId/deny").delete(isLoggedIn(), wrapAsync(friendController.denyFriend))

module.exports = router;
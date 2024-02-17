const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController")
const wrapAsync = require("../util/catchAsync");
const { authorizeRoles } = require("../middleware/auth");
 
router.route("/friendList/:userId").get(wrapAsync(userController.friendList))

router.route("/friend/:userId").delete(wrapAsync(userController.removeFriend))

router.route("/options/:parameter").get(wrapAsync(userController.optionsList));

router.route("/all").get(authorizeRoles("Admin"),wrapAsync(userController.getAllUsers));

router.route("/:id")
    .get(wrapAsync(userController.findUser))
    .put(authorizeRoles("Admin"),(wrapAsync(userController.makeAdmin)));


module.exports = router;
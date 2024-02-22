const reviewController = require("../Controllers/reviewController")
const {isLoggedIn} = require("../middleware")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/:tmdbId")
    .post(isLoggedIn(), wrapAsync(reviewController.makeReview))
    .put(isLoggedIn(), wrapAsync(reviewController.updateReview))
    .delete(isLoggedIn(), wrapAsync(reviewController.deleteReview));
    
module.exports = router;
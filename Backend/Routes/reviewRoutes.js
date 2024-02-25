const reviewController = require("../Controllers/reviewController")
const {isLoggedIn, isWatched} = require("../middleware")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/:tmdbId")
    .post(isLoggedIn(), isWatched(), wrapAsync(reviewController.makeReview))
    .put(isLoggedIn(), isWatched(), wrapAsync(reviewController.updateReview))
    .delete(isLoggedIn(), isWatched(), wrapAsync(reviewController.deleteReview));
    
module.exports = router;
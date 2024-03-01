const reviewController = require("../Controllers/reviewController")
const {isLoggedIn, isWatched} = require("../middleware")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/:tmdbId").post(isLoggedIn(), isWatched("review"), wrapAsync(reviewController.makeReview))

router.route("/:tmdbId/:reviewId/update").put(isLoggedIn(), isWatched("review"), wrapAsync(reviewController.updateReview))
router.route("/:tmdbId/:reviewId/delete").delete(isLoggedIn(), isWatched("review"), wrapAsync(reviewController.deleteReview))
router.route("/:reviewId/upvote").put(isLoggedIn(), wrapAsync(reviewController.upVote))
router.route("/:reviewId/downvote").put(isLoggedIn(), wrapAsync(reviewController.downVote))    
    
module.exports = router;
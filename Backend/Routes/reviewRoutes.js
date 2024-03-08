const reviewController = require("../Controllers/reviewController")
const {isLoggedIn, isWatched, singleReview} = require("../middleware")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/")
    .post(isLoggedIn(), isWatched("review"), singleReview(), wrapAsync(reviewController.makeReview))
    .get(isLoggedIn(), isWatched("review"), wrapAsync(reviewController.getReview))
    .put(isLoggedIn(), isWatched("review"), wrapAsync(reviewController.updateReview))
    .delete(isLoggedIn(), isWatched("review"), wrapAsync(reviewController.deleteReview))
router.route("/upvote").put(isLoggedIn(), wrapAsync(reviewController.upVote))
router.route("/downvote").put(isLoggedIn(), wrapAsync(reviewController.downVote))    
    
module.exports = router;
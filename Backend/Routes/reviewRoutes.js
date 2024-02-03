const reviewController = require("../Controllers/reviewController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/:tmdbId")
    .post(wrapAsync(reviewController.makeReview))
    .put(wrapAsync(reviewController.updateReview))
    .delete(wrapAsync(reviewController.deleteReview));
    
module.exports = router;
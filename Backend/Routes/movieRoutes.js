const movieController = require("../Controllers/movieController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/rating/:id/:movieId").post(wrapAsync(movieController.giveRating));
router.route("/type/:parameter").get(wrapAsync(movieController.getMovies));

module.exports = router;
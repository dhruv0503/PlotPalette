const movieController = require("../Controllers/movieController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const router = express.Router();

router.route("/genres/:genre").get(wrapAsync(movieController.getMovieByGenre))

router.route("/person/:castId").get(wrapAsync(movieController.getCastMember));

router.route("/reviews/:tmdbId").get(wrapAsync(movieController.getReviews))

router.route("/options/:tmdbId").put(wrapAsync(movieController.movieOptions));

router.route("/type/:parameter").get(wrapAsync(movieController.getMovieList));

router.route("/:tmdbId").get(wrapAsync(movieController.getMovie));

module.exports = router;
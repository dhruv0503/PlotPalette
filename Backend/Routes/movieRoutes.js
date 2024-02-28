const movieController = require("../Controllers/movieController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const {isLoggedIn} = require("../middleware")
const router = express.Router();

router.route("/genres/:genre").get(wrapAsync(movieController.getMovieByGenre))

router.route("/person/:castId").get(wrapAsync(movieController.getCastMember));

router.route("/reviews/:movieId").get(wrapAsync(movieController.getReviews));

router.route("/options/:tmdbId").put(isLoggedIn(), wrapAsync(movieController.movieOptions));

router.route("/type/:parameter").get(wrapAsync(movieController.getMovieList));

router.route("/search").get(wrapAsync(movieController.searchMovie));

router.route("/:tmdbId")
    .get(wrapAsync(movieController.getMovie))
    .patch(isLoggedIn(), wrapAsync(movieController.watched));

module.exports = router;
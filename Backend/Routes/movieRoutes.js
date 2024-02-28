const movieController = require("../Controllers/movieController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const {isLoggedIn, isWatched} = require("../middleware")
const router = express.Router();

router.route("/genres/:genre").get(wrapAsync(movieController.getMovieByGenre))

router.route("/person/:castId").get(wrapAsync(movieController.getCastMember));

router.route("/reviews/:movieId").get(wrapAsync(movieController.getReviews));

router.route("/type/:parameter").get(wrapAsync(movieController.getMovieList));

router.route("/search").get(wrapAsync(movieController.searchMovie));

router.route("/:tmdbId")
    .get(wrapAsync(movieController.getMovie))
    .patch(isLoggedIn(), wrapAsync(movieController.watched));

router.route("/:tmdbId/favourite").post(isLoggedIn(), isWatched(), movieController.favourite);
router.route("/:tmdbId/rating").post(isLoggedIn(), isWatched(), movieController.rating);
router.route("/:tmdbId/watchLater").post(isLoggedIn(), movieController.watchLater);

module.exports = router;
const movieController = require("../Controllers/movieController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const {isLoggedIn, isWatched} = require("../middleware")
const router = express.Router();

router.route("/test").get(isLoggedIn(), wrapAsync(movieController.test));

router.route("/genres/:genre").get(wrapAsync(movieController.getMovieByGenre))

router.route("/person/:castId").get(wrapAsync(movieController.getCastMember));

router.route("/reviews/:tmdbId").get(wrapAsync(movieController.getReviews));

router.route("/type/:parameter").get(wrapAsync(movieController.getMovieList));

router.route("/search/movie").get(wrapAsync(movieController.searchMovie));
router.route("/search/person").get(wrapAsync(movieController.searchPerson));

router.route("/:tmdbId")
    .get(wrapAsync(movieController.getMovie))
    .patch(isLoggedIn(), wrapAsync(movieController.watched));

router.route("/:tmdbId/favourite").get(isLoggedIn(), isWatched("fav"), movieController.favourite);
router.route("/:tmdbId/rating").get(isLoggedIn(), isWatched("rate"), movieController.rating);
router.route("/:tmdbId/watchLater").get(isLoggedIn(), movieController.watchLater);

module.exports = router;
const movieController = require("../Controllers/movieController")
const express = require("express");
const wrapAsync = require("../util/catchAsync");
const {isLoggedIn, isWatched} = require("../middleware")
const router = express.Router();

router.route("/")
    .get(wrapAsync(movieController.getMovie))
    .patch(isLoggedIn(), wrapAsync(movieController.watched));

router.route("/person").get(wrapAsync(movieController.getCastMember))
router.route("/reviews").get(wrapAsync(movieController.getReviews));

router.route("/search/person").get(wrapAsync(movieController.searchPerson));
router.route("/search/movie").get(wrapAsync(movieController.searchMovie));

router.route("/genres/:genre").get(wrapAsync(movieController.getMovieByGenre))
router.route("/type/:parameter").get(wrapAsync(movieController.getMovieList));

router.route("/favourite").get(isLoggedIn(), isWatched("fav"), movieController.favourite);
router.route("/rating").get(isLoggedIn(), isWatched("rate"), movieController.rating);
router.route("/watchLater").get(isLoggedIn(), movieController.watchLater);

module.exports = router;
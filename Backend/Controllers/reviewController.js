require("dotenv").config();
const { db, auth } = require("../firebaseConfig");
const { collection, doc, addDoc, updateDoc, increment, getDoc, arrayUnion, arrayRemove, deleteDoc, deleteField, getDocs} = require("firebase/firestore/lite");
const User = collection(db, "User");
const Movie = collection(db, "Movie");
const Review = collection(db, "Review");
const expressError = require("../util/expressError");
const movieFunctions = require("../util/movieFunctions");
const utilityFunctions = require("../util/utlityFunctions");

module.exports.makeReview = async (req, res, next) => {
    const user = auth.currentUser;
    const { tmdbId } = req.params;
    const { reviewText } = req.body;

    const userObj = await utilityFunctions.getUser(user);
    const movieObj = await utilityFunctions.getMovie(Number(tmdbId));

    const formattedTime = new Date(Date.now()).toLocaleString();

    const obj = {"text": reviewText, "userId" : userObj.id, "movieId" : movieObj.id, "timeStamp" : formattedTime, "upVote" : 0, "downVote" : 0}
    const review = await addDoc(Review, obj);
    const reviewId = review.id;
    const response = await movieFunctions.hasSubcollection(userObj.id, 'movies');
    const movie = movieFunctions.findObjectById(response, tmdbId);
    await updateDoc(doc(User, userObj.id, 'movies', movie.id), {reviewId} );

    await updateDoc(doc(Movie, movieObj.id), {
        "reviewCount" : increment(1),
        "reviews" : arrayUnion(reviewId)
      });
      const reviewDoc = await getDoc(doc(Review, reviewId));
      res.send(reviewDoc.data())
}

module.exports.updateReview = async(req, res, next) => {
    const user = auth.currentUser;
    const {tmdbId} = req.params
    const { reviewText } = req.body;

    const userObj = await utilityFunctions.getUser(user);

    const response = await movieFunctions.hasSubcollection(userObj.id, 'movies');
    const movie = movieFunctions.findObjectById(response, tmdbId);
    const reviewId = movie.reviewId;

    await updateDoc(doc(Review, reviewId), { "text" : reviewText })
    const reviewDoc = await getDoc(doc(Review, reviewId))
    res.send(reviewDoc.data());
}

module.exports.deleteReview = async(req, res, next) => {
    const user = auth.currentUser;
    const {tmdbId} = req.params;

    const userObj = await utilityFunctions.getUser(user);
    const movieObj = await utilityFunctions.getMovie(Number(tmdbId));

    const response = await movieFunctions.hasSubcollection(userObj.id, 'movies');
    const movie = movieFunctions.findObjectById(response, tmdbId);
    const reviewId = movie.reviewId

    await updateDoc(doc(User, userObj.id, 'movies', movie.id),{
        reviewId : deleteField()
    });

    await updateDoc(doc(Movie, movieObj.id), {
        "reviewCount" : increment(-1),
        "reviews" : arrayRemove(reviewId)
    })
    await deleteDoc(doc(Review, reviewId));
    const reviewsRef = await getDocs(collection(Review));
    const reviews = reviewsRef.map(rev => ({...rev.data()}))
    res.send(reviews);
}

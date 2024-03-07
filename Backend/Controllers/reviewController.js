require("dotenv").config();
const { db, auth } = require("../firebaseConfig");
const { collection, doc, addDoc, updateDoc, increment, getDoc, arrayUnion, arrayRemove, deleteDoc, deleteField, getDocs} = require("firebase/firestore/lite");
const User = collection(db, "User");
const Movie = collection(db, "Movie");
const Review = collection(db, "Review");
const expressError = require("../util/expressError");
const utilityFunctions = require("../util/utlityFunctions");

module.exports.makeReview = async (req, res, next) => {
    const user = auth.currentUser;
    const { tmdbId } = req.params;
    const { reviewText } = req.body;

    const userObj = await utilityFunctions.getUser(user);
    const movieObj = await utilityFunctions.getMovie(Number(tmdbId));

    const formattedTime = new Date(Date.now()).toLocaleString();

    const obj = {"text": reviewText, "userId" : userObj.id, "reviewer" : userObj.name, "movieId" : movieObj.id, "movieName" : movieObj.title, tmdbId, "timeStamp" : formattedTime, "votes" : 0}
    
    const review = await addDoc(Review, obj);
    const reviewId = review.id;
    const response = await utilityFunctions.hasSubcollection(userObj.id, 'movies');
    const movie = response.find((doc) => doc.tmdbId == tmdbId);
    await updateDoc(doc(User, userObj.id, 'movies', movie.id), {reviewId} );

    await updateDoc(doc(Movie, movieObj.id), {
        "reviewCount" : increment(1),
        "reviews" : arrayUnion(reviewId)
      });
    const reviewDoc = await getDoc(doc(Review, reviewId));
    res.send(reviewDoc.data())
}

module.exports.updateReview = async(req, res, next) => {
    const { reviewId } = req.params
    const { reviewText } = req.body;
    const formattedTime = new Date(Date.now()).toLocaleString();

    await updateDoc(doc(Review, reviewId), { "text" : reviewText, formattedTime, "editted" : true })
    const reviewDoc = await getDoc(doc(Review, reviewId))
    res.send(reviewDoc.data());
}

module.exports.getReview = async(req, res, next) => {
    const { reviewId } = req.params
    const formattedTime = new Date(Date.now()).toLocaleString();
    const reviewDoc = await getDoc(doc(Review, reviewId))
    res.send(reviewDoc.data());
}

module.exports.deleteReview = async(req, res, next) => {
    const userRef = auth.currentUser
    const {tmdbId, reviewId} = req.params;
    const movie = await utilityFunctions.getMovie(tmdbId)
    const user = await utilityFunctions.getUser(userRef);
    const result = await utilityFunctions.getSubCollectionMovies(userRef, tmdbId)

    await updateDoc(doc(collection(User, user.id, 'movies'), result.id),{
        reviewId : deleteField()
    });

    await updateDoc(doc(Movie, movie.id), {
        "reviewCount" : increment(-1),
        "reviews" : arrayRemove(reviewId)
    })

    await deleteDoc(doc(Review, reviewId));
    const reviewsRef = await getDocs(Review);
    const reviews = reviewsRef.docs.map(rev => ({...rev.data()}))
    res.send(reviews);
}

module.exports.upVote = async(req, res, next) => {
    const userRef = auth.currentUser;
    const { reviewId } = req.params;
    const user = await utilityFunctions.getUser(userRef);
    
    const userReviews = await getDocs(collection(User, user.id, "reviews"));
    if(userReviews) {
        const upvotedReview = userReviews.docs.find( (rev) => rev.data().reviewId === reviewId && rev.data().upvote );
        if (upvotedReview) next(new expressError("You can't upvote the same review multiple times", 400));
    }
    await updateDoc(doc(Review, reviewId), { votes: increment(1) }),
    await addDoc(collection(doc(User, user.id), "reviews"), { reviewId, upvote: true, downvote: false })
    const review = await getDoc(doc(Review, reviewId));
    res.send(review.data());
}

module.exports.downVote = async(req, res, next) => {
    const userRef = auth.currentUser;
    const {reviewId} = req.params;
    const user = await utilityFunctions.getUser(userRef);

    const userReviews = await getDocs(collection(User, user.id, "reviews"));
    if(userReviews){
        const upvotedReview = userReviews.docs.find( (rev) => rev.data().reviewId === reviewId && rev.data().upvote );
        if(upvotedReview) next(new expressError("You can't downvote the same review multiple times", 400));
    }    
    await updateDoc(doc(Review, reviewId), {votes : increment(-1)})
    await addDoc(collection(doc(User, user.id) , "reviews"), {reviewId, upvote : false, downvote : true})
    const review = await getDoc(doc(Review, reviewId))
    res.send(review.data());
}
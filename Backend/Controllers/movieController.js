require("dotenv").config();
const axios = require("axios");
const { db, auth } = require("../firebaseConfig");
const {query, where, collection, doc, addDoc, updateDoc, getDocs, increment, arrayUnion, arrayRemove } = require("firebase/firestore/lite");
const User = collection(db, "User");
const Movie = collection(db, "Movie");
const expressError = require("../util/expressError");
const movieFunctions = require("../util/movieFunctions");
const utilityFunctions = require("../util/utlityFunctions");
const { uid } = require("uid")

module.exports.getMovie = async(req, res, next) => {
    const {tmdbId} = req.params;
    const userQuery = query(collection(db, 'Movie'), where('tmdbId', '==', Number(tmdbId)));
    const querySnapshot = await getDocs(userQuery);
    if(querySnapshot.docs.length > 0){
        res.send(querySnapshot.docs[0].data());
    }else{
        const path = "https://image.tmdb.org/t/p/original"
        const response = await movieFunctions.getMovieById(tmdbId);
        const data = response[0];
        const newMovie = await addDoc(Movie, {"tmdbId" : data.id, "title" : data.title, "language" : data.original_language, "overview" : data.overview, "poster_path" : path + data.poster_path, "release_date" : data.release_date, "reviewCount" : 0, "rating" : 0,"numRating" : 0, "favourite" : 0, "reviews" : []});
        res.send(newMovie);
    }
}

module.exports.getMovieList = async (req, res, next) => {
    const { parameter } = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${parameter}?api_key=${process.env.TMDB_API_KEY}`);
    if(!response){
        return next(new expressError("Error Fetching Popular Movies", 500))
    }
    const movies = response.data.results;
    res.json({ movies });
}

module.exports.movieOptions = async (req, res, next) => {
    const user = auth.currentUser;
    const {tmdbId} = req.params;

    const userObj = await utilityFunctions.getUser(user);
    const movieObj = await utilityFunctions.getMovie(Number(tmdbId));

    const parentDocPath =  `User/${userObj.id}`;
    const subCollectionName = 'movies';
    const uniqueId = uid();

    const response = await movieFunctions.hasSubcollection(parentDocPath, subCollectionName);
    if (response.length > 0) {
        const result = movieFunctions.findObjectById(response, tmdbId);
        if (result !== undefined) {
            const oldReviewCheck = result.review !== undefined;
            const {
                rating = result.rating,
                favourite = result.favourite,
                watched = result.watched,
                watchLater = result.watchLater,
                reviewText =  oldReviewCheck ? result.review.text : undefined
            } = req.body;
            
            const favCheck = result.favourite == favourite;
            const ratingCheck = result.rating === 0 && rating !== 0;
            const reviewCheck = reviewText !== undefined;

            const userUpdates = { rating, favourite, watched, watchLater }

            if(reviewCheck){
                userUpdates.review = oldReviewCheck ? { "uid": result.review.uid, "text": reviewText } : { "uid": uniqueId, "text": reviewText }
            }

            let reviews = movieObj.reviews;
            if(oldReviewCheck){
                reviews.forEach(element => {
                    if(element.uid == result.review.uid) element.text = reviewText
                });
            }
            else reviews.push({ "uid" : uniqueId, "text" : reviewText })

            const updatedDoc = await updateDoc(doc(User, userObj.id, subCollectionName, result.uid), userUpdates);
            //updating movie doc
            const movieUpdates = {
                "rating" : rating === 0 ? 0 : ((movieObj.rating * movieObj.numRating ) - result.rating + rating) / (movieObj.numRating),
                "favourite" : increment(favCheck ? 0 : favourite ? 1 : -1),
                "numRating" : increment(ratingCheck ? 1 : 0),
                "reviews" : reviews,
                "reviewCount" : increment(oldReviewCheck ? 0 : reviewCheck ? 1 : 0)
            }
            await updateDoc(doc(Movie, movieObj.movieId),movieUpdates );
            res.send(updatedDoc);
            return;
        }
    }
    const { rating = 0, favourite = false, watched = false, watchLater = false, reviewText = ''} = req.body;
    const reviewCheck = reviewText.length > 0;

    if(reviewCheck){
        movieObj.reviews.push({ "uid" : uniqueId, "text" : reviewText })
    }

    const movieUpdates = {
        "rating" : rating === 0 ? movieObj.rating : ((movieObj.rating * movieObj.numRating) + rating) / (movieObj.numRating + 1),
        "favourite" : increment(favourite ? 1 : 0),
        "numRating" : increment(rating === 0 ? 0 : 1),
        "reviews" : movieObj.reviews,
        "reviewCount" : increment(reviewCheck ? 1 : 0)
    }

    await updateDoc(doc(Movie, movieObj.movieId), movieUpdates );

    const obj = { rating, favourite, watched, watchLater, tmdbId, "id" : movieObj.movieId }

    if(reviewCheck) obj.review = { "uid" : uniqueId, "text" : reviewText }

    const parentDoc = doc(User, userObj.id);
    const subcollectionRef = collection(parentDoc, subCollectionName);
    const subCollection = await addDoc(subcollectionRef, obj);
    res.send(subCollection);
};

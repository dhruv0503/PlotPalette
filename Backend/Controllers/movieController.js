require("dotenv").config();
const axios = require("axios");
const { db, auth } = require("../firebaseConfig");
const {query, where, collection, doc, addDoc, updateDoc, getDocs, increment, getDoc} = require("firebase/firestore/lite");
const User = collection(db, "User");
const Movie = collection(db, "Movie");
const expressError = require("../util/expressError");
const movieFunctions = require("../util/movieFunctions");
const utilityFunctions = require("../util/utlityFunctions");

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

        const movieObj = {"tmdbId" : data.id, "title" : data.title, "language" : data.original_language, "overview" : data.overview, "poster_path" : path + data.poster_path, "release_date" : data.release_date, "reviewCount" : 0, "rating" : 0,"numRating" : 0, "favourite" : 0, "reviews" : []}

        const newMovie = await addDoc(Movie, movieObj);
        res.send({"id" : newMovie.id, ...movieObj});
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

    const subCollectionName = 'movies';

    const response = await movieFunctions.hasSubcollection(userObj.id, subCollectionName);
    if (response.length > 0) {
        const result = movieFunctions.findObjectById(response, tmdbId);
        if (result !== undefined) {
            const {
                rating = result.rating,
                favourite = result.favourite,
                watched = result.watched,
                watchLater = result.watchLater,
            } = req.body;

            const favCheck = result.favourite == favourite;
            const ratingCheck = result.rating === 0 && rating !== 0;

            const userUpdates = { rating, favourite, watched, watchLater }

            await updateDoc(doc(User, userObj.id, subCollectionName, result.id), userUpdates);
            const updatedDoc = await getDoc(doc(User, userObj.id, subCollectionName, result.id));
            //updating movie doc
            const movieUpdates = {
                "rating" : rating === 0 ? 0 : ((movieObj.rating * movieObj.numRating ) - result.rating + rating) / (movieObj.numRating),
                "favourite" : increment(favCheck ? 0 : favourite ? 1 : -1),
                "numRating" : increment(ratingCheck ? 1 : 0)
            }
            await updateDoc(doc(Movie, movieObj.id),movieUpdates );

            res.send(updatedDoc.data());
            return;
        }
    }
    const { rating = 0, favourite = false, watched = false, watchLater = false} = req.body;

    const movieUpdates = {
        "rating" : rating === 0 ? movieObj.rating : ((movieObj.rating * movieObj.numRating) + rating) / (movieObj.numRating + 1),
        "favourite" : increment(favourite ? 1 : 0),
        "numRating" : increment(rating === 0 ? 0 : 1),
    }

    await updateDoc(doc(Movie, movieObj.id), movieUpdates );

    const obj = { rating, favourite, watched, watchLater, tmdbId, "movieId" : movieObj.id }

    const subCollection = await addDoc(collection(User, userObj.id, subCollectionName), obj);
    const newDoc = await getDoc(doc(User, userObj.id, subCollectionName, subCollection.id));
    res.send(newDoc.data());
};

module.exports.getReviews = async(req, res, next) => {
    const {tmdbId} = req.params;

    const movieObj = utilityFunctions.getMovie(tmdbId)
    const userQuery = query(collection(db, 'Movie'), where('movieId', '==', movieObj.id));
    const querySnapshot = await getDocs(userQuery);
    const result = querySnapshot.map(ele => ele.data())

    res.send(result);
}


//Need to do error control
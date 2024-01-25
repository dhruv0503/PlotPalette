require("dotenv").config();
const axios = require("axios")
const { db, auth } = require("../firebaseConfig")
const {query, where, collection, doc, addDoc, updateDoc, getDocs, increment } = require("firebase/firestore/lite")
const User = collection(db, "User");
const Movie = collection(db, "Movie");
const expressError = require("../util/expressError")
const movieFunctions = require("../util/movieFunctions")

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
    //getDocId
    const user = auth.currentUser;
    const userQuery = query(collection(db, 'User'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(userQuery);
    const id = querySnapshot.docs[0].id;

    //inputs
    const {tmdbId} = req.params;
    const parentDocPath =  `User/${id}`;
    const subCollectionName = 'movies';

    //Movie Doc Query
    const query2 = query(collection(db, 'Movie'), where('tmdbId', '==', Number(tmdbId)));
    const movie = await getDocs(query2);
    const movieId = movie.docs[0].id;
    const data = movie.docs[0].data();

    //if movie in subCollection
    const response = await movieFunctions.hasSubcollection(parentDocPath, subCollectionName);
    if (response.length > 0) {
        const result = movieFunctions.findObjectById(response, tmdbId);
        if (result !== undefined) {
            const oldOptions = {
                "rating" : result.rating,
                "favourite" : result.favourite,
                "watched" : result.watched,
                "watchLater" : result.watchLater
            }
            const { rating = oldOptions.rating,
                favourite = oldOptions.favourite,
                watched = oldOptions.watched,
                watchLater = oldOptions.watchLater
            } = req.body;
            // checks for previous updates
            const favCheck = oldOptions.favourite == favourite;
            const ratingCheck = oldOptions.rating === 0 && rating !== 0;
            //updating user's subcollection
            const userUpdates = {
                "rating": rating,
                "favourite": favourite,
                "watched" : watched,
                "watchLater" : watchLater
            }
            const updatedDoc = await updateDoc(doc(User, id, subCollectionName, result.uid), userUpdates);
            //updating movie doc
            const movieUpdates = {
                "rating" : rating === 0 ? 0 : ((data.rating * data.numRating ) - oldOptions.rating + rating) / (data.numRating),
                "favourite" : increment(favCheck ? 0 : favourite ? 1 : -1),
                "numRating" : increment(ratingCheck ? 1 : 0)
            }
            await updateDoc(doc(Movie, movieId),movieUpdates );
            res.send(updatedDoc);
            return;
        }
    }

    const { rating = 0, favourite = false, watched = false, watchLater = false} = req.body;
    //Movie not in subCollection, put it in subCollection and update watch option parameters
    const movieUpdates = {
        "rating" : rating === 0 ? data.rating : ((data.rating * data.numRating) + rating) / (data.numRating + 1),
        "favourite" : increment(favourite ? 1 : 0),
        "numRating" : increment(rating === 0 ? 0 : 1)
    }
    await updateDoc(doc(Movie, movieId), movieUpdates );

    const obj = { 
        "rating": rating,
        "favourite": favourite,
        "watched" : watched,
        "watchLater" : watchLater,
        "id" : movieId,
        "tmdbId" : tmdbId
    }
    const parentDoc = doc(User, id);
    const subcollectionRef = collection(parentDoc, subCollectionName);
    const subCollection = await addDoc(subcollectionRef, obj);
    res.send(subCollection);
};


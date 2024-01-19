require("dotenv").config();
const axios = require("axios")
const { db } = require("../firebaseConfig")
const {collection, getDocs, doc, addDoc, updateDoc } = require("firebase/firestore/lite")
const User = collection(db, "User");
const expressError = require("../util/expressError")
const movieFunctions = require("../util/movieFunctions")

module.exports.getMovies = async (req, res, next) => {
    const { parameter } = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${parameter}?api_key=${process.env.TMDB_API_KEY}`);
    if(!response){
        return next(new expressError("Error Fetching Popular Movies", 500))
    }
    const movies = response.data.results;
    res.json({ movies });
}

module.exports.giveRating = async (req, res, next) => {
    const { id, movieId } = req.params;
    const parentDocPath =  `User/${id}`;
    const response = await movieFunctions.hasSubcollection(parentDocPath, 'movies');
    if (response.length > 0) {
        console.log("Hello")
        const result = movieFunctions.findObjectById(response, movieId);
        if (result !== undefined) {
            console.log("World");
            const { rating = result.rating, favourite = result.favourite } = req.body;
            const updatedDoc = await updateDoc(doc(User, id, 'movies', result.uid), {"rating": rating, "favourite": favourite});
            res.send(updatedDoc);
            return;
            next();
        }
    }
    const movie = await movieFunctions.getMovieById(movieId);
    if (!movie) {
        return next(new expressError(`No Movie with id ${movieId} available`, 404));
    }
    const data = movie[0];
    const { rating = 0, favourite = false } = req.body;
    const obj = {
        "id": data.id,
        "title": data.original_title,
        "rating": rating,
        "favourite": favourite
    }
    const parentDoc = doc(User, id);
    const subcollectionRef = collection(parentDoc, 'movies');
    const subCollection = await addDoc(subcollectionRef, obj);
    res.send(subCollection);
};


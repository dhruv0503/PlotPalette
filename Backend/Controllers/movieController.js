require("dotenv").config();
const axios = require("axios")
const { db } = require("../firebaseConfig")
const {collection, getDoc, doc, addDoc } = require("firebase/firestore/lite")
const User = collection(db, "User");
const expressError = require("../util/expressError")

const getUserById = async (id) => {
    const docRef = doc(User, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

const getMovieById = async(id) => {
    const external_id_object = await axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.TMDB_API_KEY}`)
    const movie = await axios.get(`https://api.themoviedb.org/3/find/${external_id_object.data.imdb_id}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`);
    return movie.data.movie_results;

}

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
    const { rating } = req.body;
    const response = await getMovieById(movieId);
    const data = response[0];
    if(!response){
        return next(new expressError(`No Movie with id ${movieId} available`, 404));
    }
    const obj = {
        "id" : data.id,
        "title" : data.original_title,
        "rating" : rating
    }
    const parentDoc = doc(User, id);
    const subcollectionRef = collection(parentDoc, 'movies');
    const subCollection = await addDoc(subcollectionRef,obj);
    console.log(subCollection);
    res.send("Subcollection Added");
};

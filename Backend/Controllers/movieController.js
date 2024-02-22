require("dotenv").config();
const axios = require("axios");
const { db, auth } = require("../firebaseConfig");
const { query, where, collection, doc, addDoc, updateDoc, getDocs, increment, getDoc } = require("firebase/firestore/lite");
const User = collection(db, "User");
const Movie = collection(db, "Movie");
const expressError = require("../util/expressError");
const movieFunctions = require("../util/movieFunctions");
const utilityFunctions = require("../util/utlityFunctions");

module.exports.getMovie = async (req, res, next) => {
    const { tmdbId } = req.params;
    const userRef = auth.currentUser;
    const userQuery = query(collection(db, 'Movie'), where('tmdbId', '==', Number(tmdbId)));
    const querySnapshot = await getDocs(userQuery);
    
    if (querySnapshot.docs.length > 0) {
        const movieData = querySnapshot.docs[0];
        if (userRef !== null) {
            const user = await utilityFunctions.getUser(userRef);
            const movies = await getDocs(collection(User, user.id, 'movies'))
            const movieObj = movies.docs.find(ele => ele.data().tmdbId == tmdbId);

            if (!movies || !movieObj) {
                const obj = { watched: false, tmdbId, movieId: movieData.id }
                await addDoc(collection(User, user.id, 'movies'), obj);
                res.send({ watched: false, ...movieData.data() })
                return;
            }
            if (movieObj.data().watched) {
                res.send({ watched: true, ...movieData.data() })
                return;
            }
        }
        res.send({ watched: false, ...movieData.data() });

    } else {
        const path = "https://image.tmdb.org/t/p/original"
        const movie = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}`)
        const credits = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${process.env.TMDB_API_KEY}`)
        const providers = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`)

        const cast = credits.data.cast;
        const data = movie.data;
        const mid = providers.data.results.US;
        const platforms = movieFunctions.removeField(mid, 'link');

        const movieObj = { "tmdbId": data.id, "title": data.title, "language": data.original_language, "overview": data.overview, "poster_path": path + data.poster_path, "release_date": data.release_date, "reviewCount": 0, "rating": 0, "numRating": 0, "favourite": 0, "reviews": [], "genres": data.genres, "production_companies": data.production_companies, "runTime": data.runtime, cast, platforms };

        const newMovie = await addDoc(Movie, movieObj);
        const newMovieData = await getDoc(Movie, newMovie.id);

        if (userRef !== null) {
            const user = await utilityFunctions.getUser(userRef);
            const movies = await getDocs(collection(User, user.id, 'movies'))
            const movieObj = movies.docs.find(ele => ele.data().tmdbId == tmdbId);
            if (!movies || !movieObj) {
                const obj = { watched: false, tmdbId, movieId: newMovieData.id }
                await addDoc(collection(User, user.id, 'movies'), obj);
                res.send({ watched: false, id: newMovieData.id, ...newMovieData.data() })
                return;
            }
            if (movieObj.data().watched) {
                res.send({ watched: true, id: newMovieData.id, ...newMovieData.data() })
                return;
            }
        }
        res.send({ watched: false, id: newMovieData.id, ...newMovieData.data() });
    }
}

//now_playing
//popular
//top_rated
//upcoming
module.exports.getMovieList = async (req, res, next) => {
    const { parameter } = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${parameter}?api_key=${process.env.TMDB_API_KEY}`);
    if (!response) {
        return next(new expressError("Error Fetching Popular Movies", 500))
    }
    const movies = response.data.results;
    res.json({ movies });
}

module.exports.watched = async (req, res, next) => {
    const userRef = auth.currentUser;
    const user = await utilityFunctions.getUser(userRef);
    const { tmdbId } = req.params;
    const movieData = await utilityFunctions.getMovie(tmdbId);

    const movies = await getDocs(collection(User, user.id, 'movies'));
    const movieObj = movies.docs.find(ele => ele.data().tmdbId == tmdbId);

    await updateDoc(doc(User, user.id, 'movies', movieObj.id), { watched: true, watchLater: false });
    await updateDoc(doc(Movie, movieData.id), { watched: increment(1), watchLater: movieObj.data().watchLater ? increment(-1) : increment(0) })

    const updatedDoc = await getDoc(doc(User, user.id, 'movies', movieObj.id));
    res.send(updatedDoc.data());

}

module.exports.movieOptions = async (req, res, next) => {
    const user = auth.currentUser;
    const { tmdbId } = req.params;
    const userObj = await utilityFunctions.getUser(user);
    const movieObj = await utilityFunctions.getMovie(Number(tmdbId));
    const subCollectionName = 'movies';

    const response = await movieFunctions.hasSubcollection(userObj.id, subCollectionName);
    const result = movieFunctions.findObjectById(response, tmdbId);

    if (result.watched) {
        const { rating = result.rating, favourite = result.favourite } = req.body;
        const favCheck = result.favourite == favourite;
        const ratingCheck = result.rating === 0 && rating !== 0;
        const userUpdates = { rating, favourite }

        await updateDoc(doc(User, userObj.id, subCollectionName, result.id), userUpdates);
        const updatedDoc = await getDoc(doc(User, userObj.id, subCollectionName, result.id));

        const movieUpdates = {
            "rating": rating === 0 ? 0 : ((movieObj.rating * movieObj.numRating) - result.rating + rating) / (movieObj.numRating),
            "favourite": increment(favCheck ? 0 : favourite ? 1 : -1),
            "numRating": increment(ratingCheck ? 1 : 0)
        }
        await updateDoc(doc(Movie, movieObj.id), movieUpdates);

        res.send(updatedDoc.data());
        return;
    }
    else {
        const { watchLater = result.watchLater } = req.body;
        const check = result.watchLater == watchLater;
        const userUpdates = { watchLater }

        await updateDoc(doc(User, userObj.id, subCollectionName, result.id), userUpdates);
        const updatedDoc = await getDoc(doc(User, userObj.id, subCollectionName, result.id));

        const movieUpdates = {
            watchLater: check ? increment(0) : watchLater ? increment(1) : increment(-1)
        }
        await updateDoc(doc(Movie, movieObj.id), movieUpdates);

        res.send(updatedDoc.data());
        return;
    }
};

module.exports.getReviews = async (req, res, next) => {
    const { tmdbId } = req.params;
    const userRef = auth.currentUser
    const reviewId = utilityFunctions.getReviewId(userRef);
    const movieObj = utilityFunctions.getMovie(tmdbId)
    const userQuery = query(collection(db, 'Review'), where('movieId', '==', String(movieObj.movieId)));
    const querySnapshot = await getDocs(userQuery);
    const reviews = querySnapshot.docs.map(ele => ({ "reviewId": ele.id, ...ele.data() }));
    if (reviewId === null) res.send(reviews)
    else res.send({ "reviewId": reviewId, ...reviews });
}

module.exports.getMovieByGenre = async (req, res, next) => {
    const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];

    const { genre } = req.params;
    const id = genres.find(mov => (mov.name == genre)).id;

    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${id};`);
    const movies = response.data;
    res.send(movies);
}

module.exports.getCastMember = async (req, res, next) => {
    const { castId } = req.params;

    const castInfo = await axios.get(`https://api.themoviedb.org/3/person/${castId}?api_key=${process.env.TMDB_API_KEY}`)
    const castMovies = await axios.get(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${process.env.TMDB_API_KEY}`)

    const info = castInfo.data;
    const movies = castMovies.data.cast;

    const obj = { ...info, "cast": movies };
    res.send(obj);
}

const { db, auth } = require("./firebaseConfig");
const expressError = require("./util/expressError");
const { collection, getDocs, query, where, doc } = require("firebase/firestore");
const utilityFunctions = require("./util/utlityFunctions")
const User = collection(db, "User")

module.exports.authorizeRoles = (role) => {
    return async (req, res, next) => {
        const user = auth.currentUser;

        const userQuery = query(collection(db, 'User'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const currentRole = userDoc.data().role;

            if (role !== currentRole) {
                return next(new expressError(`Role: ${currentRole} is not allowed to access this resource`, 403));
            }

            next();
        } else {
            return next(new expressError("User Document not found"), 404)
        }
    }
};

module.exports.isLoggedIn = () => {
    return async (req, res, next) => {
        const userRef = auth.currentUser;
        if (userRef === null) return next(new expressError("You need to be logged in", 401));
        next();
    }
}

module.exports.isWatched = (parameter) => {
    return async (req, res, next) => {
        const {tmdbId} = req.query;
        const user = auth.currentUser;
        const userObj = await utilityFunctions.getUser(user);
        const movie = await utilityFunctions.getMovie(tmdbId);
        const movies = await getDocs(collection(db(User, userObj.id), 'movies'))
        const movieObj = movies.docs.find(ele => ele.data().movieId == movie.id);
        if (!movieObj.data().watched) {
            if (parameter == "fav") {
                return next(new expressError("You need to watch the movie before assigning it favourite", 400))
            }
            else if (parameter == "rate") {
                return next(new expressError("You need to watch the movie before rating it", 400))
            }
            else if (parameter == "review") {
                return next(new expressError("You need to watch the movie before reviewing it", 400))
            }
        }
        next();
    }
}

module.exports.singleReview = () => {
    return async (req, res, next) => {
        const { tmdbId } = req.query;
        const userRef = auth.currentUser;
        const user = await utilityFunctions.getUser(userRef);
        const moviesRef = await getDocs(collection(doc(User, user.id), "movies"));
        const movie = moviesRef.docs.find((ele) => ele.data().tmdbId == tmdbId);
        if (movie) {
            if (movie.data().reviewId) {
                next(new expressError("You can't leave two reviews on the same movie", 400))
            }
            next()
        }
    }
}
const { db, auth } = require("./firebaseConfig");
const expressError = require("./util/expressError");
const { collection, getDocs, query, where } = require("firebase/firestore/lite");
const Review = collection(db, "Review")
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

module.exports.isWatched = () => {
    return async (req, res, next) => {
        const { tmdbId } = req.params
        const user = auth.currentUser;
        const userObj = await utilityFunctions.getUser(user);
        const movie = await utilityFunctions.getMovie(tmdbId);
        const movies = await getDocs(collection(User, userObj.id, 'movies'))
        const movieObj = movies.docs.find(ele => ele.data().movieId == movie.id);
        if (!movieObj.data().watched) return next(new expressError("You can't leave reviews without watching the movie", 400))
        next();
    }
}

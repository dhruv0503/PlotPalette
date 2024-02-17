const { db, auth } = require("../firebaseConfig");
const expressError = require("../util/expressError");
const { collection, getDocs, query, where } = require("firebase/firestore/lite");
const Review = collection(db, "Review")

module.exports.authorizeRoles = (role) => {
    return async (req, res, next) => {
        const user = auth.currentUser;

        if (user) {
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
        } else {
            return next(new expressError("You need to login"), 401)
        }
    };
};


//return reviewId
module.exports.isOwner = async (req, res, next) => {
    const user = auth.currentUser;
    if (user) {
        const snapShot = await getDocs(Review); // you alrady have reviews array from backend, update it at frontend as required
        if (!snapShot.empty) {
            const reviews = snapShot.docs.map((doc) => ({ ...doc.data() }));
            const result = reviews.find(doc => doc.userId == user.id);
            if (!result) {
                return next(new expressError("You can't edit or delete a review written by someone else"), 403);
            }
            next();
        } else {
            return next(new expressError("No reviews on the movie"), 404);
        }
    } else {
        return next(new expressError("You need to login"), 401)
    }
}
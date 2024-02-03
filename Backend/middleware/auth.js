const { db, auth } = require("../firebaseConfig");
const expressError = require("../util/expressError");
const { collection, getDocs, query, where } = require("firebase/firestore/lite");

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
                res.status(404).send("User document not found");
            }
        } else {
            res.status(401).send("You need to login");
        }
    };
};


const {db, auth} = require("../firebaseConfig")
const functions = require("firebase-functions")
const {collection} = require("firebase/firestore/lite")
const User = collection(db, "User")

const fieldFinder = (oldObj, newObj) => {
    const changedFields = [];
    for (const key in newObj) {
        if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
            changedFields.push({key, "value" : newObj[key]});
        }
    }
    return changedFields;
}

const getUserActivityData = (userId, subMovieId) => {
    exports.getUserActivityData = functions.firestore
        .document(`User/${userId}/movies/${subMovieId}`)
        .onUpdate((change) => {
            const oldObj = change.before.data();
            const newObj = change.after.data();
            const changedFields = fieldFinder(oldObj, newObj);
            const activityWindow = changedFields.map((event) => {
                if(event.key == 'rating') return `Rating updated for ${newObj.title} to ${newObj.rating}`;
                else if(event.key == 'favourite') return `${newObj.title} has been favourited`;
                else  return `${newObj.title} has been marked Watch Later`;
            })
            return;
        })
}
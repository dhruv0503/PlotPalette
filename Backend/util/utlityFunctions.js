const { db } = require("../firebaseConfig");
const { query, where, collection, getDocs, getDoc} = require("firebase/firestore/lite");
const User = collection(db, 'User')

module.exports.getUser = async (user) => {
    const userQuery = query(collection(db, 'User'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(userQuery);
    const data = querySnapshot.docs[0].data();
    const id = querySnapshot.docs[0].id;
    const result = { "id": id, ...data };
    return result;
}

module.exports.getMovie = async (tmdbId) => {
    const querySol = query(collection(db, 'Movie'), where('tmdbId', '==', Number(tmdbId)));
    const movie = await getDocs(querySol);
    const movieId = movie.docs[0].id;
    const data = movie.docs[0].data();
    const result = { "id" : movieId, ...data };
    return result;
}

module.exports.getUserById = async (id) => {
    const docRef = doc(User, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

module.exports.getReviewId = async(user) => {
    const userData = await utilityFunctions.getUser(user);
    const movieDoc = await getDocs(collection(User, userData.id, 'movies'));
    const movie = movieDoc.docs.find(ele => ele.tmdbId == String(tmdbId))
    if(movie.reviewId) return movie.reviewId
    else return null;
}
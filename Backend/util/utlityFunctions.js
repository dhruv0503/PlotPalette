const { db } = require("../firebaseConfig");
const { query, where, collection, getDocs, getDoc} = require("firebase/firestore/lite");

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
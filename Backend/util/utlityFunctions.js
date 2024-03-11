const { db } = require("../firebaseConfig");
const { query, where, collection, getDocs, getDoc} = require("firebase/firestore/lite");
const User = collection(db,"User");

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

module.exports.getSubCollectionMovies = async(user, tmdbId) => {
    const userObj = await module.exports.getUser(user);
    const response = await module.exports.hasSubcollection(userObj.id, 'movies');
    const result = response.find((doc) => doc.tmdbId == tmdbId);
    return result;
}

module.exports.hasSubcollection = async(userId, subcollectionName) => {
    const subcollectionSnapshot = await getDocs(collection(User, userId, subcollectionName));
    const subcollectionData = subcollectionSnapshot.docs.map(doc => ({ "id" : doc.id, ...doc.data() }));
    return  subcollectionData ;
}

module.exports.removeField = (obj, fieldToRemove) => {
    const { [fieldToRemove]: removedField, ...rest } = obj;
    return rest;
  };
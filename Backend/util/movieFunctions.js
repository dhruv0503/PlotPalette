const { db } = require("../firebaseConfig")
const { collection, getDocs, doc} = require("firebase/firestore/lite")
const axios = require("axios");
const User = collection(db, "User");

module.exports.getMovieById = async(id) => {
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`)
    return movie.data;
}

module.exports.hasSubcollection = async(userId, subcollectionName) => {
    const subcollectionSnapshot = await getDocs(collection(User, userId, subcollectionName));
    const subcollectionData = subcollectionSnapshot.docs.map(doc => ({ "id" : doc.id, ...doc.data() }));
    
    return  subcollectionData ;
}

module.exports.findObjectById = (array, id)=>{
    const result = array.find(doc => doc.tmdbId == id);
    return result;
}

module.exports.removeField = (obj, fieldToRemove) => {
    const { [fieldToRemove]: removedField, ...rest } = obj;
    return rest;
  };
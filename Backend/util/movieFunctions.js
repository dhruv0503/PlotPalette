const { db } = require("../firebaseConfig")
const {collection, getDoc, getDocs, doc} = require("firebase/firestore/lite")
const axios = require("axios");
const User = collection(db, "User");

module.exports.getUserById = async (id) => {
    const docRef = doc(User, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

module.exports.getMovieById = async(id) => {
    const external_id_object = await axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.TMDB_API_KEY}`)
    const movie = await axios.get(`https://api.themoviedb.org/3/find/${external_id_object.data.imdb_id}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`);
    return movie.data.movie_results;
}

module.exports.hasSubcollection = async(parentDocPath, subcollectionName) => {
    const parentDocRef = doc(db, parentDocPath);
    const subcollectionRef = collection(parentDocRef, subcollectionName);
    const subcollectionSnapshot = await getDocs(subcollectionRef);
    const subcollectionData = subcollectionSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    
    return  subcollectionData ;
}

module.exports.findObjectById = (array, id)=>{
    const result = array.find(doc => doc.id == id);
    console.log(result);
    return result;
}

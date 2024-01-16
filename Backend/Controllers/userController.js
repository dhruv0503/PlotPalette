const { db } = require("../firebaseConfig")
const {collection, getDoc, getDocs, doc, updateDoc } = require("firebase/firestore/lite")
const User = collection(db, "User");

module.exports.getAllUsers = async(req,res, next) => {
    const allUsers = await getDocs(User);
    let userArray = [];
    allUsers.forEach((doc) => {
        userArray.push({"id" : doc.id, ...doc.data()});
    });
    res.send(userArray);
}

module.exports.findUser = async(req,res, next) => {
    const { id }= req.params;
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);
    res.send(docSnap.data());
}

module.exports.makeAdmin = async(req, res, next) => {
    const { id } = req.params;
    const docRef = doc(db, "User", id);
    await updateDoc(docRef, {
        "role" : "Admin"
    })
    res.send(`User with id : ${id} is now an admin`);
}
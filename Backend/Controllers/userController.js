const db = require("../firebaseConfig")
const {collection, getDoc, getDocs, addDoc, doc } = require("firebase/firestore/lite")

module.exports.newUser = async(req, res) => {
    const data = req.body;
    console.log(data);
    const docRef = await addDoc(collection(db, "User"),data)
    res.send(`User Added with id ${docRef.id}`);
}

module.exports.getAllUsers = async(req,res) => {
    const allUsers = await getDocs(collection(db, "User"));
    let userArray = [];
    allUsers.forEach((doc) => {
        userArray.push({"id" : doc.id, ...doc.data()});
    });
    res.send(userArray);
}

module.exports.findUser = async(req,res) => {
    const { id }= req.params;
    const docRef = doc(db, "User", id);
    const docSnap = await getDoc(docRef);
    res.send(docSnap.data());

}
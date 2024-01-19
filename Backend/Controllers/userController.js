const { db } = require("../firebaseConfig")
const {collection, getDoc, getDocs, doc, updateDoc } = require("firebase/firestore/lite")
const User = collection(db, "User");

const getUserById = async (id) => {
    const docRef = doc(User, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

module.exports.getAllUsers = async (req, res, next) => {
    const allUsersSnapshot = await getDocs(User);
    const userArray = allUsersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(userArray);
};

module.exports.findUser = async (req, res, next) => {
    const { id } = req.params;
    const userData = await getUserById(id);
    res.send(userData);
};

module.exports.makeAdmin = async (req, res, next) => {
    const { id } = req.params;
    await updateDoc(doc(User, id), { role: "Admin" });
    res.send(`User with id: ${id} is now an admin`);
};
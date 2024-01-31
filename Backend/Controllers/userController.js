const { db } = require("../firebaseConfig")
const {collection, getDoc, getDocs, doc, updateDoc } = require("firebase/firestore/lite")
const User = collection(db, "User");
const movieFunctions = require("../util/movieFunctions")
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

module.exports.optionsList = async(req,res,next) => {
    const { id, parameter } = req.params;
    const parentDocPath =  `User/${id}`;
    const response = await movieFunctions.hasSubcollection(parentDocPath, 'movies');
    let list = [];
    response.map(obj => {
        if(obj[parameter]){
            const newObject = movieFunctions.removeField(obj, 'uid')
            list.push(newObject);
        }
    })
    res.send(list);
}

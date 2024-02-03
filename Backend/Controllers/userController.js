const { db } = require("../firebaseConfig")
const { collection, getDocs, doc, updateDoc } = require("firebase/firestore/lite")
const User = collection(db, "User");
const movieFunctions = require("../util/movieFunctions")
const utilityFunctions = require("../util/utlityFunctions")


//Admin Route (Used to get all users informtaion)
module.exports.getAllUsers = async (req, res, next) => {
    const allUsersSnapshot = await getDocs(User);
    const userArray = allUsersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(userArray);
};

//Admin Route (Used to make admins)
module.exports.makeAdmin = async (req, res, next) => {
    const { id } = req.params;
    await updateDoc(doc(User, id), { role: "Admin" });
    res.send(`User with id: ${id} is now an admin`);
};

//User Search
module.exports.findUser = async (req, res, next) => {
    const { id } = req.params;
    const userData = await utilityFunctions.getUserById(id);
    res.send(userData);
};



//shows all rated / favourited / watched etc. hence parameter.
//Note : Put all the parameters in a comment
module.exports.optionsList = async (req, res, next) => {
    const { id, parameter } = req.params;
    const parentDocPath = `User/${id}`;
    const response = await movieFunctions.hasSubcollection(parentDocPath, 'movies');
    let list = [];
    response.map(obj => {
        if (obj[parameter]) {
            const newObject = movieFunctions.removeField(obj, 'uid')
            list.push(newObject);
        }
    })
    res.send(list);
}

//for user to get review, plan to show case it on top in the comment section of the movie (login necessary)

const { db, auth } = require("../firebaseConfig")
const { collection, getDocs, getDoc, doc, updateDoc, increment, arrayRemove, query, where } = require("firebase/firestore/lite")
const User = collection(db, "User");
const utilityFunctions = require("../util/utlityFunctions");
const expressError = require("../util/expressError");


//Admin Route (Used to get all users informtaion)
module.exports.getAllUsers = async (req, res, next) => {
    const allUsersSnapshot = await getDocs(User);
    const userArray = allUsersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(userArray);
};

//User Search
module.exports.findUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await getDoc(doc(User, id));
    res.send(user.data());
};

module.exports.getUserByUsername = async(req, res, next) => {
    const { userName } = req.query;
    const usersRef = await getDocs(User);
    const user = usersRef.docs.find((ele) => ele.data().userName == userName);
    if(user) res.send(user.data())
    else next(new expressError("No such user exists", 404))
}

module.exports.getProfile = async(req, res, next) => {
    const userRef = auth.currentUser
    const userQuery = query(collection(db, 'User'), where('uid', '==', userRef.uid));
    const querySnapshot = await getDocs(userQuery);
    const data = querySnapshot.docs[0].data();

    const subCollectionMovies = await getDocs(collection(doc(User, querySnapshot.docs[0].id), 'movies'));
    const moviesWithNull = subCollectionMovies.docs.map((ele) => ele.data().favourite ? ele.data() : null)
    const movies = moviesWithNull.filter(ele => ele !== null);
    data.movies = movies;
    data.id = querySnapshot.docs[0].id;
    res.send(data);
}

//Admin Route (Used to make admins)
module.exports.makeAdmin = async (req, res, next) => {
    const { id } = req.params;
    await updateDoc(doc(User, id), { role: "Admin" });
    res.send(`User with id: ${id} is now an admin`);
};

//shows all rated / favourited / watched etc. hence parameter.
//Note : Put all the parameters in a comment
module.exports.optionsList = async (req, res, next) => {
    const { parameter, userId } = req.query;
    const response = await utilityFunctions.hasSubcollection(userId, 'movies');
    const list = response.map(obj => {
        if (obj[parameter]) {
            const newObject = utilityFunctions.removeField(obj, 'movieId')
            return newObject;
        }else return null;
    })
    const filteredList = list.filter((ele) => ele !== null);
    res.send(filteredList);
}

//friendList
module.exports.friendList = async(req, res, next) => {
    const {userId} = req.params;
    const user = await getDoc(doc(User, userId));
    const userData = user.data();
    const friendList = userData.friendList;
    res.send(friendList);
}

//removeFriend
module.exports.removeFriend = async(req, res, next) => {
    const {userId} = req.params;
    const user = auth.currentUser
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id), {
        friendCount : increment(-1),
        friendList : arrayRemove(userId)
    });
    await updateDoc(doc(User, userId), {
        friendCount : increment(-1),
        friendList : arrayRemove(mainUser.id)
    });
    const userResult = await getDoc(doc(User, mainUser.id));
    res.send(userResult.data());
}

module.exports.updateBio = async(req, res, next) => {
    const {bio} = req.body;
    const userRef =  auth.currentUser;
    const user = await utilityFunctions.getUser(userRef);

    await updateDoc(doc(User, user.id), {bio});

    const updatedUser = await getDoc(doc(User, user.id));
    res.send(updatedUser.data());
}
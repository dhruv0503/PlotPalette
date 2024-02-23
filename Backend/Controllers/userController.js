const { db, auth } = require("../firebaseConfig")
const { collection, getDocs, getDoc, doc, updateDoc, increment, arrayRemove } = require("firebase/firestore/lite")
const User = collection(db, "User");
const movieFunctions = require("../util/movieFunctions")
const utilityFunctions = require("../util/utlityFunctions");
const { sendPasswordResetEmail } = require("firebase/auth");
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
    const userQuery = query(collection(db, 'User'), where('uid', '==', id));
    const querySnapshot = await getDocs(userQuery);
    const data = querySnapshot.docs[0].data();
    res.send(data);
};

//Admin Route (Used to make admins)
module.exports.makeAdmin = async (req, res, next) => {
    const { id } = req.params;
    await updateDoc(doc(User, id), { role: "Admin" });
    res.send(`User with id: ${id} is now an admin`);
};

//shows all rated / favourited / watched etc. hence parameter.
//Note : Put all the parameters in a comment
module.exports.optionsList = async (req, res, next) => {
    const { parameter } = req.params;

    const userRef = auth.currentUser;
    const user = await utilityFunctions.getUser(userRef)

    const parentDocPath = `User/${user.id}`;
    const response = await movieFunctions.hasSubcollection(parentDocPath, 'movies');
    let list = [];
    response.map(obj => {
        if (obj[parameter]) {
            const newObject = movieFunctions.removeField(obj, 'movieId')
            list.push(newObject);
        }
    })
    res.send(list);
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

module.exports.resetPassword = async(req, res, next, error) => {
    const {email} = req.body;
    const redirectUrl = "localhost:3000/api/auth/login";
    try{
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({message : 'Password reset email sent successfully.', redirectUrl})
    }
    catch(error){
        next(new expressError(500, "Error sending reset password email"));
    }
}

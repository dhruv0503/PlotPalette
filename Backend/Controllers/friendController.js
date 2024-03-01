const { db, auth } = require("../firebaseConfig")
const { collection, getDoc, doc, updateDoc, increment, arrayUnion, arrayRemove } = require("firebase/firestore/lite")
const User = collection(db, "User");
const utilityFunctions = require("../util/utlityFunctions")

//requestList
module.exports.requestList = async(req, res, next) => {
    const {userId} = req.params;
    const user = await getDoc(doc(User, userId));
    const userData = user.data();
    const requestList = userData.requestList;
    res.send(requestList);
}

//Send Request
module.exports.addFriend = async(req, res, next) => {
    const {userId} = req.params;
    const currentUser = auth.currentUser;
    const reqSender = await utilityFunctions.getUser(currentUser);
    await updateDoc(doc(User, userId), {
        requestList : arrayUnion(reqSender.id)
    })
    const userResult = await getDoc(doc(User, userId));
    res.send(userResult.data());
}

//Accept Request
module.exports.acceptFriend = async(req,res, next) => {
    const {userId} = req.params;
    const user = auth.currentUser;
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id),{
        friendCount : increment(1),
        friendList : arrayUnion(userId),
        requestList : arrayRemove(userId)
    })
    await updateDoc(doc(User,userId), {
        friendCount : increment(1),
        friendList : arrayUnion(mainUser.id)
    })

    res.send({msg : "Request Accepted"});
}

//Deny Request
module.exports.denyFriend = async(req, res, next) => {
    const {userId} = req.params;
    const user = auth.currentUser;
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id), {
        requestList : arrayRemove(userId)
    })
    const userResult = await getDoc(doc(User, mainUser.id));
    res.send({"msg" : "Request Denied", ...userResult.data()});
}


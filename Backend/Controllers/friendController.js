const { db, auth } = require("../firebaseConfig")
const { collection, getDoc, doc, updateDoc, increment, arrayUnion, arrayRemove } = require("firebase/firestore/lite")
const User = collection(db, "User");
const utilityFunctions = require("../util/utlityFunctions")

//requestList
module.exports.requestList = async(req, res, next) => {
    const userRef = auth.currentUser;
    const userData = await utilityFunctions.getUser(userRef);
    const requestList = userData.requestList;
    res.send(userData);
}

//Send Request
module.exports.addFriend = async(req, res, next) => {
    const {userId} = req.query;
    const currentUser = auth.currentUser;
    const reqSender = await utilityFunctions.getUser(currentUser);
    await updateDoc(doc(User, userId), {
        requestList : arrayUnion({id : reqSender.id, userName : reqSender.userName, sent : true})
    })
    const userResult = await getDoc(doc(User, userId));
    res.send(userResult.data());
}

//Accept Request
module.exports.acceptFriend = async(req,res, next) => {
    const {userId} = req.query;
    const user = auth.currentUser;
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id),{
        friendCount : increment(1),
        friendList : arrayUnion(userId),
        requestList : arrayRemove(userId)
    })
    await updateDoc(doc(User,userId), {
        friendCount : increment(1),
        friendList : arrayUnion({id : mainUser.id, userName : mainUser.userName})
    })

    res.send({msg : "Request Accepted"});
}

//Deny Request
module.exports.denyFriend = async(req, res, next) => {
    const {userId} = req.query;
    const user = auth.currentUser;
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id), {
        requestList : arrayRemove(userId)
    })
    const userResult = await getDoc(doc(User, mainUser.id));
    res.send({"msg" : "Request Denied", ...userResult.data()});
}

module.exports.removeFriend = async(req, res, next) => {
    const {userId} = req.query;
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

module.exports.friendList = async(req, res, next) => {
    const {userId} = req.query;
    const user = await getDoc(doc(User, userId));
    const userData = user.data();
    const friendList = userData.friendList;
    res.send(friendList);
}
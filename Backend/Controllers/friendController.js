const { db, auth } = require("../firebaseConfig")
const { collection, getDoc, doc, updateDoc, increment, arrayUnion, arrayRemove } = require("firebase/firestore/lite")
const User = collection(db, "User");
const utilityFunctions = require("../util/utlityFunctions")

//requestList
module.exports.requestList = async (req, res, next) => {
    const userRef = auth.currentUser;
    const userData = await utilityFunctions.getUser(userRef);

    const data = { reqList :userData.requestList, frenList : userData.friendList}
    res.send(data);

}

//Send Request
module.exports.addFriend = async (req, res, next) => {
    const { userId } = req.query;
    const currentUser = auth.currentUser;
    const reqSender = await utilityFunctions.getUser(currentUser);
    await updateDoc(doc(User, userId), {
        requestList: arrayUnion({ id: reqSender.id, userName: reqSender.userName, sent: true })
    })
    const userResult = await getDoc(doc(User, userId));
    res.send(userResult.data());
}

//Accept Request

module.exports.acceptFriend = async(req,res, next) => {
    const {userId} = req.query;

    const reqSender = await getDoc(doc(User, userId));
    const reqSenderData = reqSender.data();
    const user = auth.currentUser;
    const mainUser = await utilityFunctions.getUser(user);

    await updateDoc(doc(User, mainUser.id),{
        friendCount : increment(1),
        friendList : arrayUnion({id : userId, userName : reqSenderData.userName}),
        requestList : arrayRemove({id : userId, userName : reqSenderData.userName, sent : true})

    })
    await updateDoc(doc(User, userId), {
        friendCount: increment(1),
        friendList: arrayUnion({ id: mainUser.id, userName: mainUser.userName })
    })

    res.send({ msg: "Request Accepted" });
}

//Deny 
module.exports.denyFriend = async(req, res, next) => {
    const {userId} = req.query;

    const reqSender = await getDoc(doc(User, userId));
    const reqSenderData = reqSender.data();
    const user = auth.currentUser;
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id), {

        requestList : arrayRemove({id : userId, userName : reqSenderData.userName, sent : true})

    })
    const userResult = await getDoc(doc(User, mainUser.id));
    res.send({ "msg": "Request Denied", ...userResult.data() });
}


module.exports.removeFriend = async(req, res, next) => {
    const {userId} = req.query;

    const reqSender = await getDoc(doc(User, userId));
    const reqSenderData = reqSender.data();
    const user = auth.currentUser
    const mainUser = await utilityFunctions.getUser(user);
    await updateDoc(doc(User, mainUser.id), {

        friendCount : increment(-1),
        friendList : arrayRemove({id : userId, userName : reqSenderData.userName})
    });
    await updateDoc(doc(User, userId), {
        friendCount : increment(-1),
        friendList : arrayRemove({id : mainUser.id, userName : mainUser.userName})

    });
    const userResult = await getDoc(doc(User, mainUser.id));
    res.send(userResult.data());
}

module.exports.friendList = async (req, res, next) => {
    const { userId } = req.query;
    const user = await getDoc(doc(User, userId));
    const userData = user.data();
    const friendList = userData.friendList;
    res.send(friendList);
}
const { db ,auth } = require("../firebaseConfig");
const {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} = require("firebase/auth");
const {addDoc, collection, getDoc, doc} = require("firebase/firestore/lite")
const User = collection(db, "User");

module.exports.signUp = async(req, res, next) => {
    const data = req.body;
    const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
    delete data.password;
    const formattedTime = new Date(Date.now()).toLocaleString();
    const docRef = await addDoc(User,{...data, "uid" : newUser.user.uid, "role" : "User", "joinedOn" : formattedTime, "friendCount" : 0, "friendList" : [], "requestList" : [] });
    res.send({"msg" : `User Added with id ${docRef.id}`});
}

module.exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const signInObj = await signInWithEmailAndPassword(auth, email, password);
   try { const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
    if (user) {
        res.send({success : true,"msg" : `Signed in with id: ${signInObj.user.uid}`, signInObj});
    } else {
        next(new expressError('Error signing in: User not found', 404));
    }}
    catch (error) {
        console.log(error);
        res.json({ success: false })

    }
};


module.exports.signOut = async(req,res, next) => {
   const signoutobj =  await signOut(auth);
   res.send({success : true,"msg" : signoutobj});
    // res.send("Logged Out",signoutobj)
}

//When completed with the rest of the auth, check signIn promise section
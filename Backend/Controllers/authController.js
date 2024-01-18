const { db ,auth } = require("../firebaseConfig");
const {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} = require("firebase/auth");
const {addDoc, collection} = require("firebase/firestore/lite")
const User = collection(db, "User");

module.exports.signUp = async(req, res, next) => {
    const data = req.body;
    const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
    delete data.password;
    const docRef = await addDoc(User,{...data, "uid" : newUser.user.uid, "role" : "User"})
    res.send({"msg" : `User Added with id ${docRef.id}`, newUser});
}

module.exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const signInObj = await signInWithEmailAndPassword(auth, email, password);
    const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
    if (user) {
        res.send({"msg" : `Signed in with id: ${signInObj.user.uid}`,
    signInObj});
    } else {
        next(new expressError('Error signing in: User not found', 404));
    }
};


module.exports.signOut = async(req,res, next) => {
    await signOut(auth);
    res.send("Logged Out")
}
const { db ,auth } = require("../firebaseConfig");
const {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} = require("firebase/auth");
const {addDoc, collection} = require("firebase/firestore/lite")
const User = collection(db, "User");

module.exports.signUp = async(req, res, next) => {
    const data = req.body;
    data.role = "User";
    const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
    data.uid = newUser.user.reloadUserInfo.localId;
    delete data.password;
    const docRef = await addDoc(User,data)
    res.send(`User Added with id ${docRef.id}`);
}

// module.exports.signIn = async(req, res, next) => {
//     const {email, password} = req.body;
//     const signInObj = await signInWithEmailAndPassword(auth, email, password)
//     res.send(`Signed in with id : ${signInObj.user.uid}`)
// }



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
        res.send(`Signed in with id: ${signInObj.user.uid}`);
    } else {
        console.error('Error signing in: User not found');
        next(new expressError('Error signing in: User not found', 404));
    }
};


module.exports.signOut = async(req,res, next) => {
    await signOut(auth);
    res.send("Logged Out")
}
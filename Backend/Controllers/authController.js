const { db ,auth } = require("../firebaseConfig");
const {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail} = require("firebase/auth");
const {addDoc, collection, getDocs } = require("firebase/firestore/lite");
const expressError = require("../util/expressError");
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

module.exports.resetPassword = async(req, res, next) => {
    const {email} = req.body;
    try{
        await sendPasswordResetEmail(auth, email);
        res.status(200).json({message : 'Password reset email sent successfully.'})
    }
    catch(error){
        next(new expressError(500, "Error sending reset password email"));
    }
}

module.exports.forgetPassword = async(req, res, next) => {
    const {email} = req.body;
    const users = await getDocs(User);
    const found = users.docs.find((ele) => ele.data().email == email)
    if(found === undefined) next(new expressError("No User with this email address exists"));
    else{
        try{
            await sendPasswordResetEmail(auth, email);
            res.status(200).json({message : 'Password reset email sent successfully.'})
        }
        catch(error){
            next(new expressError(500, "Error sending reset password email"));
        }
    }
}


//When completed with the rest of the auth, check signIn promise section
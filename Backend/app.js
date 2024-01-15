const express = require("express")
const app = express();
// const User = require("./firebaseConfig")
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

app.use(express.json())

const firebaseConfig = {
  apiKey: "AIzaSyAF6X95XPR9MesdK6eVLHDLjHB5TbF3Y68",
  authDomain: "plotpalette-3f560.firebaseapp.com",
  projectId: "plotpalette-3f560",
  storageBucket: "plotpalette-3f560.appspot.com",
  messagingSenderId: "770900841117",
  appId: "1:770900841117:web:e85256931300b579437a74",
  measurementId: "G-Z65WZC214X"
};

const fireApp = initializeApp(firebaseConfig);
const db = getFirestore(fireApp);

app.post("/new", async(req, res) => {
    const data = req.body;
    console.log(data);
    await setDoc(doc(db, "User", "Two"), data);
    res.send("User Added");
})

// app.get("/home", async(req, res) => {
//     res.send("Welcome to my page");
// })

app.listen(3000, () => {
    console.log("App Listening on port 3000");
})
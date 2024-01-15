const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore/lite');

const firebaseConfig = {
  apiKey: "AIzaSyAF6X95XPR9MesdK6eVLHDLjHB5TbF3Y68",
  authDomain: "plotpalette-3f560.firebaseapp.com",
  projectId: "plotpalette-3f560",
  storageBucket: "plotpalette-3f560.appspot.com",
  messagingSenderId: "770900841117",
  appId: "1:770900841117:web:e85256931300b579437a74",
  measurementId: "G-Z65WZC214X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const User = collection(db, "User")

module.exports = User;

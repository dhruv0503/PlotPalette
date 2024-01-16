const dotenv = require("dotenv");
const { initializeApp } = require('firebase/app');
const { getFirestore} = require('firebase/firestore/lite');
const { getAuth } = require("firebase/auth")

dotenv.config();

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
const auth = getAuth()
const db = getFirestore(app);

module.exports = {db, auth};

// const dotenv = require("dotenv");
// dotenv.config();

// const firebaseConfig = {
//   apiKey:process.env.API_KEY,
//   authDomain:process.env.AUTH_DOMAIN,
//   projectId:process.env.PROJECT_ID,
//   storageBucket:process.env.STORAGE_BUCKET,
//   messagingSenderId:process.env.MESSAGING_SENDER_ID,
//   appId:process.env.APP_ID,
//   measurementId:process.env.MEASUREMENT_ID
// };

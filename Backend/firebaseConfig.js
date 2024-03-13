const { initializeApp } = require('firebase/app');
const { getFirestore} = require('firebase/firestore/lite');
const { getAuth } = require("firebase/auth")

const firebaseConfig = {
  "apiKey" : process.env.API_KEY,
  "authDomain" : process.env.AUTH_DOMAIN,
  "projectId" : process.env.PROJECT_ID,
  "storageBucket" : process.env.STORAGE_BUCKET,
  "messagingSenderId" : process.env.MESSAGING_SENDER_ID,
  "appId" : process.env.APP_ID,
  "measurementId" : process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

module.exports = {db, auth};
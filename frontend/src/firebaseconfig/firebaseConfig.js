import firebase from 'firebase/compat/app';  // Import the default export
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: 'AIzaSyAF6X95XPR9MesdK6eVLHDLjHB5TbF3Y68',
  authDomain: 'plotpalette-3f560.firebaseapp.com',
  projectId: 'plotpalette-3f560',
  storageBucket: 'plotpalette-3f560.appspot.com',
  messagingSenderId: '770900841117',
  appId: '1:770900841117:web:e85256931300b579437a74',
  measurementId: 'G-Z65WZC214X'
};

const app = firebase.initializeApp(firebaseConfig);  // Use the default export

// Export the authentication and firestore instances
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;






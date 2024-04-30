// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVwWDkk7Q-tFmIlxnSHyQ1sAWNMwuG5Sc",
  authDomain: "automated-interview-43d61.firebaseapp.com",
  projectId: "automated-interview-43d61",
  storageBucket: "automated-interview-43d61.appspot.com",
  messagingSenderId: "145058628168",
  appId: "1:145058628168:web:880ffd8ce1f076ea898e7d",
  measurementId: "G-WRQFDJMQ92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

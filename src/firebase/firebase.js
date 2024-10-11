// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYo5PdI5Q2lqujUY-HRIAWxqiRn5lsTuA",
  authDomain: "redux-test-15882.firebaseapp.com",
  projectId: "redux-test-15882",
  storageBucket: "redux-test-15882.appspot.com",
  messagingSenderId: "261635916802",
  appId: "1:261635916802:web:e8e4022de56280d78cd31b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db
}

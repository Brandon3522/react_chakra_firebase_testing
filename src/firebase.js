// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp9s43DlXmjI8t2jeP6aeU56-kkx-JcbU",
  authDomain: "react-firebase-testing-27738.firebaseapp.com",
  projectId: "react-firebase-testing-27738",
  storageBucket: "react-firebase-testing-27738.appspot.com",
  messagingSenderId: "263403879543",
  appId: "1:263403879543:web:7686a692c83b705e675a72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
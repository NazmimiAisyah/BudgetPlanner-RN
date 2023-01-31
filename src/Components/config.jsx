// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwhLEJoZMsBBCztvhQZTtyMsrzl1iuiNw",
  authDomain: "rn-budget-app.firebaseapp.com",
  projectId: "rn-budget-app",
  storageBucket: "rn-budget-app.appspot.com",
  messagingSenderId: "137497427886",
  appId: "1:137497427886:web:f4e2701d479e11fdd0923f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
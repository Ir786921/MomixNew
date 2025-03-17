// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv6zitbfjNTomSvwczcW6auh2mCq2phvw",
  authDomain: "momix-fe7ce.firebaseapp.com",
  projectId: "momix-fe7ce",
  storageBucket: "momix-fe7ce.firebasestorage.app",
  messagingSenderId: "870961103610",
  appId: "1:870961103610:web:162367a194afb37181ff43",
  measurementId: "G-WYLBWBS9LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
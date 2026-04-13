// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuY-tr_aUteLkzcaWLIXNPunLjcog4DRw",
  authDomain: "assignment-11-a032d.firebaseapp.com",
  projectId: "assignment-11-a032d",
  storageBucket: "assignment-11-a032d.firebasestorage.app",
  messagingSenderId: "685909769641",
  appId: "1:685909769641:web:b2c56b3b7dae2dde5dd8b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

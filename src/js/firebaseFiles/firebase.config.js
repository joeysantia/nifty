// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCbGAD78GXVoUXzxXbw-_tYyQZq0TztLxU",
  authDomain: "nifty-9297c.firebaseapp.com",
  projectId: "nifty-9297c",
  storageBucket: "nifty-9297c.appspot.com",
  messagingSenderId: "386453066883",
  appId: "1:386453066883:web:6ceeb870420878491637b6",
  measurementId: "G-JSRSVY96TQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)


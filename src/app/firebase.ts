// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMAQHPG9Akho4lDx95Q-ECWio14m7gl4Q",
  authDomain: "yoke-ef3be.firebaseapp.com",
  projectId: "yoke-ef3be",
  storageBucket: "yoke-ef3be.appspot.com",
  messagingSenderId: "310299581756",
  appId: "1:310299581756:web:d487e40d77393a7685d239",
  measurementId: "G-SDL4E71GQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOweaJdn7QwIpsp25ToFupiVaXwspNkIA",
  authDomain: "tsnproject-4c406.firebaseapp.com",
  projectId: "tsnproject-4c406",
  storageBucket: "tsnproject-4c406.appspot.com",
  messagingSenderId: "605347559335",
  appId: "1:605347559335:web:5b7685d290181a062aa882"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
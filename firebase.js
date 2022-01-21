// Import the functions you need from the SDKs you need
import { initializeApp, getApps , getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpX0NBY37NgkXzAjjRc9YB-pFb0NUJRXs",
  authDomain: "instagram-clone-e8e90.firebaseapp.com",
  projectId: "instagram-clone-e8e90",
  storageBucket: "instagram-clone-e8e90.appspot.com",
  messagingSenderId: "940655809958",
  appId: "1:940655809958:web:aea7f8040b996f2c366b67"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app,db,storage}
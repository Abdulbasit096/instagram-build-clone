import { initializeApp, getApps , getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBpX0NBY37NgkXzAjjRc9YB-pFb0NUJRXs",
  authDomain: "instagram-clone-e8e90.firebaseapp.com",
  projectId: "instagram-clone-e8e90",
  storageBucket: "instagram-clone-e8e90.appspot.com",
  messagingSenderId: "940655809958",
  appId: "1:940655809958:web:3372b80a477561d6366b67"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app,db,storage}
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwVSDPwBwazzd3PbGOaNcILNFZ3T9jsFY",
  authDomain: "todoapp-assignment-3e45c.firebaseapp.com",
  projectId: "todoapp-assignment-3e45c",
  storageBucket: "todoapp-assignment-3e45c.appspot.com",
  messagingSenderId: "914704202784",
  appId: "1:914704202784:web:d220d67b4f3d5976535045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
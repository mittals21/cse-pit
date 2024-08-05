// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIrK2nu1prn5-13qnU8aMzOUTTHgoYR6Y",
  authDomain: "cse-pit.firebaseapp.com",
  projectId: "cse-pit",
  storageBucket: "cse-pit.appspot.com",
  messagingSenderId: "235367080159",
  appId: "1:235367080159:web:392c683659480bbc71c96a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app)
export const storage = getStorage(app)
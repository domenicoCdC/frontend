
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjQZyrQDgKCUCy81f1cJcuDxFRJBxZwDQ",
    authDomain: "progettofondamentiweb.firebaseapp.com",
    projectId: "progettofondamentiweb",
    storageBucket: "progettofondamentiweb.appspot.com",
    messagingSenderId: "905045537598",
    appId: "1:905045537598:web:b3db41dd7ee69244e0726f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; // se agrega "lite" porque sólo usaremos unas funcionalidades.

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCILZbA_SnGKcc6ViKDmcjQgTuiTY3MwjE",
  authDomain: "udemy-courses-2623b.firebaseapp.com",
  projectId: "udemy-courses-2623b",
  storageBucket: "udemy-courses-2623b.appspot.com",
  messagingSenderId: "528662659124",
  appId: "1:528662659124:web:d9b25eb33f7bd923354a61"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirestoreDB = getFirestore( FirebaseApp );
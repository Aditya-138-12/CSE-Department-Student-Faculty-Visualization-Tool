import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";  // Import Realtime Database
import { getStorage } from "firebase/storage";    // Import Firebase Storage
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Use environment variables for Firebase config
const StudentfirebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY_STUDENT_AUTH,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_STUDENT_AUTH,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_STUDENT_AUTH,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_STUDENT_AUTH,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_STUDENT_AUTH,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_STUDENT_AUTH,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_STUDENT_AUTH,
    //measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const Studentapp = initializeApp(StudentfirebaseConfig, "STUDENT_APP");
export const Studentauth = getAuth(Studentapp);
const Studentdb = getDatabase(Studentapp);  // Initialize Realtime Database
const Studentstorage = getStorage(Studentapp);  // Initialize Firebase Storage
const Studentfirestore = getFirestore(Studentapp); // Initialize Firestore

export { Studentdb, Studentstorage, Studentfirestore };  // Export for use in other parts of your app

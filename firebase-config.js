// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3S5ErD3dVgfuKuV4r4ZKwyZG2UCoEJjo",
    authDomain: "coming-soon-a3191.firebaseapp.com",
    projectId: "coming-soon-a3191",
    storageBucket: "coming-soon-a3191.firebasestorage.app",
    messagingSenderId: "230174484990",
    appId: "1:230174484990:web:947c8d8e37b76b0835b8af",
    measurementId: "G-8QRTMXQJM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpF6LHzcELiHNpmVm8f0jggu0DPjxfv7I",
  authDomain: "mock-election-c29f8.firebaseapp.com",
  projectId: "mock-election-c29f8",
  storageBucket: "mock-election-c29f8.firebasestorage.app",
  messagingSenderId: "819336356359",
  appId: "1:819336356359:web:c2c03e4c2e40d11fab00a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
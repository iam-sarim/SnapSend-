// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBze8hGcJtiPi138p2YIQT0lOecd5t5MiU",
  authDomain: "file-sharing-app-7e14e.firebaseapp.com",
  projectId: "file-sharing-app-7e14e",
  storageBucket: "file-sharing-app-7e14e.firebasestorage.app",
  messagingSenderId: "220464748491",
  appId: "1:220464748491:web:356118daa3eccf8122484e",
  measurementId: "G-KLTCP9EV78",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

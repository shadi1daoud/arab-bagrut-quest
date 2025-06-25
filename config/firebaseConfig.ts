// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASgdOrTpuINsHg15uAaZ1nVOgfXp4P1U8",
  authDomain: "darsni-platform.firebaseapp.com",
  projectId: "darsni-platform",
  storageBucket: "darsni-platform.firebasestorage.app",
  messagingSenderId: "305626229659",
  appId: "1:305626229659:web:64f3695e042934c8580f3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebaseConfig };
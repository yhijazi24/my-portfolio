// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNYSEeU8qKQBUvvpXjiWwl2KEP_7cuwwk",
  authDomain: "portfolio-9a442.firebaseapp.com",
  projectId: "portfolio-9a442",
  storageBucket: "portfolio-9a442.appspot.com",
  messagingSenderId: "502976148397",
  appId: "1:502976148397:web:e0630d3800f71a7690e724",
  measurementId: "G-MV6XX3DMT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { storage }; // Export storage to use it for file uploads
export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// --- INSTRUCTIONS ---
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Go to Project Settings > General tab.
// 3. Under "Your apps", click the Web icon (</>) to get your config object.
// 4. Replace the placeholder values below with your actual Firebase config keys.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you'll use
export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
